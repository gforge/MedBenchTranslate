export function getNoteId({ header }: Pick<Note, 'header'>): string {
    const { date, time, author } = header;
    return `${date}@${time}@${author}`;
}
