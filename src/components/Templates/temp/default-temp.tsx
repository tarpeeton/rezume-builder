"use client";

import { useRef } from "react";
import * as htmlToImage from "html-to-image";

import jsPDF from "jspdf";

import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  User,
  Globe,
  Github,
  Linkedin,
  Download,
} from "lucide-react";

export const ResumeTemplate = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto mb-6 flex justify-end">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
        >
          <Download className="w-5 h-5" />
          PDF yuklab olish
        </button>
      </div>

      {/* Resume content */}
      <div className="max-w-4xl mx-auto">
        <div className="ref" ref={resumeRef}>
          <div className=" bg-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
              <div className="bg-slate-800 text-white p-8 lg:col-span-1">
                <div className="text-center mb-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white">
                    <img
                      src="https://ucarecdn.com/4cb30cc5-0f6d-4b50-b887-ddacaf5e8769/-/preview/626x417/"
                      alt="Profil rasmi"
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">
                    Rahmonaliyeva Charos
                  </h1>
                  <p className="text-slate-300 text-lg">Frontend Developer</p>
                </div>

                {/* Aloqa ma'lumotlari */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Aloqa
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-3 text-slate-300" />
                      <span className="text-sm">+998 90 123 45 67</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="min-w-4 min-h-4 mr-3 text-slate-300" />
                      <span className="text-sm">
                        charos.rahmonaliyeva@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-3 text-slate-300" />
                      <span className="text-sm">Toshkent, O'zbekiston</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-3 text-slate-300" />
                      <span className="text-sm">charos-portfolio.com</span>
                    </div>
                  </div>
                </div>

                {/* Ijtimoiy tarmoqlar */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Ijtimoiy tarmoqlar
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Linkedin className="w-4 h-4 mr-3 text-slate-300" />
                      <span className="text-sm">
                        linkedin.com/in/charos-rahmonaliyeva
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Github className="w-4 h-4 mr-3 text-slate-300" />
                      <span className="text-sm">github.com/charos-dev</span>
                    </div>
                  </div>
                </div>

                {/* Ko'nikmalar */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Ko'nikmalar</h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">React.js</span>
                        <span className="text-sm">90%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">JavaScript</span>
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Tailwind CSS</span>
                        <span className="text-sm">80%</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Node.js</span>
                        <span className="text-sm">75%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tillar */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Tillar</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">O'zbek tili</span>
                      <span className="text-sm text-slate-300">C2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ingliz tili</span>
                      <span className="text-sm text-slate-300">B2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Rus tili</span>
                      <span className="text-sm text-slate-300">B1</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* O'ng tomon - Tajriba va ta'lim */}
              <div className="lg:col-span-2 p-8">
                {/* Haqida */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                    Haqimda
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Men 3 yillik tajribaga ega Frontend Developer man. React.js,
                    JavaScript va zamonaviy web texnologiyalar bilan ishlashni
                    yaxshi bilaman. Foydalanuvchi interfeysi va tajribasini
                    yaxshilashga e'tibor beraman. Jamoaviy ishlashni yoqtiraman
                    va yangi texnologiyalarni o'rganishga doimo tayyor.
                  </p>
                </section>

                {/* Ish tajribasi */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 pb-2 flex items-center">
                    <Briefcase className="w-6 h-6 mr-2" />
                    Ish tajribasi
                  </h2>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-6 relative">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-2 top-0"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">
                          Senior Frontend Developer
                        </h3>
                        <span className="text-sm text-slate-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          2022 - Hozir
                        </span>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">
                        Tech Company LLC
                      </p>
                      <ul className="text-slate-600 text-sm space-y-1">
                        <li>
                          • React.js va Next.js yordamida web ilovalar yaratish
                        </li>
                        <li>• Jamoada 5+ dasturchi bilan hamkorlik qilish</li>
                        <li>
                          • Kod sifatini nazorat qilish va code review o'tkazish
                        </li>
                        <li>• Performance optimizatsiya va SEO yaxshilash</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6 relative">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-2 top-0"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">
                          Frontend Developer
                        </h3>
                        <span className="text-sm text-slate-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          2021 - 2022
                        </span>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">
                        Digital Agency
                      </p>
                      <ul className="text-slate-600 text-sm space-y-1">
                        <li>
                          • Mijozlar uchun responsive web saytlar yaratish
                        </li>
                        <li>
                          • JavaScript va CSS3 bilan interaktiv elementlar
                          qo'shish
                        </li>
                        <li>• WordPress va custom CMS bilan ishlash</li>
                        <li>• Cross-browser compatibility ta'minlash</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6 relative">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-2 top-0"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">
                          Junior Web Developer
                        </h3>
                        <span className="text-sm text-slate-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          2020 - 2021
                        </span>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">
                        StartUp Company
                      </p>
                      <ul className="text-slate-600 text-sm space-y-1">
                        <li>• HTML, CSS va JavaScript asoslarini o'rganish</li>
                        <li>• Kichik loyihalarda yordam berish</li>
                        <li>• Bug fixing va testing</li>
                        <li>• Git version control tizimi bilan ishlash</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Ta'lim */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 pb-2 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2" />
                    Ta'lim
                  </h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-6 relative">
                      <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-2 top-0"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">
                          Kompyuter Injiniringi Bakalavr
                        </h3>
                        <span className="text-sm text-slate-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          2016 - 2020
                        </span>
                      </div>
                      <p className="text-green-600 font-medium mb-2">
                        Toshkent Axborot Texnologiyalari Universiteti
                      </p>
                      <p className="text-slate-600 text-sm">GPA: 4.2/5.0</p>
                    </div>
                  </div>
                </section>

                {/* Sertifikatlar */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 pb-2 flex items-center">
                    <Award className="w-6 h-6 mr-2" />
                    Sertifikatlar
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          React Developer Certification
                        </h3>
                        <p className="text-slate-600 text-sm">
                          Meta (Facebook) - 2023
                        </p>
                      </div>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          JavaScript Algorithms and Data Structures
                        </h3>
                        <p className="text-slate-600 text-sm">
                          freeCodeCamp - 2022
                        </p>
                      </div>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          Responsive Web Design
                        </h3>
                        <p className="text-slate-600 text-sm">
                          freeCodeCamp - 2021
                        </p>
                      </div>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
