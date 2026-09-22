const quizData = [
  {
    question: "日本の首都はどこでしょう？",
    choices: ["大阪府", "東京都", "京都府", "神奈川県"],
    answer: 1,
  },
  {
    question: "1年は何日でしょう？（うるう年を除く）",
    choices: ["360日", "364日", "365日", "366日"],
    answer: 2,
  },
  {
    question: "次のうち、体温計で測るものはどれでしょう？",
    choices: ["湿度", "体温", "気圧", "血圧"],
    answer: 1,
  },
  {
    question: "「二十歳」の読み方はどれでしょう？",
    choices: ["にじゅっさい", "はたち", "にじゅうねん", "はつか"],
    answer: 1,
  },
  {
    question: "郵便番号は日本では何桁の数字で表されるでしょう？",
    choices: ["5桁", "6桁", "7桁", "8桁"],
    answer: 2,
  },
];

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progressEl = document.getElementById("progress");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentIndex = 0;
let score = 0;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  quizScreen.style.display = "block";
  resultScreen.style.display = "none";
  showQuestion();
}

function showQuestion() {
  const current = quizData[currentIndex];
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.style.display = "none";
  progressEl.textContent = `第${currentIndex + 1}問 / 全${quizData.length}問`;
  questionEl.textContent = current.question;

  choicesEl.innerHTML = "";
  current.choices.forEach((choiceText, index) => {
    const btn = document.createElement("button");
    btn.textContent = choiceText;
    btn.className = "choice-btn";
    btn.addEventListener("click", () => selectAnswer(index));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  const current = quizData[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  buttons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === current.answer) {
    score++;
    buttons[selectedIndex].classList.add("correct");
    feedbackEl.textContent = "正解です！";
    feedbackEl.classList.add("correct");
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    buttons[current.answer].classList.add("correct");
    feedbackEl.textContent = `不正解です。正解は「${current.choices[current.answer]}」です。`;
    feedbackEl.classList.add("incorrect");
  }

  nextBtn.style.display = "block";
}

function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  scoreEl.textContent = `${quizData.length}問中 ${score}問 正解でした！`;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", startQuiz);

startQuiz();
