import * as crypto from 'crypto';

/**
 * Generate a secure numeric OTP (One-Time Password)
 * @param {number} size - The length of the OTP (default is 6).
 * @returns {string} A numeric OTP string of the specified size.
 */
export function generateNumericOtp(size: number = 6): string {
  if (size < 4 || size > 10) {
    throw new Error('Size must be between 4 and 10.');
  }

  const max = Math.pow(10, size);
  const min = Math.pow(10, size - 1);
  const randomNumber = crypto.randomInt(min, max);

  return randomNumber.toString();
}
