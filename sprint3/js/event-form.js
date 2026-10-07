import { events, toISO, fromISO } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const guncelleModu = form.dataset.mode === "guncelle";
let etkinlik = null;

// Güncelleme sayfası: adresteki id ile formu doldur
if (guncelleModu) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (etkinlik) {
    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = toISO(etkinlik.date);
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity ?? "";
    form.elements.aciklama.value = etkinlik.description;
  } else {
    // Formu gösterme; yerine uyarı + "Etkinliklere git"
    const uyari = document.createElement("div");
    const kutu = document.createElement("p");
    kutu.className = "hata-kutusu";
    kutu.textContent = id
      ? `"${id}" numaralı bir etkinlik yok. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.`
      : `Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.`;
    uyari.append(kutu);
    uyari.insertAdjacentHTML("beforeend",
      `<a class="buton" href="etkinlikler.html">Etkinliklere git</a>`);

    document.querySelector("#form-bilgi")?.remove();
    form.replaceWith(uyari);
  }
}

const mesaj = document.querySelector("#form-mesaj");
const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

function dogrula(data) {
  const errors = {};

  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";

  const kontenjanGecersiz = form.elements.kontenjan.validity.badInput ||
    (data.capacity !== null &&
      (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000));
  if (kontenjanGecersiz) errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir sayı olmalı.";

  return errors;
}

function hatalariGoster(errors) {
  alanlar.forEach((ad) => {
    const alan = form.elements[ad];
    const hataYeri = document.querySelector(`#${ad}-hata`);

    if (errors[ad]) {
      hataYeri.textContent = errors[ad];
      alan.setAttribute("aria-invalid", "true");
    } else {
      hataYeri.textContent = "";
      alan.removeAttribute("aria-invalid");
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan").trim();
  const tarih = fd.get("tarih");

  const data = {
    id: etkinlik ? etkinlik.id : `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: tarih ? fromISO(tarih) : "",
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan === "" ? null : Number(kontenjan),
    description: fd.get("aciklama").trim(),
  };

  const errors = dogrula(data);
  hatalariGoster(errors);

  if (Object.keys(errors).length > 0) {
    mesaj.className = "form-mesaj hata-kutusu";
    mesaj.textContent = "Formda hatalı alanlar var. İşaretli alanları düzeltip tekrar deneyin.";
    return;
  }

  console.log(data);

  const baslik = document.createElement("p");
  baslik.textContent = guncelleModu
    ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
    : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(data, null, 2);

  mesaj.className = "form-mesaj basari-kutusu";
  mesaj.replaceChildren(baslik, pre);
});
