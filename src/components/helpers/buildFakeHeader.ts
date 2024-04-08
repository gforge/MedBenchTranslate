import { faker } from '@faker-js/faker';

export const buildFakeHeader = (args: Partial<Header> = {}): Header => {
    const d = faker.date.recent({ days: 10 }).toISOString();
    return {
        type: args.type ?? faker.lorem.sentence(2).slice(0, -1),
        date: args.date ?? d.slice(0, 10),
        time: args.time ?? d.slice(11, 16),
        author: args.author ?? faker.person.fullName(),
    };
};
