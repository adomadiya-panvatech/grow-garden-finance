
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '🌱');

  if (!user) return null;

  const avatars = ['🌱', '🌻', '🌳', '🌿', '🌸', '🌺', '🌹', '🌼', '🌵', '🍀', '🌴', '🌲'];

  const handleSave = () => {
    updateUser({ name, avatar: selectedAvatar });
    setEditing(false);
    toast({
      title: "Profile Updated! ✨",
      description: "Your changes have been saved successfully.",
    });
  };

  const achievements = [
    { name: 'First Deposit', description: 'Made your first savings deposit', date: '2024-01-01', emoji: '🌱' },
    { name: 'Week Warrior', description: 'Saved money for 7 days straight', date: '2024-01-08', emoji: '🔥' },
    { name: 'Plant Parent', description: 'Grew your first plant to maturity', date: '2024-01-10', emoji: '🌳' },
    { name: 'Level Up', description: 'Reached level 3', date: '2024-01-12', emoji: '⭐' },
  ];

  const stats = {
    totalSavings: user.totalSavings || 45.50,
    daysActive: 15,
    plantsGrown: 3,
    badgesEarned: user.badges?.length || 4,
    currentStreak: user.streak || 7,
    level: user.level || 3
  };

  return (
    <div className="min-h-screen bg-garden-gradient">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce-gentle">
            {user.avatar}
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            {user.name}'s Profile
          </h1>
          <p className="text-green-700">
            Manage your account and see your amazing progress! 🌟
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="garden-card mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center justify-between">
              ⚙️ Profile Settings
              <Button 
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                {editing ? '💾 Save' : '✏️ Edit'}
              </Button>
            </CardTitle>
            <CardDescription>
              Customize your Growth App experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editing ? (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Choose Your Avatar</Label>
                  <div className="grid grid-cols-6 gap-3 mt-2">
                    {avatars.map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`text-4xl p-3 rounded-lg border-2 transition-all hover:scale-110 ${
                          selectedAvatar === avatar 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Name:</span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Role:</span>
                  <Badge className="capitalize">{user.role}</Badge>
                </div>
                {user.age && (
                  <div className="flex items-center justify-between">
                    <span className="text-green-700">Age:</span>
                    <span className="font-medium">{user.age} years old</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                💰 Total Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ${stats.totalSavings.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                📅 Days Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.daysActive}
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                🔥 Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">
                {stats.currentStreak} days
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">📊 Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <span>🏆</span>
                    <span className="text-green-700">Current Level</span>
                  </span>
                  <span className="font-bold text-2xl text-green-800">{stats.level}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <span>🌱</span>
                    <span className="text-green-700">Plants Grown</span>
                  </span>
                  <span className="font-bold text-green-800">{stats.plantsGrown}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <span>🏅</span>
                    <span className="text-green-700">Badges Earned</span>
                  </span>
                  <span className="font-bold text-green-800">{stats.badgesEarned}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <span>💎</span>
                    <span className="text-green-700">Matching Earned</span>
                  </span>
                  <span className="font-bold text-green-800">
                    ${(stats.totalSavings * 0.05).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">🏅 Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.slice(0, 4).map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-2xl">{achievement.emoji}</span>
                    <div>
                      <p className="font-medium text-green-800">{achievement.name}</p>
                      <p className="text-sm text-green-600">{achievement.description}</p>
                      <p className="text-xs text-green-500">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Badges */}
        <Card className="garden-card">
          <CardHeader>
            <CardTitle className="text-green-800">🏆 All Your Badges</CardTitle>
            <CardDescription>
              Show off your amazing achievements!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {user.badges && user.badges.length > 0 ? (
                user.badges.map((badge, index) => (
                  <Badge key={index} className="achievement-badge text-lg px-4 py-2">
                    {badge}
                  </Badge>
                ))
              ) : (
                <p className="text-green-600 italic">
                  Start saving to earn your first badge! 🌟
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
