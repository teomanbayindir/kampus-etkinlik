import { events, toISO, formatDate } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

function createCard(event) {
  return `<article class="kart">
    <h3>${event.title}</h3>
    <p class="etiket">${event.category}</p>
    <p>Tarih: <time datetime="${toISO(event.date)}T${event.time}">${formatDate(event.date)}, ${event.time}</time></p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

// Ana sayfa: data-limit varsa tarihi en yakın N etkinlik
if (list.dataset.limit) {
  const yaklasan = [...events]
    .sort((a, b) =>
      `${toISO(a.date)}T${a.time}`.localeCompare(`${toISO(b.date)}T${b.time}`))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}

// Liste sayfası: arama + kategori filtresi (ana sayfada form yok)
const filtreFormu = document.querySelector("#filtre-formu");

if (filtreFormu) {
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategoriler veriden, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriSecimi.innerHTML += kategoriler
    .map((k) => `<option value="${k}">${k}</option>`)
    .join("");

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const kategori = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metin = `${e.title} ${e.category} ${e.description}`
        .toLocaleLowerCase("tr-TR");
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = kategori === "" || e.category === kategori;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);
    sonucSatiri.textContent = sonuc.length === 0
      ? "Aramanıza uygun etkinlik bulunamadı."
      : `${sonuc.length} etkinlik listeleniyor.`;
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => {
    e.preventDefault();
    filtrele();
  });

  filtrele();
}
