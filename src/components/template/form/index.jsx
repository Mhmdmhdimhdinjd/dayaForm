import React, { useEffect, useState, useMemo } from "react";
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
  Grid,
  Divider,
  MenuItem,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { styled, useTheme } from "@mui/material/styles";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/purple.css";
import fa from "@/src/assets/fa";
import dynamic from "next/dynamic";
import Label from "@/src/components/module/label/index";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateUser from "@/src/hooks/useCreateUser";
import { useThemeContext } from "@/src/lib/ThemeContext";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <Typography>در حال بارگیری ویرایشگر...</Typography>,
});

const CssTextField = styled(
  ({ openCalendar, handleValueChange, ...otherProps }) => (
    <TextField {...otherProps} />
  )
)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.mode === "light" ? "#0000003B" : "#fff",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
  },
  "& .MuiOutlinedInput-root.Mui-error": {
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.main,
    },
  },
}));

const CssTextFieldNationalcode = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px 0 0 4px",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderRight: 0,
      borderColor: theme.palette.mode === "light" ? "#0000003B" : "#fff",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },
  },
  "& .MuiOutlinedInput-root.Mui-error": {
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.error.main,
    },
  },
}));

const validationSchema = yup.object().shape({
  first__name: yup
    .string()
    .required("نام اجباری است")
    .matches(/^[\u0600-\u06FF\s]+$/, "نام باید تنها شامل حروف فارسی باشد"),
  last__name: yup
    .string()
    .required("نام خانوادگی اجباری است")
    .matches(
      /^[\u0600-\u06FF\s]+$/,
      "نام خانوادگی باید تنها شامل حروف فارسی باشد"
    ),
  Province: yup.object().required("استان اجباری است"),
  city: yup.object().required("شهر اجباری است"),
  Gender: yup.object().required("لطفا جنسیت را وارد نمایید"),
  isMarried:yup.object().required("لطفا وضعیت تاهل را وارد نمایید"),
  postal_code: yup
    .string()
    .required("کد پستی اجباری است")
    .matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
  resume: yup.string().required("رزومه اجباری است"),
  // date: yup.string("لطفا تاریخ تولد را وارد نمایید").required("تاریخ تولد اجباری است"),
  date: yup
  .mixed()
  .test("required", "تاریخ تولد اجباری است", (value) => {
    return Array.isArray(value) ? value.length > 0 : !!value;
  }),
  idType: yup.string().oneOf(["national", "economic"]).required(),
  idNumber: yup
    .string()
    .when("idType", {
      is: "national",
      then: (schema) =>
        schema
          .required("کد ملی اجباری است")
          .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
    })
    .when("idType", {
      is: "economic",
      then: (schema) =>
        schema
          .required("شناسه اقتصادی اجباری است")
          .matches(/^\d{12}$/, "شناسه اقتصادی باید ۱۲ رقم باشد"),
    }),
  full_time_job: yup.boolean(),
  part_time_job: yup.boolean(),
  checkboxes: yup
    .mixed()
    .test("atLeastOne", "حداقل یکی از موارد باید انتخاب شود", function (value) {
      const { part_time_job, full_time_job } = this.parent;
      return part_time_job || full_time_job;
    }),
});

const Form = () => {
  const { theme: themeContext } = useThemeContext();
  const isDark = themeContext === "dark";
  const theme = useTheme();
  const [selectedProvince, setselectedProvince] = useState(null);

  const options1 = [
    { value: "tehran", label: "تهران" },
    { value: "alborz", label: "البرز" },
    { value: "mazandaran", label: "مازندران" },
  ];

  const GenderOptions = [
    { value: "man", label: "مرد" },
    { value: "woman", label: "زن" },
  ];

  const isMarriedOptions = [
    { value: "single", label: "مجرد" },
    { value: "married", label: "متاهل" },
  ]

  const options2 = {
    mazandaran: [
      { value: "babol", label: "بابل" },
      { value: "sari", label: "ساری" },
      { value: "amol", label: "امل" },
    ],
    alborz: [
      { value: "karaj", label: "کرج" },
      { value: "meshkindasht", label: "مشکین دشت" },
      { value: "hashtgerd", label: "هشتگرد" },
    ],
    tehran: [
      { value: "tehran", label: "تهران" },
      { value: "damavand", label: "دماوند" },
      { value: "rey", label: "ری" },
    ],
  };

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    trigger,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first__name: "",
      last__name: "",
      Province: null,
      city: null,
      Gender: null,
      postal_code: "",
      full_time_job: false,
      part_time_job: false,
      resume: "",
      date: [],
      idType: "national",
      idNumber: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    setselectedProvince(watch("Province"));
    setValue("city", null);
  }, [watch("Province")]);

  const {
    mutate,
    isLoading: isCreating,
    isError: isCreateError,
    error: createError,
  } = useCreateUser();

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        console.error("Failed to create user:", error);
      },
    });
  };

  const selectedType = watch("idType");

  const handleTypeChange = (type) => {
    setValue("idType", type);
    setValue("idNumber", "");
    if (errors) {
      console.log(errors);
      trigger("idNumber");
    }
  };

  const full_time_jobValue = watch("full_time_job");
  const part_time_jobValue = watch("part_time_job");

  useEffect(() => {
    if (full_time_jobValue || part_time_jobValue) {
      clearErrors("checkboxes");
    }
  }, [full_time_jobValue, part_time_jobValue, clearErrors]);

  const firstconfig = useMemo(
    () => ({
      language: "fa",
      i18n: { fa },
      readonly: false,
      theme: isDark ? "dark" : "default",
      placeholder: "رزومه خود را وارد کنید",
    }),
    [isDark]
  );

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <Grid
        direction="rtl"
        flexDirection="row-reverse"
        container
        px={2}
        pt={3}
        pb={1}
      >
        <Grid
          display="flex"
          mb={1}
          color={theme.palette.text.gray}
          justifyContent="left"
        >
          <Typography variant="h5" fontWeight="500">
            اطلاعات کاربر
          </Typography>
          <MdOutlineAccountBalanceWallet size={24} />
        </Grid>
        <Grid size={{ xs: 12, md: 0 }}></Grid>
        <Grid>
          <Typography ml={{ xs: 0, md: 6 }} variant="subtitle1" color="#f44336">
            بعد از ثبت , اطلاعات کاربر قابل تغییر نخواهد بود
          </Typography>
        </Grid>
      </Grid>

      <Divider />

      <form style={{ direction: "rtl" }} onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{ m: 4 }} container spacing={2}>
          {/* نام  */}
          <Grid size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="first__name"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    label="نام *"
                    size="small"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    error={!!errors.first__name}
                    helperText={errors.first__name?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* نام خانوادگی  */}
          <Grid size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="last__name"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    label="نام خانوادگی *"
                    size="small"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    helperText={errors.last__name?.message}
                    error={!!errors.last__name}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* کد شناسایی */}
          <Grid size={{ xs: 12, Laptop: 6, LaptopL: 4, lg: 3 }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="idNumber"
                render={({ field }) => (
                  <Box sx={{ display: "flex" }}>
                    <CssTextFieldNationalcode
                      {...field}
                      fullWidth
                      margin="none"
                      size="small"
                      label={
                        selectedType === "national"
                          ? "کد ملی (۱۰ رقم)*"
                          : "شناسه اقتصادی (۱۲ رقم)*"
                      }
                      type="text"
                      inputProps={{
                        maxLength: selectedType === "national" ? 10 : 12,
                        dir: "rtl",
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                      error={!!errors.idNumber}
                      helperText={errors.idNumber?.message}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      }}
                    />
                    <ButtonGroup color="secondary" variant="outlined">
                      <Button
                        onClick={() => handleTypeChange("national")}
                        variant={
                          selectedType === "national" ? "contained" : "outlined"
                        }
                        sx={{
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          whiteSpace: "nowrap",
                          height: "40px",
                        }}
                      >
                        حقیقی
                      </Button>
                      <Button
                        onClick={() => handleTypeChange("economic")}
                        variant={
                          selectedType === "economic" ? "contained" : "outlined"
                        }
                        sx={{ whiteSpace: "nowrap", height: "40px" }}
                      >
                        حقوقی
                      </Button>
                    </ButtonGroup>
                  </Box>
                )}
              />
            </FormControl>
          </Grid>

          {/* وضعیت تاهل */}
          <Grid size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="isMarried"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    size="small"
                    select
                    label="وضعیت تاهل*"
                    error={errors.isMarried}
                    helperText={errors.isMarried?.message}
                    inputId="province"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = isMarriedOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  >
                    {isMarriedOptions.map((option) => (
                      <MenuItem
                        sx={{ direction: "rtl" }}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </CssTextField>
                )}
              />
            </FormControl>
          </Grid>

          {/* جنسیت */}
          <Grid size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="Gender"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    size="small"
                    select
                    label="جنسیت*"
                    error={errors.Gender}
                    helperText={errors.Gender?.message}
                    inputId="province"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = GenderOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  >
                    {GenderOptions.map((option) => (
                      <MenuItem
                        sx={{ direction: "rtl" }}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </CssTextField>
                )}
              />
            </FormControl>
          </Grid>

          {/* استان  */}
          <Grid size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="Province"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    size="small"
                    select
                    label="استان"
                    error={errors.Province}
                    helperText={errors.Province?.message}
                    inputId="province"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = options1.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  >
                    {options1.map((option) => (
                      <MenuItem
                        sx={{ direction: "rtl" }}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </CssTextField>
                )}
              />
            </FormControl>
          </Grid>

          {/* شهر  */}
          <Grid size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    size="small"
                    select
                    label="شهر"
                    error={errors.city}
                    helperText={errors.city?.message}
                    inputId="city"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = options2[
                        selectedProvince.value
                      ].find((opt) => opt.value === e.target.value);
                      field.onChange(selectedOption);
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  >
                    {selectedProvince ? (
                      options2[selectedProvince.value].map((option) => (
                        <MenuItem
                          sx={{ direction: "rtl" }}
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem
                        dir="rtl"
                        sx={{ direction: "rtl" }}
                        value="none"
                      >
                        !ابتدا استان را انتخاب کنید
                      </MenuItem>
                    )}
                  </CssTextField>
                )}
              />
            </FormControl>
          </Grid>

          {/* کد پستی  */}
          <Grid size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="postal_code"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    label="کد پستی*"
                    helperText={errors.postal_code?.message}
                    inputProps={{ maxLength: 10 }}
                    error={!!errors.postal_code}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    size="small"
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* تاریخ تولد */}
          <Grid size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    onChange={(e, date) => {
                      field.onChange(date.validatedValue[0]);
                      console.log(date.validatedValue[0]);
                    }}
                    render={
                      <CssTextField
                        label="تاریخ تولد*"
                        fullWidth
                        helperText={errors.date?.message}
                        error={!!errors.date}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                        size="small"
                      />
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* نوع همکاری  */}
          <Grid size={{ xs: 12, Laptop: 6, LaptopL: 4, lg: 3 }}>
            <FormControl fullWidth component="fieldset">
              <Label labelText="نوع همکاری*" />
              <FormGroup row sx={{ gap: 3, ml: 4, mt: -1.5 }}>
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
                    fontSize: "0.75rem",
                    lineHeight: "1.66",
                    fontWeight: 400,
                    ml: 2,
                  }}
                >
                  {errors.checkboxes.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* رزومه */}
          <FormControl fullWidth>
            <Label labelText="رزومه کامل*" htmlFor="resume" />
            <Controller
              control={control}
              name="resume"
              render={({ field }) => (
                <JoditEditor
                  {...field}
                  id="resume"
                  config={firstconfig}
                  value={field.value}
                  tabIndex={1}
                  onChange={(newContent) => field.onChange(newContent)}
                />
              )}
            />
            <Typography
              color="error"
              sx={{
                fontSize: "0.75rem",
                lineHeight: "1.66",
                fontWeight: 400,
                ml: 2,
                mt: 1,
              }}
            >
              {errors.resume?.message}
            </Typography>
          </FormControl>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ ml: 4, mr: 2 }}
        >
          ثبت اطلاعات
        </Button>

        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => reset()}
        >
          بازنشانی
        </Button>
      </form>
    </CacheProvider>
  );
};

export default Form;
