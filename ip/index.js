import Parser from './parser.js';

const parser = new Parser();

try {
  parser.parse(' 192.1a68 . 0 . 1');
} catch (e) {
  console.log(e);
}

try {
  parser.parse(' 192. 256 . 0 . 1');
} catch (e) {
  console.log(e);
}

parser.parse(' 192 . 168 . 0 . 1 ');
console.log(parser.toNumber());
console.log(parser.toString());
