import React, {FunctionComponent} from "react";
import { uriTransformer } from "react-markdown";
import css from "./ImageNode.module.scss"


const ImageNode: FunctionComponent = (props: any) => {

  const url = uriTransformer(props.src);
  const text = props.alt;

  console.log(url);
  return (
    <div className={css.imageNode}>
      <img className={css.image} src={url} />
      <span className={css.text}>{ text }</span>
    </div>
  );
}

export default ImageNode;
