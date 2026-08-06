const departmentColors: Record<string, string> = {
    IT: "border-blue-500",
    HR: "border-pink-500",
    Finance: "border-yellow-500",
    Marketing: "border-purple-500",
    Operations: "border-emerald-500",
};

interface EmployeeProps {
    name: string;
    role: string;
    isActive: boolean;
    department: string;
}

export default function EmployeeCard({ name, role, isActive, department }: EmployeeProps) {
    const borderColor = departmentColors[department] ?? "border-gray-500";

    return (

        <div className={`border p-4 rounded-lg shadow-md bg-white ${borderColor}`}>
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600">{role}</p>
            {/* Rendering kondisional (If-Else ala React) */}
            <span className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${
            isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
            {isActive ? 'Aktif' : 'Non-Aktif'}
            </span>
            <span className="inline-block ml-2 px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-700">
            {department}
            </span>
        </div>
    );
}