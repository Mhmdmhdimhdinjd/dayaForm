import { useMemo, useEffect, useState } from 'react';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useThemeContext } from '@/src/lib/ThemeContext';
import useDeleteUser from '@/src/hooks/useDeleteUser';
import dynamic from 'next/dynamic';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import fa from '@/src/assets/fa.js';
import CloseIcon from '@mui/icons-material/Close';

const JoditEditor = dynamic(
  () => import('jodit-react'),
  {
    ssr: false,
    loading: () => <p>در حال بارگیری ویرایشگر...</p>,
  }
);

const TableComp = ({ data }) => {
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDelete = (id) => {
    if (confirm('آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟')) {
      deleteUser(id);
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleExportExcel = () => {
    const transformedData = data.map((item) => ({
      نام: item.first__name,
      'نام خانوادگی': item.last__name,
      'تاریخ تولد': item.date,
      'نوع کاربر': item.idType === 'national' ? 'حقیقی' : 'حقوقی',
      [item.idType === 'national' ? 'کدملی' : 'شناسه اقتصادی']: item.idNumber,
      'شغل پاره‌وقت': item.part_time_job ? 'بله' : 'خیر',
      'شغل تمام وقت': item.full_time_job ? 'بله' : 'خیر',
      'کد پستی': item.postal_code,
      رزومه: item.resume,
    }));

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'users.xlsx');
  };

  const secondconfig = useMemo(
    () => ({
      language: 'fa',
      i18n: { fa },
      style: { fontFamily: 'gandom' },
      readonly: true,
      placeholder: 'متن نمایشی...',
      buttons: false,
      theme: isDark ? 'dark' : 'default',
    }),
    [isDark]
  );

  const columns = useMemo(
    () => [
      {
        id: 'first_name',
        header: 'نام',
        accessorKey: 'first__name',
        cell: ({ row }) => row.original.first__name,
      },
      {
        id: 'last_name',
        header: 'نام خانوادگی',
        accessorKey: 'last__name',
        cell: ({ row }) => row.original.last__name,
      },
      {
        id: 'postal_code',
        header: 'کد پستی',
        accessorKey: 'postal_code',
        cell: ({ row }) => row.original.postal_code,
      },
      {
        id: 'full_time_job',
        header: 'شغل تمام وقت',
        accessorKey: 'full_time_job',
        cell: ({ row }) => (row.original.full_time_job ? 'بله' : 'خیر'),
      },
      {
        id: 'part_time_job',
        header: 'شغل پاره وقت',
        accessorKey: 'part_time_job',
        cell: ({ row }) => (row.original.part_time_job ? 'بله' : 'خیر'),
      },
      {
        id: 'actions',
        header: 'عملیات',
        cell: ({ row }) => (
          <Box display="flex">
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={() => handleView(row.original)}
              sx={{ mr: 1 }}
            >
              مشاهده
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDelete(row.original._id)}
              disabled={isDeleting}
            >
              {isDeleting ? <CircularProgress size={20} /> : 'حذف'}
            </Button>
          </Box>
        ),
      },
    ],
    [isDeleting]
  );

  const table = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (!isMounted) {
    return <Box p={3}>در حال بارگیری جدول...</Box>;
  }

  return (
    <Box dir="rtl" sx={{ overflowX: 'auto' }}>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: isDark ? 'grey.800' : 'grey.100' }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} sx={{ fontWeight: 'bold' }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{textAlign:"center !important"}}>
                  داده‌ای برای نمایش وجود ندارد
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="success"
        disabled={!data.length}
        onClick={handleExportExcel}
        sx={{ mt: 3, mb: 3 }}
      >
        دریافت فایل اکسل
      </Button>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: isDark ? 'grey.800' : 'background.paper',
          },
        }}
      >
        <DialogTitle>
          جزئیات
          <IconButton
            aria-label="close"
            onClick={() => setModalOpen(false)}
            sx={{
              position: 'absolute',
              left: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers dir="rtl">
          {selectedItem && (
            <Box>
              <Typography paragraph>نام: {selectedItem.first__name}</Typography>
              <Typography paragraph>نام خانوادگی: {selectedItem.last__name}</Typography>
              <Typography paragraph>تاریخ تولد: {selectedItem.date}</Typography>
              <Typography paragraph>کد پستی: {selectedItem.postal_code}</Typography>
              <Typography paragraph>شغل تمام وقت: {selectedItem.full_time_job ? 'بله' : 'خیر'}</Typography>
              <Typography paragraph>شغل پاره وقت: {selectedItem.part_time_job ? 'بله' : 'خیر'}</Typography>
              <Box>
                <Typography paragraph>رزومه:</Typography>
                <JoditEditor config={secondconfig} value={selectedItem.resume} />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="secondary">
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableComp;