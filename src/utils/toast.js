export const showToast = (message, type = 'info') => {
  if (!message) return;
  const bg = type === 'error' ? '#ef4444' : type === 'success' ? '#16a34a' : '#334155';
  const el = document.createElement('div');
  el.textContent = message;
  el.style.position = 'fixed';
  el.style.bottom = '24px';
  el.style.right = '24px';
  el.style.background = bg;
  el.style.color = 'white';
  el.style.padding = '10px 14px';
  el.style.borderRadius = '8px';
  el.style.boxShadow = '0 4px 14px rgba(0,0,0,0.2)';
  el.style.zIndex = '9999';
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 300ms';
    setTimeout(() => el.remove(), 300);
  }, 2000);
};


