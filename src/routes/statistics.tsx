import { createFileRoute } from "@tanstack/react-router";
import { StatisticsPage } from "@/components/spa-admin";
export const Route = createFileRoute("/statistics")({
  head: () => ({ meta: [{ title: "Statistics — Spa Administration" },{ name: "description", content: "Review spa revenue, bookings, retention, and service performance." },{ property: "og:title", content: "Statistics — Spa Administration" },{ property: "og:description", content: "Review spa revenue, bookings, retention, and service performance." },{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" }] }),
  component: StatisticsPage,
});