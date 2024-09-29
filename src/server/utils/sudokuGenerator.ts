// TODO: make my own api later

import sudoku from 'sudoku';

export function generatePuzzle(): { puzzle: number[][], solution: number[][] } {
    const rawPuzzle = sudoku.makepuzzle();
    const rawSolution = sudoku.solvepuzzle(rawPuzzle);

    const puzzle = [];
    const solution = [];

    for (let i = 0; i < 9; i++) {
        puzzle.push(rawPuzzle.slice(i * 9, (i + 1) * 9).map((cell: number | null) => cell !== null ? cell + 1 : 0));
        solution.push(rawSolution.slice(i * 9, (i + 1) * 9).map((cell: number) => cell + 1));
    }

    return { puzzle, solution };
}