import { MenuIndexProps, MenuIndexResponse } from "@/api/MenuIndex";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "./Pagination";
import { useState } from "react";
import { QRCodeModal } from "./QRCodeModal";

export interface MenuTableProps {
  menus: MenuIndexResponse["menus"]; // メニューデータ
  ids: MenuIndexResponse["ids"]; // 全てのid
  checkedIds: number[]; // チェックされているid
  setCheckedIds: React.Dispatch<React.SetStateAction<number[]>>; // チェックされているidを更新する関数

  //　ページネーション用
  lastPage: MenuIndexResponse["lastPage"];
  currentPage: number;
  setSerch: React.Dispatch<React.SetStateAction<MenuIndexProps["search"]>>;
}

// データの例
// menus = [
//   {
//     id: 1,
//     name: "Menu 1",
//     updatedAt: "2025年01月12日",
//   },
//   {
//     id: 2,
//     name: "Menu 2",
//     updatedAt: "2025年01月11日",
//   },
//   {
//     id: 3,
//     name: "Menu 3",
//     updatedAt: "2025年01月10日",
//   },
// ];
// ids = [1, 2, 3];
// lastPage = 5;

export function MenuTable({
  menus,
  ids,
  checkedIds,
  setCheckedIds,
  lastPage,
  currentPage,
  setSerch,
}: MenuTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number>(0);
  const isAllChecked =
    JSON.stringify([...checkedIds].sort((a, b) => a - b)) ===
    JSON.stringify([...ids].sort((a, b) => a - b));

  return (
    <>
      <div className="overflow-auto rounded-xl border border-text bg-baseColor h-[calc(100vh-280px)]">
        <table className="w-full">
          <thead className="h-14 bg-textOpacity text-baseColor">
            <tr>
              <td className="items-center" colSpan={2}>
                <div className="flex w-full">
                  <input
                    type="checkbox"
                    className="appearance-none flex w-5 h-5 border rounded justify-center bg-center mx-8 checked:bg-[url('/check.svg')] checked:bg-accent checked:border-accent checked:bg-contain"
                    checked={isAllChecked}
                    onChange={() => {
                      if (isAllChecked) {
                        setCheckedIds([]);
                      } else {
                        setCheckedIds(ids);
                      }
                    }}
                  />
                  メニュー名
                </div>
              </td>
              <td className="text-center w-40 border-x border-text">
                <div className="flex justify-center">
                  作成日時
                  <Image
                    className="ml-2"
                    src="./down-arrow.svg"
                    width={18}
                    height={9}
                    alt="メニュー一覧テーブルのドロップダウンアイコン"
                  />
                </div>
              </td>
              <td className="w-28" />
              <td className="w-28" />
              <td className="w-28" />
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => {
              return (
                <tr className="h-14" key={menu.id}>
                  <td className="border-y border-r border-text" colSpan={2}>
                    <div className="flex">
                      <input
                        type="checkbox"
                        className="appearance-none flex w-5 h-5 border border-text rounded justify-center bg-center mx-8 checked:bg-[url('/check.svg')] checked:bg-accent checked:border-accent checked:bg-contain"
                        checked={checkedIds.includes(menu.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCheckedIds((checkedIds) => [
                              ...checkedIds,
                              menu.id,
                            ]);
                          } else {
                            setCheckedIds((checkedIds) =>
                              checkedIds.filter((id) => id !== menu.id)
                            );
                          }
                        }}
                      />
                      {menu.name}
                    </div>
                  </td>
                  <td className="border border-text text-center">
                    {menu.updatedAt}
                  </td>
                  <td className="border border-text">
                    <Link href="#" className="flex justify-center">
                      <Image
                        className="mr-4"
                        src="./edit-icon.svg"
                        width={28}
                        height={28}
                        alt="メニュー一覧テーブルの編集アイコン"
                      />
                      編集
                    </Link>
                  </td>
                  <td className="border border-text">
                    <button
                      className="flex mx-auto"
                      onClick={() => {
                        setSelectedMenuId(menu.id);
                        setIsOpen(true);
                      }}
                    >
                      <Image
                        className="mr-4"
                        src="./qrcode-icon.svg"
                        width={28}
                        height={28}
                        alt="メニュー一覧テーブルのQRアイコン"
                      />
                      QR
                    </button>
                  </td>
                  <td className="border-y border-l border-text">
                    <button className="flex mx-auto">
                      <Image
                        className="mr-4"
                        src="./browsing-icon.svg"
                        width={28}
                        height={28}
                        alt="メニュー一覧テーブルの閲覧アイコン"
                      />
                      閲覧
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="py-4 w-full flex justify-center">
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onClick={(page: number) =>
              setSerch((serch) => ({
                ...serch,
                currentPage: page,
              }))
            }
          />
        </div>
      </div>

      <QRCodeModal isOpen={isOpen} selectedMenuId={selectedMenuId} onClose={() => setIsOpen(false)} />
    </>
  );
}
