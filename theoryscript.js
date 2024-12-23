const questions = [
  {
    question: "What is the capital of France?",
    answer: "The capital of France is Paris."
  },
  {
    question: "What is 2 + 2?",
    answer: "2 + 2 equals 4."
  },
  {
    question: "What is the largest planet in our solar system?",
    answer: "The largest planet is Jupiter."
  }
];

let currentQuestionIndex = 0;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const showAnswerBtn = document.getElementById("show-answer-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function updateUI() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answerElement.textContent = currentQuestion.answer;
  answerElement.classList.add("hidden");

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

showAnswerBtn.addEventListener("click", () => {
  answerElement.classList.toggle("hidden");
});

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    updateUI();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    updateUI();
  }
});

// Initialize the UI
updateUI();