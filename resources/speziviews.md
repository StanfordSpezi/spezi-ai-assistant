Directory structure:
└── stanfordspezi-speziviews/
    ├── README.md
    ├── CONTRIBUTORS.md
    ├── LICENSE.md
    └── Sources/
        ├── SpeziPersonalInfo/
        │   └── SpeziPersonalInfo.docc/
        │       └── SpeziPersonalInfo.md
        ├── SpeziValidation/
        │   └── SpeziValidation.docc/
        │       └── SpeziValidation.md
        └── SpeziViews/
            └── SpeziViews.docc/
                ├── SPI.md
                └── SpeziViews.md

================================================
File: README.md
================================================
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


================================================
File: CONTRIBUTORS.md
================================================
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


================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2022 Stanford University and the project authors (see CONTRIBUTORS.md)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


================================================
File: Sources/SpeziPersonalInfo/SpeziPersonalInfo.docc/SpeziPersonalInfo.md
================================================
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


================================================
File: Sources/SpeziValidation/SpeziValidation.docc/SpeziValidation.md
================================================
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


================================================
File: Sources/SpeziViews/SpeziViews.docc/SPI.md
================================================
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



================================================
File: Sources/SpeziViews/SpeziViews.docc/SpeziViews.md
================================================
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


