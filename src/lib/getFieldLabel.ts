import { useTranslations } from "next-intl";

export const getFieldLabel = (fieldName: string): string => {
  const t = useTranslations()
  console.log(t , 't')
  const labelMap: Record<string, string> = {
    fullName: `${t("fullName")}`,
    position: `${t("position")}`,
    title: "Sarlavha",
    phone: `${t("phone")}`,
    email: "Email",
    location: `${t("address")}`,
    siteLink: `${t("website")}`,
    about: `${t("aboutMe")}`,
  };
  return labelMap[fieldName] || fieldName;
};

export const getFieldPlaceholder = (fieldName: string): string => {
  const t = useTranslations()
  console.log(t , 't')
  const labelMap: Record<string, string> = {
    fullName: `${t("enterFullName")}`,
    position: `${t("enterPosition")}`,
    phone: `${t("enterPhone")}`,
    email: `${t("enterEmail")}`,
    location: `${t("enterAddress")}`,
    siteLink: `${t("enterWebsite")}`,
    about: `${t("enterAboutMe")}`,
  };
  return labelMap[fieldName] || fieldName;
};
