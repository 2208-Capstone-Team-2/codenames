import * as React from 'react';
import Popover from '@mui/material/Popover';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ResetGame from './ResetGame';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ResetTeams from './ResetTeams';
import MakeSpectator from '../Navbar/MakeSpectator';
export default function BasicPopover() {
  const { isHost, teamId } = useSelector((state: RootState) => state.player);
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
          // Most stylings should go here
          paper: {
            border: '1px solid black',
            width: 'auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'gainsboro',
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
          {isHost && (
            <>
              <ResetGame />
              <ResetTeams />
            </>
          )}
          {teamId && <MakeSpectator />}
        </Popover>
      </ThemeProvider>
    </div>
  );
}
