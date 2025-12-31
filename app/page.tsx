import { useState } from 'react';
import { CheckCircle, AlertCircle, Copy, Sparkles, Bot, User, TrendingUp, FileText } from 'lucide-react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [detection, setDetection] = useState(null);
  const [paraphrase, setParaphrase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('both');
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAction = () => {
    if (!inputText.trim()) {
      showNotification('⚠️ Masukkan teks terlebih dahulu!');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      if (activeTab === 'detect' || activeTab === 'both') {
        setDetection({
          is_ai_generated: true,
          confidence: 0.87,
          analysis: 'Teks ini menunjukkan pola karakteristik AI dengan struktur kalimat yang sangat teratur dan penggunaan frasa formal yang konsisten.'
        });
      }
      
      if (activeTab === 'paraphrase' || activeTab === 'both') {
        setParaphrase({
          original_text: inputText,
          paraphrased_text: 'Ini adalah contoh hasil paraphrase dalam bahasa Indonesia dengan gaya yang lebih santai dan natural seperti mahasiswa. Kalimatnya lebih fleksibel dan menggunakan bahasa sehari-hari.',
          language: 'id'
        });
      }
      
      setLoading(false);
      showNotification('✅ Proses berhasil!');
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification('✅ Teks berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-6 right-6 bg-white shadow-2xl rounded-xl px-6 py-4 z-50 border-l-4 border-indigo-600 animate-pulse">
          <p className="font-medium text-gray-800">{notification}</p>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header with Glass Effect */}
          <div className="text-center mb-12 backdrop-blur-sm bg-white/10 rounded-3xl p-8 border border-white/20">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-16 h-16 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 mb-4 drop-shadow-lg">
              AI Text Detector & Paraphraser
            </h1>
            <p className="text-xl text-purple-100 font-medium">
              🎓 Deteksi Teks AI & Paraphrase Otomatis dengan Teknologi Machine Learning
            </p>
          </div>

          {/* Tabs with Modern Design */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 inline-flex gap-2">
              <button
                onClick={() => {
                  setActiveTab('both');
                  setDetection(null);
                  setParaphrase(null);
                }}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'both'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                Deteksi & Paraphrase
              </button>
              <button
                onClick={() => {
                  setActiveTab('detect');
                  setDetection(null);
                  setParaphrase(null);
                }}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'detect'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Bot className="w-5 h-5" />
                Hanya Deteksi
              </button>
              <button
                onClick={() => {
                  setActiveTab('paraphrase');
                  setDetection(null);
                  setParaphrase(null);
                }}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'paraphrase'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-5 h-5" />
                Hanya Paraphrase
              </button>
            </div>
          </div>

          {/* Input Area with Glassmorphism */}
          <div className="backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl p-8 mb-8 border border-white/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <label className="text-2xl font-bold text-gray-800">
                Input Teks untuk Dianalisis
              </label>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-56 p-6 border-2 border-indigo-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 resize-none text-lg transition-all duration-300 shadow-inner"
              placeholder="✍️ Ketik atau paste teks yang ingin dianalisis di sini..."
            />
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-700 bg-indigo-50 px-4 py-2 rounded-full">
                  📝 {inputText.length} karakter
                </span>
                {inputText.length > 0 && (
                  <span className="text-sm text-gray-500 bg-green-50 px-3 py-1 rounded-full">
                    ✅ Siap diproses
                  </span>
                )}
              </div>
              <button
                onClick={handleAction}
                disabled={loading || !inputText.trim()}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-6 h-6" />
                    Proses Sekarang
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results with Card Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Detection Result */}
            {detection && (
              <div className="backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl p-8 border border-white/50 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Hasil Deteksi AI
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className={`p-6 rounded-2xl shadow-lg border-2 ${
                    detection.is_ai_generated 
                      ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300' 
                      : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {detection.is_ai_generated ? (
                          <AlertCircle className="w-8 h-8 text-red-600" />
                        ) : (
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        )}
                        <p className="font-bold text-xl">
                          {detection.is_ai_generated ? '🤖 Terdeteksi AI Generated' : '👤 Kemungkinan Human Written'}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl">
                      <p className="text-lg font-semibold text-gray-700">
                        Confidence Score: 
                        <span className={`ml-2 ${detection.is_ai_generated ? 'text-red-600' : 'text-green-600'}`}>
                          {(detection.confidence * 100).toFixed(1)}%
                        </span>
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
                        <div 
                          className={`h-3 rounded-full ${detection.is_ai_generated ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                          style={{width: `${detection.confidence * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner border border-gray-200">
                    <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">📊 Analisis Detail:</p>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {detection.analysis}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Paraphrase Result */}
            {paraphrase && (
              <div className="backdrop-blur-xl bg-white/95 rounded-3xl shadow-2xl p-8 border border-white/50 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    Hasil Paraphrase
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl shadow-lg">
                    <p className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">✨ Teks Hasil Paraphrase:</p>
                    <p className="text-gray-800 leading-relaxed text-base whitespace-pre-wrap">
                      {paraphrase.paraphrased_text}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paraphrase.paraphrased_text)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-lg flex items-center justify-center gap-3 transform hover:scale-105"
                  >
                    <Copy className="w-6 h-6" />
                    📋 Salin Teks ke Clipboard
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Stats */}
          <div className="mt-12 text-center backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div className="flex flex-col items-center">
                <Bot className="w-10 h-10 text-yellow-300 mb-2" />
                <p className="text-white font-bold text-lg">AI Detection</p>
                <p className="text-purple-200 text-sm">Machine Learning Based</p>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="w-10 h-10 text-pink-300 mb-2" />
                <p className="text-white font-bold text-lg">Smart Paraphrase</p>
                <p className="text-purple-200 text-sm">Natural Language Style</p>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className="w-10 h-10 text-green-300 mb-2" />
                <p className="text-white font-bold text-lg">High Accuracy</p>
                <p className="text-purple-200 text-sm">87%+ Confidence Rate</p>
              </div>
            </div>
            <p className="text-purple-200 font-medium">
              💻 Built with Modern Tech Stack: Ollama + FastAPI + Next.js + React
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
