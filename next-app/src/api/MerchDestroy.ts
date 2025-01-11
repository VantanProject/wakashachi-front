import axios from "axios";
import Cookies from "js-cookie";

export interface MerchDestroyProps {
  ids: number[];
}

export interface MerchDestroyResponse {
  success: boolean;
  message: string;
}

export async function MerchDestroy({
  ids,
}: MerchDestroyProps): Promise<MerchDestroyResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/merch`;
  const token = Cookies.get("AuthToken");
  try {
    const response = await axios.delete<MerchDestroyResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ids: ids,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: "削除に失敗しました",
    };
  }
}
