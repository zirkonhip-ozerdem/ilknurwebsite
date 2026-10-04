import type { SitePage } from "@/lib/types";

export const navigation = [
  { href: "/", label: "Anasayfa" },
  { href: "/ilknur-kimdir", label: "İlknur Kimdir?" },
  { href: "/kamplar", label: "Kamplar" },
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
        eyebrow: "Nefes Koçluğu Eğitimi",
        title: "Nefesin dönüştürücü gücünü, bir mesleğe dönüştürüyoruz.",
        subtitle: "Medivisis Coaching School’da; nefes, beden farkındalığı ve profesyonel koçluk yetkinliklerini bir araya getirerek yeni nesil nefes koçları yetiştiriyoruz.",
        body: "Amacımız yalnızca bir eğitim programı sunmak değil; katılımcılarımızın kendi uzmanlıklarını oluşturmalarına, uygulama deneyimi kazanmalarına ve nefes koçluğunu sürdürülebilir bir mesleğe dönüştürmelerine rehberlik etmek.",
        ctaLabel: "Nefes Koçluğu Eğitimini İncele",
        ctaHref: "/kamplar",
        sortOrder: 0,
        items: [
          { title: "Medivisis’i Keşfet", href: "/medivisis" }
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
        type: "narrative",
        eyebrow: "Nefes ve Koçluk",
        title: "Nefes, insanın kendine açtığı ilk kapıdır.",
        body: "Nefes çalışması yalnızca doğru teknikleri öğrenmekten ibaret değildir. İnsan; bedeni, duyguları ve zihni arasında daha güçlü bir bağ kurdukça kendini daha derinden tanımaya başlar.",
        sortOrder: 2,
        items: [
          {
            title: "Koçluk",
            text: "ise bu farkındalığın yaşama taşınmasını sağlar."
          },
          {
            title: "Medivisis Yaklaşımı",
            text: "Medivisis’te, insanın kendi dönüşümünden güç alan ve başkalarının dönüşümüne etik, yetkin ve güvenli biçimde eşlik edebilen nefes koçları yetiştiriyoruz."
          },
          {
            meta: "quote",
            title: "Kendini dönüştüren insan, başkalarının yoluna da ışık tutar."
          }
        ]
      },
      {
        type: "cards",
        eyebrow: "Eğitim Yolculuğu",
        title: "Nefes koçluğunu mesleğe dönüştüren yapı.",
        ctaLabel: "",
        ctaHref: "",
        sortOrder: 3,
        items: [
          { title: "ICF Level 1 Nefes Koçluğu Eğitimi", text: "Nefes çalışmaları ile profesyonel koçluk yetkinliklerini bir araya getiren, 70 saatlik diploma programı." },
          { title: "AquaVita Breath & Coaching", text: "Nefes, koçluk ve su temelli uygulamaları bütünsel bir gelişim yaklaşımında buluşturan ileri seviye eğitim." },
          { title: "Uygulama ve Practicum", text: "Öğrenilen bilgiyi gerçek koçluk deneyimine dönüştürmeye odaklanan uygulama alanı." },
          { title: "Mentorluk Desteği", text: "Profesyonel koçluk yetkinliklerini geliştirmek ve ICF yolculuğunu güçlendirmek için yapılandırılmış mentorluk." },
          { title: "Mesleki Marka ve Danışan Kazanımı", text: "Uzmanlığını görünür kılmak, kişisel marka oluşturmak ve mesleğini sürdürülebilir hâle getirmek için destek." },
          { title: "Mezuniyet Sonrası Topluluk", text: "Eğitim sonrasında da öğrenmeye, gelişmeye ve mesleki bağ kurmaya devam eden Medivisis topluluğu." }
        ]
      },
      {
        type: "feature",
        eyebrow: "Eğitim Ekolojisi",
        title: "Medivisis Coaching School'un kurucusu olarak...",
        body: "Uluslararası standartlarda koçluk eğitimi veren, insan liderliğini ve profesyonel dönüşümü yaygınlaştıran bir öğrenme topluluğu inşa ediyoruz.",
        ctaLabel: "Medivisis Eğitimlerini İncele",
        ctaHref: "/medivisis",
        mediaUrl: "/assets/img/medivisis-anasayfa-kocluk.png",
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
    slug: "kamplar",
    title: "Kamplar",
    description: "Nefes, koçluk, farkındalık ve dönüşüm odaklı kamp programları.",
    seoTitle: "Kamplar | Nefes, Koçluk ve Dönüşüm Kampları",
    seoDescription: "Nefes, koçluk, beden farkındalığı ve mesleki gelişim odağında kamp programları.",
    status: "PUBLISHED",
    sortOrder: 2,
    sections: [
      {
        type: "hero",
        eyebrow: "Kamp Programları",
        title: "Nefes, farkındalık ve dönüşüm için alan açan kamp deneyimleri.",
        body: "Kamplar; katılımcıların günlük hayatın hızından uzaklaşıp nefes, beden farkındalığı ve koçluk çalışmalarıyla kendilerine yeniden temas etmeleri için tasarlanır.\n\nHer kamp; tema, tarih, kontenjan, program akışı ve başvuru süreciyle birlikte admin panelinden güncellenebilir.",
        ctaLabel: "Yaklaşan Kampları İncele",
        ctaHref: "#kamplar",
        sortOrder: 0
      },
      {
        type: "cards",
        eyebrow: "Yaklaşan Kamplar",
        title: "Katılımcılar için yapılandırılmış kamp seçenekleri",
        ctaLabel: "Başvuru İçin İletişime Geç",
        ctaHref: "/iletisim",
        sortOrder: 1,
        items: [
          {
            title: "Nefes ve Beden Farkındalığı Kampı",
            meta: "2 gece 3 gün • Sınırlı kontenjan",
            text: "Nefes çalışmaları, somatik farkındalık ve grup pratikleriyle bedensel ve duygusal regülasyona odaklanan kamp."
          },
          {
            title: "Koçlar İçin Derinleşme Kampı",
            meta: "Hafta sonu programı • Uygulama odaklı",
            text: "Koçluk becerilerini nefes çalışmalarıyla bütünleştirmek isteyen profesyoneller için practicum, gözlem ve geri bildirim alanı."
          },
          {
            title: "Kadınlar İçin Dönüşüm Kampı",
            meta: "Tema bazlı grup çalışması",
            text: "Kişisel farkındalık, sınırlar, kaynaklar ve içsel güç odağında güvenli grup alanı sunan dönüşüm kampı."
          }
        ]
      },
      {
        type: "cards",
        eyebrow: "Kamp Detayları",
        title: "Admin panelden yönetilebilecek bilgiler",
        sortOrder: 2,
        items: [
          { title: "Tarih ve Süre", text: "Kamp başlangıç-bitiş tarihi, saatleri ve toplam program süresi." },
          { title: "Lokasyon", text: "Kampın yapılacağı şehir, tesis, konaklama ve ulaşım bilgileri." },
          { title: "Kontenjan", text: "Maksimum katılımcı sayısı, başvuru durumu ve kayıt kapanış bilgisi." },
          { title: "Program Akışı", text: "Gün gün nefes çalışmaları, atölyeler, paylaşım alanları ve serbest zaman planı." },
          { title: "Kimler Katılabilir?", text: "Katılım kriterleri, deneyim seviyesi ve kampın uygun olduğu kişi profili." },
          { title: "Ücret ve Başvuru", text: "Kamp ücreti, ödeme planı, ön kayıt ve iletişim yönlendirmesi." }
        ]
      },
      {
        type: "faq",
        title: "Sık Sorulan Sorular",
        sortOrder: 3,
        items: [
          { title: "Kamplara katılmak için deneyim gerekir mi?", text: "Kamp içeriğine göre değişir. Başlangıç seviyesine açık kamplar olduğu gibi profesyoneller için derinleşme kampları da planlanabilir." },
          { title: "Konaklama ve ulaşım dahil mi?", text: "Her kampın konaklama, ulaşım ve yemek detayları kendi açıklamasında ayrıca belirtilir." },
          { title: "Kontenjan nasıl belirlenir?", text: "Güvenli ve nitelikli grup deneyimi için kontenjan sınırlı tutulur. Kontenjan bilgisi kamp kartında güncellenebilir." },
          { title: "Başvuru sonrası süreç nasıl ilerler?", text: "Başvuru sonrası ekip katılımcıyla iletişime geçer; uygunluk, ödeme ve hazırlık bilgileri paylaşılır." }
        ]
      },
      {
        type: "cta",
        title: "Kamp detaylarını birlikte netleştirelim.",
        body: "Yaklaşan kamp programları, kontenjan ve başvuru süreci hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
        ctaLabel: "Başvuru ve Bilgi Al",
        ctaHref: "/iletisim",
        sortOrder: 4
      }
    ]
  },
  {
    slug: "medivisis",
    title: "Medivisis",
    description: "Medivisis Coaching School'un nefes koçluğu eğitimleri ve mesleğe hazırlık yaklaşımı.",
    seoTitle: "Medivisis Coaching School | Nefes Koçluğu Okulu",
    seoDescription: "Nefes çalışmalarını profesyonel koçluk yetkinlikleriyle buluşturan Medivisis Coaching School yaklaşımı.",
    status: "PUBLISHED",
    sortOrder: 3,
    sections: [
      {
        type: "hero",
        eyebrow: "Medivisis Coaching School",
        title: "Nefesin dönüştürücü gücünü, profesyonel bir mesleğe dönüştürüyoruz.",
        body: "Medivisis Coaching School; nefes çalışmaları, profesyonel koçluk yetkinlikleri ve uygulama deneyimini bir araya getiren bir nefes koçluğu okuludur.\n\nBurada amacımız katılımcıların yalnızca bilgi edinmesi ya da bir eğitim programını tamamlaması değildir. Kendi içsel farkındalığını derinleştiren, etik çerçevede çalışan, uygulama becerisi gelişmiş ve danışanlarının dönüşümüne güvenle eşlik edebilen nefes koçları yetiştirmeyi hedefliyoruz.\n\nİlknur Erdal Soydan’ın liderliğinde Medivisis; öğrenmeyi, uygulamayı ve mesleki gelişimi aynı yolculukta buluşturur.",
        ctaLabel: "Eğitimleri İncele",
        ctaHref: "#egitimler",
        sortOrder: 0
      },
      {
        type: "narrative",
        eyebrow: "Mesleğe Hazırlık",
        title: "Bir eğitimden fazlası: Mesleğe hazırlık yolculuğu",
        body: "Nefes koçluğu; yalnızca nefes tekniklerini bilmek değildir. İnsanla doğru ilişki kurmayı, güçlü sorular sormayı, derin dinlemeyi, güvenli bir alan açmayı ve dönüşüm sürecine etik biçimde eşlik etmeyi gerektirir.",
        sortOrder: 1,
        items: [
          {
            title: "Eğitim Yaklaşımı",
            text: "Bu nedenle eğitim yaklaşımımız; nefes çalışmalarını profesyonel koçluk becerileriyle birlikte ele alır. Katılımcılar, kendi deneyimlerinden yola çıkarak başkalarına eşlik edebilecek yetkinliği adım adım geliştirir."
          }
        ]
      },
      {
        type: "cards",
        eyebrow: "Eğitimler",
        title: "Medivisis’te neler yapıyoruz?",
        sortOrder: 2,
        items: [
          { title: "Nefes koçları yetiştiriyoruz", text: "Nefesin beden, duygu ve zihin üzerindeki etkisini bütünsel biçimde ele alan; profesyonel nefes koçluğu eğitimleri sunuyoruz." },
          { title: "Koçluk yetkinliklerini güçlendiriyoruz", text: "Katılımcıların güçlü sorular, aktif dinleme, geri bildirim, hedef belirleme ve seans yönetimi gibi profesyonel koçluk becerilerini geliştirmelerine destek oluyoruz." },
          { title: "Uygulama deneyimi kazandırıyoruz", text: "Bilginin gerçek dönüşüme dönüşebilmesi için uygulama, gözlem, geri bildirim, practicum ve mentorluk süreçlerine önem veriyoruz." },
          { title: "Mesleki kimlik oluşumunu destekliyoruz", text: "Katılımcıların kendi uzmanlık alanlarını belirlemelerine, mesleki duruşlarını oluşturmalarına ve nefes koçluğunu sürdürülebilir bir kariyere dönüştürmelerine eşlik ediyoruz." },
          { title: "Görünürlük ve danışan kazanımı konusunda yol açıyoruz", text: "Kişisel marka oluşturma, sosyal medya görünürlüğü ve danışanlarla buluşma gibi mesleğin gerçek hayat taraflarını da gelişim yolculuğunun parçası olarak görüyoruz." },
          { title: "Mezuniyet sonrasında da yan yana kalıyoruz", text: "Medivisis topluluğu; eğitim sonrasında da öğrenmeye, paylaşmaya, uygulamaya ve mesleki gelişime devam eden canlı bir bağ alanıdır." }
        ]
      },
      {
        type: "cards",
        eyebrow: "Metodoloji",
        title: "Eğitim yaklaşımımız",
        sortOrder: 3,
        items: [
          { title: "Öğren", text: "Nefes çalışmaları, profesyonel koçluk bilgisi ve etik çerçeveyle sağlam bir temel oluştur." },
          { title: "Uygula", text: "Practicum, seans deneyimi, gözlem ve geri bildirim süreçleriyle öğrendiklerini hayata geçir." },
          { title: "Uzmanlaş", text: "Kendi yaklaşımını ve mesleki kimliğini geliştir; nefes koçluğunda güvenle ilerle." },
          { title: "Mesleğe Dönüştür", text: "Görünürlüğünü, kişisel markanı ve danışan ilişkilerini güçlendirerek sürdürülebilir bir kariyer inşa et." }
        ]
      },
      {
        type: "narrative",
        title: "Kimler için?",
        body: "Medivisis Coaching School; nefes koçu olarak çalışmak, insanlara dönüşüm yolculuklarında eşlik etmek ve bu alanı profesyonel bir mesleğe dönüştürmek isteyenler içindir.\n\nKoçlar, eğitmenler, danışmanlar, terapötik alanda çalışan profesyoneller ve yeni bir uzmanlık alanı oluşturmak isteyen herkes için; yapılandırılmış, uygulama odaklı bir gelişim alanı sunar.",
        sortOrder: 4,
        items: []
      },
      {
        type: "cta",
        title: "Bir meslek, bir topluluk, bir dönüşüm alanı",
        body: "Medivisis’te nefes koçluğu eğitimini; insanın kendisiyle bağ kurmasına ve bu bağdan güç alarak başkalarının yoluna eşlik etmesine imkân veren bir meslek olarak görüyoruz.",
        ctaLabel: "Nefes Koçluğu Eğitimlerini İncele",
        ctaHref: "/kamplar",
        sortOrder: 5,
        items: [
          { title: "Medivisis Hakkında Daha Fazla Bilgi Al", href: "/iletisim" }
        ]
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
        type: "articles",
        eyebrow: "Öne Çıkan Yazılar",
        title: "Okuma Notları",
        sortOrder: 0,
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
  },
  {
    slug: "kvkk-aydinlatma-metni",
    title: "KVKK Aydınlatma Metni",
    description: "Kişisel verilerin işlenmesine ilişkin demo aydınlatma metni.",
    seoTitle: "KVKK Aydınlatma Metni | İlknur Erdal Soydan",
    seoDescription: "İlknur Erdal Soydan web sitesi için kişisel verilerin korunması hakkında demo aydınlatma metni.",
    status: "PUBLISHED",
    sortOrder: 7,
    sections: [
      {
        type: "legal",
        eyebrow: "Yasal Bilgilendirme",
        title: "KVKK Aydınlatma Metni",
        subtitle: "Bu sayfadaki içerik demo amaçlıdır. Yayın öncesinde hukuki danışmanlıkla güncellenmelidir.",
        body: "İlknur Erdal Soydan web sitesi üzerinden paylaştığınız kişisel veriler, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında özenle işlenir ve korunur.",
        sortOrder: 0,
        items: [
          {
            title: "Veri Sorumlusu",
            text: "Bu demo metin kapsamında veri sorumlusu İlknur Erdal Soydan olarak kabul edilmiştir. Resmi unvan, adres ve iletişim bilgileri yayın öncesinde güncellenmelidir."
          },
          {
            title: "İşlenen Kişisel Veriler",
            text: "İletişim formları aracılığıyla ad, soyad, e-posta adresi, telefon, konu ve mesaj içeriği gibi bilgiler işlenebilir."
          },
          {
            title: "İşleme Amaçları",
            text: "Kişisel verileriniz taleplerinizi yanıtlamak, randevu ve danışmanlık süreçlerini yürütmek, hizmet kalitesini geliştirmek ve yasal yükümlülükleri yerine getirmek amacıyla işlenir."
          },
          {
            title: "Aktarım ve Saklama",
            text: "Verileriniz yalnızca hizmetin gerektirdiği teknik altyapı sağlayıcıları ve yasal olarak yetkili kurumlarla paylaşılabilir. Saklama süreleri ilgili mevzuat ve işleme amacı doğrultusunda belirlenir."
          },
          {
            title: "Haklarınız",
            text: "KVKK'nın 11. maddesi kapsamında kişisel verilerinize ilişkin bilgi talep etme, düzeltme, silme, işleme itiraz etme ve kanunda belirtilen diğer haklara sahipsiniz."
          }
        ]
      }
    ]
  },
  {
    slug: "gizlilik-politikasi",
    title: "Gizlilik Politikası",
    description: "Web sitesi gizlilik uygulamalarına ilişkin demo politika metni.",
    seoTitle: "Gizlilik Politikası | İlknur Erdal Soydan",
    seoDescription: "İlknur Erdal Soydan web sitesi için demo gizlilik politikası.",
    status: "PUBLISHED",
    sortOrder: 8,
    sections: [
      {
        type: "legal",
        eyebrow: "Yasal Bilgilendirme",
        title: "Gizlilik Politikası",
        subtitle: "Bu sayfadaki içerik demo amaçlıdır. Yayın öncesinde hukuki danışmanlıkla güncellenmelidir.",
        body: "Bu gizlilik politikası, web sitesini ziyaret eden kullanıcıların bilgilerinin hangi prensiplerle toplandığını, kullanıldığını ve korunduğunu açıklamak için hazırlanmış demo bir metindir.",
        sortOrder: 0,
        items: [
          {
            title: "Toplanan Bilgiler",
            text: "Web sitesinde iletişim formu aracılığıyla paylaşılan bilgiler ve temel ziyaret istatistikleri işlenebilir."
          },
          {
            title: "Bilgilerin Kullanımı",
            text: "Paylaşılan bilgiler, kullanıcının talebini yanıtlamak, randevu ve iletişim süreçlerini yürütmek ve site deneyimini iyileştirmek amacıyla kullanılabilir."
          },
          {
            title: "Çerezler",
            text: "Web sitesi teknik gereklilikler, güvenlik ve deneyim iyileştirme amacıyla çerezlerden yararlanabilir. Detaylı çerez metni yayın öncesinde ayrıca düzenlenmelidir."
          },
          {
            title: "Üçüncü Taraf Bağlantılar",
            text: "Sitede yer alan üçüncü taraf bağlantılar kendi gizlilik uygulamalarına tabidir. Bu bağlantıların içerik ve politikalarından ilgili üçüncü taraflar sorumludur."
          },
          {
            title: "Güncellemeler",
            text: "Gizlilik politikası ihtiyaç halinde güncellenebilir. Güncel metin her zaman bu sayfada yayınlanır."
          }
        ]
      }
    ]
  }
];

export function findDefaultPage(slug: string) {
  return defaultPages.find((page) => page.slug === slug);
}
