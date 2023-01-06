import React, {FunctionComponent} from "react";
import {useLocation} from 'wouter';
import css from "./Home.module.scss"
import Button from "../../Atoms/Button/Button";
import FadeIn from "../../Atoms/FadeIn/FadeIn";

export type HomePropsType = {}

const Home: FunctionComponent<HomePropsType> = ({}: HomePropsType) => {

  const [,setLocation] = useLocation();
  const handleNavigateBuilder = () => {
    setLocation('/builder');
  }

  const handleNavigatePlayer = () => {
    setLocation('/player');
  }

  return (
    <FadeIn className={css.home}>
      <div>
        <h1>✨️ Create amazing & dynamic stories</h1>
        <p>no account required, completely free!</p>
        <div className={css.buttons}>
          <Button onClick={handleNavigateBuilder} icon="📝">Story Builder</Button>
          <Button onClick={handleNavigatePlayer} icon="📖">Web Player</Button>
        </div>
      </div>
    </FadeIn>
  );
}

export default Home;
