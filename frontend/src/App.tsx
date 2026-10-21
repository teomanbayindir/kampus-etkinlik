import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

// Veriden, her kategori bir kez
const categories = [...new Set(events.map((e) => e.category))];

// Tarihi en yakın 2 etkinlik
const upcoming = [...events]
  .sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  const texts: Partial<Record<PageName, string>> = {
    home: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
    events: "Ekim ayında kampüste düzenlenen etkinlikler.",
  };

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <Header title={title} text={texts[page]} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section className="yaklasan">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <a className="buton" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>Tüm etkinlikleri gör</a>
          </section>
        )}

        {page === "events" && (
          <>
            <EventFilter searchText={searchText} category={category} categories={categories}
              onSearchChange={setSearchText} onCategoryChange={setCategory} />
            {filtered.length > 0 && <p className="sonuc" aria-live="polite">{filtered.length} etkinlik listeleniyor.</p>}
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı." />
          </>
        )}

        {page === "detail" && !selected && (
          <div>
            <p className="hata-kutusu">Etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
            <a className="buton" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>← Listeye dön</a>
          </div>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && <EventForm onSubmit={() => window.scrollTo(0, 0)} />}
      </main>

      <Footer />
    </>
  );
}

export default App;
