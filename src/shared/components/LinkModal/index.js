import React from 'react';
import PropTypes from 'prop-types';

import * as MODAL from '../../constants/modal';
import { useModal } from '../../context/modalContext';

export default function LinkModal({ modalType, modalProps, children }) {
  const { dispatch } = useModal();

  return (
    <button
      onClick={() =>
        dispatch({
          type: MODAL.SHOW,
          modalType,
          modalProps,
        })
      }
      type="button"
    >
      {children}
    </button>
  );
}

LinkModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  modalProps: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
