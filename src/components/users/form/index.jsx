// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   Box,
//   TextField,
//   FormControl,
//   Typography,
//   Button,
//   ButtonGroup,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
// } from '@mui/material';
// import { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';
// import { prefixer } from 'stylis';
// import rtlPlugin from 'stylis-plugin-rtl';
// import { styled } from '@mui/material/styles';
// import DatePicker from 'react-multi-date-picker';
// import persian from 'react-date-object/calendars/persian';
// import persian_fa from 'react-date-object/locales/persian_fa';
// import 'react-multi-date-picker/styles/colors/purple.css';
// import fa from './fa';
// import dynamic from 'next/dynamic';
// import Label from '../../ui/label/index';
// import { Controller, useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import useCreateUser from '@/src/hooks/useCreateUser';
// import { useThemeContext } from '@/src/lib/ThemeContext';

// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';

// const animatedComponents = makeAnimated()


// const JoditEditor = dynamic(
//   () => import('jodit-react'),
//   {
//     ssr: false,
//     loading: () => <Typography sx={{ fontFamily: 'gandom' }}>در حال بارگیری ویرایشگر...</Typography>,
//   }
// );

// const rtlCache = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin],
// });

// const CssTextField = styled(TextField)(({ theme }) => ({
//   '& .MuiInputLabel-outlined': {
//     transform: 'translate(14px, 16px) scale(1)',
//     fontSize: '0.9rem',
//     fontFamily: 'gandom',
//     color: theme.palette.text.secondary,
//   },
//   '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
//     transform: 'translate(0px, -6px) scale(0.65)',
//     margin: '0 15px',
//     color: theme.palette.secondary.main,
//   },
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: theme.palette.divider,
//   },
//   '& .MuiOutlinedInput-root': {
//     fontFamily: 'Vazirmatn, sans-serif',
//     fontSize: '0.9rem',
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: '8px',
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: theme.palette.secondary.main,
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: theme.palette.secondary.main,
//     },
//   },
//   '& .MuiInputBase-input': {
//     fontFamily: 'gandom',
//   },
// }));

// const CssTextFieldNationalcode = styled(TextField)(({ theme }) => ({
//   '& .MuiInputLabel-outlined': {
//     transform: 'translate(14px, 16px) scale(1)',
//     fontSize: '0.9rem',
//     fontFamily: 'gandom',
//     color: theme.palette.text.secondary,
//   },
//   '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
//     transform: 'translate(0px, -6px) scale(0.65)',
//     margin: '0 15px',
//     color: theme.palette.secondary.main,
//   },
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: theme.palette.divider,
//   },
//   '& .MuiOutlinedInput-root': {
//     fontFamily: 'Vazirmatn, sans-serif',
//     fontSize: '0.9rem',
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: '8px 0 0 8px',
//     margin: '0',
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: theme.palette.secondary.main,
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: theme.palette.secondary.main,
//     },
//   },
//   '& .MuiInputBase-input': {
//     fontFamily: 'gandom',
//   },
// }));

// const validationSchema = yup.object().shape({
//   first__name: yup
//     .string()
//     .required('نام اجباری است')
//     .matches(/^[\u0600-\u06FF\s]+$/, 'نام باید تنها شامل حروف فارسی باشد'),
//   last__name: yup
//     .string()
//     .required('نام خانوادگی اجباری است')
//     .matches(/^[\u0600-\u06FF\s]+$/, 'نام خانوادگی باید تنها شامل حروف فارسی باشد'),
//   Province: yup.object().required("استان اجباری است"),
//   postal_code: yup
//     .string()
//     .required('کد پستی اجباری است')
//     .matches(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
//   resume: yup.string().required('رزومه اجباری است'),
//   date: yup.string().required('تاریخ اجباری است'),
//   idType: yup.string().oneOf(['national', 'economic']).required(),
//   idNumber: yup
//     .string()
//     .when('idType', {
//       is: 'national',
//       then: (schema) =>
//         schema.required('کد ملی الزامی است').matches(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد'),
//     })
//     .when('idType', {
//       is: 'economic',
//       then: (schema) =>
//         schema
//           .required('شناسه اقتصادی الزامی است')
//           .matches(/^\d{12}$/, 'شناسه اقتصادی باید ۱۲ رقم باشد'),
//     }),
//   full_time_job: yup.boolean(),
//   part_time_job: yup.boolean(),
//   checkboxes: yup.mixed().test(
//     'atLeastOne',
//     'حداقل یکی از موارد باید انتخاب شود',
//     function (value) {
//       const { part_time_job, full_time_job } = this.parent;
//       return part_time_job || full_time_job;
//     }
//   ),
// });

// const Form = () => {
//   const { theme } = useThemeContext();
//   const isDark = theme === 'dark';
//   const [selectedOption, setselectedOption] = useState(null)

//   const options1 = [
//     { value: 'tehran', label: 'تهران' },
//     { value: 'alborz', label: 'البرز' },
//     { value: 'mazandaran', label: 'مازندران' },
//   ];

//   const { control, reset, handleSubmit, setValue, getValues, watch, clearErrors, formState: { errors } } = useForm({
//     defaultValues: {
//       first__name: '',
//       last__name: '',
//       Province: null,
//       postal_code: '',
//       full_time_job: false,
//       part_time_job: false,
//       resume: '',
//       date: undefined,
//       idType: 'national',
//       idNumber: '',
//     },
//     resolver: yupResolver(validationSchema),
//   });

//   const { mutate, isLoading: isCreating, isError: isCreateError, error: createError } = useCreateUser();

//   const onSubmit = (formData) => {
//     mutate(formData, {
//       onSuccess: () => {
//         reset();
//       },
//       onError: (error) => {
//         console.error('Failed to create user:', error);
//       },
//     });
//   };

//   const selectedType = watch('idType');

//   const handleTypeChange = (type) => {
//     setValue('idType', type);
//     setValue('idNumber', '');
//   };

//   const full_time_jobValue = watch('full_time_job');
//   const part_time_jobValue = watch('part_time_job');

//   useEffect(() => {
//     if (full_time_jobValue || part_time_jobValue) {
//       clearErrors('checkboxes');
//     }
//   }, [full_time_jobValue, part_time_jobValue, clearErrors]);

//   const firstconfig = useMemo(
//     () => ({
//       language: 'fa',
//       i18n: { fa },
//       readonly: false,
//       theme: isDark ? 'dark' : 'default',
//       placeholder: 'رزومه خود را وارد کنید',
//       style: { fontFamily: 'gandom' },
//     }),
//     [isDark]
//   );

//   return (
//     <CacheProvider value={rtlCache}>
//       <Typography
//         color="primary"
//         variant="h5"
//         sx={{ textAlign: 'left', fontFamily: 'kharazmi' }}
//       >
//         اطلاعات کاربر
//       </Typography>

//       <form style={{ direction: 'rtl' }} onSubmit={handleSubmit(onSubmit)}>
//         <FormControl fullWidth>
//           <Label labelText="نام" />
//           <Controller
//             control={control}
//             name="first__name"
//             render={({ field }) => (
//               <CssTextField
//                 {...field}
//                 margin="none"
//                 label="لطفا نام خود را وارد کنید"
//                 id="custom-css-outlined-input"
//               />
//             )}
//           />
//           <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
//             {errors.first__name?.message}
//           </Typography>
//         </FormControl>

//         <FormControl fullWidth>
//           <Label labelText="نام خانوادگی" />
//           <Controller
//             control={control}
//             name="last__name"
//             render={({ field }) => (
//               <CssTextField
//                 {...field}
//                 margin="none"
//                 label="لطفا نام خانوادگی خود را وارد کنید"
//                 id="custom-css-outlined-input"
//               />
//             )}
//           />
//           <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
//             {errors.last__name?.message}
//           </Typography>
//         </FormControl>

//         <FormControl>
//           <Label labelText="استان" />
//           <Controller
//             control={control}
//             name='Province'
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 components={animatedComponents}
//                 placeholder='لطفا استان را انتخاب کنید'
//                 options={options1}
//                 theme={(theme) => ({
//                   ...theme,
//                   colors: {
//                     ...theme.colors,
//                     neutral0: isDark ? '#2d2d2d' : theme.colors.neutral0, // پس‌زمینه اصلی
//                     neutral80: isDark ? '#fff' : theme.colors.neutral80, // رنگ متن اصلی
//                     neutral50: isDark ? '#ccc' : theme.colors.neutral50, // رنگ placeholder
//                     primary25: isDark ? '#404040' : theme.colors.primary25, // رنگ هایلایت هاور
//                     neutral30: isDark ? '#666' : '#fff', // رنگ حاشیه
//                   },
//                 })}
//                 styles={{control: (base) => ({
//                   ...base,
//                   backgroundColor: theme.palette.background.paper, // پس‌زمینه مشابه CssTextField
//                   borderColor: theme.palette.divider, // رنگ حاشیه عادی
//                   borderRadius: '8px', // گوشه‌های گرد
//                   fontFamily: 'Vazirmatn, sans-serif', // فونت مشابه
//                   fontSize: '0.9rem', // اندازه فونت
//                   '&:hover': {
//                     borderColor: theme.palette.secondary.main, // رنگ حاشیه در هاور
//                   },
//                   boxShadow: 'none', // حذف سایه پیش‌فرض
//                   '&:focus': {
//                     borderColor: theme.palette.secondary.main, // رنگ حاشیه در فوکوس
//                   },
//                 }),
//                 // استایل منوی گزینه‌ها
//                 menu: (base) => ({
//                   ...base,
//                   backgroundColor: theme.palette.background.paper, // پس‌زمینه منو
//                   zIndex: 9999, // z-index بالا برای قرارگیری بالای المنت‌ها
//                   borderRadius: '8px', // گوشه‌های گرد
//                 }),
//                 // استایل گزینه‌ها در منو
//                 option: (base, state) => ({
//                   ...base,
//                   backgroundColor: state.isSelected
//                     ? theme.palette.secondary.main // رنگ گزینه انتخاب‌شده
//                     : theme.palette.background.paper, // رنگ پیش‌فرض
//                   color: state.isSelected
//                     ? theme.palette.secondary.contrastText // رنگ متن گزینه انتخاب‌شده
//                     : theme.palette.text.primary, // رنگ متن عادی
//                   fontFamily: 'gandom', // فونت مشابه
//                   '&:hover': {
//                     backgroundColor: theme.palette.action.hover, // رنگ هاور
//                   },
//                 }),
//                 // استایل متن انتخاب‌شده
//                 singleValue: (base) => ({
//                   ...base,
//                   color: theme.palette.text.primary, // رنگ متن
//                   fontFamily: 'Vazirmatn, sans-serif', // فونت
//                 }),
//                 // استایل placeholder
//                 placeholder: (base) => ({
//                   ...base,
//                   color: theme.palette.text.secondary, // رنگ مشابه لیبل عادی
//                   fontFamily: 'gandom', // فونت
//                   fontSize: '0.9rem', // اندازه فونت
//                 }),
//                 // استایل ورودی هنگام تایپ
//                 input: (base) => ({
//                   ...base,
//                   color: theme.palette.text.primary, // رنگ متن
//                   fontFamily: 'Vazirmatn, sans-serif', // فونت
//                 }),}}
//               />
//             )}
//           />
//           <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
//             {errors.Province?.message}
//           </Typography>
//         </FormControl>


//         <FormControl fullWidth>
//           <Label labelText="کد پستی" />
//           <Controller
//             control={control}
//             name="postal_code"
//             render={({ field }) => (
//               <CssTextField
//                 {...field}
//                 margin="none"
//                 label="کد پستی خود را وارد کنید"
//                 id="postal-code-input"
//                 inputProps={{ maxLength: 10 }}
//                 error={!!errors.postal_code}
//                 onInput={(e) => {
//                   e.target.value = e.target.value.replace(/[^0-9]/g, '');
//                 }}
//               />
//             )}
//           />
//           <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
//             {errors.postal_code?.message}
//           </Typography>
//         </FormControl>

//         <FormControl fullWidth sx={{ mb: 3 }}>
//           <Label labelText="کد ملی یا شناسه اقتصادی" />
//           <Controller
//             control={control}
//             name="idNumber"
//             render={({ field }) => (
//               <Box sx={{ display: 'flex' }}>
//                 <CssTextFieldNationalcode
//                   {...field}
//                   fullWidth
//                   margin="none"
//                   label={
//                     selectedType === 'national'
//                       ? 'کد ملی (۱۰ رقم)'
//                       : 'شناسه اقتصادی (۱۲ رقم)'
//                   }
//                   type="text"
//                   inputProps={{
//                     maxLength: selectedType === 'national' ? 10 : 12,
//                     dir: 'rtl',
//                     inputMode: 'numeric',
//                     pattern: '[0-9]*',
//                   }}
//                   error={!!errors.idNumber}
//                   onInput={(e) => {
//                     e.target.value = e.target.value.replace(/[^0-9]/g, '');
//                   }}
//                 />
//                 <ButtonGroup color="secondary" variant="outlined">
//                   <Button
//                     onClick={() => handleTypeChange('national')}
//                     variant={selectedType === 'national' ? 'contained' : 'outlined'}
//                     sx={{
//                       borderTopLeftRadius: 0,
//                       borderBottomLeftRadius: 0,
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     حقیقی
//                   </Button>
//                   <Button
//                     onClick={() => handleTypeChange('economic')}
//                     variant={selectedType === 'economic' ? 'contained' : 'outlined'}
//                     sx={{ whiteSpace: 'nowrap' }}
//                   >
//                     حقوقی
//                   </Button>
//                 </ButtonGroup>
//               </Box>
//             )}
//           />
//           <Typography
//             color="error"
//             sx={{
//               minHeight: '24px',
//               fontFamily: 'gandom',
//               mt: 1,
//             }}
//           >
//             {errors.idNumber?.message}
//           </Typography>
//         </FormControl>

//         <FormControl fullWidth component="fieldset">
//           <Label labelText="نوع همکاری:" />
//           <FormGroup row sx={{ gap: 3 }}>
//             <FormControlLabel
//               control={
//                 <Controller
//                   control={control}
//                   name="full_time_job"
//                   render={({ field }) => (
//                     <Checkbox
//                       {...field}
//                       checked={!!field.value}
//                       onChange={(e) => field.onChange(e.target.checked)}
//                       color="secondary"
//                     />
//                   )}
//                 />
//               }
//               label="تمام وقت"
//             />
//             <FormControlLabel
//               control={
//                 <Controller
//                   control={control}
//                   name="part_time_job"
//                   render={({ field }) => (
//                     <Checkbox
//                       {...field}
//                       checked={!!field.value}
//                       onChange={(e) => field.onChange(e.target.checked)}
//                       color="secondary"
//                     />
//                   )}
//                 />
//               }
//               label="پاره وقت"
//             />
//           </FormGroup>
//           {errors.checkboxes && (
//             <Typography
//               color="error"
//               sx={{
//                 minHeight: '24px',
//                 fontFamily: 'gandom',
//                 mt: 1,
//               }}
//             >
//               {errors.checkboxes.message}
//             </Typography>
//           )}
//         </FormControl>

//         <FormControl fullWidth sx={{ mb: 2 }}>
//           <Label labelText="تاریخ تولد" />
//           <Controller
//             control={control}
//             name="date"
//             render={({ field }) => (
//               <DatePicker
//                 {...field}
//                 calendar={persian}
//                 locale={persian_fa}
//                 calendarPosition="bottom-right"
//                 placeholder="تاریخ تولد خود را وارد کنید"
//                 className="purple"
//                 inputClass={`form-control ${errors.date ? 'is-invalid' : ''}`}
//                 onChange={(date) => field.onChange(date)}
//                 style={{
//                   width: '100%',
//                   fontFamily: 'gandom',
//                   borderRadius: '8px',
//                   backgroundColor: isDark ? '#2d2d2d' : 'rgba(0, 0, 0, 0.05)',
//                   color: isDark ? '#ffffff' : '#000000',
//                   padding: '12.5px 14px',
//                   border: errors.date ? '1px solid #f44336' : '1px solid #e0e0e0',
//                 }}
//               />
//             )}
//           />
//           <Typography
//             color="error"
//             sx={{
//               minHeight: '24px',
//               fontFamily: 'gandom',
//               mt: 1,
//             }}
//           >
//             {errors.date?.message}
//           </Typography>
//         </FormControl>

//         <FormControl fullWidth>
//           <Label labelText="رزومه کامل" />
//           <Controller
//             control={control}
//             name="resume"
//             render={({ field }) => (
//               <JoditEditor
//                 {...field}
//                 config={firstconfig}
//                 value={field.value}
//                 tabIndex={1}
//                 onChange={(newContent) => field.onChange(newContent)}
//               />
//             )}
//           />
//           <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
//             {errors.resume?.message}
//           </Typography>
//         </FormControl>

//         <Button
//           type="submit"
//           variant="contained"
//           color="secondary"
//           sx={{ mt: 3, fontFamily: 'gandom' }}
//         >
//           ثبت اطلاعات
//         </Button>
//       </form>
//     </CacheProvider>
//   );
// };

// export default Form;


import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  TextField,
  FormControl,
  Typography,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { styled, useTheme } from '@mui/material/styles';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import 'react-multi-date-picker/styles/colors/purple.css';
import fa from './fa';
import dynamic from 'next/dynamic';
import Label from '../../ui/label/index';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useCreateUser from '@/src/hooks/useCreateUser';
import { useThemeContext } from '@/src/lib/ThemeContext';
// import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const JoditEditor = dynamic(
  () => import('jodit-react'),
  {
    ssr: false,
    loading: () => <Typography sx={{ fontFamily: 'gandom' }}>در حال بارگیری ویرایشگر...</Typography>,
  }
);

const Select = dynamic(
  () => import('react-select'),
  {
    ssr: false,
    loading: () => <Typography sx={{ fontFamily: 'gandom' }}>در حال بارگیری ویرایشگر...</Typography>,
  }
);

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const CssTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-outlined': {
    transform: 'translate(14px, 16px) scale(1)',
    fontSize: '0.9rem',
    fontFamily: 'gandom',
    color: theme.palette.text.secondary,
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: 'translate(0px, -6px) scale(0.65)',
    margin: '0 15px',
    color: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Vazirmatn, sans-serif',
    fontSize: '0.9rem',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: 'gandom',
  },
}));

const CssTextFieldNationalcode = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-outlined': {
    transform: 'translate(14px, 16px) scale(1)',
    fontSize: '0.9rem',
    fontFamily: 'gandom',
    color: theme.palette.text.secondary,
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: 'translate(0px, -6px) scale(0.65)',
    margin: '0 15px',
    color: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.divider,
  },
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Vazirmatn, sans-serif',
    fontSize: '0.9rem',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px 0 0 8px',
    margin: '0',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: 'gandom',
  },
}));

const validationSchema = yup.object().shape({
  first__name: yup
    .string()
    .required('نام اجباری است')
    .matches(/^[\u060 dzie0-\u06FF\s]+$/, 'نام باید تنها شامل حروف فارسی باشد'),
  last__name: yup
    .string()
    .required('نام خانوادگی اجباری است')
    .matches(/^[\u0600-\u06FF\s]+$/, 'نام خانوادگی باید تنها شامل حروف فارسی باشد'),
  Province: yup.object().required('استان اجباری است'),
  city: yup.object().required("شهر اجباری است"),
  postal_code: yup
    .string()
    .required('کد پستی اجباری است')
    .matches(/^\d{10}$/, 'کد پستی باید ۱۰ رقم باشد'),
  resume: yup.string().required('رزومه اجباری است'),
  date: yup.string().required('تاریخ اجباری است'),
  idType: yup.string().oneOf(['national', 'economic']).required(),
  idNumber: yup
    .string()
    .when('idType', {
      is: 'national',
      then: (schema) =>
        schema.required('کد ملی الزامی است').matches(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد'),
    })
    .when('idType', {
      is: 'economic',
      then: (schema) =>
        schema
          .required('شناسه اقتصادی الزامی است')
          .matches(/^\d{12}$/, 'شناسه اقتصادی باید ۱۲ رقم باشد'),
    }),
  full_time_job: yup.boolean(),
  part_time_job: yup.boolean(),
  checkboxes: yup.mixed().test(
    'atLeastOne',
    'حداقل یکی از موارد باید انتخاب شود',
    function (value) {
      const { part_time_job, full_time_job } = this.parent;
      return part_time_job || full_time_job;
    }
  ),
});

const Form = () => {
  const { theme: themeContext } = useThemeContext();
  const isDark = themeContext === 'dark';
  const theme = useTheme(); // استفاده از useTheme برای دسترسی به theme MUI
  const [selectedOption, setSelectedOption] = useState(null);

  const options1 = [
    { value: 'tehran', label: 'تهران' },
    { value: 'alborz', label: 'البرز' },
    { value: 'mazandaran', label: 'مازندران' },
  ];

  const options2 = {

    mazandaran: [
      { value: 'babol', label: 'بابل' },
      { value: 'sari', label: 'ساری' },
      { value: 'amol', label: 'امل' },
    ], alborz: [
      { value: 'karaj', label: 'کرج' },
      { value: 'meshkindasht', label: 'مشکین دشت' },
      { value: 'hashtgerd', label: 'هشتگرد' },
    ], tehran: [
      { value: 'tehran', label: 'تهران' },
      { value: 'damavand', label: 'دماوند' },
      { value: 'rey', label: 'ری' },
    ],

  }

  const { control, reset, handleSubmit, setValue, getValues, watch, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      first__name: '',
      last__name: '',
      Province: null,
      city: null,
      postal_code: '',
      full_time_job: false,
      part_time_job: false,
      resume: '',
      date: undefined,
      idType: 'national',
      idNumber: '',
    },
    resolver: yupResolver(validationSchema),
  });


  useEffect(() => {

    setSelectedOption(watch('Province'))
    setValue('city', null)

  }, [watch('Province')
  ]);


  const { mutate, isLoading: isCreating, isError: isCreateError, error: createError } = useCreateUser();

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        console.error('Failed to create user:', error);
      },
    });
  };

  const selectedType = watch('idType');

  const handleTypeChange = (type) => {
    setValue('idType', type);
    setValue('idNumber', '');
  };

  const full_time_jobValue = watch('full_time_job');
  const part_time_jobValue = watch('part_time_job');

  useEffect(() => {
    if (full_time_jobValue || part_time_jobValue) {
      clearErrors('checkboxes');
    }
  }, [full_time_jobValue, part_time_jobValue, clearErrors]);

  const firstconfig = useMemo(
    () => ({
      language: 'fa',
      i18n: { fa },
      readonly: false,
      theme: isDark ? 'dark' : 'default',
      placeholder: 'رزومه خود را وارد کنید',
      style: { fontFamily: 'gandom' },
    }),
    [isDark]
  );

  // تعریف استایل‌های react-select به صورت دینامیک با استفاده از useMemo
  const selectStyles = useMemo(
    () => ({
      control: (base) => ({
        ...base,
        backgroundColor: theme.palette?.background?.paper || '#fff', // مقدار پیش‌فرض در صورت undefined بودن
        borderColor: theme.palette?.divider || '#e0e0e0',
        borderRadius: '8px',
        height: '54px',
        fontFamily: 'gandom, sans-serif',
        fontSize: '0.9rem',
        '&:hover': {
          borderColor: theme.palette?.secondary?.main || '#3f51b5',
        },
        boxShadow: 'none',
        '&:focus': {
          borderColor: theme.palette?.secondary?.main || '#3f51b5',
        },
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: theme.palette?.background?.paper || '#fff',
        zIndex: 9999,
        borderRadius: '8px',
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
          ? theme.palette?.secondary?.main || '#3f51b5'
          : theme.palette?.background?.paper || '#fff',
        color: state.isSelected
          ? theme.palette?.secondary?.contrastText || '#fff'
          : theme.palette?.text?.primary || '#000',
        fontFamily: 'gandom',
        '&:hover': {
          backgroundColor: theme.palette?.action?.hover || '#f5f5f5',
        },
      }),
      singleValue: (base) => ({
        ...base,
        color: theme.palette?.text?.primary || '#000',
        fontFamily: 'gandom, sans-serif',
      }),
      placeholder: (base) => ({
        ...base,
        color: theme.palette?.text?.secondary || '#666',
        fontFamily: 'gandom',
        fontSize: '0.9rem',
      }),
      input: (base) => ({
        ...base,
        color: theme.palette?.text?.primary || '#000',
        fontFamily: 'Vazirmatn, sans-serif',
      }),
    }),
    [theme]
  );

  return (
    <CacheProvider value={rtlCache}>
      <Typography
        color="primary"
        variant="h5"
        sx={{ textAlign: 'left', fontFamily: 'kharazmi' }}
      >
        اطلاعات کاربر
      </Typography>

      <form style={{ direction: 'rtl' }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth>
          <Label labelText="نام" />
          <Controller
            control={control}
            name="first__name"
            render={({ field }) => (
              <CssTextField
                {...field}
                margin="none"
                label="لطفا نام خود را وارد کنید"
                id="custom-css-outlined-input"
              />
            )}
          />
          <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
            {errors.first__name?.message}
          </Typography>
        </FormControl>

        <FormControl fullWidth>
          <Label labelText="نام خانوادگی" />
          <Controller
            control={control}
            name="last__name"
            render={({ field }) => (
              <CssTextField
                {...field}
                margin="none"
                label="لطفا نام خانوادگی خود را وارد کنید"
                id="custom-css-outlined-input"
              />
            )}
          />
          <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
            {errors.last__name?.message}
          </Typography>
        </FormControl>

        <FormControl fullWidth>
          <Label labelText="استان" />
          <Controller
            control={control}
            name="Province"
            render={({ field }) => (
              <Select
                {...field}
                components={animatedComponents}
                placeholder="لطفا استان را انتخاب کنید"
                options={options1}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    neutral0: isDark ? '#2d2d2d' : theme.colors.neutral0,
                    neutral80: isDark ? '#fff' : theme.colors.neutral80,
                    neutral50: isDark ? '#ccc' : theme.colors.neutral50,
                    primary25: isDark ? '#404040' : theme.colors.primary25,
                    neutral30: isDark ? '#666' : '#fff',
                  },
                })}
                styles={selectStyles} // استفاده از استایل‌های دینامیک
              />
            )}
          />
          <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
            {errors.Province?.message}
          </Typography>
        </FormControl>


        <FormControl fullWidth>
          <Label labelText="شهر" />
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Select
                {...field}
                components={animatedComponents}
                placeholder={selectedOption ? 'لطفا شهر را انتخاب کنید' : "ابتدا استان را انتخاب کنید"}
                options={selectedOption && options2[selectedOption.value]}
                isDisabled={!selectedOption}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    neutral0: isDark ? '#2d2d2d' : theme.colors.neutral0,
                    neutral80: isDark ? '#fff' : theme.colors.neutral80,
                    neutral50: isDark ? '#ccc' : theme.colors.neutral50,
                    primary25: isDark ? '#404040' : theme.colors.primary25,
                    neutral30: isDark ? '#666' : '#fff',
                  },
                })}
                styles={selectStyles} // استفاده از استایل‌های دینامیک
              />
            )}
          />
          <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
            {errors.city?.message}
          </Typography>
        </FormControl>

        <FormControl fullWidth>
          <Label labelText="کد پستی" />
          <Controller
            control={control}
            name="postal_code"
            render={({ field }) => (
              <CssTextField
                {...field}
                margin="none"
                label="کد پستی خود را وارد کنید"
                id="postal-code-input"
                inputProps={{ maxLength: 10 }}
                error={!!errors.postal_code}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
              />
            )}
          />
          <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
            {errors.postal_code?.message}
          </Typography>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <Label labelText="کد ملی یا شناسه اقتصادی" />
          <Controller
            control={control}
            name="idNumber"
            render={({ field }) => (
              <Box sx={{ display: 'flex' }}>
                <CssTextFieldNationalcode
                  {...field}
                  fullWidth
                  margin="none"
                  label={
                    selectedType === 'national'
                      ? 'کد ملی (۱۰ رقم)'
                      : 'شناسه اقتصادی (۱۲ رقم)'
                  }
                  type="text"
                  inputProps={{
                    maxLength: selectedType === 'national' ? 10 : 12,
                    dir: 'rtl',
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  error={!!errors.idNumber}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                />
                <ButtonGroup color="secondary" variant="outlined">
                  <Button
                    onClick={() => handleTypeChange('national')}
                    variant={selectedType === 'national' ? 'contained' : 'outlined'}
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    حقیقی
                  </Button>
                  <Button
                    onClick={() => handleTypeChange('economic')}
                    variant={selectedType === 'economic' ? 'contained' : 'outlined'}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    حقوقی
                  </Button>
                </ButtonGroup>
              </Box>
            )}
          />
          <Typography
            color="error"
            sx={{
              minHeight: '24px',
              fontFamily: 'gandom',
              mt: 1,
            }}
          >
            {errors.idNumber?.message}
          </Typography>
        </FormControl>

        <FormControl fullWidth component="fieldset">
          <Label labelText="نوع همکاری:" />
          <FormGroup row sx={{ gap: 3 }}>
            <FormControlLabel
              control={
                <Controller
                  control={control}
                  name="full_time_job"
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="secondary"
                    />
                  )}
                />
              }
              label="تمام وقت"
            />
            <FormControlLabel
              control={
                <Controller
                  control={control}
                  name="part_time_job"
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="secondary"
                    />
                  )}
                />
              }
              label="پاره وقت"
            />
          </FormGroup>
          {errors.checkboxes && (
            <Typography
              color="error"
              sx={{
                minHeight: '24px',
                fontFamily: 'gandom',
                mt: 1,
              }}
            >
              {errors.checkboxes.message}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Label labelText="تاریخ تولد" />
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                {...field}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                placeholder="تاریخ تولد خود را وارد کنید"
                className="purple"
                onChange={(date) => field.onChange(date)}
                style={{
                  width: '100%',
                  fontFamily: 'gandom',
                  borderRadius: '8px',
                  height:'54px',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                  color: isDark ? '#ffffff' : '#000000',
                  padding: '12.5px 14px',
                  
                }}
              />
            )}
          />
          <Typography
            color="error"
            sx={{
              minHeight: '24px',
              fontFamily: 'gandom',
              mt: 1,
            }}
          >
            {errors.date?.message}
          </Typography>
        </FormControl>

        <FormControl fullWidth>
          <Label labelText="رزومه کامل" />
          <Controller
            control={control}
            name="resume"
            render={({ field }) => (
              <JoditEditor
                {...field}
                config={firstconfig}
                value={field.value}
                tabIndex={1}
                onChange={(newContent) => field.onChange(newContent)}
              />
            )}
          />
          <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>
            {errors.resume?.message}
          </Typography>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 3, fontFamily: 'gandom' }}
        >
          ثبت اطلاعات
        </Button>
      </form>
    </CacheProvider>
  );
};

export default Form;