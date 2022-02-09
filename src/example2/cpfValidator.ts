interface CpfMultiplyLimit {
  [key: number]: number
}

const isIdentile = (text: string): boolean => {
  const characters = text.split('');
  const unique = new Set(characters)

  return unique.size === 1 ? true : false;
}

const calculateSum = (digits: Array<string | number>) => digits.reduce(
  (sum: number, digit: string | number, index) => {
    const MULTIPLY_LIMIT: CpfMultiplyLimit = {
      9: 10,
      10: 11,
    };

    const multiplyFactor = MULTIPLY_LIMIT[digits.length] - index;
    return sum + (+digit * multiplyFactor);
  },
  0
);

const calculateVerificationDigit = (digits: Array<string | number>): number => {
  const CPF_RULE_DIGIT = 11;
  const CPF_DIVISOR = 2;
  const CPF_MODULUS_RESPONSE = 0;

  const modulus = calculateSum(digits) % CPF_RULE_DIGIT;
  return modulus < CPF_DIVISOR
    ? CPF_MODULUS_RESPONSE
    : CPF_RULE_DIGIT - modulus;
}

exports.cpfValidator = (cpf: string): boolean => {
  if (cpf === null || typeof cpf === 'undefined') {
    return false;
  }

  const unmaskedCpf = cpf.replace(/\D/g,'');
  if (unmaskedCpf.length !== 11 || isIdentile(unmaskedCpf)) {
    return false;
  }

  try {
    const FIRST_VERIFICATION_DIGIT_POS = 9;
    const SECOND_VERIFICATION_DIGIT_POS = 10;

    const digitsArray = unmaskedCpf.substring(0, 9).split('');
    const firstVerificationDigit = calculateVerificationDigit(digitsArray);

    if (firstVerificationDigit !== +unmaskedCpf[FIRST_VERIFICATION_DIGIT_POS]) {
      return false;
    }

    const secondVerificationDigit = calculateVerificationDigit([...digitsArray, firstVerificationDigit]);
    if (secondVerificationDigit !== +unmaskedCpf[SECOND_VERIFICATION_DIGIT_POS]) {
      return false;
    }

    return true;
  } catch (error: any) {  
    throw new Error(`${error}`);
  }
}
