import axios from "axios";
import Cookies from "js-cookie";

export interface MenuShowRequest {
  menuId: string;
}

export interface MenuShowResponse {
  success: boolean;
  menu: {
    name: string;
    color: string;
    pages: Array<{
      count: number;
      items: Array<
        | {
            type: "merch";
            imageUrl: string;
            translations: Array<{
              languageId: number;
              name: string;
            }>;
            allergyNames: string[];
            price: number;
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
  } | null;
}

export async function MenuShow(menuId: number): Promise<MenuShowResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/menu/${menuId}`;
  const authToken = Cookies.get("authToken");

  return await axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.warn(error);
      return {
        success: false,
        menu: null,
      };
    });
}
