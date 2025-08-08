import { useResumeStore } from "@/store/useResumeStore";
import { ArrowDownCircle, Languages, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export const LangugageSkill = () => {

  const t = useTranslations()
  const { updateItem, addItem, languages, deleteItem } = useResumeStore();

  const [openIconIndex, setOpenIconIndex] = useState<null | number>(null);
  const selectIconRef = useRef<HTMLDivElement>(null);

  const handleIconStatus = (index: number) => setOpenIconIndex(index);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectIconRef.current &&
        !selectIconRef.current.contains(event.target as Node)
      ) {
        setOpenIconIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const levels = ["A1", "A2", "B1", "B2" , "C1" , "C2"];

  return (
    <section className="flex flex-col gap-[25px]  lg:gap-[30px] bg-white  border border-gray-300 rounded-[8px] p-2">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Languages className="text-blue-500" /> {t("languages")}
        </p>

        <button
          type="button"
          onClick={() => addItem("languages", { text: "", level: "" })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-[20px]">
        {languages.map((lang, index) => (
          <div key={lang.id} className="grid grid-cols-[1fr_1fr_auto] gap-5">
            <input
              value={lang.text || ""}
              onChange={(e) =>
                updateItem("languages", lang.id, { text: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />

            <div className="relative">
              <div
                onClick={() => handleIconStatus(index)}
                role="button"
                className={`w-full flex flex-row cursor-pointer items-center justify-between px-3 py-2 rounded-md transition-all duration-200 ${
                  openIconIndex === index
                    ? "border border-blue-500"
                    : "border border-gray-300"
                }`}
              >
                {lang.level
                ? lang.level
                : "Select Lang Level"}
                <ArrowDownCircle
                  className={`${
                    openIconIndex === index ? "text-blue-500 rotate-180" : ""
                  } duration-150 ease-in-out`}
                />
              </div>

              {openIconIndex === index && (
                <div
                  ref={selectIconRef}
                  className="absolute p-3 z-50 items-center gap-[15px] top-[50px] border shadow-2xl bg-gray-100 border-gray-100 rounded-2xl grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                >
                  {levels.map((levelOption) => (
                    <button
                      key={levelOption}
                      type="button"
                      onClick={() => {
                        updateItem("languages", lang.id, {
                          level: levelOption,
                        });
                        setOpenIconIndex(null);
                      }}
                      className="hover:bg-blue-500 hover:text-white rounded-md px-2 py-1 transition"
                    >
                      {levelOption}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => deleteItem("languages", lang.id)}
              title="O'chirish"
              className="w-10 h-10 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
