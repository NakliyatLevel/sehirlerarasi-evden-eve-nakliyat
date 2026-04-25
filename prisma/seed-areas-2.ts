import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const areas = [
  {
    slug: 'istanbul-rize',
    city: "İstanbul'dan Rize'ye",
    description: "İstanbul'dan Rize'ye taşınmak isteyen aileler için kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Çayeli, Ardeşen ve Fındıklı dahil tüm Rize ilçelerine sigortalı taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Rize'ye Evden Eve Nakliyat | Karadeniz Kapıdan Kapıya",
    metaDescription: "İstanbul Rize evden eve nakliyat. Çayeli, Ardeşen, Fındıklı dahil sigortalı sözleşmeli taşıma. Karadeniz güzergahında kapıdan kapıya hizmet. Ücretsiz keşif.",
    content: `<h2>Rize'ye Taşınıyorsunuz: <strong>Karadeniz'e Kadar</strong> Götürüyoruz</h2>
<p>İstanbul'dan Rize'ye taşınmak ciddi bir lojistik operasyon gerektirir. <em>1100 kilometrelik</em> bu güzergahta deneyimli ekibimiz çift sürücü sistemiyle çalışır; eşyalarınız güvenle Rize'ye ulaşır.</p>
<p>Rize merkezi ve Çayeli, Ardeşen, Fındıklı gibi ilçelere düzenli sefer yapıyoruz. <strong>Yamaç mahallesi</strong> ve dar yol gerektiren adresler için küçük araç ve ek hamal desteği önceden planlanır; taşıma günü sürpriz yaşamazsınız.</p>
<h2>Rize <u>Hizmet Kapsamı</u></h2>
<table><thead><tr><th>İlçe</th><th>Hizmet</th><th>Özel Not</th></tr></thead><tbody>
<tr><td>Rize merkez</td><td>Tam ev taşıma</td><td>Standart araç</td></tr>
<tr><td>Çayeli</td><td>Tam ev taşıma</td><td>Yamaç adres küçük araç</td></tr>
<tr><td>Ardeşen</td><td>Tam ev taşıma</td><td>Standart araç</td></tr>
<tr><td>Fındıklı</td><td>Tam ev taşıma</td><td>Yol durumuna göre</td></tr>
</tbody></table>
<h2>Bu Güzergahta <em>Fark Yaratan</em> Hizmetlerimiz</h2>
<ul>
<li>Çift sürücü sistemi; yasal güvence ve kesintisiz yolculuk</li>
<li>Karadeniz nemine karşı su geçirmez ambalaj uygulaması</li>
<li>Yamaç mahalle adreslerine küçük araç ve ek hamal desteği</li>
<li>GPS takipli araç; eşyalarınızın konumunu anlık görürsünüz</li>
<li>Yazılı sözleşme ve nakliyat sigortası standarttır</li>
</ul>
<ol>
<li>Rize adresinizi ve ilçenizi bildirin</li>
<li>Ekspertiz için İstanbul adresinize uzmanımız gelir</li>
<li>Yazılı teklif alırsınız; onaylarsanız tarih belirlenir</li>
<li>Ekip İstanbul'dan alır, Rize'ye teslim eder</li>
</ol>`,
  },
  {
    slug: 'istanbul-sinop',
    city: "İstanbul'dan Sinop'a",
    description: "İstanbul'dan Sinop'a taşınmak isteyen aileler için kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Sinop merkezi, Boyabat ve Erfelek dahil tüm ilçelere sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Sinop'a Evden Eve Nakliyat | Sigortalı Kapıdan Kapıya",
    metaDescription: "İstanbul Sinop evden eve nakliyat. Merkez, Boyabat, Erfelek dahil sigortalı sözleşmeli taşıma. Karadeniz'in kuzey ilçelerine kapıdan kapıya hizmet.",
    content: `<h2>Türkiye'nin Kuzeyine: <em>Sinop'a</em> Taşıyoruz</h2>
<p>Sinop'un tarihi yarımadasından yeni mahallelerine kadar her adrese taşıma yapıyoruz. <strong>700 kilometrelik</strong> bu güzergahta deneyimli ekibimiz eşyalarınızı güvenle Karadeniz'in kuzey buruna taşır.</p>
<p>Tarihi yarımada dar sokakları büyük araçlara kapalıdır. <em>Bu durumu bilen ekibimiz</em> küçük araç + hamal kombinasyonuyla sorunu baştan çözer; taşıma günü vakitçe teslim yapılır.</p>
<h2>Sinop <strong>Teslimat Planlaması</strong></h2>
<table><thead><tr><th>Bölge</th><th>Araç</th><th>Süre</th></tr></thead><tbody>
<tr><td>Yeni mahalleler</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Tarihi yarımada</td><td>Küçük araç</td><td>Aynı gün</td></tr>
<tr><td>Boyabat</td><td>7,5 ton</td><td>Aynı gün</td></tr>
<tr><td>Erfelek</td><td>7,5 ton</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Sinop Taşımalarında <u>Öne Çıkan Hizmetlerimiz</u></h2>
<ul>
<li>Tarihi sokak adreslerine özel küçük araç ve hamal planlaması</li>
<li>Nakliyat sigortası ile her eşya güvence altında</li>
<li>Yazılı sözleşme; teslim tarihi ve fiyat sabittir</li>
<li>Deniz nemine dayanıklı ambalaj malzemeleri</li>
<li>Boyabat ve Erfelek ilçelerine doğrudan teslimat</li>
</ul>
<ol>
<li>Sinop adresinizi ve taşınma tarihinizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif onaylanır; tarih kesinleşir</li>
<li>Eşyalarınız kapıdan alınır, Sinop'ta teslim edilir</li>
</ol>`,
  },
  {
    slug: 'istanbul-diyarbakir',
    city: "İstanbul'dan Diyarbakır'a",
    description: "İstanbul'dan Diyarbakır'a kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Bağlar, Kayapınar ve Yenişehir dahil tüm ilçelere çift sürücülü, sigortalı araçlarla taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Diyarbakır'a Evden Eve Nakliyat | Kapıdan Kapıya Taşıma",
    metaDescription: "İstanbul Diyarbakır evden eve nakliyat. Bağlar, Kayapınar, Yenişehir dahil sigortalı çift sürücülü taşıma. 1355 km güzergahta yazılı sözleşme güvencesi.",
    content: `<h2>Diyarbakır'a Taşınıyorsunuz: <strong>Güneydoğu'ya Götürüyoruz</strong></h2>
<p>1355 kilometrelik bu uzun güzergahta ekibimiz çift sürücü sistemiyle çalışır. <em>Eşyalarınız</em> İstanbul'daki evinizden alınır, Diyarbakır adresinize teslim edilir. Teslim tarihi yazılı sözleşmede belirtilir ve değişmez.</p>
<p>Kayapınar ve Bağlar'ın modern konutlarına büyük araçla giriş yapıyoruz. Tarihi surlar içi adreslerde ise küçük araç ve ekstra hamal planlaması önceden hazırlanır. <strong>Her adres türü</strong> için doğru çözümü önceden sunuyoruz.</p>
<h2>Diyarbakır <u>İlçe Hizmet Durumu</u></h2>
<table><thead><tr><th>İlçe / Bölge</th><th>Araç</th><th>Özel Durum</th></tr></thead><tbody>
<tr><td>Kayapınar</td><td>10 ton</td><td>Kolay erişim</td></tr>
<tr><td>Bağlar</td><td>10 ton</td><td>Kolay erişim</td></tr>
<tr><td>Yenişehir</td><td>7,5 ton</td><td>Orta</td></tr>
<tr><td>Surlar içi</td><td>Küçük araç</td><td>İzinle giriş</td></tr>
</tbody></table>
<h2>Bu Güzergahta <em>Sunduğumuz Güvenceler</em></h2>
<ul>
<li>Çift sürücü ile güvenli ve yasal seyir</li>
<li>GPS takip; eşyalarınızın konumu anlık görülür</li>
<li>Yazılı sözleşme ve nakliyat sigortası standarttır</li>
<li>Teslim tarihi garantisi; gecikmede sizi önceden bilgilendiririz</li>
<li>Söküm ve Diyarbakır'da montaj hizmeti</li>
</ul>
<ol>
<li>Diyarbakır ilçenizi ve taşınma tarihinizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif alırsınız; karar verirseniz tarih belirlenir</li>
<li>Çift sürücülü araç eşyalarınızı Diyarbakır'a teslim eder</li>
</ol>`,
  },
  {
    slug: 'istanbul-edirne',
    city: "İstanbul'dan Edirne'ye",
    description: "İstanbul'dan Edirne'ye en hızlı evden eve nakliyat hizmetini sunuyoruz. TEM güzergahında aynı gün teslim yapıyoruz. Keşan, Uzunköprü ve merkez dahil tüm ilçelere sigortalı taşıma.",
    metaTitle: "İstanbul'dan Edirne'ye Evden Eve Nakliyat | Aynı Gün Teslim",
    metaDescription: "İstanbul Edirne evden eve nakliyat. Merkez, Keşan, Uzunköprü dahil aynı gün sigortalı sözleşmeli taşıma. Yurt dışı eşya taşıması da yapılır.",
    content: `<h2>Edirne'ye <em>2,5 Saatte</em> Teslim Ediyoruz</h2>
<p>TEM otoyolunun bitiş noktasına yakın Edirne, aynı gün taşıma yapabildiğimiz en kısa güzergahlardan biridir. <strong>Sabah 07:00 yükleme</strong> ile öğleden önce Edirne adresinizde teslim gerçekleşir.</p>
<p>Kaleiçi'nin tarihi dokusu dar sokaklara sahipken Meydan ve çevre mahalleler standart büyük araçlara açıktır. <em>Keşan ve Uzunköprü</em> ilçelerine de düzenli sefer yapıyoruz. Yurt dışı kaynaklı eşya taşıması için gerekli belgeler konusunda da destek veriyoruz.</p>
<h2>Edirne <strong>İlçe ve Hizmet Durumu</strong></h2>
<table><thead><tr><th>Bölge</th><th>Araç</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Merkez (yeni)</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Kaleiçi</td><td>Küçük araç</td><td>Aynı gün</td></tr>
<tr><td>Keşan</td><td>7,5 ton</td><td>Aynı gün</td></tr>
<tr><td>Uzunköprü</td><td>7,5 ton</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Edirne Taşımalarında <u>Sunduğumuz Hizmetler</u></h2>
<ul>
<li>Aynı gün teslim garantisi; sabah yükle, öğlen teslim</li>
<li>Nakliyat sigortası ve yazılı sözleşme standarttır</li>
<li>Kaleiçi tarihi bölge adreslerinde küçük araç planlaması</li>
<li>Yurt dışından gelen eşyaların taşınması için evrak desteği</li>
<li>Tüm ilçelere tek ücret paket; ek sürpriz çıkmaz</li>
</ul>
<ol>
<li>Edirne adresinizi ve ilçenizi bildirin</li>
<li>Ekspertiz veya video keşifle teklif hazırlanır</li>
<li>Taşıma sabahı yükleme tamamlanır</li>
<li>Edirne'de teslim, istenen yere yerleştirme yapılır</li>
</ol>`,
  },
  {
    slug: 'istanbul-erzincan',
    city: "İstanbul'dan Erzincan'a",
    description: "İstanbul'dan Erzincan'a kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Üzümlü ve Tercan dahil tüm ilçelere çift sürücülü, sigortalı araçlarla taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Erzincan'a Evden Eve Nakliyat | Doğu Anadolu Taşıma",
    metaDescription: "İstanbul Erzincan evden eve nakliyat. Üzümlü, Tercan, Refahiye dahil sigortalı çift sürücülü taşıma. Yazılı sözleşme ve teslim garantisi.",
    content: `<h2>Doğu Anadolu'nun Kapısına: <em>Erzincan'a Taşıyoruz</em></h2>
<p>1255 kilometre mesafeli bu güzergahta çift sürücü sistemiyle çalışıyoruz. <strong>Eşyalarınız İstanbul'dan alınır</strong>, Fırat vadisindeki Erzincan adresinize güvenle teslim edilir.</p>
<p>Erzincan merkezi depremlerin ardından modern planlamayla yeniden inşa edilmiştir. Geniş bulvarlar büyük araç erişimini kolaylaştırır. <em>Üzümlü ve Tercan</em> gibi uzak ilçelere de doğrudan hizmet veriyoruz.</p>
<h2>Erzincan <u>Taşıma Paketi İçeriği</u></h2>
<table><thead><tr><th>Hizmet</th><th>Dahil mi?</th></tr></thead><tbody>
<tr><td>Çift sürücü</td><td>Evet</td></tr>
<tr><td>Ambalaj</td><td>Evet</td></tr>
<tr><td>Sigorta</td><td>Evet</td></tr>
<tr><td>Söküm montaj</td><td>Evet</td></tr>
<tr><td>GPS takip</td><td>Evet</td></tr>
</tbody></table>
<h2>Neden <strong>Bizi Seçmelisiniz?</strong></h2>
<ul>
<li>Doğu Anadolu güzergahlarında yüzlerce tamamlanmış taşıma</li>
<li>Yazılı sözleşme ile teslim tarihi ve fiyat güvencesi</li>
<li>Çift sürücü güvenli seyir; sürücü yorgunluğu riski sıfır</li>
<li>Tercan ve Üzümlü gibi ilçelere doğrudan teslimat</li>
<li>Hasar durumunda nakliyat sigortası tazminat güvencesi</li>
</ul>
<ol>
<li>Erzincan adresinizi ve taşınma tarihinizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif onaylanır; hareket tarihi belirlenir</li>
<li>Ekip Erzincan'da teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-giresun',
    city: "İstanbul'dan Giresun'a",
    description: "İstanbul'dan Giresun'a kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Bulancak, Espiye ve Tirebolu dahil tüm Giresun ilçelerine sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Giresun'a Evden Eve Nakliyat | Karadeniz Kapıdan Kapıya",
    metaDescription: "İstanbul Giresun evden eve nakliyat. Bulancak, Espiye, Tirebolu dahil sigortalı sözleşmeli taşıma. Karadeniz güzergahında kapıdan kapıya hizmet.",
    content: `<h2>Giresun'a Taşınıyorsunuz: <em>Fındık Kokusu</em> Beklediğinde Biz Hazırız</h2>
<p>İstanbul'dan Giresun'a taşınmak için doğru yer burasıdır. <strong>Ekibimiz 1055 kilometrelik</strong> bu güzergahı yüzlerce kez tamamladı; Karadeniz kıyısına taşınmanın tüm inceliklerini biliyoruz.</p>
<p>Altınordu merkezi, Bulancak ve Espiye ilçelerine düzenli sefer yapıyoruz. <em>Tepe mahalleleri</em> için küçük araç ve ekstra hamal planlıyoruz; eşyalarınız hangi katta olursa olsun teslim edilir.</p>
<h2>Giresun <strong>İlçe Hizmet Kapsamı</strong></h2>
<table><thead><tr><th>İlçe</th><th>Araç</th><th>Ek Hizmet</th></tr></thead><tbody>
<tr><td>Altınordu</td><td>10 ton</td><td>Standart</td></tr>
<tr><td>Bulancak</td><td>7,5 ton</td><td>Standart</td></tr>
<tr><td>Espiye</td><td>7,5 ton</td><td>Standart</td></tr>
<tr><td>Tirebolu</td><td>7,5 ton</td><td>Kıyı yol dikkat</td></tr>
</tbody></table>
<h2>Giresun Taşımalarında <u>Öne Çıkan Hizmetlerimiz</u></h2>
<ul>
<li>Karadeniz nemine uygun su geçirmez ambalaj</li>
<li>Tepe mahallesi adreslerine küçük araç + hamal desteği</li>
<li>Nakliyat sigortası standarttır; her eşya güvenceli</li>
<li>Çift sürücü sistemi; uzun yolda güvenli seyir</li>
<li>Teslim sonrası montaj ve eşya yerleştirme hizmeti</li>
</ul>
<ol>
<li>Giresun adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ekspertiz randevusu alın</li>
<li>Yazılı teklif onaylanır; tarih belirlenir</li>
<li>Ekip Giresun'da teslim ve yerleştirme yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-kars',
    city: "İstanbul'dan Kars'a",
    description: "İstanbul'dan Kars'a kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Sarıkamış ve Ardahan dahil Doğu Anadolu'nun bu uzak ilçelerine çift sürücülü ve sigortalı araçlarla taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Kars'a Evden Eve Nakliyat | Doğu Sınırına Taşıma",
    metaDescription: "İstanbul Kars evden eve nakliyat. Sarıkamış, Ardahan dahil sigortalı çift sürücülü taşıma. Yazılı sözleşme ve teslim tarihi garantisi.",
    content: `<h2>Kars'a Taşınıyorsunuz: <strong>Türkiye'nin Doğusuna</strong> Ulaşıyoruz</h2>
<p>1645 kilometre mesafe Kars'ı İstanbul'dan uzak bir nokta gibi gösterir. Ama ekibimiz için bu güzergah tanıdıktır. <em>Çift sürücü sistemi</em>, GPS takip ve konaklama planlamasıyla eşyalarınız güvenle Kars'a ulaşır.</p>
<p>Kars merkezi geniş alanları sayesinde büyük araç girişine açıktır. <strong>Sarıkamış'ın yüksek kesimleri</strong> ve Ardahan yönündeki adresler için araç seçimi önceden değerlendirilir.</p>
<h2>Kars <u>Taşıma Hizmet Paketi</u></h2>
<table><thead><tr><th>Hizmet</th><th>Kapsam</th></tr></thead><tbody>
<tr><td>Çift sürücü</td><td>Tüm sefer boyunca</td></tr>
<tr><td>Konaklama planı</td><td>Güzergah üzeri</td></tr>
<tr><td>Soğuk hava ambalajı</td><td>Kış döneminde</td></tr>
<tr><td>GPS takip</td><td>Anlık konum</td></tr>
<tr><td>Nakliyat sigortası</td><td>Tam hasar</td></tr>
</tbody></table>
<h2>Kars Taşımalarında <em>Neden Biz?</em></h2>
<ul>
<li>Doğu Anadolu'nun uzak güzergahlarında kanıtlanmış hizmet geçmişi</li>
<li>Kış taşımalarında ısı yalıtımlı araç seçeneği sunuyoruz</li>
<li>Yazılı sözleşme ve teslim tarihi garantisi</li>
<li>GPS takip ile eşyalarınızı her an izleyebilirsiniz</li>
<li>Sarıkamış ve Ardahan ilçelerine doğrudan teslimat</li>
</ul>
<ol>
<li>Kars adresinizi ve taşınma tarihinizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Güzergah ve konaklama planı hazırlanır</li>
<li>Ekip Kars'ta teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-kayseri',
    city: "İstanbul'dan Kayseri'ye",
    description: "İstanbul'dan Kayseri'ye kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Melikgazi, Kocasinan, Talas ve Develi dahil tüm ilçelere sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Kayseri'ye Evden Eve Nakliyat | Erciyes Eteklerine Taşıma",
    metaDescription: "İstanbul Kayseri evden eve nakliyat. Melikgazi, Kocasinan, Talas dahil sigortalı sözleşmeli taşıma. Ücretsiz ekspertiz ile sabit fiyat teklifi alın.",
    content: `<h2>Erciyes'in Gölgesindeki Şehre: <em>Kayseri'ye Taşıyoruz</em></h2>
<p>İstanbul'dan Kayseri'ye düzenli sefer yapan ekibimiz bu 775 kilometrelik güzergahı iyi bilir. <strong>Melikgazi, Kocasinan ve Talas</strong> ilçelerine haftalık seferimiz mevcuttur; eşyalarınız teslim gününde adresinizde olur.</p>
<p>Kayseri'nin geniş bülvarları büyük araç hareketine uygundur. <em>Develi ve köy adresleri</em> için ek mesafe planlaması yapılır; bu bilgi teklif aşamasında tarafınıza açıkça iletilir.</p>
<h2>Kayseri <strong>İlçe Teslimat Tablosu</strong></h2>
<table><thead><tr><th>İlçe</th><th>Sefer</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Melikgazi</td><td>Haftalık</td><td>Aynı gün</td></tr>
<tr><td>Kocasinan</td><td>Haftalık</td><td>Aynı gün</td></tr>
<tr><td>Talas</td><td>Haftalık</td><td>Aynı gün</td></tr>
<tr><td>Develi</td><td>Talep üzerine</td><td>Ertesi gün</td></tr>
</tbody></table>
<h2>Kayseri Taşımalarında <u>Hizmet Kapsamımız</u></h2>
<ul>
<li>İstanbul'da ücretsiz yerinde ekspertiz</li>
<li>Tüm eşyalara ambalaj; kırılganlara çift kat koruma</li>
<li>Dolap, karyola ve mutfak söküm ile Kayseri'de montaj</li>
<li>Nakliyat sigortası; rayiç değer tazminat güvencesi</li>
<li>Sabit fiyat; teklif gününden taşıma gününe rakam değişmez</li>
</ul>
<ol>
<li>Kayseri ilçenizi ve taşınma tarihinizi bildirin</li>
<li>Ekspertiz randevusu alın; uzmanımız eve gelir</li>
<li>Yazılı teklif onaylanır; tarih kesinleşir</li>
<li>Kayseri'de teslim, yerleştirme ve montaj tamamlanır</li>
</ol>`,
  },
  {
    slug: 'istanbul-konya',
    city: "İstanbul'dan Konya'ya",
    description: "İstanbul'dan Konya'ya kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Selçuklu, Meram, Karatay ve Çumra dahil tüm ilçelere sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Konya'ya Evden Eve Nakliyat | Anadolu'nun Kalbine Taşıma",
    metaDescription: "İstanbul Konya evden eve nakliyat. Selçuklu, Meram, Karatay dahil sigortalı sözleşmeli taşıma. Ücretsiz ekspertiz ile sabit fiyat teklifi alın.",
    content: `<h2>Konya'ya Taşınıyorsunuz: <strong>İç Anadolu'ya</strong> Götürüyoruz</h2>
<p>İstanbul'dan Konya'ya haftalık düzenli sefer yapan ekibimiz bu 665 kilometrelik güzergahta eşyalarınızı güvenle teslim eder. <em>Selçuklu'nun modern sitelerinden</em> Meram'ın bağ evlerine kadar her adrese ulaşıyoruz.</p>
<p>Karatay'ın tarihi mahallelerinde büyük araç girişi kısıtlı olabilir. <strong>Bu tür adresler için küçük araç planlaması</strong> teklif aşamasında yapılır; taşıma günü sürpriz yaşanmaz.</p>
<h2>Konya <u>İlçe Hizmet Durumu</u></h2>
<table><thead><tr><th>İlçe</th><th>Araç</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Selçuklu</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Meram</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Karatay (yeni)</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Karatay (tarihi)</td><td>Küçük araç</td><td>Aynı gün</td></tr>
<tr><td>Çumra</td><td>7,5 ton</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Neden <em>Bizi Tercih Ediyorlar?</em></h2>
<ul>
<li>Yazılı sözleşme; fiyat ve teslim tarihi sabittir</li>
<li>Nakliyat sigortası ile her eşya güvence altında</li>
<li>Tarihi mahalle adreslerine özel küçük araç planlaması</li>
<li>Selçuklu ve Meram ilçelerine haftalık düzenli sefer</li>
<li>Teslim sonrası montaj ve eşya yerleştirme hizmeti</li>
</ul>
<ol>
<li>Konya ilçenizi ve taşınma tarihinizi bildirin</li>
<li>Ücretsiz ekspertiz için randevu alın</li>
<li>Yazılı teklif alırsınız; onaylarsanız tarih belirlenir</li>
<li>Ekip Konya'da teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-manisa',
    city: "İstanbul'dan Manisa'ya",
    description: "İstanbul'dan Manisa'ya kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Turgutlu, Salihli, Akhisar ve Kula dahil tüm ilçelere sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Manisa'ya Evden Eve Nakliyat | Ege Ovasına Taşıma",
    metaDescription: "İstanbul Manisa evden eve nakliyat. Turgutlu, Salihli, Akhisar, Kula dahil sigortalı sözleşmeli taşıma. Ücretsiz ekspertiz ile sabit fiyat teklifi alın.",
    content: `<h2>Gediz Ovasına Taşınıyorsunuz: <em>Manisa'ya Götürüyoruz</em></h2>
<p>İstanbul'dan Manisa'ya 575 kilometrelik bu güzergahta ekibimiz haftada birden fazla sefer yapıyor. <strong>Turgutlu, Salihli, Akhisar</strong> ve merkez ilçelere aynı gün teslim mümkündür.</p>
<p>Manisa'nın organize sanayi bölgesi yakını adreslerden Kula'nın dağlık ilçelerine kadar her noktaya ulaşıyoruz. <em>Büyük hacimli taşımalar</em> için filo araçlarımızdan en uygun kombinasyonu seçiyoruz.</p>
<h2>Manisa <strong>İlçe Teslimat Kapsamı</strong></h2>
<table><thead><tr><th>İlçe</th><th>Sefer</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Manisa merkez</td><td>Haftalık</td><td>Aynı gün</td></tr>
<tr><td>Turgutlu</td><td>Haftalık</td><td>Aynı gün</td></tr>
<tr><td>Salihli</td><td>Haftalık</td><td>Aynı gün</td></tr>
<tr><td>Akhisar</td><td>Haftalık</td><td>Aynı gün</td></tr>
<tr><td>Kula</td><td>Talep üzerine</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Manisa Taşımalarında <u>Sunduğumuz Güvenceler</u></h2>
<ul>
<li>Sabit fiyat garantisi; teklif değişmez</li>
<li>Nakliyat sigortası ve yazılı sözleşme</li>
<li>Turgutlu ve Salihli ilçelerine haftalık düzenli sefer</li>
<li>Dolap, karyola söküm ve Manisa'da montaj</li>
<li>Ambalaj malzemeleri dahil; ayrıca ücret yok</li>
</ul>
<ol>
<li>Manisa ilçenizi ve ev büyüklüğünüzü bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif 24 saat içinde gelir</li>
<li>Taşıma günü ekip Manisa'da teslim ve montaj yapar</li>
</ol>`,
  },
]

async function main() {
  console.log('Bölgeler (11-20) ekleniyor...')
  for (const area of areas) {
    await prisma.serviceArea.upsert({
      where: { slug: area.slug },
      update: area,
      create: { ...area, active: true },
    })
    console.log(`✓ ${area.city}`)
  }
  console.log('Bölgeler 11-20 tamamlandı!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
