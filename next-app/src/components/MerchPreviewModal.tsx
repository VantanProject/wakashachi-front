import { Rnd } from "react-rnd";
import { Modal } from "./Modal";
import Image from "next/image";
import { AllergyIcon } from "./AllergyIcon";
import { MerchIndexResponse } from "@/api/MerchIndex";
import { useState } from "react";
import { LanguageSelect } from "./LanguageSelect";

export interface MerchPreviewModalProps {
  onClose: () => void;
  merch: {
    url: string;
    allergyNames: string[];
    translations: Array<{
      languageId: number;
      name: string;
    }>;
    price: number;
  };
}

export function MerchPreviewModal({ onClose, merch }: MerchPreviewModalProps) {
  const [languageId, setLanguageId] = useState(1);
  return (
    <>
      <Modal onClose={onClose}>
        <Rnd
          default={{
            x: -150,
            y: -150,
            width: 300,
            height: 300,
          }}
        >
          <div className="w-full h-full">
            <div className="relative bg-gray-100 overflow-hidden w-full h-full">
              <Image
                unoptimized={true}
                className="absolute top-0 w-full h-auto"
                src={merch.url}
                width={100}
                height={100}
                alt=""
                draggable={false}
              />

              <div className="absolute bottom-1/3 w-full p-1 flex gap-1 justify-end">
                {merch.allergyNames.map((name, allergyIndex) => (
                  <AllergyIcon
                    allergyType={name}
                    sizeCategory="large"
                    key={allergyIndex}
                  />
                ))}
              </div>
              <div
                className="absolute bottom-0 h-1/3 bg-baseColor w-full p-2"
                style={{
                  fontSize: `${Math.min(300 / 12, 16)}px`,
                }}
              >
                <div className="h-3/5">
                  {
                    merch.translations.find(
                      (translation) => translation.languageId === languageId
                    )?.name
                  }
                </div>
                <div className="text-right">
                  {merch.price}
                  円（税込）
                </div>
              </div>
            </div>
          </div>
        </Rnd>
      </Modal>

      <div className="fixed bottom-16 right-16 z-30">
        <LanguageSelect
          width="100px"
          value={languageId}
          onChange={(item) => setLanguageId(item.value)}
        />
      </div>
    </>
  );
}
