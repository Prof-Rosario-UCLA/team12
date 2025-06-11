export interface MealPlanRecipe {
  id: number;
  title: string;
  image: string;
  nutrition?: any;
}

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

interface MealPlanContextProps {
  recipes: MealPlanRecipe[];
  addRecipeById: (id: number) => Promise<void>;
  removeRecipe: (id: number) => void;
  clearPlan: () => void;
}

const MealPlanContext = createContext<MealPlanContextProps | undefined>(undefined);

export const useMealPlan = () => {
  const ctx = useContext(MealPlanContext);
  if (!ctx) throw new Error('useMealPlan must be used within MealPlanProvider');
  return ctx;
};

export const MealPlanProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<MealPlanRecipe[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('mealPlanRecipes');
    if (stored) {
      setRecipes(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mealPlanRecipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipeById = async (id: number) => {
    if (recipes.some(r => r.id === id)) return;
    try {
      const { data } = await axios.get(`/api/recipes/${id}`, { withCredentials: true });
      setRecipes(prev => [...prev, data]);
    } catch (err) {
      console.error('Failed to add recipe to meal plan', err);
    }
  };

  const removeRecipe = (id: number) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  };

  const clearPlan = () => setRecipes([]);

  return (
    <MealPlanContext.Provider value={{ recipes, addRecipeById, removeRecipe, clearPlan }}>
      {children}
    </MealPlanContext.Provider>
  );
}; 