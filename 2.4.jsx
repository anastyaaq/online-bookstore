// Додавання розділу для вибору жанру
<select onChange={handleGenreChange}>
    <option value="">Оберіть жанр</option>
    <option value="Фантастика">Фантастика</option>
    <option value="Роман">Роман</option>
    <option value="Пригоди">Пригоди</option>
    {/* Додайте інші жанри за необхідності */}
</select>

// Оновлення функції для пошуку книг за жанром
const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    if (selectedGenre !== '') {
        axios.get(`http://localhost:5500/books/genre/${selectedGenre}`)
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books by genre:', error));
    } else {
        // Якщо користувач вибрав "Оберіть жанр", отримати всі книги
        axios.get('http://localhost:5500/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }
};
