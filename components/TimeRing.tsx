'use client';

import React from 'react';
import ScheduleBlock from './ScheduleBlock';
import { ScheduleBlock as ScheduleBlockType } from '@/types/models';

interface Props {
    blocks: ScheduleBlockType[];
}



const TimeRing: React.FC<Props> = ({ blocks }) => {
    const radius = 120;
    const center = { x: 150, y: 150 };
    const [now, setNow] = React.useState(new Date());

    React.useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000); // Update every minute

        // Initial update to sync with seconds slightly better? 
        // Or just run every minute. Requirement says 1 minute update.
        // Let's stick to simple interval.
        return () => clearInterval(interval);
    }, []);

    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Calculate angles
    // 12 o'clock = 0 (or -90 in standard SVG if 0 is 3 o'clock). 
    // SVG standard: 0 is 3 o'clock. But we can use transform="rotate(angle, cx, cy)" 
    // where angle 0 is usually 3 o'clock defaults? 
    // Actually, usually in SVG rotation: 0 degrees is strictly based on the coordinate system.
    // If we draw a vertical line, 0 rotation keeps it vertical.
    // Let's draw hands pointing up (12 o'clock) by default and rotate them.

    // Minute angle: (minutes / 60) * 360
    const minuteAngle = (minutes / 60) * 360;

    // Hour angle: ((hours % 12) / 12) * 360 + (minutes / 60) * 30
    const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold mb-4">Time Ring</h2>
            <svg width="300" height="300" viewBox="0 0 300 300" className="rounded-full bg-transparent">
                {/* Background Circle */}
                <circle
                    cx={center.x}
                    cy={center.y}
                    r={radius}
                    fill="white"
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Schedule Blocks (Wedges) */}
                {blocks.map((block) => (
                    <ScheduleBlock
                        key={block.id}
                        block={block}
                        radius={radius}
                        center={center}
                    />
                ))}

                {/* Analog Clock Hands */}
                {/* Hour Hand */}
                <line
                    x1={center.x}
                    y1={center.y}
                    x2={center.x}
                    y2={center.y - radius * 0.5} // 50% length
                    stroke="#333"
                    strokeWidth="6"
                    strokeLinecap="round"
                    transform={`rotate(${hourAngle}, ${center.x}, ${center.y})`}
                    style={{ pointerEvents: 'none' }}
                />

                {/* Minute Hand */}
                <line
                    x1={center.x}
                    y1={center.y}
                    x2={center.x}
                    y2={center.y - radius * 0.8} // 80% length
                    stroke="#000"
                    strokeWidth="4"
                    strokeLinecap="round"
                    transform={`rotate(${minuteAngle}, ${center.x}, ${center.y})`}
                    style={{ pointerEvents: 'none' }}
                />

                {/* Center Pin */}
                <circle
                    cx={center.x}
                    cy={center.y}
                    r="4"
                    fill="#333"
                />
            </svg>
            <div className="mt-4 space-y-2">
                {blocks.length === 0 && <div className="text-gray-500">No events scheduled.</div>}
                {blocks.map(b => (
                    <div key={b.id} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: b.color }}></div>
                        <span>{b.startTime} - {b.endTime}: {b.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeRing;
