const list = [
    { pid: null, id: 1, data: "1" },
    { pid: 1, id: 2, data: "2-1" },
    { pid: 1, id: 3, data: "2-2" },
    { pid: 2, id: 4, data: "3-1" },
    { pid: 3, id: 5, data: "3-2" },
    { pid: 4, id: 6, data: "4-1" },
];

function listToTree(
    list,
    pid = null,
    { idName = "id", pidName = "pid", childName = "children" } = {}
) {
    return list.reduce((root, item) => {
        // 遍历每一项，如果该项与当前 pid 匹配，则递归构建该项的子树
        if (item.pid === pid) {
            const children = listToTree(list, item.id);
            if (children.length) {
                item.children = children;
            }
            return [...root, item];
        }
        return root;
    }, []);
}

function listToTree(
    list,
    rootId = null,
) {
    const record = {}; // 用空间换时间，用于将所有项的 id 及自身记录到字典中
    const root = [];

    list.forEach((item) => {
        record[item.id] = item; // 记录 id 与项的映射
        item.children = [];
    });

    console.log(record);
    list.forEach((item) => {
        if (item.pid === rootId) {
            root.push(item);
        } else {
            // 由于持有的是引用，record 中相关元素的修改，会在反映在 root 中。
            record[item.pid].children.push(item);
        }
    });

    return root;
}

// console.log(listToTree(list));

// var a = [1, 2, 4], b = [1, 3, 8, 4, 5, 2]
// const newArr = a.concat(b).filter((item, _, arr) => {
//     return arr.indexOf(item) === arr.lastIndexOf(item)
// })

// console.log(newArr);

