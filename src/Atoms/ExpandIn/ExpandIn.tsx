import React, {FunctionComponent, PropsWithChildren} from "react";
import css from "./ExpandIn.module.scss"
import FadeIn from "../FadeIn/FadeIn";

export type ExpandInPropsType = {
  className?: string,
}

const ExpandIn: FunctionComponent<PropsWithChildren<ExpandInPropsType>> = ({
  children,
  className = '',
}: PropsWithChildren<ExpandInPropsType>) => {

  return (
    <FadeIn quick>
      <div
        className={`
        ${css.expandIn}
        ${className}
      `}
      >
        { children }
      </div>
    </FadeIn>
  );
}

export default ExpandIn;
