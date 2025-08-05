const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: './temp',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Ensure temp directory exists
const ensureTempDir = async () => {
  try {
    await fs.access('./temp');
  } catch {
    await fs.mkdir('./temp', { recursive: true });
  }
};

// API Routes

// Check if Free Pascal Compiler is installed
app.get('/api/check-fpc', async (req, res) => {
  try {
    const { stdout } = await execAsync('fpc -h');
    res.json({ 
      installed: true, 
      message: 'Free Pascal Compiler is available',
      version: stdout.split('\n')[0] 
    });
  } catch (error) {
    res.json({ 
      installed: false, 
      message: 'Free Pascal Compiler not found. Please install it using: brew install fpc' 
    });
  }
});

// Compile and run Pascal code
app.post('/api/compile', async (req, res) => {
  try {
    const { code, filename = 'program.pas' } = req.body;
    
    await ensureTempDir();
    
    const pasFile = path.resolve('./temp', filename);
    const exeFile = path.resolve('./temp', filename.replace('.pas', ''));
    
    console.log('Compiling:', pasFile);
    console.log('Executable:', exeFile);
    
    // Write Pascal code to file
    await fs.writeFile(pasFile, code);
    console.log('File written successfully');
    
    // Compile with Free Pascal
    try {
      // Use absolute paths and better error handling
      const compileCommand = `fpc -o"${exeFile}" "${pasFile}"`;
      console.log('Compile command:', compileCommand);
      
      const compileResult = await execAsync(compileCommand, { 
        cwd: path.resolve('./temp'),
        timeout: 30000 
      });
      
      console.log('Compilation stdout:', compileResult.stdout);
      console.log('Compilation stderr:', compileResult.stderr);
      
      // Check if executable was created
      try {
        await fs.access(exeFile);
        console.log('Executable created successfully');
      } catch (accessError) {
        throw new Error('Executable was not created: ' + accessError.message);
      }
      
      // If compilation successful, try to run the program
      try {
        const runCommand = `"${exeFile}"`;
        console.log('Run command:', runCommand);
        
        const runResult = await execAsync(runCommand, { 
          cwd: path.resolve('./temp'),
          timeout: 10000 
        });
        
        console.log('Program output:', runResult.stdout);
        console.log('Program stderr:', runResult.stderr);
        
        res.json({
          success: true,
          output: runResult.stdout,
          error: runResult.stderr,
          compilationOutput: compileResult.stderr || 'Compilation successful!'
        });
      } catch (runError) {
        console.log('Run error:', runError);
        res.json({
          success: true,
          output: '',
          error: runError.message.includes('timeout') ? 'Program execution timed out (10 seconds)' : runError.stderr || runError.message,
          compilationOutput: compileResult.stderr || 'Compilation successful!'
        });
      }
    } catch (compileError) {
      console.log('Compile error:', compileError);
      res.json({
        success: false,
        output: '',
        error: compileError.stderr || compileError.message,
        compilationOutput: compileError.stderr || compileError.message
      });
    }
    
    // Cleanup generated files
    try {
      await fs.unlink(pasFile);
      try { await fs.unlink(exeFile); } catch {}
      try { await fs.unlink(exeFile + '.o'); } catch {}
      try { await fs.unlink(path.join(path.dirname(exeFile), 'ppas.sh')); } catch {}
    } catch (cleanupError) {
      console.log('Cleanup error:', cleanupError);
    }
    
  } catch (error) {
    console.log('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error: ' + error.message
    });
  }
});

// Save Pascal file
app.post('/api/save', upload.single('file'), async (req, res) => {
  try {
    const { code, filename } = req.body;
    const filePath = path.join('./temp', filename || 'program.pas');
    
    await fs.writeFile(filePath, code);
    res.json({ success: true, message: 'File saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Load Pascal file
app.get('/api/load/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join('./temp', filename);
    
    const code = await fs.readFile(filePath, 'utf8');
    res.json({ success: true, code });
  } catch (error) {
    res.status(404).json({ success: false, error: 'File not found' });
  }
});

// List saved files
app.get('/api/files', async (req, res) => {
  try {
    await ensureTempDir();
    const files = await fs.readdir('./temp');
    const pascalFiles = files.filter(file => file.endsWith('.pas'));
    res.json({ success: true, files: pascalFiles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🎓 Pholani Pascal IDE is ready to welcome students on http://localhost:${PORT}`);
  console.log('✨ Your friendly coding companion is waiting for you in the browser!');
  console.log('💫 Every great programmer started with their first "Hello, World!" - yours is next!');
});
