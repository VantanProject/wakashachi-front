import { SelectItem } from "@/components/Select";
import axios from "axios";
import Cookies from "js-cookie";

export interface AllergySelectResponse {
  success: boolean;
  allergies: SelectItem[];
}

export async function AllergySelect(): Promise<AllergySelectResponse> {
  const api_url = `${process.env.NEXT_PUBLIC_API_URL}/allergy/select`;
  const token = Cookies.get("AuthToken");

  try {
    const response = await axios.get<AllergySelectResponse>(api_url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return {
      success: false,
      allergies: [],
    };
  }
}