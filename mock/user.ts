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
    name: 'Beard Extra',
    price: 100,
    duration: 1,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/download%20%283%29.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNPSS2TNWB5%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T180208Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCmV1LW5vcnRoLTEiSDBGAiEArNXbxSChGeQSxH5ALElnhAN5HAoZCq2NH%2FhpqFWw%2Fj8CIQDNBH%2Bb%2FIMAODrTFXV2k0yROett2o7p81kmDwaz7bdqDSqBAwhjEAAaDDk0MDQ4MjQxMzQwNyIMvyVpnt6ol8L64H8fKt4C7PhvtSt3iN9AvuRbsa25M7bRuWBMuvHmKZw4MiWKszGwp4pG%2FtEIjbMaUcIRq3441bFCtYukcGBZQpOsgI9nWeJvvJWjNw9B6iY18SBffzfcl4ntBvFMcQo0bMQBk%2FlyFDslKb0dIu5EsTbZ%2Bn611CiAnadrq3dwwwbaz1uE%2FqljlALaTf97KaJgYqOUpyriWtIoatjcDfBxuTYnyt%2Fz1ksPrXIv%2FKMxk1Tt83aUW0jVVSw7%2BX0clPaF6cs3CpFllCC%2F73awd679zRz9NzTRXaP7wEygWpS%2FLBj3xUDSlaUDneMEtooweX%2BpfX6951ySRPTgqbPbsLtcpfcYL3WqqcJH%2Fu%2FVmPcseInSDjXOurFgO1i3gKPRC7pBMA4GFbgnn5U1k9xjgSSlCW2w%2FCqT6H80OuOF2xh68sezcLulsJv5oUEqW777WwJ%2FDR9ofTQkvmqVoUDGQLFck7GVaB8wwcrIvQY6sgJvC1oEIVcpVwBg59d43fEt3Sns3Gz%2Bb7bVNTxlhzI2qNRr%2BLYeKGv8knaGWGcM%2B98WUUUc8Nhpgky9dihvhn60CeVCovmjPm7CljLzvYdt2It73uSzz%2FyXDAQLXPrJBj1OqMqcbLLDNtzycfjlNIkZmEg870nvdUg591qIwWJuN8XQk8kxOChMKumccyx2WFrWgME6Ch%2BvPhFmfrxbGResfUgmJkfdG8EHxiTGcj3nVtAi6Q%2FvD0H6SZOJjqvUojym4XQ0xoR%2BEhyM6AfkrK59kOZivKCpZnbLIgz6osi0YxvGg6%2B0cww2vredOdq7%2BMyizjEcoWv8iECB1NHH4WeK8%2BsdOJHLpu6soeOgQh47iBkTx4fPLcVCl9GfQlA4vsnfcteXsexHFVE3bOUQ8gxW6qY%3D&X-Amz-Signature=1a2756517ea5a204944a8a4659365127b5e1375cbf45f03b9d9eb8eddb76da89&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Beard razor',
    price: 200,
    duration: 2,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/download.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNPQGOZ2XZS%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T180421Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCmV1LW5vcnRoLTEiRzBFAiEAjakVyHscOpsNgD5%2B6FDyR90okoTCUj5lUDpFR3L%2F5VUCIEBODG3sQPwwKj01HHsdgF7i8RNfCO2WAGEZctWTFEU7KoEDCGMQABoMOTQwNDgyNDEzNDA3Igw14uEBlwI7nztXu0Qq3gKhLGfdY5Isufl5e4CJBsRAkUR4bqOFQGb6YYypSMSuhcX6ogbz9XeT4iwBNazNeMol0d%2BtbynACZPR%2BL64UP5x%2FAq020XZIkS72URTjMTT49EG%2Fm%2FvzNENLA1VrJDxldok7tPAEC80m2S0sTAw0Vr3k%2BLOWQtuWHb2B0znXtxq9kF8Yn57Q1t4Bxr9Lzle5NgQ8b2ORlAy4gqcF697WL2W9ePvDCdpuE8wwN9zqZaXCO3cxKtVpP0HdoLLhgSRXn7ArBImnrtuDEkRuZasEI75X0A7cdlDTy%2FZLU8LmMKwEBQbyQ%2B8Gevhd7qsFgOL4kcwi%2BXvzmIqIXQe127L07eeReSCfrKZVQs7QNFrm1aGpxhPIscISepWTA5OwVo%2FI6f%2BWqHSBhC8FM0FlwXlZMlXn9mtQpogm07tLza4J5yTeZITWxvd7J6liEuBW6umrqxBgrV5c9SbQ6XRhnHV7DDBysi9BjqzAjfkDAfY%2B62DPGli8iO6RXbdd%2FP0YAa077EYELUDxbcn%2F6j44K4BfIKBWjwhoZFZo5M5m8aKR950cLN%2FfRdK2FwDcw%2BRiYur%2FrOm4l203TtRQ1YkqKC3jqsFqgDLPl74RwL%2FiZJMmlQ3qGOKcLVO6ziQwH8BSKl5mXaoK%2F9q5NdFDOEQrWwFnS8dVuIm2%2BF8Z6RVtfYNsCsolR%2FOIxF8cEQ8VCLGQJcQEtLE8TivT7vJR%2BiVXcKmVtezMhkZZbosYiNbskuUSk%2B3mCKdO4B9OFHamFZeA8GEMZjuFiAAP%2Bf4HBIzNwFxAVAls88xyZH1PA5IXEdN5oWw%2BKebi%2FYRYj0MfjYBdgzl2c50gDDG3x3S4ns8KfUxV376nU75VWdDErV3M%2Bx87Xz43QXiB%2BZ2dhM5v7M%3D&X-Amz-Signature=5a931597baf0a2dec507bf384e4af7d00e53ff3b6d199225825c5706699a8830&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Beard Straightening',
    price: 300,
    duration: 3,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/images.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP72PWPFI4%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T180506Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDoaCmV1LW5vcnRoLTEiRjBEAiB38wrRkRLKElIaOb8lV5b%2BeNmdYI7vpXUW59qYp6SIdQIgZJuii8Ynjtk%2F14c62SI2QZBQLBbWE3BoPzej7EEiRAoqgQMIYxAAGgw5NDA0ODI0MTM0MDciDM18mbcbBhPmswbSDCreAoqtx%2Fu8LDEJ9v6lFd%2FFIFspsf1qieXhGplCNKCK15U%2BHLTauP%2FB8COw9JQ8o%2F19oVHWzgvJ%2FyDfwu%2B%2BlbEJ04c5bIfWk09DCSOOX9AR%2FuPYNCJyK9ZWf1fJBOKXpSQPv%2BqSEirAG24iWG0pX0obcF0TRNvo6uEOFadhHqwfmRIYdHv3cCx5luCPXl1w5IRmxDIlD%2B811nqrxbIj7GHe3v7B%2BAJyjH2HxwW5%2FUQqBrGUcHX%2FzaSDRNj%2BmhLlB6KXlThZBMJT2WF04y9l%2Foy0fnG7AumDzw%2FQyrYrNT%2FH9ELQPRtdcGTYNOM854tpdVT0xT2v01IoQ2ncZqfZ7MfF2JEqHyhx03zEBNZNhYVwKCLncMqkhuhuSkHXv8k%2FS5LJqizjAF9rY5%2BLY3mYuyeyT2MlMwIT6im9GEsmKyU0kChdNgFJ%2B7QZ6dwGUn%2FmmcAVHulfqi9KzGo1ugc%2BB2MRMMHKyL0GOrQCPliJa8%2BPadDN9%2FF2ZEFJUmj6M9zWcZ2jnujv8SYPmnCFHqWG9bDThaEJLo%2FGq9wYvITXlT3kf16cxZAhHtTISWOL0a8ovSbG9XX6lGWYIxHvNbgnNyof9f9FNBt34UTwj9TtM0TEGj4dx6i2WzEtl2LYNTEX14t%2BAn6%2BtbgHN4iB1CVc6pjQvF7OK68G6jcxLGPiJxANXtgATDmCLrg%2FMwDH5SGPUQSpupUNzfqcW5HG6swF19f7ZA%2B6arQPJfIfHA0G137JERtwTLsd8fGNBKTH43PbKykKMXLeZ1U7wF7trUuTxcumyncOTzpk3CvVO7LlbokIGYPumpDB0EfYcoDpcTPyn9bhORplZqu%2F7DF%2BQyT2ax1wJiYx8xAjm6H89tQikTig0CE6jrz2Z0dwLugzMho%3D&X-Amz-Signature=bf71858848574157041806d5f8525e7e06ed25d11ef9d907d8982ab37d243073&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
];
