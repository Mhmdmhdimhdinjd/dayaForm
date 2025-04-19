/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false, // غیرفعال کردن لوگوی "dev" و فعالیت‌های ساخت
    buildActivityPosition: 'bottom-right', // اختیاری: تغییر موقعیت لوگو (اگر buildActivity: true باشد)
  },
};

export default nextConfig;