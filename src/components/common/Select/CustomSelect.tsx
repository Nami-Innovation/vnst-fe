import React from 'react';
import Select, {
  ClassNamesConfig,
  DropdownIndicatorProps,
  GroupBase,
  components,
} from 'react-select';
import ChevronBottomTriangle from '../Icons/ChevronBottomTriangle';
export interface TOptions {
  readonly value: string;
  readonly label: string;
  readonly [x: string]: any;
}

type TProps = {
  defaultValue: TOptions;
  isMulti: boolean;
  options: readonly (TOptions | GroupBase<TOptions>)[];
  className: ClassNamesConfig<TOptions, boolean, GroupBase<TOptions>>;
  value: TOptions;
  onChange: (newValue: any, actionMeta: any) => void;
};

const DropdownIndicator = (
  props: DropdownIndicatorProps<TOptions, TProps['isMulti']>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronBottomTriangle fill='#0B9F9F' />
    </components.DropdownIndicator>
  );
};

const CustomSelect = (props: TProps) => (
  <Select
    closeMenuOnSelect={true}
    components={{ DropdownIndicator }}
    defaultValue={props.defaultValue}
    isMulti={props.isMulti}
    options={props.options}
    onChange={props.onChange}
    classNames={props.className}
    value={props.value}
  />
);

export default CustomSelect;
