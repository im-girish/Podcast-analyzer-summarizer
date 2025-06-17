import React, { useState } from 'react';
import Progress from './Progress';

interface UploadFormProps {
  onAnalyze: (input: { url?: string; file?: File }) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onAnalyze }) => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'upload'>('youtube');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const API_BASE_URL = 'http://localhost:3000/api';
  const [transcription, setTranscription] = useState<string>();
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [audio, setAudio] = useState<string>('');
  const [keypoints, setKeyPoints] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<boolean>(false);

  const handleAnalyze = async () => {
    if (activeTab === 'youtube') {
      const url = youtubeUrl.trim();
      if (url) {
        onAnalyze({ url });

        try {
          setLoading(true);
          setAnalysis(true);

          const res = await fetch(`${API_BASE_URL}/analyze/youtube`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
          });

          if (!res.ok) throw new Error('Failed to start analysis');

          const data = await res.json();
          setTranscription(data.transcription);
          setPdfUrl(data.pdfUrl);
          setAudio(data.audioSummaryUrl.url);
          setKeyPoints(data.summary.keyPoints);
        } catch (err) {
          console.error('error', err);
        } finally {
          setLoading(false);
        }
      } else {
        alert('Please enter a valid YouTube URL');
      }
    } else if (file) {
      onAnalyze({ file });
    } else {
      alert('Please upload a file');
    }
  };

  const pdfDownload = () => pdfUrl ? window.open(pdfUrl, '_blank') : alert('PDF not found');
  const playAudio = () => audio ? window.open(audio, '_blank') : alert('Audio not available');

  return (
    <div className="p-8 bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-2xl mt-12 mx-auto max-w-5xl">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 drop-shadow-md">Podcast Analyzer App</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-8 py-2 mx-2 rounded-full transition-all duration-300 ${
            activeTab === 'youtube' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('youtube')}
        >
          YouTube URL
        </button>
      </div>

      {/* Input Section */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-br from-white via-gray-50 to-gray-200 p-6 rounded-2xl shadow-inner w-full md:w-3/4">
          {activeTab === 'youtube' ? (
            <div>
              <label className="block mb-2 font-semibold text-gray-700">YouTube URL:</label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="border w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
          ) : (
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Upload Audio/Video:</label>
              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="border w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
              />
            </div>
          )}

          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transform transition-all text-white font-bold py-3 rounded-xl mt-4 shadow-md"
          >
            Analyze Podcast
          </button>
        </div>
      </div>

      {/* Summary Section */}
      {analysis && (
        <div className="mt-10 bg-gray-50 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Podcast Summary</h2>
          {loading ? <Progress /> : (
            transcription && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Transcription:</h3>
                  <p className="bg-white p-4 rounded-xl shadow-sm">{transcription}</p>
                </div>

                {keypoints.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700">Key Points:</h3>
                    <ul className="list-disc list-inside bg-white p-4 rounded-xl shadow-sm">
                      {keypoints.map((point, index) => (
                        <li key={index} className="text-gray-800">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
                  <button
                    onClick={pdfDownload}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl transition-transform hover:scale-105"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={playAudio}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-xl transition-transform hover:scale-105"
                  >
                    Play Audio
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
