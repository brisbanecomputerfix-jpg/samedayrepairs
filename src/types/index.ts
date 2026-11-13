export type RepairCategoryId =
  | "appliances"
  | "plumbing"
  | "locksmith"
  | "electrical"
  | "glazing"
  | "garage-doors"
  | "mobile-mechanic"
  | "tech-repairs"
  | "roofing";

export interface RepairCategory {
  id: RepairCategoryId;
  name: string;
  shortName: string;
  slug: string;
  iconName: string;
  badgeText: string;
  description: string;
  avgResponseTime: string;
  typicalCalloutFee: string;
  popularIssues: string[];
  bannerColor: string;
}

export interface AustralianCity {
  id: string;
  name: string;
  state: "QLD" | "NSW" | "VIC" | "WA" | "SA" | "ACT" | "TAS";
  slug: string;
  isCapital: boolean;
  popularSuburbs: { name: string; postcode: string }[];
}

export interface RepairProvider {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  categoryIds: RepairCategoryId[];
  cityId: string;
  suburb: string;
  state: string;
  postcode: string;
  serviceRadiusKm: number;
  phone: string;
  abn: string;
  isAbnVerified: boolean;
  isPoliceChecked: boolean;
  isLicensed: boolean;
  isInsured: boolean;
  sameDayCutoffTime: string; // e.g. "3:30 PM"
  isOnDutyToday: boolean;
  rating: number;
  reviewCount: number;
  calloutPricingNote: string;
  features: string[];
  bio: string;
  websiteUrl?: string;
}

export interface UrgentBookingRequest {
  id?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  suburb: string;
  postcode: string;
  categoryId: RepairCategoryId;
  specificIssue: string;
  urgencyLevel: "Emergency (1-2 Hours)" | "Today by 5:00 PM" | "First slot Tomorrow";
  notes?: string;
  createdAt?: string;
}

export interface ProviderRegistrationRequest {
  businessName: string;
  tradingName?: string;
  abn: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  cityId: string;
  primarySuburb: string;
  serviceRadiusKm: number;
  categoryIds: RepairCategoryId[];
  sameDayCutoffTime: string;
  hasPublicLiability: boolean;
  licenseNumber?: string;
}
