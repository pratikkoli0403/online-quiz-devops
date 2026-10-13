const questions = [
  { q: "Which language is used to structure a web page?", options: ["CSS", "HTML", "Python", "SQL"], answer: 1 },
  { q: "What does CSS mainly control?", options: ["Page styling and layout", "Database records", "Server uptime", "Git history"], answer: 0 },
  { q: "Which command shows the current Git working-tree status?", options: ["git start", "git status", "git open", "git check"], answer: 1 },
  { q: "What is Docker commonly used for?", options: ["Editing photos", "Containerizing applications", "Writing spreadsheets", "Replacing HTML"], answer: 1 },
  { q: "Which HTTP status code usually means a successful request?", options: ["404", "500", "200", "301"], answer: 2 }
];

let current = 0;
let selected = null;
let score = 0;
let answered = false;

const $ = id => document.getElementById(id);
function renderQuestion() {
  selected = null;
  answered = false;
  const item = questions[current];
  $("counter").textContent = `${String(current + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;
  $("question-number").textContent = String(current + 1).padStart(2, "0");
  $("question").textContent = item.q;
  $("progress-bar").style.width = `${((current + 1) / questions.length) * 100}%`;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  $("next").disabled = true;
  $("next").innerHTML = current === questions.length - 1 ? 'Finish quiz <span>→</span>' : 'Submit answer <span>→</span>';
  $("options").innerHTML = "";
  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.innerHTML = `<span class="letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent = option;
    button.addEventListener("click", () => {
      if (answered) return;
      selected = index;
      document.querySelectorAll(".option").forEach(el => el.classList.remove("selected"));
      button.classList.add("selected");
      $("next").disabled = false;
    });
    $("options").appendChild(button);
  });
}
function finishQuiz() {
  const percent = Math.round((score / questions.length) * 100);
  $("quiz-title").textContent = "Quiz complete";
  $("counter").textContent = "FINISHED";
  $("question-number").textContent = "✓";
  $("question").textContent = "Nice work — here's your result.";
  $("options").innerHTML = `<div class="result"><div class="eyebrow">YOUR SCORE</div><div class="score">${score} / ${questions.length}</div><p>You answered ${score} of ${questions.length} questions correctly (${percent}%).<br>${percent >= 80 ? "Excellent work!" : percent >= 50 ? "Good effort — keep practising." : "Keep learning and try again."}</p></div>`;
  $("feedback").textContent = "";
  $("progress-bar").style.width = "100%";
  $("next").disabled = true;
  $("next").textContent = "Completed";
}
$("next").addEventListener("click", () => {
  if (selected === null || answered) return;
  answered = true;
  const correct = selected === questions[current].answer;
  if (correct) score++;
  document.querySelectorAll(".option").forEach((button, index) => {
    button.disabled = true;
    if (index === questions[current].answer) button.classList.add("correct");
    else if (index === selected) button.classList.add("wrong");
  });
  $("feedback").textContent = correct ? "Correct answer — well done!" : `Not quite. Correct answer: ${questions[current].options[questions[current].answer]}`;
  $("feedback").className = `feedback ${correct ? "good" : "bad"}`;
  $("next").innerHTML = current === questions.length - 1 ? 'View result <span>→</span>' : 'Next question <span>→</span>';
  $("next").disabled = false;
  $("next").onclick = null;
  $("next").addEventListener("click", nextStep, { once: true });
});
function nextStep() {
  if (!answered) return;
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}
$("restart").addEventListener("click", () => {
  current = 0; score = 0;
  $("quiz-title").textContent = "Web & Tech Basics";
  $("next").onclick = null;
  renderQuestion();
});
renderQuestion();
