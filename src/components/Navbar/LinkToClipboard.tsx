import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AddLinkIcon from '@mui/icons-material/AddLink';
import '../RoomView/roomView.css';
import { Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LinkToClipboard = () => {
  const url: string = window.location.href;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="copyContainer">
      <CopyToClipboard text={url}>
        <button onClick={handleClick}>
          Invite <AddLinkIcon />
        </button>
      </CopyToClipboard>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Copied to clipboard!"
        action={action}
      />
    </div>
  );
};

export default LinkToClipboard;
