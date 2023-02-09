import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import HowToPlay from '../HowToPlay';
export default function HomeToPlayPop() {
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
      // Name of the component
      MuiPopover: {
        styleOverrides: {
          // Most stylings should go here
          paper: {
            border: '1px solid black',
            padding: 0,
            margin: 0,
            width: '400px',
          },
          root: {},
        },
      },
    },
  });
  return (
    <div>
      <button aria-describedby={id} onClick={handleClick}>
        How To Play
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
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}></div>
          <Typography sx={{ p: 2 }}>
            <HowToPlay />
          </Typography>
        </Popover>
      </ThemeProvider>
    </div>
  );
}
