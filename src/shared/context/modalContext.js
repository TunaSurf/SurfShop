import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import * as MODAL from '../constants/modal';

const ModalContext = createContext();

function modalReducer(state, action) {
  switch (action.type) {
    case MODAL.HIDE:
      return {
        modalType: null,
        modalProps: {},
      };
    case MODAL.SHOW:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    default:
      return state;
  }
}

const initialState = {
  modalType: null,
  modalProps: {},
};

export default function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { modalType, modalProps } = state;

  return (
    <ModalContext.Provider value={{ dispatch, modalType, modalProps }}>
      {children}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook that shorthands the context!
export const useModal = () => useContext(ModalContext);
