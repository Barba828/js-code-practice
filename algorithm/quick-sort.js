const quickSort = arr => {
    if (arr.length < 2) return arr;
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    const [lo, hi] = arr.reduce(
        (acc, val, i) => {
            if (val < pivot || (val === pivot && i != pivotIndex)) {
                acc[0].push(val);
            } else if (val > pivot) {
                acc[1].push(val);
            }
            return acc;
        },
        [[], []]
    );
    return [...quickSort(lo), pivot, ...quickSort(hi)];
};

// console.log(quickSort([1, 6, 1, 5, 3, 2, 1, 4]));

const mergeSort = arr => {
    if (arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2);
    const l = mergeSort(arr.slice(0, mid));
    const r = mergeSort(arr.slice(mid, arr.length));
    return Array.from({ length: l.length + r.length }, () => {
        if (!l.length) return r.shift();
        else if (!r.length) return l.shift();
        else return l[0] > r[0] ? r.shift() : l.shift();
    });
};

// console.log(mergeSort([1, 6, 1, 5, 3, 2, 1, 4]));

const heapsort = arr => {
    const a = [...arr];
    let l = a.length;

    const heapify = (a, i) => {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let max = i;
        if (left < l && a[left] > a[max]) max = left;
        if (right < l && a[right] > a[max]) max = right;
        if (max !== i) {
            [a[max], a[i]] = [a[i], a[max]];
            heapify(a, max);
        }
    };

    for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
    for (i = a.length - 1; i > 0; i--) {
        [a[0], a[i]] = [a[i], a[0]];
        l--;
        heapify(a, 0);
    }
    return a;
};

const bucketSort = (arr, size = 5) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const buckets = Array.from(
        { length: Math.floor((max - min) / size) + 1 },
        () => []
    );
    arr.forEach(val => {
        buckets[Math.floor((val - min) / size)].push(val);
    });
    return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

console.log(heapsort([1, 6, 1, 5, 3, 2, 1, 4]));
