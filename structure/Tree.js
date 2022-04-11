/**
 * 数据结构 二叉树
 * @param {*} val
 * @param {*} left
 * @param {*} right
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * 数组转为满二叉树
 * @param {Array} array
 * @returns {TreeNode} 树根节点
 */
function Tree(array) {
  if (!(array instanceof Array) || array.length === 0) {
    return null;
  }
  array[0] = new TreeNode(array[0]); //初始化根节点
  /**
   * n层树最大size：Math(2,n)-1
   * 第n层层size：Math(2,n-1)
   */
  let layer = 2; //层数
  const size = (n) => Math.pow(2, n) - 1; //n层树最大size

  for (let i = 1; i < array.length; i++) {
    if (i >= size(layer)) layer++;
    array[i] = array[i] === null ? array[i] : new TreeNode(array[i]);
    const location = i - size(layer - 1); //在当前层的位置
    const fatherIndex = Math.floor(location / 2) + size(layer - 2); //父节点在上层的数组下标位置
    if (location % 2 === 0) {
      //左子节点
      array[fatherIndex].left = array[i];
    } else {
      //右子节点
      array[fatherIndex].right = array[i];
    }
  }
  return array[0];
}
/**
 * 实现toArray函数
 * BFS广度优先遍历，即层序遍历树
 * @returns {Array} 树
 */
TreeNode.prototype.toArray = function () {
  let ans = [];
  let queue = [this];
  while (queue.length !== 0) {
    const { val, left, right } = queue.shift();
    ans.push(val);
    if (left) {
      queue.push(left);
    }
    if (right) {
      queue.push(right);
    }
  }
  return ans;
};
/**
 * 重写节点toString函数
 * BFS广度优先遍历，即层序遍历树
 * @returns {string}
 */
TreeNode.prototype.toString = function () {
  let str = "\r\n";
  if (!this) return str;

  const queue = [this];
  while (queue.length !== 0) {
    //当前队列长度，即为该层节点数
    const layerSize = queue.length;
    //该层数组保存
    let layerStr = "";
    for (let i = 0; i < layerSize; i++) {
      //保存节点
      const { val, left, right } = queue.shift();
      layerStr = layerStr + val + " ";
      //加入下层队列，队列长度更改，所以之前用layerSize保存上层长度
      if (left) queue.push(left);
      if (right) queue.push(right);
    }
    str = str + layerStr + "\r\n";
  }

  return str;
};
/**
 * 获取树大小
 * 复用转数组方法去除null获取长度
 * @returns {number}树大小
 */
TreeNode.prototype.size = function () {
  return this.toArray().filter((item) => item).length;
};
/**
 * 获取树最深深度
 * @returns {number} 树深度
 */
TreeNode.prototype.depth = function () {
  let max = 0;
  const nextLayer = (node, depth) => {
    if (!node) return;
    max = depth > max ? depth : max;
    if (node.left) nextLayer(node.left, depth + 1);
    if (node.right) nextLayer(node.right, depth + 1);
  };
  nextLayer(this, 1);
  return max;
};
/**
 * 获取树中该值节点
 * @param {*} val 值
 * @returns {TreeNode} 该节点
 */
TreeNode.prototype.get = function (val) {
  const nextLayer = (node) => {
    if (!node) return null;
    if (node.val === val) return node;
    if (nextLayer(node.right)) return nextLayer(node.right);
    if (nextLayer(node.left)) return nextLayer(node.left);
  };
  return nextLayer(this);
};

export { Tree, TreeNode };
