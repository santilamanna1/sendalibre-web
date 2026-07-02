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

// Reposicionar dropdown si se sale de la pantalla
document.querySelectorAll('.dropdown').forEach(dropdown => {
  dropdown.addEventListener('mouseenter', function() {
    const content = this.querySelector('.dropdown-content');
    if (!content) return;
    const rect = content.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      content.style.top = 'auto';
      content.style.bottom = '100%';
    } else {
      content.style.top = '100%';
      content.style.bottom = 'auto';
    }
  });
});

// Lightbox para galerías
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<button class="lightbox-close">&times;</button><button class="lightbox-nav lightbox-prev">&#10094;</button><button class="lightbox-nav lightbox-next">&#10095;</button><img src="" alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
let galleryImages = [];
let currentIndex = 0;

function updateGalleryImages() {
  galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
}

function showImage(index) {
  if (galleryImages.length === 0) return;
  currentIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
}

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('active');
  }
});

lightbox.querySelector('.lightbox-prev').addEventListener('click', function(e) {
  e.stopPropagation();
  showImage(currentIndex - 1);
});

lightbox.querySelector('.lightbox-next').addEventListener('click', function(e) {
  e.stopPropagation();
  showImage(currentIndex + 1);
});

document.addEventListener('click', function(e) {
  const item = e.target.closest('.gallery-item img');
  if (item) {
    updateGalleryImages();
    currentIndex = galleryImages.indexOf(item);
    lightboxImg.src = item.src;
    lightbox.classList.add('active');
  }
});

document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  if (e.key === 'Escape') lightbox.classList.remove('active');
});