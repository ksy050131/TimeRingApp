'use client';

import { TodoItem } from '@/types/models';
import { loadTodoList, saveTodoList } from '@/lib/storage';
import React, { useState, useEffect } from 'react';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from storage on mount
    useEffect(() => {
        const saved = loadTodoList();
        setTodos(saved);
        setIsLoaded(true);
    }, []);

    // Save to storage whenever todos change
    useEffect(() => {
        if (isLoaded) {
            saveTodoList(todos);
        }
    }, [todos, isLoaded]);

    const toggleTodo = (id: string) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    };

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newTodo: TodoItem = {
            id: crypto.randomUUID(),
            title: inputText.trim(),
            completed: false,
        };

        setTodos(prev => [...prev, newTodo]);
        setInputText('');
    };

    if (!isLoaded) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4 bg-white shadow rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Tasks</h2>

            {/* Add Todo Form */}
            <form onSubmit={addTodo} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="New task..."
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Add
                </button>
            </form>

            {/* List */}
            <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                {todos.length === 0 && (
                    <li className="text-gray-500 text-center py-4">No tasks yet.</li>
                )}
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded group">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                            {todo.title}
                        </span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition px-2"
                            title="Delete"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
