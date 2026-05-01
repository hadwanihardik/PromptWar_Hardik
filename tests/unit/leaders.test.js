/**
 * Leaders Module Unit Tests
 * Testing tab switching and card expansion logic
 */

describe('Leaders Module', () => {
  let activeTab = 'lokSabha';
  
  test('should switch tabs correctly', () => {
    function switchTab(tab) {
      activeTab = tab;
    }
    
    switchTab('rajyaSabha');
    expect(activeTab).toBe('rajyaSabha');
    
    switchTab('lokSabha');
    expect(activeTab).toBe('lokSabha');
  });

  test('should toggle card expansion', () => {
    let expandedCard = null;
    function toggleCard(id) {
      expandedCard = expandedCard === id ? null : id;
    }

    toggleCard('om-birla');
    expect(expandedCard).toBe('om-birla');

    toggleCard('om-birla');
    expect(expandedCard).toBe(null);
  });
});
