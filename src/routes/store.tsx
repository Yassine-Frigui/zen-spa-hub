import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, storeConfig } from "@/components/spa-admin";
export const Route = createFileRoute("/store")({
  head: () => ({ meta: [{ title: "Store — Spa Administration" },{ name: "description", content: "Manage retail products, prices, and spa inventory." },{ property: "og:title", content: "Store — Spa Administration" },{ property: "og:description", content: "Manage retail products, prices, and spa inventory." },{ property: "og:type", content: "website" },{ name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <CrudPage {...storeConfig} />,
});