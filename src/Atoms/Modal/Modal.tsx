import React, {FunctionComponent, PropsWithChildren} from "react";
import css from "./Modal.module.scss"
import {Cancel} from "iconoir-react";

export type ModalPropsType = {
  open: boolean,
  className?: string,
  onClose?: () => void,
}

const Modal: FunctionComponent<PropsWithChildren<ModalPropsType>> = ({
  open,
  children,
  className = '',
  onClose,
}: PropsWithChildren<ModalPropsType>) => {

  const handleClose = () => {
    if(onClose){
      onClose();
    }
  }

  return (
    <div
      className={`
        ${css.modal}
        ${open ? css.open : css.closed}
        ${className}
      `}
    >
      <div className={css.content}>
        { children }
        {
          onClose && (
            <div className={css.close}>
              <Cancel
                className={css.icon}
                width={40}
                height={40}
                onClick={handleClose}
              />
            </div>
          )
        }
      </div>
      <div className={css.backdrop}></div>
    </div>
  );
}

export default Modal;
