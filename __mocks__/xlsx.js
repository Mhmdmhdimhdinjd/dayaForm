export const utils = {
    json_to_sheet: jest.fn(() => ({})),
    book_new: jest.fn(() => ({})),
    book_append_sheet: jest.fn(),
  };
  
  export const write = jest.fn(() => new ArrayBuffer(8));