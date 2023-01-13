import React, {FunctionComponent, useContext} from "react";
import { observer } from "mobx-react";
import css from "./SaveDialogue.module.scss"
import {AppContext} from "../../AppContext";
import Modal from "../../Atoms/Modal/Modal";
import Button from "../../Atoms/Button/Button";
import ClickableText from "../../Atoms/ClickableText/ClickableText";
import {useLocation} from "wouter";

export type SaveDialoguePropsType = {
  title: string,
  text: string,
  onClose: () => void,
  onSave: () => void,
  onCancelSave: () => void,
  open: boolean,
}
const SaveDialogue: FunctionComponent<SaveDialoguePropsType> = ({
  title,
  text,
  onClose,
  onSave,
  onCancelSave,
  open,
}: SaveDialoguePropsType) => {
  const handleClose = () => {
    onClose();

  }

  const handleDontSave = () => {
    onCancelSave();
  }

  const handleSave = () => {
    onSave()
  }

  return (
    <Modal
      open={open}
      className={`
        ${css.saveDialogue}
        ${open ? css.open : css.closed}
      `}
      onClose={handleClose}
    >
      <h2>{ title }</h2>
      <p>
        { text }
      </p>
      <div className={css.buttons}>
        <Button icon="💾" onClick={handleSave}>Save</Button>
        <ClickableText onClick={handleDontSave} muted>Don't Save</ClickableText>
      </div>
    </Modal>
  );
}

export default observer(SaveDialogue);
