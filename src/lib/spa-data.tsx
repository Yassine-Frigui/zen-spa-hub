import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type SpaRecord = { id: string; [key: string]: string };
export type SpaCollection = "clients" | "reservations" | "services" | "products";

type SpaDataContextValue = {
  collections: Record<SpaCollection, SpaRecord[]>;
  addRecord: (collection: SpaCollection, record: Omit<SpaRecord, "id">) => void;
  updateRecord: (collection: SpaCollection, record: SpaRecord) => void;
  deleteRecord: (collection: SpaCollection, id: string) => void;
};

const initialCollections: Record<SpaCollection, SpaRecord[]> = {
  clients: [
    { id: "c1", name: "Amara Okafor", email: "amara@example.com", phone: "+234 803 214 9081", visits: "12", lastVisit: "Sep 24, 2026", status: "Active" },
    { id: "c2", name: "Nneka Adebayo", email: "nneka@example.com", phone: "+234 706 482 1190", visits: "8", lastVisit: "Sep 18, 2026", status: "Active" },
    { id: "c3", name: "Leila Hassan", email: "leila@example.com", phone: "+234 905 551 0374", visits: "4", lastVisit: "Aug 30, 2026", status: "New" },
    { id: "c4", name: "Tomi Williams", email: "tomi@example.com", phone: "+234 812 309 7742", visits: "17", lastVisit: "Sep 22, 2026", status: "Active" },
    { id: "c5", name: "Adaeze Bello", email: "adaeze@example.com", phone: "+234 809 117 4608", visits: "2", lastVisit: "Jul 14, 2026", status: "Inactive" },
  ],
  reservations: [
    { id: "r1", client: "Amara Okafor", service: "Deep Tissue Massage", specialist: "Maya", date: "Sep 25, 2026", time: "09:00", price: "₦48,000", status: "Confirmed" },
    { id: "r2", client: "Tomi Williams", service: "Hydra Facial", specialist: "Ife", date: "Sep 25, 2026", time: "10:30", price: "₦62,000", status: "In progress" },
    { id: "r3", client: "Nneka Adebayo", service: "Aromatherapy Ritual", specialist: "Zara", date: "Sep 25, 2026", time: "12:00", price: "₦45,000", status: "Confirmed" },
    { id: "r4", client: "Leila Hassan", service: "Glow Body Polish", specialist: "Maya", date: "Sep 25, 2026", time: "14:30", price: "₦36,000", status: "Pending" },
    { id: "r5", client: "Adaeze Bello", service: "Hydra Facial", specialist: "Ife", date: "Sep 26, 2026", time: "11:00", price: "₦62,000", status: "Confirmed" },
  ],
  services: [
    { id: "s1", name: "Deep Tissue Massage", category: "Massage", duration: "75 min", price: "₦48,000", bookings: "86", status: "Active" },
    { id: "s2", name: "Hydra Facial", category: "Facial", duration: "60 min", price: "₦62,000", bookings: "74", status: "Active" },
    { id: "s3", name: "Aromatherapy Ritual", category: "Wellness", duration: "90 min", price: "₦45,000", bookings: "61", status: "Active" },
    { id: "s4", name: "Glow Body Polish", category: "Body", duration: "50 min", price: "₦36,000", bookings: "43", status: "Active" },
    { id: "s5", name: "Restorative Stone Therapy", category: "Massage", duration: "90 min", price: "₦58,000", bookings: "19", status: "Paused" },
  ],
  products: [
    { id: "p1", name: "Neroli Body Oil", category: "Body care", sku: "BO-104", stock: "24", price: "₦28,000", status: "In stock" },
    { id: "p2", name: "Mineral Bath Soak", category: "Bath", sku: "BS-218", stock: "8", price: "₦18,500", status: "Low stock" },
    { id: "p3", name: "Rose Clay Mask", category: "Face", sku: "FM-310", stock: "16", price: "₦22,000", status: "In stock" },
    { id: "p4", name: "Calm Ritual Candle", category: "Home", sku: "HC-087", stock: "3", price: "₦24,500", status: "Low stock" },
    { id: "p5", name: "Silk Sleep Mask", category: "Accessories", sku: "AC-042", stock: "0", price: "₦15,000", status: "Out of stock" },
  ],
};

const SpaDataContext = createContext<SpaDataContextValue | null>(null);

export function SpaDataProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useState(initialCollections);
  const value = useMemo<SpaDataContextValue>(() => ({
    collections,
    addRecord: (collection, record) => setCollections((current) => ({
      ...current,
      [collection]: [{ id: `${collection}-${Date.now()}`, ...record }, ...current[collection]],
    })),
    updateRecord: (collection, record) => setCollections((current) => ({
      ...current,
      [collection]: current[collection].map((item) => item.id === record.id ? record : item),
    })),
    deleteRecord: (collection, id) => setCollections((current) => ({
      ...current,
      [collection]: current[collection].filter((item) => item.id !== id),
    })),
  }), [collections]);

  return <SpaDataContext.Provider value={value}>{children}</SpaDataContext.Provider>;
}

export function useSpaData() {
  const context = useContext(SpaDataContext);
  if (!context) throw new Error("useSpaData must be used within SpaDataProvider");
  return context;
}