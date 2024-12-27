export function validatePassword(password: string): { isValid: boolean; error?: string } {
  if (password.length < 8) {
    return {
      isValid: false,
      error: '密碼長度必須至少為8個字符'
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasUpperCase && !hasNumber) {
    return {
      isValid: false,
      error: '密碼必須包含至少一個大寫字母或數字'
    };
  }

  return { isValid: true };
}