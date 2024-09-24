
interface NumberSelectorProps {
    selectedNumber: number | null
    setSelectedNumber: (num: number) => void
}

export function NumberSelector({ selectedNumber, setSelectedNumber }: NumberSelectorProps) {
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className="flex justify-between mt-6">
            {numbers.map((num) => (
                <button
                    key={num}
                    onClick={() => setSelectedNumber(num)}
                    className={`w-10 h-10 rounded-lg text-xl font-bold ${
                        selectedNumber === num ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-purple-400'
                    }`}
                >
                    {num}
                </button>
            ))}
        </div>
    )
}