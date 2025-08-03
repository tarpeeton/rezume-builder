"use client"
import { ArrowRight, Sparkles, Download, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { useTranslations } from "next-intl";

export default function Prezentation() {
  const t = useTranslations()


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            {t("badge")}
          </div>
          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              {t("headline_main")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {t("headline_gradient")}
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {t("subtext")}
              <br className="hidden sm:block" />
              {t("subtext_continue")}
            </p>
          </div>
          {/* CTA Button */}
          <div className="pt-4">
            <Button type="link" href="/auth/login" variant="default">
              <div className="flex flex-row items-center gap-2">
                {t("cta")}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Button>
          </div>
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <div className="flex  items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md border border-gray-100">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {t("feature_fast")}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md border border-gray-100">
              <Download className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">
                {t("feature_pdf")}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md border border-gray-100">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">
                {t("feature_free")}
              </span>
            </div>
          </div>
        </div>
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
