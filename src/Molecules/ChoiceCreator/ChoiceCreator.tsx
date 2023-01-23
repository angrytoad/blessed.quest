import React, {FunctionComponent, useContext, useState} from "react";
import { observer } from "mobx-react";
import css from "./ChoiceCreator.module.scss"
import {AppContext} from "../../AppContext";
import {Cancel, Plus} from "iconoir-react";
import ClickableText from "../../Atoms/ClickableText/ClickableText";
import ExpandIn from "../../Atoms/ExpandIn/ExpandIn";
import FadeIn from "../../Atoms/FadeIn/FadeIn";
import TextInput from "../../Atoms/TextInput/TextInput";
import SearchableSelect, {SearchableSelectOption} from "../../Atoms/SearchableSelect/SearchableSelect";
import Button from "../../Atoms/Button/Button";



const ChoiceCreator: FunctionComponent = () => {

  const [showChoiceForm, setShowChoiceForm] = useState(false);

  const [choiceText, setChoiceText] = useState("");
  const [choicePage, setChoicePage] = useState<SearchableSelectOption | null>(null);

  const {
    BuilderUIStore,
    BuilderStore,
  } = useContext(AppContext);

  const handleAdd = () => {
    alert('not added yet');
  }

  const handleShowChoiceForm = () => {
    setShowChoiceForm(true);
  }

  const handleHideChoiceForm = () => {
    setShowChoiceForm(false);
  }

  const handleSubmit = () => {
    if(choicePage){
      BuilderStore.addContextualPageChoice(choiceText, choicePage.id);
      setShowChoiceForm(false);
      setChoiceText("");
      setChoicePage(null);
    }

  }

  const canSubmit = () => {
    return choiceText.length > 0 && choicePage !== null;
  }

  const contextualPage = BuilderStore.contextualPage;

  if(!contextualPage){
    return null;
  }

  return (
    <div className={css.choiceCreator}>
      {
        showChoiceForm
          ?
          <FadeIn>
            <div className={css.choiceForm}>
              <div className={css.header}>
                <span>Add a new choice</span>
                <Cancel
                  className={css.closeForm}
                  onClick={handleHideChoiceForm}
                />
              </div>
              <div className={css.form}>
                <label>What text should the reader see?</label>
                <TextInput
                  className={css.input}
                  value={choiceText}
                  onChange={(value) => setChoiceText(value)}
                  placeholder="Enter some text"
                />
                <label>What page should this take the reader to?</label>
                {
                  choicePage
                  ?
                    <>
                      <div className={css.selected}>
                        <div className={css.pageNumber}>
                          Page { choicePage.number }&nbsp;
                          <span className={css.changePage} onClick={() => setChoicePage(null)}>
                           (change)
                          </span>
                        </div>
                        <div className={css.text}>{ choicePage.lines[0] }</div>
                      </div>

                    </>
                  :
                    <SearchableSelect
                      className={css.input}
                      options={
                        BuilderStore.searchablePages.map((searchablePage) => {
                          return {
                            ...searchablePage,
                            render: (
                              <div className={css.pageSelect}>
                                <div className={css.pageNumber}>Page { searchablePage.number }</div>
                                <div className={css.text}>{ searchablePage.lines[0] }</div>
                              </div>
                            )
                          }
                        })
                      }
                      keys={[
                        "number",
                        "lines",
                      ]}
                      onSelect={(option) => {
                        setChoicePage(option)
                      }}
                    />
                }
                <Button
                  className={css.submit}
                  disabled={!canSubmit()}
                  onClick={handleSubmit}
                >
                  Add Choice
                </Button>
              </div>
            </div>
          </FadeIn>
          :
          <>
            <p className={css.title}>Choices</p>
            {
              contextualPage.choices.length === 0 && (
                <span className={css.empty}>This page has no choices yet, but you can create them below.</span>
              )
            }
            {
              contextualPage.choices.map((choice) => {
                return <p key={choice.linkTo}>{ choice.text }</p>
              })
            }
            <div className={css.add}>
              <Button onClick={handleShowChoiceForm}>Create new choice</Button>
            </div>
          </>
      }
    </div>
  );
}

export default observer(ChoiceCreator);
