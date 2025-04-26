import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Footer = () => (

    <Box
        sx={{
            width: '100%',
            padding: '16px',
            textAlign: 'right',
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '.5rem',
        }}
    >
        <Box sx={{ display: 'flex', gap: 2, minWidth: 292 }}>
            <Link href="#" >
                <Typography sx={{ color: 'blue' }}>پشتیبانی</Typography>
            </Link>
            <Link href="#" sx={{ color: 'blue' }}>
                <Typography>مستندات</Typography>
            </Link>
            <Link href="#" sx={{ color: 'blue' }}>
                <Typography>شرایط استفاده</Typography>
            </Link>
            <Link href="#" sx={{ color: 'blue' }}>
                <Typography>قوانین</Typography>
            </Link>
        </Box>

        <Typography
            variant="body2"
            sx={{
                color: 'text.secondary',
                '@media (min-width: 844px)': { mr: 'auto' },
                display: 'block',
                textAlign: 'center',
            }}
        >
            © طراحی و توسعه توسط دایا تدبیر یسر
        </Typography>
    </Box>

)

export default Footer