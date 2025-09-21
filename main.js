// Minimal JS for nav toggle, reveal on scroll, year injection, and simple form validation
(function(){
// Year in footer
document.querySelectorAll('[id^="year"]').forEach(el => el.textContent = new Date().getFullYear());


// Nav toggle (progressive enhancement)
function initNavToggle(toggleId, navId){
const btn = document.getElementById(toggleId);
const nav = document.getElementById(navId);
if(!btn || !nav) return;
btn.addEventListener('click', ()=>{
const expanded = btn.getAttribute('aria-expanded') === 'true';
btn.setAttribute('aria-expanded', String(!expanded));
if(expanded){ nav.setAttribute('aria-hidden','true') } else { nav.removeAttribute('aria-hidden') }
});
}
initNavToggle('nav-toggle','main-nav');
initNavToggle('nav-toggle-2','main-nav-2');
initNavToggle('nav-toggle-3','main-nav-3');
initNavToggle('nav-toggle-4','main-nav-4');


// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
const io = new IntersectionObserver((entries)=>{
entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('revealed'); });
},{threshold:0.08});
reveals.forEach(r=>io.observe(r));
} else { // fallback
reveals.forEach(r=>r.classList.add('revealed'));
}


// Simple client-side form validation + fake submit
const form = document.getElementById('contact-form');
if(form){
form.addEventListener('submit', function(e){
e.preventDefault();
const status = document.getElementById('form-status');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');


if(!name.value.trim() || !email.value.trim() || !message.value.trim()){
status.textContent = 'Please complete all fields.';
status.style.color = 'crimson';
return;
}


// Very basic email check
const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
if(!emailOk){ status.textContent = 'Please enter a valid email.'; status.style.color='crimson'; return; }


// Fake submit — integrate with Netlify Forms, Formspree, or your backend for production.
status.textContent = 'Thanks! Your message has been received (demo).';
status.style.color = 'green';
form.reset();
});
}
})();