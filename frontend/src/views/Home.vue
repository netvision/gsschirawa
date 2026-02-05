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
              
              <!-- Floating Stats Badge with Toggle Animation -->
              <div class="absolute -bottom-6 -left-6 w-52 h-24">
                <!-- Front of card -->
                <div class="flip-card-front absolute inset-0 bg-white rounded-xl shadow-2xl p-5 flex items-center justify-center">
                  <div class="flex items-center gap-3">
                    <div class="text-4xl">🎓</div>
                    <div>
                      <div class="text-2xl font-bold text-primary-600">7100+</div>
                      <div class="text-xs text-gray-600 font-semibold">Students Educated</div>
                    </div>
                  </div>
                </div>
                <!-- Back of card -->
                <div class="flip-card-back absolute inset-0 bg-primary-600 rounded-xl shadow-2xl p-5 text-white flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-4xl font-bold">📅</div>
                    <div class="text-2xl font-bold mt-2">1987</div>
                    <div class="text-xs font-semibold">Established</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-white border-b">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-md hover:shadow-lg transition">
            <div class="text-4xl font-bold text-primary-600 mb-2">37+</div>
            <div class="text-gray-600 text-sm font-semibold">Years of Excellence</div>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-secondary-50 to-white rounded-xl shadow-md hover:shadow-lg transition">
            <div class="text-4xl font-bold text-secondary-600 mb-2">7100+</div>
            <div class="text-gray-600 text-sm font-semibold">Students Educated</div>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-md hover:shadow-lg transition">
            <div class="text-4xl font-bold text-primary-600 mb-2">15+</div>
            <div class="text-gray-600 text-sm font-semibold">Programs Offered</div>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-secondary-50 to-white rounded-xl shadow-md hover:shadow-lg transition">
            <div class="text-4xl font-bold text-secondary-600 mb-2">100%</div>
            <div class="text-gray-600 text-sm font-semibold">Empowerment</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Founder's Message Section (Full Width) -->
    <section class="py-16 bg-gradient-to-br from-gray-50 to-primary-50">
      <div class="container-custom">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
          <!-- Header with decorative background -->
          <div class="relative bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 px-8 py-8 text-center">
            <div class="absolute inset-0 bg-pattern-dots opacity-10"></div>
            <div class="relative z-10">
              <div class="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-xs font-semibold mb-3">
                {{ $t('home.founderLabel') }}
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-white">
                Shri Narottam Satyanarayan Sekhsaria Ji
              </h2>
            </div>
          </div>

          <!-- Image and Content -->
          <div class="p-8 lg:p-10">
            <!-- Centered Image with decorative elements -->
            <div class="flex justify-center mb-8">
              <div class="relative">
                <div class="absolute -inset-4 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full blur-xl opacity-50"></div>
                <img 
                  src="/founder.png" 
                  alt="Shri Narottam Satyanarayan Sekhsaria Ji" 
                  class="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-primary-100"
                />
                <div class="absolute -bottom-2 -right-2 bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-full p-3 shadow-lg">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Message Content -->
            <div class="prose prose-lg text-gray-700 space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              <p v-if="$i18n.locale === 'hi'" class="text-base leading-relaxed font-hindi italic border-l-4 border-primary-400 pl-4 py-3 bg-gradient-to-r from-primary-50 to-transparent rounded-r">
                "ज्ञान ही जीवन की सबसे बड़ी संपत्ति है। शिक्षा वह प्रकाश है जो समाज को अज्ञान के अंधकार से निकालकर प्रगति के पथ पर अग्रसर करती है। गिन्नीदेवी सत्यनारायण सेखसरिया गर्ल्स पी.जी. कॉलेज की स्थापना का उद्देश्य न केवल युवा महिलाओं को गुणवत्तापूर्ण शिक्षा प्रदान करना है बल्कि उनमें आत्मविश्वास, सशक्तिकरण और नैतिक मूल्यों का संचार करना भी है।"
              </p>
              <p v-if="$i18n.locale === 'hi'" class="text-base leading-relaxed font-hindi text-gray-600">
                हमारा सपना था कि चिड़ावा में एक ऐसा संस्थान हो जो शिक्षित नारी की आभा को चारों ओर प्रकाशित करके समाज मे शक्ति का ऐसा एक उदाहरण स्थापित करे जो भविष्य में हर नारी के लिए एक प्रेरणास्त्रोत बने और हमारी बेटियाँ हर क्षेत्र में उत्कृष्टता हासिल करें, इस सपने को हमने इस कॉलेज की नींव रख जीवंत किया है और शिक्षा के साथ-साथ संस्कारों को जोड़कर हमने इस कॉलेज को एक ऐसा मंच बनाने का प्रयास किया है जहाँ छात्राएँ अपनी व्यक्तिगत व शैक्षिक क्षमता का सर्वोत्तम प्रदर्शन कर सकें।
              </p>
              <p v-if="$i18n.locale === 'hi'" class="text-base leading-relaxed font-hindi text-gray-600">
                मुझे गर्व है कि श्री गिन्नीदेवी सत्यनारायण सेखसरिया गर्ल्स पी.जी. कॉलेज की छात्राएँ शिक्षा के साथ – साथ खेल, कला, विज्ञान, क्राफ्ट, पेंटिंग, संगीत इत्यादि में भी निपुण होकर समाज उत्थान और विकास की तस्वीर को सजग बनाने के क्षेत्र में नए कीर्तिमान स्थापित कर रही है और पूर्ण विश्वास है कि भविष्य में ओर ऊँची उड़ान भरेंगी। मेरी शुभकामनाएँ हमेशा यहाँ अध्ययन करने वाली प्रत्येक छात्रा के साथ हैं।
              </p>
              
              <p v-if="$i18n.locale === 'en'" class="text-base leading-relaxed italic border-l-4 border-primary-400 pl-4 py-3 bg-gradient-to-r from-primary-50 to-transparent rounded-r">
                "Knowledge is the greatest wealth of life. Education is the light that removes society from the darkness of ignorance and leads it on the path of progress. The establishment of Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College aims not only to provide quality education to young women but also to instill confidence, empowerment, and moral values in them."
              </p>
              <p v-if="$i18n.locale === 'en'" class="text-base leading-relaxed text-gray-600">
                Our dream was to establish such an institution in Chirawa that would illuminate the radiance of educated women all around, setting an example of strength in society that would become a source of inspiration for every woman in the future, and that our daughters would achieve excellence in every field. We have brought this dream to life by laying the foundation of this college, and by combining education with values, we have endeavored to make this college a platform where students can demonstrate their personal and academic abilities to the fullest.
              </p>
              <p v-if="$i18n.locale === 'en'" class="text-base leading-relaxed text-gray-600">
                I am proud that the students of Ginnidevi Satyanarayan Sekhsaria Girls' (PG) College are establishing new milestones not only in education but also in sports, arts, science, crafts, painting, music, and other fields, actively contributing to the upliftment and development of society. I am fully confident that they will soar even higher in the future. My best wishes are always with every student studying here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Principal's Message and Notices Section -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content - Principal's Message (2 columns on large screens) -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
              <!-- Header with decorative background -->
              <div class="relative bg-gradient-to-r from-secondary-600 via-secondary-700 to-primary-600 px-8 py-8 text-center">
                <div class="absolute inset-0 bg-pattern-dots opacity-10"></div>
                <div class="relative z-10">
                  <div class="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-xs font-semibold mb-3">
                    <span v-if="$i18n.locale === 'hi'">प्राचार्या का संदेश</span>
                    <span v-if="$i18n.locale === 'en'">Principal's Message</span>
                  </div>
                  <h2 class="text-2xl md:text-3xl font-bold text-white">
                    <span v-if="$i18n.locale === 'hi'">डॉ. सपना अग्रवाल</span>
                    <span v-if="$i18n.locale === 'en'">Dr. Sapna Agarwal</span>
                  </h2>
                </div>
              </div>

              <!-- Image and Content -->
              <div class="p-8 lg:p-10">
                <!-- Centered Image with decorative elements -->
                <div class="flex justify-center mb-8">
                  <div class="relative">
                    <div class="absolute -inset-4 bg-gradient-to-r from-secondary-200 to-primary-200 rounded-full blur-xl opacity-50"></div>
                    <img 
                      src="/pricipal.webp" 
                      alt="Principal Dr. Sapna Agarwal" 
                      class="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-secondary-100"
                    />
                    <div class="absolute -bottom-2 -right-2 bg-gradient-to-br from-secondary-600 to-primary-600 text-white rounded-full p-3 shadow-lg">
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Message Content -->
                <div class="prose prose-lg text-gray-700 space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  <p v-if="$i18n.locale === 'hi'" class="text-base leading-relaxed font-hindi italic border-l-4 border-secondary-400 pl-4 py-3 bg-gradient-to-r from-secondary-50 to-transparent rounded-r">
                    प्रिय छात्राओं, मैं अत्यन्त विनम्रता और सौभाग्य के साथ इस प्रतिष्ठित संस्था के नवनियुक्त प्राचार्या के रूप में महाविद्यालय के हितधारकों को सम्बोधित कर रही हूॅ।
                  </p>
                  <p v-if="$i18n.locale === 'hi'" class="text-base leading-relaxed font-hindi text-gray-600">
                    जी.एस.एस. गर्ल्स पी.जी. महाविद्यालय सक्षम शिक्षकों, अत्याधुनिक बुनियादी ढाॅचे, सुरक्षित और सहयोगी वातावरण का एक समामेलन है और शैक्षणिक, खेल, कलात्मक और सामाजिक अवसरों का एक आदर्श सन्तुलन प्रदान करता है।
                  </p>
                  <p v-if="$i18n.locale === 'hi'" class="text-base leading-relaxed font-hindi text-gray-600">
                    हमारे यहां पाठयक्रम और प्रथाओं का निरन्तर मूल्यांकन और अध्यापन किया जाता है ताकि वे सर्वोत्तम हो और हमारे छात्राओं के भविष्य की आवश्यकताओं को पूरा कर सके। हम अपनी छात्राओं के साथ सीखने में भागीदार हैं और उनके ज्ञान को गहरा करने का प्रयास करते हैं।
                  </p>
                  
                  <p v-if="$i18n.locale === 'en'" class="text-base leading-relaxed italic border-l-4 border-secondary-400 pl-4 py-3 bg-gradient-to-r from-secondary-50 to-transparent rounded-r">
                    Dear students, with utmost humility and honor, I address you as the newly appointed Principal of this esteemed institution.
                  </p>
                  <p v-if="$i18n.locale === 'en'" class="text-base leading-relaxed text-gray-600">
                    The GSS Girls' (PG) College is a combination of capable teachers, state-of-the-art infrastructure, a safe and collaborative environment, and provides an ideal balance of academic, sports, artistic, and social opportunities.
                  </p>
                  <p v-if="$i18n.locale === 'en'" class="text-base leading-relaxed text-gray-600">
                    We continuously evaluate and teach curriculum and practices to meet the future needs of our students. We are partners with our students in learning and strive to deepen their knowledge and provide rich teaching experiences.
                  </p>
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

    <!-- Quick Links Section -->
    <section class="py-12 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RouterLink to="/courses" class="group bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105">
            <div class="text-5xl mb-4">📚</div>
            <h3 class="text-xl font-bold text-white mb-2">{{ $t('home.coursesTitle') }}</h3>
            <p class="text-white/80 text-sm">Explore our diverse academic programs</p>
            <div class="mt-4 flex items-center justify-center text-white font-semibold">
              <span>View Courses</span>
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </RouterLink>

          <RouterLink to="/gallery" class="group bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105">
            <div class="text-5xl mb-4">🖼️</div>
            <h3 class="text-xl font-bold text-white mb-2">Gallery</h3>
            <p class="text-white/80 text-sm">View moments from campus life</p>
            <div class="mt-4 flex items-center justify-center text-white font-semibold">
              <span>Browse Gallery</span>
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </RouterLink>

          <RouterLink to="/contact" class="group bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105">
            <div class="text-5xl mb-4">💬</div>
            <h3 class="text-xl font-bold text-white mb-2">{{ $t('home.contactButton') }}</h3>
            <p class="text-white/80 text-sm">Get in touch with us today</p>
            <div class="mt-4 flex items-center justify-center text-white font-semibold">
              <span>Contact Us</span>
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20 bg-gradient-to-br from-white via-primary-50 to-secondary-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <div class="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Why Choose Us
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience Excellence in Every Way
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            We've been shaping young minds and building confident women leaders since 1987
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">📚</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('home.whyReason1Title') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('home.whyReason1Text') }}
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">👩‍🏫</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('home.whyReason2Title') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('home.whyReason2Text') }}
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🌱</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('home.whyReason3Title') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('home.whyReason3Text') }}
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🛡️</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('home.whyReason4Title') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('home.whyReason4Text') }}
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">👩‍🎓</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('home.whyReason5Title') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('home.whyReason5Text') }}
            </p>
          </div>

          <div class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-3xl">🌟</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('home.whyReason6Title') }}</h3>
            <p class="text-gray-600 leading-relaxed">
              {{ $t('home.whyReason6Text') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Highlight -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <div class="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Academic Programs
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('home.coursesTitle') }}
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our diverse range of undergraduate and postgraduate programs
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Undergraduate -->
          <div class="relative overflow-hidden rounded-2xl shadow-xl">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700"></div>
            <div class="absolute inset-0 bg-pattern-dots opacity-10"></div>
            <div class="relative p-8 text-white">
              <div class="text-5xl mb-4">🎓</div>
              <h3 class="text-2xl font-bold mb-4">
                Undergraduate Programs
              </h3>
              <ul class="space-y-3">
                <li class="flex items-start gap-2">
                  <span class="mt-1">✓</span>
                  <div>
                    <strong>B.A. (Bachelor of Arts)</strong>
                    <p class="text-sm text-primary-100">Multiple specialization options</p>
                  </div>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1">✓</span>
                  <div>
                    <strong>B.Com (Bachelor of Commerce)</strong>
                    <p class="text-sm text-primary-100">Comprehensive commerce education</p>
                  </div>
                </li>
              </ul>
              <RouterLink to="/courses" class="inline-block mt-6 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
                View All UG Courses →
              </RouterLink>
            </div>
          </div>

          <!-- Postgraduate -->
          <div class="relative overflow-hidden rounded-2xl shadow-xl">
            <div class="absolute inset-0 bg-gradient-to-br from-secondary-500 to-secondary-700"></div>
            <div class="absolute inset-0 bg-pattern-dots opacity-10"></div>
            <div class="relative p-8 text-white">
              <div class="text-5xl mb-4">🎖️</div>
              <h3 class="text-2xl font-bold mb-4">
                Postgraduate Programs
              </h3>
              <ul class="space-y-3">
                <li class="flex items-start gap-2">
                  <span class="mt-1">✓</span>
                  <strong>M.A. Hindi, English, Economics, Political Science, History</strong>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-1">✓</span>
                  <strong>M.A./M.Sc. Geography</strong>
                </li>
              </ul>
              <RouterLink to="/courses" class="inline-block mt-6 bg-white text-secondary-600 px-6 py-3 rounded-lg font-semibold hover:bg-secondary-50 transition">
                View All PG Courses →
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Preview -->
    <section v-if="testimonials.length > 0" class="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <div class="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Success Stories
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {{ $t('home.testimonialsTitle') }}
          </h2>
          <p class="text-xl text-gray-600 font-hindi">
            हमारी बेटियां
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="testimonial in testimonials.slice(0, 3)"
            :key="testimonial._id"
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div class="flex flex-col items-center text-center mb-4">
              <img
                v-if="testimonial.image"
                :src="getAssetUrl(testimonial.image)"
                :alt="testimonial.name"
                class="w-20 h-20 rounded-full object-cover mb-4 border-4 border-primary-100 shadow-md"
              />
              <div v-else class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-3xl mb-4 border-4 border-white shadow-md">
                👩‍🎓
              </div>
              <h4 class="font-bold text-lg text-gray-900">{{ testimonial.name }}</h4>
              <p class="text-sm text-primary-600 font-semibold">{{ testimonial.course }}</p>
              <p class="text-xs text-gray-500">Batch: {{ testimonial.batch }}</p>
            </div>
            <div class="flex gap-1 mb-3 justify-center">
              <span v-for="i in testimonial.rating" :key="i" class="text-yellow-500 text-lg">⭐</span>
            </div>
            <p class="text-gray-600 text-sm text-center leading-relaxed">"{{ testimonial.message }}"</p>
          </div>
        </div>

        <div class="text-center mt-10">
          <RouterLink to="/testimonials" class="btn btn-primary inline-flex items-center">
            <span>Read More Testimonials</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Featured Alumnae Section -->
    <section v-if="alumnae.length > 0" class="py-20 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <div class="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Pride
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Alumnae
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating the success stories of our exceptional alumnae who are making a difference in the world
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div
            v-for="person in alumnae.slice(0, 3)"
            :key="person._id"
            class="group bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border border-gray-100"
          >
            <div class="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-500 overflow-hidden">
              <img
                v-if="person.profileImage"
                :src="getAssetUrl(person.profileImage)"
                :alt="person.firstName + ' ' + person.lastName"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                @error="handleAlumnaImageError"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-6xl text-white">
                👩‍🎓
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-xl font-bold">{{ person.firstName }} {{ person.lastName }}</h3>
                <p class="text-sm text-white/90">{{ person.batch }}</p>
              </div>
            </div>
            
            <div class="p-6">
              <div class="mb-4">
                <p class="text-lg font-semibold text-gray-900">{{ person.currentDesignation }}</p>
                <p class="text-sm text-gray-600 flex items-center mt-1">
                  <i class="fas fa-building mr-2 text-primary-600"></i>
                  {{ person.currentCompany }}
                </p>
              </div>

              <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-graduation-cap mr-2 text-secondary-600 w-5"></i>
                  <span>{{ person.courseName }}</span>
                </div>
                <div v-if="person.industry" class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-industry mr-2 text-secondary-600 w-5"></i>
                  <span>{{ person.industry }}</span>
                </div>
              </div>

              <RouterLink 
                :to="'/alumnae/' + person._id"
                class="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-sm group"
              >
                <span>View Profile</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink 
            to="/alumnae" 
            class="btn btn-primary inline-flex items-center"
          >
            <span>View All Alumnae</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </RouterLink>
          <RouterLink
            to="/alumnae/register"
            class="btn btn-outline inline-flex items-center"
          >
            <span>Register as Alumna</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600"></div>
      <div class="absolute inset-0 bg-pattern-dots opacity-20"></div>
      <div class="relative container-custom text-center text-white">
        <div class="max-w-3xl mx-auto">
          <div class="text-5xl mb-6">🎓</div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p class="text-xl mb-8 text-white/90 leading-relaxed">
            Join us in the pursuit of knowledge and excellence. Transform yourself into a confident, educated, and self-reliant young woman.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <RouterLink to="/contact" class="btn bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all inline-flex items-center">
              <span>Apply for Admission</span>
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </RouterLink>
            <RouterLink to="/about" class="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all">
              Learn More About Us
            </RouterLink>
          </div>
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
const alumnae = ref([])
const currentSlide = ref(0)
let slideInterval = null

// Hero carousel images
const heroImages = ref([
  '/1.png',
  '/3.png',
  '/4.png',
  '/5.png'
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

const handleAlumnaImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/400x300?text=Alumna'
}

onMounted(async () => {
  try {
    const [coursesRes, noticesRes, testimonialsRes, alumnaeRes] = await Promise.all([
      api.getCourses(),
      api.getNotices(),
      api.getTestimonials(),
      api.getFeaturedAlumnae(3)
    ])
    courses.value = coursesRes.data.data || []
    notices.value = noticesRes.data.data || []
    testimonials.value = testimonialsRes.data.data || []
    alumnae.value = alumnaeRes.data.data || []
    
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

@keyframes toggleCard {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.flip-card-front {
  animation: toggleCard 8s ease-in-out infinite;
}

.flip-card-back {
  animation: toggleCard 8s ease-in-out infinite;
  animation-direction: reverse;
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

