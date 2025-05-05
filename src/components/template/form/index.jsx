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
  InputAdornment,
  IconButton,
  Select,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
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
import { HiOutlineHome } from "react-icons/hi2";
import { TiLocationArrowOutline } from "react-icons/ti";
import { FaToolbox } from "react-icons/fa";

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
  Province: yup.object().required("لطفا استان را وارد نمایید "),
  city: yup.object().required("لطفا شهر را وارد نمایید "),
  FavoriteWorkingProvince: yup
    .object()
    .required("لطفا استان مورد علاقه را وارد نمایید "),
  FavoriteWorkingCity: yup
    .object()
    .required("لطفا شهر مورد علاقه را وارد نمایید "),
  firstPriority: yup.object().required("لطفا اولویت اول را وارد نمایید"),
  secondPriority: yup.object().nullable(),
  thirdPriority: yup.object().nullable(),
  Gender: yup.object().required("لطفا جنسیت را وارد نمایید"),
  isMarried: yup.object().required("لطفا وضعیت تاهل را وارد نمایید"),
  criminal_record: yup.object().required("لطفا سابقه کیفری را مشخص نمایید"),
  militarySrvice: yup.object().required("لطفا وظعیت نظام وظیفه را مشخص نمایید"),
  postal_code: yup
    .string()
    .required("کد پستی اجباری است")
    .matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
  resume: yup.string().required("رزومه اجباری است"),
  date: yup.mixed().test("required", "تاریخ تولد اجباری است", (value) => {
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
  phone_num: yup
    .string()
    .required("لطقا شماره موبایل را وارد کنید")
    .length(11, "شماره موبایل باید 11 رقم باشد")
    .test(
      "startsWith09",
      "شماره موبایل باید با 09 شروع شود",
      (value) => value?.startsWith("09") ?? false
    ),
  salary: yup
    .number()
    .nullable()
    .min(5, "عدد باید حداقل ۵ باشد")
    .max(35, "عدد نمیتواند بیشتر از ۳۵ باشد")
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    }),
  LandlinePhone: yup
    .string()
    .matches(/^\d{10}$/, "شماره تلفن باید ۱۰ رقم باشد")
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
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
  ];

  const criminalRecordOptions = [
    { value: "none", label: "محکومیت ندارم" },
    { value: "conditional", label: "آزادی مشروط" },
  ];

  const hasDisabilityOptions = [
    { value: "none", label: "معلولیت ندارم" },
    { value: "physical", label: "جسمی" },
    { value: "mental", label: "ذهنی" },
    { value: "mobility", label: "حرکتی" },
  ];

  const militarySrviceOptions = [
    { value: "permanent", label: "مطافیت دائم" },
    { value: "education", label: "مطافیت تحصیل" },
    { value: "inProgress", label: "در حال انجام" },
    { value: "exempt", label: "مشمول" },
    { value: "notExempt", label: "غیر مشمول" },
    { value: "completed", label: "انجام شده (پایان خدمت)" },
  ];

  const jobPriorityOptions = [
    { value: "logistics", label: "تدارکات و لجستیک" },
    { value: "architecture", label: "معماری/شهرسازی" },
    { value: "transportation", label: "حمل و نقل" },
    { value: "tourism", label: "گردشگری" },
    { value: "skilled_worker", label: "کارگر ماهر/ کارگر صنعتی" },
    { value: "jscnc", label: "JSCNC" },
    { value: "labor", label: "کار" },
    { value: "aidarchi", label: "آیدارچی" },
    { value: "page", label: "صفحه" },
  ];

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
      isMarried: null,
      criminal_record: { value: "none", label: "محکومیت ندارم" },
      militarySrvice: null,
      postal_code: "",
      full_time_job: false,
      part_time_job: false,
      resume: "",
      date: [],
      idType: "national",
      idNumber: "",
      phone_num: "",
      salary: null,
      LandlinePhone: "",
      hasDisability: { value: "none", label: "معلولیت ندارم" },
      firstPriority: null,
      secondPriority: null,
      thirdPriority: null,
      FavoriteWorkingCity: null,
      FavoriteWorkingProvince: null,
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

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 150,
      },
    },
  };

  return (
    <CacheProvider value={cacheRtl}>
      <Grid
        direction="rtl"
        flexDirection="row-reverse"
        alignItems="center"
        container
        p={2}
        pb={1}
      >
        <Grid display="flex" gap alignItems="center" justifyContent="left">
          <Typography variant="h6">اطلاعات کاربر</Typography>
          <MdOutlineAccountBalanceWallet size={24} />
        </Grid>
        <Grid size={{ xs: 12, md: 0 }}></Grid>
        <Grid>
          <Typography
            ml={{ xs: 0, md: 6 }}
            mt={{ xs: 1, md: 0 }}
            variant="subtitle1"
            color="#f44336"
          >
            بعد از ثبت , اطلاعات کاربر قابل تغییر نخواهد بود
          </Typography>
        </Grid>
      </Grid>

      <Divider />

      <form style={{ direction: "rtl" }} onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{ m: 4 }} container spacing={2}>
          {/* نام  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
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
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
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
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
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
          {/* جنسیت */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
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
                    inputId="Gender"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = GenderOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    InputProps={{
                      endAdornment: watch("Gender") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("Gender", null);
                              trigger("Gender");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
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
          {/* وضعیت تاهل */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
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
                    inputId="isMarried"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = isMarriedOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    InputProps={{
                      endAdornment: watch("isMarried") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("isMarried", null);
                              trigger("isMarried");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
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
          {/* سابقه کیفری */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="criminal_record"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    size="small"
                    select
                    label="سابقه کیفری *"
                    error={errors.criminal_record}
                    helperText={errors.criminal_record?.message}
                    inputId="criminal_record"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = criminalRecordOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    InputProps={{
                      endAdornment: watch("criminal_record") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("criminal_record", null);
                              trigger("criminal_record");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  >
                    {criminalRecordOptions.map((option) => (
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
          {/* وضعیت سربازی */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="militarySrvice"
                render={({ field }) => (
                  <Select
                    {...field}
                    size="small"
                    select
                    error={errors.militarySrvice}
                    helperText={errors.militarySrvice?.message}
                    inputId="militarySrvice"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = militarySrviceOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    input={<CssTextField label="وضعیت نظام وظیفه *" />}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    MenuProps={MenuProps}
                    InputProps={{
                      endAdornment: watch("militarySrvice") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("militarySrvice", null);
                              trigger("militarySrvice");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  >
                    {militarySrviceOptions.map((option) => (
                      <MenuItem
                        sx={{ direction: "rtl" }}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          {/*دیوایدر اطلاعات محل سکونت */}
          <Grid sx={{ width: "100%" }} xs={12}>
            <Divider textAlign="left">
              <Box display="flex" gap alignItems="center">
                <HiOutlineHome strokeWidth={2.3} size={20} />
                <Typography variant="body1" fontWeight="700">
                  اطلاعات محل سکونت
                </Typography>
              </Box>
            </Divider>
          </Grid>
          {/* استان  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
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
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    InputProps={{
                      endAdornment: selectedProvince && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("province", null);
                              trigger("province");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
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
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
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
                      if (selectedProvince) {
                        const selectedOption = options2[
                          selectedProvince.value
                        ].find((opt) => opt.value === e.target.value);
                        field.onChange(selectedOption);
                      }
                    }}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    InputProps={{
                      endAdornment: watch("city") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("city", null);
                              trigger("city");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
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
          {/* دیوایدر */}
          <Grid sx={{ width: "100%" }} xs={12}>
            <Divider />
          </Grid>
          {/* تاریخ تولد */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
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
          {/* شماره موبایل  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="phone_num"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    label="شماره موبایل*"
                    helperText={errors.phone_num?.message}
                    inputProps={{ maxLength: 11 }}
                    error={!!errors.phone_num}
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
          {/* کد پستی  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
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
                      e.target.value = e.target.value.replace(/[^0-9]/g, null);
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
          {/* تلفن  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="LandlinePhone"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    label="تلفن"
                    helperText={errors.LandlinePhone?.message}
                    inputProps={{ maxLength: 11 }}
                    error={!!errors.LandlinePhone}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, null);
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
          {/* حداقل حقوق  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="salary"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    label="حداقل حقوق درخواستی"
                    size="small"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            میلیون تومان
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      direction: "rtl",
                    }}
                    error={!!errors.salary}
                    helperText={errors.salary?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>
          {/* وضعیت معلولیت */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="hasDisability"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    size="small"
                    select
                    label=" وضعیت معلولیت*"
                    error={errors.hasDisability}
                    helperText={errors.hasDisability?.message}
                    inputId="hasDisability"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = hasDisabilityOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    InputProps={{
                      endAdornment: watch("hasDisability") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("hasDisability", null);
                              trigger("hasDisability");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  >
                    {hasDisabilityOptions.map((option) => (
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
          {/* نوع همکاری  */}
          <Grid size={{ xs: 12, Laptop: 6 }}>
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
          <Grid size={{ xs: 12 }}>
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
          {/*دیوایدر محل مورد علاقه برای کار */}
          <Grid sx={{ width: "100%" }} xs={12}>
            <Divider textAlign="left">
              <Box display="flex" gap alignItems="center">
                <FaToolbox size={20} />
                <Typography variant="body1" fontWeight="700">
                  علاقه مند به استخدام در حوزه شغلی
                </Typography>
              </Box>
            </Divider>
          </Grid>
          {/* اولویت اول  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="firstPriority"
                render={({ field }) => (
                  <Select
                    {...field}
                    select
                    size="small"
                    error={errors.firstPriority}
                    helperText={errors.firstPriority?.message}
                    inputId="firstPriority"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = jobPriorityOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    input={<CssTextField label="اولویت اول*" />}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    MenuProps={MenuProps}
                    InputProps={{
                      endAdornment: watch("firstPriority") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("firstPriority", null);
                              trigger("firstPriority");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  >
                    {jobPriorityOptions.map((option) => (
                      <MenuItem
                        sx={{ direction: "rtl" }}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          {/* اولویت دوم  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="secondPriority"
                render={({ field }) => (
                  <Select
                    {...field}
                    size="small"
                    select
                    error={errors.secondPriority}
                    helperText={errors.secondPriority?.message}
                    inputId="secondPriority"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = jobPriorityOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    input={<CssTextField label="اولویت دوم" />}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    MenuProps={MenuProps}
                    InputProps={{
                      endAdornment: watch("secondPriority") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("secondPriority", null);
                              trigger("secondPriority");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  >
                    {jobPriorityOptions.map((option) => (
                      <MenuItem
                        sx={{ direction: "rtl" }}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          {/* اولویت سوم  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="thirdPriority"
                render={({ field }) => (
                  <Select
                    {...field}
                    size="small"
                    select
                    error={errors.thirdPriority}
                    helperText={errors.thirdPriority?.message}
                    inputId="thirdPriority"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = jobPriorityOptions.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    input={<CssTextField label="اولویت سوم" />}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    MenuProps={MenuProps}
                    InputProps={{
                      endAdornment: watch("thirdPriority") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("thirdPriority", null);
                              trigger("thirdPriority");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  >
                    {jobPriorityOptions.map((option) => (
                      <MenuItem
                        sx={{ direction: "rtl" }}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          {/*دیوایدر محل مورد علاقه برای کار */}
          <Grid sx={{ width: "100%" }} xs={12}>
            <Divider textAlign="left">
              <Box display="flex" gap alignItems="center">
                <TiLocationArrowOutline size={20} />
                <Typography variant="body1" fontWeight="700">
                  محل مورد علاقه برای کار
                </Typography>
              </Box>
            </Divider>
          </Grid>
          {/* استان مورد علاقه  */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="FavoriteWorkingProvince"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    size="small"
                    select
                    label="استان*"
                    error={errors.FavoriteWorkingProvince}
                    helperText={errors.FavoriteWorkingProvince?.message}
                    inputId="FavoriteWorkingProvince"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      const selectedOption = options1.find(
                        (opt) => opt.value === e.target.value
                      );
                      field.onChange(selectedOption);
                    }}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    InputProps={{
                      endAdornment: selectedProvince && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("province", null);
                              trigger("province");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
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
          {/* شهر مورد علاقه */}
          <Grid
            size={{ xs: 12, mobileL: 6, sm: 12, Tablet: 6, LaptopL: 4, lg: 3 }}
          >
            <FormControl fullWidth>
              <Controller
                control={control}
                name="FavoriteWorkingCity"
                render={({ field }) => (
                  <CssTextField
                    {...field}
                    size="small"
                    select
                    label="شهر*"
                    error={errors.FavoriteWorkingCity}
                    helperText={errors.FavoriteWorkingCity?.message}
                    inputId="FavoriteWorkingCity"
                    value={field.value?.value || ""}
                    onChange={(e) => {
                      if (selectedProvince) {
                        const selectedOption = options2[
                          selectedProvince.value
                        ].find((opt) => opt.value === e.target.value);
                        field.onChange(selectedOption);
                      }
                    }}
                    sx={{
                      "&:hover .show-on-hover": {
                        display: "inline-flex",
                      },
                    }}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    InputProps={{
                      endAdornment: watch("city") && (
                        <InputAdornment
                          className="show-on-hover"
                          sx={{ display: "none", mr: 2 }}
                          position="start"
                        >
                          <IconButton
                            onClick={() => {
                              setValue("city", null);
                              trigger("city");
                            }}
                            size="small"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
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
