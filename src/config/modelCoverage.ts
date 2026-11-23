export interface PlantCoverage {
  plant: string;
  classes: readonly string[];
}

export const plantVillageClassCount = 38;

// Placeholder until the exact PlantVillage class labels used for training is available.
// Group its exact output labels by plant, including each healthy-condition label.
export const supportedPlants: readonly PlantCoverage[] = [];
