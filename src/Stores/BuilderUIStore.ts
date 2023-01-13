import {makeAutoObservable} from "mobx";
import {BuilderPage} from "../Types/ui.types";


class BuilderUIStore {

  saveDialogue = false;
  builderPage: BuilderPage | null = null;
  fullView = false;

  constructor() {
    makeAutoObservable(this);
  }

  showSaveDialogue(){
    this.saveDialogue = true;
  }

  hideSaveDialogue(){
    this.saveDialogue = false;
  }

  setBuilderPage(builderPage: BuilderPage){
    this.builderPage = builderPage;
  }

  setFullView(){
    this.fullView = true;
  }

}

const store = new BuilderUIStore();
export default store
