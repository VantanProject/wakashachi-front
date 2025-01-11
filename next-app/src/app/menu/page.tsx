"use client";

import { MenuDestroy } from "@/api/MenuDestroy";
import { MenuIndex, MenuIndexProps, MenuIndexResponse } from "@/api/MenuIndex";
import { Button } from "@/components/Button";
import { DeleteButton } from "@/components/DeleteButton";
import { DeleteModal } from "@/components/DeleteModal";
import { List } from "@/components/List";
import { MenuTable } from "@/components/MenuTable";
import { SearchBox } from "@/components/SearchBox";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  // テーブルコンポーネント用State
  const [menus, setMenus] = useState<MenuIndexResponse["menus"]>([]);
  const [ids, setIds] = useState<MenuIndexResponse["ids"]>([]);
  const [LastPage, setLastPage] = useState<MenuIndexResponse["lastPage"]>(0);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  // 検索ロジック
  const [search, setSearch] = useState<MenuIndexProps["search"]>({
    name: "",
    currentPage: 1,
  });
  const indexApi = useCallback(async () => {
    const response = await MenuIndex({ search });
    if (response.success) {
      setMenus(response.menus);
      setIds(response.ids);
      setLastPage(response.lastPage);
    }
  }, [search]);
  useEffect(() => {
    indexApi();
  }, [indexApi]);

  // 削除ロジック
  const delteApi = async () => {
    const response = await MenuDestroy({ ids });
    if (response.success) {
      setCheckedIds([]);
      alert(response.message);
      indexApi();
    }
  };

  // 削除モーダル用State
  const [deleteModalFlg, setDeleteModalFlg] = useState(false);

  return (
    <>
      <List title="メニュー表一覧">
        <div className="flex justify-between pb-5">
          <SearchBox
            value={search.name}
            onChange={(e) =>
              setSearch((search) => ({ ...search, name: e.target.value }))
            }
            placeholder="検索値を入力してください"
          />
          <div className="flex gap-2">
            <DeleteButton
              onClick={() => setDeleteModalFlg(true)}
              isCheck={checkedIds.length > 0}
            />
            <Button href="/menu/create">新規登録</Button>
          </div>
        </div>

        <MenuTable
          menus={menus}
          ids={ids}
          checkedIds={checkedIds}
          setCheckedIds={setCheckedIds}
          lastPage={LastPage}
          currentPage={search.currentPage}
          setSerch={setSearch}
        />
      </List>
      <DeleteModal
        isShow={deleteModalFlg}
        deleteItems={menus
          .filter((menu) => checkedIds.includes(menu.id))
          .map((menu) => menu.name)}
        onClese={() => setDeleteModalFlg(false)}
        onDelete={() => {
          delteApi();
          setDeleteModalFlg(false);
        }}
      />
    </>
  );
}
