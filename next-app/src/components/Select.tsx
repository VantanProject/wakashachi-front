import dynamic from "next/dynamic";
import { Props as ReactSelectProps, StylesConfig } from "react-select"; //ライブラリ
const ReactSelect = dynamic(() => import("react-select"), { ssr: false });

export interface SelectItem {
  value: number;
  label: string;
}

export interface SelectProps<IsMulti extends boolean = false>
  extends Omit<ReactSelectProps, "onChange"> {
  multi?: IsMulti;
  onChange?: (e: IsMulti extends true ? SelectItem[] : SelectItem) => void;
}

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    border: "none", // ボーダーを削除
    boxShadow: "none", // 通常時のボックスシャドウも削除
    "&:hover": {
      border: "none", // ホバー時のボーダーも削除
    },
  }),
  // 他のスタイル設定は同じ
  option: (provided, state) => ({
    ...provided,
    color: "var(--text-color)",
    backgroundColor: state.isFocused ? "var(--accent-light-color)" : undefined,
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 1000,
    left: 0,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export function Select<IsMulti extends boolean = false>(
  props: SelectProps<IsMulti>,
) {
  const handleChange = (newValue: unknown) => {
    if (props.onChange) {
      if (props.multi) {
        (props.onChange as (e: SelectItem[]) => void)(newValue as SelectItem[]);
      } else {
        (props.onChange as (e: SelectItem) => void)(newValue as SelectItem);
      }
    }
  };

  return (
    <ReactSelect
      isClearable={true}
      className={`relative ${props.className}`}
      options={props.options}
      isMulti={props.multi}
      maxMenuHeight={120}
      styles={customStyles}
      value={props.value}
      onChange={handleChange}
      placeholder={props.placeholder || "選択なし"}
      menuPlacement="auto"
    />
  );
}