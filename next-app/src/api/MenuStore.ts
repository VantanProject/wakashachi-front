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

export interface MenuStoreSuccessResponse {
  success: true;
  message: string;
}

export interface MenuStoreErrorResponse {
  success: false;
  errors: string[];
}

export async function MenuStore({
  menu,
}: MenuStoreProps): Promise<MenuStoreSuccessResponse | MenuStoreErrorResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/menu`;
  const token = Cookies.get("AuthToken");
  try {
    const response = await axios.post<
      MenuStoreSuccessResponse | MenuStoreErrorResponse
    >(
      api_url,
      {
        menu: menu,
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
