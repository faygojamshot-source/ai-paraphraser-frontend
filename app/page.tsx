'use client';

import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface DetectionResult {
  is_ai_generated: boolean;
  confidence: number;
  analysis: string;
}

interface ParaphraseResult {
  original_text: string;
  paraphrased_text: string;
  language: string;
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const [paraphrase, setParaphrase] = useState<ParaphraseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'detect' | 'paraphrase' | 'both'>('both');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleDetect = async () => {
    if (!inputText.trim()) {
      toast.error('Masukkan teks terlebih dahulu!');
      return;
    }

    setLoading(true);
    setDetection(null);

    try {
      const response = await axios.post(`${API_URL}/detect`, {
        text: inputText
      });
      setDetection(response.data);
      toast.success('Deteksi berhasil!');
    } catch (error) {
      toast.error('Gagal mendeteksi teks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleParaphrase = async () => {
    if (!inputText.trim()) {
      toast.error('Masukkan teks terlebih dahulu!');
      return;
    }

    setLoading(true);
    setParaphrase(null);

    try {
      const response = await axios.post(`${API_URL}/paraphrase`, {
        text: inputText
      });
      setParaphrase(response.data);
      toast.success('Paraphrase berhasil!');
    } catch (error) {
      toast.error('Gagal melakukan paraphrase');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = async () => {
    if (!inputText.trim()) {
      toast.error('Masukkan teks terlebih dahulu!');
      return;
    }

    setLoading(true);
    setDetection(null);
    setParaphrase(null);

    try {
      const response = await axios.post(`${API_URL}/process`, {
        text: inputText
      });
      setDetection(response.data.detection);
      setParaphrase(response.data.paraphrase);
      toast.success('Proses berhasil!');
    } catch (error) {
      toast.error('Gagal memproses teks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = () => {
    if (activeTab === 'detect') handleDetect();
    else if (activeTab === 'paraphrase') handleParaphrase();
    else handleProcess();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Teks berhasil disalin!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              AI Text Detector & Paraphraser
            </h1>
            <p className="text-gray-600">
              Deteksi teks AI dan ubah ke bahasa Indonesia dengan gaya mahasiswa
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-6 space-x-4">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === 'both'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Deteksi & Paraphrase
            </button>
            <button
              onClick={() => setActiveTab('detect')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === 'detect'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Hanya Deteksi
            </button>
            <button
              onClick={() => setActiveTab('paraphrase')}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                activeTab === 'paraphrase'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Hanya Paraphrase
            </button>
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Masukkan Teks
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
	      className="w-full h-48 p-4 border-2 border-black rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-black resize-none"
              placeholder="Ketik atau paste teks yang ingin dianalisis..."
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {inputText.length} karakter
              </span>
              <button
                onClick={handleAction}
                disabled={loading || !inputText.trim()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Memproses...' : 'Proses'}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detection Result */}
            {detection && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Hasil Deteksi
                </h2>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    detection.is_ai_generated 
                      ? 'bg-red-50 border border-red-200' 
                      : 'bg-green-50 border border-green-200'
                  }`}>
                    <p className="font-medium">
                      Status: {detection.is_ai_generated ? '🤖 Terdeteksi AI' : '👤 Kemungkinan Manusia'}
                    </p>
                    <p className="text-sm mt-2">
                      Confidence: {(detection.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {detection.analysis}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Paraphrase Result */}
            {paraphrase && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Hasil Paraphrase
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {paraphrase.paraphrased_text}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paraphrase.paraphrased_text)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    📋 Salin Teks
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Powered by Ollama + FastAPI + Next.js</p>
          </div>
        </div>
      </div>
    </div>
  );
}
