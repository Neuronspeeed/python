import type { Method } from '../../../types'

export const collectionsNamedtupleMethods: Method[] = [
  { signature: 'namedtuple', description: 'Tuple with named fields. Immutable, memory efficient, self-documenting.', complexity: 'O(1)', section: 'namedtuple', example: `from collections import namedtuple

# Define a Point type
Point = namedtuple('Point', ['x', 'y'])

p = Point(3, 4)
print(p.x, p.y)    # 3, 4
print(p[0], p[1])  # 3, 4 (tuple access still works)

# Unpack like tuple
x, y = p
print(x, y)  # 3, 4

# Immutable (can't modify)
# p.x = 5  # Error!

# _replace: create modified copy
p2 = p._replace(x=10)
print(p2)  # Point(x=10, y=4)

# _asdict: convert to dict
print(p._asdict())  # {'x': 3, 'y': 4}

# Default values (Python 3.7+)
Point = namedtuple('Point', ['x', 'y', 'z'], defaults=[0])
print(Point(1, 2))  # Point(x=1, y=2, z=0)

# INTERVIEW: Use for clean code
Edge = namedtuple('Edge', ['src', 'dst', 'weight'])
edges = [Edge(0, 1, 5), Edge(1, 2, 3)]

for edge in edges:
    print(f"{edge.src} -> {edge.dst}: {edge.weight}")

# Practical: Return multiple values clearly
Result = namedtuple('Result', ['value', 'error', 'metadata'])
def process():
    return Result(42, None, {'time': 1.5})

result = process()
print(result.value)  # 42` },

  { signature: 'typing.NamedTuple', description: 'Class-based namedtuple with type hints. Cleaner syntax, IDE support, can add methods.', complexity: 'O(1)', section: 'NamedTuple Class', example: `from typing import NamedTuple

class Point(NamedTuple):
    x: int
    y: int
    z: int = 0  # Default value with type hint

p = Point(1, 2)
print(p.x, p.y, p.z)  # 1, 2, 0

# Can add methods!
class Vector(NamedTuple):
    x: float
    y: float

    def magnitude(self) -> float:
        return (self.x**2 + self.y**2) ** 0.5

v = Vector(3.0, 4.0)
print(v.magnitude())  # 5.0

# WHEN TO USE:
# namedtuple() - Quick, simple, no type hints needed
# NamedTuple class - Type hints, methods, cleaner syntax` },
]
