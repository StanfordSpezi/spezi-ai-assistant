Directory structure:
└── stanfordspezi-spezistorage/
    ├── README.md
    ├── CONTRIBUTORS.md
    ├── LICENSE.md
    └── Sources/
        ├── SpeziKeychainStorage/
        │   └── KeychainStorage.docc/
        │       └── KeychainStorage.md
        └── SpeziLocalStorage/
            └── SpeziLocalStorage.docc/
                └── SpeziLocalStorage.md

================================================
File: README.md
================================================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

# Spezi Storage

[![Build and Test](https://github.com/StanfordSpezi/SpeziStorage/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziStorage/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziStorage/branch/main/graph/badge.svg?token=XJ8IJuc0hj)](https://codecov.io/gh/StanfordSpezi/SpeziStorage)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7804028.svg)](https://doi.org/10.5281/zenodo.7804028)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziStorage%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziStorage)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziStorage%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziStorage)

The Spezi Storage framework provides two Modules that enable on-disk storage of information.
The  [`LocalStorage`](https://swiftpackageindex.com/stanfordspezi/spezistorage/documentation/spezilocalstorage/localstorage) module can be used to store information that does not need to be encrypted.
Credentials, keys, and other sensitive information that needs to be encrypted may be stored by using the [`KeychainStorage`](https://swiftpackageindex.com/StanfordSpezi/SpeziStorage/documentation/spezikeychainstorage) module.


## Setup

You need to add the Spezi Storage Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> [!IMPORTANT]
> If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

You can configure the [`LocalStorage`](https://swiftpackageindex.com/stanfordspezi/spezistorage/documentation/spezilocalstorage/localstorage) or [`KeychainStorage`](https://swiftpackageindex.com/StanfordSpezi/SpeziStorage/documentation/spezikeychainstorage) module in the [`SpeziAppDelegate`](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/speziappdelegate).

> [!IMPORTANT]
> If you use SpeziStorage on the macOS platform, ensure to add the [`Keychain Access Groups` entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/keychain-access-groups) to the enclosing Xcode project via *PROJECT_NAME > Signing&Capabilities > + Capability*. The array of keychain groups can be left empty, only the base entitlement is required.

```swift
import Spezi
import SpeziLocalStorage
import SpeziKeychainStorage

class ExampleDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            LocalStorage()
            KeychainStorage()
            // ...
        }
    }
}
```

You can then use the `LocalStorage` or `KeychainStorage` class in any SwiftUI view.

```swift
struct ExampleStorageView: View {
    @Environment(LocalStorage.self) var localStorage
    @Environment(KeychainStorage.self) var keychainStorage
    
    var body: some View {
        // ...
    }
}
```

Alternatively, it is common to use the `LocalStorage` or `KeychainStorage` module in other modules as a dependency: [Spezi Module dependencies](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/module-dependency).


## Local Storage

The `LocalStorage` module enables the on-disk storage of data in mobile applications.

The `LocalStorage` module defaults to storing data encrypted supported by the `KeychainStorage` module.
The [`LocalStorageKey`](https://swiftpackageindex.com/stanfordspezi/spezistorage/documentation/spezilocalstorage/localstoragekey) type is used to define storage entries, and specify how data should be persisted.


## Keychain Storage

The `KeychainStorage` module allows for the encrypted storage of small chunks of sensitive user data, such as usernames and passwords for internet services, or cryptographic keys, using Apple's [Keychain documentation](https://developer.apple.com/documentation/security/keychain_services/keychain_items/using_the_keychain_to_manage_user_secrets). 

Credentials can be stored in the Secure Enclave (if available) or the Keychain. Credentials stored in the Keychain can be made synchronizable between different instances of user devices.

### Handling Credentials

Use the `KeychainStorage` module to store a set of [`Credentials`](https://swiftpackageindex.com/stanfordspezi/spezistorage/documentation/spezikeychainstorage/credentials) instances in the Keychain associated with a server that is synchronizable between different devices.



### Handling Keys

Similar to `Credentials` instances, you can also use the `KeychainStorage` module to interact with cryptographic keys.



For more information, please refer to the [API documentation](https://swiftpackageindex.com/StanfordSpezi/SpeziStorage/documentation).


## The Spezi Template Application

The [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication) provides a great starting point and example using the Spezi Storage module.


## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.


## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziStorage/tree/main/LICENSES) for more information.

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

SpeziStorage contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Vishnu Ravi](https://github.com/vishnuravi)
* [Andreas Bauer](https://github.com/Supereg)
* [Philipp Zagar](https://github.com/philippzagar)
* [Lukas Kollmer](https://github.com/lukaskollmer)


================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


================================================
File: Sources/SpeziKeychainStorage/KeychainStorage.docc/KeychainStorage.md
================================================
# ``SpeziKeychainStorage``

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Securely store small chunks of data, such as credentials and cryptographic keys.


## Overview

The `KeychainStorage` module allows for the encrypted storage of small chunks of sensitive user data, such as usernames and passwords for internet services,
using Apple's [Keychain](https://developer.apple.com/documentation/security/keychain_services/keychain_items/using_the_keychain_to_manage_user_secrets). 

Credentials can be stored in the system keychain, and optionally synchronized across multiple devices.
Cryptographic keys can be stored in the system keychain, or if available the Secure Enclave.


## Setup

You need to add the Spezi Storage Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

> Important: If you use the ``KeychainStorage`` on the macOS platform, ensure to add the [`Keychain Access Groups` entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/keychain-access-groups) to the enclosing Xcode project via *PROJECT_NAME > Signing&Capabilities > + Capability*. The array of keychain groups can be left empty, only the base entitlement is required.

You can configure the ``KeychainStorage`` module in the [`SpeziAppDelegate`](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/speziappdelegate).

```swift
import Spezi
import SpeziKeychainStorage


class ExampleDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            KeychainStorage()
            // ...
        }
    }
}
```

You can then use the `KeychainStorage` class in any SwiftUI view.

```swift
struct ExampleStorageView: View {
    @Environment(KeychainStorage.self) var keychain

    var body: some View {
        // ...
    }
}
```

Alternatively, it is common to use the `KeychainStorage` module in other modules as a dependency: [Spezi Module dependencies](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/module-dependency).


## Using the KeychainStorage Module

You use the `KeychainStorage` module to store, update, retrieve, and delete credentials and cryptographic keys.


### Storing Credentials

The `KeychainStorage` module enables the storage of credentials in the Keychain.

There are two kinds of credentials supported by `KeychainStorage`:
1. Generic Credentials: these are credentials which associated with some service, instead of a specific internet server;
2. Internet Credentials: these are credentials which are associated with a specific internet website, identified by a server address.

Credentials are defined using the ``CredentialsTag`` type, which specifies the kind of credential, and optionally lets you define how entries using this tag should be stored and when they should be accessible:

```swift
extension CredentialsTag {
    static let stanfordSUNet = Self.internetPassword(
        forServer: "stanford.edu",
        storage: .keychainSynchronizable
    )

    static let syncCredentials = Self.genericPassword(
        forService: "my-internal-sync-service",
        storage: .keychainSynchronizable
    )
}
```

Credentials entries in the keychain are identified by their tag and username.


You use ``KeychainStorage/store(_:for:replaceDuplicates:)`` to place credentials into the keychain, and ``KeychainStorage/retrieveCredentials(withUsername:for:)`` to query them:
```swift
try keychainStorage.store(
    Credentials(username: "lukas", password: "isThisSecure?123"),
    for: .stanfordSUNet
)

// retrieval:
if let credentials = try keychainStorage.retrieveCredentials(withUsername: "lukas", for: .stanfordSUNet) {
    // ...
}
```

Credentials cannot be modified once they have been stored into the keychain, but you can use ``KeychainStorage/updateCredentials(withUsername:for:with:)`` which provides this functionality by replacing an existing credentials item with a new one.


You also can delete credentials entries from the keychain, using ``KeychainStorage/deleteCredentials(withUsername:for:)``:
```swift
try keychainStorage.deleteCredentials(
    withUsername: "lukas",
    for: .stanfordSUNet
)
```
This will delete all matching items from the keychain, for this combination of username and tag.


### Storing Keys

The `KeychainStorage` module also enables the creation, storage and management of cryptographic keys.

Analogously to ``CredentialsTag``, there exists a ``CryptographicKeyTag`` type which is used to define cryptographic key entries:

```swift
extension CryptographicKeyTag {
    static let databaseKey = Self("dbKey", storage: .secureEnclave, label: "Database Encryption")
}
```

You then can use the ``CryptographicKeyTag``s to store, retrieve, and delete keys:
```swift
let privateKey = try keychainStorage.createKey(for: .databaseKey)
let publicKey = try keychainStorage.retrievePublicKey(for: .databaseKey)
// ...
try keychainStorage.deleteKey(for: .databaseKey)
```

See ``KeychainStorage`` for more info.


## Topics

### Keychain Storage
- ``KeychainStorage``


================================================
File: Sources/SpeziLocalStorage/SpeziLocalStorage.docc/SpeziLocalStorage.md
================================================
# ``SpeziLocalStorage``

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Safely store data encryped on-disk.


## Setup

You need to add the Spezi Storage Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

You can configure the `LocalStorage` module in the [`SpeziAppDelegate`](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/speziappdelegate).

> Important: If you use the ``LocalStorage`` on the macOS platform, ensure to add the [`Keychain Access Groups` entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/keychain-access-groups) to the enclosing Xcode project via *PROJECT_NAME > Signing&Capabilities > + Capability*. The array of keychain groups can be left empty, only the base entitlement is required.

```swift
import Spezi
import SpeziLocalStorage


class ExampleDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration {
            LocalStorage()
            // ...
        }
    }
}
```


You can interact with the `LocalStorage` module from within SwiftUI views, either using the ``LocalStorageEntry`` property wrapper or by accessing the module directly (see below). 

Alternatively, it is common to use the `LocalStorage` module in other modules as a dependency: [Spezi Module dependencies](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/module-dependency).


## Use the LocalStorage Module

You can use the `LocalStorage` module to store, update, retrieve, and delete element conforming to [`Codable`](https://developer.apple.com/documentation/swift/codable).


### Defining Storage Keys

`LocalStorage` uses unique ``LocalStorageKey``s to .

You define storage keys by placing a static non-computed properties of type ``LocalStorageKey`` into an extension on the ``LocalStorageKeys`` type:

```swift
struct Note: Codable, Equatable {
    let text: String
    let date: Date
}

extension LocalStorageKeys {
    // By default, storage keys are encoded using JSON and stored encrypted.
    static let note = LocalStorageKey<Note>("edu.stanford.spezi.note")
    
    // You can customize these aspects:
    static let plistNote = LocalStorageKey<Note>(
        "edu.stanford.spezi.note2",
        setting: .encryptedUsingSecureEnclave(),
        encoder: PropertyListEncoder(),
        decoder: PropertyListDecoder()
    )
}
```


### Storing and Loading Data

The `LocalStorage` module enables the storage and update of elements conforming to `Codable`.

```swift
let note = Note(text: "Spezi is awesome!", date: Date())

do {
    try localStorage.store(note, for: .note)
} catch {
    // Handle storage errors ...
}
```

See ``LocalStorage/store(_:encoder:storageKey:settings:)`` for more details.



### Reading Data

The `LocalStorage` module enables the retrieval of elements conforming to [`Codable`](https://developer.apple.com/documentation/swift/codable).

```swift
do {
    let storedNote = try localStorage.load(.note)
    // Do something with `storedNote`.
} catch {
    // Handle read errors ...
}
```

See ``LocalStorage/read(_:decoder:storageKey:settings:)`` for more details.


### Deleting Data

The `LocalStorage` module enables the deletion of a previously stored elements.

```swift
do {
    try localStorage.delete(.note)
} catch {
    // Handle delete errors ...
}
```

See ``LocalStorage/delete(_:)`` or ``LocalStorage/delete(storageKey:)`` for more details.

If you need to fully delete the entire local storage, use ``LocalStorage/deleteAll()``.


### SwiftUI

Use the ``LocalStorageEntry`` property wrapper to access individual entries of the `LocalStorage` within a SwiftUI view:
```swift
struct ExampleView: View {
    @LocalStorageEntry(.note)
    private var note
    
    var body: some View {
        // Use note within the view.
        // Assigning a new value to the property wrapper will automatically store it into the LocalStorage.
        // Furthermore, if some other part of your app stores a new value for the `.note` key,
        // the property wrapper will automatically update the view.
    }
}
```

Alternatively, you can also access the `LocalStorage` module directly:

```swift
struct ExampleStorageView: View {
    @Environment(LocalStorage.self) var localStorage

    var body: some View {
        // ...
    }
}
```



## Topics

### LocalStorage

- ``LocalStorage``
- ``LocalStorageKey``
- ``LocalStorageSetting``



