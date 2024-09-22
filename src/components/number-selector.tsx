import { Button } from "~/components/ui/button";

interface NumberSelectorProps {
    selectedNumber: number | null
    setSelectedNumber: (num: number) => void
}

export function NumberSelector({ selectedNumber, setSelectedNumber }: NumberSelectorProps) {
    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className="flex justify-center space-x-2">
            {numbers.map((num) => (
                <Button
                    key={num}
                    onClick={() => setSelectedNumber(num)}
                    variant={"ghost"}
                    className={`w-10 h-10 p-0 text-xl font-bold ${selectedNumber === num ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-purple-400'} rounded-lg`}
                >
                    {num}
                </Button>
            ))}
        </div>
    )
}