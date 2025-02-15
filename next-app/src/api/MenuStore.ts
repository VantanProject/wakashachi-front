import axios from "axios";
import Cookies from "js-cookie";

export interface MenuStoreProps {
  menu: {
    name: string;
    color: string;
    pages: Array<{
      count: number;
      items: Array<
        | {
            type: "merch";
            merchId: number;
            width: number;
            height: number;
            top: number;
            left: number;
          }
        | {
            type: "text";
            color: string;
            width: number;
            height: number;
            top: number;
            left: number;
            translations: Array<{
              languageId: number;
              text: string;
            }>;
          }
      >;
    }>;
  };
}

export interface MenuStoreResponse {
  success: boolean;
  messages: string[];
}

export async function MenuStore({
  menu,
}: MenuStoreProps): Promise<MenuStoreResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/menu`;
  const authToken = Cookies.get("authToken");
  return await axios
    .post<MenuStoreResponse>(
      apiUrl,
      {
        menu: menu,
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
        messages: error.response?.data.messages || ["エラーが発生しました"],
      };
    });
}
