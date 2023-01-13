import {makeAutoObservable} from "mobx";
import {Metadata} from "../Types/story.types";


class BuilderStore {

  metadata: Metadata = {
    title: '',
  };
  pages = [];

  constructor() {
    makeAutoObservable(this);
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
