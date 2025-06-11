import { useMealPlan } from '@/context/MealPlanContext';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const nutrientKeys = ['Calories', 'Protein', 'Fat', 'Carbohydrates'];

const MealPlanPage = () => {
  const { recipes, removeRecipe, clearPlan } = useMealPlan();

  const totals = recipes.reduce<{ [key: string]: number }>((acc, recipe) => {
    nutrientKeys.forEach((key) => {
      const nutrient = recipe.nutrition?.nutrients?.find((n: any) => n.name === key);
      if (nutrient) {
        acc[key] = (acc[key] || 0) + nutrient.amount;
      }
    });
    return acc;
  }, {});

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Meal Plan</h1>
          {recipes.length > 0 && (
            <Button variant="destructive" onClick={clearPlan}>Clear Plan</Button>
          )}
        </div>

        {recipes.length === 0 ? (
          <p className="text-muted-foreground">You haven't added any recipes to your meal plan yet.</p>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="flex flex-col">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{recipe.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto p-4 flex justify-end">
                    <Button size="icon" variant="outline" onClick={() => removeRecipe(recipe.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Nutrition Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        {nutrientKeys.map((key) => (
                          <th key={key} className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        {nutrientKeys.map((key) => (
                          <td key={key} className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-100">{totals[key]?.toFixed(0) || '-'} {key === 'Calories' ? 'kcal' : 'g'}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </>
  );
};

export default MealPlanPage; 