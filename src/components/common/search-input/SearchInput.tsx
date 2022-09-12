import React from "react";
import classes from "./SearchInput.module.scss";

type TInputProps = {
  value: string | number;
  onChange: (value: string) => void;
  onSearchHandler: () => void;
};

export const SearchInput: React.FC<TInputProps> = ({
  value,
  onChange,
  onSearchHandler,
}) => {
  return (
    <div className={classes.wrap}>
      <input
        placeholder="Search"
        className={classes.input}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          onChange(e.currentTarget.value)
        }
      />
      <div className={classes.icon} onClick={onSearchHandler}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2105 17.4274 13.7873 16.4633 15.0491L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L15.0491 16.4633C13.7873 17.4274 12.2105 18 10.5 18ZM10.5 16C13.5376 16 16 13.5376 16 10.5C16 7.46243 13.5376 5 10.5 5C7.46243 5 5 7.46243 5 10.5C5 13.5376 7.46243 16 10.5 16Z"
            fill="#828282"
          />
        </svg>
      </div>
    </div>
  );
};
