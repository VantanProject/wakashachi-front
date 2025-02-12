export interface CompareTranslationProps {
    text:  string;
    sourceId: number;
    targetId: number;
}

export interface CompareTranslationResponse {
    success: boolean;
    results: {
        google: {
            translation: string;
            backTranslation: string;
            totalScore: number;
        },
        deepl: {
            translation: string;
            backTranslation: string;
            totalScore: number;
        }
    }
}
