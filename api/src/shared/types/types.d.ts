import { Field } from '../db/entities/field.model';
import { Grid } from '../db/entities/grid.model';
import { Record } from '../db/entities/record.model';
import { RecordValue } from '../db/entities/recordvalue.model';

export interface ITableResponse {
  name: string;
  fields: Field[];
  grid: Grid;
  records: Record[];
  recordValues: RecordValue[];
}
