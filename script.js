document.addEventListener('DOMContentLoaded', () => {
  const navHome = document.getElementById('nav-home');
  const navStats = document.getElementById('nav-stats');
  const navWeight = document.getElementById('nav-weight');
  const homeSection = document.getElementById('home-section');
  const statsSection = document.getElementById('stats-section');
  const weightSection = document.getElementById('weight-section');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Navigation
  navHome.addEventListener('click', () => {
    homeSection.classList.remove('hidden');
    statsSection.classList.add('hidden');
    weightSection.classList.add('hidden');
  });

  navStats.addEventListener('click', () => {
    homeSection.classList.add('hidden');
    statsSection.classList.remove('hidden');
    weightSection.classList.add('hidden');
    loadStats();
  });

  navWeight.addEventListener('click', () => {
    homeSection.classList.add('hidden');
    statsSection.classList.add('hidden');
    weightSection.classList.remove('hidden');
    loadChart();
  });

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
  });

  // Date and time
  const datetime = document.getElementById('datetime');
  setInterval(() => {
    const now = new Date();
    datetime.textContent = now.toLocaleString();
  }, 1000);

  // Weather
  const weather = document.getElementById('weather');
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Katowice,PL&units=metric&appid=YOUR_API_KEY')
    .then(response => response.json())
    .then(data => {
      weather.textContent = `${data.main.temp}°C, ${data.weather[0].description}`;
    });

  // Weight input
  const weightInputContainer = document.getElementById('weight-input-container');
  const weightInput = document.getElementById('weight-input');
  const saveWeight = document.getElementById('save-weight');

  saveWeight.addEventListener('click', () => {
    const weight = parseFloat(weightInput.value);
    if (!isNaN(weight)) {
      const today = new Date().toLocaleDateString();
      localStorage.setItem(`weight-${today}`, weight);
      weightInputContainer.style.display = 'none';
    }
  });

  // Food input
  const foodName = document.getElementById('food-name');
  const calories = document.getElementById('calories');
  const protein = document.getElementById('protein');
  const fat = document.getElementById('fat');
  const carbs = document.getElementById('carbs');
  const addFood = document.getElementById('add-food');
  const foodList = document.getElementById('food-list');
  const totalCalories = document.getElementById('total-calories');

  addFood.addEventListener('click', () => {
    const name = foodName.value;
    const cal = parseFloat(calories.value) || 0;
    const prot = parseFloat(protein.value) || 0;
    const f = parseFloat(fat.value) || 0;
    const c = parseFloat(carbs.value) || 0;
    if (name) {
      const today = new Date().toLocaleDateString();
      const foodItem = { name, cal, prot, f, c };
      let foods = JSON.parse(localStorage.getItem(`foods-${today}`)) || [];
      foods.push(foodItem);
      localStorage.setItem(`foods-${today}`, JSON.stringify(foods));
      displayFoods();
    }
  });

  function displayFoods() {
    const today = new Date().toLocaleDateString();
    const foods = JSON.parse(localStorage.getItem(`foods-${today}`)) || [];
    foodList.innerHTML = '';
    let total = 0;
    foods.forEach((food, index) => {
      total += food.cal;
      const li 
