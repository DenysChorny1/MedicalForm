import React, { useEffect, useState } from 'react';
import { Control, useFormState } from 'react-hook-form';

interface DoctorSpecialtyProps {
  control: Control<any>;
  gender: string;
  specialityDoctorId: number;
  onIdSpecialtyChange: (id: number) => void;
  onSelect?: (value: string) => void;
}

interface Specialty {
  id: number;
  name: string;
  params?: {
    gender: string;
  };
}

const DoctorSpecialty: React.FC<DoctorSpecialtyProps> = ({
  control,
  gender,
  specialityDoctorId,
  onIdSpecialtyChange,
  onSelect
}) => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [defaultValue, setDefaultValue] = useState<string | undefined>(undefined);
  const { errors } = useFormState({ control });

  useEffect(()=>{
    
  },[])
  const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedSpecialty = specialties.find((specialty) => specialty.name === selectedValue);
    
    if (selectedSpecialty) {
      onIdSpecialtyChange(selectedSpecialty.id);
    }
  };


  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca');
        const data = await response.json();
        const defaultOption = { id: 0, name: 'Select Specialty' };
        setSpecialties([defaultOption, ...data]);
        if (specialityDoctorId) {
          const selectedSpecialty = data.find((cityItem: any) => cityItem.id === specialityDoctorId);
          if (onSelect) {
            onSelect(selectedSpecialty.name);
          }
          if (selectedSpecialty) {
            setDefaultValue(selectedSpecialty.name);
          }
        }
      } catch (error) {
        console.log('Error fetching specialties:', error);
      }
    };

    fetchSpecialties();
    if(specialityDoctorId === 0){
        setDefaultValue('')
      }
  }, [specialityDoctorId]);

  const filteredSpecialties = specialties.filter(
    (specialty) =>
      !specialty.params || !specialty.params.gender || specialty.params.gender === gender || gender === ''
  );

  const handleSelectClick = () => {
    setDefaultValue(undefined);
  };

  return (
    <div>
      <select {...control.register('specialty', { required: false })} 
        value={defaultValue}
        onChange={handleIdChange} onClick={handleSelectClick}>
        {filteredSpecialties.map((specialty) => (
          <option key={specialty.id} value={specialty.name}>
            {specialty.name}
          </option>
        ))}
      </select>
      {errors.specialty && <div>{errors.specialty.message as string}</div>}
    </div>
  );
};

export default DoctorSpecialty;