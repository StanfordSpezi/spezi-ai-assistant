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
  SpeziHealthKit/
    Configuration/
      HealthKitConfiguration.swift
      RequestReadAccess.swift
      RequestWriteAccess.swift
    Health Data Collection/
      CollectSample.swift
      HealthDataCollector.swift
      HealthDataCollectorDeliverySetting.swift
      HealthKitSampleCollector.swift
    HealthKit Extensions/
      HKElectrocardiogram+RelatedData.swift
      HKHealthStore+AnchoredObjectQuery.swift
      HKHealthStore+BackgroundDelivery.swift
      HKHealthStore+SampleQuery.swift
    Logging/
      Logger+HealthKit.swift
    Resources/
      Localizable.xcstrings
      Localizable.xcstrings.license
    Sample Types/
      _HKSampleTypeWithIdentifierType.swift
      _HKSampleWithSampleType.swift
      AnySampleType.swift
      HealthKitCharacteristic.swift
      SampleType.swift
      SampleTypes.swift
      SampleTypes.swift.gyb
    SpeziHealthKit.docc/
      ModuleConfiguration.md
      SampleType.md
      SampleType+CategoryTypes.md
      SampleType+QuantityTypes.md
      SpeziHealthKit.md
    Well Known Type Identifiers/
      CategoryTypeIdentifiers.swift
      CharacteristicTypeIdentifiers.swift
      CorrelationTypeIdentifiers.swift
      KnownObjectTypes.swift
      QuantityTypeIdentifiers.swift
    Export.swift
    HealthKit.swift
    HealthKitConstraint.swift
    SampleTypeScopedLocalStorage.swift
  SpeziHealthKitUI/
    HealthChart/
      HealthChart.swift
      HealthChartDataPoint.swift
      HealthChartEntry.swift
      Utils.swift
    Queries/
      HealthKitCharacteristicsQuery.swift
      HealthKitQuery.swift
      HealthKitQueryResults.swift
      HealthKitQueryTimeRange.swift
      HealthKitStatisticsQuery.swift
    SpeziHealthKitUI.docc/
      HealthChart.md
      SpeziHealthKitUI.md
Tests/
  SpeziHealthKitTests/
    HealthChartTests.swift
    HealthDataCollectorRegistrationTests.swift
    LoopingIterator.swift
    MockQueryResults.swift
    SpeziHealthKitTests.swift
    Utils.swift
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
      HealthKitTestsView/
        CharacteristicsView.swift
        HealthKitTestsView.swift
        SamplesQueryView.swift
        StatisticsQueryView.swift
        TestSampleDefinition.swift
      BackgroundPersistence.swift
      FakeHealthStore.swift
      HealthKitTestAppStandard.swift
      TestApp.entitlements
      TestApp.entitlements.license
      TestApp.swift
      TestAppDelegate.swift
      Utils.swift
    TestAppUITests/
      SpeziHealthKitTests.swift
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
codecov.yml
CONTRIBUTORS.md
LICENSE.md
Package.swift
README.md
useGYB

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
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziHealthKit-Package
      artifactname: SpeziHealthKit-Package.xcresult
      resultBundle: SpeziHealthKit-Package.xcresult
  buildandtestuitests:
    name: Build and Test UI Tests
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      path: 'Tests/UITests'
      scheme: TestApp
      artifactname: TestApp.xcresult
      resultBundle: TestApp.xcresult
  uploadcoveragereport:
    name: Upload Coverage Report
    needs: [buildandtest, buildandtestuitests]
    uses: StanfordSpezi/.github/.github/workflows/create-and-upload-coverage-report.yml@v2
    with:
      coveragereports: SpeziHealthKit-Package.xcresult TestApp.xcresult
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
File: .reuse/dep5
================
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/

Files: Tests/SpeziHealthKitTests/__Snapshots__/*
Copyright: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
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
File: Sources/SpeziHealthKit/Configuration/HealthKitConfiguration.swift
================
public protocol HealthKitConfigurationComponent {
    public struct DataAccessRequirements: Hashable, Sendable {
        public let read: Set<HKObjectType>
        public let write: Set<HKSampleType>
        public init(read: some Sequence<HKObjectType> = [], write: some Sequence<HKSampleType> = []) {
        public func merging(with other: Self) -> Self {
        public mutating func merge(with other: Self) {
        public var isEmpty: Bool {

================
File: Sources/SpeziHealthKit/Configuration/RequestReadAccess.swift
================
public struct RequestReadAccess: HealthKitConfigurationComponent {
    public let dataAccessRequirements: HealthKit.DataAccessRequirements
    public init(_ objectTypes: some Sequence<HKObjectType>) {
    public init(
        let types = (collectAllUnderyingEffectiveSampleTypes(quantity, category, correlation) as Set<HKObjectType>)
    public func configure(for healthKit: HealthKit, on standard: any HealthKitConstraint) {

================
File: Sources/SpeziHealthKit/Configuration/RequestWriteAccess.swift
================
public struct RequestWriteAccess: HealthKitConfigurationComponent {
    public let dataAccessRequirements: HealthKit.DataAccessRequirements
    public init(_ objectTypes: some Sequence<HKSampleType>) {
    public init(
        let types = collectAllUnderyingEffectiveSampleTypes(quantity, category, correlation)
    public func configure(for healthKit: HealthKit, on standard: any HealthKitConstraint) {

================
File: Sources/SpeziHealthKit/Health Data Collection/CollectSample.swift
================
public struct CollectSample<Sample: _HKSampleWithSampleType>: HealthKitConfigurationComponent {
    private let sampleType: SampleType<Sample>
    private let deliverySetting: HealthDataCollectorDeliverySetting
    private let predicate: NSPredicate?
    public var dataAccessRequirements: HealthKit.DataAccessRequirements {
    public init(
    public func configure(for healthKit: HealthKit, on standard: any HealthKitConstraint) async {
        let collector = HealthKitSampleCollector(

================
File: Sources/SpeziHealthKit/Health Data Collection/HealthDataCollector.swift
================
public protocol HealthDataCollector: AnyObject {
    var typeErasedSampleType: any AnySampleType {

================
File: Sources/SpeziHealthKit/Health Data Collection/HealthDataCollectorDeliverySetting.swift
================
public struct HealthDataCollectorDeliverySetting: Hashable, Sendable {
    public let startSetting: Start
    public let continueInBackground: Bool
    public enum Start: Hashable, Sendable {

================
File: Sources/SpeziHealthKit/Health Data Collection/HealthKitSampleCollector.swift
================
final class HealthKitSampleCollector<Sample: _HKSampleWithSampleType>: HealthDataCollector {
    private enum QueryVariant {
    private unowned let healthKit: HealthKit
    private let standard: any HealthKitConstraint
    let sampleType: SampleType<Sample>
    private let predicate: NSPredicate?
    let deliverySetting: HealthDataCollectorDeliverySetting
    @MainActor private(set) var isActive = false
    private var queryVariant: QueryVariant?
    @MainActor private lazy var anchor: HKQueryAnchor? = loadAnchor() {
    private var healthStore: HKHealthStore { healthKit.healthStore }
    required init(
    private static func loadDefaultQueryDate(for sampleType: SampleType<Sample>, in healthKit: HealthKit) -> Date {
            let cal = Calendar.current
            var components = cal.dateComponents(in: .current, from: .now)
            let defaultQueryDate = cal.date(from: components) ?? .now
    func startDataCollection() async {
                let queryInvalidator = try await healthStore.startBackgroundDelivery(for: [sampleType.hkSampleType]) { result in
    func stopDataCollection() async {
    private func anchoredSingleObjectQuery() async throws {
        let resultsAnchor = try await healthStore.anchoredSingleObjectQuery(
    private func anchoredContinuousObjectQuery() async throws {
        let anchorDescriptor = healthStore.anchorDescriptor(
        let updateQueue = anchorDescriptor.results(for: healthStore)
        let task = Task {
    private func saveAnchor() {
    private func loadAnchor() -> HKQueryAnchor? {

================
File: Sources/SpeziHealthKit/HealthKit Extensions/HKElectrocardiogram+RelatedData.swift
================
    public static let correlatedSymptomTypes: [HKCategoryType] = [
    public func symptoms(from healthStore: HKHealthStore) async throws -> Symptoms {
            let predicate = HKQuery.predicateForObjectsAssociated(electrocardiogram: self)
    public func voltageMeasurements(from healthStore: HKHealthStore) async throws -> VoltageMeasurements {
        let electrocardiogramQueryDescriptor = HKElectrocardiogramQueryDescriptor(self)
        var voltageMeasurements: VoltageMeasurements = []

================
File: Sources/SpeziHealthKit/HealthKit Extensions/HKHealthStore+AnchoredObjectQuery.swift
================
    public var id: UUID {
    func anchoredSingleObjectQuery(
        let anchorDescriptor = anchorDescriptor(sampleType: sampleType, predicate: predicate, anchor: anchor)
        let result = try await anchorDescriptor.result(for: self)
    func anchorDescriptor(

================
File: Sources/SpeziHealthKit/HealthKit Extensions/HKHealthStore+BackgroundDelivery.swift
================
    final class BackgroundObserverQueryInvalidator: @unchecked Sendable {
        private let healthStore: HKHealthStore
        private weak var query: HKQuery?
        init(healthStore: HKHealthStore, query: HKQuery) {
        func invalidate() {
    private static let activeObservationsLock = NSLock()
    func startBackgroundDelivery(
        let queryDescriptors: [HKQueryDescriptor] = sampleTypes.map {
        let observerQuery = HKObserverQuery(queryDescriptors: queryDescriptors) { query, sampleTypes, completionHandler, error in
            nonisolated(unsafe) let completionHandler = completionHandler
    func enableBackgroundDelivery(for objectTypes: Set<HKObjectType>) async throws {
        var enabledObjectTypes: Set<HKObjectType> = []
    func disableBackgroundDelivery(
                    let newActiveObservation = activeObservation - 1

================
File: Sources/SpeziHealthKit/HealthKit Extensions/HKHealthStore+SampleQuery.swift
================
    func sampleQuery(
        let sampleQueryDescriptor = HKSampleQueryDescriptor(

================
File: Sources/SpeziHealthKit/Logging/Logger+HealthKit.swift
================
    static let healthKit = Logger(subsystem: "edu.stanford.spezi", category: "HealthKit")

================
File: Sources/SpeziHealthKit/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "Active Energy" : {

    },
    "Active Energy Burned" : {
      "extractionState" : "stale",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Aktivitätsenergie"
          }
        }
      }
    },
    "Alcohol Consumption" : {

    },
    "Atrial Fibrillation" : {

    },
    "Audiogram" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Hörtest"
          }
        }
      }
    },
    "Basal Body Temperature" : {

    },
    "Biotin" : {

    },
    "Blood Alcohol Content" : {

    },
    "Blood Glucose" : {

    },
    "Blood Oxygen" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Blutsauerstoff"
          }
        }
      }
    },
    "Blood Pressure" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Blutdruck"
          }
        }
      }
    },
    "Blood Pressure (Diastolic)" : {

    },
    "Blood Pressure (Systolic)" : {

    },
    "Body Fat Percentage" : {

    },
    "Body Mass" : {

    },
    "Body Mass Index" : {

    },
    "Body Temperature" : {

    },
    "Caffeine" : {

    },
    "Calcium" : {

    },
    "Carbohydrates" : {

    },
    "Cardio Recovery" : {

    },
    "Cervical Mucus Quality" : {

    },
    "Chloride" : {

    },
    "Cholesterol" : {

    },
    "Chromium" : {

    },
    "Contraceptives" : {

    },
    "Copper" : {

    },
    "Cycling Distance" : {

    },
    "Dietary Energy Consumed" : {

    },
    "Double Support Time" : {

    },
    "Downhill Snow Sports Distance" : {

    },
    "ECG" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "EKG"
          }
        }
      }
    },
    "Electrodermal Activity" : {

    },
    "Environmental Audio Exposure" : {

    },
    "Environmental Audio Exposure Event" : {

    },
    "Exercise Minutes" : {

    },
    "Fiber" : {

    },
    "Flights Climbed" : {

    },
    "Folate" : {

    },
    "Food" : {

    },
    "Forced Expiratory Volume, 1 sec" : {

    },
    "Forced Vital Capacity" : {

    },
    "Ground Contact Time" : {

    },
    "Handwashing Event" : {

    },
    "Headphone Audio Exposure" : {

    },
    "Headphone Audio Exposure Event" : {

    },
    "Heart Rate" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Puls"
          }
        }
      }
    },
    "Heart Rate Variability" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Herzfrequenzvariabilität"
          }
        }
      }
    },
    "Height" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Größe"
          }
        }
      }
    },
    "High Heart Rate Event" : {

    },
    "Infrequent Periods" : {

    },
    "Inhaler Usage" : {

    },
    "Insulin Delivery" : {

    },
    "Iodine" : {

    },
    "Iron" : {

    },
    "Irregular Cycles" : {

    },
    "Irregular Heart Rythm Event" : {

    },
    "Lactation" : {

    },
    "Lean Body Mass" : {

    },
    "Low Cardio Fitness Event" : {

    },
    "Low Heart Rate Event" : {

    },
    "Magnesium" : {

    },
    "Manganese" : {

    },
    "Menstrual Cycles" : {

    },
    "Mindful Session" : {

    },
    "Molybdenum" : {

    },
    "Monounsaturated Fat" : {

    },
    "Move Minutes" : {

    },
    "Niacin" : {

    },
    "Number of Times Fallen" : {

    },
    "Ovulation Test Result" : {

    },
    "Pantothenic Acid" : {

    },
    "Peak Expiratory Flow Rate" : {

    },
    "Peripheral Perfusion Index" : {

    },
    "Persistent Spotting" : {

    },
    "Phosphorus" : {

    },
    "Polyunsaturated Fat" : {

    },
    "Potassium" : {

    },
    "Pregnancy" : {

    },
    "Pregnancy Test Result" : {

    },
    "Progesterone Test Result" : {

    },
    "Prolonged Periods" : {

    },
    "Protein" : {

    },
    "Pushes" : {

    },
    "Respiratory Rate" : {

    },
    "Resting Energy" : {

    },
    "Resting Heart Rate" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Ruhepuls"
          }
        }
      }
    },
    "Riboflavin" : {

    },
    "Running Power" : {

    },
    "Running Speed" : {

    },
    "Running Stride Length" : {

    },
    "Saturated Fat" : {

    },
    "Selenium" : {

    },
    "Sexual Activity" : {

    },
    "Six-Minute Walk Distance" : {

    },
    "Sleep Analysis" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Schlafanalyse"
          }
        }
      }
    },
    "Sodium" : {

    },
    "Spotting" : {

    },
    "Stair Speed (Down)" : {

    },
    "Stair Speed (Up)" : {

    },
    "Stand Hours" : {

    },
    "Step Count" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Schrittzahl"
          }
        }
      }
    },
    "Sugar" : {

    },
    "Swimming Distance" : {

    },
    "Swimming Strokes" : {

    },
    "Thiamin" : {

    },
    "Toothbrushing Event" : {

    },
    "Total Fat" : {

    },
    "Underwater Depth" : {

    },
    "UV Index" : {

    },
    "Vertical Oscillation" : {

    },
    "Vitamin A" : {

    },
    "Vitamin B6" : {

    },
    "Vitamin B12" : {

    },
    "Vitamin C" : {

    },
    "Vitamin D" : {

    },
    "Vitamin E" : {

    },
    "Vitamin K" : {

    },
    "VO₂ max" : {

    },
    "Waist Circumference" : {

    },
    "Walking + Running Distance" : {

    },
    "Walking Asymmetry" : {

    },
    "Walking Heart Rate Average" : {

    },
    "Walking Speed" : {

    },
    "Walking Steadiness" : {

    },
    "Walking Steadiness Event" : {

    },
    "Walking Step Length" : {

    },
    "Water" : {

    },
    "Water Temperature" : {

    },
    "Wheelchair Distance" : {

    },
    "Wheelchair Push Count" : {
      "extractionState" : "stale",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Rollstuhlschübe"
          }
        }
      }
    },
    "Workout" : {

    },
    "Wrist Temperature" : {

    },
    "Zinc" : {

    }
  },
  "version" : "1.0"
}

================
File: Sources/SpeziHealthKit/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Sources/SpeziHealthKit/Sample Types/_HKSampleTypeWithIdentifierType.swift
================
public protocol _HKSampleTypeIdentifierType: Hashable {
public protocol _HKSampleTypeWithIdentifierType: HKSampleType {

================
File: Sources/SpeziHealthKit/Sample Types/_HKSampleWithSampleType.swift
================
public protocol _HKSampleWithSampleType: HKSample {

================
File: Sources/SpeziHealthKit/Sample Types/AnySampleType.swift
================
public protocol AnySampleType: Hashable, Identifiable, Sendable where ID == String {
    @inlinable public var id: String {
    @inlinable public var identifier: Sample._SampleType._Identifier {
    @inlinable public func hash(into hasher: inout Hasher) {
    var effectiveSampleTypesForAuthentication: [any AnySampleType] {
func collectAllUnderyingEffectiveSampleTypes<each S>(
    var retval = Set<HKSampleType>()

================
File: Sources/SpeziHealthKit/Sample Types/HealthKitCharacteristic.swift
================
public protocol HealthKitCharacteristicProtocol<Value>: Hashable, Sendable {
public struct HealthKitCharacteristic<Value>: HealthKitCharacteristicProtocol, Sendable {
    public let hkType: HKCharacteristicType
    public let displayTitle: String
    let accessor: @Sendable (HKHealthStore) throws -> Value
    fileprivate init(
    public func value(in healthStore: HKHealthStore) throws -> Value {
    public func hash(into hasher: inout Hasher) {
    public static var activityMoveMode: Self {
    public static var biologicalSex: Self {
    public static var bloodType: Self {
    public static var dateOfBirth: Self {
            let components = try healthStore.dateOfBirthComponents()
    public static var fitzpatrickSkinType: Self {
    public static var wheelchairUse: Self {

================
File: Sources/SpeziHealthKit/Sample Types/SampleType.swift
================
public struct SampleType<Sample: _HKSampleWithSampleType>: AnySampleType {
    enum Variant: Sendable {
    public let hkSampleType: Sample._SampleType
    public let displayTitle: String
    @usableFromInline let variant: Variant
    @usableFromInline init(_ hkSampleType: Sample._SampleType, displayTitle: LocalizedStringResource, variant: Variant) {
    @inlinable public var displayUnit: HKUnit {
    @inlinable public var expectedValuesRange: ClosedRange<Double>? {
    @inlinable public var associatedQuantityTypes: Set<SampleType<HKQuantitySample>> {
    @inlinable public static func quantity(
    @inlinable public static func correlation(
    @inlinable public static func category(
    @inlinable public static var electrocardiogram: SampleType<HKElectrocardiogram> {
    @inlinable public static var audiogram: SampleType<HKAudiogramSample> {
    @inlinable public static var workout: SampleType<HKWorkout> {

================
File: Sources/SpeziHealthKit/Sample Types/SampleTypes.swift
================
@inlinable func localeDependentUnit(
    @inlinable public static var stepCount: SampleType<HKQuantitySample> {
    @inlinable public static var distanceWalkingRunning: SampleType<HKQuantitySample> {
    @inlinable public static var runningGroundContactTime: SampleType<HKQuantitySample> {
    @inlinable public static var runningPower: SampleType<HKQuantitySample> {
    @inlinable public static var runningSpeed: SampleType<HKQuantitySample> {
    @inlinable public static var runningStrideLength: SampleType<HKQuantitySample> {
    @inlinable public static var runningVerticalOscillation: SampleType<HKQuantitySample> {
    @inlinable public static var distanceCycling: SampleType<HKQuantitySample> {
    @inlinable public static var pushCount: SampleType<HKQuantitySample> {
    @inlinable public static var distanceWheelchair: SampleType<HKQuantitySample> {
    @inlinable public static var swimmingStrokeCount: SampleType<HKQuantitySample> {
    @inlinable public static var distanceSwimming: SampleType<HKQuantitySample> {
    @inlinable public static var distanceDownhillSnowSports: SampleType<HKQuantitySample> {
    @inlinable public static var basalEnergyBurned: SampleType<HKQuantitySample> {
    @inlinable public static var activeEnergyBurned: SampleType<HKQuantitySample> {
    @inlinable public static var flightsClimbed: SampleType<HKQuantitySample> {
    @inlinable public static var appleExerciseTime: SampleType<HKQuantitySample> {
    @inlinable public static var appleMoveTime: SampleType<HKQuantitySample> {
    @inlinable public static var appleStandTime: SampleType<HKQuantitySample> {
    @inlinable public static var vo2Max: SampleType<HKQuantitySample> {
    @inlinable public static var height: SampleType<HKQuantitySample> {
    @inlinable public static var bodyMass: SampleType<HKQuantitySample> {
    @inlinable public static var bodyMassIndex: SampleType<HKQuantitySample> {
    @inlinable public static var leanBodyMass: SampleType<HKQuantitySample> {
    @inlinable public static var bodyFatPercentage: SampleType<HKQuantitySample> {
    @inlinable public static var waistCircumference: SampleType<HKQuantitySample> {
    @inlinable public static var appleSleepingWristTemperature: SampleType<HKQuantitySample> {
    @inlinable public static var basalBodyTemperature: SampleType<HKQuantitySample> {
    @inlinable public static var environmentalAudioExposure: SampleType<HKQuantitySample> {
    @inlinable public static var headphoneAudioExposure: SampleType<HKQuantitySample> {
    @inlinable public static var heartRate: SampleType<HKQuantitySample> {
    @inlinable public static var restingHeartRate: SampleType<HKQuantitySample> {
    @inlinable public static var walkingHeartRateAverage: SampleType<HKQuantitySample> {
    @inlinable public static var heartRateVariabilitySDNN: SampleType<HKQuantitySample> {
    @inlinable public static var heartRateRecoveryOneMinute: SampleType<HKQuantitySample> {
    @inlinable public static var atrialFibrillationBurden: SampleType<HKQuantitySample> {
    @inlinable public static var bloodOxygen: SampleType<HKQuantitySample> {
    @inlinable public static var bodyTemperature: SampleType<HKQuantitySample> {
    @inlinable public static var bloodPressureDiastolic: SampleType<HKQuantitySample> {
    @inlinable public static var bloodPressureSystolic: SampleType<HKQuantitySample> {
    @inlinable public static var respiratoryRate: SampleType<HKQuantitySample> {
    @inlinable public static var bloodGlucose: SampleType<HKQuantitySample> {
    @inlinable public static var electrodermalActivity: SampleType<HKQuantitySample> {
    @inlinable public static var forcedExpiratoryVolume1: SampleType<HKQuantitySample> {
    @inlinable public static var forcedVitalCapacity: SampleType<HKQuantitySample> {
    @inlinable public static var inhalerUsage: SampleType<HKQuantitySample> {
    @inlinable public static var insulinDelivery: SampleType<HKQuantitySample> {
    @inlinable public static var numberOfTimesFallen: SampleType<HKQuantitySample> {
    @inlinable public static var peakExpiratoryFlowRate: SampleType<HKQuantitySample> {
    @inlinable public static var peripheralPerfusionIndex: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryBiotin: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryCaffeine: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryCalcium: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryCarbohydrates: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryChloride: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryCholesterol: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryChromium: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryCopper: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryEnergyConsumed: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryFatMonounsaturated: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryFatPolyunsaturated: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryFatSaturated: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryFatTotal: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryFiber: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryFolate: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryIodine: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryIron: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryMagnesium: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryManganese: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryMolybdenum: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryNiacin: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryPantothenicAcid: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryPhosphorus: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryPotassium: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryProtein: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryRiboflavin: SampleType<HKQuantitySample> {
    @inlinable public static var dietarySelenium: SampleType<HKQuantitySample> {
    @inlinable public static var dietarySodium: SampleType<HKQuantitySample> {
    @inlinable public static var dietarySugar: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryThiamin: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryVitaminA: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryVitaminB12: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryVitaminB6: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryVitaminC: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryVitaminD: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryVitaminE: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryVitaminK: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryWater: SampleType<HKQuantitySample> {
    @inlinable public static var dietaryZinc: SampleType<HKQuantitySample> {
    @inlinable public static var bloodAlcoholContent: SampleType<HKQuantitySample> {
    @inlinable public static var numberOfAlcoholicBeverages: SampleType<HKQuantitySample> {
    @inlinable public static var appleWalkingSteadiness: SampleType<HKQuantitySample> {
    @inlinable public static var sixMinuteWalkTestDistance: SampleType<HKQuantitySample> {
    @inlinable public static var walkingSpeed: SampleType<HKQuantitySample> {
    @inlinable public static var walkingStepLength: SampleType<HKQuantitySample> {
    @inlinable public static var walkingAsymmetryPercentage: SampleType<HKQuantitySample> {
    @inlinable public static var walkingDoubleSupportPercentage: SampleType<HKQuantitySample> {
    @inlinable public static var stairAscentSpeed: SampleType<HKQuantitySample> {
    @inlinable public static var stairDescentSpeed: SampleType<HKQuantitySample> {
    @inlinable public static var uvExposure: SampleType<HKQuantitySample> {
    @inlinable public static var underwaterDepth: SampleType<HKQuantitySample> {
    @inlinable public static var waterTemperature: SampleType<HKQuantitySample> {
    public init?(_ identifier: HKQuantityTypeIdentifier) where Sample == HKQuantitySample {
    @inlinable public static var appleStandHour: SampleType<HKCategorySample> {
    @inlinable public static var lowCardioFitnessEvent: SampleType<HKCategorySample> {
    @inlinable public static var menstrualFlow: SampleType<HKCategorySample> {
    @inlinable public static var intermenstrualBleeding: SampleType<HKCategorySample> {
    @inlinable public static var infrequentMenstrualCycles: SampleType<HKCategorySample> {
    @inlinable public static var irregularMenstrualCycles: SampleType<HKCategorySample> {
    @inlinable public static var persistentIntermenstrualBleeding: SampleType<HKCategorySample> {
    @inlinable public static var prolongedMenstrualPeriods: SampleType<HKCategorySample> {
    @inlinable public static var cervicalMucusQuality: SampleType<HKCategorySample> {
    @inlinable public static var ovulationTestResult: SampleType<HKCategorySample> {
    @inlinable public static var progesteroneTestResult: SampleType<HKCategorySample> {
    @inlinable public static var sexualActivity: SampleType<HKCategorySample> {
    @inlinable public static var contraceptive: SampleType<HKCategorySample> {
    @inlinable public static var pregnancy: SampleType<HKCategorySample> {
    @inlinable public static var pregnancyTestResult: SampleType<HKCategorySample> {
    @inlinable public static var lactation: SampleType<HKCategorySample> {
    @inlinable public static var environmentalAudioExposureEvent: SampleType<HKCategorySample> {
    @inlinable public static var headphoneAudioExposureEvent: SampleType<HKCategorySample> {
    @inlinable public static var lowHeartRateEvent: SampleType<HKCategorySample> {
    @inlinable public static var highHeartRateEvent: SampleType<HKCategorySample> {
    @inlinable public static var irregularHeartRhythmEvent: SampleType<HKCategorySample> {
    @inlinable public static var appleWalkingSteadinessEvent: SampleType<HKCategorySample> {
    @inlinable public static var mindfulSession: SampleType<HKCategorySample> {
    @inlinable public static var sleepAnalysis: SampleType<HKCategorySample> {
    @inlinable public static var toothbrushingEvent: SampleType<HKCategorySample> {
    @inlinable public static var handwashingEvent: SampleType<HKCategorySample> {
    public init?(_ identifier: HKCategoryTypeIdentifier) where Sample == HKCategorySample {
    @inlinable public static var bloodPressure: SampleType<HKCorrelation> {
    @inlinable public static var food: SampleType<HKCorrelation> {
    public init?(_ identifier: HKCorrelationTypeIdentifier) where Sample == HKCorrelation {

================
File: Sources/SpeziHealthKit/Sample Types/SampleTypes.swift.gyb
================
//
// This source file is part of the Stanford Spezi open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

%{
from typing import Optional

def localeDependentUnit(*, us: str, uk: Optional[str] = None, metric: str) -> str:
    if uk:
        return f'localeDependentUnit(us: {us}, uk: {uk}, metric: {metric})'
    else:
        return f'localeDependentUnit(us: {us}, metric: {metric})'


class SampleType(object):
    def __init__(
        self,
        *,
        identifier: str,
        property_name: Optional[str],
        display_title: str,
        extra_init_params: list[tuple[str, any]] = [],
        doc: str
    ):
        self.identifier = identifier
        self.property_name = property_name or identifier
        self.display_title = display_title
        self.extra_init_params = [(k,v) for k,v in extra_init_params if v is not None]
        self.doc = doc
    
    @staticmethod
    def quantity_type(
        *,
        identifier: str,
        property_name: Optional[str] = None,
        display_title: str,
        display_unit: str,
        expected_values_range: Optional[str] = None,
        doc: str
    ) -> 'Self':
        return SampleType(
            identifier=identifier,
            property_name=property_name,
            display_title=display_title,
            extra_init_params=[
                ('displayUnit', display_unit),
                ('expectedValuesRange', expected_values_range)
            ],
            doc=doc
        )
    
    @staticmethod
    def category_type(
        *,
        identifier: str,
        property_name: Optional[str] = None,
        display_title: str,
        doc: str
    ) -> 'Self':
        return SampleType(
            identifier=identifier,
            property_name=property_name,
            display_title=display_title,
            doc=doc
        )
    
    @staticmethod
    def correlation_type(
        *,
        identifier: str,
        property_name: Optional[str] = None,
        display_title: str,
        associated_quantity_types: list[str],
        doc: str
    ) -> 'Self':
        return SampleType(
            identifier=identifier,
            property_name=property_name,
            display_title=display_title,
            extra_init_params=[
                ('associatedQuantityTypes', '[' + (', '.join(map(lambda t: f'.{t}', associated_quantity_types))) + ']')
            ],
            doc=doc
        )


quantity_types = [
    # Activity
    SampleType.quantity_type(
        identifier='stepCount',
        display_title='Step Count',
        display_unit='.count()',
        doc='A quantity sample type that measures the number of steps the user has taken.'
    ),
    SampleType.quantity_type(
        identifier='distanceWalkingRunning',
        display_title='Walking + Running Distance',
        display_unit=localeDependentUnit(us='.mile()', metric='.meterUnit(with: .kilo)'),
        doc='A quantity sample type that measures the distance the user has moved by walking or running.'
    ),
    SampleType.quantity_type(
        identifier='runningGroundContactTime',
        display_title='Ground Contact Time',
        display_unit='.secondUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of time the runner’s foot is in contact with the ground while running.'
    ),
    SampleType.quantity_type(
        identifier='runningPower',
        display_title='Running Power',
        display_unit='.watt()',
        doc='A quantity sample type that measures the rate of work required for the runner to maintain their speed.'
    ),
    SampleType.quantity_type(
        identifier='runningSpeed',
        display_title='Running Speed',
        display_unit=localeDependentUnit(us='.mile() / .hour()', metric='.meterUnit(with: .kilo) / .hour()'),
        doc='A quantity sample type that measures the runner’s speed.'
    ),
    SampleType.quantity_type(
        identifier='runningStrideLength',
        display_title='Running Stride Length',
        display_unit=localeDependentUnit(us='.foot()', metric='.meter()'),
        doc='A quantity sample type that measures the distance covered by a single step while running.'
    ),
    SampleType.quantity_type(
        identifier='runningVerticalOscillation',
        display_title='Vertical Oscillation',
        display_unit=localeDependentUnit(us='.inch()', metric='.meterUnit(with: .centi)'),
        doc='A quantity sample type measuring pelvis vertical range of motion during a single running stride.'
    ),
    SampleType.quantity_type(
        identifier='distanceCycling',
        display_title='Cycling Distance',
        display_unit=localeDependentUnit(us='.mile()', metric='.meterUnit(with: .kilo)'),
        doc='A quantity sample type that measures the distance the user has moved by cycling.'
    ),
    SampleType.quantity_type(
        identifier='pushCount',
        display_title='Pushes',
        display_unit='.count()',
        doc='A quantity sample type that measures the number of pushes that the user has performed while using a wheelchair.'
    ),
    SampleType.quantity_type(
        identifier='distanceWheelchair',
        display_title='Wheelchair Distance',
        display_unit=localeDependentUnit(us='.mile()', metric='.meterUnit(with: .kilo)'),
        doc='A quantity sample type that measures the distance the user has moved using a wheelchair.'
    ),
    SampleType.quantity_type(
        identifier='swimmingStrokeCount',
        display_title='Swimming Strokes',
        display_unit='.count()',
        doc='A quantity sample type that measures the number of strokes performed while swimming.'
    ),
    SampleType.quantity_type(
        identifier='distanceSwimming',
        display_title='Swimming Distance',
        display_unit=localeDependentUnit(us='.yard()', uk='.yard()', metric='.meter()'),
        doc='A quantity sample type that measures the distance the user has moved while swimming.'
    ),
    SampleType.quantity_type(
        identifier='distanceDownhillSnowSports',
        display_title='Downhill Snow Sports Distance',
        display_unit=localeDependentUnit(us='.mile()', metric='.meterUnit(with: .kilo)'),
        doc='A quantity sample type that measures the distance the user has traveled while skiing or snowboarding.'
    ),
    SampleType.quantity_type(
        identifier='basalEnergyBurned',
        display_title='Resting Energy',
        display_unit='.largeCalorie()',
        doc='A quantity sample type that measures the resting energy burned by the user.'
    ),
    SampleType.quantity_type(
        identifier='activeEnergyBurned',
        display_title='Active Energy',
        display_unit='.largeCalorie()',
        doc='A quantity sample type that measures the amount of active energy the user has burned.'
    ),
    SampleType.quantity_type(
        identifier='flightsClimbed',
        display_title='Flights Climbed',
        display_unit='.count()',
        doc='A quantity sample type that measures the number flights of stairs that the user has climbed.'
    ),
#    SampleType.quantity_type(
#        'nikeFuel',
#        'TITLE',
#        'A quantity sample type that measures the number of NikeFuel points the user has earned.'
#    ),
    SampleType.quantity_type(
        identifier='appleExerciseTime',
        display_title='Exercise Minutes',
        display_unit='.minute()',
        doc='A quantity sample type that measures the amount of time the user spent exercising.'
    ),
    SampleType.quantity_type(
        identifier='appleMoveTime',
        display_title='Move Minutes',
        display_unit='.minute()',
        doc='A quantity sample type that measures the amount of time the user has spent performing activities that involve full-body movements during the specified day.'
    ),
    SampleType.quantity_type(
        identifier='appleStandTime',
        display_title='Stand Hours',
        display_unit='.hour()',
        doc='A quantity sample type that measures the amount of time the user has spent standing.'
    ),
    SampleType.quantity_type(
        identifier='vo2Max',
        display_title='VO₂ max',
        display_unit='.literUnit(with: .milli) / (.gramUnit(with: .kilo) / .minute())',
        doc='A quantity sample that measures the maximal oxygen consumption during exercise.'
    ),
    # Body Measurements
    SampleType.quantity_type(
        identifier='height',
        display_title='Height',
        display_unit=localeDependentUnit(us='.foot()', metric='.meter()'),
        doc='A quantity sample type that measures the user’s height.'
    ),
    SampleType.quantity_type(
        identifier='bodyMass',
        display_title='Body Mass',
        display_unit=localeDependentUnit(us='.pound()', uk='.pound()', metric='.gramUnit(with: .kilo)'),
        doc='A quantity sample type that measures the user’s weight.'
    ),
    SampleType.quantity_type(
        identifier='bodyMassIndex',
        display_title='Body Mass Index',
        display_unit='.count()',
        doc='A quantity sample type that measures the user’s body mass index.'
    ),
    SampleType.quantity_type(
        identifier='leanBodyMass',
        display_title='Lean Body Mass',
        display_unit=localeDependentUnit(us='.pound()', uk='.pound()', metric='.gramUnit(with: .kilo)'),
        doc='A quantity sample type that measures the user’s lean body mass.'
    ),
    SampleType.quantity_type(
        identifier='bodyFatPercentage',
        display_title='Body Fat Percentage',
        display_unit='.percent()',
        doc='A quantity sample type that measures the user’s body fat percentage.'
    ),
    SampleType.quantity_type(
        identifier='waistCircumference',
        display_title='Waist Circumference',
        display_unit=localeDependentUnit(us='.inch()', metric='.meterUnit(with: .centi)'),
        doc='A quantity sample type that measures the user’s waist circumference.'
    ),
    SampleType.quantity_type(
        identifier='appleSleepingWristTemperature',
        display_title='Wrist Temperature',
        display_unit=localeDependentUnit(us='.degreeFahrenheit()', metric='.degreeCelsius()'),
        doc='A quantity sample type that records the wrist temperature during sleep.'
    ),
    # Reproductive Health
    SampleType.quantity_type(
        identifier='basalBodyTemperature',
        display_title='Basal Body Temperature',
        display_unit=localeDependentUnit(us='.degreeFahrenheit()', metric='.degreeCelsius()'),
        doc='A quantity sample type that records the user’s basal body temperature.'
    ),
    # Hearing
    SampleType.quantity_type(
        identifier='environmentalAudioExposure',
        display_title='Environmental Audio Exposure',
        display_unit='.decibelHearingLevel()',
        doc='A quantity sample type that measures audio exposure to sounds in the environment.'
    ),
    SampleType.quantity_type(
        identifier='headphoneAudioExposure',
        display_title='Headphone Audio Exposure',
        display_unit='.decibelHearingLevel()',
        doc='A quantity sample type that measures audio exposure from headphones.'
    ),
    # Vital Signs
    SampleType.quantity_type(
        identifier='heartRate',
        display_title='Heart Rate',
        display_unit='.count() / .minute()',
        expected_values_range='0...175',
        doc='A quantity sample type that measures the user’s heart rate.'
    ),
    SampleType.quantity_type(
        identifier='restingHeartRate',
        display_title='Resting Heart Rate',
        display_unit='.count() / .minute()',
        doc='A quantity sample type that measures the user’s resting heart rate.'
    ),
    SampleType.quantity_type(
        identifier='walkingHeartRateAverage',
        display_title='Walking Heart Rate Average',
        display_unit='.count() / .minute()',
        doc='A quantity sample type that measures the user’s heart rate while walking.'
    ),
    SampleType.quantity_type(
        identifier='heartRateVariabilitySDNN',
        display_title='Heart Rate Variability',
        display_unit='.secondUnit(with: .milli)',
        doc='A quantity sample type that measures the standard deviation of heartbeat intervals.'
    ),
    SampleType.quantity_type(
        identifier='heartRateRecoveryOneMinute',
        display_title='Cardio Recovery',
        display_unit='.count() / .minute()', # might not be the correct unit; docs say count, but the health app seems to use BPM?
        doc='A quantity sample that records the reduction in heart rate from the peak exercise rate to the rate one minute after exercising ended.'
    ),
    SampleType.quantity_type(
        identifier='atrialFibrillationBurden',
        display_title='Atrial Fibrillation',
        display_unit='.percent()',
        doc='A quantity type that measures an estimate of the percentage of time a person’s heart shows signs of atrial fibrillation (AFib) while wearing Apple Watch.'
    ),
    SampleType.quantity_type(
        identifier='oxygenSaturation',
        property_name='bloodOxygen',
        display_title='Blood Oxygen',
        display_unit='.percent()',
        expected_values_range='80...105',
        doc='A quantity sample type that measures the user’s oxygen saturation.'
    ),
    SampleType.quantity_type(
        identifier='bodyTemperature',
        display_title='Body Temperature',
        display_unit=localeDependentUnit(us='.degreeFahrenheit()', metric='.degreeCelsius()'),
        doc='A quantity sample type that measures the user’s body temperature.'
    ),
    SampleType.quantity_type(
        identifier='bloodPressureDiastolic',
        display_title='Blood Pressure (Diastolic)',
        display_unit='.millimeterOfMercury()',
        doc='A quantity sample type that measures the user’s diastolic blood pressure.'
    ),
    SampleType.quantity_type(
        identifier='bloodPressureSystolic',
        display_title='Blood Pressure (Systolic)',
        display_unit='.millimeterOfMercury()',
        doc='A quantity sample type that measures the user’s systolic blood pressure.'
    ),
    SampleType.quantity_type(
        identifier='respiratoryRate',
        display_title='Respiratory Rate',
        display_unit='.count() / .minute()',
        doc='A quantity sample type that measures the user’s respiratory rate.'
    ),

    # Lab and Test Results
    SampleType.quantity_type(
        identifier='bloodGlucose',
        display_title='Blood Glucose',
        display_unit='.gramUnit(with: .milli) / .literUnit(with: .deci)',
        doc='A quantity sample type that measures the user’s blood glucose level.'
    ),
    SampleType.quantity_type(
        identifier='electrodermalActivity',
        display_title='Electrodermal Activity',
        display_unit='.siemenUnit(with: .micro)',
        doc='A quantity sample type that measures electrodermal activity.'
    ),
    SampleType.quantity_type(
        identifier='forcedExpiratoryVolume1',
        display_title='Forced Expiratory Volume, 1 sec',
        display_unit='.liter()',
        doc='A quantity sample type that measures the amount of air that can be forcibly exhaled from the lungs during the first second of a forced exhalation.'
    ),
    SampleType.quantity_type(
        identifier='forcedVitalCapacity',
        display_title='Forced Vital Capacity',
        display_unit='.liter()',
        doc='A quantity sample type that measures the amount of air that can be forcibly exhaled from the lungs after taking the deepest breath possible.'
    ),
    SampleType.quantity_type(
        identifier='inhalerUsage',
        display_title='Inhaler Usage',
        display_unit='.count()',
        doc='A quantity sample type that measures the number of puffs the user takes from their inhaler.'
    ),
    SampleType.quantity_type(
        identifier='insulinDelivery',
        display_title='Insulin Delivery',
        display_unit='.internationalUnit()',
        doc='A quantity sample that measures the amount of insulin delivered.'
    ),
    SampleType.quantity_type(
        identifier='numberOfTimesFallen',
        display_title='Number of Times Fallen',
        display_unit='.count()',
        doc='A quantity sample type that measures the number of times the user fell.'
    ),
    SampleType.quantity_type(
        identifier='peakExpiratoryFlowRate',
        display_title='Peak Expiratory Flow Rate',
        display_unit='.liter() / .minute()',
        doc='A quantity sample type that measures the user’s maximum flow rate generated during a forceful exhalation.'
    ),
    SampleType.quantity_type(
        identifier='peripheralPerfusionIndex',
        display_title='Peripheral Perfusion Index',
        display_unit='.percent()',
        doc='A quantity sample type that measures the user’s peripheral perfusion index.'
    ),

    # Nutrition
    SampleType.quantity_type(
        identifier='dietaryBiotin',
        display_title='Biotin',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of biotin (vitamin B7) consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryCaffeine',
        display_title='Caffeine',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of caffeine consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryCalcium',
        display_title='Calcium',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of calcium consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryCarbohydrates',
        display_title='Carbohydrates',
        display_unit='.gram()',
        doc='A quantity sample type that measures the amount of carbohydrates consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryChloride',
        display_title='Chloride',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of chloride consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryCholesterol',
        display_title='Cholesterol',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of cholesterol consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryChromium',
        display_title='Chromium',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of chromium consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryCopper',
        display_title='Copper',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of copper consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryEnergyConsumed',
        display_title='Dietary Energy Consumed',
        display_unit='.largeCalorie()',
        doc='A quantity sample type that measures the amount of energy consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryFatMonounsaturated',
        display_title='Monounsaturated Fat',
        display_unit='.gram()',
        doc='A quantity sample type that measures the amount of monounsaturated fat consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryFatPolyunsaturated',
        display_title='Polyunsaturated Fat',
        display_unit='.gram()',
        doc='A quantity sample type that measures the amount of polyunsaturated fat consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryFatSaturated',
        display_title='Saturated Fat',
        display_unit='.gram()',
        doc='A quantity sample type that measures the amount of saturated fat consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryFatTotal',
        display_title='Total Fat',
        display_unit='.gram()',
        doc='A quantity sample type that measures the total amount of fat consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryFiber',
        display_title='Fiber',
        display_unit='.gram()',
        doc='A quantity sample type that measures the amount of fiber consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryFolate',
        display_title='Folate',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of folate (folic acid) consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryIodine',
        display_title='Iodine',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of iodine consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryIron',
        display_title='Iron',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of iron consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryMagnesium',
        display_title='Magnesium',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of magnesium consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryManganese',
        display_title='Manganese',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of manganese consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryMolybdenum',
        display_title='Molybdenum',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of molybdenum consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryNiacin',
        display_title='Niacin',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of niacin (vitamin B3) consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryPantothenicAcid',
        display_title='Pantothenic Acid',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of pantothenic acid (vitamin B5) consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryPhosphorus',
        display_title='Phosphorus',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of phosphorus consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryPotassium',
        display_title='Potassium',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of potassium consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryProtein',
        display_title='Protein',
        display_unit='.gram()',
        doc='A quantity sample type that measures the amount of protein consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryRiboflavin',
        display_title='Riboflavin',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of riboflavin (vitamin B2) consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietarySelenium',
        display_title='Selenium',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of selenium consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietarySodium',
        display_title='Sodium',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of sodium consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietarySugar',
        display_title='Sugar',
        display_unit='.gram()',
        doc='A quantity sample type that measures the amount of sugar consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryThiamin',
        display_title='Thiamin',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of thiamin (vitamin B1) consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryVitaminA',
        display_title='Vitamin A',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of vitamin A consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryVitaminB12',
        display_title='Vitamin B12',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of cyanocobalamin (vitamin B12) consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryVitaminB6',
        display_title='Vitamin B6',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of pyridoxine (vitamin B6) consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryVitaminC',
        display_title='Vitamin C',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of vitamin C consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryVitaminD',
        display_title='Vitamin D',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of vitamin D consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryVitaminE',
        display_title='Vitamin E',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of vitamin E consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryVitaminK',
        display_title='Vitamin K',
        display_unit='.gramUnit(with: .micro)',
        doc='A quantity sample type that measures the amount of vitamin K consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryWater',
        display_title='Water',
        display_unit=localeDependentUnit(us='.fluidOunceUS()', metric='.literUnit(with: .milli)'),
        doc='A quantity sample type that measures the amount of water consumed.'
    ),
    SampleType.quantity_type(
        identifier='dietaryZinc',
        display_title='Zinc',
        display_unit='.gramUnit(with: .milli)',
        doc='A quantity sample type that measures the amount of zinc consumed.'
    ),

    # Alcohol Consumption
    SampleType.quantity_type(
        identifier='bloodAlcoholContent',
        display_title="Blood Alcohol Content",
        display_unit='.percent()',
        doc='A quantity sample type that measures the user’s blood alcohol content.'
    ),
    SampleType.quantity_type(
        identifier='numberOfAlcoholicBeverages',
        display_title='Alcohol Consumption', # 'Number of Alcoholic Beverages'?
        display_unit='.count()',
        doc='A quantity sample type that measures the number of standard alcoholic drinks that the user has consumed.'
    ),

    # Mobility
    SampleType.quantity_type(
        identifier='appleWalkingSteadiness',
        display_title='Walking Steadiness',
        display_unit='.percent()',
        doc='A quantity sample type that measures the steadiness of the user’s gait.'
    ),
    SampleType.quantity_type(
        identifier='sixMinuteWalkTestDistance',
        display_title='Six-Minute Walk Distance',
        display_unit='.meter()',
        doc='A quantity sample type that stores the distance a user can walk during a six-minute walk test.'
    ),
    SampleType.quantity_type(
        identifier='walkingSpeed',
        display_title='Walking Speed',
        display_unit=localeDependentUnit(us='.mile() / .hour()', metric='.meterUnit(with: .kilo) / .hour()'),
        doc='A quantity sample type that measures the user’s average speed when walking steadily over flat ground.'
    ),
    SampleType.quantity_type(
        identifier='walkingStepLength',
        display_title='Walking Step Length',
        display_unit=localeDependentUnit(us='.inch()', metric='.meterUnit(with: .centi)'),
        doc='A quantity sample type that measures the average length of the user’s step when walking steadily over flat ground.'
    ),
    SampleType.quantity_type(
        identifier='walkingAsymmetryPercentage',
        display_title='Walking Asymmetry',
        display_unit='.percent()',
        doc='A quantity sample type that measures the percentage of steps in which one foot moves at a different speed than the other when walking on flat ground.'
    ),
    SampleType.quantity_type(
        identifier='walkingDoubleSupportPercentage',
        display_title='Double Support Time',
        display_unit='.percent()',
        doc='A quantity sample type that measures the percentage of time when both of the user’s feet touch the ground while walking steadily over flat ground.'
    ),
    SampleType.quantity_type(
        identifier='stairAscentSpeed',
        display_title='Stair Speed (Up)',
        display_unit=localeDependentUnit(us='.foot() / .second()', metric='.meter() / .second()'),
        doc='A quantity sample type measuring the user’s speed while climbing a flight of stairs.'
    ),
    SampleType.quantity_type(
        identifier='stairDescentSpeed',
        display_title='Stair Speed (Down)',
        display_unit=localeDependentUnit(us='.foot() / .second()', metric='.meter() / .second()'),
        doc='A quantity sample type measuring the user’s speed while descending a flight of stairs.'
    ),

    # UV Exposure
    SampleType.quantity_type(
        identifier='uvExposure',
        display_title='UV Index',
        display_unit='.count()',
        doc='A quantity sample type that measures the user’s exposure to UV radiation.'
    ),

    # Diving
    SampleType.quantity_type(
        identifier='underwaterDepth',
        display_title='Underwater Depth',
        display_unit=localeDependentUnit(us='.foot()', metric='.meter()'),
        doc='A quantity sample that records a person’s depth underwater.'
    ),
    SampleType.quantity_type(
        identifier='waterTemperature',
        display_title='Water Temperature',
        display_unit=localeDependentUnit(us='.degreeFahrenheit()', metric='.degreeCelsius()'),
        doc=' A quantity sample that records the water temperature.'
    )
]


category_types = [
    # Activity
    SampleType.category_type(
        identifier='appleStandHour',
        display_title='Stand Hours',
        doc='A category sample type that counts the number of hours in the day during which the user has stood and moved for at least one minute per hour.'
    ),
    SampleType.category_type(
        identifier='lowCardioFitnessEvent',
        display_title='Low Cardio Fitness Event',
        doc='An event that indicates the user’s VO2 max values consistently fall below a particular aerobic fitness threshold.'
    ),

    # MARK: Reproductive Health
    SampleType.category_type(
        identifier='menstrualFlow',
        display_title='Menstrual Cycles',
        doc='A category sample type that records menstrual cycles.'
    ),
    SampleType.category_type(
        identifier='intermenstrualBleeding',
        display_title='Spotting',
        doc='A category sample type that records spotting outside the normal menstruation period.'
    ),
    SampleType.category_type(
        identifier='infrequentMenstrualCycles',
        display_title='Infrequent Periods',
        doc='A category sample that indicates an infrequent menstrual cycle.'
    ),
    SampleType.category_type(
        identifier='irregularMenstrualCycles',
        display_title='Irregular Cycles',
        doc='A category sample that indicates an irregular menstrual cycle.'
    ),
    SampleType.category_type(
        identifier='persistentIntermenstrualBleeding',
        display_title='Persistent Spotting',
        doc='A category sample that indicates persistent intermenstrual bleeding.'
    ),
    SampleType.category_type(
        identifier='prolongedMenstrualPeriods',
        display_title='Prolonged Periods',
        doc='A category sample that indicates a prolonged menstrual cycle.'
    ),
    SampleType.category_type(
        identifier='cervicalMucusQuality',
        display_title='Cervical Mucus Quality',
        doc='A category sample type that records the quality of the user’s cervical mucus.'
    ),
    SampleType.category_type(
        identifier='ovulationTestResult',
        display_title='Ovulation Test Result',
        doc='A category sample type that records the result of an ovulation home test.'
    ),
    SampleType.category_type(
        identifier='progesteroneTestResult',
        display_title='Progesterone Test Result',
        doc='A category type that represents the results from a home progesterone test.'
    ),
    SampleType.category_type(
        identifier='sexualActivity',
        display_title='Sexual Activity',
        doc='A category sample type that records sexual activity.'
    ),
    SampleType.category_type(
        identifier='contraceptive',
        display_title='Contraceptives',
        doc='A category sample type that records the use of contraceptives.'
    ),
    SampleType.category_type(
        identifier='pregnancy',
        display_title='Pregnancy',
        doc='A category type that records pregnancy.'
    ),
    SampleType.category_type(
        identifier='pregnancyTestResult',
        display_title='Pregnancy Test Result',
        doc='A category type that represents the results from a home pregnancy test.'
    ),
    SampleType.category_type(
        identifier='lactation',
        display_title='Lactation',
        doc='A category type that records lactation.'
    ),

    # Hearing
    SampleType.category_type(
        identifier='environmentalAudioExposureEvent',
        display_title='Environmental Audio Exposure Event',
        doc='A category sample type that records exposure to potentially damaging sounds from the environment.'
    ),
    SampleType.category_type(
        identifier='headphoneAudioExposureEvent',
        display_title='Headphone Audio Exposure Event',
        doc='A category sample type that records exposure to potentially damaging sounds from headphones.'
    ),

    # Vital Signs
    SampleType.category_type(
        identifier='lowHeartRateEvent',
        display_title='Low Heart Rate Event',
        doc='A category sample type for low heart rate events.'
    ),
    SampleType.category_type(
        identifier='highHeartRateEvent',
        display_title='High Heart Rate Event',
        doc='A category sample type for high heart rate events.'
    ),
    SampleType.category_type(
        identifier='irregularHeartRhythmEvent',
        display_title='Irregular Heart Rythm Event',
        doc='A category sample type for irregular heart rhythm events.'
    ),


    # Mobility
    SampleType.category_type(
        identifier='appleWalkingSteadinessEvent',
        display_title='Walking Steadiness Event',
        doc='A category sample type that records an incident where the user showed a reduced score for their gait’s steadiness.'
    ),

    # Mindfulness and Sleep

    SampleType.category_type(
        identifier='mindfulSession',
        display_title='Mindful Session',
        doc='A category sample type for recording a mindful session.'
    ),
    SampleType.category_type(
        identifier='sleepAnalysis',
        display_title='Sleep Analysis',
        doc='A category sample type for sleep analysis information.'
    ),
    
    # Self Care
    SampleType.category_type(
        identifier='toothbrushingEvent',
        display_title='Toothbrushing Event',
        doc='A category sample type for toothbrushing events.'
    ),
    SampleType.category_type(
        identifier='handwashingEvent',
        display_title='Handwashing Event',
        doc='A category sample type for handwashing events.'
    )
]


correlation_types = [
    SampleType.correlation_type(
        identifier='bloodPressure',
        display_title='Blood Pressure',
        doc='The sample type representing blood pressure correlation samples',
        associated_quantity_types=['bloodPressureDiastolic', 'bloodPressureSystolic']
    ),
    SampleType.correlation_type(
        identifier='food',
        display_title='Food',
        doc='Food correlation types combine any number of nutritional samples into a single food object.',
        associated_quantity_types=[
            # As defined [here](https://developer.apple.com/documentation/healthkit/data_types/nutrition_type_identifiers)
            # Macronutrients
            'dietaryEnergyConsumed',
            'dietaryCarbohydrates',
            'dietaryFiber',
            'dietarySugar',
            'dietaryFatTotal',
            'dietaryFatMonounsaturated',
            'dietaryFatPolyunsaturated',
            'dietaryFatSaturated',
            'dietaryCholesterol',
            'dietaryProtein',
            # Vitamins
            'dietaryVitaminA',
            'dietaryThiamin',
            'dietaryRiboflavin',
            'dietaryNiacin',
            'dietaryPantothenicAcid',
            'dietaryVitaminB6',
            'dietaryBiotin',
            'dietaryVitaminB12',
            'dietaryVitaminC',
            'dietaryVitaminD',
            'dietaryVitaminE',
            'dietaryVitaminK',
            'dietaryFolate',
            # Minerals
            'dietaryCalcium',
            'dietaryChloride',
            'dietaryIron',
            'dietaryMagnesium',
            'dietaryPhosphorus',
            'dietaryPotassium',
            'dietarySodium',
            'dietaryZinc',
            # Hydration
            'dietaryWater',
            # Caffeination
            'dietaryCaffeine',
            # Ultratrace Minerals
            'dietaryChromium',
            'dietaryCopper',
            'dietaryIodine',
            'dietaryManganese',
            'dietaryMolybdenum',
            'dietarySelenium'
        ]
    )
]


gen_inputs = [
    ('Quantity', 'HKQuantitySample', 'quantity', quantity_types),
    ('Category', 'HKCategorySample', 'category', category_types),
    ('Correlation', 'HKCorrelation', 'correlation', correlation_types)
]
}%

// NOTE: This file was automatically generated and should not be edited.
// swiftlint:disable all

import HealthKit


/// Selects one of the specified units, based on the current locale.
@inlinable func localeDependentUnit(
    us: @autoclosure () -> HKUnit,
    uk: @autoclosure () -> HKUnit? = nil,
    metric: @autoclosure () -> HKUnit
) -> HKUnit {
    switch Locale.current.measurementSystem {
    case .us: us()
    case .uk: uk() ?? metric()
    case .metric: metric()
    default: metric()
    }
}


% for (display_title, hk_class, ctor, types) in gen_inputs:

// MARK: ${display_title} Types

extension SampleType where Sample == ${hk_class} {
% for ty in types:
    /// ${ty.doc}
    @inlinable public static var ${ty.property_name}: SampleType<${hk_class}> {
        .${ctor}(
            .${ty.identifier},
            displayTitle: "${ty.display_title}"${',' if len(ty.extra_init_params) > 0 else ''}
        % for idx, (key, value) in enumerate(ty.extra_init_params):
            ${key}: ${value}${',' if idx < len(ty.extra_init_params) - 1 else ''}
        % end
        )
    }

% end

    /// Returns the shared ${display_title} type for the specified identifier.
    public init?(_ identifier: HK${display_title}TypeIdentifier) where Sample == ${hk_class} {
        switch identifier {
        % for ty in types:
        case .${ty.identifier}:
            self = .${ty.property_name}
        % end
        default:
            return nil
        }
    }
}
% end

================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/ModuleConfiguration.md
================
# HealthKit Module Configuration

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Configure Spezi's HealthKit module to work with your app

## Configuration Components

Your app uses ``HealthKitConfigurationComponent``s to configure the ``HealthKit-swift.class`` module for use in your app.
Each configuration component defines which HealthKit data types it needs access to, and is given the opportunity to register additional
Configuration components are processed in the order in which they are defined.

There are several built-in configuration components you can use in your app:
- ``CollectSample``: Set up background delivery of HealthKit samples to your app's `Standard`
- ``RequestReadAccess``: Define which HealthKit sample types your app requires read-access to
- ``RequestWriteAccess``: Define which HealthKit sample types your app requires write-access to

In addition to these, you can use the ``HealthKitConfigurationComponent`` protocol to define your own components and integrate then with the `HealthKit` module.


### Example
This example uses the ``HealthKit-swift.class`` module to collect step count samples, and request read access to some additional sample types.

```swift
HealthKit {
    CollectSample(.stepCount)
    CollectSample(.heartRate, continueInBackground: true)
    RequestReadAccess(quantity: [.heartRate, .bloodOxygen])
}
```


## Health Data Access Authorization

iOS apps require user consent in order to access Health data stored on the device.
The `HealthKit` module manages this for Spezi applications: the module builds up the set of Health data access requirements of all configuration components, and keep track of the app's current Health data access requirements. 

Your app should, at some point during its launch call ``HealthKit-swift.class/askForAuthorization()``.
This will ask the user to grant the app access to all HealthKit data types requested by the configuration components.
You can choose the timing of this call in a way that best suits your app: for example, during your app's first launch you might want to integrate the Health permission request into a dedicated onboarding step.


## Topics

### HealthKit module
- ``HealthKit-class``
- ``HealthKitConstraint``

### Module Configuration

- ``HealthKitConfigurationComponent``
- ``HealthKit-swift.class/DataAccessRequirements``
- ``RequestReadAccess``
- ``RequestWriteAccess``

================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/SampleType.md
================
# ``SampleType``

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Work with HealthKit data types.

## Overview

The `SampleType` struct enables easy access to the various types of data supported by HealthKit, in a type-safe manner.

`SampleType` is generic over the sample type's respective `HKSample` subclass.
For example, the sample type representing heart rate samples (``SampleType/heartRate``) will fetch quantity samples, and is therefore a `SampleType<HKQuantitySample>`. 

> Note: `SampleType` already defines extensions for many HealthKit data types. It is strongly recommended you use these, whenever possible.


## Topics

### Accessing information about a SampleType
- ``SampleType/hkSampleType``
- ``SampleType/displayTitle``
- ``SampleType/displayUnit-1rnhb``
- ``SampleType/expectedValuesRange``

### Well-known quantity types
- <doc:SampleType+QuantityTypes>

### Well-known correlation types
- ``SampleType/bloodPressure``
- ``SampleType/food``

### Well-known category types
- <doc:SampleType+CategoryTypes>

### Other sample types
- ``SampleType/audiogram``
- ``SampleType/electrocardiogram``

### Creating new SampleTypes
- ``SampleType/quantity(_:displayTitle:displayUnit:expectedValuesRange:)``
- ``SampleType/correlation(_:displayTitle:associatedQuantityTypes:)``
- ``SampleType/category(_:displayTitle:)``


### AnySampleType

The ``AnySampleType`` protocol allows ``SampleType``s to be used in a type-erased manner.

================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/SampleType+CategoryTypes.md
================
# SampleType+CategoryTypes

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Well-known category sample types


## Topics

### Activity
- ``SampleType/appleStandHour``
- ``SampleType/lowCardioFitnessEvent``

### Reproductive Health
- ``SampleType/menstrualFlow``
- ``SampleType/intermenstrualBleeding``
- ``SampleType/infrequentMenstrualCycles``
- ``SampleType/irregularMenstrualCycles``
- ``SampleType/persistentIntermenstrualBleeding``
- ``SampleType/prolongedMenstrualPeriods``
- ``SampleType/cervicalMucusQuality``
- ``SampleType/ovulationTestResult``
- ``SampleType/progesteroneTestResult``
- ``SampleType/sexualActivity``
- ``SampleType/contraceptive``
- ``SampleType/pregnancy``
- ``SampleType/pregnancyTestResult``
- ``SampleType/lactation``

### Hearing
- ``SampleType/environmentalAudioExposureEvent``
- ``SampleType/headphoneAudioExposureEvent``

### Vital Signs
- ``SampleType/lowHeartRateEvent``
- ``SampleType/highHeartRateEvent``
- ``SampleType/irregularHeartRhythmEvent``

### Mobility
- ``SampleType/appleWalkingSteadinessEvent``

### Mindfulness and Sleep
- ``SampleType/mindfulSession``
- ``SampleType/sleepAnalysis``

### Self Care
- ``SampleType/toothbrushingEvent``
- ``SampleType/handwashingEvent``

================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/SampleType+QuantityTypes.md
================
# SampleType+QuantityTypes

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Well-known quantity sample types


## Topics

### Activity
- ``SampleType/stepCount``
- ``SampleType/distanceWalkingRunning``
- ``SampleType/runningGroundContactTime``
- ``SampleType/runningPower``
- ``SampleType/runningSpeed``
- ``SampleType/runningStrideLength``
- ``SampleType/runningVerticalOscillation``
- ``SampleType/distanceCycling``
- ``SampleType/pushCount``
- ``SampleType/distanceWheelchair``
- ``SampleType/swimmingStrokeCount``
- ``SampleType/distanceSwimming``
- ``SampleType/distanceDownhillSnowSports``
- ``SampleType/basalEnergyBurned``
- ``SampleType/activeEnergyBurned``
- ``SampleType/flightsClimbed``
- ``SampleType/appleExerciseTime``
- ``SampleType/appleMoveTime``
- ``SampleType/appleStandTime``
- ``SampleType/vo2Max``

### Body Measurements
- ``SampleType/height``
- ``SampleType/bodyMass``
- ``SampleType/bodyMassIndex``
- ``SampleType/leanBodyMass``
- ``SampleType/bodyFatPercentage``
- ``SampleType/waistCircumference``
- ``SampleType/appleSleepingWristTemperature``

### Reproductive Health
- ``SampleType/basalBodyTemperature``

### Hearing
- ``SampleType/environmentalAudioExposure``
- ``SampleType/headphoneAudioExposure``

### Vital Signs
- ``SampleType/heartRate``
- ``SampleType/restingHeartRate``
- ``SampleType/walkingHeartRateAverage``
- ``SampleType/heartRateVariabilitySDNN``
- ``SampleType/heartRateRecoveryOneMinute``
- ``SampleType/atrialFibrillationBurden``
- ``SampleType/bloodOxygen``
- ``SampleType/bodyTemperature``
- ``SampleType/bloodPressureDiastolic``
- ``SampleType/bloodPressureSystolic``
- ``SampleType/respiratoryRate``

### Lab Results
- ``SampleType/bloodGlucose``
- ``SampleType/electrodermalActivity``
- ``SampleType/forcedExpiratoryVolume1``
- ``SampleType/forcedVitalCapacity``
- ``SampleType/inhalerUsage``
- ``SampleType/insulinDelivery``
- ``SampleType/numberOfTimesFallen``
- ``SampleType/peakExpiratoryFlowRate``
- ``SampleType/peripheralPerfusionIndex``

### Nutrition
- ``SampleType/dietaryBiotin``
- ``SampleType/dietaryCaffeine``
- ``SampleType/dietaryCalcium``
- ``SampleType/dietaryCarbohydrates``
- ``SampleType/dietaryChloride``
- ``SampleType/dietaryCholesterol``
- ``SampleType/dietaryChromium``
- ``SampleType/dietaryCopper``
- ``SampleType/dietaryEnergyConsumed``
- ``SampleType/dietaryFatMonounsaturated``
- ``SampleType/dietaryFatPolyunsaturated``
- ``SampleType/dietaryFatSaturated``
- ``SampleType/dietaryFatTotal``
- ``SampleType/dietaryFiber``
- ``SampleType/dietaryFolate``
- ``SampleType/dietaryIodine``
- ``SampleType/dietaryIron``
- ``SampleType/dietaryMagnesium``
- ``SampleType/dietaryManganese``
- ``SampleType/dietaryMolybdenum``
- ``SampleType/dietaryNiacin``
- ``SampleType/dietaryPantothenicAcid``
- ``SampleType/dietaryPhosphorus``
- ``SampleType/dietaryPotassium``
- ``SampleType/dietaryProtein``
- ``SampleType/dietaryRiboflavin``
- ``SampleType/dietarySelenium``
- ``SampleType/dietarySodium``
- ``SampleType/dietarySugar``
- ``SampleType/dietaryThiamin``
- ``SampleType/dietaryVitaminA``
- ``SampleType/dietaryVitaminB12``
- ``SampleType/dietaryVitaminB6``
- ``SampleType/dietaryVitaminC``
- ``SampleType/dietaryVitaminD``
- ``SampleType/dietaryVitaminE``
- ``SampleType/dietaryVitaminK``
- ``SampleType/dietaryWater``
- ``SampleType/dietaryZinc``

### Alcohol Consumption
- ``SampleType/bloodAlcoholContent``
- ``SampleType/numberOfAlcoholicBeverages``       

### Mobility
- ``SampleType/appleWalkingSteadiness``
- ``SampleType/sixMinuteWalkTestDistance``
- ``SampleType/walkingSpeed``
- ``SampleType/walkingStepLength``
- ``SampleType/walkingAsymmetryPercentage``
- ``SampleType/walkingDoubleSupportPercentage``
- ``SampleType/stairAscentSpeed``
- ``SampleType/stairDescentSpeed``

### UV Exposure
- ``SampleType/uvExposure``

### Diving
- ``SampleType/underwaterDepth``
- ``SampleType/waterTemperature``

================
File: Sources/SpeziHealthKit/SpeziHealthKit.docc/SpeziHealthKit.md
================
# ``SpeziHealthKit``

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Access Health data in your Spezi app.

## Overview

The Spezi HealthKit module enables apps to integrate with Apple's HealthKit system, fetch data, set up long-lived background data collection, and visualize Health-related data.

### Setup

You need to add the Spezi HealthKit Swift package to
 [your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) or
 [Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> Important: If your application is not yet configured to use Spezi, follow the
 [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) and set up the core Spezi infrastructure. 

### Example

Before you configure the ``HealthKit-class`` module, make sure your `Standard` in your Spezi Application conforms to the ``HealthKitConstraint`` protocol to receive HealthKit data.
The ``HealthKitConstraint/add(sample:)`` function is called once for every newly collected HealthKit sample, and the ``HealthKitConstraint/remove(sample:)`` function is called once for every deleted HealthKit sample.
```swift
actor ExampleStandard: Standard, HealthKitConstraint {
    // Add the newly collected HKSample to your application.
    func add(sample: HKSample) async {
        // ...
    }

    // Remove the deleted HKSample from your application.
    func remove(sample: HKDeletedObject) {
        // ...
    }
}
```


Then, you can configure the ``HealthKit-class`` module in the configuration section of your `SpeziAppDelegate`.
You can, e.g., use ``CollectSample`` to collect a wide variety of HealthKit data types:
```swift
class ExampleAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration(standard: ExampleStandard()) {
            HealthKit {
                CollectSample(.activeEnergyBurned)
                CollectSample(.stepCount, start: .manual)
                CollectSample(.pushCount, start: .manual)
                CollectSample(.heartRate, continueInBackground: true)
                CollectSample(.electrocardiogram, start: .manual)
                RequestReadAccess(quantity: [.bloodOxygen])
            }
        }
    }
}
```

> Tip: See ``SampleType`` for a complete list of supported sample types.

> Important: In order to be able to read Health data, your app's `Info.plist` file must include the `NSHealthShareUsageDescription` key.

## Topics

### Module
- <doc:ModuleConfiguration>

### Health Data Collection
- ``CollectSample``
- ``HealthDataCollector``
- ``HealthDataCollectorDeliverySetting``

### HealthKit Sample Types
- ``SampleType``
- ``AnySampleType``

### HealthKit Utilities
- ``HealthKit/HKUnit/*(_:_:)``
- ``HealthKit/HKUnit//(_:_:)``

================
File: Sources/SpeziHealthKit/Well Known Type Identifiers/CategoryTypeIdentifiers.swift
================
    public static let allKnownCategories: Set<HKCategoryType> = Set(HKCategoryTypeIdentifier.allKnownIdentifiers.map { HKCategoryType($0) })
    public static let allKnownIdentifiers = Set<Self> { // swiftlint:disable:this closure_body_length

================
File: Sources/SpeziHealthKit/Well Known Type Identifiers/CharacteristicTypeIdentifiers.swift
================
    public static let allKnownCharacteristics: Set<HKCharacteristicType> = Set(
    public static let allKnownIdentifiers: Set<Self> = [

================
File: Sources/SpeziHealthKit/Well Known Type Identifiers/CorrelationTypeIdentifiers.swift
================
    public static let allKnownCorrelations: Set<HKCorrelationType> = Set(
    public static let allKnownIdentifiers: Set<Self> = [
    public var knownAssociatedSampleTypes: Set<HKQuantityType> {

================
File: Sources/SpeziHealthKit/Well Known Type Identifiers/KnownObjectTypes.swift
================
    public static let allKnownObjectTypes: Set<HKObjectType> =

================
File: Sources/SpeziHealthKit/Well Known Type Identifiers/QuantityTypeIdentifiers.swift
================
    public static let allKnownQuantities: Set<HKQuantityType> = Set(HKQuantityTypeIdentifier.allKnownIdentifiers.map { HKQuantityType($0) })
    public static let allKnownIdentifiers = Set<Self> { // swiftlint:disable:this closure_body_length

================
File: Sources/SpeziHealthKit/Export.swift
================


================
File: Sources/SpeziHealthKit/HealthKit.swift
================
public final class HealthKit: Module, EnvironmentAccessible, DefaultInitializable, @unchecked Sendable {
    public enum ConfigState: Hashable, Sendable {
    private var standard: any HealthKitConstraint
    var logger
    private var localStorage
    public let healthStore: HKHealthStore
    public let _initialConfigDataAccessRequirements: DataAccessRequirements // swiftlint:disable:this identifier_name
    private(set) var dataAccessRequirements: DataAccessRequirements = .init()
    public private(set) var isFullyAuthorized: Bool = false
    @ObservationIgnored public private(set) var configurationState: ConfigState = .pending
    @ObservationIgnored private var pendingConfiguration: [any HealthKitConfigurationComponent] = []
    @ObservationIgnored /* private-but-testable */ private(set) var registeredDataCollectors: [any HealthDataCollector] = []
    public init(
    public convenience init() {
    public func configure() {
    public func askForAuthorization() async throws {
    public func askForAuthorization(for accessRequirements: DataAccessRequirements) async throws {
    public func didAskForAuthorization(toRead sampleType: SampleType<some Any>) async -> Bool {
    public func didAskForAuthorization(toRead objectType: HKObjectType) async -> Bool {
    public func didAskForAuthorization(toRead sampleTypes: [any AnySampleType]) async -> Bool {
    public func didAskForAuthorization(toRead objectTypes: Set<HKObjectType>) async -> Bool {
            let status = try await healthStore.statusForAuthorizationRequest(toShare: [], read: objectTypes)
    public func didAskForAuthorization(toWrite sampleType: SampleType<some Any>) -> Bool {
    public func didAskForAuthorization(toWrite objectType: HKObjectType) -> Bool {
    public func isAuthorized(toWrite sampleType: SampleType<some Any>) -> Bool {
    public func isAuthorized(toWrite objectType: HKObjectType) -> Bool {
    private func updateIsFullyAuthorized(for dataAccessRequirements: DataAccessRequirements) async {
    var queryAnchors: SampleTypeScopedLocalStorage<HKQueryAnchor> {
    var sampleCollectorPredicateStartDates: SampleTypeScopedLocalStorage<Date> {
    public func addHealthDataCollector(_ collectSample: CollectSample<some Any>) async {
    public func addHealthDataCollector(_ newCollector: any HealthDataCollector) async {
        enum Action {
        let action: Action = { () -> Action in
            let oldCollector = exchange(&registeredDataCollectors[index], with: newCollector)
    private func startAutomaticDataCollectionIfPossible(_ collector: some HealthDataCollector) async {
    public func triggerDataSourceCollection() async {

================
File: Sources/SpeziHealthKit/HealthKitConstraint.swift
================
public protocol HealthKitConstraint: Standard {

================
File: Sources/SpeziHealthKit/SampleTypeScopedLocalStorage.swift
================
private enum LocalStorageKeysHandling {
    private struct DictKey: Hashable {
        let valueType: String
        let sampleType: String
        init(valueType: (some Any).Type, sampleType: SampleType<some Any>) {
    private static let lock = NSLock()
    nonisolated(unsafe) private static var localStorageKeys: [DictKey: Any] = [:]
    static func localStorageKey<Value>(
            let dictKey = DictKey(valueType: valueType, sampleType: sampleType)
                let key = makeKey()
struct SampleTypeScopedLocalStorage<Value> {
    private let localStorage: LocalStorage
    private let makeStorageKey: @Sendable (any AnySampleType) -> LocalStorageKey<Value>
    private init(
    init(
    private func storageKey(for sampleType: SampleType<some Any>) -> LocalStorageKey<Value> {
    subscript(sampleType: SampleType<some Any>) -> Value? {

================
File: Sources/SpeziHealthKitUI/HealthChart/HealthChart.swift
================
public struct HealthChart: View {
    let entries: [any HealthChartEntryProtocol]
    let timeInterval: TimeInterval
    @Environment(\.locale) private var locale
    @Environment(\.timeZone) private var timeZone
    @Environment(\.calendar) private var calendar
    public var body: some View {
    private var chart: some View {
            var mapping: [(String, Color)] = []
            let valuesRange = { () -> ClosedRange<Double>? in
                var range: ClosedRange<Double>?
    private var chartContent: AnyChartContent {
        var blocks: [AnyChartContent] = []
        var content = AnyChartContent(erasing: ChartContentBuilder.buildBlock())
    public init(
        let entries = entry()
                var retval: TimeInterval = 0
                    let entryInterval = entry.resultsTimeRange.range.upperBound.distance(to: entry.resultsTimeRange.range.lowerBound)
    private func makeChartContent(for entry: any HealthChartEntryProtocol) -> some ChartContent {
        let name = entry.resultsSampleType.displayTitle
            let xVal: PlottableValue = .value("Date", dataPoint.date)
            let yVal: PlottableValue = .value(name, dataPoint.value * (entry.resultsSampleType == SampleType<HKQuantitySample>.bloodOxygen ? 100 : 1))
    private struct XAxisMarksConfig {
        let strideComponent: Calendar.Component
        let strideCount: Int
        let valueFormat: Date.FormatStyle
    private func xAxisContent() -> some AxisContent {
            let locale = self.locale
            let timeZone = self.timeZone
            let calendar = self.calendar
    private func maxTimeRange() -> HealthKitQueryTimeRange? {
        var maxTimeRange: HealthKitQueryTimeRange?
    private func xAxisMarksConfig(for maxTimeRange: HealthKitQueryTimeRange) -> XAxisMarksConfig? {
        let duration = maxTimeRange.duration
    public enum TimeIntervalInput {
        public static var hour: Self { .custom(TimeConstants.hour) }
        public static var day: Self { .custom(TimeConstants.day) }
        public static var week: Self { .custom(TimeConstants.week) }
        public static var month: Self { .custom(TimeConstants.month) }
        public static var year: Self { .custom(TimeConstants.year) }
        public static func range(_ range: ClosedRange<Date>) -> Self {
    func timeZone(_ timeZone: TimeZone) -> Self {
        var style = self
    func calendar(_ calendar: Calendar) -> Self {

================
File: Sources/SpeziHealthKitUI/HealthChart/HealthChartDataPoint.swift
================
public struct HealthChartDataPoint: Hashable, Identifiable { // swiftlint:disable:this file_types_order
    public let id: AnyHashable
    public let date: Date
    public let value: Double
    public let unit: HKUnit
    public init(id: some Hashable, date: Date, value: Double, unit: HKUnit) {
    public init(sample: HKQuantitySample, unit: HKUnit) {
    public init?(statistics: HKStatistics, aggregationOption: StatisticsAggregationOption, unit: HKUnit) {
        let value: Double?
    public var stringValue: String {
        let fmt = NumberFormatter()
public enum StatisticsAggregationOption: Sendable {
        let suggestedAggStyle = sampleType.hkSampleType.aggregationStyle

================
File: Sources/SpeziHealthKitUI/HealthChart/HealthChartEntry.swift
================
public struct HealthChartDrawingConfig: Sendable {
    public enum Mode: Sendable {
    let mode: Mode
    let color: Color
    public init(mode: Mode, color: Color) {
public protocol HealthChartEntryProtocol: Sendable {
public struct HealthChartEntry<Results: HealthKitQueryResults>: Sendable {
    private enum Variant: Sendable {
    private let variant: Variant
    private var results: Results {
    private var makeDataPointImp: MakeDataPointImp {
    private init(variant: Variant) {
    public init(
    static func makeEmpty() -> Self {
    public var drawingConfig: HealthChartDrawingConfig {
    public var resultsTimeRange: HealthKitQueryTimeRange {
    public var resultsSampleType: any AnySampleType {
    public var resultsDataPoints: [HealthChartDataPoint] {
        let results = self.results
    public var isEmpty: Bool {

================
File: Sources/SpeziHealthKitUI/HealthChart/Utils.swift
================
struct SomeChartContent<Body: ChartContent>: ChartContent { // swiftlint:disable:this file_types_order
    private let content: () -> Body
    var body: some ChartContent {
    init(@ChartContentBuilder _ content: @escaping () -> Body) {
enum TimeConstants {
    static let minute: TimeInterval = 60
    static let hour = 60 * minute
    static let day = 24 * hour
    static let week = 7 * day
    static let month = 31 * day
    static let year = 365 * day
    @inlinable public init<S: Sequence>(_ seq: S) where S.Element == (Key, Value) {
        let initFn = unsafeBitCast(Self.init(dictionaryLiteral:), to: (([S.Element]) -> Self).self)
    var middle: Date {
        let diff = upperBound.timeIntervalSinceReferenceDate - lowerBound.timeIntervalSinceReferenceDate
    func transforming(@ViewBuilder _ transform: (Self) -> some View) -> some View {

================
File: Sources/SpeziHealthKitUI/Queries/HealthKitCharacteristicsQuery.swift
================
public struct HealthKitCharacteristicQuery<Characteristic: HealthKitCharacteristicProtocol>: DynamicProperty {
    @Environment(HealthKit.self) private var healthKit
    private let characteristic: Characteristic
    public var wrappedValue: Characteristic.Value? {
    public init(_ characteristic: Characteristic) {

================
File: Sources/SpeziHealthKitUI/Queries/HealthKitQuery.swift
================
public struct HealthKitQuery<Sample: _HKSampleWithSampleType>: DynamicProperty { // swiftlint:disable:this file_types_order
    private let input: SamplesQueryResults<Sample>.Input
    private var healthKit
    private var results = SamplesQueryResults<Sample>()
    public var wrappedValue: OrderedArray<Sample> {
    public var projectedValue: SamplesQueryResults<Sample> {
    public init(
    public nonisolated func update() {
public final class SamplesQueryResults<Sample: _HKSampleWithSampleType>: @unchecked Sendable {
    struct Input: Hashable, @unchecked Sendable {
        let sampleType: SampleType<Sample>
        let timeRange: HealthKitQueryTimeRange
        let filterPredicate: NSPredicate?
    private var healthStore: HKHealthStore! // swiftlint:disable:this implicitly_unwrapped_optional
    private var input: Input?
    private var queryTask: Task<Void, Never>?
    public private(set) var isCurrentlyPerformingInitialFetch: Bool = false
    public private(set) var queryError: (any Error)?
    fileprivate private(set) var samples = OrderedArray<Sample> { lhs, rhs in
    fileprivate init() {}
    fileprivate func initializeSwiftUIManagedQuery(healthStore: HKHealthStore, input: Input) {
    private func startQuery() {
            let predicate = HKSamplePredicate<Sample>.sample(
                    let preds = [
            let query = HKAnchoredObjectQueryDescriptor(
                let updates = query.results(for: healthStore)
                    nonisolated(unsafe) let update = update
                        var samples = self.samples
                        let deletedUUIDs = update.deletedObjects.mapIntoSet { $0.uuid }
    deinit {
    public var count: Int {
    public var startIndex: Index {
    public var endIndex: Index {
    public var sampleType: SampleType<Sample> {
    public var timeRange: HealthKitQueryTimeRange {
    public subscript(position: Index) -> Element {

================
File: Sources/SpeziHealthKitUI/Queries/HealthKitQueryResults.swift
================
public protocol HealthKitQueryResults<Sample, Element>: Observable, RandomAccessCollection, Sendable where Element: Identifiable {

================
File: Sources/SpeziHealthKitUI/Queries/HealthKitQueryTimeRange.swift
================
public struct HealthKitQueryTimeRange: Sendable {
    public let range: ClosedRange<Date>
    public var predicate: NSPredicate {
    public var duration: TimeInterval {
    public init(_ range: ClosedRange<Date>) {
    public init(_ range: Range<Date>) {
    public func hash(into hasher: inout Hasher) {
    public static var currentHour: Self {
    public static var today: Self {
    public static var currentWeek: Self {
    public static var currentMonth: Self {
    public static var currentYear: Self {
    public static var ever: Self {
    public static func last(hours: Int) -> Self {
    public static func last(days: Int) -> Self {
    public static func last(weeks: Int) -> Self {
    public static func last(months: Int) -> Self {
    public static func last(years: Int) -> Self {
    private static func lastXImp(
        let cal = Calendar.current
        let startDate = tryUnwrap(
        let endDate = tryUnwrap(
    private static func tryUnwrap<T>(_ value: T?, _ message: String) -> T {

================
File: Sources/SpeziHealthKitUI/Queries/HealthKitStatisticsQuery.swift
================
public struct HealthKitStatisticsQuery: DynamicProperty { // swiftlint:disable:this file_types_order
    public enum CumulativeAggregationOption: Hashable {
        fileprivate var hkStatisticsOption: HKStatisticsOptions {
    public enum DiscreteAggregationOption: Hashable {
    public struct AggregationInterval: Hashable, Sendable {
        fileprivate let intervalComponents: DateComponents
        public init(_ components: DateComponents) {
        public static let hour = Self(.init(hour: 1))
        public static let day = Self(.init(day: 1))
        public static let week = Self(.init(day: 7))
        public static let month = Self(.init(month: 1))
        public static let year = Self(.init(year: 1))
    @Environment(HealthKit.self) private var healthKit
    @State private var results = StatisticsQueryResults()
    private let input: StatisticsQueryResults.Input
    public var wrappedValue: [HKStatistics] {
    public var projectedValue: StatisticsQueryResults {
    private init(
    public nonisolated func update() {
    public init(
public final class StatisticsQueryResults: @unchecked Sendable {
    public enum QueryError: Error {
    struct Input: Hashable, @unchecked Sendable {
        let sampleType: SampleType<HKQuantitySample>
        let options: HKStatisticsOptions
        let aggInterval: HealthKitStatisticsQuery.AggregationInterval
        let timeRange: HealthKitQueryTimeRange
        let filterPredicate: NSPredicate?
    fileprivate var healthStore: HKHealthStore! // swiftlint:disable:this implicitly_unwrapped_optional
    @ObservationIgnored private var input: Input?
    @ObservationIgnored private var task: Task<Void, Never>?
    public private(set) var isCurrentlyPerformingInitialFetch: Bool = false
    public private(set) var queryError: (any Error)?
    fileprivate private(set) var statistics: [HKStatistics] = []
    fileprivate init() {}
    fileprivate func initializeSwiftUIManagedQuery(healthStore: HKHealthStore, input: Input) {
    private func startQuery() {
        let sampleType = input.sampleType.hkSampleType
        var predicate = input.timeRange.predicate
        let queryDesc = HKStatisticsCollectionQueryDescriptor(
                let results = try catchingNSException {
                    let statistics = update.statisticsCollection.statistics()
    deinit {
    public var startIndex: Int {
    public var endIndex: Int {
    public var count: Int {
    public var sampleType: SampleType<HKQuantitySample> {
    public var timeRange: HealthKitQueryTimeRange {
    public subscript(position: Int) -> HKStatistics {

================
File: Sources/SpeziHealthKitUI/SpeziHealthKitUI.docc/HealthChart.md
================
# ``HealthChart``

<!--
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

Visualize queried Health data using a chart.

## Overview

Health samples obtained via a ``HealthKitQuery`` or statistics obtained via a ``HealthKitStatisticsQuery`` can be visualized using the `HealthChart`.

A ``HealthChart`` is populated via the ``HealthChartEntry`` type.
Each entry in a chart manages one data set which should be displayed.
Typically, you probably will want to display only a single [`SampleType`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/sampletype) in a chart

### Example: Visualising Blood Oxygen Samples

Use the ``HealthKitQuery`` and ``HealthKitStatisticsQuery`` property wrappers to fetch Health data for a [`SampleType`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/sampletype) within your view.
You then use the property wrapper's `projectedValue` to populate the chart with 

```swift
@HealthKitQuery(.bloodOxygen, timeRange: .week)
var bloodOxygenSamples

var body: some View {
    HealthChart {
        HealthChartEntry($bloodOxygenSamples, drawingConfig: .init(mode: .line, color: .blue))
    }
}
```

## Topics

### Creating a HealthChart
- ``HealthChart/init(timeInterval:_:)``

### Supporting Types
- ``HealthChartEntry``
- ``HealthChart/ContentBuilder``
- ``HealthChartDataPoint``
- ``HealthChart/TimeIntervalInput``
- ``StatisticsAggregationOption``
- ``HealthChartDrawingConfig``

================
File: Sources/SpeziHealthKitUI/SpeziHealthKitUI.docc/SpeziHealthKitUI.md
================
# ``SpeziHealthKitUI``

<!--
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#       
-->

Visualize Health data in your app


## Overview

Use SpeziHealthKitUI's ``HealthChart`` to visualize health data queried via [`SpeziHealthKit`](https://swiftpackageindex.com/StanfordSpezi/SpeziHealthKit/documentation/SpeziHealthKit)

## Topics

### Querying Health Data in SwiftUI
- ``HealthKitQuery``
- ``HealthKitStatisticsQuery``
- ``HealthKitQueryTimeRange``
- ``HealthKitQueryResults``
- ``HealthKitCharacteristicQuery``

### Visualizing Queried Health Data
- ``HealthChart``

### ``HealthChart``

================
File: Tests/SpeziHealthKitTests/HealthChartTests.swift
================
final class HealthChartTests: XCTestCase {
    func testSimpleHealthChartView() throws {
        var heartRateSamplesProvider = FakeSamplesProvider(
        let results = MockQueryResults(sampleType: .heartRate, timeRange: .currentWeek, samples: try heartRateSamplesProvider.makeSamples(12 * 7))
        let healthChart = HealthChart {
    func testMultiEntryHealthChartView() throws {
        var bloodOxygenSamplesProvider = FakeSamplesProvider(
        let heartRateResults = MockQueryResults(
        let blooxOxygenResults = MockQueryResults(
    func testEmptyHealthChartNoEntries() {
    func testEmptyHealthChartEntriesButNoData() throws {
        let data = MockQueryResults(sampleType: .heartRate, timeRange: .currentWeek, samples: [])
    func testConditionalHealthChartContent() throws {
        func makeHealthChart(flag: Bool) -> some View {
        let healthChart1 = makeHealthChart(flag: true)
        let healthChart2 = makeHealthChart(flag: false)

================
File: Tests/SpeziHealthKitTests/HealthDataCollectorRegistrationTests.swift
================
private actor TestStandard: Standard, HealthKitConstraint {
    func add(sample: HKSample) async {}
    func remove(sample: HKDeletedObject) async {}
final class HealthDataCollectorRegistrationTests: XCTestCase {
    func testCollectSamplesRegistration() async throws {
        let healthKit = HealthKit {
        var erasedCollectors: [AnyObject] = healthKit.registeredDataCollectors

================
File: Tests/SpeziHealthKitTests/LoopingIterator.swift
================
public struct LoopingCollectionIterator<Base: Collection>: IteratorProtocol {
    private let base: Base
    private var idx: Base.Index
    fileprivate init(_ base: Base) {
    public mutating func next() -> Element? {
    public mutating func reset() {
    public func makeLoopingIterator() -> LoopingCollectionIterator<Self> {

================
File: Tests/SpeziHealthKitTests/MockQueryResults.swift
================
final class MockQueryResults: HealthKitQueryResults, @unchecked Sendable { // swiftlint:disable:this file_types_order
    let sampleType: SampleType<Sample>
    let timeRange: HealthKitQueryTimeRange
    var samples: [Sample]
    let isCurrentlyPerformingInitialFetch: Bool = false
    let queryError: (any Error)? = nil
    var startIndex: Index { samples.startIndex }
    var endIndex: Index { samples.endIndex }
    init(sampleType: SampleType<Sample>, timeRange: HealthKitQueryTimeRange, samples: [Sample]) {
    subscript(position: Index) -> HKQuantitySample {
struct FakeSamplesProvider<Values: IteratorProtocol<Double>, Dates: IteratorProtocol<Date>> {
    private let sampleType: SampleType<HKQuantitySample>
    private var valueProvider: Values
    private var dateProvider: Dates
    init(sampleType: SampleType<HKQuantitySample>, values: Values, dateProvider: Dates) {
    mutating func skipValues(_ count: Int) {
    mutating func skipDates(_ count: Int) {
    mutating func makeSamples(_ count: Int) throws -> [HKQuantitySample] {
func makeDateProvider(
    let cal = Calendar.current.withLocale(.enUS, timeZone: .losAngeles)
    let startDate = try XCTUnwrap(cal.date(from: startDate))
    convenience init(type: SampleType<HKQuantitySample>, quantity: HKQuantity, date: Date) {
    mutating func consume(_ count: Int) {
        var numConsumed = 0

================
File: Tests/SpeziHealthKitTests/SpeziHealthKitTests.swift
================
final class SpeziHealthKitTests: XCTestCase {
    func testTimeRanges() {
    func testWellKnownIdentifiers() {
    func testAssociatedSampleTypes() {

================
File: Tests/SpeziHealthKitTests/Utils.swift
================
    static let enUS = Locale(identifier: "en_US")
    static let losAngeles = TimeZone(identifier: "America/Los_Angeles")! // swiftlint:disable:this force_unwrapping
    func withLocale(_ locale: Locale, timeZone: TimeZone) -> Calendar {
        var cal = self
    func withLocale(_ locale: Locale, timeZone: TimeZone) -> some View {
        var cal = Calendar.current

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
File: Tests/UITests/TestApp/HealthKitTestsView/CharacteristicsView.swift
================
struct CharacteristicsView: View {
    private var moveMode
    private var bloodType
    private var dateOfBirth
    private var biologicalSex
    private var skinType
    private var wheelchairUse
    var body: some View {
    private func makeRow(_ title: String, value: (some RawRepresentable<Int>)?) -> some View {

================
File: Tests/UITests/TestApp/HealthKitTestsView/HealthKitTestsView.swift
================
struct HealthKitTestsView: View {
    @Environment(HealthKit.self) var healthKit
    @Environment(FakeHealthStore.self) var fakeHealthStore
    @State private var allInitialSampleTypesAreAuthorized = false
    @State private var viewState: ViewState = .idle
    private var bloodOxygenSamples
    var body: some View {
                    let start = ContinuousClock.now
    private var addTestDataToolbarItem: some View {
        let testData: [TestDataDefinition] = [
    private func checkInitialSamplesAuthStatus() async {
        let reqs = healthKit._initialConfigDataAccessRequirements
        let readFullyAuthd = await reqs.read.allSatisfy { @MainActor type in
        let writeFullyAuthd = reqs.write.allSatisfy { type in
    private func makeRow(for logEntry: BackgroundDataCollectionLogEntry) -> some View {
                        let start = date.lowerBound.formatted(date: .abbreviated, time: .shortened)
                        let endUsesOnlyTime = date.upperBound.timeIntervalSince(date.lowerBound) < 60 * 60 * 24
                        let end = date.upperBound.formatted(date: endUsesOnlyTime ? .omitted : .abbreviated, time: .shortened)
    private func addTestData(_ definitions: [TestDataDefinition]) async throws {
        let samples: [HKQuantitySample] = definitions.flatMap { definition in
                let date = sampleInput.date
    private func deleteTestData() async throws {
            let descriptor = HKSampleQueryDescriptor(
                let samples = (try? await descriptor.result(for: healthKit.healthStore)) ?? []
    var displayTitle: String {

================
File: Tests/UITests/TestApp/HealthKitTestsView/SamplesQueryView.swift
================
struct SamplesQueryView: View {
    @Environment(HealthKit.self) private var healthKit
    private var stepSamples
    private var heartRateSamples
    private var bloodOxygenSamples
    var body: some View {
    private func makeSection(

================
File: Tests/UITests/TestApp/HealthKitTestsView/StatisticsQueryView.swift
================
struct StatisticsQueryView: View {
    @Environment(HealthKit.self) private var healthKit
    private var heartRateSamples
    private var dailyStepCountStats
    private var hourlyHeartRateState
    var body: some View {
    var middle: Date {

================
File: Tests/UITests/TestApp/HealthKitTestsView/TestSampleDefinition.swift
================
struct TestDataDefinition: Hashable {
    let sampleType: SampleType<HKQuantitySample>
    let samples: [Sample]
    struct Sample: Hashable {
        let date: Date
        let duration: TimeInterval
        let value: Double
        let unit: HKUnit
        init(date: Date, duration: TimeInterval = 0, value: Double, unit: HKUnit) { // swiftlint:disable:this function_default_parameter_at_end
        init(

================
File: Tests/UITests/TestApp/BackgroundPersistence.swift
================
enum BackgroundDataCollectionLogEntry: Codable, Hashable, Identifiable {
    var id: UUID {

================
File: Tests/UITests/TestApp/FakeHealthStore.swift
================
final class FakeHealthStore: Module, DefaultInitializable, EnvironmentAccessible, @unchecked Sendable {
    private enum StorageKeys {
        static let backgroundPersistance = "edu.Stanford.Spezi.SpeziHealthKitHealthKitStore.backgroundPersistance"
    static let collectedSamplesOnly = CommandLine.arguments.contains("--collectedSamplesOnly")
    private let logger = Logger(subsystem: "TestApp", category: "ExampleStandard")
    private(set) var samples: [HKSample] = []
    private(set) var backgroundPersistance: [BackgroundDataCollectionLogEntry] {
                let data = try! JSONEncoder().encode(backgroundPersistance) // swiftlint:disable:this force_try
    required init() {
            let data = UserDefaults.standard.data(forKey: StorageKeys.backgroundPersistance) ?? Data()
    func configure() {
    func add(sample: HKSample) async {
        let content = UNMutableNotificationContent()
        let request = UNNotificationRequest(identifier: UUID().uuidString, content: content, trigger: nil)
    func remove(sample: HKDeletedObject) async {

================
File: Tests/UITests/TestApp/HealthKitTestAppStandard.swift
================
actor HealthKitTestAppStandard: Standard, HealthKitConstraint {
    @Dependency(FakeHealthStore.self) private var fakeHealthStore
    func add(sample: HKSample) async {
    func remove(sample: HKDeletedObject) async {

================
File: Tests/UITests/TestApp/TestApp.entitlements
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.developer.healthkit</key>
	<true/>
	<key>com.apple.developer.healthkit.access</key>
	<array/>
	<key>com.apple.developer.healthkit.background-delivery</key>
	<true/>
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
    @UIApplicationDelegateAdaptor(TestAppDelegate.self) var appDelegate
    var body: some Scene {

================
File: Tests/UITests/TestApp/TestAppDelegate.swift
================
class TestAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {

================
File: Tests/UITests/TestApp/Utils.swift
================
    func allSatisfy(_ predicate: @Sendable (Element) async -> Bool) async -> Bool {

================
File: Tests/UITests/TestAppUITests/SpeziHealthKitTests.swift
================
final class HealthKitTests: XCTestCase {
    override func tearDown() {
            let app = XCUIApplication(launchArguments: ["--collectedSamplesOnly"])
    func testCollectSamples() throws {
    func testRepeatedHealthKitAuthorization() throws {
        let expectation = XCTNSPredicateExpectation(
    func testHealthKitQuery() throws {
    func testHealthKitStatisticsQuery() throws {
        let now = Calendar.current.dateComponents([.year, .month, .day], from: .now)
        let fmt = { String(format: "%02d", $0) }
        let todayPred = NSPredicate(
    func testCharacteristicsQuery() throws {
        func assertTableRow(_ title: String, _ value: String, file: StaticString = #filePath, line: UInt = #line) {
            let predicate = NSPredicate(format: "label MATCHES %@", "\(title).*\(value)")
    private func launchAndHandleInitialStuff(_ app: XCUIApplication) throws {
    private func addSample(_ sampleType: SampleType<HKQuantitySample>, in app: XCUIApplication) throws {
        let menuButton = app.navigationBars.images["plus"]
        let addSampleButton = app.buttons["Add Sample: \(sampleType.displayTitle)"]
    private func triggerDataCollection(in app: XCUIApplication) {
    private func assertCollectedSamplesSinceLaunch(
        func imp(try: Int) {
            let staticTexts = app.staticTexts.count > 0
            let actual = staticTexts
            let expected = Dictionary(uniqueKeysWithValues: expectedNumSamplesBySampleType.map { ($0.hkSampleType.identifier, $1) })
    convenience init(launchArguments: [String]) {

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
   LastUpgradeVersion = "1530"
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
               BlueprintIdentifier = "SpeziHealthKit"
               BuildableName = "SpeziHealthKit"
               BlueprintName = "SpeziHealthKit"
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
      <CommandLineArguments>
         <CommandLineArgument
            argument = "--collectedSamplesOnly"
            isEnabled = "NO">
         </CommandLineArgument>
      </CommandLineArguments>
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
	objectVersion = 70;
	objects = {

/* Begin PBXBuildFile section */
		2F61BDC329DD02D600D71D33 /* SpeziHealthKit in Frameworks */ = {isa = PBXBuildFile; productRef = 2F61BDC229DD02D600D71D33 /* SpeziHealthKit */; };
		2F6D139A28F5F386007C25D6 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 2F6D139928F5F386007C25D6 /* Assets.xcassets */; };
		2F85826E29E776690021D637 /* SpeziHealthKitTests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F85826D29E776690021D637 /* SpeziHealthKitTests.swift */; };
		2F85827329E776AC0021D637 /* TestAppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F85827229E776AC0021D637 /* TestAppDelegate.swift */; };
		2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA7382B290ADFAA007ACEB9 /* TestApp.swift */; };
		2FE33CB42B9B802200BD886D /* FakeHealthStore.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FE33CB32B9B802200BD886D /* FakeHealthStore.swift */; };
		2FE33CB92B9B815B00BD886D /* SpeziViews in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE33CB82B9B815B00BD886D /* SpeziViews */; };
		390F29612A785A98000A236E /* HealthKitTestAppStandard.swift in Sources */ = {isa = PBXBuildFile; fileRef = 390F29602A785A98000A236E /* HealthKitTestAppStandard.swift */; };
		8059BF032D464B2E007CDAFD /* XCTHealthKit in Frameworks */ = {isa = PBXBuildFile; productRef = 8059BF022D464B2E007CDAFD /* XCTHealthKit */; };
		8059BF0B2D4699CB007CDAFD /* XCTHealthKit in Frameworks */ = {isa = PBXBuildFile; productRef = 8059BF0A2D4699CB007CDAFD /* XCTHealthKit */; };
		808EB0282D452800009D9AB2 /* SpeziHealthKitUI in Frameworks */ = {isa = PBXBuildFile; productRef = 808EB0272D452800009D9AB2 /* SpeziHealthKitUI */; };
		80ABDD0D2D47D4C100231ADF /* XCTHealthKit in Frameworks */ = {isa = PBXBuildFile; productRef = 80ABDD0C2D47D4C100231ADF /* XCTHealthKit */; };
		80BDC0BA2D417897007A5B68 /* SpeziHealthKit in Frameworks */ = {isa = PBXBuildFile; productRef = 80BDC0B92D417897007A5B68 /* SpeziHealthKit */; };
		80E2C9902D424CA400A5D177 /* Utils.swift in Sources */ = {isa = PBXBuildFile; fileRef = 80E2C98F2D424CA400A5D177 /* Utils.swift */; };
		80E2C9942D4253D900A5D177 /* BackgroundPersistence.swift in Sources */ = {isa = PBXBuildFile; fileRef = 80E2C9932D4253D900A5D177 /* BackgroundPersistence.swift */; };
		80E3C19D2D371B8B00A1F6A3 /* XCTHealthKit in Frameworks */ = {isa = PBXBuildFile; productRef = 80E3C19C2D371B8B00A1F6A3 /* XCTHealthKit */; };
		80E3C1DE2D382EDA00A1F6A3 /* XCTestExtensions in Frameworks */ = {isa = PBXBuildFile; productRef = 80E3C1DD2D382EDA00A1F6A3 /* XCTestExtensions */; };
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
		2F61BDC129DD023E00D71D33 /* SpeziHealthKit */ = {isa = PBXFileReference; lastKnownFileType = wrapper; name = SpeziHealthKit; path = ../..; sourceTree = "<group>"; };
		2F6D139228F5F384007C25D6 /* TestApp.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = TestApp.app; sourceTree = BUILT_PRODUCTS_DIR; };
		2F6D139928F5F386007C25D6 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		2F6D13AC28F5F386007C25D6 /* TestAppUITests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = TestAppUITests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		2F85826D29E776690021D637 /* SpeziHealthKitTests.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = SpeziHealthKitTests.swift; sourceTree = "<group>"; };
		2F85827229E776AC0021D637 /* TestAppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TestAppDelegate.swift; sourceTree = "<group>"; };
		2FA7382B290ADFAA007ACEB9 /* TestApp.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TestApp.swift; sourceTree = "<group>"; };
		2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */ = {isa = PBXFileReference; lastKnownFileType = text; path = TestApp.xctestplan; sourceTree = "<group>"; };
		2FE33CB32B9B802200BD886D /* FakeHealthStore.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = FakeHealthStore.swift; sourceTree = "<group>"; };
		2FE33CBA2B9B8A0200BD886D /* TestApp.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = TestApp.entitlements; sourceTree = "<group>"; };
		390F29602A785A98000A236E /* HealthKitTestAppStandard.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = HealthKitTestAppStandard.swift; sourceTree = "<group>"; };
		80E2C98F2D424CA400A5D177 /* Utils.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = Utils.swift; sourceTree = "<group>"; };
		80E2C9932D4253D900A5D177 /* BackgroundPersistence.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = BackgroundPersistence.swift; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFileSystemSynchronizedRootGroup section */
		80E2C98E2D424C8F00A5D177 /* HealthKitTestsView */ = {isa = PBXFileSystemSynchronizedRootGroup; explicitFileTypes = {}; explicitFolders = (); path = HealthKitTestsView; sourceTree = "<group>"; };
/* End PBXFileSystemSynchronizedRootGroup section */

/* Begin PBXFrameworksBuildPhase section */
		2F6D138F28F5F384007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				808EB0282D452800009D9AB2 /* SpeziHealthKitUI in Frameworks */,
				2F61BDC329DD02D600D71D33 /* SpeziHealthKit in Frameworks */,
				2FE33CB92B9B815B00BD886D /* SpeziViews in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A928F5F386007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				80E3C19D2D371B8B00A1F6A3 /* XCTHealthKit in Frameworks */,
				8059BF032D464B2E007CDAFD /* XCTHealthKit in Frameworks */,
				80BDC0BA2D417897007A5B68 /* SpeziHealthKit in Frameworks */,
				8059BF0B2D4699CB007CDAFD /* XCTHealthKit in Frameworks */,
				80E3C1DE2D382EDA00A1F6A3 /* XCTestExtensions in Frameworks */,
				80ABDD0D2D47D4C100231ADF /* XCTHealthKit in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		2F6D138928F5F384007C25D6 = {
			isa = PBXGroup;
			children = (
				2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */,
				2F61BDC129DD023E00D71D33 /* SpeziHealthKit */,
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
				2FE33CBA2B9B8A0200BD886D /* TestApp.entitlements */,
				2FA7382B290ADFAA007ACEB9 /* TestApp.swift */,
				2F85827229E776AC0021D637 /* TestAppDelegate.swift */,
				390F29602A785A98000A236E /* HealthKitTestAppStandard.swift */,
				2FE33CB32B9B802200BD886D /* FakeHealthStore.swift */,
				80E2C9932D4253D900A5D177 /* BackgroundPersistence.swift */,
				80E2C98F2D424CA400A5D177 /* Utils.swift */,
				80E2C98E2D424C8F00A5D177 /* HealthKitTestsView */,
				2F6D139928F5F386007C25D6 /* Assets.xcassets */,
			);
			path = TestApp;
			sourceTree = "<group>";
		};
		2F6D13AF28F5F386007C25D6 /* TestAppUITests */ = {
			isa = PBXGroup;
			children = (
				2F85826D29E776690021D637 /* SpeziHealthKitTests.swift */,
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
				390F295F2A78596E000A236E /* ShellScript */,
			);
			buildRules = (
			);
			dependencies = (
			);
			fileSystemSynchronizedGroups = (
				80E2C98E2D424C8F00A5D177 /* HealthKitTestsView */,
			);
			name = TestApp;
			packageProductDependencies = (
				2F61BDC229DD02D600D71D33 /* SpeziHealthKit */,
				2FE33CB82B9B815B00BD886D /* SpeziViews */,
				808EB0272D452800009D9AB2 /* SpeziHealthKitUI */,
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
				80E3C19C2D371B8B00A1F6A3 /* XCTHealthKit */,
				80E3C1DD2D382EDA00A1F6A3 /* XCTestExtensions */,
				80BDC0B92D417897007A5B68 /* SpeziHealthKit */,
				8059BF022D464B2E007CDAFD /* XCTHealthKit */,
				8059BF0A2D4699CB007CDAFD /* XCTHealthKit */,
				80ABDD0C2D47D4C100231ADF /* XCTHealthKit */,
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
				LastUpgradeCheck = 1530;
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
			compatibilityVersion = "Xcode 14.0";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = 2F6D138928F5F384007C25D6;
			packageReferences = (
				2FE33CB72B9B815B00BD886D /* XCRemoteSwiftPackageReference "SpeziViews" */,
				8042D7962D3D5B8F00807498 /* XCRemoteSwiftPackageReference "XCTestExtensions" */,
				80ABDD0B2D47D4C100231ADF /* XCRemoteSwiftPackageReference "XCTHealthKit" */,
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
		390F295F2A78596E000A236E /* ShellScript */ = {
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
			shellScript = "export PATH=\"$PATH:/opt/homebrew/bin\"\nif which swiftlint > /dev/null; then\n  cd ../../ && swiftlint\nelse\n  echo \"warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint\"\nfi\n";
		};
/* End PBXShellScriptBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		2F6D138E28F5F384007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2FE33CB42B9B802200BD886D /* FakeHealthStore.swift in Sources */,
				2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */,
				390F29612A785A98000A236E /* HealthKitTestAppStandard.swift in Sources */,
				2F85827329E776AC0021D637 /* TestAppDelegate.swift in Sources */,
				80E2C9942D4253D900A5D177 /* BackgroundPersistence.swift in Sources */,
				80E2C9902D424CA400A5D177 /* Utils.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A828F5F386007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2F85826E29E776690021D637 /* SpeziHealthKitTests.swift in Sources */,
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
				CODE_SIGN_IDENTITY = "Apple Development";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = 637867499T;
				ENABLE_PREVIEWS = YES;
				ENABLE_TESTING_SEARCH_PATHS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_KEY_NSHealthShareUsageDescription = "The TestApp accesses your HealthKit data to run the tests.";
				INFOPLIST_KEY_NSHealthUpdateUsageDescription = "The TestApp writes test samples to your HealthKit database to have testing data. There is a mechanism for deleting this (and only this!!!) data.";
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
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.healthkit.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE_SPECIFIER = "";
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = "$(inherited)";
				TARGETED_DEVICE_FAMILY = "1,2";
			};
			name = Debug;
		};
		2F6D13B828F5F386007C25D6 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = TestApp/TestApp.entitlements;
				CODE_SIGN_IDENTITY = "Apple Development";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = 637867499T;
				ENABLE_PREVIEWS = YES;
				ENABLE_TESTING_SEARCH_PATHS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_KEY_NSHealthShareUsageDescription = "The TestApp accesses your HealthKit data to run the tests.";
				INFOPLIST_KEY_NSHealthUpdateUsageDescription = "The TestApp writes test samples to your HealthKit database to have testing data. There is a mechanism for deleting this (and only this!!!) data.";
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
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.healthkit.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE_SPECIFIER = "";
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = "$(inherited)";
				TARGETED_DEVICE_FAMILY = "1,2";
			};
			name = Release;
		};
		2F6D13BD28F5F386007C25D6 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES = YES;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.healthkit.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_VERSION = "$(inherited)";
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_TARGET_NAME = TestApp;
			};
			name = Debug;
		};
		2F6D13BE28F5F386007C25D6 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES = YES;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = "";
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.healthkit.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_VERSION = "$(inherited)";
				TARGETED_DEVICE_FAMILY = "1,2";
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
				SWIFT_VERSION = 6.0;
			};
			name = Test;
		};
		2FB07588299DDB6000C0B37F /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_ENTITLEMENTS = TestApp/TestApp.entitlements;
				CODE_SIGN_IDENTITY = "Apple Development";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = 637867499T;
				ENABLE_PREVIEWS = YES;
				ENABLE_TESTING_SEARCH_PATHS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_KEY_NSHealthShareUsageDescription = "The TestApp accesses your HealthKit data to run the tests.";
				INFOPLIST_KEY_NSHealthUpdateUsageDescription = "The TestApp writes test samples to your HealthKit database to have testing data. There is a mechanism for deleting this (and only this!!!) data.";
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
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.healthkit.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE_SPECIFIER = "";
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = "$(inherited)";
				TARGETED_DEVICE_FAMILY = "1,2";
			};
			name = Test;
		};
		2FB07589299DDB6000C0B37F /* Test */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES = YES;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_TEAM = 637867499T;
				GENERATE_INFOPLIST_FILE = YES;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.healthkit.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_VERSION = "$(inherited)";
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
		2FE33CB72B9B815B00BD886D /* XCRemoteSwiftPackageReference "SpeziViews" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziViews.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.3.1;
			};
		};
		8042D7962D3D5B8F00807498 /* XCRemoteSwiftPackageReference "XCTestExtensions" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTestExtensions";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.1.1;
			};
		};
		80ABDD0B2D47D4C100231ADF /* XCRemoteSwiftPackageReference "XCTHealthKit" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTHealthKit";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.1.1;
			};
		};
/* End XCRemoteSwiftPackageReference section */

/* Begin XCSwiftPackageProductDependency section */
		2F61BDC229DD02D600D71D33 /* SpeziHealthKit */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziHealthKit;
		};
		2FE33CB82B9B815B00BD886D /* SpeziViews */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE33CB72B9B815B00BD886D /* XCRemoteSwiftPackageReference "SpeziViews" */;
			productName = SpeziViews;
		};
		8059BF022D464B2E007CDAFD /* XCTHealthKit */ = {
			isa = XCSwiftPackageProductDependency;
			productName = XCTHealthKit;
		};
		8059BF0A2D4699CB007CDAFD /* XCTHealthKit */ = {
			isa = XCSwiftPackageProductDependency;
			productName = XCTHealthKit;
		};
		808EB0272D452800009D9AB2 /* SpeziHealthKitUI */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziHealthKitUI;
		};
		80ABDD0C2D47D4C100231ADF /* XCTHealthKit */ = {
			isa = XCSwiftPackageProductDependency;
			package = 80ABDD0B2D47D4C100231ADF /* XCRemoteSwiftPackageReference "XCTHealthKit" */;
			productName = XCTHealthKit;
		};
		80BDC0B92D417897007A5B68 /* SpeziHealthKit */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziHealthKit;
		};
		80E3C19C2D371B8B00A1F6A3 /* XCTHealthKit */ = {
			isa = XCSwiftPackageProductDependency;
			productName = XCTHealthKit;
		};
		80E3C1DD2D382EDA00A1F6A3 /* XCTestExtensions */ = {
			isa = XCSwiftPackageProductDependency;
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
    "commandLineArgumentEntries" : [
      {
        "argument" : "-AppleLocale",
        "enabled" : false
      },
      {
        "argument" : "en_US",
        "enabled" : false
      }
    ],
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
      - SpeziHealthKit
      - SpeziHealthKitUI

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
- family-names: "Bauer"
  given-names: "Andreas"
  orcid: "https://orcid.org/0000-0002-1680-237X"
- family-names: "Zagar"
  given-names: "Philipp"
  orcid: "https://orcid.org/0009-0001-5934-2078"
- family-names: "Kehoe"
  given-names: "Niall"
- family-names: "Sun"
  given-names: "Yuren"
- family-names: "Ravi"
  given-names: "Vishnu"
  orcid: "https://orcid.org/0000-0003-0359-1275"
- family-names: "Aalami"
  given-names: "Oliver"
  orcid: "https://orcid.org/0000-0002-7799-2429"
title: "SpeziHealthKit"
doi: 10.5281/zenodo.7824636
url: "https://github.com/StanfordSpezi/SpeziHealthKit"

================
File: codecov.yml
================
#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
# 

ignore:
  - "Sources/SpeziHealthKit/Sample Types/SampleTypes.swift"

================
File: CONTRIBUTORS.md
================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

SpeziHealthKit contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Andreas Bauer](https://github.com/Supereg)
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

# Spezi HealthKit

[![Build and Test](https://github.com/StanfordSpezi/SpeziHealthKit/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziHealthKit/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziHealthKit/branch/main/graph/badge.svg?token=GSed8tVeou)](https://codecov.io/gh/StanfordSpezi/SpeziHealthKit)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7824636.svg)](https://doi.org/10.5281/zenodo.7824636)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziHealthKit%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziHealthKit)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziHealthKit%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziHealthKit)

Access Health data in your Spezi app.

## Overview

The Spezi HealthKit module enables apps to integrate with Apple's HealthKit system, fetch data, set up long-lived background data collection, and visualize Health-related data.

### Setup

You need to add the Spezi HealthKit Swift package to
[your app in Xcode](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app) or
[Swift package](https://developer.apple.com/documentation/xcode/creating-a-standalone-swift-package-with-xcode#Add-a-dependency-on-another-Swift-package).

> [!IMPORTANT]  
> If your application is not yet configured to use Spezi, follow the [Spezi setup article](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/initial-setup) to set up the core Spezi infrastructure.


### Health Data Collection

Before you configure the [`HealthKit`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkit-swift.class)  module, make sure your `Standard` in your Spezi Application conforms to the [`HealthKitConstraint`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkitconstraint) protocol to receive HealthKit data.
The [`HealthKitConstraint/add(sample:)`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkitconstraint/add(sample:)) function is called once for every newly collected HealthKit sample, and the [`HealthKitConstraint/remove(sample:)`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkitconstraint/remove(sample:)) function is called once for every deleted HealthKit sample.
```swift
actor ExampleStandard: Standard, HealthKitConstraint {
    // Add the newly collected HKSample to your application.
    func add(sample: HKSample) async {
        // ...
    }

    // Remove the deleted HKSample from your application.
    func remove(sample: HKDeletedObject) {
        // ...
    }
}
```


Then, you can configure the [`HealthKit`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/healthkit-swift.class) module in the configuration section of your `SpeziAppDelegate`.
You can, e.g., use [`CollectSample`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/collectsample) to collect a wide variety of HealthKit data types:
```swift
class ExampleAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {
        Configuration(standard: ExampleStandard()) {
            HealthKit {
                CollectSample(.activeEnergyBurned)
                CollectSample(.stepCount, start: .manual)
                CollectSample(.pushCount, start: .manual)
                CollectSample(.heartRate, continueInBackground: true)
                CollectSample(.electrocardiogram, start: .manual)
                RequestReadAccess(quantity: [.bloodOxygen])
            }
        }
    }
}
```

> [!TIP]
> See [`SampleType`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit/sampletype) for a complete list of supported sample types.


### Querying Health Data in SwiftUI

You can use [`SpeziHealthKitUI`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui)'s [`HealthKitQuery`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui/healthkitquery) and [`HealthKitStatisticsQuery`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui/healthkitstatisticsquery) property wrappers to access the Health database in a View:
```swift
struct ExampleView: View {
    @HealthKitQuery(.heartRate, timeRange: .today)
    private var heartRateSamples

    var body: some View {
        ForEach(heartRateSamples) { sample in
            // ...
        }
    }
}
```

Additionally, you can use [`SpeziHealthKitUI`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui)'s [`HealthChart`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkitui/healthchart) to visualise query results:
```swift
struct ExampleView: View {
    @HealthKitQuery(.heartRate, timeRange: .today)
    private var heartRateSamples

    var body: some View {
        HealthChart {
            HealthChartEntry($heartRateSamples, drawingConfig: .init(mode: .line, color: .red))
        }
    }
}
```


For more information, please refer to the [API documentation](https://swiftpackageindex.com/StanfordSpezi/SpeziHealthKit/documentation).

## The Spezi Template Application

The [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication) provides a great starting point and example using the [`SpeziHealthKit`](https://swiftpackageindex.com/stanfordspezi/spezihealthkit/documentation/spezihealthkit) module.


## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.


## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziHealthKit/tree/main/LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterLight.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterDark.png#gh-dark-mode-only)

================
File: useGYB
================
#!/bin/sh

#
# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT
#

find Sources -name '*.gyb' | \
    while read file; do \
        gyb --line-directive '' -o "${file%.gyb}" "$file"; \
    done



================================================================
End of Codebase
================================================================
