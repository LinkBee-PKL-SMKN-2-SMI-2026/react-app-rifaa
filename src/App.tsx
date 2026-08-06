import "./App.css";
import EmployeeCard from "./components/EmployeeCard";

const employees = [
  { id: 1, name: "Budi Santoso", role: "Frontend Developer", isActive: true, department: "IT" },
  { id: 2, name: "Siti Aminah", role: "UI/UX Designer", isActive: true, department: "Marketing" },
  { id: 3, name: "Agus Pratama", role: "Backend Developer", isActive: false, department: "IT" },
  { id: 4, name: "Dewi Lestari", role: "HR Specialist", isActive: true, department: "HR" },
  { id: 5, name: "Rizky Ramadhan", role: "Finance Analyst", isActive: true, department: "Finance" },
  { id: 6, name: "Putri Ayu", role: "Operations Manager", isActive: false, department: "Operations" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Daftar Pegawai PKL
      </h1>
      {/* Grid Layout dengan Tailwind */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mapping Data Array ke Komponen */}
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id} // "key" wajib ada saat melakukan map di React
            name={employee.name}
            role={employee.role}
            isActive={employee.isActive}
            department={employee.department}
          />
        ))}
      </div>
    </div>
  );
}
