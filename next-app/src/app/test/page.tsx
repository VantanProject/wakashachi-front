"use client";

import { Button } from "@/components/Button";
import { DeleteButton } from "@/components/DeleteButton";
import { DeleteModal } from "@/components/DeleteModal";
import { List } from "@/components/List";
import { Pagination } from "@/components/Pagination";
import { SearchBox } from "@/components/SearchBox";
import { Select } from "@/components/Select";
import { useState } from "react";

export default function Page() {
  const [deleteModalFlg, setDeleteModalFlg] = useState(false);
  const [serchBoxValue, setSearchBoxValue] = useState("");
  const [paginationProps, setPaginationProps] = useState({
    currentPage: 1,
    lastPage: 10,
    onClick: (page: number) => {
      setPaginationProps({
        ...paginationProps,
        currentPage: page,
      });
    },
  });

  return (
    <>
      <div className="pb-2">Listコンポーネント</div>
      <List title="コンポーネント一覧" height="100%">
        <div className="flex flex-col gap-8">
          <div>
            <div className="pb-2">Buttonコンポーネント</div>
            <Button href="#">ボタン</Button>
          </div>
          <div>
            <div className="pb-2">{`DeleteButtonコンポーネント isCheck={true}`}</div>
            <DeleteButton
              onClick={() => console.log("success")}
              isCheck={true}
            />
          </div>
          <div>
            <div className="pb-2">{`DeleteButtonコンポーネント isCheck={false}`}</div>
            <DeleteButton
              onClick={() => console.log("success")}
              isCheck={false}
            />
          </div>
          <div>
            <div className="pb-2">DeleteModalコンポーネント</div>
            <button onClick={() => setDeleteModalFlg(true)}>開く</button>
            <DeleteModal
              isShow={deleteModalFlg}
              deleteItems={[
                "xxxxxxxx",
                "xxxxxxxx",
                "xxxxxxxx",
                "xxxxxxxx",
                "xxxxxxxx",
                "xxxxxxxx",
                "xxxxxxxx",
                "xxxxxxxx",
              ]}
              onDelete={() => console.log("success")}
              onClese={() => setDeleteModalFlg(false)}
            />
          </div>
          <div>
            <div className="pb-2">SearchBoxコンポーネント</div>
            <SearchBox
              value={serchBoxValue}
              onChange={(e) => setSearchBoxValue(e.target.value)}
              placeholder="検索値を入力してください"
            />
          </div>
          <div>
            <div className="pb-2">Selectコンポーネント</div>
            <Select
              className="border"
              options={[
                { value: "1", label: "ラベル1" },
                { value: "2", label: "ラベル2" },
                { value: "3", label: "ラベル3" },
              ]}
              multi={true}
            />
          </div>
          <div>
            <div className="pb-2">Paginationコンポーネント</div>
            <Pagination {...paginationProps} />
          </div>
        </div>
      </List>
    </>
  );
}
