// Error
export class Error<E, S> {
  readonly value: E

  constructor(value: E) {
    this.value = value
  }

  isSuccess(): this is Success<E, S> {
    return false
  }

  isError(): this is Error<E, S> {
    return true
  }
}

// Success
export class Success<E, S> {
  readonly value: S

  constructor(value: S) {
    this.value = value
  }

  isSuccess(): this is Success<E, S> {
    return true
  }

  isError(): this is Error<E, S> {
    return false
  }
}

export type Either<E, S> = Error<E, S> | Success<E, S>

export const error = <E, S>(value: E): Either<E, S> => {
  return new Error(value)
}

export const success = <E, S>(value: S): Either<E, S> => {
  return new Success(value)
}
