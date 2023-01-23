export type Metadata = {
  title: string,
  author?: string,
  description?: string,
}

export type Choice = {
  text: string,
  linkTo: string,
}

export type Page = {
  id: string,
  content: string,
  contentSearchable: string[],
  choices: Choice[],
}
