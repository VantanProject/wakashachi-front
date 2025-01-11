import { MenuIndexProps, MenuIndexResponse } from "@/api/MenuIndex";
import React from "react";

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

// サンプル
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
  return <div></div>;
}
