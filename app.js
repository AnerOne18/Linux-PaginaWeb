async function buscarPersonaje() {
    const nombre = document.getElementById("nombre").value.trim();

    if (!nombre) {
        alert("Escribe un nombre");
        return;
    }

    try {
        const respuesta = await fetch(`https://dragonball-api.vercel.app/api/characters?name=${nombre}`);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // La API regresa un arreglo, ejemplo: [ {...personaje...} ]
        if (datos.length === 0) {
            document.getElementById("resultado").innerHTML = "❌ Personaje no encontrado.";
            return;
        }

        const personaje = datos[0];

        document.getElementById("resultado").innerHTML = `
            <h2>${personaje.name}</h2>
            <img src="${personaje.image}" width="200">
            <p><strong>Raza:</strong> ${personaje.race}</p>
            <p><strong>Ki:</strong> ${personaje.ki}</p>
            <p><strong>Ki Máximo:</strong> ${personaje.maxKi}</p>
            <p><strong>Planeta:</strong> ${personaje.originPlanet?.name || "Desconocido"}</p>
        `;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("resultado").innerHTML = "⚠ Error al consultar la API";
    }
}