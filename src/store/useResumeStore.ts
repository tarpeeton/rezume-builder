import { create } from "zustand";
import { nanoid } from "nanoid";
import { IUserProfileSchema } from "@/types/defeault-template";


type ArrayKeys<T> = {
  [K in keyof T]: T[K] extends Array<any> ? K : never;
}[keyof T];

type ArrayElement<T> = T extends Array<infer U> ? U : never;

interface IUseResumeStore extends IUserProfileSchema {
  updateField: <K extends keyof IUserProfileSchema>(
    key: K,
    value: IUserProfileSchema[K]
  ) => void;

  addItem: <K extends ArrayKeys<IUserProfileSchema>>(
    key: K,
    item: Omit<ArrayElement<IUserProfileSchema[K]>, "id">
  ) => void;

  updateItem: <K extends ArrayKeys<IUserProfileSchema>>(
    key: K,
    id: string,
    updatedItem: Partial<ArrayElement<IUserProfileSchema[K]>>
  ) => void;

  deleteItem: <K extends ArrayKeys<IUserProfileSchema>>(
    key: K,
    id: string
  ) => void;
}

export const useResumeStore = create<IUseResumeStore>((set) => ({
  fullName: "Kidiraliyev Rustam Rinatovich",
  position: "Frontend Developer",
  phone: "+998 90 006 02 43",
  photo: "",
  email: "tarpeetonteam@gmail.com",
  location: "Toshkent Viloyati , Yuqori Chirchiq Tumani",
  siteLink: "https://devpulse.uz",
  socialLinks: [
    { id: "0x-2xxo-x", icon: "Telegram", url: "https://t.me/tot_rustem" },
  ],
  skills: [
    { id: "1", text: "React.js" },
    { id: "2", text: "Next.js" },
    { id: "3", text: "TypeScript" },
  ],
  languages: [{ id: "01", text: "Inglis Tili", level: "C1" }],
  about: `Я фронтенд-разработчик и люблю создавать современные веб-приложения. Работаю с React и Next.js для создания интерактивных и эффективных сайтов. Постоянно стремлюсь к новым знаниям и готов работать в команде. Ценю креативность и качество в работе.`,
  workExperience: [
    {
      id: "1",
      company: "Result Agency",
      description: `В компании Result Agency я работал фронтенд-разработчиком и одновременно выполнял обязанности тимлида. Занимался созданием и поддержкой веб-приложений на React, Next.js и TypeScript. Участвовал в проектировании архитектуры и принимал технические решения. Проводил code review, помогал младшим разработчикам и делился опытом. Работал с RESTful API, backend был написан на Java. Все проекты я самостоятельно деплоил на онлайн VPS-серверы через Nginx, настраивал окружение и устанавливал SSL-сертификаты. Оптимизировал производительность, адаптивность и SEO, включая серверный рендеринг и настройку meta-тегов. Использовал Git, участвовал в процессах CI/CD и работал по Agile-методологии. Тесно взаимодействовал с дизайнерами, backend-разработчиками и менеджерами.`,
      startDate: "11.08.2022",
      endDate: "02.07.2025",
      position: "Frontend Developer",
    },
  ],
  education: [
    {
      id: "112-xx",
      name: "TATU",
      position: "Kompyuter injiniring",
      startDate: "2018",
      endDate: "2021",
    },
  ],
  sertificates: [
    {
      id: "002-2ss",
      name: "GDE",
      description:
        "Google Developer Expert (GDE) — bu Google tomonidan dunyo bo‘ylab eng yuqori darajadagi mutaxassislar va jamoatchilik liderlariga beriladigan rasmiy ekspert sertifikati va maqomdir.",
    },
  ],

  updateField: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  addItem: (key, item) =>
    set((state) => ({
      ...state,
      [key]: [
        ...state[key],
        { id: nanoid(), ...item },
      ] as IUserProfileSchema[typeof key],
    })),

  updateItem: (key, id, updatedItem) =>
    set((state) => ({
      ...state,
      [key]: state[key].map((el) =>
        el.id === id ? { ...el, ...updatedItem } : el
      ) as IUserProfileSchema[typeof key],
    })),

  deleteItem: (key, id) =>
    set((state) => ({
      ...state,
      [key]: state[key].filter(
        (el) => el.id !== id
      ) as IUserProfileSchema[typeof key],
    })),
}));
