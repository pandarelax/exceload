import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Grid } from './grid.entity';

@Table({
  tableName: 'records',
  timestamps: true,
  paranoid: true,
  version: true,
})
export class Record extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Grid)
  @Column({
    allowNull: false,
  })
  gridId: string;

  @BelongsTo(() => Grid, {
    constraints: false,
  })
  grid: Grid;

  @Column({
    allowNull: false,
  })
  createdAt: Date;

  @Column
  updatedAt?: Date;
}
