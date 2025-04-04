class TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;
  timestamp: number | null;

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.timestamp = null;
  }
}

export class Trie {
  root: TrieNode;
  size: number;

  constructor() {
    this.root = new TrieNode();
    this.size = 0;
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    if (!node.isEndOfWord) {
      this.size++;
    }
    node.isEndOfWord = true;
    node.timestamp = Date.now();
  }

  delete(word: string): void {
    const deleteHelper = (node: TrieNode, depth: number): boolean => {
      if (depth === word.length) {
        if (!node.isEndOfWord) {
          return false;
        }
        node.isEndOfWord = false;
        this.size--;
        return Object.keys(node.children).length === 0;
      }
      const char = word[depth];
      const child = node.children[char];
      if (!child) {
        return false;
      }
      const shouldDeleteChild = deleteHelper(child, depth + 1);
      if (shouldDeleteChild) {
        delete node.children[char];
        return Object.keys(node.children).length === 0;
      }
      return false;
    };
    deleteHelper(this.root, 0);
  }

  findWords(prefix: string): { word: string; timestamp: number }[] {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return this.collectWords(node, prefix);
  }

  private collectWords(
    node: TrieNode,
    prefix: string
  ): { word: string; timestamp: number }[] {
    const words: { word: string; timestamp: number }[] = [];
    if (node.isEndOfWord && node.timestamp) {
      words.push({ word: prefix, timestamp: node.timestamp });
    }
    for (const char in node.children) {
      words.push(...this.collectWords(node.children[char], prefix + char));
    }
    return words;
  }

  serialize(): string {
    function serializeNode(node: TrieNode): any {
      return {
        isEndOfWord: node.isEndOfWord,
        timestamp: node.timestamp,
        children: Object.fromEntries(
          Object.entries(node.children).map(([char, childNode]) => [
            char,
            serializeNode(childNode),
          ])
        ),
      };
    }
    return JSON.stringify(serializeNode(this.root));
  }

  static deserialize(json: string): Trie {
    const trie = new Trie();
    function deserializeNode(data: any): TrieNode {
      const node = new TrieNode();
      node.isEndOfWord = data.isEndOfWord;
      node.timestamp = data.timestamp;
      for (const [char, childData] of Object.entries(data.children)) {
        node.children[char] = deserializeNode(childData);
      }
      return node;
    }
    trie.root = deserializeNode(JSON.parse(json));
    return trie;
  }
}

// // 使用示例
// const trie = new Trie();
// const words = ['apple', 'banana', 'cherry'];
// words.forEach((word) => trie.insert(word));

// const input = 'a';
// const matched = trie.findWords(input);

// // 按时间排序
// matched.sort(
//   (
//     a: { word: string; timestamp: number },
//     b: { word: string; timestamp: number }
//   ) => b.timestamp - a.timestamp
// );

// // 提取排序后的单词
// const sortedWords = matched.map((item) => item.word);
// console.log(sortedWords);
