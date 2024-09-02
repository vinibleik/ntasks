import Database from "better-sqlite3";
const db = new Database(":memory:");
db.pragma("journal_mode = WAL");

type Quote = {
    id: number;
    quote: string;
    author: string;
    created_at: string;
};

function isQuote(row: unknown): row is Quote {
    return (
        typeof row === "object" &&
        row !== null &&
        typeof (row as Quote).id === "number" &&
        typeof (row as Quote).quote === "string" &&
        typeof (row as Quote).author === "string" &&
        typeof (row as Quote).created_at === "string"
    );
}

let stmt = db.prepare(`CREATE TABLE quote (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quote TEXT NOT NULL UNIQUE,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
)`);
console.log(stmt.run());

stmt = db.prepare(`INSERT INTO quote (quote, author) VALUES 
('There are only two kinds of languages: the ones people complain about and the ones nobody uses.', 'Bjarne Stroustrup'), 
('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 'Martin Fowler'), 
('First, solve the problem. Then, write the code.', 'John Johnson'), 
('Java is to JavaScript what car is to Carpet.', 'Chris Heilmann'), 
('Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'John Woods'), 
('I''m not a great programmer; I''m just a good programmer with great habits.', 'Kent Beck'), 
('Truth can only be found in one place: the code.', 'Robert C. Martin'), 
('If you have to spend effort looking at a fragment of code and figuring out what it''s doing, then you should extract it into a function and name the function after the "what".', 'Martin Fowler'), 
('The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.', 'Donald Knuth'), 
('SQL, Lisp, and Haskell are the only programming languages that I’ve seen where one spends more time thinking than typing.', 'Philip Greenspun'), 
('Deleted code is debugged code.', 'Jeff Sickel'), 
('There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies.', 'C.A.R. Hoare'), 
('Simplicity is prerequisite for reliability.', 'Edsger W. Dijkstra'), 
('There are only two hard things in Computer Science: cache invalidation and naming things.', 'Phil Karlton'), 
('Measuring programming progress by lines of code is like measuring aircraft building progress by weight.', 'Bill Gates'), 
('Controlling complexity is the essence of computer programming.', 'Brian Kernighan'),
('The only way to learn a new programming language is by writing programs in it.', 'Dennis Ritchie');
`);
console.log(stmt.run());

stmt = db.prepare("SELECT * FROM quote");

try {
    for (const row of stmt.all()) {
        if (isQuote(row)) {
            console.log(row);
        }
    }
    console.log(stmt.get());
    console.log(stmt.get());
} catch (e) {
    console.log(e);
}

process.on("exit", () => db.close());
