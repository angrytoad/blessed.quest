import React, {FunctionComponent, useContext, useState} from "react";
import { observer } from "mobx-react";
import css from "./PageEditor.module.scss"
import FadeIn from "../../Atoms/FadeIn/FadeIn";
import {AppContext} from "../../AppContext";
import PageBrowser from "../PageBrowser/PageBrowser";
import VerticalPeeker from "../../Atoms/VerticalPeeker/VerticalPeeker";
import BlockWriter from "../BlockWriter/BlockWriter";
import {Block, Blocks, BlockTypes} from "../BlockWriter/types";
import {toJS} from "mobx";

export type PageEditorPropsType = {}

const PageEditor: FunctionComponent<PageEditorPropsType> = ({}: PageEditorPropsType) => {

  const [showPageBrowser, setShowPageBrowser] = useState(false);

  const {
    BuilderUIStore,
    BuilderStore,
  } = useContext(AppContext);

  const handleOpenPageBrowser = () => {
    console.log('open browser');
    setShowPageBrowser(true);
  }

  const handleClosePageBrowser = () => {
    console.log('close browser');
    setShowPageBrowser(false);
  }

  const handleChange = (blocks: Blocks) => {
    console.log(toJS(blocks));
    BuilderStore.setContextualPageContent(blocks);
  }

  const contextualPage = BuilderStore.contextualPage;

  return (
    <FadeIn className={css.pageEditor}>
      <VerticalPeeker
        text="All Pages"
        open={showPageBrowser}
        onOpen={handleOpenPageBrowser}
        onClose={handleClosePageBrowser}
      >
        <PageBrowser />
      </VerticalPeeker>
      <div className={css.contextualPage}>
        {
          !contextualPage
          ?
            <div className={css.noPageSelected}>
              <p>You haven't select a page yet, select a page from the All pages list on the left to start editing</p>
            </div>
          :
            <div className={css.page}>
              <div className={css.pageInfo}>
                <span>Page { BuilderStore.contextualPageNumber }</span>
              </div>
              <div className={css.editor}>
                <BlockWriter
                  content={contextualPage.content}
                  onChange={handleChange}
                />
              </div>
            </div>
        }
      </div>
    </FadeIn>
  );
}

export default observer(PageEditor);
