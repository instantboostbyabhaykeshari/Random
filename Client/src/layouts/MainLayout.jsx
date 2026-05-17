import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex bg-[#0f172a] text-white min-h-screen">

      {/* sidebar */}
      <Sidebar />

      {/* main content */}
      <div className="flex-1 flex flex-col">

        {/* navbar */}
        <Navbar />

        {/* page content */}
        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default MainLayout;