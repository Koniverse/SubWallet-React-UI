import OriginSelectModal from './SelectModal';

export type { SelectModalProps } from './SelectModal';

type SelectModalType = typeof OriginSelectModal;

const SelectModal = OriginSelectModal as SelectModalType;

export default SelectModal;
