import React, {FunctionComponent} from "react";
import css from "./PageBrowser.module.scss"

export type PageBrowserPropsType = {
  className?: string,
}

const PageBrowser: FunctionComponent<PageBrowserPropsType> = ({
  className = '',
}: PageBrowserPropsType) => {

  return (
    <div
      className={`
        ${css.pageBrowser}
        ${className}
      `}
    >
      <p>Page Browser</p>
    </div>
  );
}

export default PageBrowser;
