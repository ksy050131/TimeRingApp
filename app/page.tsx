'use client';

import React, { useState, useEffect } from 'react';
import TimeRing from '@/components/TimeRing';
import TodoList from '@/components/TodoList';
import AddBlockModal from '@/components/Modals/AddBlockModal';
import Toast from '@/components/Toast';
import { ScheduleBlock } from '@/types/models';
import { loadSchedule, saveSchedule } from '@/lib/storage';
import { checkOverlap } from '@/lib/overlap';

export default function Home() {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([]);
  const [currentDate] = useState(new Date().toISOString().split('T')[0]); // Simple "today"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', isVisible: false });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load schedule
  useEffect(() => {
    const loaded = loadSchedule(currentDate);
    setBlocks(loaded);
    setIsLoaded(true);
  }, [currentDate]);

  // Save schedule
  useEffect(() => {
    if (isLoaded) {
      saveSchedule(currentDate, blocks);
    }
  }, [blocks, currentDate, isLoaded]);

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    // Reset handled by Toast component or we can auto-hide here if needed, 
    // but Toast has its own timer.
  };

  const handleAddBlock = (data: Omit<ScheduleBlock, 'id'>) => {
    const newBlock: ScheduleBlock = {
      ...data,
      id: crypto.randomUUID(),
    };

    if (checkOverlap(newBlock, blocks)) {
      showToast('⚠️ Time overlap detected! Please choose a different time.');
      return;
    }

    setBlocks(prev => [...prev, newBlock]);
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100 flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:items-start">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Time Ring Dashboard</h1>

        <TimeRing blocks={blocks} />

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          + Add Block
        </button>
      </div>

      <div className="w-full max-w-md">
        <TodoList />
      </div>

      <AddBlockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddBlock}
      />

      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </main>
  );
}
