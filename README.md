# وردة (0) - مساعدة ليفل زيرو (جامعة حورس، هندسة الحاسبات والنظم)

كل حاجة مجانية. هتعمل 3 خطوات: Supabase ثم GitHub ثم Vercel.
ملحوظة: ارفع محتوى الفولدر (بعد فك الزيب) مش ملف الزيب نفسه.

## 1) Supabase (الحسابات وحفظ البيانات)
1. ادخل supabase.com وسجّل، واعمل New project (الخطة Free). احفظ باسورد قاعدة البيانات.
2. من القايمة: SQL Editor ثم New query. الصق كل محتوى ملف supabase.sql واضغط Run.
3. من Project Settings ثم API: انسخ Project URL وكمان مفتاح الـ Publishable (أو anon). مهم: ما تنسخش service_role أو Secret.
4. افتح ملف config.js وحط القيمتين مكان YOUR_SUPABASE_URL و YOUR_SUPABASE_PUBLISHABLE_KEY.
   (القيمتين دول عامّين وآمنين للمتصفح.)
5. بعد ما تعرف رابط Vercel (خطوة 3): من Authentication ثم URL Configuration حط الرابط في Site URL وضيفه كمان في Redirect URLs.
6. لو عايز الدخول من غير تأكيد إيميل: Authentication ثم Providers ثم Email وقفل Confirm email. لو سبته شغال، التأكيد بيوصل على الإيميل.

## 2) GitHub
1. اعمل Repository جديد (Private أو Public).
2. Add file ثم Upload files، واسحب محتوى الفولدر كله (api, vendor, icons وباقي الملفات) واعمل Commit.
3. تأكد إن config.js فيه قيم Supabase اللي حطيتها. ما تحطش مفتاح Gemini في أي ملف.

## 3) Vercel
1. vercel.com ثم Add New ثم Project، وسجّل بحساب GitHub واختار الـ Repository.
2. Framework Preset: Other. سيب باقي الإعدادات زي ما هي.
3. Environment Variables (من Settings):
   - SUPABASE_URL = نفس Project URL
   - SUPABASE_PUBLISHABLE_KEY = نفس المفتاح العام
   - GEMINI_API_KEY (اختياري) = مفتاح مشترك لو عايز. من غيره كل مستخدم بيحط مفتاحه.
   - GEMINI_MODEL (اختياري) = لو الموديل اتغير. الافتراضي gemini-3.8-flash مع بديل gemini-3.6-flash.
4. اضغط Deploy. لو ضفت المتغيرات بعد الـ Deploy الأول اعمل Redeploy.
5. ارجع لخطوة 1.5 وحط الرابط في Supabase.

## 4) أول استخدام
1. افتح الرابط وسجّل حساب.
2. من تبويب "المفتاح" اتبع الشرح، واعمل مفتاح Gemini من aistudio.google.com/apikey وحطه واحفظ.
3. جرّب: اسألها سؤال، ارفع PDF، اعمل اختبار، اعمل خطة.

## قايمة اختبار سريعة
- التسجيل والدخول شغالين.
- الشات بيرد وبيظهر "من بيانات حورس" على سؤال النسبة.
- رفع PDF وشرح خطوة بخطوة.
- اختبار وبعده أسئلة الغلط.
- الأدوات: محوّل النسبة، المتطلبات، GPA.

## للتحديث بعدين
غيّر رقم VERSION في sw.js (مثلا warda-v2) عشان المتصفح ياخد النسخة الجديدة.

## تنبيهات
- بيانات مستويات 1 إلى 4 وساعات DME مقروءة من صورة غير واضحة. راجعها مع شجرة البرنامج الرسمية.
- نص المحاضرات بيتحفظ على الجهاز بس. باقي البيانات (الأخطاء، الملاحظات، الخطة) بتتزامن عبر Supabase.
- حدود Gemini المجانية يومية ودقيقية ومحسوبة على مشروع جوجل بتاعك.
