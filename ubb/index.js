import Scanner from "./scanner.js";
import Parser from "./parser.js";

// const text = 'text[b]b content[nest_tag]nest tag text[/nest_tag]text after nest tag[/b]';
// const scanner = new Scanner(text);
//
// let token;
// do {
//     token = scanner.nextToken();
//     console.log(token);
// } while(token !== null);

// const text = 'text[b]b content[/b]';
const text = 'text[b]b content[nest_tag]nest tag text[/nest_tag]text after nest tag[/b]';
const parser= new Parser();

try {
    parser.parse(text);
    console.log(JSON.stringify(parser.ast));
} catch (e) {
    console.log(e);
}