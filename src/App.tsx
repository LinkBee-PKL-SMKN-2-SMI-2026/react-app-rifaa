import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import VehicleAdd from "./pages/VehicleAdd";
import VehicleList from "./pages/VehicleList";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/new" element={<VehicleAdd />} />
      </Route>
      <Route path="/" element={<Navigate to="/vehicles" replace />} />
    </Routes>
  );
}
