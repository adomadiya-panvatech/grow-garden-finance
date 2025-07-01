
import React from 'react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [theme, setTheme] = React.useState('ocean');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'ocean' ? 'garden' : 'ocean');
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="border-primary/20 hover:bg-primary/10"
    >
      {theme === 'ocean' ? '🌊 Ocean' : '🌱 Garden'}
    </Button>
  );
};

export default ThemeToggle;
