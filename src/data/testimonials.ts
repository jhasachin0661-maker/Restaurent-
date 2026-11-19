export interface Testimonial { id: string; author: string; role: string; comment: string; rating: number; }

export const TESTIMONIALS: Testimonial[] = [
  { id: "test-1", author: "Aarav Mehta", role: "Dinner guest", comment: "The flavours feel familiar but the room and presentation make the evening feel genuinely special.", rating: 5 },
  { id: "test-2", author: "Rhea Singhania", role: "Private dining guest", comment: "A beautiful place for a long dinner. The tandoor plates and service made our celebration effortless.", rating: 5 },
  { id: "test-3", author: "Vikramaditya Roy", role: "Food lover", comment: "Rajwada balances generous Indian cooking with a calm, refined setting. The biryani is a must-order.", rating: 5 },
];

export const CHEF_INFO = {
  name: "The Rajwada Kitchen",
  regionalTitle: "Regional Indian Kitchen",
  title: "Modern Royal Indian Dining",
  experience: "Regional recipes, live fire and generous hospitality",
  bio: "Rajwada is built around the idea that Indian food can feel both deeply familiar and beautifully contemporary. We let the masala, the smoke and the season do the talking.",
  philosophy: "A royal table is not about excess. It is about care in every detail and enough warmth for everyone to feel at home.",
};
