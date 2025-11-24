document.getElementById("btn").addEventListener("click", obtenerDatos);

function obtenerDatos() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(respuesta => respuesta.json())
        .then(datos => {
            let html = "";
            datos.forEach(user => {
                html += `<p><strong>${user.name}</strong> - ${user.email}</p>`;
            });
            document.getElementById("resultado").innerHTML = html;
        })
        .catch(error => console.error("Error:", error));
}