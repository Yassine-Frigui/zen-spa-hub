import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/spa-admin";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Dashboard — Spa Administration" },
    { name: "description", content: "Daily appointments, revenue, clients, and spa activity at a glance." },
    { property: "og:title", content: "Dashboard — Spa Administration" },
    { property: "og:description", content: "Daily appointments, revenue, clients, and spa activity at a glance." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DashboardPage,
});
