import { selectChart } from 'features';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { BaseGrid } from '../components';
import type { RootState } from '../store';
import { useChartTranslations } from './useChartTranslations';

export function Translator() {
    const { chartId, language } = useParams<{
        chartId: string;
        language: string;
    }>();

    const chart = useSelector<RootState, Chart | null>((state) =>
        selectChart(state, chartId)
    );

    const navigate = useNavigate();
    const translatedRawNotes = useMemo(() => {
        if (!chart || !language) return [];
        const translations = chart.translations[language];
        if (translations) return translations;
        return chart?.originalNotes.map(({ header }) => ({
            header,
            content: '',
        }));
    }, [chart, language]);
    const { updateNote, insertNote, deleteNote, reInsertDeletedNote } =
        useChartTranslations({
            chartId,
            chart,
            language,
            translatedRawNotes,
        });

    const { downloadTranslatedChart } = useDownload({
        chartId,
        language,
        translatedRawNotes,
    });

    if (!chart || !language) {
        return <Navigate to="/" />;
    }

    return (
        <BaseGrid
            originalNotes={{
                language: 'Original',
                notes: chart.originalNotes,
            }}
            translatedNotes={{
                language: language,
                notes: translatedRawNotes,
                insertNote,
                updateNote,
                deleteNote,
            }}
            reInsertDeletedNote={reInsertDeletedNote}
            onExit={() => navigate('/')}
            onSubmit={downloadTranslatedChart}
        />
    );
}

const useDownload = ({
    translatedRawNotes,
    language,
    chartId,
}: {
    translatedRawNotes: Note[];
    language: string | undefined;
    chartId: string | undefined;
}) => {
    const downloadTranslatedChart = useCallback(() => {
        console.log('downloadTranslatedChart');
        // Create a new chart object with the translated notes
        const translatedChart = translatedRawNotes
            .map(({ header: { type, date, time, author }, content }) => {
                const headerStr = `# ${type}, ${date}, ${time}, ${author}`;
                return `${headerStr}\n${content}`;
            })
            .join('\n\n');

        // Create a new file object
        const blob = new Blob([translatedChart], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${chartId ?? '?'}_${language ?? '?'}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }, [chartId, language, translatedRawNotes]);

    return { downloadTranslatedChart };
};
