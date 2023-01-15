import {makeAutoObservable} from "mobx";
import {clearPersistedStore, makePersistable} from 'mobx-persist-store';
import {Metadata} from "../Types/story.types";
import localforage from "localforage";


class BuilderStore {

  metadata: Metadata = {
    title: '',
  };
  pages = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'BuilderStore',
      properties: [
        'metadata',
        'pages'
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

}

const store = new BuilderStore();
export default store
