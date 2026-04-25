import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const areas = [
  {
    slug: 'istanbul-izmir',
    city: "İstanbul'dan İzmir'e",
    description: "İstanbul'dan İzmir'e taşınmaya karar verdiyseniz ekibimiz bu güzergahı yüzlerce kez tamamladı. Eşyalarınız İstanbul'daki evinizden teslim alınır, İzmir adresinize sağlam teslim edilir.",
    metaTitle: "İstanbul'dan İzmir'e Evden Eve Nakliyat | Kapıdan Kapıya Taşıma",
    metaDescription: "İstanbul İzmir evden eve nakliyat. Eşyalarınız sigortalı, ambalajlı ve sözleşmeli olarak kapıdan kapıya taşınır. Ücretsiz ekspertiz ile net fiyat alın.",
    content: `<h2>İzmir'e Taşınma Kararı Aldınız: <strong>Gerisi Bize Kalsın</strong></h2>
<p>İstanbul'dan İzmir'e her yıl binlerce aile taşınır. Bu güzergahta edindiğimiz deneyim, taşınma gününüzü öngörülemeyen sürprizlerden arındırır. <em>Sabah evinizden</em> alınan eşyalarınız, akşam İzmir adresinizde sizi bekler.</p>
<p>Osmangazi Köprüsü geçişiyle 6–7 saatte tamamlanan bu hat, ekibimizin en sık çalıştığı güzergahlardan biridir. <strong>Karşıyaka, Bornova, Buca ve Konak</strong> ilçelerine haftalık düzenli seferlerimiz mevcuttur.</p>
<h2>Bu Güzergahta <u>Sunduğumuz Hizmetler</u></h2>
<table><thead><tr><th>Hizmet</th><th>Kapsam</th></tr></thead><tbody>
<tr><td>Ambalaj ve paketleme</td><td>Tüm eşya, çift kat koruma</td></tr>
<tr><td>Söküm ve montaj</td><td>Dolap, karyola, mutfak</td></tr>
<tr><td>Nakliyat sigortası</td><td>Tam hasar güvencesi</td></tr>
<tr><td>Vinç asansör</td><td>Gerekli adresler için</td></tr>
<tr><td>Ücretsiz ekspertiz</td><td>Yerinde fiyat tespiti</td></tr>
</tbody></table>
<h2>Taşınma Süreciniz <em>Nasıl İşler?</em></h2>
<ol>
<li>Bizi arayın; uzmanımız İstanbul adresinize ücretsiz ekspertiz için gelir</li>
<li>Eşya listesi ve fiyat teklifi yazılı olarak tarafınıza iletilir</li>
<li>Belirlenen günde ekip erken saatte yüklemeye başlar</li>
<li>Eşyalarınız ambalajlı, sigortalı araçta İzmir'e hareket eder</li>
<li>İzmir adresinizde teslim edilir, istenirse montaj yapılır</li>
</ol>
<h2>İzmir'de <strong>Hangi İlçelere</strong> Hizmet Veriyoruz?</h2>
<ul>
<li><strong>Karşıyaka ve Bornova:</strong> Haftalık düzenli sefer, aynı gün teslim mümkün</li>
<li><strong>Buca ve Gaziemir:</strong> Büyük araç girişine uygun, standart taşıma</li>
<li><strong>Konak tarihi merkez:</strong> Dar sokaklar için küçük araç + vinç kombinasyonu</li>
<li><strong>Çiğli ve Menemen:</strong> Sanayi bölgesi yakını, geniş cadde erişimi</li>
<li><strong>Urla, Seferihisar:</strong> Ege kıyısı adres teslimatı, ek mesafe ile</li>
</ul>
<p>İzmir'e taşınmadan önce <u>ücretsiz ekspertiz randevusu</u> alarak net fiyatınızı öğrenin. Taşıma günü herhangi bir ek ücretle karşılaşmazsınız; teklifimiz sabittir.</p>`,
  },
  {
    slug: 'istanbul-aydin',
    city: "İstanbul'dan Aydın'a",
    description: "İstanbul'dan Aydın'a taşınmak isteyen ailelere kapıdan kapıya nakliyat hizmeti sunuyoruz. Nazilli, Söke, Kuşadası ve Didim dahil tüm ilçelere düzenli sefer yapıyoruz.",
    metaTitle: "İstanbul'dan Aydın'a Evden Eve Nakliyat | Sigortalı Kapıdan Kapıya",
    metaDescription: "İstanbul Aydın evden eve nakliyat. Nazilli, Söke, Kuşadası, Didim dahil tüm ilçelere sigortalı ve sözleşmeli taşıma. Ücretsiz ekspertiz ile fiyat alın.",
    content: `<h2>Aydın'a Taşınıyorsunuz: <em>Eşyalarınızı</em> Biz Götürüyoruz</h2>
<p>Ege'nin bereketli ovasına yerleşme kararı aldınız mı? Ekibimiz İstanbul'dan Aydın'a düzenli sefer yapıyor. <strong>Evinizin tamamını</strong> veya yalnızca belirli eşyaları Aydın adresinize taşıyoruz.</p>
<p>Söke'nin zeytin bağları arasındaki müstakil evlerden Kuşadası marina çevresindeki sitelere kadar her adrese ulaşıyoruz. <em>Yazlık ya da kalıcı</em> taşınma fark etmez; fiyatlandırma ve hizmet kapsamı her ikisinde aynı titizlikle sunulur.</p>
<h2>Aydın <u>İlçe Hizmet Kapsamı</u></h2>
<table><thead><tr><th>İlçe</th><th>Sefer Sıklığı</th><th>Taşıma Türü</th></tr></thead><tbody>
<tr><td>Aydın merkez</td><td>Haftalık</td><td>Tam ev taşıma</td></tr>
<tr><td>Nazilli</td><td>Haftalık</td><td>Tam ev taşıma</td></tr>
<tr><td>Söke</td><td>Haftada 2</td><td>Tam ev + parça</td></tr>
<tr><td>Kuşadası</td><td>Haftada 2</td><td>Yazlık dahil</td></tr>
<tr><td>Didim</td><td>Haftalık</td><td>Yazlık dahil</td></tr>
</tbody></table>
<h2>Hizmetimize <strong>Dahil Olan Her Şey</strong></h2>
<ul>
<li>İstanbul adresinizde ücretsiz yerinde ekspertiz ve yazılı teklif</li>
<li>Tüm mobilya, beyaz eşya ve kırılganlara özel ambalaj uygulaması</li>
<li>Dolap, karyola ve mutfak dolabı söküm–montaj hizmeti</li>
<li>Tam nakliyat sigortası; hasar durumunda tazminat güvencesi</li>
<li>Aydın adresinde istediğiniz odaya yerleştirme</li>
</ul>
<ol>
<li>Ücretsiz ekspertiz için bizi arayın veya form doldurun</li>
<li>Yazılı teklifinizi 24 saat içinde alırsınız</li>
<li>Taşıma gününü birlikte belirleriz; siz sadece hazır olun</li>
<li>Ekip İstanbul'dan alır, Aydın'a teslim eder</li>
</ol>`,
  },
  {
    slug: 'istanbul-ankara',
    city: "İstanbul'dan Ankara'ya",
    description: "İstanbul'dan Ankara'ya taşınmak isteyen aileler için kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. TEM güzergahında her gün düzenli sefer yapan ekibimiz eşyalarınızı aynı gün teslim eder.",
    metaTitle: "İstanbul'dan Ankara'ya Evden Eve Nakliyat | Aynı Gün Teslim",
    metaDescription: "İstanbul Ankara evden eve nakliyat. TEM güzergahında aynı gün teslim, sigortalı ve sözleşmeli taşıma. Çankaya, Keçiören, Yenimahalle dahil ücretsiz ekspertiz.",
    content: `<h2>Başkente Taşınıyorsunuz: <strong>Her Gün Sefer Yapıyoruz</strong></h2>
<p>İstanbul–Ankara hattı Türkiye'nin en yoğun nakliyat güzergahıdır. Ekibimiz bu yolu haftada birden fazla gidiş-dönüş yapıyor. <em>Sabah yüklenen</em> eşyalarınız, aynı gün öğleden sonra Ankara adresinizde teslim edilir.</p>
<p>Çankaya, Yenimahalle, Keçiören veya Etimesgut; Ankara'nın hangi ilçesine taşınırsanız taşının, ekibimiz adresi önceden değerlendirir. <strong>Dar sokak, yüksek kat veya vinç gerektiren adres</strong> varsa bunu baştan sözleşmeye yansıtırız.</p>
<h2>Ankara <u>İlçe Teslimat Kapsamı</u></h2>
<table><thead><tr><th>İlçe</th><th>Araç Erişimi</th><th>Vinç İhtiyacı</th></tr></thead><tbody>
<tr><td>Çankaya</td><td>Kolay</td><td>Yüksek katlarda</td></tr>
<tr><td>Yenimahalle</td><td>Kolay</td><td>Nadiren</td></tr>
<tr><td>Keçiören</td><td>Orta</td><td>Bazı sokaklar</td></tr>
<tr><td>Etimesgut</td><td>Kolay</td><td>Nadiren</td></tr>
<tr><td>Mamak</td><td>Orta</td><td>Zaman zaman</td></tr>
</tbody></table>
<h2>İstanbul–Ankara <em>Taşıma Paketi</em> İçeriği</h2>
<ul>
<li>Yerinde ücretsiz ekspertiz ve sabit fiyat garantisi</li>
<li>Kırılgan eşyalara özel köpük ve çift kat balonlu naylon ambalaj</li>
<li>Tüm mobilya söküm ve Ankara'da montaj hizmeti</li>
<li>Nakliyat sigortası; rayiç değer üzerinden tazminat</li>
<li>GPS takipli araç; konumunuzu anlık izleyebilirsiniz</li>
</ul>
<ol>
<li>Bizi arayın; İstanbul adresinize ekspertiz gelir</li>
<li>Yazılı, değişmez fiyat teklifinizi alırsınız</li>
<li>Taşıma günü ekip erken saatte yüklemeye başlar</li>
<li>Ankara'da teslim, montaj ve eşya yerleştirme tamamlanır</li>
</ol>`,
  },
  {
    slug: 'istanbul-antalya',
    city: "İstanbul'dan Antalya'ya",
    description: "İstanbul'dan Antalya'ya kalıcı veya yazlık taşınma için kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Kemer, Alanya, Belek ve Manavgat dahil tüm ilçelere teslimat yapıyoruz.",
    metaTitle: "İstanbul'dan Antalya'ya Evden Eve Nakliyat | Kemer Alanya Dahil",
    metaDescription: "İstanbul Antalya evden eve nakliyat. Kemer, Alanya, Belek, Manavgat dahil sigortalı kapıdan kapıya taşıma. Ücretsiz ekspertiz ile net fiyat alın.",
    content: `<h2>Akdeniz'e Taşınma Kararını <em>Bize Bırakın</em></h2>
<p>İstanbul'dan Antalya'ya her yıl yüzlerce aile kalıcı olarak taşınıyor. Kalıcı ev taşıması mı, yazlık kurulumu mu; her ikisi için de aynı kapsamlı hizmeti sunuyoruz. <strong>Eşyalarınız kapınızdan alınır</strong>, Antalya'daki yeni adresinizde oda oda yerleştirilir.</p>
<p>Antalya merkezi dışında Kemer, Alanya, Side ve Belek gibi turistik ilçelere de düzenli sefer yapıyoruz. <em>Site güvenliği, araç giriş izni</em> ve özel ada ya da marina teslimatı gibi detayları sizin adınıza koordine ediyoruz.</p>
<h2>Antalya <strong>İlçe Hizmet Tablosu</strong></h2>
<table><thead><tr><th>İlçe / Bölge</th><th>Hizmet Türü</th><th>Sefer</th></tr></thead><tbody>
<tr><td>Antalya merkez</td><td>Tam ev taşıma</td><td>Haftalık</td></tr>
<tr><td>Kemer</td><td>Tam ev + yazlık</td><td>Haftalık</td></tr>
<tr><td>Alanya</td><td>Tam ev + yazlık</td><td>Haftalık</td></tr>
<tr><td>Belek / Side</td><td>Yazlık taşıma</td><td>Haftalık</td></tr>
<tr><td>Manavgat</td><td>Tam ev taşıma</td><td>Haftalık</td></tr>
</tbody></table>
<h2>Hizmetimize <u>Dahil Olanlar</u></h2>
<ul>
<li>İstanbul'da ücretsiz yerinde ekspertiz ve yazılı sabit teklif</li>
<li>Nemli Akdeniz iklimine uygun özel ambalaj malzemeleri</li>
<li>Dolap, karyola, ankastre eşya söküm ve Antalya'da montaj</li>
<li>Nakliyat sigortası; kırılma, kayıp ve hasar tazminatı</li>
<li>Site giriş izni ve araç koordinasyonunu biz hallederiz</li>
</ul>
<ol>
<li>Ekspertiz randevusu alın; uzmanımız eve gelir</li>
<li>Yazılı teklif 24 saat içinde iletilir</li>
<li>Taşıma günü belirlenir; ekip yüklemeyi tamamlar</li>
<li>Antalya adresinizde teslim ve montaj yapılır</li>
</ol>`,
  },
  {
    slug: 'istanbul-balikesir',
    city: "İstanbul'dan Balıkesir'e",
    description: "İstanbul'dan Balıkesir'e taşınmak isteyen aileler için aynı gün teslim imkânıyla evden eve nakliyat yapıyoruz. Bandırma, Erdek, Edremit ve Ayvalık dahil tüm ilçelere hizmet veriyoruz.",
    metaTitle: "İstanbul'dan Balıkesir'e Evden Eve Nakliyat | Aynı Gün Teslim",
    metaDescription: "İstanbul Balıkesir evden eve nakliyat. Bandırma, Erdek, Edremit, Ayvalık dahil aynı gün sigortalı taşıma. Ücretsiz ekspertiz ile net fiyat alın.",
    content: `<h2>Sabah Yükleriz, <strong>Öğleden Önce</strong> Teslim Ederiz</h2>
<p>İstanbul'a yalnızca 280 kilometre uzaklıktaki Balıkesir, aynı gün teslimat yapabildiğimiz en uygun güzergahlardan biridir. <em>Sabah erken yükleme</em> yapıldığında ekibimiz öğlen saatlerinde Balıkesir adresinizde olur.</p>
<p>Bandırma limanı çevresi, Erdek sahil siteleri, Edremit zeytinlikleri ve Ayvalık'a kadar Kuzey Ege'nin tüm noktalarına ulaşıyoruz. <strong>Her ilçe için ayrı araç planlaması</strong> yaparak fiyatı ve seferi optimize ediyoruz.</p>
<h2>Balıkesir <u>İlçe Taşıma Kapsamı</u></h2>
<table><thead><tr><th>İlçe</th><th>Taşıma Türü</th><th>Teslim Süresi</th></tr></thead><tbody>
<tr><td>Merkez</td><td>Tam ev</td><td>Aynı gün</td></tr>
<tr><td>Bandırma</td><td>Tam ev</td><td>Aynı gün</td></tr>
<tr><td>Erdek</td><td>Tam ev + yazlık</td><td>Aynı gün</td></tr>
<tr><td>Edremit</td><td>Tam ev + yazlık</td><td>Aynı gün</td></tr>
<tr><td>Ayvalık</td><td>Tam ev + yazlık</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Balıkesir Taşımalarında <em>Neden Bizi Seçiyorlar?</em></h2>
<ul>
<li>Aynı gün teslim garantisi; ertesi güne bırakmıyoruz</li>
<li>Yazlık ev kurulumu ve eşya yerleştirme dahil tek paket</li>
<li>Sahil sitelerinde araç giriş koordinasyonu bizden</li>
<li>Sabit fiyat; taşıma günü ek ücret talep etmiyoruz</li>
<li>Sigortalı taşıma; olası hasarda tam tazminat</li>
</ul>
<ol>
<li>Ücretsiz ekspertiz için bizi arayın</li>
<li>İlçenizi bildirin; doğru araç ve ekip planlanır</li>
<li>Taşıma günü sabah ekip hazır olur</li>
<li>Balıkesir adresinizde teslim tamamlanır</li>
</ol>`,
  },
  {
    slug: 'istanbul-bursa',
    city: "İstanbul'dan Bursa'ya",
    description: "İstanbul'dan Bursa'ya en hızlı evden eve nakliyat hizmetini sunuyoruz. Osmangazi Köprüsü güzergahıyla Nilüfer, Osmangazi ve Yıldırım ilçelerine aynı gün teslim yapıyoruz.",
    metaTitle: "İstanbul'dan Bursa'ya Evden Eve Nakliyat | Osmangazi Güzergahı",
    metaDescription: "İstanbul Bursa evden eve nakliyat. Nilüfer, Osmangazi, Yıldırım, Mudanya dahil aynı gün sigortalı taşıma. Ücretsiz ekspertiz ile sabit fiyat.",
    content: `<h2>Bursa'ya Taşınmak <em>Bu Kadar Kolay</em></h2>
<p>Osmangazi Köprüsü sayesinde İstanbul ile Bursa arasındaki mesafe 2,5 saate inmiştir. Ekibimiz bu güzergahta haftanın her günü sefer yapıyor. <strong>Sabah 07:00'de yüklemeye</strong> başlayan araç, öğleden önce Bursa adresinizde olur.</p>
<p>Nilüfer'in modern sitelerinden Osmangazi'nin tarihi mahallelerine, Mudanya sahil yapılarından Yıldırım'ın köklü semtlerine kadar Bursa'nın her noktasına ulaşıyoruz. <em>Vinç asansör</em> gerektiren adresler için ekstra ücret sözleşmede önceden netleştirilir.</p>
<h2>Bursa <strong>İlçe Hizmet Durumu</strong></h2>
<table><thead><tr><th>İlçe</th><th>Teslim</th><th>Vinç Asansör</th></tr></thead><tbody>
<tr><td>Nilüfer</td><td>Aynı gün</td><td>Talep üzerine</td></tr>
<tr><td>Osmangazi</td><td>Aynı gün</td><td>Eski yapılarda</td></tr>
<tr><td>Yıldırım</td><td>Aynı gün</td><td>Sık kullanılır</td></tr>
<tr><td>Mudanya</td><td>Aynı gün</td><td>Sahil adreslerinde</td></tr>
</tbody></table>
<h2>Taşınma Paketinize <u>Dahil Olanlar</u></h2>
<ul>
<li>İstanbul adresinizde ücretsiz yerinde ekspertiz</li>
<li>Tüm eşyalara özel ambalaj; kırılmaz paketleme garantisi</li>
<li>Dolap, karyola ve mutfak ekipmanı söküm ile Bursa'da montaj</li>
<li>Nakliyat sigortası ve yazılı sözleşme güvencesi</li>
<li>Aynı gün teslim; geceyi yeni evinizde geçirin</li>
</ul>
<ol>
<li>Bizi arayın; evinizdeki eşya miktarını bildirin</li>
<li>Ekspertiz için uygun bir gün belirleriz</li>
<li>Yazılı teklifinizi alırsınız; fiyat değişmez</li>
<li>Taşıma günü Bursa'da teslim ve montaj tamamlanır</li>
</ol>`,
  },
  {
    slug: 'istanbul-mugla',
    city: "İstanbul'dan Muğla'ya",
    description: "İstanbul'dan Muğla'ya kalıcı ev ya da yazlık taşıması için kapıdan kapıya nakliyat hizmeti sunuyoruz. Bodrum, Marmaris, Fethiye ve Datça dahil Ege kıyısının tüm ilçelerine teslimat yapıyoruz.",
    metaTitle: "İstanbul'dan Muğla'ya Evden Eve Nakliyat | Bodrum Marmaris Fethiye",
    metaDescription: "İstanbul Muğla evden eve nakliyat. Bodrum, Marmaris, Fethiye, Datça dahil sigortalı kapıdan kapıya taşıma. Yazlık ve kalıcı ev taşıması. Ücretsiz keşif.",
    content: `<h2>Ege Kıyısına Taşınıyorsunuz: <em>Her İlçeye Ulaşıyoruz</em></h2>
<p>Bodrum'un yarımadasından Fethiye'nin koylarına kadar Muğla'nın tüm ilçelerine taşıma hizmeti götürüyoruz. Kalıcı ev taşıması ya da yazlık kurulumu olsun; <strong>eşyalarınız İstanbul'dan alınır</strong>, Muğla'daki yeni adresinize teslim edilir.</p>
<p>Dar yollu Bodrum sokaklarından Datça'nın uç noktasına kadar doğru araç seçimi yapıyoruz. <em>Site güvenliği, marinaya araç girişi</em> ve sezonluk kısıtlamalar gibi detayları önceden hallederiz; taşınma günü sizi şaşırtacak bir sorunla karşılaşmazsınız.</p>
<h2>Muğla <u>İlçe Hizmet Tablosu</u></h2>
<table><thead><tr><th>İlçe</th><th>Araç Tipi</th><th>Özel Not</th></tr></thead><tbody>
<tr><td>Bodrum</td><td>7,5 ton</td><td>Dar yol, önceden planlama</td></tr>
<tr><td>Marmaris</td><td>7,5 ton</td><td>Site koordinasyonu</td></tr>
<tr><td>Fethiye</td><td>10 ton</td><td>Standart taşıma</td></tr>
<tr><td>Datça</td><td>3,5 ton</td><td>Dar yol, uzun mesafe</td></tr>
<tr><td>Milas</td><td>10 ton</td><td>Standart taşıma</td></tr>
</tbody></table>
<h2>Muğla Taşımalarında <strong>Özel Hizmetlerimiz</strong></h2>
<ul>
<li>Deniz kıyısı konutlar için neme dayanıklı özel ambalaj</li>
<li>Site ve marina giriş izni koordinasyonu ekibimizden</li>
<li>Yazlık mobilya kurulumu ve eşya yerleştirme dahil</li>
<li>Datça gibi uzak ilçeler için özel küçük araç planlaması</li>
<li>Sigortalı taşıma; Ege yolculuğunda hasara karşı güvence</li>
</ul>
<ol>
<li>Bodrum, Marmaris veya Fethiye adresinizi bildirin</li>
<li>Ekspertiz için İstanbul'a uzmanımız gelir</li>
<li>Taşıma günü belirlenir; araç ve ekip hazır olur</li>
<li>Muğla adresinizde teslim ve yerleştirme tamamlanır</li>
</ol>`,
  },
  {
    slug: 'istanbul-adana',
    city: "İstanbul'dan Adana'ya",
    description: "İstanbul'dan Adana'ya güvenli evden eve nakliyat hizmeti sunuyoruz. Seyhan, Yüreğir ve Çukurova ilçelerine çift sürücülü, sigortalı araçlarla kapıdan kapıya taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Adana'ya Evden Eve Nakliyat | Kapıdan Kapıya Taşıma",
    metaDescription: "İstanbul Adana evden eve nakliyat. Seyhan, Yüreğir, Çukurova dahil sigortalı ve sözleşmeli kapıdan kapıya taşıma. Ücretsiz ekspertiz ile net fiyat.",
    content: `<h2>Adana'ya Taşınıyorsunuz: <strong>Eşyalarınız Güvende</strong></h2>
<p>İstanbul–Adana hattında yılda yüzlerce taşıma yapan ekibimiz bu güzergahın gerekliliklerini iyi biliyor. <em>Çift sürücü sistemiyle</em> çalışan araçlarımız eşyalarınızı güvenle Çukurova'ya taşır.</p>
<p>Seyhan'ın modern konutlarından Yüreğir'in genişleyen semtlerine kadar Adana'nın tüm ilçelerine hizmet veriyoruz. <strong>Teslim günü değişmez</strong>; aksama durumunda sizi önceden haberdar eder, alternatif çözüm sunarız.</p>
<h2>İstanbul–Adana <u>Hizmet Paketi</u></h2>
<table><thead><tr><th>Hizmet Kalemi</th><th>Dahil mi?</th></tr></thead><tbody>
<tr><td>Ücretsiz ekspertiz</td><td>Evet</td></tr>
<tr><td>Profesyonel ambalaj</td><td>Evet</td></tr>
<tr><td>Nakliyat sigortası</td><td>Evet</td></tr>
<tr><td>Söküm ve montaj</td><td>Evet</td></tr>
<tr><td>Çift sürücü</td><td>Evet</td></tr>
<tr><td>GPS takip</td><td>Evet</td></tr>
</tbody></table>
<h2>Adana'ya Taşınırken <em>Bizi Tercih Etme Nedenleri</em></h2>
<ul>
<li>Bu güzergahta yüzlerce tamamlanmış taşıma referansı</li>
<li>Yazılı sözleşme; teslim tarihi ve fiyat garantisi</li>
<li>Yüksek sıcak dönemde ısı yalıtımlı araç seçeneği</li>
<li>Seyhan, Yüreğir, Çukurova ve Sarıçam'a doğrudan teslimat</li>
<li>Teslim sonrası montaj ve eşya yerleştirme hizmeti</li>
</ul>
<ol>
<li>Ücretsiz ekspertiz için formu doldurun veya bizi arayın</li>
<li>Yazılı teklif alırsınız; karar vermek için acele etmenize gerek yok</li>
<li>Taşıma günü ekip İstanbul'da hazır olur</li>
<li>Adana'da teslim alır, yerine koyar, montaj yaparız</li>
</ol>`,
  },
  {
    slug: 'istanbul-denizli',
    city: "İstanbul'dan Denizli'ye",
    description: "İstanbul'dan Denizli'ye taşınmak isteyen aileler için kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Merkezefendi, Pamukkale ve Honaz dahil tüm ilçelere sigortalı taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Denizli'ye Evden Eve Nakliyat | Sigortalı Kapıdan Kapıya",
    metaDescription: "İstanbul Denizli evden eve nakliyat. Merkezefendi, Pamukkale, Honaz dahil sigortalı sözleşmeli taşıma. Ücretsiz ekspertiz ile sabit fiyat teklifi alın.",
    content: `<h2>Denizli'ye Taşınma Kararını <em>Güvenle Verebilirsiniz</em></h2>
<p>Denizli'nin tekstil ve sanayi sektörüne bağlı olarak İstanbul'dan taşınan aile sayısı her yıl artıyor. <strong>Ekibimiz bu güzergahı haftada birden fazla</strong> yapıyor; Merkezefendi'den Pamukkale çevresine kadar tüm adresleri kapsıyor.</p>
<p>Eşyalarınızı İstanbul'daki evinizde bizim ekibimiz ambalajlar, yükler ve Denizli'de teslim eder. <em>Montaj dahil</em> paket tercih ederseniz yeni evinize adım attığınızda her şey hazır olur.</p>
<h2>Denizli <strong>Hizmet Kapsamı</strong></h2>
<table><thead><tr><th>İlçe</th><th>Hizmet</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Merkezefendi</td><td>Tam ev taşıma</td><td>Aynı gün</td></tr>
<tr><td>Pamukkale</td><td>Tam ev taşıma</td><td>Aynı gün</td></tr>
<tr><td>Honaz</td><td>Tam ev + köy</td><td>Aynı gün</td></tr>
<tr><td>Acıpayam</td><td>Tam ev taşıma</td><td>Ertesi gün</td></tr>
</tbody></table>
<h2>Neden <u>Bizi Seçmelisiniz?</u></h2>
<ul>
<li>Değişmeyen sabit fiyat; teklif gününden taşıma gününe kadar rakam aynı</li>
<li>Yazılı sözleşme ile hukuki güvence</li>
<li>Nakliyat sigortası; her eşya tazminat kapsamında</li>
<li>Mermer ve seramik gibi ağır eşyalar için özel ekip</li>
<li>Teslim sonrası mobilya montaj hizmeti</li>
</ul>
<ol>
<li>İstanbul adresinizde ücretsiz ekspertiz randevusu alın</li>
<li>Denizli ilçesini ve taşınma tarihinizi bildirin</li>
<li>Yazılı teklifiniz 24 saat içinde gelir</li>
<li>Taşıma günü eşyalarınız kapıdan alınır, yeni evinize teslim edilir</li>
</ol>`,
  },
  {
    slug: 'istanbul-eskisehir',
    city: "İstanbul'dan Eskişehir'e",
    description: "İstanbul'dan Eskişehir'e taşınmak isteyen aileler ve öğrenciler için aynı gün teslim imkânıyla evden eve nakliyat yapıyoruz. Tepebaşı, Odunpazarı ve tüm ilçelere hizmet veriyoruz.",
    metaTitle: "İstanbul'dan Eskişehir'e Evden Eve Nakliyat | Aynı Gün Teslim",
    metaDescription: "İstanbul Eskişehir evden eve nakliyat. Tepebaşı, Odunpazarı dahil aynı gün sigortalı taşıma. Öğrenci ve aile taşımaları için uygun fiyatlı paketler.",
    content: `<h2>Eskişehir'e Taşınıyorsunuz: <strong>Aynı Gün Teslim</strong> Garanti</h2>
<p>TEM otoyolu üzerindeki bu 330 kilometrelik güzergah, İstanbul'dan Eskişehir'e aynı gün taşınmayı mümkün kılıyor. <em>Sabah yüklemeyle</em> başlayan ekibimiz öğleden sonra Tepebaşı veya Odunpazarı adresinizde olur.</p>
<p>Üniversite öğrencileri için kiralık daire taşıması mı, aile için tam ev kurulumu mu? Her ikisini de kapıdan kapıya yapıyoruz. <strong>Küçük hacimden büyük ölçekli</strong> taşımalara kadar Eskişehir'de tüm adresler hizmet kapsamımızdadır.</p>
<h2>Eskişehir <u>Taşıma Seçenekleri</u></h2>
<table><thead><tr><th>Taşıma Türü</th><th>Kapsam</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Tam ev taşıma</td><td>Tüm eşya, ambalaj, montaj</td><td>Aynı gün</td></tr>
<tr><td>Parça eşya</td><td>Seçili eşyalar</td><td>Aynı gün</td></tr>
<tr><td>Öğrenci taşıma</td><td>Küçük hacim</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Eskişehir'e <em>Taşınmadan Önce</em> Bilinmesi Gerekenler</h2>
<ul>
<li>Odunpazarı tarihi mahallesinde dar sokaklara küçük araçla giriyoruz</li>
<li>Tepebaşı modern sitelerinde standart büyük araç kullanılır</li>
<li>Eylül açılış döneminde fiyatlar yükselir; Ağustos'ta rezervasyon yapın</li>
<li>Öğrenci paketleri daha kompakt ve uygun maliyetlidir</li>
<li>Tüm taşımalarda sigorta ve sözleşme standarttır</li>
</ul>
<ol>
<li>Kaç odalı ev ve ne zaman taşınacağınızı bildirin</li>
<li>Ekspertiz veya video keşif ile teklif alın</li>
<li>Taşıma günü ekip İstanbul'da hazır olur</li>
<li>Eskişehir'de teslim, istenen odaya yerleştirme tamamlanır</li>
</ol>`,
  },
]

async function main() {
  console.log('Bölgeler (1-10) ekleniyor...')
  for (const area of areas) {
    await prisma.serviceArea.upsert({
      where: { slug: area.slug },
      update: area,
      create: { ...area, active: true },
    })
    console.log(`✓ ${area.city}`)
  }
  console.log('Bölgeler 1-10 tamamlandı!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
