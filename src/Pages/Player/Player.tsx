import React, {FunctionComponent} from "react";
import css from "./Player.module.scss"
import FadeIn from "../../Atoms/FadeIn/FadeIn";

export type PlayerPropsType = {}

const Player: FunctionComponent<PlayerPropsType> = ({}: PlayerPropsType) => {

  return (
    <FadeIn className={css.player}>
      <h1>Player</h1>
    </FadeIn>
  );
}

export default Player;
