import type { Method } from '../../../types'

export const propertiesMethods: Method[] = [
  { signature: '@property', description: 'Define getter method accessed like an attribute. Encapsulates internal state. Computed properties without method call syntax.', complexity: 'O(1)', section: 'Properties', example: `class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

    @property
    def diameter(self):
        return self._radius * 2

c = Circle(5)
print(c.radius)    # 5 (no parentheses!)
print(c.area)      # 78.53975
print(c.diameter)  # 10` },
  { signature: '@name.setter', description: 'Define setter for property. Enables validation on assignment. Control how attributes are modified.', complexity: 'O(1)', section: 'Properties', example: `class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

t = Temperature()
t.celsius = 25
print(t.fahrenheit)  # 77.0
t.fahrenheit = 100
print(t.celsius)     # 37.77...` },
]
