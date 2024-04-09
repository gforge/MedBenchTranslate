import { Button, ButtonGroup, Paper, styled } from '@mui/material';
import { getChartId } from 'helpers';
import { useState } from 'react';

import { ChooseLanguage } from './ChooseLanguage';
import { NoteListProps } from './types';

const Th = styled('th')({
    fontWeight: 'bold',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderBottom: '1px solid #979797',
});

const Td = styled('td')({
    fontWeight: 'normal',
    textAlign: 'left',
    padding: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
});

export const NoteList = ({ charts, translate, deleteChart }: NoteListProps) => {
    const [active, setActive] = useState<Chart>();

    if (!charts.length) return null;

    const cellSeparator = '1px solid #ddd';
    return (
        <Paper sx={{ padding: '10px' }}>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                }}
            >
                <thead>
                    <tr>
                        <Th>Name</Th>
                        <Th>Specialty</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {charts.map((chart) => {
                        const { name, specialty } = chart;
                        return (
                            <tr key={`${specialty}_${name}`}>
                                <Td style={{ borderRight: cellSeparator }}>
                                    {name}
                                </Td>
                                <Td style={{ borderRight: cellSeparator }}>
                                    {specialty}
                                </Td>
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
                                        {Object.keys(chart.translations).map(
                                            (language) => (
                                                <Button
                                                    key={language}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() =>
                                                        translate({
                                                            id: getChartId(
                                                                chart
                                                            ),
                                                            language,
                                                        })
                                                    }
                                                >
                                                    {language}
                                                </Button>
                                            )
                                        )}
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() =>
                                                deleteChart(getChartId(chart))
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </Td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <ChooseLanguage
                chart={active}
                cancel={() => setActive(undefined)}
                translate={translate}
            />
        </Paper>
    );
};
