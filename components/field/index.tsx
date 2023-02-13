import OriginField from './Field';

export type { FieldProps } from './Field';

type FieldType = typeof OriginField;

const Field = OriginField as FieldType;

export default Field;
