const demos = {
  limo: {
    title: "Airport SUV request",
    meta: "Pickup, passengers, destination, preferred vehicle",
    messages: [
      ["bot", "Sorry we missed you. What type of ride do you need today?"],
      ["user", "I need a black SUV from LAX tonight."],
      ["bot", "Absolutely. What pickup time, destination city, and passenger count?"],
      ["user", "9:30 PM, Beverly Hills, 3 people."],
      ["bot", "Perfect. I sent this to the team. Would you prefer SUV confirmation by text or phone call?"]
    ]
  },
  contractor: {
    title: "Bathroom remodel estimate",
    meta: "Project type, city, timeline, estimate appointment",
    messages: [
      ["bot", "Sorry we missed you. What project can we help with?"],
      ["user", "Bathroom remodel quote."],
      ["bot", "What city is the property in, and are you looking to start soon or planning ahead?"],
      ["user", "Glendale. Looking to start in the next month."],
      ["bot", "Got it. I sent this to the estimate team. What day works best for a walkthrough?"]
    ]
  },
  homecare: {
    title: "Family care consultation",
    meta: "Care need, schedule, location, urgency",
    messages: [
      ["bot", "Sorry we missed you. Are you looking for care for yourself or a loved one?"],
      ["user", "For my mother."],
      ["bot", "Thank you. What city is she in, and what kind of help is needed?"],
      ["user", "Pasadena. Mostly companionship and meal help."],
      ["bot", "I sent this to the care coordinator. Would mornings, afternoons, or evenings be best for a call?"]
    ]
  }
};
const thread = document.querySelector(".thread");
const summaryTitle = document.querySelector("#summaryTitle");
const summaryMeta = document.querySelector("#summaryMeta");
const tabs = document.querySelectorAll("[data-demo]");
function renderDemo(key) {
  const demo = demos[key];
  thread.innerHTML = "";
  demo.messages.forEach(([type, message]) => {
    const bubble = document.createElement("p");
    bubble.className = type;
    bubble.textContent = message;
    thread.appendChild(bubble);
  });
  summaryTitle.textContent = demo.title;
  summaryMeta.textContent = demo.meta;
}
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderDemo(tab.dataset.demo);
  });
});
renderDemo("limo");
document.querySelector(".audit-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const submissions = JSON.parse(localStorage.getItem("missedCallAuditRequests") || "[]");
  submissions.push({ ...data, submittedAt: new Date().toISOString() });
  localStorage.setItem("missedCallAuditRequests", JSON.stringify(submissions));
  form.reset();
  const note = form.querySelector(".form-note");
  note.textContent = "Audit request saved locally for demo. Connect CRM/email before live launch.";
});

const scoreInputs = document.querySelectorAll("[data-score]");
const leadScore = document.querySelector("#leadScore");
const leadRating = document.querySelector("#leadRating");

function updateLeadScore() {
  const score = Array.from(scoreInputs).reduce((total, input) => {
    return total + (input.checked ? Number(input.dataset.score) : 0);
  }, 15);
  const bounded = Math.max(0, Math.min(100, score));
  leadScore.textContent = bounded;
  if (bounded >= 85) {
    leadRating.textContent = "Hot lead - alert owner now";
  } else if (bounded >= 60) {
    leadRating.textContent = "Warm lead - follow up fast";
  } else {
    leadRating.textContent = "Cold lead - keep in nurture";
  }
}

scoreInputs.forEach((input) => input.addEventListener("change", updateLeadScore));
updateLeadScore();
