import { events, toISO, formatDate } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("#sayfa-basligi");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Kampüs Etkinlikleri | Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";

  const kutu = document.createElement("p");
  kutu.className = "hata-kutusu";
  // id adres çubuğundan geldiği için innerHTML değil textContent
  kutu.textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Etkinlik seçilmedi. Listeden bir etkinlik seçin.";

  container.innerHTML = `<a class="buton" href="etkinlikler.html">← Listeye dön</a>`;
  container.prepend(kutu);
} else {
  document.title = `Kampüs Etkinlikleri | ${event.title}`;
  baslik.textContent = event.title;

  const kisaTarih = formatDate(event.date).split(" ").slice(0, 2).join(" ");

  container.innerHTML = `<article class="detay">
    <div class="detay-icerik">
      <figure class="afis-figur">
        <div class="afis" role="img" aria-label="${event.title} afişi">
          <span class="afis-baslik">${event.title}</span>
          <span class="afis-alt">${kisaTarih} · ${event.location}</span>
        </div>
        <figcaption>${event.title} afişi</figcaption>
      </figure>

      <h2>Açıklama</h2>
      <p>${event.description}</p>

      <p class="butonlar">
        <a class="buton" href="etkinlikler.html">← Listeye dön</a>
        <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
      </p>
    </div>

    <aside class="kunye">
      <h2>Etkinlik Künyesi</h2>
      <dl>
        <dt>Tarih</dt>
        <dd><time datetime="${toISO(event.date)}T${event.time}">${formatDate(event.date)}, ${event.time}</time></dd>
        <dt>Yer</dt>
        <dd>${event.location}</dd>
        <dt>Kategori</dt>
        <dd>${event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>${event.capacity} kişi</dd>
      </dl>
    </aside>
  </article>`;
}
