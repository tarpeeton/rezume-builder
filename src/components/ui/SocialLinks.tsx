import { useResumeStore } from "@/store/useResumeStore";
import {
  ArrowDownCircle,
  Globe,
  Instagram,
  Plus,
  Trash2,
  Link,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ICON_MAP } from "@/constants/iconMap";
import { useTranslations } from "next-intl";

const iconsList = Object.keys(ICON_MAP);

export const SocialLinksInputs = () => {
  const t = useTranslations();
  const { addItem, updateItem, socialLinks, deleteItem } = useResumeStore();

  const [openIconIndex, setOpenIconIndex] = useState<null | number>(null);
  const selectIconRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="flex flex-col gap-[25px]  lg:gap-[30px] bg-white  border border-gray-300 rounded-[8px] p-2">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Link className="text-cyan-500" /> {t("socialNetworks")}
        </p>

        <button
          type="button"
          onClick={() =>
            addItem("socialLinks", { url: "", icon: iconsList[0] || "" })
          }
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {socialLinks.map((link, index) => {
          const IconComponent = ICON_MAP[link.icon] || Globe;

          return (
            <div
              key={link.id}
              className="grid grid-cols-[1fr_1fr_auto] gap-5 items-center"
            >
              <input
                type="text"
                value={link.url || ""}
                onChange={(e) =>
                  updateItem("socialLinks", link.id, { url: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder={t("enterLink")}
              />

              <div className="relative">
                <div
                  onClick={() =>
                    setOpenIconIndex(openIconIndex === index ? null : index)
                  }
                  role="button"
                  className={`w-full flex flex-row cursor-pointer items-center justify-between px-3 py-2 rounded-md transition-all duration-200 ${
                    openIconIndex === index
                      ? "border border-blue-500"
                      : "border border-gray-300"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <ArrowDownCircle
                    className={`${
                      openIconIndex === index ? "text-blue-500 rotate-180" : ""
                    } duration-150 ease-in-out`}
                  />
                </div>

                {openIconIndex === index && (
                  <div
                    ref={selectIconRef}
                    className="absolute p-3 z-50 top-[50px] border shadow-2xl bg-gray-100 border-gray-100 rounded-2xl grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
                  >
                    {iconsList.map((iconName) => {
                      const IconBtn = ICON_MAP[iconName];
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => {
                            updateItem("socialLinks", link.id, {
                              icon: iconName,
                            });
                            setOpenIconIndex(null);
                          }}
                          className="flex items-center justify-center p-2 hover:bg-blue-500 hover:text-white rounded-md transition"
                          title={iconName}
                        >
                          <IconBtn />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => deleteItem("socialLinks", link.id)}
                title="O'chirish"
                className="w-10 h-10 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
