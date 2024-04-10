import { TranslationNoteProps } from './Note';

export type InsertNoteFn = (args: {
    noteId: string;
    position: 'before' | 'after';
    type: string;
    author: string;
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
