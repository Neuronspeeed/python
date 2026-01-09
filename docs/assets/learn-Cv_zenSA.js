const e=[{id:`twoPointers`,name:`Two Pointers`,color:`var(--accent-two-pointers)`,algorithms:[{id:`container-with-most-water`,name:`Container With Most Water`,category:`twoPointers`,difficulty:`Medium`,leetcodeId:11,description:`Each number in \`heights\` is a vertical bar. Choose two bars as the walls of a water tank. Find the pair that holds the most water.

**Capacity** = distance between walls × height of the shorter wall (water spills over the lower edge).`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`heights = [3, 4, 1, 2, 2, 4, 1, 3, 2]`,output:`21`,explanation:`Walls at indices 0 and 7 (both height 3): width=7, height=3, area=21`},{input:`heights = [1, 2, 1]`,output:`2`,explanation:`Walls at indices 0 and 2: width=2, height=min(1,1)=1, area=2`}],education:{tldr:`Widest first, then shrink by moving the shorter side.`,steps:[{title:`Initialize`,description:`Place pointers at opposite ends`,code:`left=0, right=len-1`},{title:`Compute`,description:`Area = distance × smaller height`,code:`area = (R-L) × min(h[L], h[R])`},{title:`Decide`,description:`Shorter wall blocks us—move that one`,code:`if h[L] < h[R]: L++ else R--`},{title:`Record`,description:`Update best if current beats it`,code:`best = max(best, area)`}],remember:[`Shorter wall = bottleneck`,`area = gap × min(walls)`,`Linear time, constant space`],understanding:`Think of each array value as a vertical bar. Pick any two bars as walls of a tank. The goal: find which pair holds the most water.

**How do we measure capacity?**
- **Gap**: Distance between the walls (\`right - left\`)
- **Limit**: The shorter wall determines max water level

**Why does the short wall matter?** Water rises until it spills over the lower edge. A 10-unit wall paired with a 3-unit wall? You only get 3 units of height—the rest overflows.

**Formula**: \`capacity = gap × min(wall_left, wall_right)\``,whyPatternWorks:`Two-pointer usually implies sorted data, but that's not the real requirement. The technique works when we can **rule out options** based on pointer positions.

Here, sorting doesn't help—but starting at maximum width does. From the edges, we ask: "Can narrowing improve things?"

**The key observation**: If the left wall is shorter, every narrower container using that same left wall will be worse (less width, same height cap). So we abandon that wall and try the next one.

This lets us skip checking \`O(n²)\` pairs by eliminating groups at once.`,explanation:`Each iteration either finds a better container or proves a batch of containers can't win.

**The decision rule**: Look at your current pair. The shorter wall caps your height. Moving the taller wall inward means less width but identical height limit—guaranteed loss or tie. Moving the shorter wall might find something taller to compensate for lost width.

**Why it's correct**: When we move past the shorter wall, we're discarding all pairs that included it. None of those could beat our current best because they'd have the same height constraint but less width.

One pass through the array. Every pair that matters gets considered. Every pair that doesn't gets skipped with proof.`,keyInsights:[`Begin at maximum width (both ends)`,`Capacity = gap × shorter wall`,`The short wall is always the limiting factor`,`Moving the tall wall cannot help (same limit, less space)`,`Each step eliminates multiple inferior pairs`,`Works on unsorted data—logic is about elimination, not order`]},code:`def maxArea(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0

    while left < right:
        width = right - left
        h = min(height[left], height[right])
        area = width * h
        max_water = max(max_water, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water`,inputs:[{name:`height`,type:`array`,default:[3,4,1,2,2,4,1,3,2],label:`Heights`,placeholder:`3, 4, 1, 2, 2, 4, 1, 3, 2`}],generateSteps:e=>{let t=e.height,n=[],r=0,i=t.length-1,a=0;for(n.push({lineNumber:2,description:`Initialize pointers: left = 0, right = ${i}`,elements:[{type:`pointer`,id:`left`,index:0,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`heights`,values:t,showBars:!0}],variables:{left:0,right:i,max_water:0}});r<i;){let e=i-r,o=Math.min(t[r],t[i]),s=e*o;n.push({lineNumber:6,description:`Calculate: width = ${e}, height = min(${t[r]}, ${t[i]}) = ${o}`,elements:[{type:`pointer`,id:`left`,index:r,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`heights`,values:t,showBars:!0,highlights:[{index:r,style:`active`},{index:i,style:`active`}]},{type:`bracket`,id:`area`,left:r,right:i,value:`area = ${s}`}],variables:{left:r,right:i,width:e,h:o,area:s,max_water:a}});let c=a;a=Math.max(a,s),n.push({lineNumber:9,description:`Update max_water = max(${c}, ${s}) = ${a}`,elements:[{type:`pointer`,id:`left`,index:r,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`heights`,values:t,showBars:!0,highlights:[{index:r,style:`active`},{index:i,style:`active`}]}],variables:{left:r,right:i,max_water:a}}),t[r]<t[i]?(n.push({lineNumber:11,description:`height[${r}] = ${t[r]} < height[${i}] = ${t[i]}, move left pointer`,elements:[{type:`pointer`,id:`left`,index:r,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`heights`,values:t,showBars:!0,highlights:[{index:r,style:`comparing`}]}],variables:{left:r,right:i,max_water:a}}),r++):(n.push({lineNumber:13,description:`height[${r}] = ${t[r]} >= height[${i}] = ${t[i]}, move right pointer`,elements:[{type:`pointer`,id:`left`,index:r,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`heights`,values:t,showBars:!0,highlights:[{index:i,style:`comparing`}]}],variables:{left:r,right:i,max_water:a}}),i--)}return n.push({lineNumber:15,description:`Pointers crossed! Maximum water found: ${a}`,elements:[{type:`array`,id:`heights`,values:t,showBars:!0}],variables:{max_water:a},isComplete:!0}),n}},{id:`two-sum-sorted`,name:`Two Sum II (Sorted Array)`,category:`twoPointers`,difficulty:`Medium`,leetcodeId:167,description:`Find two numbers in a sorted array that add up to a target sum.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`numbers = [2, 7, 11, 15], target = 9`,output:`[1, 2]`,explanation:`numbers[0] + numbers[1] = 2 + 7 = 9. Return indices [1, 2] (1-indexed).`},{input:`numbers = [2, 3, 4], target = 6`,output:`[1, 3]`,explanation:`numbers[0] + numbers[2] = 2 + 4 = 6.`}],education:{tldr:`Use sorted order: sum too small? move left. Sum too big? move right.`,steps:[{title:`Start at ends`,description:`Pointers at first and last element`,code:`left=0, right=len-1`},{title:`Check sum`,description:`Add the two pointer values`,code:`sum = nums[L] + nums[R]`},{title:`Adjust pointers`,description:`Too small → move left up. Too big → move right down`,code:`if sum < target: L++ else: R--`},{title:`Found it!`,description:`When sum equals target, return indices`,code:`if sum == target: return [L, R]`}],remember:[`Array MUST be sorted`,`Too small → move left up (get bigger number)`,`Too big → move right down (get smaller number)`],understanding:`This is the classic introduction to two pointers. Given a **sorted** array, find two numbers that add up to a target.

**Why sorted matters:** In a sorted array, we know that moving left→right increases values, and moving right→left decreases them. This gives us a decision rule: if our current sum is too small, we need a bigger number (move left pointer right). If it's too big, we need a smaller number (move right pointer left).

**Why start at the ends?** Starting at opposite ends gives us the maximum range to work with. We can systematically eliminate possibilities by narrowing inward.`,whyPatternWorks:`The sorted property is what makes this O(n) instead of O(n²). Without sorting, we'd have to check every pair.

With sorting, each pointer movement eliminates an entire row or column of possibilities:
- Moving left pointer right eliminates all pairs involving the current left position
- Moving right pointer left eliminates all pairs involving the current right position

We never backtrack, so we visit at most n positions total.`,keyInsights:[`Sorting enables intelligent elimination of possibilities`,`Each step eliminates many pairs at once`,`Two pointers from opposite ends converge toward the answer`,`The decision (left++ or right--) is deterministic based on comparison`,`Never need to backtrack—each move is provably correct`]},code:`def twoSum(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]

        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return []`,inputs:[{name:`numbers`,type:`array`,default:[2,7,11,15],label:`Sorted Array`,placeholder:`2, 7, 11, 15`},{name:`target`,type:`number`,default:9,label:`Target`,placeholder:`9`}],generateSteps:e=>{let t=e.numbers,n=e.target,r=[],i=0,a=t.length-1;for(r.push({lineNumber:2,description:`Initialize pointers: left = 0, right = ${a}. Target = ${n}`,elements:[{type:`pointer`,id:`left`,index:0,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t}],variables:{left:0,right:a,target:n}});i<a;){let e=t[i]+t[a];if(r.push({lineNumber:5,description:`Calculate sum: ${t[i]} + ${t[a]} = ${e}`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:i,style:`active`},{index:a,style:`active`}]},{type:`bracket`,id:`sum`,left:i,right:a,value:`sum = ${e}`}],variables:{left:i,right:a,current_sum:e,target:n}}),e===n)return r.push({lineNumber:8,description:`Found! ${t[i]} + ${t[a]} = ${n}. Return [${i+1}, ${a+1}]`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:i,style:`found`},{index:a,style:`found`}]}],variables:{result:[i+1,a+1]},isComplete:!0}),r;e<n?(r.push({lineNumber:10,description:`Sum ${e} < target ${n}, need larger sum. Move left pointer right.`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:i,style:`comparing`}]}],variables:{left:i,right:a,current_sum:e}}),i++):(r.push({lineNumber:12,description:`Sum ${e} > target ${n}, need smaller sum. Move right pointer left.`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:a,style:`comparing`}]}],variables:{left:i,right:a,current_sum:e}}),a--)}return r.push({lineNumber:14,description:`No pair found that sums to target.`,elements:[{type:`array`,id:`nums`,values:t}],variables:{result:[]},isComplete:!0}),r}},{id:`move-zeroes`,name:`Move Zeroes`,category:`twoPointers`,difficulty:`Easy`,leetcodeId:283,description:`Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`nums = [0, 1, 0, 3, 12]`,output:`[1, 3, 12, 0, 0]`,explanation:`Non-zero elements (1, 3, 12) shift left, zeros migrate right, preserving original order.`},{input:`nums = [0]`,output:`[0]`,explanation:`Single zero stays in place.`}],education:{tldr:`Write pointer marks where next non-zero goes. Swap non-zeros forward, zeros bubble to end.`,steps:[{title:`Set write pointer`,description:`Tracks position for next non-zero`,code:`write = 0`},{title:`Scan with read`,description:`Check each element left to right`,code:`for read in range(n)`},{title:`Non-zero? Swap!`,description:`Swap to write position, advance write`,code:`if nums[read] != 0: swap, write++`},{title:`Zero? Skip`,description:`Zeros get pushed right automatically`,code:`zeros bubble to end`}],remember:[`Write pointer = next non-zero destination`,`Only swap when you find non-zero`,`Zeros naturally end up at the end`],understanding:`This is the "reader-writer" or "slow-fast" two-pointer pattern. We have two pointers moving in the same direction:

**Read pointer:** Scans through every element looking for non-zeros
**Write pointer:** Marks where the next non-zero should go

When we find a non-zero, we swap it to the write position. This pushes any zero that was at the write position forward. After processing all elements, all zeros have bubbled to the end.

**Why does order get preserved?** We process elements left-to-right and place non-zeros in the order we find them. We never skip or reorder non-zero elements.`,whyPatternWorks:`The reader-writer pattern is perfect for in-place filtering or partitioning:

1. **Reader finds candidates** (non-zeros in this case)
2. **Writer places them in correct position**
3. **Unwanted elements (zeros) naturally fill remaining space**

The invariant: everything before write pointer is correctly placed (non-zero), everything after is pending processing.`,keyInsights:[`Same-direction two pointers for in-place partitioning`,`Write pointer always <= read pointer`,`Swap operation is O(1) and maintains order`,`Works because we never need to look backwards`,`Pattern generalizes to any "move X to end" problem`]},code:`def moveZeroes(nums: list[int]) -> None:
    write_idx = 0

    for read_idx in range(len(nums)):
        if nums[read_idx] != 0:
            nums[write_idx], nums[read_idx] = nums[read_idx], nums[write_idx]
            write_idx += 1`,inputs:[{name:`nums`,type:`array`,default:[0,1,0,3,12],label:`Array`,placeholder:`0, 1, 0, 3, 12`}],generateSteps:e=>{let t=[...e.nums],n=[],r=0;n.push({lineNumber:2,description:`Initialize write_idx = 0. This marks where the next non-zero should go.`,elements:[{type:`pointer`,id:`write`,index:0,label:`W`,color:`#16A34A`},{type:`array`,id:`nums`,values:[...t]}],variables:{write_idx:0}});for(let e=0;e<t.length;e++)n.push({lineNumber:4,description:`Check nums[${e}] = ${t[e]}${t[e]===0?` (zero, skip)`:` (non-zero!)`}`,elements:[{type:`pointer`,id:`write`,index:r,label:`W`,color:`#16A34A`},{type:`pointer`,id:`read`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t],highlights:[{index:e,style:t[e]===0?`inactive`:`active`}]}],variables:{write_idx:r,read_idx:e}}),t[e]!==0&&(r===e?n.push({lineNumber:6,description:`write_idx == read_idx (${r}), element ${t[e]} already in place - no swap needed`,elements:[{type:`pointer`,id:`write`,index:r,label:`W`,color:`#16A34A`},{type:`pointer`,id:`read`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t],highlights:[{index:e,style:`found`}]}],variables:{write_idx:r,read_idx:e}}):(n.push({lineNumber:6,description:`Swap nums[${r}] and nums[${e}]: ${t[r]} <-> ${t[e]}`,elements:[{type:`pointer`,id:`write`,index:r,label:`W`,color:`#16A34A`},{type:`pointer`,id:`read`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t],highlights:[{index:r,style:`swapped`},{index:e,style:`swapped`}]}],variables:{write_idx:r,read_idx:e}}),[t[r],t[e]]=[t[e],t[r]],n.push({lineNumber:6,description:`After swap: array = [${t.join(`, `)}]`,elements:[{type:`pointer`,id:`write`,index:r,label:`W`,color:`#16A34A`},{type:`pointer`,id:`read`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t],highlights:[{index:r,style:`found`}]}],variables:{write_idx:r,read_idx:e}})),r++,n.push({lineNumber:7,description:`Increment write_idx to ${r}`,elements:[...r<t.length?[{type:`pointer`,id:`write`,index:r,label:`W`,color:`#16A34A`}]:[],{type:`pointer`,id:`read`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t]}],variables:{write_idx:r,read_idx:e}}));return n.push({lineNumber:7,description:`Done! All zeroes moved to end: [${t.join(`, `)}]`,elements:[{type:`array`,id:`nums`,values:[...t],highlights:t.map((e,t)=>({index:t,style:e===0?`inactive`:`found`}))}],variables:{result:t},isComplete:!0}),n}},{id:`three-sum`,name:`3Sum`,category:`twoPointers`,difficulty:`Medium`,leetcodeId:15,description:`Find all unique triplets in the array that sum to zero.`,timeComplexity:`O(n²)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`nums = [-1, 0, 1, 2, -1, -4]`,output:`[[-1, -1, 2], [-1, 0, 1]]`,explanation:`After sorting: [-4, -1, -1, 0, 1, 2]. Two unique triplets sum to zero.`},{input:`nums = [0, 1, 1]`,output:`[]`,explanation:`No three numbers sum to zero.`},{input:`nums = [0, 0, 0]`,output:`[[0, 0, 0]]`,explanation:`Three zeros sum to zero.`}],education:{tldr:`Sort, fix one number, use two pointers to find pairs that sum to its negative.`,steps:[{title:`Sort array`,description:`Enables two-pointer technique`,code:`nums.sort()`},{title:`Fix first number`,description:`Loop through as anchor point`,code:`for i in range(n-2)`},{title:`Two-pointer search`,description:`Find pairs summing to -nums[i]`,code:`left=i+1, right=n-1`},{title:`Skip duplicates`,description:`Avoid duplicate triplets`,code:`if nums[i] == nums[i-1]: continue`}],remember:[`Sort first, fix one, two-pointer the rest`,`Skip duplicates at ALL levels (i, left, right)`,`Target for inner search = -nums[i]`],understanding:`3Sum reduces to multiple 2Sum problems. For each number nums[i], we need to find two other numbers that sum to -nums[i].

**Why sort?** Sorting enables:
1. Two-pointer technique for the inner search (O(n) instead of O(n²))
2. Easy duplicate detection (duplicates are adjacent)

**Why skip duplicates?** The problem asks for unique triplets. After sorting, if nums[i] == nums[i-1], we'd find the same triplets again.

**Early termination:** If nums[i] > 0, we can stop—three positive numbers can't sum to zero.`,whyPatternWorks:`3Sum demonstrates how to decompose a harder problem into a known pattern:

1. **Reduce complexity:** O(n³) brute force → O(n²) with sorting + two pointers
2. **Anchor + Search:** Fix one variable, solve a simpler subproblem
3. **Duplicate handling:** Sorting clusters duplicates together

This "fix one, search for complement" pattern appears in many sum problems (4Sum, kSum, etc.).`,keyInsights:[`3Sum = loop + 2Sum for each element`,`Sorting is O(n log n), dominated by O(n²) search`,`Must skip duplicates at outer loop AND inner pointers`,`Early exit when nums[i] > 0 (no positive-only triplet sums to 0)`,`Space is O(1) excluding output array`]},code:`def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        # Skip duplicates for first element
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left, right = i + 1, len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicates
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1

    return result`,inputs:[{name:`nums`,type:`array`,default:[-1,0,1,2,-1,-4],label:`Numbers`,placeholder:`-1, 0, 1, 2, -1, -4`}],generateSteps:e=>{let t=[...e.nums].sort((e,t)=>e-t),n=[],r=[];n.push({lineNumber:2,description:`Sort array: [${t.join(`, `)}]`,elements:[{type:`array`,id:`nums`,values:t}],variables:{sorted:t,result:[]}});for(let e=0;e<t.length-2;e++){if(e>0&&t[e]===t[e-1]){n.push({lineNumber:7,description:`Skip duplicate: nums[${e}] = ${t[e]} equals previous`,elements:[{type:`pointer`,id:`i`,index:e,label:`i`,color:`#EF4444`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`comparing`},{index:e-1,style:`comparing`}]}],variables:{i:e,skipped:!0}});continue}let i=e+1,a=t.length-1;for(n.push({lineNumber:10,description:`Fix nums[${e}] = ${t[e]}, set left = ${i}, right = ${a}`,elements:[{type:`pointer`,id:`i`,index:e,label:`i`,color:`#EF4444`},{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`active`}]}],variables:{i:e,left:i,right:a,target:-t[e]}});i<a;){let o=t[e]+t[i]+t[a];if(n.push({lineNumber:13,description:`Sum: ${t[e]} + ${t[i]} + ${t[a]} = ${o}`,elements:[{type:`pointer`,id:`i`,index:e,label:`i`,color:`#EF4444`},{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`active`},{index:i,style:`active`},{index:a,style:`active`}]}],variables:{i:e,left:i,right:a,total:o,resultCount:r.length}}),o<0)n.push({lineNumber:16,description:`Sum ${o} < 0, move left pointer right`,elements:[{type:`pointer`,id:`i`,index:e,label:`i`,color:`#EF4444`},{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:i,style:`comparing`}]}],variables:{total:o,action:`left++`}}),i++;else if(o>0)n.push({lineNumber:18,description:`Sum ${o} > 0, move right pointer left`,elements:[{type:`pointer`,id:`i`,index:e,label:`i`,color:`#EF4444`},{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:a,style:`comparing`}]}],variables:{total:o,action:`right--`}}),a--;else{for(r.push([t[e],t[i],t[a]]),n.push({lineNumber:20,description:`Found triplet! [${t[e]}, ${t[i]}, ${t[a]}]`,elements:[{type:`pointer`,id:`i`,index:e,label:`i`,color:`#EF4444`},{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`found`},{index:i,style:`found`},{index:a,style:`found`}]}],variables:{triplet:`[${t[e]}, ${t[i]}, ${t[a]}]`,resultCount:r.length}});i<a&&t[i]===t[i+1];)i++;for(;i<a&&t[a]===t[a-1];)a--;i++,a--}if(n.length>50)break}if(n.length>50)break}return n.push({lineNumber:28,description:`Complete! Found ${r.length} triplets`,elements:[{type:`array`,id:`nums`,values:t}],variables:{resultCount:r.length},isComplete:!0}),n}},{id:`valid-triangle-number`,name:`Valid Triangle Number`,category:`twoPointers`,difficulty:`Medium`,leetcodeId:611,description:`Given an array of integers, count how many triplets can form valid triangles.`,timeComplexity:`O(n²)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`nums = [2, 2, 3, 4]`,output:`3`,explanation:`Valid triangles: (2,3,4), (2,2,3), (2,2,4). Each satisfies a + b > c.`},{input:`nums = [4, 2, 3, 4]`,output:`4`,explanation:`After sorting [2,3,4,4]: four valid triplet combinations.`}],education:{tldr:`Sort, fix largest side, use two pointers to count pairs where a + b > c.`,steps:[{title:`Sort array`,description:`Enables triangle inequality shortcut`,code:`nums.sort()`},{title:`Fix largest (c)`,description:`Iterate from end backward`,code:`for k in range(n-1, 1, -1)`},{title:`Two-pointer pairs`,description:`Find all (a,b) where a + b > c`,code:`left=0, right=k-1`},{title:`Count valid pairs`,description:`If valid, all pairs in range work`,code:`count += right - left`}],remember:[`Triangle inequality: a + b > c (when sorted)`,`Fix the LARGEST side, search for smaller pairs`,`When valid: ALL pairs between pointers work`],understanding:`A valid triangle requires: sum of any two sides > third side. But if we sort so a ≤ b ≤ c, we only need to check **a + b > c**. The other inequalities (a + c > b, b + c > a) are automatically true.

**Why fix the largest side?** When we fix c as the largest, we search for pairs (a, b) where a + b > c. If nums[left] + nums[right] > c, then ALL pairs from left to right-1 also satisfy this (since they have even larger left values).

**The counting trick:** When a + b > c, we don't check each pair individually. We know there are (right - left) valid pairs. Then we move right down to find more.`,whyPatternWorks:`This combines two powerful techniques:

1. **Triangle inequality simplification:** Sorting reduces 3 conditions to 1
2. **Batch counting:** When the inequality holds, we count multiple pairs at once

The key insight: if nums[left] + nums[right] > nums[k], then for any i in [left, right-1], nums[i] + nums[right] > nums[k] too (since nums[i] >= nums[left]).`,keyInsights:[`Sort to simplify: only check a + b > c`,`Fix largest side, search for valid smaller pairs`,`When inequality holds, count ALL pairs in range`,`Move right down after counting (to find more pairs)`,`Move left up when inequality fails (need larger sum)`]},code:`def triangleNumber(nums: list[int]) -> int:
    nums.sort()
    count = 0
    n = len(nums)

    # Fix the largest side (c)
    for k in range(n - 1, 1, -1):
        left, right = 0, k - 1

        while left < right:
            if nums[left] + nums[right] > nums[k]:
                # All pairs from left to right-1 are valid
                count += right - left
                right -= 1
            else:
                left += 1

    return count`,inputs:[{name:`nums`,type:`array`,default:[2,2,3,4],label:`Side Lengths`,placeholder:`2, 2, 3, 4`}],generateSteps:e=>{let t=[...e.nums].sort((e,t)=>e-t),n=[],r=0,i=t.length;n.push({lineNumber:2,description:`Sort array: [${t.join(`, `)}]`,elements:[{type:`array`,id:`nums`,values:t}],variables:{sorted:t,count:0}});for(let e=i-1;e>1;e--){let i=0,a=e-1;for(n.push({lineNumber:7,description:`Fix largest side: nums[${e}] = ${t[e]}. Two pointers: left = 0, right = ${a}`,elements:[{type:`pointer`,id:`k`,index:e,label:`c`,color:`#EF4444`},{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`active`}]}],variables:{k:e,left:i,right:a,count:r}});i<a;){let o=t[i]+t[a],s=o>t[e];if(n.push({lineNumber:10,description:`Check: ${t[i]} + ${t[a]} = ${o} ${s?`>`:`≤`} ${t[e]}`,elements:[{type:`pointer`,id:`k`,index:e,label:`c`,color:`#EF4444`},{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:i,style:s?`found`:`comparing`},{index:a,style:s?`found`:`comparing`},{index:e,style:`active`}]}],variables:{sum:o,isValid:s,count:r}}),s){let o=a-i;r+=o,n.push({lineNumber:12,description:`Valid! Add ${o} triangles (all pairs from L to R-1). Total: ${r}`,elements:[{type:`pointer`,id:`k`,index:e,label:`c`,color:`#EF4444`},{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t}],variables:{added:o,count:r}}),a--}else i++;if(n.length>35)break}if(n.length>35)break}return n.push({lineNumber:17,description:`Complete! Total valid triangles: ${r}`,elements:[{type:`array`,id:`nums`,values:t}],variables:{count:r},isComplete:!0}),n}},{id:`sort-colors`,name:`Sort Colors (Dutch Flag)`,category:`twoPointers`,difficulty:`Medium`,leetcodeId:75,description:`Sort an array with values 0, 1, and 2 in-place using three pointers.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`nums = [2, 0, 2, 1, 1, 0]`,output:`[0, 0, 1, 1, 2, 2]`,explanation:`Dutch National Flag: partition into three regions [0s | 1s | 2s].`},{input:`nums = [2, 0, 1]`,output:`[0, 1, 2]`,explanation:`Each color appears once, sorted in one pass.`}],education:{tldr:`Three pointers partition into three zones: 0s on left, 2s on right, 1s in middle.`,steps:[{title:`Set boundaries`,description:`low=0 (0s boundary), mid=0 (scanner), high=n-1 (2s boundary)`,code:`low=mid=0, high=n-1`},{title:`See 0?`,description:`Swap to low region, advance both`,code:`swap(mid,low), low++, mid++`},{title:`See 1?`,description:`Already in place, just advance mid`,code:`mid++`},{title:`See 2?`,description:`Swap to high region, shrink high only`,code:`swap(mid,high), high--`}],remember:[`0 goes LEFT (swap with low)`,`1 stays MIDDLE (just advance)`,`2 goes RIGHT (swap with high, don't advance mid!)`],understanding:`This is the Dutch National Flag problem, designed by Dijkstra. We partition into three regions:

**Region structure:**
- [0, low): all 0s (sorted)
- [low, mid): all 1s (sorted)
- [mid, high]: unknown (being processed)
- (high, n): all 2s (sorted)

**Why not advance mid when swapping with high?** When we swap with high, we bring an unknown value to mid position. We need to check it before moving on. When we swap with low, we bring a 1 (already processed) to mid, so we can safely advance.

**Why three pointers?** Two pointers can only partition into two regions. Three pointers enable three-way partitioning in a single pass.`,whyPatternWorks:`The Dutch National Flag is a special case of three-way partitioning:

1. **Single pass:** We process each element exactly once
2. **In-place:** O(1) extra space
3. **Stable for 0s and 2s:** They end up in correct relative order

This pattern applies whenever you need to partition into exactly three groups by a single criterion.`,keyInsights:[`Three pointers for three-way partition`,`mid scans, low/high are region boundaries`,`Don't advance mid after swap with high (check swapped value)`,`Loop ends when mid > high (unknown region empty)`,`Dutch National Flag = Dijkstra's algorithm`]},code:`def sortColors(nums: list[int]) -> None:
    low, mid, high = 0, 0, len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

    # Array is now sorted: [0,0,0,1,1,1,2,2,2]`,inputs:[{name:`nums`,type:`array`,default:[2,0,2,1,1,0],label:`Colors (0, 1, 2)`,placeholder:`2, 0, 2, 1, 1, 0`}],generateSteps:e=>{let t=[...e.nums],n=[],r=0,i=0,a=t.length-1;for(n.push({lineNumber:2,description:`Initialize: low = 0, mid = 0, high = ${a}`,elements:[{type:`pointer`,id:`low`,index:0,label:`low`,color:`#EF4444`},{type:`pointer`,id:`mid`,index:0,label:`mid`,color:`#FBBF24`},{type:`pointer`,id:`high`,index:a,label:`high`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t]}],variables:{low:0,mid:0,high:a}});i<=a&&(t[i]===0?(n.push({lineNumber:5,description:`nums[mid] = 0 (red), swap with low position`,elements:[{type:`pointer`,id:`low`,index:r,label:`low`,color:`#EF4444`},{type:`pointer`,id:`mid`,index:i,label:`mid`,color:`#FBBF24`},{type:`pointer`,id:`high`,index:a,label:`high`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t],highlights:[{index:r,style:`comparing`},{index:i,style:`comparing`}]}],variables:{low:r,mid:i,high:a,action:`swap with low`}}),[t[r],t[i]]=[t[i],t[r]],r++,i++,n.push({lineNumber:8,description:`After swap: low = ${r}, mid = ${i}`,elements:[{type:`pointer`,id:`low`,index:r,label:`low`,color:`#EF4444`},{type:`pointer`,id:`mid`,index:i,label:`mid`,color:`#FBBF24`},{type:`pointer`,id:`high`,index:a,label:`high`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t],highlights:[{index:r-1,style:`found`}]}],variables:{low:r,mid:i,high:a}})):t[i]===1?(n.push({lineNumber:9,description:`nums[mid] = 1 (white), already in place, move mid`,elements:[{type:`pointer`,id:`low`,index:r,label:`low`,color:`#EF4444`},{type:`pointer`,id:`mid`,index:i,label:`mid`,color:`#FBBF24`},{type:`pointer`,id:`high`,index:a,label:`high`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t],highlights:[{index:i,style:`active`}]}],variables:{low:r,mid:i,high:a,action:`mid++`}}),i++):(n.push({lineNumber:11,description:`nums[mid] = 2 (blue), swap with high position`,elements:[{type:`pointer`,id:`low`,index:r,label:`low`,color:`#EF4444`},{type:`pointer`,id:`mid`,index:i,label:`mid`,color:`#FBBF24`},{type:`pointer`,id:`high`,index:a,label:`high`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t],highlights:[{index:i,style:`comparing`},{index:a,style:`comparing`}]}],variables:{low:r,mid:i,high:a,action:`swap with high`}}),[t[i],t[a]]=[t[a],t[i]],a--,n.push({lineNumber:13,description:`After swap: high = ${a} (don't move mid, check swapped value)`,elements:[{type:`pointer`,id:`low`,index:r,label:`low`,color:`#EF4444`},{type:`pointer`,id:`mid`,index:i,label:`mid`,color:`#FBBF24`},{type:`pointer`,id:`high`,index:a,label:`high`,color:`#3B82F6`},{type:`array`,id:`nums`,values:[...t],highlights:[{index:a+1,style:`found`}]}],variables:{low:r,mid:i,high:a}})),!(n.length>40)););return n.push({lineNumber:15,description:`Complete! Array sorted: [${t.join(`, `)}]`,elements:[{type:`array`,id:`nums`,values:t,highlights:t.map((e,t)=>({index:t,style:`found`}))}],variables:{result:t},isComplete:!0}),n}},{id:`trapping-rain-water`,name:`Trapping Rain Water`,category:`twoPointers`,difficulty:`Hard`,leetcodeId:42,description:`Calculate how much water can be trapped between bars after raining.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`,output:`6`,explanation:`Water fills the valleys between bars. Total trapped = 6 units.`},{input:`height = [4, 2, 0, 3, 2, 5]`,output:`9`,explanation:`Deep valley between heights 4 and 5 traps significant water.`}],education:{tldr:`Water at any position = min(max_left, max_right) - height. Use two pointers to track maxes.`,steps:[{title:`Start at ends`,description:`Pointers at first and last position`,code:`left=0, right=n-1`},{title:`Track maxes`,description:`Keep running max from each side`,code:`left_max, right_max`},{title:`Process shorter side`,description:`Water level bounded by shorter max`,code:`if left_max < right_max: process left`},{title:`Add water`,description:`Water at position = max - height`,code:`water += max - height[i]`}],remember:[`Water level = min(left_max, right_max)`,`Process the side with smaller max`,`Water at position = level - bar height`],understanding:`At each bar, water can rise to the level of the shorter of the two tallest bars on either side. Any higher and it would overflow.

**The insight:** If left_max < right_max, we know water at left position is bounded by left_max (regardless of what's between current positions). We can safely calculate water there and move on.

**Why process the shorter side?** Whichever side has the smaller max determines the water level at that position. The other side's max doesn't matter—water would overflow at the smaller level.

**Why O(1) space?** We only need to track left_max and right_max, not store all maxes.`,whyPatternWorks:`This is a beautiful example of using two pointers to replace preprocessing:

**Naive approach:** Precompute left_max[] and right_max[] arrays (O(n) space)
**Two-pointer approach:** Compute maxes on-the-fly using convergent pointers

The key insight: when left_max < right_max, we don't need to know the exact right_max—we just need to know it's larger. This lets us process left position immediately.`,keyInsights:[`Water at any bar = min(tallest_left, tallest_right) - bar_height`,`Process whichever side has smaller max (that max determines water level)`,`Running maxes replace O(n) preprocessing`,`Converging pointers eliminate need to look ahead`,`Classic optimization from O(n) space to O(1)`]},code:`def trap(height: list[int]) -> int:
    if not height:
        return 0

    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0

    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]

    return water`,inputs:[{name:`height`,type:`array`,default:[0,1,0,2,1,0,1,3,2,1,2,1],label:`Heights`,placeholder:`0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1`}],generateSteps:e=>{let t=e.height,n=[];if(!t.length)return n.push({lineNumber:3,description:`Empty array, return 0`,elements:[],variables:{water:0},isComplete:!0}),n;let r=0,i=t.length-1,a=t[r],o=t[i],s=0;for(n.push({lineNumber:6,description:`Initialize: left = 0, right = ${i}, left_max = ${a}, right_max = ${o}`,elements:[{type:`pointer`,id:`left`,index:0,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`heights`,values:t}],variables:{left:0,right:i,left_max:a,right_max:o,water:0}});r<i;){if(a<o){r++,a=Math.max(a,t[r]);let e=a-t[r];s+=e,n.push({lineNumber:12,description:`left_max (${a}) < right_max (${o}): move left. Water at [${r}] = ${a} - ${t[r]} = ${e}`,elements:[{type:`pointer`,id:`left`,index:r,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`heights`,values:t,highlights:[{index:r,style:e>0?`found`:`active`}]}],variables:{left:r,right:i,left_max:a,right_max:o,water:s,trapped:e}})}else{i--,o=Math.max(o,t[i]);let e=o-t[i];s+=e,n.push({lineNumber:16,description:`left_max (${a}) >= right_max (${o}): move right. Water at [${i}] = ${o} - ${t[i]} = ${e}`,elements:[{type:`pointer`,id:`left`,index:r,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`heights`,values:t,highlights:[{index:i,style:e>0?`found`:`active`}]}],variables:{left:r,right:i,left_max:a,right_max:o,water:s,trapped:e}})}if(n.length>40)break}return n.push({lineNumber:19,description:`Complete! Total water trapped: ${s} units`,elements:[{type:`array`,id:`heights`,values:t}],variables:{water:s},isComplete:!0}),n}}]},{id:`binarySearch`,name:`Binary Search`,color:`var(--accent-binary-search)`,algorithms:[{id:`search-rotated-array`,name:`Search in Rotated Sorted Array`,category:`binarySearch`,difficulty:`Medium`,leetcodeId:33,description:`Search for a target value in a rotated sorted array. Return the index if found, otherwise -1.`,timeComplexity:`O(log n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`nums = [4,5,6,7,0,1,2], target = 0`,output:`4`,explanation:`Array rotated at index 4. Target 0 is at index 4.`},{input:`nums = [4,5,6,7,0,1,2], target = 3`,output:`-1`,explanation:`3 is not in the array.`},{input:`nums = [1], target = 0`,output:`-1`,explanation:`Single element, not the target.`}],education:{tldr:`One half is always sorted. Check if target is in sorted half, else search other half.`,steps:[{title:`Find mid`,description:`Standard binary search start`,code:`mid = (left + right) // 2`},{title:`Which half sorted?`,description:`Compare nums[left] to nums[mid]`,code:`if nums[left] <= nums[mid]: left sorted`},{title:`Target in sorted half?`,description:`Easy range check`,code:`if nums[left] <= target < nums[mid]`},{title:`Decide direction`,description:`Narrow search accordingly`,code:`adjust left or right`}],remember:[`One half is ALWAYS sorted`,`Check sorted half first`,`Use sorted half for range check`],understanding:`In a rotated sorted array, ONE HALF is always sorted.

**Key insight:** At any mid point, either [left..mid] or [mid..right] is sorted. We can easily check if target is in the sorted half using a simple range comparison.

**The algorithm:**
1. Find which half is sorted (compare nums[left] vs nums[mid])
2. Check if target is in sorted half (simple range check)
3. If yes, search sorted half. If no, search other half.

**Why it works:** The sorted half gives us a reliable range check. The unsorted half contains the rotation point.`,whyPatternWorks:`The rotation creates two sorted segments:

\`\`\`
[4, 5, 6, 7, 0, 1, 2]
 ↑        ↑
sorted   sorted (but lower values)
\`\`\`

At mid=7:
- Left half [4,5,6,7] is sorted (nums[left] <= nums[mid])
- We can check: is target in [4,7]?
- If yes, search left. If no, search right.

At mid=0:
- Right half [0,1,2] is sorted (nums[left] > nums[mid])
- We can check: is target in (0,2]?
- If yes, search right. If no, search left.`,keyInsights:[`One half always sorted after rotation`,`Identify sorted half: nums[left] <= nums[mid]`,`Range check works only on sorted half`,`O(log n) maintained despite rotation`,`Handle edge case: left == mid (single element half)`]},code:`def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,inputs:[{name:`nums`,type:`array`,default:[4,5,6,7,0,1,2],label:`Rotated Array`,placeholder:`4, 5, 6, 7, 0, 1, 2`},{name:`target`,type:`number`,default:0,label:`Target`,placeholder:`0`}],generateSteps:e=>{let t=e.nums,n=e.target,r=[],i=0,a=t.length-1;for(r.push({lineNumber:2,description:`Initialize: left = 0, right = ${a}. Searching for target = ${n}`,elements:[{type:`pointer`,id:`left`,index:0,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t}],variables:{left:0,right:a,target:n}});i<=a;){let e=Math.floor((i+a)/2);if(r.push({lineNumber:5,description:`Calculate mid = (${i} + ${a}) // 2 = ${e}. nums[mid] = ${t[e]}`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`mid`,index:e,label:`M`,color:`#D97757`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`active`}]}],variables:{left:i,mid:e,right:a,"nums[mid]":t[e]}}),t[e]===n)return r.push({lineNumber:8,description:`Found! nums[${e}] = ${t[e]} equals target ${n}. Return ${e}`,elements:[{type:`pointer`,id:`mid`,index:e,label:`M`,color:`#D97757`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`found`}]}],variables:{result:e},isComplete:!0}),r;t[i]<=t[e]?(r.push({lineNumber:10,description:`nums[${i}] = ${t[i]} <= nums[${e}] = ${t[e]}. Left half [${i}..${e}] is sorted.`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`mid`,index:e,label:`M`,color:`#D97757`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:Array.from({length:e-i+1},(e,t)=>({index:i+t,style:`visited`}))}],variables:{left:i,mid:e,right:a}}),t[i]<=n&&n<t[e]?(r.push({lineNumber:12,description:`Target ${n} is in sorted left half [${t[i]}..${t[e]}). Move right = mid - 1`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`mid`,index:e,label:`M`,color:`#D97757`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`comparing`}]}],variables:{left:i,right:e-1}}),a=e-1):(r.push({lineNumber:14,description:`Target ${n} is NOT in left half. Search right: left = mid + 1`,elements:[{type:`pointer`,id:`mid`,index:e,label:`M`,color:`#D97757`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`comparing`}]}],variables:{left:e+1,right:a}}),i=e+1)):(r.push({lineNumber:15,description:`nums[${i}] = ${t[i]} > nums[${e}] = ${t[e]}. Right half [${e}..${a}] is sorted.`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`mid`,index:e,label:`M`,color:`#D97757`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:Array.from({length:a-e+1},(t,n)=>({index:e+n,style:`visited`}))}],variables:{left:i,mid:e,right:a}}),t[e]<n&&n<=t[a]?(r.push({lineNumber:17,description:`Target ${n} is in sorted right half (${t[e]}..${t[a]}]. Move left = mid + 1`,elements:[{type:`pointer`,id:`mid`,index:e,label:`M`,color:`#D97757`},{type:`pointer`,id:`right`,index:a,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`comparing`}]}],variables:{left:e+1,right:a}}),i=e+1):(r.push({lineNumber:19,description:`Target ${n} is NOT in right half. Search left: right = mid - 1`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`mid`,index:e,label:`M`,color:`#D97757`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`comparing`}]}],variables:{left:i,right:e-1}}),a=e-1))}return r.push({lineNumber:21,description:`Search complete. Target ${n} not found. Return -1`,elements:[{type:`array`,id:`nums`,values:t}],variables:{result:-1},isComplete:!0}),r}},{id:`koko-eating-bananas`,name:`Koko Eating Bananas`,category:`binarySearch`,difficulty:`Medium`,leetcodeId:875,description:`Find the minimum eating speed k to finish all bananas within h hours.`,timeComplexity:`O(n log m)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`piles = [3,6,7,11], h = 8`,output:`4`,explanation:`At speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 hours. Perfect!`},{input:`piles = [30,11,23,4,20], h = 5`,output:`30`,explanation:`Only 5 hours for 5 piles—must eat one pile per hour. Need speed = max pile.`},{input:`piles = [30,11,23,4,20], h = 6`,output:`23`,explanation:`One extra hour allows splitting the 30-pile across 2 hours.`}],education:{tldr:`Binary search on the answer. Search speed k from 1 to max(piles).`,steps:[{title:`Define search space`,description:`Speed k can be 1 to max(piles)`,code:`left, right = 1, max(piles)`},{title:`Try middle speed`,description:`Calculate hours needed at speed mid`,code:`hours = sum(ceil(p/mid) for p in piles)`},{title:`Can finish?`,description:`If hours <= h, try smaller k`,code:`if hours <= h: right = mid`},{title:`Too slow`,description:`If hours > h, need faster speed`,code:`else: left = mid + 1`}],remember:[`Binary search on speed, not array`,`Speed range: 1 to max(piles)`,`Leftmost valid k = minimum speed`],understanding:`This is "binary search on the answer" pattern. Instead of searching in an array, we search for the optimal value of k.

**Key insight:** The answer is monotonic! If speed k works, any speed > k also works. If k doesn't work, any speed < k also fails.

**Search space:**
- Minimum: k=1 (slowest possible)
- Maximum: k=max(piles) (finish any pile in 1 hour)

**Binary search:** Find the smallest k where we can finish in time.`,whyPatternWorks:`"Binary search on answer" works when:

1. **Monotonic property:** If k=4 works, k=5,6,7... all work
2. **Verifiable:** Given k, we can check if it works in O(n)
3. **Bounded:** We know min and max possible answers

**Hours calculation:** For each pile p, we need ceil(p/k) hours. Sum all piles.

**Why right = mid (not mid - 1)?** We want the MINIMUM valid k. When we find a valid k, it might be the answer, so we keep it in the range.`,keyInsights:[`Binary search on the answer, not on array indices`,`Monotonic: larger k → always valid if smaller k was valid`,`Search for leftmost valid answer`,`Ceiling division: (p + k - 1) // k`,`O(n log m) where m = max(piles)`]},code:`def minEatingSpeed(piles: list[int], h: int) -> int:
    def canFinish(k: int) -> bool:
        hours = sum((p + k - 1) // k for p in piles)
        return hours <= h

    left, right = 1, max(piles)

    while left < right:
        mid = (left + right) // 2
        if canFinish(mid):
            right = mid
        else:
            left = mid + 1

    return left`,inputs:[{name:`piles`,type:`array`,default:[3,6,7,11],label:`Banana Piles`,placeholder:`3, 6, 7, 11`},{name:`h`,type:`number`,default:8,label:`Hours Available`,placeholder:`8`}],generateSteps:e=>{let t=e.piles,n=e.h,r=[],i=e=>t.reduce((t,n)=>t+Math.ceil(n/e),0),a=1,o=Math.max(...t);for(r.push({lineNumber:6,description:`Search range: k ∈ [${a}, ${o}], need to finish in ${n} hours`,elements:[{type:`array`,id:`piles`,values:t}],variables:{left:a,right:o,h:n}});a<o;){let e=Math.floor((a+o)/2),s=i(e),c=s<=n;if(r.push({lineNumber:9,description:`Try k = ${e}: ${t.map(t=>`⌈${t}/${e}⌉`).join(` + `)} = ${s} hours`,elements:[{type:`array`,id:`piles`,values:t},{type:`bracket`,id:`range`,left:0,right:t.length-1,value:`k = ${e}`}],variables:{left:a,right:o,mid:e,hours:s,canFinish:c}}),c?(r.push({lineNumber:11,description:`${s} ≤ ${n}: Can finish! Try smaller k, right = ${e}`,elements:[{type:`array`,id:`piles`,values:t,highlights:[{index:0,style:`found`}]}],variables:{action:`right = mid`,newRight:e}}),o=e):(r.push({lineNumber:13,description:`${s} > ${n}: Too slow! Need faster, left = ${e+1}`,elements:[{type:`array`,id:`piles`,values:t,highlights:[{index:0,style:`comparing`}]}],variables:{action:`left = mid + 1`,newLeft:e+1}}),a=e+1),r.length>30)break}return r.push({lineNumber:15,description:`Complete! Minimum eating speed k = ${a}`,elements:[{type:`array`,id:`piles`,values:t}],variables:{result:a,hoursNeeded:i(a)},isComplete:!0}),r}},{id:`find-peak-element`,name:`Find Peak Element`,category:`binarySearch`,difficulty:`Medium`,leetcodeId:162,description:`Find a peak element where nums[i] > nums[i-1] and nums[i] > nums[i+1].`,timeComplexity:`O(log n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`nums = [1,2,3,1]`,output:`2`,explanation:`Peak is at index 2 (value 3).`},{input:`nums = [1,2,1,3,5,6,4]`,output:`1 or 5`,explanation:`Two peaks: index 1 (value 2) or index 5 (value 6). Return any.`}],education:{tldr:`Binary search: if mid < mid+1, peak is on right. Else peak is at mid or left.`,steps:[{title:`Find mid`,description:`Standard binary search`,code:`mid = (left + right) // 2`},{title:`Compare neighbors`,description:`Check if going up or down`,code:`if nums[mid] > nums[mid+1]`},{title:`Peak on right`,description:`If mid < mid+1, go right`,code:`left = mid + 1`},{title:`Peak at mid or left`,description:`If mid > mid+1, go left`,code:`right = mid`}],remember:[`Compare mid with mid+1 only`,`Ascending = peak on right`,`Descending = peak at mid or left`],understanding:`A peak MUST exist because nums[-1] = nums[n] = -∞ (conceptually).

**Key insight:** If nums[mid] < nums[mid+1], we're going UP. A peak must be on the right (or we'd go up forever, but we can't—edge is -∞).

**If nums[mid] > nums[mid+1]:** We're going DOWN. Either mid is a peak, or there's a peak to the left.

**Binary search works** because we always move toward a guaranteed peak.`,whyPatternWorks:`Think of it as climbing a hill:

\`\`\`
     [6]
    /   \\
  [5]   [4]
  /
[3]
\`\`\`

At mid, if going up (mid < mid+1), summit is ahead.
If going down (mid > mid+1), summit is at mid or behind.

**Guaranteed:** At least one direction leads to a peak. Binary search finds it in O(log n).`,keyInsights:[`Peak guaranteed to exist (edges are -∞)`,`Binary search on slope direction`,`Go toward ascending slope`,`Any peak is valid (return any)`,`O(log n) vs O(n) linear scan`]},code:`def findPeakElement(nums: list[int]) -> int:
    left, right = 0, len(nums) - 1

    while left < right:
        mid = (left + right) // 2

        if nums[mid] > nums[mid + 1]:
            # Peak is at mid or to the left
            right = mid
        else:
            # Peak is to the right
            left = mid + 1

    return left`,inputs:[{name:`nums`,type:`array`,default:[1,2,1,3,5,6,4],label:`Numbers`,placeholder:`1, 2, 1, 3, 5, 6, 4`}],generateSteps:e=>{let t=e.nums,n=[],r=0,i=t.length-1;for(n.push({lineNumber:2,description:`Initialize: left = 0, right = ${i}`,elements:[{type:`pointer`,id:`left`,index:0,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t}],variables:{left:0,right:i}});r<i;){let e=Math.floor((r+i)/2);if(n.push({lineNumber:5,description:`mid = ${e}, compare nums[${e}] = ${t[e]} vs nums[${e+1}] = ${t[e+1]}`,elements:[{type:`pointer`,id:`left`,index:r,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`pointer`,id:`mid`,index:e,label:`M`,color:`#EF4444`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`active`},{index:e+1,style:`comparing`}]}],variables:{left:r,right:i,mid:e}}),t[e]>t[e+1]?(n.push({lineNumber:8,description:`${t[e]} > ${t[e+1]}: Peak at mid or left, right = ${e}`,elements:[{type:`pointer`,id:`left`,index:r,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:e,style:`found`}]}],variables:{action:`right = mid`}}),i=e):(n.push({lineNumber:11,description:`${t[e]} < ${t[e+1]}: Peak to the right, left = ${e+1}`,elements:[{type:`pointer`,id:`left`,index:e+1,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:i,label:`R`,color:`#3B82F6`},{type:`array`,id:`nums`,values:t,highlights:[{index:e+1,style:`active`}]}],variables:{action:`left = mid + 1`}}),r=e+1),n.length>25)break}return n.push({lineNumber:13,description:`Peak found at index ${r} with value ${t[r]}`,elements:[{type:`pointer`,id:`peak`,index:r,label:`Peak`,color:`#16A34A`},{type:`array`,id:`nums`,values:t,highlights:[{index:r,style:`found`}]}],variables:{peakIndex:r,peakValue:t[r]},isComplete:!0}),n}},{id:`split-array-largest-sum`,name:`Split Array Largest Sum`,category:`binarySearch`,difficulty:`Hard`,leetcodeId:410,description:`Split array into k subarrays to minimize the largest subarray sum.`,timeComplexity:`O(n log s)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`nums = [7,2,5,10,8], k = 2`,output:`18`,explanation:`Split as [7,2,5] and [10,8]. Sums: 14 and 18. Largest = 18.`},{input:`nums = [1,2,3,4,5], k = 2`,output:`9`,explanation:`Split as [1,2,3,4] and [5]. Sums: 10 and 5. Wait—[1,2,3] and [4,5] = 6 and 9. Largest = 9.`},{input:`nums = [1,4,4], k = 3`,output:`4`,explanation:`Each element in its own subarray. Largest = 4.`}],education:{tldr:`Binary search on maximum sum. Check if can split into ≤k parts with that limit.`,steps:[{title:`Define search range`,description:`Min = max(nums), Max = sum(nums)`,code:`left, right = max(nums), sum(nums)`},{title:`Try mid as limit`,description:`Can we split with max sum ≤ mid?`,code:`if canSplit(mid, k): right = mid`},{title:`Check function`,description:`Greedily pack subarrays under limit`,code:`count splits needed`},{title:`Return left`,description:`Minimum valid maximum sum`,code:`return left`}],remember:[`Binary search on the answer (max sum)`,`Min bound = max element (can't split smaller)`,`Max bound = total sum (one subarray)`],understanding:`This is another "binary search on the answer" problem. We're searching for the minimum possible "largest subarray sum".

**Key insight:** If we can split the array such that no subarray exceeds X, we can definitely do it for any value > X. Monotonic!

**Search bounds:**
- Lower: max(nums) — even with k=n, each element is its own subarray
- Upper: sum(nums) — one big subarray

**Feasibility check:** Given a limit, greedily fill subarrays until adding next element exceeds limit. Count subarrays needed.`,whyPatternWorks:`The problem has monotonic structure:

If max_sum = 18 works with 2 splits:
- 19, 20, 21... all work (looser constraint)
- 17, 16, 15... might need more splits

**Greedy check works because:**
1. Pack current subarray as full as possible
2. When limit exceeded, start new subarray
3. If total subarrays ≤ k, this limit works

**Why greedy is optimal for checking:** Making subarrays as large as possible (under limit) minimizes the number of subarrays needed.`,keyInsights:[`Binary search on the answer pattern`,`Search for minimum valid maximum sum`,`Lower bound: max(nums)`,`Upper bound: sum(nums)`,`Greedy check: pack under limit, count splits`,`O(n log s) where s = sum - max`]},code:`def splitArray(nums: list[int], k: int) -> int:
    def canSplit(max_sum: int) -> bool:
        subarrays = 1
        curr_sum = 0
        for num in nums:
            if curr_sum + num > max_sum:
                subarrays += 1
                curr_sum = num
            else:
                curr_sum += num
        return subarrays <= k

    left, right = max(nums), sum(nums)

    while left < right:
        mid = (left + right) // 2
        if canSplit(mid):
            right = mid
        else:
            left = mid + 1

    return left`,inputs:[{name:`nums`,type:`array`,default:[7,2,5,10,8],label:`Array`,placeholder:`7, 2, 5, 10, 8`},{name:`k`,type:`number`,default:2,label:`Number of subarrays (k)`,placeholder:`2`}],generateSteps:e=>{let t=e.nums,n=e.k,r=[],i=e=>{let r=1,i=0;for(let n of t)i+n>e?(r++,i=n):i+=n;return{can:r<=n,subarrays:r}},a=Math.max(...t),o=t.reduce((e,t)=>e+t,0);for(r.push({lineNumber:10,description:`Search range: max_sum ∈ [${a}, ${o}], split into ${n} subarrays`,elements:[{type:`array`,id:`nums`,values:t}],variables:{left:a,right:o,k:n}});a<o&&r.length<25;){let e=Math.floor((a+o)/2),{can:s,subarrays:c}=i(e);r.push({lineNumber:13,description:`Try max_sum = ${e}: need ${c} subarrays`,elements:[{type:`array`,id:`nums`,values:t}],variables:{mid:e,subarraysNeeded:c,k:n,canSplit:s}}),s?(r.push({lineNumber:15,description:`${c} ≤ ${n}: Can do it! Try smaller max_sum, right = ${e}`,elements:[{type:`array`,id:`nums`,values:t,highlights:t.map((e,t)=>({index:t,style:`found`}))}],variables:{action:`right = mid`,newRight:e}}),o=e):(r.push({lineNumber:17,description:`${c} > ${n}: Need more splits! Increase max_sum, left = ${e+1}`,elements:[{type:`array`,id:`nums`,values:t,highlights:t.map((e,t)=>({index:t,style:`comparing`}))}],variables:{action:`left = mid + 1`,newLeft:e+1}}),a=e+1)}return r.push({lineNumber:19,description:`Complete! Minimum largest sum = ${a}`,elements:[{type:`array`,id:`nums`,values:t}],variables:{result:a},isComplete:!0}),r}}]},{id:`stack`,name:`Stack`,color:`var(--accent-stack)`,algorithms:[{id:`valid-parentheses`,name:`Valid Parentheses`,category:`stack`,difficulty:`Easy`,leetcodeId:20,description:`Determine if the input string has valid parentheses. Every open bracket must be closed by the same type in correct order.`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`stack`,examples:[{input:`s = "()"`,output:`true`,explanation:`Simple valid pair.`},{input:`s = "()[]{}"`,output:`true`,explanation:`Multiple valid pairs, each closed before next opens.`},{input:`s = "(]"`,output:`false`,explanation:`Mismatched types: ( opened but ] tried to close it.`},{input:`s = "([)]"`,output:`false`,explanation:`Wrong order: [ should close before ), but ) comes first.`}],education:{tldr:`Push open brackets, pop on close. Match types. Empty stack = valid.`,steps:[{title:`See opening bracket`,description:`Push it onto the stack`,code:`stack.append(char)`},{title:`See closing bracket`,description:`Check if stack top matches`,code:`if stack[-1] == pairs[char]`},{title:`Match found`,description:`Pop from stack`,code:`stack.pop()`},{title:`End of string`,description:`Valid if stack is empty`,code:`return len(stack) == 0`}],remember:[`Opening → push`,`Closing → pop and match`,`Empty stack at end → valid`],understanding:`This is the classic intro-to-stacks problem. The stack enforces LIFO (Last In, First Out) order.

**Why a stack?** Opening brackets need to match closing brackets in REVERSE order. The last bracket opened must be the first one closed. That's exactly what a stack does.

**The trick:** When you see a closing bracket, the MOST RECENT opening bracket (stack top) must be its match.`,whyPatternWorks:`Stacks naturally handle nested structures:

\`\`\`
( [ { } ] )
Push ( → [ ( ]
Push [ → [ (, [ ]
Push { → [ (, [, { ]
Pop { (matches })
Pop [ (matches ])
Pop ( (matches ))
Empty! Valid!
\`\`\`

If at any point the top doesn't match, or stack is empty when closing, we know it's invalid.`,keyInsights:[`Stack = LIFO = handles nesting`,`Map closing → opening for easy lookup`,`Three fail cases: empty stack, mismatch, leftover opens`,`Foundation for parsing, compilers, calculators`]},code:`def isValid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in pairs:
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
        else:
            stack.append(char)

    return len(stack) == 0`,inputs:[{name:`s`,type:`string`,default:`([{}])`,label:`String`,placeholder:`([{}])`}],generateSteps:e=>{let t=e.s,n=[],r=[],i={")":`(`,"}":`{`,"]":`[`};n.push({lineNumber:2,description:`Initialize empty stack and bracket pairs mapping.`,elements:[{type:`stack`,id:`stack`,items:[]}],variables:{stack:`[]`}});for(let e=0;e<t.length;e++){let a=t[e];if(n.push({lineNumber:5,description:`Processing character '${a}' at index ${e}`,elements:[{type:`stack`,id:`stack`,items:[...r]}],variables:{char:a,index:e,stack:`[${r.map(e=>`'${e}'`).join(`, `)}]`}}),a in i){if(n.push({lineNumber:6,description:`'${a}' is a closing bracket. Check if stack top matches '${i[a]}'`,elements:[{type:`stack`,id:`stack`,items:[...r],highlights:r.length>0?[{index:0,style:`comparing`}]:[]}],variables:{char:a,expected:i[a],stack_top:r.length>0?r[r.length-1]:`empty`}}),!r.length||r[r.length-1]!==i[a])return n.push({lineNumber:8,description:r.length===0?`Stack is empty! No matching opening bracket for '${a}'. Invalid!`:`Stack top '${r[r.length-1]}' doesn't match expected '${i[a]}'. Invalid!`,elements:[{type:`stack`,id:`stack`,items:[...r],highlights:r.length>0?[{index:0,style:`comparing`}]:[]}],variables:{result:!1},isComplete:!0}),n;r.pop(),n.push({lineNumber:9,description:`Match found! Pop '${i[a]}' from stack.`,elements:[{type:`stack`,id:`stack`,items:[...r],highlights:r.length>0?[{index:0,style:`found`}]:[]}],variables:{stack:`[${r.map(e=>`'${e}'`).join(`, `)}]`}})}else r.push(a),n.push({lineNumber:11,description:`'${a}' is an opening bracket. Push to stack.`,elements:[{type:`stack`,id:`stack`,items:[...r],highlights:[{index:0,style:`active`}]}],variables:{stack:`[${r.map(e=>`'${e}'`).join(`, `)}]`}})}let a=r.length===0;return n.push({lineNumber:13,description:a?`All characters processed. Stack is empty - all brackets matched! Valid!`:`All characters processed. Stack not empty: [${r.join(`, `)}]. Unmatched brackets! Invalid!`,elements:[{type:`stack`,id:`stack`,items:[...r],highlights:r.map((e,t)=>({index:t,style:a?`found`:`comparing`}))}],variables:{result:a},isComplete:!0}),n}},{id:`daily-temperatures`,name:`Daily Temperatures`,category:`stack`,difficulty:`Medium`,leetcodeId:739,description:`Given daily temperatures, find how many days until a warmer temperature for each day.`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`stack`,examples:[{input:`temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`,output:`[1, 1, 4, 2, 1, 1, 0, 0]`,explanation:`Day 0 (73°) waits 1 day for 74°. Day 2 (75°) waits 4 days for 76°.`},{input:`temperatures = [30, 40, 50, 60]`,output:`[1, 1, 1, 0]`,explanation:`Each day has a warmer day right after (except the last).`},{input:`temperatures = [30, 60, 90]`,output:`[1, 1, 0]`,explanation:`Strictly increasing—each waits just 1 day.`}],education:{tldr:`Monotonic decreasing stack. When we find warmer, pop and calculate wait time.`,steps:[{title:`Process each day`,description:`Compare current temp to stack top`,code:`for i, temp in enumerate(temperatures)`},{title:`While warmer than stack top`,description:`Pop and calculate days waited`,code:`while stack and temps[stack[-1]] < temp`},{title:`Record wait time`,description:`Days = current index - popped index`,code:`result[prev_i] = i - prev_i`},{title:`Push current`,description:`Add current day to stack`,code:`stack.append(i)`}],remember:[`Stack stores INDICES, not temperatures`,`Pop when we find a warmer day`,`Leftover stack entries = no warmer day (0)`],understanding:`This is the "Next Greater Element" pattern using a monotonic stack.

**Key insight:** We're looking for the NEXT warmer day for each day. A stack helps us "remember" days still waiting for their answer.

**Why monotonic decreasing?** Days in the stack are waiting for a warmer day. When we find a warmer day, we can answer ALL the cooler days in the stack.

**Stack stores indices** because we need to calculate the distance (days waited).`,whyPatternWorks:`The monotonic stack pattern works because:

1. Days stay on stack until we find their answer
2. When we find a warmer day, we resolve all cooler days
3. Each element is pushed once and popped once → O(n)

**Invariant:** Stack always contains days in decreasing temperature order (from bottom to top), all waiting for a warmer day.`,keyInsights:[`Monotonic stack = "Next Greater Element" pattern`,`Store indices, not values`,`Pop resolves the waiting element`,`O(n) despite nested loops (each element pushed/popped once)`,`Leftover stack = no answer found (stays 0)`]},code:`def dailyTemperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    result = [0] * n
    stack = []  # Store indices

    for i, temp in enumerate(temperatures):
        # Pop all colder temperatures
        while stack and temperatures[stack[-1]] < temp:
            prev_i = stack.pop()
            result[prev_i] = i - prev_i

        stack.append(i)

    return result`,inputs:[{name:`temperatures`,type:`array`,default:[73,74,75,71,69,72,76,73],label:`Temperatures`,placeholder:`73, 74, 75, 71, 69, 72, 76, 73`}],generateSteps:e=>{let t=e.temperatures,n=[],r=t.length,i=Array(r).fill(0),a=[];n.push({lineNumber:3,description:`Initialize result array [${i.join(`, `)}] and empty stack`,elements:[{type:`array`,id:`temps`,values:t},{type:`stack`,id:`stack`,items:[]}],variables:{result:`[${i.join(`, `)}]`}});for(let e=0;e<r;e++){let r=t[e];for(n.push({lineNumber:6,description:`Day ${e}: temperature = ${r}°`,elements:[{type:`array`,id:`temps`,values:t,highlights:[{index:e,style:`active`}]},{type:`stack`,id:`stack`,items:a.map(e=>`${e}:${t[e]}°`)}],variables:{i:e,temp:r,stackTop:a.length>0?t[a[a.length-1]]:`empty`}});a.length>0&&t[a[a.length-1]]<r;){let o=a.pop();i[o]=e-o,n.push({lineNumber:9,description:`${r}° > ${t[o]}°: Pop day ${o}, wait time = ${e} - ${o} = ${i[o]} days`,elements:[{type:`array`,id:`temps`,values:t,highlights:[{index:e,style:`active`},{index:o,style:`found`}]},{type:`stack`,id:`stack`,items:a.map(e=>`${e}:${t[e]}°`)}],variables:{i:e,prevI:o,waitDays:i[o],result:`[${i.join(`, `)}]`}})}if(a.push(e),n.push({lineNumber:12,description:`Push day ${e} (${r}°) to stack`,elements:[{type:`array`,id:`temps`,values:t,highlights:[{index:e,style:`active`}]},{type:`stack`,id:`stack`,items:a.map(e=>`${e}:${t[e]}°`),highlights:[{index:0,style:`active`}]}],variables:{stackSize:a.length}}),n.length>40)break}return n.push({lineNumber:14,description:`Complete! Result: [${i.join(`, `)}]`,elements:[{type:`array`,id:`result`,values:i}],variables:{result:`[${i.join(`, `)}]`},isComplete:!0}),n}},{id:`min-stack`,name:`Min Stack`,category:`stack`,difficulty:`Medium`,leetcodeId:155,description:`Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.`,timeComplexity:`O(1)`,spaceComplexity:`O(n)`,visualizationType:`stack`,examples:[{input:`push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()`,output:`null, null, null, -3, null, 0, -2`,explanation:`After pushing -2,0,-3: min is -3. Pop -3, top is 0, min is now -2.`}],education:{tldr:`Store (value, current_min) pairs. Each element knows the min at that point in time.`,steps:[{title:`Push`,description:`Store value AND current minimum together`,code:`stack.push((val, min(val, stack[-1].min)))`},{title:`Pop`,description:`Just pop—previous min is already stored`,code:`stack.pop()`},{title:`Top`,description:`Return the value part`,code:`return stack[-1][0]`},{title:`GetMin`,description:`Return the min part`,code:`return stack[-1][1]`}],remember:[`Each entry stores (value, min_so_far)`,`Min is computed at push time`,`All operations are O(1)`],understanding:`The trick is storing extra information with each element.

**Key insight:** When we push, we know the minimum SO FAR. Store it! When we pop, the previous element still has its correct min stored.

**Why it works:** Each element "remembers" what the minimum was when it was pushed. Popping doesn't break this—the previous element's min is still valid.

**Trade-off:** We use O(n) extra space to store mins, but get O(1) getMin().`,whyPatternWorks:`By storing (value, min) pairs:

\`\`\`
push(-2): stack = [(-2, -2)]  # min is -2
push(0):  stack = [(-2, -2), (0, -2)]  # min still -2
push(-3): stack = [(-2, -2), (0, -2), (-3, -3)]  # new min -3

pop():    stack = [(-2, -2), (0, -2)]  # min reverts to -2
\`\`\`

Each element carries its context. No need to recalculate!`,keyInsights:[`Store extra state (min) with each element`,`Compute min at push time, not query time`,`Space-time trade-off: O(n) space for O(1) query`,`Alternative: use two stacks (main + mins)`,`Pattern: augment data structure with precomputed info`]},code:`class MinStack:
    def __init__(self):
        self.stack = []      # (value, current_min)

    def push(self, val: int) -> None:
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]`,inputs:[{name:`operations`,type:`string`,default:`push 5, push 2, push 7, getMin, pop, getMin, push 1, getMin`,label:`Operations`,placeholder:`push 5, push 2, getMin, pop`}],generateSteps:e=>{let t=e.operations.split(`,`).map(e=>e.trim()),n=[],r=[];n.push({lineNumber:3,description:`Initialize MinStack with empty stack storing (value, min) pairs`,elements:[{type:`stack`,id:`stack`,items:[]}],variables:{stack:`[]`}});for(let e of t){let t=e.split(` `),i=t[0].toLowerCase();if(i===`push`){let e=parseInt(t[1]),i=r.length===0?e:Math.min(e,r[r.length-1].min);r.push({val:e,min:i}),n.push({lineNumber:8,description:`push(${e}): min = min(${e}, ${r.length>1?r[r.length-2].min:e}) = ${i}`,elements:[{type:`stack`,id:`stack`,items:r.map(e=>`${e.val} (min:${e.min})`),highlights:[{index:0,style:`active`}]}],variables:{pushed:e,currentMin:i}})}else if(i===`pop`){let e=r.pop();n.push({lineNumber:12,description:`pop(): removed ${e?.val}`,elements:[{type:`stack`,id:`stack`,items:r.map(e=>`${e.val} (min:${e.min})`)}],variables:{popped:e?.val??`empty`}})}else if(i===`top`){let e=r.length>0?r[r.length-1].val:null;n.push({lineNumber:15,description:`top(): returns ${e}`,elements:[{type:`stack`,id:`stack`,items:r.map(e=>`${e.val} (min:${e.min})`),highlights:r.length>0?[{index:0,style:`active`}]:[]}],variables:{top:e??`empty`}})}else if(i===`getmin`){let e=r.length>0?r[r.length-1].min:null;n.push({lineNumber:18,description:`getMin(): returns ${e} in O(1)`,elements:[{type:`stack`,id:`stack`,items:r.map(e=>`${e.val} (min:${e.min})`),highlights:r.length>0?[{index:0,style:`found`}]:[]}],variables:{min:e??`empty`}})}if(n.length>30)break}return n.push({lineNumber:18,description:`All operations complete!`,elements:[{type:`stack`,id:`stack`,items:r.map(e=>`${e.val} (min:${e.min})`)}],variables:{finalSize:r.length},isComplete:!0}),n}},{id:`decode-string`,name:`Decode String`,category:`stack`,difficulty:`Medium`,leetcodeId:394,description:`Decode an encoded string like "3[a2[c]]" to "accaccacc".`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`stack`,examples:[{input:`s = "3[a]2[bc]"`,output:`"aaabcbc"`,explanation:`a repeated 3 times, then bc repeated 2 times.`},{input:`s = "3[a2[c]]"`,output:`"accaccacc"`,explanation:`Inner first: 2[c] = cc. Then a + cc = acc. Then 3[acc] = accaccacc.`},{input:`s = "2[abc]3[cd]ef"`,output:`"abcabccdcdcdef"`,explanation:`abc twice, cd three times, then ef.`}],education:{tldr:`Stack stores (prev_string, repeat_count). On ], pop and repeat current string.`,steps:[{title:`Digit`,description:`Build number (could be multi-digit)`,code:`curr_num = curr_num * 10 + int(char)`},{title:`[`,description:`Push state, reset for inner content`,code:`stack.push((curr_str, curr_num)); reset`},{title:`]`,description:`Pop, repeat current, prepend previous`,code:`prev, n = pop(); curr = prev + curr * n`},{title:`Letter`,description:`Append to current string`,code:`curr_str += char`}],remember:[`[ = save state and reset`,`] = pop, repeat, combine`,`Handle multi-digit numbers!`],understanding:`This is a nested structure problem—perfect for a stack.

**What to stack?** When we see [, we need to remember:
1. The string built so far (before this bracket)
2. How many times to repeat (the number before [)

**On ]:** Pop the saved state, repeat the current string that many times, and prepend what came before.

**Example:** \`3[a2[c]]\`
- See 3, then [: push ("", 3), reset
- See a: curr_str = "a"
- See 2, then [: push ("a", 2), reset
- See c: curr_str = "c"
- See ]: pop ("a", 2), curr = "a" + "c"×2 = "acc"
- See ]: pop ("", 3), curr = "" + "acc"×3 = "accaccacc"`,whyPatternWorks:`The stack handles nesting by saving context at each level:

Level 0: start with ""
Level 1 (3[): save "", will repeat 3×
Level 2 (2[): save "a", will repeat 2×

As we close brackets, we unwind in reverse order—exactly what the stack gives us.`,keyInsights:[`Stack entry = (previous_string, repeat_count)`,`[ = push context and reset`,`] = pop context and combine`,`Handle multi-digit: num = num * 10 + digit`,`Inner brackets resolve first (LIFO)`]},code:`def decodeString(s: str) -> str:
    stack = []
    curr_str = ""
    curr_num = 0

    for char in s:
        if char.isdigit():
            curr_num = curr_num * 10 + int(char)
        elif char == '[':
            stack.append((curr_str, curr_num))
            curr_str = ""
            curr_num = 0
        elif char == ']':
            prev_str, num = stack.pop()
            curr_str = prev_str + curr_str * num
        else:
            curr_str += char

    return curr_str`,inputs:[{name:`s`,type:`string`,default:`3[a2[c]]`,label:`Encoded String`,placeholder:`3[a2[c]]`}],generateSteps:e=>{let t=e.s,n=[],r=[],i=``,a=0;n.push({lineNumber:2,description:`Initialize empty stack, curr_str = "", curr_num = 0`,elements:[{type:`stack`,id:`stack`,items:[]}],variables:{curr_str:`""`,curr_num:0}});for(let e=0;e<t.length;e++){let o=t[e];if(/\d/.test(o))a=a*10+parseInt(o),n.push({lineNumber:8,description:`'${o}' is digit: curr_num = ${a}`,elements:[{type:`stack`,id:`stack`,items:r.map(e=>`("${e.str}", ${e.num})`)}],variables:{char:o,curr_num:a,curr_str:`"${i}"`}});else if(o===`[`)r.push({str:i,num:a}),n.push({lineNumber:10,description:`'[': Push ("${i}", ${a}) to stack, reset`,elements:[{type:`stack`,id:`stack`,items:r.map(e=>`("${e.str}", ${e.num})`),highlights:[{index:0,style:`active`}]}],variables:{pushed:`("${i}", ${a})`}}),i=``,a=0;else if(o===`]`){let{str:e,num:t}=r.pop(),a=i.repeat(t);i=e+a,n.push({lineNumber:14,description:`']': Pop, repeat "${i.slice(e.length,e.length+i.length/t)}" × ${t}, prepend "${e}"`,elements:[{type:`stack`,id:`stack`,items:r.map(e=>`("${e.str}", ${e.num})`)}],variables:{curr_str:`"${i}"`,repeated:`"${a}"`}})}else i+=o,n.push({lineNumber:16,description:`'${o}': Append to curr_str`,elements:[{type:`stack`,id:`stack`,items:r.map(e=>`("${e.str}", ${e.num})`)}],variables:{curr_str:`"${i}"`}});if(n.length>35)break}return n.push({lineNumber:18,description:`Complete! Decoded string: "${i}"`,elements:[{type:`stack`,id:`stack`,items:[]}],variables:{result:`"${i}"`},isComplete:!0}),n}},{id:`largest-rectangle-histogram`,name:`Largest Rectangle in Histogram`,category:`stack`,difficulty:`Hard`,leetcodeId:84,description:`Find the largest rectangular area in a histogram.`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`stack`,examples:[{input:`heights = [2, 1, 5, 6, 2, 3]`,output:`10`,explanation:`The largest rectangle is between bars of height 5 and 6, area = 5 × 2 = 10.`},{input:`heights = [2, 4]`,output:`4`,explanation:`Either take bar of height 4 (area=4) or both bars at height 2 (area=4).`}],education:{tldr:`Monotonic increasing stack. When bar is shorter, pop and calculate area.`,steps:[{title:`Process each bar`,description:`Compare to stack top`,code:`for i, h in enumerate(heights)`},{title:`While current is shorter`,description:`Pop and calculate area`,code:`while stack and stack[-1][1] > h`},{title:`Calculate area`,description:`Height × width (current_i - start_i)`,code:`area = height * (i - idx)`},{title:`Push with extended start`,description:`Bar can extend left to popped positions`,code:`stack.append((start, h))`}],remember:[`Stack stores (index, height)`,`Pop when shorter bar found`,`Extend start position leftward after popping`],understanding:`For each bar, we want to find the MAXIMUM width it can extend to while maintaining its height.

**Key insight:** A bar can extend left until it hits a shorter bar. It can extend right until it hits a shorter bar.

**Why monotonic increasing stack?** We maintain bars in increasing height order. When we see a shorter bar, all taller bars in the stack can't extend further right—we pop and calculate their areas.

**The "start" trick:** When we pop bars, the current bar can extend left to those positions. We update its start index accordingly.`,whyPatternWorks:`The stack helps us find the "span" of each bar:

1. When a bar is popped, its RIGHT boundary is the current bar
2. Its LEFT boundary is where it was pushed (or extended to)
3. Width = right - left, Area = height × width

**Final cleanup:** Bars remaining in the stack can extend all the way to the right end—process them after the loop.`,keyInsights:[`Monotonic increasing stack pattern`,`Pop determines right boundary`,`Push position determines left boundary`,`Start position extends leftward after pops`,`Process remaining stack at end (right boundary = length)`,`O(n) time: each bar pushed and popped once`]},code:`def largestRectangleArea(heights: list[int]) -> int:
    stack = []  # (index, height)
    max_area = 0

    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            area = height * (i - idx)
            max_area = max(max_area, area)
            start = idx
        stack.append((start, h))

    # Process remaining bars
    for idx, h in stack:
        area = h * (len(heights) - idx)
        max_area = max(max_area, area)

    return max_area`,inputs:[{name:`heights`,type:`array`,default:[2,1,5,6,2,3],label:`Bar Heights`,placeholder:`2, 1, 5, 6, 2, 3`}],generateSteps:e=>{let t=e.heights,n=[],r=[],i=0;n.push({lineNumber:2,description:`Initialize empty stack and max_area = 0`,elements:[{type:`array`,id:`heights`,values:t},{type:`stack`,id:`stack`,items:[]}],variables:{max_area:0}});for(let e=0;e<t.length;e++){let a=t[e],o=e;for(n.push({lineNumber:5,description:`Bar ${e}: height = ${a}`,elements:[{type:`array`,id:`heights`,values:t,highlights:[{index:e,style:`active`}]},{type:`stack`,id:`stack`,items:r.map(e=>`(${e.idx},${e.h})`)}],variables:{i:e,h:a,stackTop:r.length>0?r[r.length-1].h:`empty`}});r.length>0&&r[r.length-1].h>a;){let{idx:a,h:s}=r.pop(),c=s*(e-a);i=Math.max(i,c),o=a,n.push({lineNumber:9,description:`Pop (${a},${s}): area = ${s} × ${e-a} = ${c}${c>i-c?` (new max!)`:``}`,elements:[{type:`array`,id:`heights`,values:t,highlights:[{index:e,style:`active`},...Array.from({length:e-a},(e,t)=>({index:a+t,style:`found`}))]},{type:`stack`,id:`stack`,items:r.map(e=>`(${e.idx},${e.h})`)}],variables:{area:c,max_area:i,width:e-a}})}if(r.push({idx:o,h:a}),n.push({lineNumber:12,description:`Push (${o}, ${a}) to stack`,elements:[{type:`array`,id:`heights`,values:t,highlights:[{index:e,style:`active`}]},{type:`stack`,id:`stack`,items:r.map(e=>`(${e.idx},${e.h})`),highlights:[{index:0,style:`active`}]}],variables:{pushed:`(${o}, ${a})`}}),n.length>35)break}n.push({lineNumber:15,description:`Process remaining bars in stack`,elements:[{type:`array`,id:`heights`,values:t},{type:`stack`,id:`stack`,items:r.map(e=>`(${e.idx},${e.h})`)}],variables:{remaining:r.length}});for(let{idx:e,h:a}of r){let r=a*(t.length-e);if(i=Math.max(i,r),n.push({lineNumber:16,description:`Remaining (${e},${a}): area = ${a} × ${t.length-e} = ${r}`,elements:[{type:`array`,id:`heights`,values:t,highlights:Array.from({length:t.length-e},(t,n)=>({index:e+n,style:`found`}))}],variables:{area:r,max_area:i}}),n.length>45)break}return n.push({lineNumber:19,description:`Complete! Largest rectangle area: ${i}`,elements:[{type:`array`,id:`heights`,values:t}],variables:{max_area:i},isComplete:!0}),n}},{id:`longest-valid-parentheses`,name:`Longest Valid Parentheses`,category:`stack`,difficulty:`Hard`,leetcodeId:32,description:`Find the length of the longest valid (well-formed) parentheses substring.`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`stack`,examples:[{input:`s = "(()"`,output:`2`,explanation:`Longest valid is "()" at the end.`},{input:`s = ")()())"`,output:`4`,explanation:`Longest valid is "()()" in the middle.`},{input:`s = ""`,output:`0`,explanation:`Empty string has no valid parentheses.`},{input:`s = "()(())"`,output:`6`,explanation:`Entire string is valid!`}],education:{tldr:`Stack stores indices. Push -1 as base. On match, pop and calculate length from new top.`,steps:[{title:`Initialize stack with -1`,description:`Base index for calculating length`,code:`stack = [-1]`},{title:`See (`,description:`Push its index`,code:`stack.append(i)`},{title:`See )`,description:`Pop, then calculate length`,code:`stack.pop(); length = i - stack[-1]`},{title:`Stack empty after pop`,description:`Push current index as new base`,code:`if not stack: stack.append(i)`}],remember:[`Start with -1 (not empty!)`,`Push index for (`,`Pop then peek for )`,`Empty after pop → push new base`],understanding:`This is a clever twist on the valid parentheses problem. Instead of checking validity, we track LENGTH.

**Key insight:** After popping a match, the stack top tells us where the valid substring STARTS.

**Why start with -1?** When the first character is '(' and second is ')', after the pop, we need something to calculate length against. \`i - (-1) = 2\` gives correct length.

**What happens with invalid ')'?** When we pop and the stack becomes empty, this ')' can't be matched. We push its index as a new "base" for future calculations.`,whyPatternWorks:`The stack maintains boundaries:

1. Each '(' index is pushed—it might be matched later
2. Each ')' pops—if there's a match, calculate length
3. If stack is empty after pop, this ')' is unmatched—it becomes a new boundary

**Example:** ")()())"
- i=0: ')' → pop -1, empty! Push 0 as new base
- i=1: '(' → push 1
- i=2: ')' → pop 1, length = 2 - 0 = 2
- i=3: '(' → push 3
- i=4: ')' → pop 3, length = 4 - 0 = 4
- i=5: ')' → pop 0, empty! Push 5 as new base

Max = 4`,keyInsights:[`Stack stores indices, not characters`,`Initialize with -1 as boundary`,`Pop then peek for length calculation`,`Empty stack = new boundary needed`,`Alternative: DP approach exists`,`Alternative: Two-pass counter approach (O(1) space)`]},code:`def longestValidParentheses(s: str) -> int:
    stack = [-1]  # Base index
    max_length = 0

    for i, char in enumerate(s):
        if char == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)  # New base
            else:
                max_length = max(max_length, i - stack[-1])

    return max_length`,inputs:[{name:`s`,type:`string`,default:`)()())`,label:`String`,placeholder:`)()())`}],generateSteps:e=>{let t=e.s,n=[],r=[-1],i=0;n.push({lineNumber:2,description:`Initialize stack with -1 as base index`,elements:[{type:`stack`,id:`stack`,items:[`-1`]}],variables:{max_length:0}});for(let e=0;e<t.length&&n.length<25;e++){let a=t[e];if(a===`(`)r.push(e),n.push({lineNumber:6,description:`'(' at index ${e}: Push ${e} to stack`,elements:[{type:`stack`,id:`stack`,items:r.map(String),highlights:[{index:0,style:`active`}]}],variables:{i:e,char:a,stackTop:r[r.length-1]}});else if(r.pop(),r.length===0)r.push(e),n.push({lineNumber:10,description:`')' at index ${e}: Pop, stack empty! Push ${e} as new base`,elements:[{type:`stack`,id:`stack`,items:r.map(String),highlights:[{index:0,style:`comparing`}]}],variables:{i:e,char:a,newBase:e}});else{let t=e-r[r.length-1];i=Math.max(i,t),n.push({lineNumber:12,description:`')' at index ${e}: Pop, length = ${e} - ${r[r.length-1]} = ${t}${t>i-t?` (new max!)`:``}`,elements:[{type:`stack`,id:`stack`,items:r.map(String)}],variables:{i:e,char:a,length:t,max_length:i}})}}return n.push({lineNumber:14,description:`Complete! Longest valid parentheses: ${i}`,elements:[{type:`stack`,id:`stack`,items:r.map(String)}],variables:{result:i},isComplete:!0}),n}}]},{id:`slidingWindow`,name:`Sliding Window`,color:`var(--accent-sliding-window)`,algorithms:[{id:`max-sum-subarray`,name:`Maximum Sum Subarray of Size K`,category:`slidingWindow`,difficulty:`Easy`,description:`Find the maximum sum of any contiguous subarray of size k.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`nums = [2, 1, 5, 1, 3, 2], k = 3`,output:`9`,explanation:`Maximum sum subarray is [5, 1, 3] with sum 9.`},{input:`nums = [2, 3, 4, 1, 5], k = 2`,output:`7`,explanation:`Maximum sum subarray is [3, 4] with sum 7.`}],education:{tldr:`Slide window: add new element, remove old. No need to recompute entire sum.`,steps:[{title:`Initial window`,description:`Sum first k elements`,code:`sum = sum(nums[:k])`},{title:`Slide right`,description:`Add incoming element`,code:`sum += nums[i]`},{title:`Slide left`,description:`Remove outgoing element`,code:`sum -= nums[i-k]`},{title:`Track max`,description:`Update best sum seen`,code:`max_sum = max(max_sum, sum)`}],remember:[`Fixed size = slide, don't resize`,`Add new - remove old = O(1) update`,`Window moves one step at a time`],understanding:`This is the simplest sliding window: **fixed size**. We maintain a window of exactly k elements and slide it through the array.

**The trick:** Instead of recalculating the sum for each window position (O(k) per position = O(nk) total), we do an O(1) update:
- Add the new element entering the window
- Subtract the element leaving the window

**Visual:** Think of a window frame sliding along the array. At each position, one element enters on the right and one exits on the left.`,whyPatternWorks:`Fixed-size sliding window works when:

1. **Contiguous elements:** We care about consecutive items
2. **Fixed window size:** k is constant
3. **Aggregate can be updated incrementally:** Sum, product, count all work

The pattern converts O(nk) brute force into O(n) by maintaining state across positions instead of recalculating from scratch.`,keyInsights:[`Classic fixed-size sliding window`,`O(1) window update instead of O(k) recalculation`,`Sum is additive: add incoming, subtract outgoing`,`Window "slides" one element at a time`,`Works for any incrementally-updatable aggregate`]},code:`def maxSumSubarray(nums: list[int], k: int) -> int:
    window_sum = sum(nums[:k])
    max_sum = window_sum

    for i in range(k, len(nums)):
        # Slide: add new element, remove old
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum`,inputs:[{name:`nums`,type:`array`,default:[2,1,5,1,3,2],label:`Numbers`,placeholder:`2, 1, 5, 1, 3, 2`},{name:`k`,type:`number`,default:3,label:`Window Size (k)`,placeholder:`3`}],generateSteps:e=>{let t=e.nums,n=e.k,r=[],i=t.slice(0,n).reduce((e,t)=>e+t,0),a=i;r.push({lineNumber:2,description:`Initial window [0..${n-1}]: sum = ${i}`,elements:[{type:`array`,id:`nums`,values:t,highlights:Array.from({length:n},(e,t)=>({index:t,style:`active`}))},{type:`bracket`,id:`window`,left:0,right:n-1,value:`sum = ${i}`}],variables:{window_sum:i,max_sum:a}});for(let e=n;e<t.length;e++){let o=t[e],s=t[e-n];i+=o-s,r.push({lineNumber:7,description:`Slide: add ${o}, remove ${s}. New sum = ${i}`,elements:[{type:`array`,id:`nums`,values:t,highlights:[{index:e-n,style:`comparing`},{index:e,style:`active`},...Array.from({length:n-1},(t,r)=>({index:e-n+1+r,style:`found`}))]},{type:`bracket`,id:`window`,left:e-n+1,right:e,value:`sum = ${i}`}],variables:{window_sum:i,add:o,remove:s}});let c=a;if(a=Math.max(a,i),r.push({lineNumber:8,description:`max_sum = max(${c}, ${i}) = ${a}`,elements:[{type:`array`,id:`nums`,values:t,highlights:Array.from({length:n},(t,r)=>({index:e-n+1+r,style:`active`}))}],variables:{window_sum:i,max_sum:a}}),r.length>30)break}return r.push({lineNumber:10,description:`Complete! Maximum sum = ${a}`,elements:[{type:`array`,id:`nums`,values:t}],variables:{max_sum:a},isComplete:!0}),r}},{id:`longest-substring-without-repeating`,name:`Longest Substring Without Repeating`,category:`slidingWindow`,difficulty:`Medium`,leetcodeId:3,description:`Find the length of the longest substring without repeating characters.`,timeComplexity:`O(n)`,spaceComplexity:`O(min(n, m))`,visualizationType:`array`,examples:[{input:`s = "abcabcbb"`,output:`3`,explanation:`Longest is "abc" with length 3.`},{input:`s = "bbbbb"`,output:`1`,explanation:`Longest is "b" with length 1.`},{input:`s = "pwwkew"`,output:`3`,explanation:`Longest is "wke" with length 3. Note: "pwke" is a subsequence, not substring.`}],education:{tldr:`Expand right until duplicate found. Shrink left until duplicate removed. Track max length.`,steps:[{title:`Expand right`,description:`Add character to window`,code:`char_set.add(s[right])`},{title:`Duplicate?`,description:`Check if char already in set`,code:`if s[right] in char_set`},{title:`Shrink left`,description:`Remove chars until duplicate gone`,code:`while duplicate: remove(s[left]), left++`},{title:`Track length`,description:`Update max window size`,code:`max_len = max(max_len, right - left + 1)`}],remember:[`Variable window: expand right, shrink left`,`Set tracks what's in current window`,`Shrink until constraint satisfied`],understanding:`This is a **variable-size** sliding window. The window grows and shrinks based on a constraint (no duplicates).

**Right pointer:** Always moves right, expanding the window
**Left pointer:** Moves right when we need to shrink (constraint violated)

**The invariant:** At each step, the window [left, right] contains no duplicates. When we add a duplicate at right, we shrink from left until it's valid again.

**Why a set?** The set gives O(1) duplicate checking. We could use a hash map for O(1) jump-ahead (know exactly where to move left).`,whyPatternWorks:`Variable-size sliding window is perfect when:

1. **Contiguous elements:** We need a substring (not subsequence)
2. **Constraint can be violated and restored:** Duplicates can be removed by shrinking
3. **Optimal window may vary in size:** We're finding the longest/shortest

The two-pointer approach ensures each character is added and removed at most once: O(n) total.`,keyInsights:[`Variable window: size changes based on constraint`,`Right expands, left shrinks when needed`,`Set provides O(1) membership testing`,`Each char added/removed at most once = O(n)`,`Could optimize with hashmap to jump left pointer directly`]},code:`def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)

    return max_len`,inputs:[{name:`s`,type:`string`,default:`abcabcbb`,label:`String`,placeholder:`abcabcbb`}],generateSteps:e=>{let t=e.s,n=[],r=new Set,i=0,a=0,o=t.split(``).map(e=>e.charCodeAt(0));n.push({lineNumber:2,description:`Initialize empty set, left = 0, max_len = 0`,elements:[{type:`array`,id:`chars`,values:o}],variables:{char_set:`{}`,left:0,max_len:0}});for(let e=0;e<t.length;e++){let s=t[e];for(n.push({lineNumber:6,description:`right = ${e}, char = '${s}'`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:o,highlights:[{index:e,style:`active`}]}],variables:{char:s,char_set:`{${[...r].join(`, `)}}`,inSet:r.has(s)}});r.has(s);)r.delete(t[i]),n.push({lineNumber:8,description:`'${s}' in set! Remove '${t[i]}', left = ${i+1}`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:o,highlights:[{index:i,style:`comparing`},{index:e,style:`active`}]}],variables:{removed:t[i],char_set:`{${[...r].join(`, `)}}`}}),i++;r.add(s);let c=e-i+1;if(a=Math.max(a,c),n.push({lineNumber:11,description:`Add '${s}', window [${i}..${e}] length = ${c}, max = ${a}`,elements:[{type:`pointer`,id:`left`,index:i,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:o,highlights:Array.from({length:e-i+1},(e,t)=>({index:i+t,style:`found`}))}],variables:{window_len:c,max_len:a,char_set:`{${[...r].join(`, `)}}`}}),n.length>35)break}return n.push({lineNumber:13,description:`Complete! Longest substring length = ${a}`,elements:[{type:`array`,id:`chars`,values:o}],variables:{max_len:a},isComplete:!0}),n}},{id:`minimum-window-substring`,name:`Minimum Window Substring`,category:`slidingWindow`,difficulty:`Hard`,leetcodeId:76,description:`Find the minimum window in s that contains all characters of t.`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`array`,examples:[{input:`s = "ADOBECODEBANC", t = "ABC"`,output:`"BANC"`,explanation:`BANC is the smallest window containing A, B, and C.`},{input:`s = "a", t = "a"`,output:`"a"`,explanation:`Entire string is the minimum window.`},{input:`s = "a", t = "aa"`,output:`""`,explanation:`Need 2 As but string only has 1.`}],education:{tldr:`Expand until valid (has all chars). Shrink to find minimum. Track best window.`,steps:[{title:`Count target`,description:`Build frequency map of t`,code:`need = Counter(t)`},{title:`Expand right`,description:`Add chars until window is valid`,code:`have[char]++, check if formed`},{title:`Shrink left`,description:`While valid, try to minimize`,code:`while valid: shrink, update best`},{title:`Track minimum`,description:`Save smallest valid window`,code:`if len < best: best = (left, right)`}],remember:[`formed tracks unique chars fully matched`,`Shrink only while window is valid`,`Update minimum INSIDE the shrink loop`],understanding:`This combines variable-size sliding window with frequency counting. We need ALL characters of t (including duplicates).

**Two frequency maps:**
- \`need\`: what we need (from t)
- \`have\`: what we currently have in window

**formed counter:** Tracks how many unique chars have sufficient count. When formed == required, window is valid.

**The shrink loop:** Once valid, we shrink from left, updating minimum at each step. We stop when the window becomes invalid.`,whyPatternWorks:`This is the template for "minimum window containing X" problems:

1. **Expand** until constraint is satisfied
2. **Record** current window (it's valid)
3. **Shrink** to find a smaller valid window
4. **Repeat** until right reaches end

The key insight: we only shrink when valid, so we never miss a potential minimum.`,keyInsights:[`Use frequency maps to track char requirements`,`formed counter avoids comparing entire maps`,`Shrink loop finds minimum while valid`,`Update minimum inside shrink, not outside`,`O(n) because each char added/removed at most once`]},code:`def minWindow(s: str, t: str) -> str:
    if not t or not s:
        return ""

    need = Counter(t)
    have = {}
    required = len(need)
    formed = 0
    left = 0
    result = (float('inf'), 0, 0)  # (length, left, right)

    for right, char in enumerate(s):
        have[char] = have.get(char, 0) + 1

        if char in need and have[char] == need[char]:
            formed += 1

        while formed == required:
            if right - left + 1 < result[0]:
                result = (right - left + 1, left, right)

            have[s[left]] -= 1
            if s[left] in need and have[s[left]] < need[s[left]]:
                formed -= 1
            left += 1

    return "" if result[0] == float('inf') else s[result[1]:result[2]+1]`,inputs:[{name:`s`,type:`string`,default:`ADOBECODEBANC`,label:`String S`,placeholder:`ADOBECODEBANC`},{name:`t`,type:`string`,default:`ABC`,label:`Target T`,placeholder:`ABC`}],generateSteps:e=>{let t=e.s,n=e.t,r=[],i=t.split(``).map(e=>e.charCodeAt(0)),a={};for(let e of n)a[e]=(a[e]||0)+1;let o={},s=Object.keys(a).length,c=0,l=0,u={len:1/0,left:0,right:0};r.push({lineNumber:6,description:`Need: ${JSON.stringify(a)}, required = ${s} unique chars`,elements:[{type:`array`,id:`chars`,values:i}],variables:{need:JSON.stringify(a),required:s}});for(let e=0;e<t.length;e++){let n=t[e];for(o[n]=(o[n]||0)+1,a[n]&&o[n]===a[n]&&c++,r.push({lineNumber:13,description:`Add '${n}': have[${n}]=${o[n]}, formed=${c}/${s}`,elements:[{type:`pointer`,id:`left`,index:l,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:i,highlights:[{index:e,style:`active`}]}],variables:{formed:c,required:s,char:n}});c===s;){let n=e-l+1;n<u.len&&(u={len:n,left:l,right:e},r.push({lineNumber:19,description:`Valid window! Length ${n} is new minimum`,elements:[{type:`pointer`,id:`left`,index:l,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:i,highlights:Array.from({length:e-l+1},(e,t)=>({index:l+t,style:`found`}))}],variables:{window_len:n,result:t.slice(l,e+1)}}));let s=t[l];if(o[s]--,a[s]&&o[s]<a[s]&&c--,r.push({lineNumber:23,description:`Shrink: remove '${s}', left = ${l+1}`,elements:[{type:`pointer`,id:`left`,index:l,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:i,highlights:[{index:l,style:`comparing`}]}],variables:{formed:c,removed:s}}),l++,r.length>40)break}if(r.length>40)break}let d=u.len===1/0?``:t.slice(u.left,u.right+1);return r.push({lineNumber:27,description:`Complete! Minimum window: "${d}"`,elements:[{type:`array`,id:`chars`,values:i,highlights:u.len===1/0?[]:Array.from({length:u.len},(e,t)=>({index:u.left+t,style:`found`}))}],variables:{result:d,length:u.len===1/0?0:u.len},isComplete:!0}),r}},{id:`permutation-in-string`,name:`Permutation in String`,category:`slidingWindow`,difficulty:`Medium`,leetcodeId:567,description:`Check if s2 contains a permutation of s1.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`s1 = "ab", s2 = "eidbaooo"`,output:`true`,explanation:`s2 contains "ba" which is a permutation of "ab".`},{input:`s1 = "ab", s2 = "eidboaoo"`,output:`false`,explanation:`No substring of s2 is a permutation of "ab".`}],education:{tldr:`Fixed window of size len(s1). Slide and compare char frequencies. Match = permutation found.`,steps:[{title:`Window = pattern size`,description:`Fixed window of len(s1)`,code:`window_size = len(s1)`},{title:`Count pattern`,description:`Frequency map of s1`,code:`s1_count = Counter(s1)`},{title:`Slide window`,description:`Add incoming, remove outgoing`,code:`add right, remove left`},{title:`Compare counts`,description:`If frequencies match, found it`,code:`if s1_count == window_count: return True`}],remember:[`Fixed window = pattern length`,`Permutation = same chars, same counts`,`Track matches count for O(1) comparison`],understanding:`A permutation has the exact same characters with the exact same frequencies. So we slide a fixed window of size len(s1) and compare frequencies.

**Optimization:** Instead of comparing all 26 letters each time, we track "matches" - how many letters have equal counts. When matches == 26, frequencies are identical.

**Why fixed window?** A permutation has exactly the same length as the original. So we don't grow or shrink—we slide.

**Why O(1) space?** We use fixed-size arrays of 26 (for lowercase letters), not dynamic structures.`,whyPatternWorks:`This is fixed-size sliding window with frequency comparison:

1. **Fixed size:** Window is always len(s1)
2. **Frequency tracking:** Instead of sorting, compare counts
3. **Match counter:** O(1) validity check per slide

The matches optimization is key: each slide only affects 2 character counts, so we update matches incrementally.`,keyInsights:[`Permutation = same frequency distribution`,`Fixed window size = pattern length`,`Track matches for O(1) comparison`,`Each slide affects at most 2 match counts`,`O(26) = O(1) space for letter frequencies`]},code:`def checkInclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False

    s1_count = [0] * 26
    s2_count = [0] * 26

    for i in range(len(s1)):
        s1_count[ord(s1[i]) - ord('a')] += 1
        s2_count[ord(s2[i]) - ord('a')] += 1

    matches = sum(1 for i in range(26) if s1_count[i] == s2_count[i])

    for i in range(len(s1), len(s2)):
        if matches == 26:
            return True

        # Add right character
        idx = ord(s2[i]) - ord('a')
        s2_count[idx] += 1
        if s2_count[idx] == s1_count[idx]:
            matches += 1
        elif s2_count[idx] == s1_count[idx] + 1:
            matches -= 1

        # Remove left character
        left_idx = ord(s2[i - len(s1)]) - ord('a')
        s2_count[left_idx] -= 1
        if s2_count[left_idx] == s1_count[left_idx]:
            matches += 1
        elif s2_count[left_idx] == s1_count[left_idx] - 1:
            matches -= 1

    return matches == 26`,inputs:[{name:`s1`,type:`string`,default:`ab`,label:`Pattern (s1)`,placeholder:`ab`},{name:`s2`,type:`string`,default:`eidbaooo`,label:`String (s2)`,placeholder:`eidbaooo`}],generateSteps:e=>{let t=e.s1,n=e.s2,r=[],i=n.split(``).map(e=>e.charCodeAt(0));if(t.length>n.length)return r.push({lineNumber:3,description:`s1 longer than s2, return false`,elements:[],variables:{result:!1},isComplete:!0}),r;let a={},o={};for(let e of t)a[e]=(a[e]||0)+1;for(let e=0;e<t.length;e++)o[n[e]]=(o[n[e]]||0)+1;let s=(()=>{let e=0,t=new Set([...Object.keys(a),...Object.keys(o)]);for(let n of t)(a[n]||0)===(o[n]||0)&&e++;return e})(),c=new Set([...Object.keys(a)]).size;r.push({lineNumber:12,description:`Initial window [0..${t.length-1}]: s1=${JSON.stringify(a)}, window=${JSON.stringify(o)}`,elements:[{type:`array`,id:`chars`,values:i,highlights:Array.from({length:t.length},(e,t)=>({index:t,style:`active`}))}],variables:{matches:s,totalChars:c,s1:t,window:n.slice(0,t.length)}});for(let e=t.length;e<n.length;e++){if(Object.keys(a).every(e=>a[e]===(o[e]||0)))return r.push({lineNumber:15,description:`Found permutation at [${e-t.length}..${e-1}]!`,elements:[{type:`array`,id:`chars`,values:i,highlights:Array.from({length:t.length},(n,r)=>({index:e-t.length+r,style:`found`}))}],variables:{result:!0,window:n.slice(e-t.length,e)},isComplete:!0}),r;let s=n[e],c=n[e-t.length];if(o[s]=(o[s]||0)+1,o[c]=(o[c]||0)-1,o[c]===0&&delete o[c],r.push({lineNumber:19,description:`Slide: add '${s}', remove '${c}'`,elements:[{type:`pointer`,id:`left`,index:e-t.length+1,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:i,highlights:[{index:e-t.length,style:`comparing`},{index:e,style:`active`}]}],variables:{add:s,remove:c,window:JSON.stringify(o)}}),r.length>30)break}let l=Object.keys(a).every(e=>a[e]===(o[e]||0));return r.push({lineNumber:33,description:l?`Permutation found!`:`No permutation found`,elements:[{type:`array`,id:`chars`,values:i}],variables:{result:l},isComplete:!0}),r}},{id:`max-points-from-cards`,name:`Maximum Points from Cards`,category:`slidingWindow`,difficulty:`Medium`,leetcodeId:1423,description:`Pick exactly k cards from either end of the row to maximize your score.`,timeComplexity:`O(k)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`cardPoints = [1, 2, 3, 4, 5, 6, 1], k = 3`,output:`12`,explanation:`Take 1 from left, 6 and 1 from right. Total = 1 + 6 + 1 = 12 (or 5 + 6 + 1 = 12).`},{input:`cardPoints = [9, 7, 7, 9, 7, 7, 9], k = 7`,output:`55`,explanation:`Take all cards.`}],education:{tldr:`Taking k from ends = leaving n-k in middle. Find minimum sum window of size n-k.`,steps:[{title:`Invert the problem`,description:`Max from ends = Total - min from middle`,code:`window_size = n - k`},{title:`Find middle window`,description:`Slide window of size n-k`,code:`min_sum = sliding window minimum`},{title:`Subtract from total`,description:`Answer = total - min_sum`,code:`return sum(cards) - min_sum`}],remember:[`Invert: ends problem → middle problem`,`Fixed window of size n-k`,`Minimize middle = maximize ends`],understanding:`This is a clever inversion. Taking k cards from the ends means leaving (n-k) cards in the middle.

**The insight:** If we minimize the sum of the middle (n-k) cards, we maximize what's left (the k end cards).

**Why sliding window?** The middle cards form a contiguous subarray. We slide a window of fixed size (n-k) to find the minimum sum.

**Edge case:** If k == n, take all cards (no middle window).`,whyPatternWorks:`This demonstrates problem transformation:

1. **Original:** Pick k from ends (complex—many combinations)
2. **Transformed:** Find min sum window of fixed size (simple sliding window)

By inverting the problem, we convert a tricky "ends" problem into a standard fixed-size sliding window.`,keyInsights:[`Invert: maximize ends → minimize middle`,`Fixed window of size n-k`,`answer = total - min_window_sum`,`O(n) time with O(1) extra space`,`If k == n, answer is just sum of all cards`]},code:`def maxScore(cardPoints: list[int], k: int) -> int:
    n = len(cardPoints)

    # If taking all cards
    if k == n:
        return sum(cardPoints)

    # Find minimum sum window of size (n - k)
    window_size = n - k
    window_sum = sum(cardPoints[:window_size])
    min_sum = window_sum

    for i in range(window_size, n):
        window_sum += cardPoints[i] - cardPoints[i - window_size]
        min_sum = min(min_sum, window_sum)

    return sum(cardPoints) - min_sum`,inputs:[{name:`cardPoints`,type:`array`,default:[1,2,3,4,5,6,1],label:`Card Points`,placeholder:`1, 2, 3, 4, 5, 6, 1`},{name:`k`,type:`number`,default:3,label:`Cards to Pick (k)`,placeholder:`3`}],generateSteps:e=>{let t=e.cardPoints,n=e.k,r=t.length,i=[],a=t.reduce((e,t)=>e+t,0);if(n>=r)return i.push({lineNumber:5,description:`k >= n, take all cards. Sum = ${a}`,elements:[{type:`array`,id:`cards`,values:t,highlights:t.map((e,t)=>({index:t,style:`found`}))}],variables:{result:a},isComplete:!0}),i;let o=r-n;i.push({lineNumber:8,description:`Invert: find min sum of middle ${o} cards. Total = ${a}`,elements:[{type:`array`,id:`cards`,values:t}],variables:{total:a,window_size:o,k:n}});let s=t.slice(0,o).reduce((e,t)=>e+t,0),c=s;i.push({lineNumber:10,description:`Initial window [0..${o-1}]: sum = ${s}`,elements:[{type:`array`,id:`cards`,values:t,highlights:Array.from({length:o},(e,t)=>({index:t,style:`active`}))},{type:`bracket`,id:`window`,left:0,right:o-1,value:`sum = ${s}`}],variables:{window_sum:s,min_sum:c}});for(let e=o;e<r;e++){let n=t[e],r=t[e-o];if(s+=n-r,i.push({lineNumber:14,description:`Slide: add ${n}, remove ${r}. Window sum = ${s}`,elements:[{type:`array`,id:`cards`,values:t,highlights:[{index:e-o,style:`comparing`},{index:e,style:`active`},...Array.from({length:o-1},(t,n)=>({index:e-o+1+n,style:`found`}))]},{type:`bracket`,id:`window`,left:e-o+1,right:e,value:`sum = ${s}`}],variables:{window_sum:s,add:n,remove:r}}),s<c&&(c=s,i.push({lineNumber:15,description:`New minimum! min_sum = ${c}`,elements:[{type:`array`,id:`cards`,values:t,highlights:Array.from({length:o},(t,n)=>({index:e-o+1+n,style:`found`}))}],variables:{min_sum:c}})),i.length>25)break}let l=a-c;return i.push({lineNumber:17,description:`Max points = ${a} - ${c} = ${l}`,elements:[{type:`array`,id:`cards`,values:t}],variables:{total:a,min_sum:c,result:l},isComplete:!0}),i}},{id:`longest-repeating-char-replacement`,name:`Longest Repeating Character Replacement`,category:`slidingWindow`,difficulty:`Medium`,leetcodeId:424,description:`Find the length of longest substring with same letter after replacing at most k characters.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`s = "ABAB", k = 2`,output:`4`,explanation:`Replace 2 As with Bs (or vice versa) to get "AAAA" or "BBBB".`},{input:`s = "AABABBA", k = 1`,output:`4`,explanation:`Replace one B in "AABA" to get "AAAA".`}],education:{tldr:`Window is valid if (length - max_freq) <= k. Expand right, shrink left when invalid.`,steps:[{title:`Expand right`,description:`Add char, update frequency`,code:`count[char]++`},{title:`Track max freq`,description:`Most common char in window`,code:`max_freq = max(counts)`},{title:`Check validity`,description:`Replacements needed = length - max_freq`,code:`if len - max_freq > k: shrink`},{title:`Update result`,description:`Track longest valid window`,code:`result = max(result, right - left + 1)`}],remember:[`Replacements needed = window_len - max_freq`,`Keep most frequent char, replace others`,`Shrink when replacements > k`],understanding:`For any window, the minimum replacements needed equals: window_length - count of most frequent char.

**Why?** We keep the most common character and replace all others. If this number exceeds k, the window is invalid.

**Key insight:** We don't actually replace anything. We just check IF we could make all chars the same with ≤ k replacements.

**Optimization:** We don't need to track exact max_freq. If it never increases, shrinking doesn't help—we only care about finding longer valid windows.`,whyPatternWorks:`This is variable-size sliding window with a validity condition:

**Valid window:** replacements_needed ≤ k
**replacements_needed:** window_length - max_char_frequency

When invalid (too many replacements needed), we shrink from left. When valid, we try to expand right.`,keyInsights:[`replacements = len - max_freq_in_window`,`Shrink when replacements > k`,`max_freq only needs to track the historical max (optimization)`,`O(26) = O(1) space for letter frequencies`,`Each char added/removed at most once = O(n)`]},code:`def characterReplacement(s: str, k: int) -> int:
    count = {}
    max_freq = 0
    left = 0
    result = 0

    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_freq = max(max_freq, count[s[right]])

        # Window is invalid if we need more than k replacements
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1

        result = max(result, right - left + 1)

    return result`,inputs:[{name:`s`,type:`string`,default:`AABABBA`,label:`String`,placeholder:`AABABBA`},{name:`k`,type:`number`,default:1,label:`Max Replacements (k)`,placeholder:`1`}],generateSteps:e=>{let t=e.s,n=e.k,r=[],i=t.split(``).map(e=>e.charCodeAt(0)),a={},o=0,s=0,c=0;r.push({lineNumber:2,description:`Initialize: k = ${n} replacements allowed`,elements:[{type:`array`,id:`chars`,values:i}],variables:{k:n,max_freq:0,result:0}});for(let e=0;e<t.length;e++){let l=t[e];a[l]=(a[l]||0)+1,o=Math.max(o,a[l]);let u=e-s+1,d=u-o;for(r.push({lineNumber:9,description:`Add '${l}': window [${s}..${e}], max_freq=${o}, need ${d} replacements`,elements:[{type:`pointer`,id:`left`,index:s,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:i,highlights:[{index:e,style:`active`}]}],variables:{window_len:u,max_freq:o,replacements:d,k:n}});e-s+1-o>n;)r.push({lineNumber:12,description:`Invalid! ${e-s+1} - ${o} = ${e-s+1-o} > ${n}. Shrink left.`,elements:[{type:`pointer`,id:`left`,index:s,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:i,highlights:[{index:s,style:`comparing`}]}],variables:{shrinking:!0}}),a[t[s]]--,s++;if(c=Math.max(c,e-s+1),r.push({lineNumber:16,description:`Valid window [${s}..${e}], length = ${e-s+1}. Result = ${c}`,elements:[{type:`pointer`,id:`left`,index:s,label:`L`,color:`#16A34A`},{type:`pointer`,id:`right`,index:e,label:`R`,color:`#3B82F6`},{type:`array`,id:`chars`,values:i,highlights:Array.from({length:e-s+1},(e,t)=>({index:s+t,style:`found`}))}],variables:{result:c,window_len:e-s+1}}),r.length>30)break}return r.push({lineNumber:18,description:`Complete! Longest = ${c}`,elements:[{type:`array`,id:`chars`,values:i}],variables:{result:c},isComplete:!0}),r}},{id:`max-sum-distinct-subarrays-k`,name:`Max Sum of Distinct Subarrays of Size K`,category:`slidingWindow`,difficulty:`Medium`,leetcodeId:2461,description:`Find maximum sum of a subarray of size k with all distinct elements.`,timeComplexity:`O(n)`,spaceComplexity:`O(k)`,visualizationType:`array`,examples:[{input:`nums = [1, 5, 4, 2, 9, 9, 9], k = 3`,output:`15`,explanation:`[1, 5, 4] or [5, 4, 2] or [4, 2, 9] all have distinct elements. [5, 4, 2] and [4, 2, 9] have sum 11 and 15.`},{input:`nums = [4, 4, 4], k = 3`,output:`0`,explanation:`No subarray of size 3 has all distinct elements.`}],education:{tldr:`Fixed window + set for uniqueness. Only count sum when window has k distinct elements.`,steps:[{title:`Fixed window size`,description:`Maintain exactly k elements`,code:`window_size = k`},{title:`Track elements`,description:`Use set (or map with counts)`,code:`element_set or element_count`},{title:`Check distinct`,description:`Only valid if set size == k`,code:`if len(set) == k: update max`},{title:`Handle duplicates`,description:`When adding duplicate, don't increment distinct`,code:`count[num]++ tracks frequency`}],remember:[`Fixed window of size k`,`Need ALL k elements distinct`,`Use count map for sliding (add/remove)`],understanding:`This combines fixed-size sliding window with a uniqueness constraint.

**Two conditions for valid window:**
1. Size exactly k
2. All k elements are distinct

**Why a map instead of set?** When sliding, we need to know if an element appears multiple times. A set can't tell us if the outgoing element was a duplicate or unique.

**Using counts:** count[x] = frequency of x in window. When count goes to 0, element leaves; when it goes from 0→1, element enters.`,whyPatternWorks:`Fixed-size window with validity constraint:

1. Slide window of size k
2. Maintain element frequency map
3. Track count of distinct elements
4. When distinct == k, window is valid—update max sum`,keyInsights:[`Fixed window + distinctness constraint`,`Frequency map tracks duplicates`,`distinct_count == k means valid window`,`Update distinct count on add/remove`,`O(n) time, O(k) space for the map`]},code:`def maximumSubarraySum(nums: list[int], k: int) -> int:
    from collections import defaultdict

    count = defaultdict(int)
    window_sum = 0
    max_sum = 0

    for i in range(len(nums)):
        # Add right element
        count[nums[i]] += 1
        window_sum += nums[i]

        # Remove left element if window > k
        if i >= k:
            left_num = nums[i - k]
            count[left_num] -= 1
            if count[left_num] == 0:
                del count[left_num]
            window_sum -= left_num

        # Check if valid (size k and all distinct)
        if i >= k - 1 and len(count) == k:
            max_sum = max(max_sum, window_sum)

    return max_sum`,inputs:[{name:`nums`,type:`array`,default:[1,5,4,2,9,9,9],label:`Numbers`,placeholder:`1, 5, 4, 2, 9, 9, 9`},{name:`k`,type:`number`,default:3,label:`Window Size (k)`,placeholder:`3`}],generateSteps:e=>{let t=e.nums,n=e.k,r=[],i={},a=0,o=0;r.push({lineNumber:4,description:`Find max sum of subarrays with k=${n} distinct elements`,elements:[{type:`array`,id:`nums`,values:t}],variables:{k:n,max_sum:0}});for(let e=0;e<t.length;e++){if(i[t[e]]=(i[t[e]]||0)+1,a+=t[e],e>=n){let r=t[e-n];i[r]--,i[r]===0&&delete i[r],a-=r}let s=Object.keys(i).length,c=e>=n-1&&s===n;if(r.push({lineNumber:9,description:`Window [${Math.max(0,e-n+1)}..${e}]: sum=${a}, distinct=${s}${c?` (valid)`:``}`,elements:[{type:`array`,id:`nums`,values:t,highlights:e>=n-1?Array.from({length:n},(t,r)=>({index:e-n+1+r,style:c?`found`:`active`})):Array.from({length:e+1},(e,t)=>({index:t,style:`active`}))},...e>=n-1?[{type:`bracket`,id:`window`,left:e-n+1,right:e,value:`sum=${a}`}]:[]],variables:{window_sum:a,distinct:s,valid:c}}),c&&a>o&&(o=a,r.push({lineNumber:22,description:`New max! ${o}`,elements:[{type:`array`,id:`nums`,values:t,highlights:Array.from({length:n},(t,r)=>({index:e-n+1+r,style:`found`}))}],variables:{max_sum:o}})),r.length>25)break}return r.push({lineNumber:24,description:`Complete! Max sum with ${n} distinct = ${o}`,elements:[{type:`array`,id:`nums`,values:t}],variables:{max_sum:o},isComplete:!0}),r}}]},{id:`linkedList`,name:`Linked List`,color:`var(--accent-linked-list)`,algorithms:[{id:`reverse-linked-list`,name:`Reverse Linked List`,category:`linkedList`,difficulty:`Easy`,leetcodeId:206,description:`Reverse a singly linked list iteratively.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`linkedList`,examples:[{input:`head = [1,2,3,4,5]`,output:`[5,4,3,2,1]`,explanation:`Reverse all pointers: 5→4→3→2→1.`},{input:`head = [1,2]`,output:`[2,1]`,explanation:`Simple swap: 2→1.`},{input:`head = []`,output:`[]`,explanation:`Empty list stays empty.`}],education:{tldr:`Three pointers: prev, curr, next. Flip curr.next to prev, advance all three.`,steps:[{title:`Initialize`,description:`prev = None, curr = head`,code:`prev, curr = None, head`},{title:`Save next`,description:`Before we break the link`,code:`next_temp = curr.next`},{title:`Reverse pointer`,description:`Point curr back to prev`,code:`curr.next = prev`},{title:`Advance`,description:`Move prev and curr forward`,code:`prev, curr = curr, next_temp`}],remember:[`prev, curr, next_temp—three pointers`,`Save next BEFORE reversing`,`Return prev (new head)`],understanding:`Reversal is about flipping each pointer direction.

**The challenge:** When we flip curr.next to prev, we lose access to the rest of the list! Solution: save next_temp first.

**Three pointers track:**
- prev: the reversed portion (grows)
- curr: current node being processed
- next_temp: saved reference to continue forward

**End state:** curr becomes null, prev is the new head.`,whyPatternWorks:`Each iteration does one reversal:

\`\`\`
Before: None ← [1] → [2] → [3]
             prev  curr

Step: save next_temp = [2]
      curr.next = prev (flip!)
      prev = curr, curr = next_temp

After:  None ← [1] ← [2] → [3]
                    prev  curr
\`\`\`

We "zip" through the list, flipping each arrow.`,keyInsights:[`Save next before breaking link`,`Three pointers: prev, curr, next_temp`,`O(1) space—in-place reversal`,`Alternative: recursive approach`,`Return prev, not curr (curr is null at end)`]},code:`def reverseList(head: ListNode) -> ListNode:
    prev = None
    curr = head

    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp

    return prev`,inputs:[{name:`values`,type:`string`,default:`1,2,3,4,5`,label:`List Values`,placeholder:`1,2,3,4,5`}],generateSteps:e=>{let t=e.values.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=[];if(t.length===0)return n.push({lineNumber:2,description:`Empty list, return None`,elements:[],variables:{prev:null,curr:null},isComplete:!0}),n;n.push({lineNumber:2,description:`Initialize prev = None, curr = head`,elements:[{type:`array`,id:`list`,values:[...t],pointers:[{index:0,label:`curr`,color:`#3B82F6`}]}],variables:{prev:`None`,curr:t[0]}});let r=[];for(let e=0;e<t.length&&n.length<20;e++){let i=t[e],a=e+1<t.length?t[e+1]:null;n.push({lineNumber:5,description:`Save next_temp = ${a??`None`}`,elements:[{type:`array`,id:`list`,values:[...t],pointers:[{index:e,label:`curr`,color:`#3B82F6`}]},{type:`array`,id:`reversed`,values:[...r],styles:r.map(()=>`found`)}],variables:{prev:r.length>0?r[0]:`None`,curr:i,next_temp:a??`None`}}),r.unshift(i),n.push({lineNumber:7,description:`Move curr.next to prev, advance: prev=${i}, curr=${a??`None`}`,elements:[{type:`array`,id:`list`,values:[...t],pointers:a===null?[]:[{index:e+1,label:`curr`,color:`#3B82F6`}]},{type:`array`,id:`reversed`,values:[...r],styles:r.map(()=>`found`)}],variables:{prev:i,curr:a??`None`}})}return n.push({lineNumber:10,description:`Complete! Reversed list: ${r.join(` → `)}`,elements:[{type:`array`,id:`reversed`,values:[...r],styles:r.map(()=>`found`)}],variables:{result:r},isComplete:!0}),n}},{id:`merge-two-sorted-lists`,name:`Merge Two Sorted Lists`,category:`linkedList`,difficulty:`Easy`,leetcodeId:21,description:`Merge two sorted linked lists into one sorted list.`,timeComplexity:`O(n + m)`,spaceComplexity:`O(1)`,visualizationType:`linkedList`,examples:[{input:`l1 = [1,2,4], l2 = [1,3,4]`,output:`[1,1,2,3,4,4]`,explanation:`Interleave maintaining sorted order.`},{input:`l1 = [], l2 = []`,output:`[]`,explanation:`Both empty, result is empty.`},{input:`l1 = [], l2 = [0]`,output:`[0]`,explanation:`One empty, result is the other.`}],education:{tldr:`Dummy node + compare heads. Take smaller, advance that pointer.`,steps:[{title:`Create dummy`,description:`Simplifies edge cases`,code:`dummy = ListNode(0); curr = dummy`},{title:`Compare heads`,description:`Take the smaller value`,code:`if l1.val <= l2.val: take l1`},{title:`Link and advance`,description:`Add to result, move pointer`,code:`curr.next = l1; l1 = l1.next`},{title:`Append remainder`,description:`One list exhausted, append other`,code:`curr.next = l1 or l2`}],remember:[`Dummy node avoids null checks`,`Compare, take smaller, advance`,`Append leftover at end`],understanding:`This is the merge step from merge sort applied to linked lists.

**Dummy node trick:** Instead of handling "what if result is empty?" we start with a dummy. Return dummy.next.

**The algorithm:**
1. Compare heads of both lists
2. Take smaller value, link it
3. Advance that list's pointer
4. Repeat until one exhausts
5. Append remainder (already sorted!)`,whyPatternWorks:`Since both lists are sorted:

- The smallest overall element is at one of the heads
- After taking it, the next smallest is again at a head
- We never need to look back

**O(1) space:** We're rewiring existing nodes, not creating new ones (except dummy).`,keyInsights:[`Merge sort merge step`,`Dummy node simplifies code`,`O(n + m) time, O(1) space`,`Leftover appended directly (sorted)`,`Foundation for merge k lists`]},code:`def mergeTwoLists(l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode(0)
    curr = dummy

    while l1 and l2:
        if l1.val <= l2.val:
            curr.next = l1
            l1 = l1.next
        else:
            curr.next = l2
            l2 = l2.next
        curr = curr.next

    curr.next = l1 or l2
    return dummy.next`,inputs:[{name:`list1`,type:`string`,default:`1,2,4`,label:`List 1`,placeholder:`1,2,4`},{name:`list2`,type:`string`,default:`1,3,4`,label:`List 2`,placeholder:`1,3,4`}],generateSteps:e=>{let t=e.list1,n=e.list2,r=t.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),i=n.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),a=[];a.push({lineNumber:2,description:`Create dummy node and curr pointer`,elements:[{type:`array`,id:`l1`,values:[...r],pointers:r.length>0?[{index:0,label:`l1`,color:`#3B82F6`}]:[]},{type:`array`,id:`l2`,values:[...i],pointers:i.length>0?[{index:0,label:`l2`,color:`#F59E0B`}]:[]}],variables:{dummy:0,merged:[]}});let o=[],s=0,c=0;for(;s<r.length&&c<i.length&&a.length<20;)r[s]<=i[c]?(a.push({lineNumber:6,description:`l1.val (${r[s]}) <= l2.val (${i[c]}), take from l1`,elements:[{type:`array`,id:`l1`,values:[...r],pointers:[{index:s,label:`l1`,color:`#3B82F6`}],styles:r.map((e,t)=>t<s?`found`:`default`)},{type:`array`,id:`l2`,values:[...i],pointers:[{index:c,label:`l2`,color:`#F59E0B`}],styles:i.map((e,t)=>t<c?`found`:`default`)},{type:`array`,id:`merged`,values:[...o,r[s]],styles:[...o,r[s]].map(()=>`found`)}],variables:{l1_val:r[s],l2_val:i[c],taking:`l1`}}),o.push(r[s]),s++):(a.push({lineNumber:9,description:`l1.val (${r[s]}) > l2.val (${i[c]}), take from l2`,elements:[{type:`array`,id:`l1`,values:[...r],pointers:[{index:s,label:`l1`,color:`#3B82F6`}],styles:r.map((e,t)=>t<s?`found`:`default`)},{type:`array`,id:`l2`,values:[...i],pointers:[{index:c,label:`l2`,color:`#F59E0B`}],styles:i.map((e,t)=>t<c?`found`:`default`)},{type:`array`,id:`merged`,values:[...o,i[c]],styles:[...o,i[c]].map(()=>`found`)}],variables:{l1_val:r[s],l2_val:i[c],taking:`l2`}}),o.push(i[c]),c++);for(;s<r.length;)o.push(r[s]),s++;for(;c<i.length;)o.push(i[c]),c++;return a.push({lineNumber:14,description:`Complete! Merged list: ${o.join(` → `)}`,elements:[{type:`array`,id:`merged`,values:o,styles:o.map(()=>`found`)}],variables:{result:o},isComplete:!0}),a}},{id:`linked-list-cycle`,name:`Linked List Cycle`,category:`linkedList`,difficulty:`Easy`,leetcodeId:141,description:`Detect if a linked list has a cycle using Floyd's algorithm.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`linkedList`,examples:[{input:`head = [3,2,0,-4], pos = 1`,output:`true`,explanation:`Tail connects to node at index 1, creating a cycle.`},{input:`head = [1,2], pos = 0`,output:`true`,explanation:`Tail connects to head, creating a cycle.`},{input:`head = [1], pos = -1`,output:`false`,explanation:`No cycle—single node points to null.`}],education:{tldr:`Two pointers: slow moves 1, fast moves 2. If they meet, there's a cycle.`,steps:[{title:`Initialize both at head`,description:`slow and fast start together`,code:`slow = fast = head`},{title:`Move at different speeds`,description:`slow moves 1, fast moves 2`,code:`slow = slow.next; fast = fast.next.next`},{title:`Check for meeting`,description:`If they meet, cycle exists`,code:`if slow == fast: return True`},{title:`Fast reaches end`,description:`No cycle if fast hits null`,code:`while fast and fast.next`}],remember:[`Slow: 1 step, Fast: 2 steps`,`Meet = cycle, End = no cycle`,`O(1) space (no hash set needed)`],understanding:`This is Floyd's Tortoise and Hare algorithm. Think of it like two runners on a track.

**Why do they meet?** If there's a cycle, the fast pointer will "lap" the slow pointer. They must eventually be at the same node.

**Why O(1) space?** We only use two pointers instead of a hash set to track visited nodes.

**Intuition:** In a cycle, the fast pointer gains 1 step per iteration. If the cycle has length k, they'll meet within k iterations after slow enters the cycle.`,whyPatternWorks:`The math is elegant:

1. When slow enters the cycle, fast is somewhere ahead in the cycle
2. Each step, the gap between them decreases by 1
3. Eventually the gap becomes 0 = they meet

**If no cycle:** Fast hits null (end of list). Loop terminates naturally.`,keyInsights:[`Floyd's algorithm: tortoise and hare`,`Fast gains 1 step per iteration in a cycle`,`O(1) space vs O(n) for hash set approach`,`Also used to find cycle START (different problem)`,`Works because relative speed = 1 step/iteration`]},code:`def hasCycle(head: ListNode) -> bool:
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False`,inputs:[{name:`values`,type:`string`,default:`3,2,0,-4`,label:`List Values`,placeholder:`3,2,0,-4`},{name:`cyclePos`,type:`number`,default:1,label:`Cycle Position (-1 for no cycle)`,placeholder:`1`}],generateSteps:e=>{let t=e.values.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=e.cyclePos,r=[];if(t.length===0)return r.push({lineNumber:1,description:`Empty list - no cycle possible`,elements:[],variables:{hasCycle:!1},isComplete:!0}),r;let i=n>=0&&n<t.length,a=(e,r)=>{let a=e;for(let e=0;e<r;e++){let e=a+1;if(e>=t.length)if(i)a=n;else return null;else a=e}return a};r.push({lineNumber:2,description:`Initialize slow and fast pointers at head`,elements:[{type:`array`,id:`list`,values:[...t],pointers:[{index:0,label:`slow`,color:`#3B82F6`},{index:0,label:`fast`,color:`#EF4444`}]}],variables:{slow:0,fast:0,cycleAt:i?n:`none`}});let o=0,s=0;for(let e=0;e<25&&r.length<20;e++){let e=a(o,1),n=a(s,2);if(n===null)return r.push({lineNumber:4,description:`Fast pointer reached end of list - no cycle`,elements:[{type:`array`,id:`list`,values:[...t],pointers:[{index:o,label:`slow`,color:`#3B82F6`}]}],variables:{hasCycle:!1},isComplete:!0}),r;if(o=e,s=n,r.push({lineNumber:5,description:`Move slow to ${o}, fast to ${s}`,elements:[{type:`array`,id:`list`,values:[...t],pointers:[{index:o,label:`slow`,color:`#3B82F6`},{index:s,label:`fast`,color:`#EF4444`}]}],variables:{slow:o,fast:s,slow_val:t[o],fast_val:t[s]}}),o===s)return r.push({lineNumber:8,description:`Cycle detected! slow == fast at index ${o}`,elements:[{type:`array`,id:`list`,values:[...t],pointers:[{index:o,label:`meet`,color:`#16A34A`}],highlights:t.map((e,t)=>({index:t,style:`found`}))}],variables:{hasCycle:!0,meetAt:o},isComplete:!0}),r}return r.push({lineNumber:10,description:`Algorithm terminated`,elements:[{type:`array`,id:`list`,values:[...t]}],variables:{hasCycle:i},isComplete:!0}),r}},{id:`remove-nth-from-end`,name:`Remove Nth From End`,category:`linkedList`,difficulty:`Medium`,leetcodeId:19,description:`Remove the nth node from the end of the list.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`linkedList`,examples:[{input:`head = [1,2,3,4,5], n = 2`,output:`[1,2,3,5]`,explanation:`Remove 4 (2nd from end). Result: 1→2→3→5.`},{input:`head = [1], n = 1`,output:`[]`,explanation:`Remove only node, list becomes empty.`},{input:`head = [1,2], n = 1`,output:`[1]`,explanation:`Remove last node (1st from end).`}],education:{tldr:`Two pointers n+1 apart. When fast hits end, slow is just before target.`,steps:[{title:`Add dummy node`,description:`Handles edge case of removing head`,code:`dummy = ListNode(0, head)`},{title:`Move fast n+1 ahead`,description:`Create gap of n+1 nodes`,code:`for _ in range(n+1): fast = fast.next`},{title:`Move both to end`,description:`Maintain the gap`,code:`while fast: both move`},{title:`Remove target`,description:`Skip the node after slow`,code:`slow.next = slow.next.next`}],remember:[`Dummy node before head`,`Fast moves n+1 ahead (not n)`,`Slow ends at node BEFORE target`],understanding:`This is a one-pass solution using the "two pointers with fixed gap" pattern.

**Why n+1?** We want slow to stop at the node BEFORE the one to delete. The gap of n+1 ensures this.

**Why dummy node?** If we're deleting the head (n = length), slow needs to be at dummy to set dummy.next = head.next.

**Key insight:** When fast reaches null, slow is exactly n+1 nodes behind—right before the target.`,whyPatternWorks:`The gap maintains the distance:

\`\`\`
[D] → [1] → [2] → [3] → [4] → [5] → null
 ↑                             ↑
slow                          fast (after n+1=3 moves for n=2)

Move both until fast = null:
[D] → [1] → [2] → [3] → [4] → [5] → null
                   ↑                  ↑
                  slow               fast

Now slow.next = [4] = target. Delete it!
\`\`\``,keyInsights:[`One pass with two pointers`,`Gap of n+1 positions slow before target`,`Dummy node handles head removal`,`slow.next = slow.next.next removes target`,`O(1) space, O(n) time`]},code:`def removeNthFromEnd(head: ListNode, n: int) -> ListNode:
    dummy = ListNode(0, head)
    slow = fast = dummy

    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next

    # Move both until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next

    # Remove the node
    slow.next = slow.next.next
    return dummy.next`,inputs:[{name:`values`,type:`string`,default:`1,2,3,4,5`,label:`List Values`,placeholder:`1,2,3,4,5`},{name:`n`,type:`number`,default:2,label:`N (from end)`,placeholder:`2`}],generateSteps:e=>{let t=e.values.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=e.n,r=[];if(t.length===0||n>t.length)return r.push({lineNumber:1,description:`Invalid input`,elements:[],variables:{error:`n is larger than list length`},isComplete:!0}),r;let i=[0,...t];r.push({lineNumber:2,description:`Create dummy node, initialize slow and fast at dummy`,elements:[{type:`array`,id:`list`,values:i,pointers:[{index:0,label:`slow`,color:`#3B82F6`},{index:0,label:`fast`,color:`#EF4444`}]}],variables:{n,slow:`dummy`,fast:`dummy`}});let a=0;for(let e=0;e<=n&&a<i.length;e++){a++;let t=[{index:0,label:`slow`,color:`#3B82F6`}];a<i.length&&t.push({index:a,label:`fast`,color:`#EF4444`}),r.push({lineNumber:6,description:`Move fast ahead: step ${e+1}/${n+1}`,elements:[{type:`array`,id:`list`,values:i,pointers:t}],variables:{fast_pos:a,steps_moved:e+1}})}let o=0;for(;a<i.length&&r.length<20;){o++,a++;let e=[];o<i.length&&e.push({index:o,label:`slow`,color:`#3B82F6`}),a<i.length&&e.push({index:a,label:`fast`,color:`#EF4444`}),r.push({lineNumber:10,description:`Move both: slow to ${o}, fast to ${a}`,elements:[{type:`array`,id:`list`,values:i,pointers:e}],variables:{slow_pos:o,fast_pos:a}})}let s=o+1,c=i.filter((e,t)=>t!==s),l=[];o<i.length&&l.push({index:o,label:`slow`,color:`#3B82F6`}),r.push({lineNumber:14,description:`Remove node at index ${s} (value: ${i[s]})`,elements:[{type:`array`,id:`list`,values:i,pointers:l,highlights:[{index:s,style:`comparing`}]}],variables:{removed:i[s]}});let u=c.slice(1);return r.push({lineNumber:15,description:`Complete! Result: ${u.join(` → `)}`,elements:[{type:`array`,id:`result`,values:u,highlights:u.map((e,t)=>({index:t,style:`found`}))}],variables:{result:u},isComplete:!0}),r}},{id:`reorder-list`,name:`Reorder List`,category:`linkedList`,difficulty:`Medium`,leetcodeId:143,description:`Reorder list: L0→Ln→L1→Ln-1→L2→Ln-2→...`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`linkedList`,examples:[{input:`head = [1,2,3,4]`,output:`[1,4,2,3]`,explanation:`Interleave from ends: 1→4→2→3.`},{input:`head = [1,2,3,4,5]`,output:`[1,5,2,4,3]`,explanation:`Odd length: 1→5→2→4→3 (middle stays in place).`}],education:{tldr:`Find middle, reverse second half, merge alternating.`,steps:[{title:`Find middle`,description:`Slow/fast pointers`,code:`while fast.next and fast.next.next: move`},{title:`Split`,description:`Disconnect at middle`,code:`second = slow.next; slow.next = None`},{title:`Reverse second`,description:`Standard reverse`,code:`while curr: reverse`},{title:`Merge alternating`,description:`Interleave nodes`,code:`first.next = second; second.next = first_next`}],remember:[`Three classic operations combined`,`Find middle, reverse, merge`,`In-place with O(1) space`],understanding:`This problem combines three fundamental linked list operations:

**Step 1: Find middle** using slow/fast pointers. For [1,2,3,4,5], middle is 3.

**Step 2: Reverse second half.** [4,5] becomes [5,4].

**Step 3: Merge alternating.** First half [1,2,3] + reversed [5,4] = [1,5,2,4,3].

**Why this works:** We're essentially folding the list in half and interleaving.`,whyPatternWorks:`The pattern works because reordering is equivalent to:

\`\`\`
Original: 1 → 2 → 3 → 4 → 5
                 ↓
First:  [1, 2, 3]
Second: [5, 4] (reversed)
                 ↓
Merge:  1 → 5 → 2 → 4 → 3
\`\`\`

Each operation is O(n) and O(1) space. Combined: O(n) time, O(1) space.`,keyInsights:[`Combine three classic operations`,`Find middle (slow/fast)`,`Reverse second half`,`Merge two lists alternating`,`O(n) time, O(1) space`]},code:`def reorderList(head: ListNode) -> None:
    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    prev, curr = None, slow.next
    slow.next = None
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp

    # Merge two halves
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,inputs:[{name:`values`,type:`string`,default:`1,2,3,4,5`,label:`List Values`,placeholder:`1,2,3,4,5`}],generateSteps:e=>{let t=e.values.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=[];if(t.length<=2)return n.push({lineNumber:1,description:`List too short to reorder: ${t.join(` → `)}`,elements:[{type:`array`,id:`list`,values:[...t]}],variables:{result:t},isComplete:!0}),n;n.push({lineNumber:2,description:`Find middle using slow/fast pointers`,elements:[{type:`array`,id:`list`,values:[...t],pointers:[{index:0,label:`slow`,color:`#3B82F6`},{index:0,label:`fast`,color:`#EF4444`}]}],variables:{phase:`finding middle`}});let r=Math.floor(t.length/2);n.push({lineNumber:5,description:`Middle found at index ${r}`,elements:[{type:`array`,id:`list`,values:[...t],pointers:[{index:r,label:`mid`,color:`#3B82F6`}]}],variables:{midIndex:r,midValue:t[r]}});let i=t.slice(0,r+1),a=t.slice(r+1);n.push({lineNumber:8,description:`Split into two halves`,elements:[{type:`array`,id:`first`,values:i},{type:`array`,id:`second`,values:a}],variables:{first:i,second:a}});let o=[...a].reverse();n.push({lineNumber:13,description:`Reverse second half: ${o.join(` → `)}`,elements:[{type:`array`,id:`first`,values:i},{type:`array`,id:`second`,values:o,styles:o.map(()=>`found`)}],variables:{reversedSecond:o}});let s=[],c=0,l=0;for(;c<i.length||l<o.length;)c<i.length&&s.push(i[c++]),l<o.length&&s.push(o[l++]);return n.push({lineNumber:17,description:`Interleave the two halves`,elements:[{type:`array`,id:`result`,values:s,styles:s.map(()=>`found`)}],variables:{merging:!0}}),n.push({lineNumber:21,description:`Complete! Reordered: ${s.join(` → `)}`,elements:[{type:`array`,id:`result`,values:s,styles:s.map(()=>`found`)}],variables:{result:s},isComplete:!0}),n}},{id:`swap-nodes-in-pairs`,name:`Swap Nodes in Pairs`,category:`linkedList`,difficulty:`Medium`,leetcodeId:24,description:`Swap every two adjacent nodes in a linked list.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`linkedList`,examples:[{input:`head = [1,2,3,4]`,output:`[2,1,4,3]`,explanation:`Swap pairs: (1,2)→(2,1) and (3,4)→(4,3).`},{input:`head = []`,output:`[]`,explanation:`Empty list stays empty.`},{input:`head = [1]`,output:`[1]`,explanation:`Single node has no pair to swap with.`},{input:`head = [1,2,3]`,output:`[2,1,3]`,explanation:`Odd length: swap first pair, last node stays.`}],education:{tldr:`Use dummy node. For each pair: rewire prev→second→first→next.`,steps:[{title:`Create dummy`,description:`Points to head, handles edge cases`,code:`dummy = ListNode(0, head)`},{title:`Get pair`,description:`first = prev.next, second = first.next`,code:`first, second = prev.next, prev.next.next`},{title:`Rewire`,description:`prev→second, second→first, first→rest`,code:`prev.next = second; first.next = second.next; second.next = first`},{title:`Advance`,description:`Move prev to first (now second in swapped order)`,code:`prev = first`}],remember:[`Dummy node simplifies first swap`,`Need prev pointer for rewiring`,`Three pointer updates per swap`],understanding:`The trick is tracking the right pointers. For each pair (A→B), we need to make (B→A).

**But there's a catch:** We also need to update the previous node's pointer. That's why we track \`prev\`.

**The rewiring:**
\`\`\`
Before: prev → A → B → C
After:  prev → B → A → C
\`\`\`

**Three steps:**
1. prev.next = B (skip A)
2. A.next = C (skip B)
3. B.next = A (insert A after B)`,whyPatternWorks:`Using a dummy node means we don't special-case the head:

\`\`\`
dummy → 1 → 2 → 3 → 4
  ↓
prev = dummy
first = 1, second = 2

After swap:
dummy → 2 → 1 → 3 → 4

Move prev to 1, repeat for (3,4)
\`\`\`

The dummy node becomes the new "head" container—return dummy.next.`,keyInsights:[`Dummy node handles head swap`,`prev pointer required for rewiring`,`Three pointer reassignments per pair`,`Odd nodes: last one stays in place`,`Can also solve recursively`]},code:`def swapPairs(head: ListNode) -> ListNode:
    dummy = ListNode(0, head)
    prev = dummy

    while prev.next and prev.next.next:
        first = prev.next
        second = first.next

        # Swap
        prev.next = second
        first.next = second.next
        second.next = first

        # Move to next pair
        prev = first

    return dummy.next`,inputs:[{name:`values`,type:`string`,default:`1,2,3,4`,label:`List Values`,placeholder:`1,2,3,4`}],generateSteps:e=>{let t=e.values.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=[];if(t.length<2)return n.push({lineNumber:1,description:t.length===0?`Empty list`:`Single node, no swap needed`,elements:[{type:`array`,id:`list`,values:[...t]}],variables:{result:t},isComplete:!0}),n;let r=[0,...t];n.push({lineNumber:2,description:`Create dummy node, prev points to dummy`,elements:[{type:`array`,id:`list`,values:[...r],pointers:[{index:0,label:`prev`,color:`#3B82F6`}]}],variables:{dummy:`D`,prev:0}});let i=0;for(;i+2<r.length&&n.length<20;){let e=i+1,t=i+2;n.push({lineNumber:5,description:`Pair found: first=${r[e]}, second=${r[t]}`,elements:[{type:`array`,id:`list`,values:[...r],pointers:[{index:i,label:`prev`,color:`#3B82F6`},{index:e,label:`first`,color:`#EF4444`},{index:t,label:`second`,color:`#10B981`}]}],variables:{first:r[e],second:r[t]}});let a=r[e];r[e]=r[t],r[t]=a,n.push({lineNumber:9,description:`Swapped: ${r[e]} ↔ ${r[t]}`,elements:[{type:`array`,id:`list`,values:[...r],styles:r.map((n,r)=>r===e||r===t?`found`:`default`)}],variables:{swapped:[r[e],r[t]]}}),i=t}return n.push({lineNumber:14,description:`Complete! Result: ${r.slice(1).join(` → `)}`,elements:[{type:`array`,id:`result`,values:r.slice(1),styles:r.slice(1).map(()=>`found`)}],variables:{result:r.slice(1)},isComplete:!0}),n}}]},{id:`dfs`,name:`DFS (Depth-First Search)`,color:`var(--accent-dfs)`,algorithms:[{id:`max-depth-binary-tree`,name:`Maximum Depth of Binary Tree`,category:`dfs`,difficulty:`Easy`,leetcodeId:104,description:`Find the maximum depth (height) of a binary tree using DFS.`,timeComplexity:`O(n)`,spaceComplexity:`O(h)`,visualizationType:`tree`,examples:[{input:`root = [3,9,20,null,null,15,7]`,output:`3`,explanation:`Root (depth 1) → 20 (depth 2) → 15 or 7 (depth 3). Max depth = 3.`},{input:`root = [1,null,2]`,output:`2`,explanation:`Skewed tree: 1 → 2. Two levels deep.`}],education:{tldr:`Return 1 + max(left_depth, right_depth). Base case: null → 0.`,steps:[{title:`Base case`,description:`Empty node has depth 0`,code:`if not root: return 0`},{title:`Recurse left`,description:`Get left subtree depth`,code:`left = maxDepth(root.left)`},{title:`Recurse right`,description:`Get right subtree depth`,code:`right = maxDepth(root.right)`},{title:`Combine`,description:`Add 1 for current node`,code:`return 1 + max(left, right)`}],remember:[`Depth = edges from root (or nodes, depending on definition)`,`Base case: null → 0`,`Each node adds 1 to the max of its children`,`Post-order: children first, then combine`],understanding:`This is the simplest DFS pattern: compute something for children, then combine with current node.

**Post-order traversal**: We need children's depths before computing our own. So we recurse first (left, right), then combine (1 + max).

**Base case**: An empty subtree contributes 0 depth. This anchors our recursion.`,whyPatternWorks:`The depth of a node is 1 (itself) plus the maximum depth of its subtrees. By recursively computing children's depths and taking the max, we propagate the deepest path back up to the root.

This is a **return value DFS**: each call returns useful information (depth) to its parent.`,keyInsights:[`Simplest DFS pattern—great for learning recursion`,`Post-order: process children before parent`,`Similar problems: min depth, balanced tree check`,`Iterative version uses stack with (node, depth) pairs`]},code:`def maxDepth(root: TreeNode) -> int:
    if not root:
        return 0

    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)

    return 1 + max(left_depth, right_depth)`,inputs:[{name:`tree`,type:`string`,default:`3,9,20,null,null,15,7`,label:`Tree (level order, null for empty)`,placeholder:`3,9,20,null,null,15,7`}],generateSteps:e=>{let t=e.tree.split(`,`).map(e=>e.trim()===`null`?null:parseInt(e.trim())),n=[],r=e=>t.map((t,n)=>t===null?null:{value:t,style:e?.index===n?e.style:`default`}),i=(e,a)=>{if(e>=t.length||t[e]===null)return 0;let o=t[e];n.push({lineNumber:5,description:`Visit node ${o} at depth ${a}, explore left subtree`,elements:[{type:`tree`,id:`tree`,nodes:r({index:e,style:`active`})}],variables:{node:o,depth:a}});let s=i(2*e+1,a+1);n.push({lineNumber:6,description:`Node ${o}: left depth = ${s}, explore right`,elements:[{type:`tree`,id:`tree`,nodes:r({index:e,style:`found`})}],variables:{node:o,left_depth:s}});let c=i(2*e+2,a+1),l=1+Math.max(s,c);return n.push({lineNumber:8,description:`Node ${o}: 1 + max(${s}, ${c}) = ${l}`,elements:[{type:`tree`,id:`tree`,nodes:r({index:e,style:`found`})}],variables:{node:o,left_depth:s,right_depth:c,maxDepth:l}}),n.length,l},a=i(0,1);return n.push({lineNumber:8,description:`Complete! Maximum depth = ${a}`,elements:[{type:`tree`,id:`tree`,nodes:r()}],variables:{result:a},isComplete:!0}),n}},{id:`path-sum`,name:`Path Sum`,category:`dfs`,difficulty:`Easy`,leetcodeId:112,description:`Determine if tree has a root-to-leaf path with given sum.`,timeComplexity:`O(n)`,spaceComplexity:`O(h)`,visualizationType:`tree`,examples:[{input:`root = [5,4,8,11,null,13,4,7,2], targetSum = 22`,output:`true`,explanation:`Path 5→4→11→2 sums to 22.`},{input:`root = [1,2,3], targetSum = 5`,output:`false`,explanation:`No root-to-leaf path sums to 5. Path 1→2=3, Path 1→3=4.`}],education:{tldr:`Subtract current value from target, check if leaf with remaining=0.`,steps:[{title:`Base case (null)`,description:`Empty node → false`,code:`if not root: return False`},{title:`Leaf check`,description:`Is this a leaf with exact remaining?`,code:`if leaf and val == target: return True`},{title:`Subtract & recurse`,description:`Try left and right with reduced target`,code:`return dfs(left, target-val) or dfs(right, target-val)`}],remember:[`Must be ROOT-TO-LEAF (not just any path)`,`Subtract as you go, check target=val at leaf`,`Use OR: if either child works, return true`,`Leaf = no left AND no right child`],understanding:`This is a **pass-down DFS**: we pass information (remaining sum) from parent to child.

**Key Insight**: Instead of tracking running sum, subtract from target. At a leaf, check if remaining equals the leaf value.

**Why check leaf?** The path must end at a leaf. An internal node matching the sum doesn't count—we must reach the bottom.`,whyPatternWorks:`By subtracting each node's value from the target:
1. We reduce the problem size at each step
2. At a leaf, the check becomes simple: does this value equal what's left?
3. The OR short-circuits: if left subtree finds a path, we don't check right

This "subtract as you go" pattern avoids tracking the path explicitly.`,keyInsights:[`Pass-down pattern: carry info from root toward leaves`,`Subtract instead of sum—simpler leaf check`,`Path Sum II: collect all paths (use backtracking)`,`Path Sum III: any path (use prefix sum)`]},code:`def hasPathSum(root: TreeNode, targetSum: int) -> bool:
    if not root:
        return False

    # Check if leaf node
    if not root.left and not root.right:
        return root.val == targetSum

    # Recurse with remaining sum
    remaining = targetSum - root.val
    return (hasPathSum(root.left, remaining) or
            hasPathSum(root.right, remaining))`,inputs:[{name:`tree`,type:`string`,default:`5,4,8,11,null,13,4,7,2,null,null,null,1`,label:`Tree (level order)`,placeholder:`5,4,8,11,null,13,4,7,2`},{name:`targetSum`,type:`number`,default:22,label:`Target Sum`,placeholder:`22`}],generateSteps:e=>{let t=e.tree.split(`,`).map(e=>e.trim()===`null`?null:parseInt(e.trim())),n=e.targetSum,r=[],i=(e,a,o)=>{if(e>=t.length||t[e]===null)return!1;let s=t[e],c=a+s,l=[...o,s],u=2*e+1,d=2*e+2,f=(u>=t.length||t[u]===null)&&(d>=t.length||t[d]===null);return r.push({lineNumber:5,description:`Visit ${s}, current sum = ${c}${f?` (leaf)`:``}`,elements:[{type:`array`,id:`path`,values:l}],variables:{node:s,currentSum:c,remaining:n-c,isLeaf:f}}),f?c===n?(r.push({lineNumber:7,description:`Leaf node ${s}: sum ${c} == target ${n}! Found path!`,elements:[{type:`array`,id:`path`,values:l,highlights:l.map((e,t)=>({index:t,style:`found`}))}],variables:{path:l,sum:c,result:!0}}),!0):(r.push({lineNumber:7,description:`Leaf node ${s}: sum ${c} != target ${n}, backtrack`,elements:[{type:`array`,id:`path`,values:l,highlights:[{index:l.length-1,style:`comparing`}]}],variables:{path:l,sum:c,result:!1}}),!1):r.length>35?!1:i(u,c,l)?!0:i(d,c,l)},a=i(0,0,[]);return r.push({lineNumber:11,description:a?`Found path with sum ${n}!`:`No path found with sum ${n}`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null)}],variables:{result:a,targetSum:n},isComplete:!0}),r}},{id:`validate-bst`,name:`Validate Binary Search Tree`,category:`dfs`,difficulty:`Medium`,leetcodeId:98,description:`Determine if a binary tree is a valid BST.`,timeComplexity:`O(n)`,spaceComplexity:`O(h)`,visualizationType:`tree`,examples:[{input:`root = [2,1,3]`,output:`true`,explanation:`1 < 2 < 3. Left child smaller, right child larger. Valid BST.`},{input:`root = [5,1,4,null,null,3,6]`,output:`false`,explanation:`Node 3 is in right subtree of 5 but 3 < 5. Invalid!`}],education:{tldr:`Pass valid range (min, max) down. Each node must be within its range.`,steps:[{title:`Init range`,description:`Root can be anything`,code:`validate(root, -inf, +inf)`},{title:`Check range`,description:`Node must be in (min, max)`,code:`if val <= min or val >= max: return False`},{title:`Narrow for left`,description:`Left child max becomes current val`,code:`validate(left, min, node.val)`},{title:`Narrow for right`,description:`Right child min becomes current val`,code:`validate(right, node.val, max)`}],remember:[`Pass RANGE, not just parent value`,`Left child: update MAX to parent value`,`Right child: update MIN to parent value`,`Use strict inequality: val < max, not val <= max`],understanding:`The trap: comparing only with direct parent. A node in the right subtree must be greater than ALL ancestors on its path, not just its parent.

**Key Insight**: Pass a valid range (min, max) down the tree. Each node narrows the range for its children:
- Left child's range: (current min, parent value)
- Right child's range: (parent value, current max)

**Why range?** The range accumulates constraints from all ancestors.`,whyPatternWorks:`Each node acts as a "constraint" on its subtrees:
- All left descendants must be < this node
- All right descendants must be > this node

By passing ranges, we propagate these constraints down. If any node violates its range, the tree is invalid.

Alternative: In-order traversal should produce sorted sequence.`,keyInsights:[`Classic trap: checking only direct parent`,`Range approach: pass (min, max) constraints down`,`Alternative: in-order traversal gives sorted output for valid BST`,`Edge case: duplicates—use strict inequality`]},code:`def isValidBST(root: TreeNode) -> bool:
    def validate(node, min_val, max_val):
        if not node:
            return True

        if node.val <= min_val or node.val >= max_val:
            return False

        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))`,inputs:[{name:`tree`,type:`string`,default:`5,1,7,null,null,6,8`,label:`Tree (level order)`,placeholder:`5,1,7,null,null,6,8`}],generateSteps:e=>{let t=e.tree.split(`,`).map(e=>e.trim()===`null`?null:parseInt(e.trim())),n=[],r=(e,i,a)=>{if(e>=t.length||t[e]===null)return!0;let o=t[e];return n.push({lineNumber:6,description:`Check node ${o}: must be in (${i===-1/0?`-∞`:i}, ${a===1/0?`∞`:a})`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null),highlights:[{index:t.slice(0,e+1).filter(e=>e!==null).length-1,style:`active`}]}],variables:{node:o,min:i===-1/0?`-∞`:i,max:a===1/0?`∞`:a}}),o<=i||o>=a?(n.push({lineNumber:7,description:`INVALID! ${o} is not in range (${i===-1/0?`-∞`:i}, ${a===1/0?`∞`:a})`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null),highlights:[{index:t.slice(0,e+1).filter(e=>e!==null).length-1,style:`comparing`}]}],variables:{node:o,valid:!1}}),!1):(n.push({lineNumber:9,description:`${o} is valid, check left subtree (min=${i===-1/0?`-∞`:i}, max=${o})`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null),highlights:[{index:t.slice(0,e+1).filter(e=>e!==null).length-1,style:`found`}]}],variables:{node:o,checking:`left`}}),n.length>30?!0:r(2*e+1,i,o)?(n.push({lineNumber:10,description:`Left subtree of ${o} valid, check right (min=${o}, max=${a===1/0?`∞`:a})`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null),highlights:[{index:t.slice(0,e+1).filter(e=>e!==null).length-1,style:`found`}]}],variables:{node:o,checking:`right`}}),r(2*e+2,o,a)):!1)},i=r(0,-1/0,1/0);return n.push({lineNumber:12,description:i?`Valid BST!`:`Not a valid BST`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null)}],variables:{result:i},isComplete:!0}),n}},{id:`number-of-islands`,name:`Number of Islands`,category:`dfs`,difficulty:`Medium`,leetcodeId:200,description:`Count the number of islands (connected 1s) in a 2D grid.`,timeComplexity:`O(m × n)`,spaceComplexity:`O(m × n)`,visualizationType:`matrix`,examples:[{input:`grid = [["1","1","0"],["1","1","0"],["0","0","1"]]`,output:`2`,explanation:`Top-left 2×2 forms one island. Bottom-right 1×1 is another.`},{input:`grid = [["1","0","1"],["0","1","0"],["1","0","1"]]`,output:`5`,explanation:`No adjacent 1s (4-directional), so each 1 is its own island.`}],education:{tldr:`Scan grid; when you find "1", count it and DFS-sink the entire island.`,steps:[{title:`Scan grid`,description:`Find any unvisited "1"`,code:`for r, c in grid: if grid[r][c] == "1"`},{title:`Count island`,description:`Found new island, increment count`,code:`islands += 1`},{title:`Sink island`,description:`DFS to mark all connected cells`,code:`dfs(r, c)  # marks "1" → "0"`},{title:`Continue scan`,description:`Already-visited cells appear as "0"`,code:`proceed to next cell`}],remember:[`DFS "sinks" the island (marks visited)`,`4-directional: up, down, left, right`,`Modify grid in-place OR use visited set`,`Each DFS explores ONE complete island`],understanding:`Think of "flooding" each island. When you find a "1", you've discovered a new island. Use DFS to explore and mark ALL connected land cells—this prevents counting the same island twice.

**Key Insight**: By marking visited cells (changing "1" to "0"), we ensure each cell is processed exactly once across all DFS calls.

**Why DFS?** We need to explore all connected components. DFS naturally explores one island completely before moving on.`,whyPatternWorks:`The two-phase approach:
1. **Scan phase**: Linear scan finds unvisited land
2. **Explore phase**: DFS marks entire connected component

After DFS, that island is "invisible" (all "0"s). So when we find the next "1", we know it's a NEW island.

This is **flood fill**—a fundamental graph traversal pattern.`,keyInsights:[`Flood fill pattern: explore + mark connected region`,`In-place modification avoids extra visited set`,`Works with BFS too (same time complexity)`,`Similar: max area of island, surrounded regions, pacific atlantic`]},code:`def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    islands = 0

    def dfs(r, c):
        if (r < 0 or r >= rows or
            c < 0 or c >= cols or
            grid[r][c] != '1'):
            return

        grid[r][c] = '0'  # Mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)

    return islands`,inputs:[{name:`grid`,type:`string`,default:`11110,11010,11000,00000`,label:`Grid (rows separated by commas)`,placeholder:`11110,11010,11000,00000`}],generateSteps:e=>{let t=e.grid.split(`,`).map(e=>e.split(``).map(e=>parseInt(e))),n=[],r=t.length,i=t[0]?.length||0,a=0,o=()=>{let e=[];for(let n of t)e.push(...n);return e};n.push({lineNumber:5,description:`Grid: ${r}×${i}, scanning for islands...`,elements:[{type:`array`,id:`grid`,values:o()}],variables:{rows:r,cols:i,islands:0}});let s=(e,c)=>{e<0||e>=r||c<0||c>=i||t[e][c]!==1||(t[e][c]=2,n.push({lineNumber:14,description:`DFS: Mark (${e}, ${c}) as visited`,elements:[{type:`array`,id:`grid`,values:o(),highlights:[{index:e*i+c,style:`found`}]}],variables:{r:e,c,island:a}}),!(n.length>35)&&(s(e+1,c),s(e-1,c),s(e,c+1),s(e,c-1)))};for(let e=0;e<r;e++){for(let r=0;r<i&&(t[e][r]===1&&(a++,n.push({lineNumber:22,description:`Found new island at (${e}, ${r})! Island count = ${a}`,elements:[{type:`array`,id:`grid`,values:o(),highlights:[{index:e*i+r,style:`active`}]}],variables:{r:e,c:r,islands:a}}),s(e,r)),!(n.length>35));r++);if(n.length>35)break}return n.push({lineNumber:25,description:`Complete! Total islands = ${a}`,elements:[{type:`array`,id:`grid`,values:o()}],variables:{islands:a},isComplete:!0}),n}}]},{id:`bfs`,name:`BFS (Breadth-First Search)`,color:`var(--accent-bfs)`,algorithms:[{id:`level-order-traversal`,name:`Binary Tree Level Order Traversal`,category:`bfs`,difficulty:`Medium`,leetcodeId:102,description:`Traverse binary tree level by level, returning values grouped by level.`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`tree`,examples:[{input:`root = [3,9,20,null,null,15,7]`,output:`[[3],[9,20],[15,7]]`,explanation:`Level 0: root (3). Level 1: children (9,20). Level 2: grandchildren (15,7).`},{input:`root = [1]`,output:`[[1]]`,explanation:`Single node tree has one level with one element.`}],education:{tldr:`Use queue + level_size trick: snapshot queue size before processing each level.`,steps:[{title:`Initialize queue`,description:`Start with root in queue`,code:`queue = deque([root])`},{title:`Snapshot level size`,description:`BEFORE loop, save queue.size()`,code:`level_size = len(queue)`},{title:`Process level`,description:`Pop exactly level_size nodes`,code:`for _ in range(level_size)`},{title:`Add children`,description:`Enqueue left and right children`,code:`queue.append(node.left)`}],remember:[`Queue = FIFO = perfect for BFS`,`Snapshot size BEFORE the loop`,`Process exactly level_size nodes per level`,`Children added during loop appear in NEXT level`],understanding:`BFS explores nodes level by level, like ripples in water. The queue ensures we visit nodes in the order they were discovered.

**The Level Size Trick**: Before processing a level, snapshot the queue size. This tells you how many nodes belong to the current level. Nodes added during processing belong to the next level.

**Why Queue?** FIFO (First In, First Out) guarantees nodes discovered first are processed first—exactly what we need for level-by-level traversal.`,whyPatternWorks:`The queue naturally separates levels because:
1. All nodes at level N are in the queue before we start processing level N
2. We only dequeue level_size nodes (the snapshot)
3. Children (level N+1) are added to the END of the queue
4. After processing, only level N+1 nodes remain

This creates a perfect "wave" effect—each level completes before the next begins.`,keyInsights:[`level_size snapshot is the key insight—memorize this pattern`,`BFS = Queue, DFS = Stack (or recursion)`,`O(n) time because we visit each node exactly once`,`O(n) space in worst case (last level can have n/2 nodes)`]},code:`def levelOrder(root: TreeNode) -> list[list[int]]:
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result`,inputs:[{name:`tree`,type:`string`,default:`3,9,20,null,null,15,7`,label:`Tree (level order)`,placeholder:`3,9,20,null,null,15,7`}],generateSteps:e=>{let t=e.tree.split(`,`).map(e=>e.trim()===`null`?null:parseInt(e.trim())),n=[],r=[],i=[];t.forEach((e,t)=>{e!==null&&i.push(t)});let a=[0],o=0;for(n.push({lineNumber:6,description:`Initialize queue with root node`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null),highlights:[{index:0,style:`active`}]}],variables:{queue:`[${t[0]}]`,level:0}});a.length>0&&o<5;){let e=a.length,s=[];n.push({lineNumber:9,description:`Level ${o}: ${e} node(s) to process`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null)}],variables:{level:o,levelSize:e}});for(let r=0;r<e;r++){let e=a.shift(),r=t[e];if(r!==null){s.push(r),n.push({lineNumber:13,description:`Dequeue ${r}, add to level ${o}`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null),highlights:[{index:i.indexOf(e),style:`found`}]}],variables:{node:r,levelValues:s}});let c=2*e+1,l=2*e+2;c<t.length&&t[c]!==null&&a.push(c),l<t.length&&t[l]!==null&&a.push(l)}if(n.length>30)break}if(r.push(s),n.push({lineNumber:20,description:`Level ${o} complete: [${s.join(`, `)}]`,elements:[{type:`array`,id:`level`,values:s}],variables:{level:o,levelValues:s,queueSize:a.length}}),o++,n.length>30)break}return n.push({lineNumber:22,description:`Complete! ${r.length} levels`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null)}],variables:{result:r.map(e=>`[${e.join(`,`)}]`).join(`, `)},isComplete:!0}),n}},{id:`right-side-view`,name:`Binary Tree Right Side View`,category:`bfs`,difficulty:`Medium`,leetcodeId:199,description:`Return values of nodes visible from the right side of tree.`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`tree`,examples:[{input:`root = [1,2,3,null,5,null,4]`,output:`[1,3,4]`,explanation:`Looking from right: see 1 (root), 3 (level 1 rightmost), 4 (level 2 rightmost).`},{input:`root = [1,2,3,4]`,output:`[1,3,4]`,explanation:`Node 4 is visible from right even though it's on the left subtree—it's the only node at level 2.`}],education:{tldr:`BFS level by level, keep only the LAST node of each level.`,steps:[{title:`Level-order BFS`,description:`Use standard level traversal`,code:`for i in range(level_size)`},{title:`Track position`,description:`Check if node is last in level`,code:`if i == level_size - 1`},{title:`Add rightmost`,description:`Only add when position is last`,code:`result.append(node.val)`}],remember:[`Last node in each level = visible from right`,`Alternative: DFS with depth tracking, prefer right child first`,`Left Side View = same logic, but i == 0`],understanding:`The right side view shows what you'd see standing to the right of the tree. At each level, only the rightmost node is visible—all others are hidden behind it.

**Key Insight**: Process level by level (BFS), and the last node processed in each level is the rightmost one.

**Alternative DFS Approach**: Visit right child first, track depth. First node seen at each depth is the rightmost.`,whyPatternWorks:`BFS naturally groups nodes by level. By tracking our position within each level (using the level_size snapshot), we know exactly when we've reached the rightmost node.

The check \`i == level_size - 1\` identifies the last node in the current level—which is always the rightmost one visible from that angle.`,keyInsights:[`This is level order with a filter: keep only last node per level`,`Left side view: change condition to i == 0`,`Zigzag view: alternate which end you keep`,`DFS alternative: visit right first, track first-seen-at-depth`]},code:`def rightSideView(root: TreeNode) -> list[int]:
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)

        for i in range(level_size):
            node = queue.popleft()

            # Last node in this level
            if i == level_size - 1:
                result.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result`,inputs:[{name:`tree`,type:`string`,default:`1,2,3,null,5,null,4`,label:`Tree (level order)`,placeholder:`1,2,3,null,5,null,4`}],generateSteps:e=>{let t=e.tree.split(`,`).map(e=>e.trim()===`null`?null:parseInt(e.trim())),n=[],r=[],i=[];t.forEach((e,t)=>{e!==null&&i.push(t)});let a=[0],o=0;for(n.push({lineNumber:6,description:`Initialize queue with root`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null)}],variables:{queue:`[${t[0]}]`}});a.length>0&&o<5;){let e=a.length;for(let s=0;s<e;s++){let c=a.shift(),l=t[c];if(l!==null){s===e-1?(r.push(l),n.push({lineNumber:15,description:`Level ${o}: ${l} is rightmost - add to result`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null),highlights:[{index:i.indexOf(c),style:`found`}]}],variables:{node:l,level:o,result:r.join(`, `)}})):n.push({lineNumber:12,description:`Level ${o}: ${l} is not rightmost, skip`,elements:[{type:`array`,id:`tree`,values:t.filter(e=>e!==null),highlights:[{index:i.indexOf(c),style:`comparing`}]}],variables:{node:l,position:s+1,levelSize:e}});let u=2*c+1,d=2*c+2;u<t.length&&t[u]!==null&&a.push(u),d<t.length&&t[d]!==null&&a.push(d)}if(n.length>25)break}if(o++,n.length>25)break}return n.push({lineNumber:22,description:`Complete! Right side view: [${r.join(`, `)}]`,elements:[{type:`array`,id:`result`,values:r}],variables:{result:r.join(`, `)},isComplete:!0}),n}},{id:`rotten-oranges`,name:`Rotting Oranges`,category:`bfs`,difficulty:`Medium`,leetcodeId:994,description:`Find minimum minutes for all oranges to rot (multi-source BFS).`,timeComplexity:`O(m × n)`,spaceComplexity:`O(m × n)`,visualizationType:`matrix`,examples:[{input:`grid = [[2,1,1],[1,1,0],[0,1,1]]`,output:`4`,explanation:`Rot spreads from top-left corner, takes 4 minutes to reach bottom-right.`},{input:`grid = [[2,1,1],[0,1,1],[1,0,1]]`,output:`-1`,explanation:`Bottom-left orange is isolated—impossible to rot all.`}],education:{tldr:`Multi-source BFS: start with ALL rotten oranges in queue simultaneously.`,steps:[{title:`Find all sources`,description:`Add ALL rotten oranges to queue`,code:`if grid[r][c] == 2: queue.append((r,c,0))`},{title:`Count fresh`,description:`Track how many need to rot`,code:`if grid[r][c] == 1: fresh += 1`},{title:`BFS with time`,description:`Each level = 1 minute`,code:`queue.append((nr, nc, time + 1))`},{title:`Check completion`,description:`Return -1 if any fresh remain`,code:`return -1 if fresh > 0 else minutes`}],remember:[`Multi-source BFS: start with ALL sources in queue`,`Track time in the queue tuple (r, c, time)`,`Mark visited BY changing 1→2 (in-place)`,`Return -1 if fresh > 0 after BFS`],understanding:`This is **multi-source BFS**—imagine dropping multiple pebbles in water simultaneously. The rot spreads from ALL rotten oranges at once, not one at a time.

**Key Insight**: By adding ALL rotten oranges to the queue at time=0, they all start spreading simultaneously. The BFS naturally tracks when each fresh orange gets reached.

**Why not single-source?** Starting from one orange and repeating would count time incorrectly. Multi-source BFS correctly simulates parallel spreading.`,whyPatternWorks:`BFS explores level by level, where each level represents one time unit. By starting with all rotten oranges:
1. Time 0: All initially rotten
2. Time 1: All adjacent to initially rotten
3. Time N: All N steps away from nearest rotten

The final time is when the last fresh orange rots (furthest from any source).`,keyInsights:[`Multi-source BFS = add ALL sources initially`,`Time tracking: store in tuple or track by level`,`Check for unreachable cells (fresh > 0)`,`Similar patterns: walls and gates, shortest bridge`]},code:`def orangesRotting(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0

    # Find all rotten oranges and count fresh
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh += 1

    if fresh == 0:
        return 0

    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    minutes = 0

    while queue:
        r, c, time = queue.popleft()
        minutes = max(minutes, time)

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                queue.append((nr, nc, time + 1))

    return minutes if fresh == 0 else -1`,inputs:[{name:`grid`,type:`string`,default:`2,1,1;1,1,0;0,1,1`,label:`Grid (0=empty, 1=fresh, 2=rotten)`,placeholder:`2,1,1;1,1,0;0,1,1`}],generateSteps:e=>{let t=e.grid.split(`;`).map(e=>e.split(`,`).map(e=>parseInt(e))),n=[],r=t.length,i=t[0]?.length||0,a=()=>{let e=[];for(let n of t)e.push(...n);return e},o=[],s=0;for(let e=0;e<r;e++)for(let n=0;n<i;n++)t[e][n]===2?o.push({r:e,c:n,time:0}):t[e][n]===1&&s++;if(n.push({lineNumber:7,description:`Found ${o.length} rotten oranges, ${s} fresh oranges`,elements:[{type:`array`,id:`grid`,values:a()}],variables:{rotten:o.length,fresh:s}}),s===0)return n.push({lineNumber:14,description:`No fresh oranges, return 0`,elements:[{type:`array`,id:`grid`,values:a()}],variables:{result:0},isComplete:!0}),n;let c=[[0,1],[0,-1],[1,0],[-1,0]],l=0;for(;o.length>0&&n.length<35;){let{r:e,c:u,time:d}=o.shift();l=Math.max(l,d);for(let[l,f]of c){let c=e+l,p=u+f;c>=0&&c<r&&p>=0&&p<i&&t[c][p]===1&&(t[c][p]=2,s--,o.push({r:c,c:p,time:d+1}),n.push({lineNumber:27,description:`Minute ${d+1}: Orange at (${c}, ${p}) rots. ${s} fresh remaining`,elements:[{type:`array`,id:`grid`,values:a(),highlights:[{index:c*i+p,style:`found`},{index:e*i+u,style:`comparing`}]}],variables:{minute:d+1,fresh:s,position:`(${c},${p})`}}))}}let u=s===0?l:-1;return n.push({lineNumber:31,description:s===0?`All oranges rotten in ${l} minutes!`:`Impossible! ${s} oranges unreachable`,elements:[{type:`array`,id:`grid`,values:a()}],variables:{result:u,fresh:s},isComplete:!0}),n}}]},{id:`heap`,name:`Heap / Priority Queue`,color:`var(--accent-heap)`,algorithms:[{id:`kth-largest-element`,name:`Kth Largest Element`,category:`heap`,difficulty:`Medium`,leetcodeId:215,description:`Find the kth largest element using a min-heap of size k.`,timeComplexity:`O(n log k)`,spaceComplexity:`O(k)`,visualizationType:`array`,examples:[{input:`nums = [3,2,1,5,6,4], k = 2`,output:`5`,explanation:`Sorted: [1,2,3,4,5,6]. 2nd largest = 5.`},{input:`nums = [3,2,3,1,2,4,5,5,6], k = 4`,output:`4`,explanation:`Sorted: [1,2,2,3,3,4,5,5,6]. 4th largest = 4.`}],education:{tldr:`Keep min-heap of size k. After processing all, heap[0] = kth largest.`,steps:[{title:`Use MIN-heap`,description:`Counterintuitive but key`,code:`heap = []  # min-heap`},{title:`Push element`,description:`Add each number to heap`,code:`heappush(heap, num)`},{title:`Maintain size k`,description:`If size > k, pop minimum`,code:`if len(heap) > k: heappop(heap)`},{title:`Result`,description:`Root is kth largest`,code:`return heap[0]`}],remember:[`MIN-heap, not max-heap!`,`Heap always has exactly k elements (the k largest)`,`Pop removes smallest of the k largest`,`Root = smallest of k largest = kth largest overall`],understanding:`**Why min-heap?** We want to keep the k largest elements. A min-heap efficiently tells us the smallest among them. If a new element is larger than the heap minimum, it deserves to be in the top k.

**Key Insight**: After processing, the heap contains exactly the k largest elements. The minimum of those (heap root) is the kth largest overall.

**Why not max-heap?** A max-heap would give us the largest, not the kth largest.`,whyPatternWorks:`Invariant: The heap always contains the k largest elements seen so far.
- If heap has < k elements, just add
- If heap has k elements, only add if num > heap minimum
- Pop minimum to make room for larger element

Result: heap[0] = smallest of k largest = kth largest.`,keyInsights:[`Min-heap for "k largest", max-heap for "k smallest"`,`O(n log k) is better than O(n log n) sorting when k << n`,`Alternative: QuickSelect gives O(n) average time`,`Space O(k) is optimal for streaming data`]},code:`import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    heap = []

    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)

    return heap[0]`,inputs:[{name:`nums`,type:`string`,default:`3,2,1,5,6,4`,label:`Array`,placeholder:`3,2,1,5,6,4`},{name:`k`,type:`number`,default:2,label:`K`,placeholder:`2`}],generateSteps:e=>{let t=e.nums.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=e.k,r=[];r.push({lineNumber:4,description:`Initialize empty min-heap, k=${n}`,elements:[{type:`array`,id:`nums`,values:t},{type:`array`,id:`heap`,values:[]}],variables:{k:n,heapSize:0}});let i=[],a=(e,t)=>{e.push(t),e.sort((e,t)=>e-t)},o=e=>e.shift();for(let e=0;e<t.length&&r.length<25;e++){let s=t[e];if(a(i,s),r.push({lineNumber:7,description:`Push ${s} to heap`,elements:[{type:`array`,id:`nums`,values:t,pointers:[{index:e,label:`i`,color:`#3B82F6`}]},{type:`array`,id:`heap`,values:[...i],styles:i.map(()=>`found`)}],variables:{num:s,heapSize:i.length}}),i.length>n){let n=o(i);r.push({lineNumber:9,description:`Heap size > k, pop minimum (${n})`,elements:[{type:`array`,id:`nums`,values:t,pointers:[{index:e,label:`i`,color:`#3B82F6`}]},{type:`array`,id:`heap`,values:[...i],styles:i.map(()=>`found`)}],variables:{popped:n,heapSize:i.length}})}}return r.push({lineNumber:11,description:`Complete! ${n}th largest = ${i[0]} (heap minimum)`,elements:[{type:`array`,id:`heap`,values:[...i],styles:i.map((e,t)=>t===0?`found`:`default`)}],variables:{result:i[0]},isComplete:!0}),r}},{id:`top-k-frequent`,name:`Top K Frequent Elements`,category:`heap`,difficulty:`Medium`,leetcodeId:347,description:`Find the k most frequent elements using a heap.`,timeComplexity:`O(n log k)`,spaceComplexity:`O(n)`,visualizationType:`array`,examples:[{input:`nums = [1,1,1,2,2,3], k = 2`,output:`[1, 2]`,explanation:`1 appears 3 times, 2 appears 2 times. Top 2 frequent: [1, 2].`},{input:`nums = [1], k = 1`,output:`[1]`,explanation:`Only one unique element.`}],education:{tldr:`Count frequencies, then use min-heap of size k on (freq, num) pairs.`,steps:[{title:`Count frequencies`,description:`Use Counter/hashmap`,code:`count = Counter(nums)`},{title:`Build min-heap`,description:`Push (freq, num) pairs`,code:`heappush(heap, (freq, num))`},{title:`Maintain size k`,description:`Pop lowest freq if size > k`,code:`if len(heap) > k: heappop(heap)`},{title:`Extract numbers`,description:`Get nums from remaining pairs`,code:`return [num for freq, num in heap]`}],remember:[`Two-step: count frequencies, then heap`,`Heap stores (frequency, number) tuples`,`Min-heap on frequency keeps k MOST frequent`,`Alternative: bucket sort for O(n) solution`],understanding:`This is "kth largest" applied to frequencies. First, count how often each number appears. Then use a min-heap to keep the k elements with highest frequencies.

**Key Insight**: Heap keyed by frequency. Pop removes lowest-frequency element, keeping the k most frequent.

**Why (freq, num) tuple?** Python's heapq compares by first element (frequency). The num is just along for the ride.`,whyPatternWorks:`Same logic as kth largest:
1. Min-heap of size k holds k most frequent
2. If new element's freq > heap minimum's freq, swap them
3. Final heap contains exactly k most frequent elements

Alternative: Bucket sort where index = frequency. O(n) but uses O(n) space.`,keyInsights:[`Combines two patterns: frequency counting + top-k heap`,`Bucket sort alternative: buckets[freq].append(num)`,`Order in output usually doesn't matter`,`Similar: top k hot keywords, most common words`]},code:`import heapq
from collections import Counter

def topKFrequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)

    # Use min-heap of size k
    heap = []
    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for freq, num in heap]`,inputs:[{name:`nums`,type:`string`,default:`1,1,1,2,2,3`,label:`Array`,placeholder:`1,1,1,2,2,3`},{name:`k`,type:`number`,default:2,label:`K`,placeholder:`2`}],generateSteps:e=>{let t=e.nums.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=e.k,r=[],i=new Map;for(let e of t)i.set(e,(i.get(e)||0)+1);let a=Array.from(i.entries()),o=a.map(([e,t])=>`${e}:${t}`);r.push({lineNumber:5,description:`Count frequencies: {${o.join(`, `)}}`,elements:[{type:`array`,id:`nums`,values:t}],variables:{k:n}});let s=[],c=(e,t)=>{e.push(t),e.sort((e,t)=>e[0]-t[0])},l=e=>e.shift();for(let[e,t]of a){if(c(s,[t,e]),r.push({lineNumber:10,description:`Push (freq=${t}, num=${e}) to heap`,elements:[{type:`array`,id:`heap`,values:s.map(e=>e[1]),styles:s.map(()=>`found`)}],variables:{num:e,freq:t,heapSize:s.length}}),s.length>n){let e=l(s);r.push({lineNumber:12,description:`Heap size > k, pop lowest freq (num=${e?.[1]}, freq=${e?.[0]})`,elements:[{type:`array`,id:`heap`,values:s.map(e=>e[1]),styles:s.map(()=>`found`)}],variables:{popped:e?.[1],heapSize:s.length}})}if(r.length>=20)break}let u=s.map(e=>e[1]);return r.push({lineNumber:14,description:`Complete! Top ${n} frequent: [${u.join(`, `)}]`,elements:[{type:`array`,id:`result`,values:u,styles:u.map(()=>`found`)}],variables:{result:u},isComplete:!0}),r}},{id:`merge-k-sorted-lists`,name:`Merge K Sorted Lists`,category:`heap`,difficulty:`Hard`,leetcodeId:23,description:`Merge k sorted linked lists using a min-heap.`,timeComplexity:`O(N log k)`,spaceComplexity:`O(k)`,visualizationType:`array`,examples:[{input:`lists = [[1,4,5],[1,3,4],[2,6]]`,output:`[1,1,2,3,4,4,5,6]`,explanation:`Merge by always taking the smallest head among all lists.`},{input:`lists = []`,output:`[]`,explanation:`Empty input returns empty list.`}],education:{tldr:`Heap holds k heads (one per list). Pop min, push its next, repeat.`,steps:[{title:`Init heap`,description:`Push head of each list`,code:`heappush(heap, (node.val, i, node))`},{title:`Pop minimum`,description:`Smallest head goes to result`,code:`val, i, node = heappop(heap)`},{title:`Advance list`,description:`Push next node from same list`,code:`if node.next: heappush(heap, ...)`},{title:`Repeat`,description:`Until heap is empty`,code:`while heap: ...`}],remember:[`Heap size = k (one head per list)`,`Store (value, list_index, node) to handle ties`,`Always push next from the SAME list we just popped`,`Use dummy node to simplify list building`],understanding:`Think of k pointers, one at the head of each list. We always want the smallest current head. A min-heap finds this in O(log k).

**Key Insight**: The heap maintains "current position" for each list. By tracking which list a node came from, we know where to advance next.

**Why include list index?** Ties need a tiebreaker. Python can't compare ListNodes, so index acts as secondary sort key.`,whyPatternWorks:`At any moment:
- Heap has at most k elements (one per non-empty list)
- Pop gives globally smallest current element
- Push maintains the invariant: each list has exactly one representative

Result: Elements emerge in sorted order. O(N log k) because each of N elements enters/exits heap once.`,keyInsights:[`O(N log k) is optimal for this problem`,`Alternative: divide and conquer merge pairs (also O(N log k))`,`Heap size never exceeds k—very memory efficient`,`Same pattern: merge k sorted arrays, external sort`]},code:`import heapq

def mergeKLists(lists: list[ListNode]) -> ListNode:
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))

    dummy = ListNode(0)
    curr = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next`,inputs:[{name:`lists`,type:`string`,default:`1,4,5|1,3,4|2,6`,label:`Lists (pipe-separated)`,placeholder:`1,4,5|1,3,4|2,6`}],generateSteps:e=>{let t=e.lists.split(`|`).map(e=>e.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e))),n=[];n.push({lineNumber:4,description:`Initialize heap with first element of each list`,elements:t.map((e,t)=>({type:`array`,id:`list${t}`,values:e,pointers:e.length>0?[{index:0,label:`L${t}`,color:[`#3B82F6`,`#F59E0B`,`#10B981`][t%3]}]:[]})),variables:{k:t.length}});let r=t.map(()=>0),i=[];for(let e=0;e<t.length;e++)t[e].length>0&&i.push([t[e][0],e]);i.sort((e,t)=>e[0]-t[0]);let a=[];for(;i.length>0&&n.length<20;){i.sort((e,t)=>e[0]-t[0]);let[e,o]=i.shift();a.push(e),r[o]++,n.push({lineNumber:12,description:`Pop min (${e}) from list ${o}`,elements:[...t.map((e,t)=>({type:`array`,id:`list${t}`,values:e,pointers:r[t]<e.length?[{index:r[t],label:`L${t}`,color:[`#3B82F6`,`#F59E0B`,`#10B981`][t%3]}]:[],styles:e.map((e,n)=>n<r[t]?`found`:`default`)})),{type:`array`,id:`merged`,values:[...a],styles:a.map(()=>`found`)}],variables:{val:e,fromList:o,heapSize:i.length}}),r[o]<t[o].length&&i.push([t[o][r[o]],o])}for(;i.length>0;){i.sort((e,t)=>e[0]-t[0]);let[e]=i.shift();a.push(e)}return n.push({lineNumber:18,description:`Complete! Merged: ${a.join(` → `)}`,elements:[{type:`array`,id:`merged`,values:a,styles:a.map(()=>`found`)}],variables:{result:a},isComplete:!0}),n}},{id:`find-median-stream`,name:`Find Median from Data Stream`,category:`heap`,difficulty:`Hard`,leetcodeId:295,description:`Find running median using two heaps.`,timeComplexity:`O(log n) per add`,spaceComplexity:`O(n)`,visualizationType:`array`,examples:[{input:`addNum(1), addNum(2), findMedian(), addNum(3), findMedian()`,output:`1.5, 2.0`,explanation:`After [1,2]: median = 1.5. After [1,2,3]: median = 2.`}],education:{tldr:`Two heaps: max-heap for smaller half, min-heap for larger half. Median at the tops.`,steps:[{title:`Setup two heaps`,description:`small=max-heap, large=min-heap`,code:`small, large = [], []`},{title:`Add to small`,description:`Push negative for max-heap`,code:`heappush(small, -num)`},{title:`Balance`,description:`Move max(small) to large`,code:`heappush(large, -heappop(small))`},{title:`Rebalance if needed`,description:`Keep sizes equal or small+1`,code:`if len(large) > len(small): move back`}],remember:[`Two heaps partition the stream in half`,`small = max-heap (use negation in Python)`,`large = min-heap`,`Sizes differ by at most 1`],understanding:`The median divides data into two halves. Use two heaps to maintain this partition:
- **small**: max-heap holding the smaller half (largest of the small at top)
- **large**: min-heap holding the larger half (smallest of the large at top)

**Key Insight**: Median is either top of small (odd count) or average of both tops (even count).

**Why this works?** The tops of both heaps are adjacent in sorted order—exactly where the median lives.`,whyPatternWorks:`Invariants:
1. All elements in small ≤ all elements in large
2. Sizes differ by at most 1

Adding a number:
1. Add to small (might break invariant 1)
2. Move max(small) to large (fixes invariant 1)
3. If large got too big, move min(large) back

Median access: O(1) from heap tops. Add: O(log n) for heap operations.`,keyInsights:[`Classic two-heap pattern for streaming median`,`Python: negate values for max-heap behavior`,`Can extend to find any percentile (adjust size ratio)`,`Alternative: balanced BST (same complexity, more complex)`]},code:`import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negated)
        self.large = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))

        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`,inputs:[{name:`nums`,type:`string`,default:`2,3,4,1,5`,label:`Numbers (added in order)`,placeholder:`2,3,4,1,5`}],generateSteps:e=>{let t=e.nums.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=[];n.push({lineNumber:5,description:`Initialize two heaps: small (max-heap) and large (min-heap)`,elements:[{type:`array`,id:`small`,values:[]},{type:`array`,id:`large`,values:[]}],variables:{concept:`small holds smaller half, large holds larger half`}});let r=[],i=[],a=e=>{r.push(e),r.sort((e,t)=>t-e)},o=e=>{i.push(e),i.sort((e,t)=>e-t)},s=()=>r.shift(),c=()=>i.shift();for(let e=0;e<t.length&&n.length<25;e++){let l=t[e];a(l),n.push({lineNumber:9,description:`Add ${l} to small heap`,elements:[{type:`array`,id:`input`,values:t,pointers:[{index:e,label:`i`,color:`#3B82F6`}]},{type:`array`,id:`small`,values:[...r],styles:r.map(()=>`found`)},{type:`array`,id:`large`,values:[...i]}],variables:{num:l,smallSize:r.length,largeSize:i.length}});let u=s();if(o(u),n.push({lineNumber:10,description:`Move max(${u}) from small to large`,elements:[{type:`array`,id:`small`,values:[...r]},{type:`array`,id:`large`,values:[...i],styles:i.map(()=>`found`)}],variables:{moved:u}}),i.length>r.length){let e=c();a(e),n.push({lineNumber:13,description:`Balance: move min(${e}) from large to small`,elements:[{type:`array`,id:`small`,values:[...r],styles:r.map(()=>`found`)},{type:`array`,id:`large`,values:[...i]}],variables:{moved:e}})}let d;d=r.length>i.length?r[0]:(r[0]+i[0])/2,n.push({lineNumber:16,description:`Current median: ${d}`,elements:[{type:`array`,id:`small`,values:[...r]},{type:`array`,id:`large`,values:[...i]}],variables:{median:d,smallTop:r[0],largeTop:i[0]}})}let l=r.length>i.length?r[0]:(r[0]+i[0])/2;return n.push({lineNumber:18,description:`Complete! Final median: ${l}`,elements:[{type:`array`,id:`small`,values:[...r],styles:r.map((e,t)=>t===0?`found`:`default`)},{type:`array`,id:`large`,values:[...i],styles:i.map((e,t)=>t===0?`found`:`default`)}],variables:{result:l},isComplete:!0}),n}}]},{id:`backtracking`,name:`Backtracking`,color:`var(--accent-backtracking)`,algorithms:[{id:`subsets`,name:`Subsets`,category:`backtracking`,difficulty:`Medium`,leetcodeId:78,description:`Generate all possible subsets of an array.`,timeComplexity:`O(n × 2^n)`,spaceComplexity:`O(n)`,visualizationType:`array`,examples:[{input:`nums = [1,2,3]`,output:`[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`,explanation:`2^3 = 8 subsets including empty set.`},{input:`nums = [0]`,output:`[[],[0]]`,explanation:`2^1 = 2 subsets.`}],education:{tldr:`Include current at every node (not just leaves). For each element: include or exclude.`,steps:[{title:`Add current to result`,description:`Every state is a valid subset`,code:`result.append(current[:])`},{title:`Iterate from start`,description:`Try including each remaining element`,code:`for i in range(start, len(nums))`},{title:`Include element`,description:`Add to current subset`,code:`current.append(nums[i])`},{title:`Recurse & backtrack`,description:`Explore, then remove`,code:`backtrack(i+1, current); current.pop()`}],remember:[`Add to result FIRST (not at base case)`,`Start index prevents duplicates`,`i+1 in recursion (each element used once)`,`2^n subsets for n elements`],understanding:`**Subsets** is the purest backtracking problem. Every node in the recursion tree is a valid subset.

**Key Insight**: Unlike combinations/permutations, we add to result IMMEDIATELY, not just at leaves. The empty set, partial sets, and full set are all valid.

**Why start index?** Ensures each subset is generated exactly once by only considering elements "after" current position.`,whyPatternWorks:`Each element has two choices: include or exclude.
- The recursion tree has 2^n leaves
- But we add at every node, not just leaves
- Start index ensures [1,2] ≠ [2,1]—we only go forward

The pattern: add current, then for each remaining element, include it and recurse.`,keyInsights:[`Every recursion state = valid subset`,`Subsets II (with duplicates): sort + skip adjacent dupes`,`Bit manipulation alternative: iterate 0 to 2^n-1`,`Foundation for combinations and permutations`]},code:`def subsets(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(start, current):
        result.append(current[:])

        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()

    backtrack(0, [])
    return result`,inputs:[{name:`nums`,type:`string`,default:`1,2,3`,label:`Array`,placeholder:`1,2,3`}],generateSteps:e=>{let t=e.nums.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=[],r=[];n.push({lineNumber:2,description:`Start backtracking from index 0`,elements:[{type:`array`,id:`nums`,values:t},{type:`array`,id:`current`,values:[]}],variables:{start:0,resultCount:0}});let i=(e,a)=>{if(r.push([...a]),n.push({lineNumber:5,description:`Add [${a.join(`,`)}] to result`,elements:[{type:`array`,id:`nums`,values:t,pointers:e<t.length?[{index:e,label:`start`,color:`#3B82F6`}]:[]},{type:`array`,id:`current`,values:[...a],styles:a.map(()=>`found`)}],variables:{subset:[...a],resultCount:r.length}}),!(n.length>=40))for(let r=e;r<t.length&&n.length<40;r++)a.push(t[r]),n.push({lineNumber:8,description:`Add ${t[r]} to current`,elements:[{type:`array`,id:`nums`,values:t,pointers:[{index:r,label:`i`,color:`#3B82F6`}]},{type:`array`,id:`current`,values:[...a],styles:a.map(()=>`found`)}],variables:{i:r,added:t[r]}}),i(r+1,a),a.pop(),n.length<40&&n.push({lineNumber:10,description:`Backtrack: remove ${t[r]}`,elements:[{type:`array`,id:`nums`,values:t},{type:`array`,id:`current`,values:[...a]}],variables:{removed:t[r]}})};return i(0,[]),n.push({lineNumber:12,description:`Complete! Generated ${r.length} subsets`,elements:[{type:`array`,id:`result`,values:r.map(e=>`[${e.join(`,`)}]`)}],variables:{totalSubsets:r.length},isComplete:!0}),n}},{id:`permutations`,name:`Permutations`,category:`backtracking`,difficulty:`Medium`,leetcodeId:46,description:`Generate all permutations of an array.`,timeComplexity:`O(n × n!)`,spaceComplexity:`O(n)`,visualizationType:`array`,examples:[{input:`nums = [1,2,3]`,output:`[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`,explanation:`3! = 6 permutations.`},{input:`nums = [0,1]`,output:`[[0,1],[1,0]]`,explanation:`2! = 2 permutations.`}],education:{tldr:`No start index—can pick any remaining element at each position.`,steps:[{title:`Base case`,description:`No remaining elements = complete permutation`,code:`if not remaining: result.append(current[:])`},{title:`Try each remaining`,description:`Every remaining element can go next`,code:`for i in range(len(remaining))`},{title:`Choose element`,description:`Add to current, remove from remaining`,code:`current.append(remaining[i])`},{title:`Recurse & backtrack`,description:`Pass modified remaining list`,code:`backtrack(current, remaining[:i] + remaining[i+1:])`}],remember:[`No start index (unlike subsets/combinations)`,`Track "remaining" elements, not visited set`,`n! permutations for n distinct elements`,`Permutations II (duplicates): sort + skip same values`],understanding:`**Permutations** means ORDER matters. [1,2,3] ≠ [3,2,1].

**Key Difference from Subsets**: No start index because we can pick ANY remaining element at each position. We track what's left, not where we started.

**Why remaining list?** Each element must appear exactly once. The remaining list shrinks as we build the permutation.`,whyPatternWorks:`At each position, we have choices:
- Position 0: n choices
- Position 1: n-1 choices
- ...
- Position n-1: 1 choice

Total: n × (n-1) × ... × 1 = n! permutations

The "remaining" list enforces each element used exactly once.`,keyInsights:[`Key difference: permutations have no start index`,`Remaining list vs visited set (both work)`,`Swap-based approach avoids creating new arrays`,`Permutations II: skip duplicates with sorting`]},code:`def permute(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return

        for i in range(len(remaining)):
            current.append(remaining[i])
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()

    backtrack([], nums)
    return result`,inputs:[{name:`nums`,type:`string`,default:`1,2,3`,label:`Array`,placeholder:`1,2,3`}],generateSteps:e=>{let t=e.nums.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=[],r=[];n.push({lineNumber:2,description:`Start permutation backtracking`,elements:[{type:`array`,id:`nums`,values:t},{type:`array`,id:`current`,values:[]}],variables:{remaining:t,resultCount:0}});let i=(e,t)=>{if(t.length===0){r.push([...e]),n.push({lineNumber:6,description:`Found permutation: [${e.join(`,`)}]`,elements:[{type:`array`,id:`current`,values:[...e],highlights:e.map((e,t)=>({index:t,style:`found`}))}],variables:{permutation:[...e],resultCount:r.length}});return}if(!(n.length>=40))for(let r=0;r<t.length&&n.length<35;r++){e.push(t[r]);let a=[...t.slice(0,r),...t.slice(r+1)];n.push({lineNumber:10,description:`Choose ${t[r]}, remaining: [${a.join(`,`)}]`,elements:[{type:`array`,id:`current`,values:[...e],highlights:e.map((e,t)=>({index:t,style:`found`}))},{type:`array`,id:`remaining`,values:a}],variables:{chosen:t[r]}}),i(e,a);let o=e.pop();n.length<40&&n.push({lineNumber:12,description:`Backtrack: remove ${o}`,elements:[{type:`array`,id:`current`,values:[...e],highlights:e.length>0?e.map((e,t)=>({index:t,style:`active`})):[]},{type:`array`,id:`remaining`,values:t}],variables:{popped:o,remaining:t.join(`,`)}})}};return i([],t),n.push({lineNumber:14,description:`Complete! Generated ${r.length} permutations`,elements:[],variables:{totalPermutations:r.length},isComplete:!0}),n}},{id:`combination-sum`,name:`Combination Sum`,category:`backtracking`,difficulty:`Medium`,leetcodeId:39,description:`Find combinations that sum to target (can reuse elements).`,timeComplexity:`O(n^(T/M))`,spaceComplexity:`O(T/M)`,visualizationType:`array`,examples:[{input:`candidates = [2,3,6,7], target = 7`,output:`[[2,2,3], [7]]`,explanation:`2+2+3=7 and 7=7. Can reuse 2.`},{input:`candidates = [2,3,5], target = 8`,output:`[[2,2,2,2], [2,3,3], [3,5]]`,explanation:`Multiple ways to reach 8.`}],education:{tldr:`Backtrack with "remaining" sum. Pass start index to allow reuse without duplicates.`,steps:[{title:`Base: remaining=0`,description:`Found valid combination`,code:`if remaining == 0: result.append(current[:])`},{title:`Base: remaining<0`,description:`Overshot, backtrack`,code:`if remaining < 0: return`},{title:`Try each candidate`,description:`From start index (allows reuse)`,code:`for i in range(start, len(candidates))`},{title:`Recurse with i`,description:`Pass i, not i+1 (reuse allowed)`,code:`backtrack(i, current, remaining - candidates[i])`}],remember:[`Pass start index to avoid duplicate combinations`,`Recurse with i (not i+1) to allow reuse`,`Combination Sum II: no reuse → use i+1`,`Early termination: sort and break when candidate > remaining`],understanding:`**Combination Sum**: Find ways to reach a target sum, reusing elements allowed.

**Key Insight**: Use start index to prevent counting the same combination multiple times (e.g., [2,3] and [3,2]).

**Why pass i instead of i+1?** We can reuse the same element. Passing i means "I can pick candidates[i] again."`,whyPatternWorks:`The backtracking tree explores all possibilities:
- At each node, try candidates from start onwards
- Subtract from remaining and recurse
- If remaining hits 0, we found a valid path
- If negative, prune this branch

The start index ensures we only go "forward" in candidates, avoiding duplicates.`,keyInsights:[`start index prevents duplicate combos`,`Reuse = pass i; no reuse = pass i+1`,`Sort + prune: if candidate > remaining, break`,`Current list is modified in-place (append/pop)`]},code:`def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    result = []

    def backtrack(start, current, remaining):
        if remaining == 0:
            result.append(current[:])
            return
        if remaining < 0:
            return

        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, current, remaining - candidates[i])
            current.pop()

    backtrack(0, [], target)
    return result`,inputs:[{name:`candidates`,type:`string`,default:`2,3,6,7`,label:`Candidates`,placeholder:`2,3,6,7`},{name:`target`,type:`number`,default:7,label:`Target`,placeholder:`7`}],generateSteps:e=>{let t=e.candidates.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=e.target,r=[],i=[];r.push({lineNumber:2,description:`Find combinations summing to ${n}`,elements:[{type:`array`,id:`candidates`,values:t},{type:`array`,id:`current`,values:[]}],variables:{target:n,remaining:n}});let a=(e,o,s)=>{if(s===0){i.push([...o]),r.push({lineNumber:5,description:`Found combination: [${o.join(`+`)}] = ${n}`,elements:[{type:`array`,id:`current`,values:[...o],highlights:o.map((e,t)=>({index:t,style:`found`}))}],variables:{combination:[...o],sum:n}});return}if(!(s<0||r.length>=40))for(let i=e;i<t.length&&r.length<35;i++){o.push(t[i]);let e=s-t[i];r.push({lineNumber:11,description:`Try ${t[i]}, sum=${n-e}, remaining=${e}`,elements:[{type:`array`,id:`candidates`,values:t,pointers:[{index:i,label:`i`,color:`#3B82F6`}]},{type:`array`,id:`current`,values:[...o]}],variables:{trying:t[i],remaining:e}}),a(i,o,e);let c=o.pop();r.length<40&&r.push({lineNumber:13,description:`Backtrack: remove ${c}, try next candidate`,elements:[{type:`array`,id:`candidates`,values:t,pointers:[{index:i,label:`i`,color:`#3B82F6`}]},{type:`array`,id:`current`,values:[...o],highlights:o.length>0?o.map((e,t)=>({index:t,style:`active`})):[]}],variables:{popped:c,remaining:s}})}};return a(0,[],n),r.push({lineNumber:15,description:`Complete! Found ${i.length} combinations`,elements:[],variables:{totalCombinations:i.length},isComplete:!0}),r}},{id:`n-queens`,name:`N-Queens`,category:`backtracking`,difficulty:`Hard`,leetcodeId:51,description:`Place N queens on NxN board so no two attack each other.`,timeComplexity:`O(n!)`,spaceComplexity:`O(n)`,visualizationType:`matrix`,examples:[{input:`n = 4`,output:`[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]`,explanation:`Two ways to place 4 queens on 4×4 board.`},{input:`n = 1`,output:`[["Q"]]`,explanation:`Single queen on 1×1 board.`}],education:{tldr:`Place row by row. Track cols, diag1 (r-c), diag2 (r+c) in sets for O(1) conflict check.`,steps:[{title:`Process row by row`,description:`One queen per row guaranteed`,code:`def backtrack(row)`},{title:`Check conflicts`,description:`Column or diagonal already used?`,code:`if col in cols or (r-c) in diag1 or (r+c) in diag2`},{title:`Place queen`,description:`Add to sets and recurse`,code:`cols.add(col); queens.append(col)`},{title:`Backtrack`,description:`Remove from sets and continue`,code:`cols.remove(col); queens.pop()`}],remember:[`Row-by-row guarantees one queen per row`,`Diagonal formula: same diag1 = same r-c, same diag2 = same r+c`,`Use sets for O(1) conflict detection`,`4-Queens has 2 solutions, 8-Queens has 92`],understanding:`**N-Queens** is classic constraint satisfaction via backtracking.

**Key Insight**: Process row by row—this guarantees one queen per row. Only check column and diagonal conflicts.

**Diagonal Trick**: On diagonal going ↘, r-c is constant. On diagonal going ↙, r+c is constant. Use sets to track used diagonals.`,whyPatternWorks:`By processing row by row:
1. One queen per row is automatic
2. For each column, check if column/diagonals are safe
3. Place queen, update tracking sets, recurse to next row
4. Backtrack by removing from sets

The sets provide O(1) conflict checking, making the algorithm efficient despite exploring many possibilities.`,keyInsights:[`Row-by-row processing = one queen per row automatically`,`Diagonal formulas: r-c and r+c`,`Sets for O(1) conflict check`,`N-Queens II: just count solutions (simpler)`]},code:`def solveNQueens(n: int) -> list[list[str]]:
    result = []
    cols = set()
    diag1 = set()  # row - col
    diag2 = set()  # row + col

    def backtrack(row, queens):
        if row == n:
            result.append(queens[:])
            return

        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue

            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            queens.append(col)

            backtrack(row + 1, queens)

            queens.pop()
            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)

    backtrack(0, [])
    return result`,inputs:[{name:`n`,type:`number`,default:4,label:`Board Size (N)`,placeholder:`4`}],generateSteps:e=>{let t=Math.min(e.n,6),n=[],r=[],i=new Set,a=new Set,o=new Set,s=e=>{let n=[];for(let r=0;r<t;r++)for(let i=0;i<t;i++)e[r]===i?n.push(1):n.push(0);return n},c=(e,t=`active`)=>e.map((e,n)=>({row:n,col:e,style:t}));n.push({lineNumber:2,description:`Place ${t} queens on ${t}×${t} board`,elements:[{type:`matrix`,id:`board`,rows:t,cols:t,values:s([])}],variables:{n:t,solutions:0}});let l=(e,u)=>{if(e===t){r.push([...u]),n.push({lineNumber:8,description:`Found solution #${r.length}!`,elements:[{type:`matrix`,id:`board`,rows:t,cols:t,values:s(u),highlights:c(u,`found`)}],variables:{solution:[...u],solutionCount:r.length}});return}if(!(n.length>=20))for(let r=0;r<t&&n.length<20;r++)i.has(r)||a.has(e-r)||o.has(e+r)||(i.add(r),a.add(e-r),o.add(e+r),u.push(r),n.push({lineNumber:15,description:`Place queen at row ${e}, col ${r}`,elements:[{type:`matrix`,id:`board`,rows:t,cols:t,values:s(u),highlights:c(u)}],variables:{row:e,col:r,queensPlaced:u.length}}),l(e+1,u),u.pop(),i.delete(r),a.delete(e-r),o.delete(e+r))};return l(0,[]),n.push({lineNumber:27,description:`Complete! Found ${r.length} solutions`,elements:[],variables:{totalSolutions:r.length},isComplete:!0}),n}}]},{id:`dynamicProgramming`,name:`Dynamic Programming`,color:`var(--accent-dp)`,algorithms:[{id:`climbing-stairs`,name:`Climbing Stairs`,category:`dynamicProgramming`,difficulty:`Easy`,leetcodeId:70,description:`Count distinct ways to climb n stairs, taking 1 or 2 steps at a time.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,code:`def climbStairs(n: int) -> int:
    if n <= 2:
        return n

    prev2, prev1 = 1, 2

    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr

    return prev1`,inputs:[{name:`n`,type:`number`,default:5,label:`Number of stairs`,placeholder:`5`}],generateSteps:e=>{let t=e.n,n=[];if(t<=2)return n.push({lineNumber:3,description:`n = ${t} <= 2, return ${t}`,elements:[],variables:{result:t},isComplete:!0}),n;let r=1,i=2,a=[1,2];n.push({lineNumber:5,description:`Initialize: ways(1) = 1, ways(2) = 2`,elements:[{type:`array`,id:`dp`,values:a}],variables:{prev2:1,prev1:2}});for(let e=3;e<=t;e++){let t=i+r;if(a.push(t),n.push({lineNumber:8,description:`ways(${e}) = ways(${e-1}) + ways(${e-2}) = ${i} + ${r} = ${t}`,elements:[{type:`array`,id:`dp`,values:[...a],highlights:[{index:a.length-1,style:`active`},{index:a.length-2,style:`found`},{index:a.length-3,style:`found`}]}],variables:{i:e,prev1:i,prev2:r,curr:t}}),r=i,i=t,n.length>25)break}return n.push({lineNumber:12,description:`Complete! Ways to climb ${t} stairs = ${i}`,elements:[{type:`array`,id:`dp`,values:a}],variables:{result:i},isComplete:!0}),n}},{id:`coin-change`,name:`Coin Change`,category:`dynamicProgramming`,difficulty:`Medium`,leetcodeId:322,description:`Find minimum number of coins needed to make up an amount.`,timeComplexity:`O(n × amount)`,spaceComplexity:`O(amount)`,visualizationType:`array`,code:`def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1`,inputs:[{name:`coins`,type:`array`,default:[1,2,5],label:`Coin denominations`,placeholder:`1, 2, 5`},{name:`amount`,type:`number`,default:11,label:`Target amount`,placeholder:`11`}],generateSteps:e=>{let t=e.coins,n=e.amount,r=[],i=n+1,a=Array(n+1).fill(i);a[0]=0,r.push({lineNumber:2,description:`Initialize dp[0..${n}] with infinity, dp[0] = 0`,elements:[{type:`array`,id:`dp`,values:a.slice(0,Math.min(a.length,15)).map(e=>e===i?-1:e)}],variables:{coins:t.join(`, `),amount:n}});for(let e of t){r.push({lineNumber:5,description:`Process coin = ${e}`,elements:[{type:`array`,id:`dp`,values:a.slice(0,Math.min(a.length,15)).map(e=>e===i?-1:e)}],variables:{coin:e}});for(let t=e;t<=n;t++){if(a[t-e]+1<a[t]){a[t]=a[t-e]+1;let n=Math.min(a.length,15),o=[];t<n&&o.push({index:t,style:`active`}),t-e>=0&&t-e<n&&o.push({index:t-e,style:`found`}),r.push({lineNumber:7,description:`dp[${t}] = min(dp[${t}], dp[${t-e}] + 1) = ${a[t]}`,elements:[{type:`array`,id:`dp`,values:a.slice(0,n).map(e=>e===i?-1:e),highlights:o}],variables:{x:t,coin:e,dpX:a[t],dpXMinusCoin:a[t-e]}})}if(r.length>50)break}if(r.length>50)break}let o=a[n]===i?-1:a[n];return r.push({lineNumber:9,description:o===-1?`Impossible to make ${n}`:`Minimum coins for ${n} = ${o}`,elements:[{type:`array`,id:`dp`,values:a.slice(0,Math.min(a.length,15)).map(e=>e===i?-1:e)}],variables:{result:o},isComplete:!0}),r}},{id:`longest-common-subsequence`,name:`Longest Common Subsequence`,category:`dynamicProgramming`,difficulty:`Medium`,leetcodeId:1143,description:`Find the length of the longest subsequence common to both strings.`,timeComplexity:`O(m × n)`,spaceComplexity:`O(m × n)`,visualizationType:`matrix`,code:`def longestCommonSubsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]`,inputs:[{name:`text1`,type:`string`,default:`abcde`,label:`Text 1`,placeholder:`abcde`},{name:`text2`,type:`string`,default:`ace`,label:`Text 2`,placeholder:`ace`}],generateSteps:e=>{let t=e.text1,n=e.text2,r=[],i=t.length,a=n.length,o=Array(i+1).fill(0).map(()=>Array(a+1).fill(0)),s=()=>{let e=[];for(let t=0;t<=Math.min(i,5);t++)for(let n=0;n<=Math.min(a,5);n++)e.push(o[t][n]);return e};r.push({lineNumber:3,description:`Initialize ${i+1}×${a+1} DP table with zeros`,elements:[{type:`array`,id:`dp`,values:s()}],variables:{m:i,n:a,text1:t,text2:n}});for(let e=1;e<=i;e++){for(let i=1;i<=a&&(t[e-1]===n[i-1]?(o[e][i]=o[e-1][i-1]+1,r.push({lineNumber:7,description:`text1[${e-1}]='${t[e-1]}' == text2[${i-1}]='${n[i-1]}': dp[${e}][${i}] = dp[${e-1}][${i-1}] + 1 = ${o[e][i]}`,elements:[{type:`array`,id:`dp`,values:s()}],variables:{i:e,j:i,match:!0,lcs:o[e][i]}})):(o[e][i]=Math.max(o[e-1][i],o[e][i-1]),r.push({lineNumber:9,description:`'${t[e-1]}' != '${n[i-1]}': dp[${e}][${i}] = max(${o[e-1][i]}, ${o[e][i-1]}) = ${o[e][i]}`,elements:[{type:`array`,id:`dp`,values:s()}],variables:{i:e,j:i,match:!1,lcs:o[e][i]}})),!(r.length>25));i++);if(r.length>25)break}return r.push({lineNumber:11,description:`Complete! LCS length = ${o[i][a]}`,elements:[{type:`array`,id:`dp`,values:s()}],variables:{result:o[i][a]},isComplete:!0}),r}}]},{id:`greedy`,name:`Greedy`,color:`var(--accent-greedy)`,algorithms:[{id:`jump-game`,name:`Jump Game`,category:`greedy`,difficulty:`Medium`,leetcodeId:55,description:`Determine if you can reach the last index.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,code:`def canJump(nums: list[int]) -> bool:
    maxReach = 0

    for i, jump in enumerate(nums):
        if i > maxReach:
            return False
        maxReach = max(maxReach, i + jump)

    return True`,inputs:[{name:`nums`,type:`string`,default:`2,3,1,1,4`,label:`Jump lengths`,placeholder:`2,3,1,1,4`}],generateSteps:e=>{let t=e.nums.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=[],r=0;n.push({lineNumber:2,description:`Initialize maxReach = 0`,elements:[{type:`array`,id:`nums`,values:t}],variables:{maxReach:r,target:t.length-1}});for(let e=0;e<t.length&&n.length<20;e++){if(e>r)return n.push({lineNumber:5,description:`Position ${e} > maxReach ${r}: cannot proceed!`,elements:[{type:`array`,id:`nums`,values:t,pointers:[{index:e,label:`i`,color:`#EF4444`}],styles:t.map((e,t)=>t<=r?`found`:`comparing`)}],variables:{i:e,maxReach:r,canReach:!1},isComplete:!0}),n;let i=r;if(r=Math.max(r,e+t[e]),n.push({lineNumber:7,description:`At ${e}, jump=${t[e]}, maxReach = max(${i}, ${e}+${t[e]}) = ${r}`,elements:[{type:`array`,id:`nums`,values:t,pointers:[{index:e,label:`i`,color:`#3B82F6`}],styles:t.map((e,t)=>t<=r?`found`:`default`)}],variables:{i:e,jump:t[e],maxReach:r}}),r>=t.length-1)return n.push({lineNumber:9,description:`maxReach ${r} >= target ${t.length-1}: can reach end!`,elements:[{type:`array`,id:`nums`,values:t,styles:t.map(()=>`found`)}],variables:{maxReach:r,target:t.length-1,canReach:!0},isComplete:!0}),n}return n.push({lineNumber:9,description:`Complete! Can reach end: ${r>=t.length-1}`,elements:[{type:`array`,id:`nums`,values:t,styles:t.map(()=>`found`)}],variables:{result:r>=t.length-1},isComplete:!0}),n}},{id:`gas-station`,name:`Gas Station`,category:`greedy`,difficulty:`Medium`,leetcodeId:134,description:`Find starting station to complete circular tour.`,timeComplexity:`O(n)`,spaceComplexity:`O(1)`,visualizationType:`array`,code:`def canCompleteCircuit(gas: list[int], cost: list[int]) -> int:
    total = 0
    tank = 0
    start = 0

    for i in range(len(gas)):
        total += gas[i] - cost[i]
        tank += gas[i] - cost[i]

        if tank < 0:
            start = i + 1
            tank = 0

    return start if total >= 0 else -1`,inputs:[{name:`gas`,type:`string`,default:`1,2,3,4,5`,label:`Gas at stations`,placeholder:`1,2,3,4,5`},{name:`cost`,type:`string`,default:`3,4,5,1,2`,label:`Cost to next station`,placeholder:`3,4,5,1,2`}],generateSteps:e=>{let t=e.gas,n=e.cost,r=t.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),i=n.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),a=[],o=0,s=0,c=0;a.push({lineNumber:2,description:`Initialize: total=0, tank=0, start=0`,elements:[{type:`array`,id:`gas`,values:r},{type:`array`,id:`cost`,values:i}],variables:{total:o,tank:s,start:c}});for(let e=0;e<r.length&&a.length<20;e++){let t=r[e]-i[e];o+=t,s+=t,a.push({lineNumber:7,description:`Station ${e}: gas=${r[e]}, cost=${i[e]}, net=${t}, tank=${s}`,elements:[{type:`array`,id:`gas`,values:r,pointers:[{index:e,label:`i`,color:`#3B82F6`},{index:c,label:`start`,color:`#16A34A`}]},{type:`array`,id:`cost`,values:i}],variables:{i:e,net:t,tank:s,total:o,start:c}}),s<0&&(c=e+1,s=0,a.push({lineNumber:11,description:`Tank < 0! Reset start to ${c}, tank to 0`,elements:[{type:`array`,id:`gas`,values:r,pointers:c<r.length?[{index:c,label:`start`,color:`#16A34A`}]:[]},{type:`array`,id:`cost`,values:i}],variables:{newStart:c,tank:0}}))}let l=o>=0?c:-1;return a.push({lineNumber:14,description:`Complete! ${o>=0?`Start at station ${c}`:`No solution`}`,elements:[{type:`array`,id:`gas`,values:r,styles:r.map((e,t)=>t===c&&o>=0?`found`:`default`)}],variables:{total:o,result:l},isComplete:!0}),a}}]},{id:`intervals`,name:`Intervals`,color:`var(--accent-intervals)`,algorithms:[{id:`merge-intervals`,name:`Merge Intervals`,category:`intervals`,difficulty:`Medium`,leetcodeId:56,description:`Merge all overlapping intervals.`,timeComplexity:`O(n log n)`,spaceComplexity:`O(n)`,visualizationType:`array`,examples:[{input:`intervals = [[1,3],[2,6],[8,10],[15,18]]`,output:`[[1,6],[8,10],[15,18]]`,explanation:`[1,3] and [2,6] overlap, merge to [1,6]. Others stay separate.`},{input:`intervals = [[1,4],[4,5]]`,output:`[[1,5]]`,explanation:`Intervals touching at endpoints are considered overlapping.`}],education:{tldr:`Sort by start, then greedily merge if current start ≤ previous end.`,steps:[{title:`Sort intervals`,description:`By start time ascending`,code:`intervals.sort(key=lambda x: x[0])`},{title:`Start with first`,description:`Add first interval to result`,code:`merged = [intervals[0]]`},{title:`Check overlap`,description:`If start ≤ last end, extend last`,code:`if start <= merged[-1][1]: extend`},{title:`No overlap`,description:`Otherwise add as new interval`,code:`else: merged.append(interval)`}],remember:[`Sort first, always`,`Overlap: current_start ≤ previous_end`,`Extend by taking max of ends`],understanding:`Merging intervals is the foundational interval problem. The key insight: after sorting by start time, overlapping intervals are adjacent.

**When do intervals overlap?** After sorting, [a,b] and [c,d] overlap if c ≤ b (the next interval starts before the current one ends).

**How to merge?** Take the minimum start (already sorted) and maximum end.`,whyPatternWorks:`Sorting transforms a 2D problem (comparing any two intervals) into a 1D problem (only compare adjacent intervals).

After sorting by start:
- If intervals overlap, they must be consecutive
- We can greedily merge as we go
- No need to look back—each interval either extends the last or starts fresh`,keyInsights:[`Sort by start time first`,`Overlapping intervals become adjacent after sorting`,`Greedy: extend current or start new`,`O(n log n) for sort, O(n) for merge pass`]},code:`def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged`,inputs:[{name:`intervals`,type:`string`,default:`1,3|2,6|8,10|15,18`,label:`Intervals (start,end|...)`,placeholder:`1,3|2,6|8,10|15,18`}],generateSteps:e=>{let t=e.intervals.split(`|`).map(e=>{let t=e.split(`,`).map(e=>parseInt(e.trim()));return[t[0],t[1]]}).filter(e=>!isNaN(e[0])&&!isNaN(e[1])),n=[];t.sort((e,t)=>e[0]-t[0]),n.push({lineNumber:2,description:`Sort intervals by start time`,elements:[{type:`array`,id:`intervals`,values:t.map(([e])=>e)}],variables:{sorted:t.map(([e,t])=>`[${e},${t}]`)}});let r=[t[0]];n.push({lineNumber:3,description:`Initialize merged with first interval [${t[0][0]},${t[0][1]}]`,elements:[{type:`array`,id:`merged`,values:r.map(([e])=>e),styles:r.map(()=>`found`)}],variables:{merged:r.map(([e,t])=>`[${e},${t}]`)}});for(let e=1;e<t.length&&n.length<20;e++){let[i,a]=t[e],o=r[r.length-1][1];i<=o?(r[r.length-1][1]=Math.max(o,a),n.push({lineNumber:7,description:`[${i},${a}] overlaps with last, merge → [${r[r.length-1][0]},${r[r.length-1][1]}]`,elements:[{type:`array`,id:`intervals`,values:t.map(([e])=>e),pointers:[{index:e,label:`i`,color:`#3B82F6`}]},{type:`array`,id:`merged`,values:r.map(([e])=>e),styles:r.map(()=>`found`)}],variables:{overlap:!0,current:`[${i},${a}]`,mergedTo:`[${r[r.length-1][0]},${r[r.length-1][1]}]`}})):(r.push([i,a]),n.push({lineNumber:9,description:`[${i},${a}] doesn't overlap, add as new interval`,elements:[{type:`array`,id:`intervals`,values:t.map(([e])=>e),pointers:[{index:e,label:`i`,color:`#3B82F6`}]},{type:`array`,id:`merged`,values:r.map(([e])=>e),styles:r.map(()=>`found`)}],variables:{overlap:!1,current:`[${i},${a}]`}}))}return n.push({lineNumber:11,description:`Complete! Merged into ${r.length} intervals`,elements:[{type:`array`,id:`merged`,values:r.map(([e])=>e),styles:r.map(()=>`found`)}],variables:{result:r.map(([e,t])=>`[${e},${t}]`)},isComplete:!0}),n}},{id:`insert-interval`,name:`Insert Interval`,category:`intervals`,difficulty:`Medium`,leetcodeId:57,description:`Insert a new interval into sorted non-overlapping intervals.`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`array`,examples:[{input:`intervals = [[1,3],[6,9]], newInterval = [2,5]`,output:`[[1,5],[6,9]]`,explanation:`[2,5] overlaps with [1,3], merge to [1,5].`},{input:`intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]`,output:`[[1,2],[3,10],[12,16]]`,explanation:`[4,8] overlaps with [3,5], [6,7], [8,10], all merge to [3,10].`}],education:{tldr:`Three phases: add intervals before, merge overlapping, add intervals after.`,steps:[{title:`Add before`,description:`Intervals ending before new starts`,code:`while intervals[i][1] < new[0]`},{title:`Merge overlapping`,description:`Expand new interval with overlaps`,code:`while intervals[i][0] <= new[1]`},{title:`Add new interval`,description:`The merged result`,code:`result.append(newInterval)`},{title:`Add after`,description:`Remaining intervals`,code:`result.extend(remaining)`}],remember:[`Three phases: before, merge, after`,`Before: ends before new starts`,`Overlap: starts before new ends`],understanding:`Since intervals are already sorted and non-overlapping, we process in three phases:

**Phase 1 (Before):** Add all intervals that end before the new interval starts. No overlap possible.

**Phase 2 (Merge):** Any interval that starts before the new interval ends might overlap. Merge all of them into the new interval.

**Phase 3 (After):** Add remaining intervals as-is.`,whyPatternWorks:`The sorted, non-overlapping input makes this linear:

- We know exactly where to "insert" based on start/end comparisons
- Overlapping intervals are contiguous (thanks to sorted order)
- Single pass through the array

No need to sort again—the problem gives us sorted input.`,keyInsights:[`Input is already sorted and non-overlapping`,`Three distinct phases: before, merge, after`,`Overlap check: does interval start before new ends?`,`O(n) time—no sorting needed`]},code:`def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    result = []
    i = 0

    # Add intervals before newInterval
    while i < len(intervals) and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping intervals
    while i < len(intervals) and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1

    result.append(newInterval)

    # Add remaining intervals
    while i < len(intervals):
        result.append(intervals[i])
        i += 1

    return result`,inputs:[{name:`intervals`,type:`string`,default:`1,2|3,5|6,7|8,10|12,16`,label:`Intervals`,placeholder:`1,2|3,5|6,7|8,10|12,16`},{name:`newInterval`,type:`string`,default:`4,8`,label:`New Interval`,placeholder:`4,8`}],generateSteps:e=>{let t=e.intervals.split(`|`).map(e=>{let t=e.split(`,`).map(e=>parseInt(e.trim()));return[t[0],t[1]]}).filter(e=>!isNaN(e[0])&&!isNaN(e[1])),n=e.newInterval.split(`,`).map(e=>parseInt(e.trim())),r=[n[0],n[1]],i=[],a=[],o=0;for(i.push({lineNumber:2,description:`Insert [${r[0]},${r[1]}] into intervals`,elements:[{type:`array`,id:`intervals`,values:t.map(([e])=>e)}],variables:{newInterval:`[${r[0]},${r[1]}]`}});o<t.length&&t[o][1]<r[0];)a.push(t[o]),o++;a.length>0&&i.push({lineNumber:7,description:`Add ${a.length} intervals before new interval`,elements:[{type:`array`,id:`result`,values:a.map(([e])=>e),styles:a.map(()=>`found`)}],variables:{beforeCount:a.length}});let s=o;for(;o<t.length&&t[o][0]<=r[1];)r=[Math.min(r[0],t[o][0]),Math.max(r[1],t[o][1])],o++;for(o>s&&i.push({lineNumber:12,description:`Merged ${o-s} overlapping intervals → [${r[0]},${r[1]}]`,elements:[{type:`array`,id:`intervals`,values:t.map(([e])=>e)}],variables:{mergedCount:o-s,merged:`[${r[0]},${r[1]}]`}}),a.push(r),i.push({lineNumber:16,description:`Add merged interval [${r[0]},${r[1]}]`,elements:[{type:`array`,id:`result`,values:a.map(([e])=>e),styles:a.map(()=>`found`)}],variables:{addedMerged:`[${r[0]},${r[1]}]`}});o<t.length;)a.push(t[o]),o++;return i.push({lineNumber:22,description:`Complete! Result has ${a.length} intervals`,elements:[{type:`array`,id:`result`,values:a.map(([e])=>e),styles:a.map(()=>`found`)}],variables:{result:a.map(([e,t])=>`[${e},${t}]`)},isComplete:!0}),i}},{id:`meeting-rooms-ii`,name:`Meeting Rooms II`,category:`intervals`,difficulty:`Medium`,leetcodeId:253,description:`Find minimum number of meeting rooms required.`,timeComplexity:`O(n log n)`,spaceComplexity:`O(n)`,visualizationType:`array`,examples:[{input:`intervals = [[0,30],[5,10],[15,20]]`,output:`2`,explanation:`[0,30] overlaps with both others, but [5,10] and [15,20] don't overlap each other.`},{input:`intervals = [[7,10],[2,4]]`,output:`1`,explanation:`No overlap—one room suffices.`}],education:{tldr:`Separate starts and ends, sort both. If a meeting starts before the earliest end, need new room.`,steps:[{title:`Separate & sort`,description:`Extract all starts and ends, sort independently`,code:`starts = sorted(starts), ends = sorted(ends)`},{title:`Walk through starts`,description:`For each start time`,code:`for start in starts`},{title:`Compare to earliest end`,description:`If start < earliest unmatched end, need new room`,code:`if start < ends[end_ptr]: rooms++`},{title:`Room freed`,description:`Else reuse a room, move end pointer`,code:`else: end_ptr++`}],remember:[`Separate starts and ends`,`Sort both independently`,`New room when start < earliest end`],understanding:`This is the "sweep line" pattern. Think of it as sweeping through time:

**At each start:** A meeting begins. If no meeting has ended yet (start < earliest end), we need a new room.

**Why sort separately?** We don't care which meeting ends—only that SOME meeting ends. Sorting separately lets us track the earliest available end time.

**Why two pointers?** The end pointer tracks "how many rooms have been freed". If we've used 3 rooms but end_ptr is at 1, we have 3-1=2 rooms in use.`,whyPatternWorks:`The key insight: we only care about COUNTS, not which specific meeting uses which room.

By sorting starts and ends separately:
- We know when meetings start (in order)
- We know when rooms become available (in order)
- Comparing them tells us if we need more rooms

Alternative: use a min-heap of end times (more intuitive but same complexity).`,keyInsights:[`Sweep line: process events in time order`,`Sort starts and ends separately`,`rooms = max concurrent meetings`,`Alternative: min-heap of end times`,`Also called "Meeting Rooms II"`]},code:`def minMeetingRooms(intervals: list[list[int]]) -> int:
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])

    rooms = 0
    end_ptr = 0

    for start in starts:
        if start < ends[end_ptr]:
            rooms += 1
        else:
            end_ptr += 1

    return rooms`,inputs:[{name:`intervals`,type:`string`,default:`0,30|5,10|15,20`,label:`Meetings (start,end|...)`,placeholder:`0,30|5,10|15,20`}],generateSteps:e=>{let t=e.intervals.split(`|`).map(e=>{let t=e.split(`,`).map(e=>parseInt(e.trim()));return[t[0],t[1]]}).filter(e=>!isNaN(e[0])&&!isNaN(e[1])),n=[],r=t.map(e=>e[0]).sort((e,t)=>e-t),i=t.map(e=>e[1]).sort((e,t)=>e-t);n.push({lineNumber:2,description:`Sort start and end times separately`,elements:[{type:`array`,id:`starts`,values:r},{type:`array`,id:`ends`,values:i}],variables:{starts:r,ends:i}});let a=0,o=0;for(let e=0;e<r.length&&n.length<20;e++){let t=r[e];t<i[o]?(a++,n.push({lineNumber:10,description:`Start ${t} < End ${i[o]}: need new room. Rooms = ${a}`,elements:[{type:`array`,id:`starts`,values:r,pointers:[{index:e,label:`start`,color:`#3B82F6`}]},{type:`array`,id:`ends`,values:i,pointers:[{index:o,label:`end`,color:`#EF4444`}]}],variables:{start:t,endTime:i[o],rooms:a,needNewRoom:!0}})):(o++,n.push({lineNumber:12,description:`Start ${t} >= End ${i[o-1]}: reuse room. Move end pointer.`,elements:[{type:`array`,id:`starts`,values:r,pointers:[{index:e,label:`start`,color:`#3B82F6`}]},{type:`array`,id:`ends`,values:i,pointers:[{index:o,label:`end`,color:`#EF4444`}]}],variables:{start:t,endTime:i[o-1],rooms:a,reuseRoom:!0}}))}return n.push({lineNumber:14,description:`Complete! Minimum rooms needed: ${a}`,elements:[],variables:{result:a},isComplete:!0}),n}},{id:`non-overlapping-intervals`,name:`Non-overlapping Intervals`,category:`intervals`,difficulty:`Medium`,leetcodeId:435,description:`Find minimum number of intervals to remove to make rest non-overlapping.`,timeComplexity:`O(n log n)`,spaceComplexity:`O(1)`,visualizationType:`array`,examples:[{input:`intervals = [[1,2],[2,3],[3,4],[1,3]]`,output:`1`,explanation:`Remove [1,3] and the rest are non-overlapping: [1,2], [2,3], [3,4].`},{input:`intervals = [[1,2],[1,2],[1,2]]`,output:`2`,explanation:`Need to remove 2 of the 3 identical intervals to have no overlap.`},{input:`intervals = [[1,2],[2,3]]`,output:`0`,explanation:`Already non-overlapping (touching at 2 is OK).`}],education:{tldr:`Sort by end time, greedily keep intervals that end earliest.`,steps:[{title:`Sort by end`,description:`Sort intervals by end time ascending`,code:`intervals.sort(key=lambda x: x[1])`},{title:`Track last end`,description:`Keep track of last non-overlapping end`,code:`last_end = intervals[0][1]`},{title:`Check overlap`,description:`If start < last_end, must remove`,code:`if start < last_end: removals++`},{title:`No overlap`,description:`Otherwise update last_end`,code:`else: last_end = end`}],remember:[`Sort by END time, not start`,`Greedy: keep earliest-ending intervals`,`Overlap: start < last_end (not <=)`],understanding:`This is an interval scheduling problem. The key insight: **sort by end time**.

**Why end time?** Intervals that end earlier leave more room for subsequent intervals. By always keeping the earliest-ending interval, we maximize how many can fit.

**Greedy choice:** When two intervals overlap, remove the one that ends later. The one ending earlier leaves more room for future intervals.`,whyPatternWorks:`Sorting by end time converts this to a greedy selection problem:

1. After sorting, we process intervals left-to-right by end time
2. Each decision is locally optimal: keep earliest-ending, remove later-ending
3. This greedy choice is globally optimal (can be proven by exchange argument)

**Alternative view:** This is equivalent to finding the maximum number of non-overlapping intervals (activity selection problem), then subtracting from total.`,keyInsights:[`Sort by END time, not start time`,`Greedy: earliest-ending interval wins`,`Overlap check: start < last_end`,`Equivalent to: n - max_non_overlapping`,`Classic activity selection problem`]},code:`def eraseOverlapIntervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda x: x[1])  # Sort by end time

    removals = 0
    last_end = intervals[0][1]

    for start, end in intervals[1:]:
        if start < last_end:
            removals += 1  # Overlap - remove this one
        else:
            last_end = end  # No overlap - update end

    return removals`,inputs:[{name:`intervals`,type:`string`,default:`1,2|2,3|3,4|1,3`,label:`Intervals (start,end|...)`,placeholder:`1,2|2,3|3,4|1,3`}],generateSteps:e=>{let t=e.intervals.split(`|`).map(e=>{let t=e.split(`,`).map(e=>parseInt(e.trim()));return[t[0],t[1]]}).filter(e=>!isNaN(e[0])&&!isNaN(e[1])),n=[];t.sort((e,t)=>e[1]-t[1]),n.push({lineNumber:2,description:`Sort intervals by end time`,elements:[{type:`array`,id:`intervals`,values:t.map(([,e])=>e)}],variables:{sorted:t.map(([e,t])=>`[${e},${t}]`)}});let r=0,i=t[0][1];n.push({lineNumber:5,description:`Initialize: last_end = ${i}`,elements:[{type:`array`,id:`intervals`,values:t.map(([,e])=>e),pointers:[{index:0,label:`kept`,color:`#10B981`}]}],variables:{last_end:i,removals:0}});for(let e=1;e<t.length&&n.length<20;e++){let[a,o]=t[e];a<i?(r++,n.push({lineNumber:8,description:`[${a},${o}]: start ${a} < last_end ${i} → REMOVE (count: ${r})`,elements:[{type:`array`,id:`intervals`,values:t.map(([,e])=>e),pointers:[{index:e,label:`remove`,color:`#EF4444`}]}],variables:{start:a,end:o,last_end:i,removals:r,overlap:!0}})):(i=o,n.push({lineNumber:10,description:`[${a},${o}]: start ${a} >= last_end → KEEP, update last_end = ${o}`,elements:[{type:`array`,id:`intervals`,values:t.map(([,e])=>e),pointers:[{index:e,label:`keep`,color:`#10B981`}]}],variables:{start:a,end:o,last_end:i,removals:r,overlap:!1}}))}return n.push({lineNumber:12,description:`Complete! Need to remove ${r} intervals`,elements:[],variables:{result:r},isComplete:!0}),n}},{id:`employee-free-time`,name:`Employee Free Time`,category:`intervals`,difficulty:`Hard`,leetcodeId:759,description:`Find common free time intervals across all employees.`,timeComplexity:`O(n log n)`,spaceComplexity:`O(n)`,visualizationType:`array`,examples:[{input:`schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]`,output:`[[3,4]]`,explanation:`All employees are busy during [1,3] and [4,10]. Free time is [3,4].`},{input:`schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]`,output:`[[5,6],[7,9]]`,explanation:`Merged busy: [1,5], [6,7], [9,12]. Gaps: [5,6] and [7,9].`}],education:{tldr:`Flatten all intervals, merge them, then find gaps between merged intervals.`,steps:[{title:`Flatten`,description:`Collect all intervals from all employees`,code:`all_intervals = [i for emp in schedule for i in emp]`},{title:`Sort & merge`,description:`Sort by start, merge overlapping`,code:`merged = merge_intervals(all_intervals)`},{title:`Find gaps`,description:`Gap between consecutive merged intervals`,code:`if merged[i-1][1] < merged[i][0]: gap`}],remember:[`Flatten all schedules first`,`This is merge intervals + find gaps`,`Gap = end of one < start of next`],understanding:`This problem combines two simpler operations:

**Step 1: Merge all busy times.** Treat all employee schedules as one big list of intervals and merge them.

**Step 2: Find gaps.** Free time = gaps between merged busy intervals. If one merged interval ends at 5 and next starts at 7, free time is [5,7].

**Key insight:** We don't care which employee has which interval—we just need to know when ANYONE is busy.`,whyPatternWorks:`By flattening and merging:

1. We get a minimal representation of "busy time"
2. Any gap in this merged list means NO ONE is busy
3. Gaps are easy to find: compare adjacent intervals

**Alternative:** Use a min-heap to process intervals by start time (useful if schedules are already sorted per employee).`,keyInsights:[`Flatten all employees into one list`,`Apply merge intervals algorithm`,`Free time = gaps between merged intervals`,`Heap approach if per-employee lists are sorted`,`O(n log n) dominated by sorting`]},code:`def employeeFreeTime(schedule: list[list[list[int]]]) -> list[list[int]]:
    # Flatten all intervals
    intervals = [i for emp in schedule for i in emp]
    intervals.sort(key=lambda x: x[0])

    # Merge overlapping intervals
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    # Find gaps (free time)
    free = []
    for i in range(1, len(merged)):
        if merged[i-1][1] < merged[i][0]:
            free.append([merged[i-1][1], merged[i][0]])

    return free`,inputs:[{name:`schedule`,type:`string`,default:`1,2;5,6|1,3|4,10`,label:`Schedule (intervals;...|employee|...)`,placeholder:`1,2;5,6|1,3|4,10`}],generateSteps:e=>{let t=e.schedule.split(`|`).map(e=>e.split(`;`).map(e=>{let t=e.split(`,`).map(e=>parseInt(e.trim()));return[t[0],t[1]]}).filter(e=>!isNaN(e[0])&&!isNaN(e[1]))),n=[],r=[];for(let e of t)for(let t of e)r.push(t);n.push({lineNumber:3,description:`Flatten: ${r.length} total intervals from ${t.length} employees`,elements:[{type:`array`,id:`intervals`,values:r.map(([e])=>e)}],variables:{employees:t.length,totalIntervals:r.length}}),r.sort((e,t)=>e[0]-t[0]),n.push({lineNumber:4,description:`Sort all intervals by start time`,elements:[{type:`array`,id:`intervals`,values:r.map(([e])=>e)}],variables:{sorted:r.map(([e,t])=>`[${e},${t}]`)}});let i=[r[0]];for(let e=1;e<r.length;e++){let[t,n]=r[e];t<=i[i.length-1][1]?i[i.length-1][1]=Math.max(i[i.length-1][1],n):i.push([t,n])}n.push({lineNumber:11,description:`Merged into ${i.length} busy intervals`,elements:[{type:`array`,id:`merged`,values:i.map(([e])=>e),styles:i.map(()=>`found`)}],variables:{merged:i.map(([e,t])=>`[${e},${t}]`)}});let a=[];for(let e=1;e<i.length;e++)i[e-1][1]<i[e][0]&&(a.push([i[e-1][1],i[e][0]]),n.push({lineNumber:16,description:`Gap found: [${i[e-1][1]}, ${i[e][0]}]`,elements:[{type:`array`,id:`merged`,values:i.map(([e])=>e),pointers:[{index:e-1,label:`end`,color:`#3B82F6`},{index:e,label:`start`,color:`#10B981`}]}],variables:{gapStart:i[e-1][1],gapEnd:i[e][0]}}));return n.push({lineNumber:18,description:`Complete! Found ${a.length} free time intervals`,elements:[],variables:{result:a.map(([e,t])=>`[${e},${t}]`),count:a.length},isComplete:!0}),n}}]},{id:`graphs`,name:`Graphs`,color:`var(--accent-graphs)`,algorithms:[{id:`course-schedule`,name:`Course Schedule`,category:`graphs`,difficulty:`Medium`,leetcodeId:207,description:`Determine if courses can be finished (detect cycle).`,timeComplexity:`O(V + E)`,spaceComplexity:`O(V + E)`,visualizationType:`array`,examples:[{input:`numCourses = 2, prerequisites = [[1,0]]`,output:`true`,explanation:`Take course 0 first, then course 1. No cycle.`},{input:`numCourses = 2, prerequisites = [[1,0],[0,1]]`,output:`false`,explanation:`0→1 and 1→0 form a cycle. Impossible to finish.`}],education:{tldr:`Kahn's algorithm: BFS starting from nodes with indegree 0. Cycle exists if not all processed.`,steps:[{title:`Build graph`,description:`Adjacency list + indegree array`,code:`graph[prereq].append(course); indegree[course]++`},{title:`Queue indegree 0`,description:`Start with courses having no prereqs`,code:`queue = [c for c if indegree[c] == 0]`},{title:`Process queue`,description:`Take course, reduce neighbors' indegree`,code:`indegree[next] -= 1`},{title:`Add newly 0`,description:`When indegree hits 0, add to queue`,code:`if indegree[next] == 0: queue.append(next)`}],remember:[`Indegree = number of incoming edges (prerequisites)`,`Start with indegree 0 (no prerequisites)`,`Cycle = some nodes never reach indegree 0`,`completed == numCourses means no cycle`],understanding:`**Topological Sort** orders nodes so every edge points forward. If a cycle exists, no valid ordering is possible.

**Kahn's Algorithm** (BFS approach):
1. Start with nodes having no dependencies (indegree 0)
2. "Remove" each node by decrementing neighbors' indegrees
3. When a node's indegree hits 0, it's ready to process

**Cycle detection**: If we finish but haven't processed all nodes, those remaining are in a cycle.`,whyPatternWorks:`Think of prerequisites as "blocking" relationships. A course with indegree 0 has no blockers—it can be taken now.

After "taking" a course, we remove its blocking effect on dependents. If a dependent's blockers all clear (indegree → 0), it becomes ready.

Cycles never reach indegree 0 because they block each other forever.`,keyInsights:[`Kahn's = BFS topological sort with cycle detection`,`Alternative: DFS with 3-color marking (white/gray/black)`,`Course Schedule II: return the actual ordering`,`Used in build systems, package managers, task scheduling`]},code:`def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    graph = defaultdict(list)
    indegree = [0] * numCourses

    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1

    queue = deque([i for i in range(numCourses) if indegree[i] == 0])
    completed = 0

    while queue:
        course = queue.popleft()
        completed += 1
        for next_course in graph[course]:
            indegree[next_course] -= 1
            if indegree[next_course] == 0:
                queue.append(next_course)

    return completed == numCourses`,inputs:[{name:`numCourses`,type:`number`,default:4,label:`Number of Courses`,placeholder:`4`},{name:`prerequisites`,type:`string`,default:`1,0|2,0|3,1|3,2`,label:`Prerequisites (course,prereq|...)`,placeholder:`1,0|2,0|3,1|3,2`}],generateSteps:e=>{let t=e.numCourses,n=e.prerequisites.split(`|`).map(e=>{let t=e.split(`,`).map(e=>parseInt(e.trim()));return[t[0],t[1]]}).filter(e=>!isNaN(e[0])&&!isNaN(e[1])),r=[],i=new Map,a=Array(t).fill(0);for(let[e,t]of n)i.has(t)||i.set(t,[]),i.get(t).push(e),a[e]++;r.push({lineNumber:5,description:`Build graph and calculate indegrees`,elements:[{type:`array`,id:`indegree`,values:a}],variables:{indegree:[...a]}});let o=[];for(let e=0;e<t;e++)a[e]===0&&o.push(e);r.push({lineNumber:9,description:`Start with courses having indegree 0: [${o.join(`,`)}]`,elements:[{type:`array`,id:`indegree`,values:[...a],styles:a.map(e=>e===0?`found`:`default`)}],variables:{queue:[...o]}});let s=0,c=[];for(;o.length>0&&r.length<20;){let e=o.shift();s++,c.push(e),r.push({lineNumber:13,description:`Process course ${e}, completed=${s}`,elements:[{type:`array`,id:`order`,values:[...c],styles:c.map(()=>`found`)},{type:`array`,id:`indegree`,values:[...a]}],variables:{course:e,completed:s,order:[...c]}});for(let t of i.get(e)||[])a[t]--,a[t]===0&&o.push(t)}return r.push({lineNumber:20,description:`Complete! ${s===t?`Can finish all courses`:`Cycle detected, cannot finish`}`,elements:[{type:`array`,id:`order`,values:c,styles:c.map(()=>`found`)}],variables:{completed:s,numCourses:t,canFinish:s===t},isComplete:!0}),r}},{id:`clone-graph`,name:`Clone Graph`,category:`graphs`,difficulty:`Medium`,leetcodeId:133,description:`Deep copy a connected undirected graph.`,timeComplexity:`O(V + E)`,spaceComplexity:`O(V)`,visualizationType:`array`,examples:[{input:`adjList = [[2,4],[1,3],[2,4],[1,3]]`,output:`Deep copy of the 4-node graph`,explanation:`Each node cloned with same neighbors pointing to cloned nodes.`},{input:`adjList = [[]]`,output:`Single node with no neighbors`,explanation:`Clone of a single isolated node.`}],education:{tldr:`DFS/BFS with hashmap: visited[original] = clone. Return clone from map if already visited.`,steps:[{title:`Check visited`,description:`If node already cloned, return its clone`,code:`if node in visited: return visited[node]`},{title:`Create clone`,description:`Make new node with same value`,code:`clone = Node(node.val)`},{title:`Map original→clone`,description:`Store before recursing (prevents cycles)`,code:`visited[node] = clone`},{title:`Clone neighbors`,description:`Recursively clone and connect`,code:`clone.neighbors.append(dfs(neighbor))`}],remember:[`HashMap: original node → cloned node`,`Store in map BEFORE recursing (cycle protection)`,`Return from map if already visited`,`Works with DFS or BFS`],understanding:`**The challenge**: Graphs can have cycles. Naive recursion would loop forever.

**Solution**: Use a hashmap to track original→clone mapping. Before recursing:
1. Check if we've already cloned this node → return existing clone
2. If not, create clone and store in map IMMEDIATELY
3. Then recurse on neighbors

**Why store before recursing?** When we encounter the same node through a cycle, it's already in the map.`,whyPatternWorks:`The hashmap serves two purposes:
1. **Cycle detection**: Already-visited nodes return their clone immediately
2. **Reference consistency**: All references to the same original node point to the same clone

The key insight: store clone in map BEFORE processing neighbors. This ensures cycles find their clone ready.`,keyInsights:[`Pattern: visited map stores original→clone mapping`,`Add to map before recursing (not after)`,`BFS alternative: queue + same map technique`,`Similar: deep copy linked list with random pointers`]},code:`def cloneGraph(node: 'Node') -> 'Node':
    if not node:
        return None

    visited = {}

    def dfs(node):
        if node in visited:
            return visited[node]

        clone = Node(node.val)
        visited[node] = clone

        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)`,inputs:[{name:`adjList`,type:`string`,default:`2,4|1,3|2,4|1,3`,label:`Adjacency list (neighbors of each node)`,placeholder:`2,4|1,3|2,4|1,3`}],generateSteps:e=>{let t=e.adjList.split(`|`).map(e=>e.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e))),n=[];n.push({lineNumber:5,description:`Start DFS clone from node 1`,elements:[{type:`array`,id:`nodes`,values:t.map((e,t)=>t+1)}],variables:{startNode:1,visited:{}}});let r=new Set,i=new Map,a=[],o=e=>{if(!(r.has(e)||n.length>=20)){r.add(e),i.set(e,e),a.push(e),n.push({lineNumber:11,description:`Clone node ${e+1}`,elements:[{type:`array`,id:`nodes`,values:t.map((e,t)=>t+1),styles:t.map((e,t)=>r.has(t)?`found`:`default`)},{type:`array`,id:`cloned`,values:[...a].map(e=>e+1),styles:a.map(()=>`found`)}],variables:{node:e+1,clonedCount:i.size}});for(let i of t[e])r.has(i-1)||(n.push({lineNumber:14,description:`Visit neighbor ${i} from node ${e+1}`,elements:[{type:`array`,id:`nodes`,values:t.map((e,t)=>t+1),pointers:[{index:i-1,label:`next`,color:`#3B82F6`}]}],variables:{from:e+1,to:i}}),o(i-1))}};return t.length>0&&o(0),n.push({lineNumber:18,description:`Complete! Cloned ${i.size} nodes`,elements:[{type:`array`,id:`cloned`,values:[...a].map(e=>e+1),styles:a.map(()=>`found`)}],variables:{clonedNodes:i.size},isComplete:!0}),n}}]},{id:`trie`,name:`Trie`,color:`var(--accent-trie)`,algorithms:[{id:`implement-trie`,name:`Implement Trie`,category:`trie`,difficulty:`Medium`,leetcodeId:208,description:`Implement a trie with insert, search, and startsWith.`,timeComplexity:`O(m) per operation`,spaceComplexity:`O(n × m)`,visualizationType:`array`,code:`class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def _traverse(self, prefix: str) -> TrieNode:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

    def search(self, word: str) -> bool:
        node = self._traverse(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._traverse(prefix) is not None`,inputs:[{name:`words`,type:`string`,default:`apple,app,apply`,label:`Words to insert`,placeholder:`apple,app,apply`},{name:`search`,type:`string`,default:`app`,label:`Word to search`,placeholder:`app`}],generateSteps:e=>{let t=e.words.split(`,`).map(e=>e.trim()).filter(e=>e.length>0),n=e.search,r=[],i=[];r.push({lineNumber:7,description:`Initialize empty Trie`,elements:[{type:`array`,id:`trie`,values:[]}],variables:{root:`{}`}});for(let e of t){if(r.length>=15)break;let t=``;for(let n=0;n<e.length&&r.length<15;n++)t+=e[n],i.includes(t)||i.push(t);r.push({lineNumber:15,description:`Insert "${e}" - path: ${e.split(``).join(` → `)}`,elements:[{type:`array`,id:`paths`,values:i.map(e=>e.length)}],variables:{word:e,pathsCount:i.length}})}r.push({lineNumber:18,description:`Search for "${n}"`,elements:[{type:`array`,id:`paths`,values:i.map(e=>e.length)}],variables:{searching:n}});let a=t.includes(n),o=t.some(e=>e.startsWith(n));return r.push({lineNumber:20,description:`"${n}" ${a?`found as complete word`:o?`is a prefix but not a word`:`not found`}`,elements:[{type:`array`,id:`result`,values:[a?1:0],highlights:[{index:0,style:a?`found`:`comparing`}]}],variables:{found:a,isPrefix:o},isComplete:!0}),r}},{id:`word-search-ii`,name:`Word Search II`,category:`trie`,difficulty:`Hard`,leetcodeId:212,description:`Find all words from dictionary that exist in the board.`,timeComplexity:`O(m × n × 4^L)`,spaceComplexity:`O(W × L)`,visualizationType:`matrix`,code:`def findWords(board: list[list[str]], words: list[str]) -> list[str]:
    # Build Trie from words
    trie = {}
    for word in words:
        node = trie
        for char in word:
            node = node.setdefault(char, {})
        node['$'] = word

    # DFS from each cell
    result = set()
    m, n = len(board), len(board[0])

    def dfs(i, j, node):
        char = board[i][j]
        if char not in node:
            return
        next_node = node[char]
        if '$' in next_node:
            result.add(next_node['$'])

        board[i][j] = '#'
        for di, dj in [(0,1),(0,-1),(1,0),(-1,0)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < m and 0 <= nj < n and board[ni][nj] != '#':
                dfs(ni, nj, next_node)
        board[i][j] = char

    for i in range(m):
        for j in range(n):
            dfs(i, j, trie)

    return list(result)`,inputs:[{name:`board`,type:`string`,default:`oaan|etae|ihkr|iflv`,label:`Board (rows separated by |)`,placeholder:`oaan|etae|ihkr|iflv`},{name:`words`,type:`string`,default:`oath,eat,hike`,label:`Words to find`,placeholder:`oath,eat,hike`}],generateSteps:e=>{let t=e.board.split(`|`).map(e=>e.split(``)),n=e.words.split(`,`).map(e=>e.trim()),r=[],i=t.length,a=t[0]?.length||0,o=t.flat();r.push({lineNumber:3,description:`Build Trie from words: [${n.join(`, `)}]`,elements:[{type:`array`,id:`board`,values:o}],variables:{words:n,boardSize:`${i}×${a}`}});let s=e=>{let n=new Set,r=(o,s,c,l)=>{if(c===e.length)return l;if(o<0||o>=i||s<0||s>=a)return null;let u=`${o},${s}`;if(n.has(u)||t[o][s]!==e[c])return null;n.add(u),l.push(o*a+s);for(let[e,t]of[[0,1],[0,-1],[1,0],[-1,0]]){let n=r(o+e,s+t,c+1,l);if(n)return n}return n.delete(u),l.pop(),null};for(let e=0;e<i;e++)for(let t=0;t<a;t++){let n=r(e,t,0,[]);if(n)return n}return null},c=[];for(let e of n){if(r.length>=12)break;let t=s(e);if(t){let n=t.map(e=>({index:e,style:`found`}));c.push(e),r.push({lineNumber:18,description:`Found "${e}" via DFS path`,elements:[{type:`array`,id:`board`,values:o,highlights:n}],variables:{word:e,pathLength:t.length}})}else r.push({lineNumber:20,description:`"${e}" not found - no valid path`,elements:[{type:`array`,id:`board`,values:o}],variables:{word:e,found:!1}})}return r.push({lineNumber:30,description:`Complete! Found ${c.length} words: [${c.join(`, `)||`none`}]`,elements:[{type:`array`,id:`result`,values:c.length>0?c.map((e,t)=>t+1):[0],highlights:c.map((e,t)=>({index:t,style:`found`}))}],variables:{result:c},isComplete:!0}),r}}]},{id:`prefixSum`,name:`Prefix Sum`,color:`var(--accent-prefix-sum)`,algorithms:[{id:`range-sum-query`,name:`Range Sum Query`,category:`prefixSum`,difficulty:`Easy`,leetcodeId:303,description:`Calculate sum of elements between indices using prefix sum.`,timeComplexity:`O(1) query`,spaceComplexity:`O(n)`,visualizationType:`array`,code:`class NumArray:
    def __init__(self, nums: list[int]):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]`,inputs:[{name:`nums`,type:`string`,default:`-2,0,3,-5,2,-1`,label:`Array`,placeholder:`-2,0,3,-5,2,-1`},{name:`left`,type:`number`,default:0,label:`Left index`,placeholder:`0`},{name:`right`,type:`number`,default:2,label:`Right index`,placeholder:`2`}],generateSteps:e=>{let t=e.nums.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=e.left,r=e.right,i=[],a=[0];for(let e of t)a.push(a[a.length-1]+e);i.push({lineNumber:3,description:`Build prefix sum array`,elements:[{type:`array`,id:`nums`,values:t},{type:`array`,id:`prefix`,values:a,highlights:a.map((e,t)=>({index:t,style:`found`}))}],variables:{prefix:a}});for(let e=0;e<t.length&&i.length<10;e++)i.push({lineNumber:5,description:`prefix[${e+1}] = prefix[${e}] + nums[${e}] = ${a[e]} + ${t[e]} = ${a[e+1]}`,elements:[{type:`array`,id:`nums`,values:t,pointers:[{index:e,label:`i`,color:`#3B82F6`}]},{type:`array`,id:`prefix`,values:a.slice(0,e+2)}],variables:{i:e,sum:a[e+1]}});let o=a[r+1]-a[n];return i.push({lineNumber:8,description:`Query sum[${n}:${r}] = prefix[${r+1}] - prefix[${n}] = ${a[r+1]} - ${a[n]} = ${o}`,elements:[{type:`array`,id:`nums`,values:t,highlights:t.map((e,t)=>t>=n&&t<=r?{index:t,style:`found`}:null).filter(e=>e!==null)},{type:`array`,id:`prefix`,values:a,pointers:[{index:n,label:`L`,color:`#3B82F6`},{index:r+1,label:`R+1`,color:`#EF4444`}]}],variables:{left:n,right:r,result:o},isComplete:!0}),i}},{id:`subarray-sum-equals-k`,name:`Subarray Sum Equals K`,category:`prefixSum`,difficulty:`Medium`,leetcodeId:560,description:`Count subarrays with sum equal to k using prefix sum + hashmap.`,timeComplexity:`O(n)`,spaceComplexity:`O(n)`,visualizationType:`array`,code:`def subarraySum(nums: list[int], k: int) -> int:
    count = 0
    prefix_sum = 0
    seen = {0: 1}

    for num in nums:
        prefix_sum += num
        if prefix_sum - k in seen:
            count += seen[prefix_sum - k]
        seen[prefix_sum] = seen.get(prefix_sum, 0) + 1

    return count`,inputs:[{name:`nums`,type:`string`,default:`1,1,1`,label:`Array`,placeholder:`1,1,1`},{name:`k`,type:`number`,default:2,label:`Target Sum K`,placeholder:`2`}],generateSteps:e=>{let t=e.nums.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e)),n=e.k,r=[],i=0,a=0,o=new Map([[0,1]]);r.push({lineNumber:4,description:`Initialize: count=0, prefix=0, seen={0:1}, k=${n}`,elements:[{type:`array`,id:`nums`,values:t}],variables:{k:n,count:i,prefixSum:a,seen:Object.fromEntries(o)}});for(let e=0;e<t.length&&r.length<20;e++){a+=t[e];let s=a-n;o.has(s)?(i+=o.get(s),r.push({lineNumber:9,description:`prefix=${a}, need ${s} (found ${o.get(s)}x), count+=${o.get(s)}`,elements:[{type:`array`,id:`nums`,values:t,pointers:[{index:e,label:`i`,color:`#3B82F6`}],styles:t.map((t,n)=>n<=e?`found`:`default`)}],variables:{prefixSum:a,target:s,found:o.get(s),count:i}})):r.push({lineNumber:8,description:`prefix=${a}, need ${s} (not in seen)`,elements:[{type:`array`,id:`nums`,values:t,pointers:[{index:e,label:`i`,color:`#3B82F6`}]}],variables:{prefixSum:a,target:s,found:0}}),o.set(a,(o.get(a)||0)+1)}return r.push({lineNumber:12,description:`Complete! Found ${i} subarrays with sum ${n}`,elements:[{type:`array`,id:`nums`,values:t,styles:t.map(()=>`found`)}],variables:{result:i},isComplete:!0}),r}}]},{id:`matrices`,name:`Matrices`,color:`var(--accent-matrix)`,algorithms:[{id:`rotate-image`,name:`Rotate Image`,category:`matrices`,difficulty:`Medium`,leetcodeId:48,description:`Rotate n×n matrix 90 degrees clockwise in-place.`,timeComplexity:`O(n²)`,spaceComplexity:`O(1)`,visualizationType:`matrix`,code:`def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)

    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Reverse each row
    for row in matrix:
        row.reverse()`,inputs:[{name:`matrix`,type:`string`,default:`1,2,3|4,5,6|7,8,9`,label:`Matrix (rows separated by |)`,placeholder:`1,2,3|4,5,6|7,8,9`}],generateSteps:e=>{let t=e.matrix.split(`|`).map(e=>e.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e))),n=[],r=t.length;n.push({lineNumber:2,description:`Original ${r}×${r} matrix`,elements:[{type:`array`,id:`matrix`,values:t.flat()}],variables:{n:r,phase:`original`}});for(let e=0;e<r&&n.length<15;e++)for(let i=e+1;i<r&&n.length<15;i++)[t[e][i],t[i][e]]=[t[i][e],t[e][i]],n.push({lineNumber:7,description:`Transpose: swap (${e},${i}) ↔ (${i},${e})`,elements:[{type:`array`,id:`matrix`,values:t.flat()}],variables:{i:e,j:i,swapped:`(${e},${i}) ↔ (${i},${e})`}});n.push({lineNumber:7,description:`After transpose`,elements:[{type:`array`,id:`matrix`,values:t.flat(),styles:t.flat().map(()=>`found`)}],variables:{phase:`transposed`}});for(let e=0;e<r&&n.length<20;e++)t[e].reverse();return n.push({lineNumber:11,description:`After reversing each row (90° rotation complete)`,elements:[{type:`array`,id:`matrix`,values:t.flat(),styles:t.flat().map(()=>`found`)}],variables:{phase:`rotated`},isComplete:!0}),n}},{id:`spiral-matrix`,name:`Spiral Matrix`,category:`matrices`,difficulty:`Medium`,leetcodeId:54,description:`Return all elements in spiral order.`,timeComplexity:`O(m × n)`,spaceComplexity:`O(1)`,visualizationType:`matrix`,code:`def spiralOrder(matrix: list[list[int]]) -> list[int]:
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1

        # Down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1

        if top <= bottom:
            # Left
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1

        if left <= right:
            # Up
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result`,inputs:[{name:`matrix`,type:`string`,default:`1,2,3|4,5,6|7,8,9`,label:`Matrix`,placeholder:`1,2,3|4,5,6|7,8,9`}],generateSteps:e=>{let t=e.matrix.split(`|`).map(e=>e.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e))),n=[],r=t.length,i=t[0]?.length||0,a=[],o=0,s=r-1,c=0,l=i-1;for(n.push({lineNumber:3,description:`Initialize boundaries: top=${o}, bottom=${s}, left=${c}, right=${l}`,elements:[{type:`array`,id:`matrix`,values:t.flat()}],variables:{top:o,bottom:s,left:c,right:l}});o<=s&&c<=l&&n.length<20;){for(let e=c;e<=l;e++)a.push(t[o][e]);n.push({lineNumber:9,description:`Go right: row ${o}, cols ${c}-${l}`,elements:[{type:`array`,id:`result`,values:[...a],styles:a.map(()=>`found`)}],variables:{direction:`right`,added:a.slice(-1*(l-c+1))}}),o++;for(let e=o;e<=s;e++)a.push(t[e][l]);if(o<=s+1&&n.push({lineNumber:14,description:`Go down: col ${l}, rows ${o}-${s}`,elements:[{type:`array`,id:`result`,values:[...a],styles:a.map(()=>`found`)}],variables:{direction:`down`}}),l--,o<=s){for(let e=l;e>=c;e--)a.push(t[s][e]);n.push({lineNumber:20,description:`Go left: row ${s}, cols ${l}-${c}`,elements:[{type:`array`,id:`result`,values:[...a],styles:a.map(()=>`found`)}],variables:{direction:`left`}}),s--}if(c<=l){for(let e=s;e>=o;e--)a.push(t[e][c]);n.push({lineNumber:26,description:`Go up: col ${c}, rows ${s}-${o}`,elements:[{type:`array`,id:`result`,values:[...a],styles:a.map(()=>`found`)}],variables:{direction:`up`}}),c++}}return n.push({lineNumber:29,description:`Complete! Spiral order: [${a.join(`,`)}]`,elements:[{type:`array`,id:`result`,values:a,styles:a.map(()=>`found`)}],variables:{result:a},isComplete:!0}),n}},{id:`set-matrix-zeroes`,name:`Set Matrix Zeroes`,category:`matrices`,difficulty:`Medium`,leetcodeId:73,description:`Set entire row/column to 0 if element is 0.`,timeComplexity:`O(m × n)`,spaceComplexity:`O(1)`,visualizationType:`matrix`,code:`def setZeroes(matrix: list[list[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))

    # Mark zeros in first row/col
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    # Set zeros based on marks
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    # Handle first row/col
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0`,inputs:[{name:`matrix`,type:`string`,default:`1,1,1|1,0,1|1,1,1`,label:`Matrix`,placeholder:`1,1,1|1,0,1|1,1,1`}],generateSteps:e=>{let t=e.matrix.split(`|`).map(e=>e.split(`,`).map(e=>parseInt(e.trim())).filter(e=>!isNaN(e))),n=[],r=t.length,i=t[0]?.length||0;n.push({lineNumber:2,description:`Original matrix`,elements:[{type:`array`,id:`matrix`,values:t.flat()}],variables:{m:r,n:i}});let a=[];for(let e=0;e<r;e++)for(let n=0;n<i;n++)t[e][n]===0&&a.push([e,n]);a.length>0&&n.push({lineNumber:9,description:`Found zeros at: ${a.map(([e,t])=>`(${e},${t})`).join(`, `)}`,elements:[{type:`array`,id:`matrix`,values:t.flat(),styles:t.flat().map(e=>e===0?`comparing`:`default`)}],variables:{zeroCount:a.length}});let o=new Set(a.map(([e])=>e)),s=new Set(a.map(([,e])=>e));for(let e=0;e<r;e++)for(let n=0;n<i;n++)(o.has(e)||s.has(n))&&(t[e][n]=0);return n.push({lineNumber:16,description:`Set rows {${[...o].join(`,`)}} and cols {${[...s].join(`,`)}} to zero`,elements:[{type:`array`,id:`matrix`,values:t.flat(),styles:t.flat().map(e=>e===0?`found`:`default`)}],variables:{rowsZeroed:[...o],colsZeroed:[...s]}}),n.push({lineNumber:24,description:`Complete! Matrix zeros set.`,elements:[{type:`array`,id:`matrix`,values:t.flat(),styles:t.flat().map(e=>e===0?`found`:`default`)}],variables:{result:t},isComplete:!0}),n}}]}];function t(...t){return t.reduce((t,n)=>t+(e.find(e=>e.id===n)?.algorithms?.length||0),0)}export{t as n,e as t};