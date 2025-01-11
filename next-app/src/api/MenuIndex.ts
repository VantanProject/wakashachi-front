import axios from "axios";
import Cookies from "js-cookie";

export interface MenuIndexProps {
    search: {
        name: string;
        currentPage: number;
    }
}

export interface MenuIndexResponse {
    success: boolean;
    menus: Array<{
        id: number;
        name: string;
        updated_at: string;
    }>
    ids: number[];
    lastPage: number;
}

export async function MenuIndex({ search }: MenuIndexProps): Promise<MenuIndexResponse> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/menu`;
    const token = Cookies.get("AuthToken");
    try {
        const response = await axios.get<MenuIndexResponse>(api_url, {
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
            menus: [],
            ids: [],
            lastPage: 0,
        };
    }
}