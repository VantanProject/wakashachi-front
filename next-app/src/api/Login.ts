import axios from "axios";

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginResponseTrue {
    success: true;
    token: string;
}

export interface LoginResponseFalse {
    success: false;
}

export const Login = async ({
    email,
    password,
}: LoginProps): Promise<LoginResponseTrue | LoginResponseFalse> => {
    const api_url = `${process.env.NEXT_PUBLIC_API_URL}/login`;

    try {
        const response = await axios.post<LoginResponseTrue | LoginResponseFalse>(api_url, {
            email: email,
            password: password,
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
        };
    }
};
