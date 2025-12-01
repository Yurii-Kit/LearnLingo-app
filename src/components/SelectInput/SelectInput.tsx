import Select, { type StylesConfig } from "react-select";
import css from "./SelectInput.module.css";
import type { OptionType, SelectInputProps } from "../../types";

export default function SelectInput({
  width,
  label,
  options,
  defaultValue,
  onChange,
}: SelectInputProps) {
  const customStyles: StylesConfig<OptionType, false> = {
    control: (provided) => ({
      ...provided,
      boxSizing: "border-box",
      width: width,
      height: "48px",
      borderRadius: "14px",
      backgroundColor: "#fff",
      border: "none",
      boxShadow: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }),

    valueContainer: (provided: any) => ({
      ...provided,

      padding: 0,
      margin: 0,
      paddingLeft: "18px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }),

    indicatorsContainer: (provided: any) => ({
      ...provided,
      padding: 0,
      paddingRight: "18px",
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: 0,
      margin: 0,
      color: "#121417",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
      color: "#8a8a89",
      fontWeight: 500,
      fontSize: 18,
      lineHeight: 1.11,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      margin: 0,
      color: "#121417",
      fontWeight: 500,
      fontSize: 18,
      lineHeight: 1.11,
    }),

    menu: (provided: any) => ({
      ...provided,
      borderRadius: "12px",
      backgroundColor: "#fff",
      border: "1px solid rgba(18, 20, 23, 0.2)",
      overflow: "hidden",
      boxShadow: "none",
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: "160px", // обмеження висоти
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "red", // робимо червоною
      padding: 0,
      "&:hover": {
        color: "darkred", // при наведенні
      },
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      fontWeight: 500,
      fontSize: 18,
      lineHeight: 1.11,
      backgroundColor: "none",

      color: state.isSelected
        ? "#121417"
        : state.isFocused
        ? "#121417"
        : "rgba(18, 20, 23, 0.6)",
      padding: "10px 16px",
      cursor: "pointer",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className={css.wrapper}>
      <label className={css.label}>{label}</label>
      <Select
        styles={customStyles}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        isClearable
      />
    </div>
  );
}
