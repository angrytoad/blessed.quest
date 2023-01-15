import {makeAutoObservable} from "mobx";
import {clearPersistedStore, makePersistable} from 'mobx-persist-store';
import {Metadata, Page} from "../Types/story.types";
import localforage from "localforage";


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
      content: `Page ${this.pages.length+1}`
    }
    this.pages.push(page);
    return page;
  }

  setContextualPage(page: Page){
    this.contextualPage = page;
  }

}

const store = new BuilderStore();
export default store
