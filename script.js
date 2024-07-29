const questions = [
    {
        question: 'বাংলাদেশের জাতীয় ফুল কোনটি?',
        answers: [
            { text: 'রজনীগন্ধা', correct: false },
            { text: 'গন্ধরাজ', correct: false },
            { text: 'শাপলা', correct: true },
            { text: 'বেলী', correct: false },
        ]
    },
    {
        question: 'বাংলাদেশের জাতীয় সংগীত কে লিখেছেন?',
        answers: [
            { text: 'কাজী নজরুল ইসলাম', correct: false },
            { text: 'রবীন্দ্রনাথ ঠাকুর', correct: true },
            { text: 'জসীম উদ্দিন', correct: false },
            { text: 'সুকান্ত ভট্টাচার্য', correct: false },
        ]
    },
    {
        question: 'বাংলাদেশের প্রথম রাষ্ট্রপতি কে ছিলেন?',
        answers: [
            { text: 'শেখ মুজিবুর রহমান', correct: true },
            { text: 'জিয়াউর রহমান', correct: false },
            { text: 'মোহাম্মদ আলী জিন্নাহ', correct: false },
            { text: 'তাজউদ্দীন আহমদ', correct: false },
        ]
    },
    {
        question: 'বাংলাদেশের সর্বোচ্চ পর্বতশৃঙ্গ কোনটি?',
        answers: [
            { text: 'তাজিংডং', correct: false },
            { text: 'কেওক্রাডং', correct: true },
            { text: 'লামার বাজার', correct: false },
            { text: 'চিম্বুক', correct: false },
        ]
    },
    {
        question: 'বাংলাদেশের স্বাধীনতা সংগ্রামে কোন অপারেশনটি সর্বপ্রথম শুরু হয়?',
        answers: [
            { text: 'অপারেশন সার্চলাইট', correct: true },
            { text: 'অপারেশন থান্ডারবোল্ট', correct: false },
            { text: 'অপারেশন রিভারসাইন', correct: false },
            { text: 'অপারেশন ট্রাইডেন্ট', correct: false },
        ]
    },
    {
        question: 'কোন সালে বাংলাদেশে প্রথম টেলিভিশন সম্প্রচার শুরু হয়?',
        answers: [
            { text: '১৯৬৪', correct: true },
            { text: '১৯৭১', correct: false },
            { text: '১৯৭৫', correct: false },
            { text: '১৯৮০', correct: false },
        ]
    },
    {
        question: "'সিতাইঝাড়' গ্রাম কোন জেলায় অবস্থিত?",
        answers: [
            { text: 'ঢাকা', correct: false },
            { text: 'কুড়িগ্রাম', correct: true },
            { text: 'নোয়াখালী', correct: false },
            { text: 'বরিশাল', correct: false },
        ]
    },
    {
        question: "কুড়িগ্রাম জেলার কোন নদীটি ভারত-বাংলাদেশ সীমান্ত গঠন করে?",
        answers: [
            { text: 'ধরলা নদী', correct: false },
            { text: 'তিস্তা নদী', correct: false },
            { text: 'ব্রহ্মপুত্র নদী', correct: true },
            { text: 'সোনাভরি নদী', correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const deductedElement = document.getElementById('deducted');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let deducted = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    deducted = 0;
    nextButton.innerHTML = 'Next';
    resultElement.classList.add('hidden');
    nextButton.disabled = true;
    restartButton.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
    nextButton.style.display = "block";
}

function resetState() {
    nextButton.style.display = "none";
    nextButton.disabled = true;
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score += 5;
    } else {
        deducted += 5;
    }
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct, selectedButton);
        button.disabled = true;
    });
    nextButton.disabled = false;
}

function setStatusClass(element, correct, selectedButton) {
    clearStatusClass(element);
    if (correct === "true") {
        element.classList.add('correct');
    } else if (element === selectedButton) {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    resetState();
    questionElement.innerHTML = '';
    scoreElement.innerHTML = `${score}`;
    deductedElement.innerHTML = `${deducted}`;
    resultElement.classList.remove('hidden');
    restartButton.classList.remove('hidden');
}

restartButton.addEventListener('click', startQuiz);

startQuiz();
