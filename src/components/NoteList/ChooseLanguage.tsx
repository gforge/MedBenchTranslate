import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { useMemo, useState } from 'react';

interface ChooseLanguageProps {
    chart?: Chart;
    cancel: () => void;
    translate: (args: { chart: Chart; language: string }) => unknown;
}

export const ChooseLanguage = ({
    chart,
    translate,
    cancel,
}: ChooseLanguageProps) => {
    const [language, setLanguage] = useState<string | null>(null);
    const existingLanguages = useMemo(() => {
        const existing = Object.keys(chart?.translations || {});
        // Merge with the existing languages
        const merged = [...existing, 'Swedish', 'Finnish', 'Danish'];
        // Filtered out duplicates
        return Array.from(new Set(merged));
    }, [chart]);
    console.log(existingLanguages, language);

    return (
        <Dialog open={!!chart}>
            <DialogTitle>Choose a language</DialogTitle>
            <DialogContent>
                <Autocomplete
                    value={language}
                    id="free-solo-demo"
                    freeSolo
                    options={existingLanguages}
                    renderInput={(params) => (
                        <TextField {...params} label="freeSolo" />
                    )}
                    onInputChange={(_event, newInputValue) => {
                        setLanguage(newInputValue);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={!language}
                    onClick={() => {
                        if (!language) return;
                        if (!chart) return;
                        // Translate the chart with the provided language code
                        translate({ chart, language });
                        cancel();
                    }}
                >
                    Translate
                </Button>
                <Button onClick={cancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};
