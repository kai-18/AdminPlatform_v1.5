<template>
  <q-page>
    <q-card>
      <q-card-section>
    <div class="row justify-between items-center">
      <div class="text-h6">User Management</div>
        <q-input
          v-model="searchQuery"
          label="Search users..."
          dense
          outlined
          clearable
          debounce="300"
          class="q-ml-md"
          style="max-width: 300px;"
          >
        <template v-slot:prepend>
        <q-icon name="search" />
        </template>
        </q-input>
      </div>
    </q-card-section>

    <q-card-section>
      <q-btn label="Add User" color="primary" @click="addDialog = true" />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-table
        :rows="users"
        :columns="columns"
        row-key="id"
        flat
        dense
        virtual-scroll
        :rows-per-page-options="[30, 50, 100]"
        class="scrollable-table"
        :filter="searchQuery"
      >
      <template v-slot:body-cell-password="props">
            <q-td :props="props">
              <span v-if="passwordVisible[props.row.id]">{{ props.row.password }}</span>
              <span v-else>••••••••</span>
              <q-btn
                flat
                dense
                round
                :icon="passwordVisible[props.row.id] ? 'visibility_off' : 'visibility'"
                @click="togglePasswordVisibility(props.row.id)"
              />
            </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat dense icon="edit" @click="openEditDialog(props.row)" />
            <q-btn flat dense icon="delete" color="negative" @click="showDeleteDialog(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card-section>

    </q-card>
    <q-dialog v-model="addDialog">
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6">Add New User</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="createUser">
            <q-input v-model="newUser.name" label="Name" dense />
            <q-input v-model="newUser.lastname" label="Lastname" dense />
            <q-input v-model="newUser.username" label="Username" dense />
            <q-input v-model="newUser.password" label="Password" dense />
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="negative" @click="addDialog = false" />
              <q-btn type="submit" label="Save" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit User</div>
        </q-card-section>

        <q-card-section class="editUser">
          <q-form @submit.prevent="updateUser">
            <q-input v-model="editUser.name" label="Name" dense />
            <q-input v-model="editUser.lastname" label="Lastname" dense />
            <q-input v-model="editUser.username" label="Username" dense />
            <q-input v-model="editUser.password" label="Password" dense />
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="negative" @click="editDialog = false" />
              <q-btn type="submit" label="Update" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Are you sure you want to delete this user?</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" @click="deleteDialog = false" />
          <q-btn label="Delete" color="primary" @click="confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const addDialog = ref(false)
const editDialog = ref(false)
const searchQuery = ref('')
const deleteDialog = ref(false)
const userToDelete = ref(null)
const passwordVisible = ref({})

function togglePasswordVisibility(id) {
  passwordVisible.value[id] = !passwordVisible.value[id]
}

function openEditDialog(user) {
  editUser.value = { ...user }
  editDialog.value = true
}

function showDeleteDialog(employee) {
  userToDelete.value = employee
  deleteDialog.value = true
}

function confirmDelete() {
  deleteUser(userToDelete.value.id)
  deleteDialog.value = false
}

const newUser = ref({
  name: '',
  lastname: '',
  username: '',
  password: ''
})

const editUser = ref({})

const columns = [
  // {
  //   name: 'id',
  //   label: 'ID',
  //   field: row => row.id,
  //   sortable: true,
  //   align: 'center'
  // },
  {
    name: 'name',
    label: 'Name',
    field: row => row.name,
    sortable: true,
    align: 'left'
  },
  {
    name: 'lastname',
    label: 'Lastname',
    field: row => row.lastname,
    sortable: true,
    align: 'left'
  },
  {
    name: 'username',
    label: 'Username',
    field: row => row.username,
    sortable: true,
    align: 'left'
  },
  {
    name: 'password',
    label: 'Password',
    field: row => row.password,
    align: 'left'
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions'
  }
]

async function fetchUsers() {
  try {
    const response = await axios.get('http://localhost:8080/api/users')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

async function createUser() {
  try {
    const payload = {
      ...newUser.value,
      position: newUser.value.position === 'Other' ? newUser.value.customPosition : newUser.value.position
    }

    await axios.post('http://localhost:8080/api/users/create', payload)

    newUser.value = { name: '', lastname: '', username: '', password: ''}
    addDialog.value = false
    fetchUsers()
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

async function updateUser() {
  try {
    const payload = {
      ...editUser.value,
      position: editUser.value.position === 'Other' ? editUser.value.customPosition : editUser.value.position
    }

    await axios.put('http://localhost:8080/api/users/update', payload)

    editDialog.value = false
    fetchUsers()
  } catch (error) {
    console.error('Error updating user:', error)
  }
}

async function deleteUser(id) {
  try {
    await axios.delete('http://localhost:8080/api/users/delete', { data: { id: id } })
    fetchUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.scrollable-table {
  max-height: 600px;
  overflow-y: auto;
}

.q-table__header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}

.q-th {
  background-color: #f5f5f5;
}

.q-mt-sm {
  margin-top: 8px;
}
.editUser{
  width: 400px;
}
</style>
