# PETS JOURNAL API

This is a practical project in development to sharpen my skills and to register my pets life.

It will be made using NODE + Express. And further explantions will be made as the project is made.

REQUIREMENTS OF THE APPLICATION

USER
  A USER SHOULD BE ABLE TO CREATE A NEW ACCOUNT
  A USER SHOULD BE ABLE TO MANIUPULATE A PET (CRUD)
  A USER SHOULD BE ABLE TO MANIPULATE AN VACCINE TO AN EXISTING PET (CRUD)
  A USER SHOULD BE ABLE TO MANIPULATE A TREATMENT TO AN EXISTING PET (CRUD)
  
  id, name, email, password, created_at, updated_at
  
PET  
  id, name, species (MAP OPTIONS), weight, color, breed, chip_number, chip_website, birthdate, user_id, created_at, updated_at

VACCINATION
  id, name, doses, pet_id, next_vaccine, created_at, updated_at

TREATMENTS
  id, name, description, pet_id, consult_id, created_at, updated_at
  
REMEDIES
  id, name, description, expires, treatment_id, created_at, updated_at
  
APPOINTMENTS
  id, name, description, start_date, end_date, pet_id, user_id, created_at, updated_at

CONSULTS
  id, description, pet_id, date, created_at

