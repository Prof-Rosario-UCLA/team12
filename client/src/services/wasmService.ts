let asBindInstance: any;
let wasmError = false;

export const loadWasm = async () => {
    if (wasmError) return null;
    if (asBindInstance) return asBindInstance.exports;
    
    try {
        const { AsBind } = await import("as-bind");
        asBindInstance = await AsBind.instantiate(fetch("/wasm/optimized.wasm"));
        return asBindInstance.exports as any;
    } catch (error) {
        console.warn("WASM loading failed, falling back to basic matching:", error);
        wasmError = true;
        return null;
    }
};

export const findMatchingIngredientsWasm = async (pantry: string[], recipe: string[]): Promise<string[]> => {
    try {
        const exports = await loadWasm();
        if (!exports) {
            return basicFuzzyMatch(pantry, recipe);
        }
        return exports.findMatchingIngredients(pantry, recipe);
    } catch (error) {
        console.warn("WASM matching failed, using fallback:", error);
        return basicFuzzyMatch(pantry, recipe);
    }
};

const basicFuzzyMatch = (pantry: string[], recipe: string[]): string[] => {
    const matches: string[] = [];
    const pantryLower = pantry.map(item => item.toLowerCase());
    
    for (const recipeIngredient of recipe) {
        const recipeLower = recipeIngredient.toLowerCase();
        for (const pantryItem of pantryLower) {
            if (pantryItem.includes(recipeLower) || recipeLower.includes(pantryItem)) {
                const originalItem = pantry[pantryLower.indexOf(pantryItem)];
                if (!matches.includes(originalItem)) {
                    matches.push(originalItem);
                }
            }
        }
    }
    
    return matches;
};