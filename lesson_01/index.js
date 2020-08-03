function reverseString (string) {
    return string.split('').reverse().join('');
}

process.stdin.on('data', function (data) {
  process.stdout.write(reverseString (data.toString()));
});
