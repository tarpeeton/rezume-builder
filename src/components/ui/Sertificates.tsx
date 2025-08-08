import { Award, Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { useTranslations } from "next-intl";

export const Sertificates = () => {
  const t = useTranslations()
  const {addItem , sertificates , deleteItem ,  updateItem} = useResumeStore()


  return (
    <section className="flex flex-col gap-[20px] border border-gray-300 rounded-[8px] p-2">
      <div className="flex flex-row items-center justify-between">
        <p className="flex items-center  gap-2 text-lg font-semibold text-gray-800">
          <Award className="text-yellow-500" /> {t("certificates")}
        </p>
        <button
          onClick={() => addItem("sertificates", { name: "", description: "" })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-[20px]">
        {sertificates.map((ser) => (
          <div key={ser.id}>
            <input
              placeholder={t("enterCertificateName")}
              value={ser.name}
              onChange={(e) =>
                updateItem("sertificates", ser.id, { name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <textarea
              value={ser.description}
              onChange={(e) =>
                updateItem("sertificates", ser.id, {
                  description: e.target.value,
                })
              }
              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[100px] transition-all duration-200"
              rows={4}
              placeholder={t("enterCertificateDescription")}
            />
            <div className="w-full mt-[2px] flex items-center justify-end">
              <button
                onClick={() => deleteItem("sertificates", ser.id)}
                className="w-10 h-10 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                title="O'chirish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
