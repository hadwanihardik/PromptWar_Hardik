/**
 * Security Unit Tests
 * Testing input sanitization and XSS prevention
 */

describe('Security - Input Sanitization', () => {
  const escapeHtml = (str) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, (m) => map[m]);
  };

  test('should escape script tags to prevent XSS', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    const safeOutput = escapeHtml(maliciousInput);
    expect(safeOutput).not.toContain('<script>');
    expect(safeOutput).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  test('should handle empty input safely', () => {
    expect(escapeHtml('')).toBe('');
  });
});
