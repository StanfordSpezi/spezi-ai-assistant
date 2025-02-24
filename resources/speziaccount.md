Directory structure:
└── stanfordspezi-speziaccount/
    ├── README.md
    ├── CONTRIBUTORS.md
    ├── LICENSE.md
    └── Sources/
        ├── SpeziAccount/
        │   └── SpeziAccount.docc/
        │       ├── SpeziAccount.md
        │       ├── AccountKey/
        │       │   └── Adding new Account Values.md
        │       ├── AccountService/
        │       │   ├── Creating your own Account Service.md
        │       │   └── Custom Storage Provider.md
        │       └── Setup Guides/
        │           └── Initial Setup.md
        └── XCTSpeziAccount/
            └── XCTSpeziAccount.docc/
                └── XCTSpeziAccount.md

================================================
File: README.md
================================================
<!--

This source file is part of the Spezi open-source project.

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

# Spezi Account

[![Build and Test](https://github.com/StanfordSpezi/SpeziAccount/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziAccount/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziAccount/branch/main/graph/badge.svg?token=IAfXOmGenQ)](https://codecov.io/gh/StanfordSpezi/SpeziAccount)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7796499.svg)](https://doi.org/10.5281/zenodo.7796499)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziAccount%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziAccount)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziAccount%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziAccount)

A Spezi framework that provides account-related functionality including login, sign up and password reset.

## Overview

The `SpeziAccount` framework fully abstracts setup and management of user account functionality for the
[Spezi](https://github.com/StanfordSpezi/Spezi/) framework ecosystem.

|![Screenshot displaying the account setup view with an email and password prompt and a Sign In with Apple button.](Sources/SpeziAccount/SpeziAccount.docc/Resources/AccountSetup.png#gh-light-mode-only) ![Screenshot displaying the account setup view with an email and password prompt and a Sign In with Apple button.](Sources/SpeziAccount/SpeziAccount.docc/Resources/AccountSetup~dark.png#gh-dark-mode-only)|![Screenshot displaying the Signup Form for Account setup.](Sources/SpeziAccount/SpeziAccount.docc/Resources/SignupForm.png#gh-light-mode-only) ![Screenshot displaying the Signup Form for Account setup.](Sources/SpeziAccount/SpeziAccount.docc/Resources/SignupForm~dark.png#gh-dark-mode-only)|![Screenshot displaying the Account Overview.](Sources/SpeziAccount/SpeziAccount.docc/Resources/AccountOverview.png#gh-light-mode-only) ![Screenshot displaying the Account Overview.](Sources/SpeziAccount/SpeziAccount.docc/Resources/AccountOverview~dark.png#gh-dark-mode-only)|
|:--:|:--:|:--:|
|The [`AccountSetup`](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/accountsetup) is the central view for account onboarding, facilitating account login and creation. |The [`SignupForm`](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/signupform) is used by email-password-based AccountServices by default. |The [`AccountOverview`](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/accountoverview) is used to view and modify the user details of the currently associated account.|


The ``AccountSetup`` and ``AccountOverview`` views are central to `SpeziAccount`.
You use the ``AccountDetails`` collection within your views to visualize account information of the associated user account.

An ``AccountService`` provides an abstraction layer for managing different types of account management services
(e.g., email address and password-based service combined with an identity provider like Sign in with Apple).

For more information, please refer to the [API documentation](https://swiftpackageindex.com/StanfordSpezi/SpeziAccount/documentation).

> [!NOTE]
> The [SpeziFirebase](https://github.com/StanfordSpezi/SpeziFirebase)
framework provides the [`FirebaseAccountService`](https://swiftpackageindex.com/stanfordspezi/spezifirebase/documentation/spezifirebaseaccount/firebaseaccountservice)
you can use to configure an Account Service base on the Google Firebase service.


### Setup

You need to add the Spezi Account Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> [!IMPORTANT]  
> If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

The [Initial Setup](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/initial-setup)
article provides a quick-start guide to set up `SpeziAccount` in your App.
Refer to the
[Implementing an Account Service](https://swiftpackageindex.com/stanfordspezi/speziaccount/documentation/speziaccount/creating-your-own-account-service)
article if you plan on implementing your own Account Service.

The [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication) provides a great starting point and example using the Spezi Account module.

## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziAccount/tree/main/LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/Footer.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/Footer~dark.png#gh-dark-mode-only)


================================================
File: CONTRIBUTORS.md
================================================
<!--

This source file is part of the Spezi open-source project.

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

Spezi Account Contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Andreas Bauer](https://github.com/Supereg)
* [Nikolai Madlener](https://github.com/NikolaiMadlener)


================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================================================
File: Sources/SpeziAccount/SpeziAccount.docc/SpeziAccount.md
================================================
# ``SpeziAccount``

A Spezi framework that provides account-related functionality including login, sign up and password reset.

<!--
                  
This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

## Overview

The `SpeziAccount` framework fully abstracts setup and management of user account functionality for the
[Spezi](https://github.com/StanfordSpezi/Spezi/) framework ecosystem.

@Row {
    @Column {
        @Image(source: "AccountSetup", alt: "Screenshot displaying the account setup view with an email and password prompt and a Sign In with Apple button.") {
            The ``AccountSetup`` is the central view for account onboarding, facilitating account login and creation.
        }
    }
    @Column {
        @Image(source: "SignupForm", alt: "Screenshot displaying the Signup Form for Account setup.") {
            The ``SignupForm`` is used by email-password-based AccountServices by default.
        }
    }
    @Column {
        @Image(source: "AccountOverview", alt: "Screenshot displaying the Account Overview.") {
            The ``AccountOverview`` is used to view and modify the user details of the currently associated account. 
        }
    }
}

The ``AccountSetup`` and ``AccountOverview`` views are central to `SpeziAccount`.
You use the ``AccountDetails`` collection within your views to visualize account information of the associated user account.

An ``AccountService`` provides an abstraction layer for managing different types of account management services
(e.g., email address and password-based service combined with an identity provider like Sign in with Apple).

> Note: The [SpeziFirebase](https://github.com/StanfordSpezi/SpeziFirebase)
framework provides the [`FirebaseAccountService`](https://swiftpackageindex.com/stanfordspezi/spezifirebase/documentation/spezifirebaseaccount/firebaseaccountservice)
you can use to configure an Account Service base on the Google Firebase service.

## Setup

You need to add the Spezi Account Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

The <doc:Initial-Setup> article provides a quick-start guide to set up `SpeziAccount` in your App.

Refer to the <doc:Creating-your-own-Account-Service> article if you plan on implementing your own Account Service.


## Topics

### Configuration

- <doc:Initial-Setup>
- ``AccountConfiguration``
- ``AccountValueConfiguration``

### Account Details

- ``Account``
- ``AccountDetails``
- <doc:Adding-new-Account-Values>

### Account UI

- ``AccountSetup``
- ``AccountOverview``
- ``AccountHeader``
- ``FollowUpInfoSheet``
- ``SwiftUICore/View/accountRequired(_:accountSetupIsComplete:setupSheet:)``
- ``SwiftUICore/EnvironmentValues/accountRequired``
>>>>>>> main

### Environment & Preferences

- ``SwiftUICore/View/preferredAccountSetupStyle(_:)``
- ``SwiftUICore/View/followUpBehaviorAfterSetup(_:)``

### Reacting to Events

- ``AccountNotifyConstraint``
- ``AccountNotifications``

### Account Service

- <doc:Creating-your-own-Account-Service>
- ``AccountService``
- ``IdentityProvider``
- ``SecurityRelatedModifier``
- ``AccountModifications``

### External Storage

- <doc:Custom-Storage-Provider>
- ``AccountStorageProvider``
- ``ExternalAccountStorage``
- ``AccountDetailsCache``

### In Memory Implementations

In memory implementations are useful for SwiftUI Previews and UI testing purposes.
- ``InMemoryAccountService``
- ``InMemoryAccountStorageProvider``


================================================
File: Sources/SpeziAccount/SpeziAccount.docc/AccountKey/Adding new Account Values.md
================================================
# Supporting new Account Details

Support new user account details by defining your own `AccountKey`.

<!--
                  
This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

## Overview

By defining a custom ``AccountKey`` you can support storing custom data points with your user accounts.
An `AccountKey` declaration provides useful meta-data information (like name, a category and a initial value) and defines user interface components
for data entry (see ``DataEntryView``) and displaying data (using ``DataDisplayView``). For some types of account values these views can be automatically
substituted.

This articles guides you through all the necessary steps to declare your custom `AccountKey`.

### Declaring the property

You use the ``AccountKey(id:name:category:as:initial:displayView:entryView:)`` macro to declare a new ``AccountKey``.

It is mandatory to provide a localizable ``AccountKey/name`` and the `Value` type.
> Note: Refer to <doc:Value-Conformances> to learn more of the mandatory conformances for the `Value` type. 

Optionally, you might want to customize the ``AccountKey/category`` in which the account details are shown (see ``AccountKeyCategory``).
An ``AccountKey/initialValue-6h1oo`` might be required, depending on the `Value` type if `SpeziAccount` cannot derive a sensible default
(e.g., SpeziAccount automatically provides an ``InitialValue/empty(_:)`` String for String-based account keys).

Below is a short code example that adds support to store a string-based biography that a user might show on their profile.

```swift
extension AccountDetails {
    @AccountKey(name: "Biography", category: .personalDetails, as: String.self)
    var biography: String?
}
```


In order to be able to refer to your account key, you need to add a entry to the ``AccountKeys`` using the ``KeyEntry(_:)`` macro.

```swift
@KeyEntry(\.biography)
extension AccountKeys {}
```

### Customize User Interfaces

While SpeziAccount tries as best as it can to automatically provide user interfaces to display and edit your custom account keys,
it might be necessary or improve the user experience to provide your own user interfaces.

This is done by implementing a ``DataDisplayView`` or ``DataEntryView`` respectively.

- Note: The <doc:User-Interfaces-that-are-provided-by-default> section provides an overview when SpeziAccount is able to provide default user interfaces.

The code example below implements a custom `EntryView` and `DisplayView` and updates the `AccountKey` declaration from above to use
the new views.

```swift
import SpeziAccount
import SpeziValidation
import SpeziViews
import SwiftUI


/// A custom data entry view that disables auto-correction for the biography key.
private struct EntryView: DataEntryView {
    @Binding private var biography: Value

    var body: some View {
        VerifiableTextField("enter biography", text: $biography)
            .autocorrectionDisabled()
            .lineLimit(2...5)
    }

    init(_ value: Binding<Value>) {
        self._biography = value
    }
}


/// A custom data display view that allows to display up to 3 lines of the biography.
private struct DisplayView: DataDisplayView {
    private let value: String

    var body: some View {
        Text(value)
            .lineLimit(...3) // show biography in max 3 lines
    }

    init(_ value: String) {
        self.value = value
    }
}


// the updated @AccountKey macro definition from above
extension AccountDetails {
    @AccountKey(
        name: "Biography",
        category: .personalDetails,
        as: String.self,
        displayView: DisplayView.self,
        entryView: EntryView.self
    )
    var biography: String?
}
```

- Note: You may have to manually handle input validation. Refer to the <doc:Input-Validation> section below.

### Value Conformances

Your `Value` type requires several protocol conformances.

* The `Value` type must conform to [`Sendable`](https://developer.apple.com/documentation/swift/sendable)) to be safely passed across actor boundaries.
* The `Value` type must conform to [`Equatable`](https://developer.apple.com/documentation/swift/equatable)) to be easily notified about changes at data entry.
* The `Value` type must conform to [`Codable`](https://developer.apple.com/documentation/swift/codable) such that an ``AccountService``s or an ``AccountStorageProvider``
can easily store and retrieve arbitrary `Value` types.

### User Interfaces that are provided by default

This section briefly highlights the conditions under which SpeziAccount can provide user interface components automatically.

A ``AccountKey/DataDisplay`` view is automatically provided if:
* The `Value` is of type `String`.
* The `Value` is of type `Bool`.
* The `Value` is a [`FixedWidthInteger`](https://developer.apple.com/documentation/swift/fixedwidthinteger) (e.g., `Int`, `UInt`, ...).
* The `Value` is a [`BinaryFloatingPoint`](https://developer.apple.com/documentation/swift/binaryfloatingpoint) (e.g., `Double` or `Float`).
* The `Value` conforms to [`CustomLocalizedStringResourceConvertible`](https://developer.apple.com/documentation/foundation/customlocalizedstringresourceconvertible),
    providing a localized string-representation.

A ``AccountKey/DataEntry`` view is automatically provide if:
* The `Value` is of type `String`.
    A simple string entry will appear. You have to implement your own view if you have special formatting requirements.
* The `Value` is of type `Bool`.
* The `Value` is a [`FixedWidthInteger`](https://developer.apple.com/documentation/swift/fixedwidthinteger)  (e.g., `Int`, `UInt`, ...).
    A simple number entry will appear. You have to implement your own view if you have special formatting requirements.
* The `Value` is a [`BinaryFloatingPoint`](https://developer.apple.com/documentation/swift/binaryfloatingpoint) (e.g., `Double` or `Float`).
    A simple decimal entry will appear. You have to implement your own view if you have special formatting requirements.
* The `Value` conforms to the `PickerValue` protocols. This is provides a Picker UI for enum types.
    `PickerValue` is shorthand to conform to the [`CaseIterable`](https://developer.apple.com/documentation/swift/caseiterable),
    [`CustomLocalizedStringResourceConvertible`](https://developer.apple.com/documentation/foundation/customlocalizedstringresourceconvertible)
    and [`Hashable`](https://developer.apple.com/documentation/swift/hashable) protocols.

### Input Validation

Input validation relies on the [SpeziValidation](https://swiftpackageindex.com/StanfordSpezi/SpeziViews/documentation/spezivalidation) package.

`SpeziAccount` provides basic validation for most cases where necessary due to ``FieldValidationRules`` or ``AccountKeyRequirement`` configurations.
Still, you are required to evaluate to which extent validation has to be handled in your implementation.

* For all `String`-based types validation is automatically managed. Validation is either configured based on
    the rules provided by the account service through ``FieldValidationRules`` or if the user specified a ``AccountKeyRequirement/required`` level.
    If not using default components like [`VerifiableTextField`](https://swiftpackageindex.com/stanfordspezi/speziviews/documentation/spezivalidation/verifiabletextfield)),
    you need to visualize validation results yourself using the [`ValidationEngine`](https://swiftpackageindex.com/stanfordspezi/speziviews/documentation/spezivalidation/validationengine))
    in the environment.
* For other types that use ``InitialValue/empty(_:)`` and are specified to be ``AccountKeyRequirement/required``,
    validation is automatically set up to check if the user provided a value. For example given a `Date`-based account value, we would require that
    the user modifies the Data at least once.
* For other types that use ``InitialValue/default(_:)`` we do not perform any validation automatically.
* If you have diverging needs (e.g., multi field input), you will need to handle validation yourself.


## Topics

### Account Key Declaration

- ``AccountKey(id:name:category:as:initial:displayView:entryView:)``
- ``AccountKey(id:name:category:as:displayView:entryView:)-7hix5``
- ``AccountKey(id:name:category:as:displayView:entryView:)-2hptl``
- ``AccountKey(id:name:category:as:displayView:entryView:)-73ut1``
- ``AccountKey(id:name:category:as:displayView:entryView:)-945ks``

### Key Entry Declaration

- ``KeyEntry(_:)``
- ``AccountKeys``

### Account Key Model

- ``AccountKeyCategory``
- ``InitialValue``
- ``AccountKey``
- ``RequiredAccountKey``

### Displaying Account Keys

- ``DataDisplayView``
- ``StringDisplayView``
- ``BoolDisplayView``
- ``FixedWidthIntegerDisplayView``
- ``FloatingPointDisplayView``
- ``LocalizableStringDisplayView``

### Entering Account Keys

- ``DataEntryView``
- ``StringEntryView``
- ``BoolEntryView``
- ``FixedWidthIntegerEntryView``
- ``FloatingPointEntryView``
- ``CaseIterablePickerEntryView``

### Available Environment Keys

- ``SwiftUICore/EnvironmentValues/accountViewType``
- ``SwiftUICore/EnvironmentValues/passwordFieldType``
- ``SwiftUICore/EnvironmentValues/accountServiceConfiguration``


================================================
File: Sources/SpeziAccount/SpeziAccount.docc/AccountService/Creating your own Account Service.md
================================================
# Implementing an Account Service

Create a new Account Service implementation to integrate a user account platform.

<!--
                  
This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

## Overview

An `AccountService` is the abstraction layer to create and manage user accounts and can be used to integrate with existing 
user account platforms.

This article guides you through the essential steps to implement your own Account Service.

All account services have to conform to the ``AccountService`` protocol.
An `AccountService` implements account operations and notifies the ``Account`` module of any changes of the associated
``AccountDetails``.

> Tip: Use the ``Account/supplyUserDetails(_:)`` and ``Account/removeUserDetails()`` to update the associated `AccountDetails`.

The code example below demonstrates the minimal protocol requirements of an `AccountService`.
It is an empty `AccountService` that currently doesn't support setting up accounts.

> Warning: An `AccountService` must emit the ``AccountNotifications/Event/deletingAccount(_:)`` notification to allow
    other components to perform cleanup of associated account data.

```swift
import Spezi
import SpeziAccount


public actor MyAccountService: AccountService {
    public let configuration = AccountServiceConfiguration(supportedKeys: .arbitrary)

    @Dependency(Account.self)
    private var account
    @Dependency(AccountNotifications.self)
    private var notifications

    public init() {}

    public func logout() async throws {
        // remove local account association
        await account.removeUserDetails()
    }

    public func delete() async throws {
        guard let details = account.details else {
            return
        }
        // delete account details ...

        // emitting the event is mandatory
        try await notifications.reportEvent(.deletingAccount(details.accountId))

        await account.removeUserDetails()
    }

    public func updateAccountDetails(_ modifications: AccountModifications) async throws {
        // update account details

        // call account.supplyUserDetails(_:) with updated account details
    }
}
```

> Tip: Have a look at the ``InMemoryAccountService`` for an extensive `AccountService` example.

### Configuration

Every account service has to provide their ``AccountService/configuration``.
It is required to supply the ``SupportedAccountKeys``.
Other configurations can be provided through the optional result builder closure.

The code example below demonstrates how to configure an `AccountService` that supports ``SupportedAccountKeys/arbitrary`` storage of
account keys and additionally defines an ``UserIdConfiguration`` and ``RequiredAccountKeys`` configuration.

```swift
AccountServiceConfiguration(supportedKeys: .arbitrary) {
    UserIdConfiguration.emailAddress // userId key has an "email" label and uses the email keyboard

    RequiredAccountKeys {
        \.userId
        \.password
    }
}
```

> Important: If your `AccountService` only supports to store a limited set of `AccountKey`s alongside the user account information
    use ``SupportedAccountKeys/exactly(_:)`` to communicate the supported set of `AccountKey`s.
    Further, refer to the <doc:Custom-Storage-Provider> article on how to integrate with an ``AccountStorageProvider``.

### Specifying Identity Provider

An `IdentityProvider` is an entry point to setting up an account with your `AccountService`.
Your `AccountService` might support one or more identity provider.
For example, a user might sign up with a userId and a password or use a Single-Sign-On provider like
[Sign in with Apple](https://developer.apple.com/sign-in-with-apple).

Use the ``IdentityProvider`` property wrapper inside your `AccountService` to provide UI components that are used
inside the ``AccountSetup`` view that guide a user through setting up an account with your `AccountService`.

> Tip: SpeziAccount provides some UI components out of the box that can be customized to your needs.
    ``AccountSetupProviderView`` and ``SignInWithAppleButton`` are two examples.

The example below demonstrates a setup with two `IdentityProvider` declarations.
For each of them, you create a view component which interact with your `AccountService`.
You can use the SwiftUI [`Environment`](https://developer.apple.com/documentation/swiftui/environment) to access your
`AccountService` within your view.

You can specify a ``AccountSetupSection`` and an `enabled` flag with your `IdentityProvider` declaration.
You can dynamically change the configuration using the ``IdentityProvider/projectedValue`` of the `IdentityProvider`.


```swift
import AuthenticationServices
import Spezi
import SpeziAccount


private struct MySetupView: View {
    @Environment(MyAccountService.self)
    private var service

    var body: some View {
        // An AccountSetupProviderView that doesn't support password reset functionality.
        AccountSetupProviderView { credentials in
            try await service.login(userId: credentials.userId, password: credentials.password)
        } signup: { details in
            try await service.signup(details)
        }
    }

    nonisolated init() {}
}

private struct SignInWithAppleView: View {
    @Environment(MyAccountService.self)
    private var service

    var body: some View {
        SignInWithAppleButton { request in
            service.handleRequest(request)
        } onCompletion: { result in
            service.handleCompletion(result)
        }
    }

    nonisolated init() {}
}


public actor MyAccountService: AccountService {
    public let configuration = AccountServiceConfiguration(supportedKeys: .arbitrary)

    @Dependency(Account.self)
    private var account

    @IdentityProvider(section: .primary)
    private var primarySetup = MySetupView()
    @IdentityProvider(enabled: false, section: .singleSignOn)
    private var signInWithApple = SignInWithAppleView()


    public init(supportsApple: Bool = false) {
        if supportsApple {
            $signInWithApple.isEnabled = true
        }
    }

    public func login(userId: String, password: String) async throws {
        // handle login with the provided credentials
    }

    public func signup(_ details: AccountDetails) async throws {
        // handle signup with provided details
    }

    @MainActor
    fileprivate func handleRequest(_ request: ASAuthorizationAppleIDRequest) {
        // set requested scopes and generate a nonce
    }

    @MainActor
    fileprivate func handleCompletion(_ result: Result<ASAuthorization, any Error>) {
        // handle result
    }
}
```


### Security Related Operations

Some account operations like account deletion or modifying `AccountKeys` like ``AccountDetails/userId`` or ``AccountDetails/password`` are
considered security sensitive operations and might require a authentication before the operation can complete.

Use the ``SecurityRelatedModifier`` property wrapper to inject a [`ViewModifier`](https://developer.apple.com/documentation/swiftui/viewmodifier)
that is injected into all views that might contain security related operations.

```swift
actor MyAccountService: AccountService {
    @SecurityRelatedModifier var myModifier = MyModifier()

    func delete() async throws {
        // pop up an alert that requires entering the password
        try await myModifier.ensureAuthenticated()

        // perform delete
    }
}
```

- Note: For more information refer to the documentation of ``SecurityRelatedModifier``.

## Topics

### Configuration

- ``AccountServiceConfiguration``
- ``SupportedAccountKeys``
- ``RequiredAccountKeys``
- ``UserIdConfiguration``
- ``UserIdType``
- ``FieldValidationRules``

### Managing Account Details

- ``Account/supplyUserDetails(_:)``
- ``Account/removeUserDetails()``

### Identity Provider Views

- ``AccountSetupProviderView``
- ``AccountServiceButton``
- ``SignInWithAppleButton``

### View Components

- ``SignupForm``
- ``SignupFormHeader``
- ``PasswordResetView``
- ``SuccessfulPasswordResetView``

### UI Customization

- ``SwiftUICore/View/reportSignupProviderCompliance(_:)``
- ``SignupProviderCompliance``

### Credentials

- ``UserIdPasswordCredential``


================================================
File: Sources/SpeziAccount/SpeziAccount.docc/AccountService/Custom Storage Provider.md
================================================
# External Storage of Account Details

External storage of account values if not supported by the `AccountService`.

<!--

This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

## Overview

A ``AccountService`` might be limited to only support storing a specific set of ``AccountKey``s alongside the user account information.
In these situations, additional ``AccountDetails`` need to be stored via an external ``AccountStorageProvider``.
Use the ``AccountConfiguration/init(service:storageProvider:configuration:)`` initializer to set up an `AccountStorageProvider` with `SpeziAccount`.

```swift
override var configuration: Configuration {
    Configuration {
        AccountConfiguration(
            service: SomeAccountService(),
            storageProvider: SomeStorageProvider(),
            configuration: [
                // your configuration ...
            ]
        )
    }
}
```


This articles illustrates how to create an `AccountStorageProvider` and how a `AccountService` that doesn't support to store arbitrary account details
can use the ``ExternalAccountStorage`` `Module` to interact with the configured storage provider.

### Implementing an Account Storage Provider

To implement an external storage provider you have to adopt the ``AccountStorageProvider`` protocol.

> Tip: You can have a look at the ``InMemoryAccountStorageProvider`` for an example of an storage provider that
    stores all data locally.

```swift
public actor MyProvider: AccountStorageProvider {
    @Dependency(ExternalAccountStorage.self)
    private var storage

    public func create(_ accountId: String, _ details: AccountDetails) async throws {
        // handle creation of a new record
        try await modify(accountId, AccountModifications(modifiedDetails: details))
    }

    public func load(_ accountId: String, _ keys: [any AccountKey.Type]) async throws -> AccountDetails? {
        // Contact local cache if details are present.
        // If not, return `nil` and notify account service about details retrieved from remote service
        // by calling storage.notifyAboutUpdatedDetails(for:_:).
    }

    public func modify(_ accountId: String, _ modifications: AccountModifications) async throws {
        // update stored details
    }

    public func disassociate(_ accountId: String) async {
        // clear locally cached data
    }

    public func delete(_ accountId: String) async throws {
        // remove record and clear locally cached data
    }
}
```

> Tip: The ``AccountStorageProvider/load(_:_:)`` method must return instantly. You may use the ``AccountDetailsCache`` module
    to locally cache ``AccountDetails`` on disk.

### Interacting with a Storage Provider

If your `AccountService` implementation doesn't support storing arbitrary account details, you are required to interact with the
an external storage provide through the ``ExternalAccountStorage`` `Module` yourself.

> Tip: The ``InMemoryAccountService`` is a great example on how to interact with an `AccountStorageProvider`.

Make sure to implement your `AccountService` the following way
* Declare a dependency to `ExternalAccountStorage`: `@Dependency(ExternalAccountStorage.self) var storage`
* Make sure to subscribe to updates from the storage provider using the `AsyncStream` ``ExternalAccountStorage/updatedDetails``.
* Create a new record by calling ``ExternalAccountStorage/requestExternalStorage(of:for:)``.
* Update externally stored details by calling ``ExternalAccountStorage/updateExternalStorage(with:for:)``.
* Retrieve externally stored details by calling ``ExternalAccountStorage/retrieveExternalStorage(for:_:)-5ngpm`` 

> Note: Refer to the documentation of ``ExternalAccountStorage`` for more information.


================================================
File: Sources/SpeziAccount/SpeziAccount.docc/Setup Guides/Initial Setup.md
================================================
# Initial Setup

<!--

This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

A quick-start guide that shows you how to set up `SpeziAccount` in your App.

## Overview

This article guides you through the mandatory steps to get `SpeziAccount` up and running.

### Account Configuration

Use the ``AccountConfiguration`` `Module` to configure `SpeziAccount` for you application.
The configuration requires an ``AccountService`` and a ordered list of ``AccountKey``s and their requirement level to be specified.
Once configured, you can access the ``Account`` `Module` in the SwiftUI view hierarchy using the `@Environment` property wrapper
or from other Spezi `Modules` using `@Dependency`.

An `AccountService` is the central component that is responsible for implementing user account operations and managing ``AccountDetails``.
The list of ``ConfiguredAccountKey``s defines the ``AccountKeyRequirement`` and the order in which account information is displayed
(though grouped by their ``AccountKey/category``).

```swift
class MyAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        AccountConfiguration(
            service: InMemoryAccountService(),
            configuration: [
                .requires(\.userId),
                .requires(\.password),
                .requires(\.name),
                .collects(\.dateOfBirth),
                .collects(\.genderIdentity)
            ]
        )
    }
}
```

> Note: You may also use the ``ConfiguredAccountKey/supports(_:)-7wwdi`` configuration to mark a ``AccountKey`` as
    ``AccountKeyRequirement/supported``. Such account keys are not collected during signup but may be added when
    editing your account information later on in the account overview.

> Note: A ``AccountService`` might only support storing a fixed set of account keys (see ``SupportedAccountKeys``).
    In those cases you may be required to supply a ``AccountStorageProvider`` to handle storage of additional account values.
    Refer to the <doc:Custom-Storage-Provider> article for information.

### Account Setup

Account setup is handled by the ``AccountSetup`` view. It presents all identity providers of the configured `AccountService`.
A user can interact with the respective view components to set up their account.

You can use the ``Account/signedIn`` and ``Account/details`` properties to determine if a user is signed in and access their account details.

```swift
struct MyView: View {
    @Environment(Account.self) var account

    var body: some View {
        AccountSetup()
    }
}
```

### Account Overview

The ``AccountOverview`` view can be used to view or modify the information of the currently logged-in user account.
Make sure to only display this view if there is an associated user account.

```swift
struct MyView: View {
    var body: some View {
        NavigationStack {
            AccountOverview()
        }
    }
}
```

## Topics

### Configuration

- ``ConfiguredAccountKey``
- ``AccountKeyRequirement``
- ``AccountKeyConfiguration``
- ``AccountOperationError``


================================================
File: Sources/XCTSpeziAccount/XCTSpeziAccount.docc/XCTSpeziAccount.md
================================================
# ``XCTSpeziAccount``

Making writing UI Tests for SpeziAccount-related functionality easier.

<!--

This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

## Topics

### Login

- ``XCTest/XCUIApplication/login(email:password:)``
- ``XCTest/XCUIApplication/login(username:password:)``

### Signup Form

- ``XCTest/XCUIApplication/fillSignupForm(email:password:name:genderIdentity:supplyDateOfBirth:)``
- ``XCTest/XCUIApplication/updateGenderIdentity(from:to:file:line:)``
- ``XCTest/XCUIApplication/changeDateOfBirth()``
- ``XCTest/XCUIApplication/closeSignupForm(discardChangesIfAsked:)``


