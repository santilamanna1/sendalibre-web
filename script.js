// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Tabs
function openTab(evt, tabName) {
  const tabContent = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.remove('active');
  }
  const tabBtns = document.getElementsByClassName('tab-btn');
  for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].classList.remove('active');
  }
  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

// Modal de fecha especial
function openDateModal(activity) {
  document.getElementById('date-modal').classList.add('active');
  document.getElementById('activity-input').value = activity;
}

function closeDateModal() {
  document.getElementById('date-modal').classList.remove('active');
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(e) {
  const modal = document.getElementById('date-modal');
  if (modal && e.target === modal) {
    closeDateModal();
  }
  const scheduleModal = document.getElementById('schedule-modal');
  if (scheduleModal && e.target === scheduleModal) {
    closeScheduleModal();
  }
});

// Modal de próximas salidas
function openScheduleModal() {
  document.getElementById('schedule-modal').classList.add('active');
}

function closeScheduleModal() {
  document.getElementById('schedule-modal').classList.remove('active');
}