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
        updatedAt: string;
    }>
    ids: number[];
    lastPage: number;
}

export async function MenuIndex({ search }: MenuIndexProps): Promise<MenuIndexResponse> {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/menu`;
    const authToken = Cookies.get("authToken");
    try {
        const response = await axios.get<MenuIndexResponse>(apiUrl, {
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
            menus: [],
            ids: [],
            lastPage: 0,
        };
    }
}