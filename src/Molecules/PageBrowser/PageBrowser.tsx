import React, {FunctionComponent, useContext} from "react";
import { observer } from "mobx-react";
import css from "./PageBrowser.module.scss"
import {AddPage} from "iconoir-react";
import {AppContext} from "../../AppContext";
import Button from "../../Atoms/Button/Button";
import ClickableText from "../../Atoms/ClickableText/ClickableText";
import {Page} from "../../Types/story.types";

export type PageBrowserPropsType = {
  className?: string,
  onClose: () => void,
}

const PageBrowser: FunctionComponent<PageBrowserPropsType> = ({
  className = '',
  onClose,
}: PageBrowserPropsType) => {

  const {
    BuilderStore,
  } = useContext(AppContext);

  const handleAddPage = () => {
    BuilderStore.addPage();
  }

  const handleSetContextualPage = (page: Page) => {
    BuilderStore.setContextualPage(page);
    onClose();
  }

  return (
    <div
      className={`
        ${css.pageBrowser}
        ${className}
      `}
    >
      <div className={css.actions}>
        <div
          className={css.action}
          title="Add a page"
          onClick={handleAddPage}
        >
          <AddPage className={css.icon} />
        </div>

      </div>
      {
        BuilderStore.pages.length === 0
        ?
          <div className={css.noPages}>
            <div>
              <p>You haven't got any pages... yet.</p>
              <Button onClick={handleAddPage}>Create a page</Button>
            </div>
          </div>
        :
          <div>
            {
              BuilderStore.pages.map((page, i) => {
                return (
                  <div className={css.page} key={i} onClick={() => handleSetContextualPage(page)}>
                    Page {i+1}
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  );
}

export default observer(PageBrowser);
