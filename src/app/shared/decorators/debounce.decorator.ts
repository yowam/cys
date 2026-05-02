function debounceFn(fn: any, milliseconds = 0, takeFirst = false): () => void {
  let timeout: string | number | ReturnType<typeof setTimeout> | undefined;

  return function (): void {
    const ctx = this;
    const args = arguments;

    const callNow = takeFirst && !timeout;

    clearTimeout(Number(timeout));

    timeout = setTimeout(() => {
      timeout = undefined;

      if (!takeFirst) {
        fn.apply(ctx, args);
      }
    }, milliseconds);

    if (callNow) {
      fn.apply(ctx, args);
    }
  };
}

export function Debounce(milliseconds = 0, takeFirst = false): any {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const originalMethod = descriptor.value;
    descriptor.value = debounceFn(originalMethod, milliseconds, takeFirst);
    return descriptor;
  };
}
