const questions = [
  {
    question: "1. What is the capital of France?",
    options: ["A. Berlin", "B. Madrid", "C. Paris", "D. Rome"],
    correctAnswer: 2,
  },
  {
    question: "2. What is 5 + 3?",
    options: ["A. 5", "B. 8", "C. 10", "D. 15"],
    correctAnswer: 1,
  },
  {
    question: "3. Which planet is known as the Red Planet?",
    options: ["A. Earth", "B. Mars", "C. Jupiter", "D. Venus"],
    correctAnswer: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = Array(questions.length).fill(null); // Stores user answers (null by default)

// Initialize total questions
document.getElementById("total").textContent = questions.length;

function loadQuestion() {
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Load current question
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Load options and pre-select if the user has answered
  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("option");
    optionButton.onclick = () => handleAnswer(index);

    // Highlight previously selected answer
    if (userAnswers[currentQuestionIndex] === index) {
      optionButton.classList.add(
        index === currentQuestion.correctAnswer ? "correct" : "wrong"
      );
    }

    optionsContainer.appendChild(optionButton);
  });

  updateProgress();
}

function handleAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const options = document.querySelectorAll(".option");

  // Save user's answer
  userAnswers[currentQuestionIndex] = selectedIndex;

  // Highlight correct and wrong answers
  options.forEach((option, index) => {
    option.classList.remove("correct", "wrong");
    if (index === currentQuestion.correctAnswer) {
      option.classList.add("correct");
    } else if (index === selectedIndex) {
      option.classList.add("wrong");
    }
    option.onclick = null; // Disable further clicks
  });

  // Update score
  score = userAnswers.reduce(
    (acc, answer, idx) =>
      answer === questions[idx].correctAnswer ? acc + 1 : acc,
    0
  );
  updateScore();
}

function loadNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
      <p>Quiz completed!</p>
      <p>Your final score is ${score} out of ${questions.length}.</p>
    `;
    document.querySelector(".button-container").style.display = "none";
  }
}

function loadPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function updateScore() {
  document.getElementById("score").textContent = score;
}

function updateProgress() {
  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  document.getElementById("progress").textContent = progress;
}

// Initialize the quiz
loadQuestion();