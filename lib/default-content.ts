import type { SitePage } from "@/lib/types";

export const navigation = [
  { href: "/", label: "Anasayfa" },
  { href: "/ilknur-kimdir", label: "İlknur Kimdir?" },
  { href: "/calisma-alanlari", label: "Çalışma Alanları" },
  { href: "/medivisis", label: "Medivisis" },
  { href: "/yazilar", label: "Yazılar" },
  { href: "/iletisim", label: "İletişim" }
];

export const defaultPages: SitePage[] = [
  {
    slug: "anasayfa",
    title: "İlknur Erdal Soydan",
    description: "Düşünce liderliği, koçluk, nefes ve dönüşüm odaklı kişisel marka merkezi.",
    seoTitle: "İlknur Erdal Soydan | PCC Mentor Coach ve ICF Eğitmeni",
    seoDescription: "İlknur Erdal Soydan'ın koçluk, liderlik, nefes, mentorluk ve Medivisis vizyonunu bir araya getiren kişisel marka sitesi.",
    status: "PUBLISHED",
    sortOrder: 0,
    sections: [
      {
        type: "hero",
        eyebrow: "Dönüşüm Rehberi",
        title: "İnsanların potansiyelini ortaya çıkarmak, sadece bir meslek değil, yaşam amacım.",
        subtitle: "PCC Mentor Coach • ICF Eğitmeni • Medivisis Coaching School Kurucusu • Nefes ve Dönüşüm Uzmanı",
        body: "Bilimsel titizlik, etik yaklaşım ve insanın içsel gücüne duyulan inançla bireylerin ve kurumların dönüşüm yolculuğuna eşlik ediyorum.",
        ctaLabel: "Benimle Çalışın",
        ctaHref: "/iletisim",
        sortOrder: 0,
        items: [
          { title: "Eğitimleri Keşfet", href: "/calisma-alanlari" },
          { title: "Hikayemi Oku", href: "/ilknur-kimdir" }
        ]
      },
      {
        type: "stats",
        title: "Güven Alanı",
        sortOrder: 1,
        items: [
          { title: "PCC Mentor", icon: "BadgeCheck" },
          { title: "ICF Level 2", icon: "GraduationCap" },
          { title: "8+ Yıl Deneyim", icon: "Timer" },
          { title: "1000+ Öğrenci", icon: "Users" },
          { title: "Kurumsal Eğitimler", icon: "Building2" }
        ]
      },
      {
        type: "manifesto",
        eyebrow: "Manifesto",
        title: "Kendini değiştiren insan, çevresini de dönüştürür.",
        body: "Dönüşüm gücü, içeriden dışarıya doğru yayılan o ilk netleşme anında başlar.",
        sortOrder: 2
      },
      {
        type: "cards",
        eyebrow: "Uzmanlık Alanları",
        title: "Bilimsel zemini olan, insana temas eden çalışmalar.",
        ctaLabel: "Tüm Hizmetler",
        ctaHref: "/calisma-alanlari",
        sortOrder: 3,
        items: [
          { title: "Executive Coaching", text: "Üst düzey yöneticiler için stratejik liderlik ve performans odaklı koçluk süreçleri." },
          { title: "Breath Coaching", text: "Doğru nefes teknikleriyle stres yönetimi ve bedensel farkındalık çalışmaları." },
          { title: "Mentor Coaching", text: "Profesyonel koçların ICF yolculuklarını etik ve yetkinlikle ilerletmeleri." },
          { title: "Leadership Development", text: "Kurum kültürünü güçlendiren modern liderlik programları." },
          { title: "Speaker", text: "Motivasyonel konuşmalar ve zirve sunumları." },
          { title: "Eğitim Tasarımı", text: "İhtiyaca özel, ölçülebilir ve sürdürülebilir öğrenme deneyimleri." }
        ]
      },
      {
        type: "feature",
        eyebrow: "Eğitim Ekolojisi",
        title: "Medivisis Coaching School'un kurucusu olarak...",
        body: "Uluslararası standartlarda koçluk eğitimi veren, insan liderliğini ve profesyonel dönüşümü yaygınlaştıran bir öğrenme topluluğu inşa ediyoruz.",
        ctaLabel: "Kurumu Ziyaret Et",
        ctaHref: "/medivisis",
        sortOrder: 4
      },
      {
        type: "articles",
        title: "Son İçerikler ve Notlar",
        sortOrder: 5,
        items: [
          { title: "Liderlikte Özgünlük ve Nefes", meta: "Podcast", text: "Liderlerin karar verme süreçlerinde denge kurmasını sağlayan içsel kaynaklar." },
          { title: "Dönüşümün Mimarları", meta: "Makale", text: "Kurumsal dünyada yeni nesil koçluk yaklaşımları ve bilinçli liderlik." },
          { title: "ICF Mentorluk Süreçleri", meta: "Video", text: "PCC yolculuğunda dikkat edilmesi gereken temel prensipler." }
        ]
      },
      {
        type: "testimonials",
        title: "Deneyimler",
        sortOrder: 6,
        items: [
          { title: "A. Yılmaz", meta: "CEO, Teknoloji Grubu", text: "İlknur Hanım ile çalıştığımız yönetici koçluğu süreci, liderlik dilimizi ve karar alma becerimizi görünür biçimde güçlendirdi." },
          { title: "D. Kaya", meta: "Profesyonel Koç", text: "Mentorluk sürecinde yalnızca yetkinliklerimi değil, koç olarak duruşumu da yeniden yapılandırdım." }
        ]
      },
      {
        type: "cta",
        title: "Birlikte dönüşüm yolculuğuna başlayalım.",
        body: "Potansiyelinizi keşfetmek ve yeni bir etki alanı açmak için ilk adımı atalım.",
        ctaLabel: "Randevu Alın",
        ctaHref: "/iletisim",
        sortOrder: 7
      }
    ]
  },
  {
    slug: "ilknur-kimdir",
    title: "İlknur Kimdir?",
    description: "Finanstan koçluğa, nefesten Medivisis vizyonuna uzanan dönüşüm hikayesi.",
    seoTitle: "İlknur Kimdir? | İlknur Erdal Soydan",
    seoDescription: "İlknur Erdal Soydan'ın kişisel hikayesi, değerleri ve kurucu vizyonu.",
    status: "PUBLISHED",
    sortOrder: 1,
    sections: [
      {
        type: "hero",
        eyebrow: "Farkındalık Yolculuğu",
        title: "Liderliğin nabzını nefesin gücüyle bulmak.",
        body: "Analitik dünyanın disiplininden insanın derin dönüşümüne uzanan yolculuğum; yöneticilerin, koçların ve kurumların kendi potansiyelleriyle yeniden temas etmesine eşlik ediyor.",
        ctaLabel: "Hikayeyi Oku",
        ctaHref: "#hikaye",
        sortOrder: 0
      },
      {
        type: "timeline",
        eyebrow: "Hikaye",
        title: "Bir arayışın dönüşüm yolculuğu",
        sortOrder: 1,
        items: [
          { title: "Finans Bölümü", text: "Analitik düşünme, strateji ve sonuç odaklı karar alma becerilerinin güçlendiği yıllar." },
          { title: "Daha Derin Bir Amaç", text: "Başarıyı yalnızca sonuçlarla değil, insanın içsel dünyasıyla birlikte okuma ihtiyacı." },
          { title: "Koçluk ve Nefes", text: "Bilimsel yaklaşımın sezgisel farkındalıkla buluştuğu profesyonel alan." },
          { title: "Medivisis'in Kuruluşu", text: "Profesyonel koçluk standartlarını bütüncül dönüşümle birleştiren öğrenme platformu." },
          { title: "Bugünkü Vizyon", text: "Etik, bilimsellik ve insan potansiyelini odağa alan güçlü bir etki alanı." }
        ]
      },
      {
        type: "cards",
        eyebrow: "Değerlerim",
        title: "Bana yön veren kuzey yıldızları",
        sortOrder: 2,
        items: [
          { title: "Bilimsellik", text: "Dönüşümün ölçülebilir, anlaşılır ve sağlam bir zeminde ilerlemesi." },
          { title: "Etik", text: "Her çalışmada güven, sınır ve profesyonel duruş." },
          { title: "Dönüşüm", text: "Yüzeydeki değişimin ötesinde kimlik ve anlam düzeyinde gelişim." },
          { title: "Cesaret", text: "Kişinin kendi potansiyeline yaklaşması için alan açmak." },
          { title: "Sadelik", text: "Karmaşayı azaltıp özle temas kurmak." }
        ]
      },
      {
        type: "quote",
        title: "Liderlik dışsal bir başarı değil, içsel bir varoluş halidir.",
        body: "İç dünyamızı ustalıkla yönettiğimizde dış dünyamızla kurduğumuz ilişki de dönüşür.",
        sortOrder: 3
      },
      {
        type: "cta",
        title: "Kendi dönüşümünüz için bir alan açın.",
        body: "Yolculuğunuzun hangi aşamasında olduğunuzu birlikte netleştirelim.",
        ctaLabel: "Görüşme Planlayın",
        ctaHref: "/iletisim",
        sortOrder: 4
      }
    ]
  },
  {
    slug: "calisma-alanlari",
    title: "Çalışma Alanları",
    description: "Executive coaching, mentor coaching, nefes koçluğu, liderlik programları ve konuşmalar.",
    seoTitle: "Çalışma Alanları | Koçluk, Mentorluk ve Kurumsal Eğitim",
    seoDescription: "İlknur Erdal Soydan'ın bireysel ve kurumsal çalışma alanları.",
    status: "PUBLISHED",
    sortOrder: 2,
    sections: [
      {
        type: "hero",
        eyebrow: "Uzman Rehberlik",
        title: "Dönüşümde aydınlanmış titizlik.",
        body: "Bilimsel kesinliği insan merkezli bilgelikle birleştiren koçluk, liderlik ve nefes çalışmaları.",
        ctaLabel: "Tüm Hizmetleri Gör",
        ctaHref: "#hizmetler",
        sortOrder: 0
      },
      {
        type: "cards",
        eyebrow: "Hizmetler",
        title: "Temel Yetkinlik Alanları",
        sortOrder: 1,
        items: [
          { title: "Executive Coaching", text: "C-level liderler ve yüksek etki alanına sahip yöneticiler için stratejik koçluk." },
          { title: "Mentor Coaching", text: "ICF standartlarıyla uyumlu profesyonel gelişim ve oturum yetkinliği." },
          { title: "Nefes Koçluğu", text: "Bedensel farkındalık, stres regülasyonu ve zihinsel berraklık için nefes süreçleri." },
          { title: "Liderlik Programları", text: "Orta ve üst kademe yöneticiler için çok boyutlu liderlik gelişimi." },
          { title: "Kurumsal Eğitimler", text: "Takım performansı, psikolojik güvenlik ve iletişim odağında atölyeler." },
          { title: "Konuşmalar", text: "Liderlik, değişim, dayanıklılık ve insan potansiyeli üzerine keynote konuşmaları." }
        ]
      },
      {
        type: "faq",
        title: "Sık Sorulan Sorular",
        sortOrder: 2,
        items: [
          { title: "Executive coaching süreci ne kadar sürer?", text: "İhtiyaca göre değişmekle birlikte süreçler genellikle 3 ila 6 ay arasında yapılandırılır." },
          { title: "Programlar kuruma özel tasarlanabilir mi?", text: "Evet. Her kurumsal çalışma ihtiyaç analizi ve hedeflenen davranış çıktılarıyla tasarlanır." },
          { title: "Nefes koçluğu liderlikle nasıl birleşir?", text: "Nefes çalışmaları liderlerin stres, odaklanma ve duygusal regülasyon becerilerini destekler." },
          { title: "Online çalışma mümkün mü?", text: "Bireysel görüşmeler ve birçok eğitim online ya da hibrit formatta yürütülebilir." }
        ]
      },
      {
        type: "cta",
        title: "Liderliğinizi bir üst seviyeye taşımaya hazır mısınız?",
        body: "Size en uygun çalışma alanını birlikte belirleyelim.",
        ctaLabel: "Keşif Görüşmesi Planla",
        ctaHref: "/iletisim",
        sortOrder: 3
      }
    ]
  },
  {
    slug: "medivisis",
    title: "Medivisis",
    description: "Medivisis Coaching School'un kurucu perspektifi ve gelecek vizyonu.",
    seoTitle: "Medivisis Vizyonu | İlknur Erdal Soydan",
    seoDescription: "Medivisis'in neden kurulduğu, nasıl bir eğitim ekolojisi inşa ettiği ve gelecek vizyonu.",
    status: "PUBLISHED",
    sortOrder: 3,
    sections: [
      {
        type: "hero",
        eyebrow: "Kurucu Perspektifi",
        title: "Medivisis Vizyonu",
        body: "Koçluk yalnızca bir meslek değil; toplumun dönüşümü için gerekli olan bilinçli liderlik ve derin empatinin kurumsallaşmış halidir.",
        ctaLabel: "Vizyonumuzu Keşfedin",
        ctaHref: "#neden",
        sortOrder: 0
      },
      {
        type: "feature",
        eyebrow: "Neden Medivisis?",
        title: "Toplumun dönüşümü profesyonellerin elindedir.",
        body: "Medivisis, koçluk eğitimini sadece sertifika süreci olarak değil, karakter inşası ve bilinçli liderlik yolculuğu olarak kurgular.",
        sortOrder: 1,
        items: [
          { title: "Akademik Rigor", text: "Psikoloji ve yönetim bilimlerinin temelleriyle harmanlanmış metodoloji." },
          { title: "Etik Standartlar", text: "Profesyonel sınırları ve insan onurunu merkeze alan pusula." },
          { title: "Sürdürülebilir Toplum", text: "Yetişen her koçun bulunduğu çevrede dönüştürücü etki yaratması." }
        ]
      },
      {
        type: "cards",
        title: "Bugün Neler Yapıyoruz?",
        sortOrder: 2,
        items: [
          { title: "Bütünsel Koçluk Sertifikasyonu", text: "Uluslararası standartlarda profesyonel koçluk eğitimi." },
          { title: "Mentörlük Seansları", text: "Derinlemesine bireysel analizler ve koç gelişimini destekleyen süreçler." },
          { title: "Topluluk Etkisi", text: "Mezunlar arası güçlü bağlar ve sosyal sorumluluk projeleri." },
          { title: "Kurumsal Dönüşüm", text: "Şirketlerin iç kültürünü güçlendiren modeller." }
        ]
      },
      {
        type: "cta",
        title: "Daha derine inmeye hazır mısınız?",
        body: "Medivisis'in sunduğu programları ve başarı hikayelerini inceleyin.",
        ctaLabel: "Medivisis Web Sitesine Git",
        ctaHref: "https://medivisis.com",
        sortOrder: 3
      }
    ]
  },
  {
    slug: "yazilar",
    title: "Yazılar",
    description: "Liderlik, koçluk, nefes ve dönüşüm üzerine içerik merkezi.",
    seoTitle: "Yazılar | Liderlik, Koçluk ve Dönüşüm",
    seoDescription: "Liderlik, koçluk, nefes, psikoloji ve girişimcilik üzerine yazılar, podcastler ve kaynaklar.",
    status: "PUBLISHED",
    sortOrder: 4,
    sections: [
      {
        type: "hero",
        eyebrow: "Bilgi ve Dönüşüm Merkezi",
        title: "Liderlik, koçluk ve dönüşüm üzerine birikimler.",
        body: "Bilimsel derinlik ile insanı dokunuşu harmanlayan içerik kütüphanesi.",
        ctaLabel: "Yazıları İncele",
        ctaHref: "#yazilar",
        sortOrder: 0
      },
      {
        type: "articles",
        eyebrow: "Öne Çıkan Yazılar",
        title: "Okuma Notları",
        sortOrder: 1,
        items: [
          { title: "Yeni Nesil Liderlikte Duygusal Çeviklik", meta: "Liderlik", text: "Değişen iş dünyasında yöneticilerin belirsizlik karşısında geliştirdiği duygusal dayanıklılık." },
          { title: "Nefes ve Odaklanma: Stratejik Zihin", meta: "Nefes", text: "Karar alma mekanizmalarını optimize etmek için nefes tekniklerinin nörobilimsel etkileri." },
          { title: "Koçlukta Sessizliğin Gücü", meta: "Koçluk", text: "Gerçek dönüşümün çoğu zaman derin dinlemenin başladığı o sessiz boşlukta filizlenmesi." }
        ]
      },
      {
        type: "events",
        title: "Yaklaşan Etkinlikler",
        sortOrder: 2,
        items: [
          { title: "Executive Presence Masterclass", meta: "15 Nisan • Online • 19:00" },
          { title: "Liderin Nefesi: Canlı Atölye", meta: "22 Nisan • İstanbul" },
          { title: "Kurumsal Dönüşüm Semineri", meta: "05 Mayıs • Online" }
        ]
      },
      {
        type: "press",
        eyebrow: "Medya ve Basın",
        title: "Basın Kiti",
        body: "Röportajlar, konuşmalar ve yayınlar için ihtiyaç duyulan profesyonel materyallere ulaşın.",
        ctaLabel: "Basın Kitini İncele",
        ctaHref: "/basin-kiti",
        sortOrder: 3,
        items: [
          { title: "Kısa ve Uzun Biyografi" },
          { title: "Yüksek Çözünürlüklü Fotoğraflar" },
          { title: "Konuşma Başlıkları" },
          { title: "Medya İletişimi" }
        ]
      },
      {
        type: "newsletter",
        title: "Dönüşüm yolculuğuna içeriklerle devam edin.",
        body: "Yeni yazılar, etkinlikler ve özel içeriklerden ilk siz haberdar olun.",
        sortOrder: 4
      }
    ]
  },
  {
    slug: "iletisim",
    title: "İletişim",
    description: "Görüşme, konuşma ve kurumsal eğitim talepleri için iletişim.",
    seoTitle: "İletişim | İlknur Erdal Soydan",
    seoDescription: "İlknur Erdal Soydan ile çalışma, eğitim, konuşma ve medya talepleri için iletişime geçin.",
    status: "PUBLISHED",
    sortOrder: 5,
    sections: [
      {
        type: "contact",
        eyebrow: "İletişime Geçin",
        title: "İletişim",
        body: "Dönüşüm yolculuğuna ilk adımı atın. Bilimsel titizlik ve liderlik içgörüsüyle harmanlanmış bir rehberlik için bize ulaşın.",
        sortOrder: 0
      }
    ]
  },
  {
    slug: "basin-kiti",
    title: "Basın Kiti",
    description: "Biyografi, fotoğraflar, konuşma başlıkları ve medya iletişimi.",
    seoTitle: "Basın Kiti | İlknur Erdal Soydan",
    seoDescription: "Röportaj, yayın ve etkinlikler için İlknur Erdal Soydan basın materyalleri.",
    status: "PUBLISHED",
    sortOrder: 6,
    sections: [
      {
        type: "press",
        eyebrow: "Medya ve Konuşmalar",
        title: "Basın Kiti",
        body: "Kısa biyografi, uzun biyografi, fotoğraf seçkisi, konuşma başlıkları ve iletişim bilgileri.",
        sortOrder: 0,
        items: [
          { title: "Kısa Biyografi", text: "Etkinlik duyuruları ve medya tanıtımları için kısa metin." },
          { title: "Uzun Biyografi", text: "Röportaj ve kapsamlı yayınlar için detaylı anlatı." },
          { title: "Fotoğraflar", text: "Portre ve yatay kullanım için yüksek çözünürlüklü görseller." },
          { title: "Konuşma Başlıkları", text: "Liderlik, değişim, nefes ve psikolojik dayanıklılık temaları." }
        ]
      }
    ]
  }
];

export function findDefaultPage(slug: string) {
  return defaultPages.find((page) => page.slug === slug);
}
