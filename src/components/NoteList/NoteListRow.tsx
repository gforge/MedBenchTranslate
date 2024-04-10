import { Button, ButtonGroup, styled } from '@mui/material';
import { getChartId } from 'helpers';

import { TranslateFn } from './types';

const Td = styled('td')({
    fontWeight: 'normal',
    textAlign: 'left',
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
});

interface NoteListRowProps {
    chart: Chart;
    translate: TranslateFn;
    deleteChart: (id: string) => void;
    setActive: (chart: Chart) => void;
}

export const NoteListRow = ({
    chart,
    translate,
    deleteChart,
    setActive,
}: NoteListRowProps) => {
    const cellSeparator = '1px solid #ddd';
    const { name, specialty } = chart;
    return (
        <tr>
            <Td style={{ borderRight: cellSeparator }}>{name}</Td>
            <Td style={{ borderRight: cellSeparator }}>{specialty}</Td>
            <Td
                style={{
                    textAlign: 'center',
                }}
            >
                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActive(chart)}
                    >
                        Translate
                    </Button>
                    {Object.keys(chart.translations).map((language) => (
                        <Button
                            key={language}
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                                translate({
                                    id: getChartId(chart),
                                    language,
                                })
                            }
                        >
                            {language}
                        </Button>
                    ))}
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteChart(getChartId(chart))}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            </Td>
        </tr>
    );
};
