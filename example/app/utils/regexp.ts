export function testPass(string: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,./<=>?@[\\\]^`{|}~])(?=.{8})/.test(
    string
  );
}

export function testPassForLowerCase(string: string): boolean {
  return /(?=.*[a-z])/.test(string);
}

export function testPassForCapital(string: string): boolean {
  return /(?=.*[A-Z])/.test(string);
}

export function testPassForNumber(string: string): boolean {
  return /(?=.*\d)/.test(string);
}

export function testPassForSpecialSymbol(string: string): boolean {
  return /(?=.*[!"#$%&'()*+,./_<=>?@[\\\]^`{|}~])/.test(string);
}

const EMAIL_REGEXP = /\S[^\s@]*@\S+\.\S+/;

// // eslint-disable-next-line regexp/use-ignore-case
// const ALPHABETIC_REGEXP = /^[ A-Za-z-]+$/

// const POSTAL_CODE_REGEXP = /^\d{3}-\d{4}$/

// const TEST_PASS_REGEXP =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,./<=>?@[\\\]^`{|}~])(?=.{8})/

// const TEST_PASS_FOR_LOWER_CASE_REGEXP = /(?=.*[a-z])/

// const TEST_PASS_FOR_CAPITAL_REGEXP = /(?=.*[A-Z])/

const TEST_PASS_FOR_NUMBER_REGEXP = /(?=.*\d)/;

// const TEST_PASS_FOR_SPECIAL_SYMBOL_REGEXP =
//   /(?=.*[!"#$%&'()*+,./;<=>?@[\\\]^`{|}~])/

// const PHONE_REGEXP = /^\+\d+/

export function emailRegexp(string: string): boolean {
  return EMAIL_REGEXP.test(string);
}

// export function alphabeticRegexp(string: string): boolean {
//   return ALPHABETIC_REGEXP.test(string)
// }

// export function postalCodeRegexp(string: string): boolean {
//   return POSTAL_CODE_REGEXP.test(string)
// }

// export function testPassRegexp(string: string): boolean {
//   return TEST_PASS_REGEXP.test(string)
// }

// export function testPassForLowerCaseRegexp(string: string): boolean {
//   return TEST_PASS_FOR_LOWER_CASE_REGEXP.test(string)
// }

// export function testPassForCapitalRegexp(string: string): boolean {
//   return TEST_PASS_FOR_CAPITAL_REGEXP.test(string)
// }

export function testPassForNumberRegexp(string: string): boolean {
  return TEST_PASS_FOR_NUMBER_REGEXP.test(string);
}

// export function testPassForSpecialSymbolRegexp(string: string): boolean {
//   return TEST_PASS_FOR_SPECIAL_SYMBOL_REGEXP.test(string)
// }

// export function phoneRegexp(string: string): boolean {
//   return PHONE_REGEXP.test(string)
// }
