This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

================================================================
Directory Structure
================================================================
.github/
  workflows/
    build-and-test.yml
    monthly-markdown-link-check.yml
    pull_request.yml
LICENSES/
  MIT.txt
Sources/
  SpeziKeychainStorage/
    Credentials/
      Credentials.swift
      CredentialsKind.swift
      CredentialsTag.swift
      KeychainStorage+Credentials.swift
    CryptographicKeys/
      CryptographicKeyTag.swift
      KeychainStorage+CryptographicKeys.swift
      SecKey+Extensions.swift
    KeychainStorage.docc/
      KeychainStorage.md
    KeychainItemAccessibility.swift
    KeychainItemStorageOption.swift
    KeychainStorage.swift
  SpeziLocalStorage/
    SpeziLocalStorage.docc/
      SpeziLocalStorage.md
    LocalStorage.swift
    LocalStorageEntry.swift
    LocalStorageError.swift
    LocalStorageKey.swift
    LocalStorageSetting.swift
Tests/
  SpeziStorageTests/
    LocalStorageTests.swift
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
      KeychainStorageTests/
        KeychainStorageTests.swift
        KeychainStorageTestsView.swift
      LocalStorageTests/
        LocalStorageLiveUpdateTestView.swift
        LocalStorageTests.swift
        LocalStorageTestsView.swift
      KeychainBrowser.swift
      SpeziStorageTests.swift
      TestApp.entitlements
      TestApp.entitlements.license
      TestApp.swift
      TestAppDelegate.swift
    TestAppUITests/
      KeychainStorageTest.swift
      LocalStorageTest.swift
    UITests.xcodeproj/
      project.xcworkspace/
        xcshareddata/
          IDEWorkspaceChecks.plist
          IDEWorkspaceChecks.plist.license
        contents.xcworkspacedata
        contents.xcworkspacedata.license
      xcshareddata/
        xcschemes/
          CardinalKitHealthKitToFHIRAdapter.xcscheme.license
          TestApp.xcscheme
          TestApp.xcscheme.license
      project.pbxproj
      project.pbxproj.license
    TestApp.xctestplan
    TestApp.xctestplan.license
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
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
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
  buildandtest_ios:
    name: Build and Test Swift Package iOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    strategy:
      matrix:
        include:
          - buildConfig: Debug
            artifactname: SpeziStorage-Package-iOS.xcresult
            resultBundle: SpeziStorage-Package-iOS.xcresult
          - buildConfig: Release
            artifactname: SpeziStorage-Package-iOS-Release.xcresult
            resultBundle: SpeziStorage-Package-iOS-Release.xcresult
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziStorage-Package
      buildConfig: ${{ matrix.buildConfig }}
      resultBundle: ${{ matrix.resultBundle }}
      artifactname: ${{ matrix.artifactname }}
  buildandtest_visionos:
    name: Build and Test Swift Package visionOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    strategy:
      matrix:
        include:
          - buildConfig: Debug
            artifactname: SpeziStorage-Package-visionOS.xcresult
            resultBundle: SpeziStorage-Package-visionOS.xcresult
          - buildConfig: Release
            artifactname: SpeziStorage-Package-visionOS-Release.xcresult
            resultBundle: SpeziStorage-Package-visionOS-Release.xcresult
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziStorage-Package
      destination: 'platform=visionOS Simulator,name=Apple Vision Pro'
      buildConfig: ${{ matrix.buildConfig }}
      resultBundle: ${{ matrix.resultBundle }}
      artifactname: ${{ matrix.artifactname }}
  buildandtest_macos:
    name: Build and Test Swift Package macOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    strategy:
      matrix:
        include:
          - buildConfig: Debug
            artifactname: SpeziStorage-Package-macOS.xcresult
            resultBundle: SpeziStorage-Package-macOS.xcresult
          - buildConfig: Release
            artifactname: SpeziStorage-Package-macOS-Release.xcresult
            resultBundle: SpeziStorage-Package-macOS-Release.xcresult
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziStorage-Package
      destination: 'platform=macOS,arch=arm64'
      buildConfig: ${{ matrix.buildConfig }}
      resultBundle: ${{ matrix.resultBundle }}
      artifactname: ${{ matrix.artifactname }}
  buildandtestuitests_ios:
    name: Build and Test UI Tests iOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    strategy:
      matrix:
        include:
          - buildConfig: Debug
            resultBundle: TestApp-iOS.xcresult
            artifactname: TestApp-iOS.xcresult
          - buildConfig: Release
            resultBundle: TestApp-iOS-Release.xcresult
            artifactname: TestApp-iOS-Release.xcresult
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      path: 'Tests/UITests'
      scheme: TestApp
      buildConfig: ${{ matrix.buildConfig }}
      resultBundle: ${{ matrix.resultBundle }}
      artifactname: ${{ matrix.artifactname }}
  buildandtestuitests_ipad:
    name: Build and Test UI Tests iPadOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    strategy:
      matrix:
        include:
          - buildConfig: Debug
            resultBundle: TestApp-iPad.xcresult
            artifactname: TestApp-iPad.xcresult
          - buildConfig: Release
            resultBundle: TestApp-iPad-Release.xcresult
            artifactname: TestApp-iPad-Release.xcresult
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      path: 'Tests/UITests'
      scheme: TestApp
      destination: 'platform=iOS Simulator,name=iPad Pro 11-inch (M4)'
      buildConfig: ${{ matrix.buildConfig }}
      resultBundle: ${{ matrix.resultBundle }}
      artifactname: ${{ matrix.artifactname }}
  buildandtestuitests_visionos:
    name: Build and Test UI Tests visionOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    strategy:
      matrix:
        include:
          - buildConfig: Debug
            resultBundle: TestApp-visionOS.xcresult
            artifactname: TestApp-visionOS.xcresult
          - buildConfig: Release
            resultBundle: TestApp-visionOS-Release.xcresult
            artifactname: TestApp-visionOS-Release.xcresult
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      path: 'Tests/UITests'
      scheme: TestApp
      destination: 'platform=visionOS Simulator,name=Apple Vision Pro'
      buildConfig: ${{ matrix.buildConfig }}
      resultBundle: ${{ matrix.resultBundle }}
      artifactname: ${{ matrix.artifactname }}
  uploadcoveragereport:
    name: Upload Coverage Report
    needs: [buildandtest_ios, buildandtest_visionos, buildandtest_macos, buildandtestuitests_ios, buildandtestuitests_ipad, buildandtestuitests_visionos]
    uses: StanfordSpezi/.github/.github/workflows/create-and-upload-coverage-report.yml@v2
    with:
      coveragereports: 'SpeziStorage-Package-iOS.xcresult SpeziStorage-Package-visionOS.xcresult SpeziStorage-Package-macOS.xcresult TestApp-iOS.xcresult TestApp-iPad.xcresult TestApp-visionOS.xcresult'
    secrets:
      token: ${{ secrets.CODECOV_TOKEN }}

================
File: .github/workflows/monthly-markdown-link-check.yml
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
File: Sources/SpeziKeychainStorage/Credentials/Credentials.swift
================
public enum _CredentialsContainerCreationKind: Hashable, Sendable { // swiftlint:disable:this type_name
public protocol _CredentialsContainer: Hashable, Sendable { // swiftlint:disable:this type_name
    public func hash(into hasher: inout Hasher) {
    public var asGenericCredentials: GenericCredentials? {
    public var asInternetCredentials: InternetCredentials? {
    fileprivate subscript<T>(key: CFString, as _: T.Type = T.self) -> T? {
public struct Credentials: _CredentialsContainer, Hashable, @unchecked Sendable { // swiftlint:disable:this file_types_order
    public let _creationKind: _CredentialsContainerCreationKind // swiftlint:disable:this identifier_name
    public var _attributes: [CFString: Any] // swiftlint:disable:this identifier_name
    public var kind: CredentialsKind? {
    init(_ _attributes: [CFString: Any]) { // swiftlint:disable:this identifier_name
    public init(username: String, password: String) {
public struct GenericCredentials: _CredentialsContainer, @unchecked Sendable {
    init(other: some _CredentialsContainer) {
public struct InternetCredentials: _CredentialsContainer, @unchecked Sendable {
    public var accessControl: SecAccessControl? {
    public var accessGroup: String {
    public var accessible: KeychainItemAccessibility? {
    public var creationDate: Date? {
    public var modificationDate: Date? {
    public var description: String? {
    public var comment: String? {
    public var creator: UInt32? {
    public var type: UInt32? {
    public var label: String? {
    public var isInvisible: Bool {
    public var isNegative: Bool {
    public var synchronizable: Bool {
    public var username: String {
    public var password: String {
    public var service: String {
    public var generic: Data? {
    public var securityDomain: String {
    public var server: String {
    public var `protocol`: String? {
    public var authenticationType: String? {
    public var port: Int? {
    public var path: String? {
    fileprivate func isEqual(_ other: Any) -> Bool {

================
File: Sources/SpeziKeychainStorage/Credentials/CredentialsKind.swift
================
public enum CredentialsKind: Hashable, Sendable {

================
File: Sources/SpeziKeychainStorage/Credentials/CredentialsTag.swift
================
public struct CredentialsTag: Hashable, Sendable {
    public let kind: CredentialsKind
    public let storageOption: KeychainItemStorageOption
    public let label: String?
    private init(kind: CredentialsKind, storage: KeychainItemStorageOption, label: String?) {
    public static func internetPassword(
    public static func genericPassword(

================
File: Sources/SpeziKeychainStorage/Credentials/KeychainStorage+Credentials.swift
================
    public func store(_ credentials: Credentials, for tag: CredentialsTag, replaceDuplicates: Bool = true) throws {
        var query = queryFor(username: credentials.username, tag: tag)
            let credentials = GenericCredentials(other: credentials)
            let credentials = InternetCredentials(other: credentials)
    public func updateCredentials(withUsername username: String, for tag: CredentialsTag, with newCredentials: Credentials) throws {
    private enum RetrieveCredentialsLimit {
        var rawValue: CFString {
    public func retrieveCredentials(withUsername username: String?, for tag: CredentialsTag) throws -> Credentials? {
    public func retrieveAllCredentials(
        var query: [CFString: Any] = [:]
    public func retrieveAllGenericCredentials(forService service: String? = nil) throws -> [Credentials] {
        var query: [CFString: Any] = [
    public func retrieveAllInternetCredentials(forServer server: String? = nil) throws -> [Credentials] {
    public func retrieveAllCredentials() throws -> [Credentials] {
        var results: [Credentials] = []
    private func runRetrieveCredentialsQuery(limit: RetrieveCredentialsLimit, extraQueryEntries: [CFString: Any]) throws -> [Credentials] {
        var result: CFTypeRef?
        let items: [[CFString: Any]]
    public func deleteCredentials(
    public func deleteAllCredentials(accessGroup: AccessGroupFilter) throws {
    public func deleteAllGenericCredentials(service: String?, accessGroup: AccessGroupFilter) throws {
        var query = queryFor(username: nil, kind: nil, synchronizable: nil, accessGroup: accessGroup.stringValue)
    public func deleteAllInternetCredentials(server: String?, accessGroup: AccessGroupFilter) throws {
    private func queryFor(username account: String?, tag: CredentialsTag) -> [CFString: Any] {
    private func queryFor(

================
File: Sources/SpeziKeychainStorage/CryptographicKeys/CryptographicKeyTag.swift
================
public struct CryptographicKeyTag: Hashable, Sendable {
    public let tagValue: String
    public let label: String?
    public let storage: KeychainItemStorageOption
    public let size: Int
    public var keyType: CFString { kSecAttrKeyTypeECSECPrimeRandom }
    public init(

================
File: Sources/SpeziKeychainStorage/CryptographicKeys/KeychainStorage+CryptographicKeys.swift
================
    public enum KeyClass: Hashable, Sendable {
        public var rawValue: CFString {
    public func createKey(for keyTag: CryptographicKeyTag) throws -> SecKey {
        let privateKeyAttrs: [CFString: Any] = try { () -> [CFString: Any] in
            var attrs: [CFString: Any] = [
        var attributes: [CFString: Any] = [
        var error: Unmanaged<CFError>?
            let error = error!.takeRetainedValue() // swiftlint:disable:this force_unwrapping
    public func retrievePrivateKey(for keyTag: CryptographicKeyTag) throws -> SecKey? {
    public func retrievePublicKey(for keyTag: CryptographicKeyTag) throws -> SecKey? {
    private func retrieveKey(_ keyClass: KeyClass, for tag: CryptographicKeyTag) throws -> SecKey? { // swiftlint:disable:this cyclomatic_complexity
        var query: [CFString: Any] = [
        var item: CFTypeRef?
    public func retrieveAllKeys(_ keyClass: KeyClass, accessGroup: AccessGroupFilter = .any) throws -> [SecKey] {
        var items: CFTypeRef?
    public func deleteKey(for keyTag: CryptographicKeyTag) throws {
    public func deleteKey(_ key: SecKey) throws {
        let query: [CFString: Any] = [
    public func deleteAllKeys(accessGroup: AccessGroupFilter) throws {

================
File: Sources/SpeziKeychainStorage/CryptographicKeys/SecKey+Extensions.swift
================
    private var simpleAttributes: [String: Any] {
    private var extendedAttributes: [String: Any] {
        let query: [CFString: Any] = [
        var attrs: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &attrs)
    private func readSimpleAttr<R>(_ key: CFString, as _: R.Type = R.self) -> R? { // swiftlint:disable:this type_contents_order
    private func readExtendedAttr<R>(_ key: CFString, as _: R.Type = R.self) -> R? { // swiftlint:disable:this type_contents_order
    public var publicKey: SecKey? {
    public var applicationTag: String? {
    public var applicationLabel: Data? {
    public var label: String? {
    public var keyType: String? {
    public var keyClass: KeychainStorage.KeyClass? {
    public var isPublicKey: Bool {
    public var isPrivateKey: Bool {
    public var accessGroup: String? {
    public var sizeInBits: Int? {
    public var accessControl: SecAccessControl? {
    public var accessible: KeychainItemAccessibility? {
    public var isPermanent: Bool {
    public var effectiveKeySize: Int? {
    public var canEncrypt: Bool {
    public var canDecrypt: Bool {
    public var canDerive: Bool {
    public var canSign: Bool {
    public var canVerify: Bool {
    public var canWrap: Bool {
    public var canUnwrap: Bool {
    public var synchronizable: Bool {
    public var tokenId: KeychainItemTokenID? {
    public var externalRepresentation: Data? {
        var error: Unmanaged<CFError>?
public enum KeychainItemTokenID: Hashable, Sendable {

================
File: Sources/SpeziKeychainStorage/KeychainStorage.docc/KeychainStorage.md
================
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

================
File: Sources/SpeziKeychainStorage/KeychainItemAccessibility.swift
================
public enum KeychainItemAccessibility: Hashable, Sendable {
    public var rawValue: CFString {

================
File: Sources/SpeziKeychainStorage/KeychainItemStorageOption.swift
================
public enum KeychainItemStorageOption: Hashable, Sendable {
    public static let secureEnclave = Self.secureEnclave(requireUserPresence: false)
    public static let keychain = Self.keychain(requireUserPresence: false, accessGroup: nil)
    public static let keychainSynchronizable = Self.keychainSynchronizable(accessGroup: nil)
    public var id: String {
    var accessGroup: String? {
    var isSynchronizable: Bool {
    var isSecureEnclave: Bool {

================
File: Sources/SpeziKeychainStorage/KeychainStorage.swift
================
public final class KeychainStorage: Sendable, Module, EnvironmentAccessible, DefaultInitializable {
    public init() { }
    public enum AccessGroupFilter {
        var stringValue: String? {
    enum KeychainAPIError: Error, Sendable {
    func execute(_ secOperation: @autoclosure () -> OSStatus) throws(KeychainAPIError) {
        let status = secOperation()
    public enum KeychainError: Error, Sendable {
        public enum KeyCreationErrorReason: Sendable {
    func addAccessControlFields(for tag: CryptographicKeyTag, to attrs: inout [CFString: Any]) throws(KeychainError) {
    func addAccessControlFields(for tag: CredentialsTag, to attrs: inout [CFString: Any]) throws(KeychainError) {
    func addAccessControlFields(for storageOption: KeychainItemStorageOption, to attrs: inout [CFString: Any]) throws(KeychainError) {
        let protection: CFString // IDEA maybe allow this to be specified via the API? or at least make the API more fine-grained?
        var flags = SecAccessControlCreateFlags()
        var error: Unmanaged<CFError>?

================
File: Sources/SpeziLocalStorage/SpeziLocalStorage.docc/SpeziLocalStorage.md
================
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

================
File: Sources/SpeziLocalStorage/LocalStorage.swift
================
public final class LocalStorage: Module, DefaultInitializable, EnvironmentAccessible, @unchecked Sendable {
    @Dependency(KeychainStorage.self) private var keychainStorage
    @Application(\.logger) private var logger
    private let fileManager = FileManager.default
    /* private-but-tests */ let localStorageDirectory: URL
    private let encryptionAlgorithm: SecKeyAlgorithm = .eciesEncryptionCofactorX963SHA256AESGCM
    public required init() {
        let paths = fileManager.urls(for: .applicationSupportDirectory, in: .userDomainMask)
    public func configure() {
    private func createLocalStorageDirectoryIfNecessary() throws {
    public func store<Value>(_ value: Value?, for key: LocalStorageKey<Value>) throws {
    public func store<Value>(
    private func storeImp<Value>(_ value: Value, for key: LocalStorageKey<Value>, context: some Any) throws {
        var fileURL = fileURL(for: key)
        let fileExistsAlready = fileManager.fileExists(atPath: fileURL.path)
        func setResourceValues() throws {
                var resourceValues = URLResourceValues()
        let data = try key.encode(value, context: context)
        var encryptError: Unmanaged<CFError>?
    public func load<Value>(_ key: LocalStorageKey<Value>) throws -> Value? {
    public func load<Value>(
    public func hasEntry(for key: LocalStorageKey<some Any>) -> Bool {
    private func readImp<Value>(_ key: LocalStorageKey<Value>, context: some Any) throws -> Value? {
        let fileURL = fileURL(for: key)
        let data = try Data(contentsOf: fileURL)
        var decryptError: Unmanaged<CFError>?
    public func delete(_ key: LocalStorageKey<some Any>) throws {
    private func deleteImp(_ key: LocalStorageKey<some Any>) throws {
    public func deleteAll() throws {
    public func modify<Value>(_ key: LocalStorageKey<Value>, _ transform: (_ value: inout Value?) throws -> Void) throws {
            var value = try readImp(key, context: Void?.none)
    public func modify<Value: CodableWithConfiguration>(
            var value = try readImp(key, context: decodingConfiguration)
    func fileURL(for storageKey: LocalStorageKey<some Any>) -> URL {
        let storageKey = storageKey.key

================
File: Sources/SpeziLocalStorage/LocalStorageEntry.swift
================
public struct LocalStorageEntry<Value>: DynamicProperty { // swiftlint:disable:this file_types_order
    private let key: LocalStorageKey<Value>
    @Environment(LocalStorage.self) private var localStorage
    @State private var internals = LocalStorageEntryInternals<Value>()
    public var wrappedValue: Value? {
    public init(_ key: LocalStorageKey<Value>) {
    public func update() {
private final class LocalStorageEntryInternals<Value> {
    fileprivate var value: Value?
    @ObservationIgnored private var cancellable: AnyCancellable?
    func subscribe(to key: LocalStorageKey<Value>, in localStorage: LocalStorage) {
    func isEqual(_ other: Any) -> Bool {

================
File: Sources/SpeziLocalStorage/LocalStorageError.swift
================
enum LocalStorageError: Error {

================
File: Sources/SpeziLocalStorage/LocalStorageKey.swift
================
public class LocalStorageKeys {
    fileprivate init() {}
public final class LocalStorageKey<Value>: LocalStorageKeys, @unchecked Sendable { // swiftlint:disable:this file_types_order
    let key: String
    let setting: LocalStorageSetting
    private let encodeImp: @Sendable (Value, Any?) throws -> Data
    private let decodeImp: @Sendable (Data, Any?) throws -> Value?
    private let lock = RWLock()
    private let subject = PassthroughSubject<Value?, Never>()
    var publisher: some Publisher<Value?, Never> { subject }
    private init(
    public init(
    func withReadLock<Result>(_ block: () throws -> Result) rethrows -> Result {
    func withWriteLock<Result>(_ block: () throws -> Result) rethrows -> Result {
    func informSubscribersAboutNewValue(_ newValue: Value?) {
    func encode(_ value: Value, context: (some Any)?) throws -> Data {
    func decode(from data: Data, context: (some Any)?) throws -> Value? {
    public static var `default`: Self { .encryptedUsingKeychain() }
    public convenience init(_ key: String, setting: LocalStorageSetting = .default) where Value: Codable {
    public convenience init(_ key: String, setting: LocalStorageSetting = .default) where Value: NSObject & NSSecureCoding {
    public convenience init(_ key: String, setting: LocalStorageSetting = .default) where Value == Data {
    private convenience init<E, D>(
    public convenience init<E: SpeziFoundation.TopLevelEncoder & Sendable, D: SpeziFoundation.TopLevelDecoder & Sendable>(
private struct InvalidCodableWithConfigurationInput: Error {
    init() {}
    fileprivate func encode<T: EncodableWithConfiguration>(_ value: T, configuration: Any) throws -> Output {
    fileprivate func decode<T: DecodableWithConfiguration>(

================
File: Sources/SpeziLocalStorage/LocalStorageSetting.swift
================
public enum LocalStorageSetting: Hashable, @unchecked Sendable {
    var isExcludedFromBackup: Bool {
    func keys(from keychain: KeychainStorage) throws -> (privateKey: SecKey, publicKey: SecKey)? {
        let storageOption: KeychainItemStorageOption
        let keyTag = CryptographicKeyTag(
        let privateKey = try keychain.createKey(for: keyTag)

================
File: Tests/SpeziStorageTests/LocalStorageTests.swift
================
private struct Letter: Codable, Equatable {
    let greeting: String
    fileprivate static let letter = LocalStorageKey<Letter>("letter", setting: .unencrypted())
final class LocalStorageTests: XCTestCase {
    override func setUp() async throws {
            let localStorage = LocalStorage()
    func testLocalStorage() throws {
        let letter = Letter(greeting: "Hello Paul 👋\(String(repeating: "🚀", count: Int.random(in: 0...10)))")
        let storedLetter = try localStorage.load(.letter)
    func testLocalStorageDeletion() throws {
    func testExcludeFromBackupFlag() throws {
        func assertItemAtUrlIsExcludedFromBackupEquals(
            let isExcluded = try XCTUnwrap(url.resourceValues(forKeys: [.isExcludedFromBackupKey]).isExcludedFromBackup)
        let keyYesBackup = LocalStorageKey<Letter>("letter1", setting: .unencrypted(excludeFromBackup: false))
        let keyNoBackup = LocalStorageKey<Letter>("letter2", setting: .unencrypted(excludeFromBackup: true))
        let letter = Letter(greeting: "Hello Lukas 😳😳😳")
    func testDeleteAll() throws {
        let fileManager = FileManager.default
        let localStorageDir = localStorage.localStorageDirectory
            var isDirectory: ObjCBool = false
            let exists = fileManager.fileExists(atPath: localStorageDir.path, isDirectory: &isDirectory)
    func testModify() throws {
        let key = LocalStorageKey<String>("abcabc", setting: .unencrypted())
    func testStoreData() throws {
        let key = LocalStorageKey<Data>("ayoooo", setting: .unencrypted())
        let data = Data([83, 112, 101, 122, 105, 32, 105, 115, 32, 99, 111, 111, 108])
    func testNSSecureCoding() throws {
        let key = LocalStorageKey<NSString>("testTest123", setting: .unencrypted())
        let string = "hello, spezi" as NSString
    func testCodableWithConfiguration() throws {
        struct TestType: Hashable, CodableWithConfiguration {
            struct EncodingConfiguration {
                let multiplicativeFactor: Int
            struct DecodingConfiguration {
            let value: Int
            init(value: Int) {
            init(from decoder: any Decoder, configuration: DecodingConfiguration) throws {
                let container = try decoder.singleValueContainer()
            func encode(to encoder: any Encoder, configuration: EncodingConfiguration) throws {
                var container = encoder.singleValueContainer()
        let key = LocalStorageKey<TestType>(
        let inputValue = TestType(value: 12)
    func testCodableWithConfiguration2() throws {
        struct TestType: Hashable, Codable, CodableWithConfiguration {
            var value: Int
                let container = try decoder.container(keyedBy: CodingKeys.self)
                var container = encoder.container(keyedBy: CodingKeys.self)

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
File: Tests/UITests/TestApp/KeychainStorageTests/KeychainStorageTests.swift
================
func XCTAssertCredentialsMainPropertiesEqual(
    let bothAreFullObjects: Bool
func `throws`(_ block: () throws -> Void) -> Bool {
final class KeychainStorageTests: TestAppTestCase { // swiftlint:disable:this type_body_length
    let keychainStorage: KeychainStorage
    init(keychainStorage: KeychainStorage) {
    func runTests() async throws {
    func testDeleteCredentials() throws {
        let appleCredentialsTag = CredentialsTag.internetPassword(forServer: "apple.com")
        let testKeyTag = CryptographicKeyTag("DeleteKeyTest", storage: .keychain)
        let serverCredentials1 = Credentials(username: "@Schmiedmayer", password: "SpeziInventor")
        let serverCredentials2 = Credentials(username: "Stanford Spezi", password: "Paul")
    func testGenericCredentials() throws { // swiftlint:disable:this function_body_length
        let speziLoginTagNoSync = CredentialsTag.genericPassword(forService: "speziLogin", storage: .keychain)
        let speziLoginTagYesSync = CredentialsTag.genericPassword(forService: "speziLogin", storage: .keychainSynchronizable)
        let apodiniCredentialsTag = CredentialsTag.genericPassword(forService: "apodini")
        var serverCredentials = Credentials(username: "@PSchmiedmayer", password: "SpeziInventor")
            let credentials = try XCTUnwrap(try keychainStorage.retrieveCredentials(withUsername: "@PSchmiedmayer", for: speziLoginTagNoSync))
            var credentialsSet = Set<Credentials>()
        let retrievedUpdatedCredentials = try XCTUnwrap(keychainStorage.retrieveCredentials(withUsername: "@Spezi", for: speziLoginTagYesSync))
    func testInternetCredentials() throws {
        let twitterCredentialsKey = CredentialsTag.internetPassword(forServer: "twitter.com", storage: .keychain)
        let retrievedCredentials = try XCTUnwrap(
        let retrievedUpdatedCredentials = try XCTUnwrap(keychainStorage.retrieveCredentials(withUsername: "@Spezi", for: twitterCredentialsKey))
    func testMultipleInternetCredentials() throws {
        let linkedInCredentialsKey = CredentialsTag.internetPassword(forServer: "linkedin.com")
        let serverCredentials1 = Credentials(username: "Paul Schmiedmayer", password: "SpeziInventor")
        let retrievedCredentials = try XCTUnwrap(keychainStorage.retrieveAllCredentials(for: linkedInCredentialsKey))
            let credentials = try XCTUnwrap(retrievedCredentials.first { $0.username == "Paul Schmiedmayer" }?.asInternetCredentials)
    func testMultipleCredentials() throws {
        let stanfordCredentialsTag = CredentialsTag.internetPassword(forServer: "stanford.edu")
        let googleCredentialsTag = CredentialsTag.internetPassword(forServer: "google.com")
        let retrievedCredentials = try XCTUnwrap(keychainStorage.retrieveAllCredentials(for: stanfordCredentialsTag))
    func testKeys0() throws {
        let tag = CryptographicKeyTag("edu.stanford.spezi.testKey", storage: .keychain, label: "TestKey Label")
        let key = try keychainStorage.createKey(for: tag)
    func testKeys() throws {
        let keyTag1 = CryptographicKeyTag("MyKey1", storage: .keychain, label: "MyKey1")
        let keyTag2 = CryptographicKeyTag("MyKey2", storage: .keychainSynchronizable, label: "MyKey2")
        let keyTag3 = CryptographicKeyTag("MyKey3", storage: .secureEnclave, label: "MyKey3")
            let privateKey = try XCTUnwrap(keychainStorage.retrievePrivateKey(for: keyTag3))
            let publicKey = try XCTUnwrap(keychainStorage.retrievePublicKey(for: keyTag3))
            let algorithm: SecKeyAlgorithm = .eciesEncryptionCofactorX963SHA256AESGCM
            let plainText = Data("Spezi & Paul Schmiedmayer".utf8)
            var encryptError: Unmanaged<CFError>?
            var decryptError: Unmanaged<CFError>?
    func testKeys2() throws {
        var storageOptionsToTest: [KeychainItemStorageOption] = [
            let tag = CryptographicKeyTag("edu.stanford.spezi.testKey_\(idx)", storage: storageOption)

================
File: Tests/UITests/TestApp/KeychainStorageTests/KeychainStorageTestsView.swift
================
struct KeychainStorageTestsView: View {
    @Environment(KeychainStorage.self) var keychainStorage
    var body: some View {

================
File: Tests/UITests/TestApp/LocalStorageTests/LocalStorageLiveUpdateTestView.swift
================
    static let number = LocalStorageKey<Int>("number")
struct LocalStorageLiveUpdateTestView: View { // swiftlint:disable:this file_types_order
    @Environment(LocalStorage.self) private var localStorage
    var body: some View {
struct RowView: View {
    @LocalStorageEntry(.number) private var number

================
File: Tests/UITests/TestApp/LocalStorageTests/LocalStorageTests.swift
================
final class LocalStorageTests: TestAppTestCase {
    struct Letter: Codable, Equatable {
        let greeting: String
    let localStorage: LocalStorage
    let keychainStorage: KeychainStorage
    init(
    func runTests() async throws {
    func testLocalStorageTestEncryptedManualKeys() throws {
        let keyTag = CryptographicKeyTag("LocalStorageTests", storage: .keychain)
        let privateKey = try keychainStorage.retrievePrivateKey(for: keyTag) ?? keychainStorage.createKey(for: keyTag)
        let key = LocalStorageKey<Letter>("letter1", setting: .encrypted(privateKey: privateKey, publicKey: publicKey))
        let letter = Letter(greeting: "Hello Paul 👋\(String(repeating: "🚀", count: Int.random(in: 0...10)))")
        let storedLetter = try localStorage.load(key)
    func testLocalStorageTestEncryptedKeychain() throws {
        let key = LocalStorageKey<Letter>("letter2", setting: .encryptedUsingKeychain())
    func testLocalStorageTestEncryptedSecureEnclave() throws {
        let key = LocalStorageKey<Letter>("letter3", setting: .encryptedUsingSecureEnclave())

================
File: Tests/UITests/TestApp/LocalStorageTests/LocalStorageTestsView.swift
================
struct LocalStorageTestsView: View {
    @Environment(LocalStorage.self) var localStorage
    @Environment(KeychainStorage.self) var keychainStorage
    var body: some View {

================
File: Tests/UITests/TestApp/KeychainBrowser.swift
================
struct KeychainBrowser: View { // swiftlint:disable:this file_types_order
    @Environment(KeychainStorage.self) private var keychain
    @State private var keys: [SecKey] = []
    @State private var genericCredentials: [Credentials] = []
    @State private var internetCredentials: [Credentials] = []
    var body: some View {
    @ViewBuilder private var formActionSections: some View {
                let tag1 = CryptographicKeyTag("edu.stanford.spezi.testKey1", storage: .secureEnclave, label: "Test Key 1")
                let tag2 = CryptographicKeyTag("edu.stanford.spezi.testKey2", storage: .keychain, label: "Test Key 2")
                let tag1 = CredentialsTag.genericPassword(forService: "service_name")
                let tag2 = CredentialsTag.internetPassword(forServer: "stanford.edu")
    @ViewBuilder private var formContentSections: some View {
    private func updateKeys() {
    private func updateCredentials() {
private struct CredentialsDetailsView: View {
    let credentials: Credentials
private struct KeyDetailsView: View {
    let key: SecKey

================
File: Tests/UITests/TestApp/SpeziStorageTests.swift
================
enum SpeziStorageTests: String, TestAppTests {
    func view(withNavigationPath path: Binding<NavigationPath>) -> some View {

================
File: Tests/UITests/TestApp/TestApp.entitlements
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.security.app-sandbox</key>
	<true/>
	<key>keychain-access-groups</key>
	<array>
		<string>$(AppIdentifierPrefix)edu.stanford.spezi.storage.testapp</string>
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
    @ApplicationDelegateAdaptor(TestAppDelegate.self) var appDelegate
    var body: some Scene {

================
File: Tests/UITests/TestApp/TestAppDelegate.swift
================
class TestAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {

================
File: Tests/UITests/TestAppUITests/KeychainStorageTest.swift
================
final class KeychainStorageTests: XCTestCase {
    func testKeychainStorage() throws {
        let app = XCUIApplication()

================
File: Tests/UITests/TestAppUITests/LocalStorageTest.swift
================
final class LocalStorageTests: XCTestCase {
    func testLocalStorage() throws {
        let app = XCUIApplication()
    func testLocalStorageLiveUpdates() async throws {
        func assertNumberEquals(_ expected: Int, file: StaticString = #filePath, line: UInt = #line) {
            let pred = NSPredicate(format: "label MATCHES %@", "Number.*\(expected)")
        let numbers = (0..<17).map { _ in Int.random(in: 0..<5) }

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
File: Tests/UITests/UITests.xcodeproj/xcshareddata/xcschemes/CardinalKitHealthKitToFHIRAdapter.xcscheme.license
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
            buildForRunning = "NO"
            buildForProfiling = "NO"
            buildForArchiving = "NO"
            buildForAnalyzing = "NO">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "SpeziKeychainStorage"
               BuildableName = "SpeziKeychainStorage"
               BlueprintName = "SpeziKeychainStorage"
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
               BlueprintIdentifier = "SpeziLocalStorage"
               BuildableName = "SpeziLocalStorage"
               BlueprintName = "SpeziLocalStorage"
               ReferencedContainer = "container:../..">
            </BuildableReference>
         </BuildActionEntry>
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
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Test"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES">
      <TestPlans>
         <TestPlanReference
            reference = "container:TestApp.xctestplan"
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
		2F2D336229DE0E5A00081B1D /* SpeziLocalStorage in Frameworks */ = {isa = PBXBuildFile; productRef = 2F2D336129DE0E5A00081B1D /* SpeziLocalStorage */; };
		2F2D336B29DE0E7900081B1D /* KeychainStorageTestsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F2D336629DE0E7900081B1D /* KeychainStorageTestsView.swift */; };
		2F2D336D29DE0E7900081B1D /* LocalStorageTestsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F2D336929DE0E7900081B1D /* LocalStorageTestsView.swift */; };
		2F2D336E29DE0E7900081B1D /* LocalStorageTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F2D336A29DE0E7900081B1D /* LocalStorageTests.swift */; };
		2F2D337129DE0E8600081B1D /* LocalStorageTest.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F2D336F29DE0E8600081B1D /* LocalStorageTest.swift */; };
		2F2D337229DE0E8600081B1D /* KeychainStorageTest.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F2D337029DE0E8600081B1D /* KeychainStorageTest.swift */; };
		2F2D338529DE525000081B1D /* TestAppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F2D338429DE525000081B1D /* TestAppDelegate.swift */; };
		2F2D338729DE52EA00081B1D /* SpeziStorageTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F2D338629DE52EA00081B1D /* SpeziStorageTests.swift */; };
		2F6D139A28F5F386007C25D6 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 2F6D139928F5F386007C25D6 /* Assets.xcassets */; };
		2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA7382B290ADFAA007ACEB9 /* TestApp.swift */; };
		80B9585E2D5CE0D50071980D /* XCTestApp in Frameworks */ = {isa = PBXBuildFile; productRef = 80B9585D2D5CE0D50071980D /* XCTestApp */; };
		80B958612D5CE9F30071980D /* XCTestApp in Frameworks */ = {isa = PBXBuildFile; productRef = 80B958602D5CE9F30071980D /* XCTestApp */; };
		80CC46A22D53B1CB005BDFEE /* KeychainStorageTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 80CC46A12D53B1CB005BDFEE /* KeychainStorageTests.swift */; };
		80DEF1BA2D57D03A00DC7E25 /* XCTestApp in Frameworks */ = {isa = PBXBuildFile; productRef = 80DEF1B92D57D03A00DC7E25 /* XCTestApp */; };
		80DEF1BE2D58A9C400DC7E25 /* KeychainBrowser.swift in Sources */ = {isa = PBXBuildFile; fileRef = 80DEF1BD2D58A9C400DC7E25 /* KeychainBrowser.swift */; };
		80F81BC22D492A2100F513C3 /* LocalStorageLiveUpdateTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 80F81BC12D492A2100F513C3 /* LocalStorageLiveUpdateTestView.swift */; };
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
		2F2D336629DE0E7900081B1D /* KeychainStorageTestsView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = KeychainStorageTestsView.swift; sourceTree = "<group>"; };
		2F2D336929DE0E7900081B1D /* LocalStorageTestsView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = LocalStorageTestsView.swift; sourceTree = "<group>"; };
		2F2D336A29DE0E7900081B1D /* LocalStorageTests.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = LocalStorageTests.swift; sourceTree = "<group>"; };
		2F2D336F29DE0E8600081B1D /* LocalStorageTest.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = LocalStorageTest.swift; sourceTree = "<group>"; };
		2F2D337029DE0E8600081B1D /* KeychainStorageTest.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = KeychainStorageTest.swift; sourceTree = "<group>"; };
		2F2D338429DE525000081B1D /* TestAppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TestAppDelegate.swift; sourceTree = "<group>"; };
		2F2D338629DE52EA00081B1D /* SpeziStorageTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SpeziStorageTests.swift; sourceTree = "<group>"; };
		2F61BDC129DD023E00D71D33 /* SpeziStorage */ = {isa = PBXFileReference; lastKnownFileType = wrapper; name = SpeziStorage; path = ../..; sourceTree = "<group>"; };
		2F6D139228F5F384007C25D6 /* TestApp.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = TestApp.app; sourceTree = BUILT_PRODUCTS_DIR; };
		2F6D139928F5F386007C25D6 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		2F6D13AC28F5F386007C25D6 /* TestAppUITests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = TestAppUITests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		2FA7382B290ADFAA007ACEB9 /* TestApp.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TestApp.swift; sourceTree = "<group>"; };
		2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */ = {isa = PBXFileReference; lastKnownFileType = text; path = TestApp.xctestplan; sourceTree = "<group>"; };
		80CC46A12D53B1CB005BDFEE /* KeychainStorageTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = KeychainStorageTests.swift; sourceTree = "<group>"; };
		80DEF1BD2D58A9C400DC7E25 /* KeychainBrowser.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = KeychainBrowser.swift; sourceTree = "<group>"; };
		80F81BC12D492A2100F513C3 /* LocalStorageLiveUpdateTestView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = LocalStorageLiveUpdateTestView.swift; sourceTree = "<group>"; };
		971B61432B9849C100C0B0E2 /* TestApp.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = TestApp.entitlements; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		2F6D138F28F5F384007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2F2D336229DE0E5A00081B1D /* SpeziLocalStorage in Frameworks */,
				80B958612D5CE9F30071980D /* XCTestApp in Frameworks */,
				80DEF1BA2D57D03A00DC7E25 /* XCTestApp in Frameworks */,
				80B9585E2D5CE0D50071980D /* XCTestApp in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A928F5F386007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		2F2D336529DE0E7900081B1D /* KeychainStorageTests */ = {
			isa = PBXGroup;
			children = (
				2F2D336629DE0E7900081B1D /* KeychainStorageTestsView.swift */,
				80CC46A12D53B1CB005BDFEE /* KeychainStorageTests.swift */,
			);
			path = KeychainStorageTests;
			sourceTree = "<group>";
		};
		2F2D336829DE0E7900081B1D /* LocalStorageTests */ = {
			isa = PBXGroup;
			children = (
				2F2D336929DE0E7900081B1D /* LocalStorageTestsView.swift */,
				80F81BC12D492A2100F513C3 /* LocalStorageLiveUpdateTestView.swift */,
				2F2D336A29DE0E7900081B1D /* LocalStorageTests.swift */,
			);
			path = LocalStorageTests;
			sourceTree = "<group>";
		};
		2F6D138928F5F384007C25D6 = {
			isa = PBXGroup;
			children = (
				2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */,
				2F61BDC129DD023E00D71D33 /* SpeziStorage */,
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
				971B61432B9849C100C0B0E2 /* TestApp.entitlements */,
				2FA7382B290ADFAA007ACEB9 /* TestApp.swift */,
				2F2D338429DE525000081B1D /* TestAppDelegate.swift */,
				2F2D338629DE52EA00081B1D /* SpeziStorageTests.swift */,
				80DEF1BD2D58A9C400DC7E25 /* KeychainBrowser.swift */,
				2F2D336829DE0E7900081B1D /* LocalStorageTests */,
				2F2D336529DE0E7900081B1D /* KeychainStorageTests */,
				2F6D139928F5F386007C25D6 /* Assets.xcassets */,
			);
			path = TestApp;
			sourceTree = "<group>";
		};
		2F6D13AF28F5F386007C25D6 /* TestAppUITests */ = {
			isa = PBXGroup;
			children = (
				2F2D336F29DE0E8600081B1D /* LocalStorageTest.swift */,
				2F2D337029DE0E8600081B1D /* KeychainStorageTest.swift */,
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
				2F2D336129DE0E5A00081B1D /* SpeziLocalStorage */,
				80DEF1B92D57D03A00DC7E25 /* XCTestApp */,
				80B9585D2D5CE0D50071980D /* XCTestApp */,
				80B958602D5CE9F30071980D /* XCTestApp */,
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
						LastSwiftMigration = 1430;
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
				80B9585F2D5CE9F30071980D /* XCRemoteSwiftPackageReference "XCTestExtensions" */,
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
				2F2D338529DE525000081B1D /* TestAppDelegate.swift in Sources */,
				2F2D336D29DE0E7900081B1D /* LocalStorageTestsView.swift in Sources */,
				2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */,
				80DEF1BE2D58A9C400DC7E25 /* KeychainBrowser.swift in Sources */,
				2F2D336B29DE0E7900081B1D /* KeychainStorageTestsView.swift in Sources */,
				80F81BC22D492A2100F513C3 /* LocalStorageLiveUpdateTestView.swift in Sources */,
				2F2D338729DE52EA00081B1D /* SpeziStorageTests.swift in Sources */,
				80CC46A22D53B1CB005BDFEE /* KeychainStorageTests.swift in Sources */,
				2F2D336E29DE0E7900081B1D /* LocalStorageTests.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A828F5F386007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2F2D337129DE0E8600081B1D /* LocalStorageTest.swift in Sources */,
				2F2D337229DE0E8600081B1D /* KeychainStorageTest.swift in Sources */,
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
				MACOSX_DEPLOYMENT_TARGET = 14.0;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = DEBUG;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_VERSION = 6.0;
				XROS_DEPLOYMENT_TARGET = 1.0;
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
				MACOSX_DEPLOYMENT_TARGET = 14.0;
				MTL_ENABLE_DEBUG_INFO = NO;
				MTL_FAST_MATH = YES;
				SDKROOT = iphoneos;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_OPTIMIZATION_LEVEL = "-O";
				SWIFT_VERSION = 6.0;
				VALIDATE_PRODUCT = YES;
				XROS_DEPLOYMENT_TARGET = 1.0;
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
				ENABLE_TESTING_SEARCH_PATHS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MACOSX_DEPLOYMENT_TARGET = 14.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.storage.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = YES;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				TARGETED_DEVICE_FAMILY = "1,2,7";
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
				ENABLE_TESTING_SEARCH_PATHS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MACOSX_DEPLOYMENT_TARGET = 14.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.storage.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = YES;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				TARGETED_DEVICE_FAMILY = "1,2,7";
			};
			name = Release;
		};
		2F6D13BD28F5F386007C25D6 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CLANG_ENABLE_MODULES = YES;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				MACOSX_DEPLOYMENT_TARGET = 14.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.storage.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = YES;
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				TARGETED_DEVICE_FAMILY = "1,2,7";
				TEST_TARGET_NAME = TestApp;
			};
			name = Debug;
		};
		2F6D13BE28F5F386007C25D6 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CLANG_ENABLE_MODULES = YES;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				MACOSX_DEPLOYMENT_TARGET = 14.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.storage.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = YES;
				SWIFT_EMIT_LOC_STRINGS = NO;
				TARGETED_DEVICE_FAMILY = "1,2,7";
				TEST_TARGET_NAME = TestApp;
			};
			name = Release;
		};
		2FB07587299DDB6000C0B37F /* Test */ = {
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
				MACOSX_DEPLOYMENT_TARGET = 14.0;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = TEST;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_VERSION = 6.0;
				XROS_DEPLOYMENT_TARGET = 1.0;
			};
			name = Test;
		};
		2FB07588299DDB6000C0B37F /* Test */ = {
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
				ENABLE_TESTING_SEARCH_PATHS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MACOSX_DEPLOYMENT_TARGET = 14.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.storage.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = YES;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				TARGETED_DEVICE_FAMILY = "1,2,7";
			};
			name = Test;
		};
		2FB07589299DDB6000C0B37F /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CLANG_ENABLE_MODULES = YES;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				MACOSX_DEPLOYMENT_TARGET = 14.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.storage.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = YES;
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				TARGETED_DEVICE_FAMILY = "1,2,7";
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
				2FB07587299DDB6000C0B37F /* Test */,
				2F6D13B528F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		2F6D13B628F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestApp" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13B728F5F386007C25D6 /* Debug */,
				2FB07588299DDB6000C0B37F /* Test */,
				2F6D13B828F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		2F6D13BC28F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestAppUITests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13BD28F5F386007C25D6 /* Debug */,
				2FB07589299DDB6000C0B37F /* Test */,
				2F6D13BE28F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */

/* Begin XCRemoteSwiftPackageReference section */
		80B9585F2D5CE9F30071980D /* XCRemoteSwiftPackageReference "XCTestExtensions" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTestExtensions";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.2.1;
			};
		};
/* End XCRemoteSwiftPackageReference section */

/* Begin XCSwiftPackageProductDependency section */
		2F2D336129DE0E5A00081B1D /* SpeziLocalStorage */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziLocalStorage;
		};
		80B9585D2D5CE0D50071980D /* XCTestApp */ = {
			isa = XCSwiftPackageProductDependency;
			productName = XCTestApp;
		};
		80B958602D5CE9F30071980D /* XCTestApp */ = {
			isa = XCSwiftPackageProductDependency;
			package = 80B9585F2D5CE9F30071980D /* XCRemoteSwiftPackageReference "XCTestExtensions" */;
			productName = XCTestApp;
		};
		80DEF1B92D57D03A00DC7E25 /* XCTestApp */ = {
			isa = XCSwiftPackageProductDependency;
			productName = XCTestApp;
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
File: Tests/UITests/TestApp.xctestplan
================
{
  "configurations" : [
    {
      "id" : "074FA9C1-7635-4C64-BF5D-90402604CC46",
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
          "identifier" : "SpeziLocalStorage",
          "name" : "SpeziLocalStorage"
        },
        {
          "containerPath" : "container:..\/..",
          "identifier" : "SpeziKeychainStorage",
          "name" : "SpeziKeychainStorage"
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
File: Tests/UITests/TestApp.xctestplan.license
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
      - SpeziLocalStorage
      - SpeziKeychainStorage

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

attributes:
  attributes_with_arguments_always_on_line_above: false

deployment_target: # Availability checks or attributes shouldn’t be using older versions that are satisfied by the deployment target.
  iOSApplicationExtension_deployment_target: 16.0
  iOS_deployment_target: 16.0

excluded: # paths to ignore during linting. Takes precedence over `included`.
  - .build
  - .swiftpm
  - .deriveddata
  - Tests/UITests/.deriveddata

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
title: "SpeziStorage"
doi: 10.5281/zenodo.7804028
url: "https://github.com/StanfordSpezi/SpeziStorage"

================
File: CONTRIBUTORS.md
================
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



================================================================
End of Codebase
================================================================
