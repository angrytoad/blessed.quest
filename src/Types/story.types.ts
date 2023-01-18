import {Block, BlockTypes} from "../Molecules/BlockWriter/types";

export type Metadata = {
  title: string,
  author?: string,
  description?: string,
}

export type Page = {
  id: string,
  content: Array<Block<BlockTypes>>,
}
