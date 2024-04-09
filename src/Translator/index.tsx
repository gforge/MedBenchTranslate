import { Button } from '@mui/material';
import { selectChart } from 'features';
import { useMemo } from 'react';
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
    const { updateNote, insertNote } = useChartTranslations({
        chartId,
        chart,
        language,
        translatedRawNotes,
    });

    if (!chart || !language) {
        return <Navigate to="/" />;
    }

    return (
        <>
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
                }}
            />
            <Button onClick={() => navigate('/')}>Exit</Button>
        </>
    );
}
