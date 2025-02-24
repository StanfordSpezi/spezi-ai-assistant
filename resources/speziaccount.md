This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

================================================================
Directory Structure
================================================================
.github/
  workflows/
    build-and-test.yml
    markdown-lint-check.yml
    pull_request.yml
.reuse/
  dep5
LICENSES/
  MIT.txt
Sources/
  SpeziAccount/
    AccountService/
      Configuration/
        AccountServiceConfiguration.swift
        AccountServiceConfigurationBuilder.swift
        AccountServiceConfigurationKey.swift
        FieldValidationRules.swift
        RequiredAccountKeys.swift
        SupportedAccountKeys.swift
        UserIdConfiguration.swift
        UserIdType.swift
      IdentityProvider/
        IdentityProvider.swift
        IdentityProviderConfiguration.swift
        SecurityRelatedModifier.swift
      AccountService.swift
    AccountValue/
      Collections/
        AccountAnchor.swift
        AccountDetails.swift
        AccountDetails+Codable.swift
        AccountDetails+TestingSupport.swift
        AccountDetailsBuilder.swift
        AccountKeyCollection.swift
        AccountKeyCollectionBuilder.swift
        AccountModifications.swift
        AccountStorage.swift
      Configuration/
        AccountKeyConfigurationImpl.swift
        AccountKeyRequirement.swift
        AccountOperationError.swift
        AccountValueConfiguration.swift
        ConfiguredAccountKey.swift
      Keys/
        AccountDetailsFlags.swift
        AccountIdKey.swift
        AccountServiceConfigurationDetailsKey.swift
        DateOfBirthKey.swift
        DecodingErrors.swift
        EmailAddressKey.swift
        GenderIdentityKey.swift
        PasswordKey.swift
        PersonNameKey.swift
        UserIdKey.swift
      Visitor/
        AccountKey+Visitor.swift
        AccountKeyVisitor.swift
        AccountValueVisitor.swift
      AccountKey.swift
      AccountKey+Views.swift
      AccountKeyCategory.swift
      AccountKeyMacros.swift
      AccountKeys.swift
      InitialValue.swift
      RequiredAccountKey.swift
    Environment/
      AccountRequiredKey.swift
      AccountServiceConfiguration+Environment.swift
      AccountViewType.swift
      FollowUpBehavior.swift
      PasswordFieldType.swift
      PreferredSetupStyle.swift
      SignupProviderCompliance.swift
    Mock/
      InMemoryAccountService.swift
      InMemoryAccountStorageProvider.swift
      MockBoolKey.swift
      MockDoubleKey.swift
      MockNumericKey.swift
    Model/
      GenderIdentity.swift
      KeyPath+ShortDescription.swift
      UserIdPasswordCredential.swift
      ValidationRule+Account.swift
    Resources/
      Localizable.xcstrings
      Localizable.xcstrings.license
    SpeziAccount.docc/
      AccountKey/
        Adding new Account Values.md
      AccountService/
        Creating your own Account Service.md
        Custom Storage Provider.md
      Setup Guides/
        Initial Setup.md
      SpeziAccount.md
    ViewModel/
      AccountDisplayModel.swift
      AccountOverviewFormViewModel.swift
      AccountOverviewValuesComparator.swift
      CategorizedAccountKeys.swift
      ForEachAccountKeyWrapper.swift
      ViewSizing.swift
    ViewModifier/
      AccountRequiredModifier.swift
      AnyViewModifier.swift
      DisableFieldAssistantsModifier.swift
      DismissiveActions.swift
      RequiredValidationModifier.swift
      VerifyRequiredAccountDetailsModifier.swift
    Views/
      AccountOverview/
        AccountKeyOverviewRow.swift
        AccountOverviewForm.swift
        AccountOverviewHeader.swift
        AccountOverviewSections.swift
        NameOverview.swift
        OverviewSectionIcons.swift
        PasswordChangeSheet.swift
        PasswordValidationRuleFooter.swift
        SecurityOverview.swift
        SingleEditView.swift
        View+AccountOverviewObjects.swift
      AccountSetup/
        SetupProvider/
          AccountServiceButton.swift
          AccountSetupProviderView.swift
          LoginSetupView.swift
          SignInWithAppleButton.swift
          SignupSetupView.swift
        AccountSetupState.swift
        DefaultAccountSetupHeader.swift
        ExistingAccountView.swift
        FollowUpInfoSheet.swift
        ServicesDivider.swift
        SignupSectionsView.swift
      DataDisplay/
        BoolDisplayView.swift
        DataDisplayView.swift
        FixedWidthIntegerDisplayView.swift
        FloatingPointDisplayView.swift
        GridValidationStateFooter.swift
        LocalizableStringDisplayView.swift
        StringDisplayView.swift
      DataEntry/
        BoolEntryView.swift
        CaseIterablePickerEntryView.swift
        DataEntryView.swift
        DateOfBirthPicker.swift
        FixedWidthIntegerEntryView.swift
        FloatingPointEntryView.swift
        GeneralizedDataEntryView.swift
        StringEntryView.swift
      Documentation/
        DocumentationInfoView.swift
        EmptyServicesWarning.swift
        MissingAccountDetailsWarning.swift
      Preview/
        AccountDetailsReader.swift
      AccountSummaryBox.swift
      PasswordResetView.swift
      SignupForm.swift
      SignupFormHeader.swift
      SuccessfulPasswordResetView.swift
    Account.swift
    AccountConfiguration.swift
    AccountDetailsCache.swift
    AccountHeader.swift
    AccountNotifications.swift
    AccountNotifyConstraint.swift
    AccountOverview.swift
    AccountSetup.swift
    AccountStorageProvider.swift
    ExternalAccountStorage.swift
  SpeziAccountMacros/
    AccountKeyMacro.swift
    KeyEntryMacro.swift
    SpeziAccountDiagnostic.swift
    SpeziAccountMacros.swift
  XCTSpeziAccount/
    XCTSpeziAccount.docc/
      XCTSpeziAccount.md
    XCUIApplication+AccountValues.swift
    XCUIApplication+Login.swift
    XCUIApplication+SignupForm.swift
Tests/
  SpeziAccountMacrosTests/
    AccountKeyMacroTests.swift
  SpeziAccountTests/
    AccountDetails+Mock.swift
    AccountDetailsCacheTests.swift
    AccountDetailsTests.swift
    AccountNotificationsTests.swift
    SnapshotTesting.swift
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
      Utils/
        AccountDetails+Default.swift
        BiographyKey.swift
        InvitationCodeKey.swift
        TestStandard.swift
      AccountTestsView.swift
      EntryViewTests.swift
      Features.swift
      Info.plist
      Info.plist.license
      TestApp.entitlements
      TestApp.entitlements.license
      TestApp.swift
      TestAppDelegate.swift
    TestAppUITests/
      Utils/
        Defaults.swift
        XCUIApplication+AccountSetup.swift
        XCUIApplication+TestApp.swift
      AccountOverviewTests.swift
      AccountSetupTests.swift
      DocumentationHintsTests.swift
      EntryViewsTests.swift
      XCUIApplication+TestPrimaryButton.swift
    UITests.xcodeproj/
      project.xcworkspace/
        xcshareddata/
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
# This source file is part of the Spezi open source project
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
  buildandtest_ios:
    name: Build and Test Swift Package
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziAccount-Package
      artifactname: SpeziAccount.xcresult
      resultBundle: SpeziAccount.xcresult
  buildandtest_macos:
    name: Build and Test Swift Package macOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziAccount-Package
      destination: 'platform=macOS,arch=arm64'
      artifactname: SpeziAccount-macOS.xcresult
      resultBundle: SpeziAccount-macOS.xcresult
  buildandtest_visionos:
    name: Build and Test Swift Package visionOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziAccount-Package
      destination: 'platform=visionOS Simulator,name=Apple Vision Pro'
      resultBundle: SpeziAccount-visionOS.xcresult
      artifactname: SpeziAccount-visionOS.xcresult
  buildandtestuitests_ios:
    name: Build and Test UI Tests
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      path: 'Tests/UITests'
      scheme: TestApp
      artifactname: TestApp-iOS.xcresult
      resultBundle: TestApp-iOS.xcresult
  buildandtestuitests_visionos:
    name: Build and Test UI Tests visionOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      path: Tests/UITests
      scheme: TestApp
      destination: 'platform=visionOS Simulator,name=Apple Vision Pro'
      resultBundle: TestApp-visionOS.xcresult
      artifactname: TestApp-visionOS.xcresult
  uploadcoveragereport:
    name: Upload Coverage Report
    needs: [buildandtest_ios, buildandtest_macos, buildandtest_visionos, buildandtestuitests_ios, buildandtestuitests_visionos]
    uses: StanfordSpezi/.github/.github/workflows/create-and-upload-coverage-report.yml@v2
    with:
      coveragereports: SpeziAccount.xcresult SpeziAccount-macOS.xcresult SpeziAccount-visionOS.xcresult TestApp-iOS.xcresult TestApp-visionOS.xcresult
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
# This source file is part of the Spezi open source project
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
File: .reuse/dep5
================
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/

Files: Tests/SpeziAccountTests/__Snapshots__/*
Copyright: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
License: MIT

================
File: LICENSES/MIT.txt
================
MIT License

Copyright (c) 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================
File: Sources/SpeziAccount/AccountService/Configuration/AccountServiceConfiguration.swift
================
public struct AccountServiceConfigurationStorageAnchor: RepositoryAnchor, Sendable {}
public struct AccountServiceConfiguration: Sendable {
    public let storage: AccountServiceConfigurationStorage
    public init(supportedKeys: SupportedAccountKeys) {
    public init(
    private static func createStorage(
        var storage = AccountServiceConfigurationStorage()

================
File: Sources/SpeziAccount/AccountService/Configuration/AccountServiceConfigurationBuilder.swift
================
public enum AccountServiceConfigurationBuilder {
    public static func buildExpression<Key: AccountServiceConfigurationKey>(_ expression: Key) -> [any AccountServiceConfigurationKey] {
    public static func buildBlock(_ components: [any AccountServiceConfigurationKey]...) -> [any AccountServiceConfigurationKey] {
    public static func buildEither(first component: [any AccountServiceConfigurationKey]) -> [any AccountServiceConfigurationKey] {
    public static func buildEither(second component: [any AccountServiceConfigurationKey]) -> [any AccountServiceConfigurationKey] {
    public static func buildOptional(_ component: [any AccountServiceConfigurationKey]?) -> [any AccountServiceConfigurationKey] {
    public static func buildLimitedAvailability(_ component: [any AccountServiceConfigurationKey]) -> [any AccountServiceConfigurationKey] {
    public static func buildArray(_ components: [[any AccountServiceConfigurationKey]]) -> [any AccountServiceConfigurationKey] {

================
File: Sources/SpeziAccount/AccountService/Configuration/AccountServiceConfigurationKey.swift
================
public protocol AccountServiceConfigurationKey: KnowledgeSource<AccountServiceConfigurationStorageAnchor>, Sendable where Value == Self {}
    func store(into repository: inout AccountServiceConfigurationStorage) {

================
File: Sources/SpeziAccount/AccountService/Configuration/FieldValidationRules.swift
================
public struct FieldValidationRules<Key: AccountKey>: AccountServiceConfigurationKey, OptionalComputedKnowledgeSource where Key.Value == String {
    public let key: Key.Type
    public let validationRules: [ValidationRule]
    public init(for key: Key.Type, rules validationRules: [ValidationRule]) {
    public init(for key: Key.Type, rules validationRules: ValidationRule...) {
    public init(for keyPath: KeyPath<AccountKeys, Key.Type>, rules validationRules: [ValidationRule]) {
    public init(for keyPath: KeyPath<AccountKeys, Key.Type>, rules validationRules: ValidationRule...) {
    public static func compute(from repository: AccountServiceConfigurationStorage) -> FieldValidationRules<Key>? {
    public func fieldValidationRules<Key: AccountKey>(for key: Key.Type) -> [ValidationRule]? where Key.Value == String {
    public func fieldValidationRules<Key: AccountKey>(

================
File: Sources/SpeziAccount/AccountService/Configuration/RequiredAccountKeys.swift
================
public struct RequiredAccountKeys: AccountServiceConfigurationKey, DefaultProvidingKnowledgeSource {
    public static let defaultValue = RequiredAccountKeys {
    fileprivate let keys: AccountKeyCollection
    public init(@AccountKeyCollectionBuilder _ keys: () -> [any AccountKeyWithDescription]) {
    public init(ofKeys keys: AccountKeyCollection) {
    public var requiredAccountKeys: AccountKeyCollection {

================
File: Sources/SpeziAccount/AccountService/Configuration/SupportedAccountKeys.swift
================
public enum SupportedAccountKeys: AccountServiceConfigurationKey {
    fileprivate func canStore(_ configuredValue: any AccountKeyConfiguration) -> Bool {
    public var supportedAccountKeys: SupportedAccountKeys {
    func unsupportedAccountKeys(basedOn configuration: AccountValueConfiguration) -> [any AccountKeyConfiguration] {
        let supportedValues = supportedAccountKeys

================
File: Sources/SpeziAccount/AccountService/Configuration/UserIdConfiguration.swift
================
public struct UserIdConfiguration: AccountServiceConfigurationKey, DefaultProvidingKnowledgeSource {
    public static let defaultValue: UserIdConfiguration = .emailAddress
    public let idType: UserIdType
    public let textContentType: TextContentType?
    public let keyboardType: UIKeyboardType
    public init(type: UserIdType, contentType: TextContentType? = .username, keyboardType: UIKeyboardType = .default) {
    public init(type: UserIdType, contentType: TextContentType? = .username) {
    public static let emailAddress = UserIdConfiguration(type: .emailAddress, contentType: .username, keyboardType: .emailAddress)
    public static let emailAddress = UserIdConfiguration(type: .emailAddress, contentType: .username)
    public static let username = UserIdConfiguration(type: .username, contentType: .username)
    public var userIdConfiguration: UserIdConfiguration {

================
File: Sources/SpeziAccount/AccountService/Configuration/UserIdType.swift
================
public enum UserIdType {
    public var localizedStringResource: LocalizedStringResource {

================
File: Sources/SpeziAccount/AccountService/IdentityProvider/IdentityProvider.swift
================
protocol AnyIdentityProvider {
protocol AnyAccountSetupComponent: Sendable {
struct AccountSetupComponent<V: View> {
    let id = UUID()
    let viewClosure: @Sendable @MainActor () -> V
    let configuration: IdentityProviderConfiguration
    init(viewClosure: @escaping @Sendable @MainActor () -> V, configuration: IdentityProviderConfiguration) {
public struct IdentityProvider<V: View> {
    private let viewClosure: @Sendable @MainActor () -> V
    private let configuration: IdentityProviderConfiguration
    @MainActor public var wrappedValue: V {
    public var projectedValue: IdentityProviderConfiguration {
    public init(
    var anyView: AnyView {
    var component: any AnyAccountSetupComponent {

================
File: Sources/SpeziAccount/AccountService/IdentityProvider/IdentityProviderConfiguration.swift
================
public struct AccountSetupSection {
    public static let primary = AccountSetupSection(rawValue: 0)
    public static let `default` = AccountSetupSection(rawValue: 100)
    public static let singleSignOn = AccountSetupSection(rawValue: 200)
    public let rawValue: UInt8
    public init(rawValue: UInt8) {
public final class IdentityProviderConfiguration {
    private let _isEnabled: ManagedAtomic<Bool>
    private let _placement: ManagedAtomic<AccountSetupSection>
    public var isEnabled: Bool {
    public var section: AccountSetupSection {
    init(isEnabled: Bool, section: AccountSetupSection) {

================
File: Sources/SpeziAccount/AccountService/IdentityProvider/SecurityRelatedModifier.swift
================
protocol AnySecurityRelatedModifier {
protocol AnySecurityModifier: Sendable {
struct SecurityModifier<V: ViewModifier> {
    let modifierClosure: @Sendable @MainActor () -> V
    init(_ modifierClosure: @escaping @Sendable @MainActor () -> V) {
public struct SecurityRelatedModifier<V: ViewModifier> {
    private let modifierClosure: @Sendable @MainActor () -> V
    @MainActor public var wrappedValue: V {
    public init(wrappedValue: @autoclosure @escaping @Sendable () -> V) {
    var anyViewModifier: any ViewModifier {
    var securityModifier: any AnySecurityModifier {

================
File: Sources/SpeziAccount/AccountService/AccountService.swift
================
public protocol AccountService: Module, CustomStringConvertible, Sendable, EnvironmentAccessible {
    public var description: String {

================
File: Sources/SpeziAccount/AccountValue/Collections/AccountAnchor.swift
================
public struct AccountAnchor: RepositoryAnchor, Sendable {}

================
File: Sources/SpeziAccount/AccountValue/Collections/AccountDetails.swift
================
private struct RemoveVisitor: AccountKeyVisitor {
    private var details: AccountDetails
    init(_ details: AccountDetails) {
    mutating func visit<Key: AccountKey>(_ key: Key.Type) {
    func final() -> AccountStorage {
private struct CopyVisitor: AccountValueVisitor {
    private let allowOverwrite: Bool
    init(_ details: AccountDetails, allowOverwrite: Bool) {
    static func copyValue<Key: AccountKey>(to destination: inout AccountDetails, for key: Key.Type, value: Key.Value, allowOverwrite: Bool) {
    mutating func visit<Key: AccountKey>(_ key: Key.Type, _ value: Key.Value) {
private struct CopyKeyVisitor: AccountKeyVisitor {
    let source: AccountDetails
    var destination: AccountDetails
    init(source: AccountDetails, destination: AccountDetails, allowOverwrite: Bool) {
public struct AccountDetails {
    fileprivate var storage: AccountStorage
    public init() {
    init(from storage: AccountStorage) {
    public subscript<Key: KnowledgeSource<AccountAnchor>>(_ key: Key.Type) -> Key.Value? where Key.Value: Sendable {
    public subscript<Key: DefaultProvidingKnowledgeSource<AccountAnchor>>(_ key: Key.Type) -> Key.Value where Key.Value: Sendable {
        _ key: Key.Type
    public func get<Source: KnowledgeSource<Anchor>>(_ source: Source.Type) -> Source.Value? where Source.Value: Sendable {
    public mutating func set<Source: KnowledgeSource<Anchor>>(_ source: Source.Type, value newValue: Source.Value?) where Source.Value: Sendable {
    public func collect<Value>(allOf type: Value.Type) -> [Value] {
    public func validateAgainstSignupRequirements(_ configuration: AccountValueConfiguration) throws {
        let missing = configuration.filter { configuration in
            let keyNames = missing.map { $0.keyPathDescription }
    public var startIndex: Index {
    public var endIndex: Index {
    public func index(after index: Index) -> Index {
    public subscript(position: Index) -> ValueRepository<AccountAnchor>.Element {
    public var keys: [any AccountKey.Type] {
    public func contains<Key: AccountKey>(_ key: Key.Type) -> Bool {
    public func contains(_ key: any AccountKey.Type) -> Bool {
    public mutating func add(contentsOf values: AccountDetails, merge: Bool = false) {
        var visitor = CopyVisitor(self, allowOverwrite: merge)
    public mutating func add<Keys: AcceptingAccountKeyVisitor>(contentsOf values: AccountDetails, filterFor keys: Keys, merge: Bool = false) {
        var visitor = CopyKeyVisitor(source: values, destination: self, allowOverwrite: merge)
    public mutating func add(contentsOf values: AccountDetails, filterFor keys: [any AccountKey.Type], merge: Bool = false) {
    public mutating func set<Key: AccountKey>(_ key: Key.Type, value: Key.Value) {
    public mutating func remove<Key: AccountKey>(_ key: Key.Type) {
    public mutating func remove(_ key: any AccountKey.Type) {
    public mutating func removeAll(_ keys: [any AccountKey.Type]) {
        var visitor = RemoveVisitor(self)
    public mutating func removeAll<Keys: AcceptingAccountKeyVisitor>(_ keys: Keys) {
    fileprivate static func anyContains(in details: AccountDetails) -> Bool {
    fileprivate static func anyRemove(in details: inout AccountDetails) {

================
File: Sources/SpeziAccount/AccountValue/Collections/AccountDetails+Codable.swift
================
    public struct AccountKeyCodingKey: CodingKey {
        public let stringValue: String
        public let intValue: Int? = nil
        public init(stringValue: String) {
        public init?(intValue: Int) {
        public init<Key: AccountKey>(_ key: Key.Type) {
        fileprivate init<Key: AccountKey>(_ key: Key.Type, mapping: IdentifierMapping?) {
        public init<Key: AccountKey>(_ keyPath: KeyPath<AccountKeys, Key.Type>) {
    public struct DecodingConfiguration {
        public let keys: [any AccountKey.Type]
        public let identifierMapping: [String: any AccountKey.Type]? // swiftlint:disable:this discouraged_optional_collection
        public let lazyDecoding: Bool
        public let requireAllKeys: Bool
        public init(
    public struct EncodingConfiguration {
    public init(from decoder: any Decoder, configuration: DecodingConfiguration) throws {
        let container = try decoder.container(keyedBy: AccountKeyCodingKey.self)
        let mapping = configuration.identifierMapping.map { IdentifierMapping(mapping: $0) }
        var visitor = DecoderVisitor(container, required: configuration.requireAllKeys, mapping: mapping)
        let details = configuration.keys.acceptAll(&visitor)
    public func encode(to encoder: any Encoder) throws {
    public func encode(to encoder: any Encoder, configuration: EncodingConfiguration) throws {
        let container = encoder.container(keyedBy: AccountKeyCodingKey.self)
        var visitor = EncoderVisitor(container, mapping: mapping)
        let result = acceptAll(&visitor)
    fileprivate struct IdentifierMapping {
        let mapping: [ObjectIdentifier: String]
        init(mapping: [String: any AccountKey.Type]) {
        func identifier<Key: AccountKey>(for key: Key.Type) -> String? {
    private struct EncoderVisitor: AccountValueVisitor {
        private let mapping: IdentifierMapping?
        private var container: KeyedEncodingContainer<AccountKeyCodingKey>
        private var firstError: (any Error)?
        init(_ container: KeyedEncodingContainer<AccountKeyCodingKey>, mapping: IdentifierMapping?) {
        mutating func visit<Key: AccountKey>(_ key: Key.Type, _ value: Key.Value) {
        func final() -> Result<Void, any Error> {
    private struct DecoderVisitor: AccountKeyVisitor {
        private let container: KeyedDecodingContainer<AccountKeyCodingKey>
        private let requireKeys: Bool
        private var details = AccountDetails()
        private(set) var errors: [(any AccountKey.Type, any Error)] = []
        init(_ container: KeyedDecodingContainer<AccountKeyCodingKey>, required: Bool, mapping: IdentifierMapping?) {
        mutating func visit<Key: AccountKey>(_ key: Key.Type) {
                let codingKey = AccountKeyCodingKey(key, mapping: mapping)
                    let value = try container.decode(Key.Value.self, forKey: codingKey)
                    let value = try container.decodeIfPresent(Key.Value.self, forKey: codingKey)
        func final() -> AccountDetails {

================
File: Sources/SpeziAccount/AccountValue/Collections/AccountDetails+TestingSupport.swift
================
    static func createMock(
        var details = AccountDetails()

================
File: Sources/SpeziAccount/AccountValue/Collections/AccountDetailsBuilder.swift
================
class AccountDetailsBuilder {
    var storage: AccountDetails
    var defaultValues: AccountDetails
    convenience init() {
    init(from storage: AccountDetails) {
    func clear() {
    func get<Key: AccountKey>(_ key: Key.Type) -> Key.Value? {
    func set<Key: AccountKey>(_ key: Key.Type, value: Key.Value) -> Self {
    func set<Key: AccountKey>(_ key: Key.Type, defaultValue value: Key.Value) -> Self {
    func add(contentsOf values: AccountDetails, merge: Bool = false) -> Self {
    func remove<Key: AccountKey>(_ key: Key.Type) -> Self {
    func remove(_ key: any AccountKey.Type) -> Self {
    func removeAll<Keys: AcceptingAccountKeyVisitor>(_ keys: Keys) -> Self {
    func removeAll(_ keys: [any AccountKey.Type]) -> Self {
    func contains<Key: AccountKey>(_ key: Key.Type) -> Bool {
    func contains(_ key: any AccountKey.Type) -> Bool {
    func build() -> AccountDetails {
    var startIndex: Index {
    var endIndex: Index {
    func index(after index: Index) -> Index {
    subscript(position: Index) -> any AnyRepositoryValue {
    func setEmptyValue(for accountKey: any AccountKey.Type) -> Self {
    fileprivate static func setEmpty(in builder: AccountDetailsBuilder) {

================
File: Sources/SpeziAccount/AccountValue/Collections/AccountKeyCollection.swift
================
public protocol AccountKeyWithDescription: Sendable, CustomStringConvertible, CustomDebugStringConvertible {
struct AccountKeyWithKeyPathDescription<Key: AccountKey>: AccountKeyWithDescription {
    let key: Key.Type
    let description: String
    var debugDescription: String {
    init(key: Key.Type, description: String) {
    init(_ keyPath: KeyPath<AccountKeys, Key.Type>) {
public struct AccountKeyCollection {
    private var elements: [any AccountKeyWithDescription]
    public var _keys: [any AccountKey.Type] { // swiftlint:disable:this identifier_name
    public init() {
    init(_ elements: [any AccountKeyWithDescription]) {
    public init(@AccountKeyCollectionBuilder _ keys: () -> [any AccountKeyWithDescription]) {
    public func contains<Key: AccountKey>(_ key: Key.Type) -> Bool {
    public mutating func removeAll(_ keys: [any AccountKey.Type]) {
        let contained = Set(keys.map { ObjectIdentifier($0) })
    public mutating func removeAll<Keys: AcceptingAccountKeyVisitor>(_ keys: Keys) {
    public func acceptAll<Visitor: AccountKeyVisitor>(_ visitor: inout Visitor) -> Visitor.Final {
    public var startIndex: Int {
    public var endIndex: Int {
    public func index(after index: Int) -> Int {
    public subscript(position: Int) -> any AccountKeyWithDescription {

================
File: Sources/SpeziAccount/AccountValue/Collections/AccountKeyCollectionBuilder.swift
================
public enum AccountKeyCollectionBuilder {
    public static func buildExpression<Key: AccountKey>(_ expression: KeyPath<AccountKeys, Key.Type>) -> [any AccountKeyWithDescription] {
    public static func buildBlock(_ components: [any AccountKeyWithDescription]...) -> [any AccountKeyWithDescription] {
    public static func buildEither(first component: [any AccountKeyWithDescription]) -> [any AccountKeyWithDescription] {
    public static func buildEither(second component: [any AccountKeyWithDescription]) -> [any AccountKeyWithDescription] {
    public static func buildOptional(_ component: [any AccountKeyWithDescription]?) -> [any AccountKeyWithDescription] {
    public static func buildLimitedAvailability(_ component: [any AccountKeyWithDescription]) -> [any AccountKeyWithDescription] {
    public static func buildArray(_ components: [[any AccountKeyWithDescription]]) -> [any AccountKeyWithDescription] {

================
File: Sources/SpeziAccount/AccountValue/Collections/AccountModifications.swift
================
public struct AccountModifications {
    public private(set) var modifiedDetails: AccountDetails
    public private(set) var removedAccountDetails: AccountDetails
    public var removedAccountKeys: [any AccountKey.Type] {
    public var isEmpty: Bool {
    public init(modifiedDetails: AccountDetails, removedAccountDetails: AccountDetails = AccountDetails()) throws {
    public mutating func removeModifications(for keys: [any AccountKey.Type]) {
    public mutating func removeModifications<Keys: AcceptingAccountKeyVisitor>(for keys: Keys) {

================
File: Sources/SpeziAccount/AccountValue/Collections/AccountStorage.swift
================


================
File: Sources/SpeziAccount/AccountValue/Configuration/AccountKeyConfigurationImpl.swift
================
public protocol AccountKeyConfiguration: CustomStringConvertible, CustomDebugStringConvertible, Identifiable, Hashable, Sendable
struct AccountKeyConfigurationImpl<Key: AccountKey>: AccountKeyConfiguration {
    let key: Key.Type
    let requirement: AccountKeyRequirement
    let keyPathDescription: String
    init(_ keyPath: KeyPath<AccountKeys, Key.Type>, requirement: AccountKeyRequirement) {
    var keyWithDescription: any AccountKeyWithDescription {
    var id: ObjectIdentifier {
    var description: String {
    var debugDescription: String {
    func hash(into hasher: inout Hasher) {

================
File: Sources/SpeziAccount/AccountValue/Configuration/AccountKeyRequirement.swift
================
public enum AccountKeyRequirement {

================
File: Sources/SpeziAccount/AccountValue/Configuration/AccountOperationError.swift
================
public enum AccountOperationError: LocalizedError {
    public var errorDescription: String? {
    public var failureReason: String? {
    public var recoverySuggestion: String? {
    private var errorDescriptionValue: String.LocalizationValue {
    private var failureReasonValue: String.LocalizationValue {
    private var recoverySuggestionValue: String.LocalizationValue {

================
File: Sources/SpeziAccount/AccountValue/Configuration/AccountValueConfiguration.swift
================
public struct AccountValueConfiguration {
    enum IncludeCollectedType {
    public static let `default` = AccountValueConfiguration(.default)
    private var configuration: OrderedDictionary<ObjectIdentifier, any AccountKeyConfiguration>
    public var keys: AccountKeyCollection {
    init(_ configuration: [ConfiguredAccountKey]) {
    func all(filteredBy filter: [AccountKeyRequirement]? = nil) -> [any AccountKey.Type] {
    func allCategorized(filteredBy filter: [AccountKeyRequirement]? = nil) -> OrderedDictionary<AccountKeyCategory, [any AccountKey.Type]> {
    func missingRequiredKeys(
        let keysPresent = Set(details.keys.map { ObjectIdentifier($0) })
        let missingKeys = filter { entry in
        let result = switch includeCollected {
    public subscript(_ key: any AccountKey.Type) -> (any AccountKeyConfiguration)? {
    public subscript<Key: AccountKey>(_ key: Key.Type) -> (any AccountKeyConfiguration)? {
    public subscript<Key: AccountKey>(dynamicMember keyPath: KeyPath<AccountKeys, Key.Type>) -> (any AccountKeyConfiguration)? {
    public static let `default`: [ConfiguredAccountKey] = [
    public var startIndex: Index {
    public var endIndex: Index {
    public func index(after index: Index) -> Index {
    public subscript(position: Index) -> any AccountKeyConfiguration {
    public init(arrayLiteral elements: ConfiguredAccountKey...) {

================
File: Sources/SpeziAccount/AccountValue/Configuration/ConfiguredAccountKey.swift
================
public struct ConfiguredAccountKey {
    let configuration: any AccountKeyConfiguration
    private init<Key: AccountKey>(configuration: AccountKeyConfigurationImpl<Key>) {
    public static func requires<Key: AccountKey>(_ keyPath: KeyPath<AccountKeys, Key.Type>) -> ConfiguredAccountKey {
    public static func collects<Key: AccountKey>(_ keyPath: KeyPath<AccountKeys, Key.Type>) -> ConfiguredAccountKey {
    public static func supports<Key: AccountKey>(_ keyPath: KeyPath<AccountKeys, Key.Type>) -> ConfiguredAccountKey {
    public static func manual<Key: AccountKey>(_ keyPath: KeyPath<AccountKeys, Key.Type>) -> ConfiguredAccountKey {
    public static func collects<Key: RequiredAccountKey>(_ keyPath: KeyPath<AccountKeys, Key.Type>) -> ConfiguredAccountKey {
    public static func supports<Key: RequiredAccountKey>(_ keyPath: KeyPath<AccountKeys, Key.Type>) -> ConfiguredAccountKey {
    public static func manual<Key: RequiredAccountKey>(_ keyPath: KeyPath<AccountKeys, Key.Type>) -> ConfiguredAccountKey {

================
File: Sources/SpeziAccount/AccountValue/Keys/AccountDetailsFlags.swift
================
struct AccountDetailsFlags: OptionSet, Sendable {
    let rawValue: UInt16
    init(rawValue: UInt16) {
    static let isNewUser = AccountDetailsFlags(rawValue: 1 << 0)
    static let isAnonymousUser = AccountDetailsFlags(rawValue: 1 << 1)
    static let isVerified = AccountDetailsFlags(rawValue: 1 << 2)
    static let isIncomplete = AccountDetailsFlags(rawValue: 1 << 3)
    fileprivate struct AccountDetailsFlagsKey: DefaultProvidingKnowledgeSource {
        static let defaultValue: AccountDetailsFlags = []
    var flags: AccountDetailsFlags {
    public var isNewUser: Bool {
    public var isAnonymous: Bool {
    public var isVerified: Bool {
    public var isIncomplete: Bool {

================
File: Sources/SpeziAccount/AccountValue/Keys/AccountIdKey.swift
================
private struct DisplayView: DataDisplayView {
    var body: some View {
    init(_ value: String) {}
private struct EntryView: DataEntryView {
    init(_ value: Binding<String>) {}
    public var accountId: String

================
File: Sources/SpeziAccount/AccountValue/Keys/AccountServiceConfigurationDetailsKey.swift
================
    struct AccountServiceConfigurationDetailsKey: DefaultProvidingKnowledgeSource {
        static let defaultValue = AccountServiceConfiguration(supportedKeys: .exactly(AccountKeyCollection()))
    public var accountServiceConfiguration: AccountServiceConfiguration {
    public var userIdType: UserIdType {

================
File: Sources/SpeziAccount/AccountValue/Keys/DateOfBirthKey.swift
================
private struct DisplayView: DataDisplayView { // swiftlint:disable:this file_types_order
    private let value: Date
    private var locale
    private var formatStyle: Date.FormatStyle {
    var body: some View {
    init(_ value: Date) {
private struct EntryView: DataEntryView {
    @Binding private var value: Date
    private var account
    private var viewType
    private var isRequired: Bool {
    init(_ value: Binding<Date>) {
    public var dateOfBirth: Date?
    public var dateOfBrith: Date? {

================
File: Sources/SpeziAccount/AccountValue/Keys/DecodingErrors.swift
================
    private struct DecodingErrors: KnowledgeSource {
    public var decodingErrors: [(any AccountKey.Type, any Error)]? { // swiftlint:disable:this discouraged_optional_collection

================
File: Sources/SpeziAccount/AccountValue/Keys/EmailAddressKey.swift
================
private struct EntryView: DataEntryView {
    @Binding private var email: String
    var body: some View {
    init(_ value: Binding<String>) {
    public struct __Key_email: AccountKey { // swiftlint:disable:this type_name
        public static let name = LocalizedStringResource("USER_ID_EMAIL", bundle: .atURL(from: .module))
        public static let identifier = "email"
        public static let category: AccountKeyCategory = .contactDetails
        public struct DataEntry: DataEntryView {
            @Binding private var value: Value
            public var body: some View {
            public init(_ value: Binding<Value>) {
    public var email: String?
    public var email: String? {
    public static func compute(from repository: AccountStorage) -> String? {

================
File: Sources/SpeziAccount/AccountValue/Keys/GenderIdentityKey.swift
================
    public var genderIdentity: GenderIdentity?

================
File: Sources/SpeziAccount/AccountValue/Keys/PasswordKey.swift
================
private struct EntryView: DataEntryView {
    private var accountViewType
    private var fieldType
    private var validation
    @Binding private var password: String
    var body: some View {
    init(_ value: Binding<String>) {
    public var password: String?

================
File: Sources/SpeziAccount/AccountValue/Keys/PersonNameKey.swift
================
private struct DisplayView: DataDisplayView {
    private let value: PersonNameComponents
    var body: some View {
    init(_ value: PersonNameComponents) {
private struct EntryView: DataEntryView {
    private var account
    @ValidationState private var givenNameValidation
    @ValidationState private var familyNameValidation
    @Binding private var name: PersonNameComponents
    private var nameIsRequired: Bool {
    private var validationRule: ValidationRule {
    init(_ value: Binding<PersonNameComponents>) {
    public var name: PersonNameComponents?

================
File: Sources/SpeziAccount/AccountValue/Keys/UserIdKey.swift
================
private struct DisplayView: DataDisplayView {
    private let value: String
    private var configuration
    var body: some View {
    init(_ value: String) {
private struct EntryView: DataEntryView {
    @Binding private var userId: String
    init(_ value: Binding<String>) {
    public struct __Key_userId: RequiredAccountKey { // swiftlint:disable:this type_name
        public static let name = LocalizedStringResource("USER_ID", bundle: .atURL(from: .module))
        public static let identifier = "userId"
        public static let category: AccountKeyCategory = .credentials
        public struct DataDisplay: DataDisplayView {
            private let value: Value
            public var body: some View {
            public init(_ value: Value) {
        public struct DataEntry: DataEntryView {
            @Binding private var value: Value
            public init(_ value: Binding<Value>) {
    public var userId: String
    public var userId: String {
    public static func compute(from repository: AccountStorage) -> String {

================
File: Sources/SpeziAccount/AccountValue/Visitor/AccountKey+Visitor.swift
================
    public static func accept<Visitor: AccountValueVisitor>(_ visitor: inout Visitor, _ value: Value) {
    public static func accept<Visitor: AccountValueVisitor>(_ visitor: Visitor, _ value: Value) where Visitor: AnyObject {
        var visitor = visitor
    public static func accept<Visitor: AccountKeyVisitor>(_ visitor: inout Visitor) {
    public static func accept<Visitor: AccountKeyVisitor>(_ visitor: Visitor) where Visitor: AnyObject {
    fileprivate static func acceptRequired<Visitor: AccountValueVisitor>(_ visitor: inout Visitor, _ value: Any) {
    fileprivate static func acceptRequired<Visitor: AccountKeyVisitor>(_ visitor: inout Visitor) {

================
File: Sources/SpeziAccount/AccountValue/Visitor/AccountKeyVisitor.swift
================
public protocol AcceptingAccountKeyVisitor {
public protocol AccountKeyVisitor {
    public mutating func visit<Key: RequiredAccountKey>(_ key: Key.Type) {
    public func final() {}
    fileprivate static func defaultAccept<Visitor: AccountKeyVisitor>(_ visitor: inout Visitor) {
    fileprivate static func anyAccept<Visitor: AccountKeyVisitor>(_ visitor: inout Visitor) {
    public func acceptAll<Visitor: AccountKeyVisitor>(_ visitor: Visitor) -> Visitor.Final where Visitor: AnyObject {
        var visitor = visitor
    public func acceptAll<Visitor: AccountKeyVisitor>(_ visitor: inout Visitor) -> Visitor.Final {
    public var _keys: [any AccountKey.Type] { // swiftlint:disable:this identifier_name

================
File: Sources/SpeziAccount/AccountValue/Visitor/AccountValueVisitor.swift
================
public protocol AcceptingAccountValueVisitor {
public protocol AccountValueVisitor {
    public mutating func visit<Key: RequiredAccountKey>(_ key: Key.Type, _ value: Key.Value) {
    public func final() {}
    fileprivate static func defaultAccept<Visitor: AccountValueVisitor>(_ visitor: inout Visitor, _ value: Value) {
    fileprivate static func anyAccept<Visitor: AccountValueVisitor>(_ visitor: inout Visitor, _ value: Any) {
    public func acceptAll<Visitor: AccountValueVisitor>(_ visitor: inout Visitor) -> Visitor.Final {
    public func acceptAll<Visitor: AccountValueVisitor>(_ visitor: Visitor) -> Visitor.Final where Visitor: AnyObject {
        var visitor = visitor

================
File: Sources/SpeziAccount/AccountValue/AccountKey.swift
================
public protocol AccountKey: KnowledgeSource<AccountAnchor> where Value: Sendable, Value: Equatable, Value: Codable {
    static var id: ObjectIdentifier {
    static var isRequired: Bool {
    static var isHiddenCredential: Bool {
    public static var initialValue: InitialValue<Value> {

================
File: Sources/SpeziAccount/AccountValue/AccountKey+Views.swift
================
    static func emptyDataEntryView() -> AnyView {
    static func dataEntryViewWithStoredValueOrInitial(details: AccountDetails) -> AnyView {
        let value = details[Self.self] ?? initialValue.value
    static func dataEntryViewFromBuilder(
    static func dataDisplayViewWithCurrentStoredValue(from details: AccountDetails) -> AnyView? {
    static func singleEditView(model: AccountOverviewFormViewModel, details accountDetails: AccountDetails) -> AnyView {

================
File: Sources/SpeziAccount/AccountValue/AccountKeyCategory.swift
================
public struct AccountKeyCategory {
    public static let credentials = AccountKeyCategory(title: LocalizedStringResource("UP_CREDENTIALS", bundle: .atURL(from: .module)))
    public static let name = AccountKeyCategory(title: LocalizedStringResource("UP_NAME", bundle: .atURL(from: .module)))
    public static let contactDetails = AccountKeyCategory(title: LocalizedStringResource("UP_CONTACT_DETAILS", bundle: .atURL(from: .module)))
    public static let personalDetails = AccountKeyCategory(title: LocalizedStringResource("UP_PERSONAL_DETAILS", bundle: .atURL(from: .module)))
    public static let other = AccountKeyCategory()
    public let categoryTitle: LocalizedStringResource?
    private init(title categoryTitle: LocalizedStringResource? = nil) {
    public init(title categoryTitle: LocalizedStringResource) {
    public var id: String {
    public func hash(into hasher: inout Hasher) {

================
File: Sources/SpeziAccount/AccountValue/AccountKeyMacros.swift
================
public struct _EmptyDataView: DataDisplayView, DataEntryView { // swiftlint:disable:this type_name
    public var body: some View {
    public init(_ value: Never) {}
    public init(_ value: Binding<Never>) {}

================
File: Sources/SpeziAccount/AccountValue/AccountKeys.swift
================
public struct AccountKeys {
    private init() {}

================
File: Sources/SpeziAccount/AccountValue/InitialValue.swift
================
public enum InitialValue<Value> {
    var value: Value {

================
File: Sources/SpeziAccount/AccountValue/RequiredAccountKey.swift
================
public protocol RequiredAccountKey: AccountKey, DefaultProvidingKnowledgeSource {}
    public static var defaultValue: Value {

================
File: Sources/SpeziAccount/Environment/AccountRequiredKey.swift
================
    @Entry public var accountRequired: Bool = false

================
File: Sources/SpeziAccount/Environment/AccountServiceConfiguration+Environment.swift
================
    @Entry public var accountServiceConfiguration: AccountServiceConfiguration = .init(supportedKeys: .arbitrary)

================
File: Sources/SpeziAccount/Environment/AccountViewType.swift
================
public enum AccountViewType {
    public var enteringNewData: Bool {
    public enum OverviewEntryMode {
    @Entry public var accountViewType: AccountViewType?

================
File: Sources/SpeziAccount/Environment/FollowUpBehavior.swift
================
public enum FollowUpBehavior {
    public static var automatic: FollowUpBehavior {
    @Entry var followUpBehavior: FollowUpBehavior = .automatic
    public func followUpBehaviorAfterSetup(_ behavior: FollowUpBehavior) -> some View {

================
File: Sources/SpeziAccount/Environment/PasswordFieldType.swift
================
public enum PasswordFieldType {
    public var localizedStringResource: LocalizedStringResource {
    public var localizedPrompt: LocalizedStringResource {
    private struct PasswordFieldTypeKey: EnvironmentKey {
        static let defaultValue: PasswordFieldType = .password
    @Entry public var passwordFieldType: PasswordFieldType = .password

================
File: Sources/SpeziAccount/Environment/PreferredSetupStyle.swift
================
public enum PreferredSetupStyle {
    @Entry var preferredSetupStyle: PreferredSetupStyle = .automatic
    public func preferredAccountSetupStyle(_ setupStyle: PreferredSetupStyle) -> some View {

================
File: Sources/SpeziAccount/Environment/SignupProviderCompliance.swift
================
private struct SignupProviderComplianceKey: PreferenceKey {
    struct Entry: Equatable {
        let date: Date
        let compliance: SignupProviderCompliance
        init(_ compliance: SignupProviderCompliance) {
    static let defaultValue: Entry? = nil
    static func reduce(value: inout Entry?, nextValue: () -> Entry?) {
        let next = nextValue()
public struct SignupProviderCompliance {
    enum VisualizedAccountKeys {
    fileprivate let creationDate: Date = .now
    let visualizedAccountKeys: VisualizedAccountKeys
    public static var compliant: SignupProviderCompliance {
    public static func askedFor(keys: [any AccountKey.Type]) -> SignupProviderCompliance {
    public static func askedFor(keys: AccountKeyCollection) -> SignupProviderCompliance {
    public static func askedFor(@AccountKeyCollectionBuilder keys: () -> [any AccountKeyWithDescription]) -> SignupProviderCompliance {
    public func reportSignupProviderCompliance(_ compliance: SignupProviderCompliance?) -> some View {
    func receiveSignupProviderCompliance(receive action: @escaping @Sendable (SignupProviderCompliance?) -> Void) -> some View {

================
File: Sources/SpeziAccount/Mock/InMemoryAccountService.swift
================
private struct MockUserIdPasswordEmbeddedView: View {
    private var service
    var body: some View {
    nonisolated init() {}
private struct AnonymousSignupButton: View {
    private let cardinalRed = Color(red: 140 / 255.0, green: 21 / 255.0, blue: 21 / 255.0)
    private let cardinalRedDark = Color(red: 130 / 255.0, green: 0, blue: 0)
    private var colorScheme
private struct MockSignInWithAppleButton: View {
    private var account
private struct MockSecurityAlert: ViewModifier {
    @State private var isActive = false
    @MainActor var isPresented: Binding<Bool> {
    func body(content: Content) -> some View {
public final class InMemoryAccountService: AccountService {
    private static let supportedKeys = AccountKeyCollection {
    private var logger
    private var notifications
    private var externalStorage
    private var loginView = MockUserIdPasswordEmbeddedView()
    @IdentityProvider private var testButton2 = AnonymousSignupButton()
    private var signInWithApple = MockSignInWithAppleButton()
    @SecurityRelatedModifier private var securityAlert = MockSecurityAlert()
    public let configuration: AccountServiceConfiguration
    fileprivate let state = State()
    private let access = AsyncSemaphore()
    private var userIdToAccountId: [String: UUID] = [:]
    private var registeredUsers: [UUID: UserStorage] = [:]
    public init(_ type: UserIdConfiguration = .emailAddress, configure configured: ConfiguredIdentityProvider = .all) {
    public func configure() {
        let subscription = externalStorage.updatedDetails
                var details = _buildUser(from: storage, isNew: false)
    public func signInAnonymously() {
        let id = UUID()
        var details = AccountDetails()
    public func login(userId: String, password: String) async throws {
    public func signUp(with signupDetails: AccountDetails) async throws {
        var storage: UserStorage
        var externallyStored = signupDetails
            let externalStorage = externalStorage
    public func resetPassword(userId: String) async throws {
    public func logout() async throws {
    public func delete() async throws {
        let notifications = notifications
    public func updateAccountDetails(_ modifications: AccountModifications) async throws {
        var externalModifications = modifications
    private func loadUser(_ user: UserStorage, isNew: Bool = false) async throws {
        var details = _buildUser(from: user, isNew: isNew)
        var unsupportedKeys = account.configuration.keys
            let externallyStored = await externalStorage.retrieveExternalStorage(for: user.accountId.uuidString, unsupportedKeys)
    private func _buildUser(from storage: UserStorage, isNew: Bool) -> AccountDetails {
    public enum AccountError: LocalizedError {
        public var errorDescription: String? {
        public var failureReason: String? {
        public var recoverySuggestion: String? {
    public struct ConfiguredIdentityProvider: OptionSet, Sendable {
        public static let userIdPassword = ConfiguredIdentityProvider(rawValue: 1 << 0)
        public static let customIdentityProvider = ConfiguredIdentityProvider(rawValue: 1 << 1)
        public static let signInWithApple = ConfiguredIdentityProvider(rawValue: 1 << 2)
        public static let all: ConfiguredIdentityProvider = [.userIdPassword, .customIdentityProvider, .signInWithApple]
        public let rawValue: UInt8
        public init(rawValue: UInt8) {
    final class State {
        var presentingSecurityAlert = false
        var securityContinuation: CheckedContinuation<Void, any Error>?
    fileprivate struct UserStorage {
        let accountId: UUID
        var userId: String?
        var password: String?
        var name: PersonNameComponents?
        var genderIdentity: GenderIdentity?
        var dateOfBirth: Date?
        init(
    mutating func update(_ modifications: AccountModifications) {
        let modifiedDetails = modifications.modifiedDetails
        let removedKeys = modifications.removedAccountDetails
    var assumeUUID: UUID {

================
File: Sources/SpeziAccount/Mock/InMemoryAccountStorageProvider.swift
================
public actor InMemoryAccountStorageProvider: AccountStorageProvider {
    private var records: [String: AccountDetails] = [:]
    private var cache: [String: AccountDetails] = [:] // simulates an in-memory cache
    private var storage
    public init() {}
    public func load(_ accountId: String, _ keys: [any AccountKey.Type]) -> AccountDetails? {
                let details = records[accountId] ?? AccountDetails()
    public func store(_ accountId: String, _ modifications: AccountModifications) {
    public func disassociate(_ accountId: String) {
    public func delete(_ accountId: String) throws {

================
File: Sources/SpeziAccount/Mock/MockBoolKey.swift
================
public struct MockBoolKey: AccountKey {
    public static let name: LocalizedStringResource = "Toggle"
    public static let identifier = "mockBool"
    public static let category: AccountKeyCategory = .other

================
File: Sources/SpeziAccount/Mock/MockDoubleKey.swift
================
public struct MockDoubleKey: AccountKey {
    public static let name: LocalizedStringResource = "Double Key"
    public static let identifier = "mockDouble"
    public static let category: AccountKeyCategory = .other

================
File: Sources/SpeziAccount/Mock/MockNumericKey.swift
================
public struct MockNumericKey: AccountKey {
    public static let name: LocalizedStringResource = "Numeric Key"
    public static let identifier = "mockNumeric"
    public static let category: AccountKeyCategory = .other

================
File: Sources/SpeziAccount/Model/GenderIdentity.swift
================
public enum GenderIdentity: String, Sendable, CaseIterable, Identifiable, Hashable, Codable {
    public var id: RawValue {
    private var localizationValue: String.LocalizationValue {
    public var localizedStringResource: LocalizedStringResource {

================
File: Sources/SpeziAccount/Model/KeyPath+ShortDescription.swift
================
    var shortDescription: String {
            var description = self.debugDescription

================
File: Sources/SpeziAccount/Model/UserIdPasswordCredential.swift
================
public struct UserIdPasswordCredential {
    public let userId: String
    public let password: String

================
File: Sources/SpeziAccount/Model/ValidationRule+Account.swift
================
    static let acceptAll: ValidationRule = {

================
File: Sources/SpeziAccount/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "ACCOUNT_ERROR_ACCOUNT_ID_CHANGED_DESCRIPTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anfrage Fehlgeschlagen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Failed Account Operation"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Operación de cuenta fallida"
          }
        }
      }
    },
    "ACCOUNT_ERROR_ACCOUNT_ID_CHANGED_REASON" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Deine primäre Benutzerkennung kann nicht geändert werden da diese dauerhaft vergeben wird!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "You primary account identifier cannot be changed as it is required to be stable!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¡Tu identificador principal de cuenta no puede ser cambiado!"
          }
        }
      }
    },
    "ACCOUNT_ERROR_RECOVERY" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Melde dieses Problem dem Entwickler des Account Services."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Raise an issue with the developer of the Account Service."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Exponer cualquier problema con el representante del servicio de cuentas."
          }
        }
      }
    },
    "ACCOUNT_ERROR_VALUES_MISSING_VALUE_DESCRIPTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Fehlende Werte im Benutzerkonto"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Missing Account Values"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Falta información en la cuenta"
          }
        }
      }
    },
    "ACCOUNT_ERROR_VALUES_MISSING_VALUE_REASON %@" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Die folgenden Werte wurden nicht im Benutzerkonto gesetzt: %@."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The following required account values were not supplied: %@."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "No se proporciono la siguiente información requerida para la cuenta: %@."
          }
        }
      }
    },
    "ACCOUNT_HEADER_CAPTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Kontoinformationen & Details"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Account Information & Details"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Información y Detalles de la Cuenta"
          }
        }
      }
    },
    "ACCOUNT_ID" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Benutzerkennung"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Account Identifier"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Identificador de Cuenta"
          }
        }
      }
    },
    "ACCOUNT_OVERVIEW" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Benutzerkonto"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Account Overview"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Resumen de la Cuenta"
          }
        }
      }
    },
    "ACCOUNT_OVERVIEW_EDIT_DEFAULT_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Speichern deiner Änderung fehlgeschlagen!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Could not save account details!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¡No se pudieron guardar los detalles de la cuenta!"
          }
        }
      }
    },
    "ACCOUNT_WELCOME" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Dein Benutzerkonto"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Your Account"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Tu Cuenta"
          }
        }
      }
    },
    "ACCOUNT_WELCOME_SIGNED_IN_SUBTITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Du bist bereits mit dem folgenden Benutzerkonto angemeldet. Du kannst dein Benutzerkonto ändern, indem du dich abmeldest."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "You are already logged in with the account shown below. Continue or change your account by logging out."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ya has iniciado una sesión con la cuenta que se muestra abajo. Continúa o cambia tu cuenta cerrando la sesión."
          }
        }
      }
    },
    "ACCOUNT_WELCOME_SUBTITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Melde dich mit deinem Benutzerkonto an oder erstelle ein neues, wenn du noch keins hast."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please login to your account. Or create a new one if you don't have one already."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Por favor inicia sesión en tu cuenta. O crea una nueva si aún no tienes una."
          }
        }
      }
    },
    "ADD_DATE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Hinzufügen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Add Date"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Agregar Fecha"
          }
        }
      }
    },
    "Already got an Account?" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Du hast bereits ein Benutzerkonto?"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Already got an Account?"
          }
        }
      }
    },
    "Anonymous User" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anonymer Benutzer"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anonymous User"
          }
        }
      }
    },
    "CANCEL" : {
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
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Cancelar"
          }
        }
      }
    },
    "CHANGE_PASSWORD" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Passwort Ändern"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Change Password"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Cambiar Contraseña"
          }
        }
      }
    },
    "CLOSE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Schließen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Close"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Cerrar"
          }
        }
      }
    },
    "CONFIRMATION_DISCARD_ADDITIONAL_INFO_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Diese Kontoinformationen sind erfoderlich. Wenn du abbrichst, wirst du automatisch abgemeldet!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This account information is required. If you abort, you will automatically be signed out!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¡Esta información de la cuenta es necesaria. Si abortas, se cerrará automáticamente tu sesión!"
          }
        }
      }
    },
    "CONFIRMATION_DISCARD_CHANGES" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Änderungen Verwerfen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Discard Changes"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Descartar Cambios"
          }
        }
      }
    },
    "CONFIRMATION_DISCARD_CHANGES_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Willst du alle Änderungen verwerfen?"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Are you sure you want to discard your changes?"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¿Estás seguro de que deseas descartar tus cambios?"
          }
        }
      }
    },
    "CONFIRMATION_DISCARD_INPUT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Eingaben Verwerfen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Discard Input"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Descartar Información"
          }
        }
      }
    },
    "CONFIRMATION_DISCARD_INPUT_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Willst du deine Eingaben verwerfen?"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Are you sure you want to discard your input?"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¿Estás seguro de que deseas descartar tu información?"
          }
        }
      }
    },
    "CONFIRMATION_KEEP_EDITING" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Weiter Bearbeiten"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Keep Editing"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Continuar Editando"
          }
        }
      }
    },
    "CONFIRMATION_LOGOUT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Willst du dich wirklich abmelden?"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Are you sure you want to logout?"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¿Estás seguro de que deseas cerrar sesión?"
          }
        }
      }
    },
    "CONFIRMATION_REMOVAL" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Willst du wirklich dein Benutzerkonto löschen?"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Are you sure you want to delete your account?"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¿Estás seguro de que deseas eliminar tu cuenta?"
          }
        }
      }
    },
    "CONFIRMATION_REMOVAL_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Dieser Vorgang is endgültig und du kannst dein Konto Informationen nicht wiederherstellen."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This change is permanent and you won't be able to recover your account information."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Este cambio es permanente y no podrás recuperar la información de tu cuenta."
          }
        }
      }
    },
    "DELETE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Löschen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Delete"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Eliminar"
          }
        }
      }
    },
    "DELETE_ACCOUNT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Löschen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Delete Account"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Eliminar Cuenta"
          }
        }
      }
    },
    "DONE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Fertig"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Done"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Hecho"
          }
        }
      }
    },
    "Double Key" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Double Key"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Double Key"
          }
        }
      }
    },
    "EDIT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bearbeiten"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Edit"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Editar"
          }
        }
      }
    },
    "FOLLOW_UP_INFORMATION_COMPLETE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Fertig"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Complete"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Completar"
          }
        }
      }
    },
    "FOLLOW_UP_INFORMATION_INSTRUCTIONS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte fülle die folgenden Informationen aus, um dein Benutzerkonto zu vervollständigen."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please fill out the details below to complete your account setup."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Por favor, rellena los detalles a continuación para completar la configuración de tu cuenta."
          }
        }
      }
    },
    "FOLLOW_UP_INFORMATION_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Account Vervollständigen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Finish Account Setup"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Finalizar Configuración de Cuenta"
          }
        }
      }
    },
    "GENDER_IDENTITY_FEMALE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Weiblich"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Female"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Femenino"
          }
        }
      }
    },
    "GENDER_IDENTITY_MALE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Männlich"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Male"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Masculino"
          }
        }
      }
    },
    "GENDER_IDENTITY_NON_BINARY" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nicht-binär"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Non-binary"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "No Binario"
          }
        }
      }
    },
    "GENDER_IDENTITY_PREFER_NOT_TO_STATE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Keine Angabe"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Choose not to answer"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Prefiero no responder"
          }
        }
      }
    },
    "GENDER_IDENTITY_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Geschlechtsidentität"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Gender Identity"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Identidad de Género"
          }
        }
      }
    },
    "GENDER_IDENTITY_TRANSGENDER" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Transgender"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Transgender"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Transgénero"
          }
        }
      }
    },
    "MISSING_ACCOUNT_DETAILS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "needs_review",
            "value" : "**Kein Benutzerkonto gefunden.**\n\nDiese Oberfläche erfordert ein aktives Benutzerkonto.\nBitte kontaktiere die Dokumentation für die AccountSetup Oberfläche, um ein Benutzerkonto einzurichten."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This view requires an active user account.\nRefer to the documentation of the AccountSetup view on how to setup a user account!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "needs_review",
            "value" : "**No se pudo encontrar una cuenta de usuario.**\n\nEsta pagina require una cuenta de usuario activa.\n¡Consulte la documentación de la pagina 'AccountSetup' sobre cómo configurar una nueva cuenta de usuario!"
          }
        }
      }
    },
    "MISSING_ACCOUNT_SERVICES" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "needs_review",
            "value" : "**Es wurden keine Account Services konfiguriert.**\n\nBitte kontaktiere die Dokumentation von SpeziAccount für mehr Informationen zur Konfiguration eines AccountServices!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please refer to the documentation of the SpeziAccount package on how to set up an AccountService!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "needs_review",
            "value" : "**No hay servicios de cuenta configurados.**\n\n¡Por favor, consulte la documentación del paquete SpeziAccount sobre cómo configurar un servicio de cuenta!"
          }
        }
      }
    },
    "NAME" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Name"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Name"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nombre"
          }
        }
      }
    },
    "NEW_PASSWORD" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Neues"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "New"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nueva Contraseña"
          }
        }
      }
    },
    "NEW_PASSWORD_PROMPT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Passwort eingeben"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "enter password"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Entre contraseña"
          }
        }
      }
    },
    "NO" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nein"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "No"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "No"
          }
        }
      }
    },
    "No Account Service" : {

    },
    "No User Account" : {

    },
    "Numeric Key" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Numeric Key"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Numeric Key"
          }
        }
      }
    },
    "Off" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Aus"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Off"
          }
        }
      }
    },
    "On" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "An"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "On"
          }
        }
      }
    },
    "OPEN_DOCUMENTATION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Dokumentation öffnen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Open Documentation"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Abrir Documentación"
          }
        }
      }
    },
    "OR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "oder"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "or"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "o"
          }
        }
      }
    },
    "REMOVE_DEFAULT_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Löschen fehlgeschlagen!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Could not remove account!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¡No se pudo eliminar la cuenta!"
          }
        }
      }
    },
    "REPEAT_PASSWORD" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bestätigen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Verify"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Verificar contraseña"
          }
        }
      }
    },
    "REPEAT_PASSWORD_PROMPT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Passwort wiederholen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "re-enter password"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Escriba la contraseña otra vez"
          }
        }
      }
    },
    "SIGN_IN_AND_SECURITY" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anmeldung & Sicherheit"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Sign-In & Security"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Inicio de Sesión y Seguridad"
          }
        }
      }
    },
    "The input can only consist of digits." : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Die Eingabe kann nur aus Zahlen bestehen."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The input can only consist of digits."
          }
        }
      }
    },
    "The internal account identifier is meant to be generated!" : {
      "comment" : "Pure debug message, no need to translate.",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der interne Kontokenner soll generiert werden!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The internal account identifier is meant to be generated!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The internal account identifier is meant to be generated!"
          }
        }
      }
    },
    "The internal account identifier is not meant to be user facing!" : {
      "comment" : "Pure debug message, no need to translate.",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der interne Kontokenner ist nicht dafür gedacht, dem Benutzer angezeigt zu werden!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The internal account identifier is not meant to be user facing!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The internal account identifier is not meant to be user facing!"
          }
        }
      }
    },
    "This field is required." : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Dieses Feld is erforderlich."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This field is required."
          }
        }
      }
    },
    "Toggle" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Schalter"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Toggle"
          }
        }
      }
    },
    "UAP_PASSWORD_RESET_SUBTITLE %@" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte fülle folgendes Feld aus. Du wirst eine E-Mail erhalten mit der du dein Passwort zurücksetzten kannst."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please enter your %@ of your Account. A password reset email will be sent to the linked email address."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Por favor, escribe tu %@ de tu cuenta. Se enviará un correo electrónico para restablecer la contraseña a la dirección de correo electrónico vinculado."
          }
        }
      }
    },
    "UAP_RESET_PASSWORD_FAILED_DEFAULT_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Passwort Zurücksetzen fehlgeschlagen!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Could not reset the password!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¡No pude restablecer la contraseña!"
          }
        }
      }
    },
    "UAP_RESET_PASSWORD_PROCESS_SUCCESSFUL_LABEL" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ein Link zum Zurücksetzen das Passworts wurde versandt."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Sent out a link to reset the password."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Se ha enviado un enlace para restablecer la contraseña."
          }
        }
      }
    },
    "UAP_SIGNUP_DATE_OF_BIRTH_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Geburtsdatum"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Date of Birth"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Fecha de Nacimiento"
          }
        }
      }
    },
    "UAP_SIGNUP_FAMILY_NAME_PLACEHOLDER" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nachnamen eingeben"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "enter last name"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "escribir tu apellido"
          }
        }
      }
    },
    "UAP_SIGNUP_FAMILY_NAME_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nachname"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Last"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Apellido"
          }
        }
      }
    },
    "UAP_SIGNUP_GIVEN_NAME_PLACEHOLDER" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Vornamen eingeben"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "enter first name"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "escribir tu nombre"
          }
        }
      }
    },
    "UAP_SIGNUP_GIVEN_NAME_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Vorname"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "First"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nombre"
          }
        }
      }
    },
    "UP_CONTACT_DETAILS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Kontaktdaten"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Contact Details"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Detalles de Contacto"
          }
        }
      }
    },
    "UP_CREDENTIALS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Zugangsdaten"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Credentials"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Credenciales"
          }
        }
      }
    },
    "UP_FORGOT_PASSWORD" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Password vergessen?"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Forgot Password?"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¿Olvidaste tu contraseña?"
          }
        }
      }
    },
    "UP_LOGIN" : {
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
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Iniciar sesión"
          }
        }
      }
    },
    "UP_LOGIN_FAILED_DEFAULT_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anmeldung fehlgeschlagen!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Could not login!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¡No pude iniciar sesión!"
          }
        }
      }
    },
    "UP_LOGOUT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Abmelden"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Logout"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Cerrar sesión"
          }
        }
      }
    },
    "UP_LOGOUT_FAILED_DEFAULT_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Anmeldung fehlgeschlagen!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Could not logout!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¡No se pudo cerrar la sesión!"
          }
        }
      }
    },
    "UP_NAME" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Name"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Name"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nombre y Apellido"
          }
        }
      }
    },
    "UP_NO_ACCOUNT_YET" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Du hast noch kein Benutzerkonto?"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Don't have an Account yet?"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¿Aún no tienes una cuenta?"
          }
        }
      }
    },
    "UP_PASSWORD" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Passwort"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Password"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Contraseña"
          }
        }
      }
    },
    "UP_PERSONAL_DETAILS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Persönliche Details"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Personal Details"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Detalles Personales"
          }
        }
      }
    },
    "UP_RESET_PASSWORD" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Passwort Zurücksetzten"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Reset Password"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Restablecer Contraseña"
          }
        }
      }
    },
    "UP_SIGNUP" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Registrieren"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Signup"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Inscribirse"
          }
        }
      }
    },
    "UP_SIGNUP_FAILED_DEFAULT_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Registrierung fehlgeschlagen!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Could not sign up!"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "¡No pude registrar!"
          }
        }
      }
    },
    "UP_SIGNUP_HEADER" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Erstelle dein Benutzerkonto"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Create a new Account"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Crear una nueva cuenta"
          }
        }
      }
    },
    "UP_SIGNUP_INSTRUCTIONS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte fülle die folgenden Informationen aus, um ein neues Benutzerkonto zu erstellen."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please fill out the details below to create your new account."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Por favor, rellena los detalles a continuación para crear tu nueva cuenta."
          }
        }
      }
    },
    "USER_ID" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Benutzername"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "User Identifier"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Identificador de Usuario"
          }
        }
      }
    },
    "USER_ID_EMAIL" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "E-Mail Adresse"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "E-Mail Address"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Dirección de Correo Electrónico"
          }
        }
      }
    },
    "USER_ID_USERNAME" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Benutzername"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Username"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nombre de Usuario"
          }
        }
      }
    },
    "VALIDATION_RULE_ALWAYS_ACCEPT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Diese Regel akzeptiert alle Eingaben."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This rule always accepts."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Esta regla siempre acepta todas las entradas."
          }
        }
      }
    },
    "VALIDATION_RULE_PASSWORDS_NOT_MATCHED" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Die Passwörter stimmen nicht überein."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Passwords do not match."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Las contraseñas no coinciden."
          }
        }
      }
    },
    "VALUE_ADD %@" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "%@ Hinzufügen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Add %@"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Agregar %@"
          }
        }
      }
    },
    "YES" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ja"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Yes"
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Sí"
          }
        }
      }
    }
  },
  "version" : "1.0"
}

================
File: Sources/SpeziAccount/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi Template Application project

SPDX-FileCopyrightText: 2023 Stanford University

SPDX-License-Identifier: MIT

================
File: Sources/SpeziAccount/SpeziAccount.docc/AccountKey/Adding new Account Values.md
================
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

================
File: Sources/SpeziAccount/SpeziAccount.docc/AccountService/Creating your own Account Service.md
================
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

================
File: Sources/SpeziAccount/SpeziAccount.docc/AccountService/Custom Storage Provider.md
================
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

================
File: Sources/SpeziAccount/SpeziAccount.docc/Setup Guides/Initial Setup.md
================
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

================
File: Sources/SpeziAccount/SpeziAccount.docc/SpeziAccount.md
================
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

================
File: Sources/SpeziAccount/ViewModel/AccountDisplayModel.swift
================
struct AccountDisplayModel {
    let accountDetails: AccountDetails
    var profileViewName: PersonNameComponents? {
    var accountHeadline: String? {
    var accountSubheadline: String? {
    init(details: AccountDetails) {

================
File: Sources/SpeziAccount/ViewModel/AccountOverviewFormViewModel.swift
================
class AccountOverviewFormViewModel {
    private let logger = Logger(subsystem: "edu.stanford.spezi", category: "AccountOverview")
    private let categorizedAccountKeys: OrderedDictionary<AccountKeyCategory, [any AccountKey.Type]>
    private let accountServiceConfiguration: AccountServiceConfiguration
    let modifiedDetailsBuilder = AccountDetailsBuilder()
    var presentingCancellationDialog = false
    var presentingLogoutAlert = false
    var presentingRemovalAlert = false
    var addedAccountKeys = CategorizedAccountKeys()
    var removedAccountKeys = CategorizedAccountKeys()
    var hasUnsavedChanges: Bool {
    var defaultErrorDescription: LocalizedStringResource {
    init(_ valueConfiguration: AccountValueConfiguration, _ serviceConfiguration: AccountServiceConfiguration) {
    convenience init(account: Account, details: AccountDetails) {
    func accountKeys(by category: AccountKeyCategory, using details: AccountDetails) -> [any AccountKey.Type] {
        var result = categorizedAccountKeys[category, default: []]
    private func baseSortedAccountKeys(details accountDetails: AccountDetails) -> OrderedDictionary<AccountKeyCategory, [any AccountKey.Type]> {
        var results = categorizedAccountKeys
    func editableAccountKeys(details accountDetails: AccountDetails) -> OrderedDictionary<AccountKeyCategory, [any AccountKey.Type]> {
    func namesOverviewKeys(details accountDetails: AccountDetails) -> [any AccountKey.Type] {
        var result = baseSortedAccountKeys(details: accountDetails)
    func addAccountDetail(for value: any AccountKey.Type) {
    func deleteAccountKeys(at indexSet: IndexSet, in accountKeys: [any AccountKey.Type]) {
            let value = accountKeys[index]
    func cancelEditAction(editMode: Binding<EditMode>?) {
    func discardChangesAction(editMode: Binding<EditMode>?) {
    func discardChangesAction() {
    func updateAccountDetails(details: AccountDetails, using account: Account, editMode: Binding<EditMode>?) async throws {
    func updateAccountDetails(details: AccountDetails, using account: Account) async throws {
        var removedDetails = AccountDetails()
        let modifications = try AccountModifications(
    func resetModelState(editMode: Binding<EditMode>?) {
    func resetModelState() {
    func accountIdentifierLabel(configuration: AccountValueConfiguration, _ details: AccountDetails) -> Text {
        let userId = Text(details.userIdType.localizedStringResource)
            let separator = ", "
    func displaysSignInSecurityDetails(_ details: AccountDetails) -> Bool {
    func displaysNameDetails(_ details: AccountDetails) -> Bool {

================
File: Sources/SpeziAccount/ViewModel/AccountOverviewValuesComparator.swift
================
struct AccountOverviewValuesComparator: SortComparator {
    var order: SortOrder = .forward
    private let id = UUID()
    private let accountDetails: AccountDetails
    private let addedAccountKeys: CategorizedAccountKeys
    private let removedAccountKeys: CategorizedAccountKeys
    init(details: AccountDetails, added: CategorizedAccountKeys, removed: CategorizedAccountKeys) {
    func compare(_ lhs: any AccountKey.Type, _ rhs: any AccountKey.Type) -> ComparisonResult {
        let lhsContained = accountDetails.contains(lhs) && !removedAccountKeys.contains(lhs)
        let rhsContained = accountDetails.contains(rhs) && !removedAccountKeys.contains(rhs)
        let lhsIndex = addedAccountKeys.index(of: lhs)
        let rhsIndex = addedAccountKeys.index(of: rhs)
    func hash(into hasher: inout Hasher) {

================
File: Sources/SpeziAccount/ViewModel/CategorizedAccountKeys.swift
================
struct CategorizedAccountKeys {
    private var accountKeys: OrderedDictionary<AccountKeyCategory, [any AccountKey.Type]>
    var keys: [any AccountKey.Type] {
    init() {
    mutating func append(_ value: any AccountKey.Type) {
    func contains(_ value: any AccountKey.Type) -> Bool {
    func index(of value: any AccountKey.Type) -> Int? {
    mutating func remove(at index: Int, for category: AccountKeyCategory) -> any AccountKey.Type {
        let result = accountKeys[category, default: []]

================
File: Sources/SpeziAccount/ViewModel/ForEachAccountKeyWrapper.swift
================
struct ForEachAccountKeyWrapper: Identifiable {
    var id: ObjectIdentifier {
    var accountKey: any AccountKey.Type
    init(_ accountKey: any AccountKey.Type) {

================
File: Sources/SpeziAccount/ViewModel/ViewSizing.swift
================
struct ViewSizing {
    static let outerHorizontalPadding: CGFloat = 16
    static let innerHorizontalPadding: CGFloat = 16
    static let maxFrameWidth: CGFloat = 450
    private init() {}

================
File: Sources/SpeziAccount/ViewModifier/AccountRequiredModifier.swift
================
private let logger = Logger(subsystem: "edu.stanford.spezi.SpeziAccount", category: "AccountRequiredModifier")
struct AccountRequiredModifier<SetupSheet: View>: ViewModifier {
    private let enabled: Bool
    private let accountSetupIsComplete: (AccountDetails) -> Bool
    private let setupSheet: SetupSheet
    private var account: Account? // make sure that the modifier can be used when account is not configured
    @State private var presentingSheet = false
    @MainActor private var shouldPresentSheet: Bool {
    init(
    func body(content: Content) -> some View {
    public func accountRequired<SetupSheet: View>(

================
File: Sources/SpeziAccount/ViewModifier/AnyViewModifier.swift
================
    func inject<V: View>(into view: V) -> AnyView {
    func anyModifier(_ modifier: any ViewModifier) -> some View {
    func anyModifiers(_ modifiers: [any ViewModifier]) -> some View {
        var anyView = AnyView(self)

================
File: Sources/SpeziAccount/ViewModifier/DisableFieldAssistantsModifier.swift
================
    func disableFieldAssistants() -> some View {

================
File: Sources/SpeziAccount/ViewModifier/DismissiveActions.swift
================
    func disableDismissiveActions(isProcessing state: ViewState) -> some View {

================
File: Sources/SpeziAccount/ViewModifier/RequiredValidationModifier.swift
================
private struct RequiredValidationModifier<Key: AccountKey>: ViewModifier {
    private var detailsBuilder
    @ValidationState private var validation
    @ValidationState private var innerValidation
    @Binding private var value: Key.Value
    init(_ binding: Binding<Key.Value>) {
    func body(content: Content) -> some View {
            let view = content // the wrapped data entry view
    func validateRequired<Key: AccountKey>(for key: Key.Type, _ value: Binding<Key.Value>) -> some View {

================
File: Sources/SpeziAccount/ViewModifier/VerifyRequiredAccountDetailsModifier.swift
================
private struct FollowUpSession: Identifiable {
    var id: String {
    let details: AccountDetails
    let requiredKeys: [any AccountKey.Type]
struct VerifyRequiredAccountDetailsModifier: ViewModifier {
    private struct DetailsState: Equatable {
        let signedIn: Bool
        let isIncomplete: Bool? // swiftlint:disable:this discouraged_optional_boolean
    private let enabled: Bool
    private var account
    private var verifiedAccount = false
    @State private var followUpSession: FollowUpSession?
    @MainActor private var state: DetailsState {
    nonisolated init(enabled: Bool = true) {
    func body(content: Content) -> some View {
                let missingKeys = account.configuration.missingRequiredKeys(for: details)

================
File: Sources/SpeziAccount/Views/AccountOverview/AccountKeyOverviewRow.swift
================
struct AccountKeyOverviewRow: View {
    private let accountDetails: AccountDetails
    private let accountKey: any AccountKey.Type
    private let model: AccountOverviewFormViewModel
    private var account
    private var editMode
    var body: some View {
            let hStack = VStack {
    init(details accountDetails: AccountDetails, for accountKey: any AccountKey.Type, model: AccountOverviewFormViewModel) {
    func isDeleteDisabled(for key: any AccountKey.Type) -> Bool {
private let key = AccountKeys.genderIdentity
        let model = AccountOverviewFormViewModel(account: account, details: details)

================
File: Sources/SpeziAccount/Views/AccountOverview/AccountOverviewForm.swift
================
struct AccountOverviewForm<AdditionalSections: View>: View {
    private let model: AccountOverviewFormViewModel
    private let closeBehavior: AccountOverview<AdditionalSections>.CloseBehavior
    private let deletionBehavior: AccountOverview<AdditionalSections>.AccountDeletionBehavior
    private let additionalSections: AdditionalSections
    private var account
    private var dismiss
    private var editMode
    @State private var viewState: ViewState = .idle
    @State private var destructiveViewState: ViewState = .idle
    @ValidationState private var validation
    @FocusState private var isFocused: Bool
    private var isProcessing: Bool {
    var body: some View {
        @Bindable var model = model
    init(
    private func editButtonAction() async throws {

================
File: Sources/SpeziAccount/Views/AccountOverview/AccountOverviewHeader.swift
================
struct AccountOverviewHeader: View {
    private let model: AccountDisplayModel
    var body: some View {
    init(details: AccountDetails) {

================
File: Sources/SpeziAccount/Views/AccountOverview/AccountOverviewSections.swift
================
struct AccountOverviewSections<AdditionalSections: View>: View {
    private let closeBehavior: AccountOverview<AdditionalSections>.CloseBehavior
    private let deletionBehavior: AccountOverview<AdditionalSections>.AccountDeletionBehavior
    private let additionalSections: AdditionalSections
    private let accountDetails: AccountDetails
    private let model: AccountOverviewFormViewModel
    private var account
    private var editMode
    private var dismiss
    @Binding private var destructiveViewState: ViewState
    private var showDeleteButton: Bool {
    private var showLogoutButton: Bool {
    var body: some View {
    @ViewBuilder private var defaultSections: some View {
        let displayName = model.displaysNameDetails(accountDetails)
        let displaySecurity = model.displaysSignInSecurityDetails(accountDetails)
    @ViewBuilder private var sectionsView: some View {
                    let forEachWrappers = accountKeys.map { key in
    init(
    private func sectionIsEmpty(_ accountKeys: [any AccountKey.Type]) -> Bool {

================
File: Sources/SpeziAccount/Views/AccountOverview/NameOverview.swift
================
struct NameOverview: View {
    private let model: AccountOverviewFormViewModel
    private let accountDetails: AccountDetails
    private var account
    var body: some View {
            let forEachWrappers = model.namesOverviewKeys(details: accountDetails)
                            let name = wrapper.accountKey == AccountKeys.userId
    init(model: AccountOverviewFormViewModel, details accountDetails: AccountDetails) {

================
File: Sources/SpeziAccount/Views/AccountOverview/OverviewSectionIcons.swift
================
struct DetailsSectionIcon: View {
    var body: some View {
struct SecuritySectionIcon: View {
    fileprivate func graySquareBackground() -> some View {

================
File: Sources/SpeziAccount/Views/AccountOverview/PasswordChangeSheet.swift
================
struct PasswordChangeSheet: View {
    private let accountDetails: AccountDetails
    private let model: AccountOverviewFormViewModel
    private var account
    private var dismiss
    @ValidationState private var validation
    @State private var viewState: ViewState = .idle
    @FocusState private var isFocused: Bool
    @State private var newPassword: String = ""
    @State private var repeatPassword: String = ""
    private var passwordValidations: [ValidationRule] {
    var body: some View {
    @ViewBuilder private var passwordFieldsSection: some View {
    init(model: AccountOverviewFormViewModel, details accountDetails: AccountDetails) {
    func submitPasswordChange() async throws {
    func passwordEqualityValidation(new newPassword: Binding<String>) -> ValidationRule {

================
File: Sources/SpeziAccount/Views/AccountOverview/PasswordValidationRuleFooter.swift
================
struct PasswordValidationRuleFooter: View {
    private let configuration: AccountServiceConfiguration
    var body: some View {
        let rules = (configuration.fieldValidationRules(for: AccountKeys.password) ?? [])
    init(configuration: AccountServiceConfiguration) {

================
File: Sources/SpeziAccount/Views/AccountOverview/SecurityOverview.swift
================
struct SecurityOverview: View {
    private let accountDetails: AccountDetails
    private let model: AccountOverviewFormViewModel
    private var account
    @State private var viewState: ViewState = .idle
    @State private var presentingPasswordChangeSheet = false
    var body: some View {
            let forEachWrappers = model.accountKeys(by: .credentials, using: accountDetails)
    init(model: AccountOverviewFormViewModel, details accountDetails: AccountDetails) {

================
File: Sources/SpeziAccount/Views/AccountOverview/SingleEditView.swift
================
struct SingleEditView<Key: AccountKey>: View {
    private let model: AccountOverviewFormViewModel
    private let accountDetails: AccountDetails
    private var account
    private var dismiss
    @ValidationState private var validation
    @State private var viewState: ViewState = .idle
    @FocusState private var isFocused: Bool
    private var disabledDone: Bool {
    var body: some View {
    init(model: AccountOverviewFormViewModel, details accountDetails: AccountDetails) {
    init(for keyPath: KeyPath<AccountKeys, Key.Type>, model: AccountOverviewFormViewModel, details accountDetails: AccountDetails) {
    private func submitChange() async throws {

================
File: Sources/SpeziAccount/Views/AccountOverview/View+AccountOverviewObjects.swift
================
    func injectEnvironmentObjects(configuration: AccountServiceConfiguration, model: AccountOverviewFormViewModel) -> some View {

================
File: Sources/SpeziAccount/Views/AccountSetup/SetupProvider/AccountServiceButton.swift
================
public struct AccountServiceButton<Label: View>: View {
    private let action: @MainActor () async throws -> Void
    private let label: Label
    @Binding private var state: ViewState
    public var body: some View {
    public init(

================
File: Sources/SpeziAccount/Views/AccountSetup/SetupProvider/AccountSetupProviderView.swift
================
enum PresentedSetupStyle<Credentials: Sendable> {
public struct AccountSetupProviderView<Signup: View, PasswordReset: View>: View {
    private let loginClosure: ((UserIdPasswordCredential) async throws -> Void)?
    private let signupForm: Signup
    private let passwordReset: PasswordReset
    private var preferredSetupStyle
    @State private var presentedStyle: PresentedSetupStyle<UserIdPasswordCredential> = .signup
    @State private var presentingSignup = false
    public var body: some View {
    private init(
    public init(

================
File: Sources/SpeziAccount/Views/AccountSetup/SetupProvider/LoginSetupView.swift
================
private enum LoginFocusState {
struct LoginSetupView<PasswordReset: View>: View {
    private let loginClosure: (UserIdPasswordCredential) async throws -> Void
    private let passwordReset: PasswordReset
    private let supportsSignup: Bool
    @Binding private var presentingSignupSheet: Bool
    private var account
    @State private var userId: String = ""
    @State private var password: String = ""
    @State private var state: ViewState = .idle
    @FocusState private var focusedField: LoginFocusState?
    @ValidationState private var validation
    @State private var presentingPasswordForgetSheet = false
    @MainActor private var userIdConfiguration: UserIdConfiguration {
    var body: some View {
    @ViewBuilder @MainActor private var fields: some View {
    init(
    private func loginButtonAction() async throws {
        let credential = UserIdPasswordCredential(userId: userId, password: password)

================
File: Sources/SpeziAccount/Views/AccountSetup/SetupProvider/SignInWithAppleButton.swift
================
public struct SignInWithAppleButton: View {
    private let overrideLabel: AuthenticationServices.SignInWithAppleButton.Label?
    private let onRequest: (ASAuthorizationAppleIDRequest) -> Void
    private let onCompletion: (Result<ASAuthorization, any Error>) async throws -> Void
    private var colorScheme
    private var defaultErrorDescription
    private var preferredSetupStyle
    @State private var compliance: SignupProviderCompliance?
    @State private var lastRequestScopes: [ASAuthorization.Scope]? // swiftlint:disable:this discouraged_optional_collection
    @State private var lastTask: Task<Void, Never>? {
    @Binding private var viewState: ViewState
    private var label: AuthenticationServices.SignInWithAppleButton.Label {
    public var body: some View {
    public init(

================
File: Sources/SpeziAccount/Views/AccountSetup/SetupProvider/SignupSetupView.swift
================
struct SignupSetupView<Credential: Sendable>: View {
    private let loginClosure: ((Credential) async throws -> Void)?
    @Binding private var setupStyle: PresentedSetupStyle<Credential>
    @Binding private var presentingSignupSheet: Bool
    var body: some View {
    init(
    @Previewable @State var style: PresentedSetupStyle<UserIdPasswordCredential> = .signup
    @Previewable @State var presentingSignup = false

================
File: Sources/SpeziAccount/Views/AccountSetup/AccountSetupState.swift
================
public enum AccountSetupState {
    public static var generic: AccountSetupState {
    public static var setupShown: AccountSetupState {
    public var isInSignup: Bool {
    @Entry public var accountSetupState: AccountSetupState = .presentingSignup
    public var _accountSetupState: _AccountSetupState {

================
File: Sources/SpeziAccount/Views/AccountSetup/DefaultAccountSetupHeader.swift
================
public struct DefaultAccountSetupHeader: View {
    private var account
    private var setupState
    public var body: some View {
    public init() {}

================
File: Sources/SpeziAccount/Views/AccountSetup/ExistingAccountView.swift
================
struct ExistingAccountView<Continue: View>: View {
    private let accountDetails: AccountDetails
    private let continueButton: Continue
    private var account
    @State private var viewState: ViewState = .idle
    var body: some View {
    init(details: AccountDetails, @ViewBuilder `continue`: () -> Continue = { EmptyView() }) {

================
File: Sources/SpeziAccount/Views/AccountSetup/FollowUpInfoSheet.swift
================
struct FollowUpInfoFormHeader: View {
    var body: some View {
    init() {}
public struct FollowUpInfoSheet: View {
    public enum CancelBehavior {
    private let accountKeyByCategory: OrderedDictionary<AccountKeyCategory, [any AccountKey.Type]>
    private let cancelBehavior: CancelBehavior
    private let onComplete: (AccountModifications) -> Void
    private var dismiss
    private var scenePhase
    private var account
    @State private var detailsBuilder = AccountDetailsBuilder()
    @ValidationState private var validation
    @State private var viewState: ViewState = .idle
    @FocusState private var isFocused: Bool
    @State private var presentingCancellationConfirmation = false
    public var body: some View {
    @ViewBuilder private var form: some View {
    public init(
    private func onCancelPressed() {
    private func completeButtonAction() async throws {
        let modifiedDetails = detailsBuilder.build()
        let modifications = try AccountModifications(modifiedDetails: modifiedDetails)
    var confirmationMessage: Text {
    var actionRole: ButtonRole? {
    var actionLabel: Text {
private let keys: [any AccountKey.Type] = [AccountKeys.name]

================
File: Sources/SpeziAccount/Views/AccountSetup/ServicesDivider.swift
================
struct ServicesDivider: View {
    var body: some View {
    init() {}

================
File: Sources/SpeziAccount/Views/AccountSetup/SignupSectionsView.swift
================
struct SignupSectionsView: View {
    private let sections: OrderedDictionary<AccountKeyCategory, [any AccountKey.Type]>
    private var account
    var body: some View {
    init(sections: OrderedDictionary<AccountKeyCategory, [any AccountKey.Type]>) {
private let credentials: [any AccountKey.Type] = [
private let name: [any AccountKey.Type] = [

================
File: Sources/SpeziAccount/Views/DataDisplay/BoolDisplayView.swift
================
public struct BoolDisplayView<Key: AccountKey>: DataDisplayView where Key.Value == Bool {
    public enum Label {
        var onLabel: LocalizedStringResource {
        var offLabel: LocalizedStringResource {
    private let label: Label
    private let value: Key.Value
    public var body: some View {
    public init(label: Label, _ value: Key.Value) {
    public init(label: Label = .onOff, _ keyPath: KeyPath<AccountKeys, Key.Type>, _ value: Key.Value) {
    public init(_ value: Key.Value) {

================
File: Sources/SpeziAccount/Views/DataDisplay/DataDisplayView.swift
================
public protocol DataDisplayView<Value>: View {

================
File: Sources/SpeziAccount/Views/DataDisplay/FixedWidthIntegerDisplayView.swift
================
public struct FixedWidthIntegerDisplayView<Key: AccountKey>: DataDisplayView where Key.Value: FixedWidthInteger {
    private let value: Key.Value
    private let unit: Text
    public var body: some View {
    public init(_ value: Key.Value, unit: Text = Text(verbatim: "")) {
    public init(_ value: Key.Value) {
    public init(_ keyPath: KeyPath<AccountKeys, Key.Type>, _ value: Key.Value, unit: Text = Text(verbatim: "")) {

================
File: Sources/SpeziAccount/Views/DataDisplay/FloatingPointDisplayView.swift
================
public struct FloatingPointDisplayView<Key: AccountKey>: DataDisplayView where Key.Value: BinaryFloatingPoint {
    private let value: Key.Value
    private let formatStyle: FloatingPointFormatStyle<Key.Value>?
    private let unit: Text
    private var locale
    private var formatStyleValue: FloatingPointFormatStyle<Key.Value> {
    public var body: some View {
    public init(
    public init(_ value: Key.Value) {

================
File: Sources/SpeziAccount/Views/DataDisplay/GridValidationStateFooter.swift
================
struct GridValidationStateFooter: View {
    private var results: [FailedValidationResult]
    var body: some View {
    init(_ results: [FailedValidationResult]) {

================
File: Sources/SpeziAccount/Views/DataDisplay/LocalizableStringDisplayView.swift
================
public struct LocalizableStringDisplayView<Key: AccountKey>: DataDisplayView
    private let value: Key.Value
    public var body: some View {
    public init(_ value: Key.Value) {
    public init(_ keyPath: KeyPath<AccountKeys, Key.Type>, _ value: Key.Value) {

================
File: Sources/SpeziAccount/Views/DataDisplay/StringDisplayView.swift
================
public struct StringDisplayView<Key: AccountKey>: DataDisplayView where Key.Value: StringProtocol {
    private let value: Key.Value
    public var body: some View {
    public init(_ value: Key.Value) {
    public init(_ keyPath: KeyPath<AccountKeys, Key.Type>, _ value: Key.Value) {

================
File: Sources/SpeziAccount/Views/DataEntry/BoolEntryView.swift
================
public struct BoolEntryView<Key: AccountKey>: DataEntryView where Key.Value == Bool {
    @Binding private var value: Key.Value
    public var body: some View {
    public init(_ value: Binding<Key.Value>) {
    public init(_ keyPath: KeyPath<AccountKeys, Key.Type>, _ value: Binding<Key.Value>) {
    @Previewable @State var value = false
    @Previewable @State var value = true

================
File: Sources/SpeziAccount/Views/DataEntry/CaseIterablePickerEntryView.swift
================
public struct CaseIterablePickerEntryView<Key: AccountKey>: DataEntryView where Key.Value: PickerValue, Key.Value.AllCases: RandomAccessCollection {
    @Binding private var value: Key.Value
    public var body: some View {
    public init(_ value: Binding<Key.Value>) {
    public init(_ keyPath: KeyPath<AccountKeys, Key.Type>, _ value: Binding<Key.Value>) {
    @Previewable @State var genderIdentity: GenderIdentity = .male

================
File: Sources/SpeziAccount/Views/DataEntry/DataEntryView.swift
================
public protocol DataEntryView<Value>: View {

================
File: Sources/SpeziAccount/Views/DataEntry/DateOfBirthPicker.swift
================
struct DateOfBirthPicker: View {
    private let title: LocalizedStringResource
    private let isRequired: Bool
    @Binding private var date: Date
    @State private var dateAdded = false
    @State private var layout: DynamicLayout?
    private var dateRange: ClosedRange<Date> {
        let calendar = Calendar.current
        let startDateComponents = DateComponents(year: 1800, month: 1, day: 1)
        let endDate = Date.now
    @MainActor private var showPicker: Bool {
    var body: some View {
    init(
    private func addDateAction() {
struct DateOfBirthPicker_Previews: PreviewProvider {
    struct Preview: View {
        @State private var date = Date.now
        private let required: Bool
        init(required: Bool) {
    static var previews: some View {

================
File: Sources/SpeziAccount/Views/DataEntry/FixedWidthIntegerEntryView.swift
================
public struct FixedWidthIntegerEntryView<Key: AccountKey>: DataEntryView where Key.Value: FixedWidthInteger {
    private var account
    @Binding private var value: Key.Value
    @State private var text: String = ""
    private var validationRules: [ValidationRule] {
    public var body: some View {
    public init(_ value: Binding<Key.Value>) {
    public init(_ keyPath: KeyPath<AccountKeys, Key.Type>, _ value: Binding<Key.Value>) {
    static func isDigit<Value: FixedWidthInteger>(for value: Value.Type = Value.self, radix: Int = 10) -> ValidationRule {
    @Previewable @State var value = 3

================
File: Sources/SpeziAccount/Views/DataEntry/FloatingPointEntryView.swift
================
public struct FloatingPointEntryView<Key: AccountKey>: DataEntryView where Key.Value: BinaryFloatingPoint {
    private let formatStyle: Decimal.FormatStyle?
    private var account
    private var locale
    @Binding private var value: Key.Value
    @State private var decimal: Decimal = .zero
    @State private var text: String = ""
    private var formatStyleValue: Decimal.FormatStyle {
    private var validCharacters: CharacterSet {
    private var validationRules: [ValidationRule] {
    public var body: some View {
                let double = Double(truncating: decimal as NSDecimalNumber)
    public init(
    public init(_ value: Binding<Key.Value>) {
    public init(_ keyPath: KeyPath<AccountKeys, Key.Type>, _ value: Binding<Key.Value>, format formatStyle: Decimal.FormatStyle? = nil) {
    static func isDecimal<Value: BinaryFloatingPoint>(
    @Previewable @State var value = 3.15

================
File: Sources/SpeziAccount/Views/DataEntry/GeneralizedDataEntryView.swift
================
private protocol GeneralizedStringEntryView {
struct GeneralizedDataEntryView<Key: AccountKey>: View {
    private var dataHookId: String {
    private var account
    private var detailsBuilder
    private var configuration
    private var viewType
    @State private var value: Key.Value
    var body: some View {
    init(initialValue signupValue: Key.Value) {
    func validationRules() -> [ValidationRule] {

================
File: Sources/SpeziAccount/Views/DataEntry/StringEntryView.swift
================
public struct StringEntryView<Key: AccountKey>: DataEntryView where Key.Value == String {
    @Binding private var value: String
    public var body: some View {
    public init(_ value: Binding<String>) {
    public init(_ keyPath: KeyPath<AccountKeys, Key.Type>, _ value: Binding<Key.Value>) {
    @Previewable @State var value = "Hello World"

================
File: Sources/SpeziAccount/Views/Documentation/DocumentationInfoView.swift
================
struct DocumentationInfoView<Label: View, Description: View>: View {
    private let label: Label
    private let description: Description
    private let url: URL
    var body: some View {
    init(url: URL, @ViewBuilder label: () -> Label, @ViewBuilder description: () -> Description) {

================
File: Sources/SpeziAccount/Views/Documentation/EmptyServicesWarning.swift
================
struct EmptyServicesWarning: View {
    private var documentationUrl: URL {
    var body: some View {

================
File: Sources/SpeziAccount/Views/Documentation/MissingAccountDetailsWarning.swift
================
struct MissingAccountDetailsWarning: View {
    private var documentationUrl: URL {
    var body: some View {

================
File: Sources/SpeziAccount/Views/Preview/AccountDetailsReader.swift
================
public struct AccountDetailsReader<Content: View>: View {
    private let content: (Account, AccountDetails) -> Content
    private var account
    public var body: some View {
    public init(@ViewBuilder _ content: @escaping (Account, AccountDetails) -> Content) {

================
File: Sources/SpeziAccount/Views/AccountSummaryBox.swift
================
struct AccountSummaryBox: View {
    private let model: AccountDisplayModel
    var body: some View {
    init(details: AccountDetails) {

================
File: Sources/SpeziAccount/Views/PasswordResetView.swift
================
public struct PasswordResetView<SuccessView: View>: View {
    private let successView: SuccessView
    private let resetPasswordClosure: (String) async throws -> Void
    private var account
    private var dismiss
    @ValidationState private var validation
    @State private var userId = ""
    @State private var requestSubmitted: Bool
    @State private var state: ViewState = .idle
    @FocusState private var isFocused: Bool
    @MainActor private var userIdConfiguration: UserIdConfiguration {
    public var body: some View {
    @MainActor @ViewBuilder private var resetPasswordForm: some View {
    fileprivate init(
    public init(
    private func submitRequestAction() async throws {
        let userId = userId

================
File: Sources/SpeziAccount/Views/SignupForm.swift
================
public struct SignupForm<Header: View>: View {
    private let header: Header
    private let signupClosure: (AccountDetails) async throws -> Void
    private var account
    private var dismiss
    @State private var signupDetailsBuilder = AccountDetailsBuilder()
    @ValidationState private var validation
    @State private var viewState: ViewState = .idle
    @FocusState private var isFocused: Bool
    @State private var compliance: SignupProviderCompliance?
    @State private var presentingCloseConfirmation = false
    @MainActor private var accountKeyByCategory: OrderedDictionary<AccountKeyCategory, [any AccountKey.Type]> {
        var result = account.configuration.allCategorized(filteredBy: [.required, .collected])
            let key = entry.key
    public var body: some View {
    @MainActor @ViewBuilder var form: some View {
    public init(signup: @escaping (AccountDetails) async throws -> Void, @ViewBuilder header: () -> Header = { SignupFormHeader() }) {
    private func signupButtonAction() async throws {
        let details = signupDetailsBuilder.build()
            var combined = details

================
File: Sources/SpeziAccount/Views/SignupFormHeader.swift
================
struct FormHeader<Image: View, Title: View, Instructions: View>: View {
    private let image: Image
    private let title: Title
    private let instructions: Instructions
    var body: some View {
    init(@ViewBuilder image: () -> Image, @ViewBuilder title: () -> Title, @ViewBuilder instructions: () -> Instructions) {
public struct SignupFormHeader: View {
    public var body: some View {
    public init() {}

================
File: Sources/SpeziAccount/Views/SuccessfulPasswordResetView.swift
================
public struct SuccessfulPasswordResetView: View {
    private let successfulLabelLocalization: LocalizedStringResource
    public var body: some View {
    public init(successfulLabel: LocalizedStringResource? = nil) {

================
File: Sources/SpeziAccount/Account.swift
================
public final class Account {
    var logger // swiftlint:disable:this attributes
    @Dependency @ObservationIgnored private var notifications = AccountNotifications()
    public let configuration: AccountValueConfiguration
    @MainActor public private(set) var signedIn: Bool
    @MainActor public private(set) var details: AccountDetails?
    @MainActor private weak var _accountService: (any AccountService)?
    @MainActor public var accountService: any AccountService {
    let accountSetupComponents: [any AnyAccountSetupComponent]
    let securityRelatedModifiers: [any AnySecurityModifier]
    init(
        let mirror = Mirror(reflecting: service)
    public func configure() {
    public func supplyUserDetails(_ details: AccountDetails) {
        var details = details
        let previousDetails = self.details
    public func removeUserDetails() {

================
File: Sources/SpeziAccount/AccountConfiguration.swift
================
public final class AccountConfiguration {
    private var logger
    var account
    private var externalStorage
    @Dependency private var accountService: [any Module]
    @Dependency private var storageProvider: [any Module]
    @StandardActor private var standard: any Standard
    @Modifier private var verifyRequiredConfiguration = VerifyRequiredAccountDetailsModifier()
    public convenience init<Service: AccountService>(
    public convenience init<Service: AccountService, Storage: AccountStorageProvider>(
    init<Service: AccountService>(
    public func configure() {
    private func verify(
        let unmappedAccountKeys: [any AccountKeyConfiguration] = service.configuration

================
File: Sources/SpeziAccount/AccountDetailsCache.swift
================
public actor AccountDetailsCache: Module, DefaultInitializable {
    private var logger
    @Dependency private var localStorage = LocalStorage()
    private var localCache: [String: AccountDetails] = [:]
    private var accountDetailsStorageKeys: [String: LocalStorageKey<AccountDetails>] = [:]
    private let storageSettings: LocalStorageSetting
    public init() {
    public init(settings: LocalStorageSetting) {
    private func key(for accountId: String) -> LocalStorageKey<AccountDetails> {
            let key = LocalStorageKey<AccountDetails>(
    public func loadEntry(for accountId: String, _ keys: [any AccountKey.Type]) -> AccountDetails? {
            let details = try localStorage.load(
    public func clearEntry(for accountId: String) {
    func purgeMemoryCache(for accountId: String) { // test support
    public func communicateModifications(for accountId: String, _ modifications: AccountModifications) {
        var details = AccountDetails()
    public func communicateRemoteChanges(for accountId: String, _ details: AccountDetails) {

================
File: Sources/SpeziAccount/AccountHeader.swift
================
public struct AccountHeader: View {
    public enum Defaults {
        public static let caption = LocalizedStringResource("ACCOUNT_HEADER_CAPTION", bundle: .atURL(from: .module))
    private var account
    private let caption: Text
    public var body: some View {
        let accountDetails = account.details
                let nameTitle = accountDetails?.name?.formatted(.name(style: .long)) ?? accountDetails?.userId ?? "Placeholder"
    public init(caption: LocalizedStringResource = Defaults.caption) {
    public init(caption: Text) {
    var details = AccountDetails()

================
File: Sources/SpeziAccount/AccountNotifications.swift
================
public final class AccountNotifications {
    public enum Event {
    @StandardActor private var standard: any Standard
    private var storage
    private var notifyStandard: (any AccountNotifyConstraint)? {
    private var subscriptions: [UUID: AsyncStream<Event>.Continuation] = [:]
    private let lock = NSLock()
    public var events: AsyncStream<Event> {
    public init() {}
    public func reportEvent(_ event: Event) async throws {
    private func newSubscription() -> AsyncStream<Event> {
            let id = UUID()

================
File: Sources/SpeziAccount/AccountNotifyConstraint.swift
================
public protocol AccountNotifyConstraint: Standard {

================
File: Sources/SpeziAccount/AccountOverview.swift
================
public struct AccountOverview<AdditionalSections: View>: View {
    public enum CloseBehavior {
    public enum AccountDeletionBehavior {
    private let closeBehavior: CloseBehavior
    private let deletionBehavior: AccountDeletionBehavior
    private let additionalSections: AdditionalSections
    private var account
    @State private var model: AccountOverviewFormViewModel?
    public var body: some View {
    public init(
    var details = AccountDetails()

================
File: Sources/SpeziAccount/AccountSetup.swift
================
public struct AccountSetup<Header: View, Continue: View>: View {
    private let setupCompleteClosure: @MainActor (AccountDetails) async -> Void
    private let header: Header
    private let continueButton: Continue
    private var account
    private var followUpBehavior
    @State private var setupState: AccountSetupState = .presentingExistingAccount
    @State private var compliance: SignupProviderCompliance?
    @State private var presentFollowUpSheet = false
    @State private var accountSetupTask: Task<Void, Never>?
    private var hasSetupComponents: Bool {
    public var body: some View {
    @ViewBuilder private var scrollableContentView: some View {
    @ViewBuilder private var accountSetupView: some View {
                let components = account.accountSetupComponents.reduce(
    fileprivate init(state: AccountSetupState) where Header == DefaultAccountSetupHeader, Continue == EmptyView {
    public init(
    private func followUpInformationSheet(_ details: AccountDetails, requiredKeys: [any AccountKey.Type]) -> some View {
    private func handleSuccessfulSetup(_ details: AccountDetails) {
        var includeCollected: AccountValueConfiguration.IncludeCollectedType
        let ignoreCollected: [any AccountKey.Type]
        let missingKeys = account.configuration.missingRequiredKeys(for: details, includeCollected, ignoring: ignoreCollected)
    private func handleSetupCompleted(_ details: AccountDetails) {
    var details = AccountDetails()

================
File: Sources/SpeziAccount/AccountStorageProvider.swift
================
public protocol AccountStorageProvider: Module {
    public func store(_ accountId: String, _ details: AccountDetails) async throws {
        let modifications = try AccountModifications(modifiedDetails: details)

================
File: Sources/SpeziAccount/ExternalAccountStorage.swift
================
public final class ExternalAccountStorage {
    public struct ExternallyStoredDetails: Sendable {
        public let accountId: String
        public let details: AccountDetails
    private nonisolated(unsafe) weak var storageProvider: (any AccountStorageProvider)?
    private let lock = NSLock()
    public var updatedDetails: AsyncStream<ExternallyStoredDetails> {
            let id = UUID()
    init(_ storageProvider: (any AccountStorageProvider)?) {
    public func notifyAboutUpdatedDetails(for accountId: String, _ details: AccountDetails) {
        var details = details
        let update = ExternallyStoredDetails(accountId: accountId, details: details)
    public func requestExternalStorage(of details: AccountDetails, for accountId: String) async throws {
    public func retrieveExternalStorage(for accountId: String, _ keys: [any AccountKey.Type]) async -> AccountDetails {
            var details = AccountDetails()
    public func retrieveExternalStorage<Keys: AcceptingAccountKeyVisitor>(for accountId: String, _ keys: Keys) async -> AccountDetails {
    public func updateExternalStorage(with modifications: AccountModifications, for accountId: String) async throws {
    func willDeleteAccount(for accountId: String) async throws {
    func userWillDisassociate(for accountId: String) async {

================
File: Sources/SpeziAccountMacros/AccountKeyMacro.swift
================
public struct AccountKeyMacro {}
    public static func expansion(
        let getAccessor: AccessorDeclSyntax =
        let setAccessor: AccessorDeclSyntax =
    public static func expansion( // swiftlint:disable:this function_body_length cyclomatic_complexity
        let storageIdentifier = argumentList.first(where: { $0.label?.text == "id" })
        let category = argumentList.first(where: { $0.label?.text == "category" })
        let initial = argumentList.first { $0.label?.text == "initial" }
        let displayViewType = argumentList.first { $0.label?.text == "displayView" }
        let entryView = argumentList.first { $0.label?.text == "entryView" }
        let valueTypeName = try valueType.metaTypeTypeNameArgument(name: "as")
        let displayViewTypeName = try displayViewType?.metaTypeTypeNameArgument(name: "displayView")
        let entryViewTypeName = try entryView?.metaTypeTypeNameArgument(name: "entryView")
        let valueTypeInitializer: TypeSyntax
        let accountKeyProtocol: TokenSyntax
        let modifier: TokenSyntax? = variableDeclaration.modifiers
        let rawModifier = modifier.map { $0.text + " " } ?? ""
        let key = StructDeclSyntax(
            let categoryExpr = category?.expression ?? ExprSyntax(MemberAccessExprSyntax(declName: .init(baseName: .identifier("other"))))
    func metaTypeTypeNameArgument(name: String) throws -> any ExprSyntaxProtocol {
    var forceToText: String? {

================
File: Sources/SpeziAccountMacros/KeyEntryMacro.swift
================
public struct KeyEntryMacro {}
    public static func expansion(
        let name = propertyComponent.declName.baseName
        let variable: DeclSyntax =
        let staticVariable: DeclSyntax =

================
File: Sources/SpeziAccountMacros/SpeziAccountDiagnostic.swift
================
struct SpeziAccountDiagnostic: DiagnosticMessage {
    enum ID: String {
    let message: String
    let diagnosticID: MessageID
    let severity: DiagnosticSeverity
    init(message: String, diagnosticID: MessageID, severity: DiagnosticSeverity = .error) {
    init(message: String, domain: String, id: ID, severity: SwiftDiagnostics.DiagnosticSeverity = .error) {
    init<S: SyntaxProtocol>(

================
File: Sources/SpeziAccountMacros/SpeziAccountMacros.swift
================
struct SpeziAccountMacros: CompilerPlugin {
    var providingMacros: [any Macro.Type] = [

================
File: Sources/XCTSpeziAccount/XCTSpeziAccount.docc/XCTSpeziAccount.md
================
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

================
File: Sources/XCTSpeziAccount/XCUIApplication+AccountValues.swift
================
    public func updateGenderIdentity(from: String, to: String, file: StaticString = #filePath, line: UInt = #line) {
    public func changeDateOfBirth() {

================
File: Sources/XCTSpeziAccount/XCUIApplication+Login.swift
================
    public func login<Email: StringProtocol, Password: StringProtocol>(email: Email, password: Password) throws {
    public func login<Username: StringProtocol, Password: StringProtocol>(username: Username, password: Password) throws {
    private func login<UserId: StringProtocol, Password: StringProtocol>(userId: UserId, password: Password, field: String) throws {

================
File: Sources/XCTSpeziAccount/XCUIApplication+SignupForm.swift
================
    public func closeSignupForm(discardChangesIfAsked: Bool = true) throws {
    public func fillSignupForm(
    public func scrollUpInSignupForm() {

================
File: Tests/SpeziAccountMacrosTests/AccountKeyMacroTests.swift
================
let testMacrosSpecs: [String: MacroSpec] = [
struct AccountKeyMacroTests { // swiftlint:disable:this type_body_length
    func testAccountKeyGeneration() {
    func testAccountKeyId() {
    func testAccountKeyGenerationPublic() {
    func testRequiredAccountKey() {
    func testNotMatchingTypes() {
    func testCustomUI() { // swiftlint:disable:this function_body_length
    func testCustomUINameCollision() { // swiftlint:disable:this function_body_length
    func testAccountKeysEntry() {
    func testGeneralDiagnostics() { // swiftlint:disable:this function_body_length

================
File: Tests/SpeziAccountTests/AccountDetails+Mock.swift
================
    static func mock(id: UUID = UUID(), date: Date = .now) -> AccountDetails {
        var details = AccountDetails()

================
File: Tests/SpeziAccountTests/AccountDetailsCacheTests.swift
================
struct AccountDetailsCacheTests {
    private static let id = UUID(uuidString: "b730ebce-e153-44fc-a547-d47ac9c9d190")! // swiftlint:disable:this force_unwrapping
    func testCache() async {
        let cache = AccountDetailsCache(settings: .unencrypted())
        let details: AccountDetails = .mock(id: Self.id)
        let nilEntry = await cache.loadEntry(for: details.accountId, details.keys)
        let entry = await cache.loadEntry(for: details.accountId, details.keys)
        let entryFromDisk = await cache.loadEntry(for: details.accountId, details.keys)
        let nilEntry2 = await cache.loadEntry(for: details.accountId, details.keys)
    func testApplyModifications() async {
        var details: AccountDetails = .mock(id: Self.id)
        let keys = details.keys
        var modified = AccountDetails()
        var removed = AccountDetails()
        let modifications = try! AccountModifications(modifiedDetails: modified, removedAccountDetails: removed) // swiftlint:disable:this force_try
        let localEntry = await cache.loadEntry(for: details.accountId, keys)
        let diskEntry = await cache.loadEntry(for: details.accountId, keys)

================
File: Tests/SpeziAccountTests/AccountDetailsTests.swift
================
struct AccountDetailsTests {
    func testCodable() throws {
        let details: AccountDetails = .mock()
        let encoder = JSONEncoder()
        let decoder = JSONDecoder()
        let configuration = AccountDetails.DecodingConfiguration(keys: details.keys)
        let data = try encoder.encode(details)
        let decoded = try decoder.decode(AccountDetails.self, from: data, configuration: configuration)
    func testCodableWithCustomMapping() throws {
        var details = AccountDetails()
        let mapping: [String: any AccountKey.Type] = [
        let encodingConfiguration = AccountDetails.EncodingConfiguration(identifierMapping: mapping)
        let decodingConfiguration = AccountDetails.DecodingConfiguration(
        let data = try encoder.encode(details, configuration: encodingConfiguration)
        let string = try #require(String(data: data, encoding: .utf8))
        let decoded = try decoder.decode(AccountDetails.self, from: data, configuration: decodingConfiguration)
    func testUserIdKeyFallback() throws {
    func testEmailKey() throws {
        var usernameDetails = AccountDetails()

================
File: Tests/SpeziAccountTests/AccountNotificationsTests.swift
================
private final class TestProvider: AccountStorageProvider {
    private let onDisassociate: Testing.Confirmation
    private let onDelete: Testing.Confirmation
    init(onDisassociate: Testing.Confirmation, onDelete: Testing.Confirmation) {
    func store(_ accountId: String, _ modifications: SpeziAccount.AccountModifications) async throws {
    func load(_ accountId: String, _ keys: [any SpeziAccount.AccountKey.Type]) async -> SpeziAccount.AccountDetails? {
    func disassociate(_ accountId: String) async {
    func delete(_ accountId: String) async throws {
private final actor TestStandard: Standard, AccountNotifyConstraint {
    @MainActor private(set) var trackedEvents: [AccountNotifications.Event] = []
    func respondToEvent(_ event: AccountNotifications.Event) async {
struct AccountNotificationsTests {
    func testAccountNotifications() async throws {
                let notifications = AccountNotifications()
                let standard = TestStandard()
                let provider = TestProvider(
                let stream = notifications.events
                let details: AccountDetails = .mock()
                var iterator = stream.makeAsyncIterator()
                let element0 = await iterator.next()
                let element1 = await iterator.next()
                let element2 = await iterator.next()
                func assertEvents(
                let event0 = standard.trackedEvents[0]
                let event1 = standard.trackedEvents[1]
                let event2 = standard.trackedEvents[2]

================
File: Tests/SpeziAccountTests/SnapshotTesting.swift
================
let isRunningIOS = true
let isRunningIOS = false
struct SnapshotTesting {
    func testBoolDisplayView() {
        let viewTrue = BoolDisplayView<MockBoolKey>(true)
        let viewFalse = BoolDisplayView<MockBoolKey>(false)
        let viewTrueYes = BoolDisplayView<MockBoolKey>(label: .yesNo, true)
        let viewFalseNo = BoolDisplayView<MockBoolKey>(label: .yesNo, false)
    func testIntegerDisplayView() {
        let integer = FixedWidthIntegerDisplayView<MockNumericKey>(34)
        let integerWithUnit = FixedWidthIntegerDisplayView<MockNumericKey>(34, unit: Text(verbatim: " cm"))
    func testFloatingPointDisplayView() {
        let float = FloatingPointDisplayView<MockDoubleKey>(23.56)
        let floatWithUnit = FloatingPointDisplayView<MockDoubleKey>(223.56, unit: Text(verbatim: " cm"))
    func testStringDisplayView() {
        let view = StringDisplayView(\.userId, "Hello World")
    func testLocalizedStringDisplayView() {
        let view = LocalizableStringDisplayView(\.genderIdentity, .male)
    func testAccountProviderViewLayoutVariations() {
        let configuration = AccountConfiguration(service: InMemoryAccountService())
        let view0 = AccountSetupProviderView { _ in
        let view1 = AccountSetupProviderView { _ in
        let view2 = AccountSetupProviderView { (_: UserIdPasswordCredential) in
        let view3 = AccountSetupProviderView { (_: AccountDetails) in
        let view4 = AccountSetupProviderView { (_: UserIdPasswordCredential) in
        let view5 = AccountSetupProviderView { (_: AccountDetails) in
        let view0Signup = view0.preferredAccountSetupStyle(.signup)
        let view1Signup = view1.preferredAccountSetupStyle(.signup)
        let view2Signup = view2.preferredAccountSetupStyle(.signup)
        let view3Signup = view3.preferredAccountSetupStyle(.signup)
        let view4Signup = view4.preferredAccountSetupStyle(.signup)
        let view5Signup = view5.preferredAccountSetupStyle(.signup)
    func testAccountHeader() {
        let view = AccountHeader(caption: "Custom Caption")

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
This source file is part of the Spezi open-source project

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
This source file is part of the Spezi open-source project

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
This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/Utils/AccountDetails+Default.swift
================
    private static let dateStyle = Date.FormatStyle()
    static var defaultDetails: AccountDetails {
        let date: Date
        var details = AccountDetails()

================
File: Tests/UITests/TestApp/Utils/BiographyKey.swift
================
private struct EntryView: DataEntryView {
    @Binding private var biography: String
    var body: some View {
    init(_ value: Binding<String>) {
    var biography: String?

================
File: Tests/UITests/TestApp/Utils/InvitationCodeKey.swift
================
    var invitationCode: String?

================
File: Tests/UITests/TestApp/Utils/TestStandard.swift
================
actor TestStandard: AccountNotifyConstraint, EnvironmentAccessible {
    final class Storage {
        var deleteNotified = false
        nonisolated init() {}
    private let storage = Storage()
    @MainActor var deleteNotified: Bool {
    func respondToEvent(_ event: SpeziAccount.AccountNotifications.Event) async {

================
File: Tests/UITests/TestApp/AccountTestsView.swift
================
struct AccountTestsView: View {
    enum TestError: LocalizedError {
        var errorDescription: String? {
    private var features
    private var service
    private var account
    private var standard
    @State private var showSetup = false
    @State private var showOverview = false
    @State private var accountIdFromAnonymousUser: String?
    @State private var setupState: ViewState = .idle
    var body: some View {
                var details: AccountDetails = .defaultDetails
    @ViewBuilder var overviewSheet: some View {
    @ViewBuilder var header: some View {
        let standard = standard
    @ViewBuilder var finishButton: some View {
    func setupSheet(closeable: Bool = true) -> some View {
    func toolbar(closing flag: Binding<Bool>) -> some ToolbarContent {
    var details = AccountDetails()

================
File: Tests/UITests/TestApp/EntryViewTests.swift
================
struct EntryViewTests: View {
    @State private var toggle = false
    @State private var integer = 0
    @State private var double = 1.5
    @FocusState private var integerField: Bool
    @FocusState private var doubleField: Bool
    var body: some View {

================
File: Tests/UITests/TestApp/Features.swift
================
enum AccountServiceType: String, ExpressibleByArgument {
enum AccountValueConfigurationType: String, ExpressibleByArgument {
enum DefaultCredentials: String, ExpressibleByArgument {
struct Features: ParsableArguments {
    var serviceType: AccountServiceType = .mail
    var configurationType: AccountValueConfigurationType = .default
    var credentials: DefaultCredentials = .disabled
    var accountRequiredModifier = false
    var noName = false
    var includeInvitationCode = false
    @Entry var features: Features = .init()

================
File: Tests/UITests/TestApp/Info.plist
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleAllowMixedLocalizations</key>
	<true/>
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
    private var appDelegate
    var body: some Scene {

================
File: Tests/UITests/TestApp/TestAppDelegate.swift
================
class TestAppDelegate: SpeziAppDelegate {
    let features: Features = {
            let features = try Features.parse()
    var configuredValues: AccountValueConfiguration {
    var provider: InMemoryAccountService.ConfiguredIdentityProvider {
    override var configuration: Configuration {

================
File: Tests/UITests/TestAppUITests/Utils/Defaults.swift
================
enum Defaults {
    static let email = "lelandstanford@stanford.edu"
    static let password = "StanfordRocks123!"
    static let firstname = "Leland"
    static let lastname = "Stanford"
    static let name = "\(firstname) \(lastname)"

================
File: Tests/UITests/TestAppUITests/Utils/XCUIApplication+AccountSetup.swift
================
    func openSignup() {
    func fillSignupForm(

================
File: Tests/UITests/TestAppUITests/Utils/XCUIApplication+TestApp.swift
================
enum ServiceType: String { // swiftlint:disable:this file_types_order
enum Config: String {
enum DefaultCredentials: String {
    func launch(
    func openAccountOverview(timeout: TimeInterval = 2.0) {
    func openAccountSetup(timeout: TimeInterval = 1.0) {

================
File: Tests/UITests/TestAppUITests/AccountOverviewTests.swift
================
final class AccountOverviewTests: XCTestCase { // swiftlint:disable:this type_body_length
    override func setUpWithError() throws {
    func testRequirementLevelsOverview() throws {
        let app = XCUIApplication()
    func testEditView() throws {
    func testLogout() {
        let alert = "Are you sure you want to logout?"
    func testAccountRemoval() {
        let alert = "Are you sure you want to delete your account?"
    func testEditDiscard() {
        let confirmation = "Are you sure you want to discard your changes?"
    func testRemoveDiscard() {
        let removeButton = app.images.matching(identifier: "remove").firstMatch
    func testRemoval() {
    func testNameOverview() throws {
    func testAddName() throws {
    func testSecurityOverview() throws {
        let warningLength = "Your password must be at least 8 characters long."
    func testLicenseOverview() throws {
    fileprivate func scrollUpInOverview() {

================
File: Tests/UITests/TestAppUITests/AccountSetupTests.swift
================
final class AccountSetupTests: XCTestCase { // swiftlint:disable:this type_body_length
    override func setUpWithError() throws {
    func testEmbeddedViewValidation() throws {
        let app = XCUIApplication()
    func testLoginWithEmail() throws {
    func testAccountSummary() throws {
    func testSignupWithAnonymousAccount() throws { // swiftlint:disable:this function_body_length
        let supplyDateOfBirth = true
        let supplyDateOfBirth = false
    func testBasicIdentityProviderLayout() throws {
    func testResetPassword() throws {
    func testSignupCredentialsValidation() throws {
        let email = "new-adventure@stanford.edu"
        let password = "123456789"
    func testNameValidation() throws {
    func testInvalidCredentials() throws {
    func testFullSignup() throws {
    func testFullSignupWithAdditionalStorage() throws {
    func testNameEmptinessCheck() throws {
        let email = "lelandstanford2@stanford.edu"
    func testAdditionalInfoAfterLogin() throws {
    func testLoginWithAdditionalStorage() throws {
    func testAccountRequiredModifier() throws {
    func testVerifyRequiredAccountDetailsModifier() throws {
        let confirmation = "This account information is required. If you abort, you will automatically be signed out!"

================
File: Tests/UITests/TestAppUITests/DocumentationHintsTests.swift
================
final class DocumentationHintsTests: XCTestCase {
    override func setUp() {
    func testDocumentationHint(type: ServiceType, button: String, title: String, hint: String) throws {
        let app = XCUIApplication()
        let predicate = NSPredicate(format: "label LIKE '\(hint)'") // hint may be longer than 128 characters.
        let safari = XCUIApplication(bundleIdentifier: "com.apple.mobilesafari")
    func testEmptyAccountServices() throws {
    func testMissingAccount() throws {

================
File: Tests/UITests/TestAppUITests/EntryViewsTests.swift
================
final class EntryViewsTests: XCTestCase {
    override func setUp() {
    func testEntryViews() throws {
        let app = XCUIApplication()

================
File: Tests/UITests/TestAppUITests/XCUIApplication+TestPrimaryButton.swift
================
    func testPrimaryButton(enabled: Bool, title: String, navigationBarButtonTitle: String? = nil) {
        let navigationBarButtonTitle = navigationBarButtonTitle ?? title

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
This source file is part of the Spezi open-source project

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
This source file is part of the Spezi open-source project

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
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "SpeziAccount"
               BuildableName = "SpeziAccount"
               BlueprintName = "SpeziAccount"
               ReferencedContainer = "container:../..">
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
            argument = "--service-type"
            isEnabled = "YES">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "both"
            isEnabled = "YES">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "--configuration-type"
            isEnabled = "NO">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "allRequired"
            isEnabled = "NO">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "allRequiredWithBio"
            isEnabled = "NO">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "--credentials"
            isEnabled = "YES">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "create"
            isEnabled = "YES">
         </CommandLineArgument>
         <CommandLineArgument
            argument = "--include-invitation-code"
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
      <MacroExpansion>
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "2F6D139128F5F384007C25D6"
            BuildableName = "TestApp.app"
            BlueprintName = "TestApp"
            ReferencedContainer = "container:UITests.xcodeproj">
         </BuildableReference>
      </MacroExpansion>
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
This source file is part of the Spezi open-source project

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
		2F027C8629D6C2AD00234098 /* AccountTestsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F027C7B29D6C29B00234098 /* AccountTestsView.swift */; };
		2F027C8929D6C2AD00234098 /* AccountDetails+Default.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F027C7F29D6C29B00234098 /* AccountDetails+Default.swift */; };
		2F027C9529D6C63100234098 /* TestAppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F027C9429D6C63100234098 /* TestAppDelegate.swift */; };
		2F027C9B29D6C91E00234098 /* XCTestExtensions in Frameworks */ = {isa = PBXBuildFile; productRef = 2F027C9A29D6C91E00234098 /* XCTestExtensions */; };
		2F027C9D29D6CA1100234098 /* XCUIApplication+TestPrimaryButton.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F027C9C29D6CA1100234098 /* XCUIApplication+TestPrimaryButton.swift */; };
		2F6D139A28F5F386007C25D6 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 2F6D139928F5F386007C25D6 /* Assets.xcassets */; };
		2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA7382B290ADFAA007ACEB9 /* TestApp.swift */; };
		2FAD38C02A455FC200E79ED1 /* SpeziAccount in Frameworks */ = {isa = PBXBuildFile; productRef = 2FAD38BF2A455FC200E79ED1 /* SpeziAccount */; };
		9B345FB82C94BF470067C977 /* InvitationCodeKey.swift in Sources */ = {isa = PBXBuildFile; fileRef = 9B345FB72C94BF470067C977 /* InvitationCodeKey.swift */; };
		A969240F2A9A198800E2128B /* ArgumentParser in Frameworks */ = {isa = PBXBuildFile; productRef = A969240E2A9A198800E2128B /* ArgumentParser */; };
		A98739032C64EE6000E17A42 /* EntryViewTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A98739022C64EE5F00E17A42 /* EntryViewTests.swift */; };
		A98739052C64F1BB00E17A42 /* EntryViewsTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A98739042C64F1B300E17A42 /* EntryViewsTests.swift */; };
		A994264B2CD25C50002F8BD5 /* XCTSpeziAccount in Frameworks */ = {isa = PBXBuildFile; productRef = A994264A2CD25C50002F8BD5 /* XCTSpeziAccount */; };
		A9B6E3F72A9B6F5B0008B232 /* AccountSetupTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9B6E3F62A9B6F5B0008B232 /* AccountSetupTests.swift */; };
		A9B6E3F92A9B6F660008B232 /* AccountOverviewTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9B6E3F82A9B6F660008B232 /* AccountOverviewTests.swift */; };
		A9B6E3FB2A9B70360008B232 /* Defaults.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9B6E3FA2A9B70360008B232 /* Defaults.swift */; };
		A9B6E3FD2A9B74830008B232 /* BiographyKey.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9B6E3FC2A9B74830008B232 /* BiographyKey.swift */; };
		A9B6E3FF2A9B795C0008B232 /* TestStandard.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9B6E3FE2A9B795C0008B232 /* TestStandard.swift */; };
		A9B6E4052A9BB27A0008B232 /* XCUIApplication+AccountSetup.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9B6E4042A9BB27A0008B232 /* XCUIApplication+AccountSetup.swift */; };
		A9B6E40B2A9BB2980008B232 /* XCUIApplication+TestApp.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9B6E40A2A9BB2980008B232 /* XCUIApplication+TestApp.swift */; };
		A9EE7D282A3357D900C2B9A9 /* DocumentationHintsTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9EE7D272A3357D900C2B9A9 /* DocumentationHintsTests.swift */; };
		A9EE7D2A2A3359E800C2B9A9 /* Features.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9EE7D292A3359E800C2B9A9 /* Features.swift */; };
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
		2F027C7B29D6C29B00234098 /* AccountTestsView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = AccountTestsView.swift; sourceTree = "<group>"; };
		2F027C7F29D6C29B00234098 /* AccountDetails+Default.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = "AccountDetails+Default.swift"; sourceTree = "<group>"; };
		2F027C9429D6C63100234098 /* TestAppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TestAppDelegate.swift; sourceTree = "<group>"; };
		2F027C9C29D6CA1100234098 /* XCUIApplication+TestPrimaryButton.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = "XCUIApplication+TestPrimaryButton.swift"; sourceTree = "<group>"; };
		2F6D139228F5F384007C25D6 /* TestApp.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = TestApp.app; sourceTree = BUILT_PRODUCTS_DIR; };
		2F6D139928F5F386007C25D6 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		2F6D13AC28F5F386007C25D6 /* TestAppUITests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = TestAppUITests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		2FA43E8F2AE022F1009B1B2C /* TestApp.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = TestApp.entitlements; sourceTree = "<group>"; };
		2FA7382B290ADFAA007ACEB9 /* TestApp.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TestApp.swift; sourceTree = "<group>"; };
		2FAD38BE2A455F7D00E79ED1 /* SpeziAccount */ = {isa = PBXFileReference; lastKnownFileType = wrapper; name = SpeziAccount; path = ../..; sourceTree = "<group>"; };
		2FE750C92A8720CE00723EAE /* TestApp.xctestplan */ = {isa = PBXFileReference; lastKnownFileType = text; path = TestApp.xctestplan; sourceTree = "<group>"; };
		636D985F2AF188E00020B8BC /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist; path = Info.plist; sourceTree = "<group>"; };
		9B345FB72C94BF470067C977 /* InvitationCodeKey.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = InvitationCodeKey.swift; sourceTree = "<group>"; };
		A98739022C64EE5F00E17A42 /* EntryViewTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = EntryViewTests.swift; sourceTree = "<group>"; };
		A98739042C64F1B300E17A42 /* EntryViewsTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = EntryViewsTests.swift; sourceTree = "<group>"; };
		A9B6E3F62A9B6F5B0008B232 /* AccountSetupTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AccountSetupTests.swift; sourceTree = "<group>"; };
		A9B6E3F82A9B6F660008B232 /* AccountOverviewTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = AccountOverviewTests.swift; sourceTree = "<group>"; };
		A9B6E3FA2A9B70360008B232 /* Defaults.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = Defaults.swift; sourceTree = "<group>"; };
		A9B6E3FC2A9B74830008B232 /* BiographyKey.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = BiographyKey.swift; sourceTree = "<group>"; };
		A9B6E3FE2A9B795C0008B232 /* TestStandard.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TestStandard.swift; sourceTree = "<group>"; };
		A9B6E4042A9BB27A0008B232 /* XCUIApplication+AccountSetup.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = "XCUIApplication+AccountSetup.swift"; sourceTree = "<group>"; };
		A9B6E40A2A9BB2980008B232 /* XCUIApplication+TestApp.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = "XCUIApplication+TestApp.swift"; sourceTree = "<group>"; };
		A9EE7D272A3357D900C2B9A9 /* DocumentationHintsTests.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = DocumentationHintsTests.swift; sourceTree = "<group>"; };
		A9EE7D292A3359E800C2B9A9 /* Features.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = Features.swift; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		2F6D138F28F5F384007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				A969240F2A9A198800E2128B /* ArgumentParser in Frameworks */,
				2FAD38C02A455FC200E79ED1 /* SpeziAccount in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A928F5F386007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				A994264B2CD25C50002F8BD5 /* XCTSpeziAccount in Frameworks */,
				2F027C9B29D6C91E00234098 /* XCTestExtensions in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		2F027C9629D6C63300234098 /* Utils */ = {
			isa = PBXGroup;
			children = (
				A9B6E3FC2A9B74830008B232 /* BiographyKey.swift */,
				9B345FB72C94BF470067C977 /* InvitationCodeKey.swift */,
				A9B6E3FE2A9B795C0008B232 /* TestStandard.swift */,
				2F027C7F29D6C29B00234098 /* AccountDetails+Default.swift */,
			);
			path = Utils;
			sourceTree = "<group>";
		};
		2F6D138928F5F384007C25D6 = {
			isa = PBXGroup;
			children = (
				2FE750C92A8720CE00723EAE /* TestApp.xctestplan */,
				2FAD38BE2A455F7D00E79ED1 /* SpeziAccount */,
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
				2FA43E8F2AE022F1009B1B2C /* TestApp.entitlements */,
				636D985F2AF188E00020B8BC /* Info.plist */,
				2F027C7B29D6C29B00234098 /* AccountTestsView.swift */,
				A98739022C64EE5F00E17A42 /* EntryViewTests.swift */,
				A9EE7D292A3359E800C2B9A9 /* Features.swift */,
				2FA7382B290ADFAA007ACEB9 /* TestApp.swift */,
				2F027C9429D6C63100234098 /* TestAppDelegate.swift */,
				2F6D139928F5F386007C25D6 /* Assets.xcassets */,
				2F027C9629D6C63300234098 /* Utils */,
			);
			path = TestApp;
			sourceTree = "<group>";
		};
		2F6D13AF28F5F386007C25D6 /* TestAppUITests */ = {
			isa = PBXGroup;
			children = (
				A9B6E3F82A9B6F660008B232 /* AccountOverviewTests.swift */,
				A9B6E3F62A9B6F5B0008B232 /* AccountSetupTests.swift */,
				A9EE7D272A3357D900C2B9A9 /* DocumentationHintsTests.swift */,
				A98739042C64F1B300E17A42 /* EntryViewsTests.swift */,
				2F027C9C29D6CA1100234098 /* XCUIApplication+TestPrimaryButton.swift */,
				A96924122A9A6BA400E2128B /* Utils */,
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
		A96924122A9A6BA400E2128B /* Utils */ = {
			isa = PBXGroup;
			children = (
				A9B6E3FA2A9B70360008B232 /* Defaults.swift */,
				A9B6E4042A9BB27A0008B232 /* XCUIApplication+AccountSetup.swift */,
				A9B6E40A2A9BB2980008B232 /* XCUIApplication+TestApp.swift */,
			);
			path = Utils;
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
				2FAD38BF2A455FC200E79ED1 /* SpeziAccount */,
				A969240E2A9A198800E2128B /* ArgumentParser */,
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
				2F027C9A29D6C91E00234098 /* XCTestExtensions */,
				A994264A2CD25C50002F8BD5 /* XCTSpeziAccount */,
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
				2F027C9929D6C91D00234098 /* XCRemoteSwiftPackageReference "XCTestExtensions" */,
				A969240D2A9A198800E2128B /* XCRemoteSwiftPackageReference "swift-argument-parser" */,
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
				2F027C8629D6C2AD00234098 /* AccountTestsView.swift in Sources */,
				2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */,
				A98739032C64EE6000E17A42 /* EntryViewTests.swift in Sources */,
				A9EE7D2A2A3359E800C2B9A9 /* Features.swift in Sources */,
				9B345FB82C94BF470067C977 /* InvitationCodeKey.swift in Sources */,
				2F027C9529D6C63100234098 /* TestAppDelegate.swift in Sources */,
				2F027C8929D6C2AD00234098 /* AccountDetails+Default.swift in Sources */,
				A9B6E3FF2A9B795C0008B232 /* TestStandard.swift in Sources */,
				A9B6E3FD2A9B74830008B232 /* BiographyKey.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A828F5F386007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				A9B6E3F72A9B6F5B0008B232 /* AccountSetupTests.swift in Sources */,
				A98739052C64F1BB00E17A42 /* EntryViewsTests.swift in Sources */,
				A9B6E3FB2A9B70360008B232 /* Defaults.swift in Sources */,
				A9EE7D282A3357D900C2B9A9 /* DocumentationHintsTests.swift in Sources */,
				2F027C9D29D6CA1100234098 /* XCUIApplication+TestPrimaryButton.swift in Sources */,
				A9B6E40B2A9BB2980008B232 /* XCUIApplication+TestApp.swift in Sources */,
				A9B6E4052A9BB27A0008B232 /* XCUIApplication+AccountSetup.swift in Sources */,
				A9B6E3F92A9B6F660008B232 /* AccountOverviewTests.swift in Sources */,
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
				ENABLE_TESTING_SEARCH_PATHS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = TestApp/Info.plist;
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.account.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				TARGETED_DEVICE_FAMILY = "1,2,7";
				XROS_DEPLOYMENT_TARGET = 1.0;
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
				INFOPLIST_FILE = TestApp/Info.plist;
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.account.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				TARGETED_DEVICE_FAMILY = "1,2,7";
				XROS_DEPLOYMENT_TARGET = 1.0;
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.account.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator xros xrsimulator";
				SUPPORTS_MACCATALYST = YES;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				TARGETED_DEVICE_FAMILY = "1,2,7";
				TEST_TARGET_NAME = TestApp;
				XROS_DEPLOYMENT_TARGET = 1.0;
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.account.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator xros xrsimulator";
				SUPPORTS_MACCATALYST = YES;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = NO;
				TARGETED_DEVICE_FAMILY = "1,2,7";
				TEST_TARGET_NAME = TestApp;
				XROS_DEPLOYMENT_TARGET = 1.0;
			};
			name = Release;
		};
		A94FDCE12AFC4A86008026CE /* Test */ = {
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
		A94FDCE22AFC4A86008026CE /* Test */ = {
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
				INFOPLIST_FILE = TestApp/Info.plist;
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.account.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				TARGETED_DEVICE_FAMILY = "1,2,7";
				XROS_DEPLOYMENT_TARGET = 1.0;
			};
			name = Test;
		};
		A94FDCE32AFC4A86008026CE /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CLANG_ENABLE_MODULES = YES;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.account.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator xros xrsimulator";
				SUPPORTS_MACCATALYST = YES;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				TARGETED_DEVICE_FAMILY = "1,2,7";
				TEST_TARGET_NAME = TestApp;
				XROS_DEPLOYMENT_TARGET = 1.0;
			};
			name = Test;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		2F6D138D28F5F384007C25D6 /* Build configuration list for PBXProject "UITests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13B428F5F386007C25D6 /* Debug */,
				A94FDCE12AFC4A86008026CE /* Test */,
				2F6D13B528F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		2F6D13B628F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestApp" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13B728F5F386007C25D6 /* Debug */,
				A94FDCE22AFC4A86008026CE /* Test */,
				2F6D13B828F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		2F6D13BC28F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestAppUITests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13BD28F5F386007C25D6 /* Debug */,
				A94FDCE32AFC4A86008026CE /* Test */,
				2F6D13BE28F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */

/* Begin XCRemoteSwiftPackageReference section */
		2F027C9929D6C91D00234098 /* XCRemoteSwiftPackageReference "XCTestExtensions" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTestExtensions.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.0.0;
			};
		};
		A969240D2A9A198800E2128B /* XCRemoteSwiftPackageReference "swift-argument-parser" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/apple/swift-argument-parser.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.0.0;
			};
		};
/* End XCRemoteSwiftPackageReference section */

/* Begin XCSwiftPackageProductDependency section */
		2F027C9A29D6C91E00234098 /* XCTestExtensions */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2F027C9929D6C91D00234098 /* XCRemoteSwiftPackageReference "XCTestExtensions" */;
			productName = XCTestExtensions;
		};
		2FAD38BF2A455FC200E79ED1 /* SpeziAccount */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziAccount;
		};
		A969240E2A9A198800E2128B /* ArgumentParser */ = {
			isa = XCSwiftPackageProductDependency;
			package = A969240D2A9A198800E2128B /* XCRemoteSwiftPackageReference "swift-argument-parser" */;
			productName = ArgumentParser;
		};
		A994264A2CD25C50002F8BD5 /* XCTSpeziAccount */ = {
			isa = XCSwiftPackageProductDependency;
			productName = XCTSpeziAccount;
		};
/* End XCSwiftPackageProductDependency section */
	};
	rootObject = 2F6D138A28F5F384007C25D6 /* Project object */;
}

================
File: Tests/UITests/UITests.xcodeproj/project.pbxproj.license
================
This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp.xctestplan
================
{
  "configurations" : [
    {
      "id" : "8CD075D1-41D1-400C-AD53-416A3B9C41E2",
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
          "identifier" : "SpeziAccount",
          "name" : "SpeziAccount"
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
This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: .gitignore
================
#
# This source file is part of the Spezi open source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
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
# This source file is part of the Spezi open source project
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
      - SpeziAccount
      - XCTSpeziAccount

================
File: .swiftlint.yml
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
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
    - as

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
# This source file is part of the Spezi open source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
# 

cff-version: 1.2.0
message: "If you use this software, please cite it as below."
authors:
- family-names: "Schmiedmayer"
  given-names: "Paul"
  orcid: "https://orcid.org/0000-0002-8607-9148"
- family-names: "Bauer"
  given-names: "Andreas"
  orcid: "https://orcid.org/0000-0002-1680-237X"
- family-names: "Ravi"
  given-names: "Vishnu"
  orcid: "https://orcid.org/0000-0003-0359-1275"
- family-names: "Aalami"
  given-names: "Oliver"
  orcid: "https://orcid.org/0000-0002-7799-2429"
title: "SpeziAccount"
doi: 10.5281/zenodo.7796499
url: "https://github.com/StanfordSpezi/SpeziAccount"

================
File: CONTRIBUTORS.md
================
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

================
File: LICENSE.md
================
MIT License

Copyright (c) 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

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



================================================================
End of Codebase
================================================================
