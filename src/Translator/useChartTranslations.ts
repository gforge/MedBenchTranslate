// useChartTranslations.ts
import { chartsActions } from 'features';
import { getNoteId } from 'helpers';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface UseChartTranslationsParams {
    chartId: string | undefined;
    chart: Chart | null;
    language: string | undefined;
}

export function useChartTranslations({
    chartId,
    chart,
    language,
}: UseChartTranslationsParams) {
    const dispatch = useDispatch();

    const updateNote = useCallback(
        ({ noteId, content }: { noteId: string; content: string }) => {
            if (!chartId || !chart || !language) return;
            const translation = chart.translations[language];
            if (!translation) return;
            const note = translation.find((n) => getNoteId(n) === noteId);
            if (!note) return;

            note.content = content;
            dispatch(
                chartsActions.updateChart({ note, id: chartId, language })
            );
        },
        [chart, chartId, dispatch, language]
    );

    const insertNote = useCallback(
        ({
            noteId,
            position,
        }: {
            noteId: string;
            position: 'before' | 'after';
        }) => {
            if (!chartId || !chart || !language) return;
            dispatch(
                chartsActions.insertNote({
                    chartId,
                    noteId,
                    language,
                    position,
                })
            );
        },
        [chart, chartId, dispatch, language]
    );

    return { updateNote, insertNote };
}
