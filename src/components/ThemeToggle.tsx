
import React from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [theme, setTheme] = React.useState('ocean');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const getNextTheme = () => {
    switch (theme) {
      case 'ocean': return 'garden';
      case 'garden': return 'forest';
      case 'forest': return 'ocean';
      default: return 'ocean';
    }
  };

  const toggleTheme = () => {
    setTheme(getNextTheme());
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'ocean': return '🌊 Ocean';
      case 'garden': return '🌱 Garden';
      case 'forest': return '🌲 Forest';
      default: return '🌊 Ocean';
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="border-primary/20 hover:bg-primary/10 accessible-button"
      aria-label={`Switch to ${getNextTheme()} theme. Current theme: ${theme}`}
    >
      {getThemeIcon()}
    </Button>
  );
};

export default ThemeToggle;
