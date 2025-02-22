import { MerchIndexProps, MerchIndexResponse } from "@/api/MerchIndex";
import { useState } from "react";
import { AllergyIcon } from "./AllergyIcon";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "./Pagination";
import { MerchPreviewModal } from "./MerchPreviewModal";

export interface MenuTableProps {
  merches: MerchIndexResponse["merches"]; // 商品データ
  ids: MerchIndexResponse["ids"]; // 全てのid
  checkedIds: number[]; // チェックされているid
  setCheckedIds: React.Dispatch<React.SetStateAction<number[]>>; // チェックされているidを更新する関数

  //　ページネーション用
  lastPage: MerchIndexResponse["lastPage"];
  currentPage: number;
  setSerch: React.Dispatch<React.SetStateAction<MerchIndexProps["search"]>>;
}

// データの例
// merches = [
//   {
//     id: 1,
//     name: "カレーうどん",
//     allergyNames: ["小麦", "乳"],
//     price: 800,
//     updated_at: "2025年01月10日",
//   },
//   {
//     id: 2,
//     name: "牛肉カレーうどん",
//     allergyNames: ["小麦", "乳", "牛肉"],
//     price: 950,
//     updated_at: "2025年01月11日",
//   },
//   {
//     id: 3,
//     name: "エビ天カレーうどん",
//     allergyNames: ["小麦", "乳", "えび"],
//     price: 1100,
//     updated_at: "2025年01月12日",
//   },
//   {
//     id: 4,
//     name: "野菜カレーうどん",
//     allergyNames: ["小麦"],
//     price: 850,
//     updated_at: "2025年01月12日",
//   },
// ];
// ids = [1, 2, 3, 4];
// lastPage = 1;

export function MerchTable({
  merches,
  ids,
  checkedIds,
  setCheckedIds,
  lastPage,
  currentPage,
  setSerch,
}: MenuTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMerch, setSelectedMerch] = useState<
    MerchIndexResponse["merches"][number] | null
  >(null);
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
              <td className="text-center w-[208px] border-x border-text">
                <div className="flex justify-center">
                  更新日時
                </div>
              </td>
              <td className="text-center w-36 border-x border-text">値段</td>
              <td className="text-center w-[227px] border-x border-text">
                アレルギー
              </td>
              <td className="w-36"></td>
              <td className="w-36"></td>
            </tr>
          </thead>
          <tbody>
            {merches.map((merch) => {
              return (
                <tr className="h-14" key={merch.id}>
                  <td className="border-y border-r border-text" colSpan={2}>
                    <div className="flex">
                      <input
                        type="checkbox"
                        className="appearance-none flex w-5 h-5 border border-text rounded justify-center bg-center mx-8 checked:bg-[url('/check.svg')] checked:bg-accent checked:border-accent checked:bg-contain"
                        checked={checkedIds.includes(merch.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCheckedIds((checkedIds) => [
                              ...checkedIds,
                              merch.id,
                            ]);
                          } else {
                            setCheckedIds((checkedIds) =>
                              checkedIds.filter((id) => id !== merch.id)
                            );
                          }
                        }}
                      />
                      {merch.name}
                    </div>
                  </td>
                  <td className="border border-text text-center">
                    {merch.updatedAt}
                  </td>
                  <td className="border border-text text-center">
                    ¥{merch.price}
                  </td>
                  <td className="border border-text text-center">
                    <div className="flex px-4">
                      {merch.allergyNames.map((allergyName) => {
                        return (
                          <div
                            className="px-1"
                            key={`${merch.id}-${allergyName}`}
                          >
                            <AllergyIcon
                              allergyType={allergyName}
                              sizeCategory="large"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="border border-text">
                    <Link href="#" className="flex justify-center">
                      <Image
                        className="mr-4"
                        src="./edit-icon.svg"
                        width={28}
                        height={28}
                        alt="商品一覧テーブルの編集アイコン"
                      />
                      編集
                    </Link>
                  </td>
                  <td className="border-y border-l border-text">
                    <button
                      className="flex justify-center w-full"
                      onClick={() => {
                        setSelectedMerch(merch);
                        setIsOpen(true);
                      }}
                    >
                      <Image
                        className="mr-4"
                        src="./detail-icon.svg"
                        width={28}
                        height={28}
                        alt="商品一覧テーブルの詳細アイコン"
                      />
                      詳細
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

      {isOpen && selectedMerch && (
        <MerchPreviewModal
          merch={selectedMerch}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
