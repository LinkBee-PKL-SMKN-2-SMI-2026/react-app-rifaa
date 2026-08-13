import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "./components/VehicleCard";
import VehicleForm from "./components/VehicleForm";
import type { Vehicle } from "./types/Vehicle";

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://rent-car-pkl.linkbee.id/api/vehicles")
      .then((response) => setVehicles(response.data.data))
      .catch(() => setError("Gagal memuat data kendaraan dari server."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles((prevVehicles) => [newVehicle, ...prevVehicles]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Katalog Kendaraan
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VehicleForm onAddVehicle={handleAddVehicle} />
        <div>
          {isLoading && (
            <p className="text-gray-600 mb-4">Memuat data kendaraan...</p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
