import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding services...')

  const services = [
    // ─── BİREYSEL TAŞIMACILIK ───
    {
      name: 'Ev Taşıma',
      slug: 'ev-tasima',
      description: 'Eşyalarınız kapıdan teslim alınır, yeni adresinize kusursuz teslim edilir. Çift kat streç film, köpük tampon ve tahta kasalı ambalaj sistemiyle her parçanız güvende.',
      metaTitle: 'Ev Taşıma Hizmeti | Sigortalı Evden Eve Nakliyat',
      metaDescription: 'Ev taşıma sürecinizde sigortalı taşıma, profesyonel ambalaj ve montaj hizmeti. Aynı gün ekspertiz, ertesi gün taşıma imkânı.',
      benefits: `Sigortalı taşıma güvencesi\nÇift kat streç film ambalaj\nKöpük ve tahta kasa koruma\nAynı gün ekspertiz\nKapıdan kapıya teslimat\nMontaj ve demontaj dahil`,
      content: `<h2>Ev Taşıma <strong>Sandığınızdan Farklı</strong> Bir Süreçtir</h2>
<p>Çoğu insan taşınmayı eşyaları arabaya doldurmak olarak tasarlar. Gerçekte ise onlarca değişken eş zamanlı yönetilir. <em>Kat sayısı, asansör boyutu</em> ve merdiven açısı birbirinden bağımsız hesaplanamaz.</p>
<p>Yanlış bir hamle yalnızca mobilyayı değil; kapı pervazını ve boya katmanını da riske atar. <strong>Deneyimli bir ekip</strong> bu değişkenleri başından görür ve planlar.</p>
<h2>Taşıma Öncesi <u>Hazırlık Listesi</u></h2>
<ul>
<li>Taşınma tarihini en az 72 saat öncesinden kesin belirleyin</li>
<li>Kırılacak eşyaları ayrı listeleyin; ekiple mutlaka paylaşın</li>
<li>Asansör boyutunu ölçün ve büyük mobilyaları önceden sınıflandırın</li>
<li>Sigorta kapsamını yazılı talep edin; sözlü beyan yetmez</li>
<li>Yeni adresteki araç erişim durumunu önceden sorun</li>
<li>Küçük çocuklar ve evcil hayvanlar için ayrı düzenleme yapın</li>
</ul>
<h2>Ambalaj Katmanları: <strong>Eşya Türüne Göre Standartlar</strong></h2>
<table><thead><tr><th>Eşya Türü</th><th>Birinci Katman</th><th>İkinci Katman</th><th>Risk Düzeyi</th></tr></thead><tbody>
<tr><td>Cam ve porselen</td><td>Köpük folyosu</td><td>Balonlu naylon + tahta kasa</td><td>Çok yüksek</td></tr>
<tr><td>Büyük mobilya</td><td>Tekstil battaniye</td><td>Çift kat streç film</td><td>Orta</td></tr>
<tr><td>Elektronik cihazlar</td><td>Antistatik torba</td><td>Köpük tampon</td><td>Yüksek</td></tr>
<tr><td>Giysi ve tekstil</td><td>—</td><td>Vakumlu torba</td><td>Düşük</td></tr>
</tbody></table>
<h2>Taşıma Günü <em>Adım Adım</em> Akış</h2>
<ol>
<li>Ekip adrese gelir; her odayı hızlıca değerlendirir</li>
<li>Risk sınıfındaki eşyalar önce paketlenir</li>
<li>Asansör veya merdiven planı netleştirilir; sıralama başlar</li>
<li>Araç yüklemesi ağırlık dağılımına göre düzenlenir</li>
<li>Yeni adrese ulaşıldığında eşyalar kontrol listesiyle sayılır</li>
<li>Montaj tamamlanır; imzalı hasar tutanağı düzenlenir</li>
</ol>
<h2><strong>Sigorta Olmadan</strong> Taşınan Eşyanın Riski</h2>
<p>Sözlü güvence yalnızca iyi niyet göstergesidir. Zarar gören bir eşya, <u>poliçe numarası</u> olmadan tazminat sürecine giremez.</p>
<p>Poliçe yalnızca kaza anını değil; yükleme, nakil ve tahliye aşamalarını da kapsar. <em>İmza öncesinde</em> bu üç aşamanın da güvencede olduğunu teyit edin.</p>`,
      order: 1,
      active: true,
    },
    {
      name: 'Villa Taşımacılığı',
      slug: 'villa-tasimaciligi',
      description: 'Geniş avlular, özel mobilyalar ve sanat eserleriyle dolu villa taşımalarında uygulanan titiz planlama süreci, sıradan nakliyattan farklı bir uzmanlık gerektirir.',
      metaTitle: 'Villa Taşımacılığı | Özel Eşya Taşıma Hizmeti',
      metaDescription: 'Villa taşımacılığında özel ambalaj, özel araç ve uzman ekip. Bahçe mobilyaları, sanat eseri ve antika taşıma garantisi.',
      benefits: `Özel araç ve lift sistemi\nAntika ve sanat eseri taşıma\nBahçe mobilyası ambalajı\nEkstra sigorta seçeneği\nMimari ön keşif raporu\nDemontaj-montaj ekibi dahil`,
      content: `<h2>Villa Taşıması <strong>Lojistik Değil</strong>, Mimari Okumadır</h2>
<p>Bir villayı taşımak ile sıradan bir daireyi taşımak arasındaki uçurum, eşya miktarından değil mekân karmaşıklığından kaynaklanır. <em>Bahçe geçişleri, yüksek tavanlar</em> ve kat sayısı her seferinde yeni bir plan gerektirir.</p>
<p>Giriş kapısı geniş olabilir; ama uzun koridorların dirsek açısı büyük mobilyaları çaresiz bırakır. <strong>Lift sistemi</strong> bu noktada merdiven dışı alternatif sunar.</p>
<h2>Villa Eşyalarının <u>Öncelik Sırasına Göre</u> Sınıflandırılması</h2>
<table><thead><tr><th>Eşya Kategorisi</th><th>Ambalaj Yöntemi</th><th>Ekip Profili</th><th>Öncelik</th></tr></thead><tbody>
<tr><td>Antika mobilya</td><td>Tahta kasa + köpük astar</td><td>Uzman paketçi</td><td>1. sıra</td></tr>
<tr><td>Tablo ve heykel</td><td>Özel asitsiz sandık</td><td>Sertifikalı taşıyıcı</td><td>1. sıra</td></tr>
<tr><td>Bahçe mobilyası</td><td>Streç + tekstil örtü</td><td>Genel ekip</td><td>2. sıra</td></tr>
<tr><td>Akıllı ev sistemleri</td><td>Etiketli demontaj</td><td>Teknik personel</td><td>Son aşama</td></tr>
</tbody></table>
<h2>Taşıma Öncesi <strong>Mimari Keşif Süreci</strong></h2>
<ul>
<li>Giriş kapısı ve koridor ölçüleri milimetrik olarak alınır</li>
<li>Bahçe geçiş güzergâhları ve zemin türü belirlenir</li>
<li>Vinç ya da lift ihtiyacı keşif sırasında kararlaştırılır</li>
<li>Komşu parselle sınır mesafesi araç manevra alanı için not edilir</li>
<li>Elektrik ve su bağlantı noktaları haritası çıkarılır</li>
</ul>
<h2>Teslim Sonrası <em>Yerleşim Protokolü</em></h2>
<ol>
<li>Mimari plana göre her mobilya konumlandırılır</li>
<li>Akıllı ev cihazları yeniden programlanır ve test edilir</li>
<li>Bahçe mobilyaları yerleştirilir; hasar kontrolü yapılır</li>
<li>Tüm ambalaj malzemeleri toplanarak uzaklaştırılır</li>
<li>İmzalı teslim tutanağı iki nüsha düzenlenir</li>
</ol>
<h2>Villa Taşımacılığında <strong>Sigorta Kapsamı</strong></h2>
<p>Standart nakliyat poliçesi antika ve sanat eserlerini yeterince korumaz. <u>Ek değer beyan sigortası</u> bu boşluğu kapatır. Tablo veya heykel taşımadan önce bağımsız değerleme yaptırmanızı öneririz.</p>`,
      order: 2,
      active: true,
    },
    {
      name: 'Yalı Taşımacılığı',
      slug: 'yali-tasimaciligi',
      description: 'Deniz kenarında konumlanan yalıların özgün mimarisi, taşıma sürecini teknik açıdan çok katmanlı kılar. İskele erişimi, nem koruması ve tarihi yapı hassasiyeti ön planda tutulur.',
      metaTitle: 'Yalı Taşımacılığı | Tarihi Yapılarda Nakliyat Hizmeti',
      metaDescription: 'Yalı taşımacılığında iskele erişimi, nem korumalı ambalaj ve tarihi yapıya zarar vermeyen tekniklerle güvenli nakliyat.',
      benefits: `İskele ve deniz yolu erişimi\nNem korumalı ambalaj sistemi\nTarihi yapıya uygun teknikler\nAntika ve ahşap mobilya uzmanlığı\nÖzel sigorta kapsamı\nLojistik ön planlama`,
      content: `<h2>Yalı Taşıması: <em>Denizin Getirdiği</em> Teknik Güçlükler</h2>
<p>Boğaz yalıları ahşap çatılarıyla tarihin içinde durur. Her oda ayrı bir kırılganlık taşır. <strong>Rutubet, alçak tavan</strong> ve zemin kaplamaları standart taşıma ekipmanını kullanılamaz kılar.</p>
<p>Park alanı yoktur; araçlar yüzlerce metre uzaktan manevra yapar. <em>Her sefer</em>, iki tur yerine üç tur anlamına gelir. Zaman planlaması bu yüzden gün içinde defalarca revize edilir.</p>
<h2>Yalı Yapılarında <strong>Operasyonel Zorluklar</strong></h2>
<ul>
<li>Yüzyıllık ahşap merdivenlere sıfır baskı uygulanmalı</li>
<li>Deniz nemi ambalaj malzemesini 4-6 saatte bozabilir; stok hazır tutulur</li>
<li>Alçak tavan profiline sahip odalardan büyük parça çıkarımı özel açı gerektirir</li>
<li>Araç park alanı kısıtlıysa sefer sayısı önceden hesaplanır</li>
<li>Tarihi zemin kaplamalarına zarar vermemek için keçe altlık şarttır</li>
</ul>
<h2>Nem Korumalı <u>Ambalaj Malzeme Tablosu</u></h2>
<table><thead><tr><th>Malzeme</th><th>Nem Direnci</th><th>Kullanım Alanı</th><th>Dayanım Süresi</th></tr></thead><tbody>
<tr><td>Alüminyum kaplı balonlu naylon</td><td>Çok yüksek</td><td>Elektronik, tekstil</td><td>8+ saat</td></tr>
<tr><td>Mum emprenye ahşap kasa</td><td>Yüksek</td><td>Tablo, porselen</td><td>12+ saat</td></tr>
<tr><td>Silika jel torba</td><td>Orta</td><td>Kitap, kâğıt</td><td>6 saat</td></tr>
</tbody></table>
<h2>İskele Erişimli <em>Güzergâh Planı</em></h2>
<ol>
<li>Deniz cephesi erişim haritası çıkarılır; kapı ölçüleri alınır</li>
<li>Tekne ya da sal gereksinimi operasyon öncesinde değerlendirilir</li>
<li>Kara yolu alternatifleri yedek güzergâh olarak hazır tutulur</li>
<li>Her sefer tamamlandığında eşya sayım listesi güncellenir</li>
<li>Son sefer sonrası nihai kontrol ve hasar tutanağı düzenlenir</li>
</ol>
<h2>Tarihi Yapıda <strong>Hasar Önleme Protokolü</strong></h2>
<p>Bir ahşap kirişin çizilmesi geri döndürülemez. <u>Restorasyon maliyeti</u> çoğu zaman taşıma bedelini kat kat aşar. Ekip, bina içinde her adımda keçe altlık ve köşe koruyucu kullanır.</p>
<p><em>Tüm bu önlemler</em> yalnızca yapıyı değil; müşteriyi de anlaşmazlıktan korur. İmzalı giriş çıkış tutanağı ek güvence sağlar.</p>`,
      order: 3,
      active: true,
    },
    {
      name: 'Parça Eşya Taşımacılığı',
      slug: 'parca-esya-tasimaciligi',
      description: 'Tek koltuk, bir dolap ya da birkaç kutudan ibaret taşımalarda tam araç kiralamak ekonomik değil. Parça eşya sistemiyle yalnızca kullandığınız alan için ücret ödersiniz.',
      metaTitle: 'Parça Eşya Taşımacılığı | Tek Eşya Nakliyat',
      metaDescription: 'Tek mobilya veya az sayıda eşya taşımak için ekonomik parça eşya nakliyat hizmeti. Şehir içi ve şehirler arası.',
      benefits: `Kullandığın kadar öde sistemi\nAynı gün teslimat seçeneği\nOnline fiyat hesaplama\nSigortalı taşıma\nŞehir içi ve şehirlerarası\nHızlı randevu`,
      content: `<h2>Parsiyel Sistem <em>Tam Araçtan</em> Ne Farkeder?</h2>
<p>Tek bir koltuk için komple kamyon kiralamak, boş hacmin parasını ödemek demektir. <strong>Parsiyel sistem</strong> aynı araca farklı müşterilerin eşyalarını bir araya getirir. Siz yalnızca kapladığınız metreküp kadar ödersiniz.</p>
<p>Maliyet avantajı gerçekten belirgindir. <em>Aynı güzergahta</em> tam araçla karşılaştırıldığında yüzde elli ila yetmiş tasarruf sağlanır.</p>
<h2>Hangi Durumda <u>Doğru Tercih</u> Budur?</h2>
<ul>
<li>Online alışverişten gelen büyük boyutlu kargo teslimatları</li>
<li>Öğrenci yurdu ya da kiralık oda taşımaları</li>
<li>İkinci el mobilya alım-satım transferleri</li>
<li>Ofis için tek kalemde sipariş verilen ekipman teslimatları</li>
<li>Depodan parçalı ve kademeli çekim gereksinimleri</li>
</ul>
<h2>Fiyat Belirleme <strong>Değişkenler Tablosu</strong></h2>
<table><thead><tr><th>Değişken</th><th>Fiyata Katkısı</th><th>Not</th></tr></thead><tbody>
<tr><td>Hacim (m³)</td><td>Ana belirleyici</td><td>Min. 0,5 m³ faturalanır</td></tr>
<tr><td>Mesafe (km)</td><td>Yakıt payı</td><td>100 km altı sabit tarife</td></tr>
<tr><td>Kat ve asansör</td><td>İşçilik farkı</td><td>4. kat üstü ek ücret</td></tr>
<tr><td>Ambalaj talebi</td><td>Malzeme bedeli</td><td>İsteğe bağlı</td></tr>
</tbody></table>
<h2>Süreç <em>Baştan Sona</em> Nasıl İşler?</h2>
<ol>
<li>Online form ya da telefonla eşya listesi ve adres bilgisi iletilir</li>
<li>Hacim ölçümüne göre anlık fiyat teklifi oluşturulur</li>
<li>Randevu onaylanır; gün ve saat SMS ile hatırlatılır</li>
<li>Eşya teslim alınır; konşimento düzenlenerek müşteriye kopyası verilir</li>
<li>Hedef adrese teslimatta imzalı tutanak düzenlenir</li>
</ol>
<h2>Güvence <strong>Tam Araçtan Farksız</strong></h2>
<p>Her gönderi ayrı mühürlenir ve konşimento numarasıyla izlenir. <u>Hasar ya da kayıp</u> durumunda sigorta devreye girer; parsiyel olması kapsam dışına çıkarmaz.</p>`,
      order: 4,
      active: true,
    },
    {
      name: 'Şehir İçi Evden Eve Nakliyat',
      slug: 'sehir-ici-evden-eve-nakliyat',
      description: 'Aynı şehir içinde mahalle değiştirmek de ev taşımak kadar titizlik ister. Kısa mesafe, küçük hata payı demek değildir; aksine hız ve hassasiyetin bir arada yönetilmesidir.',
      metaTitle: 'Şehir İçi Evden Eve Nakliyat | Aynı Gün Taşıma',
      metaDescription: 'Şehir içi nakliyatta aynı gün taşıma, sigortalı taşıma ve montaj dahil hizmet. Trafik optimizasyonlu rota planlaması.',
      benefits: `Aynı gün taşıma imkânı\nTrafik rota optimizasyonu\nSigortalı taşıma\nMontaj-demontaj dahil\nSaatlik değil iş bazlı ücret\nHızlı ekip kurulumu`,
      content: `<h2>Kısa Mesafe <strong>Küçük Risk</strong> Anlamına Gelmiyor</h2>
<p>Şehir içi taşımalarda en çok hasar yaşanan an, uzun yol değildir. <em>Hız baskısı altındaki köşe manevrasında</em> bir koltuk kolu duvara çarpıverir. Trafik, dar sokak ve otopark sorunu eş zamanlı yönetilir.</p>
<p>Günün bitmesi beklentisi baskı yaratır. <strong>Plansız her taşıma</strong> bu baskıya kapılır; paketleme hataları oradan başlar.</p>
<h2>Şehir İçinde <u>Gözden Kaçan Detaylar</u></h2>
<ul>
<li>Sabah trafik yoğunluğu saatleri önceden incelenmelidir</li>
<li>Park yasağı olan caddelerde belediyeden izin alınmalıdır</li>
<li>Site asansörü için yönetimle rezervasyon koordinasyonu zorunludur</li>
<li>Dar girişler için panelvan alternatifi önceden belirlenmeli</li>
<li>Yeni adresteki park koşulları taşınma günü için netleştirilmeli</li>
</ul>
<h2>Konut Tipine Göre <strong>Araç ve Ekip Eşleşmesi</strong></h2>
<table><thead><tr><th>Konut Tipi</th><th>Araç</th><th>Ekip Sayısı</th><th>Tahmini Süre</th></tr></thead><tbody>
<tr><td>Stüdyo / 1+1</td><td>Panelvan</td><td>2 kişi</td><td>2–3 saat</td></tr>
<tr><td>2+1 / 3+1</td><td>Orta kamyon</td><td>3–4 kişi</td><td>4–6 saat</td></tr>
<tr><td>4+1 ve üzeri</td><td>Büyük kamyon</td><td>5–6 kişi</td><td>6–8 saat</td></tr>
</tbody></table>
<h2>Operasyon Günü <em>Saat Saat Akış</em></h2>
<ol>
<li>Ekip sabah erken adrese gelir; bina girişini ve asansörü değerlendirir</li>
<li>Risk sınıfındaki eşyalar paketlenerek ilk arabaya yüklenir</li>
<li>Yükleme tamamlandıktan sonra araç mühürlenir ve kamerayla belgelenir</li>
<li>Rota trafik durumuna göre güncellenerek yola çıkılır</li>
<li>Tahliye, montaj ve yerleşim tamamlandıktan sonra tutanak imzalanır</li>
</ol>
<h2>Aynı Gün <strong>Teslimat Mümkün Mü?</strong></h2>
<p>Sabah sekizde başlayan operasyonlarda 3+1 bir konut akşama kadar yerleşir. <u>Ekspertiz ve planlamanın</u> bir gün öncesinden tamamlanmış olması bu hedef için zorunludur.</p>`,
      order: 5,
      active: true,
    },
    {
      name: 'Şehirler Arası Evden Eve Nakliyat',
      slug: 'sehirler-arasi-evden-eve-nakliyat',
      description: 'İstanbul\'dan Ankara\'ya, Bursa\'dan İzmir\'e ya da Türkiye\'nin herhangi iki şehri arasında güvenli nakliyat. Uzun mesafe taşımacılıkta sigorta ve güzergah planlaması hayat kurtarır.',
      metaTitle: 'Şehirler Arası Evden Eve Nakliyat | Türkiye Geneli Taşıma',
      metaDescription: 'Türkiye genelinde şehirler arası nakliyat. Sigortalı taşıma, GPS takipli araçlar ve kapıdan kapıya teslimat.',
      benefits: `GPS takipli araç filosu\nTüm Türkiye kapsamı\nSigortalı taşıma güvencesi\nKapıdan kapıya teslimat\nOnline gönderi takibi\nGece taşıma seçeneği`,
      content: `<h2>500 Kilometre Sonrasında <em>Kontrolünüzü Yitirmeyin</em></h2>
<p>Araç şehir sınırını geçtiğinde takip sistemi yoksa yaşananlar size ulaşmaz. <strong>GPS kayıtlı araçlar</strong> konumu düzenli aralıklarla iletir. Bu bilgi, teslim saatini doğrudan etkiler.</p>
<p>Güzergah seçimi de kritiktir. <em>Viyadük yüksekliği, tonaj kısıtlaması</em> ve mevsimsel yol kapanmaları hesaplanmadan yola çıkmak operasyonu riske atar.</p>
<h2>Şehirlerarası Taşımada <strong>Güzergah Kriterleri</strong></h2>
<ul>
<li>Mevsimsel hava ve yol koşulları 24 saat öncesinden kontrol edilir</li>
<li>Araç yüksekliğine göre viyadük ve tünel geçiş noktaları belirlenir</li>
<li>Mola ve yakıt haritası şoföre teslim edilir; rotadan sapma kayıt altında</li>
<li>Tonaj kısıtlamalı güzergahlarda alternatif yol hazır tutulur</li>
<li>Teslimat adresi araç girişine uygun mu önceden doğrulanır</li>
</ul>
<h2>Güzergâha Göre <u>Taşıma Süreleri</u></h2>
<table><thead><tr><th>Güzergâh</th><th>Mesafe</th><th>Taşıma Süresi</th><th>Gece Seçeneği</th></tr></thead><tbody>
<tr><td>İstanbul – Ankara</td><td>450 km</td><td>1 gün</td><td>Evet</td></tr>
<tr><td>İstanbul – İzmir</td><td>490 km</td><td>1–2 gün</td><td>Evet</td></tr>
<tr><td>Ankara – Antalya</td><td>480 km</td><td>1–2 gün</td><td>Evet</td></tr>
<tr><td>İstanbul – Trabzon</td><td>1.100 km</td><td>2–3 gün</td><td>Evet</td></tr>
</tbody></table>
<h2>Yükleme Öncesi <em>Sigorta Adımları</em></h2>
<ol>
<li>Eşya listesi hazırlanır; yüksek değerli parçalar ayrıca beyan edilir</li>
<li>Poliçe yükleme öncesinde imzalanır; sonradan düzenlenen geçersizdir</li>
<li>Video kaydı alınması hasar durumunda ispat sürecini kolaylaştırır</li>
<li>Teslimatta eksikler tutanağa geçirilir; 48 saat içinde bildirim zorunlu</li>
</ol>
<h2>Gece Taşımanın <strong>Pratik Avantajları</strong></h2>
<p>Gece saatlerinde trafik azalır; şoför hız sınırında ilerler. <u>Gece başlangıçlı seferler</u>, sabah varmayı ve kurulumu gün içinde bitirmeyi sağlar. Fiyat genellikle gündüz tarifesinin yüzde on ila yirmi altındadır.</p>`,
      order: 6,
      active: true,
    },
    // ─── KURUMSAL TAŞIMACILIK ───
    {
      name: 'Ofis Taşımacılığı',
      slug: 'ofis-tasimaciligi',
      description: 'İş sürekliliğini kesmeden gerçekleştirilen ofis taşıması, her ekipmanın etiketlenerek taşınmasını ve yeni adreste aynı düzende kurulmasını kapsar.',
      metaTitle: 'Ofis Taşımacılığı | Kesintisiz Kurumsal Nakliyat',
      metaDescription: 'Ofis taşımacılığında etiketleme sistemi, BT ekipmanı taşıma ve hafta sonu operasyon seçeneği. İş sürekliliği garantisi.',
      benefits: `Hafta sonu ve gece operasyon\nBT ekipmanı özel ambalajı\nEtiketli demontaj sistemi\nAynı düzende kurulum\nSigortalı taşıma\nGizlilik sözleşmesi imkânı`,
      content: `<h2>Pazartesi Sabahı <strong>Her Şey Yerli Yerinde</strong></h2>
<p>Hafta sonu taşınan bir ofis, pazartesi sabahı çalışanlar maşlara oturduğunda hazır olmalıdır. Bilgisayarlar bağlı, telefonlar çalışıyor, kablolar önce etiketlendiği için doğru prize takılıdır. <em>Bu sonucu</em> yaratan şey planlama değil; milim milim uygulanan planlama disiplinidir.</p>
<p>Tek bir kablo karışıklığı BT ekibini saatlerce meşgul eder. <strong>Sunucu demontaj hatası</strong> ise véri kaybına dönüşebilir. Bu riskler standart nakliyat ekibiyle değil; uzman ofis taşıma ekibiyle sıfırlanır.</p>
<h2>Ofis Taşımada <u>Farklı Muamele İsteyen Ekipmanlar</u></h2>
<ul>
<li>Sunucu ve ağ altyapısı: antistatik, köpük tamponlu özel kasa</li>
<li>Çok parçalı toplantı masaları: demontaj şemasıyla ayrı paketleme</li>
<li>Arşiv dolap ve evrak kutuları: barkodlu etiket sistemi</li>
<li>Güvenlik kamera ve alarm cihazları: teknik ekip tarafından sökülmeli</li>
<li>Özel tasarım resepsiyon mobilyaları: tahta kasa öncelikli</li>
</ul>
<h2>Zaman Tablosu: <strong>Operasyonun 4 Aşaması</strong></h2>
<table><thead><tr><th>Aşama</th><th>Süre</th><th>Sorumlu Ekip</th></tr></thead><tbody>
<tr><td>Ön keşif ve kat planı</td><td>1–2 gün</td><td>Proje yöneticisi</td></tr>
<tr><td>Etiketleme ve ambalaj</td><td>1 gün</td><td>Paketleme ekibi</td></tr>
<tr><td>Yükleme ve nakliye</td><td>1 gün</td><td>Taşıma ekibi</td></tr>
<tr><td>Kurulum ve BT test</td><td>1–2 gün</td><td>Teknik personel</td></tr>
</tbody></table>
<h2>BT Ekipmanı İçin <em>Protokol Adımları</em></h2>
<ol>
<li>Her cihaz seri numarası ile envantere işlenir</li>
<li>Antistatik torba ile kaplanır; köpük tampon yapıştırılır</li>
<li>Özel kasaya yerleştirilir; kasa mhürlenerek etiketlenir</li>
<li>Kablolar ayrı çantada; iki uçu da etiketli taşınır</li>
<li>Yeni ofiste bağlantı test edilmeden BT kabul yapılmaz</li>
</ol>
<h2>Gizlilik <strong>Sözleşmesi Neden Önemlidir?</strong></h2>
<p>Ofis taşımalarında ekip, müşteri dökümanlarına ve kurumsal veriye fiziksel olarak ulaşabilir. <u>Gizlilik taahhutnamesi</u> yasal güvence oluşturur. Bunu standart sunan firmalar başkalarından bu açıdan ayrılır.</p>`,
      order: 7,
      active: true,
    },
    {
      name: 'Kurumsal Taşımacılık',
      slug: 'kurumsal-tasimacilik',
      description: 'Çok lokasyonlu kurumsal yapılar, merkezî koordinasyon gerektiren taşıma operasyonları ister. Proje yöneticisi ataması ve günlük ilerleme raporlamasıyla şeffaf süreç yönetimi sağlanır.',
      metaTitle: 'Kurumsal Taşımacılık | Proje Bazlı Nakliyat Hizmeti',
      metaDescription: 'Büyük kurumsal taşımalarda proje yönetimi, çoklu lokasyon koordinasyonu ve özel sigorta paketi ile kesintisiz operasyon.',
      benefits: `Atanmış proje yöneticisi\nÇok lokasyonlu koordinasyon\nGünlük ilerleme raporu\nÖzel kurumsal sigorta\nGizlilik protokolü\nMerkezî takip paneli`,
      content: `<h2>Holding Taşımasında <em>Tek Koordinatör</em> Yetmiyor</h2>
<p>Beş lokasyon, on departman, yüzlerce çalışan. Hepsinin taşınmasını tek ekibe havale etmek operasyonu baştan çörütür. <strong>Her birime ayrı koordinatör</strong> atanması, ayrı zaman dilimi ve ayrı plan sadece büyük ölçekli taşımalarda işe yarar.</p>
<p>Şeffaflık bu sistemin çekirdeğidir. <em>Her sabah brifinginde</em> gecenin ilerlemesi, tamamlanan birim sayısı ve varsa görülen sorunlar masaya yatırılır. Yönetici müdahale etmeden süreci okuyor olmak zorundadır.</p>
<h2>Kurumsal Operasyonda <strong>Başarı Koşulları</strong></h2>
<ul>
<li>Onaylı yazılı proje planı ve kesinleşmiş takvim</li>
<li>Her birime ayrı saha koordinatörü atanması</li>
<li>Günlük sabah brifingleri zorunlu; katılımcı listesi tutulur</li>
<li>Sahada hazır bekleyen acil müdahale ekibi</li>
<li>Operasyon sonrası 48 saat teknik destek güvencesi</li>
</ul>
<h2>Hizmet Kapsamı <u>Standart ve Premium</u></h2>
<table><thead><tr><th>Hizmet Kalemi</th><th>Standart</th><th>Premium</th></tr></thead><tbody>
<tr><td>Ön keşif ve raporlama</td><td>Evet</td><td>Evet</td></tr>
<tr><td>Barkodlu etiket sistemi</td><td>Evet</td><td>Evet</td></tr>
<tr><td>BT altyapısı taşıma</td><td>Evet</td><td>Evet</td></tr>
<tr><td>Mobilya montaj ve yerleşim</td><td>Evet</td><td>Evet</td></tr>
<tr><td>Taşıma sonrası derin temizlik</td><td>Hayır</td><td>Evet</td></tr>
</tbody></table>
<h2><em>5 Aşamalı</em> Operasyon Modeli</h2>
<ol>
<li>Keşif ziyareti; tüm birimlerin envanter haritası çıkarılır</li>
<li>Proje planı yöneticiye sunulur; onaydan sonra kesinleşir</li>
<li>Pilot birim taşıması yapılır; süre ve aksaklıklar kaydedilir</li>
<li>Büyük operasyon kademeli ve denetimli başlatılır</li>
<li>Kapanış raporu düzenlenir; hasar tespiti imzayla tamamlanır</li>
</ol>
<h2>Yönetici İçin <strong>Merkezi Takip Paneli</strong></h2>
<p>Operasyon boyunca anlık ilerleme <u>dijital panelden</u> izlenir. Kaç birim tamamlandı, kaçı bekleniyor, varsa aksaklıklar anında görülür. Bu erişim, büyük kurumsal taşımalarda kontrol kaybının önüne geçer.</p>`,
      order: 8,
      active: true,
    },
    {
      name: 'Fabrika Taşımacılığı',
      slug: 'fabrika-tasimaciligi',
      description: 'Üretim makineleri, ağır sanayi ekipmanları ve depo raflarının taşınması; mühendislik hesabı, vinç koordinasyonu ve iş güvenliği protokolü gerektiren özel bir lojistik dalıdır.',
      metaTitle: 'Fabrika Taşımacılığı | Sanayi Ekipmanı Nakliyat',
      metaDescription: 'Fabrika ve sanayi tesisi taşımacılığında vinç, forklift ve ağır yük araçlarıyla güvenli makine nakliyatı.',
      benefits: `Ağır yük ve makine taşıma\nVinç ve forklift koordinasyonu\nİş güvenliği protokolü\nMühendis gözetiminde operasyon\nÜretim duruşu minimizasyonu\nSanayi sigortası`,
      content: `<h2>80 Ton Ağırlık <em>Takvim Değil</em>, Mühendislik İster</h2>
<p>CNC tezgâhını yerinden kaldırmak için önce üretici teknik dokümanına bakılır. <em>Kaldırma noktası yanlış</em> seçilirse kasa deforme olur; hassas kalibrasyon bozulur. Sonrasında yeniden hizalama haftalarca sürebilir.</p>
<p>Fabrika taşıması bu yüzden lojistik değil, <strong>mühendislikle yürütülen bir operasyondur.</strong> Vinç, forklift ve lowbed tek başlarna yetmez; doğru çalıştıracak uzman şarttır.</p>
<h2>Fabrika Taşımada <u>Kullanılan Ekipman Listesi</u></h2>
<ul>
<li>Mobil vinç: 25 ila 200 ton kapasite aralığında</li>
<li>Sanayi tipi forklift: geniş çatallı, ağır yük yapılı</li>
<li>Lowbed römork: alçak platform, karayolu mevzuatına uygun</li>
<li>Modüler taşıma platformu: uzun ve geniş parçalar için</li>
<li>Hidrolik kriko ve ray sistemi: zemin üzerinde kaydırma</li>
</ul>
<h2>Makine Tipine Göre <strong>Yöntem Tablosu</strong></h2>
<table><thead><tr><th>Makine</th><th>Taşıma Yöntemi</th><th>Kritik Gereksinim</th></tr></thead><tbody>
<tr><td>CNC tezgâhı</td><td>Forklift + lowbed</td><td>Titreşim izolasyonlu altlık</td></tr>
<tr><td>Hidrolik pres</td><td>Vinç + modüler platform</td><td>Zemin taşıma kapasitesi</td></tr>
<tr><td>Konveyör bant</td><td>Demonte + ayrı taşıma</td><td>Mühendis gözetiminde montaj</td></tr>
<tr><td>Kimyasal kazan</td><td>Özel araç + karayolu izni</td><td>MSDS belgesi zorunlu</td></tr>
</tbody></table>
<h2>Üretim Duruşunu <em>Sıfıra İndiren</em> Plan</h2>
<ol>
<li>Tesis yerleşim planı ve makine teknik şemalari temin edilir</li>
<li>Demontaj sırası üretim mühendisiyle birlikte belirlenir</li>
<li>Gece ya da hafta sonu operasyonu üretimi durdurmaz</li>
<li>Yeni tesiste zemin taşıma kapasitesi ve elektrik altyapısı doğrulanır</li>
<li>Kurulum mühendis gözetiminde yapılır; test üretim onaylandıktan sonra teslim</li>
</ol>
<h2>Her Saat <strong>Ne Kadar Maliyet</strong> Taşır?</h2>
<p>Tekstil sektöründe saatlik üretim duruşu on binlerce liraya denk düşer. <u>Gece operasyonu</u> bu kaybı önler. Planlamasız başlayan fabrika taşıması ise tam tersine, duruşa duruş ekler.</p>`,
      order: 9,
      active: true,
    },
    {
      name: 'Banka Taşımacılığı',
      slug: 'banka-tasimaciligi',
      description: 'Şube yenileme, birleşme veya yer değişikliğinde banka taşımacılığı; güvenlik prosedürleri, değerli evrak protokolü ve koordineli kapatma planıyla yürütülür.',
      metaTitle: 'Banka Taşımacılığı | Güvenli Şube Nakliyat Hizmeti',
      metaDescription: 'Banka şubesi taşımacılığında gizlilik protokolü, değerli evrak güvencesi ve güvenlik koordinasyonu ile kesintisiz operasyon.',
      benefits: `Gizlilik ve güvenlik protokolü\nDeğerli evrak taşıma güvencesi\nGüvenlik ekibi koordinasyonu\nHafta sonu operasyon\nSigortalı taşıma\nKapsamlı hasar tutanağı`,
      content: `<h2>Cuma Öğleden Pazartesi Sabahına: <strong>Şube Kesintisiz</strong></h2>
<p>Banka taşımalarında çalışma saatleri dışında kalan 60 saat altın değerindedir. <em>Cuma kapanış protokolü</em> tamamlandıktan hemen sonra ekip devreye girer. Pazartesi açılış saatinden önce her sistem çalışır durumda olmalıdır.</p>
<p>Bu zaman baskısı hiçbir hatayı affetmez. <strong>Her adım kayıt altında</strong>, her kutu numaralı, her teslim çift imzalı yürütülür.</p>
<h2>Taşıma Kapsamındaki <u>Hassas Materyaller</u></h2>
<ul>
<li>Müşteri dosyaları ve kredi sözleşmeleri; mühürlü kilitli kasada</li>
<li>ATM kabin ve kasa ekipmanları; özel güvenlik aracıyla</li>
<li>Sunucu ve veri depolama üniteleri; antistatik koruma altında</li>
<li>Güvenlik kamera ve alarm altyapısı; teknik ekip söküm sorumluluğuyla</li>
<li>Kilitli dolap ve çekmeceler; açılmadan taşınır</li>
</ul>
<h2>Güvenlik Katmanları <strong>Operasyon Boyunca</strong></h2>
<table><thead><tr><th>Operasyon Aşaması</th><th>Uygulanan Güvenlik</th><th>Belge</th></tr></thead><tbody>
<tr><td>Yükleme</td><td>İki yetkili imzası zorunlu</td><td>Yükleme tutanağı</td></tr>
<tr><td>Nakil</td><td>GPS takipli + güvenlik eskortlu araç</td><td>Güzergah kaydı</td></tr>
<tr><td>Tahliye</td><td>Mühürlü taşıma sandıkları</td><td>Sandık sayım listesi</td></tr>
<tr><td>Teslim</td><td>Sayım + çift taraflı imza</td><td>Kapanış tutanağı</td></tr>
</tbody></table>
<h2>Sistem Geçişi <em>Adım Adım</em></h2>
<ol>
<li>Merkez bankacılık yazılımı kapatma protokolü eksiksiz uygulanır</li>
<li>Şubeyi terk eden son personel çift kontrol yapar ve imzalar</li>
<li>Gece operasyonuyla taşıma yürütülür; kayıt kesiksiz devam eder</li>
<li>Yeni şubede ağ bağlantısı ve yazılım kurulumu teknik ekiple yapılır</li>
<li>Test işlemi tamamlanır; açılış onayı banka yönetimine iletilir</li>
</ol>
<h2>Neden <strong>Sıradan Firma</strong> Bu İşi Yapamaz?</h2>
<p>Banka taşımalarında her ekip üyesi <u>arkaplan taramasından</u> geçmiş ve gizlilik taahhütnamesi imzalamış olmak zorundadır. Bu belge olmadan operasyona dahil olmak yasal değildir.</p>`,
      order: 10,
      active: true,
    },
    {
      name: 'Fuar Taşımacılığı',
      slug: 'fuar-tasimaciligi',
      description: 'Stand malzemeleri, ekran sistemleri ve kurumsal tanıtım ekipmanlarının fuar alanına tam zamanında ulaşması; lojistik hata için sıfır tolerans demektir.',
      metaTitle: 'Fuar Taşımacılığı | Stand ve Ekipman Nakliyat Hizmeti',
      metaDescription: 'Fuar taşımacılığında zamanında teslimat, stand kurulum koordinasyonu ve fuar sonrası depolama hizmetleri.',
      benefits: `Zamanında teslimat garantisi\nStand kurulum koordinasyonu\nFuar alanı lojistik deneyimi\nDepolama ve geri taşıma\nHızlı montaj ekibi\nSigortalı ekipman nakliyatı`,
      content: `<h2>Stand Geç Gelirse <em>Marka Erken Biter</em></h2>
<p>Fuarda stanınız yoksa rakip stand geçer, ziyaretçi geçer, olası müşteri geçer. <em>Teslimatta iki saatlik gecikme</em> küme düşürmek anlamına gelir. Fuar lojistiği bu yüzden 15 dakika toleranslı çalışır.</p>
<p>Yükleme tamamlanmadan başlayan her operasyon, teslimatı riske atar. <strong>Rezervasyon, rota ve park planlaması</strong> çok önceden yapılmalıdır.</p>
<h2>Tipik Fuar <u>Ekipman Katalogu</u></h2>
<ul>
<li>Modüler stand sistemleri ve taşıyıcı iskelet profiller</li>
<li>LED ekranlar, monitor ve dijital tabela üniteleri</li>
<li>Broşür standları ve ürün sergi rafları</li>
<li>Ses, ışık ve sahne sistemi ekipmanları</li>
<li>Kurumsal zemin döşemesi ve dekorasyon malzemeleri</li>
</ul>
<h2>Stand Büyüklüğüne Göre <strong>Teslimat Takvimi</strong></h2>
<table><thead><tr><th>Katılım Ölçeği</th><th>En Geç Teslimat</th><th>Kurulum Süresi</th><th>Geri Taşıma</th></tr></thead><tbody>
<tr><td>Küçük (1–2 stand)</td><td>1 gün önce</td><td>3–4 saat</td><td>Aynı gün</td></tr>
<tr><td>Orta (3–10 stand)</td><td>2 gün önce</td><td>6–8 saat</td><td>Ertesi gün</td></tr>
<tr><td>Büyük (10+ stand)</td><td>3–4 gün önce</td><td>1–2 gün</td><td>2 gün</td></tr>
</tbody></table>
<h2>Fuar Bitince <em>Geri Dönüş Süreci</em></h2>
<ol>
<li>Fuar kapanış saatinde demontaj önceden planlanan ekiple başlar</li>
<li>Ekipmanlar kategorilere ayrılır; hasar anında tutanağa geçirilir</li>
<li>Kırılgan parçalar ilk paketlenir, ağır çerçeveler en son yüklenir</li>
<li>Depo ya da doğrudan kurumsal merkeze teslimat planlanmış haliüyle tamamlanır</li>
</ol>
<h2>Fuar Lojistiği <strong>Marka İmajinin</strong> Arkasıdır</h2>
<p>Ziyaretçi standı görür, arkasındaki lojistik çabayı görmez. <u>O görünmezlik</u>, düzgün yapılan işin ödülüdür. Aksayan an tek görünen an olur.</p>`,
      order: 11,
      active: true,
    },
    {
      name: 'Hastane Taşımacılığı',
      slug: 'hastane-tasimaciligi',
      description: 'Tıbbi cihazlar, ameliyathane ekipmanları ve hasta dosyalarının taşınması; hijyen standartları, kalibrasyon gereksinimleri ve kesintisiz bakım sürekliliği çerçevesinde yönetilir.',
      metaTitle: 'Hastane Taşımacılığı | Tıbbi Cihaz Nakliyat Hizmeti',
      metaDescription: 'Hastane taşımacılığında tıbbi cihaz kalibrasyonu, hijyen protokolü ve hasta hizmet sürekliliği gözetilerek güvenli nakliyat.',
      benefits: `Tıbbi cihaz kalibrasyonu\nHijyen protokollü ambalaj\nHasta bakım sürekliliği\nISO standartlı taşıma\nGece ve hafta sonu operasyon\nUzman teknik ekip`,
      content: `<h2>MRI Yerinden Oynadığında <em>Ne Kaybedilir?</em></h2>
<p>Tıbbi görüntüleme cihazları mikron hassasiyetinde hizalanmış manyetik sistemler barındırır. <em>Taşıma sırasında</em> tek bir beklenmedik salınım, aylarca süren kalibrasyon bozukluğuna dönüşebilir. Yeniden hizalama ise bazen cihazın fiyatının çeyrekini yer.</p>
<p><strong>Ventilatörler titreşime duyarlıdır.</strong> Ameliyathane lambası, yansıtıcısıyla birlikte katı kasa ister. Her cihaz kendi türüne özel ambalaj gerektir; tek standart çözüm yoktur.</p>
<h2>Tıbbi Cihaz <u>Kategorileri ve Risk Tabanı</u></h2>
<ul>
<li>Görüntüleme: MRI, CT, röntgen — çok yüksek risk; üretici protokolü şarttır</li>
<li>Yaşam destek: ventilatör, hasta monıtörü — kritik; taşıma sırasında şarja bağlı tutulmalı</li>
<li>Ameliyathane: masa, lamba, sterilizatör — yüksek; titreşim izolasyonlu altlık</li>
<li>Laboratuvar: santrifüj, mikroskobu — orta; oryantasyon oku etiketi zorunlu</li>
</ul>
<h2>Taşıma Öncesi <strong>Teknik Hazırlık Tablosu</strong></h2>
<table><thead><tr><th>Cihaz</th><th>Zorunlu İşlem</th><th>Sorumlu Taraf</th></tr></thead><tbody>
<tr><td>MRI</td><td>Manyetik alan sıfırlama + gauss ölçümü</td><td>Üretici teknisyeni</td></tr>
<tr><td>CT tarayıcı</td><td>X-ray tüpü kilitleme</td><td>Biyomedikal uzman</td></tr>
<tr><td>Sterilizatör</td><td>Basınç boşaltma ve conta kontrolü</td><td>Teknik servis</td></tr>
</tbody></table>
<h2>Hasta Bakımını <em>Kesmeden</em> Taşınma</h2>
<ol>
<li>Taşınma sırası hasta yoğunluğu haritasyla planlanır</li>
<li>Yoğun bakım ve acil servis en son taşınır</li>
<li>Her bölüm yeni adreste test edilmeden hasta kabulune açılmaz</li>
<li>Geçiş döneminde taşınabilir yedek ekipman sahada hazır tutulur</li>
</ol>
<h2>Hijyen ve <strong>ISO Standartları</strong></h2>
<p>Hastane ekipmanlarının taşımasında kullanılan tüm örtü ve ambalaj malzemeleri tek kullanımlık ve steril olmak zorundadır. <u>Cihaz yüzeyleri</u> taşımadan önce ve sonra dezenfekte edilir; bu işlem tutanakla belgelenir.</p>`,
      order: 12,
      active: true,
    },
    {
      name: 'Konsolosluk Taşımacılığı',
      slug: 'konsolosluk-tasimaciligi',
      description: 'Diplomatik temsilciliklerin ve konsoloslukların taşınması; protokol gereklilikleri, uluslararası mevzuat ve gizlilik standartları çerçevesinde titizlikle yönetilir.',
      metaTitle: 'Konsolosluk Taşımacılığı | Diplomatik Nakliyat Hizmeti',
      metaDescription: 'Konsolosluk ve büyükelçilik taşımacılığında diplomatik protokol, gizlilik standartları ve uluslararası nakliyat deneyimi.',
      benefits: `Diplomatik protokol bilgisi\nUluslararası nakliyat deneyimi\nGizlilik sözleşmesi\nÖzel güvenlik koordinasyonu\nEvrak ve arşiv taşıma\nYabancı dil destekli ekip`,
      content: `<h2>Devlet Mülkü <em>Sıradan Araçla</em> Taşınamaz</h2>
<p>Bir konsolosluğun adres değiştirmesi dışarıdan basit görünür. Oysa içeride diplomatik dokunulmazlık kapsamındaki materyaller, devlet arşivleri ve şifreli iletişim ekipmanları yer alır. <em>Her birinin</em> farklı yasal çerçevesi, farklı taşıma protokolü vardır.</p>
<p>Operasyona dahil olan her kişinin güvenlik soruşturması tamamlanmış olması zorunludur. <strong>Gizlilik taahhütnamesi</strong> noter onaylı şekilde imzalanır; aksi durumda ekip sahaya çıkamaz.</p>
<h2>Diplomatik Taşımada <u>Özel Protokol Gereksinimleri</u></h2>
<ul>
<li>Diplomatik çanta ve poşetlerin dokunulmazlık statüsü korunmalı</li>
<li>Yabancı devlet mülkünün sigortalanma prosedürü ayrıca işlenmeli</li>
<li>Gümrük muafiyeti belgeleri operasyon öncesinde hazırlanmalı</li>
<li>Güvenlik taramasına tabi olmayan materyaller ayrıştırılmalı</li>
<li>Şifreli ekipmanlar yalnızca yetkili personel tarafından taşınmalı</li>
</ul>
<h2>Taşıma Ekibi <strong>Yeterlilik Tablosu</strong></h2>
<table><thead><tr><th>Gereksinim</th><th>Asgari Standart</th><th>Doküman</th></tr></thead><tbody>
<tr><td>Güvenlik soruşturması</td><td>Arşiv araştırması tamamlanmış</td><td>Soruşturma belgesi</td></tr>
<tr><td>Yabancı dil</td><td>B2 düzey İngilizce</td><td>Dil belgesi</td></tr>
<tr><td>Gizlilik taahhüdü</td><td>Yazılı ve noter onaylı</td><td>Taahhütname</td></tr>
<tr><td>Diplomatik protokol</td><td>Sertifikalı eğitim</td><td>Katılım belgesi</td></tr>
</tbody></table>
<h2>Operasyon <em>Koordinasyon Akışı</em></h2>
<ol>
<li>Dışişleri Bakanlığı koordinatörüyle ön görüşme yapılır</li>
<li>Taşıma planı protokol yetkilisine sunulur ve onaylanır</li>
<li>Hassas materyaller ayrıştırılarak mühürlü konteynere yerleştirilir</li>
<li>Nakil boyunca güvenlik eskort eşliği sağlanır</li>
<li>Teslim tutanağı iki taraflı imzalanır; kopyalar saklanır</li>
</ol>
<h2>Uluslararası <strong>Nakliyatta Gümrük Süreci</strong></h2>
<p>Diplomatik malzemeler gümrük muafiyeti kapsamına girse de <u>ATA karnesi ve liste beyanı</u> hazırlanmadan sınır geçilemez. Eksik belge, sevkiyatı günlerce bekleterek operasyonu riske atar.</p>`,
      order: 13,
      active: true,
    },
    {
      name: 'Üniversite Taşımacılığı',
      slug: 'universite-tasimaciligi',
      description: 'Araştırma laboratuvarları, kütüphane koleksiyonları ve idari birimlerin kampüsler arası taşınması; akademik takvime uyum ve hassas ekipman güvencesiyle planlanır.',
      metaTitle: 'Üniversite Taşımacılığı | Kampüs Nakliyat Hizmeti',
      metaDescription: 'Üniversite taşımacılığında laboratuvar cihazları, kütüphane koleksiyonu ve idari birim nakliyatı akademik takvimiyle uyumlu.',
      benefits: `Akademik takvime uyumlu planlama\nLaboratuvar cihazı uzmanlığı\nKütüphane koleksiyonu taşıma\nGeniş kampüs lojistiği\nBütçe dostu fiyatlandırma\nKurum protokolüne uyum`,
      content: `<h2>Spektrometre Kalibrasyonu <em>Yanlış Taşımada</em> Bozulur</h2>
<p>Araştırma ekipmanlarının hassasiyeti, ev eşyasıyla kıyaslanamaz. <em>Elektron mikroskobu</em> milimetre altı titreşime tepki verir; tek bir çarpma aylarca süren kalibrasyonun yeniden yapılmasını zorunlu kılar.</p>
<p>Akademik yatırım bu cihazların içinde somutlaşır. <strong>Yanlış taşınan her alet</strong>, o aleti bekleyen araştırma projesini geri alır.</p>
<h2>Kampüs Birimlerine Göre <u>Taşıma Öncelik Sırası</u></h2>
<ul>
<li>Araştırma laboratuvarları: devam eden proje riski en yüksek</li>
<li>Kütüphane koleksiyonu: nadir eser ve ciltli arşiv öncelikli</li>
<li>Öğrenci hizmetleri: akademik takvime göre zamanlanır</li>
<li>İdari birimler: en esnek; en son taşınır</li>
</ul>
<h2>Laboratuvar Ekipmanı <strong>Ambalaj Standartları</strong></h2>
<table><thead><tr><th>Cihaz Türü</th><th>Ambalaj Yöntemi</th><th>Ek Gereksinim</th></tr></thead><tbody>
<tr><td>Elektron mikroskobu</td><td>Titreşim yalıtımlı özel kasa</td><td>Teknik eleman eşliği</td></tr>
<tr><td>Kimyasal depolama</td><td>UN sertifikalı konteyner</td><td>MSDS belgesi zorunlu</td></tr>
<tr><td>Bilgisayar sunucusu</td><td>Antistatik torba + köpük</td><td>BT uzmanı onayı</td></tr>
<tr><td>Optik cihazlar</td><td>Kilitli alet çantası</td><td>Oryantasyon etiketi</td></tr>
</tbody></table>
<h2><em>Akademik Takvime</em> Göre Dönem Planlaması</h2>
<ol>
<li>Haziran-Eylül arası tercih edilir; sınav dönemi kesinlikle dışında tutulur</li>
<li>Her bölüm sorumlusu akademisyenle ayrı toplantı yapılır</li>
<li>Laboratuvar söküm protokolü yazılı onaya alınır</li>
<li>Nakil sonrası kalibrasyon testleri bölüm teknikeriyle birlikte yapılır</li>
</ol>
<h2>Kütüphane Koleksiyonu <strong>Özel Bakım Gerektiriyor</strong></h2>
<p>Nadir baskılar, el yazmaları ve ciltli arşiv materyalleri nem-ısı kontrolüne duyarlıdır. <u>Asitsiz mukavva kutu</u> ve nem emici silika jel bu materyaller için standart; seçenek değil, zorunluluktur.</p>`,
      order: 14,
      active: true,
    },
    // ─── DİĞER HİZMETLER ───
    {
      name: 'Arşiv Taşımacılığı',
      slug: 'arsiv-tasimaciligi',
      description: 'Kurumsal belgeler, hukuki dosyalar ve tarihi dokümanların taşınması; güvenli zincir, sayım kontrolü ve nem-ısı yönetimiyle arşiv bütünlüğünü korur.',
      metaTitle: 'Arşiv Taşımacılığı | Belge ve Doküman Nakliyat',
      metaDescription: 'Kurumsal arşiv ve hukuki belge taşımacılığında güvenlik zinciri, sayım kontrolü ve nem koruması ile kayıpsız nakliyat.',
      benefits: `Güvenli belge zinciri\nSayım ve envanter kontrolü\nNem ve ısı korumalı ambalaj\nGizlilik taahhütnamesi\nDigital indeksleme desteği\nAcil erişim protokolü`,
      content: `<h2>Kayıp Belge <em>Bazen Yıllık Davayı</em> Duraksatır</h2>
<p>Bir mahkeme dosyası taşıma sırasında kaybedilirse o davayla ilgili yıllarca süren süreç sekteye uğrar. <em>Muhasebe kayıtlarının nem alması</em> ise ağır para cezalarına dönüşebilir. Arşiv taşımacılığı bu yüzden nakliyat değil; belge güvenliği yönetimidir.</p>
<p>Bir kutu bile sayımdan düşse sonuç büyük olabilir. <strong>Barkodlu sistem</strong> her kutuyu takip eder; kayıp mümkün değil, kaybın tespiti anında olur.</p>
<h2>Arşiv Materyali <u>Koruma Standartları</u></h2>
<ul>
<li>Asitsiz mukavva kutu; asitli ambalaj belgeyi yıllar içinde tahrip eder</li>
<li>Her kutuya nem emici silika jel eklenir; çift kat nemden korunur</li>
<li>Araç içi sıcaklık 15-20°C aralığında tutulur</li>
<li>Her kutu barkodlu etiketle numaralandırılır</li>
<li>Dijital envanter taşımadan önce tamamlanır; sonradan güncellenmez</li>
</ul>
<h2>Belge Türlerine Göre <strong>Risk Sınıflandırması</strong></h2>
<table><thead><tr><th>Belge Türü</th><th>Risk Seviyesi</th><th>Özel Önlem</th></tr></thead><tbody>
<tr><td>Hukuki dosyalar</td><td>Kritik</td><td>Mühürlü kilitli kasa</td></tr>
<tr><td>Muhasebe kayıtları</td><td>Yüksek</td><td>Çift sayım tutanağı</td></tr>
<tr><td>Tarihi belgeler</td><td>Çok yüksek</td><td>Arşivci gözetiminde taşıma</td></tr>
<tr><td>Personel dosyaları</td><td>Yüksek</td><td>Gizlilik taahhütnameli ekip</td></tr>
</tbody></table>
<h2>Taşıma Sonrası <em>Yeniden Yerleştirme</em> Protokolü</h2>
<ol>
<li>Yeni arşiv alanının nem ve ısı ölçümleri yapılır; uygun değilse müdahale edilir</li>
<li>Kutular barkod sırasına göre rafa yerleştirilir; karışıklık sıfırlanır</li>
<li>Dijital envanter fiziksel sayımla birebir doğrulanır</li>
<li>Erişim yetkisi listesi güncellenir ve yetkiliye teslim edilir</li>
</ol>
<h2>İlk 24 Saat <strong>Neden Kritik?</strong></h2>
<p>Taşıma tamamlandıktan sonra yapılan ilk sayım, olası sorunları telafi edilebilir kılar. <u>24 saat geçtikten sonra</u> yapılan bildirimler sigorta kapsamı dışına düşebilir; bu süreyi asla kaçırmayın.</p>`,
      order: 15,
      active: true,
    },
    {
      name: 'Müze Taşımacılığı',
      slug: 'muze-tasimaciligi',
      description: 'Sanat eserleri, arkeolojik buluntular ve tarihi objeler; iklim kontrollü araçlar, özel konteynerlere ve müzeci gözetiminde hareket eder.',
      metaTitle: 'Müze Taşımacılığı | Sanat Eseri Nakliyat Hizmeti',
      metaDescription: 'Müze ve galeri taşımacılığında iklim kontrollü araç, özel konteyner ve sigortalı sanat eseri nakliyatı.',
      benefits: `İklim kontrollü araç\nÖzel sanat eseri konteyneri\nMüzeci ve küratör koordinasyonu\nUluslararası nakliyat deneyimi\nSanat sigortası\nVibrasyon izolasyonlu kasa`,
      content: `<h2>2.000 Yıllık Amforada <em>Gözle Görülmeyen</em> Çatlak</h2>
<p>Titreşim seramiği mikro düzeyde çatlatır. Gözle görülmez; ancak X-ray analizinde ortaya çıkar ve eserin değerini yüzde elliye indirir. <em>Müze taşımacılığı</em> bu yüzden yalnızca nakliyatçının değil, küratörün de içinde olduğu bir süreçtir.</p>
<p>İklim koşulları da en az titreşim kadar kritiktir. <strong>Kâğıt ve tekstil eserler</strong> rutubet farkına, ahşap heykeller sıcaklık dalgalanmasına duyarlıdır. Her eser kendi mikro-iklimiyle seyahat etmelidir.</p>
<h2>Eser Kategorilerine Göre <u>Ambalaj Yöntemi</u></h2>
<ul>
<li>Tuval tablolar: asitsiz tampon + kırımsız özel sandık + köpük kenar desteği</li>
<li>Heykel ve bronz: köpük kalıp + ahşap kasalama + titreşim izolasyonu</li>
<li>Seramik ve porselen: çift katlı balonlu naylon + çoklu tampon</li>
<li>Kâğıt ve tekstil: asitsiz doku kâğıdı + nem kontrollü kapaklı kap</li>
</ul>
<h2>İklim Kontrolü <strong>Teknik Parametreler</strong></h2>
<table><thead><tr><th>Parametre</th><th>Hedef Değer</th><th>Sapma Toleransı</th><th>İzleme Aracı</th></tr></thead><tbody>
<tr><td>Sıcaklık</td><td>18–22°C</td><td>±1°C</td><td>Datalogger</td></tr>
<tr><td>Bağıl nem</td><td>%45–55</td><td>±5%</td><td>Hygrometer</td></tr>
<tr><td>Titreşim</td><td>&lt;0,1 g</td><td>Sıfır tolerans</td><td>Shockwatch</td></tr>
</tbody></table>
<h2>Uluslararası Eser <em>Transferi Protokolü</em></h2>
<ol>
<li>Kondisyon raporu küratör tarafından yükleme öncesi hazırlanır</li>
<li>Gümrük ATA karnesi ve kültürel miras belgesi operasyon öncesinde düzenlenir</li>
<li>Sigorta poliçesi rayiç değer; değer düşüklüğü sigortası ayrıca eklenir</li>
<li>Teslimatta karşı kurumun küratörü imzalı kondisyon raporuyla teslim alır</li>
</ol>
<h2>Yalnızca Ulaşmak <strong>Yeterli Değil</strong></h2>
<p>Eserin gideceği yere hasarsız ulaşması tek kriter değildir. <u>Aynı nem ve sıcaklık koşullarında</u> ulaşması gerekir. Fark bu iki cümlededir ve müze taşımacılığını tüm diğer nakliyat türlerinden ayırt eden budur.</p>`,
      order: 16,
      active: true,
    },
    {
      name: 'Bankamatik Taşımacılığı',
      slug: 'bankamatik-tasimaciligi',
      description: 'ATM cihazlarının şube yenileme, konum değişikliği veya servis süreçlerinde taşınması; ağır yük ekipmanı, güvenlik protokolü ve anında devreye alma planıyla teslim edilir.',
      metaTitle: 'Bankamatik Taşımacılığı | ATM Nakliyat Hizmeti',
      metaDescription: 'Bankamatik ve ATM taşımacılığında güvenlik protokolü, ağır yük ekipmanı ve yerinde devreye alma hizmeti.',
      benefits: `Güvenlik eskortlu taşıma\nATM vinç ve forklift\nAnında devreye alma\nHafta sonu operasyon\nSigortalı taşıma\nBanka koordinatörü ile çalışma`,
      content: `<h2>500 Kilogram <em>Elektronik Değil</em>, Güvenlik Sorunudur</h2>
<p>Bankamatik kabini elektronik bir cihazdan çok daha fazlasıdır. Ağır, darbe hassasiyeti yüksek ve içinde nakit barındıran bir yapıdır. <em>Yanlış kaldırma ya da devrilme</em> hem mekanik arızaya hem ciddi güvenlik açığına yol açar.</p>
<p>Bu yüzden her hareket yetkili imzasına dayalı yürütülür. <strong>Kamera kaydı kesiksizdir</strong>; taşıma tamamlanana kadar güvenlik personeli sahadaki konumunu korur.</p>
<h2>ATM Taşıma <u>Ekipman Gereksinimleri</u></h2>
<ul>
<li>Sanayi tipi el arabası; minimum 600 kg yük kapasiteli</li>
<li>Özel ATM kaldırma aparatı; devrilme kilidi entegre</li>
<li>Çift katlı köpük tamponlu koruyucu ambalaj</li>
<li>Güvenlik kilitli, kapalı araç kasası</li>
<li>En az iki güvenlik personeli; biri giriş biri çıkışı izler</li>
</ul>
<h2>Operasyon Boyunca <strong>Güvenlik Kontrol Noktaları</strong></h2>
<table><thead><tr><th>Aşama</th><th>Kontrol Edilen</th><th>Sorumlu</th></tr></thead><tbody>
<tr><td>Söküm öncesi</td><td>Nakit çekildi mi; banka onayı var mı</td><td>Banka yetkilisi</td></tr>
<tr><td>Yükleme</td><td>Kamera kaydı aktif mi</td><td>Güvenlik personeli</td></tr>
<tr><td>Nakil</td><td>GPS takibi + kamera izleme</td><td>Nakliye ekibi</td></tr>
<tr><td>Teslim</td><td>İki yetkili imzası + sayım tutanağı</td><td>Banka + nakliye</td></tr>
</tbody></table>
<h2>Yeni Konumda <em>Devreye Alma</em> Süreci</h2>
<ol>
<li>ATM zemine sabitlenir; cıvata momentleri teknik şemaya göre kontrol edilir</li>
<li>Ağ bağlantısı kurulur; iletişim testi banka IT birimi ile yapılır</li>
<li>Kart okuyucu ve para dispenseri test çekimiyle doğrulanır</li>
<li>Güvenlik kamerasının açısı ayarlanır ve kayıt test edilir</li>
<li>Banka teknik birimi yazılı onay verene kadar cihaz devreye alınmaz</li>
</ol>
<h2>Operasyon Saati <strong>Neden Gizli Tutulur?</strong></h2>
<p>ATM taşıma saati ve güzergâhı yalnızca ilgili yetkililere bildirilir. <u>Üçüncü taraflarla paylaşılmaz</u>; bu gizlilik standart değil, zorunlu güvenlik protokolünün bir parçasıdır.</p>`,
      order: 17,
      active: true,
    },
    {
      name: 'Para Kasası Taşımacılığı',
      slug: 'para-kasasi-tasimaciligi',
      description: 'Çelik kasalar, yangın güvenlikli dolaplar ve değerli eşya muhafazalarının taşınması; ağır yük tekniği, güvenlik zinciri ve titiz teslimat protokolüyle gerçekleşir.',
      metaTitle: 'Para Kasası Taşımacılığı | Güvenli Kasa Nakliyat',
      metaDescription: 'Para kasası ve çelik dolap taşımacılığında güvenlik eskort, forklift ve anlık teslimat onayı ile güvenli nakliyat.',
      benefits: `Güvenlik eskortlu taşıma\nForklift ve özel kaldırma\nAnlık teslimat onayı\nİki yetkili imzası\nGizli rota planlaması\nSigortalı kasa nakliyatı`,
      content: `<h2>800 Kilogram <em>Zorluğu Ağırlıkta</em> Değil, Güvencede</h2>
<p>Bir çelik kasa ağır bir eşyadan çok daha fazlasıdır. İçindekiler bilinmez, bilinmemelidir de. <em>Kasanın hangi saatte, hangi araçla ve kimler tarafından taşındığı</em> en baştan kayıt altına alınır. Güvenlik zinciri bir an bile kırılmaz.</p>
<p>Söküm sırasında kamera kaydı başlar ve teslimat tutanağı imzalanana kadar devam eder. <strong>Hiçbir adım</strong> yetkili olmadan atılamaz.</p>
<h2>Kasa Türleri ve <u>Taşıma Gereksinimleri</u></h2>
<ul>
<li>Duvar kasası: ankraj sökümü + özel kaldırma aparatı</li>
<li>Yer kasası: beton zemin kesimi gerekebilir + vinç</li>
<li>Yangın güvenlikli dolap: köpük ambalaj + darbeye karşı kılıflama</li>
<li>Yüksek değerli müzayede kasası: değer beyanlı sigorta zorunlu</li>
</ul>
<h2>Operasyon Boyunca <strong>Güvenlik Protokolü</strong></h2>
<table><thead><tr><th>Aşama</th><th>Güvenlik Önlemi</th><th>Belge</th></tr></thead><tbody>
<tr><td>Taşıma öncesi</td><td>Kimlik doğrulama + yetki belgesi ibrazı</td><td>Yetki formu</td></tr>
<tr><td>Söküm</td><td>Kamera kaydı başlatılır</td><td>Kayıt tutanağı</td></tr>
<tr><td>Nakil</td><td>Gizli rota + güvenlik eskortlu araç</td><td>GPS kaydı</td></tr>
<tr><td>Yerleştirme</td><td>Müşteri ve nakliye çift imzası</td><td>Teslim tutanağı</td></tr>
</tbody></table>
<h2>Kurulum Sonrası <em>Test ve Onay</em> Adımları</h2>
<ol>
<li>Kasa zemine veya duvara teknik şemaya göre monte edilir</li>
<li>Tüm kilit mekanizmaları yüklü ve boş koşullarda test edilir</li>
<li>Kombinasyon sıfırlama yetkisi yalnızca müşteriye devredilir</li>
<li>Nakliye ekibinin sistem bilgisi yoktur; bu gizlilik kasıtlıdır</li>
<li>Teslimat tutanağı çift imzayla kapatılır; bir kopyası müşteride kalır</li>
</ol>
<h2>Operasyon Saati <strong>Neden Paylaşılmaz?</strong></h2>
<p>Kasa taşıma saati ve güzergâhı yalnızca birinci derece ilgililere bildirilir. <u>Üçüncü taraflarla paylaşım</u> yasaktır; bu kural protokolün değil, güvenlik anlayışının gereğidir.</p>`,
      order: 18,
      active: true,
    },
    // ─── EK HİZMETLER ───
    {
      name: 'Ücretsiz Ekspertiz',
      slug: 'ucretsiz-ekspertiz',
      description: 'Taşınma süreciniz henüz başlamadan, uzman gözü evinizi inceler. Eşya hacmi, asansör boyutu ve merdiven açısı yerinde ölçülür; size şeffaf ve sabit bir teklif sunulur.',
      metaTitle: 'Ücretsiz Ekspertiz | Yerinde Nakliyat Fiyat Tespiti',
      metaDescription: 'Ücretsiz ekspertiz hizmetiyle taşınma maliyetinizi önceden netleştirin. Yerinde ölçüm, yazılı teklif ve sürpriz ek ücret yok.',
      benefits: `Yerinde ücretsiz ölçüm\nYazılı ve sabit fiyat teklifi\nSürpriz ek ücret yok\n24 saat içinde teklif teslimi\nTaşıma planı ön görüşme\nUzman keşif ekibi`,
      content: `<h2>Fiyat Söylenmeden Önce <em>Eviniz Görülmeli</em></h2>
<p>Taşınma bütçesi çoğu zaman telefon başında netleşir. Oysa asansör ölçüsü, merdiven açısı ve kırılgan mobilyaların hacmi hiçbir sözden tam okunamaz. <em>Ekspertiz ziyareti</em> bu belirsizliği baştan kapatır.</p>
<p>Uzman ekip kapıdan girer; her odayı tek tek ölçer, notunu kâğıda geçirir. <strong>Ortaya çıkan teklif değişmez</strong> — taşıma günü de aynı rakam geçerlidir.</p>
<h2>Ziyarette <u>İncelenen Her Nokta</u></h2>
<ul>
<li>Eşya türü, adet ve tahmini toplam hacim</li>
<li>Asansör iç boyutu ve azami yük kapasitesi</li>
<li>Bina giriş kapısı genişliği ile koridor dönüş açısı</li>
<li>Cam, ayna ve tablo gibi kırılabilir parçalar ayrıca not edilir</li>
<li>Söküm gerektiren mobilyalar ve gerekli alet listesi</li>
<li>Yeni adreste montaj gerektirecek ürünler</li>
</ul>
<h2>Teklif Yöntemi <strong>Doğruluk Karşılaştırması</strong></h2>
<table><thead><tr><th>Yöntem</th><th>Fiyat Doğruluğu</th><th>Sürpriz Ek Ücret</th><th>Yazılı Garanti</th></tr></thead><tbody>
<tr><td>Telefon tahmini</td><td>Düşük</td><td>Yüksek risk</td><td>Hayır</td></tr>
<tr><td>Fotoğraf incelemesi</td><td>Orta</td><td>Orta risk</td><td>Kısmi</td></tr>
<tr><td>Yerinde ekspertiz</td><td>Çok yüksek</td><td>Sıfır</td><td>Evet</td></tr>
</tbody></table>
<h2><em>Randevu Günü</em> Hazırlığı</h2>
<ol>
<li>Tüm oda kapılarını açık bırakın; uzman her köşeyi görmelidir</li>
<li>Depo, balkon ve bodrum eşyalarını önceden listeleyin</li>
<li>Taşımayı düşünmediğiniz parçaları belirtin veya ayırın</li>
<li>Taşınma tarihi tercihinizi ve yedek günleri hazırlayın</li>
<li>Aklınızdaki soruları yazılı not alın; uzman yanıtlar</li>
</ol>
<h2>Teklifte <strong>Hangi Kalemler Yer Alır?</strong></h2>
<p>Ziyaret tamamlandıktan sonra <u>24 saat içinde</u> yazılı teklif iletilir. Araç tipi, ekip büyüklüğü, çalışma süresi ve her hizmet kalemi ayrı satırda gösterilir. Hiçbir rakam açıklanmadan geçilmez.</p>
<p>İmzalanan teklife sonradan ek ücret yansıtılamaz. <em>Bu güvence</em>, ekspertiz yapan firmayla yapmayan firma arasındaki en somut farkı oluşturur.</p>`,
      order: 19,
      active: true,
    },
    {
      name: 'Sözleşmeli Evden Eve Nakliyat',
      slug: 'sozlesmeli-evden-eve-nakliyat',
      description: 'Taşıma günü yaşanan fiyat baskısı, kayıp eşya iddiaları ve sorumluluk tartışmalarının tek kalkanı imzalı bir sözleşmedir. Yazılı taahhüt olmadan yapılan nakliyat, her iki taraf için de belirsizlik demektir.',
      metaTitle: 'Sözleşmeli Evden Eve Nakliyat | Yasal Güvenceli Taşıma',
      metaDescription: 'Sözleşmeli nakliyatta fiyat garantisi, sorumluluk kapsamı ve tazminat şartları yazılı olarak belirlenir. Hukuki güvence ile taşının.',
      benefits: `Yazılı fiyat garantisi\nHukuki sorumluluk kapsamı\nTazminat şartları netleştirilmiş\nİptal ve erteleme koşulları\nEşya listesi sözleşmeye eklenir\nNoter onaylı seçenek`,
      content: `<h2>Sözlü Anlaşma <em>Taşıma Günü</em> Geçersizdir</h2>
<p>Araç yola çıktıktan sonra ortaya çıkan itirazlar, sözlü anlaşmalarla hiçbir mercide geçer sayılmaz. Kayıp ya da hasarlı eşya için hukuki yola başvurmak istediğinizde <strong>elinizde yazılı belge olmalıdır.</strong></p>
<p>Türkiye'de her yıl binlerce nakliyat uyuşmazlığı tüketici mahkemelerine taşınır. <em>Neredeyse tamamı</em> imzasız süreçlerden doğar. Yazılı sözleşme bu tartışmayı daha başlamadan bitirir.</p>
<h2>Sözleşmenin <u>Olmazsa Olmaz Maddeleri</u></h2>
<ul>
<li>Taşıma tarihi, başlangıç saati ve teslim penceresi açıkça yazılmış</li>
<li>Alım ve teslim adresi tam adresle belirtilmiş</li>
<li>Toplam ücret ve ödeme yöntemi net rakamlarla yer almış</li>
<li>Hasar durumunda sorumluluk sınırı tanımlanmış</li>
<li>İptal ve erteleme koşulları ayrı maddede açıklanmış</li>
<li>Taşınan eşya listesi ek belge olarak sözleşmeye eklenmiş</li>
</ul>
<h2>Standart ve <strong>Güçlendirilmiş Sözleşme</strong> Farkı</h2>
<table><thead><tr><th>Kapsam</th><th>Standart</th><th>Güçlendirilmiş</th></tr></thead><tbody>
<tr><td>Fiyat garantisi</td><td>Var</td><td>Var + ek ücret yasağı</td></tr>
<tr><td>Hasar tazminatı</td><td>Sınırlı</td><td>Tam rayiç değer</td></tr>
<tr><td>Eşya listesi</td><td>Genel</td><td>Kalemli ve çift imzalı</td></tr>
<tr><td>İptal hakkı</td><td>48 saat</td><td>72 saat + iade garantisi</td></tr>
</tbody></table>
<h2>İmzalamadan Önce <em>Kontrol Listesi</em></h2>
<ol>
<li>Firmanın vergi numarası ve ticari adresi sözleşmede yer alıyor mu?</li>
<li>Sigorta poliçe numarası açıkça yazıyor mu?</li>
<li>Ek hizmet ücretleri tek tek listelenmiş mi?</li>
<li>Teslimatta hasarın nasıl raporlanacağı yazılı mı?</li>
<li>Her sayfayı okuyun; imzanız o bilgiden haberdar olduğunuzu teyit eder</li>
</ol>
<h2>Anlaşmazlık Olursa <strong>İlk 48 Saat</strong></h2>
<p>Sözleşmeli bir nakliyatta hasar yaşandığında fotoğraf ve tutanak alınmalıdır. <u>Firma yazılı olarak</u> bildirilmeli; tazminat talebi bu belgelere dayanarak açılmalıdır. 48 saati geçiren bildirimler hukuki geçerliliğini yitirebilir.</p>
<p>Tüketici Hakem Heyeti'ne başvuru için alt sınır her yıl güncellenir. Daha yüksek talepler asliye hukuk mahkemesine taşınır. <em>Sözleşmesiz</em> hiçbir davada mahkeme firmanın sorumluluğunu otomatik kabul etmez.</p>`,
      order: 20,
      active: true,
    },
    {
      name: 'Sigortalı Evden Eve Nakliyat',
      slug: 'sigortali-evden-eve-nakliyat',
      description: 'Taşıma sırasında kırılan, çizilen ya da kaybolan bir eşya için tazminat alabilmek, ancak taşıma sigortası ile mümkündür. Poliçesiz yapılan nakliyat, tüm riski size bırakır.',
      metaTitle: 'Sigortalı Evden Eve Nakliyat | Taşıma Sigortası Kapsamı',
      metaDescription: 'Sigortalı nakliyatta kırılma, kayıp ve hasar tazminatı güvencesi. Poliçe kapsamı, hasar bildirimi ve tazminat süreci hakkında bilgi alın.',
      benefits: `Yükleme anından teslimata kadar sigorta\nKırılma ve kayıp tazminatı\nRayiç değer üzerinden poliçe\n48 saat içinde hasar bildirimi\nTazminat 15 iş günü\nYazılı poliçe teslimi`,
      content: `<h2>Kırılan Vazo <em>Sadece Para Değil</em>, Güvencesizliktir</h2>
<p>Taşıma sırasında zarar gören bir eşya için tazminat alabilmek, ancak geçerli bir poliçeyle mümkündür. <em>Poliçesiz nakliyatta</em> tüm sorumluluk size kalır; firma kusuru ispat edilemezse karşılık alamazsınız.</p>
<p>Öte yandan her sigorta aynı değildir. <strong>Zorunlu sorumluluk sigortası</strong> yalnızca firmanın kusurunu karşılar. Tam nakliyat poliçesi ise kaza, sel ve yangın gibi dış riskleri de içerir.</p>
<h2>Sigorta Türleri <u>Karşılaştırması</u></h2>
<table><thead><tr><th>Sigorta Türü</th><th>Kapsam</th><th>Tazminat Tabanı</th><th>Ekstra Maliyet</th></tr></thead><tbody>
<tr><td>Zorunlu sorumluluk</td><td>Firma kusuru</td><td>Yasal sınır</td><td>Dahil</td></tr>
<tr><td>Tam nakliyat sigortası</td><td>Her türlü hasar</td><td>Rayiç değer</td><td>%0,5–1,5</td></tr>
<tr><td>Değer beyan sigortası</td><td>Beyan edilen miktar</td><td>Beyan değeri</td><td>Değişken</td></tr>
</tbody></table>
<h2>Poliçe Almadan Önce <strong>Sorulacaklar</strong></h2>
<ul>
<li>Antika ve sanat eserleri ayrıca tanımlanmış mı?</li>
<li>Elektronik cihazlar için iç hasar teminatı var mı?</li>
<li>Reasürans şirketinin adı poliçede açıkça yazıyor mu?</li>
<li>Depolama süresi kapsama dahil mi?</li>
<li>Hasar bildirimi için süre sınırı kaç gün?</li>
</ul>
<h2>Hasar Durumunda <em>İzlenecek Adımlar</em></h2>
<ol>
<li>Teslim anında tüm eşyaları ekip önünde tek tek kontrol edin</li>
<li>Her hasarı fotoğrafla belgeleyin; zaman damgasına dikkat edin</li>
<li>Taşıma firmasına 48 saat içinde yazılı bildirim yapın</li>
<li>Sigorta şirketine hasar ihbar formu doldurun</li>
<li>Tazminat değerleme için eksper randevusu talep edin</li>
</ol>
<h2>Tazminat Sürecinde <strong>Kritik Süreler</strong></h2>
<p>Hasar bildirimi 48 saati geçerse tazminat hakkı önemli ölçüde zayıflar. <u>Eksper değerleme</u> genellikle 5 iş günü içinde tamamlanır. Ödeme kararı ise poliçeye göre 15 ile 30 iş günü arasında çıkar.</p>
<p>Yüksek değerli eşyalar için fatura veya bağımsız değerleme raporu önceden hazırlanmalıdır. <em>Bu belgeler</em> süreci hızlandırır ve itiraz sürecini gereksiz kılar.</p>`,
      order: 21,
      active: true,
    },
    {
      name: 'Asansörlü Evden Eve Nakliyat',
      slug: 'asansorlu-evden-eve-nakliyat',
      description: 'Vinç asansör sistemi, merdivenden çıkarılması imkânsız olan büyük mobilyaları dışarıdan kaldırarak taşır. Bina içi asansörü yetersiz kalan her taşıma için standart çözüm haline gelmiştir.',
      metaTitle: 'Asansörlü Evden Eve Nakliyat | Vinç Asansör ile Taşıma',
      metaDescription: 'Asansörlü nakliyatta vinç asansör sistemi, büyük mobilyaları hızlı ve hasarsız taşır. Rezervasyon ve koordinasyon dahildir.',
      benefits: `Vinç asansör sistemi\nMerdiven hasarı riski sıfır\nBüyük mobilya çözümü\nSite yönetimi koordinasyonu\nHızlı yükleme-tahliye\nSigortalı operasyon`,
      content: `<h2>Koltuk Asansöre <em>Sığmıyorsa</em> Vinç Devreye Girer</h2>
<p>Standart bir bina asansörünün iç ölçüsü 100 × 130 santimetre civarındadır. Üçlü köşe koltuk ya da king-size baza bu alana sığmaz. <em>Vinç asansör</em> bu durumda pencere veya balkon önünde konumlanır; eşyayı dışarıdan kaldırır.</p>
<p>Kurulum göründüğü kadar basit değildir. <strong>Araç parkı, vinç açısı ve pencere erişimi</strong> önceden hesaplanmazsa operasyon gün içinde durabilir.</p>
<h2>Vinç Asansör Gerektiren <u>Eşya Türleri</u></h2>
<ul>
<li>L ve U köşe koltuk takımları; bina asansörüne sığmayan en yaygın parça</li>
<li>King-size yatak kafalığı ve baza çerçeveleri</li>
<li>Piyano ve org gibi ağır müzik aletleri</li>
<li>Özel ölçülü dolap sistemleri ve büyük vitrinler</li>
<li>Jakuzi, küvet ve ankastre mutfak üniteleri</li>
</ul>
<h2>Taşıma Yöntemi <strong>Karşılaştırması</strong></h2>
<table><thead><tr><th>Yöntem</th><th>Büyük Eşya</th><th>Merdiven Hasarı</th><th>Ortalama Süre</th></tr></thead><tbody>
<tr><td>Elle merdiven</td><td>Sınırlı</td><td>Yüksek risk</td><td>Uzun</td></tr>
<tr><td>Bina asansörü</td><td>Orta</td><td>Orta risk</td><td>Orta</td></tr>
<tr><td>Vinç asansör</td><td>Tam çözüm</td><td>Sıfır</td><td>Kısa</td></tr>
</tbody></table>
<h2>Site Yönetimi <em>Koordinasyonu</em></h2>
<ol>
<li>Taşınma tarihi belirlenir belirlenmez site yönetimine bildirim yapılır</li>
<li>Vinç asansör kullanım saati yöneticiyle önceden netleştirilir</li>
<li>Araç ve vinç için park alanı en az bir gün önceden ayrılır</li>
<li>Komşular bilgilendirilir; giriş-çıkış geçici olarak etkilenebilir</li>
<li>Bina sigortasının vinç kullanımını kapsayıp kapsamadığı sorulur</li>
</ol>
<h2>Operasyon Günü <strong>Nasıl İlerler?</strong></h2>
<p>Ekip sabahın erken saatinde gelir; vinç konumunu ayarlar. Küçük parçalar bina asansörüyle, büyük parçalar dışarıdan kaldırılır. <u>Her parça askıya alınmadan önce</u> bağlantı sistemi kontrol edilir.</p>
<p>Tüm operasyon iki saatte tamamlanabilir. <em>Merdiven taşımasının</em> yarısı kadar sürer; merdiven ve duvarı hasarsız terk eder.</p>`,
      order: 22,
      active: true,
    },
    {
      name: 'Ambalaj ve Paketleme',
      slug: 'ambalaj-ve-paketleme',
      description: 'Taşıma sırasındaki hasarların yüzde sekseninden fazlası hatalı paketlemeden kaynaklanır. Doğru malzeme, doğru teknik ve doğru sıra uygulandığında eşyanız bitmemiş gibi çıkar.',
      metaTitle: 'Ambalaj ve Paketleme Hizmeti | Profesyonel Nakliyat Ambalajı',
      metaDescription: 'Nakliyat ambalajında çift kat streç film, balonlu naylon ve tahta kasa ile kırılmaz paketleme hizmeti. Tüm eşya türleri için özel çözüm.',
      benefits: `Eşyaya özel ambalaj tekniği\nÇift kat streç film\nBalonlu naylon ve köpük\nTahta kasa özel üretim\nVakumlu torba seçeneği\nAmbalaj malzemesi dahil`,
      content: `<h2>Hasar Başlamadan <em>Ambalajda</em> Önlenir</h2>
<p>Taşıma hasarlarının büyük bölümü yolda değil, yükleme sırasında başlar. Doğru sabitlenmemiş bir vazo ilk frende sürüklenir. <em>Kırılma anı</em> çoğunlukla rampadan çıkarken yaşanır; araç henüz hareket etmemiştir.</p>
<p>Malzeme kalitesi, katman sayısı ve eşyalar arası dolgu yoğunluğu belirleyicidir. <strong>Gazete kâğıdı ile balonlu naylon</strong> arasındaki fark, taşınma sonrası açılan ilk kutuda ortaya çıkar.</p>
<h2>Eşyaya Göre <u>Doğru Ambalaj Malzemesi</u></h2>
<table><thead><tr><th>Eşya</th><th>İlk Katman</th><th>İkinci Katman</th><th>Dış Koruma</th></tr></thead><tbody>
<tr><td>Cam ve porselen</td><td>Köpük folyosu</td><td>Balonlu naylon</td><td>Tahta kasa</td></tr>
<tr><td>Mobilya yüzeyi</td><td>Tekstil battaniye</td><td>Çift kat streç</td><td>Köşe koruyucu</td></tr>
<tr><td>Elektronik cihaz</td><td>Antistatik torba</td><td>Köpük tampon</td><td>Sert karton</td></tr>
<tr><td>Tekstil ürünleri</td><td>—</td><td>Vakumlu torba</td><td>Dayanıklı naylon çuval</td></tr>
<tr><td>Kitap ve evrak</td><td>Silika jel</td><td>Şeffaf naylon</td><td>Asitsiz mukavva</td></tr>
</tbody></table>
<h2>Kendi Paketleme mi, <strong>Uzman Ambalaj mı?</strong></h2>
<ul>
<li>Evde bulunan malzeme çoğunlukla darbeye dayanıksız kalır</li>
<li>Yetersiz katman sayısı kırılgan parçaları koruyamaz</li>
<li>Yanlış etiketleme taşıma sırasında yönlendirme hatasına yol açar</li>
<li>Uzman ambalajda hasar sigortası poliçeye dahil edilebilir</li>
<li>Profesyonel ekip bir evi kendi başınıza yapacağınız sürenin üçte birinde paketler</li>
</ul>
<h2>Paketleme <em>Sırasının</em> Kuralları</h2>
<ol>
<li>Ağır ve sert eşyalar kutu tabanına yerleştirilir; zemin katmanı oluşturur</li>
<li>Hafif ve kırılgan parçalar üste konur; alt baskıdan korunur</li>
<li>Boşluklar köpük topuyla kapatılır; hareket engellenir</li>
<li>Her kutu içeriğini belirten etiketle kapanır</li>
<li>Kırılacak ürünlerin kutusu kırmızı bant ile ayrıştırılır</li>
</ol>
<h2>Yeni Evde <strong>Ambalaj Açma Sırası</strong></h2>
<p>Kutuları rastgele açmak yerine bir sıra belirleyin. Önce <u>yatak odası kurulur</u>; geceyi geçirecek alan elde edilir. Ardından mutfak, en son oturma odası açılır.</p>
<p>Tüm kutular açılmadan ambalaj malzemelerini dışarı çıkarmayın. <em>Kırık parçalar</em> gazete katları arasında gizli kalabilir; çöpe atılan ambalaj, olası kayıp iddiasını ispatsız bırakır.</p>`,
      order: 23,
      active: true,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    })
    console.log(`✓ ${service.name} eklendi`)
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
