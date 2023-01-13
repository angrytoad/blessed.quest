import React, {FunctionComponent, ReactNode} from "react";
import css from "./TextInput.module.scss"

export type TextInputPropsType = {
  value: string,
  className?: string,
  onChange: (value: string) => void,
  icon?: string | ReactNode,
  placeholder?: string,
  autoFocus?: boolean,
}

const TextInput: FunctionComponent<TextInputPropsType> = ({
  value,
  onChange,
  className = '',
  icon,
  placeholder = 'Enter a value',
  autoFocus = false,
}: TextInputPropsType) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.target.value);
  }

  return (
    <div
      className={`
        ${css.textInput}
        ${className}
        ${icon ? css.withIcon : ''}
      `}
    >
      {
        icon && (
          <span className={css.icon}>{icon}</span>
        )
      }
      <input
        autoFocus={autoFocus}
        className={css.input}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;
