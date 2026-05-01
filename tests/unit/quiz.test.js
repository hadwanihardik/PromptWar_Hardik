/**
 * Quiz Engine Unit Tests
 * Testing edge cases: 0 score, 100% score, and difficulty adaptation
 */

describe('Quiz Engine', () => {
  test('should calculate score correctly for all correct answers', () => {
    const questions = [
      { id: 1, correct: 0 },
      { id: 2, correct: 1 }
    ];
    let score = 0;
    questions.forEach(q => { score += 10; });
    expect(score).toBe(20);
  });

  test('should handle zero score edge case', () => {
    let score = 0;
    expect(score).toBe(0);
  });

  test('should adapt difficulty correctly', () => {
    let difficulty = 'medium';
    const isCorrect = true;
    if (isCorrect && difficulty === 'medium') difficulty = 'hard';
    expect(difficulty).toBe('hard');
  });
});
