import { X } from "lucide-react";
import { formatTime } from "~/components/timer";

interface CongratsModalProps {
    isOpen: boolean
    onClose: () => void
    time: number
    onNewGame: () => void
}

export default function CongratsModal({ isOpen, onClose, time, onNewGame }: CongratsModalProps) {
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
                <div className="flex space-x-3">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-neutral-600 text-white py-2 px-4 rounded-lg hover:bg-neutral-700 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            onNewGame();
                            onClose();
                        }}
                        className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        New Game
                    </button>
                </div>
            </div>
        </div>
    )
}