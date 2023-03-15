// Get elements from html file
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const answerInput = document.getElementById("answer-input");
const choiceA = document.querySelector(".choice-text[data-number='A']");
const choiceB = document.querySelector(".choice-text[data-number='B']");
const choiceC = document.querySelector(".choice-text[data-number='C']");
const choiceD = document.querySelector(".choice-text[data-number='D']");
const submitBtn = document.getElementById("submit-btn");
const scoreText = document.getElementById("score");
const correctIncorrect = document.getElementById("correct-incorrect");
const explanationText = document.getElementById("explanation");

// Create an array of objects that store questions and answers related to medicine topics
// Each object has the following properties:
// - question: the question text
// - image: the image url (optional)
// - answer: the correct answer text
// - choices: an array of four possible choices (optional)
// - explanation: the explanation text (optional)
// - difficulty: the difficulty level of the question (easy, medium or hard)

let questions = [
  {
    question:
      "What is the name of the process by which a cell divides into two identical cells?",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Mitosis_Stages.svg/1200px-Mitosis_Stages.svg.png",
    answer: "Mitosis",
    choices: ["Meiosis", "Mitosis", "Fission", "Fusion"],
    explanation:
      "Mitosis is a type of cell division that results in two daughter cells each having the same number and kind of chromosomes as the parent nucleus.",
    difficulty: "easy"
  },
  {
    question: "What is the name of the largest bone in the human body?",
    answer: "Femur",
    choices: ["Humerus", "Tibia", "Femur", "Pelvis"],
    explanation:
      "The femur is thighbone that extends from the hip to the knee and is the longest and strongest bone in the body.",
    difficulty: "easy"
  },
  {
    question: "What is the name of the organ that produces insulin?",
    answer: "Pancreas",
    choices: ["Liver", "Pancreas", "Spleen", "Gallbladder"],
    explanation:
      "The pancreas is a glandular organ that secretes digestive enzymes and hormones, including insulin. Insulin is a hormone that regulates blood glucose levels.",
    difficulty: "medium"
  },
  {
    question:
      "What is the name of the condition characterized by inflammation of the joints?",
    answer: "Arthritis",
    choices: ["Arthritis", "Osteoporosis", "Gout", "Bursitis"],
    explanation:
      "Arthritis is a general term for a group of diseases that cause pain, swelling and stiffness in the joints. There are many types of arthritis, such as rheumatoid arthritis, osteoarthritis and gout.",
    difficulty: "medium"
  },
  {
    question:
      "What is the name of the blood vessels that carry blood away from the heart?",
    answer: "Arteries",
    choices: ["Veins", "Arteries", "Capillaries", "Lymphatics"],
    explanation:
      "Arteries are muscular blood vessels that carry oxygen-rich blood away from the heart to all parts of the body. The largest artery is the aorta.",
    difficulty: "hard"
  },
  {
    question:
      "What is the name of the membrane that covers the surface of the lungs?",
    answer: "Pleura",
    choices: ["Pericardium", "Peritoneum", "Pleura", "Meninges"],
    explanation:
      "The pleura is a thin layer of tissue that covers the lungs and lines the chest cavity. It helps protect the lungs and allows them to slide smoothly during breathing.",
    difficulty: "hard"
  }
];

// Create a variable to store the current question index
let currentQuestionIndex = 0;
// Create a variable to store the current score
let score = 0;
// Create a function to display a question and its choices (if any) on the screen
function displayQuestion() {
  // Get the current question object from the questions array
  let currentQuestion = questions[currentQuestionIndex];

  // Set the question text and image (if any) on the html elements
  questionText.textContent = currentQuestion.question;

  // If there are choices for the current question, display them on the html elements
  if (currentQuestion.choices) {
    choiceA.textContent = currentQuestion.choices[0];
    choiceB.textContent = currentQuestion.choices[1];
    choiceC.textContent = currentQuestion.choices[2];
    choiceD.textContent = currentQuestion.choices[3];

    // Show the choice containers and hide the answer input
    document.querySelectorAll(".choice-container").forEach((choice) => {
      choice.style.display = "flex";
    });
    answerInput.style.display = "none";
  } else {
    // If there are no choices for the current question, hide the choice containers and show the answer input
    document.querySelectorAll(".choice-container").forEach((choice) => {
      choice.style.display = "none";
    });
    answerInput.style.display = "block";
  }

  // Clear any previous user input
  answerInput.value = "";

  // Hide any previous feedback elements
  correctIncorrect.textContent = "";
  explanationText.textContent = "";
}

// Create a function to check the user's answer and update the score and feedback accordingly
function checkAnswer() {
  // Get the current question object from the questions array
  let currentQuestion = questions[currentQuestionIndex];

  // Get the user's answer from either the input or the selected choice
  let userAnswer;

  if (currentQuestion.choices) {
    userAnswer = document.querySelector(
      ".choice-container.selected .choice-text"
    ).textContent;
  } else {
    userAnswer = answerInput.value;
  }

  // Compare the user's answer with the correct answer and display a message accordingly
  if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    // If the answer is correct, increment the score and show a positive message
    score++;
    correctIncorrect.textContent = "Correct! 👏";

    correctIncorrect.style.color = "#9c27b0";
  } else {
    // If the answer is incorrect, show a negative message

    correctIncorrect.textContent = "Incorrect. 😞";

    correctIncorrect.style.color = "#ffc0cb";
  }

  // Update the score text on the html element
  scoreText.textContent = `Score: ${score}/${questions.length}`;

  // If there is an explanation for the current question, display it on the html element
  if (currentQuestion.explanation) {
    explanationText.textContent = currentQuestion.explanation;
  }

  // Disable the submit button until the next question is loaded
  submitBtn.disabled = true;
}

// Create a function to load the next question or end the quiz if there are no more questions
function nextQuestion() {
  // Increment the current question index
  currentQuestionIndex++;

  // If there are more questions in the questions array, display the next question
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    // If there are no more questions, end the quiz and show a final message
    questionText.textContent = "Quiz completed! 🎉";
    questionImage.style.display = "none";
    document.querySelectorAll(".choice-container").forEach((choice) => {
      choice.style.display = "none";
    });
    answerInput.style.display = "none";
    submitBtn.style.display = "none";

    // Show a message based on the score and difficulty level of the questions

    let message;

    let easyQuestions = questions.filter(
      (question) => question.difficulty === "easy"
    ).length;

    let mediumQuestions = questions.filter(
      (question) => question.difficulty === "medium"
    ).length;

    let hardQuestions = questions.filter(
      (question) => question.difficulty === "hard"
    ).length;

    if (score === questions.length) {
      message = "Wow! You aced this quiz! You must be a genius in medicine! 🧠";
    } else if (score >= easyQuestions + mediumQuestions) {
      message =
        "Great job! You got most of the questions right. You have a good knowledge of medicine. 👍";
    } else if (score >= easyQuestions) {
      message =
        "Not bad! You got some of the questions right. You have a basic knowledge of medicine. 👏";
    } else {
      message =
        "Oops! You got few or none of the questions right. You need to study more about medicine. 😞";
    }

    explanationText.textContent = message;
  }
}

// Add an event listener to each choice container to toggle its selected state when clicked
document.querySelectorAll(".choice-container").forEach((choice) => {
  choice.addEventListener("click", () => {
    // Remove the selected class from all other choice containers
    document
      .querySelectorAll(".choice-container")
      .forEach((otherChoice) => otherChoice.classList.remove("selected"));

    // Add the selected class to the clicked choice container

    choice.classList.add("selected");

    // Enable the submit button if it was disabled

    submitBtn.disabled = false;
  });
});

// Add an event listener to the answer input to enable the submit button when there is some input
answerInput.addEventListener("input", () => {
  // If the input is not empty, enable the submit button
  if (answerInput.value) {
    submitBtn.disabled = false;
  } else {
    // If the input is empty, disable the submit button
    submitBtn.disabled = true;
  }
});

// Add an event listener to the submit button to check the answer and load the next question when clicked
submitBtn.addEventListener("click", () => {
  // Check if there is a selected choice or an input value before proceeding
  if (
    document.querySelector(".choice-container.selected") ||
    answerInput.value
  ) {
    // Check the answer and display feedback
    checkAnswer();

    // Wait for 3 seconds before loading the next question

    setTimeout(nextQuestion, 3000);
  }
});

// Display the first question when the page loads
displayQuestion();
