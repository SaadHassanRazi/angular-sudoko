import { Injectable } from '@angular/core';
import { Cell } from '../Models/cell.model';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class SudokoService {
  private readonly GRID_SIZE = 9;

  generateNewGame(difficulty: number = 0.5): Cell[][] {
    const solvedGrid = this.generateSolvedGrid();
    const puzzle = this.removeNumbers(solvedGrid, difficulty);
    return puzzle;
  }

  private generateSolvedGrid(): Cell[][] {
    const grid: Cell[][] = Array(9)
      .fill(null)
      .map(() =>
        Array(9)
          .fill(null)
          .map(() => ({
            value: null,
            isFixed: false,
            notes: [],
            row: 0,
            col: 0,
            block: 0,
          }))
      );

    this.solveSudoko(grid);
    return grid;
  }

  private solveSudoko(grid: Cell[][]): boolean {
    const emptyCell = this.findEmptyCell(grid);
    if (!emptyCell) return true;

    const [row, col] = emptyCell;
    const numbers = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    for (const num of numbers) {
      if (this.isValid(grid, row, col, num)) {
        grid[row][col].value = num;
        grid[row][col].row = row;
        grid[row][col].col = col;
        grid[row][col].block = Math.floor(row / 3) * 3 + Math.floor(col / 3);

        if (this.solveSudoko(grid)) {
          return true;
        }

        grid[row][col].value = null;
      }
    }
    return false;
  }

  private findEmptyCell(grid: Cell[][]): [number, number] | null {
    for (let row = 0; row < this.GRID_SIZE; row++) {
      for (let col = 0; row < this.GRID_SIZE; col++) {
        if (grid[row][col].value === null) {
          return [row, col];
        }
      }
    }
    return null;
  }

  private isValid(
    grid: Cell[][],
    row: number,
    col: number,
    num: number
  ): boolean {
    //Checking Row
    for (let x = 0; x < this.GRID_SIZE; x++) {
      if (grid[row][x].value === num) return false;
    }

    //Checking Col
    for (let x = 0; x < this.GRID_SIZE; x++) {
      if (grid[col][x].value === num) return false;
    }

    //Checking 3x3 boxes

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRow + i][boxCol + j].value === num) return false;
      }
    }
    return true;
  }

  private removeNumbers(grid: Cell[][], difficulty: number): Cell[][] {
    const puzzleGrid = JSON.parse(JSON.stringify(grid));
    const cellsToRemove = Math.floor(
      this.GRID_SIZE * this.GRID_SIZE * difficulty
    );

    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * this.GRID_SIZE);

      const col = Math.floor(Math.random() * this.GRID_SIZE);
      if (puzzleGrid[row][col].value != null) {
        puzzleGrid[row][col].value = null;
        puzzleGrid[row][col].isFixed = false;
        removed++;
      }
    }
    return puzzleGrid;
  }

  private shuffle(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
