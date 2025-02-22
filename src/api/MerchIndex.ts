import axios from "axios";
import Cookies from "js-cookie";

export interface MerchIndexProps {
    search: {
        name: string;
        allergyIds: number[];
        currentPage: number;
    }
}

export interface MerchIndexResponse {
    success: boolean;
    merches: Array<{
        id: number;
        name: string;
        url: string;
        allergyNames: string[];
        price: number;
        updatedAt: string;
        translations: Array<{
            languageId: number;
            name: string;
        }>
    }>
    ids: number[];
    lastPage: number;
}

export async function MerchIndex({ search }: MerchIndexProps): Promise<MerchIndexResponse> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/merch`;
    const authToken = Cookies.get("authToken");
    try {
        const response = await axios.get<MerchIndexResponse>(apiUrl, {
            params: {
                search: search
            },
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            merches: [],
            ids: [],
            lastPage: 0,
        };
    }
}