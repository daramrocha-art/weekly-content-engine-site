(() => {
  const params = new URLSearchParams(location.search);
  const sourcePlatform = params.get('source') || 'direct';
  const draftId = params.get('draft_id') || 'unknown';
  const key = 'weekly-content-engine-events';
  function record(eventType) {
    const event = { eventType, sourcePlatform, draftId, timestamp: new Date().toISOString() };
    const events = JSON.parse(localStorage.getItem(key) || '[]');
    events.push(event);
    localStorage.setItem(key, JSON.stringify(events));
    console.info('[weekly-content-engine:event]', event);
  }
  record('click');
  document.querySelectorAll('[data-event]').forEach((el) => el.addEventListener('click', () => record(el.dataset.event)));
})();
