export interface Cell {
  value: number | null;
  isFixed: boolean;
  notes: number[];
  row: number;
  col: number;
  block: number;
}
