// API configuration and helper functions for Spring Boot integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

export interface User {
  id: number
  name: string
  email: string
  age: number
}

export interface CreateUserRequest {
  name: string
  email: string
  age: number
}

export interface UpdateUserRequest {
  name: string
  email: string
  age: number
}

// API helper functions
export const userApi = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`)
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    return response.json()
  },

  // Get user by ID
  getById: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }
    return response.json()
  },

  // Create new user
  create: async (user: CreateUserRequest): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if (!response.ok) {
      throw new Error('Failed to create user')
    }
    return response.json()
  },

  // Update user
  update: async (id: number, user: UpdateUserRequest): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if (!response.ok) {
      throw new Error('Failed to update user')
    }
    return response.json()
  },

  // Delete user
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
  },

  // Search users by name
  searchByName: async (name: string): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users/search?name=${encodeURIComponent(name)}`)
    if (!response.ok) {
      throw new Error('Failed to search users')
    }
    return response.json()
  }
}
