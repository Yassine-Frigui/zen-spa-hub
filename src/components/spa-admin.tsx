import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3, Bell, CalendarDays, ChevronDown, CircleUserRound, Clock3, CreditCard,
  LayoutDashboard, Menu, MoreHorizontal, Package, Pencil, Plus, Search, Settings,
  SlidersHorizontal, Sparkles, Trash2, TrendingUp, UserRound, UsersRound, X,
} from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type SpaCollection, type SpaRecord, useSpaData } from "@/lib/spa-data";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clients", label: "Clients", icon: UsersRound },
  { to: "/reservations", label: "Reservations", icon: CalendarDays },
  { to: "/services", label: "Services", icon: Sparkles },
  { to: "/store", label: "Store", icon: Package },
  { to: "/statistics", label: "Statistics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-20 items-center gap-3 border-b border-border px-7">
          <div className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkles className="size-4" /></div>
          <div><p className="font-display text-lg leading-none">Spa Admin</p><p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Operations</p></div>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-6">
          {nav.map((item) => <NavItem key={item.to} {...item} active={pathname === item.to} />)}
        </nav>
        <div className="border-t border-border p-4">
          <button className="flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-accent">
            <div className="grid size-9 place-items-center rounded-full bg-secondary font-medium text-secondary-foreground">YF</div>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">Yassine Frigui</p><p className="truncate text-xs text-muted-foreground">Administrator</p></div>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
        </div>
      </aside>

      {mobileOpen && <button aria-label="Close menu" className="fixed inset-0 z-40 bg-overlay lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col border-r border-border bg-sidebar transition-transform lg:hidden", mobileOpen && "translate-x-0")}>
        <div className="flex h-18 items-center justify-between border-b border-border px-5"><span className="font-display text-lg">Spa Admin</span><Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></Button></div>
        <nav className="flex-1 space-y-1 px-4 py-5">{nav.map((item) => <div key={item.to} onClick={() => setMobileOpen(false)}><NavItem {...item} active={pathname === item.to} /></div>)}</nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></Button>
          <p className="hidden text-sm text-muted-foreground lg:block">Friday, September 25</p>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" /></Button>
            <div className="mx-1 hidden h-5 w-px bg-border sm:block" />
            <div className="hidden items-center gap-2 sm:flex"><div className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-medium">YF</div><span className="text-sm font-medium">Yassine</span></div>
          </div>
        </header>
        <main className="px-4 py-7 md:px-8 md:py-9 xl:px-10">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ to, label, icon: Icon, active }: { to: string; label: string; icon: typeof LayoutDashboard; active: boolean }) {
  return <Link to={to} className={cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground", active && "bg-accent font-medium text-foreground")}><Icon className="size-[18px]" /><span>{label}</span>{active && <span className="ml-auto size-1.5 rounded-full bg-primary" />}</Link>;
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
    <div>{eyebrow && <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>}<h1 className="font-display text-3xl font-medium md:text-4xl">{title}</h1><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p></div>
    {action}
  </div>;
}

const dashboardTrend = [
  { day: "Mon", revenue: 280 }, { day: "Tue", revenue: 410 }, { day: "Wed", revenue: 360 },
  { day: "Thu", revenue: 520 }, { day: "Fri", revenue: 470 }, { day: "Sat", revenue: 680 }, { day: "Sun", revenue: 590 },
];

export function DashboardPage() {
  const { collections } = useSpaData();
  const stats = [
    { label: "Today’s revenue", value: "₦392,000", change: "+12.4%", icon: CreditCard },
    { label: "Appointments", value: "18", change: "14 confirmed", icon: CalendarDays },
    { label: "Active clients", value: "1,284", change: "+36 this month", icon: UsersRound },
    { label: "Occupancy", value: "82%", change: "+5.2%", icon: TrendingUp },
  ];
  return <>
    <PageHeader eyebrow="Overview" title="Good morning, Yassine" description="Here’s a calm look at today’s appointments and business performance." action={<Button asChild><Link to="/reservations"><Plus />New reservation</Link></Button>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, change, icon: Icon }) => <section key={label} className="rounded-lg border border-border bg-card p-5"><div className="flex items-start justify-between"><p className="text-sm text-muted-foreground">{label}</p><div className="grid size-8 place-items-center rounded-md bg-secondary"><Icon className="size-4" /></div></div><p className="mt-5 font-display text-3xl">{value}</p><p className="mt-2 text-xs text-muted-foreground">{change}</p></section>)}</div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
      <section className="rounded-lg border border-border bg-card p-5 md:p-6"><div className="mb-6 flex items-center justify-between"><div><h2 className="font-display text-xl">Revenue pulse</h2><p className="mt-1 text-xs text-muted-foreground">This week · ₦3.31m</p></div><span className="rounded-full bg-positive-soft px-2.5 py-1 text-xs font-medium text-positive">+8.2%</span></div><div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={dashboardTrend}><defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.32}/><stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.02}/></linearGradient></defs><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} /><YAxis hide /><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} /><Area type="monotone" dataKey="revenue" stroke="var(--chart-2)" strokeWidth={2} fill="url(#revenueFill)" /></AreaChart></ResponsiveContainer></div></section>
      <section className="rounded-lg border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div><h2 className="font-display text-xl">Today’s schedule</h2><p className="mt-1 text-xs text-muted-foreground">18 total appointments</p></div><Button variant="ghost" size="sm" asChild><Link to="/reservations">View all</Link></Button></div><div className="divide-y divide-border">{collections.reservations.slice(0,4).map((item) => <div key={item.id} className="flex gap-4 px-5 py-4"><div className="w-12 pt-0.5 text-xs font-medium">{item.time}</div><div className="min-w-0 flex-1 border-l-2 border-primary pl-4"><p className="truncate text-sm font-medium">{item.client}</p><p className="mt-1 truncate text-xs text-muted-foreground">{item.service} · {item.specialist}</p></div><Status value={item.status} /></div>)}</div></section>
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <section className="rounded-lg border border-border bg-card p-5"><h2 className="font-display text-xl">Popular services</h2><div className="mt-5 space-y-4">{collections.services.slice(0,4).map((item, index) => <div key={item.id} className="flex items-center gap-4"><span className="grid size-7 place-items-center rounded-full bg-secondary text-xs">{index + 1}</span><div className="min-w-0 flex-1"><div className="flex justify-between gap-3 text-sm"><span className="truncate font-medium">{item.name}</span><span className="text-muted-foreground">{item.bookings}</span></div><div className="mt-2 h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${90 - index * 14}%` }} /></div></div></div>)}</div></section>
      <section className="rounded-lg border border-border bg-card p-5"><h2 className="font-display text-xl">Recent activity</h2><div className="mt-5 space-y-5">{["A new client profile was added", "Hydra Facial inventory was updated", "Amara’s appointment was confirmed", "September sales report is ready"].map((activity, index) => <div key={activity} className="flex gap-3"><div className="mt-1.5 size-2 rounded-full bg-primary" /><div><p className="text-sm">{activity}</p><p className="mt-1 text-xs text-muted-foreground">{index * 12 + 8} minutes ago</p></div></div>)}</div></section>
    </div>
  </>;
}

export type CrudField = { key: string; label: string; placeholder?: string; type?: string; options?: string[] };
export type CrudPageProps = { collection: SpaCollection; eyebrow: string; title: string; description: string; singular: string; fields: CrudField[]; columns: { key: string; label: string }[]; filters: string[] };

export function CrudPage(props: CrudPageProps) {
  const { collections, addRecord, updateRecord, deleteRecord } = useSpaData();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<SpaRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SpaRecord | null>(null);
  const records = useMemo(() => collections[props.collection].filter((record) => {
    const matchesSearch = Object.values(record).some((value) => value.toLowerCase().includes(query.toLowerCase()));
    const matchesFilter = filter === "All" || Object.values(record).includes(filter);
    return matchesSearch && matchesFilter;
  }), [collections, props.collection, query, filter]);
  const openCreate = () => { setEditing(null); setFormOpen(true); };
  return <>
    <PageHeader eyebrow={props.eyebrow} title={props.title} description={props.description} action={<Button onClick={openCreate}><Plus />Add {props.singular.toLowerCase()}</Button>} />
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${props.title.toLowerCase()}…`} className="pl-9" /></div>
        <div className="flex gap-2"><Select value={filter} onValueChange={setFilter}><SelectTrigger className="w-40"><SlidersHorizontal className="mr-2 size-4" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All">All records</SelectItem>{props.filters.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select><Button variant="outline" size="icon" aria-label="More filters"><SlidersHorizontal /></Button></div>
      </div>
      <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead><tr className="border-b border-border bg-muted/40">{props.columns.map((column) => <th key={column.key} className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{column.label}</th>)}<th className="w-14 px-4 py-3"><span className="sr-only">Actions</span></th></tr></thead><tbody className="divide-y divide-border">{records.map((record) => <tr key={record.id} className="group transition-colors hover:bg-muted/35">{props.columns.map((column, index) => <td key={column.key} className={cn("px-5 py-4 text-sm", index === 0 && "font-medium")}>{column.key === "status" ? <Status value={record[column.key]} /> : record[column.key]}</td>)}<td className="px-4 py-3"><DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label={`Actions for ${record[props.columns[0].key]}`}><MoreHorizontal /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => { setEditing(record); setFormOpen(true); }}><Pencil />Edit</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteTarget(record)}><Trash2 />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></td></tr>)}</tbody></table></div>
      {records.length === 0 && <div className="grid place-items-center px-4 py-16 text-center"><Search className="size-7 text-muted-foreground" /><p className="mt-3 text-sm font-medium">No records found</p><p className="mt-1 text-xs text-muted-foreground">Try another search or filter.</p></div>}
      <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground"><span>Showing {records.length} of {collections[props.collection].length}</span><div className="flex gap-1"><Button variant="outline" size="sm" disabled>Previous</Button><Button variant="outline" size="sm" disabled>Next</Button></div></div>
    </section>
    <RecordDialog open={formOpen} onOpenChange={setFormOpen} singular={props.singular} fields={props.fields} initial={editing} onSave={(record) => { if (editing) updateRecord(props.collection, { id: editing.id, ...record }); else addRecord(props.collection, record); toast.success(`${props.singular} ${editing ? "updated" : "created"}`); }} />
    <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this {props.singular.toLowerCase()}?</AlertDialogTitle><AlertDialogDescription>This removes the record from the workspace. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Keep record</AlertDialogCancel><AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { if (deleteTarget) { deleteRecord(props.collection, deleteTarget.id); toast.success(`${props.singular} deleted`); setDeleteTarget(null); } }}>Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </>;
}

function RecordDialog({ open, onOpenChange, singular, fields, initial, onSave }: { open: boolean; onOpenChange: (open: boolean) => void; singular: string; fields: CrudField[]; initial: SpaRecord | null; onSave: (record: Omit<SpaRecord, "id">) => void }) {
  const key = initial?.id ?? `new-${open}`;
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl"><DialogHeader><DialogTitle className="font-display text-2xl">{initial ? "Edit" : "Add"} {singular.toLowerCase()}</DialogTitle><DialogDescription>{initial ? "Update the details below." : `Add a new ${singular.toLowerCase()} to your workspace.`}</DialogDescription></DialogHeader><RecordForm key={key} fields={fields} initial={initial} onSubmit={(record) => { onSave(record); onOpenChange(false); }} onCancel={() => onOpenChange(false)} /></DialogContent></Dialog>;
}

function RecordForm({ fields, initial, onSubmit, onCancel }: { fields: CrudField[]; initial: SpaRecord | null; onSubmit: (record: Omit<SpaRecord, "id">) => void; onCancel: () => void }) {
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map((field) => [field.key, initial?.[field.key] ?? ""])));
  const submit = (event: FormEvent) => { event.preventDefault(); onSubmit(values); };
  return <form onSubmit={submit} className="mt-2 space-y-5"><div className="grid gap-4 sm:grid-cols-2">{fields.map((field) => <div key={field.key} className={cn("space-y-2", field.key === "notes" && "sm:col-span-2")}><Label htmlFor={field.key}>{field.label}</Label>{field.options ? <Select value={values[field.key]} onValueChange={(value) => setValues((current) => ({ ...current, [field.key]: value }))}><SelectTrigger id={field.key}><SelectValue placeholder={`Select ${field.label.toLowerCase()}`} /></SelectTrigger><SelectContent>{field.options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select> : field.key === "notes" ? <Textarea id={field.key} value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} placeholder={field.placeholder} /> : <Input id={field.key} type={field.type} value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} placeholder={field.placeholder} required />}</div>)}</div><DialogFooter><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit">{initial ? "Save changes" : `Add ${singularLabel(fields)}`}</Button></DialogFooter></form>;
}

function singularLabel(fields: CrudField[]) { return fields.some((field) => field.key === "service") ? "reservation" : "record"; }

function Status({ value }: { value: string }) {
  const lower = value.toLowerCase();
  const tone = lower.includes("active") || lower.includes("confirmed") || lower.includes("stock") && !lower.includes("low") && !lower.includes("out") ? "bg-positive-soft text-positive" : lower.includes("pending") || lower.includes("progress") || lower.includes("low") || lower.includes("new") ? "bg-warning-soft text-warning" : "bg-muted text-muted-foreground";
  return <span className={cn("inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium", tone)}>{value}</span>;
}

const statTrend = [
  { month: "Apr", revenue: 2180, bookings: 284 }, { month: "May", revenue: 2470, bookings: 306 }, { month: "Jun", revenue: 2310, bookings: 292 }, { month: "Jul", revenue: 2780, bookings: 348 }, { month: "Aug", revenue: 3050, bookings: 382 }, { month: "Sep", revenue: 3310, bookings: 405 },
];
const serviceMix = [{ name: "Massage", value: 38, color: "var(--chart-1)" }, { name: "Facial", value: 27, color: "var(--chart-2)" }, { name: "Body", value: 20, color: "var(--chart-3)" }, { name: "Wellness", value: 15, color: "var(--chart-4)" }];

export function StatisticsPage() {
  return <><PageHeader eyebrow="Performance" title="Statistics" description="Track revenue, bookings, retention, and the services driving your business." action={<Select defaultValue="6m"><SelectTrigger className="w-44"><CalendarDays className="mr-2 size-4" /><SelectValue /></SelectTrigger><SelectContent><SelectItem value="30d">Last 30 days</SelectItem><SelectItem value="6m">Last 6 months</SelectItem><SelectItem value="1y">Last 12 months</SelectItem></SelectContent></Select>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Total revenue","₦16.1m","+18.2%"],["Total bookings","2,017","+11.4%"],["Avg. booking","₦42,800","+4.8%"],["Client retention","78.6%","+2.1%"]].map(([label,value,change]) => <section key={label} className="rounded-lg border border-border bg-card p-5"><p className="text-sm text-muted-foreground">{label}</p><div className="mt-4 flex items-end justify-between"><p className="font-display text-3xl">{value}</p><span className="text-xs font-medium text-positive">{change}</span></div></section>)}</div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]"><section className="rounded-lg border border-border bg-card p-5 md:p-6"><div><h2 className="font-display text-xl">Revenue & bookings</h2><p className="mt-1 text-xs text-muted-foreground">Six-month performance</p></div><div className="mt-6 h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={statTrend}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} /><YAxis hide /><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} /><Bar dataKey="revenue" fill="var(--chart-2)" radius={[4,4,0,0]} maxBarSize={32} /></BarChart></ResponsiveContainer></div></section><section className="rounded-lg border border-border bg-card p-5 md:p-6"><h2 className="font-display text-xl">Service mix</h2><p className="mt-1 text-xs text-muted-foreground">Share of all appointments</p><div className="h-52"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={serviceMix} dataKey="value" innerRadius={58} outerRadius={82} paddingAngle={3}>{serviceMix.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} /></PieChart></ResponsiveContainer></div><div className="grid grid-cols-2 gap-3">{serviceMix.map((item) => <div key={item.name} className="flex items-center gap-2 text-xs"><span className="size-2 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-muted-foreground">{item.name}</span><span className="ml-auto font-medium">{item.value}%</span></div>)}</div></section></div>
    <section className="mt-6 overflow-hidden rounded-lg border border-border bg-card"><div className="border-b border-border p-5"><h2 className="font-display text-xl">Specialist performance</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[640px] text-sm"><thead><tr className="bg-muted/40 text-left text-[11px] uppercase tracking-[0.12em] text-muted-foreground"><th className="px-5 py-3">Specialist</th><th className="px-5 py-3">Appointments</th><th className="px-5 py-3">Revenue</th><th className="px-5 py-3">Rebooking</th><th className="px-5 py-3">Rating</th></tr></thead><tbody className="divide-y divide-border">{[["Maya Okoro","146","₦5.2m","82%","4.9"],["Ife Balogun","132","₦4.8m","79%","4.8"],["Zara Musa","118","₦3.7m","76%","4.8"]].map((row) => <tr key={row[0]}>{row.map((cell,index) => <td key={cell} className={cn("px-5 py-4", index === 0 && "font-medium")}>{cell}</td>)}</tr>)}</tbody></table></div></section>
  </>;
}

export function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); toast.success("Settings saved"); setTimeout(() => setSaved(false), 1600); };
  return <><PageHeader eyebrow="Workspace" title="Settings" description="Manage business details, opening hours, notifications, and team access." action={<Button onClick={save}>{saved ? "Saved" : "Save changes"}</Button>} />
    <div className="grid gap-6 xl:grid-cols-[1.35fr_.85fr]">
      <div className="space-y-6"><section className="rounded-lg border border-border bg-card p-5 md:p-6"><div className="mb-5"><h2 className="font-display text-xl">Business details</h2><p className="mt-1 text-xs text-muted-foreground">Shown on receipts and appointment messages.</p></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Business name" defaultValue="The Wellness Studio" /><Field label="Phone" defaultValue="+234 809 460 2211" /><Field label="Email" defaultValue="hello@wellness.example" /><Field label="Currency" defaultValue="Nigerian Naira (₦)" /><div className="space-y-2 sm:col-span-2"><Label htmlFor="address">Address</Label><Textarea id="address" defaultValue="14 Adeola Odeku Street, Victoria Island, Lagos" /></div></div></section>
      <section className="rounded-lg border border-border bg-card p-5 md:p-6"><h2 className="font-display text-xl">Opening hours</h2><div className="mt-5 divide-y divide-border">{["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day,index) => <div key={day} className="flex flex-wrap items-center gap-3 py-3"><Switch defaultChecked={index < 6} /><span className="w-24 text-sm font-medium">{day}</span>{index < 6 ? <div className="ml-auto flex items-center gap-2"><Input className="w-28" defaultValue={index === 5 ? "09:00" : "08:00"} /><span className="text-muted-foreground">–</span><Input className="w-28" defaultValue={index === 5 ? "17:00" : "20:00"} /></div> : <span className="ml-auto text-sm text-muted-foreground">Closed</span>}</div>)}</div></section></div>
      <div className="space-y-6"><section className="rounded-lg border border-border bg-card p-5"><h2 className="font-display text-xl">Notifications</h2><div className="mt-5 space-y-5">{[["New reservations","When an appointment is booked"],["Cancellations","When a client cancels"],["Low stock","When products reach reorder level"],["Daily summary","Every day at 8:00 PM"]].map(([title,copy]) => <div key={title} className="flex items-start gap-4"><div className="flex-1"><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{copy}</p></div><Switch defaultChecked /></div>)}</div></section>
      <section className="rounded-lg border border-border bg-card"><div className="border-b border-border p-5"><h2 className="font-display text-xl">Team access</h2></div><div className="divide-y divide-border">{[["Yassine Frigui","Owner","YF"],["Maya Okoro","Specialist","MO"],["Ife Balogun","Specialist","IB"]].map(([name,role,initials]) => <div key={name} className="flex items-center gap-3 p-4"><div className="grid size-9 place-items-center rounded-full bg-secondary text-xs font-medium">{initials}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{name}</p><p className="text-xs text-muted-foreground">{role}</p></div><Button variant="ghost" size="icon" aria-label={`Manage ${name}`}><MoreHorizontal /></Button></div>)}</div><div className="border-t border-border p-4"><Button variant="outline" className="w-full"><Plus />Invite team member</Button></div></section></div>
    </div>
  </>;
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) { const id = label.toLowerCase().replaceAll(" ", "-"); return <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} defaultValue={defaultValue} /></div>; }

export const clientConfig: CrudPageProps = { collection: "clients", eyebrow: "Relationships", title: "Clients", description: "Keep client details, visit history, and preferences organized in one place.", singular: "Client", filters: ["Active","New","Inactive"], columns: [{ key: "name", label: "Client" },{ key: "email", label: "Email" },{ key: "phone", label: "Phone" },{ key: "visits", label: "Visits" },{ key: "lastVisit", label: "Last visit" },{ key: "status", label: "Status" }], fields: [{ key: "name", label: "Full name", placeholder: "Client name" },{ key: "email", label: "Email", type: "email", placeholder: "name@example.com" },{ key: "phone", label: "Phone", placeholder: "+234…" },{ key: "visits", label: "Visits", type: "number", placeholder: "0" },{ key: "lastVisit", label: "Last visit", placeholder: "Sep 25, 2026" },{ key: "status", label: "Status", options: ["Active","New","Inactive"] }] };
export const reservationConfig: CrudPageProps = { collection: "reservations", eyebrow: "Schedule", title: "Reservations", description: "Plan appointments, assign specialists, and keep every treatment running on time.", singular: "Reservation", filters: ["Confirmed","In progress","Pending","Cancelled"], columns: [{ key: "client", label: "Client" },{ key: "service", label: "Service" },{ key: "specialist", label: "Specialist" },{ key: "date", label: "Date" },{ key: "time", label: "Time" },{ key: "price", label: "Price" },{ key: "status", label: "Status" }], fields: [{ key: "client", label: "Client", placeholder: "Client name" },{ key: "service", label: "Service", options: ["Deep Tissue Massage","Hydra Facial","Aromatherapy Ritual","Glow Body Polish"] },{ key: "specialist", label: "Specialist", options: ["Maya","Ife","Zara"] },{ key: "date", label: "Date", type: "date" },{ key: "time", label: "Time", type: "time" },{ key: "price", label: "Price", placeholder: "₦0" },{ key: "status", label: "Status", options: ["Confirmed","Pending","In progress","Cancelled"] }] };
export const serviceConfig: CrudPageProps = { collection: "services", eyebrow: "Treatment menu", title: "Services", description: "Shape your service menu, treatment timing, availability, and pricing.", singular: "Service", filters: ["Massage","Facial","Body","Wellness","Active","Paused"], columns: [{ key: "name", label: "Service" },{ key: "category", label: "Category" },{ key: "duration", label: "Duration" },{ key: "price", label: "Price" },{ key: "bookings", label: "Bookings" },{ key: "status", label: "Status" }], fields: [{ key: "name", label: "Service name", placeholder: "Treatment name" },{ key: "category", label: "Category", options: ["Massage","Facial","Body","Wellness"] },{ key: "duration", label: "Duration", placeholder: "60 min" },{ key: "price", label: "Price", placeholder: "₦0" },{ key: "bookings", label: "Bookings", type: "number", placeholder: "0" },{ key: "status", label: "Status", options: ["Active","Paused"] }] };
export const storeConfig: CrudPageProps = { collection: "products", eyebrow: "Retail", title: "Store", description: "Monitor your spa retail collection, inventory levels, and pricing.", singular: "Product", filters: ["Body care","Bath","Face","Home","Accessories","In stock","Low stock","Out of stock"], columns: [{ key: "name", label: "Product" },{ key: "sku", label: "SKU" },{ key: "category", label: "Category" },{ key: "stock", label: "Stock" },{ key: "price", label: "Price" },{ key: "status", label: "Status" }], fields: [{ key: "name", label: "Product name", placeholder: "Product name" },{ key: "sku", label: "SKU", placeholder: "SKU-000" },{ key: "category", label: "Category", options: ["Body care","Bath","Face","Home","Accessories"] },{ key: "stock", label: "Stock", type: "number", placeholder: "0" },{ key: "price", label: "Price", placeholder: "₦0" },{ key: "status", label: "Status", options: ["In stock","Low stock","Out of stock"] }] };