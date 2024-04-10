// useChartTranslations.ts
import { chartsActions } from 'features';
import { getNoteId } from 'helpers';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface UseChartTranslationsParams {
    chartId: string | undefined;
    chart: Chart | null;
    language: string | undefined;
    translatedRawNotes: Note[];
}

interface InsertNoteArgs {
    noteId: string;
    position: 'before' | 'after';
    type: string;
    author: string;
}

export function useChartTranslations({
    chartId,
    chart,
    language,
    translatedRawNotes,
}: UseChartTranslationsParams) {
    const dispatch = useDispatch();

    const updateNote = useCallback(
        ({ noteId, content }: { noteId: string; content: string }) => {
            if (!chartId || !chart || !language) return;
            const note = translatedRawNotes.find(
                (n) => getNoteId(n) === noteId
            );
            if (!note) return;

            dispatch(
                chartsActions.updateChart({
                    note: {
                        ...note,
                        content,
                    },
                    id: chartId,
                    language,
                })
            );
        },
        [chart, chartId, dispatch, language, translatedRawNotes]
    );

    const insertNote = useCallback(
        ({ noteId, position, type, author }: InsertNoteArgs) => {
            if (!chartId || !chart || !language) return;
            dispatch(
                chartsActions.insertNote({
                    chartId,
                    noteId,
                    language,
                    position,
                    type,
                    author,
                })
            );
        },
        [chart, chartId, dispatch, language]
    );

    return { updateNote, insertNote };
}
