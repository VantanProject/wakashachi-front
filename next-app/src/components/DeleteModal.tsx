import Image from "next/image";
import { Modal } from "./Modal";

export interface DeleteModalProps {
  isShow: boolean;
  deleteItems: string[];
  onDelete: () => void;
  onClese: () => void;
}

export function DeleteModal({
  isShow,
  deleteItems,
  onDelete,
  onClese,
}: DeleteModalProps) {
  return (
    <>
      {isShow && (
        <Modal onClese={onClese}>
          <div className="w-[600px] bg-baseColor rounded-2xl pb-4">
            <div className="bg-accentDark mx-[1px] h-2 rounded-t-2xl" />
            <div className="flex justify-center items-center px-5">
              <div className="mt-7">
                <div className="flex">
                  <div className="flex justify-center items-center h-14 w-14 rounded-full bg-accentDark mr-6">
                    <Image
                      src="/trash.svg"
                      alt="ゴミ箱アイコン"
                      width={35}
                      height={35}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl text-text mb-4">
                      本当に削除しますか?
                    </h2>
                    <p className="text-text text-base mb-5">
                      削除すると、元に戻すことはことはできません。本当に宜しいですか?
                    </p>
                  </div>
                </div>
                <ul className="border border-text rounded-xl mb-6 overflow-y-auto h-48">
                  {deleteItems.map((item: string, index: number) => (
                    <li
                      key={index}
                      className="[&:not(:last-child)]:border-b px-4 py-2 border-textOpacity text-text text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end space-x-4">
                  <button
                    className="w-36 py-1 border border-textOpacity text-text rounded-xl"
                    onClick={onClese}
                  >
                    キャンセル
                  </button>
                  <button
                    className="w-36 py-1 border-2 border-formError transition duration-500 text-formError rounded-xl hover:bg-formError hover:text-baseColor"
                    onClick={onDelete}
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
