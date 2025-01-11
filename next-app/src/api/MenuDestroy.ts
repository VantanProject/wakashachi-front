import axios from "axios";
import Cookies from "js-cookie";

export interface MenuDestroyProps {
  ids: number[];
}

export interface MenuDestroyResponse {
  success: boolean;
  message: string;
}

export async function MenuDestroy({
  ids,
}: MenuDestroyProps): Promise<MenuDestroyResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/menu`;
  const token = Cookies.get("AuthToken");
  try {
    const response = await axios.delete<MenuDestroyResponse>(api_url, {
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
