// tree.js
import Node from './node.js';

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minValue = this.findMinValue(node.right);
      node.data = minValue;
      node.right = this.deleteItem(minValue, node.right);
    }
    return node;
  }

  findMinValue(node) {
    while (node.left) node = node.left;
    return node.data;
  }

  find(value, node = this.root) {
    if (!node || node.data === value) return node;

    return value < node.data
      ? this.find(value, node.left)
      : this.find(value, node.right);
  }

  levelOrder(callback) {
    if (!this.root) throw new Error("Callback required!");
    const queue = [this.root];

    while (queue.length) {
      const node = queue.shift();
      callback(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrder(node = this.root, callback) {
    if (!callback) throw new Error("Callback required!");
    if (node) {
      this.inOrder(node.left, callback);
      callback(node);
      this.inOrder(node.right, callback);
    }
  }

  preOrder(node = this.root, callback) {
    if (!callback) throw new Error("Callback required!");
    if (node) {
      callback(node);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }
  }

  postOrder(node = this.root, callback) {
    if (!callback) throw new Error("Callback required!");
    if (node) {
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node);
    }
  }

  height(node = this.root) {
    if (!node) return -1;

    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, current = this.root, level = 0) {
    if (!current) return -1;
    if (current === node) return level;

    return node.data < current.data
      ? this.depth(node, current.left, level + 1)
      : this.depth(node, current.right, level + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    const nodes = [];
    this.inOrder(this.root, (node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}

export default Tree;
