const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const projectOverview = document.getElementById('projectOverview');
const projectProblem = document.getElementById('projectProblem');
const projectSolution = document.getElementById('projectSolution');
const projectFeatures = document.getElementById('projectFeatures');
const projectTechnologies = document.getElementById('projectTechnologies');
const projectRole = document.getElementById('projectRole');
const projectBenefits = document.getElementById('projectBenefits');
const projectButtons = document.querySelectorAll('.project-button');
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');
const revealElements = document.querySelectorAll('.reveal');

const getStoredTheme = () => {
    const stored = localStorage.getItem('darwin-theme');
    if (stored) return stored;
    return 'dark';
};

const applyTheme = (theme) => {
    const isLight = theme === 'light';
    root.classList.toggle('light-mode', isLight);

    if (themeToggle) {
        const icon = themeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = isLight ? '🌙' : '☀️';
        }
    }

    localStorage.setItem('darwin-theme', theme);
};

const initializeTheme = () => {
    applyTheme(getStoredTheme());
};

const initializeRevealObserver = () => {
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
};

const setActiveNavLink = (id) => {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
    });
};

const initializeSectionObserver = () => {
    const sections = document.querySelectorAll('main section[id]');

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visibleEntry) {
                setActiveNavLink(visibleEntry.target.id);
            }
        },
        { threshold: [0.3, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
};

const toggleMenu = () => {
    if (!nav || !menuToggle) return;
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
};

const closeMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
};

const projectData = {
    'asset-management': {
        title: 'IT Asset Management System', category: 'IT Systems • Automation',
        overview: 'Designed an internal IT Asset Management System to organize employees, company laptops, assignments, returns, asset history, and availability.',
        problem: 'IT assets can become difficult to track when employee information, assignments, and asset status are handled manually across different records.',
        solution: 'Created a centralized workflow connecting employee information with IT assets, assignments, returns, and asset history.',
        features: ['Employee management', 'Laptop inventory', 'Automatic asset ID', 'Asset assignment', 'Asset return', 'Asset history', 'Availability tracking', 'Dashboard reporting'],
        technologies: ['Google Sheets', 'Google Apps Script', 'HTML', 'CSS', 'JavaScript'],
        role: 'System design, workflow planning, automation, and implementation.',
        benefits: ['Designed to improve asset visibility, reduce manual tracking, and make laptop assignment and return processes easier to manage.']
    },
    helpdesk: {
        title: 'IT Help Desk Ticketing System', category: 'IT Support • Automation',
        overview: 'Built an internal ticketing workflow using Google Forms, Google Sheets, and Google Apps Script.',
        problem: 'IT concerns require a structured way to capture requests, assign ticket numbers, track status, and notify users.',
        solution: 'Created an automated ticket workflow that captures IT requests and generates structured ticket records.',
        features: ['Automatic ticket number', 'Ticket status', 'Priority', 'Concern type', 'Subject', 'Request details', 'Email notification', 'Ticket tracking'],
        technologies: ['Google Forms', 'Google Sheets', 'Google Apps Script'],
        role: 'Workflow design, form structure, spreadsheet logic, automation, and notification setup.',
        benefits: ['Designed to centralize IT requests and reduce repetitive manual tracking.']
    },
    'laptop-cycle': {
        title: 'Laptop Assignment & Return System', category: 'IT Asset Management',
        overview: 'Created a workflow for assigning company laptops to employees and recording asset returns.',
        problem: 'Laptop assignments and returns need consistent records to maintain accurate inventory information.',
        solution: 'Built forms and automation for asset assignment, return tracking, employee association, and asset status.',
        features: ['Automatic asset ID', 'Employee assignment', 'Asset status', 'Assignment date', 'Return date', 'Assignment history', 'Availability tracking'],
        technologies: ['Google Forms', 'Google Sheets', 'Google Apps Script'],
        role: 'Workflow design and automation implementation.',
        benefits: ['Designed to improve visibility of available, assigned, and returned equipment.']
    },
    'onboarding-offboarding': {
        title: 'Employee Registration & Offboarding System', category: 'Business Systems • IT Operations',
        overview: 'Designed an employee information workflow that supports registration, company assignment, status tracking, and offboarding.',
        problem: 'Employee information and IT-related offboarding activities require structured records and consistent processes.',
        solution: 'Created a structured employee registration workflow with fields for company, department, position, employee type, employment status, date hired, company email, and remarks.',
        features: ['Employee registration', 'Employee ID', 'Company assignment', 'Department', 'Position', 'Employee type', 'Employment status', 'Date hired', 'Company email', 'Offboarding tracking'],
        technologies: ['Google Forms', 'Google Sheets', 'Google Apps Script'],
        role: 'Workflow planning, data structure, and automation.',
        benefits: ['Designed to provide a more organized employee lifecycle record for IT and administrative processes.']
    },
    'travel-support': {
        title: 'Travel Business IT Support', category: 'IT Support • Business Operations',
        overview: 'IT and business operations support around travel systems and workflows.',
        problem: 'Travel operations depend on booking platforms, reservation workflows, ticketing processes, and reliable technical systems.',
        solution: 'Provided technical troubleshooting and operational support for booking-related systems and workflows.',
        featuresLabel: 'Areas Supported',
        features: ['Booking platform troubleshooting', 'Reservation workflows', 'Ticketing issues', 'Booking verification', 'Operational system support', 'Technical issue investigation'],
        role: 'Technical support, troubleshooting, issue investigation, and operational assistance.'
    },
    'ai-automation': {
        title: 'AI Automation with n8n', category: 'Learning • Career Development', status: 'Learning / Career Development',
        overview: 'Currently developing practical knowledge in AI automation, n8n workflows, APIs, webhooks, AI agents, integrations, and business process automation.',
        featuresLabel: 'Learning Areas',
        features: ['n8n', 'AI workflows', 'APIs', 'Webhooks', 'Automation triggers', 'Data processing', 'AI agents', 'Workflow logic', 'System integrations'],
        technologies: ['n8n', 'APIs', 'Webhooks'],
        goalLabel: 'Career Goal',
        goal: 'Develop practical automation skills that can be applied to IT operations, business systems, and future AI automation roles.'
    }
};

const modalDialog = modal?.querySelector('.modal-dialog');
const modalCategory = document.getElementById('modalCategory');
const modalGrid = document.getElementById('modalGrid');
let previousModalFocus = null;
let previousBodyOverflow = '';

const addModalSection = (label, content, fullWidth = false) => {
    if (!content || !modalGrid) return;
    const section = document.createElement('section');
    section.className = `modal-block${fullWidth ? ' full-width' : ''}`;
    const heading = document.createElement('h4');
    heading.textContent = label;
    section.append(heading);
    if (Array.isArray(content)) {
        const list = document.createElement('ul');
        content.forEach((item) => {
            const entry = document.createElement('li');
            entry.textContent = item;
            list.append(entry);
        });
        section.append(list);
    } else {
        const paragraph = document.createElement('p');
        paragraph.textContent = content;
        section.append(paragraph);
    }
    modalGrid.append(section);
};

const openProjectModal = (key, trigger) => {
    const project = projectData[key];
    if (!project || !modal || !modalDialog || !modalGrid) return;

    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;
    modalGrid.replaceChildren();
    if (project.status) addModalSection('Status', project.status);
    addModalSection('Overview', project.overview, true);
    addModalSection('Problem', project.problem);
    addModalSection('Solution', project.solution);
    addModalSection(project.featuresLabel || 'Features', project.features);
    addModalSection('Technologies', project.technologies);
    addModalSection('My Role', project.role);
    addModalSection('Expected Benefits', project.benefits, true);
    addModalSection(project.goalLabel, project.goal, true);

    previousModalFocus = trigger || document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
};

const closeProjectModal = () => {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousBodyOverflow;
    previousModalFocus?.focus();
};
const handleContactSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById('name')?.value.trim() || '';

    if (formStatus) {
        formStatus.textContent = `Thanks${name ? `, ${name}` : ''}! Your message has been captured for this frontend demo.`;
    }

    if (contactForm) {
        contactForm.reset();
    }
};

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = root.classList.contains('light-mode') ? 'light' : 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

document.addEventListener('click', (event) => {
    if (!nav || !menuToggle) return;

    const target = event.target;
    const clickInsideMenu = nav.contains(target) || menuToggle.contains(target);

    if (!clickInsideMenu && nav.classList.contains('is-open')) {
        closeMenu();
    }
});

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');

        if (href && href.startsWith('#') && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        closeMenu();
    });
});

projectButtons.forEach((button) => {
    button.addEventListener('click', () => openProjectModal(button.dataset.project, button));
});

if (modal) {
    modal.addEventListener('click', (event) => {
        const clickTarget = event.target;
        if (clickTarget instanceof HTMLElement && (clickTarget.dataset.close === 'true' || clickTarget === modal)) {
            closeProjectModal();
        }
    });
}

const modalCloseButton = document.querySelector('.modal-close');
if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeProjectModal);
}

document.addEventListener('keydown', (event) => {
    if (modal?.classList.contains('is-open') && event.key === 'Tab' && modalDialog) {
        const focusable = [...modalDialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    if (event.key === 'Escape') {
        if (modal && modal.classList.contains('is-open')) closeProjectModal();
        closeMenu();
    }
});

if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

initializeTheme();
initializeRevealObserver();
initializeSectionObserver();
