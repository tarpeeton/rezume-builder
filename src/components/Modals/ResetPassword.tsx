"use client";
import { useState } from "react";
import { X, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { ForgotPasswordModalProps } from "@/types/ResetModal";







export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  message = "",
  messageType = "success",
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    }
  };

  const handleClose = () => {
    setEmail("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
            aria-label="Modalni yopish"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Parolni tiklash
              </h2>
              <p className="text-gray-600 text-sm">
                Email manzilingizni kiriting va biz sizga parolni tiklash
                havolasini yuboramiz
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Tiklash havolasini yuborish
                  </>
                )}
              </button>
            </form>

            {/* Message */}
            {message && (
              <div
                className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
                  messageType === "success"
                    ? "bg-green-50 border border-green-200"
                    : messageType === "error"
                    ? "bg-red-50 border border-red-200"
                    : "bg-blue-50 border border-blue-200"
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {messageType === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : messageType === "error" ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <Mail className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p
                  className={`text-sm font-medium ${
                    messageType === "success"
                      ? "text-green-800"
                      : messageType === "error"
                      ? "text-red-800"
                      : "text-blue-800"
                  }`}
                >
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
