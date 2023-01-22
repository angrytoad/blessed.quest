import {makeAutoObservable} from "mobx";
import {BuilderPage, PageViewStyle} from "../Types/ui.types";
import {clearPersistedStore, makePersistable} from "mobx-persist-store";
import localforage from "localforage";


class BuilderUIStore {

  saveDialogue = false;
  builderPage: BuilderPage | null = null;
  fullView = false;

  pageViewStyle = PageViewStyle.MARKDOWN;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'BuilderUIStore',
      properties: [
        'builderPage',
        'fullView',
        'pageViewStyle'
      ],
      storage: localforage
    });
  }

  clearPersistable(){
    clearPersistedStore(this);
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

  hideFullView(){
    this.fullView = false;
  }

  setPageViewStyle(style: PageViewStyle){
    this.pageViewStyle = style;
  }

}

const store = new BuilderUIStore();
export default store
