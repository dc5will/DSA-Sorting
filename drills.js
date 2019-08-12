'use strict'

/* 
Bubble sort (terrible sorting algorithm) =  Keep looping through an array to find out whether adjacent values need swapping, and keep going until there are no more values that need swapping

Merge sort = Divide and conquer approach to sorting. Breaks the array down into continually smaller chunks, then merges them back together in the correct order

Quicksort = Also uses divide and conquer approach. Partitions the array into 2 halves around a pivot value. All of the values which are less than the pivot go to 1 half and values that are greater than pivot go to the other half of array. Then recursively sort the 2 halves of the array until the halves of length 0 or 1.
*/

// ================ implement quicksort ======================
// Write a function qSort that sorts a dataset using the quicksort algorithm. The dataset to sort is: 89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5.

const data = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
const dataset = data.split(' ').map(num => Number(num));
// console.log(dataset);

// Lumoto's algorithm (common in-place algorithm);
// The pivot is the final value in the array. Loop through the array, swapping values as you go to put them on either side of the pivot point. Then at the end you put the pivot into the correct place in the array.
function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end - 1, j);
    return j;
}

// swap function simply just swaps the values at 2 indices in an array
function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

function qSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = qSort(array, start, middle);
    array = qSort(array, middle + 1, end);
    return array;
}

// console.log(qSort(dataset)); // returns dataset in ascending order


// ============= Implementing merge sort =================
function mergeHelper(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        } else {
            array[outputIndex++] = right[rightIndex++];
        }
    }
    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }
    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
}

function mSort(array) {
    if (array.length <= 1) {
        return array;
    }
    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mSort(left);
    right = mSort(right);
    return mergeHelper(left, right, array);
}

// console.log(mSort(dataset)); // returns sorted array in ascending order

