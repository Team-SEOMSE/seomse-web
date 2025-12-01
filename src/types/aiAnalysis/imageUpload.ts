export interface AnalysisResult {
    faceShape: string;
    personalColor: string;
}

export interface Recommendations {
    hairColor: { name: string; reason: string };
    hairstyle: { name: string; reason: string };
}

export interface AnalysisResponse {
    statusCode: number;
    data: {
        analysis: AnalysisResult;
        recommendations: Recommendations;
    };
}

export interface UserResponse {
    data: {
        name: string;
    };
}
