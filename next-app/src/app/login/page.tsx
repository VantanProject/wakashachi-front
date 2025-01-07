"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Login } from "@/api/Login";
import Cookies from "js-cookie";

export default function Page() {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const loginApi = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await Login({ email, password });

    if (response.success) {
      Cookies.set('AuthToken', response.token);
      router.push("/top");
    } else {
      setIsError(true);
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
            <form onSubmit={loginApi} className="space-y-4 px-1 mt-1">
              {/* メールアドレス */}
              <div className="group">
                <label className="block text-base text-text mb-2">
                  メールアドレス
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className={`peer pl-12 h-[43px] w-full px-4 py-2 border rounded-md placeholder:text-base placeholder:focus:text-textOpacity group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${
                        isError
                          ? "border-formError shadow-error"
                          : "border-textOpacity"
                    }`}
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
              </div>

              {/* パスワード */}
              <div className="group">
                <label className="block text-base text-text mb-2">
                  パスワード
                </label>
                <div className="relative">
                  <input
                    type={visibility ? "text" : "password"}
                    className={`peer pl-12 h-[43px] w-full px-4 py-2 border rounded-md placeholder:text-base placeholder:focus:text-text group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${
                      isError
                        ? "border-formError shadow-error"
                        : "border-textOpacity"
                    }`}
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
              </div>
              {isError && (
                <p className="text-formError text-error text-xs">
                  メールアドレスまたはパスワードが正しくありません。
                </p>
              )}

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
