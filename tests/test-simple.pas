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
