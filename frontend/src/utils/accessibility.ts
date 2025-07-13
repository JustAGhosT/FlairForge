export class AccessibilityManager {
  static setupWorkflowKeyboardNavigation(containerSelector = '.workflow-steps') {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const steps = Array.from(container.querySelectorAll<HTMLElement>('.workflow-step'));
    steps.forEach((step, idx) => {
      step.setAttribute('tabindex', idx === 0 ? '0' : '-1');
      step.setAttribute('role', 'button');
      step.setAttribute('aria-label', step.querySelector('.step-label')?.textContent || 'Workflow step');
      step.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = steps[(idx + 1) % steps.length];
          next.focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = steps[(idx - 1 + steps.length) % steps.length];
          prev.focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          step.click();
        }
      });
    });
  }

  static announceToScreenReader(message: string) {
    let liveRegion = document.getElementById('aria-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'aria-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('role', 'status');
      liveRegion.style.position = 'absolute';
      liveRegion.style.left = '-9999px';
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = message;
  }
} 