import { useMutation } from '@tanstack/react-query';
import { apiBaseUrl } from '../api/axiosInstance';
import { previewDiagnosis } from '../api/mockDiagnosis';
import { diagnosePlant } from '../api/plantApi';
import type { DiagnosisRequest } from '../types/plant.types';

export const reportKey = ['herbarium-report'] as const;

export function usePlantDiagnosis() {
  return useMutation({
    mutationFn: ({ specimen, file }: DiagnosisRequest) =>
      apiBaseUrl && file ? diagnosePlant(file) : previewDiagnosis(specimen),
    gcTime: 0,
  });
}
