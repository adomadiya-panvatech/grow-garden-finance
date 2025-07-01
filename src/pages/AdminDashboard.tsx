
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';

const AdminDashboard = () => {
  const { user } = useAuth();

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
      { name: 'Emily Johnson', role: 'child', date: '2024-01-15', verified: true },
      { name: 'Michael Brown', role: 'parent', date: '2024-01-14', verified: false },
      { name: 'Sarah Wilson', role: 'child', date: '2024-01-13', verified: true },
    ],
    pendingVerifications: 12,
    topPerformers: [
      { name: 'Alex Garden', savings: 245.50, level: 8 },
      { name: 'Jamie Smith', savings: 198.25, level: 7 },
      { name: 'Taylor Green', savings: 156.80, level: 6 },
    ]
  };

  return (
    <div className="min-h-screen bg-garden-gradient">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            ⚙️ Admin Dashboard
          </h1>
          <p className="text-green-700">
            Growth App System Overview
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                👥 Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {adminData.totalUsers.toLocaleString()}
              </div>
              <div className="text-sm text-green-700">
                {adminData.totalChildren} children, {adminData.totalParents} parents
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                💰 Total Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${adminData.totalSavings.toLocaleString()}
              </div>
              <div className="text-sm text-green-700">
                +${adminData.totalMatching.toLocaleString()} matching
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                📊 Avg per Child
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${adminData.averageSavingsPerChild}
              </div>
              <div className="text-sm text-green-700">
                Per active child
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                🔥 Active Streaks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {adminData.activeStreaks}
              </div>
              <div className="text-sm text-green-700">
                Children with 3+ day streaks
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Recent Registrations */}
          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">📝 Recent Registrations</CardTitle>
              <CardDescription>
                New users awaiting verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {adminData.recentRegistrations.map((registration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{registration.name}</p>
                      <p className="text-sm text-green-600 capitalize">{registration.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-700">
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
          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">🏆 Top Savers</CardTitle>
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
                        <p className="text-sm text-green-600">Level {performer.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-800">
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
          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">⚡ System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Server Health</span>
                  <Badge className="bg-green-600">✓ Healthy</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Database</span>
                  <Badge className="bg-green-600">✓ Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">API Response</span>
                  <Badge className="bg-green-600">{"< 200ms"}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">📈 Growth Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-green-700">User Growth</span>
                    <span className="text-sm font-medium">+15%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-green-700">Engagement</span>
                    <span className="text-sm font-medium">+22%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-green-700">Savings Rate</span>
                    <span className="text-sm font-medium">+8%</span>
                  </div>
                  <Progress value={78} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">⚠️ Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">
                    {adminData.pendingVerifications} pending verifications
                  </p>
                  <p className="text-xs text-yellow-600">Requires parent approval</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    All systems operational
                  </p>
                  <p className="text-xs text-green-600">No critical issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
