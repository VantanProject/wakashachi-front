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
    }>
    ids: number[];
    lastPage: number;
}

export async function MerchIndex({ search }: MerchIndexProps): Promise<MerchIndexResponse> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/merch`;
    const token = Cookies.get("AuthToken");
    try {
        const response = await axios.get<MerchIndexResponse>(api_url, {
            params: {
                search: search
            },
            headers: {
                Authorization: `Bearer ${token}`,
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