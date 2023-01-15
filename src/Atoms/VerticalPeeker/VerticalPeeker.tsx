import React, {DragEvent, FunctionComponent, PropsWithChildren, useRef, useState} from "react";
import css from "./VerticalPeeker.module.scss"
import useMousePosition from "../../Hooks/useMousePosition";
import useDragPosition from "../../Hooks/useDragPosition";

export type VerticalPeekerPropsType = {
  className?: string,
  text: string,
  open: boolean,
  onOpen: () => void,
  onClose: () => void,
}

const VerticalPeeker: FunctionComponent<PropsWithChildren<VerticalPeekerPropsType>> = ({
  className = '',
  text,
  open,
  onOpen,
  onClose,
  children,
}: PropsWithChildren<VerticalPeekerPropsType>) => {

  const mousePosition = useMousePosition();
  const [dragStartX, setDragStartX] = useState<null | number>(0);

  const verticalPeekerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if(verticalPeekerRef.current && mousePosition.x){
      setDragStartX(mousePosition.x);
    }

  }

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    if(dragStartX && dragStartX < e.clientX){
      onOpen();
    }
    if(dragStartX && dragStartX > e.clientX){
      onClose();
    }
  }

  return (
    <div
      ref={verticalPeekerRef}
      className={`
        ${css.verticalPeeker}
        ${open ? css.open : css.closed}
        ${className}
      `}
    >
      <div
        draggable={true}
        className={css.puller}
        onClick={!open ? onOpen : onClose}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <span className={css.text}>{ text }</span>
      </div>
      <div
        className={css.content}
      >
        { children }
      </div>
    </div>
  );
}

export default VerticalPeeker;
