import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import UserManagement from '@/components/admin/UserManagement';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'overview' | 'users'>('overview');

  if (!user) return null;

  // Mock admin data - in real app, this would come from API
  const adminData = {
    totalUsers: 1247,
    totalChildren: 892,
    totalParents: 355,
    totalSavings: 45280.50,
    totalMatching: 2264.03,
    averageSavingsPerChild: 50.78,
    activeStreaks: 234,
    recentRegistrations: [
      { name: 'Emily Johnson', role: 'child', parentName: 'Sarah Garden', date: '2024-01-15', verified: true, age: 8 },
      { name: 'Michael Brown', role: 'parent', date: '2024-01-14', verified: false },
      { name: 'Alex Smith', role: 'child', parentName: 'Michael Brown', date: '2024-01-13', verified: true, age: 10 },
      { name: 'Taylor Green', role: 'child', parentName: 'Lisa Green', date: '2024-01-12', verified: false, age: 7 },
      { name: 'Jordan Wilson', role: 'parent', date: '2024-01-11', verified: true },
    ],
    pendingVerifications: 12,
    topPerformers: [
      { name: 'Alex Garden', savings: 245.50, level: 8 },
      { name: 'Jamie Smith', savings: 198.25, level: 7 },
      { name: 'Taylor Green', savings: 156.80, level: 6 },
    ]
  };

  const getThemeCardClass = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    switch (theme) {
      case 'forest': return 'forest-card';
      case 'garden': return 'garden-card';
      default: return 'ocean-card';
    }
  };

  const getThemeGradient = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    switch (theme) {
      case 'forest': return 'bg-forest-gradient';
      case 'garden': return 'bg-garden-gradient';
      default: return 'bg-ocean-gradient';
    }
  };

  const getThemeColors = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    switch (theme) {
      case 'forest': return {
        primary: 'text-forest-deep',
        secondary: 'text-forest-pine',
        accent: 'bg-forest-sage hover:bg-forest-pine',
        muted: 'text-forest-sage'
      };
      case 'garden': return {
        primary: 'text-green-800',
        secondary: 'text-green-700',
        accent: 'bg-green-600 hover:bg-green-700',
        muted: 'text-green-600'
      };
      default: return {
        primary: 'text-blue-800',
        secondary: 'text-blue-700',
        accent: 'bg-blue-600 hover:bg-blue-700',
        muted: 'text-blue-600'
      };
    }
  };

  const colors = getThemeColors();

  return (
    <div className={`min-h-screen ${getThemeGradient()}`}>
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Navigation />
      
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${colors.primary} mb-2`}>
            ⚙️ Admin Dashboard
          </h1>
          <p className={colors.secondary}>
            Growth App System Overview & Management
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-lg p-1" role="tablist">
            <Button
              onClick={() => setActiveView('overview')}
              variant={activeView === 'overview' ? 'default' : 'ghost'}
              className={`accessible-button ${activeView === 'overview' 
                ? `${colors.accent} text-white` 
                : `${colors.secondary} hover:${colors.secondary} hover:bg-white/50`
              }`}
              role="tab"
              aria-selected={activeView === 'overview'}
              aria-controls="overview-panel"
            >
              📊 Overview
            </Button>
            <Button
              onClick={() => setActiveView('users')}
              variant={activeView === 'users' ? 'default' : 'ghost'}
              className={`accessible-button ${activeView === 'users' 
                ? `${colors.accent} text-white` 
                : `${colors.secondary} hover:${colors.secondary} hover:bg-white/50`
              }`}
              role="tab"
              aria-selected={activeView === 'users'}
              aria-controls="users-panel"
            >
              👥 User Management
            </Button>
          </div>
        </div>

        {/* Content based on active view */}
        {activeView === 'overview' ? (
          <div id="overview-panel" role="tabpanel" aria-labelledby="overview-tab">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className={getThemeCardClass()}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg ${colors.primary} flex items-center`}>
                    👥 Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${colors.muted} mb-2`}>
                    {adminData.totalUsers.toLocaleString()}
                  </div>
                  <div className={`text-sm ${colors.secondary}`}>
                    {adminData.totalChildren} children, {adminData.totalParents} parents
                  </div>
                </CardContent>
              </Card>

              <Card className={getThemeCardClass()}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg ${colors.primary} flex items-center`}>
                    💰 Total Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${colors.muted} mb-2`}>
                    ${adminData.totalSavings.toLocaleString()}
                  </div>
                  <div className={`text-sm ${colors.secondary}`}>
                    +${adminData.totalMatching.toLocaleString()} matching
                  </div>
                </CardContent>
              </Card>

              <Card className={getThemeCardClass()}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg ${colors.primary} flex items-center`}>
                    📊 Avg per Child
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${colors.muted} mb-2`}>
                    ${adminData.averageSavingsPerChild}
                  </div>
                  <div className={`text-sm ${colors.secondary}`}>
                    Per active child
                  </div>
                </CardContent>
              </Card>

              <Card className={getThemeCardClass()}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg ${colors.primary} flex items-center`}>
                    🔥 Active Streaks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    {adminData.activeStreaks}
                  </div>
                  <div className={`text-sm ${colors.secondary}`}>
                    Children with 3+ day streaks
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Management Sections */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Recent Registrations */}
              <Card className={getThemeCardClass()}>
                <CardHeader>
                  <CardTitle className={colors.primary}>📝 Recent Registrations</CardTitle>
                  <CardDescription>
                    New users and children added to the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {adminData.recentRegistrations.map((registration, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium flex items-center">
                            {registration.role === 'child' ? '🌱' : '👨‍👩‍👧‍👦'} {registration.name}
                            {registration.role === 'child' && registration.age && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">
                                Age {registration.age}
                              </span>
                            )}
                          </p>
                          <p className={`text-sm ${colors.muted} capitalize`}>
                            {registration.role}
                            {registration.role === 'child' && registration.parentName && (
                              <span className="text-gray-500"> • Parent: {registration.parentName}</span>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm ${colors.secondary}`}>
                            {new Date(registration.date).toLocaleDateString()}
                          </p>
                          <Badge variant={registration.verified ? "default" : "secondary"}>
                            {registration.verified ? "✓ Verified" : "⏳ Pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card className={getThemeCardClass()}>
                <CardHeader>
                  <CardTitle className={colors.primary}>🏆 Top Savers</CardTitle>
                  <CardDescription>
                    Children with highest savings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {adminData.topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </div>
                          <div>
                            <p className="font-medium">{performer.name}</p>
                            <p className={`text-sm ${colors.muted}`}>Level {performer.level}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${colors.primary}`}>
                            ${performer.savings}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className={getThemeCardClass()}>
                <CardHeader>
                  <CardTitle className={colors.primary}>⚡ System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={colors.secondary}>Server Health</span>
                      <Badge className={colors.accent}>✓ Healthy</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={colors.secondary}>Database</span>
                      <Badge className={colors.accent}>✓ Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={colors.secondary}>API Response</span>
                      <Badge className={colors.accent}>{"< 200ms"}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={getThemeCardClass()}>
                <CardHeader>
                  <CardTitle className={colors.primary}>📈 Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${colors.secondary}`}>User Growth</span>
                        <span className="text-sm font-medium">+15%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${colors.secondary}`}>Engagement</span>
                        <span className="text-sm font-medium">+22%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${colors.secondary}`}>Savings Rate</span>
                        <span className="text-sm font-medium">+8%</span>
                      </div>
                      <Progress value={78} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={getThemeCardClass()}>
                <CardHeader>
                  <CardTitle className={colors.primary}>⚠️ Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">
                        {adminData.pendingVerifications} pending verifications
                      </p>
                      <p className="text-xs text-yellow-600">Requires parent approval</p>
                    </div>
                    <div className={`p-3 ${colors.accent.includes('forest') ? 'bg-forest-mist' : 'bg-green-50'} border ${colors.accent.includes('forest') ? 'border-forest-sage' : 'border-green-200'} rounded-lg`}>
                      <p className={`text-sm font-medium ${colors.primary}`}>
                        All systems operational
                      </p>
                      <p className={`text-xs ${colors.muted}`}>No critical issues</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div id="users-panel" role="tabpanel" aria-labelledby="users-tab">
            <UserManagement />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
