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
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/menu`;
  const authToken = Cookies.get("authToken");
  try {
    const response = await axios.delete<MenuDestroyResponse>(apiUrl, {
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
