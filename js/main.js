// ========== FAQ TOGGLE ==========
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ========== TABS ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    const container = btn.closest('.tabs-container');
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    btn.classList.add('active');
    const pane = container.querySelector(`[data-pane="${target}"]`);
    if (pane) pane.style.display = 'block';
  });
});

// ========== HAMBURGER MENU ==========
(function() {
  const navbars = document.querySelectorAll('.navbar');
  navbars.forEach(navbar => {

    // ── Hamburger button ──
    const burger = document.createElement('button');
    burger.className = 'nav-hamburger';
    burger.setAttribute('aria-label', 'Toggle menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navbar.appendChild(burger);

    // ── Detect current page for active link ──
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // ── Always build full link list (never rely on cloning) ──
    const allLinks = [
      { href: 'index.html',              label: 'Home' },
      { href: 'english-mastery.html',    label: 'English mastery' },
      { href: 'languages.html',          label: 'Languages' },
      { href: 'personality-career.html', label: 'Personality & careers' },
      { href: 'learning-parents.html',   label: 'Learning & parents' },
      { href: 'contact.html',            label: 'Contact' },
    ];

    // ── Build drawer ──
    const drawer = document.createElement('div');
    drawer.className = 'mobile-nav-drawer';

    const ul = document.createElement('ul');
    allLinks.forEach(({ href, label }) => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href = href;
      a.textContent = label;
      if (href === currentPage) a.classList.add('active');
      li.appendChild(a);
      ul.appendChild(li);
    });
    drawer.appendChild(ul);

    // ── CTA button ──
    const ctaWrap = document.createElement('div');
    ctaWrap.className = 'mobile-cta';
    ctaWrap.innerHTML = '<a href="contact.html">Book a consulting →</a>';
    drawer.appendChild(ctaWrap);

    document.body.insertBefore(drawer, navbar.nextSibling);

    // ── Toggle ──
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drawer.classList.contains('open');
      drawer.classList.toggle('open', !isOpen);
      burger.classList.toggle('open', !isOpen);
      burger.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // ── Close on link click ──
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // ── Close on outside click ──
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });
})();


const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== ANIMATE ON SCROLL (simple fade-in) ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .course-item, .testimonial-card, .pricing-card, .destination-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
