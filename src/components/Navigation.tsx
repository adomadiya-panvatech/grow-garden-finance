
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Home, TreePine, BookOpen, User, Users, Shield, LogOut } from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const getNavItems = () => {
    switch (user.role) {
      case 'child':
        return [
          { path: '/dashboard', label: 'Home', icon: Home },
          { path: '/garden', label: 'Garden', icon: TreePine },
          { path: '/learn', label: 'Learn', icon: BookOpen },
          { path: '/profile', label: 'Profile', icon: User },
        ];
      case 'parent':
        return [
          { path: '/parent', label: 'Dashboard', icon: Users },
          { path: '/garden', label: 'Child\'s Garden', icon: TreePine },
          { path: '/profile', label: 'Profile', icon: User },
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Admin', icon: Shield },
          { path: '/profile', label: 'Profile', icon: User },
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold text-green-800">Growth Garden</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {getNavItems().map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`flex items-center gap-2 ${isActive(item.path) 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "text-green-700 hover:text-green-800 hover:bg-green-50"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-2xl">{user.avatar}</span>
              <div>
                <p className="text-sm font-medium text-green-800">{user.name}</p>
                <p className="text-xs text-green-600 capitalize">{user.role}</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-green-600 text-green-600 hover:bg-green-50 flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex justify-around">
            {getNavItems().map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex flex-col items-center p-2 ${
                      isActive(item.path) 
                        ? "text-green-800 bg-green-50" 
                        : "text-green-600"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-xs mt-1">
                      {item.label.split(' ')[0]}
                    </span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
