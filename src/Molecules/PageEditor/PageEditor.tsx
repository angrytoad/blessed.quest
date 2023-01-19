import React, {FunctionComponent, useContext} from "react";
import { observer } from "mobx-react";
import css from "./PageEditor.module.scss"
import FadeIn from "../../Atoms/FadeIn/FadeIn";
import {AppContext} from "../../AppContext";
import ReactCodeMirror from "@uiw/react-codemirror";
import {markdown} from "@codemirror/lang-markdown";
import {EditorView} from "@codemirror/view"
import ReactMarkdown from "react-markdown";
import ImageNode from "./ImageNode/ImageNode";

export type PageEditorPropsType = {}

const PageEditor: FunctionComponent<PageEditorPropsType> = ({}: PageEditorPropsType) => {
  const {
    BuilderStore,
  } = useContext(AppContext);

  const handleChange = (content: string) => {
    BuilderStore.setContextualPageContent(content);
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
            <div className={css.page}>
              <div className={css.pageInfo}>
                <span>Page { BuilderStore.contextualPageNumber }</span>
              </div>
              <div className={css.editor}>
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
