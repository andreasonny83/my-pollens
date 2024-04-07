import { test, describe } from 'node:test';
import assert from 'node:assert';
import { generatePollenCode } from './generate-data-entries';
import { PollenType } from '../types';

describe('generatePollenCode', () => {
  test('should return pollen code with plant description type', () => {
    const pollenTypeCode = PollenType.GRASS;
    const plantDescriptionType = PollenType.TREE;
    const result = generatePollenCode(pollenTypeCode, plantDescriptionType);
    assert.equal(result, `P#${plantDescriptionType}_${pollenTypeCode}`);
  });

  test('should return pollen code without plant description type', () => {
    const pollenTypeCode = PollenType.GRASS;
    const result = generatePollenCode(pollenTypeCode);
    assert.equal(result, `P#${pollenTypeCode}`);
  });
});
