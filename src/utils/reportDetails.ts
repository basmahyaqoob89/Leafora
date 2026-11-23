import type { HerbariumReport } from '../types/plant.types';

export const illustrativeDisclaimer = 'Illustrative example — not a real AI prediction';

export function getReportDetails({ diagnosis, specimen }: HerbariumReport) {
  const illustrative = diagnosis.status === 'illustrative';
  const { confidence } = diagnosis;

  return {
    illustrative,
    specimenName: diagnosis.specimen?.name || specimen.name || 'Unnamed specimen',
    source: specimen.source === 'sample' ? 'Sample leaf' : 'Uploaded image',
    status: illustrative ? 'Illustrative example' : 'Analysis complete',
    plant: illustrative ? undefined : diagnosis.plantName,
    condition: illustrative ? undefined : diagnosis.predictedCondition,
    detectedClass: illustrative ? undefined : diagnosis.detectedClass,
    confidence: !illustrative && typeof confidence === 'number' && confidence >= 0 && confidence <= 1
      ? new Intl.NumberFormat('en', { style: 'percent', maximumFractionDigits: 1 }).format(confidence)
      : undefined,
  };
}
