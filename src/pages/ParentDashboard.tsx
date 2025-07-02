
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import { Plus } from 'lucide-react';

const ParentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);
  const [newChild, setNewChild] = useState({
    name: '',
    age: '',
    notes: ''
  });

  if (!user) return null;

  // Mock child data - in real app, this would come from API
  const childData = {
    name: 'Alex Garden',
    totalSavings: 45.50,
    level: 3,
    streak: 7,
    recentDeposits: [
      { date: '2024-01-15', amount: 5.00, description: 'Allowance', verified: false },
      { date: '2024-01-10', amount: 10.00, description: 'Birthday money', verified: true },
      { date: '2024-01-05', amount: 2.50, description: 'Chores', verified: true },
    ],
    achievements: ['First Deposit', 'Week Warrior', 'Plant Parent'],
    currentPlant: { name: 'Sunflower', stage: 'growing', emoji: '🌻' }
  };

  const handleAddChild = () => {
    if (!newChild.name || !newChild.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In real app, this would be an API call
    console.log('Adding new child:', {
      parentId: user.id,
      parentName: user.name,
      name: newChild.name,
      age: parseInt(newChild.age),
      notes: newChild.notes,
      createdAt: new Date().toISOString()
    });

    toast({
      title: "Success! 🌱",
      description: `${newChild.name} has been added to your family account!`
    });

    setNewChild({ name: '', age: '', notes: '' });
    setIsAddChildOpen(false);
  };

  return (
    <div className="min-h-screen bg-garden-gradient">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            👨‍👩‍👧‍👦 Parent Dashboard
          </h1>
          <p className="text-green-700">
            Track {childData.name}'s financial growth journey
          </p>
        </div>

        {/* Add Child Button */}
        <div className="flex justify-end mb-6">
          <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Child
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Child</DialogTitle>
                <DialogDescription>
                  Add a child to your family account to start their savings journey.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="child-name">Child's Name *</Label>
                  <Input
                    id="child-name"
                    value={newChild.name}
                    onChange={(e) => setNewChild({...newChild, name: e.target.value})}
                    placeholder="Enter child's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="child-age">Age *</Label>
                  <Input
                    id="child-age"
                    type="number"
                    min="3"
                    max="18"
                    value={newChild.age}
                    onChange={(e) => setNewChild({...newChild, age: e.target.value})}
                    placeholder="Enter child's age"
                  />
                </div>
                <div>
                  <Label htmlFor="child-notes">Notes (Optional)</Label>
                  <Input
                    id="child-notes"
                    value={newChild.notes}
                    onChange={(e) => setNewChild({...newChild, notes: e.target.value})}
                    placeholder="Interests, goals, or special notes"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddChildOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddChild} className="bg-green-600 hover:bg-green-700">
                    Add Child
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Child Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                💰 Total Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${childData.totalSavings.toFixed(2)}
              </div>
              <div className="text-sm text-green-700">
                +${(childData.totalSavings * 0.05).toFixed(2)} matching bonus
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800 flex items-center">
                🏆 Level {childData.level}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={((childData.totalSavings % 20) / 20) * 100} className="mb-2" />
              <div className="text-sm text-green-700">
                ${(childData.totalSavings % 20).toFixed(2)} / $20.00 to next level
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
                {childData.streak} days
              </div>
              <div className="text-sm text-green-700">
                Consistent saver!
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Plant */}
        <Card className="garden-card mb-8 max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="text-8xl mb-4 animate-bounce-gentle">
              {childData.currentPlant.emoji}
            </div>
            <CardTitle className="text-green-800">
              {childData.currentPlant.name}
            </CardTitle>
            <CardDescription>
              Current stage: {childData.currentPlant.stage}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Pending Verifications */}
        <Card className="garden-card mb-8">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              ⏳ Pending Verifications
            </CardTitle>
            <CardDescription>
              Deposits waiting for your approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {childData.recentDeposits
                .filter(deposit => !deposit.verified)
                .map((deposit, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <div>
                      <p className="font-medium text-green-800">
                        ${deposit.amount.toFixed(2)} - {deposit.description}
                      </p>
                      <p className="text-sm text-green-600">
                        {new Date(deposit.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        ✓ Verify
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                        ✗ Deny
                      </Button>
                    </div>
                  </div>
                ))}
              {childData.recentDeposits.filter(d => !d.verified).length === 0 && (
                <p className="text-green-600 italic text-center py-4">
                  No pending verifications! 🎉
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">📊 Recent Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {childData.recentDeposits.map((deposit, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">${deposit.amount.toFixed(2)}</p>
                      <p className="text-sm text-green-600">{deposit.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-700">
                        {new Date(deposit.date).toLocaleDateString()}
                      </p>
                      <Badge variant={deposit.verified ? "default" : "secondary"}>
                        {deposit.verified ? "✓ Verified" : "⏳ Pending"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">🏅 Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {childData.achievements.map((achievement, index) => (
                  <Badge key={index} className="achievement-badge mr-2 mb-2">
                    {achievement}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Discussion Prompts */}
        <Card className="garden-card">
          <CardHeader>
            <CardTitle className="text-green-800">💬 Discussion Prompts</CardTitle>
            <CardDescription>
              Great conversation starters for your next chat with {childData.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-medium text-blue-800 mb-2">🎯 Goal Setting</h4>
                <p className="text-blue-700">
                  "I noticed you're level {childData.level} now! What would you like to save up for next?"
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <h4 className="font-medium text-green-800 mb-2">🌱 Growth Mindset</h4>
                <p className="text-green-700">
                  "Your {childData.currentPlant.name} is {childData.currentPlant.stage}! How does it feel to watch it grow as you save?"
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                <h4 className="font-medium text-purple-800 mb-2">💡 Learning Moment</h4>
                <p className="text-purple-700">
                  "You've saved ${childData.totalSavings.toFixed(2)} so far. What's something new you've learned about money?"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
