"use client";
import React, { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
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
import { ICON_MAP } from "@/constants/iconMap";
import { IUserProfileSchema } from "@/types/defeault-template";
import { useTranslations } from "next-intl";

interface IDefaultTempProps {
  data: IUserProfileSchema | null;
  image: string | null | undefined | File;
}

export const ModernPlusResumeTemplate = ({
  data,
  image,
}: IDefaultTempProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const [showPreview, setShowPreview] = useState(false);

  const handleDownloadPDF = async () => {
    const node = resumeRef.current;
    if (!node) return;

    try {
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
          pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
        } else {
          let position = 0;
          let heightLeft = imgHeight;

          while (heightLeft > 0) {
            pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
            position -= pdfHeight;
            if (heightLeft > 0) pdf.addPage();
          }
        }
        pdf.save("resume.pdf");
      };
    } catch (err) {
      console.error("PDF export error:", err);
    }
  };

  return (
    <div className="bg-white text-black">
      {/* Resume Content */}
      <div ref={resumeRef} className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={
                image
                  ? typeof image === "string"
                    ? image
                    : URL.createObjectURL(image)
                  : "https://ucarecdn.com/f3d3feb4-6ba9-468a-bf79-0846bad15eeb/-/preview/1000x896/"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-2">{data?.fullName}</h1>
            <p className="text-lg text-gray-700 mb-4">{data?.position}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                {data?.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {data?.email}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {data?.location}
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} />
                {data?.siteLink}
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <section className="p-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User size={18} /> {t("aboutMe")}
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {data?.about}
          </p>
        </section>

        {/* Skills */}
        <section className="p-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star size={18} /> {t("skills")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {data?.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {skill.text}
              </span>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="p-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe size={18} /> {t("languages")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data?.languages.map((lang) => (
              <div
                key={lang.id}
                className="flex justify-between items-center py-2"
              >
                <span className="text-sm font-medium">{lang.text}</span>
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="p-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe size={18} /> {t("socialNetworks")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {data?.socialLinks.map((item) => {
              const IconComponent = ICON_MAP[item.icon] || Globe;
              return (
                <div key={item.id} className="flex items-center gap-3 py-2">
                  <IconComponent className="text-gray-600" />
                  <span className="text-sm break-all">{item.url}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certificates */}
        <section className="p-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award size={18} /> {t("certificates")}
          </h2>
          <div className="space-y-4">
            {data?.sertificates.map((cert) => (
              <div key={cert.id} className="py-2">
                <h3 className="font-medium text-sm mb-1">{cert.name}</h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience */}
        <section className="p-8">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <BriefcaseBusiness size={18} /> {t("workExperience")}
          </h2>
          <div className="space-y-6">
            {data?.workExperience.map((work) => (
              <div key={work.id} className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-base">{work.position}</h3>
                  <span className="text-sm flex items-center gap-1 text-gray-600 ml-4">
                    <Calendar size={12} /> {work.startDate} - {work.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-800 font-medium mb-2">
                  {work.company}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {work.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="p-8">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <GraduationCap size={18} /> {t("education")}
          </h2>
          <div className="space-y-4">
            {data?.education.map((edu) => (
              <div key={edu.id} className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-base">{edu.position}</h3>
                  <span className="text-sm flex items-center gap-1 text-gray-600 ml-4">
                    <Calendar size={12} /> {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-800 font-medium">{edu.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Buttons */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-6 flex flex-col sm:flex-row gap-3 justify-end">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-2 border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
        >
          <Eye size={16} /> {t("preview")}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 hover:bg-gray-900 transition"
        >
          <Download size={16} /> {t("download")}
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-auto rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-300 flex justify-between items-center">
              <h2 className="text-lg font-bold">Resume Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="bg-black text-white px-3 py-1 hover:bg-gray-900"
              >
                {t("close")}
              </button>
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
