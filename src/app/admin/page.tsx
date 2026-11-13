import type { Metadata } from "next";
import { AdminClient } from "./admin-client";

export const metadata: Metadata = {
  title: "Operations & Dispatch Center | SameDayRepairs.com.au",
  description: "Internal operations dashboard for emergency technician dispatch and contractor onboarding review.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}

