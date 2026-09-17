import SideNav from '@/app/ui/dashboard/sidenav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-4 md:overflow-y-auto md:p-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}