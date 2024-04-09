interface GetNoteHeaderProps {
    type: string;
    date: string | Date;
    time: string | Date;
    author: string;
}

interface GetNoteIdProps {
    header: GetNoteHeaderProps;
}

export function getNoteId({
    header: { type, date, time, author },
}: GetNoteIdProps): string {
    const dateStr =
        date instanceof Date ? date.toISOString().slice(0, 10) : date;
    const timeStr =
        time instanceof Date ? time.toISOString().slice(11, 16) : time;
    return `${type}@${dateStr}@${timeStr}@${author}`;
}
