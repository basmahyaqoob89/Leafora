import { isAxiosError } from 'axios';
import type { DiagnosisResponse } from '../types/plant.types';
import { axiosInstance } from './axiosInstance';
import { endpoints } from './endpoints';

export async function diagnosePlant(file: File): Promise<DiagnosisResponse> {
  const payload = new FormData();
  payload.append('image', file);
  const { data } = await axiosInstance.post<unknown>(endpoints.diagnosis, payload);
  if (!isDiagnosisResponse(data)) throw new Error('Unexpected diagnosis response');
  const { specimen, status, plantName, predictedCondition, detectedClass, confidence, fieldObservations, careRecommendations } = data;
  return { specimen, status, plantName, predictedCondition, detectedClass, confidence, fieldObservations, careRecommendations };
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isDiagnosisResponse(value: unknown): value is DiagnosisResponse {
  if (!value || typeof value !== 'object') return false;
  const data = value as Record<string, unknown>;
  const specimen = data.specimen as Record<string, unknown> | undefined;
  return data.status === 'complete'
    && typeof specimen?.name === 'string'
    && (specimen.source === 'upload' || specimen.source === 'sample')
    && isStringList(data.fieldObservations)
    && isStringList(data.careRecommendations)
    && ['plantName', 'predictedCondition', 'detectedClass'].every(
      key => data[key] === undefined || typeof data[key] === 'string',
    )
    && (data.confidence === undefined
      || (typeof data.confidence === 'number' && data.confidence >= 0 && data.confidence <= 1));
}

export function getDiagnosisErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) {
    return 'The inspection returned an unexpected result. Please try again.';
  }
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return 'The inspection took too long. Please try again.';
  }
  if (!error.response) {
    return 'Could not reach the inspection service. Check your connection and try again.';
  }
  const { status } = error.response;
  if (status >= 500 || status === 429) {
    return 'The inspection service is temporarily unavailable. Please try again later.';
  }
  if ([400, 413, 415, 422].includes(status)) {
    return 'The inspection service could not accept this image. Try a different JPG, PNG, or WebP image.';
  }
  return 'The inspection request could not be completed. Please try again later.';
}
