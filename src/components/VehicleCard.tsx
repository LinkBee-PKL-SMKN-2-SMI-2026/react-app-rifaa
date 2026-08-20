import type { Vehicle } from "../types/Vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
  onDelete: (vehicle: Vehicle) => void;
}

export default function VehicleCard({ vehicle, onDelete }: VehicleCardProps) {
  return (
    <div className="relative border p-4 rounded-lg shadow-md bg-white">
      <button
        type="button"
        onClick={() => onDelete(vehicle)}
        className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded hover:bg-red-600"
      >
        Hapus
      </button>
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
