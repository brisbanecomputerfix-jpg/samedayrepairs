export interface ActiveDispatchTicket {
  id: string; // e.g. "SDR-948102"
  customerName: string;
  customerPhone: string;
  suburb: string;
  city: string;
  categoryName: string;
  issue: string;
  urgency: string;
  status: "Broadcasted" | "Accepted" | "En Route" | "Arrived" | "Completed";
  assignedTechName?: string;
  assignedTechPhone?: string;
  assignedTechVehicle?: string;
  etaMinutes?: number;
  createdAt: string;
}

export interface PendingTradieApplication {
  id: string;
  businessName: string;
  abn: string;
  contactName: string;
  contactPhone: string;
  categoryNames: string[];
  city: string;
  suburb: string;
  submittedAt: string;
  hasInsurance: boolean;
  status: "pending" | "approved" | "rejected";
}

export const INITIAL_ACTIVE_DISPATCHES: ActiveDispatchTicket[] = [
  {
    id: "SDR-948102",
    customerName: "Sarah Jenkins",
    customerPhone: "0412 889 214",
    suburb: "Chermside",
    city: "Greater Brisbane",
    categoryName: "Appliance & Whitegoods",
    issue: "Samsung French Door fridge stopped cooling 2 hours ago. Spoiling groceries.",
    urgency: "Emergency (1-2 Hours)",
    status: "En Route",
    assignedTechName: "Dave Mitchell (Express Whitegoods)",
    assignedTechPhone: "0488 219 401",
    assignedTechVehicle: "Toyota HiAce Mobile Workshop #QLD-728",
    etaMinutes: 18,
    createdAt: "18 mins ago",
  },
  {
    id: "SDR-812940",
    customerName: "Michael Wong",
    customerPhone: "0421 990 312",
    suburb: "Parramatta",
    city: "Greater Sydney",
    categoryName: "Emergency Plumbing",
    issue: "Burst flexi hose under kitchen sink flooding flooring. Water main shut off.",
    urgency: "Emergency (1-2 Hours)",
    status: "Arrived",
    assignedTechName: "Marcus Vance (RapidFlow 24/7)",
    assignedTechPhone: "0491 552 890",
    assignedTechVehicle: "Ford Transit High-Pressure Van #NSW-991",
    etaMinutes: 0,
    createdAt: "42 mins ago",
  },
  {
    id: "SDR-774190",
    customerName: "Elena Rostova",
    customerPhone: "0433 112 849",
    suburb: "Melbourne CBD",
    city: "Greater Melbourne",
    categoryName: "24/7 Locksmiths",
    issue: "Locked out of 4th-floor unit. Key broken inside top lock cylinder.",
    urgency: "Emergency (1-2 Hours)",
    status: "En Route",
    assignedTechName: "Sam O'Connor (SureLock Mobile)",
    assignedTechPhone: "0477 334 119",
    assignedTechVehicle: "Mobile Key Cutting Van #VIC-442",
    etaMinutes: 12,
    createdAt: "25 mins ago",
  },
  {
    id: "SDR-610294",
    customerName: "David Campbell",
    customerPhone: "0409 662 108",
    suburb: "Castle Hill",
    city: "Greater Sydney",
    categoryName: "Garage Doors",
    issue: "Heavy torsion spring snapped. Family SUV trapped inside with flights at 2pm.",
    urgency: "Emergency (1-2 Hours)",
    status: "Completed",
    assignedTechName: "Brett Harrison (SameDay Garage Doors)",
    assignedTechPhone: "0419 443 281",
    assignedTechVehicle: "Service Truck #NSW-104",
    etaMinutes: 0,
    createdAt: "2 hours ago",
  },
];

export const INITIAL_PENDING_APPLICATIONS: PendingTradieApplication[] = [
  {
    id: "app-101",
    businessName: "Apex Emergency Glazing QLD",
    abn: "82 910 442 119",
    contactName: "Julian Vance",
    contactPhone: "0414 559 203",
    categoryNames: ["Glass & Glazing"],
    city: "Greater Brisbane",
    suburb: "South Brisbane",
    submittedAt: "Today, 9:15 AM",
    hasInsurance: true,
    status: "pending",
  },
  {
    id: "app-102",
    businessName: "24/7 Sparky Direct Melbourne",
    abn: "41 802 331 904",
    contactName: "Liam Evans",
    contactPhone: "0428 901 228",
    categoryNames: ["Emergency Electrical"],
    city: "Greater Melbourne",
    suburb: "Richmond",
    submittedAt: "Today, 8:40 AM",
    hasInsurance: true,
    status: "pending",
  },
  {
    id: "app-103",
    businessName: "Gold Coast Rapid Drains",
    abn: "73 401 992 551",
    contactName: "Aaron Kelly",
    contactPhone: "0439 124 883",
    categoryNames: ["Emergency Plumbing"],
    city: "Gold Coast",
    suburb: "Southport",
    submittedAt: "Yesterday, 4:20 PM",
    hasInsurance: true,
    status: "pending",
  },
];

