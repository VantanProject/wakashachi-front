import axios from "axios";
import Cookies from "js-cookie";

export interface MerchStoreProps {
  merch: {
    translations: Array<{
      languageId: number;
      name: string;
    }>;
    allergyIds: number[];
    price: number;
    imgData: File;
  };
}

export interface MerchStoreSuccessResponse {
  success: true;
  message: string;
}

export interface MerchStoreErrorResponse {
  success: false;
  errors: string[];
}

export async function MerchStore({
  merch,
}: MerchStoreProps): Promise<MerchStoreSuccessResponse | MerchStoreErrorResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/merch`;
  const token = Cookies.get("AuthToken");
  try {
    const response = await axios.post<
      MerchStoreSuccessResponse | MerchStoreErrorResponse
    >(
      api_url,
      {
        merch: merch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      errors: ["登録に失敗しました。"],
    };
  }
}
