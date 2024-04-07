import { Box, Typography } from '@mui/material';

import { Header4Translation } from './types';

export const TranslationNoteHeader = ({
    type,
    date,
    time,
    author,
}: Header4Translation) => {
    const datestr =
        date instanceof Date ? date.toISOString().slice(0, 12) : date;
    const timeStr =
        time instanceof Date ? time.toISOString().slice(11, 16) : time;

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                height: '48px',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                }}
            >
                <Typography color="text.secondary">
                    {datestr} {timeStr}
                </Typography>
            </Box>
            <Box
                sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}
            >
                <Typography variant="subtitle1" component="div">
                    {type}
                </Typography>
            </Box>
            <Box sx={{ flex: 1, visibility: 'hidden' }}>
                <Typography>
                    {datestr} {timeStr}
                </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography color="text.secondary">{author}</Typography>
            </Box>
        </Box>
    );
};
