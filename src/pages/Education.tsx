
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const Education = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});

  if (!user) return null;

  const games = [
    {
      id: 1,
      title: 'Coin Counter',
      description: 'Practice counting coins and making change',
      emoji: '🪙',
      difficulty: 'Easy',
      points: 10,
      ageGroup: '5-8'
    },
    {
      id: 2,
      title: 'Savings Sprint',
      description: 'Race to reach your savings goal!',
      emoji: '🏃‍♂️',
      difficulty: 'Medium',
      points: 20,
      ageGroup: '8-12'
    },
    {
      id: 3,
      title: 'Budget Builder',
      description: 'Learn to plan and manage a monthly budget',
      emoji: '📊',
      difficulty: 'Hard',
      points: 30,
      ageGroup: '12-15'
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: 'Money Basics',
      questions: [
        {
          question: 'What is the best way to keep your money safe?',
          options: ['Under your pillow', 'In a piggy bank', 'In a savings account', 'In your pocket'],
          correct: 2
        },
        {
          question: 'What does it mean to "earn" money?',
          options: ['Find it on the ground', 'Get it for doing work', 'Ask your parents', 'Wish for it'],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: 'Saving Smart',
      questions: [
        {
          question: 'Why is it important to save money?',
          options: ['For future needs', 'To buy anything you want', 'Because parents say so', 'It\'s not important'],
          correct: 0
        },
        {
          question: 'What is a savings goal?',
          options: ['A type of bank', 'Something you want to buy', 'A money counting game', 'A coin'],
          correct: 1
        }
      ]
    }
  ];

  const facts = [
    {
      emoji: '🐷',
      title: 'Why Piggy Banks?',
      content: 'Piggy banks got their name from "pygg" clay, which was used to make jars for saving coins!'
    },
    {
      emoji: '💎',
      title: 'Compound Interest',
      content: 'When you save money, it can grow by earning interest - like your plants growing in the garden!'
    },
    {
      emoji: '🏛️',
      title: 'First Bank',
      content: 'The first bank was created over 600 years ago in Italy. Banks help keep money safe!'
    },
    {
      emoji: '💡',
      title: 'Smart Spending',
      content: 'Before buying something, ask: "Do I need it or want it?" Needs come first!'
    }
  ];

  const handleGamePlay = (gameId: number) => {
    toast({
      title: "Game Started! 🎮",
      description: "Have fun learning about money!",
    });
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex.toString()
    }));
  };

  const handleQuizSubmit = (quiz: any) => {
    let correct = 0;
    quiz.questions.forEach((q: any, index: number) => {
      if (parseInt(quizAnswers[index]) === q.correct) {
        correct++;
      }
    });

    const percentage = (correct / quiz.questions.length) * 100;
    
    toast({
      title: percentage >= 80 ? "Excellent! 🌟" : percentage >= 60 ? "Good job! 👍" : "Keep learning! 📚",
      description: `You got ${correct}/${quiz.questions.length} questions right!`,
    });

    setSelectedQuiz(null);
    setQuizAnswers({});
  };

  return (
    <div className="min-h-screen bg-garden-gradient">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            📚 Learn & Play
          </h1>
          <p className="text-green-700">
            Fun games and quizzes to grow your money knowledge! 🧠
          </p>
        </div>

        {/* Mini Games */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            🎮 Money Games
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="garden-card transform hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4 animate-bounce-gentle">
                    {game.emoji}
                  </div>
                  <CardTitle className="text-green-800">{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex justify-center space-x-2 mb-4">
                    <Badge variant="outline">{game.difficulty}</Badge>
                    <Badge variant="outline">Ages {game.ageGroup}</Badge>
                  </div>
                  <div className="mb-4">
                    <span className="text-sm text-green-700">Earn: </span>
                    <span className="font-bold text-green-800">{game.points} points</span>
                  </div>
                  <Button 
                    onClick={() => handleGamePlay(game.id)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    🎮 Play Game
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quizzes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            🧠 Knowledge Quizzes
          </h2>
          
          {selectedQuiz === null ? (
            <div className="grid md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="garden-card">
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center">
                      📝 {quiz.title}
                    </CardTitle>
                    <CardDescription>
                      {quiz.questions.length} questions about money management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setSelectedQuiz(quiz.id)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="garden-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-green-800">
                  📝 {quizzes.find(q => q.id === selectedQuiz)?.title}
                </CardTitle>
                <Progress value={((Object.keys(quizAnswers).length) / (quizzes.find(q => q.id === selectedQuiz)?.questions.length || 1)) * 100} />
              </CardHeader>
              <CardContent>
                {quizzes.find(q => q.id === selectedQuiz)?.questions.map((question, qIndex) => (
                  <div key={qIndex} className="mb-6">
                    <h3 className="font-medium text-green-800 mb-4">
                      {qIndex + 1}. {question.question}
                    </h3>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleQuizAnswer(qIndex, oIndex)}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            quizAnswers[qIndex] === oIndex.toString()
                              ? 'bg-green-100 border-green-500'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => {
                      setSelectedQuiz(null);
                      setQuizAnswers({});
                    }}
                    variant="outline"
                    className="border-green-600 text-green-600"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => handleQuizSubmit(quizzes.find(q => q.id === selectedQuiz))}
                    disabled={Object.keys(quizAnswers).length < (quizzes.find(q => q.id === selectedQuiz)?.questions.length || 0)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Submit Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Fun Facts */}
        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            💡 Fun Money Facts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {facts.map((fact, index) => (
              <Card key={index} className="garden-card">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center space-x-2">
                    <span className="text-3xl">{fact.emoji}</span>
                    <span>{fact.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700">{fact.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Education;
