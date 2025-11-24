// URL de la API sin API key
const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const amountInput = document.getElementById("amount");
const resultText = document.getElementById("result");
const btnConvert = document.getElementById("convert");

// 1. Cargar las monedas al iniciar
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            fromSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
            toSelect.innerHTML += `<option value="${currency}">${currency}</option>`;
        });

        // Valores predeterminados
        fromSelect.value = "USD";
        toSelect.value = "MXN";
    })
    .catch(() => {
        alert("Error al cargar la API de monedas");
    });

// 2. Convertir cuando el usuario presione el botón
btnConvert.addEventListener("click", () => {

    const amount = parseFloat(amountInput.value);

    if (isNaN(amount)) {
        resultText.textContent = "Ingresa una cantidad válida.";
        return;
    }

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {

            const rateFrom = data.rates[fromSelect.value];
            const rateTo = data.rates[toSelect.value];

            // Conversión
            const usdAmount = amount / rateFrom;
            const converted = usdAmount * rateTo;

            resultText.textContent = `${amount} ${fromSelect.value} = ${converted.toFixed(2)} ${toSelect.value}`;
        })
        .catch(() => {
            resultText.textContent = "Error al consultar la API.";
        });
});