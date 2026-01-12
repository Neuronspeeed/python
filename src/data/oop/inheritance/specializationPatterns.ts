import type { Method } from '../../../types'

export const specializationPatternsMethods: Method[] = [
  { signature: '4 ways to specialize', description: 'Inherit (use as-is), Override (replace), Extend (call super + add), Provide (subclass implements).', complexity: 'Concept', section: 'Specialization Patterns', example: `class Base:
    def inherit_me(self):
        return "base"

    def override_me(self):
        return "base"

    def extend_me(self):
        return "base"

    def action(self):  # Expects subclass to provide
        raise NotImplementedError

class Child(Base):
    # 1. INHERIT: inherit_me() used as-is

    # 2. OVERRIDE: completely replace
    def override_me(self):
        return "child"

    # 3. EXTEND: call parent + add logic
    def extend_me(self):
        return super().extend_me() + " + child"

    # 4. PROVIDE: implement required method
    def action(self):
        return "child action"` },
]
