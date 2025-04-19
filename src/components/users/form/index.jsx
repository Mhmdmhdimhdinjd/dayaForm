import React, { useEffect, useState, useMemo } from "react"
import { Box, TextField, FormControl, Typography, Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { styled } from '@mui/material/styles';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import "react-multi-date-picker/styles/colors/purple.css"

import fa from './fa';
// import JoditEditor from 'jodit-react';
import dynamic from 'next/dynamic';

import Label from '../../ui/label/index'

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import useCreateUser from "@/src/hooks/useCreateUser";

const JoditEditor = dynamic(
  () => import('jodit-react'),
  {
    ssr: false,
    loading: () => <Typography sx={{fontFamily:'gandom'}}>در حال بارگیری ویرایشگر...</Typography>,
  }
);

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});
// const CssTextField = styled(TextField)({
//   '& label.Mui-focused': {
//     color: '#7E57C2',
//     // paddingRight:'1rem',
//     // backgroundColor: 'white',


//   },
//   '& .MuiInput-underline:after': {
//     borderBottomColor: '#B2BAC2',
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: '#B2BAC2',
//     },
//     '&:hover fieldset': {
//       borderColor: '#B2BAC2',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#7E57C2',
//     },
//   },
//   '& .MuiInputBase-input': {
//     fontFamily: '"Gandom", sans-serif', // افزودن فونت به متن داخل Input
//     borderRadius: '1rem'
//   },
//   '& label': {
//     fontFamily: '"Gandom", sans-serif', // افزودن فونت به Label
//   },
// });
const CssTextField = styled(TextField)(() => ({
  '& .MuiInputLabel-outlined': {
    transform: 'translate(14px, 16px) scale(1)', // موقعیت اولیه لیبل
    fontSize: '0.9rem',
    fontFamily: 'gandom', // فونت فارسی
    color: '#555',
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: 'translate(0px, -6px) scale(0.65)', // موقعیت لیبل وقتی کوچک می‌شه
    margin: '0 15px', // فاصله کوچک برای قرار گرفتن لیبل روی خط
    color: '#7c5dfa', // رنگ بنفش هنگام فوکوس
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Vazirmatn, sans-serif',
    fontSize: '0.9rem',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#7c5dfa', // رنگ بنفش هنگام هاور
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#7c5dfa', // رنگ بنفش هنگام فوکوس
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: 'gandom',
  }
}));

const CssTextFieldNationalcode = styled(TextField)(() => ({
  '& .MuiInputLabel-outlined': {
    transform: 'translate(14px, 16px) scale(1)', // موقعیت اولیه لیبل
    fontSize: '0.9rem',
    fontFamily: 'gandom', // فونت فارسی
    color: '#555',
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    transform: 'translate(0px, -6px) scale(0.65)', // موقعیت لیبل وقتی کوچک می‌شه
    margin: '0 15px', // فاصله کوچک برای قرار گرفتن لیبل روی خط
    color: '#7c5dfa', // رنگ بنفش هنگام فوکوس
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e0e0e0',
  },
  '& .MuiOutlinedInput-root': {
    fontFamily: 'Vazirmatn, sans-serif',
    fontSize: '0.9rem',
    backgroundColor: '#fafafa',
    borderRadius: '8px 0  0 8px',
    margin: '0',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#7c5dfa', // رنگ بنفش هنگام هاور
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#7c5dfa', // رنگ بنفش هنگام فوکوس
    },
  },
  '& .MuiInputBase-input': {
    fontFamily: 'gandom',
  }
}));

// const validationSchema = yup.object().shape({
//   first__name: yup
//     .string()
//     .required("نام اجباری است")
//     .matches(/^[\u0600-\u06FF\s]+$/, "نام باید تنها شامل حروف فارسی باشد"),
//   last__name: yup
//     .string()
//     .required("نام خانوادگی اجباری است")
//     .matches(/^[\u0600-\u06FF\s]+$/, "نام خانوادگی باید تنها شامل حروف فارسی باشد"),
//   Province: yup.object().required("استان اجباری است"),
//   city: yup.object().required("شهر اجباری است"),
//   postal_code: yup
//     .string()
//     .required("کد پستی اجباری است")
//     .matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
//   resume: yup.string().required("رزومه اجباری است"),
//   date: yup.string().required("تاریخ اجباری است"),
//   idType: yup.string().oneOf(["national", "economic"]).required(),
//   idNumber: yup.string()
//     .when("idType", {
//       is: "national",
//       then: (schema) => schema
//         .required("کد ملی الزامی است")
//         .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
//     })
//     .when("idType", {
//       is: "economic",
//       then: (schema) => schema
//         .required("شناسه اقتصادی الزامی است")
//         .matches(/^\d{12}$/, "شناسه اقتصادی باید ۱۲ رقم باشد")
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

const validationSchema = yup.object().shape({
  first__name: yup
    .string()
    .required('نام اجباری است')
    .matches(/^[\u0600-\u06FF\s]+$/, 'نام باید تنها شامل حروف فارسی باشد'),
  last__name: yup
    .string()
    .required('نام خانوادگی اجباری است')
    .matches(/^[\u0600-\u06FF\s]+$/, 'نام خانوادگی باید تنها شامل حروف فارسی باشد'),
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


  const { control, reset, handleSubmit, setValue, getValues, watch, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      first__name: "",
      last__name: "",
      Province: null,
      city: null,
      postal_code: "",
      full_time_job: false,
      part_time_job: false,
      resume: "",
      date: undefined,
      idType: "national",
      idNumber: ""
    },
    resolver: yupResolver(validationSchema)
  });

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
      // theme: isDark ? 'dark' : 'light',
      placeholder: 'رزومه خود را وارد کنید',
      style: { fontFamily: 'gandom' },
    }),
    // [isDark]
    []
  );

  return (
    <CacheProvider value={rtlCache}>

      <Box
        component="div"
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 2,
          direction: 'ltr',
          m: 1,
          mt: 3,
          p: 4
        }}
      >


        <Typography color="#7E57C2" variant="h5" sx={{ textAlign: 'left', fontFamily: 'kharazmi' }}>
          اطلاعات کاربر
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>


          <FormControl fullWidth>

            <Label labelText='نام' />

            <Controller
              control={control}
              name="first__name"
              render={({ field }) => (
                <CssTextField  {...field} margin='none' label="لطفا نام خود را وارد کنید" id="custom-css-outlined-input" />
              )}
            />

            <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>{errors.first__name?.message}</Typography>

          </FormControl>


          <FormControl fullWidth>

            <Label labelText='نام خانوادگی' />

            <Controller
              control={control}
              name="last__name"
              render={({ field }) => (
                <CssTextField  {...field} margin='none' label="لطفا نام خانوادگی خود را وارد کنید" id="custom-css-outlined-input" />
              )}
            />

            <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>{errors.first__name?.message}</Typography>

          </FormControl>


          <FormControl fullWidth>

            <Label labelText='کد پستی' />

            <Controller
              control={control}
              name="postal_code"
              render={({ field }) => (
                <CssTextField
                  {...field}
                  margin='none'
                  label="کد پستی خود را وارد کنید"
                  id="postal-code-input"
                  inputProps={{ maxLength: 10 }}
                  error={!!errors.postal_code}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                // sx={isDark ? { backgroundColor: 'bgdark.main', color: 'white' } : {}}
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
                      pattern: '[0-9]*'
                    }}
                    error={!!errors.idNumber}
                    // sx={{
                    //   '& .MuiInputBase-input': {
                    //     textAlign: 'right',
                    //     fontFamily: 'gandom',
                    //     ...(isDark && {
                    //       backgroundColor: '#121212',
                    //       color: 'white'
                    //     })
                    //   }
                    // }} 
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
                        whiteSpace: 'nowrap'
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

            <Typography color="error" sx={{
              minHeight: '24px',
              fontFamily: 'gandom',
              mt: 1
            }}>
              {errors.idNumber?.message}
            </Typography>
          </FormControl>


          <FormControl fullWidth component="fieldset">

            <Label labelText='نوع همکاری:' />

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
                        color='secondary'
                      />
                    )}
                  />
                }
                label="تمام وقت"
              // sx={{ fontFamily: 'gandom' }}
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
                        color='secondary'
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
                  mt: 1
                }}
              >
                {errors.checkboxes.message}
              </Typography>
            )}
          </FormControl>


          <FormControl fullWidth sx={{ mb: 2 }}>

            <Label labelText='تاریخ تولد' />

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
                  inputClass={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  onChange={(date) => field.onChange(date)}
                  style={{
                    width: '100%',
                    fontFamily: 'gandom',
                    // backgroundColor: isDark ? '#1e1e1e' : '#fff',
                    // color: isDark ? '#fff' : '#000',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    fontFamily: 'gandom',
                    padding: '12.5px 14px',
                    border: errors.date ? '1px solid #f44336' : '1px solid #e0e0e0',
                  }}
                />
              )}
            />

            <Typography color="error" sx={{
              minHeight: '24px',
              fontFamily: 'gandom',
              mt: 1
            }}>
              {errors.date?.message}
            </Typography>

          </FormControl>


          <FormControl fullWidth>

            <Label labelText='رزومه کامل' />

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

            <Typography color="error" sx={{ minHeight: '24px', fontFamily: 'gandom' }}>{errors.resume?.message}</Typography>

          </FormControl>

          <button type="submit">send</button>


        </form>


      </Box>


    </CacheProvider>
  )



}

export default Form