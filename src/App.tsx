import "./App.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "./components/VehicleCard";
import VehicleForm from "./components/VehicleForm";
import { API_BASE_URL, API_TOKEN } from "./constants/api";
import type { Vehicle } from "./types/Vehicle";

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/vehicles`);
      setVehicles(response.data.data);
      setError("");
    } catch {
      setError("Gagal memuat data kendaraan dari server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch on mount; setState only runs after async request
    fetchVehicles();
  }, [fetchVehicles]);

  const handleDeleteVehicle = async (vehicle: Vehicle) => {
    if (!window.confirm(`Hapus kendaraan "${vehicle.name}"?`)) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/vehicles/${vehicle.id}`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      await fetchVehicles();
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      alert(message ?? "Gagal menghapus kendaraan.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Katalog Kendaraan
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VehicleForm onSuccess={fetchVehicles} />
        <div>
          {isLoading && (
            <p className="text-gray-600 mb-4">Memuat data kendaraan...</p>
          )}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onDelete={handleDeleteVehicle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
