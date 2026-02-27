export function isNonEmpty(v) {
  return String(v ?? "").trim().length > 0;
}

export function isEmail(v) {
  const s = String(v ?? "").trim();
  if (!s) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}

export function isPhone(v) {
  const s = String(v ?? "").trim();
  if (!s) return false;
  // permissive: digits + spaces + () + + + -
  if (!/^[+\d][\d\s()-]{6,}$/.test(s)) return false;
  const digits = s.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 16;
}

export function passwordScore(pw) {
  const s = String(pw ?? "");
  let score = 0;
  if (s.length >= 8) score++;
  if (/[A-Z]/.test(s)) score++;
  if (/[a-z]/.test(s)) score++;
  if (/\d/.test(s)) score++;
  if (/[^A-Za-z0-9]/.test(s)) score++;
  // 0..5
  return score;
}

export function passwordStrengthLabel(score) {
  if (score <= 1) return "Weak";
  if (score === 2) return "Fair";
  if (score === 3) return "Good";
  if (score >= 4) return "Strong";
  return "Weak";
}

export function isDateMMDDYYYY(v) {
  const s = String(v ?? "").trim();
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(s)) return false;
  const [mm, dd, yyyy] = s.split("/").map((x) => parseInt(x, 10));
  if (yyyy < 1900 || yyyy > 2100) return false;
  if (mm < 1 || mm > 12) return false;
  const daysInMonth = new Date(yyyy, mm, 0).getDate();
  if (dd < 1 || dd > daysInMonth) return false;
  return true;
}

export function isZipLike(v) {
  const s = String(v ?? "").trim();
  if (!s) return false;
  return /^[A-Za-z0-9][A-Za-z0-9 -]{2,10}$/.test(s);
}

export function isSSNLast4(v) {
  const s = String(v ?? "").trim();
  return /^\d{4}$/.test(s);
}

export function isPAN(v) {
  const s = String(v ?? "").trim().toUpperCase();
  // Indian PAN format: 5 letters + 4 digits + 1 letter
  return /^[A-Z]{5}\d{4}[A-Z]$/.test(s);
}