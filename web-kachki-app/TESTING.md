# Тестування

Додаток використовує **Vitest** та **React Testing Library** для тестування.

## Запуск тестів

```bash
# Запустити тести в watch режимі
npm run test

# Запустити тести з UI
npm run test:ui

# Запустити тести з покриттям коду
npm run test:coverage
```

## Структура тестів

Тести розташовані поруч з компонентами та утилітами:

```
src/
  components/
    __tests__/
      ErrorBoundary.test.tsx
  hooks/
    __tests__/
      useDebounce.test.ts
  lib/
    __tests__/
      utils.test.ts
```

## Написання тестів

### Приклад тесту компонента

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Приклад тесту хука

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMyHook } from '../useMyHook';

describe('useMyHook', () => {
  it('should return expected value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current).toBe(expectedValue);
  });
});
```

## Покриття коду

Мета - підтримувати покриття коду на рівні 80%+ для критичних компонентів.

## CI/CD

Тести автоматично запускаються при:
- Push до main/master гілки
- Pull Request
- Pre-commit hook (якщо налаштовано)

