// Array of questions and answers
let questions = [
  {
    question: "Que mostrara?",
    image: "1.png",
    answers: ["NaN", "15", "105"],
    correctAnswer: "105"
  },
  {
    question: "Aquest codi funciona?",
    image: "2.png",
    answers: ["Si i mostra: 10", "Si i mostra: 25", "No"],
    correctAnswer: "Si i mostra: 10"
  },
  {
    question: "Aquest codi funciona?",
    image: "3.png",
    answers: ["No", "Si i mostra: 7", "Si i mostra: 52"],
    correctAnswer: "Si i mostra: 52"
  },
  {
    question: "Quin valor mostrara alert?",
    image: "4.png",
    answers: ["1", "5", "0"],
    correctAnswer: "0"
  },
  {
    question: "Aquest codi funciona?",
    image: "5.png",
    answers: ["No", "Si i mostra: 0", "Si i mostra: 12"],
    correctAnswer: "No"
  },
  {
    question: "Quin valor mostra?",
    image: "6.png",
    answers: ["True", "2 Euros", "10 Euros"],
    correctAnswer: "2 Euros"
  },
  {
    question: "Quin valor mostrara alert?",
    image: "7.png",
    answers: ["8", "6", "5"],
    correctAnswer: "8"
  },
  {
    question: "Que mostrara per pantalla?",
    image: "8.png",
    answers: ["Volvo Saab Ford", "Saab Ford", "Ford"],
    correctAnswer: "Saab Ford"
  },
  {
    question: "Que mostrara per pantalla?",
    image: "9.png",
    answers: ["Juanito", "Maria", "Juanito Maria"],
    correctAnswer: "Maria"
  },
  {
    question: "Que mostrara alert?",
    image: "10.png",
    answers: ["L1", "L2", "demo2"],
    correctAnswer: "L2"
  },
];

let currentQuestion = 0;
let selectedAnswers = {};
let score = 0;
let timer;

// Function to shuffle the array of questions
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to start the quiz
function startQuiz() {
  const startBtn = document.getElementById("start-btn");
  document.getElementById("song").play();
  startBtn.style.display = "none";

  // Show timer
  const timerDiv = document.getElementById("timer");
  let seconds = 120;
  timerDiv.innerHTML = "Timer: " + seconds;

  timer = setInterval(function () {
    seconds--;
    timerDiv.innerHTML = "Timer: " + seconds;

    if (seconds === 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);

  // Shuffle the questions before starting the quiz
  questions = shuffleQuestions(questions);
  showQuestion();
}

// Function to display a question
function showQuestion() {
  const questionImage = document.getElementById("question-image");
  const questionDiv = document.getElementById("question");
  const answersForm = document.getElementById("answers");
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "";

  const question = questions[currentQuestion];
  questionImage.src = question.image;

  questionDiv.innerHTML = question.question;

  answersForm.innerHTML = "";
  question.answers.forEach(function (answer, index) {
    const label = document.createElement("label");
    label.innerHTML = answer;

    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "answer";
    radioInput.value = answer;
    radioInput.addEventListener("click", function () {
      checkAnswer(this.value);
    });

    if (selectedAnswers[currentQuestion] === answer) {
      radioInput.checked = true;
    }

    label.prepend(radioInput);
    answersForm.appendChild(label);
  });

  updateNavigationButtons();
}

// Function to go to the previous question
function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

// Function to go to the next question
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

// Function to show the navigation buttons based on the current question
function updateNavigationButtons() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn.style.display = currentQuestion > 0 ? "block" : "none"; // Show/hide previous button
  nextBtn.innerHTML = currentQuestion === questions.length - 1 ? "Finish" : "Next"; // Change "Next" to "Finish" on last question
}

// Function to check the selected answer
function checkAnswer(selectedAnswer) {
  const question = questions[currentQuestion];

  selectedAnswers[currentQuestion] = selectedAnswer;

  if (selectedAnswer === question.correctAnswer) {
    score++;
    const highestScore = localStorage.getItem("highestScore");
    if (!highestScore || score > parseInt(highestScore)) {
      localStorage.setItem("highestScore", score);
    }
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    clearInterval(timer);
    showResult();
  }
}


function showResult() {
  const questionDiv = document.getElementById("question");
  const answersDiv = document.getElementById("answers");
  const resultDiv = document.getElementById("result");
  const restartBtn = document.getElementById("restart-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  questionDiv.innerHTML = "";
  answersDiv.innerHTML = "";

  resultDiv.innerHTML = `Quiz finalitzat! Has respost ${currentQuestion} preguntes, i tens ${score} respostes correctes.\n`;

  // Save the highest score to local storage
  const highestScore = localStorage.getItem("highestScore");
  if (!highestScore || score === questions.length) {
    localStorage.setItem("highestScore", score);
    resultDiv.innerHTML += "<br>Felicitats!!! Has registrat la maxima puntuacio!";
  }

  // Hide the navigation buttons
  prevBtn.style.display = "none";

  // Display the restart button
  restartBtn.style.display = "block";
  restartBtn.addEventListener("click", restartQuiz);
}



// Function to restart the quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  clearInterval(timer);

  selectedAnswers = {};

  const restartBtn = document.getElementById("restart-btn");
  restartBtn.style.display = "none";

  startQuiz();
}