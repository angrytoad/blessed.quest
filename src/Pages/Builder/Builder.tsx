import React, {FunctionComponent, useContext} from "react";
import { observer } from "mobx-react";
import css from "./Builder.module.scss"
import FadeIn from "../../Atoms/FadeIn/FadeIn";
import {AppContext} from "../../AppContext";
import {Cancel} from "iconoir-react";
import SaveDialogue from "../../Molecules/SaveDialogue/SaveDialogue";
import {useLocation} from "wouter";
import PageManager from "./PageManager/PageManager";
import {BuilderPage} from "../../Types/ui.types";
import Toolbar from "./Toolbar/Toolbar";
import Details from "./Details/Details";
import StoryCreationIntroduction from "../../Molecules/StoryCreationIntroduction/StoryCreationIntroduction";

export type BuilderPropsType = {}

const Builder: FunctionComponent<BuilderPropsType> = ({}: BuilderPropsType) => {

  const {
    BuilderUIStore,
  } = useContext(AppContext);

  const [,setLocation] = useLocation();

  const handleLeave = () => {
    BuilderUIStore.showSaveDialogue();
  }

  if(!BuilderUIStore.fullView){
    return (
      <FadeIn className={css.builderIntroduction}>
        <StoryCreationIntroduction
          onCreation={() => { BuilderUIStore.setBuilderPage(BuilderPage.PAGE_EDITOR) }}
        />
      </FadeIn>
    )
  }

  return (
    <>
      <FadeIn className={css.builder}>
        <div className={css.close}>
          <Cancel
            className={css.icon}
            width={40}
            height={40}
            onClick={handleLeave}
          />
        </div>
        <div className={css.details}>
          <Details />
        </div>
        <div className={css.page}>
          <PageManager />
        </div>
        <div className={css.toolbar}>
          <Toolbar />
        </div>
      </FadeIn>
      <SaveDialogue
        open={BuilderUIStore.saveDialogue}
        title="Save your progress?"
        text="Do you want to download a copy of your story? You can use this and come back to the editor at any time."
        onClose={() => BuilderUIStore.hideSaveDialogue()}
        onCancelSave={() => {
          BuilderUIStore.hideSaveDialogue()
          setLocation('/');
        }}
        onSave={() => {
          alert('Not implemented yet!')
        }}
      />
    </>
  );
}

export default observer(Builder);
