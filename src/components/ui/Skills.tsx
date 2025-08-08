import { Wrench, Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { useTranslations } from "next-intl";


export const Skills = () => {
  const t = useTranslations()
  const { skills, addItem, updateItem, deleteItem } = useResumeStore();

  return (
    <section className="flex flex-col gap-[25px]  lg:gap-[30px] bg-white  border border-gray-300 rounded-[8px] p-2">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Wrench className="text-pink-500" /> {t("skills")}
        </p>

        <button
          onClick={() => addItem("skills", { text: "" })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {skills.map((item) => (
          <div key={item.id} className="relative">
            <input
              onChange={(e) =>
                updateItem("skills", item.id, { text: e.target.value })
              }
              value={item.text || ""}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />

            <button
              onClick={() => deleteItem("skills", item.id)}
              className="text-red-500 bg-white z-50 absolute right-1 top-1 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1"
              title="O'chirish"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
