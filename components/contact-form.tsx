"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    setState(response.ok ? "success" : "error");
    if (response.ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Ad
          <input name="name" placeholder="Adınız" required />
        </label>
        <label>
          Soyad
          <input name="surname" placeholder="Soyadınız" />
        </label>
      </div>
      <label>
        E-posta adresi
        <input name="email" type="email" placeholder="email@ornek.com" required />
      </label>
      <label>
        Konu
        <select name="subject" defaultValue="Mentor Koçluk">
          <option>Mentor Koçluk</option>
          <option>Nefes Koçluğu</option>
          <option>Konuşmacı Talebi</option>
          <option>Basın ve Medya</option>
          <option>Kamplar</option>
          <option>Diğer</option>
        </select>
      </label>
      <label>
        Mesajınız
        <textarea name="message" placeholder="Nasıl yardımcı olabiliriz?" rows={5} required />
      </label>
      <button className="button button-dark" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Gönderiliyor" : "Gönder"}
        <ArrowRight size={16} />
      </button>
      {state === "success" && <p className="form-message">Mesajınız alındı. En kısa sürede dönüş yapılacaktır.</p>}
      {state === "error" && <p className="form-message form-message-error">Lütfen alanları kontrol edip tekrar deneyin.</p>}
    </form>
  );
}
