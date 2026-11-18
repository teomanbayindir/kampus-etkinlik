// Seed verisi: npm run seed bunları veritabanına ekler.
// id alanı yok, MongoDB her kayda kendi _id değerini verir.
// Tarih biçimi YYYY-AA-GG, saat SS:DD.
export const seedEvents = [
  {
    title: "Girişimcilik Zirvesi 2026",
    category: "Seminer",
    capacity: 150,
    date: "2026-10-14",
    time: "13:30",
    location: "Mühendislik Fakültesi Konferans Salonu",
    description: "Kendi şirketini kuran mezunlar fikirden ilk yatırıma uzanan yolculuklarını anlatıyor.",
  },
  {
    title: "Drone Yapım Atölyesi",
    category: "Atölye",
    capacity: 24,
    date: "2026-10-22",
    time: "10:00",
    location: "Elektronik Laboratuvarı 3",
    description: "Hazır kitlerle küçük bir quadcopter kurup ilk uçuşu bahçede birlikte yapıyoruz.",
  },
  {
    title: "Veri Gizliliği Söyleşisi",
    category: "Söyleşi",
    capacity: 60,
    date: "2026-10-29",
    time: "15:00",
    location: "Merkez Kütüphane Seminer Odası",
    description: "Bir hukukçu ve bir yazılımcı, KVKK ve mobil uygulamalardaki kişisel verileri tartışıyor.",
  },
  {
    title: "Kampüs Mobil Uygulama Hackathonu",
    category: "Yarışma",
    capacity: 40,
    date: "2026-11-07",
    time: "09:00",
    location: "Teknokent Etkinlik Alanı",
    description: "Takımlar 24 saatte kampüs yaşamını kolaylaştıran bir mobil uygulama geliştiriyor.",
  },
  {
    title: "Bulut Bilişime Giriş Semineri",
    category: "Seminer",
    capacity: 120,
    date: "2026-11-18",
    time: "11:00",
    location: "B Blok Amfi 3",
    description: "Sunucusuz mimari, konteynerler ve bulut sağlayıcıların ücretsiz katmanları üzerine temel bilgiler.",
  },
  {
    title: "Fotoğrafçılık ve Kompozisyon Atölyesi",
    category: "Atölye",
    capacity: 25,
    date: "2026-12-03",
    time: "14:00",
    location: "Güzel Sanatlar Fakültesi Stüdyo 1",
    description: "Telefon kamerasıyla ışık, kadraj ve renk kullanımını kampüste çekim yaparak öğreniyoruz.",
  },
];
