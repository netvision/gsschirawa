require('dotenv').config();
const mongoose = require('mongoose');
const Faculty = require('./models/Faculty');

const facultyData = [
  {
    name: "डॉ. सीमा सहल",
    designation: "व्याख्याता",
    department: "Hindi Literature",
    experience: "22+ years",
    qualification: "Ph.D., NET",
    description: "डॉ. सीमा सहल 22+ वर्षो का अध्यापन अनुभव रखती हैं। इनका शोध का विषय 'संत कबीर के साहित्य की वर्तमान प्रासंगिकता' है।",
    achievements: [
      "5 शोध पत्र राष्ट्रीय व अंतर्राष्ट्रीय में प्रकाशित",
      "25+ राष्ट्रीय व अंतर्राष्ट्रीय संगोष्ठियों में सहभागिता",
      "राष्ट्रीय पात्रता परीक्षा (NET) उत्तीर्ण"
    ],
    order: 1,
    isActive: true
  },
  {
    name: "मधुबाला",
    designation: "व्याख्याता",
    department: "Hindi Literature",
    experience: "14+ years",
    qualification: "NET",
    description: "मधुबाला 14+ वर्षो का शिक्षण अनुभव रखती हैं। ये राष्ट्रीय पात्रता परीक्षा (NET) उत्तीर्ण हैं।",
    order: 2,
    isActive: true
  },
  {
    name: "डॉ. अंजू शर्मा",
    designation: "व्याख्याता",
    department: "History",
    experience: "13+ years",
    qualification: "Ph.D.",
    description: "डॉ. अंजू शर्मा 13+ वर्षो का शैक्षिक अनुभव रखती हैं। इनके शोध का विषय 'खेतड़ी ठिकाने का केन्द्रीय शक्तियों के साथ संबंध' रहा हैं।",
    achievements: [
      "5 शोध पत्र विभिन्न राष्ट्रीय व अंतर्राष्ट्रीय पत्रिकाओं में प्रकाशित",
      "कई राष्ट्रीय व अंतर्राष्ट्रीय संगोष्ठियों में सक्रिय रूप से भाग"
    ],
    order: 3,
    isActive: true
  },
  {
    name: "मानसी",
    designation: "व्याख्याता",
    department: "History",
    experience: "2+ years",
    qualification: "NET",
    description: "मानसी 2+ वर्षो का शिक्षण अनुभव रखती हैं। ये राष्ट्रीय पात्रता परीक्षा (NET) उत्तीर्ण हैं।",
    order: 4,
    isActive: true
  },
  {
    name: "मंजू रानी",
    designation: "व्याख्याता",
    department: "Political Science",
    experience: "15+ years",
    qualification: "NET, M.Phil., Ph.D. (pursuing)",
    description: "मंजू रानी 15+ वर्षो का शिक्षण अनुभव रखती हैं। ये राष्ट्रीय पात्रता परीक्षा (NET) उत्तीर्ण है तथा एम. फिल. की डिग्री प्राप्त कर चुकी हैं। वर्तमान में ये पी. एच. डी. अनुसंधान कार्य में संलग्न हैं।",
    achievements: [
      "5 शोध राष्ट्रीय व अंतर्राष्ट्रीय पत्रिकाओं में प्रकाशित",
      "राष्ट्रीय व अंतर्राष्ट्रीय संगोष्ठियों में भाग"
    ],
    order: 5,
    isActive: true
  },
  {
    name: "अवंतिका गौड़",
    designation: "व्याख्याता",
    department: "Political Science",
    experience: "5+ years",
    qualification: "NET",
    description: "अवंतिका गौड़ 5+ वर्षो का अध्यापन अनुभव रखती हैं। ये राष्ट्रीय पात्रता परीक्षा NET उत्तीर्ण हैं।",
    order: 6,
    isActive: true
  },
  {
    name: "सोनू",
    designation: "व्याख्याता",
    department: "Geography",
    qualification: "NET",
    description: "ये राष्ट्रीय पात्रता परीक्षा (NET) उत्तीर्ण हैं।",
    order: 7,
    isActive: true
  },
  {
    name: "निशा",
    designation: "व्याख्याता",
    department: "Geography",
    qualification: "NET",
    description: "ये राष्ट्रीय पात्रता परीक्षा NET उत्तीर्ण हैं।",
    order: 8,
    isActive: true
  },
  {
    name: "मीनाक्षी शर्मा",
    designation: "व्याख्याता",
    department: "Economics",
    experience: "7+ years",
    qualification: "NET, M.Phil.",
    description: "मीनाक्षी शर्मा 7+ वर्षो का शिक्षण अनुभव रखती हैं। ये राष्ट्रीय पात्रता परीक्षा (NET) उत्तीर्ण हैं तथा एम. फिल. की डिग्री प्राप्त कर चुकी हैं।",
    order: 9,
    isActive: true
  },
  {
    name: "संजु सैनी",
    designation: "व्याख्याता",
    department: "Economics",
    experience: "15+ years",
    description: "संजु सैनी 15+ वर्षो का शिक्षण अनुभव रखती हैं। ये 2014 से G.S.S. गर्ल्स पी.जी.कॉलेज, चिड़ावा में पढ़ा रही है।",
    order: 10,
    isActive: true
  },
  {
    name: "पूनम भारद्वाज",
    designation: "व्याख्याता",
    department: "English Literature",
    experience: "5+ years",
    description: "पूनम भारद्वाज 5+ वर्षो का शिक्षण अनुभव रखती हैं। ये राष्ट्रीय व अंतर्राष्ट्रीय संगोष्ठियों में भाग ले चुकी हैं।",
    order: 11,
    isActive: true
  },
  {
    name: "लोकेश कंवर",
    designation: "व्याख्याता",
    department: "English Literature",
    description: "लोकेश कंवर अंग्रेजी साहित्य की एक उत्साही और प्रेरित प्रवक्ता हैं।",
    order: 12,
    isActive: true
  },
  {
    name: "सुमन जांगिड़",
    designation: "व्याख्याता",
    department: "Home Science",
    experience: "6+ years",
    qualification: "SET",
    description: "सुमन जांगिड़ 6+ वर्षो का शिक्षण अनुभव रखती हैं। ये राज्य पात्रता परीक्षा (SET) उत्तीर्ण हैं।",
    order: 13,
    isActive: true
  },
  {
    name: "लक्ष्मी शर्मा",
    designation: "व्याख्याता",
    department: "Sociology",
    experience: "8+ years",
    description: "लक्ष्मी शर्मा 8+ वर्षो का शिक्षण अनुभव रखती हैं। इन्होंने समाजशास्त्र में राजस्थान विश्वविद्यालय से गोल्ड मेडल प्राप्त किया है।",
    achievements: ["राजस्थान विश्वविद्यालय से गोल्ड मेडल"],
    order: 14,
    isActive: true
  },
  {
    name: "ज्योति शर्मा",
    designation: "व्याख्याता",
    department: "Commerce",
    experience: "5+ years",
    qualification: "NET",
    description: "ज्योति शर्मा 5+ वर्षो का शिक्षण अनुभव रखती हैं। ये राष्ट्रीय पात्रता परीक्षा (NET) उत्तीर्ण हैं। इन्होंने EAFM में शेखावाटी विश्वविद्यालय से गोल्ड मेडल प्राप्त किया है।",
    achievements: ["शेखावाटी विश्वविद्यालय से गोल्ड मेडल"],
    order: 15,
    isActive: true
  },
  {
    name: "डॉ. अदिती शर्मा",
    designation: "व्याख्याता",
    department: "Business Administration",
    description: "ये राष्ट्रीय व अंतर्राष्ट्रीय संगोष्ठियों में भाग ले चुकी हैं।",
    order: 16,
    isActive: true
  },
  {
    name: "अंजू सहल",
    designation: "व्याख्याता",
    department: "Commerce",
    experience: "7+ years",
    description: "अंजू सहल 7+ वर्षो का शैक्षिक अनुभव रखती हैं। ये 2023 से G.S.S. गर्ल्स पी. जी. कॉलेज चिड़ावा में पढ़ा रही हैं।",
    order: 17,
    isActive: true
  },
  {
    name: "रमा शर्मा",
    designation: "व्याख्याता",
    department: "Computer Science",
    experience: "22+ years",
    qualification: "M.C.A., M.Sc. (C.S.)",
    description: "रमा शर्मा 22+ वर्षो का अध्यापन अनुभव रखती हैं। इन्होंने M.C.A. तथा MSC (C.S.) की डिग्री प्राप्त की है।",
    order: 18,
    isActive: true
  },
  {
    name: "आशा शर्मा",
    designation: "प्रवक्ता",
    department: "Physical Education",
    experience: "4+ years",
    description: "आशा शर्मा 4+ वर्षो का खेल प्रशिक्षण अनुभव रखती हैं। इनकी विशेषज्ञता क्रॉस कंट्री रनिंग, फिटनेस प्रशिक्षण और खेल प्रबन्धन हैं।",
    order: 19,
    isActive: true
  },
  {
    name: "सुमन लता शर्मा",
    designation: "लाइब्रेरियन",
    department: "Library",
    experience: "7+ years",
    qualification: "C-Lib, M-Lib",
    description: "सुमनलता शर्मा 7+ वर्षो का अध्यापन अनुभव रखती हैं। इन्होंने C-Lib तथा M-Lib की डिग्री प्राप्त की है।",
    order: 20,
    isActive: true
  }
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected');
  
  // Clear existing faculty data
  await Faculty.deleteMany({});
  console.log('🗑️  Cleared existing faculty data');
  
  // Insert faculty data
  const inserted = await Faculty.insertMany(facultyData);
  console.log(`✅ Inserted ${inserted.length} faculty members`);
  
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
