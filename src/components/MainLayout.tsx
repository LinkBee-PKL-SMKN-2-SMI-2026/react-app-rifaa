import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? "bg-white/15 text-white"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full">
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-lg font-bold tracking-wide">RentCar App</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavLink to="/vehicles" className={linkClass}>
            Katalog Kendaraan
          </NavLink>
          <NavLink to="/vehicles/new" className={linkClass}>
            Tambah Kendaraan
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
