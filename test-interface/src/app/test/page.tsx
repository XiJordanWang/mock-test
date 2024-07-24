import Header from "./header";
import Reading from "./reading";

export default function Page() {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header className="flex-shrink-0" />
      <Reading className="flex-grow overflow-auto" />
    </div>
  );
}