// Redirect to login if not logged in
if(!localStorage.getItem("username") || !localStorage.getItem("userRole")) {
    window.location.href = "login.html";
}


// Safe JSON parser 
function safeParse(data) {
  try { return JSON.parse(data) || []; } 
  catch (e) { return []; }
}

//  Load data 
function getCustomers() { return safeParse(localStorage.getItem("customers")); }
function getBills() { return safeParse(localStorage.getItem("bills")); }
function getPayments() { return safeParse(localStorage.getItem("payments")); }
function getActivities() { return safeParse(localStorage.getItem("activities")); }

// Update KPIs
function updateKPIs() {
  const customers = getCustomers();
  const bills = getBills();
  const payments = getPayments();

  document.getElementById("customers-count").textContent = customers.length;
  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.paidAmt || 0), 0);
  document.getElementById("revenue").textContent = `KSh ${totalRevenue}`;
  const pending = bills.reduce((sum, b) => {
    const payment = payments.find(p => p.meterNo === b.meterNo && p.month === b.month);
    const paid = payment ? Number(payment.paidAmt || 0) : 0;
    return sum + (Number(b.amount) - paid);
  }, 0);
  document.getElementById("pending").textContent = `KSh ${pending}`;
  const totalUnits = bills.reduce((sum, b) => sum + Number(b.units || 0), 0);
  document.getElementById("units").textContent = `${totalUnits} kWh`;
}

//  Update Activities
function updateActivities() {
  const activities = getActivities();
  const activityLog = document.getElementById("activity-log");
  activityLog.innerHTML = "";

  if (!activities.length) {
    activityLog.innerHTML = `<li>
      <span class="dot green"></span>
      <span class="activity-text">System initialized</span>
      <span class="time">just now</span>
    </li>`;
    return;
  }

  activities.slice(-5).reverse().forEach(act => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="dot ${act.type || "green"}"></span>
      <span class="activity-text">${act.text}</span>
      <span class="time">${act.time}</span>
    `;
    activityLog.appendChild(li);
  });
}


// Logout 
document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault(); // prevent default link behavior
    // Optional: clear session/login info if stored
    // localStorage.removeItem("loggedInUser"); 
    window.location.href = "login.html"; // redirect to login page
});

// Record activity 
function logActivity(text, type = "green") {
  const activities = getActivities();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  activities.push({ text, type, time: timeStr });
  localStorage.setItem("activities", JSON.stringify(activities));
}

//  Manual Reset System 
document.getElementById("reset-system").addEventListener("click", () => {
  if (confirm("Are you sure you want to RESET the system? This will delete ALL customers, bills, payments, and activities.")) {
    localStorage.removeItem("customers");
    localStorage.removeItem("bills");
    localStorage.removeItem("payments");
    localStorage.removeItem("activities");
    location.reload();
  }
});

//  Auto-refresh 
setInterval(() => {
  updateKPIs();
  updateActivities();
}, 2000);

//  Initialize 
document.addEventListener("DOMContentLoaded", () => {
  updateKPIs();
  updateActivities();
});

const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
    logoutBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        // Remove login info
        localStorage.removeItem("username");
        localStorage.removeItem("userRole");
        // Redirect to login
        window.location.href = "login.html";
    });
}

