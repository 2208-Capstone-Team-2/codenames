import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import GameRules from './GameRules';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = createTheme({
    components: {
      // Name of the component
      MuiPopover: {
        styleOverrides: {
          //Most stylings should go here
          paper: {
            border: '1px solid black',
            width: '400px',
          },
          root: {},
        },
      },
    },
  });
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div className="timeButton">
        <button aria-describedby={id} onClick={handleClick}>
          <AccessTimeIcon />
        </button>
      </div>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '8px',
            }}
          ></div>
          <Typography sx={{ p: 2 }}>If we want to add a timer, it can go here:)</Typography>
        </Popover>
      </ThemeProvider>
    </div>
  );
}
