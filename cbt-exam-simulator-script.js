document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: 2 },
    { question: "Which programming language is used for web development?", options: ["Python", "JavaScript", "C++", "Java"], answer: 1 },
    { question: "What is the square root of 16?", options: ["2", "4", "8", "16"], answer: 1 },
  ];

  let shuffledQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let timer = 30 * 60; // 30 minutes in seconds

  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options");
  const progressBar = document.getElementById("progress-bar");
  const timerDisplay = document.getElementById("timer");
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");
  const scoreContainer = document.getElementById("score-container");
  const scoreDisplay = document.getElementById("score");

  // Shuffle questions
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Load a question
  function loadQuestion(index) {
    const question = shuffledQuestions[index];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = "";

    question.options.forEach((option, i) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => handleOptionClick(i);
      optionsContainer.appendChild(button);
    });

    progressBar.value = ((index + 1) / shuffledQuestions.length) * 100;
    prevButton.disabled = index === 0;
    nextButton.disabled = index === shuffledQuestions.length - 1;
  }

  // Handle option click
  function handleOptionClick(selectedIndex) {
    const question = shuffledQuestions[currentIndex];
    if (selectedIndex === question.answer) {
      score++;
    }

    shuffledQuestions[currentIndex].answered = true;

    // Automatically move to the next question or end the test
    if (currentIndex < shuffledQuestions.length - 1) {
      currentIndex++;
      loadQuestion(currentIndex);
    } else {
      endExam();
    }
  }

  // Update timer
  function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    timer--;

    if (timer < 0) {
      endExam();
    }
  }

  // End the exam
  function endExam() {
    clearInterval(timerInterval);

    // Hide the test interface and show the score
    document.querySelector(".container").classList.add("hidden");
    scoreContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score}/${shuffledQuestions.length}`;
  }

  // Event listeners
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      loadQuestion(currentIndex);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      currentIndex++;
      loadQuestion(currentIndex);
    }
  });

  // Initialize
  shuffle(questions);
  shuffledQuestions = questions.map((q) => ({ ...q, answered: false }));
  loadQuestion(currentIndex);
  const timerInterval = setInterval(updateTimer, 1000);
});