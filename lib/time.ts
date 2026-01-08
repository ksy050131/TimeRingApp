export const minutesToAngle = (minutes: number): number => {
    return (minutes / 1440) * 360;
};

export const angleToMinutes = (angle: number): number => {
    return (angle / 360) * 1440;
};

export const timeToMinutes = (time: string): number => {
    const [hours, mins] = time.split(':').map(Number);
    return hours * 60 + mins;
};
