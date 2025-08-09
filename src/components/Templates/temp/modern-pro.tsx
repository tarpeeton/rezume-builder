"use client";
import { useRef, useState } from "react";
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
} from "lucide-react";
import { ICON_MAP } from "@/constants/iconMap";
import type { IUserProfileSchema } from "@/types/defeault-template";
import { useTranslations } from "next-intl";

interface IDefaultTempProps {
  data: IUserProfileSchema | null;
  image: string | null | undefined | File;
}

export const ModernProResumeTemplate = ({
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
        width: 1200,
        height: node.scrollHeight,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.crossOrigin = "anonymous";
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

        pdf.save(`${data?.fullName || "resume"}.pdf`);
      };
    } catch (err) {
      console.error("PDF export error:", err);
    }
  };

  const getImageSrc = () => {
    if (!image) return "/placeholder.svg?height=200&width=200";
    return typeof image === "string" ? image : URL.createObjectURL(image);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Resume Content */}
      <div
        ref={resumeRef}
        className="w-full max-w-5xl mx-auto bg-white shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-8">
            {/* Profile Section */}
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                <img
                  src={getImageSrc() || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-white">
                {data?.fullName || "Your Name"}
              </h1>
              <div className="w-16 h-1 bg-blue-400 mx-auto mb-3"></div>
              <p className="text-blue-200 font-medium text-lg">
                {data?.position || "Your Position"}
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-blue-200 uppercase tracking-wide">
                Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="break-all">{data?.phone || "Phone"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="break-all">{data?.email || "Email"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                  <span>{data?.location || "Location"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="break-all">
                    {data?.siteLink || "Website"}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-blue-200 uppercase tracking-wide">
                Skills
              </h3>
              <div className="space-y-2">
                {data?.skills?.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium"
                  >
                    {skill.text}
                  </div>
                )) || (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium">
                    Add your skills
                  </div>
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-blue-200 uppercase tracking-wide">
                Languages
              </h3>
              <div className="space-y-3">
                {data?.languages?.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-medium">{lang.text}</span>
                    <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
                      {lang.level}
                    </span>
                  </div>
                )) || (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Language</span>
                    <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
                      Level
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {data?.socialLinks && data.socialLinks.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-blue-200 uppercase tracking-wide">
                  Social
                </h3>
                <div className="space-y-3">
                  {data.socialLinks.map((item) => {
                    const IconComponent = ICON_MAP[item.icon] || Globe;
                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        <IconComponent className="text-blue-400 flex-shrink-0" />
                        <span className="text-sm break-all">{item.url}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 p-8 lg:p-12">
            {/* About Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 border-b-2 border-blue-500 pb-2 inline-block">
                About Me
              </h2>
              <p className="text-gray-600 leading-relaxed mt-6 text-base">
                {data?.about ||
                  "Write a compelling summary about yourself, your experience, and what makes you unique as a professional."}
              </p>
            </section>

            {/* Work Experience */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 border-b-2 border-green-500 pb-2 inline-block">
                Work Experience
              </h2>
              <div className="mt-8 space-y-8">
                {data?.workExperience?.map((work) => (
                  <div
                    key={work.id}
                    className="border-l-3 border-gray-200 pl-6 relative"
                  >
                    <div className="absolute -left-1.5 top-1 w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="mb-4">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {work.position}
                        </h3>
                        <span className="text-sm text-gray-500 mt-1 lg:mt-0">
                          {work.startDate} - {work.endDate}
                        </span>
                      </div>
                      <p className="text-green-600 font-medium mb-3">
                        {work.company}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {work.description}
                      </p>
                    </div>
                  </div>
                )) || (
                  <div className="border-l-3 border-gray-200 pl-6 relative">
                    <div className="absolute -left-1.5 top-1 w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Your Position
                      </h3>
                      <p className="text-green-600 font-medium mb-3">
                        Company Name
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        Describe your role and achievements here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Education */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-1 border-b-2 border-purple-500 pb-2 inline-block">
                Education
              </h2>
              <div className="mt-8 space-y-6">
                {data?.education?.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-l-4 border-purple-500 pl-6 py-2"
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.position}
                      </h3>
                      <span className="text-sm text-gray-500 mt-1 lg:mt-0">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-purple-600 font-medium">{edu.name}</p>
                  </div>
                )) || (
                  <div className="border-l-4 border-purple-500 pl-6 py-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Your Degree
                    </h3>
                    <p className="text-purple-600 font-medium">
                      Institution Name
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Certificates */}
            {data?.sertificates && data.sertificates.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-1 border-b-2 border-orange-500 pb-2 inline-block">
                  Certificates
                </h2>
                <div className="mt-8 space-y-4">
                  {data.sertificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="border-l-4 border-orange-500 pl-6 py-3"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-5xl mx-auto px-8 py-6 flex flex-col sm:flex-row gap-4 justify-end">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 px-6 py-3 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md"
        >
          <Eye size={18} />
          Preview
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg transform hover:scale-105"
        >
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white w-full max-w-6xl max-h-[90vh] overflow-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-800">
                Resume Preview
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
            <div className="p-6">
              <div
                className="transform scale-75 origin-top"
                dangerouslySetInnerHTML={{
                  __html: resumeRef.current?.innerHTML || "",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
