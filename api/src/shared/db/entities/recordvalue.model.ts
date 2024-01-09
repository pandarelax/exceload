import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Record } from './record.model';
import { Field } from './field.model';

@Table({
  tableName: 'record-values',
  timestamps: true,
  paranoid: true,
  version: true,
})
export class RecordValue extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Record)
  @Column({
    allowNull: false,
  })
  recordId: string;

  @BelongsTo(() => Record, {
    constraints: false,
  })
  record: Record;

  @ForeignKey(() => Field)
  @Column({
    allowNull: false,
  })
  fieldId: string;

  @BelongsTo(() => Field, {
    constraints: false,
  })
  field: Field;

  @Column({
    type: DataType.STRING(200),
  })
  value: string;

  @Column({
    allowNull: false,
  })
  createdAt: Date;

  @Column
  updatedAt?: Date;
}
