import React, {FunctionComponent} from "react";
import css from "./Builder.module.scss"
import FadeIn from "../../Atoms/FadeIn/FadeIn";

export type BuilderPropsType = {}

const Builder: FunctionComponent<BuilderPropsType> = ({}: BuilderPropsType) => {

  return (
    <FadeIn className={css.builder}>
      <h1>Builder</h1>
    </FadeIn>
  );
}

export default Builder;
