export const conditionalPatternsIntro = `Dictionary Dispatch for O(1) Lookups
Replace O(n) if-elif chains with O(1) dictionary lookups when mapping values to values or functions. Dict dispatch is faster for 5+ branches and cleaner than long if-elif chains. Use \`.get()\` for safe lookups with defaults. The key insight: algorithmic complexity matters—O(1) hash lookup beats O(n) linear search.

\`\`\`python
# ANTI-PATTERN: O(n) if-elif chain
def get_status(code):
    if code == 200:
        return "OK"
    elif code == 201:
        return "Created"
    elif code == 400:
        return "Bad Request"
    elif code == 404:
        return "Not Found"
    elif code == 500:
        return "Server Error"
    else:
        return "Unknown"
    # Worst case: 6 comparisons

# BETTER: O(1) dict dispatch
STATUS_MESSAGES = {
    200: "OK",
    201: "Created",
    400: "Bad Request",
    404: "Not Found",
    500: "Server Error",
}
def get_status(code):
    return STATUS_MESSAGES.get(code, "Unknown")  # Always 1 lookup!

# FUNCTION DISPATCH - Map to behaviors
def add(x, y): return x + y
def sub(x, y): return x - y
def mul(x, y): return x * y

OPERATIONS = {'+': add, '-': sub, '*': mul}

def calculate(x, op, y):
    operation = OPERATIONS.get(op)
    if not operation:
        raise ValueError(f"Unknown: {op}")
    return operation(x, y)

calculate(10, '+', 5)  # 15 (O(1) dispatch)
\`\`\`
---
Strategy Pattern for Behavior Selection
Strategy pattern replaces if-elif explosion with polymorphism—define multiple algorithms as classes, select at runtime. Better than long if-elif for complex behaviors with shared interface. Each strategy is a separate class implementing the same method. Use when behaviors are complex and might grow.

\`\`\`python
# ANTI-PATTERN: if-elif explosion
def process_payment(method, amount):
    if method == "credit_card":
        # 20 lines of credit card logic
        validate_card()
        charge_card(amount)
        send_receipt()
    elif method == "paypal":
        # 20 lines of PayPal logic
        validate_paypal()
        charge_paypal(amount)
        send_receipt()
    elif method == "bitcoin":
        # 20 lines of Bitcoin logic
        validate_wallet()
        charge_bitcoin(amount)
        send_receipt()
    # Function grows with each payment method!

# BETTER: Strategy pattern
class PaymentStrategy:
    def pay(self, amount):
        raise NotImplementedError

class CreditCardPayment(PaymentStrategy):
    def pay(self, amount):
        validate_card()
        charge_card(amount)
        send_receipt()

class PayPalPayment(PaymentStrategy):
    def pay(self, amount):
        validate_paypal()
        charge_paypal(amount)
        send_receipt()

class BitcoinPayment(PaymentStrategy):
    def pay(self, amount):
        validate_wallet()
        charge_bitcoin(amount)
        send_receipt()

# Dispatch with dict
PAYMENT_STRATEGIES = {
    "credit_card": CreditCardPayment(),
    "paypal": PayPalPayment(),
    "bitcoin": BitcoinPayment(),
}

def process_payment(method, amount):
    strategy = PAYMENT_STRATEGIES.get(method)
    if not strategy:
        raise ValueError(f"Unknown payment: {method}")
    strategy.pay(amount)

# Easy to extend: just add new strategy class + dict entry
\`\`\`
---
When to Use Each Pattern
Choose based on complexity and performance needs. Simple conditions (1-4 branches) use if-elif. Value mappings (5+ branches) use dict dispatch for O(1) speed. Complex behaviors use Strategy pattern for maintainability. State transitions use State Machine. Match (3.10+) for structural patterns with destructuring.

\`\`\`python
# SIMPLE CONDITIONS: if-elif (1-4 branches)
if age < 13:
    return "child"
elif age < 20:
    return "teen"
else:
    return "adult"

# VALUE MAPPING: Dict dispatch (5+ branches, O(1))
DAYS = {0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu",
        4: "Fri", 5: "Sat", 6: "Sun"}
day_name = DAYS.get(day_num, "Invalid")

# COMPLEX BEHAVIORS: Strategy pattern
# Use when each branch has 10+ lines of distinct logic

# STATE TRANSITIONS: State machine
class TrafficLight:
    def __init__(self):
        self.state = "red"

    def change(self):
        transitions = {
            "red": "green",
            "green": "yellow",
            "yellow": "red"
        }
        self.state = transitions[self.state]

# STRUCTURAL PATTERNS: match (Python 3.10+)
match point:
    case (0, 0):
        return "origin"
    case (x, 0):
        return f"x-axis at {x}"
    case (0, y):
        return f"y-axis at {y}"
    case (x, y):
        return f"point at ({x}, {y})"

# DECISION MATRIX:
# Branches 1-4 + simple -> if-elif
# Branches 5+ + value mapping -> dict dispatch
# Complex behaviors + growth -> Strategy pattern
# State transitions -> State machine
# Pattern matching -> match (3.10+)
\`\`\``
