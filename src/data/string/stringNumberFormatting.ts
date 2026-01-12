import type { Method } from '../../types'

export const stringNumberFormatting: Method[] = [
  { section: 'Number Formatting', signature: 'f-string number format', description: 'Format numbers in f-strings using {value:format}. Use .Nf for decimals, , for thousands, % for percentages.', complexity: 'O(n)', example: `# Fixed-point notation (N decimal places)
n = 7.125
result = f"$\\{n:.2f}"          # "7.12" (2 decimals, rounds ties to even)
result = f"$\\{n:.3f}"          # "7.125"
result = f"$\\{1:.2f}"          # "1.00" (always shows N decimals)

# Thousands separator
x = 1234567890
result = f"$\\{x:,}"            # "1,234,567,890"
result = f"$\\{x:,.2f}"         # "1,234,567,890.00"

# Currency formatting
balance = 2000.0
spent = 256.35
remaining = balance - spent
message = f"Remaining: $$\\{remaining:,.2f}"  # "$1,743.65"

# Percentages (multiplies by 100, adds %)
ratio = 0.9
result = f"$\\{ratio:.1%}"      # "90.0%"
result = f"$\\{ratio:.2%}"      # "90.00%"
result = f"$\\{0.12345:.0%}"    # "12%"` },
]
