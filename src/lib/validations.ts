import { z } from "zod";

export const reservationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().email("Please provide a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+0-9\s-]{10,15}$/, "Please enter a valid telephone number"),
  date: z
    .string()
    .refine((val) => {
      if (!val) return false;
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, "Reservation date cannot be in the past"),
  time: z.string().min(1, "Please select a dining time slot"),
  guests: z
    .number()
    .min(1, "Minimum 1 guest")
    .max(12, "For parties larger than 12, please contact our private dining director"),
    seatingPreference: z.enum(["main-dining", "chef-counter", "private-room", "outdoor"]),
  specialRequests: z.string().max(300, "Requests must be under 300 characters").optional(),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;

export const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required for confirmation"),
  phone: z.string().min(10, "Valid phone number required"),
  diningType: z.enum(["dine-in", "takeaway", "curbside"]),
  tableOrAddress: z.string().min(2, "Please provide table number or pickup instructions"),
  notes: z.string().max(200).optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
