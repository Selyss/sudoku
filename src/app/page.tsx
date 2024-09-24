'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { SudokuBoard } from '~/components/sudoku-board'
import { NumberSelector } from '~/components/number-selector'
import { ModeToggle } from '~/components/mode-toggle'

// Helper functions (isValid, generateBoard, fillBox, solveSudoku) remain unchanged
const isValid = (board: number[][], row: number, col: number, num: number) => {
  // ... (implementation unchanged)
}

const generateBoard = () => {
  // ... (implementation unchanged)
  // TODO: make dynamic
  const board = [[5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]]

  return board
}

const fillBox = (board: number[][], row: number, col: number) => {
  // ... (implementation unchanged)
}

const solveSudoku = (board: number[][]) => {
  // ... (implementation unchanged)
}

export default function Home() {
  const [board, setBoard] = useState<number[][]>([])
  const [initialBoard, setInitialBoard] = useState<number[][]>([])
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)

  useEffect(() => {
    const newBoard = generateBoard()
    setBoard(newBoard)
    setInitialBoard(newBoard.map(row => [...row]))
  }, [])

  const handleCellClick = (row: number, col: number) => {
    if (initialBoard[row][col] !== 0 || selectedNumber === null) return

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
            <h1 className='text-4xl font-bold'>Sudoku</h1>
            <ModeToggle />
          </div>
          <SudokuBoard
            board={board}
            initialBoard={initialBoard}
            handleCellClick={handleCellClick}
          />
          <NumberSelector
            selectedNumber={selectedNumber}
            setSelectedNumber={setSelectedNumber}
          />
        </div>
      </div>
    </div>
  )
}