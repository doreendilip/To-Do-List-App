'use client';
import React, { useState } from 'react';

const App = () => {
    const [userInput, setUserInput] = useState('');
    const [list, setList] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // Track index of item to edit
    const [category, setCategory] = useState('General'); // State for selected category
    const [filterCategory, setFilterCategory] = useState('All'); // State for filtering tasks by category
    const [darkMode, setDarkMode] = useState(false); // State for dark mode toggle

    // Define colors for each category
    const categoryColors = {
        General: '#b0bec5',  // Light blue-gray
        Work: '#ffcc80',     // Light orange
        Personal: '#80cbc4', // Teal
        Urgent: '#ff8a80'    // Light red
    };

    // Set a user input value
    const updateInput = (value) => {
        setUserInput(value);
    };

    // Set a category value
    const updateCategory = (value) => {
        setCategory(value);
    };

    // Add or edit item
    const handleAction = () => {
        if (userInput.trim() === '') return; // Avoid adding empty items

        if (editIndex !== null) {
            // Edit existing item
            const updatedList = list.map((item, index) =>
                index === editIndex ? { ...item, value: userInput, category, completed: item.completed } : item
            );
            setList(updatedList);
            setEditIndex(null); // Reset edit mode
        } else {
            // Add new item with category
            const newItem = {
                id: Math.random(), // Consider using a more reliable ID generator
                value: userInput,
                category: category,
                completed: false, // New tasks are uncompleted by default
            };
            setList([...list, newItem]);
        }

        setUserInput(''); // Clear input field
        setCategory('General'); // Reset category to default
    };

    // Function to delete item from list using id to delete
    const deleteItem = (id) => {
        const updatedList = list.filter((item) => item.id !== id);
        setList(updatedList);
    };

    // Function to enable editing mode
    const startEdit = (index) => {
        setUserInput(list[index].value);
        setCategory(list[index].category); // Load category when editing
        setEditIndex(index); // Set the index of the item to be edited
    };

    // Function to toggle task completion
    const toggleComplete = (index) => {
        const updatedList = list.map((item, idx) =>
            index === idx ? { ...item, completed: !item.completed } : item
        );
        setList(updatedList);
    };

    // Handle category filter change
    const updateFilterCategory = (value) => {
        setFilterCategory(value);
    };

    // Calculate progress (percentage of completed tasks)
    const completedTasks = list.filter((item) => item.completed).length;
    const totalTasks = list.length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Toggle dark/light mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                backgroundColor: darkMode ? '#333' : '#f0f0f0', // Background color based on theme
                color: darkMode ? '#fff' : '#000', // Text color based on theme
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle effect
                transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth transition between themes
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    color: darkMode ? '#d3baff' : '#6b38fb', // Adjust color based on theme
                }}
            >
                Doreen's
            </div>
            <div
                style={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    color: darkMode ? '#d3baff' : '#6a0dad', // Adjust color based on theme
                }}
            >
                TODO LIST
            </div>

            {/* Dark Mode Toggle */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: darkMode ? '#555' : '#ddd',
                        color: darkMode ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={toggleDarkMode}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>

            {/* Input Field for Task */}
            <div
                style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
            >
                <input
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px',
                        marginRight: '10px',
                        flexGrow: '1',
                        borderRadius: '4px',
                        border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                        backgroundColor: darkMode ? '#444' : '#fff',
                        color: darkMode ? '#fff' : '#000',
                    }}
                    placeholder={editIndex !== null ? "Edit item..." : "Add item..."}
                    value={userInput}
                    onChange={(e) => updateInput(e.target.value)}
                />
            </div>

            {/* Category Selection */}
            <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
                <select
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px',
                        marginRight: '10px',
                        borderRadius: '4px',
                        border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                        backgroundColor: darkMode ? '#444' : '#fff',
                        color: darkMode ? '#fff' : '#000',
                    }}
                    value={category}
                    onChange={(e) => updateCategory(e.target.value)}
                >
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Urgent">Urgent</option>
                </select>
                <button
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px 20px',
                        backgroundColor: '#6b38fb', // Purple color for button
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                    onClick={handleAction}
                >
                    {editIndex !== null ? 'Update' : 'ADD'}
                </button>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '20px' }}>
                <label>Filter by Category: </label>
                <select
                    style={{
                        fontSize: '1.2rem',
                        padding: '10px',
                        borderRadius: '4px',
                        border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
                        backgroundColor: darkMode ? '#444' : '#fff',
                        color: darkMode ? '#fff' : '#000',
                    }}
                    value={filterCategory}
                    onChange={(e) => updateFilterCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Urgent">Urgent</option>
                </select>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                    Progress: {completedTasks} / {totalTasks} tasks completed
                </div>
                <div style={{ backgroundColor: '#e0e0e0', borderRadius: '8px', height: '20px', width: '100%' }}>
                    <div
                        style={{
                            height: '100%',
                            width: `${progressPercentage}%`,
                            backgroundColor: '#6b38fb',
                            borderRadius: '8px',
                            transition: 'width 0.3s ease',
                        }}
                    />
                </div>
            </div>
            {/* Task List */}
            <div
                style={{ background: darkMode ? '#444' : '#ffffff', padding: '20px', borderRadius: '8px' }}
            >
                {list.length > 0 ? (
                    list
                        .filter(
                            (item) =>
                                filterCategory === 'All' || item.category === filterCategory
                        )
                        .map((item, index) => (
                            <div
                                key={item.id} // Use the unique id as the key
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                    backgroundColor: categoryColors[item.category], // Assign color based on category
                                    padding: '10px',
                                    borderRadius: '8px',
                                    textDecoration: item.completed ? 'line-through' : 'none', // Strike through completed tasks
                                    color: darkMode ? '#fff' : '#000', // Adjust text color based on theme
                                }}
                            >
                                <span
                                    style={{ fontSize: '1.2rem', flexGrow: '1', cursor: 'pointer' }}
                                    onClick={() => toggleComplete(index)} // Toggle task completion on click
                                >
                                    {item.value} - <strong>{item.category}</strong>
                                </span>
                                <span>
                                    <button
                                        style={{
                                            padding: '8px',
                                            backgroundColor: '#4caf50', // Green color for complete button
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            marginRight: '10px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => toggleComplete(index)} // Mark task as completed
                                    >
                                        {item.completed ? 'Uncomplete' : 'Complete'}
                                    </button>
                                    <button
                                        style={{
                                            padding: '8px',
                                            backgroundColor: '#f44336', // Red color for delete button
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            marginRight: '10px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        style={{
                                            padding: '8px',
                                            backgroundColor: '#2196f3', // Blue color for edit button
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => startEdit(index)}
                                    >
                                        Edit
                                    </button>
                                </span>
                            </div>
                        ))
                ) : (
                    <div
                        style={{ textAlign: 'center', fontSize: '1.2rem', color: darkMode ? '#aaa' : '#777' }}
                    >
                        No items in the list
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
