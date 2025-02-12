import {
  CompareTranslationProps,
  CompareTranslationResponse,
} from "@/api/CompareTranslation";
import { LanguageSelect } from "./LanguageSelect";
import { useState } from "react";

export function TranslationSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [compareTranslationProps, setCompareTranslationProps] =
    useState<CompareTranslationProps>({
      text: "",
      sourceId: 1,
      targetId: 2,
    });
  const [results, setResults] = useState<CompareTranslationResponse["results"]>(
    {
      google: {
        translation: "",
        backTranslation: "",
        totalScore: 0,
      },
      deepl: {
        translation: "",
        backTranslation: "",
        totalScore: 0,
      },
    }
  );

  return (
    <div className="fixed left-0 z-10 shadow-2xl shadow-accent">
      <div className="relative bg-baseColor pt-14 h-screen">
        <button
          className="absolute top-1/2 left-full bg-baseColor py-1 pr-1 pl-4 rounded-r-3xl shadow-[0_0_10px_0.5px_var(--accent-color)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-10 h-10 bg-accentLight text-text rounded-full flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z" />
            </svg>
          </div>
        </button>

        <div
          className={`px-4 py-12 flex flex-col gap-10 overflow-y-scroll h-[calc(100vh-80px)] no-scrollbar ${
            isOpen ? "" : "hidden"
          }`}
        >
          <div>
            <textarea
              className="w-[640px] h-48 bg-baseColor p-2 border border-textOpacity rounded-xl resize-none"
              placeholder="翻訳したい文字を入力してください"
              value={compareTranslationProps.text}
              onChange={(e) => {
                setCompareTranslationProps({
                  ...compareTranslationProps,
                  text: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <button className="py-2 bg-accent rounded-lg text-baseColor text-xl font-bold">
              翻訳
            </button>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-textOpacity">翻訳前の言語</p>
                <LanguageSelect
                  value={compareTranslationProps.sourceId}
                  width="288px"
                  onChange={(selectItem) => {
                    setCompareTranslationProps({
                      ...compareTranslationProps,
                      sourceId: selectItem.value,
                    });
                  }}
                />
              </div>
              <div className="pt-6">
                <button
                  onClick={() =>
                    setCompareTranslationProps({
                      ...compareTranslationProps,
                      sourceId: compareTranslationProps.targetId,
                      targetId: compareTranslationProps.sourceId,
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28px"
                    viewBox="0 -960 960 960"
                    width="28px"
                    fill="currentColor"
                  >
                    <path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" />
                  </svg>
                </button>
              </div>
              <div>
                <p className="text-xs text-textOpacity">翻訳後の言語</p>
                <LanguageSelect
                  width="288px"
                  value={compareTranslationProps.targetId}
                  onChange={(selectItem) => {
                    setCompareTranslationProps({
                      ...compareTranslationProps,
                      targetId: selectItem.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>

          <table className="border-collapse bg-accentLight rounded-xl">
            <thead>
              <tr className="border-b border-text">
                <td className="py-2 text-center border-r border-text">
                  Google翻訳
                </td>
                <td className="py-2 text-center">DeepL翻訳</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.entries(results).map(([key, value]) => (
                  <td className="p-4 first:border-r border-text" key={key}>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-xs text-textOpacity pb-1">スコア</p>
                        <div className="relative h-8 bg-textOpacity rounded-lg overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-accent"
                            style={{ width: `${value.totalScore}%` }}
                          />
                          <p className="absolute top-0 left-6 h-full flex items-center text-baseColor">{`${value.totalScore}%`}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-textOpacity pb-1">翻訳後</p>
                        <textarea
                          className="w-full h-32 resize-none rounded-lg p-2"
                          value={value.translation}
                          placeholder="翻訳後の文字"
                          readOnly
                        />
                      </div>

                      <div>
                        <p className="text-xs text-textOpacity pb-1">逆翻訳</p>
                        <textarea
                          className="w-full h-32 resize-none rounded-lg p-2"
                          value={value.backTranslation}
                          placeholder="逆翻訳後の文字"
                          readOnly
                        />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
