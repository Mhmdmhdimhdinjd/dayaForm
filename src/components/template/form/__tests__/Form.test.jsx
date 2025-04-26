import React from 'react';
import { render, screen, fireEvent ,waitFor } from '@testing-library/react';
import Form from '../index'; // مسیر فایل Form.jsx شما
import { ThemeProvider } from '@/src/lib/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()


describe('Form Component', () => {


    // تست رندر عنوان فرم
    test('renders form title', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const titleElement = screen.getByText(/اطلاعات کاربر/i);
        expect(titleElement).toBeInTheDocument();
    });


    // تست وارد کردن نام
    test('allows entering first name', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const firstNameInput = screen.getByLabelText(/لطفا نام خود را وارد کنید/i);
        fireEvent.change(firstNameInput, { target: { value: 'علی' } });

        expect(firstNameInput).toHaveValue('علی');
    });


    // تست خطای اعتبارسنجی وقتی نام خالی باشه
    test('shows validation error when first name is empty', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const submitButton = screen.getByText(/ثبت اطلاعات/i);
        fireEvent.click(submitButton);

        const errorMessage = await screen.findByText(/نام اجباری است/i);
        expect(errorMessage).toBeInTheDocument();
    });

    
    test('renders province field with label', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const provinceSelect = screen.getByLabelText(/استان/i);
        expect(provinceSelect).toBeInTheDocument();
        expect(provinceSelect).toHaveTextContent(/لطفا استان را انتخاب کنید/i); // بررسی placeholder
    });

    // تست ۲: انتخاب استان
    test('allows selecting a province', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const provinceSelect = screen.getByLabelText(/استان/i);
        fireEvent.change(provinceSelect, {
            target: { value: 'tehran' },
        });

        expect(provinceSelect).toHaveValue('tehran');
    });


    // تست فعال شدن فیلد شهر بعد از انتخاب استان
    test('enables city field and renders city options when a province is selected', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );

        // بررسی اینکه فیلد شهر ابتدا غیرفعاله
        const citySelect = screen.getByLabelText(/شهر/i);
        expect(citySelect).toBeDisabled();

        // پیدا کردن فیلد استان
        const provinceSelect = screen.getByLabelText(/استان/i);

        // انتخاب استان "تهران"
        fireEvent.change(provinceSelect, {
            target: { value: 'tehran' },
        });

        // بررسی اینکه فیلد شهر حالا فعاله
        expect(citySelect).not.toBeDisabled();

        // بررسی وجود گزینه "تهران" در فیلد شهر
        expect(citySelect).toHaveTextContent(/تهران/i);
    });


    // تست انتخاب شهر بعد از انتخاب استان
    test('allows selecting city after province is selected', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const provinceSelect = screen.getByLabelText(/استان/i);
        fireEvent.change(provinceSelect, { target: { value: 'tehran' } });

        const citySelect = screen.getByLabelText(/شهر/i);
        fireEvent.change(citySelect, { target: { value: 'tehran' } });
        expect(citySelect).toHaveValue('tehran');
    });


    // تست وارد کردن نام خانوادگی
    test('allows entering last name', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const lastNameInput = screen.getByLabelText(/لطفا نام خانوادگی خود را وارد کنید/i);
        fireEvent.change(lastNameInput, { target: { value: 'احمدی' } });
        expect(lastNameInput).toHaveValue('احمدی');
    });


    // تست وارد کردن کد پستی
    test('allows entering postal code', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const postalCodeInput = screen.getByLabelText(/کد پستی خود را وارد کنید/i);
        fireEvent.change(postalCodeInput, { target: { value: '1234567890' } });
        expect(postalCodeInput).toHaveValue('1234567890');
    });


    // تست وارد کردن تاریخ تولد
    test('allows selecting birth date', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const datePicker = screen.getByLabelText(/تاریخ تولد/i);
        fireEvent.change(datePicker, { target: { value: '1400/01/01' } });
        expect(datePicker).toHaveValue('1400/01/01');
    });

    // تست انتخاب چک‌باکس‌های نوع همکاری
    test('allows selecting job type checkboxes', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const fullTimeCheckbox = screen.getByLabelText(/تمام وقت/i);
        fireEvent.click(fullTimeCheckbox);
        expect(fullTimeCheckbox).toBeChecked();

        const partTimeCheckbox = screen.getByLabelText(/پاره وقت/i);
        fireEvent.click(partTimeCheckbox);
        expect(partTimeCheckbox).toBeChecked();
    });

    // تست تغییر بین کد ملی و شناسه اقتصادی
    test('allows switching between national and economic ID types', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const nationalButton = screen.getByText(/حقیقی/i);
        const economicButton = screen.getByText(/حقوقی/i);

        fireEvent.click(economicButton);
        expect(screen.getByLabelText(/شناسه اقتصادی \(۱۲ رقم\)/i)).toBeInTheDocument();

        fireEvent.click(nationalButton);
        expect(screen.getByLabelText(/کد ملی \(۱۰ رقم\)/i)).toBeInTheDocument();
    });


    // تست وارد کردن کد ملی
    test('allows entering national ID', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const idInput = screen.getByLabelText(/کد ملی \(۱۰ رقم\)/i);
        fireEvent.change(idInput, { target: { value: '1234567890' } });
        expect(idInput).toHaveValue('1234567890');
    });

    // تست خطای اعتبارسنجی برای کد ملی نامعتبر
    test('shows validation error for invalid national ID', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const idInput = screen.getByLabelText(/کد ملی \(۱۰ رقم\)/i);
        fireEvent.change(idInput, { target: { value: '123' } }); // کمتر از 10 رقم
        const submitButton = screen.getByText(/ثبت اطلاعات/i);
        fireEvent.click(submitButton);
        const errorMessage = await screen.findByText(/کد ملی باید ۱۰ رقم باشد/i);
        expect(errorMessage).toBeInTheDocument();
    });

    // تست وارد کردن رزومه
    test('allows entering resume text', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );
        const resumeEditor = screen.getByLabelText(/رزومه کامل/i);
        fireEvent.change(resumeEditor, { target: { value: 'این یک رزومه نمونه است.' } });
        expect(resumeEditor).toHaveValue('این یک رزومه نمونه است.');
    });

});


describe('Form Component Validation', () => {
    test('shows all validation errors when submitting empty form', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Form />
          </ThemeProvider>
        </QueryClientProvider>
      );

      // پیدا کردن و کلیک کردن دکمه ارسال
      const submitButton = screen.getByText(/ثبت اطلاعات/i);
      fireEvent.click(submitButton);

      // بررسی پیام‌های خطا برای همه فیلدها
      await waitFor(() => {
        expect(screen.getByText(/نام اجباری است/i)).toBeInTheDocument();
        expect(screen.getByText(/نام خانوادگی اجباری است/i)).toBeInTheDocument();
        expect(screen.getByText(/استان اجباری است/i)).toBeInTheDocument();
        expect(screen.getByText(/شهر اجباری است/i)).toBeInTheDocument();
        expect(screen.getByText(/کد پستی اجباری است/i)).toBeInTheDocument();
        expect(screen.getByText(/تاریخ اجباری است/i)).toBeInTheDocument();
        expect(screen.getByText(/حداقل یکی از موارد باید انتخاب شود/i)).toBeInTheDocument(); // برای چک‌باکس‌ها
        expect(screen.getByText(/کد ملی اجباری است/i)).toBeInTheDocument();
        expect(screen.getByText(/رزومه اجباری است/i)).toBeInTheDocument();
      });
    });
  });