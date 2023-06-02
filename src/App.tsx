import React, {useState} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IMedicField } from './app.types';
import NameInput from './form/NameInput';
import EmailInput from './form/EmailInput';
import CitySelect from './form/CitySelect';
import BirthdayDate from './form/BirthdayDate';
import SexSelector from './form/SexSelector';
import DoctorSpecialty from './form/DoctorSpecialty';
import DoctorSelect from './form/DoctorSelect';
import './app.css';


const App: React.FC = () => {
  const { handleSubmit, control, reset, setValue } = useForm<IMedicField>({
    mode: 'onChange',
  });
  const [isRegistered, setisRegistered] = useState<boolean>(false)
  const [birthYear, setBirthYear] = useState<number>(0);
  const handleBirthYearChange = (year: number) => {
    setBirthYear(year);
  };

  const [gender, setGender] = useState<string>('');
  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const [IdSpecialty, setIdSpecialty] = useState<number>(0);
  const handleIdSpecialtyChange = (id: number) => {
    setIdSpecialty(id);
  };
  const onSelectSpecialty = (value: string) => {
    setValue('specialty', value)
  }

  const [IdCity, setIdCity] = useState<number>(0);
  const handleCityChange = (id: number) => {
    setIdCity(id);
  };
  const onSelectCity = (value: string) => {
    setValue('city', value)
  }

  const [doctorInfo, setDoctorInfo] = useState<{ specialityId: number; cityId: number }>({ specialityId: 0, cityId: 0 });
  const handleDoctorInfoChange = (doctorInfo: { specialityId: number; cityId: number }) => {
    setDoctorInfo(doctorInfo);
    
  };

  const clearDefaultValues = () => {
    reset();
    setBirthYear(0);
    setGender('');
    setIdSpecialty(0);
    setIdCity(0);
    setDoctorInfo({ specialityId: 0, cityId: 0 });
  };

  const onSubmit: SubmitHandler<IMedicField> = (data) => {
    setisRegistered(true)
    console.log(data);
    alert(`${data.name}, ${data.birthday}, ${data.sex}, ${data.city}, ${data.specialty}, 'DoctorId:'${data.doctor}`)
    clearDefaultValues();
  };

  return (
    <div className='App'>
      <h1>Medical form</h1>
      <form onSubmit={handleSubmit(onSubmit)} onClick={() => setisRegistered(false)}>
        <NameInput control={control}/>
        <BirthdayDate control={control} onBirthYearChange={handleBirthYearChange}/>
        <SexSelector control={control} onValueChange={handleGenderChange}/>
        <CitySelect control={control} onSelect={onSelectCity} cityDoctorId={doctorInfo.cityId} onCityChange={handleCityChange} />
        <DoctorSpecialty control={control} onSelect={onSelectSpecialty} specialityDoctorId={doctorInfo.specialityId} gender={gender} onIdSpecialtyChange={handleIdSpecialtyChange}/>
        <DoctorSelect control={control} birthYear={birthYear} IdSpecialty={IdSpecialty} IdCity={IdCity}
          onDoctorInfoChange={handleDoctorInfoChange}/>
        <EmailInput control={control} />
        <button type='submit'>SEND</button>
        {isRegistered ? <span className='completed'>Registered</span> : ""}
      </form>
    </div>
  );
};

export default App;