import { defineStore } from 'pinia'
import axios from 'axios'

export interface User {
  id?: number | null
  name: string
  email: string
  phone: string
  address: string
  gender: string
  profession: string
}

const BASE_URL = import.meta.env.VITE_BASE_URL
console.log(BASE_URL, 'BASE URL')

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    selectedUser: {} as User
  }),
  actions: {
    // Fetch users from API
    async fetchUsers() {
      try {
        const response = await axios.get(`${BASE_URL}/users`)

        const data = await response?.data
        this.users = data?.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          gender: user.gender,
          profession: user.profession
        }))
        console.log(this.users, 'fetched data')
        return this.users
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },

    // Add a new user
    async addUser(newUser: User) {
      try {
        const response = await axios.post(`${BASE_URL}/users`, newUser)
        const data = await response?.data
      } catch (error) {
        console.error('Error creating user:', error)
      }
    },

    async updateUser(updatedUser: User) {
      try {
        const response = await axios.patch(`${BASE_URL}/users/${updatedUser?.id}`, updatedUser)
        const data = response.data
      } catch (error) {
        console.error('Error updating user:', error)
        throw error
      }
    },

    // Delete a user
    async deleteUser(userId: any) {
      try {
        const response = await axios.delete(`${BASE_URL}/users/${userId}`)
        const data = await response?.data
      } catch (error) {
        console.error('Error creating user:', error)
      }
    },

    setSelectedUser(currentUser: User) {
      this.selectedUser = currentUser
    }
  }
})
