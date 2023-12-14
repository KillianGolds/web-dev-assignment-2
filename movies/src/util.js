import truncate from "lodash/truncate";

export function excerpt(string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

// Mapping numeric gender codes to strings
export const genderMap = {
  1: 'Female',
  2: 'Male',
  3: 'Non-binary',
  0: 'Not specified',
};