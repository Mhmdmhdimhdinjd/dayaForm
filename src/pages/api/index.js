// pages/api/index.js
import ConnectDb from "@/src/lib/db";
import User from "@/src/models/users";

const handler = async (req, res) => {
  await ConnectDb();

  switch (req.method) {
    case 'GET':
      try {
        const users = await User.find({})
          .sort({ createdAt: -1 })
          .lean();
        if (!users.length) {
          return res.status(200).json({ message: 'هنوز کاربری ثبت نشده است', data: [] });
        }
        return res.status(200).json(users
        // {
        //   message :'دریافت داده‌ها موفقیت آمیز بود',
        //   data: users,
        //    count: users.length,
        // }
        );
      } catch (error) {
        console.error('خطا در دریافت کاربران:', error);
        return res.status(500).json({ error: 'خطای سرور داخلی' });
      }

    case 'POST':
      try {
        const {
          first__name,
          last__name,
          Province,
          city,
          postal_code,
          resume,
          date,
          idType,
          idNumber,
          full_time_job,
          part_time_job,
        } = req.body;

        if (!first__name || !last__name || !Province || !city || !postal_code || !resume || !date || !idType || !idNumber) {
          return res.status(400).json({ error: 'تمام فیلدها الزامی هستند' });
        }

        const newUser = await User.create({
          first__name,
          last__name,
          Province,
          city,
          postal_code,
          resume,
          date,
          idType,
          idNumber,
          full_time_job,
          part_time_job,
        });

        return res.status(201).json({
          message: 'کاربر با موفقیت ایجاد شد',
          user: newUser,
        });
      } catch (error) {
        console.error('خطا در ایجاد کاربر:', error);
        return res.status(500).json({ error: 'خطای سرور داخلی' });
      }

    case 'DELETE':
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'شناسه کاربر الزامی است' });
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(404).json({ error: 'کاربر یافت نشد' });
        }
        return res.status(200).json({
          message: 'کاربر با موفقیت حذف شد',
          user: deletedUser,
        });
      } catch (error) {
        console.error('خطا در حذف کاربر:', error);
        return res.status(500).json({ error: 'خطای سرور داخلی' });
      }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;