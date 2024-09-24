import { SudokuCell } from "~/components/sudoku-cell";

interface SudokuBoardProps {
    board: number[][]
    initialBoard: number[][]
    handleCellClick: (row: number, col: number) => void
}

export function SudokuBoard({ board, initialBoard, handleCellClick }: SudokuBoardProps) {
    if (!board.length) return null
    return (
        <div className="grid grid-cols-3 gap-[2px] bg-neutral-700 p-[2px]">
          {[0, 1, 2].map((boxRow) => (
            <div key={boxRow} className="col-span-3 grid grid-cols-3 gap-[2px]">
              {[0, 1, 2].map((boxCol) => (
                <div key={`${boxRow}-${boxCol}`} className="grid grid-cols-3 gap-[1px] bg-neutral-800">
                  {[0, 1, 2].map((cellRow) => (
                    [0, 1, 2].map((cellCol) => {
                      const row = boxRow * 3 + cellRow
                      const col = boxCol * 3 + cellCol
                      return (
                        <div key={`${row}-${col}`} className="bg-background aspect-square">
                          <SudokuCell
                            value={board[row][col]}
                            onClick={() => handleCellClick(row, col)}
                            isInitial={initialBoard[row][col] !== 0}
                          />
                        </div>
                      )
                    })
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      )
}