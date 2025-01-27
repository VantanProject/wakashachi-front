import axios from "axios";
import Cookies from "js-cookie";

export interface MerchStoreProps {
  merch: {
    translations: Array<{
      languageId: number;
      name: string;
    }>;
    allergyIds: number[];
    price: number | null;
    imgData: File | null;
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
    const formData = new FormData();
    if (merch.imgData) {
      formData.append('merch[imgData]', merch.imgData); // imgData はファイルとして追加
    }

    const response = await axios.post<
      MerchStoreSuccessResponse | MerchStoreErrorResponse
    >(
      api_url,
      {
        merch: {
          ...merch,
          imgData: formData.get("merch[imgData]")
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
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
