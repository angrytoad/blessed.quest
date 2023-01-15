import React, {FunctionComponent, useContext} from "react";
import { observer } from "mobx-react";
import css from "./PageManager.module.scss"
import {AppContext} from "../../../AppContext";
import {BuilderPage} from "../../../Types/ui.types";
import MetadataEditor from "../../../Molecules/MetadataEditor/MetadataEditor";
import PageEditor from "../../../Molecules/PageEditor/PageEditor";

export type PageManagerPropsType = {

}

const PageManager: FunctionComponent<PageManagerPropsType> = ({

}: PageManagerPropsType) => {

  const {
    BuilderUIStore,
  } = useContext(AppContext);

  const getPage = () => {
    switch(BuilderUIStore.builderPage){
      case BuilderPage.METADATA:
        return <MetadataEditor />
      case BuilderPage.PAGE_EDITOR:
        return <PageEditor />
      default:
        return null;
    }
  };

  const page = getPage();

  return (
    <div className={css.pageManager}>
      { page }
    </div>
  );
}

export default observer(PageManager);
