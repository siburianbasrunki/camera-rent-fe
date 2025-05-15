import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
          Daftar Akun 
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Lengkap"
            />
          </div>
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
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold"
          >
            Daftar
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-blue-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="underline font-medium">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};
