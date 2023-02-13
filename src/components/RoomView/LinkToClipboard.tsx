import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AddLinkIcon from '@mui/icons-material/AddLink';
import './roomView.css';
const LinkToClipboard = () => {
  const url: string = window.location.href;
  return (
    <div className="copyContainer">
      <CopyToClipboard text={url}>
        <button>
          Invite <AddLinkIcon />{' '}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default LinkToClipboard;
