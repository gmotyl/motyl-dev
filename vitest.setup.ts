import '@testing-library/jest-dom';

// Mock ResizeObserver for Vitest/JSDOM environment as a class
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserver);

// Mock scrollIntoView for Vitest/JSDOM environment
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
}