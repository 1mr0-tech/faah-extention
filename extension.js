// @ts-check
'use strict';

const vscode = require('vscode');
const { execFile, exec } = require('child_process');
const path = require('path');

let enabled = true;
let lastPlayedAt = 0;
const DEBOUNCE_MS = 2000;

/** @type {vscode.OutputChannel} */
let out;

/** @param {string} msg */
function log(msg) {
  out.appendLine('[' + new Date().toISOString() + '] ' + msg);
}

/** @param {string} soundPath */
function playSound(soundPath) {
  if (!enabled) { log('playSound: disabled'); return; }
  const now = Date.now();
  if (now - lastPlayedAt < DEBOUNCE_MS) { log('playSound: debounced'); return; }
  lastPlayedAt = now;

  log('playSound: platform=' + process.platform);

  if (process.platform === 'darwin') {
    // execFile avoids shell parsing — no injection risk regardless of path contents
    execFile('afplay', [soundPath], { timeout: 10000 }, function(err) {
      if (err) log('playSound error: ' + err.message);
    });
  } else if (process.platform === 'linux') {
    execFile('mpg123', ['-q', soundPath], { timeout: 10000 }, function(err) {
      if (err) {
        execFile('aplay', [soundPath], { timeout: 10000 }, function(err2) {
          if (err2) log('playSound error: ' + err2.message);
        });
      }
    });
  } else if (process.platform === 'win32') {
    // PowerShell MediaPlayer — path is extension-controlled, not user input
    var escaped = soundPath.replace(/'/g, "''");
    var ps = [
      'Add-Type -AssemblyName presentationcore',
      '$p = New-Object System.Windows.Media.MediaPlayer',
      '$p.Open([uri]\'file:///' + escaped.replace(/\\/g, '/') + '\')',
      '$p.Play()',
      'Start-Sleep -Milliseconds 3000'
    ].join(';');
    execFile('powershell', ['-NoProfile', '-Command', ps], { timeout: 15000 }, function(err) {
      if (err) log('playSound error: ' + err.message);
    });
  }
}

/** @param {vscode.ExtensionContext} context */
function activate(context) {
  out = vscode.window.createOutputChannel('Faah');
  context.subscriptions.push(out);

  const soundPath = path.join(context.extensionPath, 'Faah sound effect.mp3');
  log('activated — sound: ' + soundPath);
  log('platform: ' + process.platform);
  log('shell integration available: ' + (typeof vscode.window.onDidEndTerminalShellExecution === 'function'));

  context.subscriptions.push(
    vscode.commands.registerCommand('faah.enable', function() {
      enabled = true;
      vscode.window.showInformationMessage('Faah: enabled');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('faah.disable', function() {
      enabled = false;
      vscode.window.showInformationMessage('Faah: disabled');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('faah.showLogs', function() {
      out.show();
    })
  );

  // Trigger 1a: terminal command failure
  // Fires when any command typed in the integrated terminal exits non-zero.
  // Covers: npm test, mvn test, jest, pytest, cargo test, go test, tsc, etc.
  // Requires VS Code shell integration (enabled by default for zsh/bash/fish/PowerShell).
  if (typeof vscode.window.onDidEndTerminalShellExecution === 'function') {
    context.subscriptions.push(
      vscode.window.onDidEndTerminalShellExecution(function(event) {
        log('terminal exit — code: ' + event.exitCode);
        if (typeof event.exitCode === 'number' && event.exitCode !== 0) {
          playSound(soundPath);
        }
      })
    );
  } else {
    log('WARNING: onDidEndTerminalShellExecution not available (requires VS Code 1.93+)');
  }

  // Trigger 1b: VS Code Task failure
  // Fires when a task run via tasks.json or Cmd+Shift+B exits non-zero.
  context.subscriptions.push(
    vscode.tasks.onDidEndTaskProcess(function(event) {
      log('task ended — "' + event.execution.task.name + '" code: ' + event.exitCode);
      if (typeof event.exitCode === 'number' && event.exitCode !== 0) {
        playSound(soundPath);
      }
    })
  );

  // Trigger 2: diagnostic errors on save
  // Dual strategy to handle both new errors and pre-existing ones:
  //   A) onDidChangeDiagnostics — fires immediately when the language server updates
  //   B) setTimeout fallback — fires 3s after save if diagnostics did not change
  /** @type {Map<string, number>} */
  var recentSaves = new Map();

  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(function(doc) {
      var key = doc.uri.toString();
      recentSaves.set(key, Date.now());
      log('saved: ' + path.basename(doc.uri.fsPath));

      setTimeout(function() {
        if (!recentSaves.has(key)) return; // already handled
        recentSaves.delete(key);
        var diags = vscode.languages.getDiagnostics(doc.uri);
        log('setTimeout diags: ' + diags.length + ' item(s), severities: ' + JSON.stringify(diags.map(function(d) { return d.severity; })));
        if (diags.some(function(d) { return d.severity === vscode.DiagnosticSeverity.Error; })) {
          log('setTimeout: errors found — playing');
          playSound(soundPath);
        }
      }, 3000);
    })
  );

  context.subscriptions.push(
    vscode.languages.onDidChangeDiagnostics(function(event) {
      for (var i = 0; i < event.uris.length; i++) {
        var uri = event.uris[i];
        var key = uri.toString();
        if (!recentSaves.has(key)) continue;
        recentSaves.delete(key);
        var diags = vscode.languages.getDiagnostics(uri);
        log('onDidChangeDiagnostics: ' + diags.length + ' item(s), severities: ' + JSON.stringify(diags.map(function(d) { return d.severity; })));
        if (diags.some(function(d) { return d.severity === vscode.DiagnosticSeverity.Error; })) {
          log('onDidChangeDiagnostics: errors found — playing');
          playSound(soundPath);
          return;
        }
      }
    })
  );
}

function deactivate() {}

module.exports = { activate: activate, deactivate: deactivate };
