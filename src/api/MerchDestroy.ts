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
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/merch`;
  const authToken = Cookies.get("authToken");
  try {
    const response = await axios.delete<MerchDestroyResponse>(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
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
