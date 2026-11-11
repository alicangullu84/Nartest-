// ============================================================================
// Nartes+ — Alt Başlık (Kazanım) Sonu Akıllı Tahta Soru Bankası
// (problemcoz.com / sorucoz.com Kalemli Akıllı Tahta Ekranı Entegrasyonu)
// ============================================================================
// Not: Herhangi bir ünitenin alt başlığına (k1, k2, ... k6) soru dizisi
// eklendiğinde sistem o alt başlığın hemen sonuna otomatik olarak
// "✏️ Konu Sonu Akıllı Tahta Testi" durağını yerleştirir.
// Her soru hem zengin metin/şema (stem + modelSvg + options) hem de doğrudan
// soru görseli (image: "assets/sorular/...") formatını destekler.
// ============================================================================

window.NARTES_SMARTBOARD_BANK = {
  "m8-u1-carpanlar-katlar": {
    // 1. ALT BAŞLIK SONU DENEME SORULARI: Çarpanlar ve Katlar (k1)
    k1: {
      title: "Konu Sonu Akıllı Tahta: Çarpanlar ve Katlar",
      subtitle: "1. alt başlığı tamamlamadan önce kaleminle sorunun üzerinde işlem yaparak bu 2 soruyu çöz!",
      questions: [
        {
          no: 1,
          badge: "1. Bölüm • Soru 1",
          stem: "Bir doğal sayının tüm pozitif tam sayı çarpanları küçükten büyüğe doğru sıralandığında, baştan ve sondan eşit uzaklıktaki çarpanların çarpımı bu sayıyı verir.<br><br>Aşağıda <strong>C</strong> doğal sayısının tüm pozitif tam sayı çarpanları küçükten büyüğe doğru eksiksiz sıralanmıştır:",
          modelSvg: `
            <svg viewBox="0 0 460 128" width="100%" style="max-width:440px;display:block;margin:8px 0 6px;" aria-label="Gökkuşağı çarpan dizilimi">
              <defs>
                <linearGradient id="sbArc1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#ef7d00"/>
                  <stop offset="100%" stop-color="#ec5f69"/>
                </linearGradient>
                <linearGradient id="sbArc2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#2a9fd0"/>
                  <stop offset="100%" stop-color="#7ea61f"/>
                </linearGradient>
              </defs>
              <!-- Eşleşme Yayları -->
              <path d="M 35 66 C 35 6, 425 6, 425 66" fill="none" stroke="url(#sbArc1)" stroke-width="2.2" stroke-dasharray="5 4" opacity="0.85"/>
              <path d="M 91 66 C 91 20, 369 20, 369 66" fill="none" stroke="url(#sbArc2)" stroke-width="2.2" stroke-dasharray="5 4" opacity="0.85"/>
              <path d="M 147 66 C 147 34, 313 34, 313 66" fill="none" stroke="#a964a3" stroke-width="2.2" stroke-dasharray="4 3" opacity="0.85"/>
              <path d="M 203 66 C 203 46, 257 46, 257 66" fill="none" stroke="#16a34a" stroke-width="2.6"/>
              <!-- Çarpan Kutuları -->
              <g font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="16" text-anchor="middle">
                <rect x="13" y="68" width="44" height="40" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                <text x="35" y="94" fill="#0f172a">1</text>

                <rect x="69" y="68" width="44" height="40" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                <text x="91" y="94" fill="#0f172a">2</text>

                <rect x="125" y="68" width="44" height="40" rx="10" fill="#fff7ed" stroke="#ef7d00" stroke-width="2.4"/>
                <text x="147" y="94" fill="#c2410c">A</text>

                <rect x="181" y="68" width="44" height="40" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.2"/>
                <text x="203" y="94" fill="#15803d">6</text>

                <rect x="235" y="68" width="44" height="40" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.2"/>
                <text x="257" y="94" fill="#15803d">9</text>

                <rect x="291" y="68" width="44" height="40" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2.4"/>
                <text x="313" y="94" fill="#1d4ed8">B</text>

                <rect x="347" y="68" width="44" height="40" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                <text x="369" y="94" fill="#0f172a">27</text>

                <rect x="403" y="68" width="44" height="40" rx="10" fill="#fdf2f8" stroke="#db2777" stroke-width="2.4"/>
                <text x="425" y="94" fill="#be185d">C</text>
              </g>
            </svg>
          `,
          questionPrompt: "Buna göre <strong>A + B + C</strong> işleminin sonucu kaçtır?",
          options: [
            { letter: "A", text: "69" },
            { letter: "B", text: "72" },
            { letter: "C", text: "75" },
            { letter: "D", text: "81" }
          ],
          correctLetter: "C",
          hint: "Ortadaki bilinen çarpan çifti 6 ve 9'dur. Önce 6 × 9 çarpımıyla C sayısını bulup diğer eşleşmeleri (A × B ve 1 × C) kurabilirsin.",
          solution: "Ortadaki eşleşen çarpan çifti <strong>6 × 9 = 54</strong> olduğundan aradığımız sayı <strong>C = 54</strong>'tür.<br>• Sıralamada 2 ile 6 arasındaki 54 çarpanı <strong>A = 3</strong>'tür.<br>• <strong>A × B = 54</strong> eşitliğinden <strong>3 × B = 54 ⇒ B = 18</strong> bulunur.<br>• Buradan <strong>A + B + C = 3 + 18 + 54 = 75</strong> elde edilir. Doğru cevap <strong>C</strong> şıkkıdır."
        },
        {
          no: 2,
          badge: "1. Bölüm • Soru 2",
          stem: "Kenar uzunlukları santimetre cinsinden <strong>1'den büyük birer tam sayı</strong> olan yandaki <strong>KLMN</strong> dikdörtgeni biçimindeki kartonun ön yüzünün alanı <strong>48 cm²</strong>'dir.",
          modelSvg: `
            <svg viewBox="0 0 420 142" width="100%" style="max-width:400px;display:block;margin:8px 0 6px;" aria-label="KLMN dikdörtgeni alanı 48 santimetrekare">
              <rect x="68" y="24" width="236" height="92" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2.6"/>
              <!-- Dik açı sembolleri -->
              <path d="M 68 38 L 82 38 L 82 24" fill="none" stroke="#2563eb" stroke-width="1.8"/>
              <path d="M 290 24 L 290 38 L 304 38" fill="none" stroke="#2563eb" stroke-width="1.8"/>
              <path d="M 68 102 L 82 102 L 82 116" fill="none" stroke="#2563eb" stroke-width="1.8"/>
              <path d="M 290 116 L 290 102 L 304 102" fill="none" stroke="#2563eb" stroke-width="1.8"/>
              <!-- Köşe harfleri -->
              <g font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="15" fill="#0f172a">
                <text x="52" y="24">K</text>
                <text x="311" y="24">L</text>
                <text x="311" y="126">M</text>
                <text x="52" y="126">N</text>
              </g>
              <!-- Kenar ve Alan bilgileri -->
              <text x="186" y="16" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="13.5" fill="#1d4ed8">|KL| = x cm (x &gt; 1)</text>
              <text x="360" y="74" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="13.5" fill="#15803d">|LM| = y cm</text>
              <text x="360" y="92" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="700" font-size="12" fill="#15803d">(y &gt; 1)</text>
              <rect x="116" y="53" width="140" height="34" rx="9" fill="#ffffff" stroke="#93c5fd" stroke-width="1.6"/>
              <text x="186" y="75" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-weight="900" font-size="15" fill="#0f172a">Alan = 48 cm²</text>
            </svg>
          `,
          questionPrompt: "Buna göre <strong>KLMN</strong> kartonunun çevre uzunluğu aşağıdakilerden hangisi <strong>olamaz</strong>?",
          options: [
            { letter: "A", text: "28 cm" },
            { letter: "B", text: "32 cm" },
            { letter: "C", text: "52 cm" },
            { letter: "D", text: "98 cm" }
          ],
          correctLetter: "D",
          hint: "48 sayısının çarpan çiftlerini yazarken '1'den büyük tam sayı' şartına çok dikkat et! Kenarlardan biri 1 cm seçilebilir mi?",
          solution: "Alanı <strong>48 cm²</strong> olan dikdörtgenin <strong>1'den büyük</strong> tam sayı kenar çiftleri ve çevreleri:<br>• <strong>6 cm ve 8 cm</strong> ⇒ Çevre = 2 · (6 + 8) = <strong>28 cm</strong> (A olabilir)<br>• <strong>4 cm ve 12 cm</strong> ⇒ Çevre = 2 · (4 + 12) = <strong>32 cm</strong> (B olabilir)<br>• <strong>3 cm ve 16 cm</strong> ⇒ Çevre = 2 · (3 + 16) = <strong>38 cm</strong><br>• <strong>2 cm ve 24 cm</strong> ⇒ Çevre = 2 · (2 + 24) = <strong>52 cm</strong> (C olabilir)<br><strong>98 cm</strong> çevre yalnızca <strong>1 cm × 48 cm</strong> kenarlarıyla elde edilir; ancak kenarlar 1'den büyük olduğu için <strong>98 cm olamaz</strong>. Doğru cevap <strong>D</strong> şıkkıdır."
        }
      ]
    }
  }
};
