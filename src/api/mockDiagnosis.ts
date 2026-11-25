import type { ReportDiagnosis, Specimen } from '../types/plant.types';

export const previewDuration = 4400;

export async function previewDiagnosis(specimen: Specimen): Promise<ReportDiagnosis> {
  await new Promise(resolve => window.setTimeout(resolve, previewDuration));

  return {
    specimen: { name: specimen.name, source: specimen.source },
    status: 'illustrative',
    plantName: 'Tomato',
    predictedCondition: 'Early blight',
    confidence: 0.92,
    advice: {
      organic: ['Remove affected leaves and keep plant debris away from healthy plants.'],
      chemical: ['Use a fungicide only after confirming the disease and checking that the product is labeled for the crop.'],
      prevention: ['Water at soil level and leave room for air to circulate between plants.'],
    },
    fieldObservations: [
      'Observe where changes in color or texture occur.',
      'Compare older leaves with new growth and look for changes over time.',
    ],
    careRecommendations: [
      'Photograph the same leaf in similar light to track any changes.',
      'Check soil moisture and review the plant’s light and airflow needs.',
    ],
  };
}
