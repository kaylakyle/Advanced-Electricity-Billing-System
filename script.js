//  Helpers 

// Activity log helper
function addActivity(text, color = 'green') {
    const list = document.getElementById('activity-log');
    if (!list) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="dot ${color}"></span>
        <span class="activity-text">${text}</span>
        <span class="time">just now</span>
    `;
    list.prepend(li);
}

// Toast notification helper
function showToast(title, message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    document.getElementById('toast-title').textContent = title;
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

//Stats Interactions 
function showDetails(kind) {
    addActivity(`Viewed ${kind} details`, 'blue');
    showToast('Details', `Opened ${kind} details`);
}

//  Quick Actions 
function onlyDigits(s) { return parseInt(String(s).replace(/[^\d]/g, '')) || 0; }
function fmt(n) { return n.toLocaleString(); }

function addCustomer() {
    const el = document.getElementById('customers-count');
    if (!el) return;
    el.textContent = fmt(onlyDigits(el.textContent) + 1);
    addActivity('New customer added', 'green');
    showToast('Customer Added', 'A new customer was added successfully.');
}

function generateBill() {
    const el = document.getElementById('pending');
    if (!el) return;
    el.textContent = fmt(onlyDigits(el.textContent) + 1);
    addActivity('New bill generated', 'yellow');
    showToast('Bill Generated', 'A new bill has been created.');
}

function recordPayment() {
    const el = document.getElementById('revenue');
    if (!el) return;
    el.textContent = 'KSh ' + fmt(onlyDigits(el.textContent) + 500); // demo increment
    addActivity('Payment recorded', 'green');
    showToast('Payment Recorded', 'Payment has been recorded.');
}

function viewReports() {
    addActivity('Viewed reports', 'blue');
    showToast('Reports', 'Reports opened successfully.');
}

//  Initialization 
document.addEventListener('DOMContentLoaded', () => {
    // Lucide icons
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Set welcome message dynamically from login
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('userRole');

    if (!username || !role) {
        // redirect to login if no user info
        window.location.href = 'login.html';
        return;
    }

    const welcomeTop = document.getElementById('welcomeTop');
    const welcomeMessage = document.getElementById('welcomeMessage');

    if (welcomeTop) welcomeTop.innerText = `Welcome ${username}`;
    if (welcomeMessage) welcomeMessage.innerText = `You are logged in as ${role}`;
});

// Dashboard Script

// Helper functions
const onlyDigits = s => parseInt(String(s).replace(/[^\d]/g,'')) || 0;
const fmt = n => n.toLocaleString();

// Load stats from localStorage or use defaults
function loadStats() {
  const customers = parseInt(localStorage.getItem('customersCount')) || 1234;
  const revenue   = parseInt(localStorage.getItem('revenueAmount')) || 45670;
  const pending   = parseInt(localStorage.getItem('pendingBills')) || 23;
  const units     = parseInt(localStorage.getItem('unitsConsumed')) || 89430;

  document.getElementById('customers-count').textContent = fmt(customers);
  document.getElementById('revenue').textContent = 'KSh ' + fmt(revenue);
  document.getElementById('pending').textContent = fmt(pending);
  document.getElementById('units').textContent = fmt(units);
}

// Welcome & Role Display
document.addEventListener("DOMContentLoaded", function() {
  // Lucide icons
  if (typeof lucide !== "undefined") lucide.createIcons();

  // Load user info
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("userRole");

  if (!username || !role) {
    window.location.href = "login.html"; // redirect if not logged in
    return;
  }

  // Update topbar
  const welcomeTop = document.getElementById("welcomeTop");
  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeTop) welcomeTop.innerText = `Welcome ${username}`;
  if (welcomeMessage) welcomeMessage.innerText = `Welcome back, ${role}`;

  // Load stats
  loadStats();

  // Load activity log
  loadActivities();
});

// Activities
function loadActivities() {
  const saved = JSON.parse(localStorage.getItem('activityLog')) || [];
  const list = document.getElementById('activity-log');
  if (!list) return;

  list.innerHTML = ''; // clear default
  if (saved.length === 0) {
    // initial system initialized
    addActivity('System initialized', 'green', false);
  } else {
    saved.forEach(item => addActivity(item.text, item.color, false));
  }
}

function addActivity(text, color='green', save=true) {
  const list = document.getElementById('activity-log');
  if (!list) return;

  const li = document.createElement('li');
  li.innerHTML = `<span class="dot ${color}"></span>
                  <span class="activity-text">${text}</span>
                  <span class="time">just now</span>`;
  list.prepend(li);

  // Save activity log
  if (save) {
    let saved = JSON.parse(localStorage.getItem('activityLog')) || [];
    saved.unshift({text, color});
    localStorage.setItem('activityLog', JSON.stringify(saved));
  }
}

// Toast Notifications
function showToast(title, message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-message').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Stats / Quick Actions
function showDetails(kind) {
  addActivity(`Viewed ${kind} details`, 'blue');
  showToast('Details', `Opened ${kind} details`);
}

function addCustomer() {
  const el = document.getElementById('customers-count');
  const newVal = onlyDigits(el.textContent) + 1;
  el.textContent = fmt(newVal);
  localStorage.setItem('customersCount', newVal);
  addActivity('New customer added', 'green');
  showToast('Customer Added', 'A new customer was added successfully.');
}

function generateBill() {
  const el = document.getElementById('pending');
  const newVal = onlyDigits(el.textContent) + 1;
  el.textContent = fmt(newVal);
  localStorage.setItem('pendingBills', newVal);
  addActivity('New bill generated', 'yellow');
  showToast('Bill Generated', 'A new bill has been created.');
}

function recordPayment() {
  const el = document.getElementById('revenue');
  const newVal = onlyDigits(el.textContent) + 500; // demo increment
  el.textContent = 'KSh ' + fmt(newVal);
  localStorage.setItem('revenueAmount', newVal);
  addActivity('Payment recorded', 'green');
  showToast('Payment Recorded', 'Payment has been recorded.');
}

function viewReports() {
  addActivity('Viewed reports', 'blue');
  showToast('Reports', 'Reports opened successfully.');
}

// Logout
const logoutBtn = document.querySelector('.logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    // Clear login info but keep stats/activity if you want
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    window.location.href = 'login.html';
  });
}
