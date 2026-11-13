import type { Metadata } from "next";
import { DispatchClient } from "./dispatch-client";

export function generateStaticParams() {
  return [
    { ticketId: "SDR-948102" },
    { ticketId: "SDR-812940" },
    { ticketId: "SDR-774190" },
    { ticketId: "SDR-610294" },
  ];
}

interface PageProps {
  params: Promise<{ ticketId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ticketId } = await params;
  return {
    title: `Dispatch Status #${ticketId.toUpperCase()} | SameDayRepairs.com.au`,
    description: `Track your emergency technician dispatch status live on SameDayRepairs.com.au.`,
  };
}

export default async function DispatchPage({ params }: PageProps) {
  const { ticketId } = await params;
  return <DispatchClient ticketId={ticketId} />;
}

