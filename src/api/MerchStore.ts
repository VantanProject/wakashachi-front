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

export interface MerchStoreResponse {
  success: boolean;
  messages: string[];
}

export async function MerchStore({
  merch,
}: MerchStoreProps): Promise<MerchStoreResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/merch`;
  const authToken = Cookies.get("authToken");
  const formData = new FormData();
  if (merch.imgData) {
    formData.append("merch[imgData]", merch.imgData); // imgData はファイルとして追加
  }

  return await axios
    .post<MerchStoreResponse>(
      apiUrl,
      {
        merch: {
          ...merch,
          imgData: formData.get("merch[imgData]"),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.warn(error);
      return {
        success: false,
        messages: error.response?.data.messages || ["エラーが発生しました"],
      };
    });
}
