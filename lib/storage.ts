import { ScheduleBlock, TodoItem } from '@/types/models';

const STORAGE_KEY_SCHEDULE = 'time-ring-schedule';
const STORAGE_KEY_TODO = 'time-ring-todo';

export const saveSchedule = (date: string, schedule: ScheduleBlock[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(`${STORAGE_KEY_SCHEDULE}-${date}`, JSON.stringify(schedule));
    }
};

export const loadSchedule = (date: string): ScheduleBlock[] => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(`${STORAGE_KEY_SCHEDULE}-${date}`);
        return data ? JSON.parse(data) : [];
    }
    return [];
};

export const saveTodoList = (todos: TodoItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_TODO, JSON.stringify(todos));
    }
};

export const loadTodoList = (): TodoItem[] => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY_TODO);
        return data ? JSON.parse(data) : [];
    }
    return [];
};
