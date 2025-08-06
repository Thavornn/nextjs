import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In a real app, you'd use a database
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
]

// GET /api/users/[id] - Get a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const user = users.find(u => u.id === id)

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}

// PUT /api/users/[id] - Update a specific user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const { name, email, age } = body

    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (!name || !email || !age) {
      return NextResponse.json(
        { error: 'Name, email, and age are required' },
        { status: 400 }
      )
    }

    const updatedUser = {
      id,
      name,
      email,
      age: parseInt(age),
    }

    users[userIndex] = updatedUser
    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
}

// DELETE /api/users/[id] - Delete a specific user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const userIndex = users.findIndex(u => u.id === id)

  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  const deletedUser = users.splice(userIndex, 1)[0]
  return NextResponse.json(deletedUser)
}
