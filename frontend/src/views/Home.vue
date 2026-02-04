<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background with overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600"></div>
      <div class="absolute inset-0 bg-pattern-dots opacity-20"></div>
      
      <div class="relative z-10 container-custom py-12 lg:py-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div class="text-white space-y-4 animate-fadeIn">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
              <span class="text-yellow-300">👩‍🎓</span>
              <span>Imparting Higher Education to Women Since 1987</span>
            </div>
            
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {{ $t('college.fullName') }}
            </h1>
            
            <div class="flex items-center gap-2 text-lg text-primary-100">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span>Chirawa, Jhunjhunu, Rajasthan</span>
            </div>
            
            <p class="text-base leading-relaxed text-primary-50 max-w-xl">
              {{ $t('home.heroSubtitle') }}
            </p>
            
            <div class="flex flex-wrap gap-3 pt-2">
              <RouterLink to="/courses" class="btn bg-white text-primary-600 hover:bg-primary-50 shadow-lg hover:shadow-xl transition-all inline-flex items-center text-sm">
                <span>{{ $t('home.exploreButton') }}</span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </RouterLink>
              <RouterLink to="/contact" class="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all text-sm">
                {{ $t('home.contactButton') }}
              </RouterLink>
            </div>
          </div>
          
          <!-- Image Carousel -->
          <div class="hidden lg:block">
            <div class="relative">
              <!-- Carousel Container -->
              <div class="relative overflow-hidden rounded-2xl shadow-2xl">
                <div class="aspect-[4/3] bg-white/10 backdrop-blur-sm">
                  <transition name="slide-fade" mode="out-in">
                    <img 
                      :key="currentSlide"
                      :src="heroImages[currentSlide]" 
                      :alt="`College Image ${currentSlide + 1}`"
                      class="w-full h-full object-cover"
                    />
                  </transition>
                </div>
                
                <!-- Navigation Arrows -->
                <button 
                  @click="prevSlide"
                  class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary-600 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button 
                  @click="nextSlide"
                  class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-primary-600 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                
                <!-- Dots Indicator -->
                <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  <button
                    v-for="(image, index) in heroImages"
                    :key="index"
                    @click="currentSlide = index"
                    class="transition-all"
                    :class="currentSlide === index ? 'w-8 h-2 rounded-full bg-white' : 'w-2 h-2 rounded-full bg-white/50 hover:bg-white/75'"
                  ></button>
                </div>
              </div>
              
              <!-- Floating Stats Badge with Flip Animation -->
              <div class="absolute -bottom-6 -left-6 animate-flip-card">
                <div class="flip-card-inner">
                  <!-- Front of card -->
                  <div class="flip-card-front bg-white rounded-xl shadow-2xl p-5">
                    <div class="flex items-center gap-3">
                      <div class="text-4xl">🎓</div>
                      <div>
                        <div class="text-2xl font-bold text-primary-600">7100+</div>
                        <div class="text-xs text-gray-600 font-semibold">Students Educated</div>
                      </div>
                    </div>
                  </div>
                  <!-- Back of card -->
                  <div class="flip-card-back bg-primary-600 rounded-xl shadow-2xl p-5 text-white flex items-center justify-center">
                    <div class="text-center">
                      <div class="text-4xl font-bold">1987</div>
                      <div class="text-xs font-semibold">Established</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Founder's Message and Notices Section -->
    <section class="py-16 bg-gradient-to-br from-gray-50 to-primary-50">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content - Founder's Message (2 columns on large screens) -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="grid grid-cols-1 lg:grid-cols-5 gap-0">
                <!-- Left Image Section -->
                <div class="lg:col-span-2 relative bg-gradient-to-br from-primary-600 to-secondary-600 p-8 lg:p-12 flex items-center justify-center">
                  <div class="absolute inset-0 bg-pattern opacity-10"></div>
                  <div class="relative z-10 text-center">
                    <div class="mb-6">
                      <img 
                        src="/founder.png" 
                        alt="Shri Narottam Satyanarayan Sekhsaria Ji" 
                        class="rounded-2xl shadow-2xl w-full max-w-sm mx-auto object-cover border-4 border-white"
                      />
                    </div>
                  </div>
                </div>

                <!-- Right Content -->
                <div class="lg:col-span-3 p-8 lg:p-12">
                  <div class="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    {{ $t('home.founderLabel') }}
                  </div>
                  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Shri Narottam Satyanarayan Sekhsaria Ji
                  </h2>
                  <div class="h-1 w-24 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mb-6"></div>
                  
                  <div class="prose prose-lg text-gray-700 space-y-4 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                    <p v-if="$i18n.locale === 'hi'" class="text-base leading-relaxed font-hindi italic border-l-4 border-primary-500 pl-4 py-2 bg-primary-50">
                      "ज्ञान ही जीवन की सबसे बड़ी संपत्ति है। शिक्षा वह प्रकाश है जो समाज को अज्ञान के अंधकार से निकालकर प्रगति के पथ पर अग्रसर करती है। गिन्नीदेवी सत्यनारायण सेखसरिया गर्ल्स पी.जी. कॉलेज की स्थापना का उद्देश्य न केवल युवा महिलाओं को गुणवत्तापूर्ण शिक्षा प्रदान करना है बल्कि उनमें आत्मविश्वास, सशक्तिकरण और नैतिक मूल्यों का संचार करना भी है।"
                    </p>
                    <p v-if="$i18n.locale === 'hi'" class="text-base leading-relaxed font-hindi">
                      हमारा सपना था कि चिड़ावा में एक ऐसा संस्थान हो जो शिक्षित नारी की आभा को चारों ओर प्रकाशित करके समाज मे शक्ति का ऐसा एक उदाहरण स्थापित करे जो भविष्य में हर नारी के लिए एक प्रेरणास्त्रोत बने और हमारी बेटियाँ हर क्षेत्र में उत्कृष्टता हासिल करें, इस सपने को हमने इस कॉलेज की नींव रख जीवंत किया है और शिक्षा के साथ-साथ संस्कारों को जोड़कर हमने इस कॉलेज को एक ऐसा मंच बनाने का प्रयास किया है जहाँ छात्राएँ अपनी व्यक्तिगत व शैक्षिक क्षमता का सर्वोत्तम प्रदर्शन कर सकें।
                    </p>
                    <p v-if="$i18n.locale === 'hi'" class="text-base leading-relaxed font-hindi">
                      मुझे गर्व है कि श्री गिन्नीदेवी सत्यनारायण सेखसरिया गर्ल्स पी.जी. कॉलेज की छात्राएँ शिक्षा के साथ – साथ खेल, कला, विज्ञान, क्राफ्ट, पेंटिंग, संगीत इत्यादि में भी निपुण होकर समाज उत्थान और विकास की तस्वीर को सजग बनाने के क्षेत्र में नए कीर्तिमान स्थापित कर रही है और पूर्ण विश्वास है कि भविष्य में ओर ऊँची उड़ान भरेंगी। मेरी शुभकामनाएँ हमेशा यहाँ अध्ययन करने वाली प्रत्येक छात्रा के साथ हैं।
                    </p>
                    
                    <p v-if="$i18n.locale === 'en'" class="text-base leading-relaxed italic border-l-4 border-primary-500 pl-4 py-2 bg-primary-50">
                      "Knowledge is the greatest wealth of life. Education is the light that removes society from the darkness of ignorance and leads it on the path of progress. The establishment of Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College aims not only to provide quality education to young women but also to instill confidence, empowerment, and moral values in them."
                    </p>
                    <p v-if="$i18n.locale === 'en'" class="text-base leading-relaxed">
                      Our dream was to establish such an institution in Chirawa that would illuminate the radiance of educated women all around, setting an example of strength in society that would become a source of inspiration for every woman in the future, and that our daughters would achieve excellence in every field. We have brought this dream to life by laying the foundation of this college, and by combining education with values, we have endeavored to make this college a platform where students can demonstrate their personal and academic abilities to the fullest.
                    </p>
                    <p v-if="$i18n.locale === 'en'" class="text-base leading-relaxed">
                      I am proud that the students of Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College are establishing new milestones not only in education but also in sports, arts, science, crafts, painting, music, and other fields, actively contributing to the upliftment and development of society. I am fully confident that they will soar even higher in the future. My best wishes are always with every student studying here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar - Notices (1 column on large screens) -->
          <div v-if="notices.length > 0" class="lg:col-span-1">
            <div class="sticky top-24">
              <div class="flex items-center gap-4 mb-6">
                <h2 class="text-2xl font-bold text-gray-900">📢 {{ $t('home.noticesTitle') }}</h2>
              </div>
              <div class="space-y-4">
                <div
                  v-for="notice in notices.slice(0, 5)"
                  :key="notice._id"
                  class="bg-white p-4 rounded-lg shadow-md border-l-4"
                  :class="{
                    'border-red-500': notice.priority === 'Urgent',
                    'border-orange-500': notice.priority === 'High',
                    'border-blue-500': notice.priority === 'Medium',
                    'border-gray-500': notice.priority === 'Low'
                  }"
                >
                  <div class="flex items-start justify-between mb-2">
                    <span
                      class="text-xs font-semibold px-2 py-1 rounded"
                      :class="{
                        'bg-red-100 text-red-700': notice.priority === 'Urgent',
                        'bg-orange-100 text-orange-700': notice.priority === 'High',
                        'bg-blue-100 text-blue-700': notice.priority === 'Medium',
                        'bg-gray-100 text-gray-700': notice.priority === 'Low'
                      }"
                    >
                      {{ notice.priority }}
                    </span>
                  </div>
                  <h3 class="font-semibold text-base mb-2">{{ notice.title }}</h3>
                  <p class="text-gray-600 text-sm mb-2">{{ notice.content.substring(0, 80) }}...</p>
                  <div class="text-xs text-gray-500">
                    {{ new Date(notice.createdAt).toLocaleDateString() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('home.whyChooseTitle') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ $t('home.whyChooseSubtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition text-center">
            <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="/original-images/USP.png" alt="Quality Education" class="w-12 h-12 object-contain" />
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.whyReason1Title') }}</h3>
            <p class="text-gray-600">
              {{ $t('home.whyReason1Text') }}
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition text-center">
            <div class="text-5xl mb-4">👩‍🏫</div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.whyReason2Title') }}</h3>
            <p class="text-gray-600">
              {{ $t('home.whyReason2Text') }}
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition text-center">
            <div class="text-5xl mb-4">🌱</div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.whyReason3Title') }}</h3>
            <p class="text-gray-600">
              {{ $t('home.whyReason3Text') }}
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition text-center">
            <div class="text-5xl mb-4">🛡️</div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.whyReason4Title') }}</h3>
            <p class="text-gray-600">
              {{ $t('home.whyReason4Text') }}
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition text-center">
            <div class="text-5xl mb-4">👩‍🎓</div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.whyReason5Title') }}</h3>
            <p class="text-gray-600">
              {{ $t('home.whyReason5Text') }}
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition text-center">
            <div class="text-5xl mb-4">🌟</div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.whyReason6Title') }}</h3>
            <p class="text-gray-600">
              {{ $t('home.whyReason6Text') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Highlight -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('home.coursesTitle') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of undergraduate and postgraduate programs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Undergraduate -->
          <div class="card">
            <h3 class="text-2xl font-bold text-primary-600 mb-4">
              Undergraduate Programs
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <span class="text-primary-600 mt-1">✓</span>
                <div>
                  <strong>B.A. (Bachelor of Arts)</strong>
                  <p class="text-sm text-gray-600">Multiple specialization options available</p>
                </div>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary-600 mt-1">✓</span>
                <div>
                  <strong>B.Com (Bachelor of Commerce)</strong>
                  <p class="text-sm text-gray-600">Comprehensive commerce education</p>
                </div>
              </li>
            </ul>
            <RouterLink to="/courses" class="btn btn-primary mt-6 w-full">
              View All UG Courses
            </RouterLink>
          </div>

          <!-- Postgraduate -->
          <div class="card">
            <h3 class="text-2xl font-bold text-secondary-600 mb-4">
              Postgraduate Programs
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <span class="text-secondary-600 mt-1">✓</span>
                <strong>M.A. Hindi, English, Economics, Political Science, History</strong>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-secondary-600 mt-1">✓</span>
                <strong>M.A./M.Sc. Geography</strong>
              </li>
            </ul>
            <RouterLink to="/courses" class="btn btn-secondary mt-6 w-full">
              View All PG Courses
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Preview -->
    <section v-if="testimonials.length > 0" class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('home.testimonialsTitle') }}
          </h2>
          <p class="text-xl text-gray-600 font-hindi">
            हमारी बेटियां
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="testimonial in testimonials.slice(0, 3)"
            :key="testimonial._id"
            class="bg-gradient-to-br from-primary-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition"
          >
            <div class="flex flex-col items-center text-center mb-4">
              <img
                v-if="testimonial.image"
                :src="getAssetUrl(testimonial.image)"
                :alt="testimonial.name"
                class="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-lg"
              />
              <div v-else class="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-4xl mb-4 border-4 border-white shadow-lg">
                👩‍🎓
              </div>
              <h4 class="font-semibold text-lg">{{ testimonial.name }}</h4>
              <p class="text-sm text-primary-600 font-medium">{{ testimonial.course }}</p>
              <p class="text-xs text-gray-500">Batch: {{ testimonial.batch }}</p>
            </div>
            <p class="text-gray-600 italic text-center">"{{ testimonial.message }}"</p>
            <div class="flex gap-1 mt-4 justify-center">
              <span v-for="i in testimonial.rating" :key="i" class="text-yellow-500 text-xl">⭐</span>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <RouterLink to="/testimonials" class="btn btn-primary">
            Read More Testimonials
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary-600 text-white py-16">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ready to Begin Your Journey?
        </h2>
        <p class="text-xl mb-8 text-primary-100">
          Join us in the pursuit of knowledge and excellence
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <RouterLink to="/contact" class="btn bg-white text-primary-600 hover:bg-gray-100">
            Apply for Admission
          </RouterLink>
          <RouterLink to="/about" class="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600">
            Learn More About Us
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import api, { getAssetUrl } from '../services/api'

const courses = ref([])
const notices = ref([])
const testimonials = ref([])
const currentSlide = ref(0)
let slideInterval = null

// Hero carousel images - add your college images here
const heroImages = ref([
  '/original-images/building-1.jpg',
  '/original-images/campus-2.jpg',
  '/original-images/students-3.jpg',
  '/original-images/lab-4.jpg',
  '/original-images/library-5.jpg'
])

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroImages.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? heroImages.value.length - 1 : currentSlide.value - 1
}

const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
}

onMounted(async () => {
  try {
    const [coursesRes, noticesRes, testimonialsRes] = await Promise.all([
      api.getCourses(),
      api.getNotices(),
      api.getTestimonials()
    ])
    courses.value = coursesRes.data.data || []
    notices.value = noticesRes.data.data || []
    testimonials.value = testimonialsRes.data.data || []
    
    // Start carousel auto-play
    startAutoSlide()
  } catch (error) {
    console.error('Error loading data:', error)
  }
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #9333ea #f3f4f6;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #9333ea;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #7e22ce;
}

.bg-pattern {
  background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0);
  background-size: 32px 32px;
}

.bg-pattern-dots {
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0);
  background-size: 40px 40px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes flipCard {
  0% {
    transform: rotateY(0deg);
  }
  25% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  75% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.animate-flip-card {
  animation: flipCard 8s ease-in-out infinite;
  perspective: 1000px;
  width: 200px;
  height: 90px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.animate-flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
