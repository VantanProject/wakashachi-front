import React, { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core"; // ライブラリ

export interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export function Draggable({ id, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const [isHovered, setIsHovered] = useState(false);

  // "mobile-view" 要素のスクロール位置を取得
  const getMobileViewScrollOffset = () => {
    const mobileViewElement = document.getElementById("mobile-view");

    if (mobileViewElement) {
      return {
        scrollX: mobileViewElement.scrollLeft || 0,
        scrollY: mobileViewElement.scrollTop || 0,
      };
    }
    return { scrollX: 0, scrollY: 0 };
  };

  const { scrollX, scrollY } = getMobileViewScrollOffset();

  // MouseMoveイベントでカーソル位置を追跡
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mobileViewElement = document.getElementById("mobile-view");
      if (mobileViewElement) {
        const rect = mobileViewElement.getBoundingClientRect();
        const isInElement =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        setIsHovered(isInElement);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // スクロール位置を考慮した位置調整
  const style: React.CSSProperties = {
    transform: transform
      ? isHovered
        ? `translate3d(${transform.x - scrollX}px, ${transform.y - scrollY}px, 0)`
        : `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined, // "mobile-view" のスクロール位置を考慮してズレを補正
    zIndex: transform ? 99 : undefined, // transformがある場合はzIndexを99に設定
    position: transform ? "absolute" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
