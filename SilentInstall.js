function Controller() {
    installer.autoRejectMessageBoxes();
    installer.installationFinished.connect(function() {
        gui.clickButton(buttons.NextButton);
    })
}

Controller.prototype.WelcomePageCallback = function() {
    gui.clickButton(buttons.NextButton, 3000);
}

Controller.prototype.CredentialsPageCallback = function() {
    gui.clickButton(buttons.NextButton);
}

Controller.prototype.IntroductionPageCallback = function() {
    gui.clickButton(buttons.NextButton);
}

Controller.prototype.TargetDirectoryPageCallback = function() {
    gui.currentPageWidget().TargetDirectoryLineEdit.setText(installer.environmentVariable("QT_INSTALL_DIR"));
    gui.clickButton(buttons.NextButton);
}

Controller.prototype.ComponentSelectionPageCallback = function() {
    var widget = gui.currentPageWidget();
    widget.deselectAll();
    widget.selectComponent("qt.595.win32_msvc2015");
	widget.selectComponent("qt.595.qtcharts");
	widget.selectComponent("qt.595.qtdatavis3d");
	widget.selectComponent("qt.595.qtnetworkauth");
	widget.selectComponent("qt.595.qtpurchasing");
	widget.selectComponent("qt.595.qtremoteobjects");
	widget.selectComponent("qt.595.qtscript");
	widget.selectComponent("qt.595.qtspeech");
	widget.selectComponent("qt.595.qtvirtualkeyboard");
    widget.selectComponent("qt.595.qtwebengine");
    widget.selectComponent("qt.tools.vcredist_msvc2015_x86");
    gui.clickButton(buttons.NextButton);
}

Controller.prototype.LicenseAgreementPageCallback = function() {
    gui.currentPageWidget().AcceptLicenseRadioButton.setChecked(true);
    gui.clickButton(buttons.NextButton);
}

Controller.prototype.StartMenuDirectoryPageCallback = function() {
    gui.clickButton(buttons.NextButton);
}

Controller.prototype.ReadyForInstallationPageCallback = function() {
    gui.clickButton(buttons.NextButton);
}

Controller.prototype.FinishedPageCallback = function() {
    var checkBoxForm = gui.currentPageWidget().LaunchQtCreatorCheckBoxForm;
    if (checkBoxForm && checkBoxForm.launchQtCreatorCheckBox)
        checkBoxForm.launchQtCreatorCheckBox.checked = false;
    gui.clickButton(buttons.FinishButton);
}