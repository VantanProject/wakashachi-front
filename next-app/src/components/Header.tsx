"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header () {
  const [isMerchOpen, setIsMerchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isShow = usePathname() !== "/login";


  return (
    <>
      {isShow && (
        <>
          <div className="h-[70px]" />
          <div className="fixed top-0 left-0 w-full bg-baseColor border-b-2 border-text h-[70px]">
            <nav className="flex items-center justify-between mx-8 h-full">
              <Image
                src="/wakalogo.png"
                alt="若鯱家のロゴ"
                width={150}
                height={150}
              />
              <div className="flex items-end">
                {/* Food Dropdown */}
                <div
                  onMouseEnter={() => setIsMerchOpen(true)}
                  onMouseLeave={() => setIsMerchOpen(false)}
                  className="relative"
                >
                  <div className="flex items-center space-x-11 px-4 border-l border-text">
                    <Image
                      src="/food-icon.svg"
                      alt="食品のアイコン"
                      width={30}
                      height={30}
                    />
                    <p className="text-text">商品情報管理</p>
                    <div
                      className={`transform transition-transform duration-300 ${
                        isMerchOpen ? "-rotate-180" : "rotate-0"
                      }`}
                    >
                      <Image
                        src="/down-arrow-icon.svg"
                        alt="ドロップダウンメニューのアイコン"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute right-0 top-full w-full mt-6 rounded bg-baseColor border border-text px-4 py-2 transition-all duration-300 ease-in-out ${
                      isMerchOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <ul>
                      <li>
                        <Link
                          className="flex p-2 items-center space-x-3"
                          href="#"
                        >
                          <Image
                            src="/food-icon.svg"
                            alt="食品のアイコン"
                            width={30}
                            height={30}
                          />
                          <p className="text-xs text-text">商品情報一覧</p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex p-2 items-center space-x-3"
                          href="#"
                        >
                          <Image
                            src="/pulus-icon.svg"
                            alt="メニュー情報新規登録のアイコン"
                            width={30}
                            height={30}
                          />
                          <p className="text-xs text-text">食品新規登録</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Menu Dropdown */}
                <div
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                  className="relative"
                >
                  <div className="flex items-center space-x-11 px-4 border-r border-l border-text">
                    <Image
                      src="/menu-svgrepo-com.svg"
                      alt="メニューのアイコン"
                      width={28}
                      height={28}
                    />
                    <p className="text-base text-text">メニュー情報管理</p>
                    <div
                      className={`transform transition-transform duration-300 ${
                        isMenuOpen ? "-rotate-180" : "rotate-0"
                      }`}
                    >
                      <Image
                        src="/down-arrow-icon.svg"
                        alt="ドロップダウンメニューのアイコン"
                        width={20}
                        height={20}
                      />
                    </div>
                  </div>
                  <div
                    className={`absolute right-0 top-full w-full mt-6 rounded bg-baseColor border border-text px-4 py-2 transition-all duration-300 ease-in-out ${
                      isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <ul>
                      <li>
                        <Link
                          className="flex p-2 items-center space-x-3"
                          href="#"
                        >
                          <Image
                            src="/menu-svgrepo-com.svg"
                            alt="メニューのアイコン"
                            width={28}
                            height={28}
                          />
                          <p className="text-xs text-text">メニュー情報一覧</p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex p-2 items-center space-x-3"
                          href="#"
                        >
                          <Image
                            src="/pulus-icon.svg"
                            alt="メニュー情報新規作成のアイコン"
                            width={30}
                            height={30}
                          />
                          <p className="text-xs text-text">メニュー新規作成</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};
