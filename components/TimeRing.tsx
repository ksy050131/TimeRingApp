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
    const [hoverBlockId, setHoverBlockId] = React.useState<string | null>(null);
    const [selectedBlockId, setSelectedBlockId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const minuteAngle = (minutes / 60) * 360;
    const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    const activeBlockId = hoverBlockId || selectedBlockId;
    const activeBlock = blocks.find(b => b.id === activeBlockId);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold mb-2">Time Ring</h2>

            {/* Active Block Info Display */}
            <div className="h-8 mb-2 flex items-center justify-center font-medium text-gray-700">
                {activeBlock ? (
                    <span>{activeBlock.startTime} - {activeBlock.endTime} · {activeBlock.title}</span>
                ) : (
                    <span className="text-gray-400 text-sm">Select a block for details</span>
                )}
            </div>

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
                        isActive={activeBlockId === block.id}
                        onMouseEnter={() => setHoverBlockId(block.id)}
                        onMouseLeave={() => setHoverBlockId(null)}
                        onClick={() => setSelectedBlockId(block.id)}
                    />
                ))}

                {/* Ticks and Labels */}
                {[0, 3, 6, 9].map((hour) => {
                    const tickLength = 10;
                    const labelOffset = 20;

                    let x1, y1, x2, y2, lx, ly, label;

                    if (hour === 0) { // 12 o'clock
                        x1 = center.x; y1 = center.y - radius;
                        x2 = center.x; y2 = center.y - radius + tickLength;
                        lx = center.x; ly = center.y - radius - labelOffset;
                        label = "12";
                    } else if (hour === 3) { // 3 o'clock
                        x1 = center.x + radius; y1 = center.y;
                        x2 = center.x + radius - tickLength; y2 = center.y;
                        lx = center.x + radius + labelOffset; ly = center.y;
                        label = "3";
                    } else if (hour === 6) { // 6 o'clock
                        x1 = center.x; y1 = center.y + radius;
                        x2 = center.x; y2 = center.y + radius - tickLength;
                        lx = center.x; ly = center.y + radius + labelOffset;
                        label = "6";
                    } else { // 9 o'clock
                        x1 = center.x - radius; y1 = center.y;
                        x2 = center.x - radius + tickLength; y2 = center.y;
                        lx = center.x - radius - labelOffset; ly = center.y;
                        label = "9";
                    }

                    return (
                        <React.Fragment key={hour}>
                            <line
                                x1={x1} y1={y1}
                                x2={x2} y2={y2}
                                stroke="#555"
                                strokeWidth="2"
                                style={{ pointerEvents: 'none' }}
                            />
                            <text
                                x={lx} y={ly}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-sm font-bold fill-gray-700"
                                style={{ pointerEvents: 'none' }}
                            >
                                {label}
                            </text>
                        </React.Fragment>
                    );
                })}

                {/* Analog Clock Hands */}
                {/* Hour Hand */}
                <line
                    x1={center.x}
                    y1={center.y}
                    x2={center.x}
                    y2={center.y - radius * 0.5}
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
                    y2={center.y - radius * 0.8}
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
            <div className="mt-4 space-y-2 w-full max-w-sm">
                {blocks.length === 0 && <div className="text-gray-500 text-center">No events scheduled.</div>}
                {blocks.map(b => (
                    <div
                        key={b.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${activeBlockId === b.id ? 'bg-gray-100 ring-1 ring-gray-300' : 'hover:bg-gray-50'}`}
                        onClick={() => setSelectedBlockId(b.id)}
                    >
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: b.color }}></div>
                        <span className="text-sm">{b.startTime} - {b.endTime}: {b.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeRing;
