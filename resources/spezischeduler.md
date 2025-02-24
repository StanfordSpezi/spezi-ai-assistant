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
  SpeziScheduler/
    Notifications/
      BackgroundMode.swift
      BGTaskSchedulerErrorCode+Description.swift
      LegacyTaskModel.swift
      NotificationScenePhaseScheduling.swift
      NotificationThread.swift
      NotificationTime.swift
      PermittedBackgroundTaskIdentifier.swift
      Schedule+Notifications.swift
      SchedulerNotifications.swift
      SchedulerNotifications+Strings.swift
      SchedulerNotificationsConstraint.swift
      Task+Notifications.swift
      TaskNextOccurrenceCache.swift
    Schedule/
      Date+Extensions.swift
      Duration+Extensions.swift
      Occurence.swift
      Schedule.swift
      Schedule+Duration.swift
      Weekday+Ordinal.swift
    SpeziScheduler.docc/
      SpeziScheduler.md
    Task/
      AllowedCompletionPolicy.swift
      Event.swift
      Outcome.swift
      Task.swift
      Task+Category.swift
      Task+LocalizedStringResource.swift
    UserInfo/
      OutcomeStorageKey.swift
      Property.swift
      TaskStorageKey.swift
      UserInfoKey.swift
      UserInfoStorage.swift
      UserStorageCoding.swift
    Utils/
      Measure.swift
    EventQuery.swift
    Scheduler.swift
  SpeziSchedulerMacros/
    SpeziSchedulerDiagnostic.swift
    SpeziSchedulerMacros.swift
    UserStorageEntryMacro.swift
  SpeziSchedulerUI/
    Category/
      DisableCategoryDefaultAppearancesModifier.swift
      TaskCategoryAppearances.swift
      TaskCategoryAppearancesModifier.swift
    Resources/
      Localizable.xcstrings
      Localizable.xcstrings.license
    SpeziSchedulerUI.docc/
      SpeziSchedulerUI.md
    TestingSupport/
      SchedulerSampleData.swift
    DefaultTileHeader.swift
    EventActionButton.swift
    EventScheduleList.swift
    InstructionsTile.swift
    TodayList.swift
Tests/
  SpeziSchedulerMacrosTest/
    UserStorageEntryMacroTests.swift
  SpeziSchedulerTests/
    Utils/
      ExampleTaskKey.swift
    NotificationsTests.swift
    SchedulerTests.swift
    ScheduleTests.swift
  SpeziSchedulerUITests/
    SchedulerSampleDataTests.swift
    SpeziSchedulerUITests.swift
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
      EventDetailView.swift
      Info.plist
      Info.plist.license
      NotificationsView.swift
      ScheduleView.swift
      Task+About.swift
      TestApp.entitlements
      TestApp.entitlements.license
      TestApp.swift
      TestAppDelegate.swift
      TestAppScheduler.swift
    TestAppUITests/
      TestAppUITests.swift
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
  buildandtest_ios:
    name: Build and Test Swift Package
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziScheduler-Package
      resultBundle: SpeziScheduler-iOS.xcresult
      artifactname: SpeziScheduler-iOS.xcresult
  buildandtest_watchos:
    name: Build and Test Swift Package watchOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziScheduler-Package
      destination: 'platform=watchOS Simulator,name=Apple Watch Series 10 (46mm)'
      resultBundle: SpeziScheduler-watchOS.xcresult
      artifactname: SpeziScheduler-watchOS.xcresult
  buildandtest_visionos:
    name: Build and Test Swift Package visionOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziScheduler-Package
      destination: 'platform=visionOS Simulator,name=Apple Vision Pro'
      resultBundle: SpeziScheduler-visionOS.xcresult
      artifactname: SpeziScheduler-visionOS.xcresult
  buildandtest_macos:
    name: Build and Test Swift Package macOS
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      runsonlabels: '["macOS", "self-hosted"]'
      scheme: SpeziScheduler-Package
      destination: 'platform=macOS,arch=arm64'
      resultBundle: SpeziScheduler-macOS.xcresult
      artifactname: SpeziScheduler-macOS.xcresult
  buildandtestuitests_ios:
    name: Build and Test UI Tests
    uses: StanfordSpezi/.github/.github/workflows/xcodebuild-or-fastlane.yml@v2
    with:
      artifactname: TestApp.xcresult
      runsonlabels: '["macOS", "self-hosted"]'
      path: 'Tests/UITests'
      scheme: TestApp
  uploadcoveragereport:
    name: Upload Coverage Report
    needs: [buildandtest_ios, buildandtest_watchos, buildandtest_visionos, buildandtest_macos, buildandtestuitests_ios]
    uses: StanfordSpezi/.github/.github/workflows/create-and-upload-coverage-report.yml@v2
    with:
      coveragereports: SpeziScheduler-iOS.xcresult SpeziScheduler-watchOS.xcresult SpeziScheduler-visionOS.xcresult SpeziScheduler-macOS.xcresult TestApp.xcresult
    secrets:
      token: ${{ secrets.CODECOV_TOKEN }}

================
File: .github/workflows/monthly-markdown-link-check.yml
================
#
# This source file is part of the Stanford Spezi open source project
#
# SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
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

Files: Tests/SpeziSchedulerUITests/__Snapshots__/*
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
File: Sources/SpeziScheduler/Notifications/BackgroundMode.swift
================
struct BackgroundMode {
    @usableFromInline static let processing = BackgroundMode(rawValue: "processing")
    @usableFromInline static let fetch = BackgroundMode(rawValue: "fetch")
    @usableFromInline let rawValue: String
    init(rawValue: String) {

================
File: Sources/SpeziScheduler/Notifications/BGTaskSchedulerErrorCode+Description.swift
================
    public var description: String {

================
File: Sources/SpeziScheduler/Notifications/LegacyTaskModel.swift
================
struct LegacyEventModel: Codable, Hashable, Sendable {
    let notification: UUID?
    func cancelNotification() {
        let center = UNUserNotificationCenter.current()
struct LegacyTaskModel: Codable, Hashable, Sendable {
    let id: UUID
    let notifications: Bool
    let events: [LegacyEventModel]

================
File: Sources/SpeziScheduler/Notifications/NotificationScenePhaseScheduling.swift
================
struct NotificationScenePhaseScheduling: ViewModifier {
    private var scheduler: Scheduler? // modifier is injected by SchedulerNotifications and it doesn't have a direct scheduler dependency
    private var schedulerNotifications
    private var scenePhase
    nonisolated init() {}
    func body(content: Content) -> some View {

================
File: Sources/SpeziScheduler/Notifications/NotificationThread.swift
================
public enum NotificationThread {

================
File: Sources/SpeziScheduler/Notifications/NotificationTime.swift
================
public struct NotificationTime {
    public let hour: Int
    public let minute: Int
    public let second: Int
    public init(hour: Int, minute: Int = 0, second: Int = 0) {

================
File: Sources/SpeziScheduler/Notifications/PermittedBackgroundTaskIdentifier.swift
================
struct PermittedBackgroundTaskIdentifier {
    @usableFromInline static let speziSchedulerNotificationsScheduling = PermittedBackgroundTaskIdentifier(
    @usableFromInline let rawValue: String
    init(rawValue: String) {

================
File: Sources/SpeziScheduler/Notifications/Schedule+Notifications.swift
================
    enum NotificationMatchingHint: Codable, Sendable, Hashable {
        func dateComponents(calendar: Calendar, allDayNotificationTime: NotificationTime) -> DateComponents {
                let time = allDayNotificationTime
    static func notificationTime(for start: Date, duration: Duration, allDayNotificationTime: NotificationTime) -> Date {
    static func notificationMatchingHint( // swiftlint:disable:this function_parameter_count
    func canBeScheduledAsRepeatingCalendarTrigger(allDayNotificationTime: NotificationTime, now: Date = .now) -> Bool {
        let components = notificationMatchingHint.dateComponents(calendar: recurrence.calendar, allDayNotificationTime: allDayNotificationTime)
        let trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: true)
        let nextOccurrences = nextOccurrences(in: now..., count: 2)

================
File: Sources/SpeziScheduler/Notifications/SchedulerNotifications.swift
================
public final class SchedulerNotifications {
    private var logger
    private var notificationSettings
    private var requestNotificationAuthorization
    private var notifications
    private var localStorage
    @StandardActor private var standard: any Standard
    public nonisolated let notificationLimit: Int
    public nonisolated let schedulingInterval: TimeInterval
    public nonisolated let allDayNotificationTime: NotificationTime
    public nonisolated let notificationPresentation: UNNotificationPresentationOptions
    public nonisolated let automaticallyRequestProvisionalAuthorization: Bool // swiftlint:disable:this identifier_name
    private let scheduleNotificationAccess = AsyncSemaphore()
    private var queuedForNextTick = false
    private var backgroundTaskRegistered = false
    private var earliestScheduleRefreshDate: Date?
    private var authorizationDisallowedLastScheduling = false
    @Modifier private var scenePhaseRefresh = NotificationScenePhaseScheduling()
    public required convenience nonisolated init() {
    public nonisolated init(
    public func configure() {
    func scheduleNotificationsUpdate(using scheduler: Scheduler) {
    func registerProcessingTask(using scheduler: Scheduler) {
    func checkForInitialScheduling(scheduler: Scheduler) async {
        var scheduleNotificationUpdate = false
            let status = await notificationSettings().authorizationStatus
            let nowAllowed = switch status {
    private func _scheduleNotificationsUpdate(using scheduler: Scheduler) async {
        let task = _Concurrency.Task { @MainActor in
        let identifier = _Application.shared.beginBackgroundTask(withName: "Scheduler Notifications") {
    private func updateNotifications(using scheduler: borrowing Scheduler) async throws {
        let now = Date.now // ensure consistency in queries
        let hasTasksWithNotificationsAtAll = try measure(name: "hasTasksWithNotifications") {
        var otherNotificationsCount = 0
        let pendingNotifications = await groupedPendingSchedulerNotifications(otherNotificationsCount: &otherNotificationsCount)
        let remainingNotificationSlots = Notifications.pendingNotificationsLimit - otherNotificationsCount - notificationLimit
        let currentSchedulerLimit = min(notificationLimit, notificationLimit + remainingNotificationSlots)
        let range = now..<now.addingTimeInterval(schedulingInterval)
        var nextOccurrenceCache = TaskNextOccurrenceCache(in: now...)
        var tasks = try scheduler.queryTasks(for: range, predicate: #Predicate { task in
        let nextTaskOccurrenceWeDidNotSchedule: Date? = if tasks.count == currentSchedulerLimit + 1, let last = tasks.last {
        let pivot = tasks.stablePartition { task in
        let calendarTriggerTasks = tasks[pivot...]
        let eventCountLimit = currentSchedulerLimit - calendarTriggerTasks.count
        var events = scheduler.assembleEvents(for: range, tasks: tasks[..<pivot], outcomes: nil)
        let nextEventOccurrenceWeDidNotSchedule: Date? = if events.count == eventCountLimit + 1, let last = events.last {
        let hasEventOccurrenceNextMonth = scheduler.hasEventOccurrence(in: range.upperBound..<Date.distantFuture, tasks: tasks)
        let removedNotifications = Set(pendingNotifications.keys)
        let settings = await notificationSettings()
        let earliestTaskLevelOccurrenceNeedingCancellation = tasks // swiftlint:disable:this identifier_name
        let earliest = [
    private func shouldScheduleNotification(
    private func ensureAllSchedulerNotificationsCancelled() async {
        let pendingNotifications = await notifications.pendingNotificationRequests()
    private func groupedPendingSchedulerNotifications(otherNotificationsCount: inout Int) async -> [String: UNNotificationRequest] {
        var otherNotifications = 0
        let result: [String: UNNotificationRequest] = await notifications.pendingNotificationRequests().reduce(into: [:]) { partialResult, request in
    private func taskLevelScheduling(
        var scheduledNotifications = 0
            let components = notificationMatchingHint.dateComponents(calendar: calendar, allDayNotificationTime: allDayNotificationTime)
            lazy var content = {
                let content = task.notificationContent()
            lazy var trigger = UNCalendarNotificationTrigger(dateMatching: components, repeats: true)
            let id = Self.notificationId(for: task)
            let request = UNNotificationRequest(identifier: id, content: content, trigger: trigger)
    private func eventLevelScheduling(
                let content = event.task.notificationContent()
            let notificationTime = Schedule.notificationTime(
            let trigger = UNTimeIntervalNotificationTrigger(timeInterval: notificationTime.timeIntervalSinceNow, repeats: false)
            let id = Self.notificationId(for: event)
    public func receiveIncomingNotification(_ notification: UNNotification) async -> UNNotificationPresentationOptions? {
    @usableFromInline static var uiBackgroundModes: Set<BackgroundMode> {
        let modes = Bundle.main.object(forInfoDictionaryKey: "UIBackgroundModes") as? [String]
    @inlinable static var backgroundFetchEnabled: Bool {
    private func scheduleNotificationsRefresh(nextThreshold: Date? = nil) {
        let nextWeek: Date = .nextWeek
        let earliestBeginDate = if let nextThreshold {
            let request = BGAppRefreshTaskRequest(identifier: PermittedBackgroundTaskIdentifier.speziSchedulerNotificationsScheduling.rawValue)
    private func handleNotificationsRefresh(for processingTask: BGAppRefreshTask, using scheduler: Scheduler) {
    fileprivate static let legacyTasks = LocalStorageKey<[LegacyTaskModel]>(
    fileprivate func purgeLegacyEventNotifications() {
        let legacyTasks: [LegacyTaskModel]
            let nsError = error as NSError

================
File: Sources/SpeziScheduler/Notifications/SchedulerNotifications+Strings.swift
================
    static nonisolated let earliestScheduleRefreshDateStorageKey = "edu.stanford.spezi.scheduler.earliestScheduleRefreshDate"
    static nonisolated let authorizationDisallowedLastSchedulingStorageKey = "edu.stanford.spezi.scheduler.authorizationDisallowedLastScheduling"
    public static nonisolated let notificationTaskIdKey = "\(baseNotificationId).taskId"
    static nonisolated let baseNotificationId = "edu.stanford.spezi.scheduler.notification"
    static nonisolated let baseTaskNotificationId = "\(baseNotificationId).task"
    static nonisolated let baseEventNotificationId = "\(baseNotificationId).event"
    public static nonisolated func notificationCategory(for category: Task.Category) -> String {
    public static nonisolated func notificationThreadIdentifier(for taskId: String) -> String {
    public static nonisolated func notificationId(for event: Event) -> String {
    public static nonisolated func notificationId(for task: Task) -> String {

================
File: Sources/SpeziScheduler/Notifications/SchedulerNotificationsConstraint.swift
================
public protocol SchedulerNotificationsConstraint: Standard {

================
File: Sources/SpeziScheduler/Notifications/Task+Notifications.swift
================
    static func requiresNotificationRescheduling(previous: Task, updated: Task) -> Bool {
    func notificationContent() -> sending UNMutableNotificationContent {
        let content = UNMutableNotificationContent()

================
File: Sources/SpeziScheduler/Notifications/TaskNextOccurrenceCache.swift
================
struct TaskNextOccurrenceCache {
    struct Entry {
        let occurrence: Occurrence?
    private let range: PartialRangeFrom<Date>
    private var cache: [String: Entry] = [:]
    init(in range: PartialRangeFrom<Date>) {
    subscript(_ task: Task) -> Occurrence? {
            let occurrence = task.schedule.nextOccurrence(in: range)

================
File: Sources/SpeziScheduler/Schedule/Date+Extensions.swift
================
    public static var today: Date {
    public static var tomorrow: Date {
    public static var yesterday: Date {
    public static var nextWeek: Date {

================
File: Sources/SpeziScheduler/Schedule/Duration+Extensions.swift
================
    public static func minutes(_ minutes: some BinaryInteger) -> Duration {
    public static func minutes(_ minutes: Double) -> Duration {
    public static func hours(_ hours: some BinaryInteger) -> Duration {
    public static func hours(_ hours: Double) -> Duration {
    public static func days(_ days: some BinaryInteger) -> Duration {
    public static func days(_ days: Double) -> Duration {
    public static func weeks(_ weeks: some BinaryInteger) -> Duration {
    public static func weeks(_ weeks: Double) -> Duration {

================
File: Sources/SpeziScheduler/Schedule/Occurence.swift
================
public struct Occurrence {
    public let start: Date
    public let end: Date
    public let schedule: Schedule
    init(start: Date, end: Date, schedule: Schedule) {
    init(start: Date, schedule: Schedule) {
    public var description: String {

================
File: Sources/SpeziScheduler/Schedule/Schedule.swift
================
public struct Schedule {
    private var startDate: Date
    private var scheduleDuration: Duration.SwiftDataDuration
    private var recurrenceRule: Data?
    private(set) var notificationMatchingHint: NotificationMatchingHint?
    public var duration: Duration {
    public var recurrence: Calendar.RecurrenceRule? {
    public var start: Date {
    public var repeatsIndefinitely: Bool {
    init(
    public init(startingAt start: Date, duration: Duration = .tillEndOfDay, recurrence: Calendar.RecurrenceRule? = nil) {
    func dates(for start: Date) -> (start: Date, end: Date) {
        let occurrenceStart: Date
        let occurrenceEnd: Date
            let startOfDay = Calendar.current.startOfDay(for: start)
    public static func once(
    public static func daily(
        let notificationIntervalHint = Schedule.notificationMatchingHint(
    public static func weekly(
        let weekdayNum = weekday.map { $0.ordinal } ?? Calendar.current.component(.weekday, from: startTime)
    public func occurrences(in range: Range<Date>) -> [Occurrence] {
    public func occurrences(inDay date: Date) -> [Occurrence] {
        let start = Calendar.current.startOfDay(for: date)
    public func occurrence(forStartDate start: Date) -> Occurrence? {
    public func occurrences(in range: Range<Date>? = nil) -> some Sequence<Occurrence> {
    func nextOccurrence(in range: PartialRangeFrom<Date>) -> Occurrence? {
    func nextOccurrence(in range: Range<Date>) -> Occurrence? {
    func nextOccurrences(in range: PartialRangeFrom<Date>, count: Int) -> [Occurrence] {
    func nextOccurrences(in range: Range<Date>, count: Int) -> [Occurrence] {
    func lastOccurrence(ifIn range: Range<Date>) -> Occurrence? {
        var iterator = occurrences(in: range.lowerBound..<Date.distantFuture).makeIterator()
        var lastOccurrence: Occurrence?
    private func recurrencesSequence(in range: Range<Date>? = nil) -> LazyFilterSequence<some Sequence<Date>> {
        let start = start
        let rangeUsedWithRule = range.map { range in
    public var description: String {
    fileprivate init(fromEncoded data: Data) {
    fileprivate init(encoding recurrenceRule: Calendar.RecurrenceRule) {

================
File: Sources/SpeziScheduler/Schedule/Schedule+Duration.swift
================
    public enum Duration {
    @inlinable public var isAllDay: Bool {
    public static func seconds(_ seconds: some BinaryInteger) -> Schedule.Duration {
    public static func minutes(_ minutes: some BinaryInteger) -> Schedule.Duration {
    public static func minutes(_ minutes: Double) -> Schedule.Duration {
    public static func hours(_ hours: some BinaryInteger) -> Schedule.Duration {
    public static func hours(_ hours: Double) -> Schedule.Duration {
    public var description: String {
    struct MappedDuration {
        private let high: Int64
        private let low: UInt64
        var duration: Swift.Duration {
        init(from duration: Swift.Duration) {
    enum SwiftDataDuration {
    var description: String {
    init(from duration: Schedule.Duration) {
    init(from duration: Schedule.Duration.SwiftDataDuration) {

================
File: Sources/SpeziScheduler/Schedule/Weekday+Ordinal.swift
================
    var ordinal: Int {

================
File: Sources/SpeziScheduler/SpeziScheduler.docc/SpeziScheduler.md
================
# ``SpeziScheduler``

<!--
                  
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
             
-->

Schedule and observe tasks for your users to complete, such as taking surveys or taking measurements.

## Overview

The Scheduler module allows the scheduling and observation of ``Task``s adhering to a specific ``Schedule``.

A ``Task`` is an potentially repeated action or work that a user is supposed to perform. An ``Event`` represents a single
occurrence of a task, that is derived from its ``Schedule``.

You use the `Scheduler` module to manage the persistence store of your tasks. It provides a versioned, append-only store
for tasks. It allows to modify the properties (e.g., schedule) of future events without affecting occurrences of the past.

You create and automatically update your tasks
using ``Scheduler/createOrUpdateTask(id:title:instructions:category:schedule:completionPolicy:tags:effectiveFrom:with:)``.

Below is a example on how to create your own [`Module`](https://swiftpackageindex.com/stanfordspezi/spezi/documentation/spezi/module)
to manage your tasks and ensure they are always up to date.

```swift
import Spezi
import SpeziScheduler

class MySchedulerModule: Module {
    @Dependency(Scheduler.self)
    private var scheduler

    init() {}

    func configure() {
        do {
            try scheduler.createOrUpdateTask(
                id: "my-daily-task",
                title: "Daily Questionnaire",
                instructions: "Please fill out the Questionnaire every day.",
                category: Task.Category("Questionnaire", systemName: "list.clipboard.fill"),
                schedule: .daily(hour: 9, minute: 0, startingAt: .today)
            )
        } catch {
            // handle error (e.g., visualize in your UI)
        }
    }
}
```

## Topics

### Scheduler
- ``Scheduler``
- ``EventQuery``
- ``Scheduler/DataError``

### Schedule

- ``Schedule``
- ``Schedule/Duration-swift.enum``
- ``Occurrence``

### Task

- ``Task``
- ``Task/ID-swift.struct``
- ``Task/Category-swift.struct``
- ``Event``
- ``Outcome``
- ``Property(coding:)``
- ``AllowedCompletionPolicy``

### Notifications

- ``SchedulerNotifications``
- ``SchedulerNotificationsConstraint``
- ``NotificationTime``
- ``NotificationThread``

### Date Extensions

- ``Foundation/Date/today``
- ``Foundation/Date/tomorrow``
- ``Foundation/Date/yesterday``
- ``Foundation/Date/nextWeek``

### Duration Extensions

- ``Swift/Duration/minutes(_:)-109v7``
- ``Swift/Duration/minutes(_:)-1i7j5``
- ``Swift/Duration/hours(_:)-191bg``
- ``Swift/Duration/hours(_:)-33xlm``
- ``Swift/Duration/days(_:)-58sx4``
- ``Swift/Duration/days(_:)-4geo0``
- ``Swift/Duration/weeks(_:)-34lc3``
- ``Swift/Duration/weeks(_:)-74s4k``

================
File: Sources/SpeziScheduler/Task/AllowedCompletionPolicy.swift
================
public enum AllowedCompletionPolicy {
    public func isAllowedToComplete(event: Event, now date: Date = .now) -> Bool {
    public func dateOnceCompletionIsAllowed(for event: Event, now date: Date = .now) -> Date? {
        let completionDate = switch self {
    public func dateOnceCompletionBecomesDisallowed(for event: Event, now date: Date = .now) -> Date? {
        let endDate: Date? = switch self {

================
File: Sources/SpeziScheduler/Task/Event.swift
================
public struct Event {
    public enum OutcomeValue {
        var value: Outcome? {
    fileprivate class State {
        var outcome: OutcomeValue
        init(_ outcome: OutcomeValue) {
    public let task: Task
    public let occurrence: Occurrence
    private let outcomeState: State
    public var outcome: Outcome? {
    public var completed: Bool {
    public init(task: Task, occurrence: Occurrence, outcome: OutcomeValue) {
    public func complete() -> Outcome {
    public func complete(with closure: (Outcome) -> Void) -> Outcome {
            let outcome = createNewOutCome(with: closure)
    private func createNewOutCome(with closure: (Outcome) -> Void) -> Outcome {
        let outcome = Outcome(task: task, occurrence: occurrence)
    public struct ID {
        private let taskId: Task.ID
        private let occurrenceData: Date
        fileprivate init(taskId: Task.ID, occurrenceData: Date) {
    public var id: ID {
    public var description: String {

================
File: Sources/SpeziScheduler/Task/Outcome.swift
================
    public var id: UUID
    public private(set) var completionDate: Date
    private(set) var occurrenceStartDate: Date
    public private(set) var task: Task
    public var occurrence: Occurrence {
    public var event: Event {
    private var userInfo = UserInfoStorage<OutcomeAnchor>()
    @Transient private var userInfoCache = UserInfoStorage<OutcomeAnchor>.RepositoryCache()
    public subscript<Source: OutcomeStorageKey>(_ source: Source.Type) -> Source.Value? {
    public subscript<Source: OutcomeStorageKey>(_ source: Source.Type, default defaultValue: @autoclosure () -> Source.Value) -> Source.Value {
    public var description: String {

================
File: Sources/SpeziScheduler/Task/Task.swift
================
    public private(set) var id: String
    public private(set) var title: String.LocalizationValue
    public private(set) var instructions: String.LocalizationValue
    private var categoryValue: String?
    public var category: Category? {
    public private(set) var schedule: Schedule
    public private(set) var completionPolicy: AllowedCompletionPolicy
    public private(set) var scheduleNotifications: Bool
    public private(set) var notificationThread: NotificationThread
    public private(set) var tags: [String]
    public private(set) var outcomes: [Outcome]
    public private(set) var effectiveFrom: Date
    public var isLatestVersion: Bool {
    public private(set) var previousVersion: Task?
    public private(set) var nextVersion: Task?
    private(set) var userInfo: UserInfoStorage<TaskAnchor>
    @Transient private var userInfoCache = UserInfoStorage<TaskAnchor>.RepositoryCache()
        var context = Context()
    public func createUpdatedVersion(
    func createUpdatedVersion( // swiftlint:disable:this function_body_length function_parameter_count
        let context: Context?
            var context0 = Context()
        func didChange<V: Equatable>(_ value: V?, for keyPath: KeyPath<Task, V>) -> Bool {
        let newVersion = Task(
        let context = Context(userInfo: userInfo, userInfoCache: userInfoCache)
            var userInfoCache: UserInfoStorage<TaskAnchor>.RepositoryCache
        private let box: Box
        var userInfoCache: UserInfoStorage<TaskAnchor>.RepositoryCache {

================
File: Sources/SpeziScheduler/Task/Task+Category.swift
================
    public struct Category {
        public let rawValue: String
        public init(rawValue: String) {
    public var description: String {
    public static var questionnaire: Task.Category {
    public static var measurement: Task.Category {
    public static var medication: Task.Category {
    public static func custom(_ label: String) -> Task.Category {

================
File: Sources/SpeziScheduler/Task/Task+LocalizedStringResource.swift
================
public protocol _HasLocalization { // swiftlint:disable:this type_name
public protocol _LocalizedStringResourceAccessors: _HasLocalization { // swiftlint:disable:this type_name
    public var title: LocalizedStringResource {
    public var instructions: LocalizedStringResource {

================
File: Sources/SpeziScheduler/UserInfo/OutcomeStorageKey.swift
================
public enum OutcomeAnchor: RepositoryAnchor {}
public protocol OutcomeStorageKey: _UserInfoKey where Anchor == OutcomeAnchor {}

================
File: Sources/SpeziScheduler/UserInfo/Property.swift
================


================
File: Sources/SpeziScheduler/UserInfo/TaskStorageKey.swift
================
public enum TaskAnchor: RepositoryAnchor {}
public protocol TaskStorageKey: _UserInfoKey where Anchor == TaskAnchor, Value: Equatable {}

================
File: Sources/SpeziScheduler/UserInfo/UserInfoKey.swift
================
public protocol _UserInfoKey<Anchor>: KnowledgeSource where Value: Codable { // swiftlint:disable:this type_name
    public static var identifier: String {

================
File: Sources/SpeziScheduler/UserInfo/UserInfoStorage.swift
================
struct SingleValueWrapper<Value: Codable>: Codable {
    let value: Value
    init(value: Value) {
struct UserInfoStorage<Anchor: RepositoryAnchor> {
    struct RepositoryCache {
        var repository = ValueRepository<Anchor>()
    private var userInfo: [String: Data] = [:]
    private var logger: Logger {
    init() {
    func contains<Source: _UserInfoKey<Anchor>>(_ source: Source.Type) -> Bool {
    func get<Source: _UserInfoKey<Anchor>>(_ source: Source.Type, cache: inout RepositoryCache) -> Source.Value? {
            let decoder = source.coding.decoder
            let value = try decoder.decode(SingleValueWrapper<Source.Value>.self, from: data)
    mutating func set<Source: _UserInfoKey<Anchor>>(_ source: Source.Type, value newValue: Source.Value?, cache: inout RepositoryCache) {
                let encoder = source.coding.encoder
    var rawValue: [String: Data] {
    init(rawValue: [String: Data]) {
    var description: String {

================
File: Sources/SpeziScheduler/UserInfo/UserStorageCoding.swift
================
public struct UserStorageCoding<Encoder: TopLevelEncoder & Sendable, Decoder: TopLevelDecoder & Sendable>: Sendable
    let encoder: Encoder
    let decoder: Decoder
    init(encoder: Encoder, decoder: Decoder) {
    public static func custom(encoder: Encoder, decoder: Decoder) -> UserStorageCoding<Encoder, Decoder> {
    public static let json = UserStorageCoding(encoder: JSONEncoder(), decoder: JSONDecoder())
    public static let propertyList = UserStorageCoding(encoder: PropertyListEncoder(), decoder: PropertyListDecoder())

================
File: Sources/SpeziScheduler/Utils/Measure.swift
================
private let logger = Logger(subsystem: "edu.stanford.spezi.scheduler", category: "EventQuery")
func measure<T, C: Clock>(
    let start = clock.now
    let result = try action()
    let end = clock.now
    let result = try await action()

================
File: Sources/SpeziScheduler/EventQuery.swift
================
public struct EventQuery {
    private struct Configuration {
        let range: Range<Date>
        let taskPredicate: Predicate<Task>
    fileprivate final class Storage {
        var viewUpdate: UInt64 = 0
        @ObservationIgnored var cancelable: AnyCancellable?
        @ObservationIgnored var fetchedEvents: [Event] = []
        @ObservationIgnored var fetchedIdentifiers: Set<PersistentIdentifier> = []
    public struct Binding {
        public fileprivate(set) var fetchError: (any Error)?
    private var scheduler
    private let configuration: Configuration
    private let storage = Storage()
    private var binding = Binding()
    public var wrappedValue: [Event] {
    public var projectedValue: Binding {
    public init(
    public mutating nonisolated func update() {
    private mutating func doUpdate() {
            let anchor = try measure(name: "Event Anchor Query") {
            let events = try measure(name: "Event Query") {

================
File: Sources/SpeziScheduler/Scheduler.swift
================
public final class Scheduler {
    static var isTesting = false
    private static let purgeLegacyStorage = false
    private var logger
    private var notifications
    private var _container: Result<ModelContainer, any Error>?
    private var container: ModelContainer {
    var context: ModelContext {
    private var saveTask: _Concurrency.Task<Void, Never>?
    public nonisolated init() {}
    public init(testingContainer: ModelContainer) {
    public func configure() {
        let configuration: ModelConfiguration
    public func manuallyScheduleNotificationRefresh() {
    private func scheduleSave(for context: ModelContext, rescheduleNotifications: Bool) {
    public func createOrUpdateTask( // swiftlint:disable:this function_body_length
        let context = try context
        let predicate: Predicate<Task> = #Predicate { task in
        let results = try context.fetch(FetchDescriptor<Task>(predicate: predicate))
            let descriptor = FetchDescriptor<Outcome>(
            let outcomesThatWouldBeShadowed = try context.fetchCount(descriptor)
            let result = try existingTask.createUpdatedVersion(
                let notifications = Task.requiresNotificationRescheduling(previous: existingTask, updated: result.task)
            let task = Task(
    func addOutcome(_ outcome: Outcome) {
        let context: ModelContext
    public func deleteTasks(_ tasks: Task...) throws {
    public func deleteTasks(_ tasks: [Task]) throws {
    public func deleteAllVersions(of task: Task) throws {
    public func deleteAllVersions(ofTask taskId: String) throws {
    public func queryTasks(
    func queryTasks(
    public func queryEvents(
        let tasks = try queryTasks(for: range, predicate: taskPredicate)
        let outcomes = try queryOutcomes(for: range, predicate: taskPredicate)
    public func queryAllTasks() throws -> [Task] {
    public func queryAllOutcomes() throws -> [Outcome] {
    public func deleteAllTasks() throws {
    public func eraseDatabase() throws {
    private struct OccurrenceId: Hashable {
        let taskId: Task.ID
        let startDate: Date
        init(task: Task, startDate: Date) {
    func assembleEvents<S: Sequence<Task>>(
        let outcomesByOccurrence = outcomes?.reduce(into: [:]) { partialResult, outcome in
                let upperBound: Date
                let lowerBound: Date
    func hasEventOccurrence<S: Sequence<Task>>(in range: Range<Date>, tasks: S) -> Bool {
    func queryEventsAnchor(
        let taskIdentifier = try queryTaskIdentifiers(with: inRangePredicate(for: range), combineWith: taskPredicate)
        let outcomeIdentifiers = try queryOutcomeIdentifiers(for: range, predicate: taskPredicate)
    func sinkDidSavePublisher(into consume: @escaping (Notification) -> Void) throws -> AnyCancellable {
    func hasTasksWithNotifications(for range: PartialRangeFrom<Date>) throws -> Bool {
        let rangePredicate = inPartialRangeFromPredicate(for: range)
        let descriptor = FetchDescriptor<Task>(
    private func queryTasks(
        var descriptor = FetchDescriptor<Task>(
    private func queryOutcomes(for range: Range<Date>, predicate taskPredicate: Predicate<Task>) throws -> [Outcome] {
        var descriptor = FetchDescriptor<Outcome>(
    private func queryTaskIdentifiers(
    private func queryOutcomeIdentifiers(for range: Range<Date>, predicate taskPredicate: Predicate<Task>) throws -> Set<PersistentIdentifier> {
    private func inRangePredicate(for range: Range<Date>) -> Predicate<Task> {
    private func inPartialRangeFromPredicate(for range: PartialRangeFrom<Date>) -> Predicate<Task> {
    private func inClosedRangePredicate(for range: ClosedRange<Date>) -> Predicate<Task> {
    public enum DataError: Error {
    public var errorDescription: String? {
    public var failureReason: String? {

================
File: Sources/SpeziSchedulerMacros/SpeziSchedulerDiagnostic.swift
================
struct SpeziSchedulerDiagnostic: DiagnosticMessage {
    enum ID: String {
    let message: String
    let diagnosticID: MessageID
    let severity: DiagnosticSeverity
    init(message: String, diagnosticID: MessageID, severity: DiagnosticSeverity = .error) {
    init(message: String, domain: String, id: ID, severity: SwiftDiagnostics.DiagnosticSeverity = .error) {
    init<S: SyntaxProtocol>(

================
File: Sources/SpeziSchedulerMacros/SpeziSchedulerMacros.swift
================
struct SpeziSchedulerMacros: CompilerPlugin {
    var providingMacros: [any Macro.Type] = [UserStorageEntryMacro.self]

================
File: Sources/SpeziSchedulerMacros/UserStorageEntryMacro.swift
================
public struct UserStorageEntryMacro {}
    public static func expansion(
        let getAccessor: AccessorDeclSyntax = if let initializer = binding.initializer {
        let setAccessor: AccessorDeclSyntax =
    public static func expansion( // swiftlint:disable:this function_body_length cyclomatic_complexity
        let codingExpression: ExprSyntax
        let keyProtocol: TokenSyntax
        let valueTypeInitializer: TypeSyntax
        let key = StructDeclSyntax(

================
File: Sources/SpeziSchedulerUI/Category/DisableCategoryDefaultAppearancesModifier.swift
================
struct DisableCategoryDefaultAppearancesModifier: ViewModifier { // swiftlint:disable:this type_name
    private let disabled: Bool
    private var taskCategoryAppearances
    init(disabled: Bool) {
    func body(content: Content) -> some View {
    func disableCategoryDefaultAppearances(_ disabled: Bool = true) -> some View {

================
File: Sources/SpeziSchedulerUI/Category/TaskCategoryAppearances.swift
================
public struct TaskCategoryAppearances {
    private let appearances: [Task.Category: Task.Category.Appearance]
    private let disableDefaultAppearances: Bool // for test purposes
    init() {
    init(_ appearances: [Task.Category: Task.Category.Appearance], disableDefaultAppearances: Bool) {
    private func buildIntDefault(for category: Task.Category) -> Task.Category.Appearance? {
    func inserting(_ appearance: Task.Category.Appearance, for category: Task.Category) -> Self {
        var appearances = appearances
    func disableDefaultAppearances(_ disabled: Bool = true) -> Self {
    public subscript(_ category: Task.Category) -> Task.Category.Appearance? {
    public struct Appearance {
        public let label: LocalizedStringResource
        public let image: ImageReference?
        init(label: LocalizedStringResource, image: ImageReference?) {
    @Entry public var taskCategoryAppearances: TaskCategoryAppearances = .init()

================
File: Sources/SpeziSchedulerUI/Category/TaskCategoryAppearancesModifier.swift
================
private struct TaskCategoryAppearancesModifier: ViewModifier {
    private let category: Task.Category
    private let appearance: Task.Category.Appearance
    private var appearances
    init(category: Task.Category, appearance: Task.Category.Appearance) {
    func body(content: Content) -> some View {
    public func taskCategoryAppearance(for category: Task.Category, label: LocalizedStringResource, image: ImageReference? = nil) -> some View {

================
File: Sources/SpeziSchedulerUI/Resources/Localizable.xcstrings
================
{
  "sourceLanguage" : "en",
  "strings" : {
    "%@ to %@" : {
      "comment" : "start time till end time",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "%1$@ bis %2$@"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "new",
            "value" : "%1$@ to %2$@"
          }
        }
      }
    },
    "%@, %@" : {
      "localizations" : {
        "en" : {
          "stringUnit" : {
            "state" : "new",
            "value" : "%1$@, %2$@"
          }
        }
      }
    },
    "An unknown error occurred." : {

    },
    "Complete" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Durchführen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Complete"
          }
        }
      }
    },
    "Complete %@" : {
      "comment" : "category label",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "%@ durchführen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Complete %@"
          }
        }
      }
    },
    "Completed" : {
      "comment" : "Completed Tile. Subtitle",
      "extractionState" : "stale",
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Abgeschlossen"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Completed"
          }
        }
      }
    },
    "Failed to fetch Events" : {

    },
    "Measurement" : {

    },
    "Medication" : {

    },
    "More Information" : {
      "localizations" : {
        "de" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "Mehr Information"
          }
        },
        "en" : {
          "stringUnit" : {
            "state" : "translated",
            "value" : "More Information"
          }
        }
      }
    },
    "No Events" : {

    },
    "No Events Today" : {

    },
    "No Events Tomorrow" : {

    },
    "No Events Yesterday" : {

    },
    "Questionnaire" : {

    },
    "Retry" : {

    },
    "There are no events scheduled for today." : {

    },
    "There are no events scheduled for tomorrow." : {

    },
    "There are no events scheduled for yesterday." : {

    },
    "There are no events scheduled that date." : {

    },
    "Today" : {

    },
    "Tomorrow" : {

    },
    "Yesterday" : {

    }
  },
  "version" : "1.0"
}

================
File: Sources/SpeziSchedulerUI/Resources/Localizable.xcstrings.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Sources/SpeziSchedulerUI/SpeziSchedulerUI.docc/SpeziSchedulerUI.md
================
# ``SpeziSchedulerUI``

<!--

This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

UI components provided for SpeziScheduler.

## Overview

@Row {
    @Column {
        @Image(source: "Schedule-Today", alt: "A schedule view showing a upcoming Task at 4pm to complete the Social Support Questionnaire.") {
            Use the ``EventScheduleList`` and the ``InstructionsTile`` to present the user's schedule.
        }
    }
    @Column {
        @Image(source: "Schedule-Today-Center", alt: "A schedule view with center alignment showing a upcoming Task at 4pm to complete the Social Support Questionnaire.") {
            A schedule view with a `center` aligned ``InstructionsTile``.
        }
    }
    @Column {
        @Image(source: "Schedule-Tomorrow", alt: "A schedule view showing a upcoming Task for tomorrow.") {
            Use the ``EventScheduleList`` view to display the schedule for arbitrary dates.
        }
    }
}


## Topics

### Card Layouts

- ``InstructionsTile``
- ``DefaultTileHeader``
- ``EventActionButton``

### Displaying Events

- ``EventScheduleList``

### Category Appearance
Control how the category information of a task should be rendered to the user.

- ``SpeziScheduler/Task/Category/Appearance``
- ``SwiftUICore/View/taskCategoryAppearance(for:label:image:)``
- ``SwiftUICore/EnvironmentValues/taskCategoryAppearances``
- ``TaskCategoryAppearances``

================
File: Sources/SpeziSchedulerUI/TestingSupport/SchedulerSampleData.swift
================
public struct SchedulerSampleData: PreviewModifier {
    public init() {}
    public static func makeTestTask() -> Task {
    public static func makeTestEvent() -> Event {
        let task = makeTestTask()
    public static func makeSharedContext() throws -> ModelContainer {
        let configuration = ModelConfiguration(isStoredInMemoryOnly: true)
        let container = try ModelContainer(for: Task.self, Outcome.self, configurations: configuration)
    public func body(content: Content, context: ModelContainer) -> some View {
    public static var schedulerSampleData: PreviewTrait<T> {
    public static var sampleEventRange: Range<Date> {

================
File: Sources/SpeziSchedulerUI/DefaultTileHeader.swift
================
public struct DefaultTileHeader: View {
    private let alignment: HorizontalAlignment
    private let event: Event
    private var taskCategoryAppearances
    public var body: some View {
    public init(_ event: Event, alignment: HorizontalAlignment = .leading) {
    private func subheadline(with appearance: Task.Category.Appearance) -> some View {
    private func occurrenceStartTimeText() -> Text {
    private func occurrenceDurationText() -> Text {
    private func dateOffsetText() -> Text {
    private func dateSubheadline() -> Text? {
    private func dateReferenceFormat(to date: Date) -> SystemFormatStyle.DateReference {
    @Previewable var events

================
File: Sources/SpeziSchedulerUI/EventActionButton.swift
================
public struct EventActionButton: View {
    private let event: Event
    private let customLabel: Text?
    private let action: () -> Void
    private var taskCategoryAppearances
    @ManagedViewUpdate private var actionUpdate
    private var actionDisabled: Bool {
        let policy = event.task.completionPolicy
        let now = Date.now
        let disabled = policy.isAllowedToComplete(event: event, now: now)
    private var actionLabel: Text {
    public var body: some View {
    init(event: Event, label: Text?, action: @escaping () -> Void) {
    public init(event: Event, action: @escaping () -> Void) {
    public init(event: Event, _ label: LocalizedStringResource, action: @escaping () -> Void) {
    public init(event: Event, action: @escaping () -> Void, @ViewBuilder label: () -> Text) {

================
File: Sources/SpeziSchedulerUI/EventScheduleList.swift
================
public struct EventScheduleList<Tile: View>: View {
    private let date: Date
    private let endOfDayExclusive: Date
    private var events
    @ManagedViewUpdate private var viewUpdate
    private var eventTile: (Event) -> Tile
    private var hasValidData: Bool {
    private var listTitle: Text {
    private var unavailableTitle: Text {
    private var unavailableDescription: Text {
    public var body: some View {
    @ViewBuilder private var contentUnavailableOverlay: some View {
    public init(date: Date = .today, @ViewBuilder content: @escaping (Event) -> Tile) {

================
File: Sources/SpeziSchedulerUI/InstructionsTile.swift
================
public struct InstructionsTile<Header: View, Info: View, Footer: View>: View {
    private let alignment: HorizontalAlignment
    private let event: Event
    private let header: Header
    private let footer: Footer
    private let moreInformation: Info
    @State private var presentingMoreInformation: Bool = false
    private var moreInfoButton: some View {
    private var tileAlignment: HorizontalAlignment {
    public var body: some View {
                let layout = alignment == .center
    public init(
    @Previewable var events

================
File: Sources/SpeziSchedulerUI/TodayList.swift
================
public struct TodayList<Tile: View>: View {
    private var events
    @ManagedViewUpdate private var viewUpdate
    private var eventTile: (Event) -> Tile
    public var body: some View {
    public init(@ViewBuilder content: @escaping (Event) -> Tile) {

================
File: Tests/SpeziSchedulerMacrosTest/UserStorageEntryMacroTests.swift
================
let testMacros: [String: any Macro.Type] = [
final class UserStorageEntryMacroTests: XCTestCase { // swiftlint:disable:this type_body_length
    func testOptionalProperty() {
    func testOptionalPropertywithDefaultValue() {
    func testPropertyWithDefault() {
    func testOptionalPropertyOnOutcome() {
    func testPublicModifier() {
    func testBindingDiagnostics() { // swiftlint:disable:this function_body_length
    func testLexicalContext() { // swiftlint:disable:this function_body_length
    func testJsonCoding() { // swiftlint:disable:this function_body_length
    func testCustomCoding() {

================
File: Tests/SpeziSchedulerTests/Utils/ExampleTaskKey.swift
================
    @Property var example: String?
    @Property var example2: String = "Hello World"

================
File: Tests/SpeziSchedulerTests/NotificationsTests.swift
================
final class NotificationsTests: XCTestCase {
    func testSharedIdPrefix() {

================
File: Tests/SpeziSchedulerTests/SchedulerTests.swift
================
final class SchedulerTests: XCTestCase {
    override func setUp() async throws {
    func testScheduler() {
        let module = Scheduler()
        let range = Date.today..<Date.now
    func testSimpleTaskCreation() throws {
        let schedule: Schedule = .daily(hour: 8, minute: 35, startingAt: .today)
        let result = try module.createOrUpdateTask(
        let results = try module.queryTasks(for: Date.yesterday..<Date.tomorrow)
        let task0 = try XCTUnwrap(results.first)
    func testSimpleTaskVersioning() throws { // swiftlint:disable:this function_body_length
        let start = try XCTUnwrap(Calendar.current.date(from: DateComponents(year: 2024, month: 9, day: 6, hour: 14, minute: 0, second: 0)))
        let date0 = try XCTUnwrap(Calendar.current.date(from: DateComponents(year: 2024, month: 9, day: 6, hour: 14, minute: 59, second: 49)))
        let date1 = try XCTUnwrap(Calendar.current.date(from: DateComponents(year: 2024, month: 9, day: 6, hour: 15, minute: 59, second: 49)))
        let end = try XCTUnwrap(Calendar.current.date(from: DateComponents(year: 2024, month: 9, day: 6, hour: 17, minute: 0, second: 0)))
        let schedule = Schedule(startingAt: date0, recurrence: .hourly(calendar: .current, minutes: [30]))
        let firstVersion = try module.createOrUpdateTask(
        let noChanges = try module.createOrUpdateTask(
        let secondVersion = try module.createOrUpdateTask(
        let results = try module.queryTasks(for: start...date1)
        let task0 = results[0]
        let task1 = results[1]
        let events = try module.queryEvents(for: start..<end)
        let event0 = events[0]
        let event1 = events[1]
        let components0 = Calendar.current.dateComponents([.hour, .minute, .second], from: event0.occurrence.start)
        let components1 = Calendar.current.dateComponents([.hour, .minute, .second], from: event1.occurrence.start)
    func testFetchingEventsAfterCompletion() async throws {
        let todayRange = Date.today..<Date.tomorrow
        let events = try module.queryEvents(for: todayRange)

================
File: Tests/SpeziSchedulerTests/ScheduleTests.swift
================
final class ScheduleTests: XCTestCase {
    func testOnceSchedule() throws {
        let startDate: Date = try .withTestDate(hour: 9, minute: 23, second: 25)
        let schedule: Schedule = .once(at: startDate, duration: .hours(2))
        let occurrences = schedule.occurrences()
        var iterator = occurrences.makeIterator()
        let occurrence1 = try XCTUnwrap(iterator.next())
    func testNextOccurrenceOnceSchedule() throws {
        let occurrence = try XCTUnwrap(schedule.nextOccurrence(in: .withTestDate(hour: 9, minute: 3)...))
        let occurrences = try schedule.nextOccurrences(in: .withTestDate(hour: 9, minute: 3)..., count: 2)
    func testNextOccurrence() throws {
        let schedule: Schedule = .daily(hour: 12, minute: 35, startingAt: startDate, end: .afterOccurrences(3))
        let occurrence1 = occurrences[1]
    func testNextOccurrenceInfinite() throws {
        let clock = ContinuousClock()
        let schedule: Schedule = .daily(hour: 12, minute: 35, startingAt: startDate)
        var occurrence: Occurrence! // swiftlint:disable:this implicitly_unwrapped_optional
        let duration = try clock.measure {
        var occurrences: [Occurrence] = []
        let duration2 = try clock.measure {
    func testDailyScheduleWithThreeOccurrences() throws {
        let schedule: Schedule = .daily(hour: 12, minute: 35, startingAt: startDate, end: .afterOccurrences(3), duration: .minutes(30))
        let occurrence2 = try XCTUnwrap(iterator.next())
        let occurrence3 = try XCTUnwrap(iterator.next())
    func testDailyScheduleWithDateEnd() throws {
        let endDate = startDate.addingTimeInterval(Double(Duration.seconds(16 * 24 * 60 * 60).components.seconds))
        let schedule: Schedule = .weekly(
    static func withTestDate(year: Int = 2024, month: Int = 8, day: Int = 24, hour: Int, minute: Int, second: Int = 0) throws -> Date {
        let components = DateComponents(year: year, month: month, day: day, hour: hour, minute: minute, second: second)

================
File: Tests/SpeziSchedulerUITests/SchedulerSampleDataTests.swift
================
final class SchedulerSampleDataTests: XCTestCase {
    func testSchedulerSampleData() throws {
        let container = try SchedulerSampleData.makeSharedContext()
        let scheduler = Scheduler(testingContainer: container)
        let results = try scheduler.queryTasks(for: Date.yesterday..<Date.tomorrow)
        let events = try scheduler.queryEvents(for: Date.yesterday..<Date.tomorrow)

================
File: Tests/SpeziSchedulerUITests/SpeziSchedulerUITests.swift
================
final class SpeziSchedulerUITests: XCTestCase {
    func testTileHeaderLayout() {
        let event = SchedulerSampleData.makeTestEvent()
        let leadingTileHeader = DefaultTileHeader(event, alignment: .leading)
        let centerTileHeader = DefaultTileHeader(event, alignment: .center)
        let trailingTileHeader = DefaultTileHeader(event, alignment: .trailing)
    func testTileHeaderLayoutWithCategoryAppearance() {
    func testInstructionsTile() {
        let tileLeading = InstructionsTile(event, alignment: .leading)
        let tileCenter = InstructionsTile(event, alignment: .center)
        let tileTrailing = InstructionsTile(event, alignment: .trailing)
        let tileLeadingMore = InstructionsTile(event, alignment: .leading, more: {
        let tileCenterMore = InstructionsTile(event, alignment: .center, more: {
        let tileTrailingMore = InstructionsTile(event, alignment: .trailing, more: {
        let tileWithAction = InstructionsTile(event) {
    func testInstructionsTileWithCategoryAppearance() {

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
File: Tests/UITests/TestApp/EventDetailView.swift
================
struct EventDetailView: View {
    private let event: Event
    private var dismiss
    var body: some View {
    init(_ event: Event) {
    func detailHeader() -> some View {

================
File: Tests/UITests/TestApp/Info.plist
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>BGTaskSchedulerPermittedIdentifiers</key>
	<array>
		<string>edu.stanford.spezi.scheduler.notifications-scheduling</string>
	</array>
	<key>UIBackgroundModes</key>
	<array>
		<string>processing</string>
		<string>fetch</string>
	</array>
</dict>
</plist>

================
File: Tests/UITests/TestApp/Info.plist.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/NotificationsView.swift
================
struct NotificationsView: View {
    private let logger = Logger(subsystem: "edu.stanford.spezi.TestApp", category: "NotificationsView")
    private var notificationSettings
    private var requestNotificationAuthorization
    private var scheduler
    @State private var requestAuthorization = false
    @State private var viewState: ViewState = .idle
    var body: some View {
    private func queryAuthorization() async {
        let status = await notificationSettings().authorizationStatus

================
File: Tests/UITests/TestApp/ScheduleView.swift
================
enum DateSelection: Hashable {
struct ScheduleView: View {
    private var events
    private var model
    @State private var alignment: HorizontalAlignment = .leading
    @State private var hidden = false // hide for screenshots
    @State private var dateSelection: DateSelection = .today
    @State private var date = Date()
    var body: some View {
        @Bindable var model = model
    @ToolbarContentBuilder private var toolbar: some ToolbarContent {
    private func hide() {
    public func hash(into hasher: inout Hasher) {

================
File: Tests/UITests/TestApp/Task+About.swift
================
    @Property var about: String.LocalizationValue?

================
File: Tests/UITests/TestApp/TestApp.entitlements
================
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.developer.usernotifications.time-sensitive</key>
	<true/>
</dict>
</plist>

================
File: Tests/UITests/TestApp/TestApp.entitlements.license
================
This source file is part of the Stanford Spezi open-source project

SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

================
File: Tests/UITests/TestApp/TestApp.swift
================
struct UITestsApp: App {
    var appDelegate
    var body: some Scene {

================
File: Tests/UITests/TestApp/TestAppDelegate.swift
================
class TestAppDelegate: SpeziAppDelegate {
    override var configuration: Configuration {

================
File: Tests/UITests/TestApp/TestAppScheduler.swift
================
final class SchedulerModel {
    var viewState: ViewState = .idle
    nonisolated init() {}
enum TaskIdentifier {
    static let socialSupportQuestionnaire = "test-task"
    static let testMeasurement = "test-measurement"
    static let testMedication = "test-medication"
final class TestAppScheduler: Module {
    private var logger
    private var scheduler
    @Model private var model = SchedulerModel()
    init() {}
    func configure() {
            let now = Date.now
            let time = notificationTestTime(for: now, adding: .seconds(40))
            let nextWeek: Date = .nextWeek
    private func notificationTestTime(for date: Date, adding duration: Duration) -> NotificationTime {
        let now = date.addingTimeInterval(Double(duration.components.seconds))
        let components = Calendar.current.dateComponents([.hour, .minute, .second], from: now)

================
File: Tests/UITests/TestAppUITests/TestAppUITests.swift
================
class TestAppUITests: XCTestCase {
    override func setUp() {
    func testBasicEventInteraction() {
        let app = XCUIApplication()
    func testNotificationScheduling() {
        let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")
        let notification = springboard.otherElements["Notification"].descendants(matching: .any)["NotificationShortLookView"]

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
               BlueprintIdentifier = "SpeziSchedulerUI"
               BuildableName = "SpeziSchedulerUI"
               BlueprintName = "SpeziSchedulerUI"
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
               BlueprintIdentifier = "SpeziScheduler"
               BuildableName = "SpeziScheduler"
               BlueprintName = "SpeziScheduler"
               ReferencedContainer = "container:../..">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES"
      codeCoverageEnabled = "YES">
      <CodeCoverageTargets>
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "Spezi"
            BuildableName = "Spezi"
            BlueprintName = "Spezi"
            ReferencedContainer = "container:../..">
         </BuildableReference>
      </CodeCoverageTargets>
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
		2F68C3C8292EA52000B3E12C /* Spezi in Frameworks */ = {isa = PBXBuildFile; productRef = 2F68C3C7292EA52000B3E12C /* Spezi */; };
		2F6D139A28F5F386007C25D6 /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 2F6D139928F5F386007C25D6 /* Assets.xcassets */; };
		2F8A431329130A8C005D2B8F /* TestAppUITests.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F8A431229130A8C005D2B8F /* TestAppUITests.swift */; };
		2F9F4D8529B80A1500ABE259 /* TestAppDelegate.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2F9F4D8429B80A1500ABE259 /* TestAppDelegate.swift */; };
		2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */ = {isa = PBXBuildFile; fileRef = 2FA7382B290ADFAA007ACEB9 /* TestApp.swift */; };
		2FE0B6E72A14C65900818AE9 /* SpeziScheduler in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE0B6E62A14C65900818AE9 /* SpeziScheduler */; };
		2FE0B6EA2A14D82600818AE9 /* XCTestExtensions in Frameworks */ = {isa = PBXBuildFile; productRef = 2FE0B6E92A14D82600818AE9 /* XCTestExtensions */; };
		A926A5352C9D87B100C92F94 /* NotificationsView.swift in Sources */ = {isa = PBXBuildFile; fileRef = A926A5342C9D87B100C92F94 /* NotificationsView.swift */; };
		A977F6732C92F4C00071A1D1 /* SpeziSchedulerUI in Frameworks */ = {isa = PBXBuildFile; productRef = A977F6722C92F4C00071A1D1 /* SpeziSchedulerUI */; };
		A98B09C42C90913F0076E99A /* TestAppScheduler.swift in Sources */ = {isa = PBXBuildFile; fileRef = A98B09C32C9091390076E99A /* TestAppScheduler.swift */; };
		A98B09C62C90B02B0076E99A /* Task+About.swift in Sources */ = {isa = PBXBuildFile; fileRef = A98B09C52C90B0260076E99A /* Task+About.swift */; };
		A98B09C82C90C8E40076E99A /* EventDetailView.swift in Sources */ = {isa = PBXBuildFile; fileRef = A98B09C72C90C8E30076E99A /* EventDetailView.swift */; };
		A9947BEA2CC128FA0068AA8A /* XCTSpeziNotificationsUI in Frameworks */ = {isa = PBXBuildFile; productRef = A9947BE92CC128FA0068AA8A /* XCTSpeziNotificationsUI */; };
		A9947BEC2CC12DA70068AA8A /* XCTSpeziNotifications in Frameworks */ = {isa = PBXBuildFile; productRef = A9947BEB2CC12DA70068AA8A /* XCTSpeziNotifications */; };
		A9C2951D2C899FA10038EF1B /* ScheduleView.swift in Sources */ = {isa = PBXBuildFile; fileRef = A9C2951C2C899FA10038EF1B /* ScheduleView.swift */; };
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
		2F6D139228F5F384007C25D6 /* TestApp.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = TestApp.app; sourceTree = BUILT_PRODUCTS_DIR; };
		2F6D139928F5F386007C25D6 /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
		2F6D13AC28F5F386007C25D6 /* TestAppUITests.xctest */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = TestAppUITests.xctest; sourceTree = BUILT_PRODUCTS_DIR; };
		2F8A431229130A8C005D2B8F /* TestAppUITests.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TestAppUITests.swift; sourceTree = "<group>"; };
		2F9F4D8429B80A1500ABE259 /* TestAppDelegate.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TestAppDelegate.swift; sourceTree = "<group>"; };
		2FA7382B290ADFAA007ACEB9 /* TestApp.swift */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.swift; path = TestApp.swift; sourceTree = "<group>"; };
		2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */ = {isa = PBXFileReference; lastKnownFileType = text; path = TestApp.xctestplan; sourceTree = "<group>"; };
		2FE0B6E52A14C64E00818AE9 /* SpeziScheduler */ = {isa = PBXFileReference; lastKnownFileType = wrapper; name = SpeziScheduler; path = ../..; sourceTree = "<group>"; };
		A926A5342C9D87B100C92F94 /* NotificationsView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = NotificationsView.swift; sourceTree = "<group>"; };
		A960461B2C9840E800EA8022 /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist; path = Info.plist; sourceTree = "<group>"; };
		A960461C2C9853C700EA8022 /* TestApp.entitlements */ = {isa = PBXFileReference; lastKnownFileType = text.plist.entitlements; path = TestApp.entitlements; sourceTree = "<group>"; };
		A98B09C32C9091390076E99A /* TestAppScheduler.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = TestAppScheduler.swift; sourceTree = "<group>"; };
		A98B09C52C90B0260076E99A /* Task+About.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = "Task+About.swift"; sourceTree = "<group>"; };
		A98B09C72C90C8E30076E99A /* EventDetailView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = EventDetailView.swift; sourceTree = "<group>"; };
		A9C2951C2C899FA10038EF1B /* ScheduleView.swift */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = ScheduleView.swift; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		2F6D138F28F5F384007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2F68C3C8292EA52000B3E12C /* Spezi in Frameworks */,
				A9947BEA2CC128FA0068AA8A /* XCTSpeziNotificationsUI in Frameworks */,
				A977F6732C92F4C00071A1D1 /* SpeziSchedulerUI in Frameworks */,
				2FE0B6E72A14C65900818AE9 /* SpeziScheduler in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A928F5F386007C25D6 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2FE0B6EA2A14D82600818AE9 /* XCTestExtensions in Frameworks */,
				A9947BEC2CC12DA70068AA8A /* XCTSpeziNotifications in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		2F6D138928F5F384007C25D6 = {
			isa = PBXGroup;
			children = (
				2FB0758A299DDB9000C0B37F /* TestApp.xctestplan */,
				2FE0B6E52A14C64E00818AE9 /* SpeziScheduler */,
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
				A960461C2C9853C700EA8022 /* TestApp.entitlements */,
				A960461B2C9840E800EA8022 /* Info.plist */,
				A926A5342C9D87B100C92F94 /* NotificationsView.swift */,
				A98B09C72C90C8E30076E99A /* EventDetailView.swift */,
				A9C2951C2C899FA10038EF1B /* ScheduleView.swift */,
				A98B09C52C90B0260076E99A /* Task+About.swift */,
				2FA7382B290ADFAA007ACEB9 /* TestApp.swift */,
				2F9F4D8429B80A1500ABE259 /* TestAppDelegate.swift */,
				A98B09C32C9091390076E99A /* TestAppScheduler.swift */,
				2F6D139928F5F386007C25D6 /* Assets.xcassets */,
			);
			path = TestApp;
			sourceTree = "<group>";
		};
		2F6D13AF28F5F386007C25D6 /* TestAppUITests */ = {
			isa = PBXGroup;
			children = (
				2F8A431229130A8C005D2B8F /* TestAppUITests.swift */,
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
				2F68C3C7292EA52000B3E12C /* Spezi */,
				2FE0B6E62A14C65900818AE9 /* SpeziScheduler */,
				A977F6722C92F4C00071A1D1 /* SpeziSchedulerUI */,
				A9947BE92CC128FA0068AA8A /* XCTSpeziNotificationsUI */,
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
				2FE0B6E92A14D82600818AE9 /* XCTestExtensions */,
				A9947BEB2CC12DA70068AA8A /* XCTSpeziNotifications */,
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
				2FE0B6E82A14D82600818AE9 /* XCRemoteSwiftPackageReference "XCTestExtensions" */,
				A9947BE82CC128FA0068AA8A /* XCRemoteSwiftPackageReference "SpeziNotifications" */,
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
				2F9F4D8529B80A1500ABE259 /* TestAppDelegate.swift in Sources */,
				A98B09C62C90B02B0076E99A /* Task+About.swift in Sources */,
				A98B09C82C90C8E40076E99A /* EventDetailView.swift in Sources */,
				A98B09C42C90913F0076E99A /* TestAppScheduler.swift in Sources */,
				A9C2951D2C899FA10038EF1B /* ScheduleView.swift in Sources */,
				2FA7382C290ADFAA007ACEB9 /* TestApp.swift in Sources */,
				A926A5352C9D87B100C92F94 /* NotificationsView.swift in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
		2F6D13A828F5F386007C25D6 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				2F8A431329130A8C005D2B8F /* TestAppUITests.swift in Sources */,
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
				CODE_SIGN_ENTITLEMENTS = TestApp/TestApp.entitlements;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				DEVELOPMENT_ASSET_PATHS = "";
				DEVELOPMENT_TEAM = 637867499T;
				ENABLE_PREVIEWS = YES;
				ENABLE_TESTING_SEARCH_PATHS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = TestApp/Info.plist;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MACOSX_DEPLOYMENT_TARGET = 15.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.scheduler.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 5.0;
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
				INFOPLIST_FILE = TestApp/Info.plist;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = "UIInterfaceOrientationPortrait UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MACOSX_DEPLOYMENT_TARGET = 15.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.spezi.scheduler.testapp;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_STRICT_CONCURRENCY = complete;
				SWIFT_VERSION = 5.0;
				TARGETED_DEVICE_FAMILY = "1,2,7";
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
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				MACOSX_DEPLOYMENT_TARGET = 15.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.Spezi.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_VERSION = 5.0;
				TARGETED_DEVICE_FAMILY = "1,2,7";
				TEST_TARGET_NAME = TestApp;
				XROS_DEPLOYMENT_TARGET = 2.0;
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
				IPHONEOS_DEPLOYMENT_TARGET = 18.0;
				MACOSX_DEPLOYMENT_TARGET = 15.0;
				MARKETING_VERSION = 1.0;
				PRODUCT_BUNDLE_IDENTIFIER = edu.stanford.Spezi.testappuitests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				PROVISIONING_PROFILE = "";
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator macosx xros xrsimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SUPPORTS_XR_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = NO;
				SWIFT_VERSION = 5.0;
				TARGETED_DEVICE_FAMILY = "1,2,7";
				TEST_TARGET_NAME = TestApp;
				XROS_DEPLOYMENT_TARGET = 2.0;
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		2F6D138D28F5F384007C25D6 /* Build configuration list for PBXProject "UITests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13B428F5F386007C25D6 /* Debug */,
				2F6D13B528F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		2F6D13B628F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestApp" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13B728F5F386007C25D6 /* Debug */,
				2F6D13B828F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		2F6D13BC28F5F386007C25D6 /* Build configuration list for PBXNativeTarget "TestAppUITests" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				2F6D13BD28F5F386007C25D6 /* Debug */,
				2F6D13BE28F5F386007C25D6 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */

/* Begin XCRemoteSwiftPackageReference section */
		2FE0B6E82A14D82600818AE9 /* XCRemoteSwiftPackageReference "XCTestExtensions" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordBDHG/XCTestExtensions.git";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.0.0;
			};
		};
		A9947BE82CC128FA0068AA8A /* XCRemoteSwiftPackageReference "SpeziNotifications" */ = {
			isa = XCRemoteSwiftPackageReference;
			repositoryURL = "https://github.com/StanfordSpezi/SpeziNotifications";
			requirement = {
				kind = upToNextMajorVersion;
				minimumVersion = 1.0.2;
			};
		};
/* End XCRemoteSwiftPackageReference section */

/* Begin XCSwiftPackageProductDependency section */
		2F68C3C7292EA52000B3E12C /* Spezi */ = {
			isa = XCSwiftPackageProductDependency;
			productName = Spezi;
		};
		2FE0B6E62A14C65900818AE9 /* SpeziScheduler */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziScheduler;
		};
		2FE0B6E92A14D82600818AE9 /* XCTestExtensions */ = {
			isa = XCSwiftPackageProductDependency;
			package = 2FE0B6E82A14D82600818AE9 /* XCRemoteSwiftPackageReference "XCTestExtensions" */;
			productName = XCTestExtensions;
		};
		A977F6722C92F4C00071A1D1 /* SpeziSchedulerUI */ = {
			isa = XCSwiftPackageProductDependency;
			productName = SpeziSchedulerUI;
		};
		A9947BE92CC128FA0068AA8A /* XCTSpeziNotificationsUI */ = {
			isa = XCSwiftPackageProductDependency;
			package = A9947BE82CC128FA0068AA8A /* XCRemoteSwiftPackageReference "SpeziNotifications" */;
			productName = XCTSpeziNotificationsUI;
		};
		A9947BEB2CC12DA70068AA8A /* XCTSpeziNotifications */ = {
			isa = XCSwiftPackageProductDependency;
			package = A9947BE82CC128FA0068AA8A /* XCRemoteSwiftPackageReference "SpeziNotifications" */;
			productName = XCTSpeziNotifications;
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
          "identifier" : "SpeziScheduler",
          "name" : "SpeziScheduler"
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
      - SpeziScheduler
      - SpeziSchedulerUI

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
title: "Spezi"
doi: 10.5281/zenodo.7706954
url: "https://github.com/StanfordSpezi/SpeziScheduler"

================
File: CONTRIBUTORS.md
================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

Spezi Scheduler contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Andreas Bauer](https://github.com/Supereg)

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

# Spezi Scheduler

[![Build and Test](https://github.com/StanfordSpezi/SpeziScheduler/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/SpeziScheduler/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/SpeziScheduler/branch/main/graph/badge.svg?token=0SRI67ItFw)](https://codecov.io/gh/StanfordSpezi/SpeziScheduler)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7706954.svg)](https://doi.org/10.5281/zenodo.7706954)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziScheduler%2Fbadge%3Ftype%3Dswift-versions)](https://swiftpackageindex.com/StanfordSpezi/SpeziScheduler)
[![](https://img.shields.io/endpoint?url=https%3A%2F%2Fswiftpackageindex.com%2Fapi%2Fpackages%2FStanfordSpezi%2FSpeziScheduler%2Fbadge%3Ftype%3Dplatforms)](https://swiftpackageindex.com/StanfordSpezi/SpeziScheduler)

The Scheduler module allows developers to schedule tasks based on predefined schedules.

For more information, please refer to the [API documentation](https://swiftpackageindex.com/StanfordSpezi/SpeziScheduler/documentation).


## The Spezi Template Application

The [Spezi Template Application](https://github.com/StanfordSpezi/SpeziTemplateApplication) provides a great starting point and example using the Spezi Scheduler module.


## Contributing

Contributions to this project are welcome. Please make sure to read the [contribution guidelines](https://github.com/StanfordSpezi/.github/blob/main/CONTRIBUTING.md) and the [contributor covenant code of conduct](https://github.com/StanfordSpezi/.github/blob/main/CODE_OF_CONDUCT.md) first.


## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/SpeziScheduler/tree/main/LICENSES) for more information.

![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterLight.png#gh-light-mode-only)
![Spezi Footer](https://raw.githubusercontent.com/StanfordSpezi/.github/main/assets/FooterDark.png#gh-dark-mode-only)



================================================================
End of Codebase
================================================================
