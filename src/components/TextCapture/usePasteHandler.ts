import { getNoteId } from 'helpers';
import React, { useCallback } from 'react';

export const usePasteHandler = ({
    setBadHeaders,
    onDrop,
    name,
    specialty,
}: {
    setBadHeaders: React.Dispatch<React.SetStateAction<string[]>>;
    onDrop: (args: { name: string; specialty: string; notes: Note[] }) => void;
    name: string;
    specialty: string;
}) =>
    useCallback(
        (text: string) => {
            if (!text) return;

            // Split on '# ' at the beginning of the line
            const rawContent = text
                .split(/(^|\n)# /g)
                .filter((note) => !!note && note !== '\n')
                .map(
                    (
                        note,
                        index
                    ): {
                        index: number;
                        rawHeader: string;
                        header: string[];
                        content: string;
                    } => {
                        const [header, ...content] = note.split('\n');
                        return {
                            index,
                            rawHeader: header,
                            header: header
                                .trim()
                                .split(',')
                                .map((item) => item.trim()),
                            content: content.join('\n').trim(),
                        };
                    }
                );

            // Check if header is valid
            const invalidHeaders = rawContent.filter(({ header }) => {
                if (header.length !== 4) return true;
                const [date, time] = header.slice(1, 3);
                if (!/^20\d{2}-(0\d|1[0-2])-([0-2]\d|3[01])$/.test(date))
                    return true;
                if (!/^([01]\d|2[0-3])[:.][0-5]\d$/.test(time)) return true;
            });
            if (invalidHeaders.length) {
                console.error(
                    'Invalid headers:',
                    invalidHeaders.map(({ rawHeader }) => rawHeader).join('\n')
                );

                // Warn that the first section should be a header
                if (
                    invalidHeaders[0].index === 0 &&
                    !invalidHeaders[0].rawHeader.startsWith('# ')
                ) {
                    setBadHeaders([
                        'First section should be a header starting with "# "',
                    ]);
                    return;
                }

                setBadHeaders(
                    invalidHeaders.map(
                        ({ index, rawHeader }) => `[${index}]: ${rawHeader}`
                    )
                );
                return;
            } else {
                setBadHeaders([]);
            }

            const notes: Note[] = rawContent.map((note) => {
                const { header, content } = note;
                const headerBase: Omit<Note['header'], 'id'> = {
                    type: header[0],
                    date: header[1],
                    time: header[2].replace('.', ':'),
                    author: header[3],
                };

                return {
                    header: {
                        id: getNoteId({ header: headerBase }),
                        ...headerBase,
                    },
                    content,
                };
            });

            // Call the provided onDrop function with the extracted text
            onDrop({
                name,
                specialty,
                notes,
            });
        },
        [name, onDrop, setBadHeaders, specialty]
    );
