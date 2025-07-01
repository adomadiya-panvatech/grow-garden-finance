
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-ocean-gradient">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-4xl">🌊</span>
            <h1 className="text-3xl font-bold text-ocean-deep">Growth App</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/login">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold text-ocean-deep mb-6">
            Dive Into Savings, 
            <span className="text-ocean-coral"> Make Waves!</span>
          </h2>
          <p className="text-xl text-ocean-blue mb-8 max-w-2xl mx-auto">
            A magical underwater world where children learn about saving money by growing beautiful coral reefs. 
            Every dollar saved makes your ocean paradise flourish! 🐠
          </p>
          
          <div className="flex justify-center space-x-4 mb-12">
            <Link to="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                🌊 Start Swimming
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary/10">
              🐠 View Demo
            </Button>
          </div>

          {/* Animated Ocean Preview */}
          <div className="relative max-w-md mx-auto ocean-card p-8">
            <div className="bg-ocean-depth rounded-lg p-6 relative overflow-hidden">
              <div className="flex justify-center space-x-4 relative z-10">
                <div className="plant-container animate-grow" style={{ animationDelay: '0.2s' }}>
                  <div className="text-6xl animate-wave">🐠</div>
                </div>
                <div className="plant-container animate-grow" style={{ animationDelay: '0.4s' }}>
                  <div className="text-6xl animate-float">🪸</div>
                </div>
                <div className="plant-container animate-grow" style={{ animationDelay: '0.6s' }}>
                  <div className="text-6xl animate-bounce-gentle">🐙</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/20 to-transparent opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-center text-ocean-deep mb-12">
          Why Kids Love Growth App
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="ocean-card transform hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4 animate-wave">🪸</div>
              <CardTitle className="text-ocean-deep">Virtual Ocean</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-ocean-blue text-center">
                Watch your coral reef grow as you save! Each deposit makes your ocean more vibrant.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="ocean-card transform hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4 animate-coin-flip">🪙</div>
              <CardTitle className="text-ocean-deep">Real Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-ocean-blue text-center">
                Earn 5% matching on your savings plus unlock new sea creatures and achievements!
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="ocean-card transform hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4 animate-sparkle">🎮</div>
              <CardTitle className="text-ocean-deep">Fun Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-ocean-blue text-center">
                Play ocean games, earn badges, and learn about money in the most fun way possible!
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Parent Section */}
      <section className="bg-white/20 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-ocean-deep mb-6">
              Parents Love It Too! 👨‍👩‍👧‍👦
            </h3>
            <p className="text-xl text-ocean-blue mb-8">
              Get complete visibility into your child's progress with verification tools, 
              discussion prompts, and milestone celebrations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="ocean-card p-6">
                <h4 className="text-2xl font-bold text-ocean-deep mb-4">🔍 Track Progress</h4>
                <p className="text-ocean-blue">
                  Monitor savings, verify deposits, and celebrate milestones together.
                </p>
              </div>
              <div className="ocean-card p-6">
                <h4 className="text-2xl font-bold text-ocean-deep mb-4">💬 Start Conversations</h4>
                <p className="text-ocean-blue">
                  Get prompts and activities to discuss financial literacy at the right moments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl font-bold text-ocean-deep mb-6">
            Ready to Dive In? 🌊
          </h3>
          <p className="text-xl text-ocean-blue mb-8">
            Join thousands of families already swimming toward their financial future together!
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-xl px-12 py-6">
              🌊 Create Your Ocean
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean-deep text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🌊</span>
            <span className="text-xl font-bold">Growth App</span>
          </div>
          <p className="text-blue-200">
            Diving deep into financial literacy, one wave at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
