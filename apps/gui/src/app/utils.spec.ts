import { FormControl } from '@angular/forms';
import { jsonValidator } from './utils';

describe('Utils', () => {
  describe('jsonValidator', () => {
    it('should return null for valid JSON', () => {
      const control = new FormControl('{"key": "value"}');
      expect(jsonValidator(control)).toBeNull();
    });

    it('should return an error object for invalid JSON', () => {
      const control = new FormControl('invalid json');
      expect(jsonValidator(control)).toEqual({ invalidJson: true });
    });
  });
});
