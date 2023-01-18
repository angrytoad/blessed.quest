import React, {FunctionComponent} from "react";
import css from "./Heading.module.scss"
import {Block, HeadingBlock} from "../../types";

export type HeadingPropsType = {
  block: Block<HeadingBlock>,
}

const Heading: FunctionComponent<HeadingPropsType> = ({
  block,
}: HeadingPropsType) => {

  const data = block.data;

  switch (data.level){
    case 1:
      return <h1>{ data.text }</h1>
    case 2:
      return <h2>{ data.text }</h2>
    case 3:
      return <h3>{ data.text }</h3>
    case 4:
      return <h4>{ data.text }</h4>
    default:
      return <h1>{ data.text }</h1>
  }
}

export default Heading;
