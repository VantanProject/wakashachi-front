"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginApi } from "@/api/Login";

const Login = () => {
    const router = useRouter();
    const [visibility, setVisibility] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({}); // エラーをリセット
    
        const loginData = { email, password };
    
        try {
            const response = await LoginApi(loginData);
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('success', String(response.success));
                router.push('/top');
            }
        } catch (error: any) {
            // バリデーションエラーの場合
            if (error?.status === 422 && error.data?.errors) {
                setErrors(error.data.errors);
            } else {
                setErrors({ password: ['メールアドレスまたはパスワードが正しくありません。'] })
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="max-w-[480px] w-full">
                <Image
                    src="/wakalogo.png"
                    alt="若鯱家のロゴ"
                    width={375}
                    height={375}
                    className="mx-auto mb-6"
                />
                <div className="shadow-form rounded-lg bg-baseColor pb-5 mt-14">
                    <div className="border-b-8 mb-5 border-accentDark">
                        <h1 className="text-2xl text-center text-text p-6">ログイン</h1>
                    </div>
                    <div className="p-4">
                        <form onSubmit={handleLogin} className="space-y-4 px-1 mt-1">
                            {/* メールアドレス */}
                            <div className="group">
                                <label className="block text-base text-text mb-2">メールアドレス</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="peer pl-12 h-[43px] w-full px-4 py-2 border border-textOpacity rounded-md placeholder:text-base placeholder:focus:text-text group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow"
                                        placeholder="user@mail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Image
                                        src="/person.svg"
                                        alt="メールアイコン"
                                        width={16}
                                        height={16}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60 peer-focus:opacity-100 transition-opacity"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="pt-2 text-error text-sm">{errors.email[0]}</p>
                                )}
                            </div>

                            {/* パスワード */}
                            <div className="group">
                                <label className="block text-base text-text mb-2">パスワード</label>
                                <div className="relative">
                                    <input
                                        type={visibility ? "text" : "password"}
                                        className={`peer pl-12 h-[43px] w-full px-4 py-2 border rounded-md placeholder:text-base placeholder:focus:text-text group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${ errors.password ? "border-formError shadow-error" : "border-textOpacity" }`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Image
                                        src="/padlock.svg"
                                        alt="パスワードアイコン"
                                        width={20}
                                        height={20}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60 peer-focus:opacity-100 transition-opacity"
                                    />
                                    <button
                                        onClick={() => setVisibility(!visibility)}
                                        type="button"
                                    >
                                        <Image
                                            src={`/visibility_${visibility ? "open" : "close"}.svg`}
                                            alt="パスワードが見えないアイコン"
                                            width={20}
                                            height={20}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        />
                                    </button>
                                </div>
                                {errors.password && (
                                        <p className="absolute text-formError pt-3 text-error text-xs">{errors.password[0]}</p>
                                )}
                            </div>

                            {/* パスワードを忘れた場合 */}
                            <div className="text-left pt-3 pb-1">
                                <Link
                                    href="#"
                                    className="text-xs text-textOpacity underline hover:text-text transition-colors duration-500"
                                >
                                    パスワードをお忘れの場合
                                </Link>
                            </div>

                            {/* ログインボタン */}
                            <button
                                type="submit"
                                className="w-full p-2 h-14 text-base text-baseColor bg-accentDark rounded-md"
                            >
                                ログイン
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
