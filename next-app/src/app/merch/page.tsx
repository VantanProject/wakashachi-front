"use client";

import { AllergySelect, AllergySelectResponse } from "@/api/AllergySelect";
import { MerchDestroy } from "@/api/MerchDestroy";
import {
  MerchIndex,
  MerchIndexProps,
  MerchIndexResponse,
} from "@/api/MerchIndex";
import { Button } from "@/components/Button";
import { DeleteButton } from "@/components/DeleteButton";
import { DeleteModal } from "@/components/DeleteModal";
import { List } from "@/components/List";
import { MerchTable } from "@/components/MerchTable";
import { SearchBox } from "@/components/SearchBox";
import { Select, SelectItem } from "@/components/Select";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  // テーブルコンポーネント用State
  const [merches, setMerches] = useState<MerchIndexResponse["merches"]>([]);
  const [ids, setIds] = useState<MerchIndexResponse["ids"]>([]);
  const [LastPage, setLastPage] = useState<MerchIndexResponse["lastPage"]>(0);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  // 検索ロジック
  const [search, setSearch] = useState<MerchIndexProps["search"]>({
    name: "",
    allergyIds: [],
    currentPage: 1,
  });
  const indexApi = useCallback(async () => {
    const response = await MerchIndex({ search });
    if (response.success) {
      setMerches(response.merches);
      setIds(response.ids);
      setLastPage(response.lastPage);
    }
  }, [search]);
  useEffect(() => {
    indexApi();
  }, [indexApi]);

  // 削除ロジック
  const delteApi = async () => {
    const response = await MerchDestroy({ ids });
    if (response.success) {
      setCheckedIds([]);
      alert(response.message);
      indexApi();
    }
  };

  // セレクトボックス取得ロジック
  const [allergies, setAllergies] = useState<
    AllergySelectResponse["allergies"]
  >([]);
  const selectApi = async () => {
    const response = await AllergySelect();
    if (response.success) {
      setAllergies(response.allergies);
    }
  };
  useEffect(() => {
    selectApi();
  }, []);

  // 削除モーダル用State
  const [deleteModalFlg, setDeleteModalFlg] = useState(false);

  return (
    <>
      <List title="商品一覧">
        <div className="flex justify-between pb-5">
          <div className="flex gap-2">
            <SearchBox
              value={search.name}
              onChange={(e) =>
                setSearch((search) => ({ ...search, name: e.target.value }))
              }
              placeholder="検索値を入力してください"
            />
            <div className="border border-textOpacity rounded-md w-96">
              <Select
                placeholder="アレルギー絞り込み"
                options={allergies}
                multi={true}
                onChange={(e: SelectItem[]) => {
                  setSearch((search) => ({
                    ...search,
                    allergyIds: e.map((e) => e.value),
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <DeleteButton
              onClick={() => setDeleteModalFlg(true)}
              isCheck={checkedIds.length > 0}
            />
            <Button href="/merch/create">新規登録</Button>
          </div>
        </div>

        <MerchTable
          merches={merches}
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
        deleteItems={merches
          .filter((merch) => checkedIds.includes(merch.id))
          .map((merch) => merch.name)}
        onClese={() => setDeleteModalFlg(false)}
        onDelete={() => {
          delteApi();
          setDeleteModalFlg(false);
        }}
      />
    </>
  );
}
