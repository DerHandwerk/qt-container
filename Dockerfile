FROM microsoft/windowsservercore:10.0.14393.1884
LABEL Description="Windows Server Core development environment for Qbs with Qt 5.9, Chocolatey and various dependencies for testing Qbs modules and functionality"

# Disable crash dialog for release-mode runtimes
RUN reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v Disabled /t REG_DWORD /d 1 /f
RUN reg add "HKLM\SOFTWARE\Microsoft\Windows\Windows Error Reporting" /v DontShowUI /t REG_DWORD /d 1 /f

COPY SilentInstall.js SilentInstall.js
RUN powershell -NoProfile -ExecutionPolicy Bypass -Command \
    $ErrorActionPreference = 'Stop'; \
    $Wc = New-Object System.Net.WebClient ; \
    $Wc.DownloadFile('http://ftp.fau.de/qtproject/official_releases/online_installers/qt-unified-windows-x86-online.exe', 'C:\qt.exe') ; \
    Echo 'Downloaded qt-opensource-windows-x86-5.9.3.exe' ; \
    $Env:QT_INSTALL_DIR = 'C:\\Qt' ; \
    Start-Process C:\qt.exe -ArgumentList '--verbose --script C:/SilentInstall.js' -NoNewWindow -Wait ; \
    Remove-Item C:\qt.exe -Force ; \
    Remove-Item C:\SilentInstall.js -Force
ENV QTDIR C:\\Qt\\5.9.3\\msvc2015

RUN @powershell -NoProfile -ExecutionPolicy Bypass -Command \
    $Env:chocolateyVersion = '0.10.8' ; \
    $Env:chocolateyUseWindowsCompression = 'false' ; \
    "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
RUN choco install -y qbs --version 1.9.1 && qbs --version
RUN choco install -y visualcpp-build-tools --version 14.0.25420.1 && dir "%PROGRAMFILES(X86)%\Microsoft Visual C++ Build Tools"