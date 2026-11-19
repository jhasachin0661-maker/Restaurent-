"use client";

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";

export type DishTier = 1 | 2 | 3 | 4 | 5;

export interface ConveyorDish {
  id: string;
  name: string;
  description?: string;
  price: string; // display label e.g. "₹650"
  tier?: DishTier;
  image: string; // transparent square, top-down plate image
  details?: string[];
}

export interface RajwadaConveyorMenuLabels {
  add?: string;
  close?: string;
  prev?: string;
  next?: string;
  pause?: string;
  play?: string;
}

export interface RajwadaConveyorMenuProps {
  items: ConveyorDish[];
  eyebrow?: string;
  heading?: string;
  caption?: string;
  action?: React.ReactNode;
  speed?: number; // belt cruise speed in px/s; default 26
  paused?: boolean;
  onPausedChange?: (paused: boolean) => void;
  autoplay?: boolean;
  interval?: number;
  active?: number;
  onActiveChange?: (index: number) => void;
  onOpenChange?: (open: boolean, dish?: ConveyorDish) => void;
  onAdd?: (dish: ConveyorDish) => void;
  legend?: string[];
  labels?: RajwadaConveyorMenuLabels;
  className?: string;
}

const TIER_COLORS: Record<DishTier, string> = {
  1: "var(--color-chart-1, #8FA382)",
  2: "var(--color-chart-2, #B99563)",
  3: "var(--color-chart-3, #D07D60)",
  4: "var(--color-chart-4, #8A4337)",
  5: "var(--color-chart-5, #E5C378)",
};

const DEFAULT_LEGEND = [
  "Tier 1 · Bamboo Classic",
  "Tier 2 · Rajwada favourite",
  "Tier 3 · Ocean Coral",
  "Tier 4 · Wagyu Reserve",
  "Tier 5 · Royal feast",
];

export const RajwadaConveyorMenu = forwardRef<HTMLElement, RajwadaConveyorMenuProps>(
  (
    {
      items = [],
      eyebrow = "The Rajwada moving table",
      heading = "A royal table that keeps moving.",
      caption = "Select any revolving plate to explore the dish and add it directly to your order.",
      action,
      speed = 26,
      paused: controlledPaused,
      onPausedChange,
      autoplay = true,
      interval = 4000,
      active: controlledActive,
      onActiveChange,
      onOpenChange,
      onAdd,
      legend = DEFAULT_LEGEND,
      labels = {
        add: "Add to Order",
        close: "Close Dish",
        prev: "Previous Dish",
        next: "Next Dish",
        pause: "Pause Moving Table",
        play: "Resume Moving Table",
      },
      className = "",
    },
    ref
  ) => {
    const sectionRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => sectionRef.current as HTMLElement);

    // Internal pause state fallback
    const [internalPaused, setInternalPaused] = useState(false);
    const isPaused = controlledPaused !== undefined ? controlledPaused : internalPaused;

    const handleSetPaused = useCallback(
      (newPaused: boolean) => {
        if (controlledPaused === undefined) {
          setInternalPaused(newPaused);
        }
        onPausedChange?.(newPaused);
      },
      [controlledPaused, onPausedChange]
    );

    // Selected / Active plate index
    const [internalActive, setInternalActive] = useState(0);
    const activeIndex = controlledActive !== undefined ? controlledActive : internalActive;

    const handleSetActive = useCallback(
      (index: number) => {
        const normalized = ((index % items.length) + items.length) % items.length;
        if (controlledActive === undefined) {
          setInternalActive(normalized);
        }
        onActiveChange?.(normalized);
      },
      [items.length, controlledActive, onActiveChange]
    );

    // Dialog modal for inspected plate
    const [inspectedDish, setInspectedDish] = useState<ConveyorDish | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const openDishDialog = useCallback(
      (dish: ConveyorDish) => {
        setInspectedDish(dish);
        setDialogOpen(true);
        handleSetPaused(true);
        onOpenChange?.(true, dish);
      },
      [handleSetPaused, onOpenChange]
    );

    const closeDishDialog = useCallback(() => {
      setDialogOpen(false);
      setInspectedDish(null);
      handleSetPaused(false);
      onOpenChange?.(false);
    }, [handleSetPaused, onOpenChange]);

    // Track position in degrees (0 to 360)
    const positionRef = useRef(0);
    const platesContainerRef = useRef<HTMLDivElement>(null);
    const animFrameRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);

    // Drag / Touch interaction
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const dragVelocityRef = useRef(0);

    // Reduced motion check
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }, []);

    // Physics Animation Loop
    useEffect(() => {
      if (prefersReducedMotion || items.length === 0) return;

      const animate = (timestamp: number) => {
        if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
        const delta = (timestamp - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = timestamp;

        if (!isPaused && !isDraggingRef.current && !dialogOpen) {
          // Normal cruising: advance position in degrees
          // Speed is in px/s; map px to circular degrees (perimeter ~ 2200px)
          const degPerSec = (speed / 2200) * 360;
          positionRef.current = (positionRef.current + degPerSec * delta) % 360;
        } else if (Math.abs(dragVelocityRef.current) > 0.05) {
          // Inertia deceleration
          positionRef.current = (positionRef.current + dragVelocityRef.current) % 360;
          dragVelocityRef.current *= 0.92;
        }

        // Imperative DOM update for plate positions to avoid React re-renders every frame
        if (platesContainerRef.current) {
          const plateNodes = platesContainerRef.current.children;
          const total = items.length;
          const baseRadiusX = 400; // ellipse horizontal radius
          const baseRadiusY = 135; // perspective flattening vertical radius

          for (let i = 0; i < total; i++) {
            const node = plateNodes[i] as HTMLElement;
            if (!node) continue;

            const plateAngle = ((positionRef.current + (i * 360) / total) * Math.PI) / 180;
            // X and Y coords along the isometric track
            const x = Math.sin(plateAngle) * baseRadiusX;
            const y = Math.cos(plateAngle) * baseRadiusY;

            // Depth calculation: y ranges from -baseRadiusY (back) to +baseRadiusY (front)
            const normalizedDepth = (y + baseRadiusY) / (2 * baseRadiusY); // 0 (far) to 1 (near)
            const scale = 0.65 + normalizedDepth * 0.45; // 0.65 to 1.10
            const opacity = 0.72 + normalizedDepth * 0.28; // 0.72 to 1.0
            const zIndex = Math.round(normalizedDepth * 100);

            node.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`;
            node.style.opacity = `${opacity}`;
            node.style.zIndex = `${zIndex}`;
          }
        }

        animFrameRef.current = requestAnimationFrame(animate);
      };

      animFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    }, [isPaused, dialogOpen, items.length, speed, prefersReducedMotion]);

    // Autoplay interval
    useEffect(() => {
      if (!autoplay || isPaused || prefersReducedMotion || dialogOpen || items.length === 0) return;
      const timer = setInterval(() => {
        handleSetActive(activeIndex + 1);
      }, interval);
      return () => clearInterval(timer);
    }, [autoplay, isPaused, prefersReducedMotion, dialogOpen, items.length, activeIndex, interval, handleSetActive]);

    // Pointer Drag Handlers
    const handlePointerDown = (e: React.PointerEvent) => {
      isDraggingRef.current = true;
      startXRef.current = e.clientX;
      dragVelocityRef.current = 0;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      startXRef.current = e.clientX;
      const degDelta = (dx / 500) * 36;
      positionRef.current = (positionRef.current - degDelta) % 360;
      dragVelocityRef.current = -degDelta;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      isDraggingRef.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}
    };

    // Keyboard Navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSetActive(activeIndex + 1);
        positionRef.current = (positionRef.current - 360 / items.length) % 360;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSetActive(activeIndex - 1);
        positionRef.current = (positionRef.current + 360 / items.length) % 360;
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (items[activeIndex]) openDishDialog(items[activeIndex]);
      }
    };

    const activeDish = items[activeIndex] || items[0];

    return (
      <section
        ref={sectionRef}
        aria-label="Interactive Rajwada moving table"
        className={`relative w-full py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-[#171916] via-[#1A1D18] to-[#171916] ${className}`}
        onKeyDown={handleKeyDown}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header & Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] font-serif block mb-2">
              {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#EDE7D9] tracking-wide mb-4">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-[#A3A89F] leading-relaxed">
              {caption}
            </p>
          </div>

          {/* Conveyor Canvas Area */}
          <div
            className="relative w-full h-[440px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            tabIndex={0}
            role="region"
            aria-label="Conveyor track. Use Left and Right arrows to rotate dishes."
          >
            {/* SVG Perspective Conveyor Belt Track */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <radialGradient id="conveyorGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#B99563" stopOpacity="0.12" />
                  <stop offset="60%" stopColor="#B99563" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#B99563" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="beltMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3D4439" />
                  <stop offset="50%" stopColor="#242921" />
                  <stop offset="100%" stopColor="#181B15" />
                </linearGradient>
              </defs>

              {/* Ambient Track Glow */}
              <ellipse cx="500" cy="250" rx="440" ry="170" fill="url(#conveyorGlow)" />

              {/* Outer Track Bed */}
              <ellipse
                cx="500"
                cy="250"
                rx="415"
                ry="145"
                fill="none"
                stroke="#2A3025"
                strokeWidth="36"
                opacity="0.9"
              />
              {/* Inner Track Guideway */}
              <ellipse
                cx="500"
                cy="250"
                rx="415"
                ry="145"
                fill="none"
                stroke="#171A15"
                strokeWidth="26"
              />
              {/* Brass Accent Rails */}
              <ellipse
                cx="500"
                cy="250"
                rx="432"
                ry="151"
                fill="none"
                stroke="#B99563"
                strokeWidth="1.8"
                opacity="0.6"
              />
              <ellipse
                cx="500"
                cy="250"
                rx="398"
                ry="139"
                fill="none"
                stroke="#B99563"
                strokeWidth="1.8"
                opacity="0.6"
              />
              {/* Center table island */}
              <ellipse
                cx="500"
                cy="250"
                rx="350"
                ry="110"
                fill="#141712"
                stroke="#2B3226"
                strokeWidth="2"
              />
              <text
                x="500"
                y="256"
                textAnchor="middle"
                fill="#3A4335"
                fontSize="22"
                fontFamily="serif"
                letterSpacing="8"
              >
                RAJWADA · ROYAL TABLE
              </text>
            </svg>

            {/* Revolving Plates DOM Nodes */}
            <div
              ref={platesContainerRef}
              className="absolute inset-0 pointer-events-none"
              style={{ perspective: "1000px" }}
            >
              {items.map((dish, idx) => {
                const tierColor = dish.tier ? TIER_COLORS[dish.tier] : "#B99563";
                return (
                  <div
                    key={dish.id}
                    onClick={() => {
                      handleSetActive(idx);
                      openDishDialog(dish);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${dish.name}, Price ${dish.price}`}
                    className="absolute top-1/2 left-1/2 w-28 h-28 sm:w-36 sm:h-36 -ml-14 -mt-14 sm:-ml-18 sm:-mt-18 pointer-events-auto cursor-pointer group transition-transform duration-200"
                  >
                    <div className="relative w-full h-full flex items-center justify-center group-hover:-translate-y-3 transition-transform duration-300">
                      {/* Aura ring on hover */}
                      <div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none"
                        style={{ backgroundColor: tierColor, transform: "scale(1.15)" }}
                      />

                      {/* Plate Graphic */}
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="(max-width: 640px) 112px, 144px"
                        className="object-contain drop-shadow-[0_16px_20px_rgba(0,0,0,0.8)]"
                      />

                      {/* Floating Price Pill */}
                      <span className="absolute -bottom-2 bg-[#171916]/95 border border-[#3C4436] text-[#EDE7D9] text-[10px] font-serif font-bold px-2 py-0.5 rounded-full shadow-lg opacity-90 group-hover:opacity-100 group-hover:border-[#B99563] transition-all">
                        {dish.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Controls & Selected Caption */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#292F24] mt-4">
            {/* Play/Pause & Step Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  handleSetActive(activeIndex - 1);
                  positionRef.current = (positionRef.current + 360 / items.length) % 360;
                }}
                aria-label={labels.prev}
                className="p-2.5 bg-[#20251C] hover:bg-[#2A3125] border border-[#363E30] text-[#EDE7D9] rounded-xs transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleSetPaused(!isPaused)}
                aria-label={isPaused ? labels.play : labels.pause}
                className="px-4 py-2 bg-[#20251C] hover:bg-[#2A3125] border border-[#363E30] text-[#EDE7D9] text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 transition-colors"
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#B99563]" />
                    <span>{labels.play}</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#B99563]" />
                    <span>{labels.pause}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  handleSetActive(activeIndex + 1);
                  positionRef.current = (positionRef.current - 360 / items.length) % 360;
                }}
                aria-label={labels.next}
                className="p-2.5 bg-[#20251C] hover:bg-[#2A3125] border border-[#363E30] text-[#EDE7D9] rounded-xs transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Currently Focused Delicacy Caption */}
            {activeDish && (
              <div className="text-center sm:text-right">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B99563] block">
                  Highlighted Creation
                </span>
                <span className="text-sm font-serif font-semibold text-[#EDE7D9]">
                  {activeDish.name} ({activeDish.price})
                </span>
              </div>
            )}
          </div>

          {/* Tier Legend (Section 10) */}
          <div className="mt-8 pt-6 border-t border-[#242A20] flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#8E948A]">
            <span className="text-[11px] uppercase tracking-widest text-[#B99563] font-semibold">
              Plate Tiers:
            </span>
            {legend.map((tierLabel, idx) => {
              const tierNum = (idx + 1) as DishTier;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-black/40"
                    style={{ backgroundColor: TIER_COLORS[tierNum] }}
                  />
                  <span>{tierLabel}</span>
                </div>
              );
            })}
          </div>

          {/* Optional Action CTA */}
          {action && <div className="mt-8 text-center">{action}</div>}
        </div>

        {/* Modal Dialog for Clicked Dish */}
        {inspectedDish && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeDishDialog();
            }}
          >
            <div className="relative w-full max-w-lg bg-[#1D211B] border border-[#3B4235] rounded-sm p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center">
              <button
                onClick={closeDishDialog}
                aria-label={labels.close}
                className="absolute top-4 right-4 p-2 text-[#A3A89F] hover:text-[#EDE7D9] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Dish Visual */}
              <div className="relative w-44 h-44 mb-4">
                <Image
                  src={inspectedDish.image}
                  alt={inspectedDish.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
                />
              </div>

              {inspectedDish.tier && (
                <span
                  className="inline-block px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-xs mb-2"
                  style={{
                    backgroundColor: `${TIER_COLORS[inspectedDish.tier]}20`,
                    color: TIER_COLORS[inspectedDish.tier],
                    border: `1px solid ${TIER_COLORS[inspectedDish.tier]}50`,
                  }}
                >
                  Tier {inspectedDish.tier} Creation
                </span>
              )}

              <h3 className="text-2xl font-serif text-[#EDE7D9] mb-1">
                {inspectedDish.name}
              </h3>
              <div className="text-xl font-serif font-bold text-[#B99563] mb-3">
                {inspectedDish.price}
              </div>

              {inspectedDish.description && (
                <p className="text-xs text-[#A3A89F] leading-relaxed max-w-md mb-6">
                  {inspectedDish.description}
                </p>
              )}

              {/* Action */}
              <button
                onClick={() => {
                  onAdd?.(inspectedDish);
                  closeDishDialog();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-[#B99563] via-[#D4AF77] to-[#B99563] text-[#171916] font-semibold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 hover:brightness-105 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>{labels.add} • {inspectedDish.price}</span>
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }
);

RajwadaConveyorMenu.displayName = "RajwadaConveyorMenu";

export default RajwadaConveyorMenu;
