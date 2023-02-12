import * as React from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Modal } from '@mui/material';
import UsernameForm from '../../Room/UsernameForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor: '#e2c78d',
};

export default function UsernameModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = (bool: boolean) => setOpen(bool);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Change Username</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UsernameForm handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
