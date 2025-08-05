program SimpleTest;
var
    i, n, sum: integer;
begin
    write('Enter a number: ');
    readln(n);
    
    writeln('Counting from 1 to ', n, ':');
    sum := 0;
    for i := 1 to n do
    begin
        write(i, ' ');
        sum := sum + i;
    end;
    writeln;
    writeln('Sum of numbers from 1 to ', n, ' is: ', sum);
end.
