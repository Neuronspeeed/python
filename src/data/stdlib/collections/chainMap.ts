import type { Method } from '../../../types'

export const collectionsChainMapMethods: Method[] = [
  { signature: 'ChainMap', description: 'Combine multiple dicts into single view. First dict has priority for lookups.', complexity: 'O(n) lookup', section: 'ChainMap', example: `from collections import ChainMap

# Combine multiple dicts
defaults = {'color': 'red', 'user': 'guest'}
user_prefs = {'color': 'blue'}
cmd_args = {}

config = ChainMap(cmd_args, user_prefs, defaults)
print(config['color'])  # 'blue' (from user_prefs)
print(config['user'])   # 'guest' (from defaults)

# First dict is the "front" - mutations go there
config['new_key'] = 'value'
print(cmd_args)  # {'new_key': 'value'}

# Practical: Variable scoping
def make_scope():
    global_scope = {'x': 1, 'y': 2}
    local_scope = {'x': 10}
    scope = ChainMap(local_scope, global_scope)
    print(scope['x'])  # 10 (local)
    print(scope['y'])  # 2 (global)

# new_child: create new scope
child = config.new_child({'temp': 123})
print(child['temp'])   # 123
print(child['color'])  # 'blue'

# parents: skip first mapping
print(child.parents['color'])  # 'blue'

# Convert to regular dict
flat = dict(config)

# List all keys (unique across all maps)
print(list(config.keys()))` },
]
