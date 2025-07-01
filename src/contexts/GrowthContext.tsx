
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Plant {
  id: string;
  type: 'flower' | 'tree' | 'herb' | 'fruit';
  name: string;
  stage: 'seed' | 'sprout' | 'growing' | 'mature' | 'blooming';
  value: number;
  emoji: string;
  unlockLevel: number;
}

export interface Savings {
  id: string;
  amount: number;
  date: Date;
  verified: boolean;
  description: string;
}

interface GrowthContextType {
  plants: Plant[];
  selectedPlant: Plant | null;
  savings: Savings[];
  totalSavings: number;
  currentLevel: number;
  addSavings: (amount: number, description: string) => void;
  selectPlant: (plant: Plant) => void;
  getPlantsByLevel: (level: number) => Plant[];
  calculateMatching: (amount: number) => number;
}

const GrowthContext = createContext<GrowthContextType | undefined>(undefined);

export const useGrowth = () => {
  const context = useContext(GrowthContext);
  if (context === undefined) {
    throw new Error('useGrowth must be used within a GrowthProvider');
  }
  return context;
};

const DEFAULT_PLANTS: Plant[] = [
  { id: '1', type: 'flower', name: 'Sunflower', stage: 'seed', value: 0, emoji: '🌻', unlockLevel: 1 },
  { id: '2', type: 'tree', name: 'Oak Tree', stage: 'seed', value: 0, emoji: '🌳', unlockLevel: 2 },
  { id: '3', type: 'herb', name: 'Mint', stage: 'seed', value: 0, emoji: '🌿', unlockLevel: 1 },
  { id: '4', type: 'fruit', name: 'Apple Tree', stage: 'seed', value: 0, emoji: '🍎', unlockLevel: 3 },
  { id: '5', type: 'flower', name: 'Rose', stage: 'seed', value: 0, emoji: '🌹', unlockLevel: 4 },
  { id: '6', type: 'tree', name: 'Pine Tree', stage: 'seed', value: 0, emoji: '🌲', unlockLevel: 5 },
];

export const GrowthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [plants, setPlants] = useState<Plant[]>(DEFAULT_PLANTS);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [savings, setSavings] = useState<Savings[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    if (user) {
      // Load user's savings data
      const storedSavings = localStorage.getItem(`savings_${user.id}`);
      if (storedSavings) {
        const savingsData = JSON.parse(storedSavings);
        setSavings(savingsData);
        const total = savingsData.reduce((sum: number, saving: Savings) => sum + saving.amount, 0);
        setTotalSavings(total);
      }
      
      // Load user's plants data
      const storedPlants = localStorage.getItem(`plants_${user.id}`);
      if (storedPlants) {
        setPlants(JSON.parse(storedPlants));
      }
    }
  }, [user]);

  const currentLevel = Math.floor(totalSavings / 20) + 1; // Level up every $20

  const addSavings = (amount: number, description: string) => {
    if (!user) return;

    const newSaving: Savings = {
      id: Date.now().toString(),
      amount,
      date: new Date(),
      verified: false,
      description
    };

    const updatedSavings = [...savings, newSaving];
    setSavings(updatedSavings);
    setTotalSavings(prev => prev + amount);
    
    localStorage.setItem(`savings_${user.id}`, JSON.stringify(updatedSavings));

    // Update plant growth based on savings
    if (selectedPlant) {
      const updatedPlants = plants.map(plant => {
        if (plant.id === selectedPlant.id) {
          const newValue = plant.value + amount;
          let newStage = plant.stage;
          
          if (newValue >= 50) newStage = 'blooming';
          else if (newValue >= 30) newStage = 'mature';
          else if (newValue >= 15) newStage = 'growing';
          else if (newValue >= 5) newStage = 'sprout';
          
          return { ...plant, value: newValue, stage: newStage };
        }
        return plant;
      });
      
      setPlants(updatedPlants);
      localStorage.setItem(`plants_${user.id}`, JSON.stringify(updatedPlants));
    }
  };

  const selectPlant = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  const getPlantsByLevel = (level: number) => {
    return DEFAULT_PLANTS.filter(plant => plant.unlockLevel <= level);
  };

  const calculateMatching = (amount: number) => {
    return amount * 0.05; // 5% matching
  };

  return (
    <GrowthContext.Provider value={{
      plants,
      selectedPlant,
      savings,
      totalSavings,
      currentLevel,
      addSavings,
      selectPlant,
      getPlantsByLevel,
      calculateMatching
    }}>
      {children}
    </GrowthContext.Provider>
  );
};
