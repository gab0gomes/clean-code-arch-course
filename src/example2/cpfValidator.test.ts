const { cpfValidator } = require('./cpfValidator');

test('should return false if cpf is null', () => {
  const result = cpfValidator(null);

  expect(result).toBe(false);
});

test('should return false if cpf is undefined', () => {
  const result = cpfValidator();

  expect(result).toBe(false);
});

test('should return false if cpf is bigger than 14 characters', () => {
  const result = cpfValidator('121.311.231.434-111');

  expect(result).toBe(false);
});

test('should return false if cpf is smaller than 11 characters', () => {
  const result = cpfValidator('121.311-111');

  expect(result).toBe(false);
});

test('should return false if all charactere are the same', () => {
  const result = cpfValidator('111.111.111.111-111');

  expect(result).toBe(false);
});

test('should return true for a valid cpf', () => {
  const result = cpfValidator('130.805.360-61');

  expect(result).toBe(true);
});

test('should return false for a invalid cpf', () => {
  const result = cpfValidator('130.805.360-62');

  expect(result).toBe(false);
});
