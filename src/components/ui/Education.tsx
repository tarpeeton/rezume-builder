import { useResumeStore } from "@/store/useResumeStore";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export const Education = () => {
  const t = useTranslations()
  const { education, addItem, updateItem, deleteItem } = useResumeStore();



  return (
    <section className="flex flex-col gap-[20px]  border border-gray-300 rounded-[8px] p-2">
      <div className="flex flex-row items-center justify-between">
        <p className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <GraduationCap className="text-green-500" />
          {t("education")}
        </p>
        <button
          onClick={() =>
            addItem("education", {
              name: "",
              startDate: "",
              endDate: "",
              position: "",
            })
          }
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-[20px]">
        {education.map((edu) => (
          <div key={edu.id}>
            {/* osnovnoy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
              <input
                onChange={(e) =>
                  updateItem("education", edu.id, { name: e.target.value })
                }
                placeholder={t("enterSchoolName")}
                value={edu.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                onChange={(e) =>
                  updateItem("education", edu.id, { position: e.target.value })
                }
                placeholder={t("enterFaculty")}
                value={edu.position}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="text"
                value={edu.startDate || ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (/^\d{0,4}$/.test(val)) {
                    updateItem("education", edu.id, { startDate: val });
                  }
                }}
                placeholder={t("startYear")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="text"
                value={edu.endDate || ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (/^\d{0,4}$/.test(val)) {
                    updateItem("education", edu.id, { endDate: val });
                  }
                }}
                placeholder={t("endYear")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="w-full mt-[2px] flex items-center justify-end">
              <button
                onClick={() => deleteItem("education", edu.id)}
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
