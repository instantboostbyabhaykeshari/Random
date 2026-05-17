import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

function Register() {
  const navigate = useNavigate();

  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // loading state
  const [loading, setLoading] = useState(false);

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // register submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/register",
        formData
      );

      toast.success(data.message);

      navigate("/");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">

      <div className="bg-slate-800 p-8 rounded-xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-700 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-700 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-700 outline-none"
          />

          <button
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition"
          >
            {
              loading
                ? "Creating..."
                : "Register"
            }
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;