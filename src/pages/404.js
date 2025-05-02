import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useThemeContext } from "../lib/ThemeContext";
import Image from "next/image";

const NotFoundPage = () => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
    const router = useRouter();

    const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor={isDark ? "#00000" : "#fffff"}
    >
      <Typography sx={{ mt: 12   }} fontWeight="500" variant="h4">
        ): صفحه یافت نشد
      </Typography>

      <Typography mt={1}>آدرس درخواستی در سامانه یافت نشد</Typography>

      <Button onClick={handleGoHome} sx={{ mt: 3 }} variant="contained">
        برگشت به خانه
      </Button>

      <Image
        src={isDark ? "/images/notfoundLight.png" : "/images/notfoundDark.png"}
        width={400}
        height={400}
        alt="gjk"
      />
    </Box>
  );
};

export default NotFoundPage;
