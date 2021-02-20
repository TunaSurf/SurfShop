import React from 'react';
import ReactModal from 'react-modal';

import { useModal } from '../../../shared/context/modalContext';
import * as MODAL from '../../../shared/constants/modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

export default function Modal() {
  const { modalType, modalProps, dispatch } = useModal();

  if (!modalType) {
    return null;
  }

  function closeModal() {
    dispatch({ type: MODAL.HIDE });
  }

  return (
    <ReactModal
      isOpen={!!modalType}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={closeModal} type="button">
        Close
      </button>
      <h1>Modal - {modalProps.user}</h1>
    </ReactModal>
  );
}
