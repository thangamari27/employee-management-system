/**
 * Password validator for login pages
 */

// Check if password contains a number
const hasNumber = (password) => /[0-9]/.test(password);

// Check if password contains both uppercase and lowercase letters
const hasMixed = (password) => /[a-z]/.test(password) && /[A-Z]/.test(password);

// Check if password contains special characters
const hasSpecial = (password) => /[!#@$%^&*)(+=._-]/.test(password);

// Determine password strength color and label
export const strengthColor = (count) => {
  if (count <= 1) return { label: 'Poor', color: 'error.main' };
  if (count === 2) return { label: 'Weak', color: 'warning.main' };
  if (count === 3) return { label: 'Normal', color: 'warning.dark' };
  if (count === 4) return { label: 'Good', color: 'success.light' };
  if (count === 5) return { label: 'Good (8-digit recommended)', color: 'success.main' };
  if (count === 6) return { label: 'Strong', color: 'success.dark' };
  if (count >= 7) return { label: 'Very Strong (16-digit recommended)', color: 'success.darker' };
};

// Calculate password strength based on multiple factors
export const strengthIndicator = (password) => {
  let strength = 0;
  
  if (password.length >= 6) strength += 1; // Basic length check
  if (password.length >= 8) strength += 1; // 8+ characters (good signal)
  if (password.length >= 16) strength += 1; // 16+ characters (strong signal)
  if (hasNumber(password)) strength += 1;
  if (hasSpecial(password)) strength += 1;
  if (hasMixed(password)) strength += 1;

  return strength;
};
