import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import css from "./Paragraph.module.scss"
import {Block, ParagraphBlock} from "../../types";

export type ParagraphPropsType = {
  block: Block<ParagraphBlock>,
  onReturn: (block: Block<ParagraphBlock>) => void,
  onDelete: (block: Block<ParagraphBlock>) => void,
  onSave: (block: Block<ParagraphBlock>) => void,
  onNavigateUp: (block: Block<ParagraphBlock>) => void,
  onNavigateDown: (block: Block<ParagraphBlock>) => void,
  onSetActive: (block: Block<ParagraphBlock>) => void,
  last: boolean,
  active: boolean,
}

const Paragraph: FunctionComponent<ParagraphPropsType> = ({
  block,
  onReturn,
  onDelete,
  onSave,
  onNavigateUp,
  onNavigateDown,
  onSetActive,
  last,
  active,
}: ParagraphPropsType) => {

  const p = useRef<any>();

  useEffect(() => {
    if(p.current){
      p.current.focus();
      moveCaretToEnd();
    }
  }, [block]);

  useEffect(() => {
    if(last && p.current){
      p.current.focus();
      moveCaretToEnd();
    }
  }, [last])

  useEffect(() => {
    if(active && p.current){
      p.current.focus();
      moveCaretToEnd();
    }
  }, [active])

  const moveCaretToEnd = () => {
    if(p.current){
      const selection = window.getSelection();
      if(selection !== null){
        selection.selectAllChildren(p.current)
        selection.collapseToEnd()
      }
    }
  }

  const handleChange = (e: any) => {
    /**
     * If there is nothing left in the block, just delete it, otherwise save
     */
    if(e.target.innerText.length === 0){
      onDelete(block);
    } else {
      onSave({
        ...block,
        data: {
          ...block.data,
          text: e.target.innerText,
        }
      });
    }
  }

  const handleKeyDown = (e: any) => {
    onSetActive(block);
    if(e.key === 'Backspace'){
      if(e.target.innerText.length === 0){
        e.stopPropagation();
        e.preventDefault();
        onDelete(block);
      }
    }
    if(e.key === 'Enter'){
      e.stopPropagation();
      e.preventDefault();
      onReturn(block);
    }
    if(e.key === 'ArrowUp'){
      const selection = window.getSelection();
      /**
       * If we are currently at offset 0 (meaning before the first character)
       */
      if(selection && selection.anchorOffset === 0){
        onNavigateUp(block);
      }
    }
    if(e.key === 'ArrowDown'){
      const selection = window.getSelection();
      if(selection){
        /**
         * Get the OG anchor offset, then select all children and get the length of that selection. If they are
         * the same this means our caret must be at the end of that content.
         */
        const anchorOffset = selection.anchorOffset;
        selection.selectAllChildren(p.current);
        const length = selection.toString().length;
        if(anchorOffset === length){
          onNavigateDown(block);
        }
      }
    }
  }

  return (
    <p
      ref={p}
      contentEditable
      suppressContentEditableWarning={true}
      className={css.p}
      onInput={handleChange}
      onKeyDown={handleKeyDown}
    >
      { block.data.text }
    </p>
  );
}

export default Paragraph;
