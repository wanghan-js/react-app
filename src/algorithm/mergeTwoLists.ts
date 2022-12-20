/**
 * 21. 合并两个有序链表
 * 简单
 * 2.8K
 * 相关企业
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：l1 = [1,2,4], l2 = [1,3,4]
 * 输出：[1,1,2,3,4,4]
 * 示例 2：
 *
 * 输入：l1 = [], l2 = []
 * 输出：[]
 * 示例 3：
 *
 * 输入：l1 = [], l2 = [0]
 * 输出：[0]
 *
 *
 * 提示：
 *
 * 两个链表的节点数目范围是 [0, 50]
 * -100 <= Node.val <= 100
 * l1 和 l2 均按 非递减顺序 排列
 */
import { ListNode } from "@/leet-code/listNode";

export function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (!list1) {
    return list2;
  }
  if (!list2) {
    return list1;
  }
  // 两个链表都不为空
  const list: ListNode | null = new ListNode(0);
  let l = list;
  let p: ListNode | null = list1;
  let q: ListNode | null = list2;
  while (p && q) {
    if (p.val > q.val) {
      l.next = q;
      q = q.next;
    } else {
      l.next = p;
      p = p.next;
    }
    l = l.next;
  }
  if (!p) {
    l.next = q;
  }
  if (!q) {
    l.next = p;
  }
  return list.next;
}
