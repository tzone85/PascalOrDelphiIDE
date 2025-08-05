// Pascal IDE JavaScript Implementation
class PascalIDE {
    constructor() {
        this.editor = null;
        this.currentFilename = 'program.pas';
        this.isCompilerAvailable = false;
        
        this.init();
        this.bindEvents();
        this.checkCompiler();
        this.loadDefaultProgram();
    }

    init() {
        // Initialize CodeMirror editor
        this.editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
            mode: 'text/x-pascal',
            theme: 'eclipse',
            lineNumbers: true,
            lineWrapping: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 2,
            tabSize: 2,
            indentWithTabs: false,
            extraKeys: {
                'Ctrl-S': () => this.saveFile(),
                'Cmd-S': () => this.saveFile(),
                'F5': () => this.runCode(),
                'Ctrl-Enter': () => this.runCode(),
                'Cmd-Enter': () => this.runCode()
            }
        });

        // Update cursor position
        this.editor.on('cursorActivity', () => {
            const cursor = this.editor.getCursor();
            document.getElementById('lineCol').textContent = 
                `Line ${cursor.line + 1}, Col ${cursor.ch + 1}`;
        });
    }

    bindEvents() {
        // Button events
        document.getElementById('runBtn').addEventListener('click', () => this.runCode());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveFile());
        document.getElementById('loadBtn').addEventListener('click', () => this.showFileModal());
        document.getElementById('newBtn').addEventListener('click', () => this.newFile());
        document.getElementById('examplesBtn').addEventListener('click', () => this.showExamplesModal());
        document.getElementById('clearOutputBtn').addEventListener('click', () => this.clearOutput());

        // Modal events
        document.querySelectorAll('.modal .close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Filename input
        document.getElementById('filename').addEventListener('change', (e) => {
            this.currentFilename = e.target.value || 'program.pas';
        });
    }

    async checkCompiler() {
        try {
            const response = await fetch('/api/check-fpc');
            const data = await response.json();
            
            const statusDot = document.querySelector('.status-dot');
            const statusText = document.querySelector('.status-text');
            
            if (data.installed) {
                this.isCompilerAvailable = true;
                statusDot.className = 'status-dot online';
                statusText.textContent = 'Free Pascal Ready';
            } else {
                this.isCompilerAvailable = false;
                statusDot.className = 'status-dot offline';
                statusText.textContent = 'Compiler Not Found';
                this.showCompilerError(data.message);
            }
        } catch (error) {
            this.isCompilerAvailable = false;
            const statusDot = document.querySelector('.status-dot');
            const statusText = document.querySelector('.status-text');
            statusDot.className = 'status-dot offline';
            statusText.textContent = 'Connection Error';
        }
    }

    showCompilerError(message) {
        document.getElementById('errorOutput').textContent = 
            `⚠️ ${message}\n\nTo install Free Pascal Compiler on macOS:\n1. Install Homebrew if you haven't: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n2. Run: brew install fpc\n3. Restart this IDE`;
    }

    async runCode() {
        if (!this.isCompilerAvailable) {
            this.showCompilerError('Free Pascal Compiler is not installed.');
            return;
        }

        const code = this.editor.getValue();
        if (!code.trim()) {
            document.getElementById('errorOutput').textContent = 'Please enter some Pascal code first.';
            return;
        }

        this.showLoading(true);
        this.clearOutput();

        try {
            const response = await fetch('/api/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    filename: this.currentFilename
                })
            });

            const result = await response.json();
            this.displayResults(result);
        } catch (error) {
            document.getElementById('errorOutput').textContent = 
                'Network error: Unable to compile code. Please check your connection.';
        } finally {
            this.showLoading(false);
        }
    }

    displayResults(result) {
        const compilationOutput = document.getElementById('compilationOutput');
        const programOutput = document.getElementById('programOutput');
        const errorOutput = document.getElementById('errorOutput');

        if (result.success) {
            compilationOutput.textContent = result.compilationOutput || '✅ Compilation successful!';
            programOutput.textContent = result.output || '(No output produced)';
            errorOutput.textContent = result.error || '';
        } else {
            compilationOutput.textContent = '❌ Compilation failed';
            programOutput.textContent = '';
            errorOutput.textContent = result.error || 'Unknown compilation error';
        }
    }

    async saveFile() {
        const code = this.editor.getValue();
        const filename = document.getElementById('filename').value || this.currentFilename;

        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    filename: filename
                })
            });

            const result = await response.json();
            if (result.success) {
                document.getElementById('compilationOutput').textContent = `💾 File saved as ${filename}`;
            } else {
                document.getElementById('errorOutput').textContent = `Failed to save file: ${result.error}`;
            }
        } catch (error) {
            document.getElementById('errorOutput').textContent = 'Network error: Unable to save file.';
        }
    }

    async showFileModal() {
        try {
            const response = await fetch('/api/files');
            const result = await response.json();
            
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '';

            if (result.success && result.files.length > 0) {
                result.files.forEach(filename => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    fileItem.textContent = filename;
                    fileItem.addEventListener('click', () => this.loadFile(filename));
                    fileList.appendChild(fileItem);
                });
            } else {
                fileList.innerHTML = '<p>No saved files found.</p>';
            }

            document.getElementById('fileModal').style.display = 'block';
        } catch (error) {
            document.getElementById('errorOutput').textContent = 'Unable to load file list.';
        }
    }

    async loadFile(filename) {
        try {
            const response = await fetch(`/api/load/${filename}`);
            const result = await response.json();
            
            if (result.success) {
                this.editor.setValue(result.code);
                document.getElementById('filename').value = filename;
                this.currentFilename = filename;
                document.getElementById('fileModal').style.display = 'none';
                document.getElementById('compilationOutput').textContent = `📂 Loaded ${filename}`;
            } else {
                document.getElementById('errorOutput').textContent = `Failed to load file: ${result.error}`;
            }
        } catch (error) {
            document.getElementById('errorOutput').textContent = 'Network error: Unable to load file.';
        }
    }

    newFile() {
        this.editor.setValue('');
        document.getElementById('filename').value = 'program.pas';
        this.currentFilename = 'program.pas';
        this.clearOutput();
        document.getElementById('compilationOutput').textContent = '📄 New file created';
    }

    showExamplesModal() {
        const examplesList = document.getElementById('examplesList');
        examplesList.innerHTML = '';

        const examples = this.getPascalExamples();
        examples.forEach(example => {
            const exampleItem = document.createElement('div');
            exampleItem.className = 'example-item';
            exampleItem.innerHTML = `
                <div class="example-title">${example.title}</div>
                <div class="example-description">${example.description}</div>
            `;
            exampleItem.addEventListener('click', () => {
                this.editor.setValue(example.code);
                document.getElementById('filename').value = example.filename;
                this.currentFilename = example.filename;
                document.getElementById('examplesModal').style.display = 'none';
                document.getElementById('compilationOutput').textContent = `📚 Loaded example: ${example.title}`;
            });
            examplesList.appendChild(exampleItem);
        });

        document.getElementById('examplesModal').style.display = 'block';
    }

    getPascalExamples() {
        return [
            {
                title: "Hello World",
                description: "Your first Pascal program",
                filename: "hello.pas",
                code: `program HelloWorld;
begin
    writeln('Hello, World!');
    writeln('Welcome to Pascal programming!');
end.`
            },
            {
                title: "Variables and Input",
                description: "Working with variables and user input",
                filename: "variables.pas",
                code: `program Variables;
var
    name: string;
    age: integer;
begin
    write('Enter your name: ');
    readln(name);
    write('Enter your age: ');
    readln(age);
    writeln('Hello ', name, '! You are ', age, ' years old.');
end.`
            },
            {
                title: "Simple Array",
                description: "Working with arrays and loops",
                filename: "array.pas",
                code: `program SimpleArray;
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
end.`
            },
            {
                title: "Simple Calculator",
                description: "Basic arithmetic operations",
                filename: "calculator.pas",
                code: `program Calculator;
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
        '/': if num2 <> 0 then
                result := num1 / num2
             else
             begin
                writeln('Error: Division by zero!');
                exit;
             end;
    else
        writeln('Invalid operation!');
        exit;
    end;
    
    writeln(num1:0:2, ' ', operation, ' ', num2:0:2, ' = ', result:0:2);
end.`
            },
            {
                title: "Grade Calculator",
                description: "Calculate grades with letter assignment",
                filename: "grades.pas",
                code: `program GradeCalc;
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
end.`
            }
        ];
    }

    loadDefaultProgram() {
        const defaultCode = `program WelcomeToPascal;
{
    Welcome to Pholani Pascal IDE!
    This is a simple Pascal development environment for macOS.
    
    Instructions:
    1. Write your Pascal code in the editor
    2. Click "Run Code" or press F5 to compile and execute
    3. Use "Examples" to load sample programs
    4. Save your work with the "Save" button
    
    Grade 12 Pascal Programming Tips:
    - Always start with 'program ProgramName;'
    - Use 'begin' and 'end.' to wrap your main code
    - Declare variables in a 'var' section
    - Use writeln() to output text
    - Use readln() to get user input
}
begin
    writeln('🎓 Welcome to Pascal Programming!');
    writeln('You are ready to start coding.');
    writeln('');
    writeln('Try modifying this program or load an example.');
    writeln('Good luck with your Grade 12 studies!');
end.`;

        this.editor.setValue(defaultCode);
    }

    clearOutput() {
        document.getElementById('compilationOutput').textContent = '';
        document.getElementById('programOutput').textContent = '';
        document.getElementById('errorOutput').textContent = '';
    }

    showLoading(show) {
        document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
    }
}

// Initialize the IDE when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PascalIDE();
});
