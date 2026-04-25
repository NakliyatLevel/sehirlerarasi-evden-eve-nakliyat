import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Çözümler ekleniyor...')

  const solutions = [
    {
      slug: 'ucretsiz-ekspertiz',
      title: 'Ücretsiz Ekspertiz',
      description: 'Taşınmadan önce uzman ekibimiz eşyalarınızı yerinde inceler. Eşya hacmi, asansör boyutu ve merdiven açısı yerinde ölçülür; size şeffaf ve sabit bir teklif sunulur.',
      metaTitle: 'Ücretsiz Ekspertiz | Yerinde Nakliyat Keşfi ve Fiyat Tespiti',
      metaDescription: 'Ücretsiz ekspertiz hizmetiyle taşınma maliyetinizi önceden netleştirin. Uzman yerinde ölçüm yapar, yazılı teklif sunar. Sürpriz ek ücret yoktur.',
      icon: 'ClipboardList',
      order: 1,
      content: `<h2>Fiyat Söylenmeden Önce <em>Eviniz Görülmeli</em></h2>
<p>Taşınma bütçesi çoğunlukla telefon başında netleşir. Oysa asansör ölçüsü, merdiven açısı ve kırılgan mobilyaların hacmi hiçbir sözden tam okunamaz. <em>Ekspertiz ziyareti</em> bu belirsizliği baştan kapatır.</p>
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
    },
    {
      slug: 'sozlesmeli-nakliyat',
      title: 'Sözleşmeli Nakliyat',
      description: 'Taşıma günü yaşanan fiyat baskısı, kayıp eşya iddiaları ve sorumluluk tartışmalarının tek kalkanı imzalı sözleşmedir. Yazılı taahhüt olmadan yapılan nakliyat her iki taraf için belirsizliktir.',
      metaTitle: 'Sözleşmeli Nakliyat | Yasal Güvenceli Evden Eve Taşıma',
      metaDescription: 'Sözleşmeli nakliyatta fiyat garantisi, sorumluluk kapsamı ve tazminat şartları yazılı olarak belirlenir. Hukuki güvence ile taşının.',
      icon: 'FileText',
      order: 2,
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
    },
    {
      slug: 'sigortali-nakliyat',
      title: 'Sigortalı Nakliyat',
      description: 'Taşıma sırasında kırılan, çizilen ya da kaybolan bir eşya için tazminat alabilmek ancak geçerli bir poliçeyle mümkündür. Poliçesiz nakliyat tüm riski size bırakır.',
      metaTitle: 'Sigortalı Nakliyat | Taşıma Sigortası ve Tazminat Güvencesi',
      metaDescription: 'Sigortalı nakliyatta kırılma, kayıp ve hasar tazminatı güvencesi. Poliçe kapsamı, hasar bildirimi ve tazminat süreci hakkında bilgi alın.',
      icon: 'Shield',
      order: 3,
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
    },
    {
      slug: 'asansorlu-nakliyat',
      title: 'Asansörlü Nakliyat',
      description: 'Vinç asansör sistemi, merdivenden çıkarılması imkânsız olan büyük mobilyaları dışarıdan kaldırarak taşır. Bina içi asansörü yetersiz kalan her taşıma için standart çözümdür.',
      metaTitle: 'Asansörlü Nakliyat | Vinç Asansör ile Büyük Eşya Taşıma',
      metaDescription: 'Asansörlü nakliyatta vinç asansör sistemi büyük mobilyaları hızlı ve hasarsız taşır. Site koordinasyonu ve sigortalı operasyon dahildir.',
      icon: 'ArrowUpDown',
      order: 4,
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
    },
    {
      slug: 'ambalaj-paketleme',
      title: 'Ambalaj & Paketleme',
      description: 'Taşıma hasarlarının büyük bölümü yolda değil, yükleme sırasında başlar. Doğru malzeme, doğru teknik ve doğru sıra uygulandığında eşyalarınız bitmemiş gibi çıkar.',
      metaTitle: 'Ambalaj ve Paketleme | Profesyonel Nakliyat Ambalaj Hizmeti',
      metaDescription: 'Nakliyat ambalajında çift kat streç film, balonlu naylon ve tahta kasa ile kırılmaz paketleme hizmeti. Tüm eşya türleri için özel çözüm.',
      icon: 'Package',
      order: 5,
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
<p>Tüm kutular açılmadan ambalaj malzemelerini dışarı çıkarmayın. <em>Kırık parçalar</em> gazete katları arasında gizli kalabilir; çöpe atılan ambalaj olası kayıp iddiasını ispatsız bırakır.</p>`,
    },
  ]

  for (const solution of solutions) {
    await prisma.solution.upsert({
      where: { slug: solution.slug },
      update: solution,
      create: { ...solution, active: true },
    })
    console.log(`✓ ${solution.title}`)
  }

  console.log('\nSeeding completed!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
