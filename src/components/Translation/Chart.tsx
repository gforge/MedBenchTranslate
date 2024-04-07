import { Box, Button, Paper, Stack, Tooltip } from '@mui/material';
import { getNoteId, useScrollToActiveNote } from 'components';
import React from 'react';

import { TranslationNote, TranslationNoteProps } from './Note';

export interface TranslationChartProps {
    notes: Omit<
        TranslationNoteProps,
        'activated' | 'id' | 'deactivateNote' | 'onChange'
    >[];
    activatedNoteId?: string;
    activateNote: (noteId?: string) => void;
    updateNote: (args: { noteId: string; content: string }) => void;
    insertNote: (args: {
        noteId: string;
        position: 'before' | 'after';
    }) => void;
}

/**
 * Filter the note content to ensure that it is valid
 * i.e. a note can only have second level headers
 */
const filterNote =
    ({
        updateNote,
        noteId,
    }: Pick<TranslationChartProps, 'updateNote'> & { noteId: string }) =>
    ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
        let content = value;
        // A note can only have second level headers
        // if a note has a first level header, all headers should moved to second level and below
        // thus we need to check each new line for '# '
        const lines = value.split('\n');
        const hasFirstLevelHeader = lines.some((line) => line.startsWith('# '));
        if (hasFirstLevelHeader) {
            content = lines
                .map((line) => (line.startsWith('#') ? '#' + line : line))
                .join('\n');
        }

        updateNote({ noteId, content });
    };

export const TranslationChart = ({
    notes,
    activatedNoteId,
    activateNote,
    updateNote,
    insertNote,
}: TranslationChartProps) => {
    const prefix = 'translation_';
    useScrollToActiveNote({ activatedNoteId, prefix });

    return (
        <Paper elevation={1} style={{ padding: '1em' }}>
            <Box
                style={{
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    margin: '0.5em',
                    padding: '0.5em',
                    boxSizing: 'border-box',
                }}
            >
                <Stack spacing={2} direction="column">
                    {notes.map((note, index) => {
                        const noteId = getNoteId(note);

                        return (
                            <React.Fragment key={noteId}>
                                {index === 0 && (
                                    <Tooltip title="Inser a note before the first one">
                                        <Button
                                            onClick={() =>
                                                insertNote({
                                                    noteId,
                                                    position: 'before',
                                                })
                                            }
                                            variant="contained"
                                            color="success"
                                        >
                                            +
                                        </Button>
                                    </Tooltip>
                                )}
                                <TranslationNote
                                    id={prefix + noteId}
                                    activated={activatedNoteId === noteId}
                                    {...note}
                                    activateNote={() => activateNote(noteId)}
                                    deactivateNote={() => activateNote('')}
                                    onChange={filterNote({
                                        updateNote,
                                        noteId,
                                    })}
                                />
                                <Tooltip title="Inser a note">
                                    <Button
                                        onClick={() =>
                                            insertNote({
                                                noteId,
                                                position: 'after',
                                            })
                                        }
                                        variant="contained"
                                        color="success"
                                    >
                                        +
                                    </Button>
                                </Tooltip>
                            </React.Fragment>
                        );
                    })}
                </Stack>
            </Box>
        </Paper>
    );
};
