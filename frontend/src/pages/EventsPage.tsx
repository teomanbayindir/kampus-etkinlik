import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

// Arama metnini sadece bu sayfa kullanıyor; state burada kalır
function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Veriden, her kategori bir kez
  const categories = [...new Set(events.map((e) => e.category))];

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2 className="bolum-baslik">Etkinlikler</h2>
      <EventFilter searchText={searchText} category={category} categories={categories}
        onSearchChange={setSearchText} onCategoryChange={setCategory} />
      {filtered.length > 0 && <p className="sonuc" aria-live="polite">{filtered.length} etkinlik listeleniyor.</p>}
      <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
    </>
  );
}

export default EventsPage;
