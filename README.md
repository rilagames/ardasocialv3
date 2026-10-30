# Arda Öztiryaki — Yaratıcı masaüstü

Windows esintili, statik portfolyo. Harici paket, font, API veya derleme gerektirmez. Görseller sağlanan portfolyo PDF’sinden alınmıştır. Giriş metinleri ve proje başlıkları ilk taslaktır.

## Yerelde çalıştırma

Bu görev için mevcut `/workspace/ardasocialv3` klasörünü kullanın; yeni worktree gerekmez.

```sh
cd /workspace/ardasocialv3
python3 -m http.server 4173 --bind 0.0.0.0
```

İçerik ve proje listesi `app.js`, stiller `style.css`, görseller `assets/` içindedir. `app.js` içindeki kullanıcı metinleri HTML şablonlarıdır; dışarıdan güvenilmeyen içerik eklemeyin.

## Kontrol

İlk açılışta Word penceresi görünür. Masaüstündeki projeler ve görev çubuğu düğmeleri pencereleri açar. Kapatma, küçültme, büyütme, masaüstünü gösterme ve Başlat menüsünü kontrol edin. Masaüstünde başlık çubuğundan sürükleyin; mobilde pencereler ekrana uyarlanır. Escape ön plandaki pencereyi kapatır. Hareket azaltma tercihi desteklenir.

## GitHub Pages

`.github/workflows/pages.yml`, `main` dalına gönderim sonrası yalnızca site dosyalarını yayımlar. GitHub deposunda Settings → Pages → Source: GitHub Actions seçilmelidir. Tüm dosya yolları görecelidir; `/ardasocialv3/` altında çalışır. İlk GitHub bağlantıları sandbox tarafından engellendi. Desteklenen yetki yükseltmesiyle salt okunur erişim başarılı oldu; HEAD veya main dalı bulunmadı. Push veya yayın gerçekleştirilmedi.
