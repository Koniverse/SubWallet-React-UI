import * as React from 'react';
import type { UploadProps } from './interface';
import Upload from './Upload';

export type SingleFileDraggerProps = Omit<UploadProps, 'type' | 'multiple'>;

const SingleFileDragger = React.forwardRef<unknown, SingleFileDraggerProps>(
  ({ ...restProps }, ref) => (
    <Upload ref={ref} {...restProps} type="single-file-drag" multiple={false} maxCount={1} />
  ),
);

if (process.env.NODE_ENV !== 'production') {
  SingleFileDragger.displayName = 'SingleFileDragger';
}

export default SingleFileDragger;
