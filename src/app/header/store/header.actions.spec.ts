import * as fromHeader from './header.actions';

describe('loadHeaders', () => {
  it('should return an action', () => {
    expect(fromHeader.addToCart().type).toBe('[Header] Add to Cart');
  });
});
