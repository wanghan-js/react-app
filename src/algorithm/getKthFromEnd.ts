import type { ListNode } from "@/leet-code/listNode";

export function getKthFromEnd(
  head: ListNode | null,
  k: number
): ListNode | null {
  let p = head;
  let q = head;

  for (let i = 0; i < k; i++) {
    if (!p) {
      return null;
    }
    p = p.next;
  }

  while (p) {
    p = p.next;
    q = (q as ListNode).next;
  }

  return q;
}
