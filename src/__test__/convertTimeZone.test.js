// Import the function
import { convertTimeZone } from '@/function';

// Test suite
describe('convertTimeZone', () => {
    const dateInput = '2024-10-27T10:30:00Z'; // Example UTC date

    test('should convert date to the specified timezone', () => {
        const timezone = 'America/New_York';
        const result = convertTimeZone(dateInput, timezone);

        // Expected date format in 'America/New_York' timezone (adjust for DST as necessary)
        expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
    });

    test('should default to UTC if no timezone is provided', () => {
        const result = convertTimeZone(dateInput);
        const utcFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        const expectedDate = utcFormatter.format(new Date(dateInput));

        expect(result).toBe(expectedDate);
    });

    test('should format date correctly for a specific timezone', () => {
        const timezone = 'Asia/Tokyo';
        const result = convertTimeZone(dateInput, timezone);

        // Expected date format in 'Asia/Tokyo' timezone
        expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
    });
});
