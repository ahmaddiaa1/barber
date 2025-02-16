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
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.2',
    phone: '11234567892',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.3',
    phone: '11234567893',
    password: '1234',
    role: 'barber',
  },
];

const barbers2 = [
  {
    firstName: 'barber',
    lastName: 'no.1',
    phone: '21234567891',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.2',
    phone: '21234567892',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.3',
    phone: '21234567893',
    password: '1234',
    role: 'barber',
  },
];

const barbers3 = [
  {
    firstName: 'barber',
    lastName: 'no.1',
    phone: '31234567891',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.2',
    phone: '31234567892',
    password: '1234',
    role: 'barber',
  },
  {
    firstName: 'barber',
    lastName: 'no.3',
    phone: '31234567893',
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

const HairCutServices = [
  {
    name: 'Haircut',
    price: 100,
    duration: 1,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/download%20%281%29.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNP232LMZJE%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T190059Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCmV1LW5vcnRoLTEiRzBFAiEAwI0%2FJwouTEi76jN3w8hcSvW3BF8WRGdOVwvEBE4JbLACIBEC0JLdFzxSnby7RpXUqpH7K2t5aCsRP3sPUL0aDvGvKoEDCGQQABoMOTQwNDgyNDEzNDA3IgwQVeuteV63qAD7Gjoq3gLLnFy%2FQXzVANH0MusY%2F8cERRj9RrXvJgMGrt1rignseXmEt2lgQFEdSVto%2BZSKgMPIMmbOGNM2NmDkKFpTUEK2vGgR40pbdtaowCQm7z378BDYYpxE8l%2BiPB2%2BqGdBB11g2BmlenlgcbxDIWwrhgicCREkLKLLVEL6jRzGBlF4V0BXFxNxgGoYtH45cJwOq6t2a3CjHXGhVFutiP%2F0V3raM%2BsAZJ6K3k%2BgqVWVgihdeQMK41%2Fr%2F2NxOloWh%2Fvssgw83E5dqE40h%2BCVHGUD98lsffW%2BZN4%2FQPoY6Mp14foSYgY4tdqKfWLfd7fu3Cyq84RuSorClK9EvH3jjusVxbUFTmubs%2F6tea7jaBN3pnwr4cP57E%2BO5knrVCcKYYfuOsD01vs%2BV3msAf4%2BBo0Qo4wYgbpboGrrmkCFTkSC7mkz3aCnwfmqdCNoGqzM7%2FF0NT%2BUmXdl6vuueoWe24bKijDBysi9BjqzAlAiTbd6DQahZDUd%2BOrqfO6DcR1cbAWUJ545duVPn%2F%2Bi7FTxSlbzIT1Mh%2FMyqMyVY%2BMo25urns8sAEVSUwWZmenmfd1b6DgYDdPfPYiM0mUOBEN5uhw6FRBknIsNdQwt9%2BlLGq8IsrSsiMECVheyhyZEcqTQUfOjaqzi6DB4hA5qgl4Obtf%2BUKwp02zUev5crQVPVnyTtEkhKB55romVFmOoKql9LM6kYZkD0X1ALf0RPmH2eaRFws6JgZ8kHwaq%2Bnh9isqNJkJoJmaWRZ7aGS8viiDlPTJweAzrTqDMs6F3rlhPbOGUECt%2FZjUCjnFUQ%2FLUQimo2zJFkkqejsKW3oxQK2ahOuDMNgVe6MbOEaTTQW2yrQl0GEdyH23%2F2RP7SwLFfad4MZC0vba9c9FAZfzkV5I%3D&X-Amz-Signature=840d80237585ceacd9a1b4715e5501a41736a486cdda0a6922a20708ec1ab650&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Zero Cut',
    price: 200,
    duration: 2,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/download%20%282%29.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNPYXJ6YVYR%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T190053Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCmV1LW5vcnRoLTEiRjBEAiBQMxinjUq35DNxDqLNeyS3EwfEjKS9gUjEtYwp4P40hAIgP86Y7FU%2BBbWmc%2BPTJiJKqRTs4uSIWTY6gUGzaTfwmOgqgQMIZBAAGgw5NDA0ODI0MTM0MDciDD6jKwLx3TcDXdtjRyreAq1l8UP652wC8SsTlBENyIy6PA29cn3%2F97pvFhzLFBHXNQpMHaPubWih2zDQBQImzZAat5P%2Fqt%2Bewh4ot9maQRBY68dN%2FiSoP5%2FORBadDGVRcSl%2FuLKHCkKx0rxX84Smqg7u%2FXkcHASvNFy5udLSdzZXBONDOD1D6GUsTsMhlPR7w0BwbqeGcyRy2HHEwrUprY7croQjnjXbnUjTz1MSFHM7SG3QTkkAkd0TVKzvUvPymEgEMaMpNZAg7eb11611YT7Yc1om7aJinJH7wi8zr%2B8jRnmYu2dMGV3fXHVEEavC3KKorudZMem%2BqWW3LSyBXrzltN8IkpRVg3R1GMP%2F%2BnZGywaaunQYT7DdQ3Sd1yW98xLLLOpTmP7QtOl0boUpsy1qbsfZzV76jzE82%2BY7M4vZF3c%2FgjlMo2L%2BWO19%2FlLSoL3c0rtq99D6szC1yz5p32uRHsB3ABBpNI0saoRTMMHKyL0GOrQCvCXWrokZM1EuI%2B6ct8bHoW2aX7oRUbOtBrjgNTC3twD9PncOpFc9J5y36XJYSXwD%2BToZTt%2FA%2BBuLiprOIxPeOI5IrtrrLlPMMQHKsBic%2B8e4OdRo8Xe4RAA0xbF6DGhtTRIj3QRYvVlTLnatpcDV8cAPOErEs0QQEKGfqkWdW6RI7TQmB7MLrzm3gvTfbUZw2FPRtx3Fk%2BTEohu1mX039zOIs10gjXcAqgxlq1PZVthaplTgq9YxKuBHLSfBLSPNfI4takQlDsDqP1pyqlZbSAB8lrc8Wf2KSfm81RIztoDMLsat%2FBqHyqCr6Avx9JgN7sZcbQV4MX0U7EvFjmDBM9quE5q8f%2FGgFPQBEYYYiSVmcFW5Hv0%2FVeb7GmkJPtG7V4JqdwWkvCxagCCSsCXDCHkfYF4%3D&X-Amz-Signature=e659494021d51f62681cdd6cd3b41a4f82ea9c280682b2bcbc801118a9c31f39&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  },
  {
    name: 'Long Hair',
    price: 300,
    duration: 3,
    serviceImg:
      'https://barber-bucket-image.s3.eu-north-1.amazonaws.com/services/download.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA5V6I6YNPXOYU22GJ%2F20250216%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250216T190047Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCmV1LW5vcnRoLTEiRjBEAiBp2%2FIYgLjjeCwY3gLNdaAuYRv6mXraGgyjRw2soGlWkgIgZGAZqrLP40p8PXRu%2FBnej2%2F35%2FJf9SbKKCxyrZaYO8UqgQMIZBAAGgw5NDA0ODI0MTM0MDciDJCkExW9jSRwLqq1gCreAhSbQL2QD3%2FXpoYsxR7soAE%2F39HxE75PrkRg8ixYJfYfjiXg5hNualBF4qLgxbmp%2BUuEtfaZFjNmike8lkLGRU86aILml4j2kvG7M%2BaLOm9xTcIzkbYDQrfp7dHF9PPmYW5CuQ9cQNKBgQvEdHcEFTaQXubnSb4uRcmKqd%2FfGTvTnla1voM2M2CnHom4I27LR9xL4Vp8lSq0aqt%2F50WUKsFFXxb0%2Bo%2FAPqhz6ywyd20IZbdn8TuH2hBFDzYQPbsvX0zf37bjhWFLNIJbu2ux50pFYHz7vBnC4I4vNjo968NJTjgAKKchLTZaW4dzBGoh0x5XUWkLY2wUDjC5f4OKvipflxqFc33aVrRK%2FTwZPa4c4xx4htemwLq8yxLFjhfREn7e3czjZeKp929sXL7hbz9Q6x3FV1HlnXKMa6pW3pUGUf12z0HWzbh3pVqrTVzdRjkpBycB9zVq%2FkvHIZ8rMMHKyL0GOrQCbDmUe7v2hVDHCj%2FWTBP46EA5EQpE2Y71LxcGqKfwbiB%2BsQ1y7R6n2QA8eSfuE9OS79Exs1YWexai816NMHzuzVJwv1gTgRHyp9GBocPZhNCBpBihVjS%2BbuCsZzjWMPASGyq1PhK3dPsSeyzu7NIERoZ6f0zek8%2BBCSc3SuRH2c%2BMoyWl1P67qzCJuBsx0KWXZ%2B6P5nTcaF099hrt5Jm1K5kLZ7%2FOxLTd7xkjNh2bkZ8quypbwooFkuslz%2BKPfV9ODrVU%2BG%2FLou%2FeYDwC4ooKCH98TnR7GmCTUVFPGG5s0Ee5XiP5mbLO9sHYHk6x2qWR9n%2FfPjG2ZKsPvzjIgRQM24xy6qKEdhhgnb%2BnoCdk2Va0UDjeAw8zrHwA6dABtuYFPXDcAAL4Q0IGilPeEex0SK4BHMU%3D&X-Amz-Signature=6e47993b62f3f90470c43a41a6e6bc50a543cca222096c35b8eb33627637c4a9&X-Amz-SignedHeaders=host&response-content-disposition=inline',
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
