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

    <!-- Our Glorious History -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">{{ $t('about.historyTitle') }}</h2>
        
        <!-- Ginnidevi Image -->
        <div class="mb-16">
          <img src="/About-1.webp" alt="Ginnidevi" class="rounded-2xl shadow-2xl w-full h-96 object-cover" />
        </div>

        <!-- Founder Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="max-w-3xl">
            <h3 class="text-2xl font-bold text-primary-600 mb-4">
              <span v-if="locale === 'hi'">श्री सत्यनारायण जी सेखसरिया - संस्थापक</span>
              <span v-if="locale === 'en'">Shri Satyanarayan Ji Sekhsaria - The Founder</span>
            </h3>
            <div v-if="locale === 'hi'" class="prose prose-lg text-gray-700 space-y-4 text-justify">
              <p class="text-base leading-relaxed">
                चिड़ावा में महिला शिक्षा के लिए एक अलग कॉलेज की आवश्यकता महसूस की गई। तत्कालीन विधायक श्री हजारीलाल शर्मा जी ने इस मुद्दे को उठाया और सेखसरिया परिवार से संपर्क किया। श्री सत्यनारायण जी सेखसरिया ने इस प्रयास में सहयोग करने का फैसला किया और 19 नवंबर 1986 को कॉलेज का शिलान्यास हुआ। मात्र नौ महीनों में भवन तैयार हो गया और जुलाई 1987 से शिक्षण कार्य शुरू हो गया।
              </p>
              <p class="text-base leading-relaxed">
                श्री सत्यनारायणजी के पुत्र श्री एन.एस. सेखसरिया वर्तमान में गिन्नीदेवी सत्यनारायण सेखसरिया मेमोरियल ट्रस्ट के अध्यक्ष हैं। उनकी वित्तीय उदारता चिड़ावा और आस-पास के क्षेत्रों की सभी लड़कियों को आत्मविश्वासी, शिक्षित, आत्मनिर्भर युवा महिलाओं मे बदलने के उनके सपने से काफी मेल खाती है, जो जीवन की चुनौतियों का सफलतापूर्वक सामना करने के लिए पूरी तरह से तैयार रहने वाले जिम्मेदार व्यक्ति है। शिक्षा उनके दिल के करीब है और वह इस कहावत मे विश्वास करते है कि ''एक लड़के को शिक्षित करें तो एक व्यक्ति शिक्षित होगा, एक लड़की को शिक्षित करें तो एक परिवार शिक्षित होगा।''।
              </p>
            </div>
            <div v-if="locale === 'en'" class="prose prose-lg text-gray-700 space-y-4 text-justify">
              <p class="text-base leading-relaxed">
                The need for a separate college for women's education in Chirawa was felt. The then-legislator Shri Hajarilal Sharma Ji raised this issue and contacted the Sekhsaria family. Shri Satyanarayan Ji Sekhsaria decided to support this initiative and the college's foundation stone was laid on November 19, 1986. The building was completed in just nine months and teaching began in July 1987.
              </p>
              <p class="text-base leading-relaxed">
                Shri Satyanarayan Ji's son, Shri N.S. Sekhsaria, currently serves as the Chairman of the Ginnidevi Satyanarayan Sekhsaria Memorial Trust. His financial generosity aligns perfectly with their dream to transform all girls from Chirawa and surrounding areas into confident, educated, self-reliant young women who are responsible individuals, fully prepared to successfully face life's challenges. Education is close to his heart and he believes in the saying "Educate a boy and you educate an individual, educate a girl and you educate a family."
              </p>
            </div>
          </div>
          <div class="hidden lg:block">
            <img src="/About-2.webp" alt="Founder Shri Satyanarayan Ji Sekhsaria" class="rounded-2xl shadow-2xl w-full h-96 object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Our Objectives -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <h2 class="text-4xl font-bold text-gray-900 mb-8 text-center">{{ $t('about.objectivesTitle') }}</h2>
        <div class="mb-12">
          <img src="/About-3.webp" alt="Student Development" class="w-full h-80 object-cover rounded-xl shadow-2xl" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="card border-l-4 border-primary-600">
            <div class="text-3xl mb-4">📚</div>
            <p v-if="locale === 'hi'" class="text-gray-700 leading-relaxed">
              छात्राओं को आवश्यकता-आधारित शिक्षा प्रदान करना और उन्हें स्वरोजगार एवं स्वावलंबन के लिए प्रशिक्षित करना।
            </p>
            <p v-if="locale === 'en'" class="text-gray-700 leading-relaxed">
              Provide need-based education to students and train them for self-employment and self-reliance.
            </p>
          </div>

          <div class="card border-l-4 border-primary-600">
            <div class="text-3xl mb-4">🎯</div>
            <p v-if="locale === 'hi'" class="text-gray-700 leading-relaxed">
              विविध क्षेत्रों में छात्राओं के बौद्धिक स्तर को बढ़ावा देने के लिए प्रशिक्षण कार्यक्रम आयोजित करना।
            </p>
            <p v-if="locale === 'en'" class="text-gray-700 leading-relaxed">
              Organize training programs to enhance students' intellectual level in diverse fields.
            </p>
          </div>

          <div class="card border-l-4 border-primary-600">
            <div class="text-3xl mb-4">🌟</div>
            <p v-if="locale === 'hi'" class="text-gray-700 leading-relaxed">
              छात्राओं के सर्वांगीण विकास के लिए उपयुक्त वातावरण और प्रशिक्षण प्रदान करना।
            </p>
            <p v-if="locale === 'en'" class="text-gray-700 leading-relaxed">
              Provide suitable environment and training for holistic development of students.
            </p>
          </div>

          <div class="card border-l-4 border-primary-600">
            <div class="text-3xl mb-4">🏫</div>
            <p v-if="locale === 'hi'" class="text-gray-700 leading-relaxed">
              चिड़ावा व आस-पास के क्षेत्रों की ग्रामीण छात्राओं को उच्च शिक्षा प्रदान करना और उन्हें रोजगार योग्य बनाना।
            </p>
            <p v-if="locale === 'en'" class="text-gray-700 leading-relaxed">
              Provide higher education to rural girls from Chirawa and surrounding areas and make them employment-ready.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Principles -->
    <section class="py-16">
      <div class="container-custom">
        <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">{{ $t('about.principlesTitle') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
            <div class="text-4xl mb-3">🎓</div>
            <h3 class="font-bold text-lg mb-2">
              <span v-if="locale === 'hi'">शिक्षा की गुणवत्ता</span>
              <span v-if="locale === 'en'">Quality of Education</span>
            </h3>
            <p v-if="locale === 'hi'" class="text-gray-600 text-sm">
              उच्चतम शिक्षा मानकों को बनाए रखना
            </p>
            <p v-if="locale === 'en'" class="text-gray-600 text-sm">
              Maintain highest educational standards
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
            <div class="text-4xl mb-3">🤝</div>
            <h3 class="font-bold text-lg mb-2">
              <span v-if="locale === 'hi'">सहयोग और समावेशिता</span>
              <span v-if="locale === 'en'">Collaboration & Inclusivity</span>
            </h3>
            <p v-if="locale === 'hi'" class="text-gray-600 text-sm">
              सभी को स्वागत और समर्थन करना
            </p>
            <p v-if="locale === 'en'" class="text-gray-600 text-sm">
              Welcome and support all students
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
            <div class="text-4xl mb-3">🌍</div>
            <h3 class="font-bold text-lg mb-2">
              <span v-if="locale === 'hi'">सामाजिक जिम्मेदारी</span>
              <span v-if="locale === 'en'">Social Responsibility</span>
            </h3>
            <p v-if="locale === 'hi'" class="text-gray-600 text-sm">
              समाज के प्रति जिम्मेदारी
            </p>
            <p v-if="locale === 'en'" class="text-gray-600 text-sm">
              Responsibility towards society
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
            <div class="text-4xl mb-3">👤</div>
            <h3 class="font-bold text-lg mb-2">
              <span v-if="locale === 'hi'">व्यक्तिगत विकास</span>
              <span v-if="locale === 'en'">Personal Growth</span>
            </h3>
            <p v-if="locale === 'hi'" class="text-gray-600 text-sm">
              प्रत्येक छात्रा का विकास
            </p>
            <p v-if="locale === 'en'" class="text-gray-600 text-sm">
              Development of every student
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
            <div class="text-4xl mb-3">💎</div>
            <h3 class="font-bold text-lg mb-2">
              <span v-if="locale === 'hi'">ईमानदारी और विनम्रता</span>
              <span v-if="locale === 'en'">Integrity & Humility</span>
            </h3>
            <p v-if="locale === 'hi'" class="text-gray-600 text-sm">
              नैतिक मूल्य और सत्यनिष्ठा
            </p>
            <p v-if="locale === 'en'" class="text-gray-600 text-sm">
              Moral values & honesty
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>
