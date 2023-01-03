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
