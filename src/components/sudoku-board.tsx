import { SudokuCell } from "~/components/sudoku-cell";

interface SudokuBoardProps {
    board: number[][]
    initialBoard: number[][]
    handleCellClick: (row: number, col: number) => void
    isCellValid: (row: number, col: number) => boolean
}

export function SudokuBoard({ board, initialBoard, handleCellClick, isCellValid }: SudokuBoardProps) {
    return (
        <div className="grid grid-cols-9 gap-0 border-2 border-primary mb-4">
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <SudokuCell
                        key={`${rowIndex}-${colIndex}`}
                        value={cell}
                        isInitial={initialBoard[rowIndex]?.[colIndex] !== 0}
                        isValid={isCellValid(rowIndex, colIndex)}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                    />
                ))
            )}
        </div>
    )
}