// بيانات جامعة حورس. الجدول والمتطلبات من ملفات المستخدم (ليفل 0 واضح، ليفل 1 إلى 4 مقروء من صورة صغيرة).
window.HUE = {
 "university": "جامعة حورس (HUE)",
 "program": "كل أقسام كلية الهندسة (قائمة courses = خطة الحاسبات والتحكم، تقريبية؛ الخطط الأخرى في plans)",
 "passPct": 60,
 "grades": [
  {
   "sym": "A+",
   "min": 97,
   "pts": 4,
   "ar": "ممتاز"
  },
  {
   "sym": "A",
   "min": 93,
   "pts": 4,
   "ar": "ممتاز"
  },
  {
   "sym": "A-",
   "min": 89,
   "pts": 3.7,
   "ar": "ممتاز"
  },
  {
   "sym": "B+",
   "min": 84,
   "pts": 3.3,
   "ar": "جيد جدًا"
  },
  {
   "sym": "B",
   "min": 80,
   "pts": 3,
   "ar": "جيد جدًا"
  },
  {
   "sym": "B-",
   "min": 76,
   "pts": 2.7,
   "ar": "جيد جدًا"
  },
  {
   "sym": "C+",
   "min": 73,
   "pts": 2.3,
   "ar": "جيد"
  },
  {
   "sym": "C",
   "min": 70,
   "pts": 2,
   "ar": "جيد"
  },
  {
   "sym": "C-",
   "min": 67,
   "pts": 1.7,
   "ar": "مقبول"
  },
  {
   "sym": "D+",
   "min": 64,
   "pts": 1.3,
   "ar": "مقبول"
  },
  {
   "sym": "D",
   "min": 60,
   "pts": 1,
   "ar": "مقبول"
  },
  {
   "sym": "F",
   "min": 0,
   "pts": 0,
   "ar": "راسب"
  }
 ],
 "courses": [
  {
   "code": "BAS 011",
   "name": "Mathematics 1",
   "hrs": 3,
   "sem": 1,
   "level": 0,
   "pre": []
  },
  {
   "code": "BAS 021",
   "name": "Physics 1",
   "hrs": 3,
   "sem": 1,
   "level": 0,
   "pre": []
  },
  {
   "code": "BAS 031",
   "name": "Mechanics 1",
   "hrs": 2,
   "sem": 1,
   "level": 0,
   "pre": []
  },
  {
   "code": "CSE 021",
   "name": "Computer Skills",
   "hrs": 2,
   "sem": 1,
   "level": 0,
   "pre": []
  },
  {
   "code": "DME 011",
   "name": "Engineering Drawing & Projection",
   "hrs": 3,
   "sem": 1,
   "level": 0,
   "pre": []
  },
  {
   "code": "HUM 011",
   "name": "English Language",
   "hrs": 2,
   "sem": 1,
   "level": 0,
   "pre": []
  },
  {
   "code": "HUM 051",
   "name": "History of Engineering & Technology",
   "hrs": 1,
   "sem": 1,
   "level": 0,
   "pre": []
  },
  {
   "code": "BAS 012",
   "name": "Mathematics 2",
   "hrs": 3,
   "sem": 2,
   "level": 0,
   "pre": [
    "BAS 011"
   ]
  },
  {
   "code": "BAS 022",
   "name": "Physics 2",
   "hrs": 3,
   "sem": 2,
   "level": 0,
   "pre": [
    "BAS 021"
   ]
  },
  {
   "code": "BAS 032",
   "name": "Mechanics 2",
   "hrs": 2,
   "sem": 2,
   "level": 0,
   "pre": [
    "BAS 031"
   ]
  },
  {
   "code": "BAS 041",
   "name": "Engineering Chemistry",
   "hrs": 3,
   "sem": 2,
   "level": 0,
   "pre": []
  },
  {
   "code": "DME 021",
   "name": "Principles of Manufacturing Engineering",
   "hrs": 2,
   "sem": 2,
   "level": 0,
   "pre": []
  },
  {
   "code": "HUM 052",
   "name": "Water, Energy & Climate Change Issues",
   "hrs": 2,
   "sem": 2,
   "level": 0,
   "pre": []
  },
  {
   "code": "HUM 025",
   "name": "Human Rights",
   "hrs": 1,
   "sem": 2,
   "level": 0,
   "pre": []
  },
  {
   "code": "CSE 121",
   "name": "Computer Programming",
   "hrs": 3,
   "sem": 3,
   "level": 1,
   "pre": [
    "CSE 021"
   ],
   "approx": true
  },
  {
   "code": "BAS 111",
   "name": "Mathematics 3",
   "hrs": 3,
   "sem": 3,
   "level": 1,
   "pre": [
    "BAS 012"
   ],
   "approx": true
  },
  {
   "code": "EPE 112",
   "name": "Electrical Circuits 1",
   "hrs": 3,
   "sem": 3,
   "level": 1,
   "pre": [
    "BAS 022"
   ],
   "approx": true
  },
  {
   "code": "EPE 113",
   "name": "Electrical Measurements",
   "hrs": 2,
   "sem": 3,
   "level": 1,
   "pre": [
    "BAS 022"
   ],
   "approx": true
  },
  {
   "code": "ECE 111",
   "name": "Electronics 1",
   "hrs": 3,
   "sem": 3,
   "level": 1,
   "pre": [],
   "approx": true
  },
  {
   "code": "HUM 151",
   "name": "Professional Ethics",
   "hrs": 1,
   "sem": 3,
   "level": 1,
   "pre": [],
   "approx": true
  },
  {
   "code": "BAS 112",
   "name": "Mathematics 4",
   "hrs": 2,
   "sem": 4,
   "level": 1,
   "pre": [
    "BAS 111"
   ],
   "approx": true
  },
  {
   "code": "BAS 113",
   "name": "Statistics & Probability Theory",
   "hrs": 2,
   "sem": 4,
   "level": 1,
   "pre": [],
   "approx": true
  },
  {
   "code": "EPE 151",
   "name": "Electromagnetics",
   "hrs": 3,
   "sem": 4,
   "level": 1,
   "pre": [
    "BAS 022"
   ],
   "approx": true
  },
  {
   "code": "EPE 114",
   "name": "Electrical Circuits 2",
   "hrs": 3,
   "sem": 4,
   "level": 1,
   "pre": [
    "EPE 112"
   ],
   "approx": true
  },
  {
   "code": "ECE 112",
   "name": "Electronics 2",
   "hrs": 3,
   "sem": 4,
   "level": 1,
   "pre": [
    "ECE 111"
   ],
   "approx": true
  },
  {
   "code": "CSE 122",
   "name": "Data Structures",
   "hrs": 2,
   "sem": 4,
   "level": 1,
   "pre": [
    "CSE 121"
   ],
   "approx": true
  },
  {
   "code": "BAS 211",
   "name": "Numerical Methods & Operation Research",
   "hrs": 2,
   "sem": 5,
   "level": 2,
   "pre": [
    "BAS 112"
   ],
   "approx": true
  },
  {
   "code": "CSE 231",
   "name": "Digital & Logic Circuits",
   "hrs": 3,
   "sem": 5,
   "level": 2,
   "pre": [],
   "approx": true
  },
  {
   "code": "CSE 221",
   "name": "Advanced Programming Languages",
   "hrs": 3,
   "sem": 5,
   "level": 2,
   "pre": [
    "CSE 121"
   ],
   "approx": true
  },
  {
   "code": "ECE 221",
   "name": "Signals & Systems",
   "hrs": 3,
   "sem": 5,
   "level": 2,
   "pre": [
    "BAS 111"
   ],
   "approx": true
  },
  {
   "code": "AIE 211",
   "name": "Fundamentals of AI",
   "hrs": 3,
   "sem": 5,
   "level": 2,
   "pre": [
    "CSE 121"
   ],
   "approx": true
  },
  {
   "code": "ECE 231",
   "name": "Communication Theory",
   "hrs": 3,
   "sem": 6,
   "level": 2,
   "pre": [
    "ECE 221"
   ],
   "approx": true
  },
  {
   "code": "AIE 221",
   "name": "Intro. to Machine Learning",
   "hrs": 3,
   "sem": 6,
   "level": 2,
   "pre": [
    "CSE 121"
   ],
   "approx": true
  },
  {
   "code": "CSE 211",
   "name": "Automatic Control Systems",
   "hrs": 3,
   "sem": 6,
   "level": 2,
   "pre": [
    "BAS 111"
   ],
   "approx": true
  },
  {
   "code": "CSE 222",
   "name": "Computer System Security",
   "hrs": 3,
   "sem": 6,
   "level": 2,
   "pre": [
    "CSE 122"
   ],
   "approx": true
  },
  {
   "code": "BAS 212",
   "name": "Mathematics 5",
   "hrs": 3,
   "sem": 6,
   "level": 2,
   "pre": [
    "BAS 112"
   ],
   "approx": true
  },
  {
   "code": "CSE 333",
   "name": "Microprocessor",
   "hrs": 3,
   "sem": 7,
   "level": 3,
   "pre": [
    "CSE 231"
   ],
   "approx": true
  },
  {
   "code": "CSE 321",
   "name": "Database Systems",
   "hrs": 3,
   "sem": 7,
   "level": 3,
   "pre": [
    "CSE 122"
   ],
   "approx": true
  },
  {
   "code": "CSE 332",
   "name": "Computer Networks",
   "hrs": 2,
   "sem": 7,
   "level": 3,
   "pre": [
    "CSE 122"
   ],
   "approx": true
  },
  {
   "code": "DME 331",
   "name": "Project Management",
   "hrs": 2,
   "sem": 7,
   "level": 3,
   "pre": [],
   "approx": true
  },
  {
   "code": "AIE 341",
   "name": "Intro. to Vision & Robotics",
   "hrs": 3,
   "sem": 7,
   "level": 3,
   "pre": [
    "CSE 211"
   ],
   "approx": true
  },
  {
   "code": "ECE 321",
   "name": "Digital Signal Processing",
   "hrs": 3,
   "sem": 8,
   "level": 3,
   "pre": [
    "ECE 221"
   ],
   "approx": true
  },
  {
   "code": "CSE 311",
   "name": "Microcontrollers",
   "hrs": 3,
   "sem": 8,
   "level": 3,
   "pre": [
    "CSE 333"
   ],
   "approx": true
  },
  {
   "code": "CSE 331",
   "name": "Computer Organization & Architecture",
   "hrs": 3,
   "sem": 8,
   "level": 3,
   "pre": [
    "CSE 231"
   ],
   "approx": true
  },
  {
   "code": "CSE 431",
   "name": "Operating Systems",
   "hrs": 2,
   "sem": 9,
   "level": 4,
   "pre": [
    "CSE 331"
   ],
   "approx": true
  },
  {
   "code": "CSE 412",
   "name": "Embedded Systems",
   "hrs": 3,
   "sem": 9,
   "level": 4,
   "pre": [
    "CSE 333"
   ],
   "approx": true
  },
  {
   "code": "CSE 411",
   "name": "PLC",
   "hrs": 3,
   "sem": 9,
   "level": 4,
   "pre": [
    "CSE 211"
   ],
   "approx": true
  },
  {
   "code": "CSE 461",
   "name": "Project 1",
   "hrs": 2,
   "sem": 9,
   "level": 4,
   "pre": [],
   "approx": true,
   "preNote": "المتطلب السابق: نجاح في 112 ساعة معتمدة تشمل ليفل 0 و1 و2"
  },
  {
   "code": "ECE 432",
   "name": "Mobile Communications",
   "hrs": 3,
   "sem": 10,
   "level": 4,
   "pre": [
    "ECE 221"
   ],
   "approx": true
  },
  {
   "code": "CSE 462",
   "name": "Project 2",
   "hrs": 4,
   "sem": 10,
   "level": 4,
   "pre": [
    "CSE 461"
   ],
   "approx": true
  },
  {
   "code": "CSE 421",
   "name": "Cyber Security",
   "hrs": 3,
   "sem": 10,
   "level": 4,
   "pre": [
    "CSE 222"
   ],
   "approx": true
  }
 ],
 "source": "عرض الإرشاد الأكاديمي لكلية الهندسة (114 سلايد). القواعد تحت 2025 هي اللي بتنطبق على ليفل 0 الجدد، ولو في اختلاف مع لائحة 2018 متسجل.",
 "rules": {
  "totalHours2025": 160,
  "totalHours2018": 170,
  "levels": "5 مستويات (ليفل 0 إلى 4) في 10 فصول، والصيفي اختياري",
  "durationMin2025": "8 فصول أساسية كحد أدنى (الصيفي مش بيتحسب)",
  "maxDurationYears": 10,
  "gpaFormula": "GPA الفصل = مجموع (ساعات المادة × نقاط التقدير) ÷ مجموع الساعات المسجلة في الفصل. CGPA = نفس الفكرة على كل المواد اللي درسها الطالب",
  "gpaExample": "A- في مادة 3 ساعات = 3.7 × 3 = 11.1 نقطة (المثال في العرض كتب 8.1 والأرجح خطأ طباعة)",
  "passRule2025": "النجاح = 60% على الأقل من مجموع الدرجات + 40% على الأقل من درجة الامتحان النهائي التحريري (لائحة 2018: 30%)",
  "attendance": "حضور لا يقل عن 75% من ساعات المادة، وإلا حرمان ورسوب. فوق 25% غياب لا يُسمح بطلب تقدير غير مكتمل",
  "graduation": "إنجاز كل الساعات المطلوبة + CGPA لا يقل عن 2.00 + اجتياز التدريب الصيفي + النجاح في مشروع التخرج",
  "improvement": "ينفع تعيد مادة للتحسين، وتتحسب الدرجة الأعلى (لائحة 2025). أقصى 5 مرات تحسين طول الدراسة. إعادة مادة رسب فيها F: يتحسب له حد أقصى B+",
  "repeatF": "المادة الإجبارية اللي رسبت فيها لازم تعيدها. لو اختيارية ينفع تاخد اختيارية تانية بموافقة المرشد",
  "honors": "مرتبة الشرف: CGPA 3.30 فأكثر، ومفيش F في أي مادة طول الدراسة. أوائل الثانوية العامة (30 الأوائل، شعبة رياضيات) يتعفوا من 75% من المصروفات لو CGPA 3.60 فأكثر",
  "transferCredits": "المقررات المحولة من كليات أخرى أو نظام تعليم آخر لا تُحسب إعادة",
  "grades": {
   "AU": "مستمع، بدون ساعات",
   "P": "ناجح بدون ساعات",
   "F": "راسب",
   "W": "منسحب بطلب بعد موافقة المرشد، لا يدخل في GPA",
   "FW": "انسحاب إجباري ويأخذ 0 نقطة",
   "I": "غير مكتمل لعذر مقبول بعد حضور 75% وبموافقة مجلس الكلية",
   "Abs": "غائب بدون عذر في النهائي، يأخذ 0 نقطة"
  }
 },
 "registration": {
  "maxHours": {
   "cgpa3orMore": "حتى 21 ساعة بموافقة مجلس الكلية",
   "cgpa2to3": "حتى 18 ساعة",
   "cgpaBelow2": "حتى 14 ساعة (ينذر أكاديميًا)"
  },
  "summerMax2025": {
   "cgpa3orMore": 9,
   "below3": 8,
   "upTo12IfGraduating": true
  },
  "summerMax2018": 9,
  "summerAllowedFor": "المتعثر، من يريد إعادة مادة رسب فيها، من يريد رفع تقدير لتحسين CGPA، من لم يستوفِ الحد الأقصى، أو من يكمل متطلبات التخرج",
  "rules": [
   "التسجيل يخلص في الأسبوع الأول من بداية الفصل",
   "الرسوم تتدفع بنهاية الأسبوع الثاني وإلا غرامة يحددها مجلس الكلية",
   "مينفعش تسجل مادة قبل النجاح في متطلباتها السابقة",
   "لازم تستشير المرشد الأكاديمي قبل التسجيل وتستوفي شروط كل مادة",
   "مينفعش تدرس مادة ومتطلبها السابق في نفس الفصل إلا لو ده هيخرّجك",
   "لا تعتبر مسجل إلا بعد دفع المصروفات واستخراج الكارنيه"
  ],
  "dropAdd2025": "حذف/إضافة/استبدال بموافقة المرشد حتى نهاية الأسبوع الثاني (أو أول 3 أيام في الصيفي)",
  "dropAdd2018": "حتى 3 أسابيع من الفصل الأساسي أو الأسبوع الأول من الصيفي",
  "withdraw": "انسحاب من مادة بموافقة المرشد خلال 10 أسابيع من بداية الفصل (5 أسابيع في الصيفي) بشرط ألا يقل العبء عن الحد الأدنى. بتتسجل W وما بتحسبش رسوب",
  "hubSteps": [
   "1. المرشد يعمل Action Plan للطلاب Light Load (المتعثرين)",
   "2. الطالب يختار المواد على HUE Hub ويطلع فاتورة",
   "3. الطالب يدفع الفاتورة (Unpaid Invoices، الدفع بفوري)",
   "4. يسجل المحاضرات والسكاشن واللاب لكل مادة (Registration ثم Add Sessions)",
   "5. يضغط Finish Registration / Submit Registration Request",
   "6. المرشد يتخذ قرار: Approve أو Reject أو Draft",
   "7. لو Reject أو Draft الطالب يعدل تسجيله ويعيد الإرسال",
   "8. بعد الموافقة التسجيل يظهر في الجدول (Study Timetable) ويجيله إيميل تأكيد"
  ],
  "hubTips": [
   "لو ظهر Conflict بين سكشنين، غير المجموعة أو اليوم من Add Sessions أو Reset Sessions",
   "لازم تختار كل أجزاء المادة (محاضرة وسكشن ولاب) وإلا تطلع رسالة Please select all required parts",
   "في Registration Simulation تقدر تجرب قبل التسجيل الفعلي"
  ],
  "problems": {
   "system": "ابعت إيميل بسكرينشوت لإدارة النظام",
   "financial": "الشؤون المالية في مبنى القبول",
   "sections": "لجنة الجداول أو Registration Simulation"
  }
 },
 "standing": {
  "academicWarning": "CGPA أقل من 2.00 في نهاية أي فصل أساسي = إنذار أكاديمي، ومينفعش تسجل أكتر من 14 ساعة لحد ما ترفع. إنذار تاني ما تسجلش فيه إلا الحد الأدنى",
  "dismissal": "فصل من الدراسة لو CGPA أقل من 2.00 لست فصول متتالية (الصيفي مش بيتحسب). الفصل برضه لو انقطعت فصلين أساسيين متتاليين بدون عذر (لائحة 2025)",
  "lastChance2025": "مجلس الكلية ممكن يدي فرصة واحدة أخيرة مدتها فصلين أساسيين لرفع CGPA إلى 2.00 وتحقيق شروط التخرج",
  "causes": "أسباب أكاديمية (يتعامل معها الإرشاد الأكاديمي) أو نفسية واجتماعية (وحدة الدعم الطلابي)",
  "fourYearTrack2025": "مسار 4 سنوات: CGPA 3.0 فأكثر في العام الصفري، وإنهاء 32 ساعة في الخريف والربيع و8 ساعات في الصيفي. الحد الأقصى للعبء 21 ساعة. لو CGPA نزل عن 3.00 يتحول للمسار العادي"
 },
 "requirements": {
  "universityMandatory": [
   {
    "code": "CSE 021",
    "name": "Computer Skills",
    "hrs": 2
   },
   {
    "code": "HUM 011",
    "name": "English Language",
    "hrs": 2
   },
   {
    "code": "HUM 025",
    "name": "Human Rights",
    "hrs": 1
   },
   {
    "code": "HUM 051",
    "name": "History of Engineering and Technology",
    "hrs": 1
   },
   {
    "code": "HUM 052",
    "name": "Water, Energy and Climate Change Issues",
    "hrs": 2
   },
   {
    "code": "HUM 151",
    "name": "Professional Ethics",
    "hrs": 1
   }
  ],
  "universityMandatoryTotal": 9,
  "universityElectiveA": {
   "pick": "2 ساعات",
   "courses": [
    "German language",
    "Music Appreciation",
    "Introduction to the History of Civilizations",
    "Arabic and Islamic Civilization",
    "Communication and Presentation Skills",
    "Analysis and Research Skills"
   ]
  },
  "universityElectiveB": {
   "pick": "2 ساعات",
   "courses": [
    "Arabic Language",
    "Introduction to Accounting",
    "Negotiation Skills",
    "Recent Egypt's History",
    "Heritage of Egyptian Literature",
    "Psychology",
    "Entrepreneurship"
   ]
  },
  "universityTotal": 13,
  "facultyMandatoryTotal": 35,
  "facultyMandatoryCodes": [
   "BAS 011",
   "BAS 012",
   "BAS 021",
   "BAS 022",
   "BAS 031",
   "BAS 032",
   "BAS 041",
   "BAS 111",
   "BAS 112",
   "BAS 113",
   "BAS 211",
   "DME 011",
   "DME 021",
   "DME 331"
  ],
  "facultyElective3hrs": [
   {
    "code": "ARC 111",
    "name": "Arts and Architecture",
    "pre": null,
    "notFor": "المعمارية"
   },
   {
    "code": "CIV 113",
    "name": "Principles of Construction and Building Engineering",
    "pre": null,
    "notFor": "المدنية"
   },
   {
    "code": "CIV 369",
    "name": "Environmental Impact of Projects",
    "pre": null
   },
   {
    "code": "DME 122",
    "name": "Principles of Design and Manufacturing Engineering",
    "pre": null
   },
   {
    "code": "DME 332",
    "name": "Engineering Economics",
    "pre": null
   },
   {
    "code": "DME 333",
    "name": "Monitoring and Quality Control Systems",
    "pre": null
   },
   {
    "code": "EPE 111",
    "name": "Principles of Electrical and Electronic Engineering",
    "pre": "BAS 022",
    "notFor": "الكهربية"
   },
   {
    "code": "MPE 141",
    "name": "Technical Report Writing",
    "pre": "HUM 011"
   },
   {
    "code": "MPE 142",
    "name": "Principles of Mechanical Power Engineering",
    "pre": "BAS 022",
    "notFor": "الميكانيكية"
   }
  ],
  "fieldTraining2025": "تدريب ميداني 1 و2 (48 ساعة تدريب لكل واحد، بدون ساعات معتمدة). الأول بعد إتمام 60 ساعة معتمدة، والتاني بعد 90 ساعة. لائحة 2018: بعد 70 و105 ساعة",
  "project2025": "مشروع تخرج 1 (2 ساعة) و2 (4 ساعات). لازم تكون خلصت 112 ساعة وتدريب 1 و2. لائحة 2018: 120 ساعة شاملة ليفل 0 و1 و2",
  "levelZeroSemesterHours": "فصل 1 = 16 ساعة، فصل 2 = 16 ساعة"
 },
 "advisingUnit": {
  "head": "د. أسماء أحمد البهلول، مدير وحدة الإرشاد الأكاديمي بالكلية",
  "coordinators": [
   "د. أسماء البهلول: ميكاترونكس ورئيس الوحدة",
   "د. عادل محمد سليمان: الاتصالات والإلكترونيات",
   "د. نيفين إسماعيل محمود: عمارة وعمارة مستدامة",
   "د. أمنية محمد عمارة: الهندسة المدنية",
   "د. مي أحمد خالد: العلوم الأساسية (ليفل 0)",
   "د. سماح عادل جميل: حاسبات ونظم وذكاء اصطناعي",
   "د. يارا عبد الله سلطان: الكهربية والطبية",
   "م.م. منى إسماعيل: مساعد منسق الإرشاد بالكلية",
   "م.م. رنا عبد الحميد وم. عبدالرحمن عطا: متابعة الإرشاد"
  ],
  "roles": [
   "توزيع الطلاب على المرشدين بعدالة وبتنوع المستويات",
   "متابعة مواعيد التسجيل والحذف والإضافة والانسحاب",
   "رصد المتعثرين (GPA أقل من 2) وعمل Action Plan وإنذار الطالب وولي الأمر",
   "جلسة إرشاد مع كل طالب قبل التسجيل وفق Course Index وDepartment Tree",
   "تعريف الطلاب الجدد باللوائح ونظام الساعات المعتمدة ومساعدتهم في اختيار التخصص",
   "الحالات النفسية والاجتماعية تتحول لوحدة الدعم الطلابي"
  ],
  "studentFile": "ملف الطالب: Registration form وAction Plan (نسختين) وDepartment Tree وصورة الإقرارات ونموذج الإرشاد. ونسخة إلكترونية على OneDrive فيها Time Table وTranscript"
 },
 "programs2025": [
  "العمارة",
  "المدنية",
  "الاتصالات والإلكترونيات",
  "الميكاترونكس",
  "العمارة المستدامة",
  "القوى الكهربية",
  "الحاسبات والنظم",
  "الذكاء الاصطناعي",
  "الطبية الحيوية"
 ],
 "plans": {
  "note": "verified only where flagged; CCE/BME have no level in source images; ECE L3 split uncertain",
  "level0": {
   "sem1": [
    {
     "code": "BAS 011",
     "name": "Math 1",
     "hrs": 3,
     "pre": []
    },
    {
     "code": "BAS 021",
     "name": "Physics 1",
     "hrs": 3,
     "pre": []
    },
    {
     "code": "BAS 031",
     "name": "Mechanics 1",
     "hrs": 2,
     "pre": []
    },
    {
     "code": "CSE 021",
     "name": "Computer Skills",
     "hrs": 2,
     "pre": []
    },
    {
     "code": "DME 011",
     "name": "Eng Drawing & Projection",
     "hrs": 3,
     "pre": []
    },
    {
     "code": "HUM 011",
     "name": "English",
     "hrs": 2,
     "pre": []
    },
    {
     "code": "HUM 051",
     "name": "History of Eng & Tech",
     "hrs": 1,
     "pre": []
    }
   ],
   "sem2": [
    {
     "code": "BAS 012",
     "name": "Math 2",
     "hrs": 3,
     "pre": [
      "BAS 011"
     ]
    },
    {
     "code": "BAS 022",
     "name": "Physics 2",
     "hrs": 3,
     "pre": [
      "BAS 021"
     ]
    },
    {
     "code": "BAS 032",
     "name": "Mechanics 2",
     "hrs": 2,
     "pre": [
      "BAS 031"
     ]
    },
    {
     "code": "BAS 041",
     "name": "Chemistry",
     "hrs": 3,
     "pre": []
    },
    {
     "code": "DME 021",
     "name": "Principles of Manufacturing",
     "hrs": 2,
     "pre": []
    },
    {
     "code": "HUM 052",
     "name": "Water/Energy/Climate",
     "hrs": 2,
     "pre": []
    },
    {
     "code": "HUM 025",
     "name": "Human Rights",
     "hrs": 1,
     "pre": []
    }
   ],
   "total": 32,
   "verified": true
  },
  "ece": [
   {
    "code": "BAS 011",
    "name": "Mathematics 1",
    "hrs": 3,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 021",
    "name": "Physics 1",
    "hrs": 3,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 031",
    "name": "Mechanics 1",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "CSE 021",
    "name": "Computer Skills",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "DME 011",
    "name": "Engineering Drawing and Projection",
    "hrs": 3,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "HUM 011",
    "name": "English Language",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "HUM 051",
    "name": "History of Engineering and Technology",
    "hrs": 1,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 012",
    "name": "Mathematics 2",
    "hrs": 3,
    "pre": [
     "BAS 011"
    ],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 022",
    "name": "Physics 2",
    "hrs": 3,
    "pre": [
     "BAS 021"
    ],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 032",
    "name": "Mechanics 2",
    "hrs": 2,
    "pre": [
     "BAS 031"
    ],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 041",
    "name": "Engineering Chemistry",
    "hrs": 3,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "DME 021",
    "name": "Principles of Manufacturing Engineering",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "HUM 052",
    "name": "Water, Energy and Climate Change Issues",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "HUM 025",
    "name": "Human Rights",
    "hrs": 1,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 111",
    "name": "Mathematics 3",
    "hrs": 3,
    "pre": [
     "BAS 012"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "HUM 151",
    "name": "Professional Ethics",
    "hrs": 1,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "EPE 112",
    "name": "Electrical Circuits 1",
    "hrs": 3,
    "pre": [
     "BAS 022"
    ],
    "level": 1,
    "type": "Discipline"
   },
   {
    "code": "EPE 113",
    "name": "Electrical Measurements",
    "hrs": 2,
    "pre": [
     "BAS 022"
    ],
    "level": 1,
    "type": null
   },
   {
    "code": "CSE 121",
    "name": "Computer Programming",
    "hrs": 3,
    "pre": [
     "CSE 021"
    ],
    "level": 1,
    "type": "Discipline"
   },
   {
    "code": "ECE 111",
    "name": "Electronics 1",
    "hrs": 3,
    "pre": [],
    "level": 1,
    "type": "Disciplinary"
   },
   {
    "code": "BAS 112",
    "name": "Mathematics 4",
    "hrs": 2,
    "pre": [
     "BAS 111"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "BAS 113",
    "name": "Statistics and Probability Theory",
    "hrs": 2,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CSE 122",
    "name": "Data Structures and algorithms",
    "hrs": 2,
    "pre": [
     "CSE 121"
    ],
    "level": 1,
    "type": "Discipline"
   },
   {
    "code": "ECE 112",
    "name": "Electronics 2",
    "hrs": 3,
    "pre": [
     "ECE 111"
    ],
    "level": 1,
    "type": null
   },
   {
    "code": "EPE 114",
    "name": "Electrical Circuits 2",
    "hrs": 3,
    "pre": [
     "EPE 112"
    ],
    "level": 1,
    "type": null
   },
   {
    "code": "EPE 151",
    "name": "Electromagnetics",
    "hrs": 3,
    "pre": [
     "BAS 022"
    ],
    "level": 1,
    "type": null
   },
   {
    "code": "BAS 211",
    "name": "Numerical Methods and Operation Research",
    "hrs": 2,
    "pre": [
     "BAS 112"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "AIE 211",
    "name": "Fundamentals of Artificial Intelligence",
    "hrs": 3,
    "pre": [
     "CSE 121"
    ],
    "level": 2,
    "type": "Discipline"
   },
   {
    "code": "CSE 231",
    "name": "Digital and Logic Circuits",
    "hrs": 3,
    "pre": [],
    "level": 2,
    "type": "Discipline"
   },
   {
    "code": "ECE 211",
    "name": "Electronic Devices",
    "hrs": 3,
    "pre": [
     "ECE 112"
    ],
    "level": 2,
    "type": null
   },
   {
    "code": "ECE 221",
    "name": "Signal and Systems",
    "hrs": 3,
    "pre": [
     "BAS 111"
    ],
    "level": 2,
    "type": null
   },
   {
    "code": "BAS 212",
    "name": "Mathematics 5",
    "hrs": 3,
    "pre": [
     "BAS 112"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CSE 222",
    "name": "Computer System Security",
    "hrs": 3,
    "pre": [
     "CSE 122"
    ],
    "level": 2,
    "type": "Discipline"
   },
   {
    "code": "CSE 211",
    "name": "Automatic Control Systems",
    "hrs": 3,
    "pre": [
     "BAS 111"
    ],
    "level": 2,
    "type": "Discipline"
   },
   {
    "code": "ECE 231",
    "name": "Communication Theory",
    "hrs": 3,
    "pre": [
     "ECE 221"
    ],
    "level": 2,
    "type": null
   },
   {
    "code": "AIE 221",
    "name": "Introduction to Machine Learning",
    "hrs": 3,
    "pre": [
     "CSE 121"
    ],
    "level": 2,
    "type": "Discipline"
   },
   {
    "code": "DME 331",
    "name": "Project Management",
    "hrs": 2,
    "pre": [],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CSE 333",
    "name": "Microprocessor",
    "hrs": 3,
    "pre": [
     "CSE 231"
    ],
    "level": 3,
    "type": "Discipline"
   },
   {
    "code": "ECE 351",
    "name": "Information Security",
    "hrs": 2,
    "pre": [
     "CSE 222"
    ],
    "level": 3,
    "type": null
   },
   {
    "code": "ECE 331",
    "name": "Digital Communications",
    "hrs": 3,
    "pre": [
     "ECE 231"
    ],
    "level": null,
    "type": "Major"
   },
   {
    "code": "AIE 341",
    "name": "Introduction to Vision and Robotics",
    "hrs": 3,
    "pre": [
     "CSE 211"
    ],
    "level": 3,
    "type": "Discipline"
   },
   {
    "code": "ECE 311",
    "name": "Electronics Engineering",
    "hrs": 2,
    "pre": [
     "ECE 112"
    ],
    "level": 3,
    "type": null
   },
   {
    "code": "ECE 341",
    "name": "Electromagnetic Waves",
    "hrs": 3,
    "pre": [
     "EPE 151"
    ],
    "level": 3,
    "type": null
   },
   {
    "code": "ECE 321",
    "name": "Digital Signal Processing",
    "hrs": 3,
    "pre": [
     "ECE 221"
    ],
    "level": 3,
    "type": null
   },
   {
    "code": "ECE 312",
    "name": "Optoelectronics",
    "hrs": 3,
    "pre": [
     "ECE 112"
    ],
    "level": 3,
    "type": null
   },
   {
    "code": "ECE 342",
    "name": "Antenna and Wave Propagation",
    "hrs": 3,
    "pre": [
     "EPE 151"
    ],
    "level": 3,
    "type": null
   },
   {
    "code": "ECE 441",
    "name": "Microwave Engineering and Arrays",
    "hrs": 3,
    "pre": [
     "EPE 151"
    ],
    "level": 4,
    "type": null
   },
   {
    "code": "ECE 431",
    "name": "Optical Communications",
    "hrs": 3,
    "pre": [
     "ECE 312"
    ],
    "level": 4,
    "type": null
   },
   {
    "code": "CSE 412",
    "name": "Embedded Systems",
    "hrs": 3,
    "pre": [
     "CSE 333"
    ],
    "level": 4,
    "type": "Discipline"
   },
   {
    "code": "ECE 451",
    "name": "AI in Communication Systems",
    "hrs": 2,
    "pre": [
     "AIE 211"
    ],
    "level": 4,
    "type": "Major"
   },
   {
    "code": "ECE 461",
    "name": "Project 1",
    "hrs": 2,
    "pre": [
     "112 credit hrs"
    ],
    "level": 4,
    "type": null
   },
   {
    "code": "ECE 432",
    "name": "Mobile Communications",
    "hrs": 3,
    "pre": [
     "ECE 331"
    ],
    "level": 4,
    "type": null
   },
   {
    "code": "ECE 411",
    "name": "Integrated Circuits Design",
    "hrs": 3,
    "pre": [
     "ECE 311"
    ],
    "level": 4,
    "type": null
   },
   {
    "code": "ECE 462",
    "name": "Project 2",
    "hrs": 4,
    "pre": [
     "ECE 461"
    ],
    "level": 4,
    "type": null
   },
   {
    "code": "HUM x13",
    "name": "German Language",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x62",
    "name": "Music Appreciation",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x71",
    "name": "Introduction to the History of Civilizations",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x75",
    "name": "Arabic and Islamic Civilization",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x81",
    "name": "Communication and Presentation Skills",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x82",
    "name": "Analysis and Research Skills",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x11",
    "name": "Arabic Language",
    "hrs": 1,
    "pre": [],
    "level": 0,
    "type": "Elective"
   },
   {
    "code": "HUM x21",
    "name": "Introduction to Accounting",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x22",
    "name": "Negotiation Skills",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x73",
    "name": "Recent Egypt’s History",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x74",
    "name": "Heritage of Egyptian Literature",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x83",
    "name": "Psychology",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x91",
    "name": "Entrepreneurship",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "ARC 111",
    "name": "Arts and Architecture",
    "hrs": 1,
    "pre": [],
    "level": 1,
    "type": "Elective"
   },
   {
    "code": "CIV 369",
    "name": "Environmental Impact of Projects",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "DME 122",
    "name": "Principles of Design and Manufacturing Engineering",
    "hrs": 1,
    "pre": [],
    "level": 1,
    "type": "Elective"
   },
   {
    "code": "DME 332",
    "name": "Engineering Economics",
    "hrs": 1,
    "pre": [],
    "level": 3,
    "type": "Elective"
   },
   {
    "code": "DME 333",
    "name": "Monitoring and Quality Control Systems",
    "hrs": 1,
    "pre": [],
    "level": 3,
    "type": "Elective"
   },
   {
    "code": "MPE 141",
    "name": "Technical Report Writing",
    "hrs": 1,
    "pre": [
     "HUM 011"
    ],
    "level": 1,
    "type": "General"
   },
   {
    "code": "MPE 142",
    "name": "Principles of Mechanical Power Engineering",
    "hrs": 1,
    "pre": [
     "BAS 022"
    ],
    "level": 1,
    "type": "Elective"
   },
   {
    "code": "ECE X33",
    "name": "Satellite Communications",
    "hrs": 3,
    "pre": [
     "ECE 331"
    ],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "ECE X35",
    "name": "Telephony Systems",
    "hrs": 3,
    "pre": [
     "ECE 231"
    ],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "ECE X21",
    "name": "Acoustics",
    "hrs": 3,
    "pre": [
     "ECE 221"
    ],
    "level": 3,
    "type": "Elective"
   },
   {
    "code": "ECE X34",
    "name": "RADAR Systems",
    "hrs": 3,
    "pre": [
     "EPE 151"
    ],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "ECE X12",
    "name": "VLSI Technology",
    "hrs": 3,
    "pre": [
     "ECE 311"
    ],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "ECE X14",
    "name": "Automotive Electronics",
    "hrs": 3,
    "pre": [
     "ECE 211"
    ],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "ECE X13",
    "name": "Medical Electronics",
    "hrs": 3,
    "pre": [
     "ECE 112"
    ],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "ECE X52",
    "name": "Information and Coding Theory",
    "hrs": 3,
    "pre": [
     "BAS 111"
    ],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "XXX 291",
    "name": "Field Training 1",
    "hrs": null,
    "pre": [
     "60 credit hrs"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "XXX 391",
    "name": "Field Training 2",
    "hrs": null,
    "pre": [
     "90 credit hrs"
    ],
    "level": 3,
    "type": "Compulsory"
   }
  ],
  "civil": [
   {
    "code": "BAS 011",
    "name": "Mathematics 1",
    "hrs": 3,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 012",
    "name": "Mathematics 2",
    "hrs": 3,
    "pre": [
     "BAS 011"
    ],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 021",
    "name": "Physics 1",
    "hrs": 3,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 022",
    "name": "Physics 2",
    "hrs": 3,
    "pre": [
     "BAS 021"
    ],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 031",
    "name": "Mechanics 1",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 032",
    "name": "Mechanics 2",
    "hrs": 2,
    "pre": [
     "BAS 031"
    ],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 041",
    "name": "Engineering Chemistry",
    "hrs": 3,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "BAS 111",
    "name": "Mathematics 3",
    "hrs": 3,
    "pre": [
     "BAS 012"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "BAS 112",
    "name": "Mathematics 4",
    "hrs": 2,
    "pre": [
     "BAS 111"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "BAS 113",
    "name": "Statistics and Probability Theory",
    "hrs": 2,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "BAS 211",
    "name": "Numerical Methods and Operation Research",
    "hrs": 2,
    "pre": [],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "HUM 011",
    "name": "English Language",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "HUM 025",
    "name": "Human Rights",
    "hrs": 1,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "HUM 051",
    "name": "History of Engineering and Technology",
    "hrs": 1,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "HUM 052",
    "name": "Water, Energy and Climate Change Issues",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "HUM 151",
    "name": "Professional Ethics",
    "hrs": 1,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "HUM x11",
    "name": "Arabic Language",
    "hrs": 1,
    "pre": [],
    "level": 0,
    "type": "Elective"
   },
   {
    "code": "HUM x13",
    "name": "German Language",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x21",
    "name": "Introduction to Accounting",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x22",
    "name": "Negotiation Skills",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x62",
    "name": "Music Appreciation",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x71",
    "name": "Introduction to the History of Civilizations",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x73",
    "name": "Recent Egypt’s History",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x74",
    "name": "Heritage of Egyptian Literature",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x75",
    "name": "Arabic and Islamic Civilization",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x81",
    "name": "Communication and Presentation Skills",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x82",
    "name": "Analysis and Research Skills",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x83",
    "name": "Psychology",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "HUM x91",
    "name": "Entrepreneurship",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "CIV 111",
    "name": "Structural Analysis 1",
    "hrs": 3,
    "pre": [
     "BAS 031"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CIV 112",
    "name": "Structure Mechanics",
    "hrs": 3,
    "pre": [
     "CIV 111"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CIV 141",
    "name": "Behavior of Materials",
    "hrs": 3,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CIV 161",
    "name": "Engineering Surveying 1",
    "hrs": 3,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CIV 162",
    "name": "Engineering Surveying 2",
    "hrs": 3,
    "pre": [
     "CIV 161"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CIV 171",
    "name": "Hydraulics 1",
    "hrs": 2,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CIV 181",
    "name": "Civil Drawing",
    "hrs": 3,
    "pre": [
     "DME 011"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CIV 211",
    "name": "Structural Analysis 2",
    "hrs": 3,
    "pre": [
     "CIV 111"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 212",
    "name": "Structural Analysis 3",
    "hrs": 3,
    "pre": [
     "CIV 211"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 213",
    "name": "Computer Applications in Civil Engineering",
    "hrs": 2,
    "pre": [
     "CIV 111"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 221",
    "name": "Design of Concrete Structures 1",
    "hrs": 3,
    "pre": [
     "CIV 111",
     "CIV 241"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 231",
    "name": "Design of Steel Structures 1",
    "hrs": 3,
    "pre": [
     "CIV 112"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 241",
    "name": "Concrete Technology",
    "hrs": 3,
    "pre": [
     "CIV 141"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 251",
    "name": "Soil Mechanics",
    "hrs": 3,
    "pre": [],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 281",
    "name": "Hydrology",
    "hrs": 2,
    "pre": [],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 282",
    "name": "Irrigation and Drainage Engineering",
    "hrs": 3,
    "pre": [
     "CIV 281",
     "CIV 171"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 321",
    "name": "Design of Concrete Structures 2",
    "hrs": 3,
    "pre": [
     "CIV 221"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 322",
    "name": "Design of Concrete Structures 3",
    "hrs": 3,
    "pre": [
     "CIV 321"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 323",
    "name": "Earthquake Engineering",
    "hrs": 2,
    "pre": [
     "CIV 251"
    ],
    "level": 3,
    "type": "Department"
   },
   {
    "code": "CIV 331",
    "name": "Design of Steel Structures 2",
    "hrs": 3,
    "pre": [
     "CIV 231"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 332",
    "name": "Design of Composite Steel Structures",
    "hrs": 2,
    "pre": [
     "CIV 331"
    ],
    "level": 3,
    "type": "Department"
   },
   {
    "code": "CIV 341",
    "name": "Quality Control in Structures",
    "hrs": 2,
    "pre": [],
    "level": 3,
    "type": "Department"
   },
   {
    "code": "CIV 351",
    "name": "Foundations Engineering 1",
    "hrs": 3,
    "pre": [
     "CIV 251",
     "CIV 221"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 352",
    "name": "Engineering Geology",
    "hrs": 2,
    "pre": [],
    "level": 3,
    "type": "Department"
   },
   {
    "code": "CIV 361",
    "name": "Quantities Surveying and Costs Estimating",
    "hrs": 2,
    "pre": [],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 362",
    "name": "Transportation and Traffic Engineering",
    "hrs": 3,
    "pre": [],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 363",
    "name": "Highway and Airport Engineering",
    "hrs": 3,
    "pre": [],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 364",
    "name": "Sanitary Engineering",
    "hrs": 3,
    "pre": [
     "CIV 371"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 365",
    "name": "Pavement Design",
    "hrs": 2,
    "pre": [
     "CIV 363"
    ],
    "level": 3,
    "type": "Department"
   },
   {
    "code": "CIV 366",
    "name": "Maintenance of Highways",
    "hrs": 2,
    "pre": [
     "CIV 363"
    ],
    "level": 3,
    "type": "Department"
   },
   {
    "code": "CIV 367",
    "name": "Environmental Engineering",
    "hrs": 2,
    "pre": [],
    "level": 3,
    "type": "Department"
   },
   {
    "code": "CIV 368",
    "name": "Sewage Water Treatment",
    "hrs": 2,
    "pre": [],
    "level": 3,
    "type": "Department"
   },
   {
    "code": "CIV 371",
    "name": "Hydraulics 2",
    "hrs": 3,
    "pre": [
     "CIV 171"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 411",
    "name": "Structural Dynamics",
    "hrs": 3,
    "pre": [
     "CIV 211"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 421",
    "name": "Design of Concrete Structures 4",
    "hrs": 3,
    "pre": [
     "CIV 322"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 422",
    "name": "High Rise Buildings",
    "hrs": 3,
    "pre": [
     "CIV 111",
     "CIV 221"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 431",
    "name": "Design of Steel Bridges",
    "hrs": 3,
    "pre": [
     "CIV 331"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 441",
    "name": "Repair and Strengthening of Structures",
    "hrs": 3,
    "pre": [
     "CIV 221",
     "CIV 241"
    ],
    "level": 3,
    "type": "Department"
   },
   {
    "code": "CIV 451",
    "name": "Foundations Engineering 2",
    "hrs": 3,
    "pre": [
     "CIV 351"
    ],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "CIV 452",
    "name": "Soil Improvement",
    "hrs": 3,
    "pre": [
     "CIV 351"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 461",
    "name": "Construction Project Management",
    "hrs": 3,
    "pre": [],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "CIV 462",
    "name": "Construction Equipment and Methods",
    "hrs": 3,
    "pre": [],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "CIV 463",
    "name": "Maps, GIS and Remote Sensing",
    "hrs": 3,
    "pre": [
     "CIV 162"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 464",
    "name": "Hydrographic Surveying",
    "hrs": 3,
    "pre": [
     "CIV 162"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 465",
    "name": "Railway Engineering",
    "hrs": 3,
    "pre": [],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 471",
    "name": "Applied Hydraulics",
    "hrs": 2,
    "pre": [
     "CIV 371"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 472",
    "name": "Harbor and Coastal Engineering",
    "hrs": 3,
    "pre": [],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 481",
    "name": "Design of Irrigation Structures",
    "hrs": 3,
    "pre": [
     "CIV 282",
     "CIV 371"
    ],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "CIV 482",
    "name": "Groundwater Hydrology",
    "hrs": 2,
    "pre": [
     "CIV 281"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 483",
    "name": "Computer Applications in Water Resources",
    "hrs": 3,
    "pre": [
     "CIV 371"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 484",
    "name": "Dams Engineering",
    "hrs": 3,
    "pre": [
     "CIV 481"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 485",
    "name": "Modern Irrigation Systems",
    "hrs": 3,
    "pre": [
     "CIV 282"
    ],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 486",
    "name": "Water Resources Management",
    "hrs": 3,
    "pre": [],
    "level": 4,
    "type": "Department"
   },
   {
    "code": "CIV 491",
    "name": "Project 1",
    "hrs": 2,
    "pre": [
     "112 credit hrs"
    ],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "CIV 492",
    "name": "Project 2",
    "hrs": 4,
    "pre": [
     "CIV 491"
    ],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "ARC 111",
    "name": "Arts and Architecture",
    "hrs": 1,
    "pre": [],
    "level": 1,
    "type": "Elective"
   },
   {
    "code": "ARC 133",
    "name": "Building Materials and Construction",
    "hrs": 2,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CIV 369",
    "name": "Environmental Impact of Projects",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "CSE 021",
    "name": "Computer Skills",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "DME 011",
    "name": "Engineering Drawing and Projection",
    "hrs": 3,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "DME 021",
    "name": "Principles of Manufacturing Engineering",
    "hrs": 2,
    "pre": [],
    "level": 0,
    "type": "Compulsory"
   },
   {
    "code": "DME 122",
    "name": "Principles of Design and Manufacturing Engineering",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "DME 331",
    "name": "Project Management",
    "hrs": 2,
    "pre": [],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "DME 332",
    "name": "Engineering Economics",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "DME 333",
    "name": "Monitoring and Quality Control Systems",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "EPE 111",
    "name": "Principles of Electrical and Electronic Engineering",
    "hrs": 1,
    "pre": [],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "MPE 141",
    "name": "Technical Report Writing",
    "hrs": 1,
    "pre": [
     "HUM 011"
    ],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "MPE 142",
    "name": "Principles of Mechanical Power Engineering",
    "hrs": 1,
    "pre": [
     "BAS 022"
    ],
    "level": null,
    "type": "Elective"
   },
   {
    "code": "XXX 291",
    "name": "Field Training 1",
    "hrs": null,
    "pre": [
     "60 credit hrs"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "XXX 391",
    "name": "Field Training 2",
    "hrs": null,
    "pre": [
     "90 credit hrs"
    ],
    "level": 3,
    "type": "Compulsory"
   }
  ],
  "arch": [
   {
    "code": "ARC 112",
    "name": "Visual Representation",
    "hrs": 3,
    "pre": [
     "DME 011"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "ARC 113",
    "name": "Perspective and Model Making",
    "hrs": 3,
    "pre": [
     "ARC 112"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "ARC 121",
    "name": "Fundamentals of Architecture Design",
    "hrs": 3,
    "pre": [
     "DME 011"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "ARC 122",
    "name": "Architecture Design Studio 1",
    "hrs": 3,
    "pre": [
     "ARC 121"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "ARC 131",
    "name": "Building Materials and Construction 1",
    "hrs": 3,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "ARC 132",
    "name": "Building Materials and Construction 2",
    "hrs": 3,
    "pre": [
     "ARC 131"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "ARC 141",
    "name": "History of Architecture 1",
    "hrs": 2,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "ARC 142",
    "name": "Theory of Architecture 1",
    "hrs": 2,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "ARC 143",
    "name": "Theory of Architecture 2",
    "hrs": 2,
    "pre": [
     "ARC 142"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "CIV 111",
    "name": "Structural Analysis 1",
    "hrs": 3,
    "pre": [
     "BAS 031"
    ],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "SAE 181",
    "name": "Introduction to Sustainability",
    "hrs": 2,
    "pre": [],
    "level": 1,
    "type": "Compulsory"
   },
   {
    "code": "ARC 221",
    "name": "Architecture Design Studio 2",
    "hrs": 3,
    "pre": [
     "ARC 122"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "ARC 222",
    "name": "Architecture Design Studio 3",
    "hrs": 3,
    "pre": [
     "ARC 221"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "ARC 231",
    "name": "Building Materials and Construction 3",
    "hrs": 3,
    "pre": [
     "ARC 132"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "ARC 232",
    "name": "Working Design 1",
    "hrs": 3,
    "pre": [
     "ARC 231"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "ARC 241",
    "name": "History of Architecture 2",
    "hrs": 2,
    "pre": [
     "ARC 141"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "ARC 242",
    "name": "Theory of Architecture 3",
    "hrs": 2,
    "pre": [
     "ARC 143"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "ARC 251",
    "name": "Computer Modeling 1",
    "hrs": 3,
    "pre": [],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "ARC 261",
    "name": "History and Theory of Urban Planning",
    "hrs": 2,
    "pre": [],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "ARC 262",
    "name": "Introduction to Urban Planning",
    "hrs": 2,
    "pre": [],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "BAS 211",
    "name": "Numerical Methods and Operation Research",
    "hrs": 2,
    "pre": [],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 141",
    "name": "Behavior of Materials",
    "hrs": 3,
    "pre": [],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 163",
    "name": "Engineering Surveying for Architect",
    "hrs": 2,
    "pre": [],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "CIV 222",
    "name": "Reinforced Concrete and Foundations",
    "hrs": 2,
    "pre": [
     "CIV 111"
    ],
    "level": 2,
    "type": "Compulsory"
   },
   {
    "code": "ARC 321",
    "name": "Architecture Design Studio 4",
    "hrs": 3,
    "pre": [
     "ARC 222"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "ARC 331",
    "name": "Working Design 2",
    "hrs": 3,
    "pre": [
     "ARC 232"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "ARC 361",
    "name": "Landscape Design",
    "hrs": 3,
    "pre": [
     "ARC 262"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "CIV 232",
    "name": "Steel Structures",
    "hrs": 2,
    "pre": [
     "CIV 111"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "ARC 351",
    "name": "Computer Modeling 2",
    "hrs": 3,
    "pre": [
     "ARC 251"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "ARC 322",
    "name": "Architecture Design Studio 5",
    "hrs": 3,
    "pre": [
     "ARC 321"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "ARC 332",
    "name": "Estimation, Costing, and Specifications",
    "hrs": 2,
    "pre": [
     "ARC 232"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "ARC 362",
    "name": "Urban Design",
    "hrs": 3,
    "pre": [
     "ARC 361"
    ],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "ARC 421",
    "name": "Architecture Design Studio 6",
    "hrs": 3,
    "pre": [
     "ARC 322"
    ],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "ARC 491",
    "name": "Project 1",
    "hrs": 1,
    "pre": [
     "ARC 322"
    ],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "ARC 471",
    "name": "Interior Design",
    "hrs": 3,
    "pre": [],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "ARC 492",
    "name": "Project 2",
    "hrs": 5,
    "pre": [
     "ARC 491"
    ],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "ARC 431",
    "name": "Water Supply and Building Sanitation",
    "hrs": 1,
    "pre": [
     "ARC 332"
    ],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "ARC 461",
    "name": "Architectural and Urban Legalization",
    "hrs": 2,
    "pre": [],
    "level": 4,
    "type": "Compulsory"
   },
   {
    "code": "ARC x72",
    "name": "Lighting and Ventilation",
    "hrs": 3,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "ARC x51",
    "name": "Geometric Modeling",
    "hrs": 3,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "ARC x63",
    "name": "Residential planning and Housing",
    "hrs": 3,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "ARC x64",
    "name": "Urban Renewal",
    "hrs": 3,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "ARC x52",
    "name": "Smart Building Information Systems",
    "hrs": 3,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "ARC x81",
    "name": "Conservation of Urban Heritage",
    "hrs": 3,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "SAE x31",
    "name": "Advanced Building Systems Integration",
    "hrs": 2,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "SAE x41",
    "name": "Vernacular Architecture",
    "hrs": 2,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "SAE x42",
    "name": "Introduction to Shape Grammars",
    "hrs": 2,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "SAE x51",
    "name": "Acoustics design",
    "hrs": 2,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "SAE x81",
    "name": "Sustainable and Smart Architecture",
    "hrs": 2,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "SAE x82",
    "name": "Sustainable Building Construction and Materials",
    "hrs": 2,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "SAE x83",
    "name": "Thermal Comfort Measures",
    "hrs": 2,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "SAE x84",
    "name": "Thermal properties of materials",
    "hrs": 2,
    "pre": [],
    "level": null,
    "type": "Major"
   },
   {
    "code": "BAS 113",
    "name": "Statistics and Probability Theory",
    "hrs": 2,
    "pre": [],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "DME 331",
    "name": "Project Management",
    "hrs": 2,
    "pre": [],
    "level": 3,
    "type": "Compulsory"
   },
   {
    "code": "XXX 291",
    "name": "Field Training 1",
    "hrs": null,
    "pre": [
     "60 credit hrs"
    ],
    "level": 2,
    "type": "Elective"
   },
   {
    "code": "XXX 391",
    "name": "Field Training 2",
    "hrs": null,
    "pre": [
     "90 credit hrs"
    ],
    "level": 3,
    "type": "Compulsory"
   }
  ],
  "missing": [
   "EPE",
   "AI",
   "MPE",
   "SAE"
  ]
 }
};
