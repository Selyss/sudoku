import { Button } from "~/components/ui/button";

interface NumberSelectorProps {
    selectedNumber: number | null
    setSelectedNumber: (num: number) => void
}

export function NumberSelector({ selectedNumber, setSelectedNumber }: NumberSelectorProps) {
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className="flex justify-between mt-6">
            {numbers.map((num) => (
                <Button
                    key={num}
                    onClick={() => setSelectedNumber(num)}
                    variant={selectedNumber === num ? 'default' : 'outline'}
                    className={`w-10 h-10 p-0 text-xl font-bold ${
                        selectedNumber === num ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-purple-400'
                    }`}
                >
                    {num}
                </Button>
            ))}
        </div>
    )
}