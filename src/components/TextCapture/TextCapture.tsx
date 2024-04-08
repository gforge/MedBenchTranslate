import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import React, { useState } from 'react';

import { usePasteHandler } from './usePasteHandler';

export interface TextCaptureProps {
    onDrop: (text: Note[]) => void;
}

export const TextCapture: React.FC<TextCaptureProps> = ({ onDrop }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [badHeaders, setBadHeaders] = React.useState<string[]>([]);
    // Assuming usePasteHandler is adjusted to work with raw text input instead of an event
    const handlePaste = usePasteHandler({ setBadHeaders, onDrop });

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setBadHeaders([]);
    };

    const handleTextChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTextInput(event.target.value);
    };

    const handleSubmit = () => {
        // Directly call handlePaste with the textInput
        // Adjust usePasteHandler or create a similar function that can process raw text input
        handlePaste(textInput);
        setDialogOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOpenDialog}>
                Click here to paste text
            </Button>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Paste Your Text</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="text"
                        label="Text"
                        type="text"
                        fullWidth
                        multiline
                        variant="outlined"
                        onChange={handleTextChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            {badHeaders.length > 0 && (
                <Alert
                    variant="outlined"
                    color="error"
                    sx={{ marginTop: '8px' }}
                >
                    <strong>Invalid headers:</strong>
                    <pre>{badHeaders.join('\n')}</pre>
                </Alert>
            )}
        </>
    );
};
