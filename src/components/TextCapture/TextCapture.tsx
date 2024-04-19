import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { usePasteHandler } from './usePasteHandler';

export interface TextCaptureProps {
    createNewCase: (args: {
        name: string;
        specialty: string;
        notes: Note[];
    }) => void;
}

export const TextCapture: React.FC<TextCaptureProps> = ({ createNewCase }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [textInput, setTextInput] = useState('');
    const [badHeaders, setBadHeaders] = React.useState<string[]>([]);
    // Assuming usePasteHandler is adjusted to work with raw text input instead of an event
    const handlePaste = usePasteHandler({
        setBadHeaders,
        onDrop: createNewCase,
        name,
        specialty,
    });

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
                Create new case
            </Button>
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Create your new case</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="specialty"
                        label="Specialty"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="text"
                        label="Text"
                        type="text"
                        fullWidth
                        multiline
                        variant="outlined"
                        onChange={handleTextChange}
                        placeholder="Paste your text here..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!textInput || !specialty || !name}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            {badHeaders.length > 0 && (
                <Alert
                    variant="outlined"
                    color="error"
                    sx={{ marginTop: '8px' }}
                >
                    <strong>Invalid headers:</strong>
                    <br />
                    <Typography variant="body2">
                        The header should be designated with a single hash (#)
                        with type, date, time, author. E.g. # ED admission note,
                        2021-09-01, 10:00, Dr. Smith
                    </Typography>
                    <pre>{badHeaders.join('\n')}</pre>
                </Alert>
            )}
        </>
    );
};
