import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/spa-admin";
export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Spa Administration" },{ name: "description", content: "Manage spa details, hours, notifications, and team access." },{ property: "og:title", content: "Settings — Spa Administration" },{ property: "og:description", content: "Manage spa details, hours, notifications, and team access." },{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" }] }),
  component: SettingsPage,
});