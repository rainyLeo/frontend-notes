/* eslint-disable */

// one(plus(two())) => 3
function zero(f) {
	return typeof f === 'function' ? f(0) : 0;
}
function one(f) {
	return typeof f === 'function' ? f(1) : 1;
}
function two(f) {
	return typeof f === 'function' ? f(2) : 2;
}
function three(f) {
	return typeof f === 'function' ? f(3) : 3;
}
function four(f) {
	return typeof f === 'function' ? f(4) : 4;
}
function five(f) {
	return typeof f === 'function' ? f(5) : 5;
}
function six(f) {
	return typeof f === 'function' ? f(6) : 6;
}
function seven(f) {
	return typeof f === 'function' ? f(7) : 7;
}
function eight(f) {
	return typeof f === 'function' ? f(8) : 8;
}
function nine(f) {
	return typeof f === 'function' ? f(9) : 9;
}

const plus = x => y => x + y;
const minus = x => y => y -x;
const times = x => x * y;
const dividedBy = x => y / x;

// 'pig latin' => 'gipay nlatinay', move first char to end, add 'ay' to end
function pigIt(str) {
	return str.split(' ').map((e, i, a) => e.slice(1) + e[0] + 'ay').join(' ');
	// solution 2. return str.replace(/(\w)(\w*)(\s|$)/g, "\$2\$1ay\$3")
}


// maximum subarray sum, [-2, 1, -3, 4, -1, 2, 1, -5, 4] => 6: [4, -1, 2, 1]
function maxSequence(arr) {
	var min = 0, ans = 0, i, sum = 0;
  for (i = 0; i < arr.length; ++i) {
    sum += arr[i];
    min = Math.min(sum, min);
    ans = Math.max(ans, sum - min);
  }
  return ans;
}




















