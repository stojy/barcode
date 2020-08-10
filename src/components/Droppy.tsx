import React from 'react';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/esm/Dropdown';

declare type SelectCallback = (value: string | null) => void;

interface IDroppyProps {
  title: string,
  values: string[],
  onSelect: SelectCallback
}

export function Droppy({ title, values, onSelect }: IDroppyProps) {
  return (
    <DropdownButton className='mr-2'id="dropdown-basic-button" title={title}>
      {
        values.map(value => <Dropdown.Item key={`${value}`} eventKey={`${value}`} onSelect={(e) => onSelect(e)}>{value}</Dropdown.Item>)
      }
    </DropdownButton>
  );
}
