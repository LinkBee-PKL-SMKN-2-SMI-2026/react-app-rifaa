import type { Vehicle } from "../types/Vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold text-gray-800">{vehicle.name}</h2>
      <p className="text-gray-600">{vehicle.brand}</p>
      <p className="text-gray-600">{vehicle.plateNumber}</p>
      <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-700">
        {vehicle.transmission}
      </span>
      <span className="inline-block ml-2 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700">
        {vehicle.category.name}
      </span>
    </div>
  );
}
