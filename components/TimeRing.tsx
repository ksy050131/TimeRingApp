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

                {/* Center Text (bg needed for visibility on wedges) */}
                <circle cx={center.x} cy={center.y} r="30" fill="white" stroke="#000" strokeWidth="2" />
                <text
                    x={center.x}
                    y={center.y}
                    textAnchor="middle"
                    dy=".3em"
                    className="text-lg font-bold fill-black"
                >
                    12:30
                </text>
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
