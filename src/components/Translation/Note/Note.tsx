import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextareaAutosize,
} from '@mui/material';
import { MarkdownTypography } from 'components';
import { ChangeEventHandler } from 'react';

import { Header4Translation, TranslationNoteHeader } from './Header';

export interface TranslationNoteProps {
    id: string;
    header: Header4Translation;
    content: string;
    activated: boolean;
    activateNote?: () => void;
    deactivateNote?: () => void;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export const TranslationNote = ({
    id,
    header,
    content,
    activated,
    activateNote,
    deactivateNote,
    onChange,
}: TranslationNoteProps) => (
    <Card
        id={id}
        sx={{
            minWidth: 275,
            opacity: activated ? 1 : 0.6, // Full opacity when activated, faded otherwise
            transition: 'opacity 0.3s ease-in-out', // Smooth transition for opacity change
        }}
        onDoubleClick={activateNote}
    >
        <CardContent>
            <TranslationNoteHeader {...header} />
            {activated ? (
                <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder="The content of the note"
                    value={content}
                    onChange={onChange}
                    style={{
                        width: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '4px',
                    }}
                />
            ) : (
                <MarkdownTypography content={content} />
            )}
        </CardContent>
        {activated && (
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button size="small" onClick={deactivateNote}>
                    Exit
                </Button>
            </CardActions>
        )}
    </Card>
);
