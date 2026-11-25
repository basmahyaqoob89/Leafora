import type { HerbariumReport, ReportDiagnosis } from '../types/plant.types';

export const illustrativeDisclaimer = 'Illustrative example — not a real AI prediction';

const adviceTitles = {
  organic: 'Organic Advice',
  chemical: 'Chemical Advice',
  prevention: 'Prevention Advice',
} as const;

export function getAdviceSections({ advice }: ReportDiagnosis) {
  return (Object.keys(adviceTitles) as (keyof typeof adviceTitles)[]).map(key => ({
    title: adviceTitles[key],
    items: advice?.[key] ?? [],
  }));
}

export function getReportDetails({ diagnosis, specimen }: HerbariumReport) {
  const illustrative = diagnosis.status === 'illustrative';
  const { confidence } = diagnosis;

  return {
    illustrative,
    specimenName: diagnosis.specimen?.name || specimen.name || 'Unnamed specimen',
    source: specimen.source === 'sample' ? 'Sample leaf' : 'Uploaded image',
    status: illustrative ? 'Illustrative example' : 'Analysis complete',
    plant: diagnosis.plantName,
    condition: diagnosis.predictedCondition,
    detectedClass: illustrative ? undefined : diagnosis.detectedClass,
    confidence: typeof confidence === 'number' && confidence >= 0 && confidence <= 1
      ? new Intl.NumberFormat('en', { style: 'percent', maximumFractionDigits: 1 }).format(confidence)
      : undefined,
  };
}
