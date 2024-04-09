export interface NoteListProps {
    charts: Chart[];
    translate: (argS: { chart: Chart }) => void;
    deleteChart: (argS: { chart: Chart }) => void;
}
