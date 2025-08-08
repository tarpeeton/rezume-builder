import { Image, Trash2, Upload, X  } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

interface FileUploadProps {
  value?: string | File;
  onChange: (file: File | string) => void;
  accept?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  className = "",
}) => {
   const t = useTranslations()
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Process file and create preview
  const processFile = useCallback(
    (file: File) => {
      console.log("Processing file:", file); // Debug log

      try {
        setErrorMessage("");
        setUploadProgress(10);

        // Validate file
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/gif",
        ];

        console.log("File type:", file.type); // Debug log
        console.log("File size:", file.size); // Debug log

        if (!allowedTypes.includes(file.type.toLowerCase())) {
          throw new Error(
            "Faqat PNG, JPG, JPEG, WEBP, GIF formatlar qo'llab-quvvatlanadi"
          );
        }

        if (file.size > maxSize) {
          throw new Error("Fayl hajmi 5MB dan oshmasligi kerak");
        }

        setUploadProgress(30);

        // Create preview using FileReader
        const reader = new FileReader();

        reader.onload = (e) => {
          console.log("FileReader onload triggered"); // Debug log
          const result = e.target?.result as string;
          console.log("FileReader result:", result ? "Success" : "Failed"); // Debug log

          if (result) {
            setImagePreview(result);
            setUploadProgress(80);
            console.log("Image preview set"); // Debug log

            // Call onChange with the result (base64)
            onChange(result);
            setUploadProgress(100);

            // Reset progress after success
            setTimeout(() => setUploadProgress(0), 1000);
          }
        };

        reader.onerror = (error) => {
          console.error("FileReader error:", error); // Debug log
          setErrorMessage("Faylni o'qishda xatolik yuz berdi");
          setUploadProgress(0);
        };

        console.log("Starting FileReader..."); // Debug log
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Process file error:", error); // Debug log
        setErrorMessage(
          error instanceof Error ? error.message : "Noma'lum xatolik"
        );
        setUploadProgress(0);
      }
    },
    [onChange]
  );

  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      console.log("Files dropped:", files.length); // Debug log

      if (files.length > 0 && files[0]) {
        console.log("Processing dropped file:", files[0]); // Debug log
        processFile(files[0]);
      }
    },
    [processFile]
  );

  // Handle file input change
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      console.log("Files selected:", files.length); // Debug log

      if (files.length > 0 && files[0]) {
        console.log("Processing selected file:", files[0]); // Debug log
        processFile(files[0]);
      }
    },
    [processFile]
  );

  // Open file dialog
  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Remove image
  const removeImage = useCallback(() => {
    setImagePreview("");
    setErrorMessage("");
    setUploadProgress(0);
    onChange("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onChange]);

  // Initialize preview from existing value
  useEffect(() => {
    console.log("Value changed:", value); // Debug log

    if (!value || value === "") {
      console.log("No value, clearing preview"); // Debug log
      setImagePreview("");
      return;
    }

    if (typeof value === "string" && value.trim() !== "") {
      console.log("Setting string value as preview"); // Debug log
      setImagePreview(value);
    } else if (value instanceof File) {
      console.log("Processing File object"); // Debug log
      processFile(value);
    } else {
      console.log("Unknown value type:", typeof value); // Debug log
      setImagePreview("");
    }
  }, [value, processFile]);

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <Image className="w-5 h-5 text-gray-600" />
        <label className="text-sm font-semibold text-gray-700">
          {t("profilePicture")}
        </label>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-3 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm rounded-r-lg">
          <div className="flex items-center gap-2">
            <X className="w-4 h-4" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Main Upload Area */}
      <div className="relative">
        {imagePreview ? (
          /* Image Preview */
          <div className="relative group">
            <div className="flex flex-col items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Profil rasmi"
                  className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-xl ring-4 ring-blue-100"
                  onLoad={() => console.log("Image loaded successfully")}
                  onError={(e) => {
                    setErrorMessage(`${t("imageUploadError")}`);
                  }}
                />

                {/* Progress Ring */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 h-44 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                    <div className="absolute text-sm font-medium text-blue-600">
                      {uploadProgress}%
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={openFileDialog}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Upload className="w-4 h-4" />
                  {t("update")}
                </button>
                <button
                  type="button"
                  onClick={removeImage}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  {t("delete")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Upload Area */
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
              isDragging
                ? "border-blue-400 bg-blue-50 transform scale-105"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <div className="text-center">
              {uploadProgress > 0 ? (
                /* Loading State */
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700">
                      {t("loading")} {uploadProgress}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Default State */
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {t("uploadProfilePicture")}
                    </h3>
                    <p className="text-gray-600">
                      <span className="text-blue-600 font-medium">
                        {t("dragDropOrClick")}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Profil rasmini tanlang"
          multiple={false}
        />
      </div>
    </div>
  );
};
