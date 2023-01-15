import React, {FunctionComponent} from "react";
import css from "./MetadataEditor.module.scss"
import FadeIn from "../../Atoms/FadeIn/FadeIn";

export type MetadataEditorPropsType = {}

const MetadataEditor: FunctionComponent<MetadataEditorPropsType> = ({}: MetadataEditorPropsType) => {

  return (
    <FadeIn className={css.metadataEditor}>
      <h1>Metadata Editor</h1>
    </FadeIn>
  );
}

export default MetadataEditor;
