
import React from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [theme, setTheme] = React.useState('garden');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const getNextTheme = () => {
    switch (theme) {
      case 'garden': return 'ocean';
      case 'ocean': return 'forest';
      case 'forest': return 'garden';
      default: return 'garden';
    }
  };

  const toggleTheme = () => {
    setTheme(getNextTheme());
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'garden': return '🌱 Garden';
      case 'ocean': return '🌊 Ocean';
      case 'forest': return '🌲 Forest';
      default: return '🌱 Garden';
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
