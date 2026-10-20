globalThis.addEventListener('load', () => document.body.classList.add("loaded")); const center = document.querySelector('.center'); if (globalThis.matchMedia('(min-width:1118px) and (orientation: landscape), (min-height:784px) and (orientation: landscape)').matches) {
  let v = 0; addEventListener('wheel', e => {
    e.preventDefault(); v += e.deltaY * 0.35;
  }, { passive: false });
  (function s() {
    if (Math.abs(v) > 0.1) {
      center.scrollTop += v; v *= 0.95;
    }
    requestAnimationFrame(s);
  })();
}
const projects = document.querySelectorAll('.center .projects'); function isCenterScrollable() {
  if (!center) {
    return false;
  }
  const s = getComputedStyle(center).overflowY;
  return (s === 'auto' || s === 'scroll') && center.scrollHeight > center.clientHeight;
}
let centerScrollable = isCenterScrollable(), ticking = false;
function scheduleCheck() {
  if (!ticking) {
    ticking = true; requestAnimationFrame(() => {
      checkProjectsInView(); ticking = false;
    });
  }
}
function checkProjectsInView() {
  const centerLine = (center && centerScrollable)
    ? (center.getBoundingClientRect().top + center.clientHeight / 2)
    : (globalThis.innerHeight / 2); for (const p of projects) {
      const r = p.getBoundingClientRect(); p.classList.toggle('visible', r.top <= centerLine && r.bottom >= centerLine);
    }
}
checkProjectsInView();
setTimeout(checkProjectsInView, 50);
if (center && centerScrollable) center.addEventListener('scroll', scheduleCheck, { passive: true });
addEventListener('scroll', scheduleCheck, { passive: true }); addEventListener('touchmove', scheduleCheck, { passive: true });
addEventListener('resize', () => {
  centerScrollable = isCenterScrollable(); scheduleCheck();
}, { passive: true });
addEventListener('orientationchange', () => {
  centerScrollable = isCenterScrollable(); scheduleCheck();
}, { passive: true }); setInterval(() => {
  clock.textContent = 'BS ' + new Date().toLocaleTimeString('it-IT', { timeZone: 'Europe/Rome', hour12: false });
}, 1000);
quote.textContent = [
  "Stop delaying, success is ready for you",
  "The smart choice is clear, join us now",
  "Others try, we deliver real results",
  "Many dream, but real wins happen here",
  "No more hoping, succeed today"
][Math.floor(Math.random() * 5)];
function submitForm(e) {
  e.preventDefault(); const form = document.getElementById('contactForm');
  fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSeF2gery3xXgXSgdNALGy5nO-NfiJ2eIUGbKFEzMimbn3YbRA/formResponse', {
    method: 'POST',
    mode: 'no-cors',
    body: new FormData(form)
  }).then(() => {
    alert('Welcome! Your information will only be used for contact purposes and not shared; request removal at contact@illunify.com.');
    form.reset();
  });
}