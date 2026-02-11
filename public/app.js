// Application state
const state = {
  currentPage: 0, // 0 = welcome, 1-30 = questions
  name: '',
  answers: Array(30).fill(''),
  totalQuestions: 30
};

// DOM elements
const welcomePage = document.getElementById('welcome-page');
const questionPage = document.getElementById('question-page');
const completionPage = document.getElementById('completion-page');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const questionIndex = document.getElementById('question-index');
const answerInput = document.getElementById('answer-input');
const welcomeInput = document.getElementById('welcome-input');

// Initialize
function init() {
  startBtn.addEventListener('click', handleStart);
  backBtn.addEventListener('click', handleBack);
  nextBtn.addEventListener('click', handleNext);
  finishBtn.addEventListener('click', handleFinish);
  
  // Allow Enter key to proceed
  welcomeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleStart();
  });
  
  answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (state.currentPage === state.totalQuestions) {
        handleFinish();
      } else {
        handleNext();
      }
    }
  });
}

function handleStart() {
  const name = welcomeInput.value.trim();
  
  if (!name) {
    alert('Please enter your name to start!');
    welcomeInput.focus();
    return;
  }
  
  state.name = name;
  state.currentPage = 1;
  showQuestionPage();
}

function handleBack() {
  // Save current answer
  saveCurrentAnswer();
  
  state.currentPage--;
  showQuestionPage();
}

function handleNext() {
  // Save current answer
  saveCurrentAnswer();
  
  state.currentPage++;
  showQuestionPage();
}

async function handleFinish() {
  // Save the current answer
  saveCurrentAnswer();
  
  // Calculate answered questions
  const answeredCount = state.answers.filter(answer => answer.trim() !== '').length;
  const unansweredCount = state.totalQuestions - answeredCount;
  
  // Show confirmation dialog
  let confirmMessage = `Are you sure you want to submit?\n\n`;
  confirmMessage += `Answered: ${answeredCount}/${state.totalQuestions} questions`;
  
  if (unansweredCount > 0) {
    confirmMessage += `\nUnanswered: ${unansweredCount} questions will be submitted as empty.`;
  }
  
  const confirmed = confirm(confirmMessage);
  
  if (!confirmed) {
    return;
  }
  
  // Prepare the data to submit
  const answersArray = state.answers.map((answer, index) => ({
    index: index + 1,
    answer: answer
  }));
  
  const submitData = {
    name: state.name,
    answers: answersArray
  };
  
  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      showCompletionPage();
    } else {
      alert('Error submitting answers. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Network error. Please check your connection and try again.');
  }
}

function saveCurrentAnswer() {
  if (state.currentPage >= 1 && state.currentPage <= state.totalQuestions) {
    state.answers[state.currentPage - 1] = answerInput.value;
  }
}

function showQuestionPage() {
  // Hide all pages
  welcomePage.classList.remove('active');
  questionPage.classList.remove('active');
  completionPage.classList.remove('active');
  
  // Show question page
  questionPage.classList.add('active');
  
  // Update question index
  questionIndex.textContent = state.currentPage;
  
  // Load saved answer
  answerInput.value = state.answers[state.currentPage - 1] || '';
  
  // Focus on input
  setTimeout(() => answerInput.focus(), 100);
  
  // Update button visibility
  updateButtons();
}

function updateButtons() {
  // Back button: hide on first page (page 1)
  if (state.currentPage === 1) {
    backBtn.style.display = 'none';
  } else {
    backBtn.style.display = 'inline-block';
  }
  
  // Next button: show on all pages except last
  if (state.currentPage === state.totalQuestions) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'inline-block';
  }
  
  // Finish button: show on all pages
  finishBtn.style.display = 'inline-block';
}

function showCompletionPage() {
  welcomePage.classList.remove('active');
  questionPage.classList.remove('active');
  completionPage.classList.add('active');
  
  const resultMessage = document.getElementById('result-message');
  resultMessage.textContent = `Thank you ${state.name}! Submitted ${state.totalQuestions} answers successfully!`;
}

// Initialize the app
init();
