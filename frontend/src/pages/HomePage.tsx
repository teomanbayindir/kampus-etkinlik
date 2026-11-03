import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();

  // Tarihi en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <section className="yaklasan">
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} emptyText="Henüz etkinlik yok." />
      <Link className="buton" to="/events">Tüm etkinlikleri gör</Link>
    </section>
  );
}

export default HomePage;
