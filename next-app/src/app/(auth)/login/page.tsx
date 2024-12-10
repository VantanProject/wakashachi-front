"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

const Login = () => {
    const [visibility, setVisibility] = useState(false);
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
                        
                        
                        <form className="space-y-4 px-1 mt-1">
                            {/* メールアドレス */}
                            <div className="group">
                                <label className="block text-base text-text mb-2">メールアドレス</label>
                                <div className="relative">
                                    <Image
                                        src="/account.svg"
                                        alt="メールアイコン"
                                        width={22}
                                        height={22}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-60"
                                    />
                                    <input
                                        type="email"
                                        className="pl-12 w-full px-4 py-2 border border-textOpacity rounded-md placeholder:text-base group-hover:shadow-input focus:shadow-input transition-shadow"
                                        placeholder="user@mail.com"
                                    />
                                </div>
                                
                            </div>

                            {/* パスワード */}
                            <div className="group">
                                <label className="block text-base text-text mb-2">パスワード</label>
                                <div className="relative">
                                    <Image
                                        src="/key.svg"
                                        alt="パスワードアイコン"
                                        width={22}
                                        height={22}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-60"
                                    />
                                    <input
                                        type={visibility ? "text" : "password" }
                                        className="w-full pl-12 px-4 py-2 border border-textOpacity rounded-md group-hover:shadow-input focus:shadow-input transition-shadow"
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
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-60"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* パスワードを忘れた場合 */}
                            <div className="pl-[6px] text-left pt-3 pb-1">
                                <Link href="#" className="text-xs text-textOpacity underline hover:text-text transition-colors duration-500">
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
