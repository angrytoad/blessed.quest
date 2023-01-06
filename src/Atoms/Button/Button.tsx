import React, {FunctionComponent, PropsWithChildren} from "react";
import { Lens } from "iconoir-react";
import css from "./Button.module.scss"

export type ButtonPropsType = {
  className?: string,
  disabled?: boolean,
  loading?: boolean,
  onClick?: () => void,
  icon?: string,
}

const Button: FunctionComponent<PropsWithChildren<ButtonPropsType>> = ({
  className = '',
  children,
  disabled = false,
  loading = false,
  onClick,
  icon,
}: PropsWithChildren<ButtonPropsType>) => {

  const handleClick = () => {
    if(!disabled && !loading && onClick){
      onClick();
    }
  }

  return (
    <button
      tabIndex={0}
      onClick={handleClick}
      className={`
        ${css.button}
        ${className}
        ${disabled || loading ? css.disabled : ''}
      `}
    >
      {
        loading
        ?
          <img alt="loading" src="/oval.svg" className={css.loading} />
        :
          <>
            {
              icon && (
                <div className={css.icon}>
                  { icon }
                </div>
              )
            }
          </>
      }
      {children}
    </button>
  );
}

export default Button;
