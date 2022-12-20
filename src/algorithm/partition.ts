/**
 * 86. 分隔链表
 * 中等
 * 651
 * 相关企业
 * 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
 *
 * 你应当 保留 两个分区中每个节点的初始相对位置。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,4,3,2,5,2], x = 3
 * 输出：[1,2,2,4,3,5]
 * 示例 2：
 *
 * 输入：head = [2,1], x = 2
 * 输出：[1,2]
 *
 *
 * 提示：
 *
 * 链表中节点的数目在范围 [0, 200] 内
 * -100 <= Node.val <= 100
 * -200 <= x <= 200
 */
import { ListNode } from "@/leet-code/listNode";

export function partition(head: ListNode | null, x: number): ListNode | null {
  // 先创建 2 个虚拟链表头
  const dummy1 = new ListNode(-1);
  const dummy2 = new ListNode(-1);

  // 遍历原链表
  let p = head;
  let d1 = dummy1;
  let d2 = dummy2;
  while (p) {
    if (p.val < x) {
      d1.next = p;
      d1 = d1.next;
    } else {
      d2.next = p;
      d2 = d2.next;
    }
    p = p.next;
  }

  // 注意这里需要把 d2 的最后一个节点的 next 置空, 不然的话可能会形成环
  // 因为 d2 中的最后一个结点的 next 可能会指向 dummy1 中的节点
  // 在构造新链表的时候, 需要注意中间的链接和头尾节点的处理
  d2.next = null;

  // 这样我们就得到了两条链表, 接下来把他们接起来
  d1.next = dummy2.next;

  return dummy1.next;
}
