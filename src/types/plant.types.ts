export interface Specimen {
  name: string;
  image: string;
  source: 'upload' | 'sample';
}

// Existing frontend response format. The FastAPI response schema is pending.
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

export interface ReportDiagnosis extends DiagnosisResponse {
  advice?: {
    organic: string[];
    chemical: string[];
    prevention: string[];
  };
}

export interface DiagnosisRequest {
  specimen: Specimen;
  file?: File;
}

export interface HerbariumReport {
  diagnosis: ReportDiagnosis;
  specimen: Specimen;
  createdAt?: string;
}
