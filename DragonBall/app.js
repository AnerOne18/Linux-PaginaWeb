function buscar() {
    const nombre = document.getElementById("searchInput").value.trim();
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = "Buscando...";

    if (nombre === "") {
        contenedor.innerHTML = "Escribe un nombre primero.";
        return;
    }

    fetch(`https://dragonball-api.vercel.app/api/character?name=${nombre}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (!data || data.length === 0) {
                contenedor.innerHTML = "No se encontró el personaje.";
                return;
            }

            let personaje = data[0];

            contenedor.innerHTML = `
                <h2>${personaje.name}</h2>
                <img src="${personaje.image}" alt="imagen">
                <p><strong>Raza:</strong> ${personaje.race}</p>
                <p><strong>Ki:</strong> ${personaje.ki}</p>
                <p><strong>Afiliación:</strong> ${personaje.affiliation}</p>
            `;
        })
        .catch(err => {
            console.error(err);
            contenedor.innerHTML = "Error al consultar la API.";
        });
}