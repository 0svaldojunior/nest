import { Either, error, success } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return success(10)
  }

  return error('error')
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isSuccess()).toBe(true)
  expect(result.isError()).toBe(false)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isError()).toBe(true)
  expect(result.isSuccess()).toBe(false)
})
