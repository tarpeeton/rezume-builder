"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const supabase = createClientComponentClient();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter()


  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Parollar mos kelmadi!");
      return;
    }

    if (password.length < 6) {
      alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error("Password reset error:", error.message);
      alert("Parolni yangilashda xatolik yuz berdi!");
    } else {
      setIsSuccess(true);
    }
    setIsLoading(false);
  };

 if (isSuccess) {
  window.location.href = '/auth/login'
 }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Yangi parol
            </h1>
            <p className="text-gray-600">
              Hisobingiz uchun yangi parol o'rnating
            </p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* New Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Yangi parol"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Parolni tasdiqlang"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Parol talablari:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li
                  className={`flex items-center gap-2 ${
                    password.length >= 6 ? "text-green-600" : ""
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      password.length >= 6 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  Kamida 6 ta belgi
                </li>
                <li
                  className={`flex items-center gap-2 ${
                    password === confirmPassword && password.length > 0
                      ? "text-green-600"
                      : ""
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      password === confirmPassword && password.length > 0
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  Parollar mos kelishi
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isLoading || password !== confirmPassword || password.length < 6
              }
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Yangilanmoqda..." : "Parolni yangilash"}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/auth/login"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
            >
              ← Kirishga qaytish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
