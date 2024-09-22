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
            variant={"outline"}
            size={"icon"}
        >
            {value !== 0 ? value : ''}
        </Button>
    );
}