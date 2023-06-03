import React, { useEffect, useState } from 'react';
import { Control, useFormState } from 'react-hook-form';

interface City {
  id: number;
  name: string;
}

interface CitySelectProps {
  control: Control<any>;
  cityDoctorId?: number;
  onCityChange: (value: number) => void;
  onSelect?: (value: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ control, cityDoctorId, onCityChange, onSelect }) => {
  const { errors } = useFormState({ control });
  const [cityOptions, setCityOptions] = useState<City[]>([]);
  const [defaultValue, setDefaultValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4');
        const data = await response.json();
        const defaultOption = { id: 0, name: 'Select city' };
        setCityOptions([defaultOption, ...data]);
        if (cityDoctorId) {
          const selectedCity = data.find((cityItem: any) => cityItem.id === cityDoctorId);
          if (onSelect) {
            onSelect(selectedCity.name);
          }
          if (selectedCity) {
            setDefaultValue(selectedCity.name);
          }
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();

    if (cityDoctorId === 0) {
      setDefaultValue('');
    }
  }, [cityDoctorId]);

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedCity = cityOptions.find((cityItem) => cityItem.name === selectedValue);
    if (selectedCity) {
      onCityChange(selectedCity.id);
    }
  };

  const handleSelectClick = () => {
    setDefaultValue(undefined);
  };

  return (
    <>
      <select
        {...control.register('city', {
          required: true,
          validate: (value) => value !== 'Select city' || 'City is required!',
        })}
        value={defaultValue}
        defaultValue={defaultValue}
        onChange={handleValueChange}
        onClick={handleSelectClick}
      >
        {cityOptions.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {errors.city && <div>{errors.city.message as string}</div>}
    </>
  );
};

export default CitySelect;