"use client";

import { Button } from "@/components/Button";
import { DeleteButton } from "@/components/DeleteButton";
import { DeleteModal } from "@/components/DeleteModal";
import { List } from "@/components/List";
import { SearchBox } from "@/components/SearchBox";
import { useState } from "react";

export default function Page() {
  const [deleteModalFlg, setDeleteModalFlg] = useState(false);
  const [serchBoxValue, setSearchBoxValue] = useState("");

  return (
    <>
      <div className="pb-2">Listコンポーネント</div>
      <List title="コンポーネント一覧">
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
                "xxx",
                "xxx",
                "xxx",
                "xxx",
                "xxx",
                "xxx",
                "xxx",
                "xxx",
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
        </div>
      </List>
    </>
  );
}
