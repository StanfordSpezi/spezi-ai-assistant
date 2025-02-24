This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

================================================================
Directory Structure
================================================================
.github/
  workflows/
    build-and-test.yml
    markdown-lint-check.yml
    pull_request.yml
LICENSES/
  MIT.txt
Sources/
  SpeziFirebaseAccount/
    Keys/
      AccountDetails+FirebaseMetdata.swift
    Models/
      FirebaseAccountError.swift
      FirebaseAccountModel.swift
      ReauthenticationContext.swift
      ReauthenticationOperationResult.swift
      ValidationRule+FirebasePassword.swift
    Resources/
      Localizable.xcstrings
      Localizable.xcstrings.license
    SpeziFirebaseAccount.docc/
      SpeziFirebaseAccount.md
    Utils/
      CryptoUtils.swift
      StorageKeys.swift
    Views/
      FirebaseAccountModifier.swift
      FirebaseAnonymousSignInButton.swift
      FirebaseLoginView.swift
      FirebaseSecurityAlert.swift
      FirebaseSignInWithAppleButton.swift
    FirebaseAccountService.swift
    FirebaseAuthProviders.swift
  SpeziFirebaseAccountStorage/
    SpeziFirebaseAccountStorage.docc/
      SpeziFirebaseAccountStorage.md
    FirestoreAccountStorage.swift
  SpeziFirebaseConfiguration/
    FirebaseConfiguration.docc/
      FirebaseConfiguration.md
    ConfigureFirebaseApp.swift
  SpeziFirebaseStorage/
    SpeziFirebaseStorage.docc/
      SpeziFirebaseStorage.md
    FirebaseStorageConfiguration.swift
  SpeziFirestore/
    Resources/
      Localizable.xcstrings
      Localizable.xcstrings.license
    SpeziFirestore.docc/
      SpeziFirestore.md
    DocumentReference+AsyncAwait.swift
    Firestore.swift
    FirestoreError.swift
    FirestoreSettings+Emulator.swift
Tests/
  SpeziFirebaseTests/
    SpeziFirebaseTests.swift
  UITests/
    TestApp/
      Assets.xcassets/
        AccentColor.colorset/
          Contents.json
          Contents.json.license
        AppIcon.appiconset/
          Contents.json
          Contents.json.license
        Contents.json
        Contents.json.license
      FirebaseAccountStorage/
        BiographyKey.swift
      FirebaseAccountTests/
        FirebaseAccountTestsView.swift
      FirebaseStorageTests/
        FirebaseStorageTestsView.swift
      FirestoreDataStorageTests/
        FirestoreDataStorageTests.swift
      Shared/
        FeatureFlags.swift
        TestAppDelegate.swift
        TestAppType.swift
      GoogleService-Info.plist
      GoogleService-Info.plist.license
      Info.plist
      Info.plist.license
      TestApp.entitlements
      TestApp.entitlements.license
      TestApp.swift
    TestAppUITests/
      FirebaseAccountStorageTests.swift
      FirebaseAccountTests.swift
      FirebaseClient.swift
      FirebaseStorageTests.swift
      FirestoreDataStorageTests.swift
      Info.plist
      Info.plist.license
    UITests.xcodeproj/
      project.xcworkspace/
        xcshareddata/
          swiftpm/
            Package.resolved.license
          IDEWorkspaceChecks.plist
          IDEWorkspaceChecks.plist.license
        contents.xcworkspacedata
        contents.xcworkspacedata.license
      xcshareddata/
        xcschemes/
          TestApp.xcscheme
          TestApp.xcscheme.license
      project.pbxproj
      project.pbxproj.license
      TestApp.xctestplan
      TestApp.xctestplan.license
    .firebaserc
    .firebaserc.license
    .gitignore
    firebase.json
    firebase.json.license
    firebasestorage.rules
    firebasestorage.rules.license
.gitignore
.spi.yml
.swiftlint.yml
CITATION.cff
CONTRIBUTORS.md
LICENSE.md
Package.swift
README.md

================================================================
Files
================================================================

================
File: .github/workflows/build-and-test.yml
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

name: Build and Test

on:
  push:
    branches:
      - main
  pull_request:
  workflow_dispatch:

jobs:
  buildandtest:
    name: Build and Test Swift Package
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      artifactname: SpeziFirebase-Package.xcresult
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziFirebase-Package
  buildandtestuitests:
    name: Build and Test UI Tests
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      artifactname: UITests.xcresult
      runsonlabels: '["macOS", "self-hosted"]'
      setupfirebaseemulator: true
      path: Tests/UITests
      customcommand: |
          firebase emulators:exec 'set -o pipefail && xcodebuild test -project UITests.xcodeproj -scheme TestApp -destination "platform=iOS Simulator,name=iPhone 16 Pro" -resultBundlePath UITests.xcresult -derivedDataPath ".derivedData" CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO -skipPackagePluginValidation -skipMacroValidation | xcbeautify'
  uploadcoveragereport:
    name: Upload Coverage Report
    needs: [buildandtest, buildandtestuitests]
    uses: StanfordSpezi/.github/.github/workflows/create-and-upload-coverage-report.yml@v2
    with:
      coveragereports: SpeziFirebase-Package.xcresult UITests.xcresult
    secrets:
      token: ${{ secrets.CODECOV_TOKEN }}

================
File: .github/workflows/markdown-lint-check.yml
================
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

name: Monthly Markdown Link Check

on:
  # Runs at midnight on the first of every month
  schedule:
    - cron: "0 0 1 * *"

jobs:
  markdown_link_check:
    name: Markdown Link Check
    uses: StanfordBDHG/.github/.github/workflows/markdown-link-check.yml@v2

================
File: .github/workflows/pull_request.yml
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

name: Pull Request

on:
  pull_request:
  workflow_dispatch:

jobs:
  reuse_action:
    name: REUSE Compliance Check
    uses: StanfordSpezi/.github/.github/workflows/reuse.yml@v2
  swiftlint:
    name: SwiftLint
    uses: StanfordSpezi/.github/.github/workflows/swiftlint.yml@v2
  markdown_link_check:
    name: Markdown Link Check
    uses: StanfordBDHG/.github/.github/workflows/markdown-link-check.yml@v2

================
File: LICENSES/MIT.txt
================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================
File: Sources/SpeziFirebaseAccount/Keys/AccountDetails+FirebaseMetdata.swift
================
    private struct CreationDateKey: KnowledgeSource {
    private struct LastSignInDateKey: KnowledgeSource {
    public var creationDate: Date? {
    public var lastSignInDate: Date? {

================
File: Sources/SpeziFirebaseAccount/Models/FirebaseAccountError.swift
================
public enum FirebaseAccountError {
    private var errorDescriptionValue: String.LocalizationValue {
    public var errorDescription: String? {
    private var recoverySuggestionValue: String.LocalizationValue {
    public var recoverySuggestion: String? {

================
File: Sources/SpeziFirebaseAccount/Models/FirebaseAccountModel.swift
================
class FirebaseAccountModel {
    var authorizationController: AuthorizationController?
    var isPresentingReauthentication = false
    var reauthenticationContext: ReauthenticationContext?
    nonisolated init() {}
    func reauthenticateUser(userId: String) async -> ReauthenticationResult {

================
File: Sources/SpeziFirebaseAccount/Models/ReauthenticationContext.swift
================
enum ReauthenticationResult {
struct ReauthenticationContext {
    let userId: String
    let continuation: CheckedContinuation<ReauthenticationResult, Never>

================
File: Sources/SpeziFirebaseAccount/Models/ReauthenticationOperationResult.swift
================
struct ReauthenticationOperation {
    enum Result {
    let result: Result
    let credential: ASAuthorizationAppleIDCredential?
    private init(result: Result, credential: ASAuthorizationAppleIDCredential? = nil) {
    static var cancelled: ReauthenticationOperation {
    static var success: ReauthenticationOperation {
    static func success(with credential: ASAuthorizationAppleIDCredential) -> ReauthenticationOperation {

================
File: Sources/SpeziFirebaseAccount/Models/ValidationRule+FirebasePassword.swift
================
    static var minimumFirebasePassword: ValidationRule {

================
File: Sources/SpeziFirebaseAccount/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "Anonymous Signup" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anonym Registrieren"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anonymous Signup"
          }
        }
      }
    },
    "Authentication Required" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bestätigung Erforderlich"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Authentication Required"
          }
        }
      }
    },
    "Cancel" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Abbrechen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Cancel"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_ALREADY_IN_USE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Benutzerkonto existiert bereits"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Account already exists"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_ALREADY_IN_USE_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ein Benutzerkonto mit dieser E-Mail Adresse existiert bereits. Bitte loggen dich mit dem Account ein."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "An account with this email already exists. Please login using your email and password."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_DEFAULT_PASSWORD_RULE_ERROR %lld" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Dein Passwort muss mindestens %lld Zeichen lang sein."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Your password must be at least %lld characters long."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_ERROR_INVALID_EMAIL" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Inkorrekte E-Mail Adresse"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Invalid email address"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_ERROR_INVALID_EMAIL_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte gebe eine korrekte E-Mail Adresse ein."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please enter a valid email address."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_FAILED_PASSWORD_RESET" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Zurücksetzten des Passworts fehlgeschlagen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Failed to reset password"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_FAILED_PASSWORD_RESET_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Es ist ein Fehler aufgetreten bei dem Versuch Ihr Passwort zurückzusetzen. Bitte versuche es später erneut."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "There was an issue delivering the password reset email. Please try again."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_INVALID_CREDENTIALS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ungültige Zugangsdaten"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Invalid Credentials"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_INVALID_CREDENTIALS_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte überprüfe die eingegebene E-Mail Adresse und dein Passwort."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please verify that your email and password are correct."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_LINK_FAILED_ALREADY_IN_USE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Verbinden der Anmeldedaten fehlgeschlagen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Failed to link account"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_LINK_FAILED_ALREADY_IN_USE_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Die Zugangsdaten sind bereits mit einem anderen Konto verbunden."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The credentials are already used with a different account."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_LINK_FAILED_DUPLICATE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Verbinden der Anmeldedaten fehlgeschlagen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Failed to link account"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_LINK_FAILED_DUPLICATE_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Es sind bereits Zugangsdaten dieser Art mit dem Benutzerkonto verbunden."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This type of account provider is already linked to this account."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_REQUIRE_RECENT_LOGIN_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anfrage fehlgeschlagen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Couldn't complete operation"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_REQUIRE_RECENT_LOGIN_ERROR_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Diese Anfrage is sicherheitsrelevant und erfordert einen kürzlichen Login."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This is a security relevant operation that requires a recent login."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_SETUP_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anfrage fehlgeschlagen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Could not complete account operation"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_SETUP_ERROR_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bei der Anfrage für dein Benutzerkonto ist ein Fehler aufgetreten. Bitte versuche es später erneut."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "There was an internal error when trying to perform the account operation. Please try again later."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_SIGN_IN_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nicht eingeloggt"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Not signed in"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_SIGN_IN_ERROR_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Die Anfrage konnte nicht ausgeführt werden weil kein verknüpftes Benutzerkonto gefunden wurde."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Couldn't complete this operation as there is no current user account."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_UNKNOWN" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anfrage fehlgeschlagen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Failed account operation"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_UNKNOWN_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte überprüfen deine Internet Verbindung und versuche es erneut."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please check your internet connection and try again."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_UNSUPPORTED_PROVIDER_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anbieter nicht unterstützt"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unsupported Provider"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_UNSUPPORTED_PROVIDER_ERROR_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Es wurde kein unterstützer Anbieter gefunden, um deine Identität zu bestätigen."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Found an unsupported provider when trying to re-authenticate."
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_WEAK_PASSWORD" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Schwaches Passwort"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Weak Password"
          }
        }
      }
    },
    "FIREBASE_ACCOUNT_WEAK_PASSWORD_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte gebe ein stärkeres Password ein."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please choose a safer password."
          }
        }
      }
    },
    "FIREBASE_APPLE_FAILED" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Mit Apple anmelden ist fehlgeschlagen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Sign in with Apple failed"
          }
        }
      }
    },
    "FIREBASE_APPLE_FAILED_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Wir hatten Probleme dich mit Apple anzumelden. Bitte versuche es später erneut."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "We had issues completing your Sign in with Apple request. Please try again later."
          }
        }
      }
    },
    "Login" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anmelden"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Login"
          }
        }
      }
    },
    "Please enter your password for %@." : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte bestätige dein Passwort für %@."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please enter your password for %@."
          }
        }
      }
    }
  },
  "version" : "1.0"
}

================
File: Sources/SpeziFirebaseAccount/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi Template Application project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: Sources/SpeziFirebaseAccount/SpeziFirebaseAccount.docc/SpeziFirebaseAccount.md
================
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

================
File: Sources/SpeziFirebaseAccount/Utils/CryptoUtils.swift
================
enum CryptoUtils {
    static func randomNonceString(length: Int) -> String {
        let nonceCharacters = (0 ..< length).map { _ in
            let num = Int.random(in: 48...122) // .random(in:) is secure, see https://stackoverflow.com/a/76722233
    static func sha256(_ input: String) -> String {

================
File: Sources/SpeziFirebaseAccount/Utils/StorageKeys.swift
================
enum StorageKeys {
    static let activeAccountService = "active-service.firebase.stanford.edu"
    static let emailPasswordCredentials = "account.email-pw.firebase.stanford.edu"

================
File: Sources/SpeziFirebaseAccount/Views/FirebaseAccountModifier.swift
================
struct FirebaseAccountModifier: ViewModifier {
    static let logger = Logger(subsystem: "edu.stanford.spezi.firebase", category: "FirebaseAccount")
    private var authorizationController
    private var firebaseModel
    nonisolated init() {}
    func body(content: Content) -> some View {

================
File: Sources/SpeziFirebaseAccount/Views/FirebaseAnonymousSignInButton.swift
================
struct FirebaseAnonymousSignInButton: View {
    private var service
    private var colorScheme
    @State private var viewState: ViewState = .idle
    private var color: Color {
    var body: some View {
    nonisolated init() {}

================
File: Sources/SpeziFirebaseAccount/Views/FirebaseLoginView.swift
================
struct FirebaseLoginView: View {
    private var service
    var body: some View {
    nonisolated init() {}

================
File: Sources/SpeziFirebaseAccount/Views/FirebaseSecurityAlert.swift
================
public struct FirebaseSecurityAlert: ViewModifier {
    private var firebaseModel: FirebaseAccountModel
    @ValidationState private var validation
    @State private var password: String = ""
    @State private var isActive = false
    @MainActor private var isPresented: Binding<Bool> {
    @MainActor private var context: ReauthenticationContext? {
    nonisolated init() {}
    public func body(content: Content) -> some View {
    let model = FirebaseAccountModel()
            let password = await model.reauthenticateUser(userId: "lelandstandford@stanford.edu")

================
File: Sources/SpeziFirebaseAccount/Views/FirebaseSignInWithAppleButton.swift
================
struct FirebaseSignInWithAppleButton: View {
    private var service
    private var colorScheme
    @State private var viewState: ViewState = .idle
    var body: some View {
    nonisolated init() {}

================
File: Sources/SpeziFirebaseAccount/FirebaseAccountService.swift
================
private enum InitialUserState {
    func canSkipStateChange(for user: User?) -> Bool {
private enum UserChange {
private struct UserUpdate {
    static var removed: UserUpdate {
    let change: UserChange
    var authResult: AuthDataResult?
    init(change: UserChange, authResult: AuthDataResult? = nil) {
    init(from authResult: AuthDataResult) {
    func describesSameUpdate(as update: UserUpdate) -> Bool {
public final class FirebaseAccountService: AccountService { // swiftlint:disable:this type_body_length
    private static let supportedAccountKeys = AccountKeyCollection {
    private var logger
    private var configureFirebaseApp
    private var localStorage
    private var keychainStorage
    private var account
    private var notifications
    private var externalStorage
    public let configuration: AccountServiceConfiguration
    private let emulatorSettings: (host: String, port: Int)?
    private var loginWithPassword = FirebaseLoginView()
    private var anonymousSignup = FirebaseAnonymousSignInButton()
    private var signInWithApple = FirebaseSignInWithAppleButton()
    @SecurityRelatedModifier public var securityAlert = FirebaseSecurityAlert()
    @Model private var firebaseModel = FirebaseAccountModel()
    @Modifier private var firebaseModifier = FirebaseAccountModifier()
    @MainActor private var authStateDidChangeListenerHandle: AuthStateDidChangeListenerHandle?
    @MainActor private var lastNonce: String?
    private var shouldQueue = false
    private var queuedUpdates: [UserUpdate] = []
    private var actionSemaphore = AsyncSemaphore()
    private var initiallyObservedState: InitialUserState = .unknown
    private var unsupportedKeys: AccountKeyCollection {
        var unsupportedKeys = account.configuration.keys
    public init(
    public func configure() {
        let subscription = externalStorage.updatedDetails
    public func login(userId: String, password: String) async throws {
            let result = try await Auth.auth().signIn(withEmail: userId, password: password)
    public func signUpAnonymously() async throws {
            let result = try await Auth.auth().signInAnonymously()
    public func signUp(with signupDetails: AccountDetails) async throws {
                let previousDisplayName = currentUser.displayName
                let credential = EmailAuthProvider.credential(withEmail: signupDetails.userId, password: password)
                let result = try await currentUser.link(with: credential)
            let authResult = try await Auth.auth().createUser(withEmail: signupDetails.userId, password: password)
    public func signUp(with credential: OAuthCredential) async throws {
            let authResult = try await Auth.auth().signIn(with: credential)
    private func ensureSignedOutBeforeLogin() throws {
    public func resetPassword(userId: String) async throws {
    public func logout() async throws {
    public func delete() async throws {
        let result = try await reauthenticateUser(user: currentUser) // delete requires a recent sign in
    public func updateAccountDetails(_ modifications: AccountModifications) async throws {
            let result = try await reauthenticateUser(user: currentUser)
        var externalModifications = modifications
    private func reauthenticateUser(user: User) async throws -> ReauthenticationOperation {
    private func reauthenticateUserPassword(user: User) async throws -> ReauthenticationOperation {
        let passwordQuery = await firebaseModel.reauthenticateUser(userId: userId)
    private func reauthenticateUserApple(user: User) async throws -> ReauthenticationOperation {
        let credential = try oAuthCredential(from: appleIdCredential)
    private func updateDisplayName(of user: User, _ name: PersonNameComponents) async throws {
    private func updateDisplayName(of user: User, _ name: String) async throws {
        let changeRequest = user.createProfileChangeRequest()
    private func checkForInitialUserAccount() {
        var details = buildUser(user, isNewUser: false)
    private func handleStateDidChange(auth: Auth, user: User?) {
    private func handleUpdatedDetailsFromExternalStorage(for accountId: String, details: AccountDetails) async {
        let consideredNewUser = account.details?.isNewUser ?? false
        let details = buildUser(user, isNewUser: consideredNewUser, mergeWith: details)
    func onAppleSignInRequest(request: ASAuthorizationAppleIDRequest) {
        let nonce = CryptoUtils.randomNonceString(length: 32)
        var requestedScopes: [ASAuthorization.Scope] = [.email]
        let nameRequirement = account.configuration.name?.requirement
    func onAppleSignInCompletion(result: Result<ASAuthorization, any Error>) async throws {
    private func requestAppleSignInCredential() async throws -> ASAuthorizationAppleIDCredential? {
        let appleIDProvider = ASAuthorizationAppleIDProvider()
        let request = appleIDProvider.createRequest()
    private func performRequest(_ request: ASAuthorizationAppleIDRequest) async throws -> ASAuthorizationResult? {
    private func oAuthCredential(from credential: ASAuthorizationAppleIDCredential) throws -> OAuthCredential {
    private static nonisolated func resetLegacyStorage(_ keychainStorage: KeychainStorage, _ localStorage: LocalStorage, _ logger: Logger) {
    private func dispatchFirebaseAuthAction(action: () async throws -> Void) async throws {
    private func dispatchFirebaseAuthAction(action: () async throws -> AuthDataResult) async throws {
    private func dispatchFirebaseAuthAction(action: () async throws -> UserUpdate) async throws {
    private func _dispatchFirebaseAuthAction(
        let update = try await mapFirebaseAccountError(action: action)
    private func mapFirebaseAccountError<T: Sendable>(action: () async throws -> T) async rethrows -> T {
    private func mapFirebaseAccountError<T>(action: () throws -> T) rethrows -> T {
    private func _firebaseAccountMapError(_ error: any Error) throws -> Never {
        let nsError = error as NSError
    private func handleUpdatedUserState(user: User?) async {
        let update = UserUpdate(change: change)
    private func dispatchQueuedChanges(update: UserUpdate? = nil) async {
    private func apply(_ update: UserUpdate) async {
            let wasAnonymous = account.details?.isAnonymous == true
            let isNewUser = wasAnonymous || update.authResult?.additionalUserInfo?.isNewUser ?? false
    private func buildUser(_ user: User, isNewUser: Bool, mergeWith additionalDetails: AccountDetails? = nil) -> AccountDetails {
        var details = AccountDetails()
    private func buildUserQueryingStorageProvider(user: User, isNewUser: Bool) async -> AccountDetails {
        var details = buildUser(user, isNewUser: isNewUser)
        let unsupportedKeys = unsupportedKeys
            let externalDetails = await externalStorage.retrieveExternalStorage(for: details.accountId, unsupportedKeys)
    func notifyUserSignIn(user: User, isNewUser: Bool = false) async {
        let details = await buildUserQueryingStorageProvider(user: user, isNewUser: isNewUser)
    func notifyUserRemoval() {
    private func requestExternalStorage(for accountId: String, details: AccountDetails) async throws {
        var externallyStoredDetails = details

================
File: Sources/SpeziFirebaseAccount/FirebaseAuthProviders.swift
================
public struct FirebaseAuthProviders: OptionSet, Codable, Sendable {
    public static let emailAndPassword = FirebaseAuthProviders(rawValue: 1 << 0)
    public static let signInWithApple = FirebaseAuthProviders(rawValue: 1 << 1)
    public static let anonymousButton = FirebaseAuthProviders(rawValue: 1 << 2)
    public let rawValue: Int
    public init(rawValue: Int) {

================
File: Sources/SpeziFirebaseAccountStorage/SpeziFirebaseAccountStorage.docc/SpeziFirebaseAccountStorage.md
================
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

================
File: Sources/SpeziFirebaseAccountStorage/FirestoreAccountStorage.swift
================
private struct AccountDetailsConfiguration: DecodingConfigurationProviding, EncodingConfigurationProviding {
    @TaskLocal static var decodingConfiguration = AccountDetails.DecodingConfiguration(keys: [])
    @TaskLocal static var encodingConfiguration = AccountDetails.EncodingConfiguration()
private struct AccountDetailsWrapper: Codable {
    let details: AccountDetails
    init(details: AccountDetails) {
    init(from decoder: any Decoder) throws {
    func encode(to encoder: any Encoder) throws {
public actor FirestoreAccountStorage: AccountStorageProvider {
    private var logger
    private var firestore
    private var externalStorage
    private var localCache
    private let collection: @Sendable () -> CollectionReference
    private let identifierMapping: [String: any AccountKey.Type]? // swiftlint:disable:this discouraged_optional_collection
    private var listenerRegistrations: [String: any ListenerRegistration] = [:]
    private var registeredKeys: [String: [ObjectIdentifier: any AccountKey.Type]] = [:]
    public init(
    private nonisolated func userDocument(for accountId: String) -> DocumentReference {
    private func snapshotListener(for accountId: String, with keys: [any AccountKey.Type]) {
        let document = userDocument(for: accountId)
    private func processUpdatedSnapshot(for accountId: String, _ snapshot: DocumentSnapshot) async {
        let details = buildAccountDetails(from: snapshot, keys: Array(keys))
        let localCache = localCache
    private func buildAccountDetails(from snapshot: DocumentSnapshot, keys: [any AccountKey.Type]) -> AccountDetails {
        let decoder = Firestore.Decoder()
        let configuration = AccountDetails.DecodingConfiguration(keys: keys, identifierMapping: identifierMapping)
    public func load(_ accountId: String, _ keys: [any AccountKey.Type]) async -> AccountDetails? {
        let cached = await localCache.loadEntry(for: accountId, keys)
    public func store(_ accountId: String, _ modifications: SpeziAccount.AccountModifications) async throws {
        let batch = Firestore.firestore().batch()
            let encoder = Firestore.Encoder()
            let configuration = AccountDetails.EncodingConfiguration(identifierMapping: identifierMapping)
                let wrapper = AccountDetailsWrapper(details: modifications.modifiedDetails)
                let encoded = try encoder.encode(wrapper)
        let removedFields: [String: Any] = modifications.removedAccountDetails.keys.reduce(into: [:]) { result, key in
    public func disassociate(_ accountId: String) async {
    public func delete(_ accountId: String) async throws {

================
File: Sources/SpeziFirebaseConfiguration/FirebaseConfiguration.docc/FirebaseConfiguration.md
================
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

================
File: Sources/SpeziFirebaseConfiguration/ConfigureFirebaseApp.swift
================
public final class ConfigureFirebaseApp: Module, DefaultInitializable {
    public init() {}
    public func configure() {

================
File: Sources/SpeziFirebaseStorage/SpeziFirebaseStorage.docc/SpeziFirebaseStorage.md
================
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

================
File: Sources/SpeziFirebaseStorage/FirebaseStorageConfiguration.swift
================
public final class FirebaseStorageConfiguration: Module, DefaultInitializable {
    private var configureFirebaseApp
    private let emulatorSettings: (host: String, port: Int)?
    public required convenience init() {
    public init(
    public func configure() {

================
File: Sources/SpeziFirestore/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "FIRESTORE_ERROR_ABORTED" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der Vorgang wurde abgebrochen, typischerweise aufgrund eines Nebenläufigkeitsproblems wie Transaktionsabbrüchen usw."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The operation was aborted, typically due to a concurrency issue like transaction aborts, etc."
          }
        }
      }
    },
    "FIRESTORE_ERROR_ALREADYEXISTS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ein Dokument, das wir erstellen wollten, existiert bereits."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Some document that we attempted to create already exists."
          }
        }
      }
    },
    "FIRESTORE_ERROR_CANCELLED" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der Vorgang wurde abgebrochen (typischerweise vom Aufrufer)."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The operation was cancelled (typically by the caller)."
          }
        }
      }
    },
    "FIRESTORE_ERROR_DATALOSS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unwiederbringlicher Datenverlust oder Beschädigung."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unrecoverable data loss or corruption."
          }
        }
      }
    },
    "FIRESTORE_ERROR_DEADLINEEXCEEDED" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Die Frist ist abgelaufen, bevor der Vorgang abgeschlossen werden konnte. Bei Vorgängen, die den Systemzustand ändern, kann dieser Fehler zurückgegeben werden, auch wenn der Vorgang erfolgreich abgeschlossen wurde. Zum Beispiel könnte eine erfolgreiche Antwort von einem Server so lange verzögert worden sein, dass die Frist abgelaufen ist."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Deadline expired before operation could complete. For operations that change the state of the system, this error may be returned even if the operation has completed successfully. For example, a successful response from a server could have been delayed long enough for the deadline to expire."
          }
        }
      }
    },
    "FIRESTORE_ERROR_DECODINGFIELDCONFLICT %@" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Feldkonflikt während der Dekodierung: %@"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Field conflict during the decoding: %@"
          }
        }
      }
    },
    "FIRESTORE_ERROR_DECODINGNOTSUPPORTED %@" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Dekodierung wird nicht unterstützt: %@"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Decoding is not supported: %@"
          }
        }
      }
    },
    "FIRESTORE_ERROR_ENCODINGNOTSUPPORTED %@" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Kodierung wird nicht unterstützt: %@"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Encoding is not supported: %@"
          }
        }
      }
    },
    "FIRESTORE_ERROR_FAILEDPRECONDITION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der Vorgang wurde abgelehnt, weil das System nicht im für die Ausführung des Vorgangs erforderlichen Zustand ist."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Operation was rejected because the system is not in a state required for the operation's execution."
          }
        }
      }
    },
    "FIRESTORE_ERROR_INTERNAL" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Interne Fehler. Das bedeutet, dass einige von dem zugrunde liegenden System erwartete Invarianten verletzt wurden. Wenn Sie einen dieser Fehler sehen, ist etwas sehr kaputt."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Internal errors. Means some invariants expected by underlying system has been broken. If you see one of these errors, something is very broken."
          }
        }
      }
    },
    "FIRESTORE_ERROR_INVALIDARGUMENT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der Client hat ein ungültiges Argument angegeben. Beachten Sie, dass dies sich von FailedPrecondition unterscheidet. InvalidArgument weist auf Argumente hin, die unabhängig vom Systemzustand problematisch sind (z. B. ein ungültiger Feldname)."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Client specified an invalid argument. Note that this differs from FailedPrecondition. InvalidArgument indicates arguments that are problematic regardless of the state of the system (e.g., an invalid field name)."
          }
        }
      }
    },
    "FIRESTORE_ERROR_NOTFOUND" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ein angefordertes Dokument wurde nicht gefunden."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Some requested document was not found."
          }
        }
      }
    },
    "FIRESTORE_ERROR_OUTOFRANGE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der Vorgang wurde außerhalb des gültigen Bereichs versucht."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Operation was attempted past the valid range."
          }
        }
      }
    },
    "FIRESTORE_ERROR_PERMISSIONDENIED" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der Anrufer hat keine Berechtigung, den angegebenen Vorgang auszuführen."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The caller does not have permission to execute the specified operation."
          }
        }
      }
    },
    "FIRESTORE_ERROR_RESOURCEEXHAUSTED" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Eine Ressource ist erschöpft, vielleicht ein Benutzerkontingent oder vielleicht ist das gesamte Dateisystem voll."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space."
          }
        }
      }
    },
    "FIRESTORE_ERROR_UNAUTHENTICATED" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Die Anfrage verfügt nicht über gültige Authentifizierungsdaten für den Vorgang."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The request does not have valid authentication credentials for the operation."
          }
        }
      }
    },
    "FIRESTORE_ERROR_UNAVAILABLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der Dienst ist derzeit nicht verfügbar. Dies ist höchstwahrscheinlich ein vorübergehender Zustand und kann durch erneutes Versuchen mit einer Verzögerung korrigiert werden."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The service is currently unavailable. This is a most likely a transient condition and may be corrected by retrying with a backoff."
          }
        }
      }
    },
    "FIRESTORE_ERROR_UNIMPLEMENTED" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der Vorgang ist nicht implementiert oder nicht aktiviert/unterstützt."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Operation is not implemented or not supported/enabled."
          }
        }
      }
    },
    "FIRESTORE_ERROR_UNKNOWN" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unbekannter Fehler oder ein Fehler aus einem anderen Fehlerdomäne."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unknown error or an error from a different error domain."
          }
        }
      }
    }
  },
  "version" : "1.0"
}

================
File: Sources/SpeziFirestore/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi Template Application project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: Sources/SpeziFirestore/SpeziFirestore.docc/SpeziFirestore.md
================
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

================
File: Sources/SpeziFirestore/DocumentReference+AsyncAwait.swift
================
private struct FirestoreCompletion: Sendable {
    private static var logger: Logger {
    private let continuation: UnsafeContinuation<Void, any Error>
    private let resumed: ManagedAtomic<Bool>
    private init(continuation: UnsafeContinuation<Void, any Error>) {
    static func perform(
            let completion = FirestoreCompletion(continuation: continuation)
    func complete(
    public func setData<T: Encodable>(
            let encoded = try encoder.encode(value)

================
File: Sources/SpeziFirestore/Firestore.swift
================
public class Firestore: Module, DefaultInitializable {
    private var configureFirebaseApp
    private let settings: FirestoreSettings
    public required convenience init() {
    public init(settings: FirestoreSettings) {
    public func configure() {

================
File: Sources/SpeziFirestore/FirestoreError.swift
================
public enum FirestoreError: LocalizedError {
    private var errorDescriptionValue: String.LocalizationValue {
    public var errorDescription: String? {
        let nsError = error as NSError

================
File: Sources/SpeziFirestore/FirestoreSettings+Emulator.swift
================
    public static var emulator: FirestoreSettings {
        let settings = FirestoreSettings()

================
File: Tests/SpeziFirebaseTests/SpeziFirebaseTests.swift
================
final class SpeziFirebaseTests: XCTestCase {
    func testSpeziFirebase() throws {

================
File: Tests/UITests/TestApp/Assets.xcassets/AccentColor.colorset/Contents.json
================
{
  "colors" : [
    {
      "idiom" : "universal"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}

================
File: Tests/UITests/TestApp/Assets.xcassets/AccentColor.colorset/Contents.json.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/Assets.xcassets/AppIcon.appiconset/Contents.json
================
{
  "images" : [
    {
      "idiom" : "universal",
      "platform" : "ios",
      "size" : "1024x1024"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}

================
File: Tests/UITests/TestApp/Assets.xcassets/AppIcon.appiconset/Contents.json.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/Assets.xcassets/Contents.json
================
{
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}

================
File: Tests/UITests/TestApp/Assets.xcassets/Contents.json.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/FirebaseAccountStorage/BiographyKey.swift
================
    var biography: String?

================
File: Tests/UITests/TestApp/FirebaseAccountTests/FirebaseAccountTestsView.swift
================
struct FirebaseAccountTestsView: View {
    var account
    private var testModel
    @State var viewState: ViewState = .idle
    @State var showSetup = false
    @State var showOverview = false
    @State private var accountIdFromAnonymousUser: String?
    var body: some View {
    private func accountHeader(for details: AccountDetails) -> some View {

================
File: Tests/UITests/TestApp/FirebaseStorageTests/FirebaseStorageTestsView.swift
================
struct FirebaseStorageTestsView: View {
    @State private var viewState: ViewState = .idle
    var body: some View {
    private func uploadFile() {
                let ref = Storage.storage().reference().child("test.txt")
                let metadata = StorageMetadata()

================
File: Tests/UITests/TestApp/FirestoreDataStorageTests/FirestoreDataStorageTests.swift
================
struct FirestoreDataStorageTestsView: View {
    @State private var viewState: ViewState = .idle
    @State private var element = TestAppType()
    var body: some View {
    private func uploadElement() {
    private func mergeElement() {
    private func deleteElement() {

================
File: Tests/UITests/TestApp/Shared/FeatureFlags.swift
================
enum FeatureFlags {
    static let accountStorageTests = ProcessInfo.processInfo.arguments.contains("--account-storage")

================
File: Tests/UITests/TestApp/Shared/TestAppDelegate.swift
================
final class AccountTestModel {
    var accountUponConfigure = false
    init() {}
class TestAppDelegate: SpeziAppDelegate {
    private class InitialUserCheck: Module {
        private var account
        private var service
        @Model var model = AccountTestModel()
        func configure() {
    private class Logout: Module {
        private var logger
    override var configuration: Configuration {
            let configuration: AccountValueConfiguration = FeatureFlags.accountStorageTests
            let service = FirebaseAccountService(

================
File: Tests/UITests/TestApp/Shared/TestAppType.swift
================
struct TestAppType: Identifiable, Codable, Sendable {
    var id: String
    var content: String
    init(id: String = "", content: String = "") {

================
File: Tests/UITests/TestApp/GoogleService-Info.plist
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CLIENT_ID</key>
	<string>CLIENT_ID</string>
	<key>REVERSED_CLIENT_ID</key>
	<string>REVERSED_CLIENT_ID</string>
	<key>API_KEY</key>
	<string>API_KEY</string>
	<key>GCM_SENDER_ID</key>
	<string>GCM_SENDER_ID</string>
	<key>PLIST_VERSION</key>
	<string>1</string>
	<key>BUNDLE_ID</key>
	<string>edu.stanford.spezi.firebase.testapp</string>
	<key>PROJECT_ID</key>
	<string>spezifirebaseuitests</string>
	<key>STORAGE_BUCKET</key>
	<string>STORAGE_BUCKET</string>
	<key>IS_ADS_ENABLED</key>
	<false/>
	<key>IS_ANALYTICS_ENABLED</key>
	<false/>
	<key>IS_APPINVITE_ENABLED</key>
	<true/>
	<key>IS_GCM_ENABLED</key>
	<true/>
	<key>IS_SIGNIN_ENABLED</key>
	<true/>
	<key>GOOGLE_APP_ID</key>
	<string>1:123456789012:ios:1234567890123456789012</string>
</dict>
</plist>

================
File: Tests/UITests/TestApp/GoogleService-Info.plist.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/Info.plist
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>UIApplicationSceneManifest</key>
	<dict>
		<key>UIApplicationSupportsMultipleScenes</key>
		<false/>
		<key>UISceneConfigurations</key>
		<dict/>
	</dict>
</dict>
</plist>

================
File: Tests/UITests/TestApp/Info.plist.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/TestApp.entitlements
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.developer.applesignin</key>
	<array>
		<string>Default</string>
	</array>
</dict>
</plist>

================
File: Tests/UITests/TestApp/TestApp.entitlements.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/TestApp.swift
================
struct UITestsApp: App {
    enum Tests: String, CaseIterable, Identifiable {
        var id: RawValue {
        func view(withNavigationPath path: Binding<NavigationPath>) -> some View {
    var appDelegate
    @State private var path = NavigationPath()
    var body: some Scene {

================
File: Tests/UITests/TestAppUITests/FirebaseAccountStorageTests.swift
================
final class FirebaseAccountStorageTests: XCTestCase {
    override func setUp() {
    override func setUp() async throws {
    func testAdditionalAccountStorage() async throws {
        let app = XCUIApplication()
        let alert = "Are you sure you want to delete your account?"
        let accountsNew = try await FirebaseClient.getAllAccounts()

================
File: Tests/UITests/TestAppUITests/FirebaseAccountTests.swift
================
final class FirebaseAccountTests: XCTestCase { // swiftlint:disable:this type_body_length
    override func setUp() async throws {
    func testAccountSignUp() async throws {
        let app = XCUIApplication()
        var accounts = try await FirebaseClient.getAllAccounts()
    func testAccountLogin() async throws {
        let accounts = try await FirebaseClient.getAllAccounts()
    func testAccountLogout() async throws {
        let logoutButtons = app.buttons.matching(identifier: "Logout").allElementsBoundByIndex
        let alert = "Are you sure you want to logout?"
        let accounts2 = try await FirebaseClient.getAllAccounts()
    func testAccountRemoval() async throws {
        let alert = "Are you sure you want to delete your account?"
        let accountsNew = try await FirebaseClient.getAllAccounts()
    func testAccountEdit() async throws {
        let newAccounts = try await FirebaseClient.getAllAccounts()
    private func passwordChangeBase() async throws {
    func testPasswordChange() async throws {
    func testPasswordChangeWrong() async throws {
    func testPasswordChangeCancel() async throws {
    func testPasswordReset() async throws {
        let fields = app.textFields.matching(identifier: "E-Mail Address").allElementsBoundByIndex
    func testInvalidCredentials() async throws {
    func testBasicSignInWithApple() async throws {
    func testSignupAccountLinking() throws {
    func testAccountReadyUponStartup() async throws {
    func login(username: String, password: String, close: Bool = true) throws {
    func signup(username: String, password: String, givenName: String, familyName: String, biography: String? = nil) throws {

================
File: Tests/UITests/TestAppUITests/FirebaseClient.swift
================
struct FirestoreAccount: Decodable, Equatable {
    enum CodingKeys: String, CodingKey {
    let email: String
    let displayName: String
    let providerIds: [String]
    init(email: String, displayName: String, providerIds: [String] = ["password"]) {
    init(from decoder: Decoder) throws {
        let container: KeyedDecodingContainer<FirestoreAccount.CodingKeys> = try decoder.container(
        struct ProviderUserInfo: Decodable {
            let providerId: String
enum FirebaseClient {
    private static let projectId = "spezifirebaseuitests"
    static func deleteAllAccounts() async throws {
        let emulatorDocumentsURL = try XCTUnwrap(
        var request = URLRequest(url: emulatorDocumentsURL)
    static func getAllAccounts() async throws -> [FirestoreAccount] {
        let emulatorAccountsURL = try XCTUnwrap(
        var request = URLRequest(url: emulatorAccountsURL)
        struct ResponseWrapper: Decodable {
            let userInfo: [FirestoreAccount]
    static func createAccount(email: String, password: String, displayName: String) async throws {

================
File: Tests/UITests/TestAppUITests/FirebaseStorageTests.swift
================
final class FirebaseStorageTests: XCTestCase {
    struct FirebaseStorageItem: Decodable {
        let name: String
        let bucket: String
    override func setUp() async throws {
    func testFirebaseStorageFileUpload() async throws {
        let app = XCUIApplication()
        var documents = try await Self.getAllFiles()
    private static func getAllFiles() async throws -> [FirebaseStorageItem] {
        let documentsURL = try XCTUnwrap(
        struct ResponseWrapper: Decodable {
            let items: [FirebaseStorageItem]
    private static func deleteAllFiles() async throws {
            let url = try XCTUnwrap(
            var request = URLRequest(url: url)

================
File: Tests/UITests/TestAppUITests/FirestoreDataStorageTests.swift
================
final class FirestoreDataStorageTests: XCTestCase {
    private struct FirestoreElement: Decodable, Equatable {
        let name: String
        let fields: [String: [String: String]]
        init(name: String, fields: [String: [String: String]]) {
        init(id: String, content: String) {
        subscript(dynamicMember member: String) -> [String: String] {
    override func setUp() async throws {
    func testFirestoreAdditions() async throws {
        let app = XCUIApplication()
        var documents = try await Self.getAllDocuments()
    func testFirestoreMerge() async throws {
    func testFirestoreUpdate() async throws {
    func testFirestoreDelete() async throws {
    private func add(id: String, content: String) throws {
    private func merge(id: String, content: String) throws {
    private func remove(id: String, content: String) throws {
    private func enterFirestoreElement(id: String, content: String) throws {
        let identifierTextFieldIdentifier = "Enter the element's identifier."
        let contentFieldIdentifier = "Enter the element's optional content."
    private static func deleteAllDocuments() async throws {
        let emulatorDocumentsURL = try XCTUnwrap(
        var request = URLRequest(url: emulatorDocumentsURL)
    private static func getAllDocuments() async throws -> [FirestoreElement] {
        let documentsURL = try XCTUnwrap(
        struct ResponseWrapper: Decodable {
            let documents: [FirestoreElement]

================
File: Tests/UITests/TestAppUITests/Info.plist
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
	</dict>
</dict>
</plist>

================
File: Tests/UITests/TestAppUITests/Info.plist.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/UITests.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/UITests.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>IDEDidComputeMac32BitWarning</key>
	<true/>
</dict>
</plist>

================
File: Tests/UITests/UITests.xcodeproj/project.xcworkspace/xcshareddata/IDEWorkspaceChecks.plist.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/UITests.xcodeproj/project.xcworkspace/contents.xcworkspacedata
================
<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
      location = "self:">
   </FileRef>
</Workspace>

================
File: Tests/UITests/UITests.xcodeproj/project.xcworkspace/contents.xcworkspacedata.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/UITests.xcodeproj/xcshareddata/xcschemes/TestApp.xcscheme
================
<?xml version="1.0" encoding="UTF-8"?>
<Scheme
   LastUpgradeVersion = "1610"
   version = "1.7">
   <BuildAction
      parallelizeBuildables = "YES"
      buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "2F6D139128F5F384007C25D6"
               BuildableName = "TestApp.app"
               BlueprintName = "TestApp"
               ReferencedContainer = "container:UITests.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "NO"
            buildForProfiling = "NO"
            buildForArchiving = "NO"
            buildForAnalyzing = "NO">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "SpeziFirebaseConfiguration"
               BuildableName = "SpeziFirebaseConfiguration"
               BlueprintName = "SpeziFirebaseConfiguration"
               ReferencedContainer = "container:../..">
            </BuildableReference>
         </BuildActionEntry>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "NO"
            buildForProfiling = "NO"
            buildForArchiving = "YES"
            buildForAnalyzing = "NO">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "SpeziFirestore"
               BuildableName = "SpeziFirestore"
               BlueprintName = "SpeziFirestore"
               ReferencedContainer = "container:../..">
            </BuildableReference>
         </BuildActionEntry>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "NO"
            buildForProfiling = "NO"
            buildForArchiving = "NO"
            buildForAnalyzing = "NO">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "SpeziFirebaseAccount"
               BuildableName = "SpeziFirebaseAccount"
               BlueprintName = "SpeziFirebaseAccount"
               ReferencedContainer = "container:../..">
            </BuildableReference>
         </BuildActionEntry>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "NO"
            buildForProfiling = "NO"
            buildForArchiving = "NO"
            buildForAnalyzing = "NO">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "SpeziFirebaseAccountStorage"
               BuildableName = "SpeziFirebaseAccountStorage"
               BlueprintName = "SpeziFirebaseAccountStorage"
               ReferencedContainer = "container:../..">
            </BuildableReference>
         </BuildActionEntry>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "NO"
            buildForProfiling = "NO"
            buildForArchiving = "NO"
            buildForAnalyzing = "NO">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "SpeziFirebaseStorage"
               BuildableName = "SpeziFirebaseStorage"
               BlueprintName = "SpeziFirebaseStorage"
               ReferencedContainer = "container:../..">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES">
      <TestPlans>
         <TestPlanReference
            reference = "container:UITests.xcodeproj/TestApp.xctestplan"
            default = "YES">
         </TestPlanReference>
      </TestPlans>
      <Testables>
         <TestableReference
            skipped = "NO"
            parallelizable = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "2F6D13AB28F5F386007C25D6"
               BuildableName = "TestAppUITests.xctest"
               BlueprintName = "TestAppUITests"
               ReferencedContainer = "container:UITests.xcodeproj">
            </BuildableReference>
         </TestableReference>
      </Testables>
   </TestAction>
   <LaunchAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      launchStyle = "0"
      useCustomWorkingDirectory = "NO"
      ignoresPersistentStateOnLaunch = "NO"
      debugDocumentVersioning = "YES"
      debugServiceExtension = "internal"
      allowLocationSimulation = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "2F6D139128F5F384007C25D6"
            BuildableName = "TestApp.app"
            BlueprintName = "TestApp"
            ReferencedContainer = "container:UITests.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
      <CommandLineArguments>
         <CommandLineArgument
            argument = "--account-storage"
            isEnabled = "YES">
         </CommandLineArgument>
      </CommandLineArguments>
      <LocationScenarioReference
         identifier = "com.apple.dt.IDEFoundation.CurrentLocationScenarioIdentifier"
         referenceType = "1">
      </LocationScenarioReference>
   </LaunchAction>
   <ProfileAction
      buildConfiguration = "Release"
      shouldUseLaunchSchemeArgsEnv = "YES"
      savedToolIdentifier = ""
      useCustomWorkingDirectory = "NO"
      debugDocumentVersioning = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "2F6D139128F5F384007C25D6"
            BuildableName = "TestApp.app"
            BlueprintName = "TestApp"
            ReferencedContainer = "container:UITests.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </ProfileAction>
   <AnalyzeAction
      buildConfiguration = "Debug">
   </AnalyzeAction>
   <ArchiveAction
      buildConfiguration = "Release"
      revealArchiveInOrganizer = "YES">
   </ArchiveAction>
</Scheme>

================
File: Tests/UITests/UITests.xcodeproj/xcshareddata/xcschemes/TestApp.xcscheme.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/UITests.xcodeproj/project.pbxproj
================
// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 77;
	objects = {

/* Begin PBXBuildFile section */
		2F148C00298BB15900031B7F /* FirebaseAccountTestsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F148BFF298BB15900031B7F /* FirebaseAccountTestsView.swift */; };
		2F2E4B8429749C5900FF710F /* FirestoreDataStorageTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F2E4B8329749C5900FF710F /* FirestoreDataStorageTests.swift */; };
		2F6D139A28F5F386007C25D6 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 2F6D139928F5F386007C25D6 /* Assets.xcassets */; };
		2F746D9F29962B2A00BF54FE /* XCTestExtensions in Frameworks */ = {isa = PBXBuildFile; productRef = 2F746D9E29962B2A00BF54FE /* XCTestExtensions */; };
		2F87F9F12953EEB400810247 /* GoogleService-Info.plist in Resources */ = {isa = PBXBuildFile; fileRef = 2F87F9F02953EEB400810247 /* GoogleService-Info.plist */; };
		2F8A431729130BBC005D2B8F /* TestAppType.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F8A431629130BBC005D2B8F /* TestAppType.swift */; };
		2F8CE161298C2C6D003799A8 /* FirebaseAccountTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F8CE160298C2C6D003799A8 /* FirebaseAccountTests.swift */; };
		2F9F07F129090B0500CDC598 /* TestAppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F9F07F029090B0500CDC598 /* TestAppDelegate.swift */; };
		2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA7382B290ADFAA007ACEB9 /* TestApp.swift */; };
		2FB07593299DF96E00C0B37F /* SpeziFirebaseAccount in Frameworks */ = {isa = PBXBuildFile; productRef = 2FB07592299DF96E00C0B37F /* SpeziFirebaseAccount */; };
		2FB07595299DF96E00C0B37F /* SpeziFirebaseConfiguration in Frameworks */ = {isa = PBXBuildFile; productRef = 2FB07594299DF96E00C0B37F /* SpeziFirebaseConfiguration */; };
		2FB07597299DF96E00C0B37F /* SpeziFirestore in Frameworks */ = {isa = PBXBuildFile; productRef = 2FB07596299DF96E00C0B37F /* SpeziFirestore */; };
		2FE62C3D2966074F00FCBE7F /* FirestoreDataStorageTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE62C3C2966074F00FCBE7F /* FirestoreDataStorageTests.swift */; };
		97359F642ADB27500080CB11 /* FirebaseStorageTestsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 97359F632ADB27500080CB11 /* FirebaseStorageTestsView.swift */; };
		978DFE922ADB1E1600E2B9B5 /* SpeziFirebaseStorage in Frameworks */ = {isa = PBXBuildFile; productRef = 978DFE912ADB1E1600E2B9B5 /* SpeziFirebaseStorage */; };
		978E198E2ADB40A300732324 /* FirebaseStorageTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 978E198D2ADB40A300732324 /* FirebaseStorageTests.swift */; };
		A95D60D02AA35E2200EB5968 /* FirebaseClient.swift in Sources */ = {isa = PBXBuildFile; fileRef = A95D60CF2AA35E2200EB5968 /* FirebaseClient.swift */; };
		A9D83F992B0BDB13000D0C78 /* FeatureFlags.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9D83F982B0BDB13000D0C78 /* FeatureFlags.swift */; };
		A9D83F9B2B0BDB1D000D0C78 /* BiographyKey.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9D83F9A2B0BDB1D000D0C78 /* BiographyKey.swift */; };
		A9D83F9D2B0BDB3A000D0C78 /* FirebaseAccountStorageTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9D83F9C2B0BDB3A000D0C78 /* FirebaseAccountStorageTests.swift */; };
		A9D83F9F2B0BDCC7000D0C78 /* SpeziFirebaseAccountStorage in Frameworks */ = {isa = PBXBuildFile; productRef = A9D83F9E2B0BDCC7000D0C78 /* SpeziFirebaseAccountStorage */; };
/* End PBXBuildFile section */

/* Begin PBXContainerItemProxy section */
		2F6D13AD28F5F386007C25D6 /* PBXContainerItemProxy */ = {
			isa = PBXContainerItemProxy;
			containerPortal = 2F6D138A28F5F384007C25D6 /* Project object */;
			proxyType = 1;
			remoteGlobalIDString = 2F6D139128F5F384007C25D6;
			remoteInfo = Example;
		};
/* End PBXContainerItemProxy section */

/* Begin PBXFileReference section */
		2F01E8CE291493560089C46B /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist; path = Info.plist; sourceTree = "<group>"; };
		2F148BFF298BB15900031B7F /* FirebaseAccountTestsView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FirebaseAccountTestsView.swift; sourceTree = "<group>"; };
		2F2E4B8329749C5900FF710F /* FirestoreDataStorageTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FirestoreDataStorageTests.swift; sourceTree = "<group>"; };
		2F6D139228F5F384007C25D6 /* TestApp.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = TestApp.app; sourceTree = BUILT_PRODUCTS_DIR; };
		2F6D139928F5F386007C25D6 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		2F6D13AC28F5F386007C25D6 /* TestAppUITests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = TestAppUITests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		2F7B6CB4294C03C800FDC494 /* TestApp.xctestplan */ = {isa = PBXFileReference; lastKnownFileType = text; name = TestApp.xctestplan; path = UITests.xcodeproj/TestApp.xctestplan; sourceTree = "<group>"; };
		2F87F9F02953EEB400810247 /* GoogleService-Info.plist */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.xml; path = "GoogleService-Info.plist"; sourceTree = "<group>"; };
		2F8A431629130BBC005D2B8F /* TestAppType.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TestAppType.swift; sourceTree = "<group>"; };
		2F8CE160298C2C6D003799A8 /* FirebaseAccountTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FirebaseAccountTests.swift; sourceTree = "<group>"; };
		2F9F07F029090B0500CDC598 /* TestAppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TestAppDelegate.swift; sourceTree = "<group>"; };
		2FA43E8E2AE022A4009B1B2C /* TestApp.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = TestApp.entitlements; sourceTree = "<group>"; };
		2FA7382B290ADFAA007ACEB9 /* TestApp.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TestApp.swift; sourceTree = "<group>"; };
		2FB926E42974B0FC008E7B03 /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist; path = Info.plist; sourceTree = "<group>"; };
		2FC42FD7290ADD5E00B08F18 /* SpeziFirebase */ = {isa = PBXFileReference; lastKnownFileType = wrapper; name = SpeziFirebase; path = ../..; sourceTree = "<group>"; };
		2FE62C3C2966074F00FCBE7F /* FirestoreDataStorageTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FirestoreDataStorageTests.swift; sourceTree = "<group>"; };
		97359F632ADB27500080CB11 /* FirebaseStorageTestsView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = FirebaseStorageTestsView.swift; sourceTree = "<group>"; };
		978E198D2ADB40A300732324 /* FirebaseStorageTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FirebaseStorageTests.swift; sourceTree = "<group>"; };
		A95D60CF2AA35E2200EB5968 /* FirebaseClient.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FirebaseClient.swift; sourceTree = "<group>"; };
		A9D83F982B0BDB13000D0C78 /* FeatureFlags.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = FeatureFlags.swift; sourceTree = "<group>"; };
		A9D83F9A2B0BDB1D000D0C78 /* BiographyKey.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = BiographyKey.swift; sourceTree = "<group>"; };
		A9D83F9C2B0BDB3A000D0C78 /* FirebaseAccountStorageTests.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = FirebaseAccountStorageTests.swift; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		2F6D138F28F5F384007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				A9D83F9F2B0BDCC7000D0C78 /* SpeziFirebaseAccountStorage in Frameworks */,
				2FB07595299DF96E00C0B37F /* SpeziFirebaseConfiguration in Frameworks */,
				2FB07597299DF96E00C0B37F /* SpeziFirestore in Frameworks */,
				978DFE922ADB1E1600E2B9B5 /* SpeziFirebaseStorage in Frameworks */,
				2FB07593299DF96E00C0B37F /* SpeziFirebaseAccount in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A928F5F386007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2F746D9F29962B2A00BF54FE /* XCTestExtensions in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		2F148BFE298BB14100031B7F /* FirebaseAccountTests */ = {
			isa = PBXGroup;
			children = (
				2F148BFF298BB15900031B7F /* FirebaseAccountTestsView.swift */,
			);
			path = FirebaseAccountTests;
			sourceTree = "<group>";
		};
		2F6D138928F5F384007C25D6 = {
			isa = PBXGroup;
			children = (
				2F7B6CB4294C03C800FDC494 /* TestApp.xctestplan */,
				2FC42FD7290ADD5E00B08F18 /* SpeziFirebase */,
				2F6D139428F5F384007C25D6 /* TestApp */,
				2F6D13AF28F5F386007C25D6 /* TestAppUITests */,
				2F6D139328F5F384007C25D6 /* Products */,
				2F6D13C228F5F3BE007C25D6 /* Frameworks */,
			);
			sourceTree = "<group>";
		};
		2F6D139328F5F384007C25D6 /* Products */ = {
			isa = PBXGroup;
			children = (
				2F6D139228F5F384007C25D6 /* TestApp.app */,
				2F6D13AC28F5F386007C25D6 /* TestAppUITests.xctest */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		2F6D139428F5F384007C25D6 /* TestApp */ = {
			isa = PBXGroup;
			children = (
				2FA43E8E2AE022A4009B1B2C /* TestApp.entitlements */,
				2FA7382B290ADFAA007ACEB9 /* TestApp.swift */,
				2F148BFE298BB14100031B7F /* FirebaseAccountTests */,
				A9D83FA02B0BE01F000D0C78 /* FirebaseAccountStorage */,
				2FE62C3B2966071400FCBE7F /* FirestoreDataStorageTests */,
				97359F622ADB27430080CB11 /* FirebaseStorageTests */,
				2F9F07ED29090AF500CDC598 /* Shared */,
				2F6D139928F5F386007C25D6 /* Assets.xcassets */,
				2F01E8CE291493560089C46B /* Info.plist */,
				2F87F9F02953EEB400810247 /* GoogleService-Info.plist */,
			);
			path = TestApp;
			sourceTree = "<group>";
		};
		2F6D13AF28F5F386007C25D6 /* TestAppUITests */ = {
			isa = PBXGroup;
			children = (
				A9D83F9C2B0BDB3A000D0C78 /* FirebaseAccountStorageTests.swift */,
				2F8CE160298C2C6D003799A8 /* FirebaseAccountTests.swift */,
				A95D60CF2AA35E2200EB5968 /* FirebaseClient.swift */,
				978E198D2ADB40A300732324 /* FirebaseStorageTests.swift */,
				2F2E4B8329749C5900FF710F /* FirestoreDataStorageTests.swift */,
				2FB926E42974B0FC008E7B03 /* Info.plist */,
			);
			path = TestAppUITests;
			sourceTree = "<group>";
		};
		2F6D13C228F5F3BE007C25D6 /* Frameworks */ = {
			isa = PBXGroup;
			children = (
			);
			name = Frameworks;
			sourceTree = "<group>";
		};
		2F9F07ED29090AF500CDC598 /* Shared */ = {
			isa = PBXGroup;
			children = (
				A9D83F982B0BDB13000D0C78 /* FeatureFlags.swift */,
				2F8A431629130BBC005D2B8F /* TestAppType.swift */,
				2F9F07F029090B0500CDC598 /* TestAppDelegate.swift */,
			);
			path = Shared;
			sourceTree = "<group>";
		};
		2FE62C3B2966071400FCBE7F /* FirestoreDataStorageTests */ = {
			isa = PBXGroup;
			children = (
				2FE62C3C2966074F00FCBE7F /* FirestoreDataStorageTests.swift */,
			);
			path = FirestoreDataStorageTests;
			sourceTree = "<group>";
		};
		97359F622ADB27430080CB11 /* FirebaseStorageTests */ = {
			isa = PBXGroup;
			children = (
				97359F632ADB27500080CB11 /* FirebaseStorageTestsView.swift */,
			);
			path = FirebaseStorageTests;
			sourceTree = "<group>";
		};
		A9D83FA02B0BE01F000D0C78 /* FirebaseAccountStorage */ = {
			isa = PBXGroup;
			children = (
				A9D83F9A2B0BDB1D000D0C78 /* BiographyKey.swift */,
			);
			path = FirebaseAccountStorage;
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		2F6D139128F5F384007C25D6 /* TestApp */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 2F6D13B628F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestApp" */;
			buildPhases = (
				2F6D138E28F5F384007C25D6 /* Sources */,
				2F6D138F28F5F384007C25D6 /* Frameworks */,
				2F6D139028F5F384007C25D6 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = TestApp;
			packageProductDependencies = (
				2FB07592299DF96E00C0B37F /* SpeziFirebaseAccount */,
				2FB07594299DF96E00C0B37F /* SpeziFirebaseConfiguration */,
				2FB07596299DF96E00C0B37F /* SpeziFirestore */,
				978DFE912ADB1E1600E2B9B5 /* SpeziFirebaseStorage */,
				A9D83F9E2B0BDCC7000D0C78 /* SpeziFirebaseAccountStorage */,
			);
			productName = Example;
			productReference = 2F6D139228F5F384007C25D6 /* TestApp.app */;
			productType = "com.apple.product-type.application";
		};
		2F6D13AB28F5F386007C25D6 /* TestAppUITests */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 2F6D13BC28F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestAppUITests" */;
			buildPhases = (
				2F6D13A828F5F386007C25D6 /* Sources */,
				2F6D13A928F5F386007C25D6 /* Frameworks */,
				2F6D13AA28F5F386007C25D6 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
				2F6D13AE28F5F386007C25D6 /* PBXTargetDependency */,
			);
			name = TestAppUITests;
			packageProductDependencies = (
				2F746D9E29962B2A00BF54FE /* XCTestExtensions */,
			);
			productName = ExampleUITests;
			productReference = 2F6D13AC28F5F386007C25D6 /* TestAppUITests.xctest */;
			productType = "com.apple.product-type.bundle.ui-testing";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		2F6D138A28F5F384007C25D6 /* Project object */ = {
			isa = PBXProject;
			attributes = {
				BuildIndependentTargetsInParallel = 1;
				LastSwiftUpdateCheck = 1410;
				LastUpgradeCheck = 1610;
				TargetAttributes = {
					2F6D139128F5F384007C25D6 = {
						CreatedOnToolsVersion = 14.1;
					};
					2F6D13AB28F5F386007C25D6 = {
						CreatedOnToolsVersion = 14.1;
						TestTargetID = 2F6D139128F5F384007C25D6;
					};
				};
			};
			buildConfigurationList = 2F6D138D28F5F384007C25D6 /* Build configuration list for PBXProject "UITests" */;
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = 2F6D138928F5F384007C25D6;
			packageReferences = (
				2F746D9D29962B2A00BF54FE /* XCRemoteSwiftPackageReference "XCTestExtensions" */,
			);
			preferredProjectObjectVersion = 77;
			productRefGroup = 2F6D139328F5F384007C25D6 /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				2F6D139128F5F384007C25D6 /* TestApp */,
				2F6D13AB28F5F386007C25D6 /* TestAppUITests */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		2F6D139028F5F384007C25D6 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2F6D139A28F5F386007C25D6 /* Assets.xcassets in Resources */,
				2F87F9F12953EEB400810247 /* GoogleService-Info.plist in Resources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13AA28F5F386007C25D6 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		2F6D138E28F5F384007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2F148C00298BB15900031B7F /* FirebaseAccountTestsView.swift in Sources */,
				2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */,
				2FE62C3D2966074F00FCBE7F /* FirestoreDataStorageTests.swift in Sources */,
				2F8A431729130BBC005D2B8F /* TestAppType.swift in Sources */,
				2F9F07F129090B0500CDC598 /* TestAppDelegate.swift in Sources */,
				A9D83F992B0BDB13000D0C78 /* FeatureFlags.swift in Sources */,
				97359F642ADB27500080CB11 /* FirebaseStorageTestsView.swift in Sources */,
				A9D83F9B2B0BDB1D000D0C78 /* BiographyKey.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A828F5F386007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				A95D60D02AA35E2200EB5968 /* FirebaseClient.swift in Sources */,
				A9D83F9D2B0BDB3A000D0C78 /* FirebaseAccountStorageTests.swift in Sources */,
				2F2E4B8429749C5900FF710F /* FirestoreDataStorageTests.swift in Sources */,
				978E198E2ADB40A300732324 /* FirebaseStorageTests.swift in Sources */,
				2F8CE161298C2C6D003799A8 /* FirebaseAccountTests.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin PBXTargetDependency section */
		2F6D13AE28F5F386007C25D6 /* PBXTargetDependency */ = {
			isa = PBXTargetDependency;
			target = 2F6D139128F5F384007C25D6 /* TestApp */;
			targetProxy = 2F6D13AD28F5F386007C25D6 /* PBXContainerItemProxy */;
		};
/* End PBXTargetDependency section */

/* Begin XCBuildConfiguration section */
		2F6D13B428F5F386007C25D6 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++20";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				ENABLE_TESTING_SEARCH_PATHS = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
			};
			name = Debug;
		};
		2F6D13B528F5F386007C25D6 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++20";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTING_SEARCH_PATHS = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				MTL_ENABLE_DEBUG_INFO = NO;
				MTL_FAST_MATH = YES;
				SDKROOT = iphoneos;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_OPTIMIZATION_LEVEL = "-O";
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
				VALIDATE_PRODUCT = YES;
			};
			name = Release;
		};
		2F6D13B728F5F386007C25D6 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = TestApp/TestApp.entitlements;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = 637867499T;
				ENABLE_PREVIEWS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = TestApp/Info.plist;
				INFOPLIST_KEY_NSHealthShareUsageDescription = "The TestApp accesses your HealthKit data to run the tests.";
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown";
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.firebase.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				TARGETED_DEVICE_FAMILY = 1;
			};
			name = Debug;
		};
		2F6D13B828F5F386007C25D6 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = TestApp/TestApp.entitlements;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = 637867499T;
				ENABLE_PREVIEWS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = TestApp/Info.plist;
				INFOPLIST_KEY_NSHealthShareUsageDescription = "The TestApp accesses your HealthKit data to run the tests.";
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown";
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.firebase.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				TARGETED_DEVICE_FAMILY = 1;
			};
			name = Release;
		};
		2F6D13BD28F5F386007C25D6 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = TestAppUITests/Info.plist;
				INFOPLIST_KEY_LSApplicationCategoryType = "";
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.firebase.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SWIFT_EMIT_LOC_STRINGS = NO;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_TARGET_NAME = TestApp;
			};
			name = Debug;
		};
		2F6D13BE28F5F386007C25D6 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = TestAppUITests/Info.plist;
				INFOPLIST_KEY_LSApplicationCategoryType = "";
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.firebase.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SWIFT_EMIT_LOC_STRINGS = NO;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_TARGET_NAME = TestApp;
			};
			name = Release;
		};
		A94FDCE42AFC4B4C008026CE /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS = YES;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++20";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				ENABLE_TESTING_SEARCH_PATHS = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = TEST;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
			};
			name = Test;
		};
		A94FDCE52AFC4B4C008026CE /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = TestApp/TestApp.entitlements;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = 637867499T;
				ENABLE_PREVIEWS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = TestApp/Info.plist;
				INFOPLIST_KEY_NSHealthShareUsageDescription = "The TestApp accesses your HealthKit data to run the tests.";
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown";
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.firebase.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				TARGETED_DEVICE_FAMILY = 1;
			};
			name = Test;
		};
		A94FDCE62AFC4B4C008026CE /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = TestAppUITests/Info.plist;
				INFOPLIST_KEY_LSApplicationCategoryType = "";
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.firebase.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SWIFT_EMIT_LOC_STRINGS = NO;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_TARGET_NAME = TestApp;
			};
			name = Test;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		2F6D138D28F5F384007C25D6 /* Build configuration list for PBXProject "UITests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13B428F5F386007C25D6 /* Debug */,
				A94FDCE42AFC4B4C008026CE /* Test */,
				2F6D13B528F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		2F6D13B628F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestApp" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13B728F5F386007C25D6 /* Debug */,
				A94FDCE52AFC4B4C008026CE /* Test */,
				2F6D13B828F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		2F6D13BC28F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestAppUITests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13BD28F5F386007C25D6 /* Debug */,
				A94FDCE62AFC4B4C008026CE /* Test */,
				2F6D13BE28F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */

/* Begin XCRemoteSwiftPackageReference section */
		2F746D9D29962B2A00BF54FE /* XCRemoteSwiftPackageReference "XCTestExtensions" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTestExtensions";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.0.0;
			};
		};
/* End XCRemoteSwiftPackageReference section */

/* Begin XCSwiftPackageProductDependency section */
		2F746D9E29962B2A00BF54FE /* XCTestExtensions */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2F746D9D29962B2A00BF54FE /* XCRemoteSwiftPackageReference "XCTestExtensions" */;
			productName = XCTestExtensions;
		};
		2FB07592299DF96E00C0B37F /* SpeziFirebaseAccount */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziFirebaseAccount;
		};
		2FB07594299DF96E00C0B37F /* SpeziFirebaseConfiguration */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziFirebaseConfiguration;
		};
		2FB07596299DF96E00C0B37F /* SpeziFirestore */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziFirestore;
		};
		978DFE912ADB1E1600E2B9B5 /* SpeziFirebaseStorage */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziFirebaseStorage;
		};
		A9D83F9E2B0BDCC7000D0C78 /* SpeziFirebaseAccountStorage */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziFirebaseAccountStorage;
		};
/* End XCSwiftPackageProductDependency section */
	};
	rootObject = 2F6D138A28F5F384007C25D6 /* Project object */;
}

================
File: Tests/UITests/UITests.xcodeproj/project.pbxproj.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/UITests.xcodeproj/TestApp.xctestplan
================
{
  "configurations" : [
    {
      "id" : "A3A0543A-08F3-4356-97BF-88EC80ED0D0E",
      "name" : "Default",
      "options" : {

      }
    }
  ],
  "defaultOptions" : {
    "codeCoverage" : {
      "targets" : [
        {
          "containerPath" : "container:..\/..",
          "identifier" : "SpeziFirebaseAccount",
          "name" : "SpeziFirebaseAccount"
        },
        {
          "containerPath" : "container:..\/..",
          "identifier" : "SpeziFirebaseConfiguration",
          "name" : "SpeziFirebaseConfiguration"
        },
        {
          "containerPath" : "container:..\/..",
          "identifier" : "SpeziFirestore",
          "name" : "SpeziFirestore"
        }
      ]
    },
    "targetForVariableExpansion" : {
      "containerPath" : "container:UITests.xcodeproj",
      "identifier" : "2F6D139128F5F384007C25D6",
      "name" : "TestApp"
    }
  },
  "testTargets" : [
    {
      "target" : {
        "containerPath" : "container:UITests.xcodeproj",
        "identifier" : "2F6D13AB28F5F386007C25D6",
        "name" : "TestAppUITests"
      }
    }
  ],
  "version" : 1
}

================
File: Tests/UITests/UITests.xcodeproj/TestApp.xctestplan.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/.firebaserc
================
{
  "projects": {
    "default": "spezifirebaseuitests"
  }
}

================
File: Tests/UITests/.firebaserc.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/.gitignore
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
firebase-debug.log*
firebase-debug.*.log*

# Firebase cache
.firebase/

# Firebase config

# Uncomment this if you'd like others to create their own Firebase project.
# For a team working on the same Firebase project(s), it is recommended to leave
# it commented so all members can deploy to the same project(s) in .firebaserc.
# .firebaserc

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

================
File: Tests/UITests/firebase.json
================
{
  "storage": {
    "rules": "firebasestorage.rules"
  },
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8080
    },
    "storage": {
      "port": 9199
    },
    "ui": {
      "enabled": true,
      "port": 4000
    },
    "singleProjectMode": true
  }
}

================
File: Tests/UITests/firebase.json.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/firebasestorage.rules
================
rules_version = '2';
service firebase.storage {
    match /b/{bucket}/o {
        match /{allPaths=**} {
            allow read, write: if true;
    }
  }
}

================
File: Tests/UITests/firebasestorage.rules.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: .gitignore
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
# 

# Swift Package Manager
Package.resolved
*.xcodeproj
.swiftpm
.build
.xcodebuild
.derivedData
coverage.lcov
*.xcresult

# IDE related folders
.idea

# Xcode User settings
xcuserdata/

# Other files
.DS_Store
.env

# Documentation generation
*.doccarchive
docs/

# UITests Project
!UITests.xcodeproj

================
File: .spi.yml
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

version: 1
builder:
  configs:
    - platform: ios
      documentation_targets:
      - SpeziFirebaseAccount
      - SpeziFirebaseAccountStorage
      - SpeziFirebaseConfiguration
      - SpeziFirebaseStorage
      - SpeziFirestore

================
File: .swiftlint.yml
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
# 

# The whitelist_rules configuration also includes rules that are enabled by default to provide a good overview of all rules.
only_rules:
  # All Images that provide context should have an accessibility label. Purely decorative images can be hidden from accessibility.
  - accessibility_label_for_image
  # Attributes should be on their own lines in functions and types, but on the same line as variables and imports.
  - attributes
  # Prefer using Array(seq) over seq.map { $0 } to convert a sequence into an Array.
  - array_init
  # Prefer the new block based KVO API with keypaths when using Swift 3.2 or later.
  - block_based_kvo
  # Non-constant variables should not be listed in a closure’s capture list to avoid confusion about closures capturing variables at creation time.
  - capture_variable
  # Delegate protocols should be class-only so they can be weakly referenced.
  - class_delegate_protocol
  # Closing brace with closing parenthesis should not have any whitespaces in the middle.
  - closing_brace
  # Closure bodies should not span too many lines.
  - closure_body_length
  # Closure end should have the same indentation as the line that started it.
  - closure_end_indentation
  # Closure parameters should be on the same line as opening brace.
  - closure_parameter_position
  # Closure expressions should have a single space inside each brace.
  - closure_spacing
  # Use commas to separate types in inheritance lists
  - comma_inheritance
  # Prefer at least one space after slashes for comments.
  - comment_spacing
  # All elements in a collection literal should be vertically aligned
  - collection_alignment
  # Colons should be next to the identifier when specifying a type and next to the key in dictionary literals.
  - colon
  # There should be no space before and one after any comma.
  - comma
  # The initializers declared in compiler protocols such as ExpressibleByArrayLiteral shouldn't be called directly.
  - compiler_protocol_init
  # Getter and setters in computed properties and subscripts should be in a consistent order.
  - computed_accessors_order
  # Conditional statements should always return on the next line
  - conditional_returns_on_newline
  # Prefer contains over comparing filter(where:).count to 0.
  - contains_over_filter_count
  # Prefer contains over using filter(where:).isEmpty
  - contains_over_filter_is_empty
  # Prefer `contains` over `first(where:) != nil`
  - contains_over_first_not_nil
  # Prefer contains over range(of:) != nil and range(of:) == nil
  - contains_over_range_nil_comparison
  # if, for, guard, switch, while, and catch statements shouldn't unnecessarily wrap their conditionals or arguments in parentheses.
  - control_statement
  # Types used for hosting only static members should be implemented as a caseless enum to avoid instantiation.
  - convenience_type
  # Complexity of function bodies should be limited.
  - cyclomatic_complexity
  # Availability checks or attributes shouldn’t be using older versions that are satisfied by the deployment target.
  - deployment_target
  # When registering for a notification using a block, the opaque observer that is returned should be stored so it can be removed later.
  - discarded_notification_center_observer
  # Discouraged direct initialization of types that can be harmful. e.g. UIDevice(), Bundle()
  - discouraged_direct_init
  # Prefer initializers over object literals.
  - discouraged_object_literal
  # Prefer non-optional booleans over optional booleans.
  - discouraged_optional_boolean
  # Prefer empty collection over optional collection.
  - discouraged_optional_collection
  # Dictionary literals with duplicated keys will crash in runtime.
  - duplicated_key_in_dictionary_literal
  # Duplicate Imports
  - duplicate_imports
  # Avoid using 'dynamic' and '@inline(__always)' together.
  - dynamic_inline
  # Prefer checking isEmpty over comparing collection to an empty array or dictionary literal.
  - empty_collection_literal
  # Prefer checking `isEmpty` over comparing `count` to zero.
  - empty_count
  # Arguments can be omitted when matching enums with associated types if they are not used.
  - empty_enum_arguments
  # Prefer () -> over Void ->.
  - empty_parameters
  # When using trailing closures, empty parentheses should be avoided after the method call.
  - empty_parentheses_with_trailing_closure
  # Prefer checking `isEmpty` over comparing string to an empty string literal.
  - empty_string
  # Empty XCTest method should be avoided.
  - empty_xctest_method
  # Number of associated values in an enum case should be low
  - enum_case_associated_values_count
  # Explicitly calling .init() should be avoided.
  - explicit_init
  # A fatalError call should have a message.
  - fatal_error_message
  # Files should not span too many lines.
  # See file_length below for the exact configuration.
  - file_length
  # File name should not contain any whitespace.
  - file_name_no_space
  # Specifies how the types within a file should be ordered.
  - file_types_order
  # Prefer using ``.first(where:)`` over ``.filter { }.first` in collections.
  - first_where
  # Prefer flatMap over map followed by reduce([], +).
  - flatmap_over_map_reduce
  # where clauses are preferred over a single if inside a for.
  - for_where
  # Force casts should be avoided.
  - force_cast
  # Force tries should be avoided.
  - force_try
  # Force unwrapping should be avoided.
  - force_unwrapping
  # Prefer to locate parameters with defaults toward the end of the parameter list.
  - function_default_parameter_at_end
  # Functions bodies should not span too many lines.
  # See function_body_length below for the exact configuration.
  - function_body_length
  # Number of function parameters should be low.
  # See function_parameter_count below for the exact configuration.
  - function_parameter_count
  # Generic type name should only contain alphanumeric characters, start with an uppercase character and span between 1 and 20 characters in length.
  - generic_type_name
  # Comparing two identical operands is likely a mistake.
  - identical_operands
  # Identifier names should only contain alphanumeric characters and start with a lowercase character or should only contain capital letters.
  # In an exception to the above, variable names may start with a capital letter when they are declared static and immutable.
  # Variable names should not be too long or too short. Excluded names are listed below.
  - identifier_name
  # Computed read-only properties and subscripts should avoid using the get keyword.
  - implicit_getter
  # Prefer implicit returns in closures.
  - implicit_return
  # Implicitly unwrapped optionals should be avoided when possible.
  - implicitly_unwrapped_optional
  # Identifiers should use inclusive language that avoids discrimination against groups of people based on race, gender, or socioeconomic status
  - inclusive_language
  # Prefer using Set.isDisjoint(with:) over Set.intersection(_:).isEmpty.
  - is_disjoint
  # Discouraged explicit usage of the default separator.
  - joined_default_parameter
  # Tuples shouldn't have too many members. Create a custom type instead.
  # See large_tuple below for the exact configuration.
  - large_tuple
  # Prefer using .last(where:) over .filter { }.last in collections.
  - last_where
  # Files should not contain leading whitespace.
  - leading_whitespace
  # CGGeometry: Struct extension properties and methods are preferred over legacy functions
  - legacy_cggeometry_functions
  # Struct-scoped constants are preferred over legacy global constants (CGSize, CGRect, NSPoint, ...).
  - legacy_constant
  # Swift constructors are preferred over legacy convenience functions (CGPointMake, CGSizeMake, UIOffsetMake, ...).
  - legacy_constructor
  # Prefer using the hash(into:) function instead of overriding hashValue
  - legacy_hashing
  # Prefer using the isMultiple(of:) function instead of using the remainder operator (%).
  - legacy_multiple
  # Struct extension properties and methods are preferred over legacy functions
  - legacy_nsgeometry_functions
  # Prefer using type.random(in:) over legacy functions.
  - legacy_random
  # Lines should not span too many characters.
  # See line_length below for the exact configuration.
  - line_length
  # Array and dictionary literal end should have the same indentation as the line that started it.
  - literal_expression_end_indentation
  # Ensure definitions have a lower access control level than their enclosing parent
  - lower_acl_than_parent
  # MARK comment should be in valid format. e.g. '// MARK: ...' or '// MARK: - ...'
  - mark
  # Declarations should be documented.
  - missing_docs
  # Modifier order should be consistent.
  - modifier_order
  # Arguments should be either on the same line, or one per line.
  - multiline_arguments
  # Multiline arguments should have their surrounding brackets in a new line.
  - multiline_arguments_brackets
  # Chained function calls should be either on the same line, or one per line.
  - multiline_function_chains
  # Multiline literals should have their surrounding brackets in a new line.
  - multiline_literal_brackets
  # Functions and methods parameters should be either on the same line, or one per line.
  - multiline_parameters
  # Multiline parameters should have their surrounding brackets in a new line.
  - multiline_parameters_brackets
  # Types and functions should only be nested to a certain level deep.
  # See nesting below for the exact configuration.
  - nesting
  # Prefer Nimble operator overloads over free matcher functions.
  - nimble_operator
  # Prefer not to use extension access modifiers
  - no_extension_access_modifier
  # Fallthroughs can only be used if the case contains at least one other statement.  
  - no_fallthrough_only
  # Don’t add a space between the method name and the parentheses.
  - no_space_in_method_call
  # An object should only remove itself as an observer in deinit.
  - notification_center_detachment
  # Static strings should be used as key in NSLocalizedString in order to genstrings work.
  - nslocalizedstring_key
  # NSObject subclasses should implement isEqual instead of ==.
  - nsobject_prefer_isequal
  # Prefer object literals over image and color inits.
  - object_literal
  # Opening braces should be preceded by a single space and on the same line as the declaration.
  - opening_brace
  # Operators should be surrounded by a single whitespace when they are being used.
  - operator_usage_whitespace
  # Operators should be surrounded by a single whitespace when defining them.
  - operator_whitespace
  # Matching an enum case against an optional enum without ‘?’ is supported on Swift 5.1 and above.
  - optional_enum_case_matching
  # A doc comment should be attached to a declaration.
  - orphaned_doc_comment
  # Extensions shouldn’t override declarations.
  - override_in_extension
  # Some overridden methods should always call super
  - overridden_super_call
  # Combine multiple pattern matching bindings by moving keywords out of tuples.
  - pattern_matching_keywords
  # Prefer Self over type(of: self) when accessing properties or calling methods.
  - prefer_self_type_over_type_of_self
  # Prefer .zero over explicit init with zero parameters (e.g. CGPoint(x: 0, y: 0))
  - prefer_zero_over_explicit_init
  # Prefer private over fileprivate declarations.
  - private_over_fileprivate
  # Combine Subject should be private.
  - private_subject
  # Unit tests marked private are silently skipped.
  - private_unit_test
  # Creating views using Interface Builder should be avoided.
  - prohibited_interface_builder
  # Some methods should not call super (
    # NSFileProviderExtension: providePlaceholder(at:completionHandler:)
    # NSTextInput doCommand(by:)
    # NSView updateLayer()
    # UIViewController loadView())
  - prohibited_super_call
  # When declaring properties in protocols, the order of accessors should be get set.
  - protocol_property_accessors_order
  # Prefer using .allSatisfy() or .contains() over reduce(true) or reduce(false)
  - reduce_boolean
  # Prefer reduce(into:_:) over reduce(_:_:) for copy-on-write types
  - reduce_into
  # Prefer _ = foo() over let _ = foo() when discarding a result from a function.
  - redundant_discardable_let
  # nil coalescing operator is only evaluated if the lhs is nil, coalescing operator with nil as rhs is redundant
  - redundant_nil_coalescing
  # Objective-C attribute (@objc) is redundant in declaration.
  - redundant_objc_attribute
  # Initializing an optional variable with nil is redundant.
  - redundant_optional_initialization
  # Property setter access level shouldn't be explicit if it's the same as the variable access level.
  - redundant_set_access_control
  # String enum values can be omitted when they are equal to the enumcase name.
  - redundant_string_enum_value
  # Variables should not have redundant type annotation
  - redundant_type_annotation
  # Returning Void in a function declaration is redundant.
  - redundant_void_return
  # Return arrow and return type should be separated by a single space or on a separate line.
  - return_arrow_whitespace
  # Returning values from Void functions should be avoided.
  - return_value_from_void_function
  # Re-bind self to a consistent identifier name.
  - self_binding
  # Prefer shorthand operators (+=, -=, *=, /=) over doing the operation and assigning.
  - shorthand_operator
  # Test files should contain a single QuickSpec or XCTestCase class.
  - single_test_class
  # Prefer using `min()`` or `max()`` over `sorted().first` or `sorted().last`
  - sorted_first_last
  # Imports should be sorted.
  - sorted_imports
  # Else and catch should be on the same line, one space after the previous declaration.
  - statement_position
  # Operators should be declared as static functions, not free functions.
  - static_operator
  # SwiftLint ‘disable’ commands are superfluous when the disabled rule would not have triggered a violation in the disabled region. Use “ - ” if you wish to document a command.
  - superfluous_disable_command
  # Case statements should vertically align with their enclosing switch statement, or indented if configured otherwise.
  - switch_case_alignment
  # Shorthand syntactic sugar should be used, i.e. [Int] instead of Array.
  - syntactic_sugar
  # TODOs and FIXMEs should be resolved.
  - todo
  # Prefer someBool.toggle() over someBool = !someBool.
  - toggle_bool
  # Trailing closure syntax should be used whenever possible.
  - trailing_closure
  # Trailing commas in arrays and dictionaries should be avoided/enforced.
  - trailing_comma
  # Files should have a single trailing newline.
  - trailing_newline
  # Lines should not have trailing semicolons.
  - trailing_semicolon
  # Lines should not have trailing whitespace.
  # Ignored lines are specified below.
  - trailing_whitespace
  # Type bodies should not span too many lines.
  # See large_tuple below for the exact configuration.
  - type_body_length
  # Specifies the order of subtypes, properties, methods & more within a type.
  - type_contents_order
  # Type name should only contain alphanumeric characters, start with an uppercase character and span between 3 and 40 characters in length.
  # Excluded types are listed below.
  - type_name
  # Prefer using Array(seq) over seq.map { $0 } to convert a sequence into an Array.
  - typesafe_array_init
  # Use #unavailable/#available instead of #available/#unavailable with an empty body.
  - unavailable_condition
  # Unimplemented functions should be marked as unavailable.
  - unavailable_function
  # Avoid using unneeded break statements.
  - unneeded_break_in_switch
  # Parentheses are not needed when declaring closure arguments.
  - unneeded_parentheses_in_closure_argument
  # Prefer capturing references as weak to avoid potential crashes.
  - unowned_variable_capture
  # Catch statements should not declare error variables without type casting.
  - untyped_error_in_catch
  # Unused parameter in a closure should be replaced with _.
  - unused_closure_parameter
  # Unused control flow label should be removed.
  - unused_control_flow_label
  # Declarations should be referenced at least once within all files linted.
  - unused_declaration
  # When the index or the item is not used, .enumerated() can be removed.
  - unused_enumerated
  # All imported modules should be required to make the file compile.
  - unused_import
  # Prefer != nil over let _ =
  - unused_optional_binding
  # Setter value is not used.
  - unused_setter_value
  # @IBInspectable should be applied to variables only, have its type explicit and be of a supported type
  - valid_ibinspectable
  # Function parameters should be aligned vertically if they're in multiple lines in a declaration.
  - vertical_parameter_alignment
  # Function parameters should be aligned vertically if they're in multiple lines in a method call.
  - vertical_parameter_alignment_on_call
  # Limit vertical whitespace to a single empty line.
  # See vertical_whitespace below for the exact configuration.
  - vertical_whitespace
  # Don’t include vertical whitespace (empty line) before closing braces.
  - vertical_whitespace_closing_braces
  # Don’t include vertical whitespace (empty line) after opening braces.
  - vertical_whitespace_opening_braces
  # Using ternary to call Void functions should be avoided.
  - void_function_in_ternary
  # Prefer -> Void over -> ().
  - void_return
  # Delegates should be weak to avoid reference cycles.
  - weak_delegate
  # Prefer specific XCTest matchers over XCTAssertEqual and XCTAssertNotEqual
  - xct_specific_matcher
  # An XCTFail call should include a description of the assertion.
  - xctfail_message
  # The variable should be placed on the left, the constant on the right of a comparison operator.
  - yoda_condition

deployment_target: # Availability checks or attributes shouldn’t be using older versions that are satisfied by the deployment target.
  iOSApplicationExtension_deployment_target: 16.0
  iOS_deployment_target: 16.0

excluded: # paths to ignore during linting. Takes precedence over `included`.
  - .build
  - .swiftpm
  - .derivedData
  - Tests/UITests/.derivedData

closure_body_length: # Closure bodies should not span too many lines.
  - 35 # warning - default: 20
  - 35 # error - default: 100

enum_case_associated_values_count: # Number of associated values in an enum case should be low
  - 5 # warning - default: 5
  - 5 # error - default: 6

file_length: # Files should not span too many lines.
  - 500 # warning - default: 400
  - 500 # error - default: 1000

function_body_length: # Functions bodies should not span too many lines.
  - 50 # warning - default: 40
  - 50 # error - default: 100

function_parameter_count: # Number of function parameters should be low.
  - 5 # warning - default: 5
  - 5 # error - default: 8

identifier_name:
  excluded: # excluded names
    - id
    - ok
    - or
    - p8
    - of
    - s3
    - at
    - to
    - in

large_tuple: # Tuples shouldn't have too many members. Create a custom type instead.
  - 2 # warning - default: 2
  - 2 # error - default: 3

line_length: # Lines should not span too many characters.
  warning: 150 # default: 120
  error: 150 # default: 200
  ignores_comments: true # default: false
  ignores_urls: true # default: false
  ignores_function_declarations: false # default: false
  ignores_interpolated_strings: true # default: false

nesting: # Types should be nested at most 2 level deep, and functions should be nested at most 5 levels deep.
  type_level:
    warning: 2 # warning - default: 1
  function_level:
    warning: 5 # warning - default: 5
    
trailing_closure:
  only_single_muted_parameter: true

type_body_length: # Type bodies should not span too many lines.
  - 250 # warning - default: 200
  - 250 # error - default: 200

type_name:
  excluded: # excluded names
    - ID

trailing_whitespace:
  ignores_empty_lines: true # default: false
  ignores_comments: true # default: false
  
unused_optional_binding:
  ignore_optional_try: true

vertical_whitespace: # Limit vertical whitespace to a single empty line.
  max_empty_lines: 2 # warning - default: 1

================
File: CITATION.cff
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

cff-version: 1.2.0
message: "If you use this software, please cite it as below."
authors:
- family-names: "Schmiedmayer"
  given-names: "Paul"
  orcid: "https://orcid.org/0000-0002-8607-9148"
- family-names: "Ravi"
  given-names: "Vishnu"
  orcid: "https://orcid.org/0000-0003-0359-1275"
- family-names: "Aalami"
  given-names: "Oliver"
  orcid: "https://orcid.org/0000-0002-7799-2429"
title: "SpeziFirebase"
doi: 10.5281/zenodo.7706899
url: "https://github.com/StanfordSpezi/SpeziFirebase"

================
File: CONTRIBUTORS.md
================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

Spezi Firebase contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Philipp Zagar](https://github.com/philippzagar)

================
File: LICENSE.md
================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================
File: Package.swift
================
let package = Package(
func swiftLintPlugin() -> [Target.PluginUsage] {
func swiftLintPackage() -> [PackageDescription.Package.Dependency] {

================
File: README.md
================
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



================================================================
End of Codebase
================================================================
