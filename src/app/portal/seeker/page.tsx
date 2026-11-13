import { Metadata } from "next";
import { SeekerClient } from "./seeker-client";

export const metadata: Metadata = {
  title: "Service Seeker Portal | Customer & Homeowner Dashboard",
  description:
    "Track active same-day repair dispatches, view digital 12-month warranties, and dispatch emergency trades to your saved Australian properties.",
};

export default function SeekerPortalPage() {
  return <SeekerClient />;
}
