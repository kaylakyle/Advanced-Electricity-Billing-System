
function safeParse(data) {
  try { return JSON.parse(data) || []; } 
  catch (e) { return []; }
}

function getActivities() {
  return safeParse(localStorage.getItem("activities"));
}

function logActivity(text, type = "green") {
  const activities = getActivities();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  activities.push({ text, type, time: timeStr });
  localStorage.setItem("activities", JSON.stringify(activities));
}
document.querySelector("button[onclick*='customers.html']").addEventListener("click", () => {
  logActivity("New customer action triggered", "green");
});

document.querySelector("button[onclick*='billing.html']").addEventListener("click", () => {
  logActivity("Bill generation started", "orange");
});

document.querySelector("button[onclick*='payment.html']").addEventListener("click", () => {
  logActivity("Payment recorded", "blue");
});

document.getElementById("reset-system").addEventListener("click", () => {
  logActivity("System reset performed", "red");
});
