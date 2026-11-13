export type UserRole = "seeker" | "provider" | null;

export interface SavedProperty {
  id: string;
  label: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  isPrimary?: boolean;
}

export interface PastServiceRecord {
  id: string;
  ticketRef: string;
  category: string;
  providerName: string;
  date: string;
  totalCost: number;
  warrantyValidUntil: string;
  invoiceNumber: string;
  ratingGiven: number;
}

export interface SeekerUser {
  id: string;
  role: "seeker";
  name: string;
  email: string;
  phone: string;
  suburb: string;
  state: string;
  postcode: string;
  savedProperties: SavedProperty[];
  activeTicketId?: string;
  pastServices: PastServiceRecord[];
}

export interface ProviderBroadcastJob {
  id: string;
  ticketRef: string;
  category: string;
  suburb: string;
  distanceKm: number;
  issue: string;
  urgency: string;
  payoutEstimate: string;
  minutesAgo: number;
}

export interface ProviderActiveJob {
  id: string;
  ticketRef: string;
  customerName: string;
  customerPhone: string;
  address: string;
  suburb: string;
  issue: string;
  urgency: string;
  status: "En Route" | "Arrived" | "In Progress" | "Completed";
  etaMinutes: number;
  diagnosticFee: string;
  totalQuote?: string;
}

export interface ProviderUser {
  id: string;
  role: "provider";
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  abn: string;
  category: string;
  city: string;
  suburb: string;
  vehiclePlate: string;
  isOnDuty: boolean;
  todayEarnings: number;
  completedJobsToday: number;
  serviceRadiusKm: number;
  rating: number;
  reviewCount: number;
  activeJobs: ProviderActiveJob[];
  broadcastQueue: ProviderBroadcastJob[];
}

export type AuthUser = SeekerUser | ProviderUser | null;

