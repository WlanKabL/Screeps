const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define paths
const distDir = path.join(__dirname, 'dist');  // TypeScript output directory
const destinationDir = 'C:\\Users\\XXX\\AppData\\Local\\Screeps\\scripts\\XXX\\default';

// Function to compile TypeScript to JavaScript
function compileTypeScript() {
    console.log('🛠️ Compiling TypeScript...');
    try {
        execSync('npx tsc', { stdio: 'inherit' });
        console.log('✅ TypeScript compiled successfully.');
    } catch (error) {
        console.error('❌ Error during TypeScript compilation:', error);
        process.exit(1);
    }
}

// Function to copy files to the Screeps scripts directory
function copyFiles(srcDir, destDir) {
    if (!fs.existsSync(srcDir)) {
        console.error(`❌ Source directory not found: ${srcDir}`);
        return;
    }
    if (!fs.existsSync(destDir)) {
        console.error(`❌ Destination directory not found: ${destDir}`);
        return;
    }

    const files = fs.readdirSync(srcDir);
    if (files.length === 0) {
        console.log('⚠️ No files found for upload.');
        return;
    }

    files.forEach(file => {
        const srcFilePath = path.join(srcDir, file);
        const destFilePath = path.join(destDir, file);

        fs.copyFileSync(srcFilePath, destFilePath);
        console.log(`✅ File copied: ${file}`);
    });

    console.log('🚀 All files successfully uploaded.');
}

// Main function to perform the upload process
function uploadToScreeps() {
    compileTypeScript();
    copyFiles(distDir, destinationDir);
}

// Start the upload process
uploadToScreeps();
