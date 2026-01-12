import type { Method } from '../../../types'

export const browserMethods: Method[] = [
  { signature: 'Browser History', description: 'Support back, forward, visit. Use list with pointer or two stacks.', complexity: 'O(1)', section: 'Browser', example: `class BrowserHistory:
    """
    Browser history with back/forward navigation.
    List with current position pointer.
    """
    def __init__(self, homepage: str):
        self.history = [homepage]
        self.current = 0

    def visit(self, url: str) -> None:
        # Clear forward history
        self.history = self.history[:self.current + 1]
        self.history.append(url)
        self.current += 1

    def back(self, steps: int) -> str:
        self.current = max(0, self.current - steps)
        return self.history[self.current]

    def forward(self, steps: int) -> str:
        self.current = min(len(self.history) - 1, self.current + steps)
        return self.history[self.current]

# Two stacks version
class BrowserHistoryStacks:
    def __init__(self, homepage: str):
        self.back_stack = [homepage]
        self.forward_stack = []

    def visit(self, url: str) -> None:
        self.back_stack.append(url)
        self.forward_stack.clear()

    def back(self, steps: int) -> str:
        while steps > 0 and len(self.back_stack) > 1:
            self.forward_stack.append(self.back_stack.pop())
            steps -= 1
        return self.back_stack[-1]

    def forward(self, steps: int) -> str:
        while steps > 0 and self.forward_stack:
            self.back_stack.append(self.forward_stack.pop())
            steps -= 1
        return self.back_stack[-1]` },
]
