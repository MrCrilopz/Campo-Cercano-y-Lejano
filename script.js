function convertToMeters(value, unit) {
    return value * unit;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Resultado copiado al portapapeles.");
    });
}

function updateConversionTable(farField, nearField, validFarField, validNearField) {
    const conversionTable = document.getElementById("conversionTable");
    const tbody = conversionTable.querySelector("tbody");

    tbody.innerHTML = '';

    if (validFarField) {
        tbody.innerHTML += `
            <tr>
                <td>Metros</td>
                <td>${farField.toFixed(2)}</td>
                <td>${validNearField ? nearField.toFixed(2) : '-'}</td>
            </tr>
            <tr>
                <td>Kilómetros</td>
                <td>${(farField / 1000).toFixed(6)}</td>
                <td>${validNearField ? (nearField / 1000).toFixed(6) : '-'}</td>
            </tr>
            <tr>
                <td>Centímetros</td>
                <td>${(farField * 100).toFixed(2)}</td>
                <td>${validNearField ? (nearField * 100).toFixed(2) : '-'}</td>
            </tr>
            <tr>
                <td>Milímetros</td>
                <td>${(farField * 1000).toFixed(2)}</td>
                <td>${validNearField ? (nearField * 1000).toFixed(2) : '-'}</td>
            </tr>
        `;
    } else if (validNearField) {
        tbody.innerHTML += `
            <tr>
                <td>Metros</td>
                <td>-</td>
                <td>${nearField.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Kilómetros</td>
                <td>-</td>
                <td>${(nearField / 1000).toFixed(6)}</td>
            </tr>
            <tr>
                <td>Centímetros</td>
                <td>-</td>
                <td>${(nearField * 100).toFixed(2)}</td>
            </tr>
            <tr>
                <td>Milímetros</td>
                <td>-</td>
                <td>${(nearField * 1000).toFixed(2)}</td>
            </tr>
        `;
    }

    conversionTable.style.display = 'table';
}

function hideConversionTable() {
    const conversionTable = document.getElementById("conversionTable");
    conversionTable.style.display = 'none';
}

function resetFields() {
    document.getElementById("fieldForm").reset();
    document.getElementById("result").innerText = '';
    hideConversionTable();
}

function calculateFields() {
    let antennaDiameter = parseFloat(document.getElementById("antennaDiameter").value);
    let antennaDiameterUnit = parseFloat(document.getElementById("antennaDiameterUnit").value);

    let antennaDimension = parseFloat(document.getElementById("antennaDimension").value);
    let antennaDimensionUnit = parseFloat(document.getElementById("antennaDimensionUnit").value);

    let wavelength = parseFloat(document.getElementById("wavelength").value);
    let wavelengthUnit = parseFloat(document.getElementById("wavelengthUnit").value);

    let resultText = '';
    let farFieldDistance = 0;
    let nearFieldDistance = 0;
    let validFarField = false;
    let validNearField = false;

    if (!isNaN(antennaDiameter)) {
        antennaDiameter = convertToMeters(antennaDiameter, antennaDiameterUnit);
    }

    if (!isNaN(antennaDimension)) {
        antennaDimension = convertToMeters(antennaDimension, antennaDimensionUnit);
    }

    if (!isNaN(wavelength)) {
        wavelength = convertToMeters(wavelength, wavelengthUnit);
    }

    if (!isNaN(antennaDiameter) && !isNaN(wavelength)) {
        farFieldDistance = (2 * Math.pow(antennaDiameter, 2)) / wavelength;
        resultText += `Distancia de campo lejano: ${farFieldDistance.toFixed(2)} metros\n`;
        validFarField = true;
    }

    if (!isNaN(antennaDimension) && !isNaN(wavelength)) {
        nearFieldDistance = (2 * Math.pow(antennaDimension, 2)) / wavelength;
        resultText += `Distancia de campo cercano: ${nearFieldDistance.toFixed(2)} metros\n`;
        validNearField = true;
    }

    if (resultText === '') {
        resultText = 'Por favor, complete los campos necesarios para al menos una fórmula.';
        hideConversionTable();
    }

    let resultElement = document.getElementById("result");
    resultElement.innerText = resultText;

    if (validFarField || validNearField) {
        updateConversionTable(farFieldDistance, nearFieldDistance, validFarField, validNearField);
    } else {
        hideConversionTable();
    }
}
