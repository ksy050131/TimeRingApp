export interface ScheduleBlock {
    id: string;
    title: string;
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
    color: string;
}

export interface TodoItem {
    id: string;
    title: string;
    completed: boolean;
}
