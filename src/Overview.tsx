import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { NoteList, TextCapture } from './components';
import { chartsActions, selectCharts } from './features';

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
    const deleteChart = useCallback(
        (id: string) => {
            dispatch(chartsActions.deleteChart(id));
        },
        [dispatch]
    );
    const charts = useSelector(selectCharts);

    return (
        <>
            <NoteList
                charts={charts}
                translate={translate}
                deleteChart={deleteChart}
            />
            <br />
            <TextCapture createNewCase={createNewCase} />
        </>
    );
}
