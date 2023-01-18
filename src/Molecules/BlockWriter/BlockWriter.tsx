import React, {FunctionComponent, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {Block, Blocks, BlockType, BlockTypes, HeadingBlock, ParagraphBlock} from "./types";
import Paragraph from "./blocks/Paragraph/Paragraph";
import Heading from "./blocks/Heading/Heading";

export type BlockWriterPropsType = {
  content: Blocks
  onChange: (blocks: Blocks) => void,
}

const BlockWriter: FunctionComponent<BlockWriterPropsType> = ({
  content,
  onChange,
}: BlockWriterPropsType) => {
  const [activeBlock, setActiveBlock] = useState<string>('');

  const emptyBlock = (): Block<ParagraphBlock> => {
    return {
      id: uuidv4(),
      type: BlockType.PARAGRAPH,
      data: {
        text: '',
      },
    }
  }

  const handleReturn = (block: Block<BlockTypes>) => {
    const index = content.findIndex((b) => b.id === block.id);
    if(index > -1){
      const newBlock = emptyBlock();
      onChange([
        ...content.slice(0,index),
        block,
        newBlock,
        ...content.slice(index+1)
      ]);
      setActiveBlock(newBlock.id)
    }
  }

  const handleDelete = (block: Block<BlockTypes>) => {
    const index = content.findIndex((b) => b.id === block.id);
    if(index > -1){
      if(index > 0){
        setActiveBlock(content[index-1].id)
      }
      onChange([
        ...content.slice(0,index),
        ...content.slice(index+1)
      ]);
    }
  }

  const handleSave = (block: Block<BlockTypes>) => {
    const index = content.findIndex((b) => b.id === block.id);
    if(index > -1){
      onChange([
        ...content.slice(0,index),
        block,
        ...content.slice(index+1)
      ]);
    }
  }

  /**
   * Sets the active block to the previous so we can set its caret position
   */
  const handleNavigateUp = (block: Block<BlockTypes>) => {
    const index = content.findIndex((b) => b.id === block.id);
    if(index > 0){
      setActiveBlock(content[index-1].id)
    }
  }

  /**
   * Sets the active block to the next so we can set its caret position
   */
  const handleNavigateDown = (block: Block<BlockTypes>) => {
    const index = content.findIndex((b) => b.id === block.id);
    if(index > -1 && index < content.length-1){
      setActiveBlock(content[index+1].id)
    }
  }

  const handleSetActive = (block: Block<BlockTypes>) => {
    setActiveBlock(block.id);
  }

  const renderBlock = (block: Block<BlockTypes>, last: boolean) => {
    switch(block.type){
      case BlockType.PARAGRAPH:
        return <Paragraph
          block={block as Block<ParagraphBlock>}
          onReturn={handleReturn}
          onDelete={handleDelete}
          onSave={handleSave}
          onNavigateUp={handleNavigateUp}
          onNavigateDown={handleNavigateDown}
          onSetActive={handleSetActive}
          last={last}
          active={activeBlock === block.id}
        />
      case BlockType.HEADING:
        return <Heading block={block as Block<HeadingBlock>} />
    }
  }

  return (
    <>
      {
        content.map((block, i) => {
          return (
            <React.Fragment key={block.id}>
              {renderBlock(block, i === content.length-1)}
            </React.Fragment>
          )
        })
      }
    </>
  );
}

export default BlockWriter;
