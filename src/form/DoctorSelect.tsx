import React, { useEffect, useState } from 'react';
import { Control, useFormState } from 'react-hook-form';

interface Doctor {
  id: number;
  name: string;
  surname: string;
  experience: number;
  isPediatrician: boolean;
  specialityId: number;
  city: string;
  speciality: string;
  cityId: number;
}

interface DoctorSelectProps {
  control: Control<any>;
  birthYear: number;
  IdSpecialty: number;
  IdCity: number;
  onDoctorInfoChange: (doctorInfo: { specialityId: number; cityId: number }) => void;
}

const DoctorSelect: React.FC<DoctorSelectProps> = ({ control,
  birthYear,
  IdSpecialty,
  IdCity,
  onDoctorInfoChange
}) => {
  const { errors } = useFormState({ control });
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.log('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const isAdultBirthday = (birthday: Date): boolean => {
    const today = new Date();
    const adultAge = 16;
    const adultDate = new Date(today.getFullYear() - adultAge, today.getMonth(), today.getDate());
    return birthday <= adultDate;
  };
  
  const birthDate = new Date(birthYear, 0, 1);
  const isAdult = isAdultBirthday(birthDate);

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const selectedDoctor = doctors.find((doctor) => Number(doctor.id) === Number(value));
    if (selectedDoctor) {
      const doctorInfo = {
        specialityId: selectedDoctor.specialityId,
        cityId: selectedDoctor.cityId,
      };
      console.log(doctorInfo)
      onDoctorInfoChange(doctorInfo);
    }
  };

  return (
    <div>
      <select {...control.register('doctor', { required: 'Doctor is a required field!' })} onChange={handleValueChange}>
        <option value="">Select a doctor</option>
        {doctors.map((doctor) => {
          if ((!IdCity || IdCity === doctor.cityId) && (!IdSpecialty || doctor.specialityId === IdSpecialty)) {
            if (!isAdult) {
              if (doctor.isPediatrician) {
                return (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} {doctor.surname}
                  </option>
                );
              }
            } else {
              return (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} {doctor.surname}
                </option>
              );
            }
          }
          return null;
        })}
      </select>
      {errors.doctor && <div>{errors.doctor.message as string}</div>}
    </div>
  );
};

export default DoctorSelect;