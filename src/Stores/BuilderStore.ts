import {makeAutoObservable} from "mobx";
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
      content: ''
    }
    this.pages.push(page);
    return page;
  }

  setContextualPage(page: Page){
    this.contextualPage = page;
  }

  setContextualPageContent(content: string){
    if(this.contextualPage){
      this.contextualPage.content = content;
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

}

const store = new BuilderStore();
export default store
