'use client'

import { useState, useEffect } from 'react'
import { SudokuBoard } from '~/components/sudoku-board'
import { SudokuBoardSkeleton } from '~/components/sudoku-board-skeleton'
import { NumberSelector } from '~/components/number-selector'
import { ModeToggle } from '~/components/mode-toggle'
import { DifficultySelector, type Difficulty } from '~/components/difficulty-selector'
import { api } from '~/trpc/react'
import Timer from '~/components/timer'
import CongratsModal from '~/components/congrats-modal'
import { Button } from '~/components/ui/button'
import { Settings, RotateCcw, Undo, Redo } from 'lucide-react'


// Helper functions (isValid, generateBoard, fillBox, solveSudoku) remain unchanged
const isValid = (board: number[][], row: number, col: number, num: number) => {
  // ... (implementation unchanged)
}

export default function Home() {
  const [board, setBoard] = useState<number[][]>([])
  const [solution, setSolution] = useState<number[][]>([])
  const [initialBoard, setInitialBoard] = useState<number[][]>([])
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [time, setTime] = useState(0)
  const [isGameWon, setIsGameWon] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  
  // Undo/Redo system
  const [history, setHistory] = useState<number[][][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const { mutate: generatePuzzle, isPending } = api.sudoku.generatePuzzle.useMutation({
    onSuccess: (data) => {
      setBoard(data.puzzle);
      setInitialBoard(data.puzzle.map(row => [...row]));
      setSolution(data.solution);
      setTime(0);
      setIsGameWon(false);
      setShowModal(false);
      // Reset history for new game
      setHistory([data.puzzle.map(row => [...row])]);
      setHistoryIndex(0);
    }
  })

  // Add current board state to history
  const addToHistory = (newBoard: number[][]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBoard.map(row => [...row]));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }

  // Undo function
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const prevState = history[historyIndex - 1];
      if (prevState) {
        setBoard(prevState.map(row => [...row]));
      }
    }
  }

  // Redo function
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const nextState = history[historyIndex + 1];
      if (nextState) {
        setBoard(nextState.map(row => [...row]));
      }
    }
  }

  // Check if undo/redo are available
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;


  useEffect(() => {
    generatePuzzle({ difficulty });
  }, [generatePuzzle, difficulty])

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    generatePuzzle({ difficulty: newDifficulty });
  }

  const handleNewGame = () => {
    generatePuzzle({ difficulty });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isGameWon) {
        setTime((prevTime) => prevTime + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isGameWon])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!board.length || !initialBoard.length || isGameWon) return;

      // Number keys (1-9) - always switch to number selection mode
      if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key);
        
        // Switch to number selection mode and deselect cell
        setSelectedNumber(selectedNumber === num ? null : num);
        setSelectedCell(null);
      }      // Delete/Backspace - clear cell
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedCell) {
        const [row, col] = selectedCell;
        if (initialBoard[row]?.[col] === 0) {
          const newBoard = board.map(r => [...r]);
          if (newBoard[row]?.[col] !== undefined) {
            newBoard[row][col] = 0;
            // Only add to history if the board actually changed
            if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
              addToHistory(newBoard);
            }
            setBoard(newBoard);
          }
        }
      }

      // Arrow keys - navigate cells
      if (selectedCell && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const [row, col] = selectedCell;
        let newRow = row;
        let newCol = col;

        switch (e.key) {
          case 'ArrowUp': newRow = Math.max(0, row - 1); break;
          case 'ArrowDown': newRow = Math.min(8, row + 1); break;
          case 'ArrowLeft': newCol = Math.max(0, col - 1); break;
          case 'ArrowRight': newCol = Math.min(8, col + 1); break;
        }

        setSelectedCell([newRow, newCol]);
      }

      // Escape - clear selection
      if (e.key === 'Escape') {
        setSelectedCell(null);
        setSelectedNumber(null);
      }
      
      // Undo/Redo shortcuts
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      
      if (e.ctrlKey && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board, initialBoard, selectedCell, selectedNumber, solution, isGameWon, undo, redo, addToHistory, history, historyIndex]);

  const handleCellClick = (row: number, col: number) => {
    if (!board.length || !initialBoard.length || isGameWon) return;

    // Set selected cell for keyboard navigation
    setSelectedCell([row, col]);

    if (initialBoard[row]?.[col] !== 0) {
      setSelectedNumber(selectedNumber === board[row]?.[col] ? null : board[row]?.[col] ?? null)
      return
    }

    const newBoard = board.map(r => [...r])

    if (newBoard[row]?.[col] === selectedNumber) {
      newBoard[row][col] = 0
    } else if (selectedNumber !== null && newBoard[row]?.[col] !== undefined) {
      newBoard[row][col] = selectedNumber
    }

    // Only add to history if the board actually changed
    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      addToHistory(newBoard);
    }

    setBoard(newBoard)

    if (JSON.stringify(newBoard) === JSON.stringify(solution)) {
      setIsGameWon(true);
      setShowModal(true);
    }
  }

  const handleSettingsClick = () => {
    // TODO: Implement settings functionality
    console.log("Settings clicked")
  }

  if (!board.length || !initialBoard.length || isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <div className="w-full max-w-md bg-background border-none">
          <div className='p-4'>
            <div className='flex justify-between items-center mb-4'>
              <Timer time={time} />
              <h1 className='text-3xl font-bold'>Sudoku</h1>
              <div className="flex items-center space-x-2">
                <ModeToggle />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSettingsClick}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <DifficultySelector
                difficulty={difficulty}
                onDifficultyChange={handleDifficultyChange}
              />
              <Button variant="outline" onClick={handleNewGame} disabled={isPending}>
                <RotateCcw className="h-4 w-4 mr-2" />
                New Game
              </Button>
            </div>

            <SudokuBoardSkeleton />
            <NumberSelector
              selectedNumber={selectedNumber}
              onNumberSelect={setSelectedNumber}
              board={board.length ? board : Array(9).fill(Array(9).fill(0))}
            />

            {/* Keyboard controls hint - same as loaded state */}
            <div className="mt-4 text-center">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Use arrow keys to navigate • Number keys to select numbers • Delete/Backspace to clear • Ctrl+Z/Y to undo/redo • Escape to deselect
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const isCellValid = (row: number, col: number) => {
    const cellValue = board[row]?.[col];
    return cellValue === 0 || cellValue === undefined || isValid(board, row, col, cellValue);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-md bg-background border-none">
        <div className='p-4'>
          <div className='flex justify-between items-center mb-4'>
            <Timer time={time} />
            <h1 className='text-3xl font-bold'>Sudoku</h1>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <Button
                variant="outline"
                size="icon"
                onClick={handleSettingsClick}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <DifficultySelector
              difficulty={difficulty}
              onDifficultyChange={handleDifficultyChange}
            />
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={undo}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={redo}
                disabled={!canRedo}
                title="Redo (Ctrl+Y)"
              >
                <Redo className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleNewGame} disabled={isPending}>
                <RotateCcw className="h-4 w-4 mr-2" />
                New Game
              </Button>
            </div>
          </div>

          <SudokuBoard
            board={board}
            initialBoard={initialBoard}
            selectedNumber={selectedNumber}
            selectedCell={selectedCell}
            handleCellClick={handleCellClick}
          />
          <NumberSelector
            selectedNumber={selectedNumber}
            onNumberSelect={setSelectedNumber}
            board={board}
          />

          {/* Keyboard controls hint */}
          <div className="mt-4 text-center">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Use arrow keys to navigate • Number keys to select numbers • Delete/Backspace to clear • Ctrl+Z/Y to undo/redo • Escape to deselect
            </p>
          </div>
        </div>
      </div>
      {/* TODO: turn into shadcnui component later*/}
      <CongratsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        time={time}
        onNewGame={handleNewGame}
      />
    </div>
  )
}