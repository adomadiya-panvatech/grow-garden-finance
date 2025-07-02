
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useGrowth } from '@/contexts/GrowthContext';
import Navigation from '@/components/Navigation';

const Dashboard = () => {
  const { user } = useAuth();
  const { totalSavings, currentLevel, plants, selectedPlant } = useGrowth();

  if (!user) return null;

  const nextLevelTarget = currentLevel * 20;
  const progressToNextLevel = ((totalSavings % 20) / 20) * 100;

  return (
    <div className="min-h-screen bg-garden-gradient">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-gentle">{user.avatar}</div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Welcome back, {user.name}! 🌱
          </h1>
          <p className="text-green-700">
            Your garden is looking amazing! Keep growing! 
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                🪙 Total Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${totalSavings.toFixed(2)}
              </div>
              <div className="text-sm text-green-700">
                +${(totalSavings * 0.05).toFixed(2)} matching bonus
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                🏆 Level {currentLevel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={progressToNextLevel} className="mb-2" />
              <div className="text-sm text-green-700">
                ${(totalSavings % 20).toFixed(2)} / $20.00 to next level
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                🔥 Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {user.streak} days
              </div>
              <div className="text-sm text-green-700">
                Keep it up!
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                🌱 Your Garden
              </CardTitle>
              <CardDescription>
                {selectedPlant ? `Growing your ${selectedPlant.name}` : 'Select a plant to start growing!'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                {selectedPlant ? (
                  <div className="text-8xl animate-bounce-gentle">
                    {selectedPlant.emoji}
                  </div>
                ) : (
                  <div className="text-6xl opacity-50">🪴</div>
                )}
              </div>
              <Link to="/garden">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  🌿 Visit Garden
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                💰 Add Savings
              </CardTitle>
              <CardDescription>
                Log your latest savings and watch your garden grow!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    +$1
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    +$5
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    +$10
                  </Button>
                </div>
                <Link to="/garden">
                  <Button className="w-full bg-green-600 hover:bg-green-700 mt-3">
                    💰 Add Custom Amount
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="garden-card mb-8">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              🏅 Your Achievements
            </CardTitle>
            <CardDescription>
              You've earned {user.badges.length} badges so far!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <Badge key={index} className="achievement-badge">
                  {badge}
                </Badge>
              ))}
              {user.badges.length === 0 && (
                <p className="text-green-600 italic">
                  Start saving to earn your first badge! 🌟
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Learning Section */}
        <Card className="garden-card">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              📚 Learn & Play
            </CardTitle>
            <CardDescription>
              Fun activities to learn about money!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/learn">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  🎮 Mini Games
                </Button>
              </Link>
              <Link to="/learn">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                  🧠 Quiz Time
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
