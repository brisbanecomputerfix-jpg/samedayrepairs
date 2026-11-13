import { Metadata } from "next";
import { ProviderClient } from "./provider-client";

export const metadata: Metadata = {
  title: "Service Provider Portal | Tradie & Contractor Dashboard",
  description:
    "Accept nearby same-day emergency dispatches, toggle your on-duty fleet availability, update job statuses, and track daily earnings.",
};

export default function ProviderPortalPage() {
  return <ProviderClient />;
}

