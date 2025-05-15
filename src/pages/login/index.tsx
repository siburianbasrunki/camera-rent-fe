import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Login
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="contoh@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Kata Sandi
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={() => navigate("/")}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold"
          >
            Masuk
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-blue-600">
          Belum punya akun?{" "}
          <Link to="/register" className="underline font-medium">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};
