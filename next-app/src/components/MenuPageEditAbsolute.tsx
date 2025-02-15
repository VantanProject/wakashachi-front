import { MenuStoreProps } from "@/api/MenuStore";

export interface MenuPageEditAbsoluteProps {
  menu: MenuStoreProps["menu"];
  setMenu: React.Dispatch<React.SetStateAction<MenuStoreProps["menu"]>>;
  pageIndex: number;
  selectedPageCount: number | null;
}

export function MenuPageEditAbsolute({
  menu,
  setMenu,
  pageIndex,
  selectedPageCount,
}: MenuPageEditAbsoluteProps) {
  return (
    <>
      <div className="absolute -top-7 left-0 text-textOpacity">
        {`${pageIndex}ページ目`}
      </div>
      <button
        className={`
                        absolute -top-7 right-0 text-textOpacity
                        ${menu.pages.length <= 1 ? "hidden" : ""}
                    `}
        onClick={() => {
          setMenu((menu) => {
            const newPages = menu.pages
              .filter((page) => page.count !== pageIndex)
              .map((page) => ({
                ...page,
                count:
                  page.count >= pageIndex + 1 ? page.count - 1 : page.count,
              }));

            return {
              ...menu,
              pages: newPages,
            };
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>

      <div
        className={`
                ${
                  pageIndex === selectedPageCount
                    ? "outline outline-2 outline-accent"
                    : "hidden"
                }
                absolute top-0 left-0 w-full h-full pointer-events-none
                `}
      >
        <div className="absolute w-2 h-2 bg-accent rounded-full top-[-5px] left-[-5px]" />
        <div className="absolute w-2 h-2 bg-accent rounded-full top-[-5px] right-[-5px]" />
        <div className="absolute w-2 h-2 bg-accent rounded-full bottom-[-5px] left-[-5px]" />
        <div className="absolute w-2 h-2 bg-accent rounded-full bottom-[-5px] right-[-5px]" />
      </div>

      <div className="group">
        <div className="absolute inset-y-0 -right-4 border-l border-8 border-accent rounded-xl transform scale-y-0 origin-center group-hover:scale-y-100 transition-transform duration-700" />
        <div className="absolute -right-16 flex items-center h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <button
            className="p-2 bg-accent rounded-lg"
            onClick={() => {
              setMenu((menu) => {
                const newPages = menu.pages.map((page) => ({
                  ...page,
                  count:
                    page.count >= pageIndex + 1 ? page.count + 1 : page.count,
                }));
                newPages.push({
                  count: pageIndex + 1,
                  items: [],
                });

                return {
                  ...menu,
                  pages: newPages,
                };
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
