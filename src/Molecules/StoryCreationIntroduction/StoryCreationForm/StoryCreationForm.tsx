import React, {FunctionComponent, useContext, useState} from "react";
import css from "./StoryCreationForm.module.scss"
import TextInput from "../../../Atoms/TextInput/TextInput";
import {AppContext} from "../../../AppContext";
import {Notes, Text, User} from "iconoir-react";
import ExpandIn from "../../../Atoms/ExpandIn/ExpandIn";
import Button from "../../../Atoms/Button/Button";
import BuilderUIStore from "../../../Stores/BuilderUIStore";

export type StoryCreationFormPropsType = {
  onBack: () => void,
  onCreation: () => void,
}

const StoryCreationForm: FunctionComponent<StoryCreationFormPropsType> = ({
  onBack,
  onCreation,
}: StoryCreationFormPropsType) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const [showDescription, setShowDescription] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);

  const {
    BuilderStore,
    BuilderUIStore,
  } = useContext(AppContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    BuilderStore.setStoryTitle(title);
    BuilderStore.setStoryDescription(description);
    BuilderStore.setStoryAuthor(author);
    onCreation();
    BuilderUIStore.setFullView();
  }

  const handleChangeTitle = (value: string) => {
    setTitle(value);
    if(value.length > 0){
      setShowAuthor(true);
    }
  }

  const handleChangeDescription = (value: string) => {
    setDescription(value);
  }

  const handleChangeAuthor = (value: string) => {
    setAuthor(value);
    if(value.length > 0){
      setShowDescription(true);
    }
  }

  const canSubmit = () => {
    return (
      title.length > 0 &&
      author.length > 0
    );
  }

  return (
    <form className={css.storyCreationForm} onSubmit={handleSubmit}>
      <div className={css.back} onClick={onBack}>◀ Back</div>
      <label>What is the name of your story?</label>
      <TextInput
        autoFocus
        className={css.input}
        icon={<>✨</>}
        value={title}
        onChange={handleChangeTitle}
        placeholder="Give your story a title"
      />
      {
        showAuthor && (
          <ExpandIn>
            <label>Who is the author of this story?</label>
            <TextInput
              className={css.input}
              icon={<User />}
              value={author}
              onChange={handleChangeAuthor}
              placeholder="Enter authors name"
            />
          </ExpandIn>
        )
      }
      {
        showDescription && (
          <ExpandIn>
            <label>Provide a short description of your story (optional, you can edit this later)</label>
            <TextInput
              className={css.input}
              icon={<Notes />}
              value={description}
              onChange={handleChangeDescription}
              placeholder="Give your story a description"
            />
            <Button disabled={!canSubmit()}>Save</Button>
          </ExpandIn>
        )
      }
    </form>
  );
}

export default StoryCreationForm;
