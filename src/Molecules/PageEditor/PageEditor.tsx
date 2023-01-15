import React, {FunctionComponent, useContext, useState} from "react";
import { observer } from "mobx-react";
import css from "./PageEditor.module.scss"
import FadeIn from "../../Atoms/FadeIn/FadeIn";
import {AppContext} from "../../AppContext";
import PageBrowser from "../PageBrowser/PageBrowser";
import VerticalPeeker from "../../Atoms/VerticalPeeker/VerticalPeeker";

export type PageEditorPropsType = {}

const PageEditor: FunctionComponent<PageEditorPropsType> = ({}: PageEditorPropsType) => {

  const [showPageBrowser, setShowPageBrowser] = useState(false);

  const {
    BuilderUIStore,
  } = useContext(AppContext);

  const handleOpenPageBrowser = () => {
    console.log('open browser');
    setShowPageBrowser(true);
  }

  const handleClosePageBrowser = () => {
    console.log('close browser');
    setShowPageBrowser(false);
  }

  return (
    <FadeIn className={css.pageEditor}>
      <VerticalPeeker
        text="Page Browser"
        open={showPageBrowser}
        onOpen={handleOpenPageBrowser}
        onClose={handleClosePageBrowser}
      >
        <PageBrowser />
      </VerticalPeeker>
      <div className={css.contextualPage}>
        <h1>Hi, im the page editor</h1>
      </div>
    </FadeIn>
  );
}

export default observer(PageEditor);
