import React from 'react';
import { Control, useFormState } from 'react-hook-form';

interface NameInputProps {
  control: Control<any>;
}

const NameInput: React.FC<NameInputProps> = ({ control }) => {
    const { errors } = useFormState({ control });

  return (
    <div>
      <input
        type='text'
        placeholder='Name'
        {...control.register('name', {
          required: 'Name is a required field!',
          pattern: {
            value: /^[^\d]+$/,
            message: 'Name should not contain numbers!',
          },
        })}
      />
      {errors.name && <div>{errors.name.message as string}</div>}
    </div>
  );
};

export default NameInput;