import { renderHook, act } from '@testing-library/react';
import { useSearchDebounce } from '../useSearchDebounce';

// Mock timers para controlar setTimeout
jest.useFakeTimers();

describe('useSearchDebounce', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  it('should initialize with empty values', () => {
    const { result } = renderHook(() => useSearchDebounce());

    expect(result.current.searchTerm).toBe('');
    expect(result.current.debouncedTerm).toBe('');
    expect(result.current.isTyping).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should set search term and mark as typing', () => {
    const { result } = renderHook(() => useSearchDebounce());

    act(() => {
      result.current.setSearchTerm('test');
    });

    expect(result.current.searchTerm).toBe('test');
    expect(result.current.isTyping).toBe(true);
    expect(result.current.debouncedTerm).toBe('');
  });

  it('should debounce search term with default 1000ms delay', () => {
    const { result } = renderHook(() => useSearchDebounce());

    act(() => {
      result.current.setSearchTerm('test');
    });

    expect(result.current.debouncedTerm).toBe('');
    expect(result.current.isTyping).toBe(true);

    // Avanzar tiempo pero no completar el debounce
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.debouncedTerm).toBe('');
    expect(result.current.isTyping).toBe(true);

    // Completar el debounce
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.debouncedTerm).toBe('test');
    expect(result.current.isTyping).toBe(false);
  });

  it('should use custom delay', () => {
    const { result } = renderHook(() => useSearchDebounce({ delay: 2000 }));

    act(() => {
      result.current.setSearchTerm('test');
    });

    // No debe completar con 1000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.debouncedTerm).toBe('');
    expect(result.current.isTyping).toBe(true);

    // Debe completar con 2000ms
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.debouncedTerm).toBe('test');
    expect(result.current.isTyping).toBe(false);
  });

  it('should handle empty search term immediately', () => {
    const { result } = renderHook(() => useSearchDebounce());

    // Primero establecer un término
    act(() => {
      result.current.setSearchTerm('test');
    });

    // Luego limpiar
    act(() => {
      result.current.setSearchTerm('');
    });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.debouncedTerm).toBe('');
    expect(result.current.isTyping).toBe(false);
  });

  it('should respect minimum length', () => {
    const { result } = renderHook(() => useSearchDebounce({ minLength: 3 }));

    act(() => {
      result.current.setSearchTerm('ab');
    });

    expect(result.current.isTyping).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // No debe actualizar debouncedTerm porque no alcanza minLength
    expect(result.current.debouncedTerm).toBe('');
    expect(result.current.isTyping).toBe(true);

    // Ahora con suficientes caracteres
    act(() => {
      result.current.setSearchTerm('abc');
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.debouncedTerm).toBe('abc');
    expect(result.current.isTyping).toBe(false);
  });

  it('should cancel previous timer when new search term is set', () => {
    const { result } = renderHook(() => useSearchDebounce());

    act(() => {
      result.current.setSearchTerm('first');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Cambiar término antes de que complete el debounce
    act(() => {
      result.current.setSearchTerm('second');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Debe seguir esperando
    expect(result.current.debouncedTerm).toBe('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Ahora debe tener el segundo término
    expect(result.current.debouncedTerm).toBe('second');
  });

  it('should clear search correctly', () => {
    const { result } = renderHook(() => useSearchDebounce());

    act(() => {
      result.current.setSearchTerm('test');
      result.current.setIsLoading(true);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.debouncedTerm).toBe('test');
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchTerm).toBe('');
    expect(result.current.debouncedTerm).toBe('');
    expect(result.current.isTyping).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should manage loading state', () => {
    const { result } = renderHook(() => useSearchDebounce());

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setIsLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should handle rapid typing correctly', () => {
    const { result } = renderHook(() => useSearchDebounce({ delay: 1000 }));

    // Simular escritura rápida
    act(() => {
      result.current.setSearchTerm('t');
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      result.current.setSearchTerm('te');
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      result.current.setSearchTerm('tes');
    });

    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      result.current.setSearchTerm('test');
    });

    // Debe seguir en estado typing
    expect(result.current.isTyping).toBe(true);
    expect(result.current.debouncedTerm).toBe('');

    // Solo después del delay completo debe actualizar
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.debouncedTerm).toBe('test');
    expect(result.current.isTyping).toBe(false);
  });
});
