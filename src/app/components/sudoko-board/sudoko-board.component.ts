import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/app/Models/cell.model';
import { SudokoService } from 'src/app/Services/sudoko.service';

@Component({
  selector: 'app-sudoko-board',
  templateUrl: './sudoko-board.component.html',
  styleUrls: ['./sudoko-board.component.css'],
})
export class SudokoBoardComponent implements OnInit {
  grid: Cell[][] = [];
  selectedCell: Cell | null = null;

  constructor(private sudokoService: SudokoService) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame() {
    this.grid = this.sudokoService.generateNewGame(0.5);
  }

  onCellClick(cell: Cell) {
    if (!cell.isFixed) {
      this.selectedCell = cell;
    }
  }

  onNumberInput(number: number) {
    if (this.selectedCell && !this.selectedCell.isFixed) {
      this.selectedCell.value = number;
    }
  }
}
