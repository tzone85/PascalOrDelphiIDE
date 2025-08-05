# Quick Test Examples for Pascal IDE

## Simple Working Examples to Test Your IDE

### 1. Basic Array Example
```pascal
program SimpleArray;
const
    MAX_SIZE = 5;
var
    numbers: array[1..MAX_SIZE] of integer;
    i, sum: integer;
begin
    writeln('Enter 5 numbers:');
    sum := 0;
    for i := 1 to MAX_SIZE do
    begin
        write('Number ', i, ': ');
        readln(numbers[i]);
        sum := sum + numbers[i];
    end;
    
    writeln('You entered:');
    for i := 1 to MAX_SIZE do
        write(numbers[i], ' ');
    writeln;
    writeln('Sum: ', sum);
    writeln('Average: ', (sum / MAX_SIZE):0:2);
end.
```

### 2. Simple Loop with Math
```pascal
program LoopMath;
var
    n, i, factorial: integer;
begin
    write('Enter a number (1-10): ');
    readln(n);
    
    if (n < 1) or (n > 10) then
    begin
        writeln('Please enter a number between 1 and 10');
        exit;
    end;
    
    factorial := 1;
    for i := 1 to n do
    begin
        factorial := factorial * i;
        writeln(i, '! = ', factorial);
    end;
    
    writeln('Final result: ', n, '! = ', factorial);
end.
```

### 3. String Processing
```pascal
program StringTest;
var
    text: string;
    i, vowels, consonants: integer;
    ch: char;
begin
    write('Enter a word: ');
    readln(text);
    
    vowels := 0;
    consonants := 0;
    
    for i := 1 to length(text) do
    begin
        ch := text[i];
        if (ch >= 'A') and (ch <= 'Z') then
            ch := chr(ord(ch) + 32); // Convert to lowercase
            
        if (ch = 'a') or (ch = 'e') or (ch = 'i') or (ch = 'o') or (ch = 'u') then
            inc(vowels)
        else if (ch >= 'a') and (ch <= 'z') then
            inc(consonants);
    end;
    
    writeln('Word: ', text);
    writeln('Length: ', length(text));
    writeln('Vowels: ', vowels);
    writeln('Consonants: ', consonants);
end.
```

### 4. Simple Calculator
```pascal
program Calculator;
var
    num1, num2, result: real;
    operation: char;
begin
    write('Enter first number: ');
    readln(num1);
    write('Enter operation (+, -, *, /): ');
    readln(operation);
    write('Enter second number: ');
    readln(num2);
    
    case operation of
        '+': result := num1 + num2;
        '-': result := num1 - num2;
        '*': result := num1 * num2;
        '/': begin
                if num2 <> 0 then
                    result := num1 / num2
                else
                begin
                    writeln('Error: Division by zero!');
                    exit;
                end;
             end;
    else
        writeln('Invalid operation!');
        exit;
    end;
    
    writeln(num1:0:2, ' ', operation, ' ', num2:0:2, ' = ', result:0:2);
end.
```

### 5. Grade Calculator
```pascal
program GradeCalc;
var
    grades: array[1..5] of integer;
    i, sum: integer;
    average: real;
    letterGrade: char;
begin
    writeln('Enter 5 test scores:');
    sum := 0;
    
    for i := 1 to 5 do
    begin
        repeat
            write('Test ', i, ' (0-100): ');
            readln(grades[i]);
        until (grades[i] >= 0) and (grades[i] <= 100);
        
        sum := sum + grades[i];
    end;
    
    average := sum / 5;
    
    if average >= 90 then
        letterGrade := 'A'
    else if average >= 80 then
        letterGrade := 'B'
    else if average >= 70 then
        letterGrade := 'C'
    else if average >= 60 then
        letterGrade := 'D'
    else
        letterGrade := 'F';
    
    writeln;
    writeln('=== GRADE REPORT ===');
    write('Scores: ');
    for i := 1 to 5 do
    begin
        write(grades[i]);
        if i < 5 then write(', ');
    end;
    writeln;
    writeln('Average: ', average:0:1);
    writeln('Letter Grade: ', letterGrade);
end.
```

## How to Test
1. Copy any example above
2. Paste into the IDE editor
3. Click "Run Code"
4. Follow the input prompts
5. Check the output

These examples are simpler and should work reliably while still demonstrating key Pascal concepts!
