require('dotenv').config();
const mongoose = require('mongoose');
const Faculty = require('./models/Faculty');

const photoMap = {
  'डॉ. सीमा सहल': '/uploads/Team-Seema-Sahal.png',
  'मधुबाला': '/uploads/Team-Madhubala.png',
  'मानसी': '/uploads/Team-Mansi.png',
  'मंजू रानी': '/uploads/Team-Manju-Rani.png',
  'अवंतिका गौड़': '/uploads/Team-Avantika-Gaur.png',
  'मीनाक्षी शर्मा': '/uploads/Team-Meenakshi-Sharma.png',
  'संजु सैनी': '/uploads/Team-Sanju-Saini.png',
  'पूनम भारद्वाज': '/uploads/Team-Poonam-Bharadwaj.png',
  'सुमन जांगिड़': '/uploads/Team-Suman-Jangir.png',
  'लक्ष्मी शर्मा': '/uploads/Team-Laxmi-Sharma.png',
  'ज्योति शर्मा': '/uploads/Team-Jyoti-Sharma.png',
  'रमा शर्मा': '/uploads/Team-Rama-Sharma.png',
  'आशा शर्मा': '/uploads/Team-Asha-Sharma.png',
  'सुमन लता शर्मा': '/uploads/Team-Suman-lata-Sharma.png'
};

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected');

  let updated = 0;
  for (const [name, photo] of Object.entries(photoMap)) {
    const result = await Faculty.updateOne({ name }, { $set: { photo } });
    if (result.modifiedCount > 0) {
      updated += 1;
    }
  }

  console.log(`✅ Updated photos for ${updated} faculty records`);
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
