import React from 'react';
import { Control, useFormState } from 'react-hook-form';

interface EmailInputProps {
  control: Control<any>;
}

const EmailInput: React.FC<EmailInputProps> = ({ control }) => {
  const { errors } = useFormState({ control });

  return (
    <div>
      <input
        type='email'
        placeholder='Email'
        {...control.register('email', {
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Please enter a valid email!',
          },
        })}
      />
    </div>
  );
};

export default EmailInput;