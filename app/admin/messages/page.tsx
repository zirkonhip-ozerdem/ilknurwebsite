import { Mail, MessageSquareText } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getMessages() {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    return await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 100
    });
  } catch {
    return [];
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export default async function AdminMessagesPage() {
  await requireAdmin();
  const messages = await getMessages();

  return (
    <main className="admin-page">
      <header className="admin-title-block">
        <span>İletişim</span>
        <h1>Form Mesajları</h1>
        <p>Web sitesindeki iletişim formundan gelen son 100 mesajı buradan takip edebilirsiniz.</p>
      </header>
      <section className="admin-panel">
        {messages.length > 0 ? (
          <div className="admin-message-list">
            {messages.map((message) => (
              <article className="admin-message-card" key={message.id}>
                <div className="admin-message-head">
                  <div>
                    <span>{message.subject}</span>
                    <h2>
                      {message.name} {message.surname}
                    </h2>
                  </div>
                  <time dateTime={message.createdAt.toISOString()}>{formatDate(message.createdAt)}</time>
                </div>
                <p>{message.message}</p>
                <a href={`mailto:${message.email}`}>
                  <Mail size={16} />
                  {message.email}
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="admin-empty-state">
            <MessageSquareText size={24} />
            <strong>Henüz form mesajı yok.</strong>
            <p>İletişim formundan gönderilen mesajlar burada listelenecek.</p>
          </div>
        )}
      </section>
    </main>
  );
}
