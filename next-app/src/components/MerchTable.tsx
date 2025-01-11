import { MerchIndexProps, MerchIndexResponse } from "@/api/MerchIndex";
import React from "react";

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
  return <div></div>;
}
