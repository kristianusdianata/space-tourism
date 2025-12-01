type FuncType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TArgs extends any[] = any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TResult = any,
> = (...args: TArgs) => TResult

export function useLogic<Fn extends FuncType>(
  func: Fn,
): (...args: Parameters<Fn>) => ReturnType<Fn> {
  return function wrapper(...args) {
    return func(...args) as ReturnType<Fn>
  }
}
