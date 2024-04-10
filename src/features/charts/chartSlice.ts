// features/charts/chartsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getChartId, getNoteId, timeCompareNotes } from 'helpers';

import { getDateRelativeToNote } from './getDateRelativeToNote';

interface ChartsState {
    charts: Chart[];
}

const initialState: ChartsState = {
    charts: [],
};

export const { reducer: chartsReducer, actions: chartsActions } = createSlice({
    name: 'charts',
    initialState,
    reducers: {
        createNewCase: (
            state,
            action: PayloadAction<{
                name: string;
                specialty: string;
                notes: Note[];
            }>
        ) => {
            state.charts.push({
                name: action.payload.name,
                specialty: action.payload.specialty,
                originalNotes: action.payload.notes,
                translations: {},
            });
        },
        deleteChart: (state, { payload: id }: PayloadAction<string>) => {
            state.charts = state.charts.filter((c) => getChartId(c) !== id);
        },
        updateChart: (
            state,
            action: PayloadAction<{ note: Note; id: string; language: string }>
        ) => {
            const { id, language, note } = action.payload;
            const chart = state.charts.find(
                (chart) => getChartId(chart) === id
            );

            if (!chart) {
                return;
            }

            if (!chart.translations[language]) {
                chart.translations[language] = chart.originalNotes.map((n) => ({
                    header: { ...n.header },
                    content: '',
                }));
            }

            const noteIndex = chart.translations[language].findIndex(
                (n) => getNoteId(n) === getNoteId(note)
            );
            if (noteIndex === -1) {
                return;
            }
            chart.translations[language][noteIndex] = note;
            chart.translations[language].sort(timeCompareNotes());
        },
        reInsertDeletedNote(
            state,
            action: PayloadAction<{
                chartId: string;
                noteId: string;
                language: string;
            }>
        ) {
            const { chartId, noteId, language } = action.payload;
            const chart = state.charts.find((c) => getChartId(c) === chartId);
            if (!chart) {
                return;
            }
            const deletedNote = chart.originalNotes.find(
                (n) => getNoteId(n) === noteId
            );
            if (!deletedNote) {
                return;
            }

            // Should not be possible
            if (!chart.translations[language]) {
                chart.translations[language] = chart.originalNotes.map((n) => ({
                    header: { ...n.header },
                    content: '',
                }));
                return;
            }
            const exists = chart.translations[language].find(
                (n) => getNoteId(n) === noteId
            );
            if (exists) {
                return;
            }

            chart.translations[language].push({
                header: { ...deletedNote.header },
                content: '',
            });

            chart.translations[language].sort(timeCompareNotes());
        },
        insertNote(
            state,
            action: PayloadAction<{
                chartId: string;
                noteId: string;
                language: string;
                position: 'before' | 'after';
                type: string;
                author: string;
            }>
        ) {
            const { chartId, language, noteId, position, type, author } =
                action.payload;
            const chart = state.charts.find((c) => getChartId(c) === chartId);
            if (!chart) {
                return;
            }
            const noteIndex = chart.translations[language].findIndex(
                (n) => getNoteId(n) === noteId
            );
            if (noteIndex === -1) {
                return;
            }
            // Find the two notes and insert a new note between them
            const shiftedDate = getDateRelativeToNote({
                chart,
                language,
                noteIndex,
                position,
            });
            const newNote: Note = {
                header: {
                    id: `New_note_${Math.random().toString()}`,
                    type,
                    date: shiftedDate.format('YYYY-MM-DD'),
                    time: shiftedDate.format('HH:mm'),
                    author,
                },
                content: '',
            };
            chart.translations[language].push(newNote);

            // sort the notes by date
            chart.translations[language].sort(timeCompareNotes());
        },
        deleteNote(
            state,
            payload: PayloadAction<{
                chartId: string;
                noteId: string;
                language: string;
            }>
        ) {
            const { chartId, noteId, language } = payload.payload;
            const chart = state.charts.find((c) => getChartId(c) === chartId);
            if (!chart) {
                return;
            }
            chart.translations[language] = chart.translations[language].filter(
                (n) => getNoteId(n) !== noteId
            );
            // sort the notes by date
            chart.translations[language].sort(timeCompareNotes());
        },
    },
});
