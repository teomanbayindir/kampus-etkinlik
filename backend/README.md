# Kampüs Etkinlikleri API

Node + Express + MongoDB (Mongoose) ile yazılmış REST API. Etkinlikleri JSON olarak verir.

Sprint 7'de veri bellekteki bir dizideydi; sunucu kapanınca POST ile eklenenler kayboluyordu. Sprint 8'den itibaren etkinlikler MongoDB'de (Atlas) duruyor: sunucu kapanıp açılınca da kayıtlar yerinde.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
# .env içindeki MONGODB_URI satırına kendi bağlantı adresini yaz
npm run seed           # veritabanını 6 örnek etkinlikle doldurur
npm run dev            # http://localhost:3000
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | `node --watch src/server.js`: önce MongoDB'ye bağlanır, sonra sunucuyu başlatır; dosya değişince yeniden başlatır |
| `npm start` | `node src/server.js`: sunucuyu bir kez başlatır |
| `npm run seed` | `node src/seed.js`: `events` koleksiyonunu siler, 6 örnek etkinliği ekler. Kaç kez çalışırsa çalışsın 6 kayıt kalır |

Başarılı başlangıçta terminalde şunlar görünür:

```
MongoDB bağlandı (Atlas): ac-...mongodb.net/kampus
API: http://localhost:3000
```

## Ortam değişkenleri

| Değişken | Örnek (`.env.example`) | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port. Tanımlı değilse 3000. |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | MongoDB bağlantı adresi. Atlas için Atlas › Connect › Drivers'tan alınan adres, sonuna `/kampus` eklenerek. Tanımlı değilse sunucu başlamaz. |

`.env` GitHub'a gönderilmez (`.gitignore`). `.env.example` içindeki değer gerçek adres değil, yer tutucudur. Gerçek Atlas adresi ve şifresi hiçbir dosyada (kod, README, collection) yer almaz; bağlantı adresi terminale de yazdırılmaz, sadece host ve veritabanı adı yazılır.

## Veri modeli

`src/models/event-model.js` içindeki Mongoose şeması. Model adı `Event`, koleksiyon adı `events`.

| Alan | Tip | Kural |
| --- | --- | --- |
| `title` | String | zorunlu, `trim`, 3–100 karakter |
| `category` | String | zorunlu, sadece `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` |
| `capacity` | Number | en az 0, varsayılan 0 |
| `date` | String | zorunlu (`YYYY-AA-GG`) |
| `time` | String | varsayılan `""` (`SS:DD`) |
| `location` | String | `trim`, varsayılan `""` |
| `description` | String | `trim`, en fazla 500 karakter, varsayılan `""` |
| `_id` | ObjectId | MongoDB verir |
| `createdAt`, `updatedAt` | Date | `timestamps: true` ile kendiliğinden |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı? | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir, tarihe göre sıralı (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 8 · MongoDB |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | Sprint 8 · MongoDB |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Sprint 8 · MongoDB |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

### Status code'lar

200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 beklenmeyen sunucu hatası

- `GET /events/:id`: biçimi geçersiz id (`/events/yok`, `/events/111111`) ve biçimi doğru ama olmayan id (`/events/507f1f77bcf86cd799439011`) **404** döner, 500 değil.
- `POST /events`: şema doğrulaması başarısızsa (eksik alan, listede olmayan kategori, kısa başlık) **400** döner.
- Beklenmeyen hatalar hata middleware'inde yakalanır: kullanıcıya sadece `Server error` gider, sunucu çalışmaya devam eder.

### Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

### Etkinlik nesnesi

```json
{
  "_id": "6afd4615cbd0049eed000074",
  "title": "Drone Yapım Atölyesi",
  "category": "Atölye",
  "capacity": 24,
  "date": "2026-10-22",
  "time": "10:00",
  "location": "Elektronik Laboratuvarı 3",
  "description": "...",
  "createdAt": "2026-11-18T07:40:05.123Z",
  "updatedAt": "2026-11-18T07:40:05.123Z",
  "__v": 0
}
```

### POST /events

`title`, `category` ve `date` zorunludur. Başarılıysa 201 ve yeni `_id` ile `createdAt` içeren kayıt döner.

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

## Dosyalar

| Dosya | İşi |
| --- | --- |
| `src/server.js` | `.env`'i okur, önce veritabanına bağlanır, sonra portu dinler |
| `src/app.js` | Express uygulaması, middleware, route'lar, 404 ve hata yakalayıcı |
| `src/config/database.js` | MongoDB bağlantısı (`MONGODB_URI`) |
| `src/models/event-model.js` | Etkinlik şeması ve `Event` modeli |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | İsteği işler, `Event.find` / `findById` / `create` ile veritabanına gider |
| `src/data/seed-events.js` | Seed için 6 örnek etkinlik |
| `src/seed.js` | `npm run seed`: koleksiyonu siler, örnek etkinlikleri ekler |
| `requests/kampus-api.json` | Postman collection'ı (v2.1) |

## Test

`requests/kampus-api.json` dosyasını Postman'de **Import** ile aç. `npm run seed` ve `npm run dev` çalışırken istekleri sırayla gönder. 2. istek listedeki ilk kaydın `_id`'sini `{{eventId}}` değişkenine kaydeder, 3. istek bu `_id`'yi kullanır.

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | GET /health | 200 · ok + student |
| 2 | GET /events | 200 · 6 kayıt (seed sonrası), `_id` ve `createdAt` ile |
| 3 | GET /events/{{eventId}} | 200 · listedeki kayıt |
| 4 | GET /events/yok | 404 · geçersiz id |
| 5 | GET /events/507f1f77bcf86cd799439011 | 404 · olmayan `_id` |
| 6 | POST /events (tam body) | 201 · yeni `_id` |
| 7 | POST /events (sadece title) | 400 · `category` ve `date` zorunlu |

Kalıcılık testi: POST ile ekle, sunucuyu Ctrl+C ile durdur, `npm run dev` ile yeniden başlat; GET /events yeni kaydı da gösterir.
