export interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onClick: (page: number) => void;
}

export function Pagination({
  currentPage,
  lastPage,
  onClick,
}: PaginationProps) {
  const getPaginationItems = (): React.ReactNode[] => {
    if (lastPage <= 7) {
      const leftItems = Array.from(
        { length: lastPage },
        (_, index) => index + 1
      );
      const rightItems = new Array(7 - lastPage).fill(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="var(--text-color)"
        >
          <path d="M400-160h160v-44l50-20q65-26 110.5-72.5T786-400H174q20 57 65 103.5T350-224l50 20v44Zm-80 80v-70q-107-42-173.5-130T80-480h80v-320l720-80v60l-460 52v68h460v60H420v160h460q0 112-66.5 200T640-150v70H320Zm0-620h40v-62l-40 5v57Zm-100 0h40v-50l-40 4v46Zm100 220h40v-160h-40v160Zm-100 0h40v-160h-40v160Zm260 80Z" />
        </svg>
      );

      return [...leftItems, ...rightItems];
    } else {
      const leftItems = [1, 2, 3, 4].includes(currentPage)
        ? [1, 2, 3, 4, 5]
        : [1, "...."];
      const rightItems = [
        lastPage - 3,
        lastPage - 2,
        lastPage - 1,
        lastPage,
      ].includes(currentPage)
        ? [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage]
        : [currentPage - 1, currentPage, currentPage + 1, "････", lastPage];

      return !leftItems.includes(currentPage)
        ? [...leftItems, ...rightItems]
        : [...leftItems, "････", lastPage];
    }
  };

  const paginationItems = getPaginationItems();
  return (
    <div className="flex items-center gap-10">
      <div
        className="
          w-[36px] h-[36px] flex justify-center items-center font-bold border rounded-md transition duration-300
          text-text border-textOpacity bg-accentLight hover:shadow-lg
        "
        onClick={() => currentPage - 1 > 0 && onClick(currentPage - 1)}
        children="＜"
      />
      <div className="flex items-center gap-2">
        {paginationItems.map((item, index) => (
          <div key={index}>
            {typeof item === "number" ? (
              <button
                className={`
                w-[36px] h-[36px] flex justify-center items-center font-bold border rounded-md transition duration-300
                ${
                  item === currentPage
                    ? "text-baseColor border-accent bg-accent"
                    : "text-text border-textOpacity hover:shadow-lg"
                }
              `}
                onClick={() => item !== currentPage && onClick(item)}
                children={item}
              />
            ) : (
              <div
                className="w-[36px] h-[36px] flex justify-center items-center font-bold"
                children={item}
              />
            )}
          </div>
        ))}
      </div>
      <div
        className="
          w-[36px] h-[36px] flex justify-center items-center font-bold border rounded-md transition duration-300
          text-text border-textOpacity bg-accentLight hover:shadow-lg
        "
        onClick={() => currentPage + 1 <= lastPage && onClick(currentPage - 1)}
        children="＞"
      />
    </div>
  );
}
