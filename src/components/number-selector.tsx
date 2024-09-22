import { Button } from "~/components/ui/button";

interface NumberSelectorProps {
    selectedNumber: number | null
    setSelectedNumber: (num: number) => void
}

export function NumberSelector({ selectedNumber, setSelectedNumber }: NumberSelectorProps) {
    return (
        <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                    key={num}
                    onClick={() => setSelectedNumber(num)}
                    variant={selectedNumber === num ? "default" : "outline"}
                    size="icon"
                >
                    {num}
                </Button>
            ))}
        </div>
    )
}