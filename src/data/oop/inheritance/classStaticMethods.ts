import type { Method } from '../../../types'

export const classStaticMethods: Method[] = [
  { signature: '@classmethod', description: 'Method that receives class (cls) instead of instance. Use for alternative constructors or operations on class state.', complexity: 'O(1)', section: 'Class & Static Methods', example: `class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_str):
        """Alternative constructor from string"""
        year, month, day = map(int, date_str.split('-'))
        return cls(year, month, day)

    @classmethod
    def today(cls):
        """Alternative constructor for today"""
        import datetime
        d = datetime.date.today()
        return cls(d.year, d.month, d.day)

d1 = Date(2024, 1, 15)
d2 = Date.from_string("2024-06-20")
d3 = Date.today()` },
  { signature: '@staticmethod', description: 'Method without self or cls. Just a regular function in class namespace. Use for utility functions related to the class.', complexity: 'O(1)', section: 'Class & Static Methods', example: `class Math:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def is_even(n):
        return n % 2 == 0

    @staticmethod
    def factorial(n):
        if n <= 1:
            return 1
        return n * Math.factorial(n - 1)

# Call on class
print(Math.add(2, 3))      # 5
print(Math.is_even(4))     # True

# Also works on instance
m = Math()
print(m.factorial(5))      # 120

# When to use:
# @staticmethod - utility function, no class/instance needed
# @classmethod - need class for alternative constructors` },
]
