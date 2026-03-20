// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
document.addEventListener('DOMContentLoaded', () => {
  const stateInput = document.querySelector('#state-input');
  const fetchButton = document.querySelector('#fetch-alerts');
  const alertsDisplay = document.querySelector('#alerts-display');
  const errorMessage = document.querySelector('#error-message');

  function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
  }

  function displayAlerts(data) {
    alertsDisplay.innerHTML = '';

    const summary = document.createElement('h2');
    summary.textContent = `${data.title}: ${data.features.length}`;
    alertsDisplay.appendChild(summary);

    const list = document.createElement('ul');

    data.features.forEach(alert => {
      const listItem = document.createElement('li');
      listItem.textContent = alert.properties.headline;
      list.appendChild(listItem);
    });

    alertsDisplay.appendChild(list);
  }
// *******
  function fetchWeatherAlerts(state) {
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        clearError();
        displayAlerts(data);
      })
      .catch(errorObject => {
        console.log(errorObject.message);
        showError(errorObject.message);
      });
  }

  fetchButton.addEventListener('click', () => {
    const state = stateInput.value.trim().toUpperCase();

    stateInput.value = '';
    alertsDisplay.innerHTML = '';

    if (!state) {
      showError('Please enter a state abbreviation');
      return;
    }

    fetchWeatherAlerts(state);
  });
});