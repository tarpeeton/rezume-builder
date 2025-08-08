import { useResumeStore } from "@/store/useResumeStore";
import { BriefcaseBusiness, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";


export const WorkExprience = () => {
    const { workExperience, addItem, updateItem, deleteItem } = useResumeStore();
  const t = useTranslations()


function formatDateToDDMMYYYY(dateString: string) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
}

function formatDateToYYYYMMDD(dateString: string) {
  if (!dateString) return "";
  const [day, month, year] = dateString.split(".");
  if (!day || !month || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}


  return (
    <section className="flex flex-col gap-[20px]  border border-gray-300 rounded-[8px] p-2">
      <div className="w-full flex flex-row items-center justify-between">
        <p className="flex items-center flex-row gap-2 text-lg font-semibold text-gray-800">
          <BriefcaseBusiness className="text-blue-500" />
          {t("workExperience")}
        </p>
        <button
          onClick={() =>
            addItem("workExperience", {
              position: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {workExperience.map((work) => (
          <div key={work.id}>
            {/* osnovnoy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
              <input
                onChange={(e) =>
                  updateItem("workExperience", work.id, {
                    position: e.target.value,
                  })
                }
                placeholder={t("enterPosition")}
                value={work.position}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                placeholder={t("enterCompanyName")}
                value={work.company}
                onChange={(e) =>
                  updateItem("workExperience", work.id, {
                    company: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="date"
                value={formatDateToYYYYMMDD(work.startDate)}
                onChange={(e) =>
                  updateItem("workExperience", work.id, {
                    startDate: formatDateToDDMMYYYY(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="date"
                value={formatDateToYYYYMMDD(work.endDate)}
                onChange={(e) =>
                  updateItem("workExperience", work.id, {
                    endDate: formatDateToDDMMYYYY(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <textarea
              value={work.description}
              onChange={(e) =>
                updateItem("workExperience", work.id, {
                  description: e.target.value,
                })
              }
              className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[100px] transition-all duration-200"
              rows={4}
              placeholder={t("writeDescription")}
            />
            <div className="w-full flex items-center justify-end">
              <button
                onClick={() => deleteItem("workExperience", work.id)}
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
}
