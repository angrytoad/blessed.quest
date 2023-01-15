import React, {FunctionComponent, useState} from "react";
import css from "./StoryCreationIntroduction.module.scss"
import Button from "../../Atoms/Button/Button";
import StoryCreationForm from "./StoryCreationForm/StoryCreationForm";
import FadeIn from "../../Atoms/FadeIn/FadeIn";

enum Steps {
  INTRODUCTION = 'INTRODUCTION',
  STORY_CREATION = 'STORY_CREATION'
}

export type StoryCreationIntroductionPropsType = {
  onCreation: () => void,
}

const StoryCreationIntroduction: FunctionComponent<StoryCreationIntroductionPropsType> = ({
  onCreation,
}: StoryCreationIntroductionPropsType) => {
  const [step, setStep] = useState(Steps.INTRODUCTION);

  const handleShowCreationForm = () => {
    setStep(Steps.STORY_CREATION);
  }

  const view = () => {
    switch(step){
      case Steps.INTRODUCTION:
        return (
          <>
            <h1>📚 The story starts here</h1>
            <p>
              Firstly, welcome to <strong>Blessed Quest</strong>, a 100% free and open source tool to aid in your storytelling.
            </p>
            <p>
              This tool is designed to help you create dynamic and interactive stories for people to read and interact with, a bit like
              the old-school old choose your own adventure books you might have read as a child.
            </p>
            <p>
              Take a bit of time to play around with the tool, and see what you can create!
            </p>
            <div className={css.buttons}>
              <Button className={css.button} icon="✨" onClick={handleShowCreationForm}>Create new story</Button>
              <Button className={css.button} icon="💾" disabled>Load existing story file</Button>
            </div>
          </>
        );
      case Steps.STORY_CREATION:
        return (
          <FadeIn>
            <StoryCreationForm
              onBack={() => setStep(Steps.INTRODUCTION)}
              onCreation={onCreation}
            />
          </FadeIn>
        )
    }
  }

  return (
    <div className={css.storyCreationIntroduction}>
      <div className={css.wrapper}>
        { view() }
      </div>
    </div>
  );
}

export default StoryCreationIntroduction;
