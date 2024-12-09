import Tree from './tree.js';
import { prettyPrint } from './utils.js';

// Create an array of random numbers
const randomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));

// Create and print the binary tree
const tree = new Tree(randomArray);
console.log("Initial Tree:");
prettyPrint(tree.root);
console.log("Is Balanced?", tree.isBalanced());

// Traversals
console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("In Order:");
tree.inOrder(tree.root, (node) => console.log(node.data));

console.log("Pre Order:");
tree.preOrder(tree.root, (node) => console.log(node.data));

console.log("Post Order:");
tree.postOrder(tree.root, (node) => console.log(node.data));

// Add unbalancing nodes
tree.insert(150);
tree.insert(200);
console.log("After Insertion:");
prettyPrint(tree.root);
console.log("Is Balanced?", tree.isBalanced());

// Rebalance
tree.rebalance();
console.log("After Rebalancing:");
prettyPrint(tree.root);
console.log("Is Balanced?", tree.isBalanced());
