"use client";

import { FileUpload } from "@/components/ui/fileUpload";
import { Templates } from "@/constants/templates";
import { getFieldIcon } from "@/lib/getFieldIcon";
import { getFieldLabel , getFieldPlaceholder } from "@/lib/getFieldLabel";
import { IUserProfileSchema } from "@/types/defeault-template";
import { Plus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";
import { DefaultTemplate } from "../temp/default-temp";
import { SocialLinksInputs } from "@/components/ui/SocialLinks";
import { Skills } from "@/components/ui/Skills";
import { LangugageSkill } from "@/components/ui/LanguageSkill";
import { UserAbout } from "@/components/ui/About";
import { WorkExprience } from "@/components/ui/WorkExprience";
import { Education } from "@/components/ui/Education";
import { Sertificates } from "@/components/ui/Sertificates";
import { useResumeStore } from "@/store/useResumeStore";
import { ModernResumeTemplate } from "../temp/modern-temp";
import { ModernPlusResumeTemplate } from "../temp/modern-plus";
import { ModernProResumeTemplate } from "../temp/modern-pro";


interface ArrayItemTemplate {
  [key: string]: any;
  id?: string;
}

const DynamicResumeForm: React.FC = () => {
  const { slug } = useParams();


  const { updateField, addItem, updateItem, deleteItem, ...formData } =
    useResumeStore();

  const renderInput = useCallback(
    (
      fieldName: string,
      value: string | File,
      key: keyof IUserProfileSchema,
      isRequired: boolean = false
    ) => {
      const Icon = getFieldIcon(fieldName);
      const label = getFieldLabel(fieldName);
      const PlaceHolder = getFieldPlaceholder(fieldName)

      if (fieldName === "photo") {
        return (
          <div key={String(key)} className="mb-6">
            <FileUpload
              value={value}
              onChange={(file) => updateField(key as any, file as any)}
              accept="image/jpeg,image/jpg,image/png,image/webp"
            />
          </div>
        );
      }

      if (fieldName === "about") {
        return <UserAbout />;
      }

      if (fieldName === "description") {
        return (
          <div key={String(key)} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Icon className="w-4 h-4" />
              {label}
              {isRequired && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={typeof value === "string" ? value : ""}
              onChange={(e) => updateField(key as any, e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder={PlaceHolder}
            />
          </div>
        );
      }

      return (
        <div key={String(key)} className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Icon className="w-4 h-4" />
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </label>
          <input
            type={
              fieldName.includes("email")
                ? "email"
                : fieldName.includes("date")
                ? "date"
                : fieldName.includes("url") || fieldName.includes("Link")
                ? "url"
                : fieldName.includes("phone")
                ? "tel"
                : "text"
            }
            value={typeof value === "string" ? value : ""}
            onChange={(e) => updateField(key as any, e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder={PlaceHolder}
          />
        </div>
      );
    },
    [updateField]
  );

  const renderArrayField = useCallback(
    (fieldName: keyof IUserProfileSchema, items: ArrayItemTemplate[]) => {
      if (!Array.isArray(items)) return null;

      if (fieldName === "socialLinks") return <SocialLinksInputs />;
      if (fieldName === "skills") return <Skills />;
      if (fieldName === "languages") return <LangugageSkill />;
      if (fieldName === "workExperience") return <WorkExprience />;
      if (fieldName === "education") return <Education />;
      if (fieldName === "sertificates") return <Sertificates />;

      return (
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">

              {getFieldLabel(fieldName as string)}
            </h3>
            <button
              type="button"
              onClick={() => addItem(fieldName as any, {} as any)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {Object.keys(item).map((k) =>
                  k === "id" ? null : (
                    <input
                      key={k}
                      value={item[k]}
                      onChange={(e) =>
                        updateItem(fieldName as any, item.id!, {
                          [k]: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    />
                  )
                )}
                <button
                  type="button"
                  onClick={() => deleteItem(fieldName as any, item.id!)}
                  className="text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    },
    [addItem, updateItem, deleteItem]
  );



  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6 lg:max-h-[100vh] overflow-y-auto">
        {Object.entries(formData).map(([key, value]) => {
          console.log(key, ":", value, "KEY_VALUE");
          if (Array.isArray(value)) {
            return renderArrayField(
              key as keyof IUserProfileSchema,
              value as any
            );
          }
          return renderInput(
            key,
            value as any,
            key as keyof IUserProfileSchema,
            ["fullName", "email", "phone"].includes(key)
          );
        })}
      </div>
      <div className="bg-white rounded-lg shadow-sm pb-5 border border-gray-200 max-h-[100vh] overflow-y-auto">
        {slug === "default-temp" && (
          <DefaultTemplate data={formData} image={formData.photo} />
        )}

        {slug === "modern-temp" && (
          <ModernResumeTemplate data={formData} image={formData.photo} />
        )}
        {slug === "modern-plus-temp" && (
          <ModernPlusResumeTemplate data={formData} image={formData.photo} />
        )}
        {slug === "modern-pro-temp" && (
          <ModernProResumeTemplate data={formData} image={formData.photo} />
        )}
      </div>
    </div>
  );
};

export default DynamicResumeForm;
