const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define paths
const distDir = path.join(__dirname, 'dist');  // TypeScript output directory
const destinations = [
    {
        name: 'mac',
        path: '/Users/XXX/Library/Application Support/Screeps/scripts/XXX/default'
    },
    {
        name: 'windows',
        path: 'C:\\Users\\XXX\\AppData\\Local\\Screeps\\scripts\\XXX\\default'
    }
];

// Function to compile TypeScript to JavaScript
function compileTypeScript() {
    console.log('🛠️ Compiling TypeScript...');
    try {
        execSync('npx tsc --project tsconfig.json', { stdio: 'inherit' });
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
        return false;
    }
    if (!fs.existsSync(destDir)) {
        console.error(`❌ Destination directory not found: ${destDir}`);
        return false;
    }

    const files = fs.readdirSync(srcDir);
    if (files.length === 0) {
        console.log('⚠️ No files found for upload.');
        return false;
    }

    files.forEach(file => {
        const srcFilePath = path.join(srcDir, file);
        const destFilePath = path.join(destDir, file);

        fs.copyFileSync(srcFilePath, destFilePath);
        console.log(`✅ File copied: ${file}`);
    });

    return true;
}

// Main function to perform the upload process
function uploadToScreeps() {
    compileTypeScript();

    let copied = false;
    for (const destination of destinations) {
        if (fs.existsSync(destination.path)) {
            console.log(`🌍 Found destination: ${destination.name}`);
            if (copyFiles(distDir, destination.path)) {
                console.log(`🚀 Files successfully copied to ${destination.name}`);
                copied = true;
                break;
            }
        }
    }

    if (!copied) {
        console.error('❌ No valid destination found for upload.');
    }
}

// Start the upload process
uploadToScreeps();