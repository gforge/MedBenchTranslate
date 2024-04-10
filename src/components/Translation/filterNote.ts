import React from 'react';

import { TranslationChartProps } from './types';

/**
 * Filter the note content to ensure that it is valid
 * i.e. a note can only have second level headers
 */
export const filterNote =
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
