import React, {FunctionComponent, useContext, useState} from "react";
import {observer} from "mobx-react";
import css from "./Toolbar.module.scss"
import {AppContext} from "../../../AppContext";
import {Atom, Cancel, MultiplePages, Settings} from "iconoir-react";
import {BuilderPage} from "../../../Types/ui.types";
import VerticalPeeker from "../../../Atoms/VerticalPeeker/VerticalPeeker";
import PageBrowser from "../../../Molecules/PageBrowser/PageBrowser";

export type ToolbarPropsType = {}

const Toolbar: FunctionComponent<ToolbarPropsType> = ({}: ToolbarPropsType) => {
  const [showPageBrowser, setShowPageBrowser] = useState(false);

  const {
    BuilderStore,
    BuilderUIStore,
  } = useContext(AppContext);

  const handleLeave = () => {
    BuilderUIStore.showSaveDialogue();
  }

  const handleSelectPageEditor = () => {
    BuilderUIStore.setBuilderPage(BuilderPage.PAGE_EDITOR);
  }

  const handleSelectMetadata = () => {
    BuilderUIStore.setBuilderPage(BuilderPage.METADATA);
    handleClosePageBrowser();
  }

  const handleOpenPageBrowser = () => {
    setShowPageBrowser(true);
  }

  const handleClosePageBrowser = () => {
    setShowPageBrowser(false);
  }

  return (
    <div className={css.toolbar}>
      <div className={css.main}>
        <div
          className={`
          ${css.toolbarItem}
          ${BuilderUIStore.builderPage === BuilderPage.PAGE_EDITOR ? css.active : css.inactive}
        `}
          title="Page Editor"
          onClick={handleSelectPageEditor}
        >
          <MultiplePages className={css.icon} />
        </div>
        <div
          className={`
          ${css.toolbarItem}
          ${BuilderUIStore.builderPage === BuilderPage.METADATA ? css.active : css.inactive}
        `}
          title="Edit Metadata"
          onClick={handleSelectMetadata}
        >
          <Atom className={css.icon} />
        </div>
      </div>
      <div className={css.close}>
        <Cancel
          className={css.icon}
          width={40}
          height={40}
          onClick={handleLeave}
        />
      </div>

      <VerticalPeeker
        className={css.pageBrowser}
        text="All Pages"
        open={showPageBrowser}
        onOpen={handleOpenPageBrowser}
        onClose={handleClosePageBrowser}
      >
        <PageBrowser />
      </VerticalPeeker>
    </div>
  );
}

export default observer(Toolbar);
