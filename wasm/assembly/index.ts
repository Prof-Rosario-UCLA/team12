export function findMatchingIngredients(pantryItems: string[], recipeIngredients: string[]): string[] {
    // fuzzy matching algorithm
    const matched: string[] = [];
    for (let i = 0; i < recipeIngredients.length; i++) {
        const recipeIng = recipeIngredients[i].toLowerCase();
        for (let j = 0; j < pantryItems.length; j++) {
            const pantryItem = pantryItems[j].toLowerCase();
            if (recipeIng.includes(pantryItem) || pantryItem.includes(recipeIng)) {
                matched.push(recipeIngredients[i]);
                break;
            }
        }
    }
    return matched;
}