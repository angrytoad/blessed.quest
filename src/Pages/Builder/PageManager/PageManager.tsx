import React, {FunctionComponent, useContext} from "react";
import { observer } from "mobx-react";
import css from "./PageManager.module.scss"
import {AppContext} from "../../../AppContext";
import {BuilderPage} from "../../../Types/ui.types";

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
        return <h1>Meta Data</h1>
      case BuilderPage.PAGE_EDITOR:
        return <h1>Page Editor</h1>
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
