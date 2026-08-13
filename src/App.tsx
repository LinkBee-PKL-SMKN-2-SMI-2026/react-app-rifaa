import "./App.css";
import { useState } from "react";
import EmployeeCard from "./components/EmployeeCard";
import EmployeeForm from "./components/EmployeeForm";
import type { Employee } from "./types/Employee";

const initialEmployees: Employee[] = [
  { id: 1, name: "Budi Santoso", role: "Frontend Developer", isActive: true, department: "IT" },
  { id: 2, name: "Siti Aminah", role: "UI/UX Designer", isActive: true, department: "Marketing" },
  { id: 3, name: "Agus Pratama", role: "Backend Developer", isActive: false, department: "Operations" },
  { id: 4, name: "Dewi Lestari", role: "HR Specialist", isActive: true, department: "HR" },
  { id: 5, name: "Rizky Ramadhan", role: "Finance Analyst", isActive: true, department: "Finance" },
  { id: 6, name: "Putri Ayu", role: "Operations Manager", isActive: false, department: "OB" },
];

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Daftar Pegawai PKL
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployeeForm onAddEmployee={handleAddEmployee} />
        {/* Grid Layout dengan Tailwind */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mapping Data Array ke Komponen */}
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              name={employee.name}
              role={employee.role}
              isActive={employee.isActive}
              department={employee.department}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
