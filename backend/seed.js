require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Event = require('./models/Event');
const Notice = require('./models/Notice');
const Testimonial = require('./models/Testimonial');

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Event.deleteMany({}),
      Notice.deleteMany({}),
      Testimonial.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = new User({
      email: process.env.ADMIN_EMAIL || 'admin@gsscollege.edu.in',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('👤 Admin user created');

    // Create sample courses
    const courses = [
      {
        title: 'Bachelor of Arts (B.A.)',
        level: 'Undergraduate',
        degree: 'B.A.',
        duration: '3 Years',
        description: 'Comprehensive undergraduate program in Arts with multiple specialization options including Hindi, English, Economics, Political Science, History, Geography, and more.',
        subjects: ['Hindi', 'English', 'Economics', 'Political Science', 'History', 'Geography', 'Sociology'],
        eligibility: '10+2 or equivalent',
        seats: 200
      },
      {
        title: 'Bachelor of Commerce (B.Com)',
        level: 'Undergraduate',
        degree: 'B.Com',
        duration: '3 Years',
        description: 'Comprehensive commerce program covering Accounting, Business Law, Economics, and Management principles.',
        subjects: ['Accounting', 'Business Law', 'Economics', 'Business Management', 'Taxation'],
        eligibility: '10+2 with Commerce/Mathematics',
        seats: 150
      },
      {
        title: 'Master of Arts in Hindi (M.A. Hindi)',
        level: 'Postgraduate',
        degree: 'M.A.',
        duration: '2 Years',
        description: 'Advanced studies in Hindi literature, linguistics, and cultural studies.',
        subjects: ['Hindi Literature', 'Linguistics', 'Modern Poetry', 'Ancient Literature'],
        eligibility: 'B.A. in Hindi or related field',
        seats: 50
      },
      {
        title: 'Master of Arts in English (M.A. English)',
        level: 'Postgraduate',
        degree: 'M.A.',
        duration: '2 Years',
        description: 'In-depth study of English literature, language, and critical theory.',
        subjects: ['English Literature', 'Linguistics', 'American Literature', 'Critical Theory'],
        eligibility: 'B.A. in English or related field',
        seats: 50
      },
      {
        title: 'Master of Arts in Economics (M.A. Economics)',
        level: 'Postgraduate',
        degree: 'M.A.',
        duration: '2 Years',
        description: 'Advanced economic theory, applied economics, and quantitative methods.',
        subjects: ['Microeconomics', 'Macroeconomics', 'Econometrics', 'Development Economics'],
        eligibility: 'B.A. in Economics or related field',
        seats: 40
      },
      {
        title: 'Master of Arts in Political Science (M.A. Political Science)',
        level: 'Postgraduate',
        degree: 'M.A.',
        duration: '2 Years',
        description: 'Study of political systems, international relations, and public administration.',
        subjects: ['Political Theory', 'International Relations', 'Indian Politics', 'Public Administration'],
        eligibility: 'B.A. in Political Science or related field',
        seats: 40
      },
      {
        title: 'Master of Arts in History (M.A. History)',
        level: 'Postgraduate',
        degree: 'M.A.',
        duration: '2 Years',
        description: 'Comprehensive study of Indian and world history with research methodology.',
        subjects: ['Ancient History', 'Medieval History', 'Modern History', 'Historiography'],
        eligibility: 'B.A. in History or related field',
        seats: 40
      },
      {
        title: 'Master of Arts/Science in Geography (M.A./M.Sc. Geography)',
        level: 'Postgraduate',
        degree: 'M.A./M.Sc.',
        duration: '2 Years',
        description: 'Advanced geographical studies including physical, human, and regional geography.',
        subjects: ['Physical Geography', 'Human Geography', 'Geomorphology', 'Remote Sensing'],
        eligibility: 'B.A./B.Sc. in Geography',
        seats: 40
      }
    ];

    await Course.insertMany(courses);
    console.log('📚 Sample courses created');

    // Create sample notices
    const notices = [
      {
        title: 'Admission Open for Academic Year 2025-26',
        content: 'Admissions are now open for all UG and PG programs. Visit the college office for application forms.',
        priority: 'Urgent',
        isActive: true
      },
      {
        title: 'Annual Cultural Fest - Coming Soon',
        content: 'Mark your calendars! Our annual cultural festival will be held next month.',
        priority: 'High',
        isActive: true
      }
    ];

    await Notice.insertMany(notices);
    console.log('📢 Sample notices created');

    // Create sample testimonials
    const testimonials = [
      {
        name: 'Priya Sharma',
        batch: '2020-2023',
        course: 'B.A. English',
        message: 'GSS College provided me with excellent education and a supportive environment. The faculty is highly experienced and always ready to help.',
        rating: 5,
        isActive: true
      },
      {
        name: 'Anjali Verma',
        batch: '2018-2020',
        course: 'M.A. Hindi',
        message: 'The college\'s focus on holistic development helped me grow both academically and personally. I am grateful for the opportunities provided.',
        rating: 5,
        isActive: true
      },
      {
        name: 'Deepika Kumari',
        batch: '2019-2022',
        course: 'B.Com',
        message: 'Best decision of my life to join GSS College. The discipline, quality of education, and cultural activities made my college life memorable.',
        rating: 5,
        isActive: true
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('⭐ Sample testimonials created');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Admin Credentials:');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log('\n⚠️  Please change the admin password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
