<template>
  <div class="about">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
      <div class="container-custom">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('about.pageTitle') }}</h1>
        <p class="text-xl text-primary-100">
          {{ $t('about.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Introduction -->
    <section class="py-16">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              Ginni Devi Satyanarayan Sekhsaria Girls P.G. College, Chirawa
            </h2>
            <p class="text-lg text-gray-700 mb-4 leading-relaxed">
              Established in 1987, GSS College has been at the forefront of providing
              quality higher education to rural women in the Shekhawati region of Rajasthan.
              Our institution is dedicated to the holistic development of young women,
              preparing them to become responsible citizens and leaders of tomorrow.
            </p>
            <p class="text-lg text-gray-700 mb-4 leading-relaxed">
              With NAAC 'B++' Grade accreditation, we maintain high standards in teaching,
              infrastructure, and student support services. Our commitment to excellence
              has made us one of the premier women's colleges in the region.
            </p>
            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <p class="text-lg font-hindi text-gray-900 mb-2">
                "ज्ञान ही जीवन की सबसे बड़ी संपत्ति है"
              </p>
              <p class="text-sm text-gray-600 italic">
                Knowledge is life's greatest wealth
              </p>
            </div>
          </div>
          <div>
            <div class="rounded-xl shadow-2xl bg-gradient-to-br from-primary-600 to-secondary-500 p-8 text-white text-center">
              <div class="text-5xl mb-4">🏫</div>
              <p class="text-xl font-bold mb-2">College Building</p>
              <p class="text-sm opacity-90">Add about-college.jpg to frontend/public/</p>
              <p class="text-xs opacity-75 mt-3">Recommended size: 800x600px</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Mission -->
          <div class="card">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-2xl font-bold text-primary-600 mb-4">Our Mission</h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-primary-600 mt-1">✓</span>
                <span>Provide quality higher education to women in rural areas</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary-600 mt-1">✓</span>
                <span>Foster holistic development through academic and co-curricular activities</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary-600 mt-1">✓</span>
                <span>Instill discipline, moral values, and social responsibility</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary-600 mt-1">✓</span>
                <span>Empower women to become self-reliant and confident individuals</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary-600 mt-1">✓</span>
                <span>Promote research and innovation in various academic fields</span>
              </li>
            </ul>
          </div>

          <!-- Vision -->
          <div class="card">
            <div class="text-4xl mb-4">👁️</div>
            <h3 class="text-2xl font-bold text-secondary-600 mb-4">Our Vision</h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-secondary-600 mt-1">✓</span>
                <span>Be a leading institution for women's education in Rajasthan</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-secondary-600 mt-1">✓</span>
                <span>Create an inclusive learning environment that nurtures talent</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-secondary-600 mt-1">✓</span>
                <span>Develop skilled professionals ready for global challenges</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-secondary-600 mt-1">✓</span>
                <span>Contribute to social transformation through educated women</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-secondary-600 mt-1">✓</span>
                <span>Maintain excellence in all aspects of education and administration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="py-16">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">
          What Makes Us Special
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white border-2 border-primary-100 rounded-xl p-6 hover:border-primary-300 transition-all">
            <div class="text-3xl mb-3">🏆</div>
            <h3 class="font-semibold text-lg mb-2">NAAC B++ Accredited</h3>
            <p class="text-gray-600 text-sm">
              Recognized for quality education and excellent infrastructure
            </p>
          </div>

          <div class="bg-white border-2 border-primary-100 rounded-xl p-6 hover:border-primary-300 transition-all">
            <div class="text-3xl mb-3">👩‍🏫</div>
            <h3 class="font-semibold text-lg mb-2">Experienced Faculty</h3>
            <p class="text-gray-600 text-sm">
              50+ qualified and dedicated teachers committed to excellence
            </p>
          </div>

          <div class="bg-white border-2 border-primary-100 rounded-xl p-6 hover:border-primary-300 transition-all">
            <div class="text-3xl mb-3">📚</div>
            <h3 class="font-semibold text-lg mb-2">Well-Equipped Library</h3>
            <p class="text-gray-600 text-sm">
              Extensive collection of books, journals, and digital resources
            </p>
          </div>

          <div class="bg-white border-2 border-primary-100 rounded-xl p-6 hover:border-primary-300 transition-all">
            <div class="text-3xl mb-3">🔬</div>
            <h3 class="font-semibold text-lg mb-2">Modern Labs</h3>
            <p class="text-gray-600 text-sm">
              State-of-the-art science and computer laboratories
            </p>
          </div>

          <div class="bg-white border-2 border-primary-100 rounded-xl p-6 hover:border-primary-300 transition-all">
            <div class="text-3xl mb-3">🎭</div>
            <h3 class="font-semibold text-lg mb-2">Cultural Activities</h3>
            <p class="text-gray-600 text-sm">
              Regular events, drama, and competitions for personality development
            </p>
          </div>

          <div class="bg-white border-2 border-primary-100 rounded-xl p-6 hover:border-primary-300 transition-all">
            <div class="text-3xl mb-3">🤝</div>
            <h3 class="font-semibold text-lg mb-2">NSS Activities</h3>
            <p class="text-gray-600 text-sm">
              Active NSS unit promoting social service and community engagement
            </p>
          </div>

          <div class="bg-white border-2 border-primary-100 rounded-xl p-6 hover:border-primary-300 transition-all">
            <div class="text-3xl mb-3">🏅</div>
            <h3 class="font-semibold text-lg mb-2">Sports Facilities</h3>
            <p class="text-gray-600 text-sm">
              Indoor and outdoor sports facilities for physical fitness
            </p>
          </div>

          <div class="bg-white border-2 border-primary-100 rounded-xl p-6 hover:border-primary-300 transition-all">
            <div class="text-3xl mb-3">💻</div>
            <h3 class="font-semibold text-lg mb-2">Computer Lab</h3>
            <p class="text-gray-600 text-sm">
              Modern computer lab with internet connectivity
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="py-16 bg-primary-50">
      <div class="container-custom">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
            Get In Touch
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-4xl mb-4">📍</div>
              <h3 class="font-semibold text-lg mb-2">Address</h3>
              <p class="text-gray-600">
                Chirawa, Jhunjhunu<br />
                Rajasthan – 333026
              </p>
            </div>

            <div class="text-center">
              <div class="text-4xl mb-4">📞</div>
              <h3 class="font-semibold text-lg mb-2">Phone</h3>
              <p class="text-gray-600">
                <a href="tel:+917878306013" class="hover:text-primary-600 block">
                  +91 7878306013
                </a>
                <a href="tel:+911596220289" class="hover:text-primary-600 block">
                  +91 01596-220289
                </a>
              </p>
            </div>

            <div class="text-center">
              <div class="text-4xl mb-4">✉️</div>
              <h3 class="font-semibold text-lg mb-2">Email</h3>
              <p class="text-gray-600">
                <a href="mailto:gsscollege1987@yahoo.co.in" class="hover:text-primary-600">
                  gsscollege1987@yahoo.co.in
                </a>
              </p>
            </div>
          </div>

          <div class="text-center mt-8">
            <RouterLink to="/contact" class="btn btn-primary">
              Contact Us
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// About page component
</script>
