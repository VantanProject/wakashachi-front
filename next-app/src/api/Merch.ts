import axios from "axios";
import Cookie from "js-cookie";

export interface MerchProps {
    search: {
        name: string;
        allergyIds: number[];
        currentPage:  number;
    }
}

export interface MerchResponse {
    success: boolean;
    merchs: Array<{
        id: number;
        name: string;
        allergyIds: number[];
        updated_at: Date;
    }>
    ids: number[];
    lastPage: number;
}

export async function Merch({ }:MerchProps) {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/merch`;
    const token = Cookies.get("AuthToken");
    try {
        const response = await axios.get<MerchResponse>(api_url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },   
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}