import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  // logout handler
  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="p-10">

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;