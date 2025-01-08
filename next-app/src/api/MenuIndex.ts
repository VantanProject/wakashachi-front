import axios from "axios";
import Cookie from "js-cookie";

export interface MenuProps {
    search: {
        name: string;
        currentPage: number;
    }
}

export interface MenuResponse {
    success: boolean;
    menus: Array<{
        id: number;
        name: string;
        updated_at: string;
    }>
    ids: number[];
    lastPage: number;
}

export async function MenuIndex({ search }: MenuProps): Promise<MenuResponse> {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/menu`;
    const token = Cookie.get("AuthToken");
    try {
        const response = await axios.get<MenuResponse>(api_url, {
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