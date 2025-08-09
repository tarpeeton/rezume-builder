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
  Star,
} from "lucide-react";
import { IUserProfileSchema } from "@/types/defeault-template";
import { useTranslations } from "next-intl";




interface IDefaultTempProps {
  data: IUserProfileSchema | null;
  image: string | null | undefined | File;
}

export const ModernResumeTemplate = ({ data, image }: IDefaultTempProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const [showPreview, setShowPreview] = useState(false);

  const handleDownloadPDF = async () => {
    const node = resumeRef.current;
    if (!node) return;


    try {
      // HTML-ni yuqori sifatli PNG-ga aylantirish
      const dataUrl = await htmlToImage.toPng(node, {
        backgroundColor: "#ffffff",
        pixelRatio: 3,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const imgWidth = pdfWidth;
        const imgHeight = (img.height * pdfWidth) / img.width;

        if (imgHeight <= pdfHeight) {
          // Bitta sahifaga sig‘sa
          pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
        } else {
          // Bir necha sahifaga bo‘lish
          let position = 0;
          let heightLeft = imgHeight;

          let pageData = dataUrl;

          while (heightLeft > 0) {
            pdf.addImage(pageData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
            position -= pdfHeight;

            if (heightLeft > 0) {
              pdf.addPage();
            }
          }
        }

        pdf.save("resume.pdf");
      };
    } catch (err) {
      console.error("PDF export error:", err);
    }
  };

  return (
    <div>
      {/* Main Resume Content */}
      <div ref={resumeRef} className="select-none bg-gray-50 w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 sm:p-6 md:p-8">
          <div className=" lg:w-full mx-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <img
                  src={
                    image
                      ? typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                      : "https://ucarecdn.com/cc2011b4-d5d8-46b9-b902-e7fced77d9db/-/preview/225x225/"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  {data?.fullName}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-emerald-100 mb-4">
                  {data?.position}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                  <div className="flex items-center justify-center sm:justify-start">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{data?.phone}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{data?.email}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{data?.location}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{data?.siteLink}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Column Content */}
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
          {/* About Me Section */}
          <section className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border border-gray-200">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 flex items-center">
              <User className="w-4 h-4 md:w-5 md:h-5 mr-2 text-emerald-600" />
              {t("aboutMe")}
            </h2>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
              {data?.about}
            </p>
          </section>

          {/* Skills Section */}
          <section className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border border-gray-200">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 flex items-center">
              <Star className="w-4 h-4 md:w-5 md:h-5 mr-2 text-emerald-600" />
              {t("skills")}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data?.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium hover:bg-emerald-200 transition-colors"
                >
                  {skill.text}
                </span>
              ))}
            </div>
          </section>

          {/* Languages Section */}
          <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Globe className="w-5 h-5 md:w-6 md:h-6 mr-2 text-emerald-600" />
              {t("languages")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data?.languages.map((lang) => (
                <div
                  key={lang.id}
                  className="flex justify-between items-center bg-gray-50 rounded-lg p-3"
                >
                  <span className="text-gray-700 font-medium text-sm md:text-base">
                    {lang.text}
                  </span>
                  <span className="text-xs md:text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Social Networks Section */}
          <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Globe className="w-5 h-5 md:w-6 md:h-6 mr-2 text-emerald-600" />
              {t("socialNetworks")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data?.socialLinks.map((item) => {
                const IconComponent = ICON_MAP[item.icon] || Globe;
                return (
                  <div
                    key={item.id}
                    className="flex items-center bg-gray-50 rounded-lg p-3"
                  >
                    <IconComponent className="w-4 h-4 mr-3 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-gray-600 break-all">
                      {item.url}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Certificates Section - Before Experience */}
          <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Award className="w-5 h-5 md:w-6 md:h-6 mr-2 text-amber-500" />
              {t("certificates")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.sertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {cert.description}
                      </p>
                    </div>
                    <Award className="w-5 h-5 text-amber-500 flex-shrink-0 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <BriefcaseBusiness className="w-5 h-5 md:w-6 md:h-6 mr-2 text-emerald-600" />
              {t("workExperience")}
            </h2>
            <div className="space-y-6">
              {data?.workExperience.map((work, index) => (
                <div key={work.id} className="relative">
                  {index !== data.workExperience.length - 1 && (
                    <div className="absolute left-4 top-10 w-0.5 h-full bg-emerald-200"></div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 lg:mb-0">
                            {work.position}
                          </h3>
                          <span className="text-xs md:text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded flex items-center w-fit">
                            <Calendar className="w-3 h-3 mr-1" />
                            {work.startDate} - {work.endDate}
                          </span>
                        </div>
                        <p className="text-emerald-700 font-medium mb-3 text-sm md:text-base">
                          {work.company}
                        </p>
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                          {work.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 mr-2 text-blue-600" />
              {t("education")}
            </h2>
            <div className="space-y-4">
              {data?.education.map((edu, index) => (
                <div key={edu.id} className="relative">
                  {index !== data.education.length - 1 && (
                    <div className="absolute left-4 top-10 w-0.5 h-full bg-blue-200"></div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 lg:mb-0">
                            {edu.position}
                          </h3>
                          <span className="text-xs md:text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded flex items-center w-fit">
                            <Calendar className="w-3 h-3 mr-1" />
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        <p className="text-blue-700 font-medium text-sm md:text-base">
                          {edu.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
        >
          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          {t("preview")}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          {t("download")}
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/60  flex items-center justify-center z-50 p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white z-50 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Resume Preview
                </h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base"
                >
                  {t("close")}
                </button>
              </div>
            </div>
            <div
              className="p-4"
              dangerouslySetInnerHTML={{
                __html: resumeRef.current?.innerHTML || "",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
