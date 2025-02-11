"use client";

import { MenuShow, MenuShowResponse } from "@/api/MenuShow";
import { AllergyIcon } from "@/components/AllergyIcon";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { menuId } = useParams();
  const [menu, setMenu] = useState<MenuShowResponse["menu"]>(null);
  const [pageCount, setPageCount] = useState(1);
  const [languageId, setLanguageId] = useState(1);

  const showApi = async () => {
    const response = await MenuShow(Number(menuId));
    if (response.success) {
      setMenu(response.menu);
    }
  };
  useEffect(() => {
    showApi();
  }, []);

  const startTouch = useRef(0);
  const endTouch = useRef(0);
  return (
    <>
      <div className="fixed w-full h-16 flex items-center justify-between p-2 bg-accentLight z-30">
        <Image
          className="w-auto h-full"
          src="/wakalogo.png"
          width={100}
          height={100}
          alt="logo"
        />
        <button className="w-12 h-12 text-text border border-text flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="currentColor"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
      </div>
      <div className="h-16" />

      {menu && (
        <div
          className="relative h-screen"
          style={{ backgroundColor: menu.color }}
          onTouchStart={(e) => {
            startTouch.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            endTouch.current = e.changedTouches[0].clientX;
            if (endTouch.current - startTouch.current > 100 && pageCount > 1) {
              setPageCount((prevPageCount) => prevPageCount - 1);
            } else if (
              startTouch.current - endTouch.current > 100 &&
              pageCount < menu.pages.length
            ) {
              setPageCount((prevPageCount) => prevPageCount + 1);
            }
          }}
        >
          {menu.pages
            .find((page) => page.count === pageCount)
            ?.items.map((item, itemIndex) =>
              item.type === "merch" ? (
                <div
                  key={itemIndex}
                  className="relative bg-gray-100 overflow-hidden w-full h-full"
                  style={{
                    top: `${(item.top / 720) * 100}%`,
                    left: `${(item.left / 360) * 100}%`,
                    width: `${(item.width / 360) * 100}%`,
                    height: `${(item.height / 720) * 100}%`,
                  }}
                >
                  <Image
                    unoptimized={true}
                    className="absolute top-0 w-full h-auto"
                    src={item.imageUrl}
                    width={100}
                    height={100}
                    alt=""
                    draggable={false}
                  />

                  <div className="absolute bottom-1/3 w-full p-1 flex gap-1 justify-end">
                    {item.allergyNames.map((name, allergyIndex) => (
                      <AllergyIcon
                        allergyType={name}
                        sizeCategory="large"
                        key={allergyIndex}
                      />
                    ))}
                  </div>
                  <div
                    className="absolute bottom-0 h-1/3 bg-baseColor w-full p-2"
                    style={{
                      fontSize: `${Math.min(item.width / 12, 16)}px`,
                    }}
                  >
                    <div className="h-3/5">
                      {
                        item.translations.find(
                          (translation) => translation.languageId === languageId
                        )?.name
                      }
                    </div>
                    <div className="text-right">
                      {item.price}
                      円（税込）
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={itemIndex}
                  className="absolute"
                  style={{
                    top: `${(item.top / 720) * 100}%`,
                    left: `${(item.left / 360) * 100}%`,
                    width: `${(item.width / 360) * 100}%`,
                    height: `${(item.height / 720) * 100}%`,
                    color: item.color,
                  }}
                >
                  {
                    item.translations.find(
                      (translation) => translation.languageId === languageId
                    )?.text
                  }
                </div>
              )
            )}
        </div>
      )}
    </>
  );
}
