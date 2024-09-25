import { X } from "lucide-react";
import { formatTime } from "~/components/timer";

interface CongratsModalProps {
    isOpen: boolean
    onClose: () => void
    time: number
}

export default function CongratsModal({ isOpen, onClose, time }: CongratsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Congratulations!</h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <p className="text-neutral-200 mb-4">You've solved the Sudoku puzzle!</p>
                {/* TODO: make the time stop updating */}
                <p className="text-neutral-200 mb-6">Your time: <span className="font-bold text-purple-400">{formatTime(time)}</span></p>
                <button
                    onClick={onClose}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    )
}