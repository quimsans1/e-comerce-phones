import { describe, expect, it } from 'vitest'
import { formatPriceEur } from '../../utils/formatPriceEur'

// Test for EUR price formatting helper. 

describe('formatPriceEur', () => {
  it('formats integer prices with EUR suffix', () => { // Integer values test
    expect(formatPriceEur(399)).toBe('399 EUR')
  })

  it('formats zero and decimal values', () => { // Zero and decimal values test
    expect(formatPriceEur(0)).toBe('0 EUR')
    expect(formatPriceEur(399.99)).toBe('399.99 EUR')
  })
})