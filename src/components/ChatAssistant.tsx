import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  TrendingUp,
  BarChart3,
  Lightbulb,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
  chart?: any;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI Business Assistant. I can help you analyze your sales data, predict trends, and suggest marketing strategies. Try asking me about your best-selling products, revenue forecasts, or marketing ideas for upcoming festivals.',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample responses with data
  const getAIResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('best') || lowerQuery.includes('top') || lowerQuery.includes('selling')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Based on your sales data, here are your top-performing products this month:\n\n1. **Rice (1kg)** - 450 units sold, ₹20,250 revenue\n2. **Dal (500g)** - 320 units sold, ₹16,000 revenue\n3. **Cooking Oil (1L)** - 280 units sold, ₹19,600 revenue\n\n**Insights:** Rice shows consistent demand with 15% growth. Consider bundling rice with dal for cross-selling opportunities.',
        timestamp: new Date(),
        data: {
          products: [
            { name: 'Rice 1kg', units: 450, revenue: 20250 },
            { name: 'Dal 500g', units: 320, revenue: 16000 },
            { name: 'Oil 1L', units: 280, revenue: 19600 },
          ]
        }
      };
    }

    if (lowerQuery.includes('predict') || lowerQuery.includes('forecast') || lowerQuery.includes('next')) {
      const chartData = [
        { week: 'This Week', predicted: 15500, actual: 15200 },
        { week: 'Next Week', predicted: 16800, actual: null },
        { week: 'Week +2', predicted: 17200, actual: null },
        { week: 'Week +3', predicted: 16900, actual: null },
      ];

      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: '📈 **Revenue Forecast for Next 3 Weeks:**\n\n• **Next Week:** ₹16,800 (+8.5% growth)\n• **Week +2:** ₹17,200 (+2.4% growth)\n• **Week +3:** ₹16,900 (-1.7% seasonal dip)\n\n**Key Factors:**\n- Festival season approaching (positive impact)\n- Historical data shows 12% growth in similar periods\n- Weather patterns favor grocery purchases\n\n**Recommendation:** Stock up on rice, oil, and spices for the predicted demand surge.',
        timestamp: new Date(),
        chart: chartData
      };
    }

    if (lowerQuery.includes('diwali') || lowerQuery.includes('festival') || lowerQuery.includes('campaign')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: '🪔 **Diwali Campaign Strategy:**\n\n**Discount Offers:**\n• Bundle Deal: Rice + Dal + Oil = 15% off\n• Buy 3kg Rice, Get 500g Dal FREE\n• Festival Spice Kit - Special price ₹299\n\n**Marketing Messages:**\n• "Ghar ka swad, festival ke saath" (Home taste with festivals)\n• "Quality ingredients for your Diwali feast"\n\n**Timing:** Start campaign 2 weeks before Diwali\n**Expected Impact:** 35-40% revenue boost based on last year\'s data\n\n**Would you like me to create promotional posters for these offers?**',
        timestamp: new Date(),
      };
    }

    if (lowerQuery.includes('slow') || lowerQuery.includes('inventory') || lowerQuery.includes('stock')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: '📦 **Slow-Moving Inventory Analysis:**\n\n**Items needing attention:**\n• Organic Honey (500g) - Only 12 units sold this month\n• Premium Basmati Rice (5kg) - 8 units moved\n• Imported Almonds (250g) - 15 units sold\n\n**Recommendations:**\n1. **Bundle Strategy:** Pair honey with regular products\n2. **Price Adjustment:** 10-15% discount on premium rice\n3. **Cross-sell:** Promote almonds during festival season\n4. **Customer Education:** Highlight health benefits\n\n**Action Plan:** Create "Health & Wellness" combo packs',
        timestamp: new Date(),
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: 'I understand you\'re asking about your business. Here are some things I can help you with:\n\n• **Sales Analysis** - "Which products sold the most this month?"\n• **Revenue Forecasting** - "Predict next week\'s sales"\n• **Marketing Strategy** - "Suggest a Diwali discount campaign"\n• **Inventory Management** - "Which items are slow-moving?"\n• **Customer Insights** - "Who are my top customers?"\n\nWhat specific aspect of your business would you like to explore?',
      timestamp: new Date(),
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, you'd integrate with speech recognition here
  };

  const suggestedQueries = [
    "Which product sold the most this month?",
    "Predict next week's sales revenue",
    "Suggest a Diwali discount campaign",
    "Show slow-moving inventory items",
    "What's my customer growth trend?"
  ];

  return (
    <div className="space-y-6 p-6">
      <Card className="bg-card shadow-card h-[600px] flex flex-col">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <span>AI Business Assistant</span>
            <Badge variant="secondary" className="ml-2">GPT-4o Powered</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && <Bot className="h-4 w-4 mt-1 text-primary" />}
                    {message.type === 'user' && <User className="h-4 w-4 mt-1" />}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      
                      {/* Chart Display */}
                      {message.chart && (
                        <div className="mt-3 h-48 bg-background rounded p-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={message.chart}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
                              <YAxis stroke="#9CA3AF" fontSize={12} />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: 'hsl(var(--card))', 
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }} 
                              />
                              <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" />
                              <Line type="monotone" dataKey="actual" stroke="hsl(var(--success))" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      
                      {/* Data Table Display */}
                      {message.data?.products && (
                        <div className="mt-3 bg-background rounded p-2">
                          <div className="text-xs font-semibold mb-2">Product Performance</div>
                          <div className="space-y-1">
                            {message.data.products.map((product: any, idx: number) => (
                              <div key={idx} className="flex justify-between text-xs">
                                <span>{product.name}</span>
                                <span>{product.units} units | ₹{product.revenue}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.type === 'assistant' && (
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your sales, inventory, or marketing strategies..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                onClick={toggleListening}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button variant="hero" onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Queries */}
      <Card className="bg-card shadow-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>Try asking me...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start text-left h-auto py-2 px-3"
                onClick={() => setInputValue(query)}
              >
                <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="text-xs">{query}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAssistant;