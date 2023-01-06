import React, {FunctionComponent, PropsWithChildren} from "react";
import css from "./FadeIn.module.scss"

export type FadeInPropsType = {
  className?: string,
}

const FadeIn: FunctionComponent<PropsWithChildren<FadeInPropsType>> = ({
  children,
  className = '',
}: PropsWithChildren<FadeInPropsType>) => {

  return (
    <div
      className={`
        ${css.fadeIn}
        ${className}
      `}
    >
      { children }
    </div>
  );
}

export default FadeIn;
