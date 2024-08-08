import Dashboard from "./Dashboard";
import Header from "./Header";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 p-4">
        <Dashboard />
      </main>
    </div>
  );
}