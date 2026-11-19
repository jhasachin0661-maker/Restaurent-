import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Toaster } from "sonner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAJWADA | The Royal Taste of India",
  description:
    "A premium Indian multi-cuisine dining experience bringing familiar regional flavours into a contemporary, elegant setting.",
  keywords: [
    "RAJWADA",
    "Indian Restaurant",
    "The Royal Taste of India",
    "Mumbai Dining",
    "Tandoor",
    "Biryani",
    "Modern Royal Indian",
  ],
  openGraph: {
      title: "RAJWADA | The Royal Taste of India",
    description:
      "Timeless Indian favourites, prepared with care and served with a contemporary touch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#171916] text-[#EDE7D9] antialiased selection:bg-[#B99563] selection:text-[#171916]">
        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full">{children}</main>

        {/* Global Cart Slide-Over Drawer */}
        <CartDrawer />

        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#1E221C",
              border: "1px solid #363E30",
              color: "#EDE7D9",
            },
          }}
        />

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
