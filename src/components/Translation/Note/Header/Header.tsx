import { Box, Typography } from '@mui/material';

export const TranslationNoteHeader = ({ type, date, time, author }: Header) => {
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
                    {date} {time}
                </Typography>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    overflow: 'hidden',
                    width: 0,
                    height: '100%',
                }}
            >
                <Typography variant="subtitle1" component="div">
                    {type}
                </Typography>
            </Box>
            <Box sx={{ flex: 1, visibility: 'hidden' }}>
                <Typography>
                    {date} {time}
                </Typography>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography color="text.secondary">{author}</Typography>
            </Box>
        </Box>
    );
};
