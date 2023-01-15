import React, {FunctionComponent, useContext} from "react";
import {observer} from "mobx-react";
import css from "./Toolbar.module.scss"
import {AppContext} from "../../../AppContext";
import {Atom, Cancel, MultiplePages, Settings} from "iconoir-react";
import {BuilderPage} from "../../../Types/ui.types";

export type ToolbarPropsType = {}

const Toolbar: FunctionComponent<ToolbarPropsType> = ({}: ToolbarPropsType) => {

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

    </div>
  );
}

export default observer(Toolbar);
