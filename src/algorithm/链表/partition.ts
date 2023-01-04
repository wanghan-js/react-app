// 给定一个数, 将链表按照小于, 等于, 大于这个数的顺序对链表进行分区, 类似于快排的操作
import { ListNode } from '@/algorithm/listNode'

export function listPartition(head: ListNode | null, pivot: number): ListNode | null {
  if (!head || !head.next) {
    return head
  }
  // 设置 6 个指针分别记录小于区, 等于区, 大于区的头尾节点
  let lessStart: ListNode | null = null
  let lessEnd: ListNode | null = null
  let equalStart: ListNode | null = null
  let equalEnd: ListNode | null = null
  let greatStart: ListNode | null = null
  let greatEnd: ListNode | null = null

  // 遍历链表
  let node: ListNode | null = head
  while (node) {
    if (node.val > pivot) {
      if (greatEnd) {
        greatEnd.next = node
        greatEnd = node
      } else {
        greatStart = node
        greatEnd = node
      }
    } else if (node.val < pivot) {
      if (lessEnd) {
        lessEnd.next = node
        lessEnd = node
      } else {
        lessStart = node
        lessEnd = node
      }
    } else {
      if (equalEnd) {
        equalEnd.next = node
        equalEnd = node
      } else {
        equalStart = node
        equalEnd = node
      }
    }
    node = node.next
  }

  // 把 3 个分区串起来, 注意串起来的时候要充分考虑各个分区有可能为空的情况
  if (lessEnd) {
    lessEnd.next = equalStart
  }

  if (equalEnd) {
    equalEnd.next = greatStart
  } else if (lessEnd) {
    // 等于区为空, 这时要将小于区的尾直接连上大于区的头
    lessEnd.next = greatStart
  }

  return lessStart ? lessStart : equalStart ? equalStart : greatStart
}
