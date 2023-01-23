import React, {FunctionComponent, PropsWithChildren, ReactElement, useRef, useState} from "react";
import css from "./FloatingContent.module.scss"
import {useClickOutsideRef} from "../../Hooks/useClickOutsideRef";
import ReactMarkdown from "react-markdown";
import className = ReactMarkdown.propTypes.className;

export type FloatingContentPropsType = {
  label: ReactElement,
  className?: string,
  labelClassName?: string,
  contentClassName?: string,
  title?: string,
}

const FloatingContent: FunctionComponent<PropsWithChildren<FloatingContentPropsType>> = ({
  children,
  label,
  className = '',
  labelClassName = '',
  contentClassName = '',
  title = '',
}: PropsWithChildren<FloatingContentPropsType>) => {

  const [isOpen, setIsOpen] = useState(false);

  const cardRef = useRef(null);
  useClickOutsideRef(cardRef,() => {
    setIsOpen(false);
  });

  return (
    <div
      ref={cardRef}
      className={`
        ${css.floatingContent}
        ${className}
      `}
    >
      <div
        className={`
          ${css.label}
          ${labelClassName}
        `}
        onClick={() => setIsOpen(!isOpen)}
        title={title}
      >
        { label }
      </div>
      <div
        className={`
          ${css.content}
          ${isOpen ? css.open : css.closed}
          ${contentClassName}
        `}
      >
        { children }
      </div>
    </div>
  );
}

export default FloatingContent;
