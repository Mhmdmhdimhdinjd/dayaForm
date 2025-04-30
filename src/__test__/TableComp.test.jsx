import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TableComp from '../components/template/table/TableComp';
import { ThemeProvider } from '@/src/lib/ThemeContext'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

jest.mock('xlsx');
jest.mock('file-saver');



const mockDeleteUser = jest.fn();
jest.mock('@/src/hooks/useDeleteUser', () => ({
    __esModule: true,
    default: jest.fn(() => {
        return {
            mutate: mockDeleteUser,
            isLoading: false,
        };
    }),
}));



const queryClient = new QueryClient();

const mockData = [
    {
        _id: '1',
        first__name: 'علی',
        last__name: 'احمدی',
        date: '1400/01/01',
        idType: 'national',
        idNumber: '1234567890',
        part_time_job: true,
        full_time_job: false,
        postal_code: '1234567890',
        resume: 'این یک رزومه نمونه است.',
    }
];

describe('TableComp', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('renders table with headers and data', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <TableComp data={mockData} />
                </ThemeProvider>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/^نام$/i)).toBeInTheDocument();
            expect(screen.getByText(/نام خانوادگی/i)).toBeInTheDocument();
            expect(screen.getByText(/کد پستی/i)).toBeInTheDocument();
            expect(screen.getByText(/شغل تمام وقت/i)).toBeInTheDocument();
            expect(screen.getByText(/شغل پاره وقت/i)).toBeInTheDocument();
            expect(screen.getByText(/عملیات/i)).toBeInTheDocument();

            expect(screen.getByText(/علی/i)).toBeInTheDocument();
            expect(screen.getByText(/احمدی/i)).toBeInTheDocument();
            expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
            expect(screen.getByText(/بله/i)).toBeInTheDocument();
            expect(screen.getByText(/خیر/i)).toBeInTheDocument();
        });
    });


    test('renders empty state when no data is provided', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <TableComp data={[]} />
                </ThemeProvider>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/داده‌ای برای نمایش وجود ندارد/i)).toBeInTheDocument();
        });
    });


    test('opens dialog when view button is clicked', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <TableComp data={mockData} />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const viewButton = screen.getByRole('button', { name: /مشاهده/i });
        await act(async () => {
            fireEvent.click(viewButton);
        });


        await waitFor(() => {
            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByText(/جزئیات/i)).toBeInTheDocument();
        });
    });


    test('closes dialog when close button is clicked', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <TableComp data={mockData} />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const viewButton = screen.getAllByText(/مشاهده/i)[0];
        fireEvent.click(viewButton);

        await waitFor(() => {
            expect(screen.getByText(/جزئیات/i)).toBeInTheDocument();
        });

        const closeButton = screen.getByLabelText(/close/i);
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText(/جزئیات/i)).not.toBeInTheDocument();
        });
    });


    test('calls deleteUser when delete button is clicked', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <TableComp data={mockData} />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const deleteButton = screen.getAllByText(/حذف/i)[0];
        fireEvent.click(deleteButton);


        const confirmdeleteButton = screen.getAllByText(/!حذف/i)[0];
        fireEvent.click(confirmdeleteButton);


        await waitFor(() => {
            expect(mockDeleteUser).toHaveBeenCalledWith('1');
        });
    });


    test('exports data to excel when export button is clicked', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <TableComp data={mockData} />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const exportButton = screen.getByText(/دریافت فایل اکسل/i);
        fireEvent.click(exportButton);

        await waitFor(() => {
            expect(XLSX.utils.json_to_sheet).toHaveBeenCalled();
            expect(XLSX.write).toHaveBeenCalled();
            expect(saveAs).toHaveBeenCalled();
        });
    });


    test('disables export button when no data is provided', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <TableComp data={[]} />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const exportButton = screen.getByText(/دریافت فایل اکسل/i);
        expect(exportButton).toBeDisabled();
    });


    test('renders JoditEditor in readonly mode', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <TableComp data={mockData} />
                </ThemeProvider>
            </QueryClientProvider>
        );

        const viewButton = screen.getAllByText(/مشاهده/i)[0];
        fireEvent.click(viewButton);

        await waitFor(() => {
            expect(screen.getByText(/این یک رزومه نمونه است./i)).toHaveAttribute('readonly');
        });
    });

})