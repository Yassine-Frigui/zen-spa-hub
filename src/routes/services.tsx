import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, serviceConfig } from "@/components/spa-admin";
export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "Services — Spa Administration" },{ name: "description", content: "Manage spa treatments, pricing, and availability." },{ property: "og:title", content: "Services — Spa Administration" },{ property: "og:description", content: "Manage spa treatments, pricing, and availability." },{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <CrudPage {...serviceConfig} />,
});