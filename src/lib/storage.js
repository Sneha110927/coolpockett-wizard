const KEY = "coolpockett_wizard_v1";

export function loadWizardState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveWizardState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore (storage might be blocked)
  }
}

export function clearWizardState() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}