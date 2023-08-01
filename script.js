// Global variables
let selectedTea = null;
let brewingTimer = null;
let customers = [{
    name: "Lily",
    teaPreference: "Green Tea"
  },
  {
    name: "Mr. Smith",
    teaPreference: "Black Tea"
  },
  {
    name: "Emilia",
    teaPreference: "Jasmine Tea"
  },
  {
    name: "Captain Roberts",
    teaPreference: "Chai Tea"
  },
  {
    name: "Madame Rose",
    teaPreference: "Oolong Tea"
  },
  {
    name: "Professor Connor",
    teaPreference: "Butterfly Pea Flower Tea"
  }
];
let customerTimer = null;

// Tea options with brewing times and temperatures in minutes and Celsius, respectively
const teaOptions = [{
    name: "Green Tea",
    brewingTime: 15,
    brewingTemperature: 75
  },
  {
    name: "Black Tea",
    brewingTime: 20,
    brewingTemperature: 95
  },
  {
    name: "Jasmine Tea",
    brewingTime: 25,
    brewingTemperature: 80
  },
  {
    name: "Chai Tea",
    brewingTime: 30,
    brewingTemperature: 85
  },
  {
    name: "Oolong Tea",
    brewingTime: 25,
    brewingTemperature: 90
  },
  {
    name: "Butterfly Pea Flower Tea",
    brewingTime: 20,
    brewingTemperature: 85
  }
];

// Function to start brewing a selected tea
function brewTea(teaIndex) {
  selectedTea = teaOptions[teaIndex];
  clearInterval(brewingTimer);
  let brewingTimeInSeconds = selectedTea.brewingTime * 60;
  let currentTime = 0;
  updateBrewingProgress(0);
  brewingTimer = setInterval(() => {
    updateBrewingProgress((++currentTime) / brewingTimeInSeconds * 100);
    if (currentTime >= brewingTimeInSeconds) {
      clearInterval(brewingTimer);
      completeBrewing();
    }
  }, 1000);
}

// Function to brew a tea with custom brewing time and temperature
function customBrewTea() {
  const customBrewingTime = parseInt(document.getElementById("brewing-time").value);
  const customBrewingTemperature = parseInt(document.getElementById("brewing-temperature").value);

  // Validate input
  if (isNaN(customBrewingTime) || isNaN(customBrewingTemperature)) {
    alert("Please enter valid brewing time and temperature.");
    return;
  }

  // Check if the custom brewing time is within the valid range (1 to 120 minutes)
  if (customBrewingTime < 1 || customBrewingTime > 120) {
    alert("Please enter a brewing time between 1 and 120 minutes.");
    return;
  }

  // Check if the custom brewing temperature is within the valid range (50°C to 100°C)
  if (customBrewingTemperature < 50 || customBrewingTemperature > 100) {
    alert("Please enter a brewing temperature between 50°C and 100°C.");
    return;
  }

  // Brew the custom tea
  selectedTea = {
    name: "Custom Tea",
    brewingTime: customBrewingTime,
    brewingTemperature: customBrewingTemperature
  };
  clearInterval(brewingTimer);
  let brewingTimeInSeconds = selectedTea.brewingTime * 60;
  let currentTime = 0;
  updateBrewingProgress(0);
  brewingTimer = setInterval(() => {
    updateBrewingProgress((++currentTime) / brewingTimeInSeconds * 100);
    if (currentTime >= brewingTimeInSeconds) {
      clearInterval(brewingTimer);
      completeBrewing();
    }
  }, 1000);
}

// Function to update the brewing progress bar
function updateBrewingProgress(progressPercentage) {
  document.getElementById("progress-bar-fill").style.width = progressPercentage + "%";
}

// Function to complete the brewing process
function completeBrewing() {
  // Check if the player is too early or too late and handle customer satisfaction accordingly
  let customerSatisfaction = calculateCustomerSatisfaction();
  // Display customer feedback
  displayCustomerFeedback(customerSatisfaction);
  // Add the earned points and rewards
  // Prepare for the next customer
  handleCustomerRequest();
}

// Function to calculate customer satisfaction based on the brewing time
function calculateCustomerSatisfaction() {
  let customerPreference = customers[0].teaPreference;
  let satisfactionLevel = 100 - Math.abs(selectedTea.brewingTime - getBrewingTimeForTea(customerPreference)) * 10;
  if (satisfactionLevel < 0) satisfactionLevel = 0;
  return satisfactionLevel;
}

// Function to generate a random customer request
function generateCustomerRequest() {
  const randomIndex = Math.floor(Math.random() * customers.length);
  const customer = customers[randomIndex];
  const teaPreference = customer.teaPreference;
  const requestMessage = `${customer.name} requests ${teaPreference}.`;
  displayCustomerRequest(requestMessage);
}

// Function to handle customer requests
function handleCustomerRequest() {
  generateCustomerRequest();
  customerTimer = setInterval(() => {
    generateCustomerRequest();
  }, 10000); // Generate a new request every 10 seconds
}

// Function to display customer request
function displayCustomerRequest(requestMessage) {
  document.getElementById("customer-request").innerText = requestMessage;
}

// Function to fulfill a customer request
function fulfillCustomerRequest() {
  if (!selectedTea) {
    alert("Please select a tea to brew first.");
    return;
  }

  // Check if the player is too early or too late and handle customer satisfaction accordingly
  let customerSatisfaction = calculateCustomerSatisfaction();
  // Display customer feedback
  displayCustomerFeedback(customerSatisfaction);
  // Add the earned points and rewards
  // Prepare for the next customer
  handleCustomerRequest();
}

// Function to display customer feedback
function displayCustomerFeedback(customerSatisfaction) {
  // Show customer feedback to the player (e.g., with alert or message box)
  alert(`Customer satisfaction: ${customerSatisfaction}%`);
}

// Function to get the brewing time for a specific tea
function getBrewingTimeForTea(teaName) {
  const selectedTeaOption = teaOptions.find((tea) => tea.name === teaName);
  return selectedTeaOption ? selectedTeaOption.brewingTime : 0;
}

// Function to buy an upgrade
function buyUpgrade(upgradeIndex) {
  // Implement upgrade logic here
  // For example, increase tea brewing speed or unlock new features
  alert("Upgrade feature not implemented in this demo.");
}

// Function to get the brewing time for a specific tea
function getBrewingTimeForTea(teaName) {
  const selectedTeaOption = teaOptions.find((tea) => tea.name === teaName);
  return selectedTeaOption ? selectedTeaOption.brewingTime : 0;
}

function updateBrewingTime() {
  const selectedInterval = parseInt(document.getElementById("interval-selector").value);
  teaOptions.forEach((tea) => {
    tea.brewingTime = adjustBrewingTime(tea.brewingTime, selectedInterval);
  });
} // Function to adjust the brewing time based on the selected interval 
function adjustBrewingTime(brewingTime, selectedInterval) { switch (selectedInterval) { case 5: return Math.ceil(brewingTime / 5) * 5; case 10: return Math.ceil(brewingTime / 10) * 10; case 30: return Math.ceil(brewingTime / 30) * 30; case 60: return Math.ceil(brewingTime / 60) * 60; default: return brewingTime; } }


// Entry point: Initialize the game
function initializeGame() {
  // Display initial customer request
  generateCustomerRequest();

  // Start handling customer requests
  handleCustomerRequest();
}

// Call the initializeGame function to start the game when the page is loaded
window.onload = initializeGame;
