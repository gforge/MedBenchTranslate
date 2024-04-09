import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useCallback, useState } from 'react';

import { BaseGrid, NoteList, TextCapture } from './components';

const getChartId = (chart: Chart) => `${chart.specialty}_${chart.name}`;

function App() {
    const [charts, setCharts] = useState<Chart[]>([]);
    const [active, setActive] = useState<{
        chart: Chart;
        language: string;
    } | null>(null);
    const translate = useCallback(
        ({ chart, language }: { chart: Chart; language: string }) => {
            setActive({ chart, language });
        },
        [setActive]
    );
    const deleteChart = useCallback(
        ({ chart }: { chart: Chart }) => {
            setCharts((charts) =>
                charts.filter((c) => getChartId(c) !== getChartId(chart))
            );
        },
        [setCharts]
    );
    const createNewCase = useCallback(
        ({
            name,
            specialty,
            notes,
        }: {
            name: string;
            specialty: string;
            notes: Note[];
        }) => {
            const newChart = {
                name,
                specialty,
                originalNotes: notes,
                translations: {},
            };
            setCharts((charts) => [...charts, newChart]);
        },
        []
    );

    return (
        <>
            <h1>MedBench translator</h1>
            {!active && (
                <>
                    <NoteList
                        charts={charts}
                        translate={translate}
                        deleteChart={deleteChart}
                    />
                    <TextCapture createNewCase={createNewCase} />
                </>
            )}
            {active && (
                <BaseGrid
                    originalNotes={{
                        language: 'Original',
                        notes: active.chart.originalNotes,
                    }}
                    translatedNotes={{
                        language: active.language,
                        notes: active.chart.translations[active.language] || [],
                    }}
                />
            )}
        </>
    );
}

export default App;
