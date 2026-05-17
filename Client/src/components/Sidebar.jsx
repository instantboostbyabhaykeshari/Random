import {
  FaTasks,
  FaChartPie,
  FaUserFriends,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-[260px] bg-[#111827] border-r border-white/10 p-5 hidden md:block">

      {/* logo */}
      <div className="flex items-center gap-3 mb-10">

        <div className="bg-blue-600 p-3 rounded-2xl">
          <FaTasks className="text-white text-xl" />
        </div>

        <h1 className="text-2xl font-bold">
          TaskFlow
        </h1>

      </div>

      {/* menu */}
      <div className="flex flex-col gap-3">

        <button className="flex items-center gap-3 bg-blue-600 px-4 py-3 rounded-xl">

          <FaTasks />

          <span>Tasks</span>

        </button>

        <button className="flex items-center gap-3 hover:bg-white/10 px-4 py-3 rounded-xl transition">

          <FaChartPie />

          <span>Analytics</span>

        </button>

        <button className="flex items-center gap-3 hover:bg-white/10 px-4 py-3 rounded-xl transition">

          <FaUserFriends />

          <span>Team</span>

        </button>

      </div>

    </div>
  );
}

export default Sidebar;