import React from 'react';

import LinkModal from '../shared/components/LinkModal';
import * as MODAL from '../shared/constants/modal';

export default function Home() {
  return (
    <div>
      Home
      <LinkModal modalType={MODAL.SIGN_UP} modalProps={{ user: 'user' }}>
        Open Modal
      </LinkModal>
    </div>
  );
}
