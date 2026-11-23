import type { DiagnosisResponse, Specimen } from '../types/plant.types';

export const previewDuration = 4400;

export async function previewDiagnosis(specimen: Specimen): Promise<DiagnosisResponse> {
  await new Promise(resolve => window.setTimeout(resolve, previewDuration));

  return {
    specimen: { name: specimen.name, source: specimen.source },
    status: 'illustrative',
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
