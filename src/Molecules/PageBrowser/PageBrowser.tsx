import React, {FunctionComponent, useContext} from "react";
import { observer } from "mobx-react";
import css from "./PageBrowser.module.scss"
import {AddPage, NavArrowRight} from "iconoir-react";
import {AppContext} from "../../AppContext";
import Button from "../../Atoms/Button/Button";
import {Page} from "../../Types/story.types";

export type PageBrowserPropsType = {
  className?: string,
}

const PageBrowser: FunctionComponent<PageBrowserPropsType> = ({
  className = '',
}: PageBrowserPropsType) => {

  const {
    BuilderStore,
  } = useContext(AppContext);

  const handleAddPage = () => {
    BuilderStore.addPage();
  }

  const handleSetContextualPage = (page: Page) => {
    BuilderStore.setContextualPage(page);
  }

  const contextualPage = BuilderStore.contextualPage;

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
          <div className={css.pages}>
            {
              BuilderStore.pages.map((page, i) => {
                const active = contextualPage && contextualPage.id === page.id;
                return (
                  <div
                    className={`
                      ${css.page}
                      ${active ? css.active : ''}
                    `}
                    key={i}
                    onClick={() => handleSetContextualPage(page)}
                  >
                    {
                      active && (
                        <NavArrowRight className={css.icon} />
                      )
                    }
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
