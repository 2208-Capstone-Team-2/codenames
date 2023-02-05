import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import GameRules from './GameRules';
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
    const theme = createTheme({
        components: {
            // Name of the component
            MuiPopover: {
                styleOverrides: {
                    //Most stylings should go here
                    paper: {
                        border: '1px solid black',
                    },
                    root: {
                    },
                },
            },
        },
    });
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <button aria-describedby={id} onClick={handleClick}>
                Rules
            </button>
            <ThemeProvider theme={theme}>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 2 }}><GameRules /></Typography>
                </Popover>
            </ThemeProvider>
        </div>
    );
}