import React, {FunctionComponent, PropsWithChildren} from "react";
import css from "./FadeIn.module.scss"

export type FadeInPropsType = {
  className?: string,
  quick?: boolean,
}

const FadeIn: FunctionComponent<PropsWithChildren<FadeInPropsType>> = ({
  children,
  className = '',
  quick = false,
}: PropsWithChildren<FadeInPropsType>) => {

  return (
    <div
      className={`
        ${css.fadeIn}
        ${quick ? css.quick : ''}
        ${className}
      `}
    >
      { children }
    </div>
  );
}

export default FadeIn;
