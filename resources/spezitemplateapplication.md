Directory structure:
└── stanfordspezi-spezitemplateapplication/
    ├── README.md
    ├── CONTRIBUTORS.md
    ├── LICENSE.md
    ├── Scripts/
    │   └── TEMPLATEREADME.md
    ├── TemplateApplication/
    │   ├── Resources/
    │   │   └── ConsentDocument.md
    │   └── Supporting Files/
    │       └── TemplateApplication.docc/
    │           ├── Create.md
    │           ├── Modify.md
    │           ├── Setup.md
    │           └── TemplateApplication.md
    └── fastlane/
        └── README.md

================================================
File: README.md
================================================
<!--

This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

-->

# Spezi Template Application

[![Beta Deployment](https://github.com/StanfordSpezi/SpeziTemplateApplication/actions/workflows/beta-deployment.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziTemplateApplication/actions/workflows/beta-deployment.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziTemplateApplication/branch/main/graph/badge.svg?token=9fvSAiFJUY)](https://codecov.io/gh/StanfordSpezi/SpeziTemplateApplication)
[![DOI](https://zenodo.org/badge/589846478.svg)](https://zenodo.org/badge/latestdoi/589846478)

This repository contains the Spezi Template Application.
It demonstrates using the [Spezi](https://github.com/StanfordSpezi/Spezi) ecosystem and builds on top of the [Stanford Biodesign Digital Health Template Application](https://github.com/StanfordBDHG/TemplateApplication).

> [!NOTE] 
> Do you want to try out the Spezi Template Application? You can download it to your iOS device using [TestFlight](https://testflight.apple.com/join/ipEezBY1)!


## Application Content

The following screenshots show a wide variety of features based on Spezi Modules that are part of the Spezi Template Application.

|![A screen displaying welcome information.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/Welcome.png#gh-light-mode-only>) ![A screen displaying welcome information.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/Welcome~dark.png#gh-dark-mode-only>)|![A screen showing an overview of the modules used in the Spezi Template Application.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/InterestingModules.png#gh-light-mode-only>) ![A screen showing an overview of the modules used in the Spezi Template Application.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/InterestingModules~dark.png#gh-dark-mode-only>)|![A screen displaying the consent view.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/Consent.png#gh-light-mode-only>) ![A screen displaying the consent view.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/Consent~dark.png#gh-dark-mode-only>)
|:--:|:--:|:--:|
|Welcome View|Interesting Modules|Consent Signature|

|![HealthKit Onboarding Flow](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/HealthKitAccess.png#gh-light-mode-only>) ![HealthKit Onboarding Flow](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/HealthKitAccess~dark.png#gh-dark-mode-only>)|![Permissions screen of the HealthKit framework](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/HealthKitSheet.png#gh-light-mode-only>) ![Permissions screen of the HealthKit framework](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Onboarding/HealthKitSheet~dark.png#gh-dark-mode-only>)|![Onboarding screen showing the Notifications permission screen.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Notifications.png#gh-light-mode-only>) ![Onboarding screen showing the Notifications permission screen.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Notifications~dark.png#gh-dark-mode-only>)|
|:--:|:--:|:--:|
|HealthKit Access|Granular HealthKit Share Control|Trigger Local Notifications|

|![A screen displaying the Scheduler UI.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Schedule.png#gh-light-mode-only>) ![A screen displaying the Scheduler UI.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Schedule~dark.png#gh-dark-mode-only>)|![A screen showing a questionnaire using ResearchKit.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Questionnaire.png#gh-light-mode-only>) ![A screen showing a questionnaire using ResearchKit.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/Questionnaire~dark.png#gh-dark-mode-only>)|![The scheduler screen showing the completed UI](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/ScheduleComplete.png#gh-light-mode-only>) ![The scheduler screen showing the completed UI](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Schedule/ScheduleComplete~dark.png#gh-dark-mode-only>)|
|:--:|:--:|:--:|
|Schedule Tasks|Display Questionnaires|Keep Track of Tasks|

|![A screen displaying the Contact UI.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Context/Contacts.png#gh-light-mode-only>) ![A screen displaying the Contact UI.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Context/Contacts~dark.png#gh-dark-mode-only>)|![A screen displaying the current user account information.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Account/Account.png#gh-light-mode-only>) ![A screen displaying the current user account information.](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Account/Account~dark.png#gh-dark-mode-only>)|![License information to list all used Swift Packages](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Context/License.png#gh-light-mode-only>) ![License information to list all used Swift Packages](<TemplateApplication/Supporting Files/TemplateApplication.docc/Resources/Context/License~dark.png#gh-dark-mode-only>)|
|:--:|:--:|:--:|
|Contact Information|Account Overview|License Information|

> [!NOTE] 
> You can find all the used Spezi Modules in the [Stanford Spezi GitHub Organization](https://github.com/StanfordSpezi).

The [DocC documentation of the Spezi Template Application contains information on how to use the application as the basis for your Spezi-based application, run the application, and modify the application](https://stanfordspezi.github.io/SpeziTemplateApplication).

## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.

This project is based on [ContinuousDelivery Example by Paul Schmiedmayer](https://github.com/PSchmiedmayer/ContinousDelivery) and the [Stanford Biodesign Digital Health Template Application](https://github.com/StanfordBDHG/TemplateApplication) provided using the MIT license.


## License

This project is licensed under the MIT License. See [Licenses](LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterLight.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterDark.png#gh-dark-mode-only)


================================================
File: CONTRIBUTORS.md
================================================
<!--

This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

-->

Template Application Contributors
=================================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Andreas Bauer](https://github.com/Supereg)
* [Philipp Zagar](https://github.com/philippzagar)
* [Nikolai Madlener](https://github.com/NikolaiMadlener)

================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2023 Stanford University

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================================================
File: Scripts/TEMPLATEREADME.md
================================================
<!--

This source file is part of the Stanford Spezi Template Application open-source project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

-->

# Spezi Template Application

This repository contains the Spezi Template Application.
The Spezi Template Application is using the [Spezi](https://github.com/StanfordSpezi/Spezi) ecosystem and builds on top of the [{{SSTA}}](https://github.com/StanfordSpezi/Spezi{{TA}}).

> [!NOTE]  
> Do you want to learn more about the {{SSTA}} and how to use, extend, and modify this application? Check out the [{{SSTA}} documentation](https://stanfordspezi.github.io/Spezi{{TA}}).


## Spezi Template Application Features

*Provide a comprehensive description of your application, including figures showing the application. You can learn more on how to structure a README in the [Stanford Spezi Documentation Guide](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/documentation-guide)*


## Contributing

*Ensure that you add an adequate contribution section to this README.*


## License

This project is licensed under the MIT License. See [Licenses](LICENSES) for more information.


================================================
File: TemplateApplication/Resources/ConsentDocument.md
================================================
Spezi can render consent documents in the markdown format: This is a *markdown* **example**.


================================================
File: TemplateApplication/Supporting Files/TemplateApplication.docc/Create.md
================================================
# Create Your Spezi-based Application

<!--
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#
-->

How to create your own Spezi-based application based on the Spezi Template Application.


## 1. Create Your Own Repository

You can create your own Spezi-based application by creating a new GitHub repo and [using the Stanford Spezi Template Application as a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

> Tip: Spezi is completely independent of the Spezi Template Application or any other setup. You can always import one or more Spezi modules in any Swift and SwiftUI-based application.


## 2. Change The Name and Key Information

The Spezi Template application repository provides a convenient script to rename all aspects of the Spezi Template Application to your application name, update the bundle identifier, and remove unused documentation and files that are not needed for your own project.

The shell script can be called as follows:
```bash
$ sh Scripts/create.sh --name <appName> --bundleIdentifier <bundleIdentifier> [--provisioningProfile <provisioningProfileName>] [--firebaseProject <firebaseProjectId>]
```

Argument | Description
--- | ---
`--name` | Name of the application. (required)
`--bundleIdentifier` | The iOS bundle identifier of the application. (required)
`--provisioningProfile` | The name of the iOS provisioning profile to build the application. (optional, defaults to the value of --name)
`--firebaseProject` | The Firebase project identifier. (optional, defaults to the value of --name lowercased without spaces)
`--help` | Display help and exit.

The following example shows renaming the application to "My Spezi App":

```bash
$ sh Scripts/create.sh --name "My Spezi App" --bundleIdentifier "edu.stanford.spezi.myapp"
```

## 3. Setup the Continuous Integration and Delivery Setup

Continuous integration (CI) and continuous delivery (CD) are essential to automatically test and deploy your application at any time.
Each Spezi Template Application-based Spezi app already has the necessary infrastructure in place; the Spezi Template Application includes continuous integration (CI) and continuous delivery (CD) setup:
- Automatically build and test the application on every pull request before deploying it. Suppose your organization doesn't have a self-hosted macOS runner modeled after the setup in the [StanfordBDHG ContinuousIntegration](https://github.com/StanfordBDHG/ContinousIntegration) setup. In that case, you will need to remove the `runsonlabels` arguments in the `build-and-test.yml` file to ensure that the build runs on the default macOS runners provided by GitHub.
- An automated setup to deploy the application to TestFlight every time there is a new commit on the repository's main branch. You will need to provide the provisioning profile and other GitHub secrets to make them available to the GitHub Action.
- Ensure a coherent code style by checking the conformance to the SwiftLint rules defined in `.swiftlint.yml` on every pull request and commit.
- Ensure conformance to the [REUSE Specification]() to property license the application and all related code.
- Deploy documentation of the application to GitHub pages with every commit to the main branch.

Please refer to the [Stanford Biodesign Digital Health Template Application](https://github.com/StanfordBDHG/TemplateApplication) and the [ContinuousDelivery Example by Paul Schmiedmayer](https://github.com/PSchmiedmayer/ContinousDelivery) for more background about the CI and CD setup for the Spezi Template Application.


================================================
File: TemplateApplication/Supporting Files/TemplateApplication.docc/Modify.md
================================================
# Start Development of Your Spezi-based Application

<!--
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#    
-->

Overview of the different parts of the Spezi Template Application-based Spezi app and how to modify them to your needs.

> Important: Please first follow the instructions on how to install all the necessary software to build, run, and modify the application (<doc:Setup>) and how to create your own Spezi-based application based on the Spezi Template Application (<doc:Create>).


## Onboarding Flow

The onboarding contains different steps.
It uses the [**Spezi Onboarding** module](https://github.com/StanfordSpezi/SpeziOnboarding) to display different onboarding-related views like the information about the application, a consent screen, and a screen to display a HealthKit consent view.

@Row(numberOfColumns: 4) {
    @Column(size: 1) {
        @Image(source: "Welcome", alt: "A screen displaying welcome information.") {
            You can find and modify the welcome messages in the ``Welcome`` view.
        }
    }
    @Column(size: 1) {
        @Image(source: "InterestingModules", alt: "A screen showing an overview of the modules used in the Spezi Template Application.") {
            You can find and modify the sequential onboarding information in the ``InterestingModules`` view.
        }
    }
    @Column(size: 1) {
        @Image(source: "Consent", alt: "A screen displaying the consent view.") {
            You can find and modify the consent setup and surrounding user interface in the ``Consent`` view.
        }
    }
}

The application also automatically pulls and processes HealthKit data types that are defined in the ``TemplateApplicationDelegate`` using the [**Spezi HealthKit** module](https://github.com/StanfordSpezi/SpeziHealthKit).

@Row(numberOfColumns: 4) {
    @Column(size: 1) {
        @Image(source: "HealthKitAccess", alt: "HealthKit Onboarding Flow") {
            You can find and modify the HealthKit onboarding flow in the ``HealthKitPermissions`` view.
        }
    }
    @Column(size: 1) {
        @Image(source: "HealthKitSheet", alt: "Permissions screen of the HealthKit framework") {
            You can define which elements should be pulled from HealthKit in the ``TemplateApplicationDelegate``.
        }
    }
}

## Schedule & Questionnaires

The scheduler part of the application provides the functionality to schedule a recurring task and bind it to an action, e.g., displaying a questionnaire.
It uses the [**Spezi Scheduler**](https://github.com/StanfordSpezi/SpeziScheduler) and [**Spezi Questionnaire**](https://github.com/StanfordSpezi/SpeziQuestionnaire) modules to schedule the tasks as defined in the `TemplateApplicationScheduler`.

@Row(numberOfColumns: 4) {
    @Column(size: 1) {
        @Image(source: "Schedule", alt: "A screen displaying the Scheduler UI.") {
            The elements that are displayed as part of the schedule are defined in the ``TemplateApplicationScheduler`` and displayed using the ``ScheduleView`` and ``EventView``.
        }
    }
    @Column(size: 1) {
        @Image(source: "Notifications", alt: "Onboarding screen showing the Notifications permission screen.") {
            You can find and modify the scheduled tasks, including local notifications, by changing the configuration and setup in the ``TemplateApplicationScheduler``.
        }
    }
    @Column(size: 1) {
        @Image(source: "Questionnaire", alt: "A screen showing a questionnaire using ResearchKit.") {
            The questionnaire content is defined using the FHIR questionnaire information found in the `Resources` folder and defined by the ``TemplateApplicationScheduler``.
        }
    }
    @Column(size: 1) {
        @Image(source: "ScheduleComplete", alt: "The scheduler screen showing the completed UI") {
            The [**Spezi Scheduler**](https://github.com/StanfordSpezi/SpeziScheduler) module keeps track of the completion state and due dates of tasks and events.
        }
    }
}


## Additional Application

The [**Spezi Contacts** module](https://github.com/StanfordSpezi/SpeziContact) uses the contact-related views provided by Spezi. 
The application also gives credit to all dependencies in the Account Details. It uses the [**Spezi License** module](https://github.com/StanfordSpezi/SpeziLicense) to show a list of used Swift Packages.


@Row(numberOfColumns: 4) {
    @Column(size: 1) {
        @Image(source: "Contacts", alt: "A screen displaying the Contact UI.") {
            You can find and modify the contact information in the ``Contacts`` view.
        }
    }
    @Column(size: 1) {
        @Image(source: "License", alt: "License information to list all used Swift Packages") {
            You can investigate the [**Spezi License** module](https://github.com/StanfordSpezi/SpeziLicense) to learn how the application loads and displays the license information.
        }
    }
}
            


================================================
File: TemplateApplication/Supporting Files/TemplateApplication.docc/Setup.md
================================================
# Build And Run the Spezi Template Application

<!--
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

The Spezi Template Application is a fully functioning iOS application built using the [Stanford Spezi](https://spezi.stanford.edu) ecosystem that can be used as a starting point for creating your own iOS app. The following tutorial will walk you through the steps needed to configure your Mac to build and run the Spezi Template Application, after which you can customize it for your own project.

## 1. Install Xcode

Applications for the Apple ecosystem are written in the [Swift programming language](https://swift.org).
The framework for developing the user interface for mobile applications in Swift is called [SwiftUI](https://developer.apple.com/xcode/swiftui/).

You will need access to a macOS-based machine to build and run the Swift-based Spezi Template Application. Please ensure that your Mac meets the following criteria and that you install or update the software on your Mac accordingly.

### macOS - Sequoia 15.2 Or Newer

The Mac needs to run macOS Sequoia 15.2 or newer. Please [update to the latest operating system version following the Apple-provided instructions](https://support.apple.com/en-us/HT201541). You can verify that you run the latest macOS version by clicking on the Apple Logo on the top left of your screen and selecting "About this Mac". You can see the macOS version number in the specs list under your Mac picture.

### Xcode - 16.2 Or Newer

Xcode is the integrated development environment (IDE) that is required to build and run Swift-based iOS applications.
You need to have Xcode 16.2 or later installed. [You can install Xcode using the Mac AppStore](https://apps.apple.com/us/app/xcode/id497799835).

Please open Xcode and follow the instructions to finish the installation.

You can verify that you run the latest version of Xcode and everything is installed if you can see the "Welcome to Xcode" screen when you open Xcode, showing 16.2 or newer as the version number.

@Image(source: "Xcode", alt: "Screenshot showing the Welcome to Xcode window.")

You can learn more about Xcode, including [creating an Xcode project for an app](https://developer.apple.com/documentation/xcode/creating-an-xcode-project-for-an-app), information about the IDE interface by following the instructions on [creating your app's interface with SwiftUI](https://developer.apple.com/documentation/xcode/creating-your-app-s-interface-with-swiftui) & [Previewing your app's interface in Xcode](https://developer.apple.com/documentation/xcode/previewing-your-apps-interface-in-xcode).


## 2. Install Helper Tools

The Spezi Template Application provides a set of pre-configured tools that simplify app development and enforce best practices.

We provide a simple setup script that installs essential tools like [homebrew](https://brew.sh) (macOS package manager) and [git LFS](https://git-lfs.com) (Git extension for versioning large files).

The script also installs the [Google Firebase emulator and command line interface (CLI)](https://firebase.google.com/docs/cli) and all its dependencies, including Java and Node.js, letting you test cloud features locally without setting up a Firebase project.

You can simply run the script by opening up your macOS [Terminal](https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac) and executing the following command:

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/StanfordSpezi/SpeziTemplateApplication/HEAD/Scripts/setup.sh)"
```

> Tip: If you don't feel comfortable running the setup script, you can [inspect the script yourself](https://raw.githubusercontent.com/StanfordSpezi/SpeziTemplateApplication/HEAD/Scripts/setup.sh) and use the commands in the script to install the required software yourself selectively.


## 3. Set Up the Backend

As with most complex mobile applications, Stanford Spezi relies on a cloud-based backend to handle user authentication, data storage, and other services. [Google Firebase](https://firebase.google.com) is a managed backend cloud computing platform provided by Google that is pre-integrated with the Spezi Template Application.

> Tip: Although the Spezi Template Application is pre-integrated with Google Firebase, Spezi itself is independent of any cloud provider or platform! Spezi offers different modules to connect to cloud providers, including [Spezi Firebase](https://github.com/StanfordSpezi/SpeziFirebase), which is the cloud provider demonstrated in the Spezi Template Application.

There are two alternatives for testing the Spezi Template Application.

- A. Run the application without Firebase: This option disables all cloud-based functionality but allows for basic testing of local features.
- B. Use the Firebase Emulator Suite: This method emulates Firebase services locally on your Mac, providing a more complete testing environment that mimics cloud functionality.

> Important: These testing approaches are meant for development purposes only. For production deployment, you'll need to use an actual Firebase account. Stanford researchers can utilize the Stanford mHealth platform, Stanford's dedicated Firebase instance that supports many digital health projects.

### Alternative A: Test without Firebase

You can test the application without a backend if you enable the `--disableFirebase` feature flag, which is *enabled by default when opening the Xcode project*. This will disable all cloud-based functionality in the application, including user registration, sign in, and data upload. The login and account setup steps will therefore be skipped in this configuration.

> Tip: Feature flags can be configured in the [scheme editor in Xcode](https://help.apple.com/xcode/mac/11.4/index.html?localePath=en.lproj#/dev0bee46f46) and selecting your application scheme (default **TemplateApplication**), the **Run** configuration, and to switch to the **Arguments** tab to add, enable, disable, or remove arguments passed on launch.

@Image(source: "Scheme", alt: "Screenshot showing the application scheme Run configuration's launch arguments.")


### Alternative B: Set Up the Firebase Emulator Suite

The application also provides a [Firebase Firestore](https://firebase.google.com/docs/firestore)-based data upload mechanism and [Firebase Authentication](https://firebase.google.com/docs/auth) login & sign-up. If you wish to test this functionality, you will need to have the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) installed and running. This tool emulates a cloud-based backend on your Mac and does not require that you have a Firebase account to use.

The setup script described above installs the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite).

> Important: You do not have to make any modifications to the Firebase configuration, log into the `Firebase` CLI using your Google account, or create a project in Firebase to run, build, and test the application!

Navigate to the root folder of this setup containing your **.xcodeproj** file ([using `cd` in your terminal](https://tutorials.codebar.io/command-line/introduction/tutorial.html)) and start the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite) in your [Terminal](https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac) using
```bash
$ firebase emulators:start
```

@Image(source: "FirebaseCLI", alt: "Screenshot showing the terminal and the running Firebase Emulators.")

After the emulators have started up, you can open the web interface by navigating to `http://127.0.0.1:4000/` in your web browser. When you run the Spezi Template Application in the next step, you will be able to use the application and see data populating in the emulator.

@Image(source: "FirebaseWeb", alt: "Screenshot showing Safari and the Firebase Emulators web interface.")


## 4. Run the App

You can build and run the Spezi Template Application using [Xcode](https://developer.apple.com/xcode/) by opening up the **.xcodeproj** file in the root of the repository. Ensure that the `Run Destination` in the upper toolbar is set to an iOS simulator such as `iPhone 16 Pro (18.0)`.

For more information and details on how to run the app on other simulators or physical devices, please see [Building and running an app](https://developer.apple.com/documentation/xcode/building-and-running-an-app) in the official Apple documentation.

@Row(numberOfColumns: 4) {
    @Column(size: 3) {
        @Image(source: "Run", alt: "Press the run button in the upper left corner to run the app.") {
            Press the run button in the upper left corner to run the app.
        }
    }
    @Column {
        @Image(source: "Welcome", alt: "The Spezi Template Application running in the iOS Simulator.") {
            The Spezi Template Application running in the iOS Simulator.
        }
    }
}

> Tip: When building the application you may encounter a build error "Target 'SpeziAccountMacros' must be enabled before it can be used.'". This error can be addressed by clicking on the error message in the Issue Navigator and selecting the "Trust & Enable" option.

## 5. Modify The Application

Now that you have successfully built and run the Spezi Template Application on your Mac, you can start customizing the application for your project. Continue with the <doc:Modify> article to learn how to make common modifications to the Spezi Template Application.


### Firebase Cloud Setup

If you want to connect your project to a development or production Firebase cloud project, you can provide your [`GoogleService-Info.plist`](https://firebase.google.com/docs/ios/setup) in a base 64 representation in the [GitHub secrets](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions) (`GOOGLE_SERVICE_INFO_PLIST_BASE64`) of your project where it is picked up and loaded in the configured path setup in the [`beta-deployment.yml`] [GitHub Action](https://docs.github.com/en/actions) using the `googleserviceinfoplistpath` parameter that needs to be adapted to your project structure.

You can generate a base 64 representation of a file after you [navigated into the folder](https://en.wikipedia.org/wiki/Cd_(command)#Usage) where you have downloaded your [`GoogleService-Info.plist`](https://firebase.google.com/docs/ios/setup) file to.
```shell
base64 -i GoogleService-Info.plist
```

> Warning: We do **not recommend** to commit your Firebase secrets and configuration file to your project. While one can extract the file from the deployed application, we encourage open-source projects to make it clear to contributors to set up their own Firebase project if they plan to build and deploy a version of an open-source project.

The deployment requires you to store your Google service account JSON credentials in a base 64 representation in the `GOOGLE_APPLICATION_CREDENTIALS_BASE64`. You can learn more about how to generate the JSON in the [Firebase documentation](https://firebase.google.com/docs/app-distribution/authenticate-service-account). The service account must have the minimally required permissions (not the `Firebase App Distribution Admin` role) as documented at https://firebase.google.com/docs/projects/iam/roles-predefined for your deployment needs and setup.

Be sure to update your `.firebaserc` project name and placeholder `GoogleService-Info.plist` project identifier to always reflect the name of your project and all security rules to reflect any changes in your application.


### Other Configuration Options

The application also includes the following feature flags that can be configured in the [scheme editor in Xcode](https://help.apple.com/xcode/mac/11.4/index.html?localePath=en.lproj#/dev0bee46f46) and selecting your scheme, the **Run** configuration, and to switch to the **Arguments** tab to add, enable, disable, or remove the following arguments passed on launch:
- `--skipOnboarding`: Skips the onboarding flow to enable easier development of features in the application and to allow UI tests to skip the onboarding flow.
- `--showOnboarding`: Always show the onboarding when the application is launched. Makes it easy to modify and test the onboarding flow without the need to manually remove the application or reset the simulator.
- `--disableFirebase`: Disables the Firebase interactions, including the login/sign-up step and the Firebase Firestore upload.
- `--useFirebaseEmulator`: Defines if the application should connect to the local Firebase emulator. Always set to true when using the iOS simulator.

> Tip: You can learn how to add, modify, and remove feature flags that are passed to the application when it is started in the [Customizing the build schemes for a project](https://developer.apple.com/documentation/xcode/customizing-the-build-schemes-for-a-project#Specify-launch-arguments-and-environment-variables) tutorial in the [*Specify launch arguments and environment variables* section](https://developer.apple.com/documentation/xcode/customizing-the-build-schemes-for-a-project#Specify-launch-arguments-and-environment-variables).


================================================
File: TemplateApplication/Supporting Files/TemplateApplication.docc/TemplateApplication.md
================================================
# ``TemplateApplication``

<!--
#
# This source file is part of the Stanford Spezi Template Application open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Template to provide a starting point for Spezi-based applications.

## Overview

The Spezi Template Application demonstrates using the [Spezi](https://github.com/StanfordSpezi/Spezi) ecosystem and builds on top of the [Stanford Biodesign Digital Health Template Application](https://github.com/StanfordBDHG/TemplateApplication).

> Tip: Do you want to try out the Spezi Template Application? You can download it to your iOS device using [TestFlight](https://testflight.apple.com/join/ipEezBY1)!

The following screenshots show a wide variety of features based on Spezi Modules that are part of the Spezi Template Application.

@Row(numberOfColumns: 3) {
    @Column(size: 1) {
        @Image(source: "Welcome", alt: "A screen displaying welcome information.") {
            Welcome View.
        }
    }
    @Column(size: 1) {
        @Image(source: "InterestingModules", alt: "A screen showing an overview of the modules used in the Spezi Template Application.") {
            Interesting Modules
        }
    }
    @Column(size: 1) {
        @Image(source: "Consent", alt: "A screen displaying the consent view.") {
            Consent Signature.
        }
    }
}
@Row(numberOfColumns: 3) {
    @Column(size: 1) {
        @Image(source: "HealthKitAccess", alt: "HealthKit Onboarding Flow") {
            HealthKit Access.
        }
    }
    @Column(size: 1) {
        @Image(source: "HealthKitSheet", alt: "Permissions screen of the HealthKit framework") {
            Granular HealthKit Share Control.
        }
    }
    @Column(size: 1) {
        @Image(source: "Notifications", alt: "Onboarding screen showing the Notifications permission screen.") {
            Trigger Local Notifications.
        }
    }
}
@Row(numberOfColumns: 3) {
    @Column(size: 1) {
        @Image(source: "Schedule", alt: "A screen displaying the Scheduler UI.") {
            Schedule Tasks.
        }
    }
    @Column(size: 1) {
        @Image(source: "Questionnaire", alt: "A screen showing a questionnaire using ResearchKit.") {
            Display Questionnaires.
        }
    }
    @Column(size: 1) {
        @Image(source: "ScheduleComplete", alt: "The scheduler screen showing the completed UI") {
            Keep Track of Tasks.
        }
    }
}
@Row(numberOfColumns: 3) {
    @Column(size: 1) {
        @Image(source: "Contacts", alt: "A screen displaying the Contact UI.") {
            Contact Information.
        }
    }
    @Column(size: 1) {
        @Image(source: "Account", alt: "A screen displaying the current user account information.") {
            Account Overview.
        }
    }
    @Column(size: 1) {
        @Image(source: "License", alt: "License information to list all used Swift Packages") {
            License Information.
        }
    }
}

> Tip: You can find all the used Spezi Modules in the [Stanford Spezi GitHub Organization](https://github.com/StanfordSpezi).


================================================
File: fastlane/README.md
================================================
fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios test

```sh
[bundle exec] fastlane ios test
```

Build and test

### ios codeql

```sh
[bundle exec] fastlane ios codeql
```

CodeQL

### ios build

```sh
[bundle exec] fastlane ios build
```

Build app

### ios signin

```sh
[bundle exec] fastlane ios signin
```

Sign in to the App Store Connect API

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Publish a beta release to internal TestFlight testers

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).


