import { Clock } from "lucide-react";

export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function Timer({ time }: { time: number }) {
    return (
        <div className="flex items-center space-x-2 bg-neutral-800 px-3 py-1 rounded-lg">
            <Clock className="w-4 h-4 text-neutral-400" />
            <span className="text-lg font-medium text-neutral-200">{formatTime(time)}</span>
        </div>
    )
}