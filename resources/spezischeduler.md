Directory structure:
└── stanfordspezi-spezischeduler/
    ├── README.md
    ├── CONTRIBUTORS.md
    ├── LICENSE.md
    └── Sources/
        ├── SpeziScheduler/
        │   └── SpeziScheduler.docc/
        │       └── SpeziScheduler.md
        └── SpeziSchedulerUI/
            └── SpeziSchedulerUI.docc/
                └── SpeziSchedulerUI.md

================================================
File: README.md
================================================
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


================================================
File: CONTRIBUTORS.md
================================================
<!--

This source file is part of the Stanford Spezi open-source project.

SPDX-FileCopyrightText: 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
  
-->

Spezi Scheduler contributors
====================

* [Paul Schmiedmayer](https://github.com/PSchmiedmayer)
* [Andreas Bauer](https://github.com/Supereg)


================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


================================================
File: Sources/SpeziScheduler/SpeziScheduler.docc/SpeziScheduler.md
================================================
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


================================================
File: Sources/SpeziSchedulerUI/SpeziSchedulerUI.docc/SpeziSchedulerUI.md
================================================
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


