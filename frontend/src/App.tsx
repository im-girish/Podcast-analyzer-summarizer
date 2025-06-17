import React, { useState } from 'react';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import Progress from './components/Progress';
import Footer from './components/Footer';
import { SummaryData } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleAnalyze = async (input: { url?: string; file?: File }) => {
    setLoading(true);
    setSummary(null);

    try {
      // Dummy delay to simulate backend call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulated response (replace with actual backend API call)
      // const dummySummary: SummaryData = {
      //   text: 'This is a short summary of the podcast. Key points are discussed below.',
      //   keyPoints: [
      //     { title: 'Introduction', content: 'Podcast begins with an introduction to the topic.' },
      //     { title: 'Main Discussion', content: 'Important points discussed about the topic.' },
      //     { title: 'Conclusion', content: 'Podcast concludes with key takeaways.' },
      //   ],
      //   audioSummaryUrl: '', 
      // };
      // setSummary(dummySummary);
      setJobId('123456');
    } catch (error) {
      console.error('Error during analysis:', error);
      alert('Something went wrong while analyzing the podcast.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 fade-in">
        {/* Glass Card applied */}
        <div className="glass-card max-w-4xl mx-auto">
          <UploadForm onAnalyze={handleAnalyze} />
        </div>

        {/* Show Progress loader when loading */}
        {loading && (
          <div className="mt-10">
            <Progress />
          </div>
        )}

        {/* Placeholder for summary display in the future */}
        {/* {!loading && summary && <Results summary={summary} jobId={jobId} />} */}
      </main>

      <Footer />
    </div>
  );
};

export default App;
