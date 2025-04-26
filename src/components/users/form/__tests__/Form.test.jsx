import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

    // test('renders city options when a province is selected', () => {
    //     render(
    //         <QueryClientProvider client={queryClient}>
    //         <ThemeProvider>
    //             <Form />
    //         </ThemeProvider>
    //     </QueryClientProvider>
    //     );

    //     // پیدا کردن فیلد استان
    //     const provinceSelect = screen.getByLabelText(/Province/i);

    //     // انتخاب استان "تهران"
    //     fireEvent.change(provinceSelect, {
    //       target: { value: 'tehran' },
    //     });

    //     // بررسی اینکه گزینه‌های شهر (مثل "تهران") نمایش داده شدن
    //     const citySelect = screen.getByLabelText(/shahr/i);
    //     expect(citySelect).toHaveTextContent(/تهران/i); // بررسی وجود گزینه "تهران"
    //   });



    // تست رندر فیلد استان
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


    // تست ۴: بررسی اعتبارسنجی
    test('shows validation error when province is not selected', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Form />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const submitButton = screen.getByText(/ثبت اطلاعات/i);
        fireEvent.click(submitButton);

        const errorMessage = await screen.findByText(/استان اجباری است/i);
        expect(errorMessage).toBeInTheDocument();
    });

});