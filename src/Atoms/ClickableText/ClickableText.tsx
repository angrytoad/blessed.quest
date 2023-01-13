import React, {FunctionComponent, PropsWithChildren} from "react";
import css from "./ClickableText.module.scss"

export type ClickableTextPropsType = {
  onClick: () => void,
  muted?: boolean,
}

const ClickableText: FunctionComponent<PropsWithChildren<ClickableTextPropsType>> = ({
  onClick,
  children,
  muted = false,
}: PropsWithChildren<ClickableTextPropsType>) => {

  return (
    <span
      tabIndex={0}
      onClick={onClick}
      className={`
        ${css.clickableText}
        ${muted ? css.muted : ''}
      `}
    >
      { children }
    </span>
  );
}

export default ClickableText;
