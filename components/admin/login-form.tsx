"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    setLoading(false);

    if (!response.ok) {
      setError("E-posta veya şifre hatalı.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="admin-card admin-form" onSubmit={handleSubmit}>
      <label>
        E-posta
        <input name="email" type="email" defaultValue="admin@ilknursoydan.com" required />
      </label>
      <label>
        Şifre
        <input name="password" type="password" required />
      </label>
      {error && <p className="form-message-error">{error}</p>}
      <button className="button button-dark" type="submit" disabled={loading}>
        {loading ? "Kontrol ediliyor" : "Giriş Yap"}
      </button>
    </form>
  );
}
