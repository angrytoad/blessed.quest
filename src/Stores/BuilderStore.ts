import {makeAutoObservable, toJS} from "mobx";
import {clearPersistedStore, makePersistable} from 'mobx-persist-store';
import {Metadata, Page} from "../Types/story.types";
import localforage from "localforage";
import {v4 as uuidv4} from 'uuid';


class BuilderStore {

  metadata: Metadata = {
    title: '',
  };
  pages: Page[] = [];
  contextualPage: Page | null = null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'BuilderStore',
      properties: [
        'metadata',
        'pages',
        'contextualPage'
      ],
      storage: localforage
    });
  }

  clearPersistable(){
    clearPersistedStore(this);
  }

  setStoryTitle(title: string){
    if(this.metadata){
      this.metadata.title = title;
    }
  }

  setStoryDescription(description: string){
    if(this.metadata){
      this.metadata.description = description;
    }
  }

  setStoryAuthor(author: string){
    if(this.metadata){
      this.metadata.author = author;
    }
  }

  addPage(): Page{
    const page: Page = {
      id: uuidv4(),
      content: '',
      contentSearchable: [],
      choices: [],
    }
    this.pages.push(page);
    return page;
  }

  setContextualPage(page: Page){
    this.contextualPage = page;
  }

  addContextualPageChoice(text: string, linkTo: string){
    this.contextualPage?.choices.push({
      text,
      linkTo,
    })
  }

  setContextualPageContent(content: string){
    if(this.contextualPage){
      this.contextualPage.content = content;

      /**
       * Build an array of the most used words in the page content.
       */
      const sentenceSplit = content.split(".");
      const contentSearchable = sentenceSplit.map((sentence) => {
        return sentence.replace(/[\W_]+/g," ").trim()
      });

      this.contextualPage.contentSearchable = contentSearchable
      /**
       * Make sure we set this back in the global pages.
       */
      if(this.contextualPageNumber !== null){
        this.pages[this.contextualPageNumber-1].contentSearchable = contentSearchable;
        this.pages[this.contextualPageNumber-1].content = content;
      }
    }
  }

  get contextualPageNumber(): number | null {
    if(this.contextualPage !== null){
      return this.pages.findIndex((p) => {
        if(this.contextualPage){
          return p.id === this.contextualPage.id
        }
      }) + 1;
    }
    return null;
  }

  get searchablePages() {
    return this.pages.map((page, index) => {
      return {
        id: page.id,
        number: index+1,
        lines: page.contentSearchable,
      }
    })
  }

}

const store = new BuilderStore();
export default store
