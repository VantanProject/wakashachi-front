"use client";

import { MenuStore, MenuStoreProps } from "@/api/MenuStore";
import {
  MerchIndex,
  MerchIndexProps,
  MerchIndexResponse,
} from "@/api/MerchIndex";
import { Draggable } from "@/components/Draggable";
import { Droppable } from "@/components/Droppable";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { DraggableEvent, DraggableData } from "react-draggable";
import { MenuPageEditAbsolute } from "@/components/MenuPageEditAbsolute";
import { AllergyIcon } from "@/components/AllergyIcon";
import { SelectedItemController } from "@/components/SelectedItemController";
import { useRouter } from "next/navigation";
import { TranslationSidebar } from "@/components/TranslationSidebar";
import { LanguageSelect } from "@/components/LanguageSelect";

export default function Page() {
  const router = useRouter();
  const [menu, setMenu] = useState<MenuStoreProps["menu"]>({
    name: "",
    color: "#7d7d7d",
    pages: [
      {
        count: 1,
        items: [],
      },
      { count: 2, items: [] },
    ],
  });
  const [selectedPageCount, setSelectedPageCount] = useState<number | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<{
    pageIndex: number;
    itemIndex: number;
  } | null>(null);
  const [languageId, setLanguageId] = useState(1);

  // 検索ロジック
  const [merches, setMerches] = useState<MerchIndexResponse["merches"]>([]);
  const [search, setSearch] = useState<MerchIndexProps["search"]>({
    name: "",
    allergyIds: [],
    currentPage: 1,
  });
  const indexApi = useCallback(async () => {
    const response = await MerchIndex({ search });
    if (response.success) {
      setMerches([...merches, ...response.merches]);
    }
    if (response.merches.length !== 0) {
      setSearch({ ...search, currentPage: search.currentPage + 1 });
    }
  }, [search]);
  useEffect(() => {
    indexApi();
  }, [indexApi]);

  const onDragEnd = (e: DragEndEvent) => {
    const activeId = e.active.id;
    const overId = e.over ? e.over.id : null;

    if (overId !== null) {
      const [, dragId] = String(activeId).split("-");
      const [, dropCount] = String(overId).split("-");

      setMenu((prevMenu) => {
        const newPages: MenuStoreProps["menu"]["pages"] = prevMenu.pages.map(
          (pages) => {
            if (pages.count === Number(dropCount)) {
              return {
                ...pages,
                items: [
                  ...pages.items,
                  dragId === "text"
                    ? {
                        type: "text",
                        color: "#000000",
                        width: 150,
                        height: 40,
                        top: 200,
                        left: 80,
                        translations: [
                          {
                            languageId: 1,
                            text: "日本語テキスト",
                          },
                          {
                            languageId: 2,
                            text: "英語テキスト",
                          },
                          {
                            languageId: 3,
                            text: "中国語テキスト",
                          },
                          {
                            languageId: 4,
                            text: "韓国語テキスト",
                          },
                        ],
                      }
                    : {
                        type: "merch",
                        merchId: Number(dragId),
                        top: 200,
                        left: 80,
                        width: 200,
                        height: 200,
                      },
                ],
              };
            }

            return pages;
          }
        );

        return {
          ...prevMenu,
          pages: newPages,
        };
      });
    }
  };

  const onDragStop =
    (pageIndex: number, itemIndex: number) =>
    (e: DraggableEvent, data: DraggableData) => {
      setMenu((menu) => {
        const newPages = menu.pages.map((page) =>
          page.count === pageIndex
            ? {
                ...page,
                items: page.items.map((item, i) => {
                  if (i === itemIndex) {
                    return {
                      ...item,
                      top: data.y,
                      left: data.x,
                    };
                  }
                  return item;
                }),
              }
            : page
        );
        return {
          ...menu,
          pages: newPages,
        };
      });
    };

  const onResizeStop =
    (pageIndex: number, itemIndex: number) =>
    (
      e: MouseEvent | TouchEvent,
      direction: string,
      ref: HTMLElement,
      delta: { width: number; height: number },
      position: { x: number; y: number }
    ) => {
      const { width, height } = delta;
      const newPages = menu.pages.map((page) =>
        page.count === pageIndex
          ? {
              ...page,
              items: page.items.map((item, i) => {
                if (i === itemIndex) {
                  return {
                    ...item,
                    width: item.width + width,
                    height: item.height + height,
                  };
                }
                return item;
              }),
            }
          : page
      );

      setMenu((menu) => ({
        ...menu,
        pages: newPages,
      }));
    };

  const storeApi = async () => {
    const response = await MenuStore({
      menu: menu,
    });

    alert(response.messages[0]);
    if (response.success) {
      router.push("/menu");
    }
  };

  return (
    <>
      <TranslationSidebar />
      <DndContext onDragEnd={onDragEnd}>
        {selectedItem && (
          <SelectedItemController
            menu={menu}
            setMenu={setMenu}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}

        <div className="flex">
          <div
            className="overflow-auto w-full p-2 pt-28"
            id="mobile-view"
          >
            <div className="flex gap-28 w-fit pl-10 pr-20 pt-10">
              {Array.from({ length: menu.pages.length }, (_, i) => i + 1).map(
                (pageIndex) => (
                  <Droppable id={`drop-${pageIndex}`} key={pageIndex}>
                    <div
                      className={`w-[360px] h-[720px] border-4 border-black rounded-[52px] relative`}
                      style={{
                        backgroundColor: menu.color,
                      }}
                      onClick={() => {
                        setSelectedPageCount(pageIndex);
                      }}
                    >
                      {menu.pages
                        .find((page) => page.count === pageIndex)
                        ?.items.map((item, itemIndex) => (
                          <Rnd
                            className={item.type === "text" ? "z-20" : ""}
                            key={itemIndex}
                            bounds="parent"
                            position={{
                              x: item.left,
                              y: item.top,
                            }}
                            size={{
                              width: item.width,
                              height: item.height,
                            }}
                            resizeGrid={[10, 10]}
                            dragGrid={[10, 10]}
                            onDragStop={onDragStop(pageIndex, itemIndex)}
                            onResizeStop={onResizeStop(pageIndex, itemIndex)}
                          >
                            <div
                              className="w-full h-full"
                              onClick={() =>
                                setSelectedItem({ pageIndex, itemIndex })
                              }
                            >
                              {item.type === "merch" ? (
                                <div className="relative bg-gray-100 overflow-hidden w-full h-full">
                                  <Image
                                    className="absolute top-0 w-full h-auto"
                                    src={
                                      merches.find(
                                        (merch) => merch.id === item.merchId
                                      )?.url || ""
                                    }
                                    width={100}
                                    height={100}
                                    alt=""
                                    draggable={false}
                                  />

                                  <div className="absolute bottom-1/3 w-full p-1 flex gap-1 justify-end">
                                    {merches
                                      .find(
                                        (merch) => merch.id === item.merchId
                                      )
                                      ?.allergyNames.map(
                                        (name, allergyIndex) => (
                                          <AllergyIcon
                                            allergyType={name}
                                            sizeCategory="large"
                                            key={allergyIndex}
                                          />
                                        )
                                      )}
                                  </div>
                                  <div
                                    className="absolute bottom-0 h-1/3 bg-baseColor w-full p-2"
                                    style={{
                                      fontSize: `${Math.min(
                                        item.width / 12,
                                        16
                                      )}px`,
                                    }}
                                  >
                                    <div className="h-3/5">
                                      {
                                        merches
                                          .find(
                                            (merch) => merch.id === item.merchId
                                          )
                                          ?.translations.find(
                                            (translation) =>
                                              translation.languageId ===
                                              languageId
                                          )?.name
                                      }
                                    </div>
                                    <div className="text-right">
                                      {
                                        merches.find(
                                          (merch) => merch.id === item.merchId
                                        )?.price
                                      }
                                      円（税込）
                                    </div>
                                  </div>

                                  <button
                                    className="absolute top-2 right-2 bg-black opacity-30 rounded-full"
                                    onClick={() => {
                                      const newPages = menu.pages.map((page) =>
                                        page.count === pageIndex
                                          ? {
                                              ...page,
                                              items: page.items.filter(
                                                (_, index) =>
                                                  index !== itemIndex
                                              ),
                                            }
                                          : page
                                      );
                                      setMenu({
                                        ...menu,
                                        pages: newPages,
                                      });
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="24px"
                                      viewBox="0 -960 960 960"
                                      width="24px"
                                      fill="#ffffff"
                                    >
                                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="border border-dotted border-textOpacity w-full h-full"
                                  style={{
                                    color:
                                      menu.pages[pageIndex - 1].items[itemIndex]
                                        ?.color ?? "",
                                  }}
                                >
                                  {
                                    item.translations.find(
                                      (translation) =>
                                        translation.languageId === languageId
                                    )?.text
                                  }
                                </div>
                              )}
                            </div>
                          </Rnd>
                        ))}

                      {/* 相対要素 */}
                      <MenuPageEditAbsolute
                        menu={menu}
                        setMenu={setMenu}
                        pageIndex={pageIndex}
                        selectedPageCount={selectedPageCount}
                      />
                    </div>
                  </Droppable>
                )
              )}
            </div>
          </div>

          {/* サイドバー */}
          <div className="bg-white border border-text p-2 flex flex-col gap-2 w-80">
            <div className="h-20 border-b border-text flex items-center p-2 gap-2">
              <input
                className="outline-none h-full"
                placeholder="メニュー表名"
                value={menu.name}
                onChange={(e) => {
                  setMenu((menu) => ({
                    ...menu,
                    name: e.target.value,
                  }));
                }}
              />
              <input
                type="color"
                value={menu.color}
                onChange={(e) => {
                  setMenu((menu) => ({
                    ...menu,
                    color: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="flex flex-col gap-2 px-2">
              <Draggable id="drag-text">
                <div className="border border-text rounded-xl p-1 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                  <div>新規テキスト</div>
                </div>
              </Draggable>
            </div>

            <div className="px-2">
              <input
                value={search.name}
                className="outline-none border border-text rounded-xl p-1 pl-2 w-full"
                placeholder="商品検索"
                onChange={(e) => {
                  setSearch((search) => ({
                    ...search,
                    name: e.target.value,
                  }));
                }}
              />
            </div>

            <div className="flex flex-col gap-2 overflow-auto h-[calc(100vh-240px)]">
              {merches.map((merch) => (
                //ここでスクロールのどの位置なのか（top）を取得してドラッグ中の要素の位置を修正する
                <Draggable id={`drag-${merch.id}`} key={merch.id}>
                  <div
                    key={merch.id}
                    className="bg-white p-2 h-12 flex gap-2 items-center rounded-xl transition duration-300 hover:bg-accentLight hover:shadow-lg"
                  >
                    <Image
                      className="w-10 h-10 object-cover object-center rounded-lg"
                      src={merch.url}
                      width={100}
                      height={100}
                      alt={merch.name}
                    />
                    <div className="w-[200px]">{merch.name}</div>
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
          {/* サイドバー */}

          {/* 保存ボタン */}
          <div className="fixed bottom-5 right-72">
            <div className="flex flex-col gap-2">
              <LanguageSelect
                width="100%"
                value={languageId}
                onChange={(item) => setLanguageId(item.value)}
              />
              <button
                className="w-fit text-accent text-lg font-bold bg-baseColor px-10 py-4 rounded-md border-[1px] border-accent hover:ring-1 ring-accent hover:bg-accentLight transition duration-300"
                onClick={() => {
                  storeApi();
                }}
              >
                保存
              </button>
            </div>
          </div>
          {/* 保存ボタン */}
        </div>
      </DndContext>
    </>
  );
}
