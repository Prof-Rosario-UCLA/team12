let asBindInstance: any;

export const loadWasm = async () => {
    if (asBindInstance) return asBindInstance.exports;
    const { AsBind } = await import("as-bind");
    asBindInstance = await AsBind.instantiate(fetch("/wasm/optimized.wasm"));
    return asBindInstance.exports as any;
};

export const findMatchingIngredientsWasm = async (pantry: string[], recipe: string[]): Promise<string[]> => {
    const exports = await loadWasm();
    return exports.findMatchingIngredients(pantry, recipe);
};
