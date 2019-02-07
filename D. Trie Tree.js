/**
 * Definition
 * TrieNode() {
 *   this.isWord = false;
 *   this.childrenMap = new Map(); // key: char, value: list of TrieNodes
 * }
 * 
 * Basic Operations:
 * 1. insert(word)
 * 2. search(word)
 * 3. startsWith(prefix)
 * 
 * N: length of longest word
 * M: # words
 * K: # characters allowed
 * insert, search, startsWith: T: O(N), S: O(M*N*K)
 * 
 * If use hash table: T: O(logM) using height-balanced BST, S: O(M*N)
 * Worst case less likely to happen.
 * 
 * Template:
 * (1) insert, (2) search, (3) startsWith:
 *   let curr = this.root
 *   for i in word/prefix:
 *     let c = word/prefix[i]
 *     if (curr.childrenMap.get(c) === undefined): // insert a new node if the path does not exist
 * 
 *       curr.childrenMap.set(c, new TrieNode()) (1) insert
 *       
 *       return false (2) search, (3) startwWith
 *     curr = curr.childrenMap.get(c) 
 * 
 *   curr.isWord = true; (1) insert
 * 
 *   return curr.isWord (2) search
 * 
 *   return true (3) startsWith
 */
function TrieNode() {
  this.isWord = false;
  this.childrenMap = new Map(); // key: char, value: list of TrieNodes
}

function Trie() {
  this.root = new TrieNode();

  // Inserts a word into the trie.
  this.insert = (word) => {
    let cur = this.root;
    for (let i = 0; i < word.length; i += 1) {
      let c = word[i];
      if (cur.childrenMap.get(c) === undefined) {
        // Insert a new node if the path does not exist
        cur.childrenMap.set(c, new TrieNode());
      }
      cur = cur.childrenMap.get(c);
    }
    cur.isWord = true;
  }

  // Returns if the word is in the trie.
  this.search = (word) => {
    let cur = this.root;
    for (let i = 0; i < word.length; i += 1) {
      let c = word[i];
      if (cur.childrenMap.get(c) === undefined) {
        return false;
      }
      cur = cur.childrenMap.get(c);
    }
    return cur.isWord;
  }

  // Returns if there is any word in the trie that starts with the given prefix.
  this.startsWith = (prefix) => {
    let cur = this.root;
    for (let i = 0; i < prefix.length; i += 1) {
      let c = prefix[i];
      if (cur.childrenMap.get(c) === undefined) {
        return false;
      }
      cur = cur.childrenMap.get(c);
    }
    return true;
  }
}

/**
 * Leetcode 642. Design Search Autocomplete System
 * Usually add more fields in TrieNode: in this case: 
 * counts: Map<sentence:string, times:number> 
 */
/**
Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character '#'). For each character they type except '#', you need to return the top 3 historical hot sentences that have prefix the same as the part of sentence already typed. Here are the specific rules:

The hot degree for a sentence is defined as the number of times a user typed the exactly same sentence before.
The returned top 3 hot sentences should be sorted by hot degree (The first is the hottest one). If several sentences have the same degree of hot, you need to use ASCII-code order (smaller one appears first).
If less than 3 hot sentences exist, then just return as many as you can.
When the input is a special character, it means the sentence ends, and in this case, you need to return an empty list.
Your job is to implement the following functions:

The constructor function:

AutocompleteSystem(String[] sentences, int[] times): This is the constructor. The input is historical data. Sentences is a string array consists of previously typed sentences. Times is the corresponding times a sentence has been typed. Your system should record these historical data.

Now, the user wants to input a new sentence. The following function will provide the next character the user types:

List<String> input(char c): The input c is the next character typed by the user. The character will only be lower-case letters ('a' to 'z'), blank space (' ') or a special character ('#'). Also, the previously typed sentence should be recorded in your system. The output will be the top 3 historical hot sentences that have prefix the same as the part of sentence already typed.


Example:
Operation: AutocompleteSystem(["i love you", "island","ironman", "i love leetcode"], [5,3,2,2]) 
The system have already tracked down the following sentences and their corresponding times: 
"i love you" : 5 times 
"island" : 3 times 
"ironman" : 2 times 
"i love leetcode" : 2 times 
Now, the user begins another search: 

Operation: input('i') 
Output: ["i love you", "island","i love leetcode"] 
Explanation: 
There are four sentences that have prefix "i". Among them, "ironman" and "i love leetcode" have same hot degree. Since ' ' has ASCII code 32 and 'r' has ASCII code 114, "i love leetcode" should be in front of "ironman". Also we only need to output top 3 hot sentences, so "ironman" will be ignored. 

Operation: input(' ') 
Output: ["i love you","i love leetcode"] 
Explanation: 
There are only two sentences that have prefix "i ". 

Operation: input('a') 
Output: [] 
Explanation: 
There are no sentences that have prefix "i a". 

Operation: input('#') 
Output: [] 
Explanation: 
The user finished the input, the sentence "i a" should be saved as a historical sentence in system. And the following input will be counted as a new search. 

Note:
The input sentence will always start with a letter and end with '#', and only one blank space will exist between two words.
The number of complete sentences that to be searched won't exceed 100. The length of each sentence including those in the historical data won't exceed 100.
Please use double-quote instead of single-quote when you write test cases even for a character input.
Please remember to RESET your class variables declared in class AutocompleteSystem, as static/class variables are persisted across multiple test cases. Please see here for more details.
 */
function TrieNode() {
  this.isWord = false;
  this.childrenMap = new Map();
  this.counts = new Map();
}

function AutocompleteSystem(sentences, times) {
  // constructor below
  let root = new TrieNode();
  let prefix = "";

  this.insert = (root, word, count) => {
    let curr = root;
    for (let i = 0; i < word.length; i += 1) {
      let c = word[i];
      if (curr.childrenMap.get(c) === undefined) {
        curr.childrenMap.set(c, new TrieNode());
      }
      curr = curr.childrenMap.get(c);

      let currCount = curr.counts.get(word) || 0;
      curr.counts.set(word, currCount + count);
    }
    curr.isWord = true;
  };
  
  for (let i = 0; i < sentences.length; i += 1) {
    this.insert(root, sentences[i], times[i]);
  }
  // constructor above
  
  this.input = (c) => {
    // handle reset case
    if (c === "#") {
      this.insert(root, prefix, 1);
      prefix = "";
      return [];
    }

    prefix += c;
    let curr = root;
    for (let i = 0; i < prefix.length; i += 1) {
      let p = prefix[i];
      if (curr.childrenMap.get(p) === undefined) return [];
      curr = curr.childrenMap.get(p);
    }

    // Use MaxHeap to store [sentence, count] pair
    // compare by ASCII if a.count === b.count else, compare by count
    let maxHeap = new Heap((a, b) => a[1] === b[1] ? a[0].localeCompare(b[0]) : b[1] - a[1]); 
    for (let [sentence, count] of curr.counts) {
      maxHeap.push([sentence, count]);
    }

    let result = [];
    let k = 3;
    for (let i = 0; i < k && maxHeap.size() !== 0; i += 1) {
      result.push(maxHeap.pop()[0]); // append top 3 sentences
    }

    return result;
  };
}