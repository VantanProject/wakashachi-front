import { MenuStoreProps } from "@/api/MenuStore";
import React from "react";

export interface SelectedItemControllerProps {
  menu: MenuStoreProps["menu"];
  setMenu: React.Dispatch<React.SetStateAction<MenuStoreProps["menu"]>>;
  selectedItem: {
    pageIndex: number;
    itemIndex: number;
  };
  setSelectedItem: React.Dispatch<
    React.SetStateAction<{
      pageIndex: number;
      itemIndex: number;
    } | null>
  >;
}

export function SelectedItemController({
  menu,
  setMenu,
  selectedItem,
  setSelectedItem,
}: SelectedItemControllerProps) {
  const controllerItems = [
    {
      languageId: 1,
      text: "日本語",
    },
    {
      languageId: 2,
      text: "英語",
    },
    {
      languageId: 3,
      text: "中国語",
    },
    {
      languageId: 4,
      text: "韓国語",
    },
  ];
  if (
    !menu.pages[selectedItem.pageIndex - 1] ||
    !menu.pages[selectedItem.pageIndex - 1].items[selectedItem.itemIndex] ||
    menu.pages[selectedItem.pageIndex - 1].items[selectedItem.itemIndex]
      .type === "merch"
  ) {
    setSelectedItem(null);
    return undefined;
  }

  return (
    <div className="fixed top-[70px] left-0 w-3/4 z-10 p-5">
      <div className="bg-white rounded-lg h-20 w-full">
        {menu.pages[selectedItem.pageIndex - 1].items[selectedItem.itemIndex]
          .type === "text" ? (
          <div className="flex h-full items-center">
            {controllerItems.map((controllerItem) => (
              <div className="flex flex-col w-48 p-2">
                <label className="text-textOpacity text-sm pl-1">
                  {controllerItem.text}
                </label>
                <input
                  className="outline-none p-2 border-r"
                  value={
                    menu.pages[selectedItem.pageIndex - 1].items[
                      selectedItem.itemIndex
                    ].translations.find(
                      (translation) =>
                        translation.languageId === controllerItem.languageId
                    ).text
                  }
                  onChange={(e) => {
                    setMenu((menu) => {
                      const newPages = menu.pages.map((page) =>
                        page.count === selectedItem.pageIndex
                          ? {
                              ...page,
                              items: page.items.map((item, i) => {
                                if (i === selectedItem.itemIndex) {
                                  return {
                                    ...item,
                                    translations: item.translations.map(
                                      (translation) =>
                                        translation.languageId ===
                                        controllerItem.languageId
                                          ? {
                                              ...translation,
                                              text: e.target.value,
                                            }
                                          : translation
                                    ),
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
                  }}
                />
              </div>
            ))}

            <div className="flex flex-col p-2 gap-2 w-24">
              <label className="text-textOpacity text-sm pl-1">文字色</label>
              <input
                type="color"
                className="outline-none border-r"
                value={
                  menu.pages[selectedItem.pageIndex - 1].items[
                    selectedItem.itemIndex
                  ].color
                }
                onChange={(e) => {
                  setMenu((menu) => {
                    const newPages = menu.pages.map((page) =>
                      page.count === selectedItem.pageIndex
                        ? {
                            ...page,
                            items: page.items.map((item, i) => {
                              if (i === selectedItem.itemIndex) {
                                return {
                                  ...item,
                                  color: e.target.value,
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
                }}
              />
            </div>
            <div className="flex items-center">
              <button
                className="text-text p-2 rounded-full hover:bg-gray-200"
                onClick={() => {
                  setMenu((menu) => {
                    const newPages = menu.pages.map((page) =>
                      page.count === selectedItem.pageIndex
                        ? {
                            ...page,
                            items: page.items.filter(
                              (_, i) => i !== selectedItem.itemIndex
                            ),
                          }
                        : page
                    );
                    return {
                      ...menu,
                      pages: newPages,
                    };
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
