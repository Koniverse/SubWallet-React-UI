import OriginSelectModal from './SelectModal';

export type {
  SelectModalProps,
  SelectModalItem,
  SelectModalRenderItemFunc,
  SelectModalRenderSelectedFunc,
} from './SelectModal';

type SelectModalType = typeof OriginSelectModal;

const SelectModal = OriginSelectModal as SelectModalType;

export default SelectModal;
