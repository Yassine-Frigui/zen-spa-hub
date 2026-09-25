import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, clientConfig } from "@/components/spa-admin";
export const Route = createFileRoute("/clients")({
  head: () => ({ meta: [{ title: "Clients — Spa Administration" },{ name: "description", content: "Manage spa client profiles and visit history." },{ property: "og:title", content: "Clients — Spa Administration" },{ property: "og:description", content: "Manage spa client profiles and visit history." },{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <CrudPage {...clientConfig} />,
});