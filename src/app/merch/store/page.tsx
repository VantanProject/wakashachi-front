"use client";

import { MerchStoreProps } from "@/api/MerchStore";
import { MerchCustom } from "@/components/MerchCustom";
import { useState } from "react";
import { MerchStore } from "@/api/MerchStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [merch, setMerch] = useState<MerchStoreProps["merch"]>({
    translations: Array.from({ length: 4 }, (_, i) => i).map((_, index) => {
      return {
        languageId: index + 1,
        name: "",
      };
    }),
    allergyIds: [],
    price: null,
    imgData: null,
  });
  const storeApi = async () => {
    console.log(merch);
    const response = await MerchStore({ merch });

    alert(response.messages[0]);
    if (response.success) {
      router.push("/merch");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <MerchCustom
        type={"store"}
        merch={merch}
        setMerch={setMerch}
        onSubmit={() => storeApi()}
      />
    </div>
  );
}
