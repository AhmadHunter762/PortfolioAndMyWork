// let questions = [];
// let currentCategoryIndex = 0;
// let score = 0;
// let quizSet = [];
// let currentIndex = 0;

// const categories = ['Core Java', 'Advanced Java', 'Aptitude'];
// let totalScore = 0;
// let totalQuestions = 0;

// // Simple CSV parser
// function parseCSVLine(line) {
//     const parts = line.split(',');
//     if(parts.length < 7) return null;
//     const category = parts[0].trim();
//     const question = parts[1].trim();
//     const opt1 = parts[2].trim();
//     const opt2 = parts[3].trim();
//     const opt3 = parts[4].trim();
//     const opt4 = parts[5].trim();
//     const answer = parts[6].trim().toUpperCase();
//     return [category, question, opt1, opt2, opt3, opt4, answer];
// }

// // Load questions
// async function loadQuestions() {
//     const response = await fetch('question.txt');
//     const text = await response.text();
//     const lines = text.split('\n').slice(1); // skip header

//     questions = lines.map(line => {
//         if (!line.trim()) return null;
//         const parts = parseCSVLine(line);
//         if (!parts) return null;
//         const [category, question, opt1, opt2, opt3, opt4, answer] = parts;
//         return { category, question, options: [opt1,opt2,opt3,opt4], answer };
//     }).filter(q => q !== null);

//     console.log("Loaded questions:", questions.length);
// }

// // Start quiz for current category
// async function startQuiz() {
//     if(questions.length === 0) await loadQuestions();
//     currentCategoryIndex = 0;
//     totalScore = 0;
//     totalQuestions = 0;
//     startNextCategory();
// }

// function startNextCategory() {
//     if(currentCategoryIndex >= categories.length) {
//         showFinalResult();
//         return;
//     }

//     const category = categories[currentCategoryIndex];
//     currentIndex = 0;
//     score = 0;

//     quizSet = questions.filter(q => q.category.trim().toLowerCase() === category.trim().toLowerCase());
//     if(quizSet.length === 0){
//         alert("❌ No questions found for " + category);
//         currentCategoryIndex++;
//         startNextCategory();
//         return;
//     }

//     document.getElementById('category-selection').style.display = 'none';
//     document.getElementById('quiz-container').style.display = 'block';
//     document.getElementById('quiz-category').innerText = category + " Quiz";

//     showQuestion();
// }

// function showQuestion() {
//     const q = quizSet[currentIndex];
//     document.getElementById('question-box').innerText = q.question;

//     const optionsBox = document.getElementById('options-box');
//     optionsBox.innerHTML = '';

//     q.options.forEach((opt, i) => {
//         const btn = document.createElement('button');
//         btn.innerText = opt;
//         btn.onclick = () => selectAnswer(String.fromCharCode(65 + i));
//         optionsBox.appendChild(btn);
//     });
// }

// function selectAnswer(ans) {
//     if(ans === quizSet[currentIndex].answer) score++;
//     nextQuestion();
// }

// function nextQuestion() {
//     currentIndex++;
//     if(currentIndex < quizSet.length) {
//         showQuestion();
//     } else {
//         // Add category score to total
//         totalScore += score;
//         totalQuestions += quizSet.length;
//         currentCategoryIndex++;
//         startNextCategory(); // automatically start next category
//     }
// }

// function showFinalResult() {
//     document.getElementById('quiz-container').style.display = 'none';
//     const pct = ((totalScore / totalQuestions) * 100).toFixed(2);

//     let feedback = pct == 100 ? "🏆 Perfect!" :
//                    pct >= 85 ? "💪 Excellent!" :
//                    pct >= 70 ? "👍 Good!" :
//                    pct >= 50 ? "🙂 Fair!" : "📘 Keep Learning!";

//     document.getElementById('score-text').innerText = `Total Score: ${totalScore}/${totalQuestions} (${pct}%)\n${feedback}`;
//     document.getElementById('result-container').style.display = 'block';
// }

// function restartQuiz() {
//     document.getElementById('result-container').style.display = 'none';
//     document.getElementById('category-selection').style.display = 'block';
// }









let questions = [];
let currentCategoryIndex = 0;
let currentIndex = 0;
let score = 0;
let quizSet = [];
const categories = ['Core Java', 'Advanced Java', 'Aptitude'];
let totalScore = 0;
let totalQuestions = 0;
let selectedAnswers = [];
let currentUser = null;

// --- User Auth ---
function signup() {
    const username = document.getElementById('signup-username').value.trim();
    if(!username) { alert("Enter username"); return; }

    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if(users[username]) { alert("Username already exists!"); return; }

    users[username] = { scores: [] };
    localStorage.setItem('users', JSON.stringify(users));
    alert("Signup successful! Please login.");
}

function login() {
    const username = document.getElementById('login-username').value.trim();
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if(!users[username]) { alert("User not found!"); return; }

    currentUser = username;
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('category-selection').style.display = 'block';
    alert("Welcome, " + username);
}

function logout() {
    currentUser = null;
    document.getElementById('scoreboard-container').style.display = 'none';
    document.getElementById('auth-container').style.display = 'block';
}

// --- Load questions ---
async function loadQuestions() {
    const response = await fetch('question.txt');
    const text = await response.text();
    const lines = text.split('\n').slice(1); // skip header
    questions = lines.map(line => {
        const parts = line.split(',');
        if(parts.length < 7) return null;
        const [category, question, opt1, opt2, opt3, opt4, answer] = parts;
        return { category, question, options:[opt1,opt2,opt3,opt4], answer: answer.trim().toUpperCase() };
    }).filter(q => q !== null);
}

// --- Start Quiz ---
async function startQuiz(category) {
    if(questions.length === 0) await loadQuestions();
    currentIndex = 0;
    selectedAnswers = [];
    score = 0;

    quizSet = questions.filter(q => q.category.trim().toLowerCase() === category.trim().toLowerCase());
    if(quizSet.length === 0) { alert("No questions found!"); return; }

    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-category').innerText = category + " Quiz";

    showQuestion();
}

function showQuestion() {
    const q = quizSet[currentIndex];
    document.getElementById('question-box').innerText = q.question;

    const optionsBox = document.getElementById('options-box');
    optionsBox.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        if(selectedAnswers[currentIndex] === String.fromCharCode(65+i)){
            btn.style.backgroundColor = "#4CAF50";
            btn.style.color = "white";
        }
        btn.onclick = () => {
            selectedAnswers[currentIndex] = String.fromCharCode(65+i);
            Array.from(optionsBox.children).forEach(b => {
                b.style.backgroundColor = '';
                b.style.color = '';
            });
            btn.style.backgroundColor = "#4CAF50";
            btn.style.color = "white";
        };
        optionsBox.appendChild(btn);
    });

    document.getElementById('prev-btn').style.display = currentIndex === 0 ? 'none' : 'inline-block';
}

function nextQuestion() {
    if(selectedAnswers[currentIndex] === undefined){
        alert("Please select an answer");
        return;
    }
    currentIndex++;
    if(currentIndex < quizSet.length) showQuestion();
    else finishQuiz();
}

function previousQuestion() {
    if(currentIndex > 0){
        currentIndex--;
        showQuestion();
    }
}

function finishQuiz() {
    // Calculate score
    score = 0;
    quizSet.forEach((q,i)=> { if(selectedAnswers[i] === q.answer) score++; });

    // Save score
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    if(currentUser){
        users[currentUser].scores.push(score);
        localStorage.setItem('users', JSON.stringify(users));
    }

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('score-text').innerText = `Score: ${score}/${quizSet.length}`;
    document.getElementById('result-container').style.display = 'block';
}

function restartQuiz() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('category-selection').style.display = 'block';
}

function viewScoreboard(){
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('scoreboard-list').innerHTML = '';
    let users = JSON.parse(localStorage.getItem('users') || '{}');
    for(let user in users){
        const li = document.createElement('li');
        li.innerText = `${user}: ${users[user].scores.join(', ')}`;
        document.getElementById('scoreboard-list').appendChild(li);
    }
    document.getElementById('scoreboard-container').style.display = 'block';
}
