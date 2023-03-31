import * as React from 'react';
import type { UploadProps } from './interface';
import Upload from './Upload';
import type { TooltipPlacement } from '../tooltip';
import Tooltip from '../tooltip';

export interface SingleFileDraggerProps extends Omit<UploadProps, 'type' | 'multiple'> {
  statusHelp?: string;
  tooltip?: string;
  tooltipPlacement?: TooltipPlacement;
}

const SingleFileDragger = React.forwardRef<unknown, SingleFileDraggerProps>(
  ({ statusHelp, tooltip, tooltipPlacement = 'topLeft', ...restProps }, ref) => (
    <Tooltip trigger='hover' title={statusHelp || tooltip} placement={tooltipPlacement}>
      <Upload ref={ref} {...restProps} type="single-file-drag" multiple={false} maxCount={1} />
    </Tooltip>
  ),
);

if (process.env.NODE_ENV !== 'production') {
  SingleFileDragger.displayName = 'SingleFileDragger';
}

export default SingleFileDragger;
