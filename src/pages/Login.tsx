
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (role: UserRole) => {
    setLoading(true);
    try {
      const success = await login(email, password, role);
      if (success) {
        toast({
          title: "Welcome back! 🌱",
          description: "Let's continue growing your garden!",
        });
        
        // Navigate based on role
        switch (role) {
          case 'child':
            navigate('/dashboard');
            break;
          case 'parent':
            navigate('/parent');
            break;
          case 'admin':
            navigate('/admin');
            break;
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-garden-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-green-800 hover:text-green-600">
            <span className="text-4xl">🌱</span>
            <span className="text-2xl font-bold">Growth App</span>
          </Link>
          <p className="text-green-700 mt-2">Welcome back to your garden!</p>
        </div>

        <Card className="garden-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-800">Sign In</CardTitle>
            <CardDescription className="text-green-600">
              Choose your role and enter your garden
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="child" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="child" className="text-sm">
                  🌱 Child
                </TabsTrigger>
                <TabsTrigger value="parent" className="text-sm">
                  🌻 Parent
                </TabsTrigger>
                <TabsTrigger value="admin" className="text-sm">
                  🌳 Admin
                </TabsTrigger>
              </TabsList>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <TabsContent value="child">
                <div className="space-y-4">
                  <div className="garden-card p-3 text-center">
                    <p className="text-sm text-green-700 mb-2">Demo Account:</p>
                    <p className="text-xs text-green-600">child@demo.com / password</p>
                  </div>
                  <Button 
                    onClick={() => handleLogin('child')} 
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {loading ? '🌱 Growing...' : '🌱 Enter My Garden'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="parent">
                <div className="space-y-4">
                  <div className="garden-card p-3 text-center">
                    <p className="text-sm text-green-700 mb-2">Demo Account:</p>
                    <p className="text-xs text-green-600">parent@demo.com / password</p>
                  </div>
                  <Button 
                    onClick={() => handleLogin('parent')} 
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {loading ? '🌻 Loading...' : '🌻 Parent Dashboard'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="admin">
                <div className="space-y-4">
                  <div className="garden-card p-3 text-center">
                    <p className="text-sm text-green-700 mb-2">Demo Account:</p>
                    <p className="text-xs text-green-600">admin@demo.com / password</p>
                  </div>
                  <Button 
                    onClick={() => handleLogin('admin')} 
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {loading ? '🌳 Connecting...' : '🌳 Admin Panel'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-sm text-green-600">
                New to Growth App?{' '}
                <Link to="/register" className="font-medium hover:underline">
                  Plant your first seed
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-green-600 hover:text-green-800 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
