
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { CheckCircle, XCircle, User, UserPlus, Calendar, Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ApprovalScreen = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pendingRegistrations, setPendingRegistrations] = useState([
    { 
      id: 1, 
      name: 'Emily Johnson', 
      role: 'child', 
      parentName: 'Sarah Garden', 
      date: '2024-01-15', 
      verified: false, 
      age: 8,
      email: 'sarah.garden@email.com'
    },
    { 
      id: 2, 
      name: 'Michael Brown', 
      role: 'parent', 
      date: '2024-01-14', 
      verified: false,
      email: 'michael.brown@email.com'
    },
    { 
      id: 3, 
      name: 'Alex Smith', 
      role: 'child', 
      parentName: 'Michael Brown', 
      date: '2024-01-13', 
      verified: false, 
      age: 10,
      email: 'michael.brown@email.com'
    },
    { 
      id: 4, 
      name: 'Taylor Green', 
      role: 'child', 
      parentName: 'Lisa Green', 
      date: '2024-01-12', 
      verified: false, 
      age: 7,
      email: 'lisa.green@email.com'
    },
    { 
      id: 5, 
      name: 'Jordan Wilson', 
      role: 'parent', 
      date: '2024-01-11', 
      verified: false,
      email: 'jordan.wilson@email.com'
    },
  ]);

  if (!user) return null;

  const handleApprove = (id: number, name: string) => {
    setPendingRegistrations(prev => 
      prev.map(reg => reg.id === id ? { ...reg, verified: true } : reg)
    );
    toast({
      title: "Registration Approved",
      description: `${name} has been successfully approved.`,
    });
  };

  const handleReject = (id: number, name: string) => {
    setPendingRegistrations(prev => 
      prev.filter(reg => reg.id !== id)
    );
    toast({
      title: "Registration Rejected",
      description: `${name}'s registration has been rejected.`,
      variant: "destructive",
    });
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
  const pendingCount = pendingRegistrations.filter(reg => !reg.verified).length;

  return (
    <div className={`min-h-screen ${getThemeGradient()}`}>
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${colors.primary} mb-2 flex items-center justify-center gap-2`}>
            <Shield className="h-8 w-8" />
            Registration Approvals
          </h1>
          <p className={colors.secondary}>
            Review and approve pending user registrations
          </p>
          {pendingCount > 0 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {pendingCount} pending approvals
              </Badge>
            </div>
          )}
        </div>

        {/* Pending Registrations */}
        <Card className={getThemeCardClass()}>
          <CardHeader>
            <CardTitle className={`${colors.primary} flex items-center gap-2`}>
              <UserPlus className="h-5 w-5" />
              Pending Registrations
            </CardTitle>
            <CardDescription>
              Review new user registrations and approve or reject them
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingRegistrations.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className={`text-lg ${colors.secondary}`}>
                  No pending registrations
                </p>
                <p className={`text-sm ${colors.muted}`}>
                  All registrations have been processed
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRegistrations.map((registration) => (
                  <div key={registration.id} className={`p-4 border rounded-lg ${registration.verified ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {registration.role === 'child' ? (
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Shield className="h-5 w-5 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 flex items-center gap-2">
                            {registration.name}
                            {registration.role === 'child' && registration.age && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Age {registration.age}
                              </span>
                            )}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="capitalize flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {registration.role}
                            </span>
                            {registration.role === 'child' && registration.parentName && (
                              <span className="flex items-center gap-1">
                                <Shield className="h-3 w-3" />
                                Parent: {registration.parentName}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(registration.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {registration.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {registration.verified ? (
                          <Badge className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Approved
                          </Badge>
                        ) : (
                          <>
                            <Button
                              onClick={() => handleApprove(registration.id, registration.name)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleReject(registration.id, registration.name)}
                              size="sm"
                              variant="destructive"
                              className="flex items-center gap-1"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ApprovalScreen;
