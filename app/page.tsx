import Image from "next/image";
import AdminManager from "./components/AdminManager";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">MongoDB Admin Management</h1>
        <AdminManager />
      </div>
    </div>
  );
}
