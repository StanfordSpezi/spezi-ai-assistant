This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

================================================================
Directory Structure
================================================================
.github/
  workflows/
    build-and-test.yml
    pull_request.yml
.reuse/
  dep5
LICENSES/
  MIT.txt
Sources/
  SpeziPersonalInfo/
    Fields/
      NameFieldRow.swift
      NameTextField.swift
    Resources/
      Localizable.xcstrings
      Localizable.xcstrings.license
    SpeziPersonalInfo.docc/
      SpeziPersonalInfo.md
    UserProfileView.swift
  SpeziValidation/
    Configuration/
      ValidationDebounceDuration.swift
      ValidationEngine+Configuration.swift
    Resources/
      Localizable.xcstrings
      Localizable.xcstrings.license
    SpeziValidation.docc/
      SpeziValidation.md
    ValidationState/
      CapturedValidationState.swift
      FailedValidationResult.swift
      ReceiveValidationModifier.swift
      ValidationContext.swift
      ValidationState.swift
    Views/
      ValidationResultsView.swift
      VerifiableTextField.swift
    ValidationEngine.swift
    ValidationModifier.swift
    ValidationRule.swift
    ValidationRule+Defaults.swift
  SpeziViews/
    Environment/
      DefaultErrorDescription.swift
      ProcessingDebounceDuration.swift
    Model/
      ImageReference.swift
      OperationState.swift
      ViewState.swift
    Modules/
      ConfigureTipKit.swift
    Properties/
      ManagedViewUpdate.swift
    Resources/
      Localizable.xcstrings
      Localizable.xcstrings.license
    SpeziViews.docc/
      SpeziViews.md
      SPI.md
    Styles/
      ReverseLabelStyle.swift
    Utilities/
      AnyLocalizedError.swift
      Binding+Negate.swift
      BundleDescription+Bundle.swift
      LocalizedStringResource+String.swift
      StringProtocol+Localization.swift
      TextContentType.swift
    ViewModifier/
      ViewState/
        OperationStateAlert.swift
        ViewStateAlert.swift
        ViewStateMapper.swift
      ConditionalModifier.swift
      DeviceOrientationModifier.swift
      FocusOnTapModifier.swift
      ProcessingOverlay.swift
      ShimmerModifier.swift
      SkeletonLoadingModifier.swift
    Views/
      Button/
        AsyncButton.swift
        DismissButton.swift
        InfoButton.swift
      Controls/
        CaseIterablePicker.swift
        OptionSetPicker.swift
        PickerValue.swift
      Drawing/
        CanvasView.swift
      Layout/
        DescriptionGridRow.swift
        DynamicHStack.swift
        HorizontalGeometryReader.swift
      List/
        LabeledContent+Init.swift
        ListHeader.swift
        ListRow.swift
      Text/
        Label.swift
        LazyText.swift
        MarkdownView.swift
        TextContent.swift
      Tiles/
        CompletedTileHeader.swift
        SimpleTile.swift
        TileHeader.swift
Tests/
  SpeziViewsTests/
    SnapshotTests.swift
    SpeziValidationTests.swift
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
      Examples/
        NameFieldsExample.swift
        SkeletonLoadingExample.swift
        TileExample.swift
        ValidationExample.swift
        ViewStateExample.swift
      PersonalInfoTests/
        NameFieldsTestView.swift
        SpeziPersonalInfoTests.swift
      ValidationTests/
        DefaultValidationRules.swift
        FocusedValidationTests.swift
        SpeziValidationTests.swift
        ValidationPredicateTests.swift
      ViewsTests/
        ButtonTestView.swift
        CanvasTestView.swift
        CaseIterablePickerTests.swift
        ConditionalModifierTestView.swift
        DefaultErrorDescriptionTestView.swift
        GeometryReaderTestView.swift
        ManagedViewStateTests.swift
        MarkdownViewTestView.swift
        OperationStateTestView.swift
        SpeziViewsTests.swift
        ViewStateMapperView.swift
        ViewStateTestView.swift
      Localizable.xcstrings
      Localizable.xcstrings.license
      SpeziViewsTargetsTests.swift
      TestApp.entitlements.license
      TestApp.swift
    TestAppUITests/
      SpeziPersonalInfo/
        PersonalInfoViewsTests.swift
      SpeziValidation/
        ValidationTests.swift
      SpeziViews/
        EnvironmentTests.swift
        ModelTests.swift
        ViewsTests.swift
      XCUIApplication+Targets.swift
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
# This source file is part of the Stanford Spezi open-source project
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
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziViews-Package
      resultBundle: SpeziViews-iOS.xcresult
      artifactname: SpeziViews-iOS.xcresult
  buildandtest_watchos:
    name: Build and Test Swift Package watchOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziViews-Package
      destination: 'platform=watchOS Simulator,name=Apple Watch Series 10 (46mm)'
      resultBundle: SpeziViews-watchOS.xcresult
      artifactname: SpeziViews-watchOS.xcresult
  buildandtest_visionos:
    name: Build and Test Swift Package visionOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziViews-Package
      destination: 'platform=visionOS Simulator,name=Apple Vision Pro'
      resultBundle: SpeziViews-visionOS.xcresult
      artifactname: SpeziViews-visionOS.xcresult
  buildandtest_tvos:
    name: Build and Test Swift Package tvOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziViews-Package
      destination: 'platform=tvOS Simulator,name=Apple TV 4K (3rd generation)'
      resultBundle: SpeziViews-tvOS.xcresult
      artifactname: SpeziViews-tvOS.xcresult
  buildandtest_macos:
    name: Build and Test Swift Package macOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziViews-Package
      destination: 'platform=macOS,arch=arm64'
      resultBundle: SpeziViews-macOS.xcresult
      artifactname: SpeziViews-macOS.xcresult
  buildandtestuitests_ios:
    name: Build and Test UI Tests iOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      path: Tests/UITests
      scheme: TestApp
      resultBundle: TestApp-iOS.xcresult
      artifactname: TestApp-iOS.xcresult
  buildandtestuitests_ipad:
    name: Build and Test UI Tests iPadOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      path: Tests/UITests
      scheme: TestApp
      destination: 'platform=iOS Simulator,name=iPad Pro 13-inch (M4)'
      resultBundle: TestApp-iPad.xcresult
      artifactname: TestApp-iPad.xcresult
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
    needs: [buildandtest_ios, buildandtest_visionos, buildandtest_watchos, buildandtest_tvos, buildandtest_macos, buildandtestuitests_ios, buildandtestuitests_ipad, buildandtestuitests_visionos]
    uses: StanfordSpezi/.github/.github/workflows/create-and-upload-coverage-report.yml@v2
    with:
      coveragereports: SpeziViews-iOS.xcresult SpeziViews-watchOS.xcresult SpeziViews-visionOS.xcresult SpeziViews-tvOS.xcresult TestApp-iOS.xcresult TestApp-iPad.xcresult TestApp-visionOS.xcresult
    secrets:
      token: ${{ secrets.CODECOV_TOKEN }}

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

================
File: .reuse/dep5
================
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/

Files: Tests/SpeziViewsTests/__Snapshots__/*
Copyright: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
License: MIT

================
File: LICENSES/MIT.txt
================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

================
File: Sources/SpeziPersonalInfo/Fields/NameFieldRow.swift
================
public struct NameFieldRow<Description: View, Label: View>: View {
    private let description: Description
    private let label: Label
    private let component: WritableKeyPath<PersonNameComponents, String?>
    @Binding private var name: PersonNameComponents
    public var body: some View {
        let isMacOS = true
        let isMacOS = false
    public init(
    @Previewable @State var name = PersonNameComponents()

================
File: Sources/SpeziPersonalInfo/Fields/NameTextField.swift
================
public struct NameTextField<Label: View>: View {
    private let prompt: Text?
    private let label: Label
    private let nameComponent: WritableKeyPath<PersonNameComponents, String?>
    @Binding private var name: PersonNameComponents
    private var componentBinding: Binding<String> {
    private var contentType: TextContentType {
    public var body: some View {
    public init(
    @Previewable @State var name = PersonNameComponents()

================
File: Sources/SpeziPersonalInfo/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {

  },
  "version" : "1.0"
}

================
File: Sources/SpeziPersonalInfo/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Sources/SpeziPersonalInfo/SpeziPersonalInfo.docc/SpeziPersonalInfo.md
================
# ``SpeziPersonalInfo``

A SpeziViews target that provides a common set of SwiftUI views and related functionality for managing personal information.

<!--

This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

## Overview

SpeziPersonalInfo provides predefined UI components to deal with common cases in visualizing or collecting personal information.

@Column {
    @Image(source: "NameFields", alt: "Three text fields to input your first, middle and last name.") {
        Collect the input for multiple [`PersonNameComponents`](https://developer.apple.com/documentation/foundation/personnamecomponents)
        fields using [`NameFieldRow`](https://swiftpackageindex.com/stanfordspezi/speziviews/documentation/spezipersonalinfo/namefieldrow).
    }
}

## Topics

### Person Name

- ``NameTextField``
- ``NameFieldRow``

### User Profile

- ``UserProfileView``

================
File: Sources/SpeziPersonalInfo/UserProfileView.swift
================
public struct UserProfileView: View {
    private let name: PersonNameComponents
    private let imageLoader: () async -> Image?
    @State private var image: Image?
    private var colorScheme
    private var systemBackgroundWhite: Color {
    private var letterCircleColor: Color {
    public var body: some View {
    public init(name: PersonNameComponents, imageLoader: @escaping () async -> Image? = { nil }) {

================
File: Sources/SpeziValidation/Configuration/ValidationDebounceDuration.swift
================
struct ValidationDebounceDurationKey: EnvironmentKey {
    static let defaultValue: Duration = .seconds(0.5)
    public var validationDebounce: Duration {

================
File: Sources/SpeziValidation/Configuration/ValidationEngine+Configuration.swift
================
    public struct Configuration: OptionSet, EnvironmentKey, Equatable {
        public static let hideFailedValidationOnEmptySubmit = Configuration(rawValue: 1 << 0)
        public static let considerNoInputAsValid = Configuration(rawValue: 1 << 1)
        public static let defaultValue: Configuration = []
        public let rawValue: UInt
        public init(rawValue: UInt) {
    public var validationConfiguration: ValidationEngine.Configuration {

================
File: Sources/SpeziValidation/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "VALIDATION_RULE_MINIMAL_EMAIL" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Diese E-Mail ist ungültig."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The provided email is invalid."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "El correo electrónico proporcionado no es válido."
          }
        }
      }
    },
    "VALIDATION_RULE_NON_EMPTY" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Dieses Feld kann nicht leer sein."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This field cannot be empty."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Este espacio no puede estar vacío."
          }
        }
      }
    },
    "VALIDATION_RULE_PASSWORD_LENGTH %lld" : {
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
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Tu contraseña debe tener al menos %lld caracteres."
          }
        }
      }
    },
    "VALIDATION_RULE_UNICODE_LETTERS" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Du kannst nur Zeichen verwenden."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "You must only use letters."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Debes usar solo letras."
          }
        }
      }
    },
    "VALIDATION_RULE_UNICODE_LETTERS_ASCII" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Du kannst nur Zeichen aus dem englischen Alphabet verwenden."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "You must only use standard English letters."
          }
        },
        "es" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Debes usar solo letras estándar en inglés."
          }
        }
      }
    }
  },
  "version" : "1.0"
}

================
File: Sources/SpeziValidation/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Sources/SpeziValidation/SpeziValidation.docc/SpeziValidation.md
================
# ``SpeziValidation``

Perform input validation and visualize it to the user.

<!--

This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

## Overview

`SpeziValidation` can be used to perform input validation on `String`-based inputs and provides easy-to-use
mechanism to communicate validation feedback back to the user.
The library is based on a rule-based approach using ``ValidationRule``s.

@Column {
    @Image(source: "Validation", alt: "Three different kinds of text fields showing validation errors in red text.") {
        Perform and visualize input validation with ease using ``SwiftUI/View/validate(input:rules:)-9vks0`` and ``VerifiableTextField``.
    }
}

### Performing Validation

The only thing you have to do, is to set up the ``SwiftUICore/View/validate(input:rules:)-5dac4`` modifier for your
text input.
Supply your input and validation rules.

The below code example shows a basic validation setup.
Note that we are using the ``VerifiableTextField`` to automatically visualize validation errors to the user.

```swift
@State var phrase: String = ""

var body: some View {
    Form {
        VerifiableTextField("your favorite phrase", text: $phrase)
            .validate(input: phrase, rules: .nonEmpty)
    }
}
```

> Note: The inner views can access the ``ValidationEngine`` using the [Environment](https://developer.apple.com/documentation/swiftui/environment/init(_:)-8slkf)
property wrapper.

### Managing Validation

Parent views can access the validation state of their child views using the ``ValidationState`` property wrapper
and the ``SwiftUICore/View/receiveValidation(in:)`` modifier.

The code example below shows
how you can use the validation state of your subview to perform final validation on a button press.

```swift
@ValidationState var validation

var body: some View {
    Form {
        // all subviews that collect data ...

        Button("Submit") {
            guard validation.validateSubviews() else {
                return
            }

            // save data ...
        }
    }
        .receiveValidation(in: $validation)
}
```

## Topics

### Performing Validation

- ``ValidationRule``
- ``SwiftUICore/View/validate(input:rules:)-5dac4``
- ``SwiftUICore/View/validate(input:rules:)-9vks0``
- ``SwiftUICore/View/validate(_:message:)``

### Managing Validation

- ``ValidationState``
- ``SwiftUICore/View/receiveValidation(in:)``

### Configuration

- ``SwiftUICore/EnvironmentValues/validationConfiguration``
- ``SwiftUICore/EnvironmentValues/validationDebounce``

### Visualizing Validation

- ``VerifiableTextField``
- ``ValidationResultsView``
- ``FailedValidationResult``

================
File: Sources/SpeziValidation/ValidationState/CapturedValidationState.swift
================
public struct CapturedValidationState {
    private nonisolated let engine: ValidationEngine
    private nonisolated let input: String
    private let focusState: FocusState<Bool>.Binding
    init(engine: ValidationEngine, input: String, focus focusState: FocusState<Bool>.Binding) {
    func moveFocus() {
    @MainActor public func runValidation() {
    public subscript<Value>(dynamicMember keyPath: KeyPath<ValidationEngine, Value>) -> Value {

================
File: Sources/SpeziValidation/ValidationState/FailedValidationResult.swift
================
public struct FailedValidationResult: Identifiable, Equatable, CustomLocalizedStringResourceConvertible {
    public var id: ValidationRule.ID
    public let message: LocalizedStringResource
    public var localizedStringResource: LocalizedStringResource {
    init(from rule: ValidationRule) {

================
File: Sources/SpeziValidation/ValidationState/ReceiveValidationModifier.swift
================
struct CapturedValidationStateKey: PreferenceKey {
    static var defaultValue: [CapturedValidationState] {
    static func reduce(value: inout [CapturedValidationState], nextValue: () -> [CapturedValidationState]) {
    public func receiveValidation(in state: ValidationState.Binding) -> some View {

================
File: Sources/SpeziValidation/ValidationState/ValidationContext.swift
================
public struct ValidationContext: Sendable {
    private let entries: [CapturedValidationState]
    public var allInputValid: Bool {
    public var allValidationResults: [FailedValidationResult] {
    public var allDisplayedValidationResults: [FailedValidationResult] {
    public var isDisplayingValidationErrors: Bool {
    init() {
    init(entries: [CapturedValidationState]) {
    @MainActor private func collectFailedValidations() -> [CapturedValidationState] {
    public func validateSubviews(switchFocus: Bool = true) -> Bool {
        let failedFields = collectFailedValidations()
    public var startIndex: Int {
    public var endIndex: Int {
    public func index(after index: Int) -> Int {
    public subscript(position: Int) -> CapturedValidationState {

================
File: Sources/SpeziValidation/ValidationState/ValidationState.swift
================
public struct ValidationState: DynamicProperty {
    @State private var state = ValidationContext()
    public var wrappedValue: ValidationContext {
    public var projectedValue: ValidationState.Binding {
    public init() {}
    public struct Binding: Sendable {
        @MainActor private let binding: SwiftUI.Binding<ValidationContext>
        public var projectedValue: Binding {
        init(binding: SwiftUI.Binding<ValidationContext>) {

================
File: Sources/SpeziValidation/Views/ValidationResultsView.swift
================
public struct ValidationResultsView: View {
    private let results: [FailedValidationResult]
    public var body: some View {
    public init(results: [FailedValidationResult]) {

================
File: Sources/SpeziValidation/Views/VerifiableTextField.swift
================
public struct VerifiableTextField<FieldLabel: View, FieldFooter: View>: View {
    public enum TextFieldType {
    private let label: FieldLabel
    private let textFieldFooter: FieldFooter
    private let fieldType: TextFieldType
    @Binding private var text: String
    var validationEngine: ValidationEngine?
    public var body: some View {
    public init(
    @Previewable @State var text = ""

================
File: Sources/SpeziValidation/ValidationEngine.swift
================
public final class ValidationEngine: Identifiable {
    private enum Source: Equatable {
    private static let logger = Logger(subsystem: "edu.stanford.spezi.validation", category: "ValidationEngine")
    public nonisolated var id: ObjectIdentifier {
    public let validationRules: [ValidationRule]
    @MainActor private var computedInputValid: Bool? // swiftlint:disable:this discouraged_optional_boolean
    @MainActor public var inputValid: Bool {
    @MainActor public private(set) var validationResults: [FailedValidationResult] = []
    private var source: Source?
    private var inputWasEmpty = true
    @MainActor public var isDisplayingValidationErrors: Bool {
        let gotResults = !validationResults.isEmpty
    @MainActor public var displayedValidationResults: [FailedValidationResult] {
    public var configuration: Configuration
    public var debounceDuration: Duration
    private var debounceTask: Task<Void, Never>? {
    init(
    convenience init(
    private func computeFailedValidations(input: String) -> [FailedValidationResult] {
        var results: [FailedValidationResult] = []
    private func computeValidation(input: String, source: Source) {
    public func submit(input: String, debounce: Bool = false) {
    public func runValidation(input: String) {
    private func debounce(_ task: @escaping () -> Void) {

================
File: Sources/SpeziValidation/ValidationModifier.swift
================
struct ValidationModifier: ViewModifier {
    private let input: String
    @Environment(\.validationConfiguration) private var configuration
    @Environment(\.validationDebounce) private var debounce
    @State private var validation: ValidationEngine
    @FocusState private var hasFocus: Bool
    init(input: String, rules: [ValidationRule]) {
    func body(content: Content) -> some View {
    public func validate(input value: String, rules: [ValidationRule]) -> some View {
    public func validate(input value: String, rules: ValidationRule...) -> some View {
    public func validate(_ predicate: Bool, message: LocalizedStringResource) -> some View {
        let rule = ValidationRule(rule: { $0.isEmpty }, message: message)

================
File: Sources/SpeziValidation/ValidationRule.swift
================
enum CascadingValidationEffect {
public struct ValidationRule: Identifiable, Sendable, Equatable {
    public let id: UUID
    private let rule: @Sendable (String) -> Bool
    public let message: LocalizedStringResource
    let effect: CascadingValidationEffect
    init(
    public init(rule: @escaping @Sendable (String) -> Bool, message: LocalizedStringResource) {
    public init(rule: @escaping @Sendable (String) -> Bool, message: String.LocalizationValue, bundle: Bundle) {
    public init<Output>(regex: Regex<Output>, message: LocalizedStringResource) {
        nonisolated(unsafe) let regexTmp = regex
    public init<Output>(regex: Regex<Output>, message: String.LocalizationValue, bundle: Bundle) {
    public init(copy validationRule: ValidationRule, message: LocalizedStringResource) {
    public func validate(_ input: String) -> FailedValidationResult? {
    public var intercepting: ValidationRule {
    enum CodingKeys: String, CodingKey {
    public init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        let regexString = try values.decode(String.self, forKey: .rule)
        let regex = try Regex<AnyRegexOutput>(regexString)
        let message: LocalizedStringResource

================
File: Sources/SpeziValidation/ValidationRule+Defaults.swift
================


================
File: Sources/SpeziViews/Environment/DefaultErrorDescription.swift
================
private struct DefaultErrorDescription: EnvironmentKey {
    static let defaultValue: LocalizedStringResource? = nil
    public var defaultErrorDescription: LocalizedStringResource? {

================
File: Sources/SpeziViews/Environment/ProcessingDebounceDuration.swift
================
private struct ProcessingDebounceDuration: EnvironmentKey {
    static let defaultValue: Duration = .milliseconds(150)
    public var processingDebounceDuration: Duration {

================
File: Sources/SpeziViews/Model/ImageReference.swift
================
public enum ImageReference {
    public var isSystemImage: Bool {
    public var image: Image? {
    public var uiImage: UIImage? {
    public var wkImage: WKImage? {
    public var nsImage: NSImage? {

================
File: Sources/SpeziViews/Model/OperationState.swift
================
public protocol OperationState {

================
File: Sources/SpeziViews/Model/ViewState.swift
================
public enum ViewState {
    public var errorTitle: String {
    public var errorDescription: String {
            var errorDescription = ""

================
File: Sources/SpeziViews/Modules/ConfigureTipKit.swift
================
public class ConfigureTipKit: Module, DefaultInitializable, EnvironmentAccessible {
    private let configuration: [Tips.ConfigurationOption]
    @Application(\.logger) private var logger
    public init(_ configuration: [Tips.ConfigurationOption]) {
    public required convenience init() {
    public func configure() {
    public static let testingTips = CommandLine.arguments.contains("--testTips")

================
File: Sources/SpeziViews/Properties/ManagedViewUpdate.swift
================
private final class UIUpdate {
    private var dateTimer: Timer? {
    private var trigger: UInt64 = 0
    nonisolated init() {}
    func access() {
    func manualUpdate() {
    func scheduleUpdate(at date: Date) {
        struct WeakSendingSelf: Sendable { // assumeIsolated requires a @Sendable closure, so we need to pass self via a Sendable type
            weak var value: UIUpdate?
            init(_ value: UIUpdate) {
        let sendingSelf = WeakSendingSelf(self)
        let timer = Timer(fire: date, interval: 0, repeats: false) { [sendingSelf] _ in
    deinit {
public struct ManagedViewUpdate {
    private let uiUpdate = UIUpdate()
    public var wrappedValue: Self {
    public init() {}
    public func schedule(at date: Date) {
    public func refresh() {
    public func update() {

================
File: Sources/SpeziViews/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "%lld selected" : {

    },
    "A" : {

    },
    "B" : {

    },
    "Completed" : {
      "comment" : "Completed Tile. Subtitle"
    },
    "DEFAULT_ERROR_DESCRIPTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ein unerwarteter Fehler ist aufgetreten!"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unexpected error occurred!"
          }
        }
      }
    },
    "Dismiss" : {

    },
    "Error" : {
      "comment" : "View State default error title",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Fehler"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Error"
          }
        }
      }
    },
    "MARKDOWN_LOADING_ERROR" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Das Dokument konnte nicht geladen werden."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Could not load and parse the document."
          }
        }
      }
    },
    "MARKDOWN_LOADING_ERROR_FAILURE_REASON" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der Inhalt des Dokuments konnte nicht verarbeitet werden. Grund dessen ist ein invaliden Markdown Text."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "The system wasn't able to parse the given markdown text, indicating an invalid markdown text."
          }
        }
      }
    },
    "MARKDOWN_LOADING_ERROR_RECOVERY_SUGGESTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte prüfen Sie den Inhalt des Markdown Dokuments."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Please check the content of the markdown text."
          }
        }
      }
    },
    "None" : {

    },
    "nothing selected" : {

    },
    "Option %u" : {

    }
  },
  "version" : "1.0"
}

================
File: Sources/SpeziViews/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Sources/SpeziViews/SpeziViews.docc/SpeziViews.md
================
# ``SpeziViews``

A Spezi framework that provides a common set of SwiftUI views and related functionality used across the Spezi ecosystem.

<!--

This source file is part of the Spezi open-source project

SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->
## Overview

SpeziViews provides easy-to-use and easily-reusable UI components that makes the everyday life of developing Spezi applications easier.

@Row {
    @Column {
        @Image(source: "ViewState", alt: "A SwiftUI alert displayed using the SpeziViews ViewState.") {
            Easily manage view state and display erroneous state using ``ViewState``.
        }
    }
    @Column {
        @Image(source: "NameFields", alt: "Three text fields to input your first, middle and last name.") {
            The [SpeziPersonalInfo](https://swiftpackageindex.com/StanfordSpezi/SpeziViews/documentation/spezipersonalinfo)
            provides easy to use abstractions for dealing with personal information.
            For example collecting the input for multiple [`PersonNameComponents`](https://developer.apple.com/documentation/foundation/personnamecomponents)
            fields using [`NameFieldRow`](https://swiftpackageindex.com/stanfordspezi/speziviews/documentation/spezipersonalinfo/namefieldrow).
        }
    }
    @Column {
        @Image(source: "Validation", alt: "Three different kinds of text fields showing validation errors in red text.") {
            Perform and visualize input validation with ease using [SpeziValidation](https://swiftpackageindex.com/StanfordSpezi/SpeziViews/documentation/spezivalidation).
        }
    }
}


## Topics

### Manage and communicate View State

- ``ViewState``
- ``SwiftUICore/View/viewStateAlert(state:)-4wzs4``
- ``SwiftUICore/View/viewStateAlert(state:)-27a86``
- ``OperationState``
- ``SwiftUICore/View/map(state:to:)``
- ``SwiftUICore/View/processingOverlay(isProcessing:overlay:)-5xplv``
- ``SwiftUICore/View/processingOverlay(isProcessing:overlay:)-3df8d``

### Layout
Default layouts and utilities to automatically adapt your view layouts to dynamic type sizes, device orientation, and device size classes.

- ``SimpleTile``
- ``TileHeader``
- ``CompletedTileHeader``
- ``DynamicHStack``
- ``ListRow``
- ``DescriptionGridRow``
- ``ListHeader``

### Controls

- ``AsyncButton``
- ``SwiftUICore/EnvironmentValues/processingDebounceDuration``
- ``CanvasView``
- ``InfoButton``
- ``DismissButton``
- ``CaseIterablePicker``
- ``OptionSetPicker``

### Displaying Text

- ``Label``
- ``LazyText``
- ``MarkdownView``
- ``TextContentType``

### Images

- ``ImageReference``

### Conditional Modifiers

- ``SwiftUICore/View/if(_:transform:)``
- ``SwiftUICore/View/if(condition:transform:)``

### Animations and Visual Effects

- ``SwiftUICore/View/shimmer(repeatInterval:)``
- ``SwiftUICore/View/skeletonLoading(replicationCount:repeatInterval:spacing:)``

### Interact with the View Environment

- ``SwiftUICore/View/focusOnTap()``
- ``SwiftUICore/View/observeOrientationChanges(_:)``

### View Management

- ``ManagedViewUpdate``

### Styles

- ``ReverseLabelStyle``
- ``SwiftUI/LabelStyle/reverse``

### Localization

- ``Foundation/LocalizedStringResource/BundleDescription/atURL(from:)``
- ``Foundation/LocalizedStringResource/localizedString(for:)``
- ``Swift/StringProtocol/localized(_:)``

### Readers

- ``HorizontalGeometryReader``
- ``WidthPreferenceKey``

### Error Handling

- ``AnyLocalizedError``
- ``SwiftUICore/EnvironmentValues/defaultErrorDescription``

### Modules

- ``ConfigureTipKit``

### System Programming Interfaces
- <doc:SPI>

================
File: Sources/SpeziViews/SpeziViews.docc/SPI.md
================
# System Programming Interfaces

<!--
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

An overview of System Programming Interfaces (SPIs) provided by SpeziViews.

## Overview

A [System Programming Interface](https://blog.eidinger.info/system-programming-interfaces-spi-in-swift-explained) is a subset of API
that is targeted only for certain users (e.g., framework developers) and might not be necessary or useful for app development.
Therefore, these interfaces are not visible by default and need to be explicitly imported.
This article provides an overview of supported SPI provided by SpeziFoundation

### TestingSupport

The `TestingSupport` SPI provides additional interfaces that are useful for unit and UI testing.
Annotate your import statement as follows.

```swift
@_spi(TestingSupport) import SpeziViews
```

#### RuntimeConfig

[`RuntimeConfig`](https://swiftpackageindex.com/stanfordspezi/spezifoundation/documentation/spezifoundation/spi#RuntimeConfig) is provided by
[SpeziFoundation](https://swiftpackageindex.com/stanfordspezi/spezifoundation/documentation/spezifoundation) for a central place to
provide runtime configurations.

SpeziViews adds the following extensions:

- `RuntimeConfig/testingTips`: Holds `true` if the `--testTips` command line flag was supplied to indicate to always show Tips when using
    ``ConfigureTipKit``.

================
File: Sources/SpeziViews/Styles/ReverseLabelStyle.swift
================
public struct ReverseLabelStyle: LabelStyle {
    public func makeBody(configuration: Configuration) -> some View {
    public static var reverse: ReverseLabelStyle {

================
File: Sources/SpeziViews/Utilities/AnyLocalizedError.swift
================
public struct AnyLocalizedError: LocalizedError {
    private static let globalDefaultErrorDescription = LocalizedStringResource("DEFAULT_ERROR_DESCRIPTION", bundle: .atURL(Bundle.module.bundleURL))
    public var errorDescription: String?
    public var failureReason: String?
    public var helpAnchor: String?
    public var recoverySuggestion: String?
    public init(error: Error, defaultErrorDescription: LocalizedStringResource? = nil) {
    public init(error: Error, defaultErrorDescription: String) {

================
File: Sources/SpeziViews/Utilities/Binding+Negate.swift
================


================
File: Sources/SpeziViews/Utilities/BundleDescription+Bundle.swift
================
    public static func atURL(from bundle: Bundle) -> LocalizedStringResource.BundleDescription {

================
File: Sources/SpeziViews/Utilities/LocalizedStringResource+String.swift
================
    public func localizedString(for locale: Locale? = nil) -> String {
            var resource = self

================
File: Sources/SpeziViews/Utilities/StringProtocol+Localization.swift
================
    public func localized(_ bundle: Bundle? = nil) -> LocalizedStringResource {
        let bundleDescription = bundle.map { LocalizedStringResource.BundleDescription.atURL(from: $0) } ?? .main

================
File: Sources/SpeziViews/Utilities/TextContentType.swift
================


================
File: Sources/SpeziViews/ViewModifier/ViewState/OperationStateAlert.swift
================
private struct OperationStateAlert<T: OperationState>: ViewModifier {
    private let operationState: T
    @State private var viewState: ViewState
    init(operationState: T) {
    func body(content: Content) -> some View {
    public func viewStateAlert<T: OperationState>(state: T) -> some View {

================
File: Sources/SpeziViews/ViewModifier/ViewState/ViewStateAlert.swift
================
private struct ViewStateAlert: ViewModifier {
    @Binding private var state: ViewState
    private var errorAlertBinding: Binding<Bool> {
    init(state: Binding<ViewState>) {
    func body(content: Content) -> some View {
    public func viewStateAlert(state: Binding<ViewState>) -> some View {

================
File: Sources/SpeziViews/ViewModifier/ViewState/ViewStateMapper.swift
================
private struct ViewStateMapper<T: OperationState>: ViewModifier {
    private let operationState: T
    @Binding private var viewState: ViewState
    init(operationState: T, viewState: Binding<ViewState>) {
    func body(content: Content) -> some View {
    public func map<T: OperationState>(state operationState: T, to viewState: Binding<ViewState>) -> some View {

================
File: Sources/SpeziViews/ViewModifier/ConditionalModifier.swift
================
    @ViewBuilder public func `if`<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
    @ViewBuilder public func `if`<Content: View>(condition: () -> Bool, transform: (Self) -> Content) -> some View {

================
File: Sources/SpeziViews/ViewModifier/DeviceOrientationModifier.swift
================
struct DeviceOrientationModifier: ViewModifier {
    @Binding private var orientation: UIDeviceOrientation
    init(orientation: Binding<UIDeviceOrientation>) {
    func body(content: Content) -> some View {
    public func observeOrientationChanges(_ orientation: Binding<UIDeviceOrientation>) -> some View {

================
File: Sources/SpeziViews/ViewModifier/FocusOnTapModifier.swift
================
private struct FocusOnTapModifier: ViewModifier {
    @FocusState var isFocused: Bool
    init() {}
    func body(content: Content) -> some View {
    public func focusOnTap() -> some View {

================
File: Sources/SpeziViews/ViewModifier/ProcessingOverlay.swift
================
private struct ProcessingOverlay<Overlay: View>: ViewModifier {
    fileprivate var isProcessing: Bool
    @ViewBuilder fileprivate var overlay: () -> Overlay
    func body(content: Content) -> some View {
    public func processingOverlay<Overlay: View>(

================
File: Sources/SpeziViews/ViewModifier/ShimmerModifier.swift
================
struct ShimmerViewModifier: ViewModifier {
    let repeatInterval: Double
    @State private var shimmering: Bool = false
    func body(content: Content) -> some View {
    public func shimmer(repeatInterval: Double = 1) -> some View {

================
File: Sources/SpeziViews/ViewModifier/SkeletonLoadingModifier.swift
================
struct SkeletonLoadingViewModifier: ViewModifier {
    var replicationCount: Int
    var shimmerRepeatInterval: Double
    var spacing: CGFloat
    func body(content: Content) -> some View {
    public func skeletonLoading(replicationCount: Int = 1, repeatInterval: Double = 1, spacing: CGFloat = 0) -> some View {

================
File: Sources/SpeziViews/Views/Button/AsyncButton.swift
================
enum AsyncButtonState {
public struct AsyncButton<Label: View>: View {
    private let role: ButtonRole?
    private let action: @MainActor () async throws -> Void
    private let label: Label
    var defaultErrorDescription
    var processingDebounceDuration
    @State private var actionTask: Task<Void, Never>?
    @State private var buttonState: AsyncButtonState = .idle
    @Binding private var viewState: ViewState
    private var externallyProcessing: Bool {
    public var body: some View {
    public init(
    public init<Title: StringProtocol>(
    private func submitAction() {
            let debounce = Task {
    private func debounceProcessingIndicator() async {
struct AsyncThrowingButton_Previews: PreviewProvider {
    struct PreviewButton: View {
        var title: String = "Test Button"
        var role: ButtonRole?
        var duration: Duration = .seconds(1)
        var action: () async throws -> Void = {}
        @State var state: ViewState = .idle
        var body: some View {
    static var previews: some View {

================
File: Sources/SpeziViews/Views/Button/DismissButton.swift
================
public struct DismissButton: View {
    @Environment(\.dismiss) private var dismiss
    public var body: some View {
    public init() {}

================
File: Sources/SpeziViews/Views/Button/InfoButton.swift
================
public struct InfoButton: View {
    private let label: Text
    private let action: () -> Void
    public var body: some View {
    public init(_ label: Text, action: @escaping () -> Void) {
    public init(_ resource: LocalizedStringResource, action: @escaping () -> Void) {

================
File: Sources/SpeziViews/Views/Controls/CaseIterablePicker.swift
================
public struct CaseIterablePicker<Value: PickerValue, Label: View>: View where Value.AllCases: RandomAccessCollection {
    private let label: Label
    private let noneValue: Value?
    @Binding private var value: Value
    public var body: some View {
    public init(
    public init(_ titleKey: LocalizedStringResource, selection: Binding<Value>) where Label == Text {
    public init(_ titleKey: LocalizedStringResource, selection: Binding<Value>, none noneValue: Value) where Label == Text {
private enum Version: PickerValue {
    var localizedStringResource: LocalizedStringResource {
    @Previewable @State var version: Version? = .versionA

================
File: Sources/SpeziViews/Views/Controls/OptionSetPicker.swift
================
public enum OptionSetPickerStyle {
    public static var automatic: OptionSetPickerStyle {
private struct ViewBasedOnVisibility<Unlabeled: View, Labeled: View>: View {
    private let unlabeled: Unlabeled
    private let labeled: Labeled
    private var labelsVisibility
    var body: some View {
    init(@ViewBuilder unlabeled: () -> Unlabeled, @ViewBuilder labeled: () -> Labeled) {
public struct OptionSetPicker<Label: View, Value: OptionSet & PickerValue>: View
    private let allowEmptySelection: Bool
    private let style: OptionSetPickerStyle
    private let label: Label
    @Binding private var selection: Value
    private var selectionCount: Int {
    private var singleSelection: Value? {
    public var body: some View {
            let view = ForEach(Value.allCases, id: \.self) { value in
    @ViewBuilder private var menu: some View {
            let menu = Menu {
    @ViewBuilder private var menuLabel: some View {
    @ViewBuilder private var menuContent: some View {
    @ViewBuilder private var menuContentLabel: some View {
    private var selectionLabel: Text {
    public init(
    private func button(for value: Value) -> some View {
    private func toggle(for value: Value) -> some View {
        let binding = Binding {
    private func buttonAction(for value: Value) {
    fileprivate struct Options: OptionSet, PickerValue {
        var rawValue: UInt8
        static let option1 = Options(rawValue: 1 << 0)
        static let option2 = Options(rawValue: 1 << 1)
        static let allCases: [Options] = [.option1, .option2]
        init(rawValue: UInt8) {
        var localizedStringResource: LocalizedStringResource {
    @Previewable @State var selection: PreviewLayout.Options = []
    @Previewable @State var picker: String = ""

================
File: Sources/SpeziViews/Views/Controls/PickerValue.swift
================
    public static var allCases: [Wrapped?] {
    public var localizedStringResource: LocalizedStringResource {

================
File: Sources/SpeziViews/Views/Drawing/CanvasView.swift
================
private struct _CanvasView: UIViewRepresentable {
    class Coordinator: NSObject, PKCanvasViewDelegate {
        let canvasView: _CanvasView
        init(canvasView: _CanvasView) {
        func canvasViewDidBeginUsingTool(_ pkCanvasView: PKCanvasView) {
        func canvasViewDidEndUsingTool(_ pkCanvasView: PKCanvasView) {
        func canvasViewDrawingDidChange(_ pkCanvasView: PKCanvasView) {
    let tool: PKInkingTool
    let drawingPolicy: PKCanvasViewDrawingPolicy
    let picker = PKToolPicker()
    @Binding private var drawing: PKDrawing
    @Binding private var isDrawing: Bool
    @Binding private var showToolPicker: Bool
    init(
    func makeUIView(context: Context) -> PKCanvasView {
        let canvasView = PKCanvasView()
    func updateUIView(_ canvasView: PKCanvasView, context: Context) {
    func makeCoordinator() -> Coordinator {
public struct CanvasView: View {
    public struct CanvasSizePreferenceKey: PreferenceKey, Equatable {
        public static let defaultValue: CGSize = .zero
        public static func reduce(value: inout CGSize, nextValue: () -> CGSize) {
    public var body: some View {
    public init(
struct SignatureView_Previews: PreviewProvider {
    @State private static var isDrawing = false
    static var previews: some View {

================
File: Sources/SpeziViews/Views/Layout/DescriptionGridRow.swift
================
public struct DescriptionGridRow<Description: View, Content: View>: View {
    private let description: Description
    private let content: Content
    public var body: some View {
    public init(
struct DescriptionGridRow_Previews: PreviewProvider {
    static var previews: some View {

================
File: Sources/SpeziViews/Views/Layout/DynamicHStack.swift
================
public enum DynamicLayout: Sendable {
public struct DynamicHStack<Content: View>: View {
    private let realignAfter: DynamicTypeSize
    private let horizontalAlignment: VerticalAlignment
    private let verticalAlignment: HorizontalAlignment
    private let spacing: CGFloat?
    private let content: Content
    private var dynamicTypeSize
    private var horizontalSizeClass
    @State private var orientation = UIDevice.current.orientation
    var isLandscape: Bool {
    private var isHorizontalLayout: Bool {
    public var body: some View {
        let layout = isHorizontalLayout
    public init(
    public static func reduce(value: inout Self?, nextValue: () -> Self?) {

================
File: Sources/SpeziViews/Views/Layout/HorizontalGeometryReader.swift
================
public struct WidthPreferenceKey: PreferenceKey, Equatable {
    public static let defaultValue: CGFloat = 0
    public static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) { }
public struct HorizontalGeometryReader<Content: View>: View {
    private var content: (CGFloat) -> Content
    @State private var width: CGFloat = 0
    public var body: some View {
    public init(@ViewBuilder content: @escaping (CGFloat) -> Content) {

================
File: Sources/SpeziViews/Views/List/LabeledContent+Init.swift
================
    public init(_ label: LocalizedStringResource, @ViewBuilder content: () -> Content) {
    public init<S: StringProtocol>(_ titleKey: LocalizedStringResource, value: S) {
    public init<F: FormatStyle>(

================
File: Sources/SpeziViews/Views/List/ListHeader.swift
================
public struct ListHeader<Image: View, Title: View, Instructions: View>: View {
    private let image: Image
    private let title: Title
    private let instructions: Instructions
    public var body: some View {
    public init(@ViewBuilder image: () -> Image, @ViewBuilder title: () -> Title) where Instructions == EmptyView {
    public init(@ViewBuilder image: () -> Image, @ViewBuilder title: () -> Title, @ViewBuilder instructions: () -> Instructions) {
    public init(systemImage: String, @ViewBuilder title: () -> Title) where Image == SwiftUI.Image, Instructions == EmptyView {
    public init(systemImage: String, @ViewBuilder title: () -> Title, @ViewBuilder instructions: () -> Instructions) where Image == SwiftUI.Image {

================
File: Sources/SpeziViews/Views/List/ListRow.swift
================
public struct ListRow<Label: View, Content: View>: View { // swiftlint:disable:this file_types_order
    private let labeledContent: LabeledContent<Label, Content>
    public var body: some View {
    public init<S: StringProtocol>(verbatim label: S, @ViewBuilder content: () -> Content) where Label == Text {
    public init<S: StringProtocol>(_ label: S, @ViewBuilder content: () -> Content) where Label == Text {
    public init(_ label: LocalizedStringResource, @ViewBuilder content: () -> Content) where Label == Text {
    public init(@ViewBuilder _ label: () -> Label, @ViewBuilder content: () -> Content) {
    public init<S: StringProtocol>(_ titleKey: LocalizedStringResource, value: S) {
    public init<S1: StringProtocol, S2: StringProtocol>(_ title: S1, value: S2) {
    public init<F: FormatStyle>(
    public init<S: StringProtocol, F: FormatStyle>(
private struct PreviewList: View {
    var body: some View {

================
File: Sources/SpeziViews/Views/Text/Label.swift
================
private struct _Label: UIViewRepresentable {
    let text: String
    let textStyle: UIFont.TextStyle
    let textAlignment: NSTextAlignment
    let textColor: UIColor
    let numberOfLines: Int
    let preferredMaxLayoutWidth: CGFloat
    func makeUIView(context: Context) -> UILabel {
        let label = UILabel()
    func updateUIView(_ label: UILabel, context: Context) {
public struct Label: View {
    private let text: TextContent
    private let textStyle: UIFont.TextStyle
    private let textAlignment: NSTextAlignment
    private let textColor: UIColor
    private let numberOfLines: Int
    @Environment(\.locale) private var locale
    public var body: some View {
    public init(
    public init<Text: StringProtocol>(
struct Label_Previews: PreviewProvider {
    static var previews: some View {

================
File: Sources/SpeziViews/Views/Text/LazyText.swift
================
private struct TextLine: Identifiable {
    var id: UUID
    var line: String
public struct LazyText: View {
    private let content: TextContent
    @Environment(\.locale) private var locale
    private var lines: [TextLine] {
        var lines: [TextLine] = []
    public var body: some View {
    public init<Text: StringProtocol>(verbatim text: Text) {
    public init(_ text: LocalizedStringResource) {
struct LazyText_Previews: PreviewProvider {
    static var previews: some View {

================
File: Sources/SpeziViews/Views/Text/MarkdownView.swift
================
public struct MarkdownView: View {
    public enum Error: LocalizedError {
        public var errorDescription: String? {
        public var recoverySuggestion: String? {
        public var failureReason: String? {
    private let asyncMarkdown: () async -> Data
    @State private var markdownString: AttributedString?
    @Binding private var state: ViewState
    public var body: some View {
    public init(
    @MainActor private func parse(markdown: Data) -> AttributedString {
struct PrivacyPolicyView_Previews: PreviewProvider {
    static var previews: some View {

================
File: Sources/SpeziViews/Views/Text/TextContent.swift
================
enum TextContent {
    func localizedString(for locale: Locale) -> String {

================
File: Sources/SpeziViews/Views/Tiles/CompletedTileHeader.swift
================
public struct CompletedTileHeader<Title: View>: View {
    private let alignment: HorizontalAlignment
    private let title: Title
    public var body: some View {
    public init(alignment: HorizontalAlignment = .leading, @ViewBuilder title: () -> Title) {

================
File: Sources/SpeziViews/Views/Tiles/SimpleTile.swift
================
public struct SimpleTile<Header: View, Body: View, Footer: View>: View {
    private let alignment: HorizontalAlignment
    private let header: Header
    private let bodyView: Body
    private let footer: Footer
    public var body: some View {
    public init(

================
File: Sources/SpeziViews/Views/Tiles/TileHeader.swift
================
public struct TileHeader<Icon: View, Title: View, Subheadline: View>: View {
    private let alignment: HorizontalAlignment
    private let icon: Icon
    private let title: Title
    private let subheadline: Subheadline
    private var dynamicTypeSize
    public var body: some View {
    private var modifiedTitle: some View {
    private var modifiedSubheadline: some View {
    public init(

================
File: Tests/SpeziViewsTests/SnapshotTests.swift
================
final class SnapshotTests: XCTestCase {
    func testListRow() {
        let row = List {
        let largeRow = row
    func testReverseLabelStyle() {
        let label = SwiftUI.Label("100 %", image: "battery.100")
    func testDismissButton() {
        let dismissButton = DismissButton()
    func testImageReference() throws {
        let eraser: ImageReference = .system("eraser.fill")
        let nonExistingImage: ImageReference = .asset("does not exist", bundle: .main)
        let image = try XCTUnwrap(eraser.image)
    func testTileHeaderLayout() {
        struct TestView: View {
            private let alignment: HorizontalAlignment
            var body: some View {
            init(alignment: HorizontalAlignment) {
        let leadingTileHeader = TestView(alignment: .leading)
        let centerTileHeader = TestView(alignment: .center)
        let trailingTileHeader = TestView(alignment: .trailing)
    func testSimpleTile() {
        struct TileView: View {
        let tileLeading = TileView(alignment: .leading)
        let tileCenter = TileView(alignment: .center)
        let tileTraining = TileView(alignment: .trailing)
    func testCompletedTileHeader() {
        let view = CompletedTileHeader {
    func testListRowInits() {
        let string = "Hello"
    func testListHeader() {
        let listHeader0 = ListHeader(systemImage: "person.fill.badge.plus") {
        let listHeader1 = ListHeader(systemImage: "person.fill.badge.plus") {
    func testSkeletonLoading() {
        let view =

================
File: Tests/SpeziViewsTests/SpeziValidationTests.swift
================
final class SpeziValidationTests: XCTestCase {
    func testValidationDebounce() async throws {
        let engine = ValidationEngine(rules: .nonEmpty)

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
File: Tests/UITests/TestApp/Examples/NameFieldsExample.swift
================
struct NameFieldsExample: View {
    @State var name = PersonNameComponents()
    @State var hideBackButton = true
    var body: some View {

================
File: Tests/UITests/TestApp/Examples/SkeletonLoadingExample.swift
================
struct SkeletonLoadingExample: View {
    var body: some View {

================
File: Tests/UITests/TestApp/Examples/TileExample.swift
================
struct TileExample: View {
    @State private var alignment: HorizontalAlignment = .leading
    @State private var photoTime = false
    var body: some View {
    public func hash(into hasher: inout Hasher) {

================
File: Tests/UITests/TestApp/Examples/ValidationExample.swift
================
struct ValidationExample: View {
    @State var email: String = ""
    @State var password: String = ""
    @State var content: String = ""
    @State var backButtonHidden = true
    @ValidationState var validation
    var body: some View {

================
File: Tests/UITests/TestApp/Examples/ViewStateExample.swift
================
struct CustomViewStateError: LocalizedError {
    var errorDescription: String? {
    var failureReason: String? {
    init() {}
struct ViewStateExample: View {
    @State var emailAddress = ""
    @State var viewState: ViewState = .idle
    @State var backButtonHidden = true
    var body: some View {
    @MainActor @ViewBuilder var form: some View {

================
File: Tests/UITests/TestApp/PersonalInfoTests/NameFieldsTestView.swift
================
struct NameFieldsTestView: View {
    @State var name = PersonNameComponents()
    var body: some View {
    private var nameFields: some View {
struct NameFieldsTestView_Previews: PreviewProvider {
    static var previews: some View {

================
File: Tests/UITests/TestApp/PersonalInfoTests/SpeziPersonalInfoTests.swift
================
enum SpeziPersonalInfoTests: String, TestAppTests {
    private var nameFields: some View {
    private var userProfile: some View {
    func view(withNavigationPath path: Binding<NavigationPath>) -> some View {

================
File: Tests/UITests/TestApp/ValidationTests/DefaultValidationRules.swift
================
struct DefaultValidationRules: View {
    @State var input: String = ""
    var body: some View {

================
File: Tests/UITests/TestApp/ValidationTests/FocusedValidationTests.swift
================
enum Field: String, Hashable {
struct FocusedValidationTests: View {
    @State var input: String = ""
    @State var nonEmptyInput: String = ""
    @ValidationState var validation
    @State var lastValid: Bool? // swiftlint:disable:this discouraged_optional_boolean
    @State var switchFocus = true
    @FocusState var focus: Field?
    var body: some View {

================
File: Tests/UITests/TestApp/ValidationTests/SpeziValidationTests.swift
================
enum SpeziValidationTests: String, TestAppTests {
    func view(withNavigationPath path: Binding<NavigationPath>) -> some View {

================
File: Tests/UITests/TestApp/ValidationTests/ValidationPredicateTests.swift
================
struct ValidationPredicateTests: View {
    enum Selection: String, CaseIterable, Hashable {
    @State private var selection: Selection = .none
    @ValidationState private var validationState
    var body: some View {

================
File: Tests/UITests/TestApp/ViewsTests/ButtonTestView.swift
================
enum CustomError: Error, LocalizedError {
    var errorDescription: String? {
    var failureReason: String? {
struct ButtonTestView: View {
    @State private var showCompleted = false
    @State private var viewState: ViewState = .idle
    @State private var showInfo = false
    var body: some View {
struct AsyncButtonTestView_Previews: PreviewProvider {
    static var previews: some View {

================
File: Tests/UITests/TestApp/ViewsTests/CanvasTestView.swift
================
struct CanvasTestView: View {
    @State var isDrawing = false
    @State var didDrawAnything = false
    @State var showToolPicker = false
    @State var drawing = PKDrawing()
    @State var receivedSize: CGSize?
    var body: some View {
struct CanvasTestView_Previews: PreviewProvider {
    static var previews: some View {

================
File: Tests/UITests/TestApp/ViewsTests/CaseIterablePickerTests.swift
================
enum SomeSelection: PickerValue {
    var localizedStringResource: LocalizedStringResource {
struct MyOptionSet: OptionSet, PickerValue {
    static let option1 = MyOptionSet(rawValue: 1 << 0)
    static let option2 = MyOptionSet(rawValue: 1 << 1)
    static let allCases: [MyOptionSet] = [.option1, .option2]
    var rawValue: UInt8
        var components: [String] = []
    init(rawValue: UInt8) {
struct CaseIterablePickerTests: View {
    @State private var selection: SomeSelection?
    @State private var selection2: SomeSelection = .first
    @State private var optionSetMenu: MyOptionSet = []
    var body: some View {

================
File: Tests/UITests/TestApp/ViewsTests/ConditionalModifierTestView.swift
================
struct ConditionalModifierTestView: View {
    @State var condition = false
    @State var closureCondition = false
    var body: some View {

================
File: Tests/UITests/TestApp/ViewsTests/DefaultErrorDescriptionTestView.swift
================
struct DefaultErrorDescriptionTestView: View {
    var body: some View {
struct DefaultErrorDescriptionTestView_Previews: PreviewProvider {
    static var previews: some View {

================
File: Tests/UITests/TestApp/ViewsTests/GeometryReaderTestView.swift
================
struct GeometryReaderTestView: View {
    @State var name = PersonNameComponents()
    var body: some View {
struct GeometryReaderTestView_Previews: PreviewProvider {
    static var previews: some View {

================
File: Tests/UITests/TestApp/ViewsTests/ManagedViewStateTests.swift
================
struct ManagedViewStateTests: View {
    private final class State {
        var state: Int = 0
    private let state = State()
    @ManagedViewUpdate private var viewUpdate
    var body: some View {
    init() {}

================
File: Tests/UITests/TestApp/ViewsTests/MarkdownViewTestView.swift
================
struct MarkdownViewTestView: View {
    @State var viewState: ViewState = .idle
    var body: some View {
struct MarkdownViewTestView_Previews: PreviewProvider {
    static var previews: some View {

================
File: Tests/UITests/TestApp/ViewsTests/OperationStateTestView.swift
================
struct OperationStateTestView: View {
    enum OperationStateTest: OperationState {
        var representation: ViewState {
    struct TestError: LocalizedError {
        var errorDescription: String?
        var failureReason: String?
        var helpAnchor: String?
        var recoverySuggestion: String?
    let testError = TestError(
    @State var operationState: OperationStateTest = .ready
    var body: some View {

================
File: Tests/UITests/TestApp/ViewsTests/SpeziViewsTests.swift
================
enum SpeziViewsTests: String, TestAppTests {
    private var canvas: some View {
    private var geometryReader: some View {
    private var label: some View {
    private var markdownView: some View {
    private var lazyText: some View {
    private var viewState: some View {
    private var operationState: some View {
    private var viewStateMapper: some View {
    private var conditionalModifier: some View {
    private var defaultErrorOnly: some View {
    private var defaultErrorDescription: some View {
    private var button: some View {
    private var listRow: some View {
    func view(withNavigationPath path: Binding<NavigationPath>) -> some View {  // swiftlint:disable:this cyclomatic_complexity

================
File: Tests/UITests/TestApp/ViewsTests/ViewStateMapperView.swift
================
struct ViewStateMapperTestView: View {
    enum OperationStateTest: OperationState {
        var representation: ViewState {
    struct TestError: LocalizedError {
        var errorDescription: String?
        var failureReason: String?
        var helpAnchor: String?
        var recoverySuggestion: String?
    let testError = TestError(
    @State var operationState: OperationStateTest = .ready
    @State var viewState: ViewState = .idle
    var body: some View {

================
File: Tests/UITests/TestApp/ViewsTests/ViewStateTestView.swift
================
struct ViewStateTestView: View {
    struct TestError: LocalizedError {
        var errorDescription: String?
        var failureReason: String?
        var helpAnchor: String?
        var recoverySuggestion: String?
    var testError = TestError(
    @State var viewState: ViewState = .idle
    var defaultErrorDescription
    var body: some View {
struct ViewStateTestView_Previews: PreviewProvider {
    static var previews: some View {

================
File: Tests/UITests/TestApp/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "%@" : {

    },
    "%lf" : {

    },
    "%lld" : {

    },
    "A book by Robert C. Martin" : {

    },
    "Action executed" : {

    },
    "Alignment" : {

    },
    "Buy" : {

    },
    "by Robert C. Martin" : {

    },
    "Canvas Size: none" : {

    },
    "Canvas Size: width %lf, height %lf" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "new",
            "value" : "Canvas Size: width %1$lf, height %2$lf"
          }
        }
      }
    },
    "CanvasTest" : {

    },
    "Center" : {

    },
    "Clean Code" : {

    },
    "Closure Condition present" : {

    },
    "Condition present" : {

    },
    "Cookies" : {

    },
    "Credentials" : {

    },
    "Did Draw Anything: %@" : {

    },
    "Done" : {

    },
    "E-Mail Address" : {

    },
    "Email" : {

    },
    "Enter your details" : {

    },
    "Entity" : {

    },
    "Entity Info" : {

    },
    "Error Description" : {

    },
    "Example Views to take screenshots for SpeziViews" : {

    },
    "Examples" : {

    },
    "Field" : {

    },
    "First" : {

    },
    "First Name" : {

    },
    "Has Engines: %@" : {

    },
    "Hello Throwing World" : {

    },
    "Hello World" : {

    },
    "Increment" : {

    },
    "Inline Picker" : {

    },
    "Input Valid: %@" : {

    },
    "LABEL_TEXT" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "This is a label ...\nAn other text. This is longer and we can check if the justified text works as expected. This is a very long text."
          }
        }
      }
    },
    "Last" : {

    },
    "Last Name" : {

    },
    "Last state: %@" : {

    },
    "LAZY_TEXT" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "An other lazy text ..."
          }
        }
      }
    },
    "Leading" : {

    },
    "Managed View Update" : {

    },
    "Middle" : {

    },
    "Name" : {

    },
    "NameFields" : {

    },
    "Operation State: %@" : {

    },
    "Option Set" : {

    },
    "Password" : {

    },
    "Picker" : {

    },
    "Please enter your email address of your account. A email with an link to reset your password will be sent to the email address." : {

    },
    "Recommendations" : {

    },
    "Refresh" : {

    },
    "Refresh in 2s" : {

    },
    "Reset" : {

    },
    "Reset Password" : {

    },
    "Second" : {

    },
    "Selection" : {

    },
    "Show Tool Picker" : {

    },
    "Signup" : {

    },
    "SkeletonLoading" : {

    },
    "SpeziPersonalInfo" : {

    },
    "SpeziValidation" : {

    },
    "SpeziViews" : {

    },
    "State" : {

    },
    "Switch Focus" : {

    },
    "Targets" : {

    },
    "This field must be selected." : {

    },
    "This is a default error description!" : {

    },
    "This is a label ...\nAn other text. This is longer and we can check if the justified text works as expected. This is a very long text." : {

    },
    "Tiles" : {

    },
    "Toggle Closure Condition" : {

    },
    "Toggle Condition" : {

    },
    "Trailing" : {

    },
    "Username" : {

    },
    "Validate" : {

    },
    "Validation" : {

    },
    "Validation TextField" : {

    },
    "Value" : {

    },
    "View State: %@" : {

    },
    "ViewState" : {

    },
    "Your username is displayed to other users." : {

    }
  },
  "version" : "1.0"
}

================
File: Tests/UITests/TestApp/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/SpeziViewsTargetsTests.swift
================
struct SpeziViewsTargetsTests: View {
    @State var presentingSpeziViews = false
    @State var presentingSpeziPersonalInfo = false
    @State var presentingSpeziValidation = false
    private var idealWidth: CGFloat {
    private var idealHeight: CGFloat {
    var body: some View {

================
File: Tests/UITests/TestApp/TestApp.entitlements.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/TestApp.swift
================
class TestDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
struct UITestsApp: App {
    @ApplicationDelegateAdaptor(TestDelegate.self) private var delegate
    var body: some Scene {

================
File: Tests/UITests/TestAppUITests/SpeziPersonalInfo/PersonalInfoViewsTests.swift
================
final class PersonalInfoViewsTests: XCTestCase {
    override func setUpWithError() throws {
    func testNameFields() throws {
        let app = XCUIApplication()
    func testUserProfile() throws {

================
File: Tests/UITests/TestAppUITests/SpeziValidation/ValidationTests.swift
================
final class ValidationTests: XCTestCase {
    override func setUpWithError() throws {
    func testDefaultRules() {
        let app = XCUIApplication()
    func testValidationWithFocus() throws {
        let passwordMessage = "Your password must be at least 8 characters long."
        let emptyMessage = "This field cannot be empty."
    func testValidationPredicate() throws {

================
File: Tests/UITests/TestAppUITests/SpeziViews/EnvironmentTests.swift
================
final class EnvironmentTests: XCTestCase {
    override func setUpWithError() throws {
    func testDefaultErrorDescription() throws {
        let app = XCUIApplication()
        let alerts = app.sheets
        let alerts = app.alerts

================
File: Tests/UITests/TestAppUITests/SpeziViews/ModelTests.swift
================
final class ModelTests: XCTestCase {
    override func setUpWithError() throws {
    func testViewState() throws {
        let app = XCUIApplication()
        let alerts = app.sheets
        let alerts = app.alerts
    func testOperationState() throws {
        let textField = app.staticTexts["operationState"]
        let content = try XCTUnwrap(XCTUnwrap(textField.value) as? String)
        let content = textField.label
    func testViewStateMapper() throws {
    func testConditionalModifier() throws {
    func testDefaultErrorDescription() throws {

================
File: Tests/UITests/TestAppUITests/SpeziViews/ViewsTests.swift
================
final class ViewsTests: XCTestCase {
    override func setUpWithError() throws {
    func testCanvas() throws {
        let app = XCUIApplication()
        let penView = app.scrollViews.otherElements["Pen, black"]
        let penView = app.buttons["Pen"]
        let canvasView = app.scrollViews.firstMatch
    func testGeometryReader() throws {
    func testLabel() throws {
        let text = "This is a label ... An other text. This is longer and we can check if the justified text works as expected. This is a very long text."
    func testLazyText() throws {
    func testMarkdownView() throws {
    func testButtonsView() throws {
        let alerts = app.sheets
        let alerts = app.alerts
    func testListRowAccessibility() throws {
    func testManagedViewUpdateTests() {
    func testPickers() throws {

================
File: Tests/UITests/TestAppUITests/XCUIApplication+Targets.swift
================
    func open(target: String) {

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
   LastUpgradeVersion = "1600"
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
               BlueprintIdentifier = "SpeziPersonalInfo"
               BuildableName = "SpeziPersonalInfo"
               BlueprintName = "SpeziPersonalInfo"
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
               BlueprintIdentifier = "SpeziViews"
               BuildableName = "SpeziViews"
               BlueprintName = "SpeziViews"
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
               BlueprintIdentifier = "SpeziValidation"
               BuildableName = "SpeziValidation"
               BlueprintName = "SpeziValidation"
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
      <Testables>
         <TestableReference
            skipped = "NO">
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
		2F2D338729DE52EA00081B1D /* SpeziViewsTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F2D338629DE52EA00081B1D /* SpeziViewsTests.swift */; };
		2F6D139A28F5F386007C25D6 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 2F6D139928F5F386007C25D6 /* Assets.xcassets */; };
		2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA7382B290ADFAA007ACEB9 /* TestApp.swift */; };
		2FA9486529DE90720081C086 /* ViewStateTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA9485E29DE90720081C086 /* ViewStateTestView.swift */; };
		2FA9486629DE90720081C086 /* MarkdownViewTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA9485F29DE90720081C086 /* MarkdownViewTestView.swift */; };
		2FA9486729DE90720081C086 /* CanvasTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA9486029DE90720081C086 /* CanvasTestView.swift */; };
		2FA9486929DE90720081C086 /* NameFieldsTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA9486229DE90720081C086 /* NameFieldsTestView.swift */; };
		2FA9486A29DE90720081C086 /* GeometryReaderTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA9486329DE90720081C086 /* GeometryReaderTestView.swift */; };
		2FA9486D29DE91130081C086 /* ViewsTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA9486C29DE91130081C086 /* ViewsTests.swift */; };
		2FA9486F29DE91A30081C086 /* SpeziViews in Frameworks */ = {isa = PBXBuildFile; productRef = 2FA9486E29DE91A30081C086 /* SpeziViews */; };
		2FB099B82A8AD25300B20952 /* Localizable.xcstrings in Resources */ = {isa = PBXBuildFile; fileRef = 2FB099B72A8AD25100B20952 /* Localizable.xcstrings */; };
		561805A02D4B7F4900141D1B /* SkeletonLoadingExample.swift in Sources */ = {isa = PBXBuildFile; fileRef = 5618059F2D4B7F4100141D1B /* SkeletonLoadingExample.swift */; };
		9731B58F2B167053007676C0 /* ViewStateMapperView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 9731B58E2B167053007676C0 /* ViewStateMapperView.swift */; };
		977CF55C2AD2B92C006D9B54 /* XCTestApp in Frameworks */ = {isa = PBXBuildFile; productRef = 977CF55B2AD2B92C006D9B54 /* XCTestApp */; };
		97A0A5102B8D7FD7006102EF /* ConditionalModifierTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 97A0A50F2B8D7FD7006102EF /* ConditionalModifierTestView.swift */; };
		97EE16AC2B16D5AB004D25A3 /* OperationStateTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 97EE16AB2B16D5AB004D25A3 /* OperationStateTestView.swift */; };
		A90575B02CD02E1500B94001 /* TileExample.swift in Sources */ = {isa = PBXBuildFile; fileRef = A90575AF2CD02E1000B94001 /* TileExample.swift */; };
		A90575B42CD03B2E00B94001 /* CaseIterablePickerTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A90575B32CD03B2C00B94001 /* CaseIterablePickerTests.swift */; };
		A91E4DE62C6A1EAE00E0E5A7 /* ValidationPredicateTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A91E4DE52C6A1EAE00E0E5A7 /* ValidationPredicateTests.swift */; };
		A95B6E652AF4298500919504 /* SpeziPersonalInfo in Frameworks */ = {isa = PBXBuildFile; productRef = A95B6E642AF4298500919504 /* SpeziPersonalInfo */; };
		A963ACAC2AF4683A00D745F2 /* SpeziValidationTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A963ACAB2AF4683A00D745F2 /* SpeziValidationTests.swift */; };
		A963ACB02AF4692500D745F2 /* SpeziValidation in Frameworks */ = {isa = PBXBuildFile; productRef = A963ACAF2AF4692500D745F2 /* SpeziValidation */; };
		A963ACB22AF4709400D745F2 /* XCUIApplication+Targets.swift in Sources */ = {isa = PBXBuildFile; fileRef = A963ACB12AF4709400D745F2 /* XCUIApplication+Targets.swift */; };
		A977F6802C93478D0071A1D1 /* ManagedViewStateTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A977F67F2C9347860071A1D1 /* ManagedViewStateTests.swift */; };
		A97880972A4C4E6500150B2F /* ModelTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A97880962A4C4E6500150B2F /* ModelTests.swift */; };
		A97880992A4C524D00150B2F /* DefaultErrorDescriptionTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = A97880982A4C524D00150B2F /* DefaultErrorDescriptionTestView.swift */; };
		A978809B2A4C52F100150B2F /* EnvironmentTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A978809A2A4C52F100150B2F /* EnvironmentTests.swift */; };
		A998A94F2A609A9E0030624D /* ButtonTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = A998A94E2A609A9E0030624D /* ButtonTestView.swift */; };
		A99A65122AF57CA200E63582 /* FocusedValidationTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A99A65112AF57CA200E63582 /* FocusedValidationTests.swift */; };
		A99A65152AF5923800E63582 /* ValidationTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A99A65142AF5923800E63582 /* ValidationTests.swift */; };
		A9A3535B2AF60A9E00661848 /* DefaultValidationRules.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9A3535A2AF60A9E00661848 /* DefaultValidationRules.swift */; };
		A9BA82B42C29FF7C00472FF3 /* Spezi in Frameworks */ = {isa = PBXBuildFile; productRef = A9BA82B32C29FF7C00472FF3 /* Spezi */; };
		A9F85B702B32A041005F16E6 /* ValidationExample.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9F85B6F2B32A041005F16E6 /* ValidationExample.swift */; };
		A9F85B722B32A052005F16E6 /* NameFieldsExample.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9F85B712B32A052005F16E6 /* NameFieldsExample.swift */; };
		A9F85B742B32A05C005F16E6 /* ViewStateExample.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9F85B732B32A05C005F16E6 /* ViewStateExample.swift */; };
		A9F9C4692AF2B9DD001122DD /* XCTestExtensions in Frameworks */ = {isa = PBXBuildFile; productRef = 977CF55D2AD2B92C006D9B54 /* XCTestExtensions */; };
		A9FBAE952AF445B6001E4AF1 /* SpeziViewsTargetsTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9FBAE942AF445B6001E4AF1 /* SpeziViewsTargetsTests.swift */; };
		A9FBAE982AF446F3001E4AF1 /* SpeziPersonalInfoTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9FBAE972AF446F3001E4AF1 /* SpeziPersonalInfoTests.swift */; };
		A9FBAE9C2AF44CCB001E4AF1 /* PersonalInfoViewsTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9FBAE9B2AF44CCB001E4AF1 /* PersonalInfoViewsTests.swift */; };
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
		2F2D338629DE52EA00081B1D /* SpeziViewsTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SpeziViewsTests.swift; sourceTree = "<group>"; };
		2F61BDC129DD023E00D71D33 /* SpeziViews */ = {isa = PBXFileReference; lastKnownFileType = wrapper; name = SpeziViews; path = ../..; sourceTree = "<group>"; };
		2F6D139228F5F384007C25D6 /* TestApp.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = TestApp.app; sourceTree = BUILT_PRODUCTS_DIR; };
		2F6D139928F5F386007C25D6 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		2F6D13AC28F5F386007C25D6 /* TestAppUITests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = TestAppUITests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		2FA7382B290ADFAA007ACEB9 /* TestApp.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TestApp.swift; sourceTree = "<group>"; };
		2FA9485E29DE90720081C086 /* ViewStateTestView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = ViewStateTestView.swift; sourceTree = "<group>"; };
		2FA9485F29DE90720081C086 /* MarkdownViewTestView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = MarkdownViewTestView.swift; sourceTree = "<group>"; };
		2FA9486029DE90720081C086 /* CanvasTestView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = CanvasTestView.swift; sourceTree = "<group>"; };
		2FA9486229DE90720081C086 /* NameFieldsTestView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = NameFieldsTestView.swift; sourceTree = "<group>"; };
		2FA9486329DE90720081C086 /* GeometryReaderTestView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = GeometryReaderTestView.swift; sourceTree = "<group>"; };
		2FA9486C29DE91130081C086 /* ViewsTests.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = ViewsTests.swift; sourceTree = "<group>"; };
		2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */ = {isa = PBXFileReference; lastKnownFileType = text; path = TestApp.xctestplan; sourceTree = "<group>"; };
		2FB099B72A8AD25100B20952 /* Localizable.xcstrings */ = {isa = PBXFileReference; lastKnownFileType = text.json.xcstrings; path = Localizable.xcstrings; sourceTree = "<group>"; };
		5618059F2D4B7F4100141D1B /* SkeletonLoadingExample.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SkeletonLoadingExample.swift; sourceTree = "<group>"; };
		9731B58E2B167053007676C0 /* ViewStateMapperView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ViewStateMapperView.swift; sourceTree = "<group>"; };
		97A0A50F2B8D7FD7006102EF /* ConditionalModifierTestView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ConditionalModifierTestView.swift; sourceTree = "<group>"; };
		97EE16AB2B16D5AB004D25A3 /* OperationStateTestView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OperationStateTestView.swift; sourceTree = "<group>"; };
		A90575AF2CD02E1000B94001 /* TileExample.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TileExample.swift; sourceTree = "<group>"; };
		A90575B32CD03B2C00B94001 /* CaseIterablePickerTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = CaseIterablePickerTests.swift; sourceTree = "<group>"; };
		A91E4DE52C6A1EAE00E0E5A7 /* ValidationPredicateTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ValidationPredicateTests.swift; sourceTree = "<group>"; };
		A963ACAB2AF4683A00D745F2 /* SpeziValidationTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SpeziValidationTests.swift; sourceTree = "<group>"; };
		A963ACB12AF4709400D745F2 /* XCUIApplication+Targets.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = "XCUIApplication+Targets.swift"; sourceTree = "<group>"; };
		A977F67F2C9347860071A1D1 /* ManagedViewStateTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ManagedViewStateTests.swift; sourceTree = "<group>"; };
		A97880962A4C4E6500150B2F /* ModelTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ModelTests.swift; sourceTree = "<group>"; };
		A97880982A4C524D00150B2F /* DefaultErrorDescriptionTestView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = DefaultErrorDescriptionTestView.swift; sourceTree = "<group>"; };
		A978809A2A4C52F100150B2F /* EnvironmentTests.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = EnvironmentTests.swift; sourceTree = "<group>"; };
		A998A94E2A609A9E0030624D /* ButtonTestView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ButtonTestView.swift; sourceTree = "<group>"; };
		A99A65112AF57CA200E63582 /* FocusedValidationTests.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = FocusedValidationTests.swift; sourceTree = "<group>"; };
		A99A65142AF5923800E63582 /* ValidationTests.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = ValidationTests.swift; sourceTree = "<group>"; };
		A9A3535A2AF60A9E00661848 /* DefaultValidationRules.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = DefaultValidationRules.swift; sourceTree = "<group>"; };
		A9F85B6F2B32A041005F16E6 /* ValidationExample.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ValidationExample.swift; sourceTree = "<group>"; };
		A9F85B712B32A052005F16E6 /* NameFieldsExample.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = NameFieldsExample.swift; sourceTree = "<group>"; };
		A9F85B732B32A05C005F16E6 /* ViewStateExample.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ViewStateExample.swift; sourceTree = "<group>"; };
		A9FBAE942AF445B6001E4AF1 /* SpeziViewsTargetsTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SpeziViewsTargetsTests.swift; sourceTree = "<group>"; };
		A9FBAE972AF446F3001E4AF1 /* SpeziPersonalInfoTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = SpeziPersonalInfoTests.swift; sourceTree = "<group>"; };
		A9FBAE9B2AF44CCB001E4AF1 /* PersonalInfoViewsTests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = PersonalInfoViewsTests.swift; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		2F6D138F28F5F384007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2FA9486F29DE91A30081C086 /* SpeziViews in Frameworks */,
				A9BA82B42C29FF7C00472FF3 /* Spezi in Frameworks */,
				A963ACB02AF4692500D745F2 /* SpeziValidation in Frameworks */,
				977CF55C2AD2B92C006D9B54 /* XCTestApp in Frameworks */,
				A95B6E652AF4298500919504 /* SpeziPersonalInfo in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A928F5F386007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				A9F9C4692AF2B9DD001122DD /* XCTestExtensions in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		2F6D138928F5F384007C25D6 = {
			isa = PBXGroup;
			children = (
				2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */,
				2F61BDC129DD023E00D71D33 /* SpeziViews */,
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
				A9FBAE942AF445B6001E4AF1 /* SpeziViewsTargetsTests.swift */,
				2FA7382B290ADFAA007ACEB9 /* TestApp.swift */,
				2F6D139928F5F386007C25D6 /* Assets.xcassets */,
				2FB099B72A8AD25100B20952 /* Localizable.xcstrings */,
				A9F85B6E2B32A028005F16E6 /* Examples */,
				A9FBAE962AF446B2001E4AF1 /* PersonalInfoTests */,
				A963ACAA2AF467F700D745F2 /* ValidationTests */,
				2FA9485D29DE90710081C086 /* ViewsTests */,
			);
			path = TestApp;
			sourceTree = "<group>";
		};
		2F6D13AF28F5F386007C25D6 /* TestAppUITests */ = {
			isa = PBXGroup;
			children = (
				A963ACB12AF4709400D745F2 /* XCUIApplication+Targets.swift */,
				A9FBAE9A2AF44CB1001E4AF1 /* SpeziPersonalInfo */,
				A99A65132AF5920C00E63582 /* SpeziValidation */,
				A9FBAE992AF44CAC001E4AF1 /* SpeziViews */,
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
		2FA9485D29DE90710081C086 /* ViewsTests */ = {
			isa = PBXGroup;
			children = (
				A998A94E2A609A9E0030624D /* ButtonTestView.swift */,
				2FA9486029DE90720081C086 /* CanvasTestView.swift */,
				A90575B32CD03B2C00B94001 /* CaseIterablePickerTests.swift */,
				97A0A50F2B8D7FD7006102EF /* ConditionalModifierTestView.swift */,
				A97880982A4C524D00150B2F /* DefaultErrorDescriptionTestView.swift */,
				2FA9486329DE90720081C086 /* GeometryReaderTestView.swift */,
				A977F67F2C9347860071A1D1 /* ManagedViewStateTests.swift */,
				2FA9485F29DE90720081C086 /* MarkdownViewTestView.swift */,
				97EE16AB2B16D5AB004D25A3 /* OperationStateTestView.swift */,
				2F2D338629DE52EA00081B1D /* SpeziViewsTests.swift */,
				9731B58E2B167053007676C0 /* ViewStateMapperView.swift */,
				2FA9485E29DE90720081C086 /* ViewStateTestView.swift */,
			);
			path = ViewsTests;
			sourceTree = "<group>";
		};
		A963ACAA2AF467F700D745F2 /* ValidationTests */ = {
			isa = PBXGroup;
			children = (
				A99A65112AF57CA200E63582 /* FocusedValidationTests.swift */,
				A963ACAB2AF4683A00D745F2 /* SpeziValidationTests.swift */,
				A91E4DE52C6A1EAE00E0E5A7 /* ValidationPredicateTests.swift */,
				A9A3535A2AF60A9E00661848 /* DefaultValidationRules.swift */,
			);
			path = ValidationTests;
			sourceTree = "<group>";
		};
		A99A65132AF5920C00E63582 /* SpeziValidation */ = {
			isa = PBXGroup;
			children = (
				A99A65142AF5923800E63582 /* ValidationTests.swift */,
			);
			path = SpeziValidation;
			sourceTree = "<group>";
		};
		A9F85B6E2B32A028005F16E6 /* Examples */ = {
			isa = PBXGroup;
			children = (
				A90575AF2CD02E1000B94001 /* TileExample.swift */,
				A9F85B6F2B32A041005F16E6 /* ValidationExample.swift */,
				A9F85B712B32A052005F16E6 /* NameFieldsExample.swift */,
				A9F85B732B32A05C005F16E6 /* ViewStateExample.swift */,
				5618059F2D4B7F4100141D1B /* SkeletonLoadingExample.swift */,
			);
			path = Examples;
			sourceTree = "<group>";
		};
		A9FBAE962AF446B2001E4AF1 /* PersonalInfoTests */ = {
			isa = PBXGroup;
			children = (
				A9FBAE972AF446F3001E4AF1 /* SpeziPersonalInfoTests.swift */,
				2FA9486229DE90720081C086 /* NameFieldsTestView.swift */,
			);
			path = PersonalInfoTests;
			sourceTree = "<group>";
		};
		A9FBAE992AF44CAC001E4AF1 /* SpeziViews */ = {
			isa = PBXGroup;
			children = (
				2FA9486C29DE91130081C086 /* ViewsTests.swift */,
				A97880962A4C4E6500150B2F /* ModelTests.swift */,
				A978809A2A4C52F100150B2F /* EnvironmentTests.swift */,
			);
			path = SpeziViews;
			sourceTree = "<group>";
		};
		A9FBAE9A2AF44CB1001E4AF1 /* SpeziPersonalInfo */ = {
			isa = PBXGroup;
			children = (
				A9FBAE9B2AF44CCB001E4AF1 /* PersonalInfoViewsTests.swift */,
			);
			path = SpeziPersonalInfo;
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
				2FA9486E29DE91A30081C086 /* SpeziViews */,
				977CF55B2AD2B92C006D9B54 /* XCTestApp */,
				A95B6E642AF4298500919504 /* SpeziPersonalInfo */,
				A963ACAF2AF4692500D745F2 /* SpeziValidation */,
				A9BA82B32C29FF7C00472FF3 /* Spezi */,
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
				977CF55D2AD2B92C006D9B54 /* XCTestExtensions */,
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
				LastUpgradeCheck = 1600;
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
				977CF55A2AD2B92C006D9B54 /* XCRemoteSwiftPackageReference "XCTestExtensions" */,
				A9BA82B22C29FF7C00472FF3 /* XCRemoteSwiftPackageReference "Spezi" */,
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
				2FB099B82A8AD25300B20952 /* Localizable.xcstrings in Resources */,
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
				A977F6802C93478D0071A1D1 /* ManagedViewStateTests.swift in Sources */,
				2FA9486529DE90720081C086 /* ViewStateTestView.swift in Sources */,
				A9FBAE952AF445B6001E4AF1 /* SpeziViewsTargetsTests.swift in Sources */,
				561805A02D4B7F4900141D1B /* SkeletonLoadingExample.swift in Sources */,
				2FA9486929DE90720081C086 /* NameFieldsTestView.swift in Sources */,
				A99A65122AF57CA200E63582 /* FocusedValidationTests.swift in Sources */,
				A90575B42CD03B2E00B94001 /* CaseIterablePickerTests.swift in Sources */,
				97EE16AC2B16D5AB004D25A3 /* OperationStateTestView.swift in Sources */,
				9731B58F2B167053007676C0 /* ViewStateMapperView.swift in Sources */,
				A9F85B742B32A05C005F16E6 /* ViewStateExample.swift in Sources */,
				A998A94F2A609A9E0030624D /* ButtonTestView.swift in Sources */,
				2FA9486A29DE90720081C086 /* GeometryReaderTestView.swift in Sources */,
				A9F85B722B32A052005F16E6 /* NameFieldsExample.swift in Sources */,
				2FA9486729DE90720081C086 /* CanvasTestView.swift in Sources */,
				97A0A5102B8D7FD7006102EF /* ConditionalModifierTestView.swift in Sources */,
				A91E4DE62C6A1EAE00E0E5A7 /* ValidationPredicateTests.swift in Sources */,
				A963ACAC2AF4683A00D745F2 /* SpeziValidationTests.swift in Sources */,
				A9FBAE982AF446F3001E4AF1 /* SpeziPersonalInfoTests.swift in Sources */,
				A90575B02CD02E1500B94001 /* TileExample.swift in Sources */,
				2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */,
				2FA9486629DE90720081C086 /* MarkdownViewTestView.swift in Sources */,
				A97880992A4C524D00150B2F /* DefaultErrorDescriptionTestView.swift in Sources */,
				A9A3535B2AF60A9E00661848 /* DefaultValidationRules.swift in Sources */,
				2F2D338729DE52EA00081B1D /* SpeziViewsTests.swift in Sources */,
				A9F85B702B32A041005F16E6 /* ValidationExample.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A828F5F386007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				A9FBAE9C2AF44CCB001E4AF1 /* PersonalInfoViewsTests.swift in Sources */,
				2FA9486D29DE91130081C086 /* ViewsTests.swift in Sources */,
				A963ACB22AF4709400D745F2 /* XCUIApplication+Targets.swift in Sources */,
				A97880972A4C4E6500150B2F /* ModelTests.swift in Sources */,
				A99A65152AF5923800E63582 /* ValidationTests.swift in Sources */,
				A978809B2A4C52F100150B2F /* EnvironmentTests.swift in Sources */,
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
				TVOS_DEPLOYMENT_TARGET = 17.0;
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
				MTL_ENABLE_DEBUG_INFO = NO;
				MTL_FAST_MATH = YES;
				SDKROOT = iphoneos;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_OPTIMIZATION_LEVEL = "-O";
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
				TVOS_DEPLOYMENT_TARGET = 17.0;
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.views.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "appletvos appletvsimulator iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
				TARGETED_DEVICE_FAMILY = "1,2,3,7";
			};
			name = Debug;
		};
		2F6D13B828F5F386007C25D6 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.views.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "appletvos appletvsimulator iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
				TARGETED_DEVICE_FAMILY = "1,2,3,7";
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
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.views.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_VERSION = 6.0;
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.views.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_VERSION = 6.0;
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
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = TEST;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
				TVOS_DEPLOYMENT_TARGET = 17.0;
				XROS_DEPLOYMENT_TARGET = 1.0;
			};
			name = Test;
		};
		2FB07588299DDB6000C0B37F /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.views.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "appletvos appletvsimulator iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 6.0;
				TARGETED_DEVICE_FAMILY = "1,2,3,7";
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.views.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_VERSION = 6.0;
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
		977CF55A2AD2B92C006D9B54 /* XCRemoteSwiftPackageReference "XCTestExtensions" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTestExtensions";
			requirement = {
				kind = upToNextMinorVersion;
				minimumVersion = 1.1.0;
			};
		};
		A9BA82B22C29FF7C00472FF3 /* XCRemoteSwiftPackageReference "Spezi" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/Spezi.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.8.0;
			};
		};
/* End XCRemoteSwiftPackageReference section */

/* Begin XCSwiftPackageProductDependency section */
		2FA9486E29DE91A30081C086 /* SpeziViews */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziViews;
		};
		977CF55B2AD2B92C006D9B54 /* XCTestApp */ = {
			isa = XCSwiftPackageProductDependency;
			package = 977CF55A2AD2B92C006D9B54 /* XCRemoteSwiftPackageReference "XCTestExtensions" */;
			productName = XCTestApp;
		};
		977CF55D2AD2B92C006D9B54 /* XCTestExtensions */ = {
			isa = XCSwiftPackageProductDependency;
			package = 977CF55A2AD2B92C006D9B54 /* XCRemoteSwiftPackageReference "XCTestExtensions" */;
			productName = XCTestExtensions;
		};
		A95B6E642AF4298500919504 /* SpeziPersonalInfo */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziPersonalInfo;
		};
		A963ACAF2AF4692500D745F2 /* SpeziValidation */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziValidation;
		};
		A9BA82B32C29FF7C00472FF3 /* Spezi */ = {
			isa = XCSwiftPackageProductDependency;
			package = A9BA82B22C29FF7C00472FF3 /* XCRemoteSwiftPackageReference "Spezi" */;
			productName = Spezi;
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
        - SpeziViews
        - SpeziPersonalInfo
        - SpeziValidation

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
- family-names: "Bauer"
  given-names: "Andreas"
  orcid: "https://orcid.org/0000-0002-1680-237X"
- family-names: "Zagar"
  given-names: "Philipp"
  orcid: "https://orcid.org/0009-0001-5934-2078"
title: "SpeziViews"
doi: 10.5281/zenodo.7806475
url: "https://github.com/StanfordSpezi/SpeziViews"

================
File: CONTRIBUTORS.md
================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

SpeziViews contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Vishnu Ravi](https://github.com/vishnuravi)
* [Andreas Bauer](https://github.com/Supereg)
* [Philipp Zagar](https://github.com/philippzagar)
* [Nikolai Madlener](https://github.com/nikolaimadlener)

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

# Spezi Views

[![Build and Test](https://github.com/StanfordSpezi/SpeziViews/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziViews/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziViews/branch/main/graph/badge.svg?token=tLnPSYE6W9)](https://codecov.io/gh/StanfordSpezi/SpeziViews)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7806475.svg)](https://doi.org/10.5281/zenodo.7806475)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziViews%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziViews)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziViews%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziViews)

A Spezi framework that provides a common set of SwiftUI views and related functionality used across the Spezi ecosystem.

## Overview

SpeziViews provides easy-to-use and easily-reusable UI components that makes the everyday life of developing Spezi applications easier.

For more information, please refer to the [API documentation](https://swiftpackageindex.com/StanfordSpezi/SpeziViews/documentation).

|![A SwiftUI alert displayed using the SpeziViews ViewState.](Sources/SpeziViews/SpeziViews.docc/Resources/ViewState.png#gh-light-mode-only) ![A SwiftUI alert displayed using the SpeziViews ViewState.](Sources/SpeziViews/SpeziViews.docc/Resources/ViewState~dark.png#gh-dark-mode-only)|![Three text fields to input your first, middle and last name.](Sources/SpeziPersonalInfo/SpeziPersonalInfo.docc/Resources/NameFields.png#gh-light-mode-only) ![Three text fields to input your first, middle and last name.](Sources/SpeziPersonalInfo/SpeziPersonalInfo.docc/Resources/NameFields~dark.png#gh-dark-mode-only)| ![Three different kinds of text fields showing validation errors in red text.](Sources/SpeziValidation/SpeziValidation.docc/Resources/Validation.png#gh-light-mode-only) ![Three different kinds of text fields showing validation errors in red text.](Sources/SpeziValidation/SpeziValidation.docc/Resources/Validation~dark.png#gh-dark-mode-only) |
|:--:|:--:|:--:|
|Easily manage view state and display erroneous state using [`ViewState`](https://swiftpackageindex.com/stanfordspezi/speziviews/documentation/speziviews/viewstate). |The [SpeziPersonalInfo](https://swiftpackageindex.com/StanfordSpezi/SpeziViews/documentation/spezipersonalinfo) provides easy to use abstractions for dealing with personal information. |Perform and visualize input validation with ease using [SpeziValidation](https://swiftpackageindex.com/StanfordSpezi/SpeziViews/documentation/spezivalidation).|

## Setup

You need to add the Spezi Account Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> [!IMPORTANT]  
> If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.

## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziViews/tree/main/LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/Footer.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/Footer~dark.png#gh-dark-mode-only)



================================================================
End of Codebase
================================================================
