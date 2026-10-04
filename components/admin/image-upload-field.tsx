"use client";

import Image from "next/image";
import { useState } from "react";

type ImageUploadFieldProps = {
  label: string;
  value?: string | null;
  onChange: (value: string) => void;
  hint?: string;
};

export function ImageUploadField({ label, value, onChange, hint }: ImageUploadFieldProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const isUploadedImage = value?.startsWith("/uploads/");

  async function upload(file: File) {
    setStatus("uploading");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const body = (await response.json()) as { url: string };
    onChange(body.url);
    setStatus("idle");
  }

  return (
    <div className="admin-upload-field">
      <label>
        {label}
        <input
          accept="image/*"
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void upload(file);
            }
          }}
        />
      </label>
      <small>{hint ?? "Önerilen maksimum dosya boyutu: 8 MB. Önerilen banner ölçüsü: 2400x1200 px. Yüklenen tüm görseller WebP’ye çevrilir."}</small>
      {value && (
        <div className="admin-upload-preview">
          <Image src={value} alt={`${label} önizleme`} width={640} height={320} unoptimized={isUploadedImage} />
          <button type="button" onClick={() => onChange("")}>
            Görseli Kaldır
          </button>
        </div>
      )}
      {status === "uploading" && <span className="admin-upload-status">Yükleniyor...</span>}
      {status === "error" && <span className="admin-upload-status error">Görsel yüklenemedi.</span>}
    </div>
  );
}
