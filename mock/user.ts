const clients = [
  {
    firstName: 'client',
    lastName: 'no.1',
    phone: '1234567891',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'client',
    lastName: 'no.2',
    phone: '1234567892',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'client',
    lastName: 'no.3',
    phone: '1234567893',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'client',
    lastName: 'no.4',
    phone: '1234567894',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'client',
    lastName: 'no.5',
    phone: '1234567895',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'client',
    lastName: 'no.6',
    phone: '1234567896',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'client',
    lastName: 'no.7',
    phone: '1234567897',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'client',
    lastName: 'no.8',
    phone: '1234567898',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'client',
    lastName: 'no.9',
    phone: '1234567899',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'client',
    lastName: 'no.10',
    phone: '1234567890',
    password: '1234',
    role: 'user',
  },
  {
    firstName: 'Abdaelrahman',
    lastName: 'Abdelfattah',
    phone: '01000262238',
    password: '1234',
    role: 'user',
  },
];

const barbers1 = [
  {
    firstName: 'barber',
    lastName: 'no.1',
    phone: '11234567891',
    avatar:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/zxDeWp-1739649119709-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201604Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=808eb909077f5d3bbc9367bb44000e8e420ef2c27296b25b3af1ccc829745526&X-Amz-SignedHeaders=host&response-content-disposition=inline',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.2',
    phone: '11234567892',
    avatar:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/zxDeWp-1739649119709-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201604Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=808eb909077f5d3bbc9367bb44000e8e420ef2c27296b25b3af1ccc829745526&X-Amz-SignedHeaders=host&response-content-disposition=inline',

    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.3',
    phone: '11234567893',
    avatar:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/zxDeWp-1739649119709-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201604Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=808eb909077f5d3bbc9367bb44000e8e420ef2c27296b25b3af1ccc829745526&X-Amz-SignedHeaders=host&response-content-disposition=inline',

    password: '1234',
    role: 'barber',
  },
];

const barbers2 = [
  {
    firstName: 'barber',
    lastName: 'no.1',
    phone: '21234567891',
    avatar:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/zxDeWp-1739649119709-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201604Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=808eb909077f5d3bbc9367bb44000e8e420ef2c27296b25b3af1ccc829745526&X-Amz-SignedHeaders=host&response-content-disposition=inline',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.2',
    phone: '21234567892',
    avatar:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/zxDeWp-1739649119709-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201604Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=808eb909077f5d3bbc9367bb44000e8e420ef2c27296b25b3af1ccc829745526&X-Amz-SignedHeaders=host&response-content-disposition=inline',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.3',
    phone: '21234567893',
    avatar:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/zxDeWp-1739649119709-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201604Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=808eb909077f5d3bbc9367bb44000e8e420ef2c27296b25b3af1ccc829745526&X-Amz-SignedHeaders=host&response-content-disposition=inline',
    password: '1234',
    role: 'barber',
  },
];

const barbers3 = [
  {
    firstName: 'barber',
    lastName: 'no.1',
    phone: '31234567891',
    avatar:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/zxDeWp-1739649119709-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201604Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=808eb909077f5d3bbc9367bb44000e8e420ef2c27296b25b3af1ccc829745526&X-Amz-SignedHeaders=host&response-content-disposition=inline',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.2',
    phone: '31234567892',
    avatar:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/zxDeWp-1739649119709-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201604Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=808eb909077f5d3bbc9367bb44000e8e420ef2c27296b25b3af1ccc829745526&X-Amz-SignedHeaders=host&response-content-disposition=inline',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.3',
    phone: '31234567893',
    avatar:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/avatars/zxDeWp-1739649119709-freepik__the-style-is-candid-image-photography-with-natural__47103.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201604Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=808eb909077f5d3bbc9367bb44000e8e420ef2c27296b25b3af1ccc829745526&X-Amz-SignedHeaders=host&response-content-disposition=inline',
    password: '1234',
    role: 'barber',
  },
];

const branches = [
  {
    name: 'Al Rehab',
    location: 'Al Rehab',
    phone: '123456789',
    branchImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNPQWRDEZ4G%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T175323Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCmV1LW5vcnRoLTEiRzBFAiB4Ig5blZ%2FTH1QWYypI8oHpzIgnRQJGd5TLtFqowbXKHwIhAIcQDsXFxHoGsuT%2FJMFM5sQzo1I3e2O%2Ff97h0xX%2FKieeKoEDCGMQABoMOTQwNDgyNDEzNDA3Igy4YSbAAyfivIquFm4q3gJm9hAPzXWlx0L8ABoKBEDlEkMyyBMWCDWIzs9Ti0w5taEYHeIFaM82mxHB7zDvKHszpu8RDr1Rv2CIyYR3QRYbK4lUff7Ur04BQ3QSXsC6CBNICPSwTh3OHGG9UMKi6CNk3dcFSkuYVVTW6mUs2Yc2exf5YM0LIpQgngkQoRZ9lTUohB7FXX1ph0phdI3UcXSKHTBwwIWSVJ%2FSdqUtgmVwXpzR2ZxXlomqwzbV4zcVetGVLmqvFLdk1LGMaG3CI%2FlU3txJyR1YV2pgktLQSxU5kWLltJJAUevwsaVvJXvjdDvKir31VY3c4fVw41Zv8vyiiQCNEOgd5pgNEWEenewKKsroHmIo63xrggB4tSVHqBYZnwL5YDvStFYLiiEQtLyTix323eH%2F3M2jLrPSc%2B5RVOSf1SFA8dWaAUfG%2BbtnjgCypV64clJ34RY5JRmsC9FocnqtAPffT%2F7MHGFdWTDBysi9BjqzAoqbciTKaZOXJFvCwFjsLVp8u4FyhOuYQEoQyOaYlKo%2BfI%2FE0ODjhANCA4Dd%2FPwbu6H61RZj3WGjV9Ka26k88%2BYsqhQ8IVQSrENy95MUkuXMSiZr0KLCsxx9sHyo0Tzv27hdfx8b0cMtQTi1yOnGOzAOqmrMVQftrYP4p57dJxbHEcNR5JZGPg29VjDKSlgxqeH3dFCMolHrlesLLmcdjn%2BB3w%2BScyo7%2BIsuryBHrgvV2QJ%2BAQR336LFKEEPFddXarBt3Q5BS6JKC2VIPGYSIZdc4znm0WqnJJE%2FYqgnYeFT7BMXmXzAxhyHFyK0NIWZR0nd11i0hMie79B%2F1Ch%2BndxUKhyFxToezTbYb0zMjfY9qgUh9eLxpac6FD3BzBGQ4JCW7d1%2F%2Bm0XRVs9FjWidVn%2FO0w%3D&X-Amz-Signature=b8c6dfd74da32a952407a48094c2b228d4946f13bb8bc50cbb987a98c1c2e23b&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Madinaty',
    location: 'Madinaty',
    phone: '123456789',
    branchImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNPQWRDEZ4G%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T175851Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCmV1LW5vcnRoLTEiRzBFAiB4Ig5blZ%2FTH1QWYypI8oHpzIgnRQJGd5TLtFqowbXKHwIhAIcQDsXFxHoGsuT%2FJMFM5sQzo1I3e2O%2Ff97h0xX%2FKieeKoEDCGMQABoMOTQwNDgyNDEzNDA3Igy4YSbAAyfivIquFm4q3gJm9hAPzXWlx0L8ABoKBEDlEkMyyBMWCDWIzs9Ti0w5taEYHeIFaM82mxHB7zDvKHszpu8RDr1Rv2CIyYR3QRYbK4lUff7Ur04BQ3QSXsC6CBNICPSwTh3OHGG9UMKi6CNk3dcFSkuYVVTW6mUs2Yc2exf5YM0LIpQgngkQoRZ9lTUohB7FXX1ph0phdI3UcXSKHTBwwIWSVJ%2FSdqUtgmVwXpzR2ZxXlomqwzbV4zcVetGVLmqvFLdk1LGMaG3CI%2FlU3txJyR1YV2pgktLQSxU5kWLltJJAUevwsaVvJXvjdDvKir31VY3c4fVw41Zv8vyiiQCNEOgd5pgNEWEenewKKsroHmIo63xrggB4tSVHqBYZnwL5YDvStFYLiiEQtLyTix323eH%2F3M2jLrPSc%2B5RVOSf1SFA8dWaAUfG%2BbtnjgCypV64clJ34RY5JRmsC9FocnqtAPffT%2F7MHGFdWTDBysi9BjqzAoqbciTKaZOXJFvCwFjsLVp8u4FyhOuYQEoQyOaYlKo%2BfI%2FE0ODjhANCA4Dd%2FPwbu6H61RZj3WGjV9Ka26k88%2BYsqhQ8IVQSrENy95MUkuXMSiZr0KLCsxx9sHyo0Tzv27hdfx8b0cMtQTi1yOnGOzAOqmrMVQftrYP4p57dJxbHEcNR5JZGPg29VjDKSlgxqeH3dFCMolHrlesLLmcdjn%2BB3w%2BScyo7%2BIsuryBHrgvV2QJ%2BAQR336LFKEEPFddXarBt3Q5BS6JKC2VIPGYSIZdc4znm0WqnJJE%2FYqgnYeFT7BMXmXzAxhyHFyK0NIWZR0nd11i0hMie79B%2F1Ch%2BndxUKhyFxToezTbYb0zMjfY9qgUh9eLxpac6FD3BzBGQ4JCW7d1%2F%2Bm0XRVs9FjWidVn%2FO0w%3D&X-Amz-Signature=bd37f24e98a0b4f1b59ace9a3efd68ed8cec347517628775a411dba0231396bb&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Future City',
    location: 'Future City',
    phone: '123456789',
    branchImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/branches/branch-3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNPQWRDEZ4G%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T175957Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCmV1LW5vcnRoLTEiRzBFAiB4Ig5blZ%2FTH1QWYypI8oHpzIgnRQJGd5TLtFqowbXKHwIhAIcQDsXFxHoGsuT%2FJMFM5sQzo1I3e2O%2Ff97h0xX%2FKieeKoEDCGMQABoMOTQwNDgyNDEzNDA3Igy4YSbAAyfivIquFm4q3gJm9hAPzXWlx0L8ABoKBEDlEkMyyBMWCDWIzs9Ti0w5taEYHeIFaM82mxHB7zDvKHszpu8RDr1Rv2CIyYR3QRYbK4lUff7Ur04BQ3QSXsC6CBNICPSwTh3OHGG9UMKi6CNk3dcFSkuYVVTW6mUs2Yc2exf5YM0LIpQgngkQoRZ9lTUohB7FXX1ph0phdI3UcXSKHTBwwIWSVJ%2FSdqUtgmVwXpzR2ZxXlomqwzbV4zcVetGVLmqvFLdk1LGMaG3CI%2FlU3txJyR1YV2pgktLQSxU5kWLltJJAUevwsaVvJXvjdDvKir31VY3c4fVw41Zv8vyiiQCNEOgd5pgNEWEenewKKsroHmIo63xrggB4tSVHqBYZnwL5YDvStFYLiiEQtLyTix323eH%2F3M2jLrPSc%2B5RVOSf1SFA8dWaAUfG%2BbtnjgCypV64clJ34RY5JRmsC9FocnqtAPffT%2F7MHGFdWTDBysi9BjqzAoqbciTKaZOXJFvCwFjsLVp8u4FyhOuYQEoQyOaYlKo%2BfI%2FE0ODjhANCA4Dd%2FPwbu6H61RZj3WGjV9Ka26k88%2BYsqhQ8IVQSrENy95MUkuXMSiZr0KLCsxx9sHyo0Tzv27hdfx8b0cMtQTi1yOnGOzAOqmrMVQftrYP4p57dJxbHEcNR5JZGPg29VjDKSlgxqeH3dFCMolHrlesLLmcdjn%2BB3w%2BScyo7%2BIsuryBHrgvV2QJ%2BAQR336LFKEEPFddXarBt3Q5BS6JKC2VIPGYSIZdc4znm0WqnJJE%2FYqgnYeFT7BMXmXzAxhyHFyK0NIWZR0nd11i0hMie79B%2F1Ch%2BndxUKhyFxToezTbYb0zMjfY9qgUh9eLxpac6FD3BzBGQ4JCW7d1%2F%2Bm0XRVs9FjWidVn%2FO0w%3D&X-Amz-Signature=2af22b4af990e4befed39e4122733d849b7ba341a9e371acd2d2f79faaf91b63&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
];

const categories = [
  { name: 'HairCare' },
  { name: 'Beard' },
  { name: 'HairCut' },
];

const BeardServices = [
  {
    name: 'Beard Extra',
    price: 100,
    duration: 1,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Beard-Extra.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201024Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=cf98a55d2ef7f0c58c7481bec4abf90e763d71782c9b903a5d8c32b5ac859e78&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Beard razor',
    price: 200,
    duration: 2,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Beard-Razor.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201210Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=d97a6bb2fd0c0a061196a5d1eb956f2152d9c370a838c29382a96a72319fb8e0&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Beard Straightening',
    price: 300,
    duration: 3,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Beard-Straighteing.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201237Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=43f1d4126aa3d79c96ca22413ca7144f356d4fb843c3fd3d1075a086373a833e&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
];

const HairCutServices = [
  {
    name: 'Haircut',
    price: 100,
    duration: 1,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Hair-Cut.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201254Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=ea87468f3c5167340569a7bc518ce8fbe6754333f1971f87f47bdeb39e6f7abf&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Zero Cut',
    price: 200,
    duration: 2,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Zero-Cut.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201348Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=4b7a0e8d1ed37c4abcdeb017892864e4f4d7a838cae9620e487d8aede01f0fb4&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Long Hair',
    price: 300,
    duration: 3,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Long-Hair.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP7SGCMSAM%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201412Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiBG5BnVRkqvKCJWvoHYRZEtrRDjFDkXAV6%2FSY8m41akGwIgXBUJCLIvLUR0fBy9zVbLOaBsJ51JoxgAshCUdWo1iSIq7AIIZRAAGgw5NDA0ODI0MTM0MDciDHD1%2BXGMHkUVZBn2HyrJAouJ1ktYfMwM4z9BMYs0OFXg2NZKj7ZhWlp%2B288mZ3LED3%2FddNfoaFtRA3u9HhVM23mysdFEbPCr6t7wXj3S64vqnpZRezYJnV%2FdBA5sqAWir1b2A4WLcaHIlPJZAvmWfinc7zZs7eymqEp%2B3K9T2di771MABbTx57N6iD8XaK4X6mmU5tA9G5lpu9ihUnhRe8dMyB3mYQ1cxVK3bHUlc0ejySnbWSXyEI8Nz50t9qYLQr0fdaLN%2BiATzlrJFl%2BVbt4unCDXgAV1Z1W4FlSTN6SSB%2FrdBExzFJwaw5ZOwsEey7QD43nY58IL2C9%2F6V37NkgwxfZW19j%2FnhrxZuz2HucG4ykHeRyFMIW4%2FFBS6VEMOf03DoPfhKaQ5ifZOhR3OUw3T5ESpQ6SPoekQRez9%2BOwqhaogwjpK81zptVNT4Ng0SAYamt18kUNMJ7JyL0GOrQCeScRV5xY1U4HRbhibasflUkO5mhrPt52N97HuZfhz6%2BZkRpEwPKvwY79c7%2BSacXQsPMzHKVnYm3WIyW3CdSEIv0hZucYe4PHmn4y7svKX6J7g67sbiitDdYwnNb7ipbR3xQ3V9XElzvQdFHvF0HlmPRlQvFrKuWTAFeUpAIiVvD1RYXOQf9LfUU3KnZS4Qiyv1ZHHeJUP9lF8e3ReCIAurOIlV8vMEdmp7viof9WdD3v8D37g29wPJ5QGMev6LbXUGUO4j0UyVK8sfp0qxGOZTvis7sITZlLTucd%2B44nOuVzbmHMOntV0sSlqgp1LaWEasQTro97C7u3LZvZ3BxM1M7DRaQcL1FTIJVZljETKK7FGY%2BBNKkfDE4NNeWU44g4RwaWKpDW4%2FAhQ88hjyp2N%2FFW%2FDo%3D&X-Amz-Signature=005a390a4c6df65f114931ad88c74bbe71d08d37767ff48eb061e8c03d2f17cc&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
];

const HairCareServices = [
  {
    name: 'Hair Dye',
    price: 100,
    duration: 1,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Hair-Dye.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNPZIFVBHTO%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201047Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiA36ly%2F%2B9wDEvVx%2B7pGi1ocbmMSqkChynXertY7u3YNfgIgOYW%2FnbeTwk9frNqxCnwI2YzTok2frKjxYyXtcbPvj7oqgQMIZRAAGgw5NDA0ODI0MTM0MDciDC3boWN3zBlm0aIroyreAkvInEyESgKOVkzjM3Aw1%2Fbxf7qBKmy0ShL0B%2B7iu5v28nQ36cayFIjOvLAXmEv8odQPxso6ipJUj2lOp5vVXHsrHVrGpTcUUW6ftwL%2BPouwaZWVIsiIxN%2FNsyUDJGhAGmSs4lG2SeISZsh656vCyVbxWa78v60gXKQ1jsLcuyCVqZQ5jYvX0dx0V%2BmEKsshenwqz%2B%2BDxdKlvgSzQNfaP8ndyWbRJNZAYrH7P%2F%2FfZruFRj%2Bn8lAerJ7sLxuYC57qnh3OKQGOwr96zEnVuOIOEWh%2F0VeLXleIcQ01WSgJL2LcqeXSdXZcSyFLVQKCxjsrGCLxCDnWNvpQjmCiMqAObnY0XE5MKOWW9FUQCciEpK7mq8r9LvRuWUzWhCkRuu8CibtnUvSEZkHxDYImwgnYJdHlr%2FAMjPb7oW7kwCj8uezjF40ouuOiiEvAZpCLClNj4hnrp447K%2BgskrTYEw78MMHKyL0GOrQC9sE%2FPCSx%2FoOrjiSUjkEI2s49ppOX5t%2Fvgj82ggU0fDPg9uclc5l4wjK16QKuUOLDQFf%2B4EoKbog2Hit9b4YFZO8X4mhopO42mis0fgYX9YJu44pMbVLzDtKtiJZPcFVB0JywO2xsGvsYRke69H3P0nPqgORZD09llRGnO6R8jfnx23WVrrolMWMNt8puhV10xDHRsCAQvkx1yX0Q4bN%2BPzetrhXA0pPd4sowJYjCl6DrEu3QfRE9TMTm%2FwIqZ4CFQXni6SOYrOTSasoSJLSBNJ7Q91vgz1Ad3%2FA6EG%2BKGRGzk2y3izv1IMwumcGwbz1qXXk8UQFKdA%2FRoO7bKkeMoganu84GdFZdLDJNAYCU%2BI0cKY0HU8yW3lKCPYa36tf1NGjpn2xPi1780thQiopjTYZ1uRE%3D&X-Amz-Signature=5c3391bfc45dae9dacbe2254334d62d6c70959c078dfab2a5eff06f45187fac6&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Hair Relaxer',
    price: 200,
    duration: 2,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Hair-Relaxer.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNPV5OR6KLC%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201242Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRjBEAiA5H2XzRHhRHfVy0RNGosVeSusef%2F8GP9JAKZDDxzPmkgIgR%2FmYpvOxMik5CNl8C%2BzpxkDJSMa5JKjSN4hnZa6x3v0qgQMIZRAAGgw5NDA0ODI0MTM0MDciDC9btP7NHeXY3M4R8ireAgkLqinfbDq3ctFkkRH6nxgabrhh0kbOfBYeHyl7svpkgALNP%2B99Puq83YWadr4bGl8ev9SUTdsvmPeDLAdgV7qIxv0wLOj3JxtHhIvJplNyohTmqpdCVaH16CTfUIBHfvKqNLvUO37GZ5b5QJTlhm433OmqAUJC2dsFC7xFPOf1vSozr4Bg3KFiLbSURLj4Te0ncpcsGtmWaanfRW4BxRMntbvxuXkkTv4h27ugSUVHUI3gDxmgAcp%2Bofp%2FIXWMdNWMvxOeoyQr%2F1kqJk%2BkpKrF9rMuJyg9%2FzskOLpcZv%2BU%2F8ulxbZw1sH4sbBKFy6d3frXUCH53WvBXoPKK4vDadCU7SkB%2Fl32LYc75DGo539plDbtuwHS9bdeXh44Wf%2FC3onArmEnR5yqjnNiI6BWw1X4bKqOXbNhq3qGLpZwDefgBekoXbz4aLU0GOIMxkZL%2BWRP6RPA1ua5rihQj4IfMMHKyL0GOrQCDmjd80BNDd5GBr47EiPXUxoRtW7jiDqL7GveviYtp9r2ID%2BHoGLs9TzzZtt9ZPi4Cvwl3MP4rQBNJgiyrKn7DT4bjt2o%2BWj1S6iFSsUNn0Hi%2FuPFX33ys7%2BbSET%2Bb9XhPGFTExBaSG1wRMdVibV5nkVjT9TLzD3H345YUUho%2FS%2FSzPBMnLyn7OeFfP%2ByuQNjFPTp69HqYyE9IOKUlxPge7B6AEJhkJyt7jfSl6Vscig2bSSb5Y%2BGtutByIKluJCEKdIv%2BEi0%2B%2BPFokf0vio6n%2FuTJH8mNtk5GbW578D%2FC1OGACnpliM9TrGmm4uvH5E4NQMuZuv3c1H3gU5IeiOh%2FiNrIhe69HJh%2F1pW8KelaeEcsjKRclztE7kNv%2FJchECqDwCi9Vqs76ub6QuBct3QWKuhz20%3D&X-Amz-Signature=792de3dbbe8d3a31cc24eead95d8a0591e23325eef620caafba822e96e9fba81&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Hair Protein',
    price: 300,
    duration: 3,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/Protein.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP6EBYXA66%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T201309Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDwaCmV1LW5vcnRoLTEiRzBFAiAnvBMicl9Yt0HNj6fMTAucAWcn9hM11OI7A8JbBzVnPgIhALhzet0U72Kw3rq%2BlggFozbgTryhudMRRTC73yF9y1vUKoEDCGUQABoMOTQwNDgyNDEzNDA3IgxGm5XH8d5QWjABPywq3gKbkpjG68R1Ac3ouG4oIUaO8h%2BS2%2BVi7x5FYOL4MNmsNIFS9ADHxznScIr6Ir6dkdgDSxeFG0FRFo5eh7LDuR%2FLY8ufYs2Vyl%2Fy%2F6bg5N8EnMntMKN6FD7UkbI3Pzh1eX2azqgO2FfJ7KTVHbnOyDUxr2BgItGs2iqUTiQBmYItYOA7LXq99v6LYcxCeaLrTIEP3TVusNXANj0RW31p8Z00CcjP1OftWUe7B26PyHry63FqnDS7QpqNSXoMfmFpjfgTFpt4dAlw1a6YBKDQw3B5ymJutZ7msQRGid90TGU5w4EWmT0joyJTdVSMaL7RRRK4oOJwQLVTBGn2nLE%2FRy88%2Fw5c95dMVb9N3I8KsuDYf8EJe0%2BPJXGcybSO%2BCk7ZDrhTREf%2BZU9PYLmm7GHfwhraptmPObH9uw3a2Vfdl2FYZ8dN27WyRghOr%2BdfGU9bArGyfjspr1Tc%2B5Ty%2FhMGjDBysi9BjqzAhrdtEZ53CPBFxA9m%2B6BBIg0baGd%2FEfNB9ZxCknos2WDeWdr1LfJKXuWEPjCVR1DfDmYQ24U3mhZkTrjyFw5DqoHhtpDtPnuuZUkYQKAjBEq77kgigm%2FJSyjPd1eS6mRkJDqj2pE1h8%2BwVS1zNxhLvjTH4WjvwJ7r19eM58NcFikOezWoqNATFYR5%2Fk9hnG4qatzmr1IC%2BUYofWkFHd%2FSPkIN7%2FzxmKOxTcHklE%2BxsNPhYLmjplB4Ynhhlhpic8owwFlJQd0N7tTcd8Bg01nn7er7bVuTAG8ypVmWhaBJA%2BpxSRjwq1z%2BW0cxK5DfTSsWL5WFmSAuFIEzHfpQ4EbRcWOZJyzVThGaEmGP0zluazr9JcpEQHk4Spam220bwqS3eDSQah2fwwBFDzHP38rz3g96To%3D&X-Amz-Signature=7dbed0d479d1926f7c7c46216da469b2aa2da4819f5a668d73321affae428135&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
];
