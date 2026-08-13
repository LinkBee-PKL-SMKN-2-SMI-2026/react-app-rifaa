import { useForm, type SubmitHandler } from "react-hook-form";
import type { Vehicle } from "../types/Vehicle";

interface VehicleFormInputs {
  name: string;
  brand: string;
  plateNumber: string;
  transmission: "MANUAL" | "AUTOMATIC";
  category: string;
}

interface VehicleFormProps {
  onAddVehicle: (newVehicle: Vehicle) => void;
}

const buildNewVehicle = (data: VehicleFormInputs): Vehicle => {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: data.name,
    brand: data.brand,
    model: data.brand,
    year: new Date().getFullYear(),
    plateNumber: data.plateNumber,
    categoryId: "",
    transmission: data.transmission,
    fuelType: "-",
    seatingCapacity: 0,
    imageUrl: null,
    isActive: true,
    createdAt: now,
    updatedAt: now,
    category: { id: "", name: data.category },
  };
};

export default function VehicleForm({ onAddVehicle }: VehicleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormInputs>();

  const onSubmit: SubmitHandler<VehicleFormInputs> = (data) => {
    onAddVehicle(buildNewVehicle(data));
    reset();
  };

  const inputClass = (hasError: boolean) =>
    `w-full border p-2 rounded ${hasError ? "border-red-500" : "border-gray-300"}`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border rounded-xl shadow-md bg-white max-w-md h-fit"
    >
      <h2 className="text-xl font-bold mb-4">Tambah Kendaraan Sementara</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nama Kendaraan</label>
        <input
          {...register("name", { required: "Nama kendaraan tidak boleh kosong!" })}
          className={inputClass(!!errors.name)}
          placeholder="Misal: Toyota Avanza"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Merek (Brand)</label>
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
          <p className="text-red-500 text-xs mt-1">{errors.plateNumber.message}</p>
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
          <p className="text-red-500 text-xs mt-1">{errors.transmission.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Kategori</label>
        <input
          {...register("category", { required: "Kategori wajib diisi!" })}
          className={inputClass(!!errors.category)}
          placeholder="Misal: SUV"
        />
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
      >
        Tambah Kendaraan
      </button>
    </form>
  );
}
