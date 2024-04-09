export type TranslateFn = (args: { id: string; language: string }) => unknown;

export interface NoteListProps {
    charts: Chart[];
    translate: TranslateFn;
    deleteChart: (id: string) => void;
}
