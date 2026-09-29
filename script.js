const bookingDialog = document.querySelector('.booking-dialog');
const bookingForm = document.querySelector('#booking-form');
const feedback = document.querySelector('.form-feedback');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const dateInput = bookingForm.elements.date;

const localDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);
dateInput.min = localDate;

function openBooking() {
  bookingDialog.showModal();
  feedback.textContent = '';
  bookingForm.elements.name.focus();
}

document.querySelectorAll('[data-open-booking]').forEach((button) => {
  button.addEventListener('click', openBooking);
});

document.querySelector('.dialog-close').addEventListener('click', () => {
  bookingDialog.close();
});

bookingDialog.addEventListener('click', (event) => {
  if (event.target === bookingDialog) bookingDialog.close();
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;
  const name = bookingForm.elements.name.value.trim();
  feedback.textContent = `Thanks, ${name}. Your request is ready. Please call (718) 555-0148 to confirm your appointment.`;
  bookingForm.reset();
  dateInput.min = localDate;
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mainNav.classList.toggle('is-open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});
