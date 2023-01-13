import React, {FunctionComponent, useContext} from "react";
import { observer } from "mobx-react";
import css from "./Toolbar.module.scss"
import {AppContext} from "../../../AppContext";

export type ToolbarPropsType = {}

const Toolbar: FunctionComponent<ToolbarPropsType> = ({}: ToolbarPropsType) => {

  const {
    BuilderStore
  } = useContext(AppContext);

  return (
    <div className={css.toolbar}>
      { BuilderStore.metadata?.title }
    </div>
  );
}

export default observer(Toolbar);
