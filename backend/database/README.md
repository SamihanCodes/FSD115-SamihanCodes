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

### listings
Stores livestock listings created by sellers.

Fields:
 id: Primary key
 seller_id: References users(id)
 animal_type: Type of animal (e.g., Cow, Buffalo)
 breed: Animal breed
 age: Age of the animal
 price: Listing price
 description: Additional details
 status: active | sold
 created_at: Listing creation time
