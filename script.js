const typeSelect = document.getElementById("unit_types");
const valueSelect1 = document.getElementById("from_types");
const valueSelect2 = document.getElementById("to_types");
const fromInput = document.getElementById("from_in");
const toInput = document.getElementById("to_in");

// Define unit options for different types
const options = {
    length: [
        { value: "meter", text: "Meter" },
        { value: "centimeter", text: "Centimeter" },
        { value: "inch", text: "Inch" },
        { value: "foot", text: "Foot" }
    ],
    area: [
        { value: "square_meter", text: "Square Meter" },
        { value: "square_kilometer", text: "Square Kilometer" },
        { value: "hectare", text: "Hectare" },
        { value: "acre", text: "Acre" }
    ],
    volume: [
        { value: "liter", text: "Liter" },
        { value: "milliliter", text: "Milliliter" },
        { value: "cubic_meter", text: "Cubic Meter" },
        { value: "gallon", text: "Gallon" }
    ],
    weight: [
        { value: "kilogram", text: "Kilogram" },
        { value: "gram", text: "Gram" },
        { value: "pound", text: "Pound" },
        { value: "ounce", text: "Ounce" }
    ],
    temperature: [
        { value: "celsius", text: "Celsius" },
        { value: "fahrenheit", text: "Fahrenheit" },
        { value: "kelvin", text: "Kelvin" }
    ]
};

// Define conversion rates
const conversions = {
    length: {
        meter: 1,
        centimeter: 100,
        inch: 39.3701,
        foot: 3.28084
    },
    area: {
        square_meter: 1,
        square_kilometer: 0.000001,
        hectare: 0.0001,
        acre: 0.000247105
    },
    volume: {
        liter: 1,
        milliliter: 1000,
        cubic_meter: 0.001,
        gallon: 0.264172
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        pound: 2.20462,
        ounce: 35.274
    },
    temperature: {
        celsius: value => value,
        fahrenheit: value => (value - 32) * (5 / 9),
        kelvin: value => value - 273.15
    }
};

// Populate dropdown options
function updateOptions(type, selectElement) {
    selectElement.innerHTML = ""; // Clear existing options
    options[type].forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.text;
        selectElement.appendChild(opt);
    });
}

// Convert value from one unit to another
function convert(value, fromUnit, toUnit, unitType) {
    if (unitType === "temperature") {
        let celsiusValue;
        if (fromUnit === "celsius") {
            celsiusValue = value;
        } else if (fromUnit === "fahrenheit") {
            celsiusValue = (value - 32) * (5 / 9);
        } else if (fromUnit === "kelvin") {
            if (value < 0) return NaN; // Invalid Kelvin
            celsiusValue = value - 273.15;
        }
        if (toUnit === "celsius") return celsiusValue;
        if (toUnit === "fahrenheit") return (celsiusValue * 9) / 5 + 32;
        if (toUnit === "kelvin") return celsiusValue + 273.15;
    } else {
        const fromRate = conversions[unitType][fromUnit];
        const toRate = conversions[unitType][toUnit];
        return value * (fromRate / toRate);
    }
}

// Perform the calculation and update the "to" input
function calculate() {
    const value = parseFloat(fromInput.value);
    const unitType = typeSelect.value;
    const fromUnit = valueSelect1.value;
    const toUnit = valueSelect2.value;

    if (!isNaN(value) && fromUnit && toUnit) {
        const result = convert(value, fromUnit, toUnit, unitType);
        toInput.value = isNaN(result) ? "Invalid input" : result.toFixed(2);
    } else {
        toInput.value = "Invalid input";
    }
}

// Add event listeners for user interactions
typeSelect.addEventListener("change", () => {
    const selectedType = typeSelect.value;
    updateOptions(selectedType, valueSelect1);
    updateOptions(selectedType, valueSelect2);
    fromInput.value = "";
    toInput.value = "";
});

fromInput.addEventListener("input", calculate);
valueSelect1.addEventListener("change", calculate);
valueSelect2.addEventListener("change", calculate);

// Initialize dropdowns with default values on page load
document.addEventListener("DOMContentLoaded", () => {
    const defaultType = typeSelect.value; // Default to "area"
    updateOptions(defaultType, valueSelect1);
    updateOptions(defaultType, valueSelect2);
});