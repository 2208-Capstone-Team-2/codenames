import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import './navbar.css';
import { IconButton, Snackbar } from '@mui/material';
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
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <div>
      <CopyToClipboard text={url}>
        <button className="copyBtn" onClick={handleClick}>
          Copy Invite Link <CopyAllIcon />
        </button>
      </CopyToClipboard>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message="Copied to clipboard!"
          action={action}
        />
      </div>
    </div>
  );
};

export default LinkToClipboard;
