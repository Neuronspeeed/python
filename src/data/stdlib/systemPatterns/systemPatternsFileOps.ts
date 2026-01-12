import type { Method } from '../../../types'

export const systemPatternsFileOpsMethods: Method[] = [
  {
    signature: 'File Cache with Deduplication',
    description: 'Cache files with hash-based deduplication. Anthropic Level 4 pattern.',
    complexity: 'O(n)',
    section: 'File Operations',
    example: `import hashlib
from typing import Optional

class FileCacheWithDedup:
    """
    File cache with deduplication.
    Same content stored once, multiple names can point to it.
    """

    def __init__(self, capacity_bytes: int):
        self.capacity = capacity_bytes
        self.used = 0
        self.files = {}       # filename -> content_hash
        self.content = {}     # content_hash -> content
        self.ref_count = {}   # content_hash -> reference count

    def _hash(self, content: bytes) -> str:
        return hashlib.sha256(content).hexdigest()

    def write(self, filename: str, content: bytes) -> bool:
        """Write file, return True if successful"""
        content_hash = self._hash(content)

        # Delete old file if exists
        if filename in self.files:
            self.delete(filename)

        # Check if content already exists (dedup)
        if content_hash in self.content:
            self.files[filename] = content_hash
            self.ref_count[content_hash] += 1
            return True

        # Check capacity
        if self.used + len(content) > self.capacity:
            return False

        # Store new content
        self.content[content_hash] = content
        self.files[filename] = content_hash
        self.ref_count[content_hash] = 1
        self.used += len(content)
        return True

    def read(self, filename: str) -> Optional[bytes]:
        """Read file content"""
        if filename not in self.files:
            return None
        return self.content[self.files[filename]]

    def delete(self, filename: str) -> bool:
        """Delete file, return True if existed"""
        if filename not in self.files:
            return False

        content_hash = self.files[filename]
        del self.files[filename]

        self.ref_count[content_hash] -= 1
        if self.ref_count[content_hash] == 0:
            # No more references, delete content
            self.used -= len(self.content[content_hash])
            del self.content[content_hash]
            del self.ref_count[content_hash]

        return True

    def copy(self, src: str, dest: str) -> bool:
        """Copy file (just adds reference, no space used)"""
        if src not in self.files:
            return False
        if dest in self.files:
            self.delete(dest)

        content_hash = self.files[src]
        self.files[dest] = content_hash
        self.ref_count[content_hash] += 1
        return True

    def space_used(self) -> int:
        return self.used

    def space_remaining(self) -> int:
        return self.capacity - self.used

# Usage
cache = FileCacheWithDedup(capacity_bytes=1000)

# Write same content twice - only stored once
content = b"Hello, World!"
cache.write("file1.txt", content)
cache.write("file2.txt", content)

print(f"Space used: {cache.space_used()}")  # Only counts once!

# Copy is free (just adds reference)
cache.copy("file1.txt", "file3.txt")
print(f"Space used: {cache.space_used()}")  # Same!

# Delete one reference
cache.delete("file1.txt")
print(f"Space used: {cache.space_used()}")  # Still same (other refs exist)

# Delete all references - content removed
cache.delete("file2.txt")
cache.delete("file3.txt")
print(f"Space used: {cache.space_used()}")  # 0`
  },
]
