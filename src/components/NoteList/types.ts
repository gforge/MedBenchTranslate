export interface NoteListProps {
    charts: Chart[];
    translate: (args: { chart: Chart; language: string }) => void;
    deleteChart: (args: { chart: Chart }) => void;
}
