import { set } from "zod"

interface NumberSelectorProps {
    selectedNumber: number | null
    onNumberSelect: (num: number | null) => void
    board: number[][]
}

export function NumberSelector({ selectedNumber, onNumberSelect, board }: NumberSelectorProps) {
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    // Count how many times each number appears on the board
    const getNumberCount = (num: number): number => {
        let count = 0
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i]?.[j] === num) {
                    count++
                }
            }
        }
        return count
    }

    const isNumberComplete = (num: number): boolean => {
        return getNumberCount(num) >= 9
    }
    return (
        <div className="flex justify-between mt-6">
            {numbers.map((num) => {
                const isComplete = isNumberComplete(num)
                const isSelected = selectedNumber === num

                return (
                    <button
                        key={num}
                        onClick={() => onNumberSelect(isSelected ? null : num)}
                        disabled={isComplete}
                        className={`w-10 h-10 rounded-lg text-xl font-bold transition-colors ${isComplete
                                ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                                : isSelected
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-neutral-200 dark:bg-neutral-800 text-purple-600 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                            }`}
                    >
                        {num}
                    </button>
                )
            })}
        </div>
    )
}