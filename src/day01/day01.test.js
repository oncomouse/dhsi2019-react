import {
    compose,
    countBy,
    identity,
    prop,
    sum,
    times,
} from 'ramda';
import { lotsOfSmiles, longestWord, reverseStrings } from './exercises';
import reverseStringsData from './fixtures/reverse-strings.json';
import longestWordData from './fixtures/longest-word.json';

const randomInt = (min, max) => Math.floor(min + (Math.random() * max));

describe('Day 1 Exercises', () => {
    describe('lotsOfSmiles()', () => {
        const countSmiles = compose(
            prop('😀'),
            countBy(identity),
        );
        test('should return "" when array sums to zero', () => {
            expect(lotsOfSmiles([0])).toBe('');
        });
        test('should return the number of 😀s when passed an array of #s', () => {
            // Run the test three times, with different data:
            times(() => {
                const randomTestData = times(() => randomInt(1, 10), randomInt(6, 18));
                expect(countSmiles(lotsOfSmiles(randomTestData))).toBe(sum(randomTestData));
            }, 3);
        });
    });
    describe('longestWord()', () => {
        test('should return the longest word when passed a sentence.', () => {
            expect(longestWord(longestWordData.differentLength)).toBe('flame');
        });
        test('should return the alphabetically first word when passed a sentence with similar word lengths', () => {
            expect(longestWord(longestWordData.sameLength)).toBe('abe');
        });
        test('should ignore punctuation', () => {
            expect(longestWord(longestWordData.punctuation)).toBe('fez');
        });
    });
    describe('reverseStrings()', () => {
        test('should return [] when passed []', () => {
            expect(reverseStrings([])).toEqual([]);
        });
        test('should reverse fixture data', () => {
            expect(reverseStrings(reverseStringsData.forwards))
                .toEqual(reverseStringsData.backwards);
            expect(reverseStrings(reverseStringsData.backwards))
                .toEqual(reverseStringsData.forwards);
        });
        test('should do nothing to an array of numbers', () => {
            expect(reverseStrings(reverseStringsData.numbers))
                .toEqual(reverseStringsData.numbers);
        });
        test('should reverse strings and ignore numbers in a mixed array of numbers and string', () => {
            expect(reverseStrings(reverseStringsData.mixedForwards))
                .toEqual(reverseStringsData.mixedBackwards);
            expect(reverseStrings(reverseStringsData.mixedBackwards))
                .toEqual(reverseStringsData.mixedForwards);
        });
    });
});
