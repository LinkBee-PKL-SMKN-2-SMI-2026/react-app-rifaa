export interface VehicleCategory {
  id: string;
  name: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  categoryId: string;
  transmission: "MANUAL" | "AUTOMATIC";
  fuelType: string;
  seatingCapacity: number;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category: VehicleCategory;
}
