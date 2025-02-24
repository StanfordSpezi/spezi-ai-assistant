This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.

================================================================
Directory Structure
================================================================
.github/
  workflows/
    build-and-test.yml
    monthly-markdown-link-check.yml
    pull_request.yml
.reuse/
  dep5
LICENSES/
  MIT.txt
Sources/
  SpeziOnboarding/
    Consent/
      Export/
        ConsentDocument+Export.swift
        ConsentDocumentExportRepresentation.swift
        ConsentDocumentExportRepresentation+Configuration.swift
        ConsentDocumentExportRepresentation+Defaults.swift
        ConsentDocumentExportRepresentation+Render.swift
      Views/
        ConsentDocument.swift
        ConsentDocument+LocalizationDefaults.swift
        OnboardingConsentView+Error.swift
        OnboardingConsentView+ShareSheet.swift
        SignatureView.swift
        SignatureViewBackground.swift
      ConsentViewState.swift
      ConsentViewState+Binding.swift
    OnboardingFlow/
      IllegalOnboardingStepView.swift
      NavigationPath+Codable.swift
      OnboardingFlowViewCollection.swift
      OnboardingIdentifiableViewModifier.swift
      OnboardingNavigationPath.swift
      OnboardingStack.swift
      OnboardingStepIdentifier.swift
      OnboardingViewBuilder.swift
    Resources/
      Localizable.xcstrings
      Localizable.xcstrings.license
    SpeziOnboarding.docc/
      DisplayingInformation.md
      ObtainingUserConsent.md
      SpeziOnboarding.md
    OnboardingActionsView.swift
    OnboardingConsentView.swift
    OnboardingInformationView.swift
    OnboardingTitleView.swift
    OnboardingView.swift
    SequentialOnboardingView.swift
Tests/
  SpeziOnboardingTests/
    Resources/
      markdown_data_one_page.md
      markdown_data_two_pages.md
    .gitattributes
    SpeziOnboardingTests.swift
    SpeziOnboardingTests+PDFEquatable.swift
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
      Views/
        Consent/
          ConsentDocumentIdentifiers.swift
          OnboardingConsentFinishedRenderedView.swift
          OnboardingConsentTestView.swift
        Helpers/
          CustomToggleView.swift
          OnboardingFlow+PreviewSimulator.swift
        OnboardingFlow/
          OnboardingConditionalTestView.swift
          OnboardingCustomTestView1.swift
          OnboardingCustomTestView2.swift
          OnboardingCustomToggleTestView.swift
          OnboardingIdentifiableTestViewCustom.swift
          OnboardingTestViewNotIdentifiable.swift
        OnboardingSequentialTestView.swift
        OnboardingStartTestView.swift
        OnboardingWelcomeTestView.swift
      ExampleStandard.swift
      OnboardingTestsView.swift
      TestApp.swift
      TestAppDelegate.swift
    TestAppUITests/
      SpeziOnboardingTests.swift
      XCUIApplication+Onboarding.swift
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
.gitattributes
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

concurrency:
  group: Build-and-Test-${{ github.ref }}
  cancel-in-progress: true

jobs:
  buildandtest_ios:
    name: Build and Test Swift Package iOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    strategy:
      matrix:
        include:
          - buildConfig: Debug
            artifactname: SpeziOnboarding-iOS.xcresult
            resultBundle: SpeziOnboarding-iOS.xcresult
          - buildConfig: Release
            artifactname: SpeziOnboarding-iOS-Release.xcresult
            resultBundle: SpeziOnboarding-iOS-Release.xcresult
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      checkout_lfs: true
      scheme: SpeziOnboarding
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
            artifactname: SpeziOnboarding-visionOS.xcresult
            resultBundle: SpeziOnboarding-visionOS.xcresult
          - buildConfig: Release
            artifactname: SpeziOnboarding-visionOS-Release.xcresult
            resultBundle: SpeziOnboarding-visionOS-Release.xcresult
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      checkout_lfs: true
      scheme: SpeziOnboarding
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
            artifactname: SpeziOnboarding-macOS.xcresult
            resultBundle: SpeziOnboarding-macOS.xcresult
          - buildConfig: Release
            artifactname: SpeziOnboarding-macOS-Release.xcresult
            resultBundle: SpeziOnboarding-macOS-Release.xcresult
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      checkout_lfs: true
      scheme: SpeziOnboarding
      destination: 'platform=macOS,arch=arm64'
      buildConfig: ${{ matrix.buildConfig }}
      resultBundle: ${{ matrix.resultBundle }}
      artifactname: ${{ matrix.artifactname }}
  buildandtestuitests_ios:
    name: Build and Test UI Tests iOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      checkout_lfs: true
      path: 'Tests/UITests'
      scheme: TestApp
      resultBundle: TestApp-iOS.xcresult
      artifactname: TestApp-iOS.xcresult
  buildandtestuitests_ipad:
    name: Build and Test UI Tests iPadOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      checkout_lfs: true
      path: 'Tests/UITests'
      scheme: TestApp
      destination: 'platform=iOS Simulator,name=iPad Pro 11-inch (M4)'
      resultBundle: TestApp-iPadOS.xcresult
      artifactname: TestApp-iPadOS.xcresult
  buildandtestuitests_visionos:
    name: Build and Test UI Tests visionOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      checkout_lfs: true
      path: 'Tests/UITests'
      scheme: TestApp
      destination: 'platform=visionOS Simulator,name=Apple Vision Pro'
      resultBundle: TestApp-visionOS.xcresult
      artifactname: TestApp-visionOS.xcresult
  uploadcoveragereport:
    name: Upload Coverage Report
    needs: [buildandtest_ios, buildandtest_visionos, buildandtest_macos, buildandtestuitests_ios, buildandtestuitests_ipad, buildandtestuitests_visionos]
    uses: StanfordSpezi/.github/.github/workflows/create-and-upload-coverage-report.yml@v2
    with:
      coveragereports: 'SpeziOnboarding-iOS.xcresult SpeziOnboarding-visionOS.xcresult SpeziOnboarding-macOS.xcresult TestApp-iOS.xcresult TestApp-iPadOS.xcresult TestApp-visionOS.xcresult'
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

concurrency:
  group: Pull-Request-${{ github.ref }}
  cancel-in-progress: true

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

Files: Tests/SpeziOnboardingTests/Resources/*.pdf
Copyright: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
License: MIT

Files: Tests/SpeziOnboardingTests/Resources/*.md
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
File: Sources/SpeziOnboarding/Consent/Export/ConsentDocument+Export.swift
================
    var exportRepresentation: ConsentDocumentExportRepresentation {
    private var signatureImage: UIImage {
        let scale = UIScreen.main.scale
        let scale = 3.0 // retina scale is default

================
File: Sources/SpeziOnboarding/Consent/Export/ConsentDocumentExportRepresentation.swift
================
public struct ConsentDocumentExportRepresentation: Equatable {
    let configuration: Configuration
    let markdown: Data
    let signature: UIImage
    let signature: String
    let name: PersonNameComponents
    let formattedSignatureDate: String?
    init(

================
File: Sources/SpeziOnboarding/Consent/Export/ConsentDocumentExportRepresentation+Configuration.swift
================
    public struct Configuration: Equatable, Sendable {
        public enum PaperSize: Equatable, Sendable {
            var dimensions: (width: CGFloat, height: CGFloat) {
                let pointsPerInch: CGFloat = 72.0
                    let widthInInches: CGFloat = 8.5
                    let heightInInches: CGFloat = 11.0
                    let widthInInches: CGFloat = 8.3
                    let heightInInches: CGFloat = 11.7
            var pdfPageFormat: PDFPageFormat {
        public struct FontSettings: Equatable, Sendable {
            public let signatureCaptionFont: UIFont
            public let signaturePrefixFont: UIFont
            public let documentContentFont: UIFont
            public let headerTitleFont: UIFont
            public let headerExportTimeStampFont: UIFont
            public init(
        public struct FontSettings: Equatable, @unchecked Sendable {
            public let signatureCaptionFont: NSFont
            public let signaturePrefixFont: NSFont
            public let documentContentFont: NSFont
            public let headerTitleFont: NSFont
            public let headerExportTimeStampFont: NSFont
        let consentTitle: LocalizedStringResource
        let paperSize: PaperSize
        let includingTimestamp: Bool
        let fontSettings: FontSettings

================
File: Sources/SpeziOnboarding/Consent/Export/ConsentDocumentExportRepresentation+Defaults.swift
================
    public enum Defaults {
        public static let exportedConsentFormTitle = LocalizedStringResource("CONSENT_TITLE", bundle: .atURL(from: .module))
        public static let defaultExportFontSettings = FontSettings(
        public static let defaultSystemDefaultFontSettings = FontSettings(

================
File: Sources/SpeziOnboarding/Consent/Export/ConsentDocumentExportRepresentation+Render.swift
================
    private var renderedTimeStamp: PDFAttributedText? {
        let stampText = String(localized: "EXPORTED_TAG", bundle: .module) + ": " +
        let attributedTitle = NSMutableAttributedString(
    private var renderedHeader: PDFAttributedText {
    private var renderedDocumentContent: PDFAttributedText {
        var markdownString = (try? AttributedString(
    private var renderedSignature: PDFGroup {
        let personName = name.formatted(.name(style: .long))
        let group = PDFGroup(
        let signaturePrefix = "X"
        let signaturePrefix = "X " + signature
        let table = PDFTable(rows: 1, columns: 2)
        let cellStyle = PDFTableCellStyle(
    public func render() throws -> PDFKit.PDFDocument {
        let document = TPPDF.PDFDocument(format: configuration.paperSize.pdfPageFormat)
        let pdfData = try PDFGenerator(document: document).generateData()

================
File: Sources/SpeziOnboarding/Consent/Views/ConsentDocument.swift
================
public struct ConsentDocument: View {
    static let maxWidthDrawing: CGFloat = 550
    private let givenNameTitle: LocalizedStringResource
    private let givenNamePlaceholder: LocalizedStringResource
    private let familyNameTitle: LocalizedStringResource
    private let familyNamePlaceholder: LocalizedStringResource
    private let consentSignatureDate: Date?
    private let consentSignatureDateFormatter: DateFormatter
    let markdown: () async -> Data
    let exportConfiguration: ConsentDocumentExportRepresentation.Configuration
    @Environment(\.colorScheme) var colorScheme
    @State var name = PersonNameComponents()
    @State var signature = PKDrawing()
    @State var signature = String()
    @State var signatureSize: CGSize = .zero
    @Binding private var viewState: ConsentViewState
    private var nameView: some View {
    private var nameInputView: some View {
    private var signatureView: some View {
                let isSignatureEmpty = signature.strokes.isEmpty
                let isSignatureEmpty = signature.isEmpty
    public var body: some View {
    private var inputFieldsDisabled: Bool {
    var formattedConsentSignatureDate: String? {
    public init(
            let formatter = DateFormatter()
    @Previewable @State var viewState: ConsentViewState = .base(.idle)

================
File: Sources/SpeziOnboarding/Consent/Views/ConsentDocument+LocalizationDefaults.swift
================
    public enum LocalizationDefaults {
        public static let givenNameTitle = LocalizedStringResource("NAME_FIELD_GIVEN_NAME_TITLE", bundle: .atURL(from: .module))
        public static let givenNamePlaceholder = LocalizedStringResource("NAME_FIELD_GIVEN_NAME_PLACEHOLDER", bundle: .atURL(from: .module))
        public static let familyNameTitle = LocalizedStringResource("NAME_FIELD_FAMILY_NAME_TITLE", bundle: .atURL(from: .module))
        public static let familyNamePlaceholder = LocalizedStringResource("NAME_FIELD_FAMILY_NAME_PLACEHOLDER", bundle: .atURL(from: .module))

================
File: Sources/SpeziOnboarding/Consent/Views/OnboardingConsentView+Error.swift
================
    enum Error: LocalizedError {
        var errorDescription: String? {
        var recoverySuggestion: String? {
        var failureReason: String? {

================
File: Sources/SpeziOnboarding/Consent/Views/OnboardingConsentView+ShareSheet.swift
================
    struct ShareSheet: UIViewControllerRepresentable {
        let sharedItem: PDFDocument
        func makeUIViewController(context: Context) -> UIActivityViewController {
            let temporaryPath = FileManager.default.temporaryDirectory.appendingPathComponent(
            let controller = UIActivityViewController(
        func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
    struct ShareSheet {
        func show() {
            let sharingServicePicker = NSSharingServicePicker(items: [temporaryPath])

================
File: Sources/SpeziOnboarding/Consent/Views/SignatureView.swift
================
public struct SignatureView: View {
    @Environment(\.undoManager) private var undoManager
    @Binding private var signature: PKDrawing
    @Binding private var canvasSize: CGSize
    @Binding private var isSigning: Bool
    @State private var canUndo = false
    @Binding private var signature: String
    private let name: PersonNameComponents
    private let formattedDate: String?
    private let lineOffset: CGFloat
    public var body: some View {
    private var signatureTextField: some View {
    public init(

================
File: Sources/SpeziOnboarding/Consent/Views/SignatureViewBackground.swift
================
struct SignatureViewBackground: View {
    private let name: PersonNameComponents
    private let formattedDate: String?
    private let lineOffset: CGFloat
    private let backgroundColor: UIColor
    private let backgroundColor: NSColor
    var body: some View {
            let name = name.formatted(.name(style: .long))
    init(
    let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()

================
File: Sources/SpeziOnboarding/Consent/ConsentViewState.swift
================
public enum ConsentViewState: Equatable {

================
File: Sources/SpeziOnboarding/Consent/ConsentViewState+Binding.swift
================
    @MainActor var base: Binding<SpeziViews.ViewState> {
    @MainActor var signing: Binding<Bool> {

================
File: Sources/SpeziOnboarding/OnboardingFlow/IllegalOnboardingStepView.swift
================
struct IllegalOnboardingStepView: View {
    var body: some View {

================
File: Sources/SpeziOnboarding/OnboardingFlow/NavigationPath+Codable.swift
================
    private struct _LastOnboardingStepDecoder: Decodable {
        var value: OnboardingStepIdentifier
        init(from decoder: any Decoder) throws {
            var container = try decoder.unkeyedContainer()
            let encodedValue = try container.decode(String.self)
    private static let encoder = JSONEncoder()
    private static let decoder = JSONDecoder()
    var last: OnboardingStepIdentifier? {
    func last(where predicate: (OnboardingStepIdentifier) -> Bool) -> OnboardingStepIdentifier? {
        var copyPath = self

================
File: Sources/SpeziOnboarding/OnboardingFlow/OnboardingFlowViewCollection.swift
================
public class _OnboardingFlowViewCollection {  // swiftlint:disable:this type_name
    let views: [any View]
    init(views: [any View]) {

================
File: Sources/SpeziOnboarding/OnboardingFlow/OnboardingIdentifiableViewModifier.swift
================
protocol OnboardingIdentifiable {
public struct _OnboardingIdentifiableViewModifier<ID>: ViewModifier, OnboardingIdentifiable where ID: Hashable {
    let id: ID
    public func body(content: Content) -> some View {
    public func onboardingIdentifier<ID: Hashable>(_ identifier: ID) -> ModifiedContent<Self, _OnboardingIdentifiableViewModifier<ID>> {
    var id: Modifier.ID {

================
File: Sources/SpeziOnboarding/OnboardingFlow/OnboardingNavigationPath.swift
================
public class OnboardingNavigationPath {
    var path = NavigationPath()
    private let complete: Binding<Bool>?
    private var onboardingSteps: OrderedDictionary<OnboardingStepIdentifier, any View> = [:]
    private var customOnboardingSteps: [OnboardingStepIdentifier: any View] = [:]
    internal var firstOnboardingStepIdentifier: OnboardingStepIdentifier? {
    var firstOnboardingView: AnyView {
    private var currentOnboardingStep: OnboardingStepIdentifier? {
    init(views: [any View], complete: Binding<Bool>?, startAtStep: (any View.Type)?) {
    public func nextStep() {
    public func append(_ onboardingStepType: any View.Type) {
        let onboardingStepIdentifier = OnboardingStepIdentifier(
    public func append(customView: any View) {
        let customOnboardingStepIdentifier = OnboardingStepIdentifier(
    public func removeLast() {
    func updateViews(with views: [any View]) {
        let currentStepIndex = if let currentOnboardingStep {
        let nextStepIndex = currentStepIndex + 1
            let onboardingStepIdentifier = OnboardingStepIdentifier(view: view)
            let stepIsAfterCurrentStep = !self.onboardingSteps.keys.contains(onboardingStepIdentifier)
    func navigate(to onboardingStep: OnboardingStepIdentifier) -> AnyView {
    private func appendToInternalNavigationPath(of onboardingStepIdentifier: OnboardingStepIdentifier) {
    private func onboardingComplete() {

================
File: Sources/SpeziOnboarding/OnboardingFlow/OnboardingStack.swift
================
public struct OnboardingStack: View {
    @State var onboardingNavigationPath: OnboardingNavigationPath
    private let collection: _OnboardingFlowViewCollection
    public var body: some View {
    public init(
        let onboardingFlowViewCollection = content()

================
File: Sources/SpeziOnboarding/OnboardingFlow/OnboardingStepIdentifier.swift
================
struct OnboardingStepIdentifier: Hashable, Codable {
    let custom: Bool
    let identifierHash: Int
    init<V: View>(view: V, custom: Bool = false) {
        var hasher = Hasher()
            let id = identifiable.id
    init(onboardingStepType: any View.Type, custom: Bool = false) {

================
File: Sources/SpeziOnboarding/OnboardingFlow/OnboardingViewBuilder.swift
================
public enum OnboardingViewBuilder {
    public static func buildExpression<V: View>(_ expression: V) -> [any View] {
    public static func buildBlock(_ children: [any View]...) -> [any View] {
    public static func buildOptional(_ component: [any View]?) -> [any View] {
    public static func buildEither(first: [any View]) -> [any View] {
    public static func buildEither(second: [any View]) -> [any View] {
    public static func buildArray(_ components: [[any View]]) -> [any View] {
    public static func buildLimitedAvailability(_ component: [any View]) -> [any View] {
    public static func buildFinalResult(_ component: [any View]) -> _OnboardingFlowViewCollection {

================
File: Sources/SpeziOnboarding/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "Consent document could not be exported." : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Einwilligung konnte nicht exportiert werden."
          }
        }
      }
    },
    "CONSENT_ACTION" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ich Stimme Zu"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "I Consent"
          }
        }
      }
    },
    "CONSENT_SHARE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Teile die Einwilligung"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Share consent form"
          }
        }
      }
    },
    "CONSENT_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Spezi Einwilligung"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Spezi Consent"
          }
        }
      }
    },
    "CONSENT_VIEW_TITLE" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Einwilligung"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Consent"
          }
        }
      }
    },
    "EXPORTED_TAG" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Exportiert"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Exported"
          }
        }
      }
    },
    "FILE_NAME_EXPORTED_CONSENT_FORM" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unterschriebe Einwilligung"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Signed Consent Form"
          }
        }
      }
    },
    "ILLEGAL_ONBOARDING_STEP" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "SpeziOnboarding: Unerlaubter Schritt während des Onboardings"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "SpeziOnboarding: Illegal Onboarding Step"
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
    "NAME_FIELD_FAMILY_NAME_PLACEHOLDER" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Gib deinen Nachnamen ein ..."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Enter your last name ..."
          }
        }
      }
    },
    "NAME_FIELD_FAMILY_NAME_TITLE" : {
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
            "value" : "Last Name"
          }
        }
      }
    },
    "NAME_FIELD_GIVEN_NAME_PLACEHOLDER" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Gib deinen Vornamen ein ..."
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Enter your first name ..."
          }
        }
      }
    },
    "NAME_FIELD_GIVEN_NAME_TITLE" : {
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
            "value" : "First Name"
          }
        }
      }
    },
    "Please try exporting the consent document again." : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Bitte versucht das Dokument erneut zu exportieren."
          }
        }
      }
    },
    "SEQUENTIAL_ONBOARDING_NEXT" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Nächster Schritt"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Next"
          }
        }
      }
    },
    "SIGNATURE_DATE %@" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unterschrift Datum %@"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Signature date %@"
          }
        }
      }
    },
    "SIGNATURE_FIELD" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Unterschrift Feld"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Signature Field"
          }
        }
      }
    },
    "SIGNATURE_NAME %@" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Name: %@"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Name: %@"
          }
        }
      }
    },
    "SIGNATURE_VIEW_UNDO" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Rückgängig Machen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Undo"
          }
        }
      }
    },
    "The PDF generation from the consent document failed. " : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Der PDF export des Einwilligungsdokuments ist fehlgeschlagen."
          }
        }
      }
    }
  },
  "version" : "1.0"
}

================
File: Sources/SpeziOnboarding/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Sources/SpeziOnboarding/SpeziOnboarding.docc/DisplayingInformation.md
================
# Displaying Information

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Display information to your user during an onboarding flow.

## OnboardingView

The <doc:OnboardingView> allows you to separate information into areas on a screen, each with a title, description, and icon.

@Image(source: "OnboardingView.png")

The following example demonstrates how the above view is constructed:

```swift
OnboardingView(
    title: "Welcome",
    subtitle: "Spezi UI Tests",
    areas: [
        .init(
            icon: Image(systemName: "tortoise.fill"), 
            title: "Tortoise", 
            description: "A Tortoise!"
        ),
        .init(
            icon: Image(systemName: "lizard.fill"), 
            title: "Lizard", 
            description: "A Lizard!"
        ),
        .init(
            icon: Image(systemName: "tree.fill"), 
            title: "Tree", 
            description: "A Tree!"
        )
    ],
    actionText: "Learn More",
    action: {
        // Action to perform when the user taps the action button.
    }
)
```

## SequentialOnboardingView

The <doc:SequentialOnboardingView> allows you to display information step-by-step, with each additional area appearing when the user taps the `Continue` button.

@Image(source: "SequentialOnboardingView.png")

The following example demonstrates how the above view is constructed:

```swift
SequentialOnboardingView(
    title: "Things to know",
    subtitle: "And you should pay close attention ...",
    content: [
        .init(
            title: "A thing to know", 
            description: "This is a first thing that you should know; read carefully!"
        ),
        .init(
            title: "Second thing to know", 
            description: "This is a second thing that you should know; read carefully!"
        ),
        .init(
            title: "Third thing to know", 
            description: "This is a third thing that you should know; read carefully!"
        )
    ],
    actionText: "Continue"
) {
    // Action to perform when the user has viewed all the steps
}
```

## Topics

### Views

- <doc:OnboardingView>
- <doc:SequentialOnboardingView>

================
File: Sources/SpeziOnboarding/SpeziOnboarding.docc/ObtainingUserConsent.md
================
# Obtaining User Consent

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Present your user a consent document to read and sign.

### Obtaining User Consent

The ``OnboardingConsentView`` can allow users to read and agree to a document, e.g., a consent document for a research study or a terms and conditions document for an app. The document can be signed using a family and given name and a hand-drawn signature. 

@Image(source: "ConsentView.png")

The following example demonstrates how the ``OnboardingConsentView`` shown above is constructed by providing a header, markdown content encoded as a [UTF8](https://www.swift.org/blog/utf8-string/) [`Data`](https://developer.apple.com/documentation/foundation/data) instance (which may be provided asynchronously), an action that should be performed once the consent has been given (which receives the exported consent form as a PDF), as well as a configuration defining the properties of the exported consent form.

```swift
OnboardingConsentView(
    markdown: {
        Data("This is a *markdown* **example**".utf8)
    },
    action: { exportedConsentPdf in
        // Action to perform once the user has given their consent.
        // Closure receives the exported consent PDF to persist or upload it.
    },
    title: "Consent",   // Configure the title of the consent view
    exportConfiguration: .init(paperSize: .usLetter),   // Configure the properties of the exported consent form.
    currentDateInSignature: true   // Indicates if the consent signature should include the current date.
)
```

### Using multiple consent forms

If you want to show multiple consent documents to the user, that need to be signed separately, you can add multiple instances of ``OnboardingConsentView``.
If used within the ``OnboardingStack``, it is important to specify a unique `View/onboardingIdentifier(:identifier)` for each ``OnboardingConsentView``.


```swift
OnboardingStack {
    OnboardingConsentView(
        markdown: { Data("This is a *markdown* **example**".utf8) },
        action: { firstConsentPdf in
            // Store or share the first signed consent form.
            // Use the `OnboardingNavigationPath` from the SwiftUI `@Environment` to navigate to the next `OnboardingConsentView`.
        }
    )
        .onboardingIdentifier("firstConsentView") // Set an identifier (String) for the `View`, to distinguish it from other `View`s of the same type.

    OnboardingConsentView(
        markdown: { Data("This is a *markdown* **example**".utf8) },
        action: { secondConsentPdf in
            // Store or share the second signed consent form.
        }
    )
        .onboardingIdentifier("secondConsentView"), // Set an identifier for the `View`, to distinguish it from other `View`s of the same type.
}
```

## Topics

### Views

- ``OnboardingConsentView``
- ``ConsentDocument``
- ``SignatureView``

### Export

- ``ConsentViewState``
- ``ConsentDocumentExportRepresentation``

================
File: Sources/SpeziOnboarding/SpeziOnboarding.docc/SpeziOnboarding.md
================
# ``SpeziOnboarding``

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Provides SwiftUI views for onboarding users onto a digital health application.

## Overview

The `SpeziOnboarding` module provides views that can be used for performing onboarding tasks, such as providing an overview of your app and asking a user to read and sign a consent document.

@Row {
    @Column {
        @Image(source: "OnboardingView", alt: "Screenshot displaying the onboarding view.") {
            An ``OnboardingView`` allows you to separate information into areas on a screen, each with a title, description, and icon.
        }
    }
    @Column {
        @Image(source: "SequentialOnboardingView", alt: "Screenshot displaying the sequential onboarding view.") {
            A ``SequentialOnboardingView`` allows you to display information step-by-step with each additional area appearing when the user taps the "Continue" button.
        }
    }
    @Column {
        @Image(source: "ConsentView", alt: "Screenshot displaying the consent view.") {
            A ``OnboardingConsentView`` can be used to allow your users to read and agree to a document as well as exporting it.
        }
    }
}


## Setup

### Add Spezi Onboarding as a Dependency

You need to add the Spezi Onboarding Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).


## Examples

### Onboarding View

The ``OnboardingView`` allows you to separate information into areas on a screen, each with a title, description, and icon.

```swift
import SpeziOnboarding
import SwiftUI


struct OnboardingViewExample: View {
    var body: some View {
        OnboardingView(
            title: "Welcome",
            subtitle: "This is an example onboarding view",
            areas: [
                .init(
                    icon: Image(systemName: "tortoise.fill"), 
                    title: "Tortoise", 
                    description: "A Tortoise!"
                ),
                .init(
                    icon: {
                        Image(systemName: "lizard.fill")
                            .foregroundColor(.green)
                    },
                    title: "Lizard", 
                    description: "A Lizard!"
                ),
                .init(
                    icon: {
                        Circle().fill(.orange)
                    }, 
                    title: "Circle", 
                    description: "A Circle!"
                )
            ],
            actionText: "Learn More",
            action: {
                // Action to perform when the user taps the action button.
            }
        )
    }
}
```


### Sequential Onboarding View

The ``SequentialOnboardingView`` allows you to display information step-by-step, with each additional area appearing when the user taps the `Continue` button.

```swift
import SpeziOnboarding
import SwiftUI


struct SequentialOnboardingViewExample: View {
    var body: some View {
        SequentialOnboardingView(
            title: "Things to know",
            subtitle: "And you should pay close attention ...",
            content: [
                .init(
                    title: "A thing to know", 
                    description: "This is a first thing that you should know; read carefully!"
                ),
                .init(
                    title: "Second thing to know", 
                    description: "This is a second thing that you should know; read carefully!"
                ),
                .init(
                    title: "Third thing to know", 
                    description: "This is a third thing that you should know; read carefully!"
                )
            ],
            actionText: "Continue"
        ) {
            // Action to perform when the user has viewed all the steps
        }
    }
}
```


### Consent View

The ``OnboardingConsentView`` can allow users to read and agree to a document, e.g., a consent document for a research study or a terms and conditions document for an app. The document can be signed using a family and given name and a hand-drawn signature. The signed consent form can then be exported as a PDF document and shared.

The following example demonstrates how the ``OnboardingConsentView`` shown above is constructed by providing a header, markdown content encoded as a [UTF8](https://www.swift.org/blog/utf8-string/) [`Data`](https://developer.apple.com/documentation/foundation/data) instance (which may be provided asynchronously), and an action that should be performed once the consent has been given.

```swift
import SpeziOnboarding
import SwiftUI


struct ConsentViewExample: View {
    var body: some View {
        OnboardingConsentView(
            markdown: {
                Data("This is a *markdown* **example**".utf8)
            },
            action: {
                // Action to perform once the user has given their consent
            },
            exportConfiguration: .init(paperSize: .usLetter),   // Configure the properties of the exported consent form
            currentDateInSignature: true   // Indicates if the consent signature should include the current date.
        )
    }
}
```


## Topics

### Articles

- <doc:DisplayingInformation>
- <doc:ObtainingUserConsent>

### Structuring an Onboarding Flow

- ``OnboardingStack``
- ``OnboardingNavigationPath``
- ``OnboardingViewBuilder``

### Onboarding Views

- ``OnboardingActionsView``
- ``OnboardingInformationView``
- ``OnboardingTitleView``
- ``OnboardingConsentView``
- ``OnboardingView``
- ``SequentialOnboardingView``

### Consent Views

- ``ConsentDocument``
- ``ConsentViewState``
- ``SignatureView``

================
File: Sources/SpeziOnboarding/OnboardingActionsView.swift
================
public struct OnboardingActionsView: View {
    private let primaryText: Text
    private let primaryAction: @MainActor () async throws -> Void
    private let secondaryText: Text?
    private let secondaryAction: (@MainActor () async throws -> Void)?
    @State private var primaryActionState: ViewState = .idle
    @State private var secondaryActionState: ViewState = .idle
    public var body: some View {
    init(
    public init<Text: StringProtocol>(
    public init(
    public init<PrimaryText: StringProtocol, SecondaryText: StringProtocol>(

================
File: Sources/SpeziOnboarding/OnboardingConsentView.swift
================
public struct OnboardingConsentView: View {
    public enum LocalizationDefaults {
        public static var consentFormTitle: LocalizedStringResource {
    private let markdown: () async -> Data
    private let action: (_ document: PDFDocument) async throws -> Void
    private let title: LocalizedStringResource?
    private let currentDateInSignature: Bool
    private let exportConfiguration: ConsentDocumentExportRepresentation.Configuration
    @State private var viewState: ConsentViewState = .base(.idle)
    @State private var willShowShareSheet = false
    @State private var showShareSheet = false
    public var body: some View {
                            nonisolated(unsafe) let pdf = try consentExport.render()
                        let shareSheet = ShareSheet(sharedItem: consentPdf)
    private var backButtonHidden: Bool {
        let exportStates = switch viewState {
    private var actionButtonsEnabled: Bool {
    public init(
    @Previewable @State var viewState: ConsentViewState = .base(.idle)

================
File: Sources/SpeziOnboarding/OnboardingInformationView.swift
================
public struct OnboardingInformationView: View {
    public struct Content {
        public let icon: AnyView
        public let title: Text
        public let description: Text
        private init(icon: AnyView, title: Text, description: Text) {
        public init<Icon: View, Title: StringProtocol, Description: StringProtocol>(
        public init<Icon: View>(
        public init<Title: StringProtocol, Description: StringProtocol>(
        public init(
    private let areas: [Content]
    public var body: some View {
    public init(areas: [Content]) {
    private func areaView(area: Content) -> some View {

================
File: Sources/SpeziOnboarding/OnboardingTitleView.swift
================
public struct OnboardingTitleView: View {
    private let title: Text
    private let subtitle: Text?
    public var body: some View {
    public init(title: LocalizedStringResource) {
    public init<Title: StringProtocol>(title: Title) {
    public init(title: LocalizedStringResource, subtitle: LocalizedStringResource?) {
    public init<Title: StringProtocol, Subtitle: StringProtocol>(title: Title, subtitle: Subtitle?) {

================
File: Sources/SpeziOnboarding/OnboardingView.swift
================
public struct OnboardingView<TitleView: View, ContentView: View, ActionView: View>: View {
    private let titleView: TitleView
    private let contentView: ContentView
    private let actionView: ActionView
    public var body: some View {
    public init(
    public init<Title: StringProtocol, Subtitle: StringProtocol, ActionText: StringProtocol>(
    public init<Title: StringProtocol, ActionText: StringProtocol>(
    let mock: [OnboardingInformationView.Content] =

================
File: Sources/SpeziOnboarding/SequentialOnboardingView.swift
================
public struct SequentialOnboardingView<TitleView: View>: View {
    public struct Content {
        public let title: Text?
        public let description: Text
        public init(
        public init<Title: StringProtocol, Description: StringProtocol>(
        public init<Description: StringProtocol>(
    private let titleView: TitleView
    private let content: [Content]
    private let actionText: Text
    private let action: () async throws -> Void
    @State private var currentContentIndex: Int = 0
    public var body: some View {
    private var actionButtonTitle: Text {
    private init(titleView: TitleView, content: [Content], actionText: Text, action: @escaping () async throws -> Void) {
    public init<Title: StringProtocol, ActionText: StringProtocol>(
    public init<Title: StringProtocol, Subtitle: StringProtocol, ActionText: StringProtocol>(
    public init<ActionText: StringProtocol>(
    private func stepView(index: Int) -> some View {
        let content = content[index]

================
File: Tests/SpeziOnboardingTests/Resources/markdown_data_one_page.md
================
This is a one page pdf example. 

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

================
File: Tests/SpeziOnboardingTests/Resources/markdown_data_two_pages.md
================
This is a two page pdf example. 

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

================
File: Tests/SpeziOnboardingTests/.gitattributes
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
# 
Resources/*.pdf filter=lfs diff=lfs merge=lfs -text

================
File: Tests/SpeziOnboardingTests/SpeziOnboardingTests.swift
================
struct SpeziOnboardingTests {
    func testOnboardingIdentifierModifier() throws {
        let stack = OnboardingStack {
        let identifier = try #require(stack.onboardingNavigationPath.firstOnboardingStepIdentifier)
        var hasher = Hasher()
        let final = hasher.finalize()
    func testPDFExport(markdownPath: String, knownGoodPDFPath: String) async throws {
        let exportConfiguration = ConsentDocumentExportRepresentation.Configuration(
        let documentExport = ConsentDocumentExportRepresentation(
        let pdfPath = knownGoodPDFPath + "_mac_os"
        let pdfPath = knownGoodPDFPath + "_vision_os"
        let pdfPath = knownGoodPDFPath + "_ios"
        let knownGoodPdf = try #require(loadPDFFromPath(path: pdfPath))
        let renderedPdf = try documentExport.render()
    private func loadMarkdownDataFromFile(path: String) -> Data? {
        let bundle = Bundle.module  // Access the test bundle
        var markdownData = Data()
    private func loadPDFFromPath(path: String) -> PDFDocument? {

================
File: Tests/SpeziOnboardingTests/SpeziOnboardingTests+PDFEquatable.swift
================
struct PDFEquatableDocument: Equatable {
    let pdf: PDFDocument
    init(_ pdf: PDFDocument) {
            let text1 = page1.string ?? ""
            let text2 = page2.string ?? ""
    var equatable: PDFEquatableDocument {

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
File: Tests/UITests/TestApp/Views/Consent/ConsentDocumentIdentifiers.swift
================
enum ConsentDocumentIdentifiers {

================
File: Tests/UITests/TestApp/Views/Consent/OnboardingConsentFinishedRenderedView.swift
================
struct OnboardingConsentFinishedRenderedView: View {
    let consentTitle: String
    let documentIdentifier: ConsentDocumentIdentifiers
    @Environment(OnboardingNavigationPath.self) private var path
    @Environment(ExampleStandard.self) private var standard
    @State var exportedConsent: PDFDocument?
    var body: some View {

================
File: Tests/UITests/TestApp/Views/Consent/OnboardingConsentTestView.swift
================
struct OnboardingConsentTestView: View {
    let consentTitle: String
    let consentText: String
    let documentIdentifier: ConsentDocumentIdentifiers
    @Environment(OnboardingNavigationPath.self) private var path
    @Environment(ExampleStandard.self) private var standard
    var body: some View {

================
File: Tests/UITests/TestApp/Views/Helpers/CustomToggleView.swift
================
struct CustomToggleView: View {
    var text: String
    @Binding var condition: Bool
    var body: some View {

================
File: Tests/UITests/TestApp/Views/Helpers/OnboardingFlow+PreviewSimulator.swift
================
enum OnboardingFlow {
    @MainActor static let previewSimulatorViews: [any View] = {

================
File: Tests/UITests/TestApp/Views/OnboardingFlow/OnboardingConditionalTestView.swift
================
struct OnboardingConditionalTestView: View {
    @Environment(OnboardingNavigationPath.self) private var path
    var body: some View {

================
File: Tests/UITests/TestApp/Views/OnboardingFlow/OnboardingCustomTestView1.swift
================
struct OnboardingCustomTestView1: View {
    @Environment(OnboardingNavigationPath.self) private var path
    var exampleArgument: String
    var body: some View {

================
File: Tests/UITests/TestApp/Views/OnboardingFlow/OnboardingCustomTestView2.swift
================
struct OnboardingCustomTestView2: View {
    @Environment(OnboardingNavigationPath.self) private var path
    var body: some View {

================
File: Tests/UITests/TestApp/Views/OnboardingFlow/OnboardingCustomToggleTestView.swift
================
struct OnboardingCustomToggleTestView: View {
    @Environment(OnboardingNavigationPath.self) private var path
    @Binding var showConditionalView: Bool
    var body: some View {

================
File: Tests/UITests/TestApp/Views/OnboardingFlow/OnboardingIdentifiableTestViewCustom.swift
================
struct OnboardingIdentifiableTestViewCustom: View, Identifiable {
    var id: String
    @Environment(OnboardingNavigationPath.self) private var path
    var body: some View {

================
File: Tests/UITests/TestApp/Views/OnboardingFlow/OnboardingTestViewNotIdentifiable.swift
================
struct OnboardingTestViewNotIdentifiable: View {
    var text: String
    @Environment(OnboardingNavigationPath.self) private var path
    var body: some View {

================
File: Tests/UITests/TestApp/Views/OnboardingSequentialTestView.swift
================
struct OnboardingSequentialTestView: View {
    @Environment(OnboardingNavigationPath.self) private var path
    var body: some View {

================
File: Tests/UITests/TestApp/Views/OnboardingStartTestView.swift
================
struct OnboardingStartTestView: View {
    @Environment(OnboardingNavigationPath.self) private var path
    @Binding var showConditionalView: Bool
    var body: some View {

================
File: Tests/UITests/TestApp/Views/OnboardingWelcomeTestView.swift
================
struct OnboardingWelcomeTestView: View {
    @Environment(OnboardingNavigationPath.self) private var path
    var body: some View {

================
File: Tests/UITests/TestApp/ExampleStandard.swift
================
actor ExampleStandard: Standard, EnvironmentAccessible {
    @MainActor var firstConsentDocument: PDFDocument?
    @MainActor var secondConsentDocument: PDFDocument?

================
File: Tests/UITests/TestApp/OnboardingTestsView.swift
================
struct OnboardingTestsView: View {
    @Binding var onboardingFlowComplete: Bool
    @State var showConditionalView = false
    var body: some View {

================
File: Tests/UITests/TestApp/TestApp.swift
================
struct UITestsApp: App {
    @ApplicationDelegateAdaptor(TestAppDelegate.self) var appDelegate
    @State var onboardingFlowComplete = false
    var body: some Scene {

================
File: Tests/UITests/TestApp/TestAppDelegate.swift
================
class TestAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {

================
File: Tests/UITests/TestAppUITests/SpeziOnboardingTests.swift
================
final class OnboardingTests: XCTestCase {
    override func setUp() {
    func testOverallOnboardingFlow() throws {
        let app = XCUIApplication()
    func testOnboardingWelcomeView() throws {
    func testSequentialOnboarding() throws {
    func testOnboardingConsentMarkdown() throws {
    func testOnboardingConsentMarkdownRendering() throws {
    func testOnboardingCustomViews() throws {
    func testDynamicOnboardingFlow1() throws {
    func testDynamicOnboardingFlow2() throws {
    func testDynamicOnboardingFlow3() throws {
    func testIdentifiableViews() throws {

================
File: Tests/UITests/TestAppUITests/XCUIApplication+Onboarding.swift
================
    func hitConsentButton() {
    func dynamicOnboardingFlow(showConditionalView: Bool) throws {
    func consentViewOnboardingFlow(consentTitle: String, markdownText: String) throws {

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
   LastUpgradeVersion = "1620"
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
               BlueprintIdentifier = "SpeziOnboarding"
               BuildableName = "SpeziOnboarding"
               BlueprintName = "SpeziOnboarding"
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
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES"
      shouldAutocreateTestPlan = "YES">
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
	objectVersion = 56;
	objects = {

/* Begin PBXBuildFile section */
		106D8B662D45761600D7637A /* ConsentDocumentIdentifiers.swift in Sources */ = {isa = PBXBuildFile; fileRef = 106D8B652D45760C00D7637A /* ConsentDocumentIdentifiers.swift */; };
		106D8B682D45851500D7637A /* OnboardingConsentFinishedRenderedView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 106D8B672D45851500D7637A /* OnboardingConsentFinishedRenderedView.swift */; };
		2F61BDC329DD02D600D71D33 /* SpeziOnboarding in Frameworks */ = {isa = PBXBuildFile; productRef = 2F61BDC229DD02D600D71D33 /* SpeziOnboarding */; };
		2F61BDC929DD3CC000D71D33 /* OnboardingTestsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F61BDC829DD3CC000D71D33 /* OnboardingTestsView.swift */; };
		2F61BDCB29DDE76D00D71D33 /* SpeziOnboardingTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F61BDCA29DDE76D00D71D33 /* SpeziOnboardingTests.swift */; };
		2F6D139A28F5F386007C25D6 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 2F6D139928F5F386007C25D6 /* Assets.xcassets */; };
		2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA7382B290ADFAA007ACEB9 /* TestApp.swift */; };
		61040A1D2BAFA2F600EDD4EC /* OnboardingIdentifiableTestViewCustom.swift in Sources */ = {isa = PBXBuildFile; fileRef = 61040A1B2BAFA2F600EDD4EC /* OnboardingIdentifiableTestViewCustom.swift */; };
		61D77B542BC83F0100E3165F /* OnboardingCustomToggleTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 61D77B532BC83F0100E3165F /* OnboardingCustomToggleTestView.swift */; };
		61F1697E2BCA888600D1622B /* OnboardingTestViewNotIdentifiable.swift in Sources */ = {isa = PBXBuildFile; fileRef = 61F1697D2BCA888600D1622B /* OnboardingTestViewNotIdentifiable.swift */; };
		970D444F2A6F048A00756FE2 /* OnboardingWelcomeTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 970D444E2A6F048A00756FE2 /* OnboardingWelcomeTestView.swift */; };
		970D44512A6F04ED00756FE2 /* OnboardingSequentialTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 970D44502A6F04ED00756FE2 /* OnboardingSequentialTestView.swift */; };
		970D44532A6F0B1900756FE2 /* OnboardingStartTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 970D44522A6F0B1900756FE2 /* OnboardingStartTestView.swift */; };
		970D44552A6F119600756FE2 /* OnboardingConditionalTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 970D44542A6F119600756FE2 /* OnboardingConditionalTestView.swift */; };
		97A8FF2C2A74449F008CD91A /* OnboardingCustomTestView1.swift in Sources */ = {isa = PBXBuildFile; fileRef = 97A8FF2B2A74449F008CD91A /* OnboardingCustomTestView1.swift */; };
		97A8FF2E2A7444FC008CD91A /* OnboardingCustomTestView2.swift in Sources */ = {isa = PBXBuildFile; fileRef = 97A8FF2D2A7444FC008CD91A /* OnboardingCustomTestView2.swift */; };
		97A8FF312A74607F008CD91A /* CustomToggleView.swift in Sources */ = {isa = PBXBuildFile; fileRef = 97A8FF302A74607F008CD91A /* CustomToggleView.swift */; };
		97C6AF772ACC86B70060155B /* ExampleStandard.swift in Sources */ = {isa = PBXBuildFile; fileRef = 97C6AF762ACC86B70060155B /* ExampleStandard.swift */; };
		97C6AF792ACC88270060155B /* TestAppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 97C6AF782ACC88270060155B /* TestAppDelegate.swift */; };
		97C6AF7B2ACC89000060155B /* XCTestExtensions in Frameworks */ = {isa = PBXBuildFile; productRef = 97C6AF7A2ACC89000060155B /* XCTestExtensions */; };
		97C6AF7F2ACC94450060155B /* OnboardingFlow+PreviewSimulator.swift in Sources */ = {isa = PBXBuildFile; fileRef = 97C6AF7E2ACC94450060155B /* OnboardingFlow+PreviewSimulator.swift */; };
		A950C9C02C68AFAD0052FA6D /* XCUIApplication+Onboarding.swift in Sources */ = {isa = PBXBuildFile; fileRef = A950C9BF2C68AFA80052FA6D /* XCUIApplication+Onboarding.swift */; };
		C499597A2C6C8C1F008E5256 /* OnboardingConsentTestView.swift in Sources */ = {isa = PBXBuildFile; fileRef = C49959782C6C8C1F008E5256 /* OnboardingConsentTestView.swift */; };
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
		106D8B652D45760C00D7637A /* ConsentDocumentIdentifiers.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ConsentDocumentIdentifiers.swift; sourceTree = "<group>"; };
		106D8B672D45851500D7637A /* OnboardingConsentFinishedRenderedView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OnboardingConsentFinishedRenderedView.swift; sourceTree = "<group>"; };
		2F61BDC129DD023E00D71D33 /* SpeziOnboarding */ = {isa = PBXFileReference; lastKnownFileType = wrapper; name = SpeziOnboarding; path = ../..; sourceTree = "<group>"; };
		2F61BDC829DD3CC000D71D33 /* OnboardingTestsView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = OnboardingTestsView.swift; sourceTree = "<group>"; };
		2F61BDCA29DDE76D00D71D33 /* SpeziOnboardingTests.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = SpeziOnboardingTests.swift; sourceTree = "<group>"; };
		2F6D139228F5F384007C25D6 /* TestApp.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = TestApp.app; sourceTree = BUILT_PRODUCTS_DIR; };
		2F6D139928F5F386007C25D6 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		2F6D13AC28F5F386007C25D6 /* TestAppUITests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = TestAppUITests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		2FA7382B290ADFAA007ACEB9 /* TestApp.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TestApp.swift; sourceTree = "<group>"; };
		2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */ = {isa = PBXFileReference; lastKnownFileType = text; path = TestApp.xctestplan; sourceTree = "<group>"; };
		61040A1B2BAFA2F600EDD4EC /* OnboardingIdentifiableTestViewCustom.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = OnboardingIdentifiableTestViewCustom.swift; sourceTree = "<group>"; };
		61D77B532BC83F0100E3165F /* OnboardingCustomToggleTestView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = OnboardingCustomToggleTestView.swift; sourceTree = "<group>"; };
		61F1697D2BCA888600D1622B /* OnboardingTestViewNotIdentifiable.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OnboardingTestViewNotIdentifiable.swift; sourceTree = "<group>"; };
		970D444E2A6F048A00756FE2 /* OnboardingWelcomeTestView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OnboardingWelcomeTestView.swift; sourceTree = "<group>"; };
		970D44502A6F04ED00756FE2 /* OnboardingSequentialTestView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OnboardingSequentialTestView.swift; sourceTree = "<group>"; };
		970D44522A6F0B1900756FE2 /* OnboardingStartTestView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OnboardingStartTestView.swift; sourceTree = "<group>"; };
		970D44542A6F119600756FE2 /* OnboardingConditionalTestView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OnboardingConditionalTestView.swift; sourceTree = "<group>"; };
		97A8FF2B2A74449F008CD91A /* OnboardingCustomTestView1.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OnboardingCustomTestView1.swift; sourceTree = "<group>"; };
		97A8FF2D2A7444FC008CD91A /* OnboardingCustomTestView2.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = OnboardingCustomTestView2.swift; sourceTree = "<group>"; };
		97A8FF302A74607F008CD91A /* CustomToggleView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = CustomToggleView.swift; sourceTree = "<group>"; };
		97C6AF762ACC86B70060155B /* ExampleStandard.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ExampleStandard.swift; sourceTree = "<group>"; };
		97C6AF782ACC88270060155B /* TestAppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TestAppDelegate.swift; sourceTree = "<group>"; };
		97C6AF7E2ACC94450060155B /* OnboardingFlow+PreviewSimulator.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = "OnboardingFlow+PreviewSimulator.swift"; sourceTree = "<group>"; };
		A950C9BF2C68AFA80052FA6D /* XCUIApplication+Onboarding.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = "XCUIApplication+Onboarding.swift"; sourceTree = "<group>"; };
		C49959782C6C8C1F008E5256 /* OnboardingConsentTestView.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = OnboardingConsentTestView.swift; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		2F6D138F28F5F384007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2F61BDC329DD02D600D71D33 /* SpeziOnboarding in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A928F5F386007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				97C6AF7B2ACC89000060155B /* XCTestExtensions in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		10BD9F752D439C6700E9282B /* Consent */ = {
			isa = PBXGroup;
			children = (
				C49959782C6C8C1F008E5256 /* OnboardingConsentTestView.swift */,
				106D8B672D45851500D7637A /* OnboardingConsentFinishedRenderedView.swift */,
				106D8B652D45760C00D7637A /* ConsentDocumentIdentifiers.swift */,
			);
			path = Consent;
			sourceTree = "<group>";
		};
		10BD9F762D439C8800E9282B /* OnboardingFlow */ = {
			isa = PBXGroup;
			children = (
				97A8FF2B2A74449F008CD91A /* OnboardingCustomTestView1.swift */,
				97A8FF2D2A7444FC008CD91A /* OnboardingCustomTestView2.swift */,
				970D44542A6F119600756FE2 /* OnboardingConditionalTestView.swift */,
				61D77B532BC83F0100E3165F /* OnboardingCustomToggleTestView.swift */,
				61040A1B2BAFA2F600EDD4EC /* OnboardingIdentifiableTestViewCustom.swift */,
				61F1697D2BCA888600D1622B /* OnboardingTestViewNotIdentifiable.swift */,
			);
			path = OnboardingFlow;
			sourceTree = "<group>";
		};
		2F6D138928F5F384007C25D6 = {
			isa = PBXGroup;
			children = (
				2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */,
				2F61BDC129DD023E00D71D33 /* SpeziOnboarding */,
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
				970D44472A6F02E800756FE2 /* Views */,
				2FA7382B290ADFAA007ACEB9 /* TestApp.swift */,
				97C6AF782ACC88270060155B /* TestAppDelegate.swift */,
				97C6AF762ACC86B70060155B /* ExampleStandard.swift */,
				2F61BDC829DD3CC000D71D33 /* OnboardingTestsView.swift */,
				2F6D139928F5F386007C25D6 /* Assets.xcassets */,
			);
			path = TestApp;
			sourceTree = "<group>";
		};
		2F6D13AF28F5F386007C25D6 /* TestAppUITests */ = {
			isa = PBXGroup;
			children = (
				A950C9BF2C68AFA80052FA6D /* XCUIApplication+Onboarding.swift */,
				2F61BDCA29DDE76D00D71D33 /* SpeziOnboardingTests.swift */,
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
		970D44472A6F02E800756FE2 /* Views */ = {
			isa = PBXGroup;
			children = (
				10BD9F762D439C8800E9282B /* OnboardingFlow */,
				10BD9F752D439C6700E9282B /* Consent */,
				97A8FF2F2A74606A008CD91A /* Helpers */,
				970D44522A6F0B1900756FE2 /* OnboardingStartTestView.swift */,
				970D444E2A6F048A00756FE2 /* OnboardingWelcomeTestView.swift */,
				970D44502A6F04ED00756FE2 /* OnboardingSequentialTestView.swift */,
			);
			path = Views;
			sourceTree = "<group>";
		};
		97A8FF2F2A74606A008CD91A /* Helpers */ = {
			isa = PBXGroup;
			children = (
				97A8FF302A74607F008CD91A /* CustomToggleView.swift */,
				97C6AF7E2ACC94450060155B /* OnboardingFlow+PreviewSimulator.swift */,
			);
			path = Helpers;
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
				2FF8CFEF2A95D6B100D016A0 /* ShellScript */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = TestApp;
			packageProductDependencies = (
				2F61BDC229DD02D600D71D33 /* SpeziOnboarding */,
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
				97C6AF7A2ACC89000060155B /* XCTestExtensions */,
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
				LastUpgradeCheck = 1620;
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
			compatibilityVersion = "Xcode 14.0";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = 2F6D138928F5F384007C25D6;
			packageReferences = (
				97C6AF752ACC74080060155B /* XCRemoteSwiftPackageReference "XCTestExtensions" */,
			);
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

/* Begin PBXShellScriptBuildPhase section */
		2FF8CFEF2A95D6B100D016A0 /* ShellScript */ = {
			isa = PBXShellScriptBuildPhase;
			alwaysOutOfDate = 1;
			buildActionMask = 2147483647;
			files = (
			);
			inputFileListPaths = (
			);
			inputPaths = (
			);
			outputFileListPaths = (
			);
			outputPaths = (
			);
			runOnlyForDeploymentPostprocessing = 0;
			shellPath = /bin/sh;
			shellScript = "if [ \"${CONFIGURATION}\" = \"Debug\" ]; then\n  export PATH=\"$PATH:/opt/homebrew/bin\"\n  if which swiftlint > /dev/null; then\n    cd ../../ && swiftlint\n  else\n    echo \"warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint\"\n  fi\nfi\n";
		};
/* End PBXShellScriptBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		2F6D138E28F5F384007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				97C6AF792ACC88270060155B /* TestAppDelegate.swift in Sources */,
				61F1697E2BCA888600D1622B /* OnboardingTestViewNotIdentifiable.swift in Sources */,
				106D8B662D45761600D7637A /* ConsentDocumentIdentifiers.swift in Sources */,
				C499597A2C6C8C1F008E5256 /* OnboardingConsentTestView.swift in Sources */,
				970D44552A6F119600756FE2 /* OnboardingConditionalTestView.swift in Sources */,
				97C6AF772ACC86B70060155B /* ExampleStandard.swift in Sources */,
				970D44532A6F0B1900756FE2 /* OnboardingStartTestView.swift in Sources */,
				970D44512A6F04ED00756FE2 /* OnboardingSequentialTestView.swift in Sources */,
				61D77B542BC83F0100E3165F /* OnboardingCustomToggleTestView.swift in Sources */,
				97A8FF2C2A74449F008CD91A /* OnboardingCustomTestView1.swift in Sources */,
				2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */,
				97A8FF2E2A7444FC008CD91A /* OnboardingCustomTestView2.swift in Sources */,
				2F61BDC929DD3CC000D71D33 /* OnboardingTestsView.swift in Sources */,
				61040A1D2BAFA2F600EDD4EC /* OnboardingIdentifiableTestViewCustom.swift in Sources */,
				106D8B682D45851500D7637A /* OnboardingConsentFinishedRenderedView.swift in Sources */,
				97C6AF7F2ACC94450060155B /* OnboardingFlow+PreviewSimulator.swift in Sources */,
				970D444F2A6F048A00756FE2 /* OnboardingWelcomeTestView.swift in Sources */,
				97A8FF312A74607F008CD91A /* CustomToggleView.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A828F5F386007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				A950C9C02C68AFAD0052FA6D /* XCUIApplication+Onboarding.swift in Sources */,
				2F61BDCB29DDE76D00D71D33 /* SpeziOnboardingTests.swift in Sources */,
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
				SWIFT_STRICT_CONCURRENCY = complete;
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
				SWIFT_STRICT_CONCURRENCY = complete;
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
				CODE_SIGN_STYLE = Manual;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = "";
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
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.onboarding.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE_SPECIFIER = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = YES;
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
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.onboarding.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = YES;
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.onboarding.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = YES;
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.onboarding.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = YES;
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
				SWIFT_STRICT_CONCURRENCY = complete;
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
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.onboarding.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = YES;
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
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.onboarding.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = YES;
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
		97C6AF752ACC74080060155B /* XCRemoteSwiftPackageReference "XCTestExtensions" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTestExtensions";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.1.1;
			};
		};
/* End XCRemoteSwiftPackageReference section */

/* Begin XCSwiftPackageProductDependency section */
		2F61BDC229DD02D600D71D33 /* SpeziOnboarding */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziOnboarding;
		};
		97C6AF7A2ACC89000060155B /* XCTestExtensions */ = {
			isa = XCSwiftPackageProductDependency;
			package = 97C6AF752ACC74080060155B /* XCRemoteSwiftPackageReference "XCTestExtensions" */;
			productName = XCTestExtensions;
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
          "identifier" : "SpeziOnboarding",
          "name" : "SpeziOnboarding"
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
File: .gitattributes
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2023 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
# 

Tests/SpeziOnboardingTests/Resources/known_good_pdf_one_page_mac_os.pdf filter=lfs diff=lfs merge=lfs -text
Tests/SpeziOnboardingTests/Resources/known_good_pdf_one_page_vision_os.pdf filter=lfs diff=lfs merge=lfs -text
Tests/SpeziOnboardingTests/Resources/known_good_pdf_two_pages_ios.pdf filter=lfs diff=lfs merge=lfs -text
Tests/SpeziOnboardingTests/Resources/known_good_pdf_two_pages_mac_os.pdf filter=lfs diff=lfs merge=lfs -text
Tests/SpeziOnboardingTests/Resources/known_good_pdf_two_pages_vision_os.pdf filter=lfs diff=lfs merge=lfs -text
Tests/SpeziOnboardingTests/Resources/known_good_pdf_one_page_ios.pdf filter=lfs diff=lfs merge=lfs -text

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
      - SpeziOnboarding

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
title: "SpeziOnboarding"
doi: 10.5281/zenodo.7806970
url: "https://github.com/StanfordSpezi/SpeziOnboarding"

================
File: CONTRIBUTORS.md
================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

SpeziOnboarding contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Vishnu Ravi](https://github.com/vishnuravi)
* [Andreas Bauer](https://github.com/Supereg)
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

# Spezi Onboarding

[![Build and Test](https://github.com/StanfordSpezi/SpeziOnboarding/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziOnboarding/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziOnboarding/branch/main/graph/badge.svg?token=lsRIXi5IXY)](https://codecov.io/gh/StanfordSpezi/SpeziOnboarding)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7806970.svg)](https://doi.org/10.5281/zenodo.7806970)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziOnboarding%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziOnboarding)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziOnboarding%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziOnboarding)

Provides UI components for onboarding and consent.


## Overview

The Spezi Onboarding module provides user interface components to onboard a user to an application, including the possibility of retrieving consent for study participation.

|![Screenshot displaying the onboarding view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/OnboardingView.png#gh-light-mode-only) ![Screenshot displaying the onboarding view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/OnboardingView~dark.png#gh-dark-mode-only)|![Screenshot displaying the sequential onboarding view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/SequentialOnboardingView.png#gh-light-mode-only) ![Screenshot displaying the sequential onboarding view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/SequentialOnboardingView~dark.png#gh-dark-mode-only)|![Screenshot displaying the consent view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/ConsentView.png#gh-light-mode-only) ![Screenshot displaying the consent view.](Sources/SpeziOnboarding/SpeziOnboarding.docc/Resources/ConsentView~dark.png#gh-dark-mode-only)
|:--:|:--:|:--:|
|[`OnboardingView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingview)|[`SequentialOnboardingView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/sequentialonboardingview)|[`OnboardingConsentView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingconsentview)|


## Setup

### Add Spezi Onboarding as a Dependency

You need to add the Spezi Onboarding Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app#) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).


## Examples

### Onboarding View

The [`OnboardingView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingview) allows you to separate information into areas on a screen, each with a title, description, and icon.

```swift
import SpeziOnboarding
import SwiftUI


struct OnboardingViewExample: View {
    var body: some View {
        OnboardingView(
            title: "Welcome",
            subtitle: "This is an example onboarding view",
            areas: [
                .init(
                    icon: Image(systemName: "tortoise.fill"), 
                    title: "Tortoise", 
                    description: "A Tortoise!"
                ),
                .init(
                    icon: {
                        Image(systemName: "lizard.fill")
                            .foregroundColor(.green)
                    },
                    title: "Lizard", 
                    description: "A Lizard!"
                ),
                .init(
                    icon: {
                        Circle().fill(.orange)
                    }, 
                    title: "Circle", 
                    description: "A Circle!"
                )
            ],
            actionText: "Learn More",
            action: {
                // Action to perform when the user taps the action button.
            }
        )
    }
}
```


### Sequential Onboarding View

The [`SequentialOnboardingView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/sequentialonboardingview) allows you to display information step-by-step with each additional area appearing when the user taps the `Continue` button.

```swift
import SpeziOnboarding
import SwiftUI


struct SequentialOnboardingViewExample: View {
    var body: some View {
        SequentialOnboardingView(
            title: "Things to know",
            subtitle: "And you should pay close attention ...",
            content: [
                .init(
                    title: "A thing to know", 
                    description: "This is a first thing that you should know; read carefully!"
                ),
                .init(
                    title: "Second thing to know", 
                    description: "This is a second thing that you should know; read carefully!"
                ),
                .init(
                    title: "Third thing to know", 
                    description: "This is a third thing that you should know; read carefully!"
                )
            ],
            actionText: "Continue"
        ) {
            // Action to perform when the user has viewed all the steps
        }
    }
}
```


### Onboarding Consent View

The [`OnboardingConsentView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingconsentview) can be used to allow your users to read and agree to a document, e.g., a consent document for a research study or a terms and conditions document for an app. The document can be signed using a family and given name and a hand-drawn signature. The signed consent form can then be exported and shared as a PDF file.

The following example demonstrates how the [`OnboardingConsentView`](https://swiftpackageindex.com/stanfordspezi/spezionboarding/documentation/spezionboarding/onboardingconsentview) shown above is constructed by providing markdown content encoded as a [UTF8](https://www.swift.org/blog/utf8-string/) [`Data`](https://developer.apple.com/documentation/foundation/data) instance (which may be provided asynchronously), an action that should be performed once the consent has been given (which receives the exported consent form as a PDF), as well as a configuration defining the properties of the exported consent form.

```swift
import SpeziOnboarding
import SwiftUI


struct ConsentViewExample: View {
    var body: some View {
        OnboardingConsentView(
            markdown: {
                Data("This is a *markdown* **example**".utf8)
            },
            action: { exportedConsentPdf in
                // Action to perform once the user has given their consent.
                // Closure receives the exported consent PDF to persist or upload it.
            },
            exportConfiguration: .init(paperSize: .usLetter),    // Configure the properties of the exported consent form
            currentDateInSignature: true   // Indicates if the consent signature should include the current date.
        )
    }
}
```

For more information, please refer to the [API documentation](https://swiftpackageindex.com/StanfordSpezi/SpeziOnboarding/documentation).


## The Spezi Template Application

The [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication) provides a great starting point and example using the `SpeziOnboarding` module.


## Running Tests Locally
If you would like to clone this repo and run the unit and UI tests locally, please be aware that you need to have git lfs (large file storage) configured. The unit tests load some binary data (e.g., PDF files) at runtime, which are stored in the [test resources](Tests/SpeziOnboardingTests/Resources/) as git lfs tags. To install git lfs, please refer to the [official documentation](https://git-lfs.com/). Afterward set up git lfs for your user by executing the following command:
```sh
git lfs install
``` 
Now, you can clone the repo and the binary files should be checked out correctly.


## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.


## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziOnboarding/tree/main/LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterLight.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterDark.png#gh-dark-mode-only)



================================================================
End of Codebase
================================================================
