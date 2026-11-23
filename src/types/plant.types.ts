export interface Specimen {
  name: string;
  image: string;
  source: 'upload' | 'sample';
}

export interface DiagnosisResponse {
  plantName?: string;
  predictedCondition?: string;
  detectedClass?: string;
  confidence?: number;
  fieldObservations: string[];
  careRecommendations: string[];
  specimen: Omit<Specimen, 'image'>;
  status: 'illustrative' | 'complete';
}

export interface DiagnosisRequest {
  specimen: Specimen;
  file?: File;
}

export interface HerbariumReport {
  diagnosis: DiagnosisResponse;
  specimen: Specimen;
  createdAt?: string;
}
