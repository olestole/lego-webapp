// @flow

import type { Node } from 'react';

type Item = {
  key: string,
  value: Node,
};

type Props = {
  items: Array<?Item>,
  className?: string,
};

/**
 * Renders a list of key/value info pairs, e.g.:
 * Location <strong>Oslo</strong>
 * Time <strong>Yesterday</strong>
 */
function InfoList({ items, className }: Props) {
  return (
    <table className={className}>
      {items.filter(Boolean).map(({ key, value }) => (
        <tr key={key}>
          <td>
            <span style={{ marginRight: 5 }}>{key}</span>
          </td>
          <td>
            <strong>{value}</strong>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default InfoList;
