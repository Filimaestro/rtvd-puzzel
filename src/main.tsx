import React from 'react'
import ReactDOM from 'react-dom/client'
import { WordSearch } from './components/WordSearch'
import './style.css'

// Example puzzle data
const words = ['HELLO', 'WORLD', 'PUZZLE', 'GAME'];
const grid = [
  ['H', 'W', 'O', 'R', 'L', 'D', 'X'],
  ['E', 'X', 'P', 'X', 'X', 'X', 'X'],
  ['L', 'X', 'U', 'X', 'X', 'X', 'X'],
  ['L', 'X', 'Z', 'X', 'X', 'X', 'X'],
  ['O', 'X', 'Z', 'X', 'X', 'X', 'X'],
  ['X', 'X', 'L', 'X', 'X', 'X', 'X'],
  ['X', 'X', 'E', 'X', 'X', 'X', 'X'],
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center py-4">Word Search Puzzle</h1>
        <WordSearch words={words} grid={grid} />
      </div>
    </div>
  </React.StrictMode>
) 