# İlknur Erdal Soydan Personal Brand

Next.js App Router, Prisma ORM ve PostgreSQL ile hazırlanmış tek dilli Türkçe kişisel marka sitesi.

## Geliştirme

1. `.env.example` dosyasını `.env` olarak çoğaltın ve PostgreSQL bağlantınızı girin.

```bash
cp .env.example .env
```

`.env` içindeki `DATABASE_URL` gerçek PostgreSQL bağlantısı olmalıdır:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ilknurwebsite?schema=public"
```

2. Veritabanını hazırlayın:

```bash
npm run prisma:migrate
npm run db:seed
```

3. Yerel sunucuyu başlatın:

```bash
npm run dev
```

Web sitesi `http://localhost:3000`, admin paneli `http://localhost:3000/admin` adresindedir.

## İçerik Yönetimi

Admin paneli sayfa bazlı çalışır. Her sayfa; SEO alanları, yayın durumu ve tekrar eden bölümlerden oluşur. Bölüm tipleri `hero`, `cards`, `feature`, `timeline`, `faq`, `contact`, `cta` gibi ön yüz renderer'larıyla eşleşir.

Varsayılan giriş bilgileri sadece geliştirme içindir. Canlı ortamda `.env` içindeki `ADMIN_EMAIL`, `ADMIN_PASSWORD` ve `AUTH_SECRET` değerlerini mutlaka değiştirin.
# ilknurwebsite
