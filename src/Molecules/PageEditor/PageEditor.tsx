import React, {FunctionComponent, useContext} from "react";
import {observer} from "mobx-react";
import css from "./PageEditor.module.scss"
import FadeIn from "../../Atoms/FadeIn/FadeIn";
import {AppContext} from "../../AppContext";
import ReactCodeMirror from "@uiw/react-codemirror";
import {markdown} from "@codemirror/lang-markdown";
import {EditorView} from "@codemirror/view"
import ReactMarkdown from "react-markdown";
import ImageNode from "./ImageNode/ImageNode";
import {DocStarAlt, NetworkRight, PageEdit, ViewColumns2} from "iconoir-react";
import {PageViewStyle} from "../../Types/ui.types";
import FloatingContent from "../../Atoms/FloatingContent/FloatingContent";
import ChoiceCreator from "../ChoiceCreator/ChoiceCreator";

export type PageEditorPropsType = {}

const PageEditor: FunctionComponent<PageEditorPropsType> = ({}: PageEditorPropsType) => {
  const {
    BuilderStore,
    BuilderUIStore,
  } = useContext(AppContext);

  const handleChange = (content: string) => {
    BuilderStore.setContextualPageContent(content);
  }

  const handleSetPageViewStyle = (style: PageViewStyle) => {
    BuilderUIStore.setPageViewStyle(style);
  }

  const contextualPage = BuilderStore.contextualPage

  return (
    <FadeIn className={css.pageEditor}>
      <div className={css.contextualPage}>
        {
          !contextualPage
          ?
            <div className={css.noPageSelected}>
              <p>You haven't select a page yet, select a page from the All pages list on the left to start editing</p>
            </div>
          :
            <div
              className={`
                ${css.page}
                ${css[BuilderUIStore.pageViewStyle]}
              `}
            >
              <div className={css.pageInfo}>
                <span className={css.number}>Page { BuilderStore.contextualPageNumber }</span>
                <div className={css.actions}>
                  <div className={css.otherActions}>
                    <FloatingContent
                      labelClassName={css.option}
                      title="Add choices"
                      label={
                        <>
                          <NetworkRight className={css.icon} />
                          {
                            contextualPage.choices.length > 0 && (
                              <span className={css.count}>{ contextualPage.choices.length }</span>
                            )
                          }
                        </>
                      }
                    >
                      <ChoiceCreator />
                    </FloatingContent>
                  </div>
                  <div className={css.viewSelector}>
                    <div
                      className={`
                        ${css.option}
                        ${BuilderUIStore.pageViewStyle === PageViewStyle.MARKDOWN ? css.active : ''}
                    `}
                      title="Editor view"
                      onClick={() => handleSetPageViewStyle(PageViewStyle.MARKDOWN)}
                    >
                      <PageEdit className={css.icon} />
                    </div>
                    <div
                      className={`
                        ${css.option}
                        ${BuilderUIStore.pageViewStyle === PageViewStyle.SPLIT ? css.active : ''}
                      `}
                      title="Split view"
                      onClick={() => handleSetPageViewStyle(PageViewStyle.SPLIT)}
                    >
                      <ViewColumns2 className={css.icon} />
                    </div>
                    <div
                      className={`
                        ${css.option}
                        ${BuilderUIStore.pageViewStyle === PageViewStyle.DISPLAY ? css.active : ''}
                      `}
                      title="Display view"
                      onClick={() => handleSetPageViewStyle(PageViewStyle.DISPLAY)}
                    >
                      <DocStarAlt className={css.icon} />
                    </div>

                  </div>
                </div>
              </div>
              <div
                className={`
                  ${css.editor}
                  ${css[BuilderUIStore.pageViewStyle]}
                `}
              >
                <ReactCodeMirror
                  className={css.mirror}
                  value={contextualPage.content}
                  height="100%"
                  extensions={[
                    markdown({}),
                    EditorView.lineWrapping,
                  ]}
                  autoFocus
                  onChange={handleChange}
                  basicSetup={{
                    lineNumbers: false,
                    foldGutter: false,
                  }}
                />
                <div className={css.preview}>
                  <ReactMarkdown
                    children={contextualPage.content}
                    disallowedElements={['a']}
                    components={{
                      img: (props) => <ImageNode {...props} />
                    }}
                  />
                </div>
              </div>
            </div>
        }
      </div>
    </FadeIn>
  );
}

export default observer(PageEditor);
