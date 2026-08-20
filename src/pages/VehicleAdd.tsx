import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, API_TOKEN } from "../constants/api";

interface VehicleFormInputs {
  name: string;
  brand: string;
  plateNumber: string;
  transmission: "MANUAL" | "AUTOMATIC";
  categoryId: string;
}

const CATEGORIES = [
  { id: "43ab2065-f9eb-447f-9da5-51b21fd78057", name: "Elf" },
  { id: "c3cd4e36-8262-44b2-b45e-42608274612b", name: "Hiace" },
  { id: "38c39f36-bc42-4d60-b33e-63c31be26320", name: "MPV" },
  { id: "239c63b2-a2e8-41cf-ad50-d0dd2fc44ed8", name: "Pickup" },
  { id: "04cc14b0-6964-497a-b30f-57e37f5c26d6", name: "SUV" },
  { id: "7fdb7fdb-4a93-4c78-858b-32c6457aa15b", name: "Sedan" },
];

const buildCreatePayload = (data: VehicleFormInputs) => ({
  name: data.name,
  brand: data.brand,
  model: data.brand,
  year: new Date().getFullYear(),
  plateNumber: data.plateNumber,
  transmission: data.transmission,
  categoryId: data.categoryId,
  fuelType: "Bensin",
  seatingCapacity: 4,
  isActive: true,
});

export default function VehicleAdd() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormInputs>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<VehicleFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post(
        `${API_BASE_URL}/api/vehicles`,
        buildCreatePayload(data),
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        }
      );
      navigate("/vehicles");
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      alert(message ?? "Gagal menyimpan kendaraan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full border p-2 rounded ${hasError ? "border-red-500" : "border-gray-300"}`;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Tambah Kendaraan
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded-xl shadow-md bg-white max-w-md h-fit"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Nama Kendaraan
          </label>
          <input
            {...register("name", {
              required: "Nama kendaraan tidak boleh kosong!",
            })}
            className={inputClass(!!errors.name)}
            placeholder="Misal: Toyota Avanza"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Merek (Brand)
          </label>
          <input
            {...register("brand", { required: "Merek wajib diisi!" })}
            className={inputClass(!!errors.brand)}
            placeholder="Misal: Toyota"
          />
          {errors.brand && (
            <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nomor Plat</label>
          <input
            {...register("plateNumber", { required: "Nomor plat wajib diisi!" })}
            className={inputClass(!!errors.plateNumber)}
            placeholder="Misal: B 1234 ABC"
          />
          {errors.plateNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.plateNumber.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Transmisi</label>
          <select
            {...register("transmission", { required: "Transmisi wajib dipilih!" })}
            className={inputClass(!!errors.transmission)}
          >
            <option value="">Pilih Transmisi</option>
            <option value="MANUAL">MANUAL</option>
            <option value="AUTOMATIC">AUTOMATIC</option>
          </select>
          {errors.transmission && (
            <p className="text-red-500 text-xs mt-1">
              {errors.transmission.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select
            {...register("categoryId", { required: "Kategori wajib dipilih!" })}
            className={inputClass(!!errors.categoryId)}
          >
            <option value="">Pilih Kategori</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Menyimpan..." : "Tambah Kendaraan"}
        </button>
      </form>
    </div>
  );
}
