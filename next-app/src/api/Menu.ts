import axios from "axios";

export interface MenuProps {

}

export interface MenuResponse {

}

export async function Menu() {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/menu`;
    try {
        const response = await axios.get(api_url, {
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
}