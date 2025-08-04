"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Header } from "./Header"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { Banner } from "./Banner";
import { TempLateLists } from "./Lists";

export const MainTemplates = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);


 useEffect(() => {
   const saveProfile = async () => {
     const {
       data: { session },
     } = await supabase.auth.getSession();

     const metadata = session?.user?.user_metadata;

     if (metadata) {
       setUser({
         fullName: metadata.full_name || "",
         email: session.user.email || "",
         name: metadata.name || "",
         picture: metadata.avatar_url || metadata.picture || "",
       });
     } else {
       console.warn("⚠️ Foydalanuvchi metadata topilmadi");
     }
   };

   saveProfile();
 }, [supabase, router, setUser]);


  return (
    <main>
      {/* header */}
      <Header />
      <div className="bg-slate-50">
        <Banner />
        <TempLateLists />
      </div>
    </main>
  );
}
