"use client";

import { useState } from "react";
import type { ContactSettings, GeneralSettings } from "@/lib/settings";

type Status = "idle" | "saving" | "saved" | "error";

function StatusMessage({ status, message }: { status: Status; message?: string }) {
  if (status === "saved") {
    return <div className="admin-success compact">Güncellendi.</div>;
  }

  if (status === "error") {
    return <div className="admin-warning compact">{message ?? "Kaydedilemedi. Veritabanı bağlantısını ve oturumu kontrol edin."}</div>;
  }

  return null;
}

async function getResponseMessage(response: Response) {
  try {
    const body = (await response.json()) as { message?: string };
    return body.message;
  } catch {
    return undefined;
  }
}

export function ContactInfoForm({ initialSettings }: { initialSettings: ContactSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>();

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    const response = await fetch("/api/admin/settings/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });

    setMessage(response.ok ? undefined : await getResponseMessage(response));
    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <form className="admin-panel-form" onSubmit={save}>
      <StatusMessage status={status} message={message} />
      <label>
        E-posta Adresi
        <input
          value={settings.email}
          onChange={(event) => setSettings((current) => ({ ...current, email: event.target.value }))}
          placeholder="info@ilknursoydan.com"
        />
      </label>
      <label>
        Telefon
        <input
          value={settings.phone}
          onChange={(event) => setSettings((current) => ({ ...current, phone: event.target.value }))}
          placeholder="+90 555 000 00 00"
        />
      </label>
      <label>
        Adres
        <textarea
          value={settings.address}
          onChange={(event) => setSettings((current) => ({ ...current, address: event.target.value }))}
          rows={4}
          placeholder="İstanbul, Türkiye"
        />
      </label>
      <button className="admin-primary-button" type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Kaydediliyor" : "İletişim Bilgilerini Kaydet"}
      </button>
    </form>
  );
}

export function GeneralSettingsForm({ initialSettings }: { initialSettings: GeneralSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>();

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    const response = await fetch("/api/admin/settings/general", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings)
    });

    setMessage(response.ok ? undefined : await getResponseMessage(response));
    setStatus(response.ok ? "saved" : "error");
  }

  return (
    <form className="admin-panel-form" onSubmit={save}>
      <StatusMessage status={status} message={message} />
      <div className="admin-two-col">
        <label>
          Site Başlığı
          <input value={settings.siteTitle} onChange={(event) => setSettings((current) => ({ ...current, siteTitle: event.target.value }))} />
        </label>
        <label>
          Logo Alt Metni
          <input value={settings.logoAlt} onChange={(event) => setSettings((current) => ({ ...current, logoAlt: event.target.value }))} />
        </label>
      </div>
      <label>
        Site Açıklaması
        <textarea
          value={settings.siteDescription}
          onChange={(event) => setSettings((current) => ({ ...current, siteDescription: event.target.value }))}
          rows={4}
        />
      </label>
      <div className="admin-two-col">
        <label>
          Instagram Linki
          <input value={settings.instagram} onChange={(event) => setSettings((current) => ({ ...current, instagram: event.target.value }))} />
        </label>
        <label>
          LinkedIn Linki
          <input value={settings.linkedin} onChange={(event) => setSettings((current) => ({ ...current, linkedin: event.target.value }))} />
        </label>
      </div>
      <button className="admin-primary-button" type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Kaydediliyor" : "Genel Ayarları Kaydet"}
      </button>
    </form>
  );
}

export function AdminProfileForm({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>();

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");

    const response = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, currentPassword, newPassword })
    });

    setMessage(response.ok ? undefined : await getResponseMessage(response));
    setStatus(response.ok ? "saved" : "error");
    if (response.ok) {
      setCurrentPassword("");
      setNewPassword("");
    }
  }

  return (
    <form className="admin-panel-form" onSubmit={save}>
      <StatusMessage status={status} message={message} />
      <label>
        Admin E-posta
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
      </label>
      <div className="admin-two-col">
        <label>
          Mevcut Şifre
          <input value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} type="password" />
        </label>
        <label>
          Yeni Şifre
          <input
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            type="password"
            placeholder="Boş bırakırsanız değişmez"
          />
        </label>
      </div>
      <button className="admin-primary-button" type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Kaydediliyor" : "Admin Bilgilerini Güncelle"}
      </button>
    </form>
  );
}
