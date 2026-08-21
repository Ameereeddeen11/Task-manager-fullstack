export const TaskStatus = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED'
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];