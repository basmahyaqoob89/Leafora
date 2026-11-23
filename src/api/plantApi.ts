import type { DiagnosisResponse } from '../types/plant.types';
import { axiosInstance } from './axiosInstance';
import { endpoints } from './endpoints';

export async function diagnosePlant(file: File): Promise<DiagnosisResponse> {
  const payload = new FormData();
  payload.append('image', file);
  const { data } = await axiosInstance.post<DiagnosisResponse>(endpoints.diagnosis, payload);
  return data;
}
