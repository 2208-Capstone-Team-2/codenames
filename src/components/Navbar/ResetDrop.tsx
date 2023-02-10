import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ResetGame from './ResetGame';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function BasicPopover() {
  const { username, roomId, isHost } = useSelector((state: RootState) => state.player);
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

  if (isHost)
    return (
      <div>
        <button aria-describedby={id} onClick={handleClick}>
          Game Settings
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
            <Typography sx={{ p: 2 }}>
              <ResetGame />
            </Typography>
          </Popover>
        </ThemeProvider>
      </div>
    );
  else return <></>;
}
