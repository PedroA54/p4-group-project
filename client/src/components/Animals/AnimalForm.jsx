import React, { useState } from 'react';



function AddAnimal() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [age, setAge] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [photo, setPhoto] = useState(''); // Initialize to empty string
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate age to be within 1 to 30
        if (age < 1 || age > 30) {
            alert('Age must be between 1 and 30');
            return;
        }

        try {
            const response = await fetch('/animals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    species: species,
                    age: age,
                    photo: photo
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add animal');
            }

            const newAnimal = await response.json();
            console.log('Animal added:', newAnimal);

            // Set the success message
            setSuccessMessage('Animal has been added to profile');
            setName('');
            setAge('');
            setSpecies('');
            setPhoto('');

            // Navigate to the desired route after successful submission
            // history.push('/home');
        } catch (error) {
            console.error('Failed to add animal:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Animal</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Species:</label>
                <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    required
                >
                    <option value="">Select Animal Type</option>
                    <option value="Cat">Cat</option>
                    <option value="Dog">Dog</option>
                    <option value="Ferret">Ferret</option>
                    <option value="Horse">Horse</option>
                    <option value="Snake">Snake</option>
                    <option value="Fish">Fish</option>
                </select>
            </div>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    placeholder='Age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                    max="30"
                    required
                />
            </div>
            <div>
                <label>Photo:</label>
                <input
                    type="text" 
                    placeholder='Insert Photo URL'
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />
            </div>
            <button type="submit">Add Animal</button>
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}

export default AddAnimal;
