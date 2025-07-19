import { isValid } from "zod";
import { Button } from "~/components/ui/button";

interface SudokuCellProps {
    value: number;
    isInitial: boolean
    isSelected: boolean
  isCellSelected: boolean
    isValid: boolean
    onClick: () => void
    rowIndex: number
    colIndex: number
}

export function SudokuCell({ value, isInitial, isSelected, isCellSelected, isValid, onClick, rowIndex, colIndex }: SudokuCellProps) {
    return (
        <button
          onClick={onClick}
        className={`w-full h-full flex items-center justify-center text-2xl font-bold transition-colors
            ${isInitial ? 'text-foreground' : 'text-purple-600'}
            ${isSelected ? 'bg-purple-100 dark:bg-purple-900' : ''}
            ${isCellSelected ? 'bg-blue-200 dark:bg-blue-800 ring-2 ring-blue-500' : ''}
            ${!isSelected && !isCellSelected ? 'hover:bg-neutral-200 dark:hover:bg-neutral-800' : ''}
            focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50`}
      >
          {value !== 0 ? value : ''}
        </button>
      )
    }