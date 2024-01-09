import { Column, Table, Model, HasMany } from 'sequelize-typescript';
import { Field } from './field.model';

@Table({
  tableName: 'grids',
  timestamps: true,
  paranoid: true,
  version: true,
})
export class Grid extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  order: number;

  @HasMany(() => Field, {
    constraints: false,
  })
  fields: Field[];
}
