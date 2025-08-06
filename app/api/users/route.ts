import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In a real app, you'd use a database
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
]

let nextId = 4

// GET /api/users - Get all users
export async function GET() {
  return NextResponse.json(users)
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, age } = body

    if (!name || !email || !age) {
      return NextResponse.json(
        { error: 'Name, email, and age are required' },
        { status: 400 }
      )
    }

    const newUser = {
      id: nextId++,
      name,
      email,
      age: parseInt(age),
    }

    users.push(newUser)
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
}
