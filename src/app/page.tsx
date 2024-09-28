'use client'

import { useState, useEffect } from 'react'
import { SudokuBoard } from '~/components/sudoku-board'
import { NumberSelector } from '~/components/number-selector'
import { ModeToggle } from '~/components/mode-toggle'
import { api } from '~/trpc/react'
import Timer from '~/components/timer'
import CongratsModal from '~/components/congrats-modal'
import { Button } from '~/components/ui/button'
import { Settings } from 'lucide-react'


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
  const [isGameWon, setIsGameWon] = useState(false)
  const [showModal, setShowModal] = useState(false)

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
      if (!isGameWon) {
        setTime((prevTime) => prevTime + 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isGameWon])

  const handleCellClick = (row: number, col: number) => {
    if (!board.length || !initialBoard.length || isGameWon) return;

    if (initialBoard[row][col] !== 0) {
      setSelectedNumber(selectedNumber === board[row][col] ? null : board[row][col])
      return
    }

    const newBoard = board.map(r => [...r])

    if (newBoard[row][col] === selectedNumber) {
      newBoard[row][col] = 0
    } else if (selectedNumber !== null) {
      newBoard[row][col] = selectedNumber
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

  if (!board.length || !initialBoard.length) {
    return <p>Loading</p>
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
      {/* TODO: turn into shadcnui component later*/}
      <CongratsModal isOpen={showModal} onClose={() => setShowModal(false)} time={time} />
    </div>
  )
}