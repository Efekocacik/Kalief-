import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Bot, ExternalLink, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export default function ProductShowcaseAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const messagesEndRef = useRef(null);

  // --- ÖNEMLİ: RESİM AYARLARI ---
  const productImages = [
    "/goz-masaji-hero.jpg",
    "/goz-masaji-on.jpeg"
  ];

  const storeConfig = {
    storeName: "Kalief",
    website: "www.kalidekor.com",
    appLink: "https://www.kalidekor.com",
    productName: "SmartRelax Göz Terapi Cihazı",
    model: "MZ-EM11",
    price: "4.500 TL",
    
    // Satış Odaklı Veriler
    fullSpecs: {
      intro: "MZ-EM11, sadece bir masaj aleti değil, evde profesyonel spa deneyimidir. 4D hava yastıkları ve akıllı ısı teknolojisiyle göz çevrenizi yeniler.",
      features: "Sıcak/Soğuk Kompres, 4D Hava Basıncı, Akupunktur Titreşimi, Bluetooth Müzik",
      benefits: "Migren ağrılarını dindirir, göz yorgunluğunu alır, göz altı torbalarını ve koyu halkaları giderir.",
      battery: "2000mAh (Tek şarjla 1 hafta kullanım)",
      warranty: "1 Yıl Birebir Değişim Garantisi",
      shipping: "Ücretsiz ve Hızlı Kargo"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Ürün özellikleri neler?",
    "Migrene iyi gelir mi?",
    "Estetik ve güzellik",
    "Neden sizi tercih etmeliyim?",
    "Sıcak/Soğuk modu nasıl?",
    "Kargo ve Garanti"
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

    // 1. ÜRÜN ÖZELLİKLERİ VE TANITIM (İstenilen detaylı ve ikna edici cevap)
    if (lowerText.includes('özellik') || lowerText.includes('nasıl bir ürün') || lowerText.includes('tanıt') || lowerText.includes('nedir')) {
      return `✨ **SmartRelax MZ-EM11** sıradan bir masaj aleti değildir.\n\nBu cihaz, göz çevresindeki akupunktur noktalarına **4 farklı yöntemle** bakım yapar:\n1️⃣ **Hava Basıncı:** Şakaklara nazikçe baskı yaparak stresi alır.\n2️⃣ **Titreşim:** Kan dolaşımını hızlandırır.\n3️⃣ **Sıcak/Soğuk Kompres:** Gözleri dinlendirir ve şişlikleri indirir.\n4️⃣ **Bluetooth:** Masaj yaparken müzik dinleyebilirsiniz.\n\n💡 **Neden Almalısınız?** Göz yorgunluğu, migren veya uykusuzluk çekiyorsanız, günde sadece 15 dakikada ilaçsız rahatlama sağlar. Kendinize yapacağınız en iyi yatırımdır.`;
    }

    // 2. FİYAT VE REKABET (Kullanıcı sorarsa devreye girer)
    if (lowerText.includes('fiyat') || lowerText.includes('kaç') || lowerText.includes('neden') && lowerText.includes('tercih')) {
      return `Ürünümüz şu an **${storeConfig.price}** fiyatla satıştadır. 🏷️\n\nAçıkça belirtmek isteriz ki; aynı özelliklere sahip muadil ürünler pazar yerlerinde (Trendyol vb.) **6.500 TL** bandında satılmaktadır. Biz doğrudan üretici/ithalatçı avantajıyla **%30 daha uygun fiyat** sunuyoruz. Kalite aynı, fiyat daha erişilebilir. ✅`;
    }

    if (lowerText.includes('migren') || lowerText.includes('baş ağrısı') || lowerText.includes('ağrı')) {
      return `Kesinlikle! 🧠 Cihazın iç kısmındaki metal başlıklar (resimlerde görebilirsiniz) ve hava yastıkları, şakaklarınıza ritmik masaj yapar. Bu teknik, migren ataklarını hafifletmek ve gerilim tipi baş ağrılarını ilaçsız gidermek için özel olarak tasarlanmıştır.`;
    }

    if (lowerText.includes('estetik') || lowerText.includes('güzellik') || lowerText.includes('guzellik')) {
      return `Evet, kullanılır! ✨ Düzenli kullanımda göz çevresi kırışıklıklarını, kaz ayaklarını ve göz altı torbalarına iyi gelir. Cihazın masaj ve kompres özellikleri sayesinde cilt elastikiyetini artırır ve yaşlanma belirtilerini azaltır.`;
    }

    if (lowerText.includes('torba') || lowerText.includes('halka') || lowerText.includes('morluk')) {
      return `Evet, etkilidir. 👁️ Soğuk kompres modumuz kılcal damarları daraltarak göz altı şişliklerini indirirken, sıcak mod kan dolaşımını artırarak koyu halkaların (morlukların) renginin açılmasına yardımcı olur.`;
    }

    if (lowerText.includes('sıcak') || lowerText.includes('soğuk')) {
      return `Cihazımız **Dual-Effect** teknolojisine sahiptir. 🌡️❄️ Tek tuşla modu değiştirebilirsiniz. Sabahları şiş gözleri indirmek için SOĞUK, akşamları yorgunluğu atmak ve uykuya geçişi kolaylaştırmak için SICAK modu öneriyoruz.`;
    }

    if (lowerText.includes('pil') || lowerText.includes('şarj')) {
      return `Cihaz 2000mAh güçlü bir bataryaya sahiptir. 🔋 Type-C (telefon şarjı) ile şarj olur. Günde 15 dk kullanımla şarjı yaklaşık **1 hafta** gider. Kablo derdi olmadan her yerde kullanabilirsiniz.`;
    }

    if (lowerText.includes('garanti') || lowerText.includes('kargo')) {
      return `📦 **Kargo:** Tüm Türkiye'ye ücretsizdir ve 24 saatte kargolanır.\n🛡️ **Garanti:** Ürünümüz 1 yıl Kalief garantilidir. Herhangi bir teknik sorunda onarım değil, **birebir değişim** yapıyoruz.`;
    }

    if (lowerText.includes('satın') || lowerText.includes('almak')) {
      return `Harika bir karar! 🎉 Ürünü güvenle sipariş etmek için: [${storeConfig.website}](${storeConfig.appLink}) adresini ziyaret edebilirsiniz.`;
    }

    return null;
  };

  const handleSubmit = async (textOverride = null) => {
    const userMessage = textOverride || input.trim();
    if (!userMessage || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    // Önce yerel zekayı kontrol et
    const smartResponse = analyzeQuestion(userMessage);

    if (smartResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: smartResponse }]);
        setLoading(false);
      }, 700);
      return;
    }

    // Cevap bulunamazsa genel bir cevap ver (API bağlantısı olmadığı için fallback)
    setTimeout(() => {
        setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "Bu konuda detaylı bilgi için web sitemizi ziyaret edebilir veya whatsapp hattımızdan destek alabilirsiniz. Size ürünün temel özelliklerinden bahsedebilirim?" 
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
      
      {/* 1. HEADER: Sade ve Güven Verici */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-3">
          <img
            src="/kalief-logo.jpg"
            alt="Kalief Logo"
            className="w-16 h-16 object-contain flex-shrink-0"
            onError={(e) => {
              console.error("Logo yüklenemedi:", e.target.src);
              e.target.style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 leading-none">{storeConfig.storeName}</span>
            <a 
               href={storeConfig.appLink} 
               target="_blank" 
               rel="noreferrer" 
               className="text-xs text-gray-500 hover:text-black mt-1 flex items-center gap-1 transition-colors"
            >
              {storeConfig.website} <ExternalLink size={10} />
            </a>
          </div>
        </div>
        <a
          href="https://ty.gl/fovxcunmv9ke2"
          target="_blank"
          rel="noreferrer"
          className="bg-black text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-gray-800 transition flex items-center gap-1"
        >
          Trendyol’da Görüntüle
          <ExternalLink size={12} />
        </a>
      </div>

      {/* 2. ORTA ALAN: Scroll Edilebilir */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        
        {/* A. HERO SECTION (RESİM GALERİSİ) - Sohbetten önce görünür */}
        <div className="bg-white pb-6 rounded-b-3xl shadow-sm mb-4">
            <div className="relative w-full h-[360px] bg-gray-50 group">
                {/* Resim */}
                <img 
                    src={productImages[activeImage]} 
                    alt="Ürün Görseli" 
                    className="w-full h-full object-contain p-2"
                />
                
                {/* Yön Okları */}
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white transition">
                    <ChevronLeft size={20}/>
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow hover:bg-white transition">
                    <ChevronRight size={20}/>
                </button>
                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {productImages.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full transition-all ${activeImage === idx ? 'bg-black w-4' : 'bg-gray-300'}`} />
                    ))}
                </div>
            </div>
            {/* Ürün Başlık ve Özet */}
            <div className="px-5 mt-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{storeConfig.productName}</h1>
                        <p className="text-sm text-gray-500 mt-1">{storeConfig.model} • Profesyonel Bakım</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-lg font-bold text-black">{storeConfig.price}</span>
                        <span className="block text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full mt-1">
                            Ücretsiz Kargo
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* B. CHAT MESAJLARI */}
        <div className="px-4 pb-4 space-y-4">
          {messages.length === 0 ? (
             <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Sparkles className="text-yellow-500" size={24} />
                </div>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                    Merhaba! 👋 Ben Kalief Asistanı.<br/>
                    Aşağıdaki konularda size hemen yardımcı olabilirim.
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
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
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
      <div className="bg-white border-t p-4 pb-6">
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
            placeholder="Aklınıza takılanı sorun..."
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

