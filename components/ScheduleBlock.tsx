import React from 'react';
import { ScheduleBlock as ScheduleBlockType } from '@/types/models';
import { minutesToAngle, timeToMinutes } from '@/lib/time';

interface Props {
    block: ScheduleBlockType;
    radius: number;
    center: { x: number; y: number };
}

const ScheduleBlock: React.FC<Props> = ({ block, radius, center }) => {
    const startMinutes = timeToMinutes(block.startTime);
    const endMinutes = timeToMinutes(block.endTime);

    // Transformation: -90 degrees.
    const startAngle = minutesToAngle(startMinutes) - 90;
    const endAngle = minutesToAngle(endMinutes) - 90;

    // SVG Arc calculation
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center.x + radius * Math.cos(startRad);
    const y1 = center.y + radius * Math.sin(startRad);
    const x2 = center.x + radius * Math.cos(endRad);
    const y2 = center.y + radius * Math.sin(endRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    // Path: Move to Center -> Line to Start -> Arc to End -> Line to Center -> Close
    const d = [
        `M ${center.x} ${center.y}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${center.x} ${center.y}`,
    ].join(" ");

    return (
        <path
            d={d}
            fill={block.color}
            stroke="#000"
            strokeWidth="2"
            fillOpacity="0.9"
        />
    );
};

export default ScheduleBlock;
