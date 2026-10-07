// Tüm etkinlikler tek yerde. Sayfalar bu diziden üretilir.
// Tarih biçimi GG-AA-YYYY, saat biçimi SS:DD.
export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 120,
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    capacity: 20,
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "13:00",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
    capacity: 50,
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "03-11-2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
    capacity: 30,
  },
  {
    id: "event-5",
    title: "Yapay Zekâ Semineri",
    category: "Seminer",
    date: "10-11-2026",
    time: "11:00",
    location: "A Blok Konferans Salonu",
    description: "Büyük dil modelleri nasıl çalışır, günlük hayatta nerede kullanılır?",
    capacity: 150,
  },
  {
    id: "event-6",
    title: "Oyun Geliştirme Söyleşisi",
    category: "Söyleşi",
    date: "01-12-2026",
    time: "14:30",
    location: "B Blok Amfi 2",
    description: "Bağımsız oyun stüdyosu kurucularıyla ilk oyunu yayınlama hikâyeleri.",
    capacity: 80,
  },
];

// "12-10-2026" -> "2026-10-12" (sıralama ve input type="date" için)
export function toISO(date) {
  const [gun, ay, yil] = date.split("-");
  return `${yil}-${ay}-${gun}`;
}

// "2026-10-12" -> "12-10-2026" (formdan gelen değeri veri biçimine çevirir)
export function fromISO(iso) {
  const [yil, ay, gun] = iso.split("-");
  return `${gun}-${ay}-${yil}`;
}

// "12-10-2026" -> "12 Ekim 2026"
export function formatDate(date) {
  const [gun, ay, yil] = date.split("-").map(Number);
  return new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
