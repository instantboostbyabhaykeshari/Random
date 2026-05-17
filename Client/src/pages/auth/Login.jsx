import { motion } from "framer-motion";
import { FaTasks } from "react-icons/fa";

function Login() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">

      {/* background blur */}
      <div className="absolute w-[300px] h-[300px] bg-blue-500 rounded-full blur-[120px] opacity-20 top-10 left-10"></div>

      <div className="absolute w-[300px] h-[300px] bg-purple-500 rounded-full blur-[120px] opacity-20 bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/10 border border-white/10 backdrop-blur-lg p-8 rounded-3xl w-full max-w-md shadow-2xl"
      >

        {/* logo */}
        <div className="flex items-center gap-3 justify-center mb-6">

          <div className="bg-blue-600 p-3 rounded-2xl">
            <FaTasks className="text-white text-2xl" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            TaskFlow
          </h1>

        </div>

        <p className="text-gray-300 text-center mb-8">
          Manage your tasks smarter and faster
        </p>

        {/* form */}
        <form className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 border border-white/10 p-4 rounded-xl outline-none text-white placeholder:text-gray-400 focus:border-blue-500 transition"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="bg-white/10 border border-white/10 p-4 rounded-xl outline-none text-white placeholder:text-gray-400 focus:border-blue-500 transition"
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-4 rounded-xl font-semibold text-white shadow-lg hover:scale-[1.02]"
          >
            Login
          </button>

        </form>

        {/* footer */}
        <p className="text-center text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <span className="text-blue-400 cursor-pointer">
            Register
          </span>
        </p>

      </motion.div>
    </div>
  );
}

export default Login;