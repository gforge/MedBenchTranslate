import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { NoteList, TextCapture } from '../components';
import { chartsActions, selectCharts } from '../features';
import { OverviewHelp } from './Help';

export function Overview() {
    const dispatch = useDispatch();
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
            dispatch(chartsActions.createNewCase({ name, specialty, notes }));
        },
        [dispatch]
    );
    const navigate = useNavigate();
    const translate = useCallback(
        ({ id, language }: { id: string; language: string }) => {
            navigate(`/translator/${id}/${language}`);
        },
        [navigate]
    );
    const uploadTranslation = useCallback(
        (args: { id: string; language: string; translation: Note[] }) => {
            dispatch(chartsActions.uploadTranslation(args));
        },
        [dispatch]
    );

    const deleteChart = useCallback(
        (args: { id: string; Language?: string }) => {
            dispatch(chartsActions.deleteChart(args));
        },
        [dispatch]
    );
    const setChartName = useCallback(
        ({ id, name }: { id: string; name: string }) => {
            dispatch(chartsActions.renameChart({ id, name }));
        },
        [dispatch]
    );
    const setChartSpecialty = useCallback(
        ({ id, specialty }: { id: string; specialty: string }) => {
            dispatch(chartsActions.renameChart({ id, specialty }));
        },
        [dispatch]
    );
    const charts = useSelector(selectCharts);

    return (
        <>
            <NoteList
                charts={charts}
                translate={translate}
                uploadTranslation={uploadTranslation}
                deleteChart={deleteChart}
                setChartName={setChartName}
                setChartSpecialty={setChartSpecialty}
            />
            <br />
            <TextCapture createNewCase={createNewCase} />
            <OverviewHelp show={!charts.length} />
        </>
    );
}
