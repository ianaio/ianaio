/**
 * Copyright (c) Ianaio, Inc. and its affiliates.
 *
 * This source code is licensed under the Ianaio license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ComponentProps} from 'react';

export function ButtonExample(props: ComponentProps<'button'>): JSX.Element {
  return (
    <button
      type="button"
      {...props}
      style={{
        backgroundColor: 'white',
        color: 'black',
        border: 'solid red',
        borderRadius: 20,
        padding: 10,
        cursor: 'pointer',
        ...props.style,
      }}
    />
  );
}
