import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Grid } from './grid.entity';

@Table({
  tableName: 'fields',
  timestamps: true,
  paranoid: true,
  version: true,
})
export class Field extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Grid)
  @Column({
    allowNull: true,
  })
  gridId: string;

  @BelongsTo(() => Grid, {
    constraints: false,
  })
  grid: Grid;

  @Column({
    allowNull: false,
  })
  isPrimary: boolean;

  @Column({
    allowNull: false,
  })
  isUnique: boolean;

  @Column
  order: number;
}
