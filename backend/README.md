# Kampüs Etkinlikleri API

Node + Express ile yazılmış REST API. Etkinlikleri JSON olarak verir. Veri şimdilik bellekte (`src/data/events.js`); sunucu yeniden başlayınca POST ile eklenenler kaybolur. Sprint 8'de MongoDB gelecek.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev            # http://localhost:3000
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | `node --watch src/server.js`: dosya değişince sunucuyu yeniden başlatır |
| `npm start` | `node src/server.js`: sunucuyu bir kez başlatır |

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port. `.env` yoksa 3000 kullanılır. |

`.env` GitHub'a gönderilmez (`.gitignore`). Gerekli değişkenler `.env.example` dosyasında.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı? | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Status code'lar

200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

### Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### Etkinlik nesnesi

```json
{
  "id": "event-2",
  "title": "Drone Yapım Atölyesi",
  "category": "Atölye",
  "capacity": 24,
  "date": "2026-10-22",
  "time": "10:00",
  "location": "Elektronik Laboratuvarı 3",
  "description": "..."
}
```

### POST /events

`title`, `category` ve `date` zorunludur; biri eksikse 400 döner. `capacity`, `time`, `location`, `description` isteğe bağlıdır.

```json
{
  "title": "Git ve GitHub Atölyesi",
  "category": "Atölye",
  "date": "2026-12-10",
  "time": "13:00",
  "location": "Bilgisayar Laboratuvarı 4",
  "capacity": 30,
  "description": "Branch, commit ve pull request akışını örnek bir projede deniyoruz."
}
```

Başarılıysa 201 ve yeni id'li kayıt döner.

## Dosyalar

| Dosya | İşi |
| --- | --- |
| `src/app.js` | Express uygulaması, middleware, route'ları bağlar |
| `src/server.js` | `.env`'i okur, portu dinler |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | İsteği işler, yanıtı döndürür |
| `src/data/events.js` | Bellek içi etkinlik dizisi (6 kayıt) |
| `requests/kampus-api.json` | 6 isteklik Postman collection'ı (v2.1) |

## Test

`requests/kampus-api.json` dosyasını Postman'de **Import** ile aç. Sunucu çalışırken 6 isteği sırayla gönder:

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | GET /health | 200 · ok + student |
| 2 | GET /events | 200 · 6 kayıt |
| 3 | GET /events/event-2 | 200 · event-2 |
| 4 | GET /events/yok | 404 · error |
| 5 | POST /events (tam body) | 201 · yeni id |
| 6 | POST /events (sadece title) | 400 · error |
