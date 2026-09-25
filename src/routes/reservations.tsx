import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, reservationConfig } from "@/components/spa-admin";
export const Route = createFileRoute("/reservations")({
  head: () => ({ meta: [{ title: "Reservations — Spa Administration" },{ name: "description", content: "Manage spa appointments, schedules, and confirmations." },{ property: "og:title", content: "Reservations — Spa Administration" },{ property: "og:description", content: "Manage spa appointments, schedules, and confirmations." },{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <CrudPage {...reservationConfig} />,
});