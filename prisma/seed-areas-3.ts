import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const areas = [
  {
    slug: 'istanbul-mus',
    city: "İstanbul'dan Muş'a",
    description: "İstanbul'dan Muş'a kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Bulanık ve Malazgirt dahil tüm Muş ilçelerine çift sürücülü, sigortalı araçlarla taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Muş'a Evden Eve Nakliyat | Doğu Anadolu Kapıdan Kapıya",
    metaDescription: "İstanbul Muş evden eve nakliyat. Bulanık, Malazgirt dahil sigortalı çift sürücülü taşıma. Yazılı sözleşme ve teslim tarihi garantisi ile güvenli nakliyat.",
    content: `<h2>Muş'a Taşınıyorsunuz: <strong>Nemrut Ovasına</strong> Götürüyoruz</h2>
<p>İstanbul'dan Muş'a 1505 kilometrelik bu uzun güzergahta çift sürücü sistemiyle hareket ediyoruz. <em>Eşyalarınız</em> İstanbul adresinizden teslim alınır ve Muş'taki yeni evinize güvenle bırakılır.</p>
<p>Muş ovası geniş bir düzlük üzerine kuruludur; büyük araç girişi sorunsuzca gerçekleşir. <strong>Bulanık ilçesi</strong> ve dağ yakını adresler için uygun araç planlaması teklif aşamasında yapılır.</p>
<h2>Muş <u>Taşıma Hizmet Paketi</u></h2>
<table><thead><tr><th>Hizmet</th><th>Kapsam</th></tr></thead><tbody>
<tr><td>Çift sürücü</td><td>Tüm güzergah</td></tr>
<tr><td>Ambalaj</td><td>Tüm eşya</td></tr>
<tr><td>Sigorta</td><td>Tam hasar</td></tr>
<tr><td>GPS takip</td><td>Anlık konum</td></tr>
<tr><td>Söküm montaj</td><td>Dahil</td></tr>
</tbody></table>
<h2>Muş Taşımalarında <em>Bizi Tercih Etme Nedenleri</em></h2>
<ul>
<li>Doğu güzergahlarında yüzlerce başarıyla tamamlanmış taşıma</li>
<li>Yazılı sözleşme; teslim tarihi ve fiyat sabittir</li>
<li>Çift sürücü ile yorgunluk riski olmaksızın güvenli seyir</li>
<li>Bulanık ve Malazgirt ilçelerine doğrudan teslimat</li>
<li>Nakliyat sigortası; olası hasarda tam tazminat</li>
</ul>
<ol>
<li>Muş adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif onaylanır; hareket tarihi belirlenir</li>
<li>Ekip Muş'ta teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-ordu',
    city: "İstanbul'dan Ordu'ya",
    description: "İstanbul'dan Ordu'ya kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Fatsa, Ünye ve Altınordu dahil tüm Ordu ilçelerine sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Ordu'ya Evden Eve Nakliyat | Karadeniz Kapıdan Kapıya",
    metaDescription: "İstanbul Ordu evden eve nakliyat. Fatsa, Ünye, Altınordu dahil sigortalı sözleşmeli taşıma. Karadeniz güzergahında kapıdan kapıya hizmet. Ücretsiz keşif.",
    content: `<h2>Ordu'ya Taşınıyorsunuz: <em>Fındık Bahçelerinin</em> Şehrine Götürüyoruz</h2>
<p>İstanbul'dan Ordu'ya düzenli sefer yapan ekibimiz bu 1005 kilometrelik güzergahı iyi bilir. <strong>Eşyalarınız İstanbul'dan alınır</strong>, Ordu'daki adresinize güvenle teslim edilir.</p>
<p>Altınordu merkezi büyük araç erişimine açıktır. <em>Tepe mahallelerinde</em> eğimli sokaklar için küçük araç ve ekstra hamal planlaması yapıyoruz. Fatsa ve Ünye ilçelerine de düzenli sefer yapıyoruz.</p>
<h2>Ordu <strong>İlçe Hizmet Kapsamı</strong></h2>
<table><thead><tr><th>İlçe</th><th>Araç</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Altınordu</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Fatsa</td><td>7,5 ton</td><td>Aynı gün</td></tr>
<tr><td>Ünye</td><td>7,5 ton</td><td>Aynı gün</td></tr>
<tr><td>Tepe mahalle</td><td>Küçük araç</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Ordu Taşımalarında <u>Öne Çıkan Hizmetlerimiz</u></h2>
<ul>
<li>Karadeniz nemine uygun su geçirmez ambalaj malzemeleri</li>
<li>Tepe mahallesi adreslerine hamal desteği dahil</li>
<li>Nakliyat sigortası standarttır; her eşya güvenceli</li>
<li>Yazılı sözleşme ile teslim tarihi ve fiyat garantisi</li>
<li>Teslim sonrası montaj ve eşya yerleştirme hizmeti</li>
</ul>
<ol>
<li>Ordu adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif onaylanır; tarih belirlenir</li>
<li>Ekip Ordu'da teslim ve yerleştirme yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-sivas',
    city: "İstanbul'dan Sivas'a",
    description: "İstanbul'dan Sivas'a kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Şarkışla, Zara ve Gemerek dahil tüm Sivas ilçelerine sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Sivas'a Evden Eve Nakliyat | Orta Anadolu Kapıdan Kapıya",
    metaDescription: "İstanbul Sivas evden eve nakliyat. Şarkışla, Zara, Gemerek dahil sigortalı sözleşmeli taşıma. Ücretsiz ekspertiz ile sabit fiyat teklifi alın.",
    content: `<h2>Sivas'a Taşınıyorsunuz: <em>Anadolu'nun Merkezine</em> Götürüyoruz</h2>
<p>İstanbul'dan Sivas'a 900 kilometre mesafede düzenli sefer yapan ekibimiz eşyalarınızı güvenle teslim eder. <strong>Sivas merkezi</strong> modern yapılaşmasıyla büyük araç erişimine uygundur.</p>
<p>Şarkışla ve Zara ilçelerine de doğrudan hizmet veriyoruz. <em>Uzak ilçe adreslerinde</em> ek mesafe ücreti teklif aşamasında açıkça belirtilir; taşıma günü sürpriz yaşamazsınız.</p>
<h2>Sivas <u>Taşıma Hizmet Paketi</u></h2>
<table><thead><tr><th>Hizmet</th><th>Dahil mi?</th></tr></thead><tbody>
<tr><td>Ücretsiz ekspertiz</td><td>Evet</td></tr>
<tr><td>Ambalaj</td><td>Evet</td></tr>
<tr><td>Sigorta</td><td>Evet</td></tr>
<tr><td>Söküm montaj</td><td>Evet</td></tr>
<tr><td>Sabit fiyat</td><td>Evet</td></tr>
</tbody></table>
<h2>Sivas Taşımalarında <strong>Öne Çıkan Hizmetlerimiz</strong></h2>
<ul>
<li>Ankara üzerinden hızlı ve güvenli güzergah</li>
<li>Yazılı sözleşme; teslim tarihi ve fiyat değişmez</li>
<li>Şarkışla ve Zara ilçelerine doğrudan teslimat</li>
<li>Nakliyat sigortası; her eşya tazminat kapsamında</li>
<li>Teslim sonrası mobilya montaj ve yerleştirme dahil</li>
</ul>
<ol>
<li>Sivas adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif onaylanır; hareket tarihi belirlenir</li>
<li>Ekip Sivas'ta teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-trabzon',
    city: "İstanbul'dan Trabzon'a",
    description: "İstanbul'dan Trabzon'a kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Ortahisar, Akçaabat ve Arsin dahil tüm Trabzon ilçelerine sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Trabzon'a Evden Eve Nakliyat | Karadeniz Liman Şehrine Taşıma",
    metaDescription: "İstanbul Trabzon evden eve nakliyat. Ortahisar, Akçaabat, Arsin dahil sigortalı sözleşmeli taşıma. Karadeniz'in liman şehrine kapıdan kapıya hizmet.",
    content: `<h2>Trabzon'a Taşınıyorsunuz: <strong>Karadeniz'e</strong> Götürüyoruz</h2>
<p>İstanbul'dan Trabzon'a düzenli sefer yapan ekibimiz bu 1105 kilometrelik Karadeniz güzergahını çok iyi tanır. <em>Eşyalarınız</em> İstanbul'daki evinizden alınır, Trabzon adresinize güvenle teslim edilir.</p>
<p>Ortahisar merkezi ve Akçaabat sahil bandına büyük araçla giriş yapıyoruz. <strong>Yamaç mahallelerinde</strong> ise küçük araç ve hamal kombinasyonuyla her adrese ulaşıyoruz.</p>
<h2>Trabzon <u>İlçe Hizmet Durumu</u></h2>
<table><thead><tr><th>İlçe</th><th>Araç</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Ortahisar</td><td>7,5–10 ton</td><td>Aynı gün</td></tr>
<tr><td>Akçaabat</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Arsin</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Yamaç mahalle</td><td>Küçük araç</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Trabzon Taşımalarında <em>Sunduğumuz Hizmetler</em></h2>
<ul>
<li>Karadeniz nemine karşı su geçirmez ambalaj uygulaması</li>
<li>Yamaç adreslerine küçük araç ve hamal desteği dahil</li>
<li>Nakliyat sigortası standarttır; her eşya güvenceli</li>
<li>Yazılı sözleşme ile fiyat ve teslim tarihi sabittir</li>
<li>Akçaabat ve Arsin ilçelerine doğrudan teslimat</li>
</ul>
<ol>
<li>Trabzon adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif onaylanır; tarih kesinleşir</li>
<li>Ekip Trabzon'da teslim ve yerleştirme yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-van',
    city: "İstanbul'dan Van'a",
    description: "İstanbul'dan Van'a kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. İpekyolu, Edremit ve Tuşba dahil tüm Van ilçelerine çift sürücülü, sigortalı araçlarla taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Van'a Evden Eve Nakliyat | Van Gölü Kıyısına Taşıma",
    metaDescription: "İstanbul Van evden eve nakliyat. İpekyolu, Edremit, Tuşba dahil sigortalı çift sürücülü taşıma. Van Gölü kıyısına kapıdan kapıya hizmet. Ücretsiz keşif.",
    content: `<h2>Van Gölü Kıyısına: <em>Türkiye'nin Doğusuna</em> Götürüyoruz</h2>
<p>1695 kilometre mesafe Van'ı uzak bir nokta gibi gösterir. Ama ekibimiz için bu güzergah tanıdıktır. <strong>Çift sürücü ve konaklama planlamasıyla</strong> eşyalarınız güvenle Van'a ulaşır.</p>
<p>Van'ın İpekyolu ve Tuşba ilçeleri modern konut bloklarıyla doludur; büyük araç girişi kolaydır. <em>Edremit sahil bölgesi</em> ve dağlık adresler için araç planlaması teklif aşamasında yapılır.</p>
<h2>Van <strong>Taşıma Hizmet Paketi</strong></h2>
<table><thead><tr><th>Hizmet</th><th>Kapsam</th></tr></thead><tbody>
<tr><td>Çift sürücü</td><td>Tüm güzergah</td></tr>
<tr><td>Konaklama planı</td><td>Güzergah üzeri</td></tr>
<tr><td>Ambalaj</td><td>Tüm eşya</td></tr>
<tr><td>Sigorta</td><td>Tam hasar</td></tr>
<tr><td>GPS takip</td><td>Anlık konum</td></tr>
</tbody></table>
<h2>Van Taşımalarında <u>Öne Çıkan Hizmetlerimiz</u></h2>
<ul>
<li>Doğu Anadolu güzergahlarında kanıtlanmış hizmet geçmişi</li>
<li>Kış döneminde ısı yalıtımlı araç seçeneği sunuyoruz</li>
<li>Yazılı sözleşme ile teslim tarihi ve fiyat garantisi</li>
<li>İpekyolu, Edremit ve Tuşba ilçelerine doğrudan teslimat</li>
<li>GPS takip; eşyalarınızı her an izleyebilirsiniz</li>
</ul>
<ol>
<li>Van adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Güzergah ve konaklama planı hazırlanır</li>
<li>Çift sürücülü araç Van'da teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-amasya',
    city: "İstanbul'dan Amasya'ya",
    description: "İstanbul'dan Amasya'ya kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Merzifon, Suluova ve Taşova dahil tüm Amasya ilçelerine sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Amasya'ya Evden Eve Nakliyat | Tarihi Kente Taşıma",
    metaDescription: "İstanbul Amasya evden eve nakliyat. Merzifon, Suluova, Taşova dahil sigortalı sözleşmeli taşıma. Tarihi koya kapıdan kapıya hizmet. Ücretsiz keşif.",
    content: `<h2>Yeşilırmak'ın Kıyısındaki Şehre: <em>Amasya'ya Taşıyoruz</em></h2>
<p>İstanbul'dan Amasya'ya 800 kilometrelik bu güzergahta deneyimli ekibimiz eşyalarınızı güvenle teslim eder. <strong>Merzifon ve Suluova</strong> ilçelerine büyük araçla giriş yapıyoruz; merkezdeki tarihi bölgeye ise küçük araç planlamasıyla ulaşıyoruz.</p>
<p>Yeşilırmak boyunca uzanan tarihi Osmanlı mahalleleri dar sokaklara sahiptir. <em>Bu adresleri bilen ekibimiz</em> doğru araç ve ekip kombinasyonunu önceden hazırlar.</p>
<h2>Amasya <u>İlçe Hizmet Durumu</u></h2>
<table><thead><tr><th>İlçe / Bölge</th><th>Araç</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Merkez (yeni)</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Tarihi mahalle</td><td>Küçük araç</td><td>Aynı gün</td></tr>
<tr><td>Merzifon</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Suluova</td><td>10 ton</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Amasya Taşımalarında <strong>Neden Biz?</strong></h2>
<ul>
<li>Tarihi bölge adreslerine özel küçük araç ve hamal planlaması</li>
<li>Nakliyat sigortası; her eşya tazminat kapsamında</li>
<li>Yazılı sözleşme ile fiyat ve teslim tarihi sabittir</li>
<li>Merzifon ve Suluova ilçelerine doğrudan teslimat</li>
<li>Teslim sonrası montaj ve eşya yerleştirme hizmeti</li>
</ul>
<ol>
<li>Amasya adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif onaylanır; tarih kesinleşir</li>
<li>Ekip Amasya'da teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-batman',
    city: "İstanbul'dan Batman'a",
    description: "İstanbul'dan Batman'a kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Batman merkezi ve Sason dahil tüm ilçelere çift sürücülü, sigortalı araçlarla taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Batman'a Evden Eve Nakliyat | Güneydoğu Kapıdan Kapıya",
    metaDescription: "İstanbul Batman evden eve nakliyat. Merkez, Sason dahil sigortalı çift sürücülü taşıma. 1450 km güzergahta yazılı sözleşme ve teslim tarihi garantisi.",
    content: `<h2>Batman'a Taşınıyorsunuz: <strong>Güneydoğu'ya Götürüyoruz</strong></h2>
<p>İstanbul'dan Batman'a 1450 kilometrelik bu güzergahta çift sürücü sistemiyle çalışıyoruz. <em>Eşyalarınız</em> İstanbul adresinizden alınır, Batman'daki yeni evinize teslim edilir. Teslim tarihi yazılı sözleşmede garanti altındadır.</p>
<p>Batman merkezi geniş yollarıyla büyük araç erişimine tamamen açıktır. <strong>Sason ilçesinin</strong> dağlık yapısı küçük araç gerektirebilir; bu durum teklif aşamasında size açıkça bildirilir.</p>
<h2>Batman <u>Taşıma Hizmet Paketi</u></h2>
<table><thead><tr><th>Hizmet</th><th>Kapsam</th></tr></thead><tbody>
<tr><td>Çift sürücü</td><td>Tüm güzergah</td></tr>
<tr><td>Ambalaj</td><td>Tüm eşya</td></tr>
<tr><td>Sigorta</td><td>Tam hasar</td></tr>
<tr><td>GPS takip</td><td>Anlık konum</td></tr>
<tr><td>Söküm montaj</td><td>Dahil</td></tr>
</tbody></table>
<h2>Batman Taşımalarında <em>Bizi Tercih Etme Nedenleri</em></h2>
<ul>
<li>Güneydoğu güzergahlarında deneyimli ve lisanslı sürücü kadrosu</li>
<li>Yazılı sözleşme; fiyat ve teslim tarihi değişmez</li>
<li>Yaz sıcaklarında ısı yalıtımlı araç seçeneği</li>
<li>Sason ilçesine küçük araç ile doğrudan teslimat</li>
<li>Nakliyat sigortası standarttır</li>
</ul>
<ol>
<li>Batman adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif onaylanır; hareket tarihi belirlenir</li>
<li>Ekip Batman'da teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-gaziantep',
    city: "İstanbul'dan Gaziantep'e",
    description: "İstanbul'dan Gaziantep'e kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Şahinbey, Şehitkamil ve Nizip dahil tüm ilçelere sigortalı ve sözleşmeli taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Gaziantep'e Evden Eve Nakliyat | Kapıdan Kapıya Taşıma",
    metaDescription: "İstanbul Gaziantep evden eve nakliyat. Şahinbey, Şehitkamil, Nizip dahil sigortalı sözleşmeli taşıma. Ücretsiz ekspertiz ile sabit fiyat teklifi alın.",
    content: `<h2>Gaziantep'e Taşınıyorsunuz: <em>Baklava Şehrine</em> Götürüyoruz</h2>
<p>İstanbul'dan Gaziantep'e düzenli sefer yapan ekibimiz 1135 kilometrelik bu güzergahı iyi bilir. <strong>Şahinbey ve Şehitkamil</strong> ilçelerinin geniş yollarına büyük araçla giriş yapıyoruz; eşyalarınız adresinize güvenle teslim edilir.</p>
<p>Tarihi çarşı mahallesi araç girişine kısıtlı bir bölgedir. <em>Bu adreslere küçük araç ve hamal kombinasyonuyla</em> ulaşıyoruz; teklif aşamasında bu durumu size açıkça bildiriyoruz.</p>
<h2>Gaziantep <strong>İlçe Hizmet Durumu</strong></h2>
<table><thead><tr><th>İlçe / Bölge</th><th>Araç</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Şahinbey</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Şehitkamil</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Tarihi çarşı</td><td>Küçük araç</td><td>Aynı gün</td></tr>
<tr><td>Nizip</td><td>7,5 ton</td><td>Aynı gün</td></tr>
</tbody></table>
<h2>Gaziantep Taşımalarında <u>Sunduğumuz Güvenceler</u></h2>
<ul>
<li>Yazılı sözleşme ile fiyat ve teslim tarihi sabittir</li>
<li>Nakliyat sigortası; her eşya güvence altında</li>
<li>Yaz sıcaklarında ısı yalıtımlı araç seçeneği</li>
<li>Şahinbey ve Şehitkamil ilçelerine haftalık düzenli sefer</li>
<li>Teslim sonrası montaj ve eşya yerleştirme dahil</li>
</ul>
<ol>
<li>Gaziantep adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Yazılı teklif onaylanır; tarih belirlenir</li>
<li>Ekip Gaziantep'te teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-hakkari',
    city: "İstanbul'dan Hakkari'ye",
    description: "İstanbul'dan Hakkari'ye kapıdan kapıya evden eve nakliyat hizmeti sunuyoruz. Yüksekova ve Şemdinli dahil Türkiye'nin en güneydoğu ilçelerine çift sürücülü, sigortalı araçlarla taşıma yapıyoruz.",
    metaTitle: "İstanbul'dan Hakkari'ye Evden Eve Nakliyat | Türkiye'nin En Uç Noktasına",
    metaDescription: "İstanbul Hakkari evden eve nakliyat. Yüksekova, Şemdinli dahil sigortalı çift sürücülü taşıma. Türkiye'nin en uzun güzergahında yazılı sözleşme garantisi.",
    content: `<h2>Hakkari'ye Taşınıyorsunuz: <strong>Türkiye'nin En Uç Noktasına</strong> Götürüyoruz</h2>
<p>Hakkari, ülkenin en uzak illerinden biridir. 2000 kilometreyi aşan bu güzergahta <em>çift sürücü sistemi</em> ve konaklama planlamasıyla çalışıyoruz. Eşyalarınız güvenle Hakkari adresinize teslim edilir.</p>
<p>Hakkari merkezi ve Yüksekova ilçesine doğrudan hizmet veriyoruz. <strong>Şemdinli gibi sınır ilçelerine</strong> ulaşım için özel araç ve güzergah planlaması yapılır; bu bilgi teklif aşamasında açıkça belirtilir.</p>
<h2>Hakkari <u>Taşıma Hizmet Paketi</u></h2>
<table><thead><tr><th>Hizmet</th><th>Kapsam</th></tr></thead><tbody>
<tr><td>Çift sürücü</td><td>Tüm güzergah</td></tr>
<tr><td>Konaklama planı</td><td>Güzergah üzeri</td></tr>
<tr><td>Ambalaj</td><td>Tüm eşya</td></tr>
<tr><td>Sigorta</td><td>Tam hasar</td></tr>
<tr><td>GPS takip</td><td>Anlık konum</td></tr>
</tbody></table>
<h2>Hakkari Taşımalarında <em>Bizi Tercih Etme Nedenleri</em></h2>
<ul>
<li>Türkiye'nin en zorlu güzergahlarında deneyimli kadro</li>
<li>Çift sürücü ve konaklama planlaması dahil eksiksiz hizmet</li>
<li>Yazılı sözleşme ile teslim tarihi ve fiyat garantisi</li>
<li>Yüksekova ve Şemdinli ilçelerine doğrudan teslimat</li>
<li>GPS takip ile eşyalarınızı her an izleyebilirsiniz</li>
</ul>
<ol>
<li>Hakkari adresinizi ve ilçenizi bildirin</li>
<li>İstanbul'da ücretsiz ekspertiz yapılır</li>
<li>Güzergah ve konaklama planı hazırlanır</li>
<li>Çift sürücülü araç Hakkari'de teslim ve montaj yapar</li>
</ol>`,
  },
  {
    slug: 'istanbul-canakkale',
    city: "İstanbul'dan Çanakkale'ye",
    description: "İstanbul'dan Çanakkale'ye en hızlı evden eve nakliyat hizmetini sunuyoruz. Osmangazi güzergahıyla aynı gün teslim yapıyoruz. Gelibolu, Biga, Lapseki ve Gökçeada dahil tüm ilçelere hizmet.",
    metaTitle: "İstanbul'dan Çanakkale'ye Evden Eve Nakliyat | Aynı Gün Teslim",
    metaDescription: "İstanbul Çanakkale evden eve nakliyat. Gelibolu, Biga, Lapseki, Gökçeada dahil aynı gün sigortalı sözleşmeli taşıma. Ücretsiz ekspertiz ile sabit fiyat.",
    content: `<h2>Çanakkale'ye Taşınıyorsunuz: <em>Boğaz'ın Karşısına</em> Götürüyoruz</h2>
<p>İstanbul'dan Çanakkale'ye 325 kilometrelik bu kısa güzergahta aynı gün teslim yapıyoruz. <strong>Sabah yüklenen</strong> eşyalarınız öğleden önce Çanakkale adresinizde olur.</p>
<p>Çanakkale merkezi, Gelibolu ve Biga ilçelerine düzenli sefer yapıyoruz. <em>Gökçeada</em> için araç feribotu koordinasyonu da dahil olmak üzere ada teslimatını baştan sona biz yönetiyoruz.</p>
<h2>Çanakkale <strong>İlçe Hizmet Durumu</strong></h2>
<table><thead><tr><th>İlçe</th><th>Araç</th><th>Teslim</th></tr></thead><tbody>
<tr><td>Çanakkale merkez</td><td>10 ton</td><td>Aynı gün</td></tr>
<tr><td>Gelibolu</td><td>7,5 ton</td><td>Aynı gün</td></tr>
<tr><td>Biga</td><td>7,5 ton</td><td>Aynı gün</td></tr>
<tr><td>Lapseki</td><td>7,5 ton</td><td>Aynı gün</td></tr>
<tr><td>Gökçeada</td><td>Feribot</td><td>Koordinasyonlu</td></tr>
</tbody></table>
<h2>Çanakkale Taşımalarında <u>Sunduğumuz Hizmetler</u></h2>
<ul>
<li>Aynı gün teslim garantisi; sabah yükle öğlen teslim</li>
<li>Gökçeada feribot koordinasyonu dahil ada teslimatı</li>
<li>Nakliyat sigortası ve yazılı sözleşme standarttır</li>
<li>Gelibolu ve Biga ilçelerine doğrudan sefer</li>
<li>Tüm eşyalara ambalaj; kırılmaz paketleme garantisi</li>
</ul>
<ol>
<li>Çanakkale adresinizi ve ilçenizi bildirin</li>
<li>Gökçeada için feribot tarihi önceden belirlenir</li>
<li>Ekspertiz veya video keşif ile teklif alırsınız</li>
<li>Taşıma günü Çanakkale'de teslim ve montaj tamamlanır</li>
</ol>`,
  },
]

async function main() {
  console.log('Bölgeler (21-30) ekleniyor...')
  for (const area of areas) {
    await prisma.serviceArea.upsert({
      where: { slug: area.slug },
      update: area,
      create: { ...area, active: true },
    })
    console.log(`✓ ${area.city}`)
  }
  console.log('Bölgeler 21-30 tamamlandı!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
