import { Box, Button, ButtonGroup, Chip, styled } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
    OriginalChart,
    OriginalChartProps,
    TranslationChart,
    TranslationChartProps,
} from 'components';
import { useState } from 'react';

type Notes4Language<T extends TranslationChartProps | OriginalChartProps> = {
    language: string;
} & Omit<T, 'activatedNoteId' | 'activateNote'>;

interface BaseGridProps {
    originalNotes: Notes4Language<OriginalChartProps>;
    translatedNotes: Notes4Language<TranslationChartProps>;
    onExit?: () => void;
    onSubmit?: () => void;
}

const Content = styled(Box)`
    margin: 0.5em;
    padding: 0.5em;
    box-sizing: border-box;
`;

export const BaseGrid = ({
    originalNotes: { language: originalLanguage, ...originalNotes },
    translatedNotes: { language: translatedLanguage, ...translatedNotes },
    onExit,
    onSubmit,
}: BaseGridProps) => {
    const [activatedNoteId, activateNote] = useState<string>();

    return (
        <Grid container spacing={2} sx={{ textAlign: 'left' }}>
            <Grid xs={6}>
                <Content>
                    <Chip label={originalLanguage} color="primary" />
                </Content>
            </Grid>
            <Grid xs={6}>
                <Content>
                    <Chip label={translatedLanguage} color="primary" />
                </Content>
            </Grid>
            <Grid xs={6}>
                <Content>
                    <OriginalChart
                        activatedNoteId={activatedNoteId}
                        activateNote={activateNote}
                        {...originalNotes}
                    />
                </Content>
            </Grid>
            <Grid xs={6}>
                <Content>
                    <TranslationChart
                        activatedNoteId={activatedNoteId}
                        activateNote={activateNote}
                        {...translatedNotes}
                    />
                </Content>
            </Grid>
            <Grid
                xs={12}
                container
                justifyContent={'flex-end'}
                alignContent={'flex-end'}
            >
                <Content>
                    <ButtonGroup>
                        <Button
                            variant="contained"
                            onClick={onSubmit}
                            color="success"
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            onClick={onExit}
                            color="secondary"
                        >
                            Exit
                        </Button>
                    </ButtonGroup>
                </Content>
            </Grid>
        </Grid>
    );
};
