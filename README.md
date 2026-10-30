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

İlk açılışta Word penceresi görünür. Pencereler masaüstü simgeleri ve sağ uçtaki Başlat menüsünden açılır. Works (Seçilmiş işler), profil veya kategori içermeyen bir gönderi ızgarasıyla başlar. Gönderiye tıklanınca aynı Works penceresinde detay açılır; Geri düğmesi listeye, önceki kaydırma konumuna döner. Önceki/sonraki düğmeleri de aynı pencerede çalışır. Masaüstündeki post kısayolları bu ortak Works penceresine yönlendirilir.

Görev çubuğunda açık uygulamalar yerine sabit Instagram, LinkedIn ve e-posta bağlantıları yer alır. Sosyal profiller yeni sekmede, e-posta `mailto:ardaoztiryaki@gmail.com` ile açılır. Küçültülen pencereler ilgili masaüstü simgesi veya Başlat menüsü üzerinden geri getirilir. Önceki tecrübelerim klasöründeki Appen.txt, Krombera.txt ve Fevreka.txt ayrı metin pencereleri açar; bu belgelerin içerikleri daha sonra eklenecek.

Simgeler fareyle veya dokunarak sürüklenebilir; Alt + yön tuşlarıyla da taşınır. Konumlar yalnızca ziyaretçinin tarayıcısında, mobil ve masaüstü için ayrı saklanır. Tarayıcı depolamasına izin verilmezse sürükleme yine çalışır. Sağ tık veya bir simge üzerindeyken Shift + F10 menüyü açar. Menüde sıralama, yenileme, açma ve konum sıfırlama işlevlerini kontrol edin.

Kapatma, küçültme, büyütme, masaüstünü gösterme ve Başlat menüsünü kontrol edin. Masaüstünde pencereleri başlık çubuğundan sürükleyin; mobilde pencereler ekrana uyarlanır. Escape önce sağ tık menüsünü veya Başlat menüsünü kapatır; Works detayındayken listeye döner, diğer durumlarda ön plandaki pencereyi kapatır. Metin seçme ve Ctrl/Cmd+A yalnızca Word belgesinin içinde çalışır. Hareket azaltma tercihi desteklenir.

## GitHub Pages

`.github/workflows/pages.yml`, `main` dalına gönderim sonrası yalnızca site dosyalarını yayımlar. GitHub deposunda Settings → Pages → Source: GitHub Actions seçilmelidir. Tüm dosya yolları görecelidir; `/ardasocialv3/` altında çalışır. GitHub ağ işlemleri sandbox nedeniyle desteklenen komut yetki yükseltmesini gerektirebilir. Canlı yayın durumu GitHub Actions sonucundan doğrulanmalıdır.
