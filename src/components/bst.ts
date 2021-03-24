export interface BST {
  insert(value: number): void;
  inOrder(): Array<number>;
  remove(value: number): void;
}

export type Node = {
  value: number;
  left?: Node;
  right?: Node;
};

type ReversePath = {
  path: { last: Node | undefined; prev: Node | undefined };
  found: boolean;
  isLeftPath: boolean;
  isRightPath: boolean;
};

export class NumberSorter implements BST {
  private root?: Node;

  insert(value: number): void {
    if (!this.root) {
      this.root = { value };
      return;
    }
    this.insertTo(this.root, value);
  }

  inOrder(): number[] {
    if (this.root) {
      return this.pushInOrder(this.root, []);
    }
    return [];
  }

  private posibleNodeSetLeft(node: Node | undefined, value: Node | undefined) {
    if (node) {
      node.left = value;
    }
  }

  private posibleNodeSetRight(node: Node | undefined, value: Node | undefined) {
    if (node) {
      node.right = value;
    }
  }

  remove(value: number): void {
    const reversePath = this.find(value);
    if (reversePath.found) {
      if (!reversePath.path.last?.left && !reversePath.path.last?.right) {
        if (reversePath.isRightPath) {
          this.posibleNodeSetRight(reversePath.path.prev, undefined);
          return;
        }
        this.posibleNodeSetLeft(reversePath.path.prev, undefined);
        return;
      }
      if (!reversePath.path.last.left) {
        if (reversePath.isRightPath) {
          this.posibleNodeSetRight(
            reversePath.path.prev,
            reversePath.path.last.right
          );
          return;
        }
        this.posibleNodeSetLeft(
          reversePath.path.prev,
          reversePath.path.last.right
        );
        return;
      }
      if (!reversePath.path.last.right) {
        if (reversePath.isRightPath) {
          this.posibleNodeSetRight(
            reversePath.path.prev,
            reversePath.path.last.left
          );
          return;
        }
        this.posibleNodeSetLeft(
          reversePath.path.prev,
          reversePath.path.last.left
        );
        return;
      }
      // 1. encontrar la hoja con value menor en right y cortarla
      // 2. poner en el value del que se va a borrar el value de la hoja encontrada en 1.
      reversePath.path.last.value = this.cutLeafWithMinValue(
        reversePath.path.last.right,
        reversePath.path.last
      );
      console.log({ reversePath });
    }
  }
  private cutLeafWithMinValue(aNode: Node, parentNode: Node): number {
    if (aNode.left) {
      return this.cutLeafWithMinValue(aNode.left, aNode);
    }
    if (aNode.right) {
      return this.cutLeafWithMinValue(aNode.right, aNode);
    }
    if (parentNode.left === aNode) {
      parentNode.left = undefined;
      return aNode.value;
    }
    parentNode.right = undefined;
    return aNode.value;
  }

  private find(value: number): ReversePath {
    const reversePath = {
      path: { last: undefined, prev: undefined },
      found: false,
      isLeftPath: false,
      isRightPath: false,
    };
    if (this.root) {
      return this.findIn(this.root, value, reversePath);
    }
    return reversePath;
  }

  private findIn(
    aNode: Node,
    value: number,
    reversePath: ReversePath
  ): ReversePath {
    reversePath.path.prev = reversePath.path.last;
    reversePath.path.last = aNode;
    if (aNode.value === value) {
      return { ...reversePath, found: true };
    } else if (value < aNode.value && aNode.left) {
      return this.findIn(aNode.left, value, {
        ...reversePath,
        isLeftPath: true,
        isRightPath: false,
      });
    } else if (value > aNode.value && aNode.right) {
      return this.findIn(aNode.right, value, {
        ...reversePath,
        isLeftPath: false,
        isRightPath: true,
      });
    }
    return reversePath;
  }

  private insertTo(aNode: Node, value: number) {
    if (value < aNode.value) {
      if (!aNode.left) {
        aNode.left = { value };
        return;
      }
      this.insertTo(aNode.left, value);
      return;
    }

    if (!aNode.right) {
      aNode.right = { value };
      return;
    }
    this.insertTo(aNode.right, value);
  }

  private pushInOrder(aNode: Node, sortedArr: Array<number>): Array<number> {
    if (aNode.left) {
      this.pushInOrder(aNode.left, sortedArr);
    }
    sortedArr.push(aNode.value);
    if (aNode.right) {
      this.pushInOrder(aNode.right, sortedArr);
    }
    return sortedArr;
  }

  getRootNode(): Node | undefined {
    return this.root;
  }
}
