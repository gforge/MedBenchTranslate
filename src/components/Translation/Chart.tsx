import { Add } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, Tooltip } from '@mui/material';
import { useScrollToActiveNote } from 'components';
import { getNoteId } from 'helpers';
import React from 'react';

import { TranslationNote, TranslationNoteProps } from './Note';

type InsertNoteFn = (args: {
    noteId: string;
    position: 'before' | 'after';
}) => void;

export interface TranslationChartProps {
    notes: Omit<
        TranslationNoteProps,
        'activated' | 'id' | 'deactivateNote' | 'onChange'
    >[];
    activatedNoteId?: string;
    activateNote: (noteId?: string) => void;
    updateNote: (args: { noteId: string; content: string }) => void;
    insertNote: InsertNoteFn;
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

const AddButton = ({
    insertNote,
    noteId,
    title,
    position,
}: {
    insertNote: InsertNoteFn;
    title: string;
    noteId: string;
    position: 'before' | 'after';
}) => (
    <Stack
        spacing={1}
        direction="row"
        justifyContent={'end'}
        sx={{ margin: '0px' }}
    >
        <Tooltip title={title}>
            <IconButton
                onClick={() =>
                    insertNote({
                        noteId,
                        position,
                    })
                }
                color="success"
            >
                <Add />
            </IconButton>
        </Tooltip>
    </Stack>
);

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
                                    <AddButton
                                        insertNote={insertNote}
                                        noteId={noteId}
                                        title="Inser a note before the first one"
                                        position="before"
                                    />
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
                                <AddButton
                                    insertNote={insertNote}
                                    noteId={noteId}
                                    title="Insert a note"
                                    position="after"
                                />
                            </React.Fragment>
                        );
                    })}
                </Stack>
            </Box>
        </Paper>
    );
};
