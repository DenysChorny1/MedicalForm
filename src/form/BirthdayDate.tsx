import React from 'react';
import { Control, useFormState } from 'react-hook-form';

interface BirthdayDateProps {
  control: Control<any>;
  onBirthYearChange: (year: number) => void;
}

const BirthdayDate: React.FC<BirthdayDateProps> = ({ control, onBirthYearChange }) => {
    const { errors } = useFormState({ control });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const year = parseInt(inputValue.slice(0, 4));
    onBirthYearChange(year);
  };

  return (
    <div>
      <input
        type='date'
        placeholder='Birthday (dd/mm/yyyy)'
        {...control.register('birthday', {
          required: 'Birthday is a required field!',
          pattern: {
            value: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/,
            message: 'Please enter a valid birthday in the format dd/mm/yyyy!',
          },
        })}
        onChange={handleDateChange}
      />
      {errors.birthday && <div>{errors.birthday.message as string}</div>}
    </div>
  );
};
export default BirthdayDate;