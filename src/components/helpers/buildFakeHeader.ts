import { faker } from '@faker-js/faker';

import { Header4Original } from '../Original/Note/Header/types';

export const buildFakeHeader = (
    args: Partial<Header4Original> = {}
): Header4Original => ({
    type: args.type ?? faker.lorem.sentence(2).slice(0, -1),
    date:
        args.date ?? faker.date.recent({ days: 10 }).toISOString().slice(0, 10),
    time: args.time ?? faker.date.recent().toISOString().slice(11, 16),
    author: args.author ?? faker.person.fullName(),
});
