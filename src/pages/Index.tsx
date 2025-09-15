import React, { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import DataUpload from '@/components/DataUpload';
import ChatAssistant from '@/components/ChatAssistant';
import MarketingTools from '@/components/MarketingTools';
import VoiceAssistant from '@/components/VoiceAssistant';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <DataUpload />;
      case 'chat':
        return <ChatAssistant />;
      case 'marketing':
        return <MarketingTools />;
      case 'voice':
        return <VoiceAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="container mx-auto">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
