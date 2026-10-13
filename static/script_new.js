// Mobile menu toggle, shared across all pages
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('nav.links');

if (menuToggle && navLinks) {
    menuToggle.setAttribute('aria-expanded', 'false');

    function closeMenu() {
        navLinks.style.display = 'none';
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
        navLinks.style.display = 'flex';
        navLinks.style.cssText += 'flex-direction:column;position:absolute;top:64px;left:0;right:0;background:#fff;padding:20px 32px;gap:18px;border-bottom:1px solid #f1efe8;';
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        isOpen ? closeMenu() : openMenu();
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            menuToggle.focus();
        }
    });

    document.addEventListener('click', (e) => {
        const header = document.querySelector('header.nav');
        if (header && !header.contains(e.target) && menuToggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
        }
    });
}

// Contact form -> mailto prefill (no backend, honest hand-off to the visitor's email client)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = contactForm.querySelector('[name="nome"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const situacao = contactForm.querySelector('[name="situacao"]');
        const situacaoLabel = situacao.options[situacao.selectedIndex]?.text || '';
        const mensagem = contactForm.querySelector('[name="mensagem"]').value.trim();

        const subject = `Diagnóstico gratuito — ${nome || 'Novo contacto'}`;
        const bodyLines = [
            `Nome: ${nome}`,
            `Email: ${email}`,
            `Situação actual: ${situacaoLabel}`,
            '',
            mensagem
        ];
        const mailto = `mailto:ola@ndlela.co.mz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
        window.location.href = mailto;
    });
}
