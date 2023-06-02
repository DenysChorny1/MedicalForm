import React from 'react';
import { Control, useFormState, useController } from 'react-hook-form';

interface SexSelectorProps {
  control: Control<any>;
  onValueChange: (value: string) => void;
}

const SexSelector: React.FC<SexSelectorProps> = ({ control, onValueChange }) => {
    const { errors } = useFormState({ control });

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onValueChange(value);
  };

  return (
    <div>
    <select {...control.register('sex', { required: 'Sex is a required field!' })} onChange={handleValueChange}>
      <option value=''>Select Sex</option>
      <option value='Male'>Male</option>
      <option value='Female'>Female</option>
    </select>
    {errors.sex && <div>{errors.sex.message as string}</div>}
  </div>
  );
};

export default SexSelector;