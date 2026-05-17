function Login() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-[400px]">
        
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Enter email"
            className="p-3 rounded-lg bg-slate-700 outline-none"
          />

          <input
            type="password"
            placeholder="Enter password"
            className="p-3 rounded-lg bg-slate-700 outline-none"
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;