# 🎓 Pholani - Pascal IDE for macOS

**A Modern Web-Based Pascal/Delphi IDE for Educational Use**

![Pascal IDE](https://img.shields.io/badge/Pascal-IDE-blue?style=for-the-badge&logo=pascal)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![Free Pascal](https://img.shields.io/badge/Free%20Pascal-Compiler-red?style=for-the-badge)
![macOS](https://img.shields.io/badge/macOS-Compatible-black?style=for-the-badge&logo=apple)

Pholani is a comprehensive web-based Integrated Development Environment (IDE) specifically designed for high school students learning Pascal programming on macOS. It provides a modern, intuitive interface that bridges the gap between traditional Pascal development and contemporary web technologies.

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [📁 Project Structure](#-project-structure)
- [🔄 System Flow](#-system-flow)
- [🚀 Installation](#-installation)
- [💻 Usage](#-usage)
- [🧪 Testing Examples](#-testing-examples)
- [🔧 Technical Details](#-technical-details)
- [🎓 Educational Focus](#-educational-focus)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Project Overview

### Problem Statement
Traditional Pascal/Delphi development environments are either unavailable on macOS or too complex for educational purposes. High school students need a simple, accessible way to learn Pascal programming without dealing with complex IDE setup or platform compatibility issues.

### Solution
Pholani provides a web-based Pascal IDE that:
- Runs natively on macOS using Free Pascal Compiler
- Offers a modern, student-friendly interface
- Requires minimal setup and configuration
- Focuses on educational features over advanced development tools

### Target Audience
- **Primary**: Grade 12 students learning Pascal programming
- **Secondary**: Educators teaching Pascal in high school computer science courses
- **Tertiary**: Anyone needing a simple Pascal development environment on macOS

---

## ✨ Features

### 🖥️ Modern Web Interface
- **Responsive Design**: Works on various screen sizes
- **Syntax Highlighting**: CodeMirror-powered Pascal syntax highlighting
- **Real-time Feedback**: Live cursor position and line/column display
- **Clean UI**: Distraction-free interface optimized for learning

### 📝 Code Development
- **Smart Editor**: Auto-completion, bracket matching, and indentation
- **File Management**: Save, load, and manage Pascal source files
- **Project Organization**: Simple file-based project structure
- **Keyboard Shortcuts**: F5 to run, Cmd/Ctrl+S to save

### ⚡ Compilation & Execution
- **One-Click Compilation**: Integrated Free Pascal Compiler
- **Real-time Output**: Separate panels for compilation and program output
- **Error Reporting**: Clear, educational error messages
- **Timeout Protection**: Prevents infinite loops from hanging the system

### 📚 Educational Tools
- **Built-in Examples**: Ready-to-use Pascal programs demonstrating key concepts
- **Example Categories**: 
  - Basic I/O and variables
  - Arrays and loops
  - Functions and procedures
  - Mathematical operations
  - String processing
- **Progressive Complexity**: Examples range from simple to advanced

### 🔧 Development Features
- **Auto-cleanup**: Temporary files automatically removed
- **Path Resolution**: Robust file path handling
- **Cross-platform Ready**: Designed for easy porting to other Unix-like systems
- **Extensive Logging**: Detailed server-side logging for debugging

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────┐    HTTP/JSON    ┌─────────────────┐    Shell    ┌─────────────────┐
│                 │ ◄──────────────► │                 │ Commands   │                 │
│   Web Browser   │                 │   Node.js       │ ◄─────────► │ Free Pascal     │
│   (Frontend)    │                 │   Server        │             │ Compiler (FPC)  │
│                 │                 │   (Backend)     │             │                 │
└─────────────────┘                 └─────────────────┘             └─────────────────┘
         │                                   │                               │
         │                                   │                               │
         ▼                                   ▼                               ▼
┌─────────────────┐                 ┌─────────────────┐             ┌─────────────────┐
│                 │                 │                 │             │                 │
│ • HTML5/CSS3    │                 │ • Express.js    │             │ • Native Comp.  │
│ • JavaScript    │                 │ • File System   │             │ • Cross-platform│
│ • CodeMirror    │                 │ • Process Mgmt  │             │ • Object Pascal │
│ • Responsive    │                 │ • Error Handling│             │ • Fast Execution│
│                 │                 │                 │             │                 │
└─────────────────┘                 └─────────────────┘             └─────────────────┘
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                Frontend Layer                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │   Editor    │ │   Toolbar   │ │   Output    │ │   File      │ │  Examples   │ │
│ │  Component  │ │  Component  │ │   Panel     │ │  Manager    │ │   Modal     │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────┤
│                              API Communication Layer                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                Backend Layer                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ Compilation │ │    File     │ │   Error     │ │   Process   │ │  Security   │ │
│ │   Service   │ │   Handler   │ │   Handler   │ │   Manager   │ │   Manager   │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                System Layer                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │  File System│ │   Process   │ │   Memory    │ │   Network   │ │  Temporary  │ │
│ │    (macOS)  │ │  Execution  │ │ Management  │ │   Stack     │ │ File System │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
pholani/                           # Root project directory
├── 📄 README.md                   # This comprehensive documentation
├── 📄 package.json                # Node.js project configuration
├── 📄 package-lock.json           # Dependency lock file
├── 📄 server.js                   # Main Node.js/Express server
│
├── 📁 .github/                    # GitHub configuration
│   └── 📄 copilot-instructions.md # GitHub Copilot custom instructions
│
├── 📁 .vscode/                    # VS Code configuration
│   └── 📄 tasks.json              # VS Code task definitions
│
├── 📁 public/                     # Frontend static assets
│   ├── 📄 index.html              # Main HTML interface
│   ├── 📄 styles.css              # CSS styling and responsive design
│   └── 📄 script.js               # Frontend JavaScript logic
│
├── 📁 temp/                       # Temporary compilation files
│   └── (dynamically generated)   # .pas, executable, and object files
│
├── 📁 tests/                      # Test files and Pascal examples
│   ├── 📄 simple-tests.md         # Simple Pascal examples for testing
│   ├── 📄 test-examples.md        # Complex Pascal examples for advanced testing
│   ├── 📄 simple-test.pas         # Basic Pascal test file
│   ├── 📄 test-simple.pas         # Simple Pascal test file
│   └── 📄 test.pas                # General Pascal test file
│
└── 📁 node_modules/               # Node.js dependencies (auto-generated)
    └── (various packages)         # Express, CORS, Multer, etc.
```

### File Descriptions

#### **Root Level Files**
- **`server.js`**: Express.js server with compilation endpoints, file management, and error handling
- **`package.json`**: Project metadata, dependencies, and npm scripts
- **`README.md`**: Comprehensive project documentation (this file)

#### **Frontend (`public/`)**
- **`index.html`**: Main application interface with panels for editing, output, and controls
- **`styles.css`**: Modern CSS with responsive design, animations, and educational-focused styling
- **`script.js`**: JavaScript application logic, API communication, and CodeMirror integration

#### **Configuration**
- **`.github/copilot-instructions.md`**: Custom instructions for GitHub Copilot code generation
- **`.vscode/tasks.json`**: VS Code task definitions for building and running the project

#### **Testing & Examples**
- **`tests/simple-tests.md`**: Beginner-friendly Pascal examples for immediate testing
- **`tests/test-examples.md`**: Advanced Pascal programs demonstrating complex concepts
- **`tests/*.pas`**: Various Pascal test programs for development and debugging

#### **Runtime**
- **`temp/`**: Working directory for Pascal compilation and execution
- **`node_modules/`**: Auto-generated Node.js dependencies

---

## 🔄 System Flow

### Compilation & Execution Flow

```
┌─────────────┐
│    User     │
│ Clicks "Run"│
└──────┬──────┘
       │
       ▼
┌─────────────┐    ┌─────────────────────────────────────────────────────────┐
│  Frontend   │    │                    Backend Process                      │
│ JavaScript  │    │                                                         │
└──────┬──────┘    │ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
       │           │ │   Receive   │  │    Write    │  │   Execute   │      │
       │           │ │    Code     │─▶│  .pas File  │─▶│ FPC Compile │      │
       ▼           │ └─────────────┘  └─────────────┘  └─────────────┘      │
┌─────────────┐    │                                           │           │
│   Send      │    │                                           ▼           │
│ POST /api/  │───▶│                                  ┌─────────────┐      │
│  compile    │    │                                  │  Success?   │      │
└─────────────┘    │                                  └──────┬──────┘      │
       ▲           │                                          │             │
       │           │                              ┌──────────┴──────────┐  │
       │           │                              │                     │  │
       │           │                              ▼                     ▼  │
┌─────────────┐    │                    ┌─────────────┐        ┌─────────────┐
│   Display   │    │                    │   Execute   │        │   Return    │
│   Results   │◄───┤                    │ Executable  │        │   Error     │
└─────────────┘    │                    └─────────────┘        └─────────────┘
                   │                              │                     │  │
                   │                              ▼                     │  │
                   │                    ┌─────────────┐                 │  │
                   │                    │   Capture   │                 │  │
                   │                    │   Output    │                 │  │
                   │                    └─────────────┘                 │  │
                   │                              │                     │  │
                   │                              ▼                     ▼  │
                   │                    ┌─────────────────────────────────┐  │
                   │                    │        Return JSON Response     │  │
                   │                    │    {success, output, error}     │  │
                   │                    └─────────────────────────────────┘  │
                   └─────────────────────────────────────────────────────────┘
```

### File Management Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Save     │────▶│   Validate  │────▶│    Write    │────▶│   Confirm   │
│    File     │     │  Filename   │     │  to /temp   │     │   Success   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Load     │────▶│    List     │────▶│    Read     │────▶│   Display   │
│    File     │     │   Files     │     │    File     │     │  in Editor  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Error Handling Flow

```
                    ┌─────────────┐
                    │   Error     │
                    │  Occurred   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   What      │
                    │   Type?     │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
  │ Compilation │ │   Runtime   │ │   System    │
  │    Error    │ │    Error    │ │    Error    │
  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
         │               │               │
         ▼               ▼               ▼
  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
  │   Display   │ │   Display   │ │     Log     │
  │ in Error    │ │ in Error    │ │  & Display  │
  │   Panel     │ │   Panel     │ │   Generic   │
  └─────────────┘ └─────────────┘ └─────────────┘
```

---

## 🚀 Installation

### Prerequisites

Before installing Pholani, ensure you have the following:

1. **macOS** (10.12 Sierra or later)
2. **Node.js** (14.0 or later)
3. **npm** (comes with Node.js)
4. **Homebrew** (for installing Free Pascal Compiler)

### Step-by-Step Installation

#### 1. Install Homebrew (if not already installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 2. Install Free Pascal Compiler
```bash
brew install fpc
```

#### 3. Verify FPC Installation
```bash
fpc -h
```
You should see the Free Pascal Compiler help information.

#### 4. Clone or Download the Project
```bash
git clone <repository-url>
cd pholani
```

#### 5. Install Node.js Dependencies
```bash
npm install
```

#### 6. Start the Development Server
```bash
npm start
```

#### 7. Open the IDE
Open your web browser and navigate to:
```
http://localhost:3000
```

### Alternative Installation Methods

#### Using npm scripts:
```bash
npm run dev    # Start development server
```

#### Manual server start:
```bash
node server.js
```

---

## 💻 Usage

### Getting Started

1. **Launch the IDE**: Open `http://localhost:3000` in your web browser
2. **Check Compiler Status**: Verify "Free Pascal Ready" appears in the top-right
3. **Write Code**: Use the left panel editor to write Pascal programs
4. **Run Programs**: Click "Run Code" or press F5
5. **View Output**: Check the right panel for compilation and program output

### Interface Overview

#### Main Components

1. **Header Bar**
   - Project title and subtitle
   - Compiler status indicator
   - Real-time connection status

2. **Toolbar**
   - **Run Code**: Compile and execute current program
   - **Save**: Save current code to file
   - **Load**: Open existing Pascal files
   - **New**: Create new empty program
   - **Examples**: Access built-in Pascal examples
   - **Filename Input**: Specify save/load filename

3. **Editor Panel** (Left Side)
   - Syntax-highlighted Pascal code editor
   - Line numbers and current position display
   - Auto-completion and bracket matching

4. **Output Panel** (Right Side)
   - **Compilation**: Shows compiler messages and warnings
   - **Program Output**: Displays program execution results
   - **Errors**: Shows compilation and runtime errors

### Key Features Usage

#### Running Programs
1. Write or paste Pascal code in the editor
2. Click "Run Code" or press **F5**
3. If prompted, provide input in the output panel
4. View results in the "Program Output" section

#### File Management
- **Save**: Click "Save" or press **Cmd/Ctrl+S**
- **Load**: Click "Load" to see saved files, click any file to open
- **New**: Click "New" to start fresh

#### Using Examples
1. Click "Examples" button
2. Browse available Pascal programs
3. Click any example to load it into the editor
4. Modify and run as needed

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **F5** | Compile and run program |
| **Cmd/Ctrl+S** | Save current file |
| **Cmd/Ctrl+Enter** | Alternative run shortcut |

---

## 🧪 Testing Examples

### Built-in Examples

The IDE includes several educational Pascal examples:

1. **Hello World** - Basic output and program structure
2. **Variables and Input** - User input and variable manipulation
3. **Simple Array** - Array operations and loops
4. **Simple Calculator** - Arithmetic operations and case statements
5. **Grade Calculator** - Complex logic and grade assignment

### Advanced Test Examples

For comprehensive testing, the project includes:

#### `tests/simple-tests.md`
- Basic examples guaranteed to compile and run
- Perfect for initial testing and learning
- Covers fundamental Pascal concepts

#### `tests/test-examples.md`
- Complex programs with advanced features
- Demonstrates real-world Pascal programming
- Tests all IDE capabilities

### Testing Workflow

1. **Start Simple**: Use built-in examples first
2. **Progress Gradually**: Move to `tests/simple-tests.md` examples
3. **Challenge Yourself**: Try `tests/test-examples.md` programs
4. **Create Original**: Write your own Pascal programs

### Common Test Scenarios

#### Input/Output Testing
```pascal
program IOTest;
var
    name: string;
begin
    write('Enter your name: ');
    readln(name);
    writeln('Hello, ', name);
end.
```

#### Array Processing
```pascal
program ArrayTest;
var
    numbers: array[1..5] of integer;
    i: integer;
begin
    for i := 1 to 5 do
    begin
        write('Number ', i, ': ');
        readln(numbers[i]);
    end;
    
    for i := 1 to 5 do
        writeln(numbers[i]);
end.
```

---

## 🔧 Technical Details

### Backend Architecture

#### Express.js Server (`server.js`)
- **Port**: 3000 (configurable via `PORT` environment variable)
- **Middleware**: CORS, JSON parsing, static file serving
- **File Upload**: Multer for handling file operations
- **Process Management**: Child process execution for FPC

#### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/check-fpc` | GET | Verify Free Pascal Compiler availability |
| `/api/compile` | POST | Compile and execute Pascal code |
| `/api/save` | POST | Save Pascal source file |
| `/api/load/:filename` | GET | Load Pascal source file |
| `/api/files` | GET | List saved Pascal files |

#### Security Features
- **Timeout Protection**: 10-second execution limit
- **File Isolation**: All operations in `temp/` directory
- **Automatic Cleanup**: Temporary files removed after use
- **Path Validation**: Prevents directory traversal attacks

### Frontend Architecture

#### Technologies Used
- **HTML5**: Semantic markup and modern features
- **CSS3**: Grid layout, flexbox, animations, responsive design
- **JavaScript ES6+**: Modern syntax, async/await, classes
- **CodeMirror**: Professional code editor with Pascal syntax highlighting

#### Core JavaScript Classes

##### `PascalIDE` Class
Main application controller handling:
- Editor initialization and configuration
- Event binding and user interaction
- API communication with backend
- Modal management and UI updates

#### Key Methods
- `init()`: Initialize CodeMirror editor
- `bindEvents()`: Set up event listeners
- `checkCompiler()`: Verify FPC availability
- `runCode()`: Compile and execute Pascal programs
- `saveFile()` / `loadFile()`: File management operations

### Compilation Process

#### File Handling
1. **Code Reception**: JavaScript sends Pascal code to backend
2. **File Creation**: Code written to temporary `.pas` file
3. **Compilation**: FPC compiles to executable
4. **Execution**: Executable runs with output capture
5. **Cleanup**: All temporary files removed

#### Error Management
- **Compilation Errors**: FPC error messages displayed in error panel
- **Runtime Errors**: Program crashes and exceptions handled
- **System Errors**: Network and server issues reported
- **Timeout Errors**: Long-running programs terminated gracefully

### Performance Optimizations

#### Frontend
- **Lazy Loading**: Examples loaded on demand
- **Debounced Events**: Input validation with delays
- **Efficient DOM Updates**: Minimal reflow and repaint
- **Responsive Images**: Optimized for different screen sizes

#### Backend
- **Async Operations**: Non-blocking I/O for all file operations
- **Process Pooling**: Efficient child process management
- **Memory Management**: Automatic garbage collection
- **Connection Handling**: Express.js built-in optimizations

---

## 🎓 Educational Focus

### Pedagogical Design Principles

#### Simplicity First
- **Clean Interface**: No distracting advanced features
- **Clear Feedback**: Immediate, understandable results
- **Progressive Disclosure**: Features revealed as needed
- **Error Guidance**: Educational error messages that teach

#### Learning-Centered Features

##### Built-in Examples
- **Scaffolded Learning**: Examples increase in complexity
- **Key Concepts**: Each example demonstrates specific Pascal features
- **Commented Code**: Educational comments explain important concepts
- **Modifiable**: Students can experiment with provided examples

##### Error Handling
- **Friendly Messages**: Technical errors translated to student language
- **Specific Guidance**: Pinpoint exactly what needs fixing
- **Learning Opportunities**: Errors become teaching moments
- **Encouragement**: Positive reinforcement for problem-solving

#### Curriculum Alignment

##### Grade 12 Computer Science Topics
- **Variables and Data Types**: String, integer, real, boolean
- **Control Structures**: If-then-else, case statements, loops
- **Arrays**: One-dimensional and two-dimensional arrays
- **Procedures and Functions**: Modular programming concepts
- **File Handling**: Basic input/output operations
- **Problem Solving**: Algorithm development and implementation

##### Assessment Support
- **Code Portfolios**: Easy saving and organization of student work
- **Progress Tracking**: Examples provide skill progression pathway
- **Project Sharing**: Simple file export for submission
- **Immediate Feedback**: Real-time compilation results

### Teacher Resources

#### Classroom Integration
- **No Installation Required**: Students use web browser only
- **Consistent Environment**: Same experience across all machines
- **Easy Demonstration**: Teacher can project and code live
- **Quick Setup**: Minimal technical overhead for educators

#### Lesson Plan Support
- **Ready Examples**: Complete programs for demonstration
- **Incremental Complexity**: Natural lesson progression
- **Error Simulation**: Intentionally broken code for debugging practice
- **Extension Activities**: Advanced examples for gifted students

---

## 🤝 Contributing

### Development Setup

#### Local Development
1. **Fork the Repository**: Create your own copy
2. **Clone Locally**: `git clone <your-fork-url>`
3. **Install Dependencies**: `npm install`
4. **Start Development Server**: `npm start`
5. **Make Changes**: Edit code and test locally
6. **Submit Pull Request**: Contribute your improvements

#### Development Guidelines

##### Code Style
- **JavaScript**: ES6+ syntax, async/await preferred
- **CSS**: BEM methodology, mobile-first responsive design
- **HTML**: Semantic markup, accessibility considerations
- **Pascal Examples**: Educational comments, clear variable names

##### Testing Requirements
- **New Features**: Include working Pascal examples
- **Bug Fixes**: Provide test case demonstrating the fix
- **UI Changes**: Test across different screen sizes
- **Backend Changes**: Verify with multiple Pascal programs

#### Contribution Areas

##### High Priority
- **Additional Examples**: More Pascal programs for different skill levels
- **Error Messages**: Improved educational error explanations
- **Documentation**: Enhanced user guides and tutorials
- **Accessibility**: Better support for screen readers and disabilities

##### Medium Priority
- **Themes**: Additional color schemes and editor themes
- **Keyboard Shortcuts**: More efficient development workflows
- **File Management**: Enhanced project organization features
- **Performance**: Optimization for slower devices

##### Future Enhancements
- **Collaborative Features**: Real-time code sharing
- **Version Control**: Basic Git integration
- **Advanced Debugging**: Step-through debugging capabilities
- **Mobile Support**: Touch-optimized interface

### Bug Reports

#### Reporting Guidelines
1. **Clear Title**: Descriptive summary of the issue
2. **Steps to Reproduce**: Exact sequence to trigger the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, macOS version, Pascal code sample
6. **Screenshots**: Visual evidence when applicable

#### Bug Report Template
```markdown
**Bug Description**
Brief description of the issue

**Steps to Reproduce**
1. Step one
2. Step two
3. Step three

**Expected Result**
What should have happened

**Actual Result**
What actually happened

**Environment**
- Browser: [e.g., Safari 14.1]
- macOS: [e.g., Big Sur 11.6]
- Pascal Code: [paste relevant code]

**Additional Context**
Any other relevant information
```

---

## 📄 License

### MIT License

```
MIT License

Copyright (c) 2025 Pholani Pascal IDE Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Third-Party Licenses

#### Dependencies
- **Express.js**: MIT License
- **CodeMirror**: MIT License
- **Free Pascal Compiler**: GPL/LGPL (runtime libraries)
- **Node.js**: MIT License

#### Acknowledgments
- **Free Pascal Team**: For providing excellent cross-platform Pascal compiler
- **CodeMirror Project**: For the powerful web-based code editor
- **Express.js Community**: For the robust web application framework
- **Educational Community**: For inspiration and feedback on pedagogical approaches

---

## 📞 Support & Contact

### Getting Help

#### Documentation Resources
- **This README**: Comprehensive project documentation
- **Example Files**: `tests/simple-tests.md` and `tests/test-examples.md`
- **Inline Comments**: Code explanations throughout the project
- **Error Messages**: Built-in help and guidance

#### Community Support
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community Q&A and knowledge sharing
- **Wiki**: Additional documentation and tutorials (coming soon)

#### Educational Support
- **Teachers**: Integration guidance and lesson plan resources
- **Students**: Learning path recommendations and troubleshooting
- **Curriculum Designers**: Alignment with educational standards

### Project Roadmap

#### Version 1.1 (Next Release)
- [ ] Enhanced error messages with educational context
- [ ] Additional Pascal examples for different skill levels
- [ ] Improved mobile/tablet support
- [ ] Basic project templates for common assignments

#### Version 1.2 (Future)
- [ ] Real-time collaboration features
- [ ] Advanced debugging capabilities
- [ ] Integration with learning management systems
- [ ] Multi-language support (UI internationalization)

#### Version 2.0 (Long-term Vision)
- [ ] Cloud-based file storage and synchronization
- [ ] Advanced IDE features (refactoring, code analysis)
- [ ] Support for other Pascal dialects and compilers
- [ ] Comprehensive assessment and progress tracking tools

---

**🎉 Happy Pascal Programming!**

*Pholani - Making Pascal programming accessible and enjoyable for the next generation of programmers.*
