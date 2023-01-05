import Dragger from './Dragger';
import SingleFileDragger from './SingleFileDragger';
import type { UploadProps } from './Upload';
import InternalUpload, { LIST_IGNORE } from './Upload';

export type { DraggerProps } from './Dragger';
export type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadListProps,
  UploadProps,
} from './interface';

type InternalUploadType = typeof InternalUpload;
type CompoundedComponent<T = any> = InternalUploadType & {
  <U extends T>(
    props: React.PropsWithChildren<UploadProps<U>> & React.RefAttributes<any>,
  ): React.ReactElement;
  Dragger: typeof Dragger;
  SingleFileDragger: typeof SingleFileDragger;
  LIST_IGNORE: string;
};

const Upload = InternalUpload as CompoundedComponent;
Upload.Dragger = Dragger;
Upload.SingleFileDragger = SingleFileDragger;
Upload.LIST_IGNORE = LIST_IGNORE;

export default Upload;
