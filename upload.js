const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Pfade definieren
const distDir = path.join(__dirname, 'dist');  // TypeScript Ausgabe
const destinationDir = 'C:\\Users\\XXX\\AppData\\Local\\Screeps\\scripts\\XXX\\default';

// Funktion zum Kompilieren von TypeScript zu JavaScript
function compileTypeScript() {
    console.log('🛠️ TypeScript wird kompiliert...');
    try {
        execSync('npx tsc', { stdio: 'inherit' });
        console.log('✅ TypeScript erfolgreich kompiliert.');
    } catch (error) {
        console.error('❌ Fehler beim Kompilieren von TypeScript:', error);
        process.exit(1);
    }
}

// Funktion zum Kopieren von Dateien ins Screeps-Skriptverzeichnis
function copyFiles(srcDir, destDir) {
    if (!fs.existsSync(srcDir)) {
        console.error(`❌ Quellverzeichnis nicht gefunden: ${srcDir}`);
        return;
    }
    if (!fs.existsSync(destDir)) {
        console.error(`❌ Zielverzeichnis nicht gefunden: ${destDir}`);
        return;
    }

    const files = fs.readdirSync(srcDir);
    if (files.length === 0) {
        console.log('⚠️ Keine Dateien zum Hochladen gefunden.');
        return;
    }

    files.forEach(file => {
        const srcFilePath = path.join(srcDir, file);
        const destFilePath = path.join(destDir, file);

        fs.copyFileSync(srcFilePath, destFilePath);
        console.log(`✅ Datei kopiert: ${file}`);
    });

    console.log('🚀 Alle Dateien erfolgreich hochgeladen.');
}

// Hauptfunktion zur Durchführung des Uploads
function uploadToScreeps() {
    compileTypeScript();
    copyFiles(distDir, destinationDir);
}

// Upload-Prozess starten
uploadToScreeps();
