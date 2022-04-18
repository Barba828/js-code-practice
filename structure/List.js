/**
 * 数据结构 链表
 * @param {*} val
 * @param {*} next
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * 重写节点toString函数
 * @returns
 */
ListNode.prototype.toString = function () {
  let str = "";
  function toStringNext(node) {
    if (node) {
      str += node.val;
      if (node.next) {
        str += " -> ";
        toStringNext(node.next);
      }
    }
  }
  toStringNext(this);
  return str;
};
/**
 * 数组转为单向链表
 * @param {*} array
 * @returns
 */
function ArrayToList(array) {
  if (array.length === 0) {
    return null;
  }
  const head = new ListNode(array[0]);
  let temp = head;
  for (let index = 1; index < array.length; index++) {
    temp.next = new ListNode(array[index]);
    temp = temp.next;
  }
  return head;
}

export { ArrayToList, ListNode };
