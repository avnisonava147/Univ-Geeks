// app/admin/(protected)/layout.tsx
import SidebarNav from "./_components/sidebar-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#FAF7F2]">
      <aside className="w-60 bg-[#1C2B3A] text-[#E5E0D5] flex flex-col">
        <div className="px-5 py-6 text-lg font-semibold text-white">UnivGeeks Admin</div>
        <SidebarNav />
        <div className="px-5 py-4 text-xs text-[#8C97A3] border-t border-white/10">Signed in as Admin</div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}