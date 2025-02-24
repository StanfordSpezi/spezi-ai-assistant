Directory structure:
└── stanfordspezi-spezifirebase/
    ├── README.md
    ├── CONTRIBUTORS.md
    ├── LICENSE.md
    └── Sources/
        ├── SpeziFirebaseAccount/
        │   └── SpeziFirebaseAccount.docc/
        │       └── SpeziFirebaseAccount.md
        ├── SpeziFirebaseAccountStorage/
        │   └── SpeziFirebaseAccountStorage.docc/
        │       └── SpeziFirebaseAccountStorage.md
        ├── SpeziFirebaseConfiguration/
        │   └── FirebaseConfiguration.docc/
        │       └── FirebaseConfiguration.md
        ├── SpeziFirebaseStorage/
        │   └── SpeziFirebaseStorage.docc/
        │       └── SpeziFirebaseStorage.md
        └── SpeziFirestore/
            └── SpeziFirestore.docc/
                └── SpeziFirestore.md

================================================
File: README.md
================================================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

# Spezi Firebase

[![Build and Test](https://github.com/StanfordSpezi/SpeziFirebase/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziFirebase/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziFirebase/branch/main/graph/badge.svg?token=LCRkf3e2lx)](https://codecov.io/gh/StanfordSpezi/SpeziFirebase)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7706899.svg)](https://doi.org/10.5281/zenodo.7706899)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziFirebase%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziFirebase)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziFirebase%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziFirebase)

Integrate Google Firebase services into your Spezi application.

## Overview

This Module allows you to use the [Google Firebase](https://firebase.google.com/) platform as a managed backend for
authentication and data storage in your apps built with the [Spezi framework](https://github.com/StanfordSpezi/Spezi).

We currently implement support for Authentication, Storage, and Firestore services.

## Setup

You need to add the Spezi Firebase Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> [!IMPORTANT]  
> If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup)#
    to set up the core Spezi infrastructure.


## Examples

The below section walks you through the necessary steps to set up the Spezi Firebase Module for your application.

### 1. Set up your Firebase Account

To connect your app to the Firebase cloud platform, you will need to first create an account at
[firebase.google.com](https://firebase.google.com) then start the process to
[register a new iOS app](https://firebase.google.com/docs/ios/setup).

Once your Spezi app is registered with Firebase, place the generated `GoogleService-Info.plist` configuration file
into the root of your Xcode project.
You do not need to add the Firebase SDKs to your app or initialize Firebase in your app,
since the Spezi Firebase Module will handle these tasks for you.

You can also install and run the Firebase Local Emulator Suite for local development.
To do this, please follow the [installation instructions](https://firebase.google.com/docs/emulator-suite/install_and_configure).

### 2. Add Spezi Firebase as a Dependency

First, you will need to add the SpeziFirebase Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

### 3. Register the Spezi Firebase Modules

In the example below, we configure our Spezi application to use Firebase Authentication with both email & password login
and Sign in With Apple, and Cloud Firestore for data storage.

```swift
import Spezi
import SpeziAccount
import SpeziFirebaseAccount
import SpeziFirebaseStorage
import SpeziFirestore
import SwiftUI


class ExampleDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            AccountConfiguration(configuration: [
                .requires(\.userId),
                .collects(\.name)
            ])
            Firestore()
            FirebaseAccountConfiguration[
                authenticationMethods: [.emailAndPassword, .signInWithApple]
            ]
        }
    }
}
```

For more information, please refer to the [API documentation](https://swiftpackageindex.com/StanfordSpezi/SpeziFirebase/documentation).


## The Spezi Template Application

The Spezi Firebase Module comes pre-configured in the [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication),
which is a great way to get started on your Spezi Application.


## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.


## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziFirebase/tree/main/LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterLight.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterDark.png#gh-dark-mode-only)


================================================
File: CONTRIBUTORS.md
================================================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

Spezi Firebase contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Philipp Zagar](https://github.com/philippzagar)

================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================================================
File: Sources/SpeziFirebaseAccount/SpeziFirebaseAccount.docc/SpeziFirebaseAccount.md
================================================
# ``SpeziFirebaseAccount``

<!--

This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

Firebase Auth support for SpeziAccount.

## Overview

This Module adds support for Firebase Auth for SpeziAccount by implementing an
 [`AccountService`](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/accountservice).

Configure the account service by supplying it to the
 [`AccountConfiguration`](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/accountconfiguration).

> Note: For more information refer to the 
[Account Configuration](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/initial-setup#Account-Configuration) article.

```swift
import SpeziAccount
import SpeziFirebaseAccount

class ExampleAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            AccountConfiguration(
                service: FirebaseAccountService()
                configuration: [/* ... */]
            )
        }
    }
}
```

> Note: Use the ``FirebaseAccountService/init(providers:emulatorSettings:passwordValidation:)`` to customize the enabled
    ``FirebaseAuthProviders`` or supplying Firebase Auth emulator settings.

## Topics

### Configuration

- ``FirebaseAccountService``
- ``FirebaseAuthProviders``

### Account Details

- ``SpeziAccount/AccountDetails/creationDate``
- ``SpeziAccount/AccountDetails/lastSignInDate``

### Errors

- ``FirebaseAccountError``



================================================
File: Sources/SpeziFirebaseAccountStorage/SpeziFirebaseAccountStorage.docc/SpeziFirebaseAccountStorage.md
================================================
# ``SpeziFirebaseAccountStorage``

<!--

This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

Store additional account details directly in Firestore.

## Overview

Certain account services, like the account services provided by Firebase, can only store certain account details.
The ``FirestoreAccountStorage`` can be used to store additional account details, that are not supported out of the box by your account services,
inside Firestore in a custom user collection.

> Important: The `FirestoreAccountStorage` uses the [`accountId`](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/accountdetails/accountid)
  of the user for the document identifier. When using the `FirebaseAccountService`, this is the primary, firebase user identifier. Make sure to configure your firestore security rules respectively.

To configure Firestore as your external storage provider, just supply the ``FirestoreAccountStorage`` as an argument to the `AccountConfiguration`.

> Note: For more information refer to the
 [Account Configuration](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/initial-setup#Account-Configuration) article.

The example below illustrates a configuration example, setting up the `FirebaseAccountService` in combination with the `FirestoreAccountStorage` provider.

```swift
import Spezi
import SpeziAccount
import SpeziFirebase
import SpeziFirebaseAccount
import SpeziFirebaseAccountStorage

class ExampleAppDelegate: SpeziAppDelegate {
override var configuration: Configuration {
    Configuration {
        AccountConfiguration(
            service: FirebaseAccountService(),
            storageProvider: FirestoreAccountStorage(storeIn: Firestore.firestore().collection("users"))
            configuration: [/* ... */]
        )
    }
}
```

> Important: In order to use the `FirestoreAccountStorage`, you must have [`Firestore`](https://swiftpackageindex.com/stanfordspezi/spezifirebase/main/documentation/spezifirestore/firestore)
    configured in your app. Refer to the documentation page for more information.

## Topics

### Configuration

- ``FirestoreAccountStorage``


================================================
File: Sources/SpeziFirebaseConfiguration/FirebaseConfiguration.docc/FirebaseConfiguration.md
================================================
# ``SpeziFirebaseConfiguration``

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Configure the Firebase application.

## Overview

The `FirebaseApp.configure()` method will be called upon configuration of the ``ConfigureFirebaseApp`` `Module`.

Use the `@Dependency` property wrapper to define a dependency on this module and ensure that `FirebaseApp.configure()` is called before any
other Firebase-related modules and to ensure it is called exactly once.

```swift
import Spezi
import SpeziFirebaseConfiguration

public final class MyFirebaseModule: Module {
    @Dependency(ConfigureFirebaseApp.self)
    private var configureFirebaseApp
}
```


================================================
File: Sources/SpeziFirebaseStorage/SpeziFirebaseStorage.docc/SpeziFirebaseStorage.md
================================================
# ``SpeziFirebaseStorage``

<!--

This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

Firebase Storage related components.

## Overview

Configures the Firebase Storage that can then be used within any application via `Storage.storage()`.

The ``FirebaseStorageConfiguration`` can be used to connect to the Firebase Storage emulator:
```
class ExampleAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            FirebaseStorageConfiguration(emulatorSettings: (host: "localhost", port: 9199))
            // ...
        }
    }
}
```

## Topics

### Configuration

- ``FirebaseStorageConfiguration``


================================================
File: Sources/SpeziFirestore/SpeziFirestore.docc/SpeziFirestore.md
================================================
# ``SpeziFirestore``

<!--

This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

Easily configure and interact with Firebase Firestore.

## Overview

The ``Firestore`` module allows for easy configuration of Firebase Firestore.

You can configure the `Firestore` module in the `SpeziAppDelegate`, e.g. the configure it using the Firebase emulator.
```swift
import SpeziFirestore

class FirestoreExampleDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            Firestore(settings: .emulator)
            // ...
        }
    }
}
```

## Topics

### Configuration

- ``Firestore``
- ``FirebaseFirestoreInternal/FirestoreSettings/emulator``

### Document Reference

- ``FirebaseFirestoreInternal/DocumentReference/setData(from:encoder:)``
- ``FirebaseFirestoreInternal/DocumentReference/setData(from:merge:encoder:)``
- ``FirebaseFirestoreInternal/DocumentReference/setData(from:mergeFields:encoder:)``

### Errors

- ``FirestoreError``


