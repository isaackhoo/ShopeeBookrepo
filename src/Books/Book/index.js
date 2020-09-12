import {
    ISBN_ID_LENGTHS_WO_CHECKDIGIT,
    ISBN13_PREFIX_LENGTH,
    ISBN13_PREFIXS,
    ISBN13_ID_LENGTH,
    ISBN10_ID_LENGTH,
    ISBN10_MATRIX,
    ISBN10_MOD,
    ISBN13_MATRIX,
    ISBN13_MOD,
    ISBN10_LENGTH,
    ISBN13_LENGTH,
    ISBN_CHECKDIGIT_LENGTH
} from "./Constants";

export class Book {
    #title = '';
    #isbn = '';
    #genre = [];
    #summary = '';

    constructor({ title, isbn, genre, summary }) {
        this.#title = title;
        this.#isbn = isbn;
        this.#genre = Array.isArray(genre) ? [...genre] : [genre];
        this.#summary = summary || 'No Summary Provided';
    };

    // getters
    get title() {
        return this.#title;
    };
    get isbn() {
        return this.#isbn;
    };
    get genre() {
        return this.#genre;
    };
    get summary() {
        return this.#summary;
    };

    // static private methods
    static #splitStringToNumberArr = (str) => {
        return str.split('').map(d => Number(d));
    };

    static #initializeIsbn = (isbn) => {
        return isbn.split('-').join('');
    };

    static #getMatrix = (isbn) => {
        return isbn.length === ISBN10_ID_LENGTH || isbn.length === ISBN10_LENGTH ? ISBN10_MATRIX : ISBN13_MATRIX;
    }

    static #getModuloBase = (isbn) => {
        return isbn.length === ISBN10_ID_LENGTH || isbn.length === ISBN10_LENGTH ? ISBN10_MOD : ISBN13_MOD;
    }

    static #getISBNModulo = (isbn) => {
        let matrix = this.#getMatrix(isbn);
        let modBase = this.#getModuloBase(isbn);

        return this.#splitStringToNumberArr(isbn).reduce((acc, cur, idx) => {
            return acc + (cur * matrix[idx]);
        }, 0) % modBase;
    }

    // static methods
    static getIsbnCheckDigit(identifier) {
        let checkDigit = -1;

        // removes any dashes if provided
        const _identifer = this.#initializeIsbn(identifier);

        // validate identifier length
        if (!ISBN_ID_LENGTHS_WO_CHECKDIGIT.includes(_identifer.length))
            return checkDigit;

        // check that the iniital 3 digits are valid for isbn 13 ids
        if (_identifer.length === ISBN13_ID_LENGTH) {
            let isbn13Prefix = _identifer.substring(0, ISBN13_PREFIX_LENGTH);
            if (!ISBN13_PREFIXS.includes(isbn13Prefix))
                return checkDigit;
        }

        // generate the check digit
        let mod = this.#getISBNModulo(_identifer);
        checkDigit = mod === 0 ? mod : this.#getModuloBase(_identifer) - mod;

        return checkDigit;
    };

    static isValidIsbn = (isbn) => {
        const _isbn = this.#initializeIsbn(isbn);
        let mod = this.#getISBNModulo(_isbn);
        return mod % this.#getModuloBase(_isbn) === 0 ? true : false;
    };

    static generateRandomIsbn = () => {
        let isbn = '';

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // generate prefix
        isbn += ISBN13_PREFIXS[getRandomInt(0, 1)];
        // generate the other numbers, except check digit
        for (let i = 0; i < (ISBN13_LENGTH - ISBN13_PREFIX_LENGTH - ISBN_CHECKDIGIT_LENGTH); ++i)
            isbn += getRandomInt(0, 9);

        // generate check digit
        isbn += this.getIsbnCheckDigit(isbn);

        // validate isbn
        if (this.isValidIsbn(isbn)) {
            function spliceSlice(str, index, count, add) {
                // We cannot pass negative indexes directly to the 2nd slicing operation.
                if (index < 0) {
                    index = str.length + index;
                    if (index < 0) {
                        index = 0;
                    }
                }
                return str.slice(0, index) + (add || "") + str.slice(index + count);
            }

            // add dash after prefix
            isbn = spliceSlice(isbn, ISBN13_PREFIX_LENGTH, 0, "-");
            // add dash before checkdigit
            isbn = spliceSlice(isbn, isbn.length - 1, 0, "-");
            // randomly insert 2 more dashes
            let firstDashIdx = getRandomInt(2, 5 + 2);
            let secondDashIdx = getRandomInt(2, Math.min(ISBN13_LENGTH - ISBN13_PREFIX_LENGTH - ISBN_CHECKDIGIT_LENGTH - firstDashIdx - 1 + 1, 7));
            isbn = spliceSlice(isbn, ISBN13_PREFIX_LENGTH + firstDashIdx, 0, "-");
            isbn = spliceSlice(isbn, isbn.length - 2 - secondDashIdx, 0, "-");
        }
        else
            isbn = undefined;

        return isbn;
    }

    // methods
    toObject = () => {
        return {
            title: this.title,
            isbn: this.isbn,
            genre: this.genre.reduce((acc, cur, idx) => {
                acc += cur;
                if (idx !== this.genre.length - 1)
                    acc += ', ';
                return acc;
            }, ''),
            summary: this.summary,
            key: this.isbn
        };
    };
}; // end class Book