import { isValid } from "zod";
import { Button } from "~/components/ui/button";

interface SudokuCellProps {
    value: number;
    isInitial: boolean
    isValid: boolean
    onClick: () => void
    rowIndex: number
    colIndex: number
}

export function SudokuCell({ value, isInitial, isValid, onClick, rowIndex, colIndex }: SudokuCellProps) {
    return (
        <Button
          onClick={onClick}
          variant="ghost"
          className={`w-full h-full p-0 flex items-center justify-center text-2xl font-bold
            ${isInitial ? 'text-white' : 'text-purple-400'}
            hover:bg-neutral-800 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50`}
          disabled={isInitial}
        >
          {value !== 0 ? value : ''}
        </Button>
      )
    }