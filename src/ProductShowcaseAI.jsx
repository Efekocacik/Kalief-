import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Bot, ExternalLink, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Zap, Star } from 'lucide-react';

export default function ProductShowcaseAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const messagesEndRef = useRef(null);

  // --- RESİM DOSYALARI (Public klasöründe olmalı) ---
  const productImages = [
    "/goz-masaji-hero.jpg", 
    "/goz-masaji-ic.jpg"
  ];

  const storeConfig = {
    storeName: "Kalief",
    website: "www.kalidekor.com",
    appLink: "https://www.kalidekor.com",
    productName: "SmartRelax Göz Terapi Cihazı",
    model: "MZ-EM11",
    // NOT: Fiyat bilgisi tamamen kaldırıldı.
    
    fullSpecs: {
      intro: "MZ-EM11, evde profesyonel spa deneyimi sunan, estetik ve sağlık teknolojisini birleştiren yeni nesil bir cihazdır.",
      features: "Sıcak/Soğuk Kompres, 4D Hava Basıncı, Akupunktur Titreşimi",
      benefits: "Migren ağrılarını dindirir, göz yorgunluğunu alır, kaz ayaklarını ve göz altı torbalarını azaltır.",
      battery: "2000mAh (Tek şarjla uzun süreli kullanım)",
      warranty: "1 Yıl Birebir Değişim Garantisi",
      shipping: "Ücretsiz Kargo & Hızlı Teslimat"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Estetik ve Güzellik etkileri",
    "Migrene iyi gelir mi?",
    "Ürün özellikleri neler?",
    "Neden Kalief?",
    "Sıcak/Soğuk modu nasıl?",
    "Garanti koşulları"
  ];

  // --- RESİM GALERİSİ FONKSİYONLARI ---
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // --- NLP (DOĞAL DİL İŞLEME) MANTIĞI ---
  const analyzeQuestion = (text) => {
    const lowerText = text.toLowerCase();

    // 1. ESTETİK VE GÜZELLİK (Özel Bölüm)
    if (lowerText.includes('estetik') || lowerText.includes('güzellik') || lowerText.includes('kırışıklık') || lowerText.includes('bakım')) {
      return `✨ **Güzellik ve Bakım Etkisi**\n\nSmartRelax, sadece ağrıları gidermekle kalmaz, estetik faydalar da sunar:\n\n🌸 **Göz Altı Torbaları:** Soğuk kompres modu şişkinlikleri indirir.\n🌸 **Koyu Halkalar:** Isı terapisi kan dolaşımını hızlandırarak morlukları azaltır.\n🌸 **Kaz Ayakları:** Titreşim masajı cilt elastikiyetini artırır ve ince çizgilerin görünümünü hafifletir.\n\nDüzenli kullanımda daha canlı ve dinç bir bakış sağlar!`;
    }

    // 2. ÜRÜN ÖZELLİKLERİ
    if (lowerText.includes('özellik') || lowerText.includes('nasıl bir ürün') || lowerText.includes('tanıt') || lowerText.includes('nedir')) {
      return `✨ **SmartRelax MZ-EM11** profesyonel bir bakım cihazıdır.\n\nÖne Çıkan Özellikler:\n1️⃣ **4D Hava Basıncı:** Şakaklara nazikçe baskı yapar.\n2️⃣ **Titreşim:** Kan dolaşımını hızlandırır.\n3️⃣ **Sıcak/Soğuk Kompres:** Gözleri dinlendirir.\n4️⃣ **Bluetooth:** Bakım yaparken müzik dinleyebilirsiniz.\n\nGünde 15 dakika ile kendinizi yenileyin.`;
    }

    // 3. FİYAT SORULARI (Rakam vermeden yönlendirme)
    if (lowerText.includes('fiyat') || lowerText.includes('kaç') || lowerText.includes('tl') || lowerText.includes('ne kadar')) {
      return `En güncel fiyat bilgisi ve size özel dönemsel kampanyalarımız için lütfen resmi web sitemizi ziyaret edin: [${storeConfig.website}](${storeConfig.appLink}) \n\nKaliteden ödün vermeden, erişilebilir en iyi deneyimi sunmaya özen gösteriyoruz. 💎`;
    }

    // 4. NEDEN BİZ
    if (lowerText.includes('neden') || lowerText.includes('fark') || lowerText.includes('tercih')) {
      return `🏆 **Neden Kalief?**\n\nBiz sadece bir ürün değil, **kesintisiz bir deneyim** sunuyoruz.\n\n✅ **Üstün Kalite:** Cihazımızda kullanılan "Soft-Touch" medikal yüzey cildinizi tahriş etmez.\n✅ **Birebir Değişim:** Ürünümüze o kadar güveniyoruz ki, teknik sorunlarda tamirle uğraştırmıyor, direkt yenisiyle değiştiriyoruz.\n✅ **Müşteri Memnuniyeti:** Satış sonrası her an ulaşabileceğiniz destek ekibimiz yanınızda.`;
    }

    // 5. MİGREN
    if (lowerText.includes('migren') || lowerText.includes('baş ağrısı') || lowerText.includes('ağrı')) {
      return `Kesinlikle! 🧠 Cihazın şakak bölgesine uyguladığı ritmik hava basıncı ve ısı terapisi, migren ataklarını hafifletmek ve gerilim tipi baş ağrılarını ilaçsız rahatlatmak için özel olarak tasarlanmıştır.`;
    }

    // 6. TEKNİK DETAYLAR
    if (lowerText.includes('sıcak') || lowerText.includes('soğuk')) {
      return `Cihazımız **Dual-Effect** teknolojisine sahiptir. 🌡️❄️\n\n• **Soğuk Mod:** Sabahları göz şişkinliğini ve torbaları indirmek için idealdir.\n• **Sıcak Mod:** Akşamları göz kaslarını gevşetmek ve uykuya geçişi kolaylaştırmak için kullanılır.`;
    }

    // 7. KARGO VE GARANTİ
    if (lowerText.includes('garanti') || lowerText.includes('kargo') || lowerText.includes('iade')) {
      return `📦 **Kargo:** Tüm Türkiye'ye ÜCRETSİZ ve hızlı kargo ile gönderim sağlıyoruz.\n🛡️ **Garanti:** 1 yıl Kalief garantisi altındasınız. Herhangi bir üretim hatasında **birebir değişim** yapıyoruz.`;
    }

    // 8. SATIN ALMA
    if (lowerText.includes('satın') || lowerText.includes('almak')) {
      return `Harika bir seçim! 🎉 Kendinize yapacağınız en iyi yatırım olacak. Güvenle sipariş vermek için hemen tıklayın: [${storeConfig.website}](${storeConfig.appLink})`;
    }

    return null;
  };

  const handleSubmit = async (textOverride = null) => {
    const userMessage = textOverride || input.trim();
    if (!userMessage || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    const smartResponse = analyzeQuestion(userMessage);

    if (smartResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: smartResponse }]);
        setLoading(false);
      }, 700);
      return;
    }

    setTimeout(() => {
        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "Bu konuda daha detaylı bilgi için web sitemizi ziyaret edebilir veya WhatsApp hattımızdan bize ulaşabilirsiniz. Size ürünün temel özelliklerinden bahsedebilirim?" 
        }]);
        setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* 1. HEADER */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-3">
          {/* LOGO */}
          <img
            src="/kalief-logo.jpg"
            alt="Kalief Logo"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 leading-none text-sm tracking-wide">{storeConfig.storeName}</span>
            <a 
               href={storeConfig.appLink} 
               target="_blank" 
               rel="noreferrer" 
               className="text-[10px] text-gray-500 hover:text-black mt-0.5 flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              RESMİ MAĞAZA <ExternalLink size={10} />
            </a>
          </div>
        </div>
        
        <a
          href={storeConfig.appLink}
          target="_blank"
          rel="noreferrer"
          className="bg-black text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-gray-800 transition flex items-center gap-2 shadow-lg shadow-black/10"
        >
          Mağazaya Git
          <ExternalLink size={12} />
        </a>
      </div>

      {/* 2. ORTA ALAN */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        
        {/* A. HERO SECTION - FİYATSIZ & ŞIK */}
        <div className="bg-white pb-4 rounded-b-[2rem] shadow-sm mb-4 relative group">
            <div className="relative w-full h-64 bg-white flex justify-center items-center">
                {/* Resim */}
                <img 
                    src={productImages[activeImage]} 
                    alt="Ürün Görseli" 
                    className="h-full w-auto object-contain p-4"
                />
                
                {/* Yön Okları */}
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-100/80 p-1.5 rounded-full shadow hover:bg-white transition text-gray-800">
                    <ChevronLeft size={20}/>
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100/80 p-1.5 rounded-full shadow hover:bg-white transition text-gray-800">
                    <ChevronRight size={20}/>
                </button>

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {productImages.map((_, idx) => (
                        <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${activeImage === idx ? 'bg-black w-3' : 'bg-gray-300'}`} />
                    ))}
                </div>
            </div>

            {/* Başlık ve Rozetler (Fiyat Yok) */}
            <div className="px-5 mt-2">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-tight">{storeConfig.productName}</h1>
                        <p className="text-xs text-gray-400 mt-1 font-medium tracking-wide uppercase">{storeConfig.model} • PROFESSIONAL SERIES</p>
                    </div>
                </div>
                
                {/* Premium Rozetler */}
                <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-semibold bg-black text-white px-3 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap shadow-md">
                        <Star size={10} className="fill-white" /> Premium Series
                    </span>
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap border border-gray-200">
                        <ShieldCheck size={12} /> 1 Yıl Garanti
                    </span>
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full whitespace-nowrap">
                        Ücretsiz Kargo
                    </span>
                </div>
            </div>
        </div>

        {/* B. CHAT MESAJLARI */}
        <div className="px-4 pb-4 space-y-4">
          {messages.length === 0 ? (
             <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Sparkles className="text-black" size={20} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Size Nasıl Yardımcı Olabilirim?</h3>
                <p className="text-gray-500 text-xs max-w-xs mx-auto leading-relaxed">
                    Merhaba! Ben Kalief Asistanı.<br/>
                    Güzellik, bakım veya ürün özellikleri hakkında merak ettiklerinizi sorabilirsiniz.
                </p>
             </div>
          ) : (
            messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0 mr-2 shadow-sm mt-1">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))
          )}

          {loading && (
             <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0 mr-2">
                    <Bot size={16} className="text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 3. INPUT ALANI */}
      <div className="bg-white border-t p-4 pb-6 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        {/* Hızlı Sorular (Chips) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3 py-1">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSubmit(q)}
              disabled={loading}
              className="whitespace-nowrap px-4 py-2 bg-gray-50 hover:bg-black hover:text-white text-gray-700 text-xs font-medium rounded-full transition-all border border-gray-200 flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
        {/* Text Input */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-xl p-1 focus-within:ring-2 focus-within:ring-black/5 focus-within:border-black transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="Sorunuzu yazın..."
            className="flex-1 p-3 bg-transparent border-none focus:ring-0 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
          />
          <button
            onClick={() => handleSubmit()}
            disabled={!input.trim() || loading}
            className="p-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 transition-all flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}