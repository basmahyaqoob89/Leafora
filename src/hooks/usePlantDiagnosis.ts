import { useMutation } from '@tanstack/react-query';
import { apiBaseUrl } from '../api/axiosInstance';
import { previewDiagnosis } from '../api/mockDiagnosis';
import { diagnosePlant } from '../api/plantApi';
import type { DiagnosisRequest, ReportDiagnosis } from '../types/plant.types';

export const reportKey = ['herbarium-report'] as const;

export function usePlantDiagnosis() {
  return useMutation<ReportDiagnosis, Error, DiagnosisRequest>({
    mutationFn: ({ specimen, file }: DiagnosisRequest) =>
      apiBaseUrl && file ? diagnosePlant(file) : previewDiagnosis(specimen),
    retry: false,
    gcTime: 0,
  });
}
