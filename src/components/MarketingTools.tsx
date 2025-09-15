import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Video, 
  Download, 
  Wand2, 
  Image as ImageIcon, 
  Play,
  Share2,
  Edit,
  Copy,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MarketingTools = () => {
  const [posterPrompt, setPosterPrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedPosters, setGeneratedPosters] = useState<Array<{id: string, prompt: string, url: string}>>([]);
  const [generatedVideos, setGeneratedVideos] = useState<Array<{id: string, prompt: string, thumbnail: string, duration: string}>>([]);
  const { toast } = useToast();

  const generatePoster = async () => {
    if (!posterPrompt.trim()) return;
    
    setIsGeneratingPoster(true);
    
    // Simulate poster generation
    setTimeout(() => {
      const newPoster = {
        id: Date.now().toString(),
        prompt: posterPrompt,
        url: `https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=600&fit=crop&crop=center` // Sample poster
      };
      
      setGeneratedPosters(prev => [newPoster, ...prev]);
      setIsGeneratingPoster(false);
      setPosterPrompt('');
      
      toast({
        title: "Poster generated successfully!",
        description: "Your marketing poster is ready for download and sharing.",
      });
    }, 3000);
  };

  const generateVideo = async () => {
    if (!videoPrompt.trim()) return;
    
    setIsGeneratingVideo(true);
    
    // Simulate video generation
    setTimeout(() => {
      const newVideo = {
        id: Date.now().toString(),
        prompt: videoPrompt,
        thumbnail: `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center`,
        duration: '15s'
      };
      
      setGeneratedVideos(prev => [newVideo, ...prev]);
      setIsGeneratingVideo(false);
      setVideoPrompt('');
      
      toast({
        title: "Video ad generated successfully!",
        description: "Your 15-second promotional video is ready for WhatsApp and Instagram.",
      });
    }, 5000);
  };

  const posterTemplates = [
    "Festival Sale - 20% off on all groceries with colorful diyas and rangoli design",
    "Fresh Vegetables Daily - Farm to your table with green and natural theme",
    "Bulk Purchase Discount - Buy more save more with professional pricing layout",
    "New Store Opening - Grand celebration with balloons and ribbons",
    "Weekend Special Offers - Limited time deals with bold modern design"
  ];

  const videoTemplates = [
    "Product showcase with smooth transitions highlighting fresh vegetables and prices",
    "Customer testimonial style with local community members praising quality",
    "Quick recipe video using store ingredients with cooking steps",
    "Store tour showing clean aisles and fresh produce sections",
    "Festival greeting video with traditional music and product highlights"
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Poster Generator */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Palette className="h-5 w-5 text-primary" />
            <span>AI Poster Generator</span>
            <Badge variant="secondary">DALL-E Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Describe your poster</label>
            <Textarea
              value={posterPrompt}
              onChange={(e) => setPosterPrompt(e.target.value)}
              placeholder="e.g., Diwali festival sale poster with 20% discount on all items, colorful design with diyas and rangoli patterns"
              className="min-h-[80px]"
            />
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="hero" 
              onClick={generatePoster}
              disabled={isGeneratingPoster || !posterPrompt.trim()}
              className="flex-1"
            >
              {isGeneratingPoster ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating Poster...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Poster
                </>
              )}
            </Button>
          </div>

          {/* Template Suggestions */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Quick Templates</label>
            <div className="grid grid-cols-1 gap-2">
              {posterTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2 px-3"
                  onClick={() => setPosterPrompt(template)}
                >
                  <span className="text-xs">{template}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Generated Posters */}
          {generatedPosters.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Generated Posters</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedPosters.map((poster) => (
                  <div key={poster.id} className="space-y-2">
                    <div className="relative aspect-[2/3] bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={poster.url} 
                        alt="Generated poster"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium line-clamp-2">
                          {poster.prompt}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Generator */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Video className="h-5 w-5 text-primary" />
            <span>AI Video Ad Generator</span>
            <Badge variant="secondary">AI + TTS Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Describe your video ad</label>
            <Textarea
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              placeholder="e.g., 15-second video showcasing fresh vegetables with upbeat music, include store name and contact details"
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Video Duration</label>
              <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                <option value="10">10 seconds</option>
                <option value="15" selected>15 seconds</option>
                <option value="30">30 seconds</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Voice Language</label>
              <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
                <option value="tamil">Tamil</option>
                <option value="telugu">Telugu</option>
              </select>
            </div>
          </div>

          <Button 
            variant="gradient" 
            onClick={generateVideo}
            disabled={isGeneratingVideo || !videoPrompt.trim()}
            className="w-full"
          >
            {isGeneratingVideo ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating Video... (This may take 2-3 minutes)
              </>
            ) : (
              <>
                <Video className="h-4 w-4 mr-2" />
                Generate Video Ad
              </>
            )}
          </Button>

          {/* Template Suggestions */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Video Templates</label>
            <div className="grid grid-cols-1 gap-2">
              {videoTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-2 px-3"
                  onClick={() => setVideoPrompt(template)}
                >
                  <span className="text-xs">{template}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Generated Videos */}
          {generatedVideos.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Generated Videos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedVideos.map((video) => (
                  <div key={video.id} className="space-y-2">
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button variant="secondary" size="icon" className="rounded-full">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="secondary">{video.duration}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.prompt}
                    </p>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Download MP4
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground">Marketing Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Poster Best Practices</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use bright, festive colors during festivals</li>
                <li>• Include clear pricing and discount information</li>
                <li>• Add your store name and location prominently</li>
                <li>• Use local language for better connection</li>
                <li>• Keep text readable from a distance</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Video Ad Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep videos under 15 seconds for WhatsApp</li>
                <li>• Use clear, simple messaging</li>
                <li>• Include contact information in the video</li>
                <li>• Add background music for engagement</li>
                <li>• Show real products when possible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingTools;