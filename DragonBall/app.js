async function searchCharacter() {
    const name = document.getElementById("searchInput").value.trim();

    if (name === "") {
        alert("Escribe un nombre para buscar.");
        return;
    }

    const url = `https://dragonball-api.com/api/characters?name=${name}`;

    const response = await fetch(url);
    const data = await response.json();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 

    if (data.items.length === 0) {
        resultsDiv.innerHTML = "<p>No se encontró ningún personaje.</p>";
        return;
    }

    const character = data.items[0];

    resultsDiv.innerHTML = `
        <div class="character-card">
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p><strong>Raza:</strong> ${character.race}</p>
            <p><strong>Género:</strong> ${character.gender}</p>
            <p><strong>Ki:</strong> ${character.ki}</p>
            <p><strong>Descripción:</strong> ${character.description}</p>
        </div>
    `;
}