# Kampüs Etkinlikleri

**Canlı adres:** https://ahmetteomanbayindir-frontend.vercel.app

Sprint 4'te site `frontend/` klasöründe Vite + React + TypeScript ile yeniden yazıldı. `sprint1/`, `sprint2/` ve `sprint3/` klasörleri olduğu gibi duruyor.

Sprint 5'te tek büyük `App.tsx` bileşenlere bölündü: her parça kendi dosyasında, verisini props ile alıyor.

Sprint 6 (vize) ile uygulama gerçek adreslere kavuştu: React Router ile 10 sayfa, `EventsContext` ile ortak etkinlik listesi, controlled form ve doğrulama, yönetim panelinde ekle / güncelle / sil (silmeden önce onay), giriş, kayıt ve şifremi unuttum sayfaları. Veri tarayıcıda tutulur; sayfa yenilenince başa döner.

## Kurulum

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

Yayın için:

```bash
npm run build
npm run preview
```

## Route listesi

| Adres | Sayfa | İçerik |
| --- | --- | --- |
| `/` | `HomePage` | Yaklaşan 2 etkinlik |
| `/events` | `EventsPage` | Tüm etkinlikler, arama ve kategori filtresi |
| `/events/:id` | `EventDetailPage` | Etkinlik detayı ve künyesi |
| `/login` | `LoginPage` | Giriş formu (e-posta, şifre) |
| `/register` | `RegisterPage` | Kayıt formu (ad soyad, e-posta, şifre, şifre tekrar) |
| `/forgot-password` | `ForgotPasswordPage` | Şifre yenileme bağlantısı formu |
| `/admin` | `AdminPage` | Etkinlik tablosu: Düzenle, Sil, Yeni etkinlik |
| `/admin/new` | `AddEventPage` | Yeni etkinlik formu |
| `/admin/:id/edit` | `EditEventPage` | Etkinlik güncelleme formu |
| `*` | `NotFoundPage` | Sayfa bulunamadı |

## Klasör yapısı

```
frontend/
  src/
    components/
      layout/   Header Navigation Footer
      events/   EventCard EventList EventFilter EventDetail
      forms/    EventForm
    context/    EventsContext.tsx
    pages/
      HomePage EventsPage EventDetailPage
      AdminPage AddEventPage EditEventPage
      LoginPage RegisterPage ForgotPasswordPage
      NotFoundPage
    data/       events.ts
    types/      campus-event.ts
    utils/      filter-events format-date validate-event
    App.tsx App.css index.css main.tsx
```

## frontend dosyaları

| Dosya | Görevi |
| --- | --- |
| `package.json` | Proje adını, `dev` / `build` / `preview` komutlarını ve paket listesini tutar (`react-router-dom` dahil). |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini kaydeder, herkes aynı sürümü kurar. |
| `node_modules/` | `npm install` ile indirilen paketlerdir; GitHub'a gönderilmez. |
| `tsconfig*.json` | TypeScript'in kodu nasıl denetleyeceğini belirleyen ayarlardır. |
| `vite.config.ts` | Vite ayarlarıdır; React eklentisini burada açar. |
| `vercel.json` | Vercel'de her adresi `index.html`'e yönlendirir; `/events` gibi adresler yenilenince de açılır. |
| `index.html` | Uygulamanın tek HTML dosyasıdır; içinde React'in çizeceği boş `div#root` vardır. |
| `src/main.tsx` | React'i başlatır; `App`'i `BrowserRouter` ve `EventsProvider` ile sarar. |
| `src/App.tsx` | Sadece Header, Navigation, Routes ve Footer. State yok; açık sayfayı adres söyler. |
| `src/App.css` | Sprint 3'teki CSS'tir; renk ve font öğrenci numarasından gelir. Tablo, mesaj ve hata stilleri eklendi. |
| `src/index.css` | Tüm sayfaya genel stil dosyasıdır; boştur. |
| `src/context/EventsContext.tsx` | Etkinlik listesi ve `addEvent`, `updateEvent`, `deleteEvent`; `useEvents()` hook'u. |
| `src/pages/*.tsx` | Adrese bağlı 10 sayfa; veriyi bulur, bileşenlere verir. |
| `src/components/layout/Header.tsx` | Site başlığı; props almaz. |
| `src/components/layout/Navigation.tsx` | `NavLink` ile menü; açık sayfayı işaretler. |
| `src/components/layout/Footer.tsx` | Alt bilgi; props almaz. |
| `src/components/events/EventCard.tsx` | Tek etkinlik kartı; props: `event`. |
| `src/components/events/EventList.tsx` | Her etkinlik için bir `EventCard` çizer; props: `events`, `emptyText`. |
| `src/components/events/EventFilter.tsx` | Arama kutusu ve kategori seçimi; props: `searchText`, `category`, `categories`, `onSearchChange`, `onCategoryChange`. |
| `src/components/events/EventDetail.tsx` | Etkinlik detayı ve künyesi; props: `event`. |
| `src/components/forms/EventForm.tsx` | Controlled form; props: `initialData`, `submitText`, `onSubmit(data)`. |
| `src/types/campus-event.ts` | `CampusEvent`, `Category`, `EventFormData` ve `EventFormErrors` tipleri. |
| `src/data/events.ts` | Başlangıçtaki 6 etkinlik kaydı. |
| `src/utils/filter-events.ts` | Arama, kategori filtresi ve id ile bulma yapan saf fonksiyonlardır. |
| `src/utils/format-date.ts` | `"2026-10-12"` tarihini `"12 Ekim 2026"` biçimine çevirir. |
| `src/utils/validate-event.ts` | Etkinlik formunu doğrular, hata nesnesi döndürür. |
| `public/` | Olduğu gibi kopyalanan dosyalardır (`afis.svg`, `favicon.svg`). |
