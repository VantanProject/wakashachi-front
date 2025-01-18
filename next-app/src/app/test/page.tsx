"use client";

import { Button } from "@/components/Button";
import { DeleteButton } from "@/components/DeleteButton";
import { DeleteModal } from "@/components/DeleteModal";
import { List } from "@/components/List";
import { Pagination } from "@/components/Pagination";
import { SearchBox } from "@/components/SearchBox";
import { Select } from "@/components/Select";
import { EggIcon } from "@/components/allergies/EggIcon";
import { MilkIcon } from "@/components/allergies/MilkIcon";
import { WheatIcon } from "@/components/allergies/WheatIcon";
import { SobaIcon } from "@/components/allergies/SobaIcon";
import { PeanutsIcon } from "@/components/allergies/PeanutsIcon";
import { ShrinpIcon } from "@/components/allergies/ShrinpIcon";
import { CrabIcon } from "@/components/allergies/CrabIcon";
import { AbaloneIcon } from "@/components/allergies/AbaloneIcon";
import { SquidIcon } from "@/components/allergies/SquidIcon";
import { SalmonRoeIcon } from "@/components/allergies/SalmonRoeIcon";
import { OrangeIcon } from "@/components/allergies/OrangeIcon";
import { KiwiIcon } from "@/components/allergies/KiwiIcon";
import { BeefIcon } from "@/components/allergies/BeefIcon";
import { WalnutsIcon } from "@/components/allergies/WalnutsIcon";
import { SakeIcon } from "@/components/allergies/SakeIcon";
import { SabaIcon } from "@/components/allergies/SabaIcon";
import { SoybeanIcon } from "@/components/allergies/SoybeanIcon";
import { ChickenIcon } from "@/components/allergies/ChickenIcon";
import { BananaIcon } from "@/components/allergies/BananaIcon";
import { PorkIcon } from "@/components/allergies/PorkIcon";
import { MatsutakeIcon } from "@/components/allergies/MatsutakeIcon";
import { PeachIcon } from "@/components/allergies/PeachIcon";
import { YamIcon } from "@/components/allergies/YamIcon";
import { AppleIcon } from "@/components/allergies/AppleIcon";
import { GelatinIcon } from "@/components/allergies/GelatinIcon";
import { SesameIcon } from "@/components/allergies/SesameIcon";
import { CashewIcon } from "@/components/allergies/CashewIcon";
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
          <div>
            <div className="pb-2">allergiesIcon コンポーネント</div>
            <ul className="flex gap-3">
              <li><EggIcon size="large"/></li>
              <li><MilkIcon/></li>
              <li><WheatIcon/></li>
              <li><SobaIcon /></li>
              <li><PeanutsIcon /></li>
              <li><ShrinpIcon /></li>
              <li><CrabIcon /></li>
              <li><AbaloneIcon size="large" /></li>
              <li><SquidIcon /></li>
              <li><SalmonRoeIcon /></li>
              <li><OrangeIcon /></li>
              <li><KiwiIcon /></li>
              <li><BeefIcon /></li>
              <li><WalnutsIcon /></li>
              <li><SakeIcon /></li>
              <li><SabaIcon /></li>
              <li><SoybeanIcon /></li>
              <li><ChickenIcon /></li>
              <li><BananaIcon /></li>
              <li><PorkIcon /></li>
              <li><MatsutakeIcon /></li>
              <li><PeachIcon /></li>
              <li><YamIcon /></li>
              <li><AppleIcon /></li>
              <li><GelatinIcon /></li>
              <li><SesameIcon /></li>
              <li><CashewIcon /></li>
            </ul>
          </div>
        </div>
      </List>
    </>
  );
}
