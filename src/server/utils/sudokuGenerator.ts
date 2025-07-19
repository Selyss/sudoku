// TODO: make my own api later

import sudoku from 'sudoku';

export type Difficulty = 'easy' | 'medium' | 'hard';

export function generatePuzzle(difficulty: Difficulty = 'easy'): { puzzle: number[][], solution: number[][] } {
    const rawPuzzle = sudoku.makepuzzle();
    const rawSolution = sudoku.solvepuzzle(rawPuzzle);

    const solution = [];

    // Convert solution to 2D array
    for (let i = 0; i < 9; i++) {
        solution.push(rawSolution.slice(i * 9, (i + 1) * 9).map((cell: number) => cell + 1));
    }

    // Start from complete solution and remove cells based on difficulty
    const puzzle = adjustDifficulty(solution, difficulty);

    return { puzzle, solution };
}

function adjustDifficulty(puzzle: number[][], difficulty: Difficulty): number[][] {
    const difficultySettings = {
        easy: 0.5,    // Remove 50% of cells (leave 40-41 filled)
        medium: 0.6,  // Remove 60% of cells (leave 32-33 filled)
        hard: 0.75,   // Remove 75% of cells (leave 20-21 filled)
    };

    const removalRate = difficultySettings[difficulty];
    const adjustedPuzzle = puzzle.map(row => [...row]);

    // Count all filled cells (should be 81 since we start with complete solution)
    let filledCells: [number, number][] = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (adjustedPuzzle[i]?.[j] !== 0) {
                filledCells.push([i, j]);
            }
        }
    }

    // Calculate how many cells to remove
    const cellsToRemove = Math.floor(filledCells.length * removalRate);

    // Randomly remove cells
    for (let i = 0; i < cellsToRemove && filledCells.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * filledCells.length);
        const cellToRemove = filledCells[randomIndex];
        if (cellToRemove) {
            const [row, col] = cellToRemove;
            if (adjustedPuzzle[row]?.[col] !== undefined) {
                adjustedPuzzle[row][col] = 0;
            }
            filledCells.splice(randomIndex, 1);
        }
    }

    return adjustedPuzzle;
}