import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Languages, Play } from 'lucide-react';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');

  const languages = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'telugu', name: 'తెలుగు', flag: '🇮🇳' },
  ];

  return (
    <div className="space-y-6 p-6">
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Mic className="h-5 w-5 text-primary" />
            <span>Voice Assistant</span>
            <Badge variant="secondary">Whisper AI</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30"
                onClick={() => setIsListening(!isListening)}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8 text-white animate-pulse" />
                ) : (
                  <Mic className="h-8 w-8 text-white" />
                )}
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {isListening ? 'Listening...' : 'Tap to speak'}
              </h3>
              <p className="text-muted-foreground">
                Ask me anything about your business in your preferred language
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">Select Language</label>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={selectedLanguage === lang.code ? "hero" : "outline"}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className="flex items-center space-x-2"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Sample Voice Commands:</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>• "इस महीने सबसे ज्यादा कौन सा प्रोडक्ट बिका?" (Hindi)</p>
              <p>• "What were my total sales yesterday?" (English)</p>
              <p>• "இந்த வாரம் என்ன லாபம்?" (Tamil)</p>
              <p>• "దీవాళి కోసం ఏం డిస్కౌంట్ ఇవ్వాలి?" (Telugu)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAssistant;