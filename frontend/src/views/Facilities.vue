<template>
  <div class="facilities">
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-20">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ pageContent.pageTitle }}</h1>
        <p class="text-lg md:text-xl text-primary-100 max-w-3xl">
          {{ pageContent.pageSubtitle }}
        </p>
      </div>
    </section>

    <section class="py-12 md:py-14 bg-gray-50">
      <div class="container-custom space-y-10">
        <article class="rounded-2xl border-2 border-primary-200 bg-white shadow-lg p-6 md:p-8">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            {{ pageContent.featuredLabel }}
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {{ pageContent.highlight.title }}
          </h2>
          <p class="text-gray-700 leading-relaxed text-base md:text-lg">
            {{ pageContent.highlight.description }}
          </p>
        </article>

        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-7">
          <article
            v-for="(section, index) in pageContent.sections"
            :key="`${index}-${section.title}`"
            class="bg-white border border-gray-200 rounded-2xl shadow-sm h-full overflow-hidden flex flex-col"
            @mouseenter="hoveredCardKey = getSlideKey(index)"
            @mouseleave="hoveredCardKey = null"
          >
            <div class="relative h-52 md:h-56 bg-gray-100 border-b border-gray-200">
              <img
                :src="resolveImageSrc(getSectionImages(section)[getCurrentSlide(index, section)])"
                :alt="`${section.title} - image ${getCurrentSlide(index, section) + 1}`"
                class="w-full h-full object-cover"
              />

              <template v-if="getSectionImages(section).length > 1">
                <button
                  type="button"
                  class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 h-8 w-8 rounded-full shadow flex items-center justify-center"
                  @click="prevSlide(index, section)"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 h-8 w-8 rounded-full shadow flex items-center justify-center"
                  @click="nextSlide(index, section)"
                  aria-label="Next image"
                >
                  ›
                </button>
              </template>

              <div
                v-if="getSectionImages(section).length > 1"
                class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"
              >
                <button
                  v-for="(imageName, dotIndex) in getSectionImages(section)"
                  :key="`${imageName}-${dotIndex}`"
                  type="button"
                  @click="setSlide(index, dotIndex)"
                  class="h-2.5 w-2.5 rounded-full border border-white/80"
                  :class="dotIndex === getCurrentSlide(index, section) ? 'bg-white' : 'bg-white/50'"
                  :aria-label="`Go to image ${dotIndex + 1}`"
                />
              </div>
            </div>

            <div class="p-6 md:p-7 flex-1 flex flex-col">
              <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {{ section.title }}
              </h2>

              <div class="space-y-3 text-gray-700 leading-relaxed text-base flex-1">
                <p>{{ section.description }}</p>
                <p v-if="section.extra">{{ section.extra }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentSlides = ref({})
const hoveredCardKey = ref(null)
const placeholderImage = '/facilities/placeholder.svg'
const AUTO_SLIDE_MS = 4000
let autoSlideInterval = null

const getSlideKey = (index) => `${locale.value}-${index}`

const getSectionImages = (section) => {
  if (section.images && section.images.length > 0) {
    return section.images
  }

  return [placeholderImage]
}

const getCurrentSlide = (index, section) => {
  const images = getSectionImages(section)
  const key = getSlideKey(index)
  const current = currentSlides.value[key] ?? 0

  return ((current % images.length) + images.length) % images.length
}

const setSlide = (index, slideIndex) => {
  currentSlides.value[getSlideKey(index)] = slideIndex
}

const nextSlide = (index, section) => {
  const images = getSectionImages(section)
  const current = getCurrentSlide(index, section)
  setSlide(index, (current + 1) % images.length)
}

const prevSlide = (index, section) => {
  const images = getSectionImages(section)
  const current = getCurrentSlide(index, section)
  setSlide(index, (current - 1 + images.length) % images.length)
}

const resolveImageSrc = (imageName) => {
  if (imageName.startsWith('/')) {
    return imageName
  }

  return `/facilities/${imageName}`
}

onMounted(() => {
  autoSlideInterval = setInterval(() => {
    pageContent.value.sections.forEach((section, index) => {
      const images = getSectionImages(section)
      const cardKey = getSlideKey(index)

      if (images.length > 1 && hoveredCardKey.value !== cardKey) {
        nextSlide(index, section)
      }
    })
  }, AUTO_SLIDE_MS)
})

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
})

const pageData = {
  en: {
    pageTitle: 'Facilities and Infrastructure',
    pageSubtitle: 'Key campus facilities available for students and staff.',
    featuredLabel: 'Featured',
    highlight: {
      title: 'UGC Recognized Institution',
      description: 'The college is approved by the University Grants Commission (UGC), ensuring validity of degrees for education and employment nationwide.'
    },
    sections: [
      {
        title: 'NET/SET Qualified Women Faculty',
        description: 'Students are taught by highly qualified women lecturers who have cleared the National Eligibility Test (NET) and State Eligibility Test (SET) examinations.',
        extra: 'These national-level eligibility qualifications ensure strong subject knowledge, academic excellence, and high teaching standards.',
        images: ['2a.jpg', '2b.jpg']
      },
      {
        title: 'Book Bank Facility',
        description: 'The college provides a Book Bank Facility for students. Under this scheme, important textbooks are issued to students for the entire academic session, helping them continue their studies without financial burden.',
        images: ['3a.jpg']
      },
      {
        title: 'NSS (National Service Scheme)',
        description: 'The college runs an active unit of the National Service Scheme (NSS) to promote social responsibility and community service among students.',
        extra: 'Through NSS, students participate in activities such as cleanliness drives, tree plantation, health awareness programs, blood donation camps, and rural development work.',
        images: ['4a.jpg', '4b.jpg', '4c.jpg', '4d.jpg']
      },
      {
        title: 'CCTV-Enabled Campus',
        description: 'The college campus is fully equipped with a CCTV surveillance system to ensure safety, discipline, and a secure learning environment for students and staff.',
        images: ['5a.jpg', '5b.jpg']
      },
      {
        title: 'RO Drinking Water Facility',
        description: 'The college provides RO purified drinking water for students and staff, ensuring safe, clean, and healthy hydration on campus.',
        images: ['6a.jpg', '6b.jpg']
      },
      {
        title: 'Modern Washroom Facilities',
        description: 'The college provides modern, clean, and hygienic washrooms for students and staff, ensuring comfort and proper sanitation within the campus.',
        images: ['7a.jpg']
      },
      {
        title: 'Canteen Facility',
        description: 'The college has a well-maintained canteen providing fresh, hygienic, and affordable food and beverages for students and staff.',
        images: ['8a.jpg', '8b.jpg']
      },
      {
        title: 'Library and Reading Room',
        description: 'The college has a well-equipped library and reading room with a wide collection of textbooks, reference books, journals, and newspapers, providing a peaceful environment for study and research.',
        images: ['9a.jpg', '9b.jpg', '9c.jpg']
      },
      {
        title: 'Green Campus',
        description: 'The college has a lush green and eco-friendly campus that provides a peaceful, healthy, and pleasant atmosphere for learning and overall development.',
        images: ['10a.jpg', '10b.jpg']
      },
      {
        title: 'Air-Conditioned Computer Lab & Smart Classroom',
        description: 'The college provides an air-conditioned computer laboratory with internet access and modern smart classrooms equipped with digital teaching aids for interactive and effective learning.',
        extra: 'The college also provides free basic computer classes to help students develop essential digital skills such as typing, MS Office, internet use, and online applications.',
        images: ['11a.jpg']
      },
      {
        title: 'Government Scholarships',
        description: 'Students can avail all scholarships provided by the State and Central Government, as per eligibility norms, to support their education financially.',
        images: []
      },
      {
        title: 'Sports Activities',
        description: 'The college actively promotes sports and physical activities and provides opportunities for students to participate in indoor and outdoor games, helping in fitness, teamwork, and overall personality development.',
        images: ['13a.jpg', '13b.jpg', '13c.jpg']
      },
      {
        title: 'Free Regular Handicraft Classes',
        description: 'The college organizes free regular handicraft classes to develop creativity, practical skills, and self-employment abilities among students.',
        images: ['14a.jpg', '14b.jpg']
      },
      {
        title: 'Industrial Visits & Training Tours for Skill Development',
        description: 'The college organizes visits to industries and training centers to enhance students’ practical knowledge, technical skills, and career readiness.',
        images: []
      },
      {
        title: 'Career Orientation & Skill Development Classes',
        description: 'The college conducts regular free career orientation and skill development classes to improve employability, communication skills, interview preparation, and personality development of students.',
        extra: 'The college also conducts free spoken English classes to improve students’ communication skills, confidence, pronunciation, and fluency for academic and professional success.',
        images: ['16a.jpg', '16b.jpg', '16c.jpg']
      },
      {
        title: 'Parking Facility',
        description: 'The college provides a spacious and secure parking area for two-wheelers and four-wheelers of students and staff.',
        images: ['17a.jpg']
      }
    ]
  },
  hi: {
    pageTitle: 'सुविधाएं और अधोसंरचना',
    pageSubtitle: 'छात्राओं और स्टाफ के लिए उपलब्ध प्रमुख परिसर सुविधाएं।',
    featuredLabel: 'प्रमुख',
    highlight: {
      title: 'यूजीसी मान्यता प्राप्त संस्था',
      description: 'कॉलेज विश्वविद्यालय अनुदान आयोग (UGC) से मान्यता प्राप्त है, जिससे डिग्री की वैधता शिक्षा और रोजगार के लिए देशभर में सुनिश्चित होती है।'
    },
    sections: [
      {
        title: 'NET/SET योग्य महिला संकाय',
        description: 'छात्राओं को ऐसे उच्च योग्य महिला व्याख्याताओं द्वारा पढ़ाया जाता है जिन्होंने राष्ट्रीय पात्रता परीक्षा (NET) और राज्य पात्रता परीक्षा (SET) उत्तीर्ण की है।',
        extra: 'ये राष्ट्रीय स्तर की पात्रताएं मजबूत विषय-ज्ञान, शैक्षणिक उत्कृष्टता और उच्च शिक्षण मानकों को सुनिश्चित करती हैं।',
        images: ['2a.jpg', '2b.jpg']
      },
      {
        title: 'बुक बैंक सुविधा',
        description: 'कॉलेज छात्राओं के लिए बुक बैंक सुविधा प्रदान करता है। इस योजना के अंतर्गत महत्वपूर्ण पाठ्यपुस्तकें पूरे शैक्षणिक सत्र के लिए दी जाती हैं, जिससे बिना आर्थिक बोझ के पढ़ाई जारी रहती है।',
        images: ['3a.jpg']
      },
      {
        title: 'एनएसएस (राष्ट्रीय सेवा योजना)',
        description: 'कॉलेज में राष्ट्रीय सेवा योजना (NSS) की सक्रिय इकाई संचालित है, जो छात्राओं में सामाजिक जिम्मेदारी और सामुदायिक सेवा की भावना विकसित करती है।',
        extra: 'NSS के माध्यम से छात्राएं स्वच्छता अभियान, वृक्षारोपण, स्वास्थ्य जागरूकता कार्यक्रम, रक्तदान शिविर और ग्रामीण विकास कार्यों में भाग लेती हैं।',
        images: ['4a.jpg', '4b.jpg', '4c.jpg', '4d.jpg']
      },
      {
        title: 'सीसीटीवी युक्त परिसर',
        description: 'कॉलेज परिसर पूरी तरह सीसीटीवी निगरानी से सुसज्जित है, जिससे छात्राओं और स्टाफ के लिए सुरक्षित एवं अनुशासित शिक्षण वातावरण सुनिश्चित होता है।',
        images: ['5a.jpg', '5b.jpg']
      },
      {
        title: 'आरओ पेयजल सुविधा',
        description: 'कॉलेज छात्राओं और स्टाफ के लिए आरओ शुद्ध पेयजल उपलब्ध कराता है, जिससे सुरक्षित, स्वच्छ और स्वस्थ जलापूर्ति सुनिश्चित होती है।',
        images: ['6a.jpg', '6b.jpg']
      },
      {
        title: 'आधुनिक शौचालय सुविधाएं',
        description: 'कॉलेज में स्वच्छ, आधुनिक और स्वास्थ्यकर शौचालय उपलब्ध हैं, जो परिसर में आराम और उचित स्वच्छता सुनिश्चित करते हैं।',
        images: ['7a.jpg']
      },
      {
        title: 'कैंटीन सुविधा',
        description: 'कॉलेज में सुव्यवस्थित कैंटीन है, जहां छात्राओं और स्टाफ के लिए ताजा, स्वच्छ और किफायती भोजन व पेय उपलब्ध हैं।',
        images: ['8a.jpg', '8b.jpg']
      },
      {
        title: 'पुस्तकालय और वाचनालय',
        description: 'कॉलेज में सुव्यवस्थित पुस्तकालय और वाचनालय है, जहां पाठ्यपुस्तकों, संदर्भ पुस्तकों, पत्रिकाओं और समाचार पत्रों का समृद्ध संग्रह उपलब्ध है।',
        images: ['9a.jpg', '9b.jpg', '9c.jpg']
      },
      {
        title: 'हरित परिसर',
        description: 'कॉलेज का हरित और पर्यावरण-अनुकूल परिसर अध्ययन के लिए शांत, स्वस्थ और सुखद वातावरण प्रदान करता है।',
        images: ['10a.jpg', '10b.jpg']
      },
      {
        title: 'एसी कंप्यूटर लैब एवं स्मार्ट कक्षा',
        description: 'कॉलेज में इंटरनेट युक्त एसी कंप्यूटर लैब और डिजिटल शिक्षण साधनों से सुसज्जित स्मार्ट कक्षाएं उपलब्ध हैं।',
        extra: 'कॉलेज टाइपिंग, एमएस ऑफिस, इंटरनेट और ऑनलाइन अनुप्रयोगों जैसे आवश्यक डिजिटल कौशलों के लिए निःशुल्क बेसिक कंप्यूटर कक्षाएं भी चलाता है।',
        images: ['11a.jpg']
      },
      {
        title: 'सरकारी छात्रवृत्तियां',
        description: 'योग्यता के अनुसार छात्राएं राज्य और केंद्र सरकार द्वारा प्रदत्त सभी छात्रवृत्तियों का लाभ उठा सकती हैं।',
        images: []
      },
      {
        title: 'खेल गतिविधियां',
        description: 'कॉलेज खेल और शारीरिक गतिविधियों को बढ़ावा देता है तथा छात्राओं को इनडोर और आउटडोर खेलों में भाग लेने के अवसर प्रदान करता है।',
        images: ['13a.jpg', '13b.jpg', '13c.jpg']
      },
      {
        title: 'निःशुल्क नियमित हस्तशिल्प कक्षाएं',
        description: 'कॉलेज रचनात्मकता, व्यावहारिक कौशल और आत्म-रोजगार क्षमता विकसित करने हेतु निःशुल्क नियमित हस्तशिल्प कक्षाएं आयोजित करता है।',
        images: ['14a.jpg', '14b.jpg']
      },
      {
        title: 'कौशल विकास हेतु औद्योगिक भ्रमण एवं प्रशिक्षण टूर',
        description: 'कॉलेज उद्योगों और प्रशिक्षण केंद्रों के भ्रमण आयोजित करता है ताकि छात्राओं का व्यावहारिक ज्ञान, तकनीकी कौशल और करियर तैयारी बढ़े।',
        images: []
      },
      {
        title: 'करियर ओरिएंटेशन एवं कौशल विकास कक्षाएं',
        description: 'कॉलेज रोजगार क्षमता, संचार कौशल, साक्षात्कार तैयारी और व्यक्तित्व विकास के लिए नियमित निःशुल्क कक्षाएं चलाता है।',
        extra: 'कॉलेज छात्राओं की संचार क्षमता, आत्मविश्वास, उच्चारण और प्रवाह सुधारने हेतु निःशुल्क स्पोकन इंग्लिश कक्षाएं भी चलाता है।',
        images: ['16a.jpg', '16b.jpg', '16c.jpg']
      },
      {
        title: 'पार्किंग सुविधा',
        description: 'कॉलेज छात्राओं और स्टाफ के दोपहिया एवं चारपहिया वाहनों के लिए विशाल और सुरक्षित पार्किंग क्षेत्र उपलब्ध कराता है।',
        images: ['17a.jpg']
      }
    ]
  }
}

const pageContent = computed(() => (locale.value === 'hi' ? pageData.hi : pageData.en))
</script>
