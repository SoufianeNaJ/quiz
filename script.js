const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "3,000 km/s"],
        answer: "300,000 km/s"
    },
    {
        question: "Who discovered gravity?",
        options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Marie Curie"],
        answer: "Isaac Newton"
    }
];

const questionDuration = 15;
let currentQuestionIndex = 0;
let score = 0;
let timeLeft;
let timerInterval;
let userAnswers = [];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const timerElement = document.getElementById("timer");
const answerSummaryElement = document.getElementById("answer-summary");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    timeLeft = questionDuration;
    updateTimer();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            recordAnswer(null); 
            nextQuestion();
        }
    }, 1000);

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option, button));
        optionsElement.appendChild(button);
    });
}

function updateTimer() {
    timerElement.textContent = `Time left: ${timeLeft}s`;
}

function checkAnswer(selectedOption, button) {
    clearInterval(timerInterval);
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
    }
    Array.from(optionsElement.children).forEach(btn => {
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("incorrect");
        }
        btn.disabled = true;
    });

    recordAnswer(selectedOption);

    setTimeout(nextQuestion, 2000); 
}

function recordAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    userAnswers.push({
        question: currentQuestion.question,
        correctAnswer: currentQuestion.answer,
        userAnswer: selectedOption
    });
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    timerElement.style.display = "none";
    resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
}



loadQuestion();