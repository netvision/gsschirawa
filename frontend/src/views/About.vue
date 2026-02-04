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
    <section class="py-16">
      <div class="container-custom">
        <h2 class="text-4xl font-bold text-gray-900 mb-8 text-center">{{ $t('about.historyTitle') }}</h2>
        <div class="max-w-3xl mx-auto">
          <div v-if="locale === 'hi'" class="prose prose-lg text-gray-700 space-y-6 text-justify">
            <p class="text-lg leading-relaxed">
              चिड़ावा में महिला शिक्षा के लिए एक अलग कॉलेज की आवश्यकता महसूस की गई। तत्कालीन विधायक श्री हजारीलाल शर्मा जी ने इस मुद्दे को उठाया और सेखसरिया परिवार से संपर्क किया। श्री सत्यनारायण जी सेखसरिया ने इस प्रयास में सहयोग करने का फैसला किया और 19 नवंबर 1986 को कॉलेज का शिलान्यास हुआ। मात्र नौ महीनों में भवन तैयार हो गया और जुलाई 1987 से शिक्षण कार्य शुरू हो गया।
            </p>
            <p class="text-lg leading-relaxed">
              श्री सत्यनारायणजी के पुत्र श्री एन.एस. सेखसरिया वर्तमान में गिन्नीदेवी सत्यनारायण सेखसरिया मेमोरियल ट्रस्ट के अध्यक्ष हैं। उनकी वित्तीय उदारता चिड़ावा और आस-पास के क्षेत्रों की सभी लड़कियों को आत्मविश्वासी, शिक्षित, आत्मनिर्भर युवा महिलाओं में बदलने के उनके सपने से काफी मेलखाती है।
            </p>
          </div>
          <div v-if="locale === 'en'" class="prose prose-lg text-gray-700 space-y-6 text-justify">
            <p class="text-lg leading-relaxed">
              The need for a separate college for women's education in Chirawa was felt deeply in the community. The then-legislator Shri Hajarilal Sharma Ji raised this issue and contacted the Sekhsaria family. Shri Satyanarayan Ji Sekhsaria decided to support this initiative and the college's foundation stone was laid on November 19, 1986. The building was completed in just nine months and teaching began in July 1987.
            </p>
            <p class="text-lg leading-relaxed">
              Shri Satyanarayan Ji's son, Shri N.S. Sekhsaria, currently serves as the Chairman of the Ginnidevi Satyanarayan Sekhsaria Memorial Trust. His financial generosity aligns perfectly with their vision to transform all girls from Chirawa and surrounding areas into confident, educated, and self-reliant young women.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Objectives -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <h2 class="text-4xl font-bold text-gray-900 mb-12 text-center">{{ $t('about.objectivesTitle') }}</h2>
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

    <!-- Principal's Message -->
    <section class="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              <span v-if="locale === 'hi'">प्राचार्या का संदेश</span>
              <span v-if="locale === 'en'">Principal's Message</span>
            </h2>
            <p class="text-primary-600 font-semibold mb-6">
              <span v-if="locale === 'hi'">डॉ. सपना अग्रवाल</span>
              <span v-if="locale === 'en'">Dr. Sapna Agarwal</span>
            </p>

            <div v-if="locale === 'hi'" class="prose prose-lg text-gray-700 space-y-4 text-justify max-h-96 overflow-y-auto pr-4 custom-scrollbar">
              <p class="text-base leading-relaxed">
                प्रिय छात्राओं, मैं अत्यन्त विनम्रता और सौभाग्य के साथ इस प्रतिष्ठित संस्था के नवनियुक्त प्राचार्या के रूप में महाविद्यालय के हितधारकों को सम्बोधित कर रही हूॅ।
              </p>
              <p class="text-base leading-relaxed">
                जी.एस.एस. गर्ल्स पी.जी. महाविद्यालय सक्षम शिक्षकों, अत्याधुनिक बुनियादी ढाॅचे, सुरक्षित और सहयोगी वातावरण का एक समामेलन है और शैक्षणिक, खेल, कलात्मक और सामाजिक अवसरों का एक आदर्श सन्तुलन प्रदान करता है।
              </p>
              <p class="text-base leading-relaxed">
                हमारे यहां पाठयक्रम और प्रथाओं का निरन्तर मूल्यांकन और अध्यापन किया जाता है ताकि वे सर्वोत्तम हो और हमारे छात्राओं के भविष्य की आवश्यकताओं को पूरा कर सके। यह हमारी जिम्मेदारी है कि हम शिक्षा की विरासत को अपनी भावी छात्राओं तक पहुचाएं और उन्हें व्यक्तिगत, व्यवसायिक और सामाजिक रूप से विकसित होने में मदद करें।
              </p>
              <p class="text-base leading-relaxed">
                हम अपनी छात्राओं के साथ सीखने में भागीदार हैं और उनके ज्ञान को गहरा करने, समृद्ध और नवीन शिक्षण अनुभव प्रदान करने का प्रयास करते हैं, साथ ही हम अपनी छात्राओं से नई चुनौतियों का सामना करने के लिए अपने आरामक्षेत्र से बाहर आने का आग्रह भी करते हैं।
              </p>
              <p class="text-base leading-relaxed">
                हम उच्च मानकों को बनाए रखने में दृढ विश्वास रखते हैं और शैक्षणिक प्रक्रिया को समझने और बेहतर बनाने के लिए प्रतिबद्ध हैं। टीम रणनीतियों का उपयोग करते हुए और पूरी तरह से छात्राओं की उपलब्धि पर ध्यान केन्द्रित करते हैं।
              </p>
            </div>

            <div v-if="locale === 'en'" class="prose prose-lg text-gray-700 space-y-4 text-justify max-h-96 overflow-y-auto pr-4 custom-scrollbar">
              <p class="text-base leading-relaxed">
                Dear students, with utmost humility and honor, I address you as the newly appointed Principal of this esteemed institution. The GSS Girls' (PG) College is a combination of capable teachers, state-of-the-art infrastructure, a safe and collaborative environment, and provides an ideal balance of academic, sports, artistic, and social opportunities.
              </p>
              <p class="text-base leading-relaxed">
                Here, we continuously evaluate and teach curriculum and practices so that they are best and meet the future needs of our students. It is our responsibility to pass on the legacy of education to our future students and help them develop personally, professionally, and socially.
              </p>
              <p class="text-base leading-relaxed">
                We are partners with our students in learning and strive to deepen their knowledge, provide rich and novel teaching experiences. We also encourage our students to step out of their comfort zones to face new challenges.
              </p>
              <p class="text-base leading-relaxed">
                We firmly believe in maintaining high standards and are committed to understanding and improving the educational process. Using team strategies and focusing entirely on student achievement, we work towards excellence in all aspects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16 bg-primary-50">
      <div class="container-custom">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
            {{ $t('about.contactTitle') }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-4xl mb-4">📍</div>
              <h3 class="font-semibold text-lg mb-2">{{ $t('about.address') }}</h3>
              <p class="text-gray-600">
                Ginnidevi Satyanarayan Sekhsaria<br />
                Girls' (PG) College<br />
                Chirawa, Jhunjhunu<br />
                Rajasthan – 333026
              </p>
            </div>

            <div class="text-center">
              <div class="text-4xl mb-4">📞</div>
              <h3 class="font-semibold text-lg mb-2">{{ $t('about.phone') }}</h3>
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
              <h3 class="font-semibold text-lg mb-2">{{ $t('about.email') }}</h3>
              <p class="text-gray-600">
                <a href="mailto:gsscollege1987@yahoo.co.in" class="hover:text-primary-600">
                  gsscollege1987@yahoo.co.in
                </a>
              </p>
            </div>
          </div>

          <div class="text-center mt-8">
            <RouterLink to="/contact" class="btn btn-primary">
              {{ $t('about.contactButton') }}
            </RouterLink>
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
