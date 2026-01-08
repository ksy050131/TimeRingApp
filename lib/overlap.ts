import { ScheduleBlock } from '@/types/models';
import { timeToMinutes } from './time';

export const checkOverlap = (newBlock: ScheduleBlock, existingBlocks: ScheduleBlock[]): boolean => {
    const newStart = timeToMinutes(newBlock.startTime);
    const newEnd = timeToMinutes(newBlock.endTime);

    // Validate start < end
    if (newStart >= newEnd) return true; // Invalid time range treated as overlap/error

    return existingBlocks.some(block => {
        // Skip self if editing (though strict ID check might be needed if update logic is added later)
        if (block.id === newBlock.id) return false;

        const existingStart = timeToMinutes(block.startTime);
        const existingEnd = timeToMinutes(block.endTime);

        // Overlap condition: (StartA < EndB) and (EndA > StartB)
        return newStart < existingEnd && newEnd > existingStart;
    });
};
