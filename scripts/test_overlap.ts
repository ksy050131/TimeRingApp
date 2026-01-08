
// Mock types
interface ScheduleBlock {
    id: string;
    title: string;
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
    color: string;
}

// Logic from lib/overlap.ts
export const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

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

// Test Runner
const createBlock = (id: string, start: string, end: string): ScheduleBlock => ({
    id,
    title: 'Test',
    startTime: start,
    endTime: end,
    color: 'red'
});

const runTests = () => {
    const existing = [
        createBlock('1', '09:00', '10:00')
    ];

    console.log('Running Overlap Tests...');

    // Test 1: No Overlap (Before)
    const t1 = checkOverlap(createBlock('2', '08:00', '09:00'), existing);
    console.log(`Test 1 (08:00-09:00 vs 09:00-10:00) Expected: false, Got: ${t1}`);

    // Test 2: No Overlap (After)
    const t2 = checkOverlap(createBlock('3', '10:00', '11:00'), existing);
    console.log(`Test 2 (10:00-11:00 vs 09:00-10:00) Expected: false, Got: ${t2}`);

    // Test 3: Overlap (Inside)
    const t3 = checkOverlap(createBlock('4', '09:15', '09:45'), existing);
    console.log(`Test 3 (09:15-09:45 vs 09:00-10:00) Expected: true, Got: ${t3}`);

    // Test 4: Overlap (Start Overlap)
    const t4 = checkOverlap(createBlock('5', '08:30', '09:30'), existing);
    console.log(`Test 4 (08:30-09:30 vs 09:00-10:00) Expected: true, Got: ${t4}`);

    // Test 5: Overlap (End Overlap)
    const t5 = checkOverlap(createBlock('6', '09:30', '10:30'), existing);
    console.log(`Test 5 (09:30-10:30 vs 09:00-10:00) Expected: true, Got: ${t5}`);

    // Test 6: Exact Match
    const t6 = checkOverlap(createBlock('7', '09:00', '10:00'), existing);
    console.log(`Test 6 (09:00-10:00 vs 09:00-10:00) Expected: true, Got: ${t6}`);

    // Test 7: Invalid input (Start >= End)
    const t7 = checkOverlap(createBlock('8', '11:00', '10:00'), existing);
    console.log(`Test 7 (11:00-10:00) Expected: true (Error/Overlap), Got: ${t7}`);
};

runTests();
