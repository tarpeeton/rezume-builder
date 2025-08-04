"use client"
import Image from "next/image"
import { useUserStore } from "@/store/userStore";
import { Link } from "@/i18n/navigation";


export const Header = () => {
  const {picture} = useUserStore()



 const fallbackImage =
   "https://ucarecdn.com/76926fd4-c068-4447-987a-3e2a6bb91523/-/scale_crop/300x300/";


  return (
    <header className="w-full bg-white ">
      <div className="lg:px-14 py-4 lg:h-14 flex flex-row items-center justify-between">
        <Link href={"/"} className="size-12">
          <Image
            src="https://ucarecdn.com/d374cc73-1bdc-474c-bc8a-a4e7ec144f8f/-/scale_crop/300x300/"
            width={100}
            height={100}
            alt="resume builder online image logo"
            quality={100}
            className="w-full h-full object-cover"
          />
        </Link>

        <button className="rounded-full size-10 overflow-hidden cursor-pointer">
          <Image
            src={picture || fallbackImage}
            width={100}
            height={100}
            alt="resume builder online image logo"
            quality={100}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
