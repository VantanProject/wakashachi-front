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
  messages: string[];
}

export async function Login({
  email,
  password,
}: LoginProps): Promise<LoginResponseTrue | LoginResponseFalse> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/login`;

  return await axios
    .post<LoginResponseTrue | LoginResponseFalse>(apiUrl, {
      email: email,
      password: password,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.warn(error);
      return {
        success: false,
        messages: error.response?.data.messages || ["エラーが発生しました"],
      };
    });
}
