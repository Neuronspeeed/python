import { TypePage } from '../components/TypePage'
import { fundamentalsMethods } from '../data/fundamentals'
import { statementsMethods } from '../data/statementsMethods'
import { conditionalsMethods } from '../data/conditionalsMethods'
import { conditionalPatternsMethods } from '../data/conditionalPatterns'
import { matchMethods } from '../data/match'
import { loopsMethods } from '../data/loopsMethods'
import { comprehensionsMethods } from '../data/comprehensions'
import { functionsMethods } from '../data/functions'
import { oopMethods } from '../data/oop'

const fundamentalsIntro = `In Python, data is represented as built-in objects or custom objects created using classes. Built-in objects are faster (implemented in C), easier to use, and serve as building blocks for complex extensions. Programs flow: modules → statements → expressions → objects. Core objects include Numbers, Strings, Lists, Dictionaries, Tuples, Files, Sets, Booleans, and None.

Dynamic Typing Model: Python's model has three parts. Variables are entries in a system table with links to objects—they have no type information and are created when first assigned. Objects are allocated memory containing actual values, each with a header field tagging its type. References are automatic pointers linking variables to objects. You never declare types—Python tracks them at runtime.

Garbage Collection: Python reclaims memory automatically via reference counting—each object tracks how many variables point to it. When the count drops to zero, memory is immediately freed. A cyclic garbage collector also runs periodically to detect and reclaim groups of objects that reference each other in loops (circular references that reference counting alone can't handle).

Shared References: Multiple variables can point to the same object. For immutable objects (int, str, tuple, frozenset), reassigning a variable creates a new object, leaving others unchanged. For mutable objects (list, dict, set), in-place changes like \`L[0] = 99\` modify the shared object itself—visible to ALL references. To avoid unintended shared changes, copy explicitly: slice \`L[:]\`, method \`D.copy()\`, or \`copy.deepcopy()\` for nested structures.

Equality vs Identity: \`==\` checks value equality (do they have the same content?), \`is\` checks identity (do they point to the exact same memory address?). Python comparisons automatically and recursively inspect all parts of compound objects (nested lists) until a result is found. Python caches small integers (-5 to 256) and short strings, so \`is\` may return True for separately created objects.

Truthiness: Any nonzero number or nonempty object is \`True\`. Zero, empty objects (\`[]\`, \`{}\`, \`""\`), and \`None\` are \`False\`. This enables idioms like \`if my_list:\` to check for non-empty collections.

Common Pitfalls: Repeating nested mutable sequences \`[[]] * 3\` creates three references to the SAME inner list—changing one changes all. Use \`[[] for _ in range(3)]\` instead. Cyclic objects (when a list contains itself via \`L.append(L)\`) are detected during printing but can cause infinite loops in manual traversal.

Type Hints: Modern Python allows type hints like \`x: int = 1\`, but these are optional and completely unused by Python itself. They're documentation tools for third-party checkers like \`mypy\`. They don't constrain types or change Python's dynamic nature.

Core Concepts: \`Dynamic Typing\` means Python tracks types at runtime—no declarations needed. \`Strong Typing\` means operations only work on compatible types (no silent coercion). \`Polymorphism\` means the same operator behaves differently based on type—\`+\` adds numbers but concatenates strings.

Numeric Types: \`int\` has unlimited precision (grows as large as memory allows—no overflow!), \`float\` maps to hardware with limited accuracy (64-bit), \`complex\` uses j notation (\`3+4j\`), \`Decimal\` and \`Fraction\` modules avoid float inaccuracies. Alternative bases: \`0x\` hex, \`0o\` octal, \`0b\` binary. Underscores for readability: \`1_000_000\`. Booleans \`True\`/\`False\` are customized integers \`1\`/\`0\`.

Operators: Precedence: \`**\` binds tightest → \`*/%\` → \`+-\`. In mixed-type expressions, Python converts "up" to the most complex type (int+float→float). True division \`/\` always returns float, floor division \`//\` truncates toward negative infinity. Bitwise: \`<<\` \`>>\` shifts, \`&\` \`|\` \`^\` logic. Chained comparisons: \`1 < x < 10\` is shorthand for range tests. For float equality, use \`math.isclose()\` due to hardware limitations.

Key Modules: \`math\` provides sqrt, ceil, floor, log, sin, cos, pi, e, factorial, gcd. \`random\` handles randint, choice, shuffle, sample. \`statistics\` offers mean, median, mode, stdev, variance. For heavy numeric work, \`NumPy\` provides high-performance matrix and vector processing.

THE ZEN OF PYTHON: \`import this\` reveals Python's design philosophy. Key principle: "There should be one—and preferably only one—obvious way to do it." But Python now offers overlapping tools: 4 ways to format strings (%, .format, Template, f-strings), 4 ways to manage attributes (property, descriptors, __getattr__, __getattribute__), 3 ways to augment classes (rebinding, decorators, metaclasses), 4 comprehension types (list, set, dict, generator).

CHOOSING TOOLS: For string formatting, prefer f-strings (fastest, most readable). For attributes, start with @property (simplest). For class augmentation, prefer decorators over metaclasses. For cleanup, prefer \`with\` over try/finally. The simplest tool that works is usually the right choice. Advanced features exist for framework builders—most code doesn't need metaclasses, descriptors, or __getattribute__.`

export function FundamentalsPage() {
  return (
    <TypePage
      type="Python Fundamentals" badge="py" color="var(--accent-functions)"
      description="Core concepts: dynamic typing, strong typing, polymorphism. Understanding Python's object model and type categories."
      intro={fundamentalsIntro}
      tip={`Programs → Modules → Statements → Expressions → Objects
Dynamic typing? Python tracks types at runtime, no declarations
Strong typing? Operations only work on compatible types`}
      methods={fundamentalsMethods}
    />
  )
}

const statementsIntro = `Statements are where objects come to life. While expressions produce values, statements direct the flow and create bindings between names and objects.

Assignment: The \`=\` binds a name to an object. Python supports tuple unpacking (\`a, b = 1, 2\`), extended unpacking (\`first, *rest = items\`), and augmented assignment (\`x += 1\`). Multiple targets share the same object: \`a = b = []\` creates ONE list.

Naming Rules: Names start with letter or underscore, followed by letters, digits, or underscores. Case-sensitive. \`_name\` hints "internal use", \`__name\` triggers name mangling, \`__name__\` is reserved for Python.

Expression Statements: Any expression can be a statement—the result is discarded. Common for function calls (\`print(x)\`) and method calls (\`list.append(y)\`).

Print Function: \`print(*objects, sep=' ', end='\\n', file=sys.stdout)\`. Use \`sep\` to change delimiter, \`end\` to suppress newline, \`file\` to redirect output.`

export function StatementsPage() {
  return (
    <TypePage
      type="Statements" badge="=" color="var(--accent-none)"
      description="Assignment forms, variable naming, expression statements, and print operations. The building blocks of Python programs."
      intro={statementsIntro}
      tip={`Swap values? a, b = b, a
Collect rest? first, *rest = items
Walrus operator? if (n := len(x)) > 10:`}
      methods={statementsMethods}
    />
  )
}

const conditionalsIntro = `Conditionals let your code make decisions. Python's \`if\` statement is the primary selection tool, with optional \`elif\` and \`else\` branches.

If Statement: Tests are evaluated top-to-bottom; first true branch runs, rest are skipped. No switch statement needed—use \`if/elif\` chains or \`match\` (3.10+).

Boolean Context: Any object can be tested. False values: \`False\`, \`None\`, \`0\`, \`""\`, \`[]\`, \`{}\`, \`()\`. Everything else is true. Custom classes can define \`__bool__\` or \`__len__\`.

Short-Circuit Logic: \`and\` returns first false value or last value. \`or\` returns first true value or last value. Use for defaults: \`name = user_input or "Guest"\`.

Ternary Expression: \`value_if_true if condition else value_if_false\`. Compact but don't nest deeply—readability matters.

Match Statement: Python 3.10+ structural pattern matching. More powerful than switch—can destructure sequences, match types, bind variables, and use guards.`

export function ConditionalsPage() {
  return (
    <TypePage
      type="Conditionals" badge="if" color="var(--accent-none)"
      description="Selection and branching with if, ternary expressions, and boolean logic. Dictionary dispatch for cleaner multi-way branching."
      intro={conditionalsIntro}
      tip={`Ternary? x if cond else y
Default value? name = input or "Guest"
Dict dispatch? ops['+'] for O(1) lookup`}
      methods={conditionalsMethods}
    />
  )
}

const conditionalPatternsIntro = `Performance and design patterns for Python conditional logic. Learn when to use if-elif vs dict dispatch vs match, how short-circuit evaluation works, and best practices for writing efficient, readable conditional code.

if-elif vs dict: Dictionary dispatch is O(1) lookup—constant time regardless of how many branches. if-elif is O(n) worst case—must check each condition sequentially. Use dict for 5+ simple equality branches. Use if-elif for complex conditions or different variables.

if-elif vs match: match excels at pattern matching and destructuring (Python 3.10+). if-elif is better for boolean combinations (and/or/not) and conditions involving different variables. match is optimized for structural patterns, if-elif for logical combinations.

Short-circuit evaluation: and/or operators stop evaluating as soon as the result is known. This provides both performance benefits (avoid expensive calls) and safety (null checks, division by zero). Put cheap/likely-to-fail conditions first in AND chains.

Ternary expressions: Use for simple value assignment that fits on one readable line. Avoid deep nesting—if it's complex, use if-else for clarity. Ternary is an expression (returns value), not a statement.

Performance Tips: Dictionary lookups are O(1) with hash tables. if-elif chains are O(n) linear search. Pattern matching (match) is O(1) for simple literals, O(n) for complex patterns with guards. Short-circuit evaluation can turn O(n) into O(1) by avoiding unnecessary checks.

Best Practices: Choose the simplest, most readable approach. Dict dispatch for value mapping. match for pattern destructuring. if-elif for boolean logic. Ternary for simple value assignment. Short-circuit for null safety and performance.`

export function ConditionalPatternsPage() {
  return (
    <TypePage
      type="Selection Patterns" badge="O(1)" color="var(--accent-none)"
      description="Performance comparisons and best practices: if-elif vs dict vs match, short-circuit evaluation, when to use ternary."
      intro={conditionalPatternsIntro}
      tip={`Dict dispatch? O(1) for 5+ simple branches
match vs if? match for patterns, if for boolean logic
Short-circuit? Put cheap/likely-false conditions first`}
      methods={conditionalPatternsMethods}
    />
  )
}

const matchIntro = `Pattern Matching (Python 3.10+) adds structural pattern matching to Python. The \`match\` statement is more powerful than traditional switch—it can destructure sequences, match dictionary keys, bind variables, and use guards.

Match vs If: Use \`match\` when checking the same value against multiple patterns, especially with destructuring. Use \`if/elif\` when conditions involve different variables or complex boolean logic.

Match vs Dict: Dictionary dispatch is O(1) for simple value mapping. Match handles complex patterns (sequences, types, guards) that dictionaries cannot.

Performance: Match statements are O(1) to O(n) depending on patterns. Simple literal matches are optimized by the compiler. Complex patterns with guards may require sequential evaluation.

Python Version: Requires Python 3.10 or later. Will not work in earlier versions.`

export function MatchPage() {
  return (
    <TypePage
      type="Match Statement" badge="match" color="var(--accent-none)"
      description="Structural pattern matching (Python 3.10+). Destructure sequences, match types, bind variables, use guards. More powerful than switch."
      intro={matchIntro}
      tip={`Python 3.10+ only! Not available in 3.9 or earlier
Literal match? case 200: or case "start":
Sequence match? case (0, y): or case [first, *rest]:
Guard? case (x, y) if x > y:`}
      methods={matchMethods}
    />
  )
}

const loopsIntro = `In Python's hierarchy, statements direct logic while expressions produce values. Statements are where objects—including functions and classes—spring into existence. Python's syntax is minimalist: compound statements end with a colon \`:\`, parentheses around tests are optional, semicolons are rarely needed, and indentation defines blocks instead of braces.

Indentation Rules: Python is WYSIWYG—what you see is what you get. All statements in a nested block must be indented to the same level. This forces code to be as visually organized as it is logically organized, preventing bugs where visual alignment doesn't match logical association.

Line Continuation: Any code in parentheses \`()\`, brackets \`[]\`, or braces \`{}\` can span multiple lines until closed—the preferred way to handle long statements. Backslash \`\\\` at line end also continues statements but is error-prone. Simple statement bodies can appear on the same line after the colon.

While Loops: The general looping construct \`while test:\` repeats as long as the test is true. Use \`break\` to exit immediately, \`continue\` to jump back to the header. The optional \`else:\` clause runs only if the loop completes without hitting \`break\`.

For Loops: Python's \`for\` iterates over any sequence or iterable—lists, strings, tuples, dicts, files, generators. It's more powerful than C-style counting loops because it works on any iterable object, not just numeric ranges.

Loop Tools: \`range(n)\` generates integers 0 to n-1. \`enumerate(seq)\` yields \`(index, value)\` pairs. \`zip(a, b)\` pairs elements from multiple sequences. \`reversed(seq)\` iterates backwards. All return iterators, not lists—memory efficient for large data.

Error Handling: Programs can validate inputs using methods like \`isdigit()\` or catch exceptions with \`try/except\`. The exception approach is often preferred—it simplifies code by responding to errors only when they occur (EAFP: Easier to Ask Forgiveness than Permission).

Comprehensions: Python's functional iteration syntax. Four forms with identical structure: list \`[x for x in L]\`, set \`{x for x in L}\`, dict \`{k: v for k, v in L}\`, and generator \`(x for x in L)\`. All support nested \`for\` loops and \`if\` filters. They're concise alternatives to \`map()\` and \`filter()\`.

Generators vs Lists: Comprehensions with \`[]\` build the entire list in memory. Generator expressions with \`()\` produce items on demand—one at a time via the iteration protocol. Use generators for large data: \`sum(x**2 for x in range(1000000))\` uses constant memory, while the list version allocates a million-item list first.`

export function LoopsPage() {
  return (
    <TypePage
      type="Loops" badge="for" color="var(--accent-none)"
      description="Python loops: for iterates over sequences, while repeats until condition is false. Includes iteration tools and loop control."
      intro={loopsIntro}
      tip={`Prefer for over while—simpler and faster
Need index + value? enumerate(arr)
Pair two lists? zip(a, b)`}
      methods={loopsMethods}
    />
  )
}

const comprehensionsIntro = `Comprehensions provide Python's concise functional syntax for creating collections. They transform one collection into another with filtering and mapping in a single readable expression.

Four Types: List \`[]\` builds entire list in memory. Set \`{}\` creates unique values. Dict \`{k:v}\` creates key-value pairs. Generator \`()\` yields items lazily on demand. All share identical structure: \`[EXPR for VAR in ITERABLE if CONDITION]\`.

Comprehensions vs Loops: Comprehensions are more Pythonic and often faster for simple transformations. Loops are better for complex logic, multiple statements, or when debugging. Choose comprehensions for readability, loops when logic doesn't fit cleanly in one line.

Comprehensions vs map/filter: Comprehensions are more readable and flexible—you can combine mapping and filtering in one expression. \`map\` and \`filter\` are functional-style but less idiomatic in Python. Use comprehensions unless you already have a function to apply.

List vs Generator: Lists \`[]\` build all items immediately (fast iteration, high memory). Generators \`()\` yield items one at a time (slow iteration, constant memory). Use lists for small data or multiple iterations. Use generators for large datasets, pipelines, or one-time iteration.

Memory Trade-offs: List comprehension on 1M items uses ~8MB memory. Generator expression uses ~100 bytes—constant regardless of size. For \`sum(x**2 for x in range(1000000))\` the generator is 80x more memory efficient.

When to Use: Comprehensions shine for simple transforms/filters. If you need to \`if/elif/else\`, multiple statements, or find yourself nesting deeply—use a regular loop instead. Readability trumps brevity.

WARNING: Generators exhaust after one iteration! \`list(gen)\` consumes it—calling \`list(gen)\` again returns empty. Convert to list if you need multiple passes.`

export function ComprehensionsPage() {
  return (
    <TypePage
      type="Comprehensions" badge="[]" color="var(--accent-none)"
      description="Concise syntax for creating collections: list, dict, set, generator. Transform and filter iterables in one readable expression."
      intro={comprehensionsIntro}
      tip={`List vs Generator? [] builds all, () yields lazily
Memory efficient? Use (x for x in big_data)
Too complex? Use a regular loop instead`}
      methods={comprehensionsMethods}
    />
  )
}

const functionsIntro = `Functions are the most basic way to package code for reuse. They let you write logic once and call it many times with different inputs, avoiding redundant code.

Creation: Use \`def\` for named functions or \`lambda\` for anonymous expressions. Functions are "first-class objects"—they can be assigned to variables, passed as arguments, and stored in data structures.

Calling: Parentheses are always required to trigger a call, even with no arguments: \`func()\`. Without parentheses, you're referencing the function object, not calling it.

Return Values: The \`return\` statement sends results back to the caller. Without an explicit return, functions return \`None\` by default. Functions that perform actions without returning meaningful values are sometimes called "procedures."

Arguments: Function arguments are implicit assignment—passed objects are bound to parameter names. Python supports multiple passing modes:
• Positional: Matched by position (\`func(1, 2, 3)\`)
• Keyword: Matched by name (\`func(x=1, y=2)\`)—order doesn't matter
• Defaults: Parameters with \`=value\` are optional (\`def func(x, y=10)\`)
• Positional-only (\`/\`): Must be passed by position, not name
• Keyword-only (\`*\`): Must be passed by name, not position

Star Syntax: In headers, \`*args\` collects extra positional args into a tuple, \`**kwargs\` collects extra keyword args into a dict. In calls, \`*iterable\` unpacks into positional args, \`**dict\` unpacks into keyword args. The \`*\` accepts any iterable—lists, tuples, even file objects.

Scopes (LEGB Rule): A scope is where a name is visible. Unlike languages with declarations, Python uses the physical location of assignment to determine scope. When referencing a name, Python searches four nested scopes in order:
• Local (L): Names assigned inside the current function (not declared \`global\` or \`nonlocal\`). Exist only while the function executes.
• Enclosing (E): Names in outer functions when you have nested \`def\`s. Searched from innermost to outermost enclosing function.
• Global (G): Names assigned at module top-level, or declared \`global\` inside a function.
• Built-in (B): Names preassigned by Python itself (\`len\`, \`open\`, \`range\`, \`SyntaxError\`).

Built-ins vs Reserved Words: Reserved words (\`if\`, \`while\`, \`class\`) are hardwired syntax—you cannot use them as names. Built-in names are different: they're just the outermost scope and CAN be reassigned (e.g., \`len = 99\`), which "shadows" the built-in. This is legal but dangerous—avoid it.

Modifying Outer Scopes: Reading outer scope variables works automatically. But to modify them, you must declare: \`global x\` to modify module-level \`x\`, or \`nonlocal x\` to modify an enclosing function's \`x\`. Without these declarations, assignment creates a new local variable.

Namespaces: Each module is a self-contained namespace. Variables named \`x\` in different functions or modules don't collide—Python's scope rules keep them separate automatically.

Polymorphism: Since Python doesn't constrain types, a function's behavior depends on the types of objects passed at runtime. The same function can work on strings, lists, or custom objects if they support the required operations.

Methods vs Functions: Methods are functions attached to objects. When you call \`obj.method()\`, Python implicitly passes the object as the first argument.

Functional Programming: Python supports functional paradigms alongside procedural and OOP. Key tools: \`map\` (apply function to each item), \`filter\` (select items where function is true), \`reduce\` (combine items into single result), plus generators, comprehensions, closures, decorators, and lambda expressions.

Recursion: Functions can call themselves to process nested/hierarchical structures. Always needs a base case to stop. For cyclic data (objects referencing themselves), track visited items with a set to avoid infinite loops. Use \`@lru_cache\` to memoize expensive recursive calls.

DECORATORS: A decorator is a callable that accepts a function/class and returns a callable (often a wrapper). \`@decorator\` before \`def F\` is syntax sugar for \`F = decorator(F)\`. Decorators run at definition time, not call time—ideal for registration, initialization, or wrapping.

DECORATOR PATTERNS: Function decorators intercept calls—add logging, timing, validation. Usually return a wrapper that invokes the original via closure. Class decorators intercept class creation—augment the class or return a wrapper for instance creation. Can use classes (with \`__call__\`) or nested functions.

DECORATOR STATE: Three ways to retain state (e.g., call counter): (1) instance attributes if decorator is a class, (2) \`nonlocal\` variables in enclosing closure, (3) attributes on wrapper function object. Use \`@functools.wraps\` to preserve original \`__name__\`, \`__doc__\`.

NESTING & ARGUMENTS: Stack decorators—applied bottom to top: \`@A @B def f\` = \`f = A(B(f))\`. Decorators with arguments need extra layer: \`decorator(args)\` returns the actual decorator which takes the function.`

export function FunctionsPage() {
  return (
    <TypePage
      type="Functions" badge="def" color="var(--accent-functions)"
      description="Functions are first-class objects in Python. Use def for named functions, lambda for anonymous functions."
      intro={functionsIntro}
      tip={`Mutable default trap? def f(arr=None): arr = arr or []
DP memoization? @lru_cache decorator
Custom sort key? key=lambda x: x[1]`}
      methods={functionsMethods}
    />
  )
}

const oopIntro = `CLASS CODING BASICS: Classes are factories for generating instance objects. The \`class\` statement is executable code—Python runs nested statements to build class attributes. Assignments in the class body create class attributes; assignments to \`self\` in methods create instance attributes. The \`__init__\` constructor runs automatically when an instance is created—use it to initialize state via \`self.name = value\`. Methods always receive the instance as their first argument (\`self\`).

REALISTIC EXAMPLE PATTERNS: Encapsulation bundles data + logic together—define methods inside the class rather than external functions. This means changes to logic update in one place. Classes are superior to dicts for records because they ensure consistent interface and can add behavior. Use \`if __name__ == "__main__":\` for self-test code that runs when executed directly but not when imported. Objects can be persisted with \`shelve\` for simple database-like storage.

CLASS CODING DETAILS: Namespaces are dictionaries (\`__dict__\`). Instances link to class via \`__class__\`, classes to superclasses via \`__bases__\`. Two lookup mechanisms: simple names (\`x\`) use LEGB scopes; qualified names (\`obj.x\`) search the inheritance tree. \`instance.method(args)\` translates to \`Class.method(instance, args)\`. Bound methods package self; unbound methods (accessed via class) are just functions.

DESIGNING WITH CLASSES: Inheritance ("is-a") for specialization. Composition ("has-a") for embedding objects. Delegation via \`__getattr__\` forwards calls to wrapped objects—adds logging, validation. Mix-ins are small focused classes providing orthogonal capabilities. Factories create objects dynamically. MRO (Method Resolution Order) determines search path in multiple inheritance (C3 linearization).

ADVANCED TOPICS: \`__slots__\` restricts attributes and reduces memory. \`@dataclass\` auto-generates \`__init__\`, \`__repr__\`, \`__eq__\`. ABC (Abstract Base Classes) define interfaces that subclasses must implement. Name mangling (\`__name\` → \`_Class__name\`) prevents accidental override in inheritance. Four specialization patterns: inherit, override, extend (super + add), provide (implement abstract).

MANAGED ATTRIBUTES: Run code when attributes are fetched or set—for validation, computed values, or logging. \`@property\` is simplest: define getter/setter/deleter for specific attributes. Descriptors are the low-level mechanism (classes with \`__get__\`/\`__set__\`/\`__delete__\`)—they power properties, slots, and staticmethod.

ATTRIBUTE INTERCEPTION: \`__getattr__(name)\` runs only when lookup fails (undefined attributes)—ideal for delegation. \`__getattribute__(name)\` runs for ALL fetches—powerful but risky; avoid recursion via \`object.__getattribute__(self, name)\`. \`__setattr__(name, value)\` runs for all assignments—must use \`self.__dict__[name]\` to avoid recursion.

BUILT-IN LIMITATION: Built-in operations (\`str(x)\`, \`len(x)\`, \`x + y\`) look up special methods (\`__str__\`, \`__len__\`, \`__add__\`) directly in the class, bypassing \`__getattr__\` and \`__getattribute__\`. To intercept these, you must define the specific dunder methods in your class.

METACLASSES: Classes are themselves objects—created by metaclasses. \`type\` is the default metaclass. The class statement runs body to build dict, then calls \`Metaclass(name, bases, dict)\`. Subclass \`type\` and override \`__new__\` to intercept class creation—modify class dict, add methods, validate attributes.

METACLASS VS DECORATOR: Class decorators run after creation, modify specific class, not inherited. Metaclasses run during creation, are inherited by all subclasses—ideal for frameworks. Use syntax: \`class C(metaclass=MyMeta)\`. "If you wonder whether you need metaclasses, you probably don't"—99% of cases use simpler tools.`

export function OOPPage() {
  return (
    <TypePage
      type="OOP" badge="class" color="var(--accent-oop)"
      description="Object-Oriented Programming in Python. Classes bundle data + behavior. Use when you have state + multiple operations on that state."
      intro={oopIntro}
      tip={`Custom heap comparison? Define __lt__
Hashable object? Define __hash__ and __eq__
Design problem? Class with state + methods`}
      methods={oopMethods}
    />
  )
}
