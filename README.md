https://kampus-etkinlik-indol.vercel.app/

# Kampüs Etkinlikleri

Sprint 4'te site `frontend/` klasöründe Vite + React + TypeScript ile yeniden yazıldı. `sprint1/`, `sprint2/` ve `sprint3/` klasörleri olduğu gibi duruyor.

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
| `src/App.tsx` | Beş sayfanın (Ana Sayfa, Etkinlikler, Detay, Ekle, Güncelle) hepsini içeren ana bileşendir. |
| `src/App.css` | Sprint 3'teki CSS'tir; renk ve font öğrenci numarasından gelir. |
| `src/index.css` | Tüm sayfaya genel stil dosyasıdır; bu sprintte boştur. |
| `src/types/campus-event.ts` | Bir etkinliğin tipini (`CampusEvent`) ve kategori union tipini tarif eder. |
| `src/data/events.ts` | Bu tipe uyan 6 etkinlik kaydını tutar. |
| `src/utils/filter-events.ts` | Arama, kategori filtresi ve id ile bulma yapan saf fonksiyonlardır. |
| `public/` | Olduğu gibi kopyalanan dosyalardır (`afis.svg`, `favicon.svg`). |

## Çalıştırma

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```
