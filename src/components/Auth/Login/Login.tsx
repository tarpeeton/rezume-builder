"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import ForgotPasswordModal from "@/components/Modals/ResetPassword";
import { LOGIN_ERRORS } from "@/constants/authErrors";
import { useLocale } from "next-intl";


export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error , setError] = useState(false)
  const [errCode , setErrCode] = useState("")
  const locale = useLocale()
  const lng = locale as "ru" | "uz" | "en"

  const [modalOpen, setModalOpen] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "success"
  );

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error  } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/templates`,
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        window.location.href = "/templates";
      }
    };

    checkSession();
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      setError(true);
      setErrCode(signInError.code || "error");
      setIsLoading(false);
      return;
    }

    const userId = signInData.user?.id;
    if (!userId) {
      setError(true);
      setErrCode("no_user");
      setIsLoading(false);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      setError(true);
      setErrCode("no_profile");
      setIsLoading(false);
      return;
    }
    window.location.href = "/templates";
    setIsLoading(false);
  };



  const handleResetPassword = async (forgotEmail: string) => {
    setResetLoading(true);
    setResetMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${location.origin}/auth/new-password`,
    });

    if (error) {
      setResetMessage("Xatolik: " + error.message);
      setMessageType("error");
    } else {
      setResetMessage(
        "Parolni tiklash uchun havola email manzilingizga yuborildi."
      );
      setMessageType("success");
    }
    setResetLoading(false);
  };


  const handleCloseModal = () => {
    setModalOpen(false);
    setResetMessage("");
    setResetLoading(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Xush kelibsiz
              </h1>
              <p className="text-gray-600">Hisobingizga kiring</p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full mb-6 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google orqali kirish
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">yoki</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email manzilingiz"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parolingiz"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {error && (
                <p className="my-2 text-red-500">
                  {LOGIN_ERRORS[lng][errCode]}
                </p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? "Kirish..." : "Kirish"}
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setModalOpen(true);
                  setResetMessage("");
                }}
                className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Parolni unutdingizmi?
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Hisobingiz yo'qmi?{" "}
                <Link
                  href="/auth/register"
                  className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
                >
                  Ro'yxatdan o'ting
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleResetPassword}
        isLoading={resetLoading}
        message={resetMessage}
        messageType={messageType}
      />
    </>
  );
}
