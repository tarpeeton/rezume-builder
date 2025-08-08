import { useResumeStore } from "@/store/useResumeStore";
import { BookUser } from "lucide-react";
import { useTranslations } from "next-intl";

export const UserAbout = () => {
  const t = useTranslations()
  const { about, updateField } = useResumeStore();

  return (
    <section className="flex flex-col gap-5  border border-gray-300 rounded-[8px] p-2">
      <p className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <BookUser className="text-yellow-500" /> {t("aboutMe")}
      </p>

      <textarea
        value={about}
        onChange={(e) => updateField("about", e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[100px] transition-all duration-200"
        rows={4}
        placeholder={t("enterAboutMe")}
      />
    </section>
  );
};
