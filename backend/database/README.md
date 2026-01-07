# Database Schema



 Tables
 users
Stores registered users of the platform.

Fields:
 id: Primary key
 name: User full name
 email: Unique email address
 password: Hashed password
 role: buyer | seller | admin
 created_at: Account creation timestamp
