# Pascal IDE Test Examples

Here are comprehensive Pascal code examples to test your IDE's capabilities:

## 1. Array Manipulation with Statistics

```pascal
program ArrayStatistics;
const
    MAX_NUMBERS = 10;
type
    NumberArray = array[1..MAX_NUMBERS] of real;
var
    numbers: NumberArray;
    i, count: integer;
    sum, average, variance, stdDev: real;
    min, max: real;

procedure ReadNumbers(var arr: NumberArray; var n: integer);
var
    i: integer;
begin
    write('How many numbers (1-', MAX_NUMBERS, ')? ');
    readln(n);
    
    if (n < 1) or (n > MAX_NUMBERS) then
    begin
        writeln('Invalid count! Using 5 numbers.');
        n := 5;
    end;
    
    writeln('Enter ', n, ' numbers:');
    for i := 1 to n do
    begin
        write('Number ', i, ': ');
        readln(arr[i]);
    end;
end;

function CalculateSum(const arr: NumberArray; n: integer): real;
var
    i: integer;
    total: real;
begin
    total := 0;
    for i := 1 to n do
        total := total + arr[i];
    CalculateSum := total;
end;

procedure FindMinMax(const arr: NumberArray; n: integer; var minVal, maxVal: real);
var
    i: integer;
begin
    minVal := arr[1];
    maxVal := arr[1];
    
    for i := 2 to n do
    begin
        if arr[i] < minVal then
            minVal := arr[i];
        if arr[i] > maxVal then
            maxVal := arr[i];
    end;
end;

function CalculateVariance(const arr: NumberArray; n: integer; avg: real): real;
var
    i: integer;
    sumSquares: real;
begin
    sumSquares := 0;
    for i := 1 to n do
        sumSquares := sumSquares + sqr(arr[i] - avg);
    CalculateVariance := sumSquares / n;
end;

begin
    writeln('=== Array Statistics Calculator ===');
    writeln;
    
    ReadNumbers(numbers, count);
    
    sum := CalculateSum(numbers, count);
    average := sum / count;
    
    FindMinMax(numbers, count, min, max);
    
    variance := CalculateVariance(numbers, count, average);
    stdDev := sqrt(variance);
    
    writeln;
    writeln('=== RESULTS ===');
    writeln('Numbers entered: ', count);
    writeln('Sum: ', sum:0:2);
    writeln('Average: ', average:0:2);
    writeln('Minimum: ', min:0:2);
    writeln('Maximum: ', max:0:2);
    writeln('Range: ', (max - min):0:2);
    writeln('Variance: ', variance:0:2);
    writeln('Standard Deviation: ', stdDev:0:2);
end.
```

## 2. Grade Management System

```pascal
program GradeManager;
const
    MAX_STUDENTS = 20;
    MAX_SUBJECTS = 5;
    SUBJECT_NAMES: array[1..MAX_SUBJECTS] of string = 
        ('Mathematics', 'Science', 'English', 'History', 'Geography');

type
    GradeArray = array[1..MAX_SUBJECTS] of integer;
    StudentRecord = record
        name: string;
        grades: GradeArray;
        average: real;
        letterGrade: char;
    end;
    ClassArray = array[1..MAX_STUDENTS] of StudentRecord;

var
    students: ClassArray;
    studentCount: integer;

procedure InputStudentData(var student: StudentRecord);
var
    i: integer;
    total: integer;
begin
    write('Enter student name: ');
    readln(student.name);
    
    writeln('Enter grades for each subject (0-100):');
    total := 0;
    for i := 1 to MAX_SUBJECTS do
    begin
        repeat
            write(SUBJECT_NAMES[i], ': ');
            readln(student.grades[i]);
            if (student.grades[i] < 0) or (student.grades[i] > 100) then
                writeln('Please enter a grade between 0 and 100.');
        until (student.grades[i] >= 0) and (student.grades[i] <= 100);
        
        total := total + student.grades[i];
    end;
    
    student.average := total / MAX_SUBJECTS;
    
    // Calculate letter grade
    if student.average >= 90 then
        student.letterGrade := 'A'
    else if student.average >= 80 then
        student.letterGrade := 'B'
    else if student.average >= 70 then
        student.letterGrade := 'C'
    else if student.average >= 60 then
        student.letterGrade := 'D'
    else
        student.letterGrade := 'F';
end;

procedure DisplayStudent(const student: StudentRecord);
var
    i: integer;
begin
    writeln('Student: ', student.name);
    write('Grades: ');
    for i := 1 to MAX_SUBJECTS do
    begin
        write(student.grades[i]);
        if i < MAX_SUBJECTS then
            write(', ');
    end;
    writeln;
    writeln('Average: ', student.average:0:1, ' (', student.letterGrade, ')');
    writeln('-------------------');
end;

procedure DisplayClassSummary(const class: ClassArray; count: integer);
var
    i, j: integer;
    classTotal: real;
    subjectTotals: array[1..MAX_SUBJECTS] of real;
    highestAvg: real;
    topStudent: string;
begin
    classTotal := 0;
    for j := 1 to MAX_SUBJECTS do
        subjectTotals[j] := 0;
    
    highestAvg := 0;
    topStudent := '';
    
    for i := 1 to count do
    begin
        classTotal := classTotal + class[i].average;
        
        if class[i].average > highestAvg then
        begin
            highestAvg := class[i].average;
            topStudent := class[i].name;
        end;
        
        for j := 1 to MAX_SUBJECTS do
            subjectTotals[j] := subjectTotals[j] + class[i].grades[j];
    end;
    
    writeln('=== CLASS SUMMARY ===');
    writeln('Total students: ', count);
    writeln('Class average: ', (classTotal / count):0:1);
    writeln('Top student: ', topStudent, ' (', highestAvg:0:1, ')');
    writeln;
    writeln('Subject averages:');
    for j := 1 to MAX_SUBJECTS do
        writeln('  ', SUBJECT_NAMES[j], ': ', (subjectTotals[j] / count):0:1);
end;

begin
    writeln('=== Grade Management System ===');
    writeln;
    
    write('How many students? ');
    readln(studentCount);
    
    if studentCount > MAX_STUDENTS then
    begin
        writeln('Too many students! Maximum is ', MAX_STUDENTS);
        studentCount := MAX_STUDENTS;
    end;
    
    // Input data for all students
    for i := 1 to studentCount do
    begin
        writeln;
        writeln('Student #', i, ':');
        InputStudentData(students[i]);
    end;
    
    // Display all students
    writeln;
    writeln('=== STUDENT REPORTS ===');
    for i := 1 to studentCount do
        DisplayStudent(students[i]);
    
    // Display class summary
    writeln;
    DisplayClassSummary(students, studentCount);
end.
```

## 3. Simple Game - Number Guessing with Statistics

```pascal
program NumberGuessingGame;
var
    secretNumber, guess, attempts: integer;
    gameCount, totalAttempts: integer;
    playAgain: char;
    bestScore: integer;

procedure InitializeGame;
begin
    randomize; // Initialize random number generator
    secretNumber := random(100) + 1; // 1-100
    attempts := 0;
    writeln('=== Number Guessing Game ===');
    writeln('I am thinking of a number between 1 and 100...');
    writeln;
end;

function GetPlayerGuess: integer;
var
    playerGuess: integer;
begin
    repeat
        write('Enter your guess (1-100): ');
        readln(playerGuess);
        if (playerGuess < 1) or (playerGuess > 100) then
            writeln('Please enter a number between 1 and 100!');
    until (playerGuess >= 1) and (playerGuess <= 100);
    GetPlayerGuess := playerGuess;
end;

procedure GiveHint(guess, secret: integer);
var
    difference: integer;
begin
    difference := abs(guess - secret);
    
    if difference = 0 then
        writeln('Congratulations! You got it!')
    else if difference <= 5 then
        writeln('Very close! You are burning hot!')
    else if difference <= 10 then
        writeln('Getting warm...')
    else if difference <= 20 then
        writeln('Getting cooler...')
    else
        writeln('Very cold!');
    
    if guess > secret then
        writeln('Try a smaller number.')
    else if guess < secret then
        writeln('Try a larger number.');
end;

procedure DisplayGameStats;
begin
    writeln;
    writeln('=== GAME STATISTICS ===');
    writeln('Games played: ', gameCount);
    writeln('Total attempts: ', totalAttempts);
    if gameCount > 0 then
        writeln('Average attempts per game: ', (totalAttempts / gameCount):0:1);
    writeln('Best score (fewest attempts): ', bestScore);
end;

begin
    gameCount := 0;
    totalAttempts := 0;
    bestScore := 999;
    
    repeat
        inc(gameCount);
        InitializeGame;
        
        repeat
            inc(attempts);
            guess := GetPlayerGuess;
            GiveHint(guess, secretNumber);
            writeln;
        until guess = secretNumber;
        
        writeln('You found the number in ', attempts, ' attempts!');
        totalAttempts := totalAttempts + attempts;
        
        if (attempts < bestScore) or (bestScore = 999) then
            bestScore := attempts;
        
        writeln;
        write('Play again? (y/n): ');
        readln(playAgain);
        writeln;
    until (playAgain <> 'y') and (playAgain <> 'Y');
    
    DisplayGameStats;
    writeln('Thanks for playing!');
end.
```

## 4. Matrix Operations

```pascal
program MatrixOperations;
const
    MAX_SIZE = 5;
type
    Matrix = array[1..MAX_SIZE, 1..MAX_SIZE] of integer;
    
var
    matrixA, matrixB, result: Matrix;
    size: integer;

procedure ReadMatrix(var mat: Matrix; n: integer; name: string);
var
    i, j: integer;
begin
    writeln('Enter values for matrix ', name, ' (', n, 'x', n, '):');
    for i := 1 to n do
    begin
        for j := 1 to n do
        begin
            write('Element [', i, ',', j, ']: ');
            readln(mat[i, j]);
        end;
    end;
end;

procedure DisplayMatrix(const mat: Matrix; n: integer; name: string);
var
    i, j: integer;
begin
    writeln('Matrix ', name, ':');
    for i := 1 to n do
    begin
        write('  ');
        for j := 1 to n do
            write(mat[i, j]:4);
        writeln;
    end;
    writeln;
end;

procedure AddMatrices(const a, b: Matrix; var result: Matrix; n: integer);
var
    i, j: integer;
begin
    for i := 1 to n do
        for j := 1 to n do
            result[i, j] := a[i, j] + b[i, j];
end;

procedure MultiplyMatrices(const a, b: Matrix; var result: Matrix; n: integer);
var
    i, j, k: integer;
begin
    for i := 1 to n do
        for j := 1 to n do
        begin
            result[i, j] := 0;
            for k := 1 to n do
                result[i, j] := result[i, j] + a[i, k] * b[k, j];
        end;
end;

function MatrixDeterminant(const mat: Matrix; n: integer): integer;
begin
    if n = 1 then
        MatrixDeterminant := mat[1, 1]
    else if n = 2 then
        MatrixDeterminant := mat[1, 1] * mat[2, 2] - mat[1, 2] * mat[2, 1]
    else
    begin
        writeln('Determinant calculation for size > 2 not implemented in this demo.');
        MatrixDeterminant := 0;
    end;
end;

begin
    writeln('=== Matrix Operations Demo ===');
    writeln;
    
    repeat
        write('Enter matrix size (1-', MAX_SIZE, '): ');
        readln(size);
    until (size >= 1) and (size <= MAX_SIZE);
    
    writeln;
    ReadMatrix(matrixA, size, 'A');
    writeln;
    ReadMatrix(matrixB, size, 'B');
    
    writeln;
    writeln('=== RESULTS ===');
    DisplayMatrix(matrixA, size, 'A');
    DisplayMatrix(matrixB, size, 'B');
    
    // Addition
    AddMatrices(matrixA, matrixB, result, size);
    DisplayMatrix(result, size, 'A + B');
    
    // Multiplication
    MultiplyMatrices(matrixA, matrixB, result, size);
    DisplayMatrix(result, size, 'A × B');
    
    // Determinants (for small matrices)
    if size <= 2 then
    begin
        writeln('Determinant of A: ', MatrixDeterminant(matrixA, size));
        writeln('Determinant of B: ', MatrixDeterminant(matrixB, size));
    end;
end.
```

## 5. String Processing and Word Analysis

```pascal
program WordAnalyzer;
var
    text: string;
    wordCount, charCount, vowelCount, consonantCount: integer;
    longestWord: string;

function CountWords(const str: string): integer;
var
    i, count: integer;
    inWord: boolean;
begin
    count := 0;
    inWord := false;
    
    for i := 1 to length(str) do
    begin
        if str[i] <> ' ' then
        begin
            if not inWord then
            begin
                inc(count);
                inWord := true;
            end;
        end
        else
            inWord := false;
    end;
    
    CountWords := count;
end;

function CountVowels(const str: string): integer;
var
    i, count: integer;
    ch: char;
begin
    count := 0;
    for i := 1 to length(str) do
    begin
        ch := upcase(str[i]);
        if (ch = 'A') or (ch = 'E') or (ch = 'I') or (ch = 'O') or (ch = 'U') then
            inc(count);
    end;
    CountVowels := count;
end;

function CountConsonants(const str: string): integer;
var
    i, count: integer;
    ch: char;
begin
    count := 0;
    for i := 1 to length(str) do
    begin
        ch := upcase(str[i]);
        if (ch >= 'A') and (ch <= 'Z') and 
           not ((ch = 'A') or (ch = 'E') or (ch = 'I') or (ch = 'O') or (ch = 'U')) then
            inc(count);
    end;
    CountConsonants := count;
end;

function FindLongestWord(const str: string): string;
var
    i, wordStart, wordLength, maxLength: integer;
    currentWord, longest: string;
    inWord: boolean;
begin
    longest := '';
    maxLength := 0;
    inWord := false;
    wordStart := 1;
    
    for i := 1 to length(str) + 1 do
    begin
        if (i <= length(str)) and (str[i] <> ' ') then
        begin
            if not inWord then
            begin
                wordStart := i;
                inWord := true;
            end;
        end
        else
        begin
            if inWord then
            begin
                wordLength := i - wordStart;
                currentWord := copy(str, wordStart, wordLength);
                if wordLength > maxLength then
                begin
                    maxLength := wordLength;
                    longest := currentWord;
                end;
                inWord := false;
            end;
        end;
    end;
    
    FindLongestWord := longest;
end;

procedure DisplayWordFrequency(const str: string);
var
    words: array[1..100] of string;
    counts: array[1..100] of integer;
    wordCount, i, j: integer;
    currentWord: string;
    found: boolean;
    wordStart: integer;
    inWord: boolean;
begin
    wordCount := 0;
    inWord := false;
    wordStart := 1;
    
    // Extract words
    for i := 1 to length(str) + 1 do
    begin
        if (i <= length(str)) and (str[i] <> ' ') then
        begin
            if not inWord then
            begin
                wordStart := i;
                inWord := true;
            end;
        end
        else
        begin
            if inWord then
            begin
                currentWord := copy(str, wordStart, i - wordStart);
                // Convert to lowercase for comparison
                for j := 1 to length(currentWord) do
                    if (currentWord[j] >= 'A') and (currentWord[j] <= 'Z') then
                        currentWord[j] := chr(ord(currentWord[j]) + 32);
                
                found := false;
                for j := 1 to wordCount do
                begin
                    if words[j] = currentWord then
                    begin
                        inc(counts[j]);
                        found := true;
                        break;
                    end;
                end;
                
                if not found then
                begin
                    inc(wordCount);
                    words[wordCount] := currentWord;
                    counts[wordCount] := 1;
                end;
                
                inWord := false;
            end;
        end;
    end;
    
    writeln('Word frequencies:');
    for i := 1 to wordCount do
        writeln('  "', words[i], '": ', counts[i]);
end;

begin
    writeln('=== Text Analyzer ===');
    writeln('Enter a sentence or paragraph:');
    readln(text);
    
    if length(text) = 0 then
    begin
        writeln('No text entered!');
        exit;
    end;
    
    wordCount := CountWords(text);
    charCount := length(text);
    vowelCount := CountVowels(text);
    consonantCount := CountConsonants(text);
    longestWord := FindLongestWord(text);
    
    writeln;
    writeln('=== ANALYSIS RESULTS ===');
    writeln('Text: "', text, '"');
    writeln('Character count: ', charCount);
    writeln('Word count: ', wordCount);
    writeln('Vowel count: ', vowelCount);
    writeln('Consonant count: ', consonantCount);
    writeln('Longest word: "', longestWord, '" (', length(longestWord), ' characters)');
    writeln;
    
    DisplayWordFrequency(text);
end.
```

## Testing Instructions

Copy and paste any of these examples into your Pascal IDE to test:

1. **Array Statistics** - Tests array manipulation, functions, procedures, and mathematical operations
2. **Grade Manager** - Tests records, nested arrays, complex data structures
3. **Number Guessing Game** - Tests random numbers, loops, user interaction, and game logic
4. **Matrix Operations** - Tests 2D arrays and mathematical computations
5. **Word Analyzer** - Tests string processing, algorithms, and text analysis

Each example demonstrates different aspects of Pascal programming that are important for Grade 12 students!
