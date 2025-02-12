"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MerchStoreProps } from "@/api/MerchStore";
import { AllergySelect, AllergySelectResponse } from "@/api/AllergySelect";
import { Select, SelectItem } from "./Select";
import { LanguageSelect } from "./LanguageSelect";
import { TranslationSidebar } from "./TranslationSidebar";

export interface MerchCustomProps {
  type: "store" | "update";
  merch: MerchStoreProps["merch"];
  setMerch: React.Dispatch<React.SetStateAction<MerchStoreProps["merch"]>>;
  onSubmit: () => void;
}

export function MerchCustom({
  type,
  onSubmit,
  setMerch,
  merch,
}: MerchCustomProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setMerch((prevMerch) => ({
        ...prevMerch,
        imgData: file,
      }));
    }
  };

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

  const handleLabelChange = (index: number, value: string) => {
    setMerch((prevMerch) => ({
      ...prevMerch,
      translations: prevMerch.translations.map((translation, i) =>
        i === index ? { ...translation, name: value } : translation
      ),
    }));
  };

  const handlePriceChange = (value: number) => {
    setMerch((prevMerch) => ({
      ...prevMerch,
      price: value,
    }));
  };

  return (
    <>
      <div className="mx-auto p-4">
        <div className="flex md:flex-row gap-16">
          <div className="flex justify-end">
            <div className="flex flex-col items-center">
              <div className="w-full pl-3 text-lg font-bold text-[#999999]">
                アレルギー
              </div>
              <div className="mb-10 w-full border-2 flex items-center p-2 bg-white rounded-md">
                <Select
                  className="w-full h-full"
                  placeholder=""
                  options={allergies}
                  multi={true}
                  onChange={(selectedItems: SelectItem[]) =>
                    setMerch((prevMerch) => ({
                      ...prevMerch,
                      allergyIds: selectedItems.map((item) => item.value),
                    }))
                  }
                />
              </div>
              <label
                htmlFor="fileInput"
                className={`${
                  selectedImage === null
                    ? "w-[500px] h-[500px]"
                    : "w-[500px] h-auto"
                } flex items-center justify-center border-2 border-[#999999] border-dashed rounded-xl bg-[#F0F0F0] cursor-pointer`}
              >
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                {selectedImage === null ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Image
                      src={"/merch-add.svg"}
                      alt="Upload image"
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                    <div className="text-text font-bold text-lg mt-3">
                      ファイルをアップロード
                    </div>
                  </div>
                ) : (
                  <Image
                    src={selectedImage}
                    alt="Selected image"
                    width={500}
                    height={0}
                    className="rounded-xl"
                    objectFit="cover"
                  />
                )}
              </label>
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-12 space-y-12 w-[500px]">
              {["日本語", "英語", "中国語", "韓国語"].map((label, index) => (
                <div key={index} className="flex items-center">
                  <label className="mb-1 text-lg min-w-[80px] font-bold text-[#999999]">
                    {label}
                  </label>
                  <input
                    type="text"
                    placeholder="商品名"
                    className="border-2 rounded-md p-5 border-[#DAD8D8] w-full"
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    value={merch.translations[index]?.name || ""}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center pt-8 border-t-2 border-[#DAD8D8]">
              <label className="mb-1 text-lg min-w-[80px] font-bold text-[#999999]">
                Price
              </label>
              <div className="flex items-center w-full overflow-hidden rounded-md border-2 border-[#DAD8D8]">
                <div className="bg-[#F4F4F4] p-4 text-text">¥</div>
                <input
                  value={merch.price || ""}
                  type="number"
                  className="p-4 outline-none w-full"
                  placeholder="0.00"
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="mt-10 bg-accent text-white py-2 px-8 rounded-lg transition-colors"
                onClick={onSubmit}
              >
                {type === "store" ? "新規登録" : "変更"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <TranslationSidebar />
    </>
  );
}
