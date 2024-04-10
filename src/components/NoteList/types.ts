export type TranslateFn = (args: { id: string; language: string }) => unknown;
export type DeleteChartFn = (id: string) => void;

export interface NoteListRowProps {
    chart: Chart;
    translate: TranslateFn;
    deleteChart: DeleteChartFn;
    setActive: (chart: Chart) => void;
    setChartName: (args: { id: string; name: string }) => void;
    setChartSpecialty: (args: { id: string; specialty: string }) => void;
}

export interface NoteListProps
    extends Pick<
        NoteListRowProps,
        'translate' | 'deleteChart' | 'setChartName' | 'setChartSpecialty'
    > {
    charts: Chart[];
}
