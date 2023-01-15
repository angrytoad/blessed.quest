import React, {FunctionComponent} from "react";
import css from "./PageEditor.module.scss"
import FadeIn from "../../Atoms/FadeIn/FadeIn";

export type PageEditorPropsType = {}

const PageEditor: FunctionComponent<PageEditorPropsType> = ({}: PageEditorPropsType) => {

  return (
    <FadeIn className={css.pageEditor}>
      <h1>Hi, im the page editor</h1>
    </FadeIn>
  );
}

export default PageEditor;
