import { getDaysDiff } from './score.helpers';

describe('ScoreHelpers', () => {
  describe('diffInDays()', () => {
    it('should return 0 for same date', () => {
      expect(getDaysDiff(new Date('2024-10-10'), new Date('2024-10-10'))).toEqual(0);
    });

    it('should respect rounding time [Math.round()]', () => {
      expect(getDaysDiff(new Date('2024-10-10T12:00:00'), new Date('2024-10-10T23:59:59'))).toEqual(
        0,
      );

      expect(getDaysDiff(new Date('2024-10-10T01:00:00'), new Date('2024-10-10T23:59:59'))).toEqual(
        1,
      );
    });

    it('should throw error if "from" date is greater than "to" date', () => {
      try {
        getDaysDiff(new Date('2024-10-10T01:00:00'), new Date('2024-10-09T23:59:59'));
      } catch (error) {
        expect(error).toBeInstanceOf(RangeError);
        expect(error.message).toEqual("'from' must be greater than 'to' date");
      }
    });
  });
});
