"use client";

import React, { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import { ICON_MAP } from "@/constants/iconMap";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  User,
  Globe,
  Eye,
  Download,
} from "lucide-react";

import { IUserProfileSchema } from "@/types/defeault-template";
import { useTranslations } from "next-intl";

interface IDefaultTempProps {
  data: IUserProfileSchema | null;
  image: string | null | undefined | File;
}

export const DefaultTemplate = ({ data, image }: IDefaultTempProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const t = useTranslations()
  const [showPreview, setShowPreview] = useState(false);

  const handleDownloadPDF = async () => {
    const node = resumeRef.current;
    if (!node) return;

    try {
      const dataUrl = await htmlToImage.toPng(node, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const pxToMm = 0.264583;
        const imgWidthMm = img.width * pxToMm;
        const imgHeightMm = img.height * pxToMm;
        const ratio = Math.min(pdfWidth / imgWidthMm, pdfHeight / imgHeightMm);
        const finalWidth = imgWidthMm * ratio;
        const finalHeight = imgHeightMm * ratio;
        const x = 0;
        const y = 0;
        pdf.addImage(dataUrl, "PNG", x, y, finalWidth, finalHeight);
        pdf.save("resume.pdf");
      };
    } catch (err) {
      console.error("PDF export error:", err);
    }
  };

  return (
    <div>
      {/* Asosiy Resume kontenti */}
      <div ref={resumeRef} className="select-none">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
          <div className="bg-slate-800 text-white p-4 lg:col-span-1 overflow-hidden wrap-anywhere">
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white">
                <img
                  src={
                    image
                      ? typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                      : "https://ucarecdn.com/cc2011b4-d5d8-46b9-b902-e7fced77d9db/-/preview/225x225/"
                  }
                  alt="Profil rasmi"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <h1 className="text-2xl font-bold mb-2">{data?.fullName}</h1>
              <p className="text-slate-300 text-lg">{data?.position}</p>
            </div>

            <div className="mb-8 wrap-anywhere overflow-hidden">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <User className="size-[20px] min-w-[20px] mr-2" />
               {t("contact")}
              </h2>
              <div className="space-y-3 w-full wrap-break-word">
                <div className="flex items-center">
                  <Phone className="size-[20px]  mr-3 min-w-[20px] text-slate-300" />
                  <span className="text-sm w-full whitespace-normal ">
                    {data?.phone}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="size-[20px] mr-3 min-w-[20px] text-slate-300" />
                  <span className="text-sm w-full whitespace-normal ">
                    {data?.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="size-[20px] min-w-[20px] mr-3 text-slate-300" />
                  <span className="text-sm w-full whitespace-normal ">
                    {data?.location}
                  </span>
                </div>
                <div className="flex items-center w-full">
                  <Globe className="size-[20px] min-w-[20px] mr-3 text-slate-300" />
                  <p className="text-sm text-wrap w-full whitespace-normal ">
                    {data?.siteLink}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t("socialNetworks")}</h2>
              <div className="space-y-3">
                {data?.socialLinks.map((item) => {
                  const IconComponent = ICON_MAP[item.icon] || Globe;
                  return (
                    <div key={item.id} className="flex items-center">
                      <IconComponent className="size-[20px] min-w-[20px] mr-3 text-slate-300" />
                      <span className="text-sm">{item.url}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">{t("skills")}</h2>
              <div className="space-y-3">
                {data?.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{skill.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">{t("languages")}</h2>
              <div className="space-y-2">
                {data?.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="text-sm">{lang.text}</span>
                    <span className="text-sm text-slate-300">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-8 ">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                {t("aboutMe")}
              </h2>
              <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                {data?.about}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 pb-2 flex items-center">
                <BriefcaseBusiness className="w-6 h-6 mr-2" />
                {t("workExperience")}
              </h2>
              <div className="space-y-6">
                {data?.workExperience.map((work) => (
                  <div
                    key={work.id}
                    className="border-l-4 border-blue-500 pl-6 relative"
                  >
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-2 top-0"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {work.position}
                      </h3>
                      <span className="text-sm text-slate-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {work.startDate} - {work.endDate}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-2">
                      {work.company}
                    </p>
                    <p className="text-slate-600 text-sm space-y-1">
                      {work.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 pb-2 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2" />
                {t("education")}
              </h2>
              <div className="space-y-4">
                {data?.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-l-4 border-green-500 pl-6 relative"
                  >
                    <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-2 top-0"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-800">
                        {edu.position}
                      </h3>
                      <span className="text-sm text-slate-500 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-green-600 font-medium mb-2">
                      {edu.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 pb-2 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                {t("certificates")}
              </h2>
              <div className="space-y-3">
                {data?.sertificates.map((ser) => (
                  <div
                    key={ser.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {ser.name}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {ser.description}
                      </p>
                    </div>
                    <Award className="w-5 h-5 min-w-5 min-h-5 max-w-5 max-h-5 text-yellow-500" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Tugmalar */}
      <div className="mx-auto mt-6 flex flex-row gap-4 justify-end">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-2 border border-blue-600 hover:bg-blue-700  hover:text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors shadow-lg"
        >
          <Eye className="w-5 h-5" />
          {t("preview")}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer shadow-lg"
        >
          <Download className="w-5 h-5" />
          {t("download")}
        </button>
      </div>

      {/* Preview modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
            <div
              className="overflow-auto"
              dangerouslySetInnerHTML={{
                __html: resumeRef.current?.innerHTML || "",
              }}
            />
            <button
              onClick={() => setShowPreview(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
