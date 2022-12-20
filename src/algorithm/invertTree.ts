/**
 * 226. 翻转二叉树
 * 简单
 * 1.5K
 * 相关企业
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：root = [4,2,7,1,3,6,9]
 * 输出：[4,7,2,9,6,3,1]
 * 示例 2：
 *
 *
 *
 * 输入：root = [2,1,3]
 * 输出：[2,3,1]
 * 示例 3：
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 * 提示：
 *
 * 树中节点数目范围在 [0, 100] 内
 * -100 <= Node.val <= 100
 */
import type { TreeNode } from "@/leet-code/treeNode";

export function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) {
    return null;
  }

  const queue: (TreeNode | null)[] = [root];
  while (queue.length) {
    const node = queue.shift();
    if (!node) {
      continue;
    }
    const temp = node.right;
    node.right = node.left;
    node.left = temp;
    queue.push(node.right);
    queue.push(node.left);
  }
  return root;
}
