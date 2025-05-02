import { useMemo, useEffect, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
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
  Grid,
  DialogContentText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import NumbersIcon from "@mui/icons-material/Numbers";
import { useThemeContext } from "@/src/lib/ThemeContext";
import useDeleteUser from "@/src/hooks/useDeleteUser";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import fa from "@/src/assets/fa.js";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>در حال بارگیری ویرایشگر...</p>,
});

const TableComp = ({ data }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUser();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    if (selectedId) {
      deleteUser(selectedId);
    }
    setSelectedId(null);
    handleClose();
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleExportExcel = () => {
    const transformedData = data.map((item) => ({
      نام: item.first__name,
      "نام خانوادگی": item.last__name,
      "تاریخ تولد": item.date,
      "نوع کاربر": item.idType === "national" ? "حقیقی" : "حقوقی",
      "کد شناسایی": item.idNumber,
      "شغل پاره‌وقت": item.part_time_job ? "بله" : "خیر",
      "شغل تمام وقت": item.full_time_job ? "بله" : "خیر",
      "کد پستی": item.postal_code,
      رزومه: item.resume.replace(/<[^>]*>/g, '') ,
    }));
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    worksheet['!cols'] = [
      { width: 20 }, { width: 25 }, { width: 15 }, 
      { width: 15 }, { width: 25 }, { width: 15 },
      { width: 15 }, { width: 15 }, { width: 40 }
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "users.xlsx");
  };

  const secondconfig = useMemo(
    () => ({
      language: "fa",
      i18n: { fa },
      readonly: true,
      placeholder: "متن نمایشی...",
      buttons: false,
      theme: isDark ? "dark" : "default",
    }),
    [isDark]
  );

  const columns = useMemo(
    () => [
      { id:'number',
        header: (
          <Box display="flex" alignItems="center" gap={0.5}>
          <NumbersIcon fontSize="small" />
          <span>ردیف</span>
        </Box>
        ),
        cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        id: "first_name",
        header: (
          <Box gap={2}  display='flex' alignItems='center'> 
          <Box width={5} height={20} borderRadius={2} bgcolor='rgb(200 200 200)'></Box>
        <Box width='100%' display="flex" alignItems="center" gap={0.5}>
            <PersonIcon fontSize="small" />
            <span>نام</span>
          </Box>
          </Box>

        ),
        accessorKey: "first__name",
        cell: ({ row }) => <Typography>{row.original.first__name}</Typography>,
      },
      {
        id: "last_name",
        header: (
          <Box gap={2}  display='flex' alignItems='center'> 
            <Box width={5} height={20} borderRadius={2} bgcolor='rgb(200 200 200)'></Box>
          <Box width='100%'display="flex" alignItems="center" gap={0.5}>
            <FamilyRestroomIcon fontSize="small" />
            <span>نام خانوادگی</span>
          </Box>
          </Box>

        ),
        accessorKey: "last__name",
        cell: ({ row }) => <Typography>{ row.original.last__name}</Typography>,
      },
      {
        id: "postal_code",
        header: (
          <Box gap={2}  display='flex' alignItems='center'> 
            <Box width={5} height={20} borderRadius={2} bgcolor='rgb(200 200 200)'></Box>
          <Box width='100%' display="flex" alignItems="center" gap={0.5}>
            <LocalPostOfficeIcon fontSize="small" />
            <span>کد پستی</span>
          </Box>
          </Box>

        ),
        accessorKey: "postal_code",
        cell: ({ row }) =><Typography> {row.original.postal_code} </Typography>,
      },
      {
        id: "full_time_job",
        header:(
          <Box gap={2}  display='flex' alignItems='center'> 
            <Box width={5} height={20} borderRadius={2} bgcolor='rgb(200 200 200)'></Box>
          <Box width='100%' display="flex" alignItems="center" gap={0.5}>
          <WorkHistoryIcon fontSize="small" />
          <span>شغل تمام وقت</span>
        </Box>
        </Box>

        ),
        accessorKey: "full_time_job",
        cell: ({ row }) => <Typography> {row.original.full_time_job ? "بله" : "خیر"}</Typography>,
      },
      {
        id: "part_time_job",
        header: (
          <Box gap={2} display='flex' alignItems='center'> 
            <Box width={5} height={20} borderRadius={2} bgcolor='rgb(200 200 200)'></Box>
          <Box width='100%' display="flex" alignItems="center" gap={0.5}>
            <WorkOutlineIcon fontSize="small" />
            <span>شغل پاره وقت</span>
          </Box>
          </Box>
        ),
        accessorKey: "part_time_job",
        cell: ({ row }) =><Typography> {row.original.part_time_job ? "بله" : "خیر"}</Typography>,
      },
      {
        id: "actions",
        header: (
          <Box display='flex' alignItems='center'> 
            <Box width={5} height={20} borderRadius={2} bgcolor='rgb(200 200 200)'></Box>

          <Box width='100%' display="flex" alignItems="center" justifyContent='center' gap={0.5}>
            <SettingsIcon fontSize="small" />
            <span>عملیات</span>
          </Box>
          </Box>
        ),
        cell: ({ row }) => (
          <Box display="flex" gap={1} justifyContent='center'>
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
              onClick={() => handleOpen(row.original._id)}
              disabled={isDeleting}
            >
              {isDeleting ? <CircularProgress size={20} /> : "حذف"}
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
    <Box dir="rtl" sx={{ overflowX: "hidden" , m:4 }}>
      <TableContainer  component={Paper}>
        <Table sx={{ minWidth: 1000 }} >
          <TableHead sx={{ bgcolor: isDark ? "grey.800" : "grey.100" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center !important" }}
                >
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
        disabled={!data?.length}
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
            bgcolor: isDark ? "grey.800" : "background.paper",
          },
        }}
      >
        <DialogTitle>
          جزئیات
          <IconButton
            aria-label="close"
            onClick={() => setModalOpen(false)}
            sx={{
              position: "absolute",
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
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item size={{ xs: 12, mobileL: 6, md: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    <strong>نام:</strong> {selectedItem.first__name || "-"}
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 12, mobileL: 6, md: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    <strong>نام خانوادگی:</strong>{" "}
                    {selectedItem.last__name || "-"}
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 12, mobileL: 6, md: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    <strong>تاریخ تولد:</strong> {selectedItem.date || "-"}
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 12, mobileL: 6, md: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    <strong>کد پستی:</strong> {selectedItem.postal_code || "-"}
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 12, mobileL: 6, md: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    <strong>شغل تمام وقت:</strong>{" "}
                    {selectedItem.full_time_job ? "بله" : "خیر"}
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 12, mobileL: 6, md: 4 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                    }}
                  >
                    <strong>شغل پاره وقت:</strong>{" "}
                    {selectedItem.part_time_job ? "بله" : "خیر"}
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 12 }}>
                  <Box
                    sx={{
                      mt: 2,
                      "& .jodit-wysiwyg": {
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        fontSize: "inherit",
                        fontFamily: "inherit",
                      },
                    }}
                  >
                    <Typography variant="body1" paragraph>
                      <strong>رزومه:</strong>
                    </Typography>
                    <JoditEditor
                      config={{
                        ...secondconfig,
                        readonly: true,
                        toolbar: false,
                      }}
                      value={selectedItem.resume || "رزومه ای موجود نیست"}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button sx={{mr:1}} onClick={() => setModalOpen(false)} color="secondary">
            بستن
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: "12px",
            minWidth: "400px",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ py: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="right"
            gap={1}
          >
            <WarningAmberRoundedIcon color="warning" fontSize="large" />
            <span>تأیید حذف کاربر</span>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ py: 2 }}>
          <DialogContentText>
            آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟
            <br />
            <strong>!این عمل غیرقابل بازگشت است</strong>
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleClose}
            color="inherit"
            variant="outlined"
            sx={{
              minWidth: "120px",
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            انصراف
          </Button>
          <Button
            onClick={handleConfirm}
            color="error"
            variant="contained"
            autoFocus
            sx={{
              minWidth: "120px",
              bgcolor: "error.main",
              "&:hover": { bgcolor: "error.dark" },
            }}
          >
            !حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableComp;

