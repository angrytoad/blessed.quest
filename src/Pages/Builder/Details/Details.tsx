import React, {FunctionComponent, useContext} from "react";
import { observer } from "mobx-react";
import css from "./Details.module.scss";
import {AppContext} from "../../../AppContext";

export type DetailsPropsType = {}

const Details: FunctionComponent<DetailsPropsType> = ({

}: DetailsPropsType) => {
  const {
    BuilderStore,
    BuilderUIStore,
  } = useContext(AppContext);

  if(!BuilderUIStore.fullView){
    return null;
  }

  return (
    <>
      <div className={css.name}>
        <h2>{ BuilderStore.metadata.title }</h2>
        {
          BuilderStore.metadata.description && (
            <p>{ BuilderStore.metadata.description }</p>
          )
        }
      </div>
      <div className={css.authorAndPages}>
        <p className={css.author}>Written by <strong>{ BuilderStore.metadata.author }</strong></p>
        <p className={css.pages}>{ BuilderStore.pages.length } pages</p>
      </div>
    </>
  );
}

export default observer(Details);
