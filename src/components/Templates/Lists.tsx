import { TEMPLATE_LISTS } from "@/constants/tempLatesLists";
import Image from "next/image";
import { Eye } from "lucide-react";


export const TempLateLists = () => {
  return (
    <section className="lg:px-14">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[20px]">
        {TEMPLATE_LISTS.map((list) => (
          <div
            key={list.id}
            className="group overflow-hidden relative rounded-sm hover:border-2 hover:border-[#670ec7] lg:h-[400px] cursor-pointer"
          >
            <Image
              width={400}
              height={600}
              src={list.image}
              className="w-full transition-transform duration-300 group-hover:scale-105"
              alt={list.alt}
              quality={100}
            />

            <div className="absolute top-3 right-3  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-[#670ec7] rounded-full p-2 shadow-md ">
                <Eye className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="absolute inset-0 flex items-end mb-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-[#670ec7] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#5b06b5]">
                Tanlash
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
