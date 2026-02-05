<template>
  <div class="faculty-management">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Faculty Management</h1>
        <p class="text-gray-600">Add, edit, and organize faculty members</p>
      </div>
      <button @click="openAddModal" class="btn btn-primary">+ Add Faculty</button>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-4 border-b">
        <div class="flex flex-col md:flex-row gap-3">
          <input
            v-model="search"
            type="text"
            class="input w-full md:w-1/2"
            placeholder="Search by name or department"
          />
          <select v-model="departmentFilter" class="input w-full md:w-1/3">
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="p-8 text-center">Loading faculty...</div>
      <div v-else-if="filteredFaculty.length === 0" class="p-8 text-center text-gray-500">
        No faculty members found.
      </div>
      <div v-else class="divide-y">
        <div
          v-for="member in filteredFaculty"
          :key="member._id"
          class="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div class="flex items-center gap-4">
            <img
              v-if="member.photo"
              :src="getImageUrl(member.photo)"
              :alt="member.name"
              class="w-14 h-14 rounded-full object-cover"
              @error="handleImageError"
            />
            <div class="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center" v-else>
              👩‍🏫
            </div>
            <div>
              <p class="font-semibold text-gray-900">{{ member.name }}</p>
              <p class="text-sm text-gray-600">{{ member.designation }} • {{ member.department }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-outline text-sm" @click="openEditModal(member)">Edit</button>
            <button class="text-sm bg-red-100 text-red-700 hover:bg-red-200 py-2 px-4 rounded" @click="deleteMember(member)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeModal">
      <div class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 class="text-xl font-bold">{{ editing ? 'Edit Faculty' : 'Add Faculty' }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <form class="p-6 space-y-4" @submit.prevent="saveFaculty">
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
            {{ error }}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name *</label>
              <input v-model="form.name" required class="input w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Designation *</label>
              <input v-model="form.designation" required class="input w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Department *</label>
              <select v-model="form.department" required class="input w-full">
                <option v-for="dept in departments" :key="dept" :value="dept">{{ dept }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Experience</label>
              <input v-model="form.experience" class="input w-full" placeholder="e.g., 10+ years" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Qualification</label>
              <input v-model="form.qualification" class="input w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Order</label>
              <input v-model.number="form.order" type="number" class="input w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input v-model="form.email" type="email" class="input w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Phone</label>
              <input v-model="form.phone" class="input w-full" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea v-model="form.description" class="input w-full" rows="3"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Achievements (comma-separated)</label>
            <input v-model="form.achievementsText" class="input w-full" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Photo</label>
            <input type="file" accept="image/*" @change="handleFileChange" class="input w-full" />
          </div>

          <div class="flex items-center gap-2">
            <input id="isActive" type="checkbox" v-model="form.isActive" />
            <label for="isActive" class="text-sm">Active</label>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button type="button" class="btn btn-outline" @click="closeModal">Cancel</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? 'Saving...' : (editing ? 'Update' : 'Add') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'

const faculty = ref([])
const loading = ref(false)
const showModal = ref(false)
const editing = ref(false)
const saving = ref(false)
const error = ref('')
const search = ref('')
const departmentFilter = ref('')
const photoFile = ref(null)

const departments = [
  'Hindi Literature',
  'History',
  'Political Science',
  'Geography',
  'Economics',
  'English Literature',
  'Home Science',
  'Sociology',
  'Commerce',
  'Business Administration',
  'Computer Science',
  'Physical Education',
  'Library'
]

const emptyForm = () => ({
  name: '',
  designation: '',
  department: 'Hindi Literature',
  experience: '',
  qualification: '',
  description: '',
  achievementsText: '',
  email: '',
  phone: '',
  order: 0,
  isActive: true
})

const form = ref(emptyForm())
const editingId = ref(null)

const filteredFaculty = computed(() => {
  let list = faculty.value
  if (departmentFilter.value) {
    list = list.filter((f) => f.department === departmentFilter.value)
  }
  if (search.value) {
    const term = search.value.toLowerCase()
    list = list.filter((f) =>
      f.name.toLowerCase().includes(term) ||
      f.department.toLowerCase().includes(term)
    )
  }
  return list
})

const getImageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${path}`
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/100?text=No+Image'
}

const handleFileChange = (event) => {
  photoFile.value = event.target.files?.[0] || null
}

const openAddModal = () => {
  editing.value = false
  editingId.value = null
  form.value = emptyForm()
  photoFile.value = null
  error.value = ''
  showModal.value = true
}

const openEditModal = (member) => {
  editing.value = true
  editingId.value = member._id
  form.value = {
    name: member.name || '',
    designation: member.designation || '',
    department: member.department || 'Hindi Literature',
    experience: member.experience || '',
    qualification: member.qualification || '',
    description: member.description || '',
    achievementsText: (member.achievements || []).join(', '),
    email: member.email || '',
    phone: member.phone || '',
    order: member.order ?? 0,
    isActive: member.isActive ?? true
  }
  photoFile.value = null
  error.value = ''
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const fetchFaculty = async () => {
  loading.value = true
  try {
    const response = await api.getAllFacultyAdmin()
    faculty.value = response.data.data || []
  } catch (err) {
    console.error('Error fetching faculty:', err)
    faculty.value = []
  } finally {
    loading.value = false
  }
}

const saveFaculty = async () => {
  try {
    saving.value = true
    error.value = ''

    const formData = new FormData()
    const payload = { ...form.value }
    const achievementsText = payload.achievementsText
    delete payload.achievementsText

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        formData.append(key, value)
      }
    })

    if (achievementsText) {
      achievementsText
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => formData.append('achievements', item))
    }

    if (photoFile.value) {
      formData.append('photo', photoFile.value)
    }

    if (editing.value && editingId.value) {
      await api.updateFaculty(editingId.value, formData)
    } else {
      await api.addFaculty(formData)
    }

    await fetchFaculty()
    showModal.value = false
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    saving.value = false
  }
}

const deleteMember = async (member) => {
  if (!confirm(`Delete ${member.name}?`)) return
  try {
    await api.deleteFaculty(member._id)
    faculty.value = faculty.value.filter((f) => f._id !== member._id)
  } catch (err) {
    alert(err.response?.data?.message || err.message)
  }
}

onMounted(() => {
  fetchFaculty()
})
</script>
