import { SelectItem } from "@/components/Select";
import axios from "axios";
import Cookies from "js-cookie";

export interface AllergySelectResponse {
  success: boolean;
  allergies: SelectItem[];
}

export async function AllergySelect(): Promise<AllergySelectResponse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/allergy/select`;
  const authToken = Cookies.get("authToken");

  return await axios
    .get<AllergySelectResponse>(apiUrl, {
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
        allergies: [],
      };
    });
}
