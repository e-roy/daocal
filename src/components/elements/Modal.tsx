import React from 'react';

export type ModalProps = {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const handleClose = () => {
    console.log('close');
    // onClose();
  };

  if (!isOpen) return null;
  else
    return (
      <div
        onClick={() => {
          handleClose();
        }}
        className="main-modal fixed w-full h-100 inset-0 z-40 overflow-hidden flex justify-center items-center animated fadeIn faster"
        style={{ background: 'rgba(0,0,0,.7)' }}
      >
        <div className="shadow-lg modal-container bg-white text-black w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto">
          <div className="z-50">{children}</div>
        </div>
      </div>
    );
};

export default Modal;
