import React, { useState } from 'react';

interface WordSearchProps {
  words: string[];
  grid: string[][];
}

export const WordSearch: React.FC<WordSearchProps> = ({ words, grid }) => {
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [startCell, setStartCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);

  const handleCellClick = (row: number, col: number) => {
    if (!startCell) {
      setStartCell({ row, col });
      setSelectedCells([{ row, col }]);
    } else {
      // Add logic for selecting cells between start and current
      const newSelectedCells = getCellsBetween(startCell, { row, col });
      setSelectedCells(newSelectedCells);
    }
  };

  const handleCellMouseUp = () => {
    if (startCell && selectedCells.length > 0) {
      const selectedWord = getSelectedWord(selectedCells);
      if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
        setFoundWords([...foundWords, selectedWord]);
      }
      setStartCell(null);
      setSelectedCells([]);
    }
  };

  const getCellsBetween = (start: { row: number; col: number }, end: { row: number; col: number }) => {
    const cells: { row: number; col: number }[] = [];
    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    
    for (let i = 0; i <= steps; i++) {
      cells.push({
        row: start.row + Math.round((rowDiff * i) / steps),
        col: start.col + Math.round((colDiff * i) / steps)
      });
    }
    
    return cells;
  };

  const getSelectedWord = (cells: { row: number; col: number }[]) => {
    return cells.map(cell => grid[cell.row][cell.col]).join('');
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${grid[0].length}, 1fr)` }}>
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 border border-gray-300 flex items-center justify-center
                ${isCellSelected(rowIndex, colIndex) ? 'bg-blue-200' : 'bg-white'}`}
              onMouseDown={() => handleCellClick(rowIndex, colIndex)}
              onMouseUp={handleCellMouseUp}
              onMouseEnter={() => startCell && handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </button>
          ))
        ))}
      </div>
      
      <div className="mt-4">
        <h3 className="font-bold mb-2">Words to find:</h3>
        <div className="flex flex-wrap gap-2">
          {words.map((word, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded ${
                foundWords.includes(word) ? 'bg-green-200 line-through' : 'bg-gray-100'
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}; 