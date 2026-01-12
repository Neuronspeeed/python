import type { Method } from '../../types'

export const stringPaddingAlignment: Method[] = [
  { section: 'Padding & Alignment', signature: 'str.center(width[, fillchar])', description: 'Returns centered string of given width.', complexity: 'O(n)', example: `print("hi".center(10, "-"))  # "----hi----"` },
  { section: 'Padding & Alignment', signature: 'str.ljust(width[, fillchar])', description: 'Returns left-justified string of given width.', complexity: 'O(n)', example: `print("hi".ljust(5))  # "hi   "` },
  { section: 'Padding & Alignment', signature: 'str.rjust(width[, fillchar])', description: 'Returns right-justified string of given width.', complexity: 'O(n)', example: `print("42".rjust(5, "0"))  # "00042"` },
  { section: 'Padding & Alignment', signature: 'str.zfill(width)', description: 'Returns string padded with zeros on the left.', complexity: 'O(n)', example: `print("42".zfill(5))  # "00042"` },
]
