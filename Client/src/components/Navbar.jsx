import { FaBell } from "react-icons/fa";

function Navbar() {
  return (
    <div className="h-[80px] border-b border-white/10 flex items-center justify-between px-6">

      {/* title */}
      <div>

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-sm text-gray-400">
          Welcome back
        </p>

      </div>

      {/* actions */}
      <div className="flex items-center gap-5">

        <button className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition">
          <FaBell />
        </button>

        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-bold">
          A
        </div>

      </div>

    </div>
  );
}

export default Navbar;