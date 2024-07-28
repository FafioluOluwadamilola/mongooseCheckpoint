import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


  const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

// Create the Person model
const Person = model('Person', personSchema);

// Function to create and save a person
const createAndSavePerson = async () => {
  try {
    const person = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['Pizza', 'Burger']
    });

    const savedPerson = await person.save();
    console.log('Person saved:', savedPerson);
  } catch (error) {
    console.error('Error saving person:', error);
  }
};

createAndSavePerson();


// Function to create many people
const createManyPeople = async (arrayOfPeople) => {
  try {
    const people = await Person.create(arrayOfPeople);
    console.log('People created:', people);
  } catch (err) {
    console.error(err);
  }
};

createManyPeople([
  { name: 'Jane Doe', age: 25, favoriteFoods: ['Sushi', 'Salad'] },
  { name: 'Mike Smith', age: 40, favoriteFoods: ['Steak', 'Fries'] }
]);




// Function to find people by name
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log('People found:', people);
  } catch (err) {
    console.error(err);
  }
};

findPeopleByName('John Doe');



// Function to find one person by favorite food
const findOneByFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log('Person with favourite food:', person);
  } catch (err) {
    console.error(err);
  }
};

findOneByFood('Pizza');


// Function to find a person by ID
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log('Person found:', person);
  } catch (err) {
    console.error(err);
  }
};

findPersonById('66a68a71d283a64369c83c14');


// Function to find, edit, and save a person
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    if (!person) {
      console.log('Person not found');
      return;
    }
    person.favoriteFoods.push('hamburger');
    const updatedPerson = await person.save();
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

findEditThenSave('66a68b57337208434d553d11');


// Function to find and update a person by name
const findAndUpdate = async (personName) => {
  const ageToSet = 20;
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: ageToSet },
      { new: true }
    );
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
};

findAndUpdate('John Doe');


// Function to remove a person by ID
const removeById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndDelete(personId);
    console.log('Person removed:', removedPerson);
  } catch (err) {
    console.error(err);
  }
};

removeById('66a68b57337208434d553d0f');


// Function to remove many people by name
const removeManyPeople = async (name) => {
  try {
    const result = await Person.deleteMany({ name });
    console.log('People removed:', result);
  } catch (err) {
    console.error(err);
  }
};

removeManyPeople('kiloe');


// Function to execute a query chain
const queryChain = async () => {
  try {
    const people = await Person.find({ favoriteFoods: 'Sushi' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec();
    console.log('People found:', people);
  } catch (err) {
    console.error(err);
  }
};

queryChain();