import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  MessageSquare, 
  Upload, 
  Palette, 
  Video, 
  Mic,
  Menu,
  User,
  Bell
} from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'upload', label: 'Upload Data', icon: Upload },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'marketing', label: 'Marketing Tools', icon: Palette },
    { id: 'voice', label: 'Voice Assistant', icon: Mic },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">AI Business Assistant</h1>
            <Badge variant="secondary" className="text-xs">
              DEMO
            </Badge>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "hero" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(section.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{section.label}</span>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;