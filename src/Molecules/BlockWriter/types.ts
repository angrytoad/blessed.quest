export enum BlockType {
  PARAGRAPH = 'PARAGRAPH',
  HEADING = 'HEADING',
}

export type Blocks = Array<Block<BlockTypes>>;

export type BlockTypes = ParagraphBlock | HeadingBlock;

export type ParagraphBlock = {
  text: string,
}

export type HeadingBlock = {
  text: string,
  level: number,
}

export type Block<T> = {
  id: string,
  type: BlockType,
  data: T
}
