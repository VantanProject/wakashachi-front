import axios from "axios";
import Cookies from "js-cookie";

export interface CompareTranslationProps {
  text: string;
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
    };
    deepl: {
      translation: string;
      backTranslation: string;
      totalScore: number;
    };
  };
}

export async function CompareTranslation({
  text,
  sourceId,
  targetId,
}: CompareTranslationProps): Promise<CompareTranslationResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/compare-translation`;
  const authToken = Cookies.get("authToken");

  return await axios
    .post<CompareTranslationResponse>(
      apiUrl,
      {
        text,
        sourceId,
        targetId,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.warn(error);
      return {
        success: false,
        results: {
          google: {
            translation: "",
            backTranslation: "",
            totalScore: 0,
          },
          deepl: {
            translation: "",
            backTranslation: "",
            totalScore: 0,
          },
        },
      };
    });
}
