https://kampus-etkinlik-indol.vercel.app/

# Kampüs Etkinlikleri

Sprint 4'te site `frontend/` klasöründe Vite + React + TypeScript ile yeniden yazıldı. `sprint1/`, `sprint2/` ve `sprint3/` klasörleri olduğu gibi duruyor.

Sprint 5'te tek büyük `App.tsx` bileşenlere bölündü: her parça kendi dosyasında, verisini props ile alıyor, olayları callback ile App'e bildiriyor. State App'te kalıyor (lifting state). Ekran Sprint 4 ile aynı.

## frontend dosyaları

| Dosya | Görevi |
| --- | --- |
| `package.json` | Proje adını, `dev` / `build` / `preview` komutlarını ve paket listesini tutar. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini kaydeder, herkes aynı sürümü kurar. |
| `node_modules/` | `npm install` ile indirilen paketlerdir; GitHub'a gönderilmez. |
| `tsconfig*.json` | TypeScript'in kodu nasıl denetleyeceğini belirleyen ayarlardır. |
| `vite.config.ts` | Vite ayarlarıdır; React eklentisini burada açar. |
| `index.html` | Uygulamanın tek HTML dosyasıdır; içinde React'in çizeceği boş `div#root` vardır. |
| `src/main.tsx` | React'i başlatır ve `App` bileşenini `#root` içine çizer. |
| `src/App.tsx` | State'leri (`page`, `selectedId`, `searchText`, `category`) tutar, bileşenleri birleştirir ve props verir. |
| `src/App.css` | Sprint 3'teki CSS'tir; renk ve font öğrenci numarasından gelir. |
| `src/index.css` | Tüm sayfaya genel stil dosyasıdır; bu sprintte boştur. |
| `src/components/layout/Header.tsx` | Sayfa başlığı; props: `title`, isteğe bağlı `text`. |
| `src/components/layout/Navigation.tsx` | Menü; props: `current`, `onNavigate`. |
| `src/components/layout/Footer.tsx` | Alt bilgi; props almaz. |
| `src/components/events/EventCard.tsx` | Tek etkinlik kartı; props: `event`, `onShowDetail`. |
| `src/components/events/EventList.tsx` | Her etkinlik için bir `EventCard` çizer; props: `events`, `onShowDetail`, `emptyText`. |
| `src/components/events/EventFilter.tsx` | Arama kutusu ve kategori seçimi; props: `searchText`, `category`, `categories`, `onSearchChange`, `onCategoryChange`. |
| `src/components/events/EventDetail.tsx` | Etkinlik detayı ve künyesi; props: `event`, `onBack`, `onEdit`. |
| `src/components/forms/EventForm.tsx` | Ekle / Güncelle formu; props: `onSubmit`. |
| `src/types/campus-event.ts` | Bir etkinliğin tipini (`CampusEvent`) ve kategori union tipini tarif eder. |
| `src/types/page.ts` | Sayfa adlarının union tipi (`PageName`). |
| `src/data/events.ts` | Bu tipe uyan 6 etkinlik kaydını tutar. |
| `src/utils/filter-events.ts` | Arama, kategori filtresi ve id ile bulma yapan saf fonksiyonlardır. |
| `src/utils/format-date.ts` | `"2026-10-12"` tarihini `"12 Ekim 2026"` biçimine çevirir. |
| `public/` | Olduğu gibi kopyalanan dosyalardır (`afis.svg`, `favicon.svg`). |

## Çalıştırma

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```
