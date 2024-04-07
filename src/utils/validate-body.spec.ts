import { test, describe } from 'node:test';
import assert from 'node:assert';
import { validateBody } from './validate-body';

describe('validateBody', () => {
  test('should return true for valid body', () => {
    const body = {
      userId: 'UXXX',
      userLocation: {
        longitude: 35.32,
        latitude: 32.32,
      },
    };
    const result = validateBody(body);
    assert.equal(result, true);
  });

  test('should return false for invalid body', () => {
    const body = {
      userId: 'UXXX',
      userLocation: {
        longitude: 35.32,
      },
    } as any;
    const result = validateBody(body);
    assert.equal(result, false);
  });

  test('should return false for empty body', () => {
    const result = validateBody();
    assert.equal(result, false);
  });

  test('should return false for empty userLocation', () => {
    const body = {
      userId: 'asd',
      userLocation: {},
    } as any;
    const result = validateBody(body);
    assert.equal(result, false);
  });

  test('should return false for empty userId', () => {
    const body = {
      userId: '',
      userLocation: {
        longitude: 35.32,
        latitude: 32.32,
      },
    };
    const result = validateBody(body);
    assert.equal(result, false);
  });

  test('should return false for empty userLocation.latitude', () => {
    const body = {
      userId: 'asd',
      userLocation: {
        longitude: 35.32,
        latitude: 0,
      },
    };
    const result = validateBody(body);
    assert.equal(result, false);
  });

  test('should return false for empty userLocation.longitude', () => {
    const body = {
      userId: 'asd',
      userLocation: {
        longitude: 0,
        latitude: 32.32,
      },
    };
    const result = validateBody(body);
    assert.equal(result, false);
  });

  test('should return false for undefined userLocation.latitude', () => {
    const body = {
      userId: '123',
      userLocation: {
        longitude: 35.32,
      },
    } as any;
    const result = validateBody(body);
    assert.equal(result, false);
  });

  test('should return false for undefined userLocation.longitude', () => {
    const body = {
      userId: '123',
      userLocation: {
        latitude: 32.32,
      },
    } as any;
    const result = validateBody(body);
    assert.equal(result, false);
  });

  test('should return false for undefined userLocation', () => {
    const body = {
      userId: '123',
    } as any;
    const result = validateBody(body);
    assert.equal(result, false);
  });

  test('should return false for undefined userId', () => {
    const body = {
      userLocation: {
        longitude: 35.32,
        latitude: 32.32,
      },
    } as any;
    const result = validateBody(body);
    assert.equal(result, false);
  });
});
