import { faker } from '@faker-js/faker';
import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { buildFakeHeader } from 'components';

import { TranslationNote } from './Note';

const meta: Meta<typeof TranslationNote> = {
    title: 'Text/Translation/Note',
    component: TranslationNote,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { activateNote: fn() },
    decorators: (Story) => (
        <Box sx={{ padding: '10px', width: '600px' }}>
            <Story />
        </Box>
    ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        header: buildFakeHeader(),
        content: faker.lorem.paragraph(),
        activated: false,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            action('inactiveNote')(e.target.value);
        },
    },
};

export const Active: Story = {
    args: {
        header: buildFakeHeader(),
        content: faker.lorem.paragraph(),
        activated: true,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            action('activatedNote')(e.target.value);
        },
    },
};
