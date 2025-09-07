import escapeStringRegexp from 'escape-string-regexp';

enum PasswordStrength {
  TOO_WEAK = 'Too weak',
  WEAK = 'Weak',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
}

const defaultOptions = [
  {
    id: 0,
    value: PasswordStrength.TOO_WEAK,
    minDiversity: 0,
    minLength: 6,
  },
  {
    id: 1,
    value: PasswordStrength.WEAK,
    minDiversity: 2,
    minLength: 8,
  },
  {
    id: 2,
    value: PasswordStrength.MEDIUM,
    minDiversity: 4,
    minLength: 10,
  },
  {
    id: 3,
    value: PasswordStrength.STRONG,
    minDiversity: 4,
    minLength: 12,
  },
];

const owaspSymbols = '!"#$%&\'()*+,-./\\:;<=>?@[]^_`{|}~';

const getPasswordStrength = (
  password: string,
  options = defaultOptions,
  restrictSymbolsTo = owaspSymbols,
) => {
  options[0].minDiversity = 0;
  options[0].minLength = 0;

  // prevent [a-z] to match null and compute length
  const _password = password ?? '';

  const rules = [
    {
      key: 'lowercase',
      regex: '[a-z]',
    },
    {
      key: 'uppercase',
      regex: '[A-Z]',
    },
    {
      key: 'number',
      regex: '[0-9]',
    },
    {
      key: 'symbol',
      regex: restrictSymbolsTo
        ? `[${escapeStringRegexp(restrictSymbolsTo)}]`
        : '[^a-zA-Z0-9]',
    },
  ];

  let strength: {
    contains: string[];
    length: number;
    id?: number;
    value?: string;
  } = {
    contains: [],
    length: 0,
  };

  strength.contains = rules
    .filter(rule => new RegExp(`${rule.regex}`).test(_password))
    .map(rule => rule.key);

  strength.length = _password.length;

  let fulfilledOptions = options
    .filter(option => strength.contains.length >= option.minDiversity)
    .filter(option => strength.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id)
    .map(option => ({ id: option.id, value: option.value }));

  Object.assign(strength, fulfilledOptions[0]);

  return strength;
};

export default {
  getPasswordStrength,
  defaultOptions,
  owaspSymbols,
  PasswordStrength,
};
export { getPasswordStrength, defaultOptions, owaspSymbols, PasswordStrength };
