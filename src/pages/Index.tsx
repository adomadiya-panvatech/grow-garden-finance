
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-garden-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-4xl">🌱</span>
            <h1 className="text-3xl font-bold text-green-800">Growth Garden</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/login">
              <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold text-green-800 mb-6">
            Plant Seeds of Savings, 
            <span className="text-green-600"> Watch Dreams Grow!</span>
          </h2>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            A magical garden world where children learn about saving money by growing beautiful plants and flowers. 
            Every dollar saved makes your garden paradise flourish! 🌸
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Link to="/login">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                🌱 Start Growing
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-green-600 text-green-600 hover:bg-green-50">
              🌿 View Demo
            </Button>
          </div>

          {/* Animated Garden Preview */}
          <div className="relative max-w-md mx-auto garden-card p-8">
            <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-lg p-6 relative overflow-hidden">
              <div className="flex justify-center space-x-4 relative z-10">
                <div className="plant-container animate-grow" style={{ animationDelay: '0.2s' }}>
                  <div className="text-6xl animate-bounce-gentle">🌻</div>
                </div>
                <div className="plant-container animate-grow" style={{ animationDelay: '0.4s' }}>
                  <div className="text-6xl animate-float">🌳</div>
                </div>
                <div className="plant-container animate-grow" style={{ animationDelay: '0.6s' }}>
                  <div className="text-6xl animate-wave">🌹</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-garden-earth rounded-b-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-200/20 to-transparent opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-center text-green-800 mb-12">
          Why Kids Love Growth Garden
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="garden-card transform hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4 animate-bounce-gentle">🌱</div>
              <CardTitle className="text-green-800">Virtual Garden</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-green-700 text-center">
                Watch your garden bloom as you save! Each deposit helps your plants grow bigger and more beautiful.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="garden-card transform hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4 animate-coin-flip">🪙</div>
              <CardTitle className="text-green-800">Real Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-green-700 text-center">
                Earn 5% matching on your savings plus unlock new plants, flowers, and gardening achievements!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="garden-card transform hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4 animate-sparkle">🎮</div>
              <CardTitle className="text-green-800">Fun Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-green-700 text-center">
                Play garden games, earn green badges, and learn about money in the most natural way possible!
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Parent Section */}
      <section className="bg-white/20 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-green-800 mb-6">
              Parents Love It Too! 👨‍👩‍👧‍👦
            </h3>
            <p className="text-xl text-green-700 mb-8">
              Get complete visibility into your child's progress with verification tools, 
              discussion prompts, and milestone celebrations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="garden-card p-6">
                <h4 className="text-2xl font-bold text-green-800 mb-4">🔍 Track Growth</h4>
                <p className="text-green-700">
                  Monitor savings, verify deposits, and celebrate gardening milestones together.
                </p>
              </div>
              <div className="garden-card p-6">
                <h4 className="text-2xl font-bold text-green-800 mb-4">💬 Plant Ideas</h4>
                <p className="text-green-700">
                  Get prompts and activities to discuss financial literacy while tending your garden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl font-bold text-green-800 mb-6">
            Ready to Plant Your Garden? 🌱
          </h3>
          <p className="text-xl text-green-700 mb-8">
            Join thousands of families already growing toward their financial future together!
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-xl px-12 py-6">
              🌿 Start Your Garden
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-bold">Growth Garden</span>
          </div>
          <p className="text-green-200">
            Growing financial literacy, one seed at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
