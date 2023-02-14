import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import AllPlayersNav from './AllPlayersNav';
import './navbar.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const theme = createTheme({
    components: {
      MuiPopover: {
        styleOverrides: {
          // Most stylings should go here
          paper: {
            border: '1px solid black',
            padding: 0,
            margin: 0,
          },
          root: {},
        },
      },
    },
  });
  return (
    <div>
      <button aria-describedby={id} onClick={handleClick}>
        Players
      </button>
      <ThemeProvider theme={theme}>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>Players In Room</div>
          <Typography sx={{ p: 2 }}>
            <AllPlayersNav />
          </Typography>
        </Popover>
      </ThemeProvider>
    </div>
  );
}
