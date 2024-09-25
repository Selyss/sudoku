'use client'

import { useState, useEffect } from 'react'
import { SudokuBoard } from '~/components/sudoku-board'
import { NumberSelector } from '~/components/number-selector'
import { ModeToggle } from '~/components/mode-toggle'
import { api } from '~/trpc/react'
import Timer from '~/components/timer'


// Helper functions (isValid, generateBoard, fillBox, solveSudoku) remain unchanged
const isValid = (board: number[][], row: number, col: number, num: number) => {
  // ... (implementation unchanged)
}

export default function Home() {
  const [board, setBoard] = useState<number[][]>([])
  const [solution, setSolution] = useState<number[][]>([])
  const [initialBoard, setInitialBoard] = useState<number[][]>([])
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [time, setTime] = useState(0)

  const { mutate: generatePuzzle, isPending } = api.sudoku.generatePuzzle.useMutation({
    onSuccess: (data) => {
      setBoard(data.puzzle);
      setInitialBoard(data.puzzle.map(row => [...row]));
      setSolution(data.solution);
    }
  })


  useEffect(() => {
    generatePuzzle();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCellClick = (row: number, col: number) => {
    if (initialBoard[row][col] !== 0) {
      setSelectedNumber(selectedNumber === board[row][col] ? null : board[row][col])
      return
    }

    if (selectedNumber === null) {
      return
    }

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = selectedNumber

    setBoard(newBoard)
  }

  const isCellValid = (row: number, col: number) => {
    return board[row][col] === 0 || isValid(board, row, col, board[row][col])
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="w-full max-w-md bg-background border-none">
        <div className='p-4'>
          <div className='flex justify-between items-center mb-4'>
            <Timer time={time} />
            <h1 className='text-4xl font-bold'>Sudoku</h1>
            <ModeToggle />
          </div>
          {isPending ? (
            <p>Loading puzzle...</p>
          ) : (
            <>
              <SudokuBoard
                board={board}
                initialBoard={initialBoard}
                selectedNumber={selectedNumber}
                handleCellClick={handleCellClick}
              />
              <NumberSelector
                selectedNumber={selectedNumber}
                setSelectedNumber={setSelectedNumber}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}