import { ListNode } from '@/algorithm/listNode'

export function isPalindrome(head: ListNode | null): boolean {
  const stack = []
  let p = head
  while (p) {
    stack.push(p)
    p = p.next
  }
  let q = head
  while (q) {
    if (q.val !== (stack.pop() as ListNode).val) {
      return false
    }
    q = q.next
  }
  return true
}

// 反转链表
function reverse(head: ListNode | null): ListNode | null {
  let p: ListNode | null = null
  let h = head
  while (h) {
    const q = h.next
    h.next = p
    p = h
    h = q
  }
  return p
}

function findCenter(head: ListNode | null): ListNode | null {
  let fast: ListNode | null = head
  let slow: ListNode | null = head
  while (slow && fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}

// 进阶: 空间复杂度 O(1)
export function isPalindrome2(head: ListNode | null): boolean {
  if (!head) {
    return true
  }
  // 先找到链表中点: 奇数节点为正中点; 偶数节点为下中点
  const center = findCenter(head) as ListNode
  // 反转后半部分链表, tail 指向尾部节点
  const tail = reverse(center) as ListNode
  let t: ListNode | null = tail
  // 首尾双指针比对
  let result = true
  let h: ListNode | null = head
  while (h && t) {
    if (h.val !== t.val) {
      // 不是回文
      result = false
      break
    }
    h = h.next
    t = t.next
  }

  // 复原后半部分链表
  reverse(tail)

  // 返回结果
  return result
}
