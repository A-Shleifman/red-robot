import { Orientation } from 'entities/Robot';

export type UUID = string;

export interface Position {
  x: number;
  y: number;
  position: Orientation;
}
