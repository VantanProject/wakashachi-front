import { Modal } from "@/components/Modal";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

export interface QRCodeModalProps {
  isOpen: boolean;
  selectedMenuId: number;
  onClose: () => void;
}

export function QRCodeModal({
  isOpen,
  selectedMenuId,
  onClose,
}: QRCodeModalProps) {
  const menuUrl = `${window.location.origin}/user/${selectedMenuId}`;
  const buttonClassName =
    "border bordertext rounded-3xl text-text w-full bg-white flex gap-2 items-center py-2 px-4";
  const onCopy = async () => {
    await navigator.clipboard.writeText(menuUrl);
  };
  const qrRef = useRef(null);
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {isOpen && (
        <Modal onClose={onClose}>
          <div className="bg-accentLight rounded-2xl flex flex-col gap-4 justify-center items-center p-8">
            <div className="bg-white flex justify-center items-center p-8">
              <QRCodeSVG ref={qrRef} value={menuUrl} className="w-[300px] h-[300px]" />
            </div>
            <div className="flex justify-between gap-4 w-full" onClick={onCopy}>
              <button className={buttonClassName}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                </svg>
                コピー
              </button>
              <button className={buttonClassName} onClick={downloadQRCode}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                </svg>
                ダウンロード
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
