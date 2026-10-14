import "./App.css";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// Veriden, her kategori bir kez
const categories = [...new Set(events.map((e) => e.category))];

// Tarihi en yakın 2 etkinlik
const upcoming = [...events]
  .sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

// "2026-10-12" -> "12 Ekim 2026"
const formatDate = (date: string) => new Date(`${date}T00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Link görünümlü öğeler sayfayı yenilemesin
  function link(next: PageName, id: string | null = null) {
    return (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      go(next, id);
    };
  }

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId
    ? findEventById(events, selectedId) : undefined;

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="etiket">{event.category}</p>
        <p>Tarih: <time dateTime={`${event.date}T${event.time}`}>{formatDate(event.date)}, {event.time}</time></p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a href="#" onClick={link("detail", event.id)}>Detayları gör</a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {page === "home" && <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>}
        {page === "events" && <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>}
        <nav className="menu">
          {menu.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={link(item.page)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-listesi kartlar iki">
              {upcoming.map(renderCard)}
            </div>
            <a className="buton" href="#" onClick={link("events")}>Tüm etkinlikleri gör</a>
          </section>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  name="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  name="kategori"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </form>
            <p className="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi kartlar">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <div>
            <p className="hata-kutusu">Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            <a className="buton" href="#" onClick={link("events")}>← Listeye dön</a>
          </div>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <div className="detay-icerik">
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}

              <h2>Açıklama</h2>
              <p>{selected.description}</p>

              <p className="butonlar">
                <a className="buton" href="#" onClick={link("events")}>← Listeye dön</a>
                <a className="buton" href="#" onClick={link("update", selected.id)}>Bu etkinliği güncelle</a>
              </p>
            </div>

            <aside className="kunye">
              <h2>Etkinlik Künyesi</h2>
              <dl>
                <dt>Tarih</dt>
                <dd><time dateTime={`${selected.date}T${selected.time}`}>{formatDate(selected.date)}, {selected.time}</time></dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </aside>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p id="form-bilgi">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

            <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="title">Etkinlik Adı</label>
              <input type="text" id="title" name="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />

              <label htmlFor="category">Kategori</label>
              <select id="category" name="category" defaultValue="">
                <option value="">Seçiniz</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
              </select>

              <label htmlFor="date">Tarih</label>
              <input type="date" id="date" name="date" />

              <label htmlFor="time">Saat</label>
              <input type="time" id="time" name="time" />

              <label htmlFor="location">Yer</label>
              <input type="text" id="location" name="location" placeholder="Örn. A Blok Konferans Salonu" />

              <label htmlFor="capacity">Kontenjan</label>
              <input type="number" id="capacity" name="capacity" min={1} max={1000} step={1} />

              <label htmlFor="description">Açıklama</label>
              <textarea id="description" name="description" rows={5} />

              <button type="submit">{page === "add" ? "Kaydet" : "Güncelle"}</button>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Teoman Bayındır &middot; 2311012047 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
