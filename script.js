// Maven Works - Main Script

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Navigation & Mobile Menu
  const navMenu = document.getElementById('menu');
  const burgerBtn = document.getElementById('burger');
  const navLinks = document.querySelectorAll('.menu a[data-r]');

  // Check if current viewport is desktop width
  const isDesktop = () => window.matchMedia('(min-width: 941px)').matches;

  // Update mobile menu display
  function syncMenu() {
    if (!navMenu) return;
    if (isDesktop()) {
      navMenu.hidden = false;
    } else {
      navMenu.hidden = !navMenu.dataset.open;
    }
  }

  // Toggle mobile navigation menu
  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.dataset.open === '1';
      navMenu.dataset.open = isOpen ? '' : '1';
      burgerBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      syncMenu();
    });
  }

  // Close mobile menu on resize and adjust visibility
  window.addEventListener('resize', syncMenu);
  syncMenu();

  // Client-Side Hash Router
  const validRoutes = ['home', 'range', 'industries', 'partner', 'about', 'contact'];
  const viewSections = document.querySelectorAll('.page-view');

  // Switch active page view based on URL hash
  function route() {
    const rawHash = (window.location.hash || '#home').replace(/^#/, '');
    const currentRoute = validRoutes.includes(rawHash) ? rawHash : 'home';

    // Toggle active view
    viewSections.forEach((section) => {
      const sectionId = section.getAttribute('id');
      if (sectionId === `view-${currentRoute}`) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Update active state on navigation links
    navLinks.forEach((link) => {
      const targetRoute = link.getAttribute('data-r');
      link.classList.toggle('on', targetRoute === currentRoute);
    });

    // Automatically collapse mobile menu after navigation
    if (!isDesktop() && navMenu && burgerBtn) {
      navMenu.dataset.open = '';
      burgerBtn.setAttribute('aria-expanded', 'false');
      syncMenu();
    }

    // Scroll back to top on page transition
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Listen for hash changes and initial page load
  window.addEventListener('hashchange', route);
  route();

  // Clipboard Helper
  // Copy text to clipboard helper
  function copyTextToClipboard(text, triggerBtn) {
    const originalText = triggerBtn.textContent;

    const setFeedback = (isSuccess) => {
      triggerBtn.textContent = isSuccess ? 'Copied' : 'Select and copy';
      setTimeout(() => {
        triggerBtn.textContent = originalText;
      }, 1600);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => setFeedback(true))
        .catch(() => setFeedback(false));
    } else {
      // Fallback for older browsers or non-secure contexts
      try {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = text;
        tempTextarea.style.position = 'fixed';
        tempTextarea.style.left = '-9999px';
        document.body.appendChild(tempTextarea);
        tempTextarea.focus();
        tempTextarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(tempTextarea);
        setFeedback(successful);
      } catch (err) {
        setFeedback(false);
      }
    }
  }

  // Bind all elements with [data-copy] attribute
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        copyTextToClipboard(targetElement.textContent.trim(), btn);
      }
    });
  });

  // Enquiry Form Handling
  const enquiryForm = document.getElementById('enq');
  const enquiryOutput = document.getElementById('out');
  const enquiryOutputText = document.getElementById('outtext');
  const copyEnquiryBtn = document.getElementById('copyenq');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Safely retrieve trimmed form values
      const getValue = (fieldName) => {
        const field = enquiryForm.elements[fieldName];
        return (field && field.value && field.value.trim()) ? field.value.trim() : '—';
      };

      // Construct structured enquiry summary
      const formattedEnquiry =
`Maven Works — enquiry

Name:      ${getValue('name')}
Company:   ${getValue('company')}
Email:     ${getValue('email')}
Phone:     ${getValue('phone')}
Location:  ${getValue('location')}
Type:      ${getValue('type')}

Requirement
${getValue('requirement')}`;

      // Display formatted output
      if (enquiryOutput && enquiryOutputText) {
        enquiryOutputText.textContent = formattedEnquiry;
        enquiryOutput.hidden = false;
        enquiryOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Bind copy button for the formatted text
      if (copyEnquiryBtn) {
        copyEnquiryBtn.onclick = () => {
          copyTextToClipboard(formattedEnquiry, copyEnquiryBtn);
        };
      }
    });
  }

  // ==========================================================================
  // WhatsApp Floating Chat Widget (+91 99621 12605)
  // ==========================================================================
  const waWidget = document.getElementById('wa-widget');
  const waPopup = document.getElementById('wa-popup');
  const waToggle = document.getElementById('wa-toggle');
  const waClose = document.getElementById('wa-close');
  const waForm = document.getElementById('wa-form');
  const waInput = document.getElementById('wa-input');
  const waChips = document.querySelectorAll('.wa-chip');
  const waPhoneNumber = '919962112605';

  if (waWidget && waPopup && waToggle) {
    function openWhatsAppPopup() {
      waPopup.hidden = false;
      waWidget.classList.add('is-open');
      waWidget.classList.add('dismiss-badge');
      waToggle.setAttribute('aria-expanded', 'true');
      setTimeout(() => {
        if (waInput) waInput.focus();
      }, 120);
    }

    function closeWhatsAppPopup() {
      waPopup.hidden = true;
      waWidget.classList.remove('is-open');
      waToggle.setAttribute('aria-expanded', 'false');
    }

    // Toggle button click
    waToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (waPopup.hidden) {
        openWhatsAppPopup();
      } else {
        closeWhatsAppPopup();
      }
    });

    // Close button click
    if (waClose) {
      waClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeWhatsAppPopup();
      });
    }

    // Direct WhatsApp send function
    function sendWhatsAppMessage(messageText) {
      const text = (messageText || (waInput ? waInput.value : '')).trim();
      const finalMsg = text.length > 0
        ? text
        : 'Hello Maven Works! I would like to enquire about your industrial automation products.';
      const waUrl = `https://wa.me/${waPhoneNumber}?text=${encodeURIComponent(finalMsg)}`;

      window.open(waUrl, '_blank', 'noopener,noreferrer');

      if (waInput) waInput.value = '';
      closeWhatsAppPopup();
    }

    // Form submit
    if (waForm) {
      waForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendWhatsAppMessage();
      });
    }

    // Allow Enter key in textarea to send (Shift+Enter for new line)
    if (waInput) {
      waInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendWhatsAppMessage();
        }
      });
    }

    // Click on suggestion chips
    waChips.forEach((chip) => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const msg = chip.getAttribute('data-msg');
        if (msg && waInput) {
          waInput.value = msg;
          waInput.focus();
        }
      });
    });

    // Close when clicking outside widget
    document.addEventListener('click', (e) => {
      if (!waWidget.contains(e.target) && !waPopup.hidden) {
        closeWhatsAppPopup();
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !waPopup.hidden) {
        closeWhatsAppPopup();
      }
    });
  }
});
